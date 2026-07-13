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
            } catch (e) {
                console.warn('syncManager: failed to init supabase client', e);
                return;
            }

            window.addEventListener('online', function () {
                syncManager.syncAll();
            });

            if (navigator.onLine) {
                setTimeout(function () { syncManager.syncAll(); }, 3000);
            }
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
                        quantity: inv.quantity || 0
                    }], { onConflict: 'product,pack_size,production_month' }).then(function (res) { if (res.error) throw res.error; })
                );
            });

            Promise.all(promises)
                .then(function () {
                    if (opData.transactions) {
                        opData.transactions = opData.transactions.map(function (t) {
                            t.sync_status = 'synced';
                            return t;
                        });
                    }
                    if (opData.inventory) {
                        opData.inventory = opData.inventory.map(function (i) {
                            i.sync_status = 'synced';
                            return i;
                        });
                    }
                    localStorage.setItem('operator-data', JSON.stringify(opData));
                    syncCallbacks.forEach(function (cb) { try { cb(); } catch (e) {} });
                })
                .catch(function (e) {
                    console.warn('Sync failed (will retry):', e.message || e);
                })
                .finally(function () {
                    isSyncing = false;
                });
        }
    };

    window.syncManager = syncManager;
})();
