// syncManager.js — Offline-first sync between localStorage and Supabase
(function () {
    var SUPABASE_URL = 'https://ytirmuuchcxzlwethvsg.supabase.co';
    var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0aXJtdXVjaGN4emx3ZXRodnNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM5MzU1NzMsImV4cCI6MjA5OTUxMTU3M30.qJTqCNTScbkSHvISLJKhKR0e-_4qdb-7QvVyYQIKRog';

    var supabase = null;
    var isSyncing = false;
    var syncCallbacks = [];

    function loadRaw(key) {
        try { var d = localStorage.getItem(key); return d ? JSON.parse(d) : null; } catch (e) { return null; }
    }

    var syncManager = {
        init: function () {
            if (typeof supabaseClient === 'undefined' && typeof window.supabase === 'undefined') {
                console.warn('syncManager: supabase-js not loaded, running localStorage-only');
                return;
            }
            try {
                var createClient = window.supabase ? window.supabase.createClient : supabaseClient.createClient;
                supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
                    auth: { persistSession: false }
                });
                syncManager.supabase = supabase;
            } catch (e) {
                console.warn('syncManager: failed to init supabase client', e);
                return;
            }

            window.addEventListener('online', function () {
                syncManager.syncAll();
            });
        },

        onSync: function (cb) {
            syncCallbacks.push(cb);
        },

        saveLocal: function (key, data) {
            if (data && data.transactions) {
                data.transactions = data.transactions.map(function (t) {
                    if (!t.sync_status) t.sync_status = 'pending';
                    return t;
                });
            }
            if (data && data.inventory) {
                data.inventory = data.inventory.map(function (i) {
                    if (!i.sync_status) i.sync_status = 'pending';
                    return i;
                });
            }
            localStorage.setItem(key, JSON.stringify(data));

            if (navigator.onLine && !isSyncing && supabase) {
                syncManager.syncAll();
            } else if (navigator.onLine && isSyncing && supabase) {
                syncManager._retryNeeded = true;
            }
        },

        syncAll: function () {
            if (isSyncing || !supabase) return;
            isSyncing = true;

            var opData = loadRaw('operator-data');
            if (!opData) { isSyncing = false; return; }

            var pendingTx = (opData.transactions || []).filter(function (t) { return t.sync_status === 'pending'; });
            var pendingInv = (opData.inventory || []).filter(function (i) { return i.sync_status === 'pending'; });

            if (pendingTx.length === 0 && pendingInv.length === 0) {
                isSyncing = false;
                return;
            }

            var promises = [];

            pendingTx.forEach(function (tx) {
                promises.push(
                    supabase.from('transactions').insert([{
                        product: tx.product,
                        pack_size: tx.packSize || '',
                        production_month: tx.productionMonth || '',
                        expiry_month: tx.expiryMonth || '',
                        quantity: tx.quantity || 0,
                        type: tx.type || 'receive',
                        operator_name: tx.operator_name || '',
                        warehouse: tx.warehouse || '',
                        client_timestamp: tx.timestamp || '',
                        client_date: tx.date || ''
                    }]).then(function (res) { if (res.error) throw res.error; })
                );
            });

            pendingInv.forEach(function (inv) {
                promises.push(
                    supabase.from('inventory').upsert([{
                        product: inv.product,
                        pack_size: inv.packSize || '',
                        production_month: inv.productionMonth || '',
                        expiry_month: inv.expiryMonth || '',
                        quantity: inv.quantity || 0,
                        warehouse: inv.warehouse || ''
                    }], { onConflict: 'product,pack_size,production_month,warehouse' }).then(function (res) { if (res.error) throw res.error; })
                );
            });

            Promise.all(promises)
                .then(function () {
                    var currentData = loadRaw('operator-data') || opData;
                    var syncedTx = {};
                    pendingTx.forEach(function (t) { syncedTx[t.timestamp] = true; });
                    var syncedInv = {};
                    pendingInv.forEach(function (i) {
                        var k = (i.product || '') + '|' + (i.packSize || '') + '|' + (i.productionMonth || '') + '|' + (i.warehouse || '');
                        syncedInv[k] = true;
                    });
                    if (currentData.transactions) {
                        currentData.transactions.forEach(function (t) {
                            if (syncedTx[t.timestamp]) t.sync_status = 'synced';
                        });
                    }
                    if (currentData.inventory) {
                        currentData.inventory.forEach(function (i) {
                            var k = (i.product || '') + '|' + (i.packSize || '') + '|' + (i.productionMonth || '') + '|' + (i.warehouse || '');
                            if (syncedInv[k]) i.sync_status = 'synced';
                        });
                    }
                    localStorage.setItem('operator-data', JSON.stringify(currentData));
                    syncCallbacks.forEach(function (cb) { try { cb(); } catch (e) {} });
                })
                .catch(function (e) {
                    console.warn('Sync failed (will retry):', e.message || e);
                })
                .finally(function () {
                    isSyncing = false;
                    if (syncManager._retryNeeded) {
                        syncManager._retryNeeded = false;
                        syncManager.syncAll();
                    }
                });
        }
    };

    syncManager.pullFromSupabase = function () {
        if (!supabase) return Promise.resolve();
        return Promise.all([
            supabase.from('transactions').select('*'),
            supabase.from('inventory').select('*')
        ]).then(function (results) {
            var txRows = results[0].data || [];
            var invRows = results[1].data || [];

            var localData = loadRaw('operator-data');

            // Guard: if Supabase returned empty but local has data, check for reset flag
            var hasSupabaseData = txRows.length > 0 || invRows.length > 0;
            var hasLocalData = localData && (
                (localData.transactions && localData.transactions.length > 0) ||
                (localData.inventory && localData.inventory.length > 0)
            );
            if (!hasSupabaseData && hasLocalData) {
                var cfg = loadRaw('shelf-life-config');
                if (cfg && cfg._lastReset) {
                    localStorage.removeItem('operator-data');
                    syncCallbacks.forEach(function (cb) { try { cb(); } catch (e) {} });
                    return;
                } else {
                    syncCallbacks.forEach(function (cb) { try { cb(); } catch (e) {} });
                    return;
                }
            }

            var pulled = {
                transactions: txRows.map(function (t) {
                    return {
                        product: t.product,
                        packSize: t.pack_size || '',
                        productionMonth: t.production_month || '',
                        expiryMonth: t.expiry_month || '',
                        quantity: t.quantity || 0,
                        type: t.type || 'receive',
                        operator_name: t.operator_name || '',
                        warehouse: t.warehouse || '',
                        timestamp: t.client_timestamp || '',
                        date: t.client_date || '',
                        sync_status: 'synced'
                    };
                }),
                inventory: (function () {
                    // Re-aggregate by (product, packSize, productionMonth, warehouse)
                    // so multiple operators at the same warehouse sum, not overwrite.
                    var agg = {};
                    invRows.forEach(function (i) {
                        var key = (i.product || '') + '|' + (i.pack_size || '') + '|' + (i.production_month || '') + '|' + (i.warehouse || '');
                        if (!agg[key]) {
                            agg[key] = {
                                product: i.product,
                                packSize: i.pack_size || '',
                                productionMonth: i.production_month || '',
                                expiryMonth: i.expiry_month || '',
                                quantity: 0,
                                warehouse: i.warehouse || '',
                                sync_status: 'synced'
                            };
                        }
                        agg[key].quantity = (agg[key].quantity || 0) + (i.quantity || 0);
                    });
                    return Object.values(agg);
                })()
            };

            // Merge transactions: keep all local + new Supabase rows (dedup by timestamp)
            // Prevents history loss when Supabase transactions table is empty but inventory exists
            if (localData) {
                var localTxns = localData.transactions || [];
                var supabaseTxKeys = {};
                pulled.transactions.forEach(function (t) { supabaseTxKeys[t.timestamp] = true; });
                var unmatchedLocal = localTxns.filter(function (t) { return !supabaseTxKeys[t.timestamp]; });
                pulled.transactions = pulled.transactions.concat(unmatchedLocal);

                // Inventory: keep pending items not yet pushed (re-aggregation handles rest)
                var localPendingInv = (localData.inventory || []).filter(function (i) { return i.sync_status === 'pending'; });
                pulled.inventory = pulled.inventory.concat(localPendingInv);
            }

            localStorage.setItem('operator-data', JSON.stringify(pulled));
            syncCallbacks.forEach(function (cb) { try { cb(); } catch (e) {} });
        }).catch(function (e) {
            console.warn('syncManager: pullFromSupabase failed', e.message || e);
        });
    };

    syncManager.pullConfig = function () {
        if (!supabase) return Promise.resolve();
        return supabase.from('config').select('*').eq('key', 'shelf-life-config').single().then(function (res) {
            if (res.error && res.error.code !== 'PGRST116') {
                console.warn('syncManager: pullConfig failed', res.error);
                return;
            }
            if (res.data && res.data.value) {
                var val = res.data.value;
                var toStore = typeof val === 'string' ? val : JSON.stringify(val);
                localStorage.setItem('shelf-life-config', toStore);
            }
        }).catch(function (e) {
            console.warn('syncManager: pullConfig error', e.message || e);
        });
    };

    window.syncManager = syncManager;

    syncManager.pullProducts = function () {
        if (!supabase) return Promise.resolve();
        return supabase.from('config').select('value').eq('key', 'product-list').single().then(function (res) {
            if (res.error && res.error.code !== 'PGRST116') {
                console.warn('syncManager: pullProducts failed', res.error);
                return;
            }
            if (res.data && res.data.value) {
                var val = res.data.value;
                var list = typeof val === 'string' ? JSON.parse(val) : val;
                if (list && list.length > 0) {
                    localStorage.setItem('synced-products', JSON.stringify(list));
                }
            }
        }).catch(function (e) {
            console.warn('syncManager: pullProducts error', e.message || e);
        });
    };
})();
