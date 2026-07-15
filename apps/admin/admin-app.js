// ==============================
// PASSWORD GATE
// ==============================
const ADMIN_PASSWORD = '9876';

function checkAdminAuth() {
    const authed = sessionStorage.getItem('admin-authenticated');
    if (authed === 'true') {
        const overlay = document.getElementById('admin-login-overlay');
        if (overlay) overlay.style.display = 'none';
        return true;
    }
    const overlay = document.getElementById('admin-login-overlay');
    if (overlay) overlay.style.display = 'flex';
    return false;
}

function adminLogin() {
    const input = document.getElementById('admin-login-pin');
    const error = document.getElementById('admin-login-error');
    if (input && input.value === ADMIN_PASSWORD) {
        sessionStorage.setItem('admin-authenticated', 'true');
        document.getElementById('admin-login-overlay').style.display = 'none';
        initApp();
    } else {
        if (error) {
            error.style.display = 'block';
            error.textContent = 'Incorrect password';
        }
        if (input) input.value = '';
    }
}

// ==============================
// DATA
// ==============================
const PRODUCTS = [
    { name: "Actara", pack: "5g", prefix: "SCH" },
    { name: "Amistar", pack: "50ml", prefix: "SCH" },
    { name: "Amistar", pack: "100ml", prefix: "SCH" },
    { name: "Amistar", pack: "500ml", prefix: "SCH" },
    { name: "Alika", pack: "50ml", prefix: "SCH" },
    { name: "Armure", pack: "100ml", prefix: "SCH" },
    { name: "Bingo", pack: "100g", prefix: "SCH" },
    { name: "Bingo", pack: "500g", prefix: "SCH" },
    { name: "Denim Fit", pack: "10g", prefix: "SCH" },
    { name: "Filia", pack: "50ml", prefix: "SCH" },
    { name: "Filia", pack: "100ml", prefix: "SCH" },
    { name: "Filia", pack: "500ml", prefix: "SCH" },
    { name: "Grozin", pack: "1kg", prefix: "SCH" },
    { name: "Grozin", pack: "2kg", prefix: "SCH" },
    { name: "Incipio", pack: "40ml", prefix: "SCH" },
    { name: "Incipio", pack: "100ml", prefix: "SCH" },
    { name: "Karate", pack: "50ml", prefix: "SCH" },
    { name: "Karate", pack: "100ml", prefix: "SCH" },
    { name: "Karate", pack: "500ml", prefix: "SCH" },
    { name: "Lanirat", pack: "100g", prefix: "SCH" },
    { name: "Magma", pack: "1kg", prefix: "SCH" },
    { name: "Magma", pack: "2kg", prefix: "SCH" },
    { name: "Miravis Duo", pack: "50ml", prefix: "SCH" },
    { name: "Miravis Duo", pack: "100ml", prefix: "SCH" },
    { name: "Pegasus", pack: "50ml", prefix: "SCH" },
    { name: "Pegasus", pack: "100ml", prefix: "SCH" },
    { name: "Proclam", pack: "10g", prefix: "SCH" },
    { name: "Proclam", pack: "30g", prefix: "SCH" },
    { name: "Revus", pack: "50ml", prefix: "SCH" },
    { name: "Revus", pack: "100ml", prefix: "SCH" },
    { name: "Ridomil", pack: "100g", prefix: "SCH" },
    { name: "Ridomil", pack: "500g", prefix: "SCH" },
    { name: "Rifit", pack: "100ml", prefix: "SCH" },
    { name: "Rifit", pack: "500ml", prefix: "SCH" },
    { name: "Score", pack: "50ml", prefix: "SCH" },
    { name: "Score", pack: "100ml", prefix: "SCH" },
    { name: "Score", pack: "500ml", prefix: "SCH" },
    { name: "Shobicron", pack: "50ml", prefix: "SCH" },
    { name: "Shobicron", pack: "100ml", prefix: "SCH" },
    { name: "Shobicron", pack: "500ml", prefix: "SCH" },
    { name: "Silika", pack: "1kg", prefix: "SCH" },
    { name: "Silika", pack: "2kg", prefix: "SCH" },
    { name: "Thiovit", pack: "1kg", prefix: "SCH" },
    { name: "Thiovit", pack: "2kg", prefix: "SCH" },
    { name: "Tilt", pack: "50ml", prefix: "SCH" },
    { name: "Tilt", pack: "100ml", prefix: "SCH" },
    { name: "Tilt", pack: "500ml", prefix: "SCH" },
    { name: "Vestoria", pack: "15g", prefix: "SCH" },
    { name: "Vertimec", pack: "50ml", prefix: "SCH" },
    { name: "Vertimec", pack: "100ml", prefix: "SCH" },
    { name: "Vertimec", pack: "500ml", prefix: "SCH" },
    { name: "Virtako", pack: "10g", prefix: "SCH" },
    { name: "Virtako", pack: "30g", prefix: "SCH" },
    { name: "Voliam", pack: "50ml", prefix: "SCH" },
    { name: "Plenum", pack: "50g", prefix: "SCH" },
    { name: "Atresia", pack: "50ml", prefix: "JAK" },
    { name: "Cruiser", pack: "20g", prefix: "SPL" },
    { name: "Caliber", pack: "100g", prefix: "EC" },
    { name: "Caliber", pack: "500g", prefix: "EC" },
    { name: "Gayte", pack: "100g", prefix: "BG" },
    { name: "Jazz", pack: "100g", prefix: "DKC" },
    { name: "Jazz", pack: "500g", prefix: "DKC" },
    { name: "Jazz", pack: "1kg", prefix: "DKC" },
    { name: "Laser", pack: "25g", prefix: "RB" },
    { name: "Protozim", pack: "50ml", prefix: "BWL" },
    { name: "Protozim", pack: "100ml", prefix: "BWL" },
    { name: "Protozim", pack: "500ml", prefix: "BWL" },
    { name: "PJ-16", pack: "", prefix: "" },
    { name: "XP-16", pack: "", prefix: "" }
];

// ==============================
// CONFIG (persisted in localStorage)
// ==============================
const DEFAULT_CONFIG = {
    operatorPins: [
        { name: 'Default', pin: '1234', warehouse: 'Chittagong' }
    ],
    expiryYears: { start: 2025, end: 2030 },
    prodYears: { start: 5, end: 6 },
    warehouses: ['Chittagong', 'Gazipur', 'Jessore', 'Bogura']
};

// ==============================
// AGI CODE HELPERS
// ==============================
const DEFAULT_AGI_CODES = {
    "Actara|5g": "34779",
    "Alika|50ml": "69667",
    "Amistar|50ml": "53294",
    "Armure|100ml": "85250",
    "Atresia|50ml": "88294",
    "Bingo|100g": "63728",
    "Bingo|500g": "63728",
    "Caliber|100g": "68507",
    "Caliber|500g": "68507",
    "Cruiser|20g": "63913",
    "Denim Fit|10g": "87224",
    "Filia|50ml": "55458",
    "Filia|100ml": "46420",
    "Filia|500ml": "57918",
    "Gayte|100g": "69037",
    "Grozin|1kg": "35440",
    "Grozin|2kg": "56655",
    "Incipio|40ml": "80926",
    "Jazz|100g": "52539",
    "Jazz|500g": "52537",
    "Karate|50ml": "58896",
    "Lanirat|100g": "35723",
    "Laser|25g": "43868",
    "Magma|1kg": "63731",
    "Miravis Duo|50ml": "80927",
    "Miravis Duo|100ml": "81359",
    "Pegasus|100ml": "61124",
    "Plenum|50g": "64213",
    "Proclam|10g": "70887",
    "Proclam|30g": "70897",
    "Protozim|50ml": "59703",
    "Revus|50ml": "58513",
    "Revus|100ml": "53508",
    "Revus|500ml": "53924",
    "Ridomil|100g": "38775",
    "Ridomil|500g": "38776",
    "Rifit|100ml": "35348",
    "Score|50ml": "34002",
    "Score|100ml": "30593",
    "Score|500ml": "34001",
    "Shobicron|50ml": "29568",
    "Silika|1kg": "58337",
    "Thiovit|1kg": "92798",
    "Tilt|50ml": "58888",
    "Vestoria|15g": "84793",
    "Vertimec|50ml": "63105",
    "Virtako|10g": "72598",
    "Voliam|50ml": "43978"
};

function getAgiCode(product, pack) {
    const codes = JSON.parse(localStorage.getItem('product-agi-codes') || '{}');
    const key = product + '|' + (pack || '');
    return codes[key] || DEFAULT_AGI_CODES[key] || '';
}
function setAgiCode(product, pack, code) {
    const codes = JSON.parse(localStorage.getItem('product-agi-codes') || '{}');
    codes[product + '|' + (pack || '')] = code;
    localStorage.setItem('product-agi-codes', JSON.stringify(codes));
}

// Merge persisted product edits into PRODUCTS array
(function loadCustomProducts() {
    try {
        const saved = localStorage.getItem('custom-products');
        if (saved) {
            const custom = JSON.parse(saved);
            PRODUCTS.length = 0;
            custom.forEach(p => PRODUCTS.push(p));
        }
    } catch(e) {}
})();

function loadConfig() {
    try {
        const saved = localStorage.getItem('shelf-life-config');
        const base = saved ? JSON.parse(saved) : {};
        return {
            operatorPins: base.operatorPins || JSON.parse(JSON.stringify(DEFAULT_CONFIG.operatorPins)),
            expiryYears: base.expiryYears || DEFAULT_CONFIG.expiryYears,
            prodYears: base.prodYears || DEFAULT_CONFIG.prodYears,
            warehouses: base.warehouses || DEFAULT_CONFIG.warehouses,
            // Allow any extra fields stored (forward-compat)
            ...base
        };
    } catch { return JSON.parse(JSON.stringify(DEFAULT_CONFIG)); }
}

function saveConfig(cfg) {
    localStorage.setItem('shelf-life-config', JSON.stringify(cfg));
    // Push config to Supabase for cross-device sync
    var client = window.syncManager && window.syncManager.supabase;
    if (client) {
        client.from('config').upsert({
            key: 'shelf-life-config',
            value: cfg
        }, { onConflict: 'key' }).then(function(res) {
            if (res.error) console.warn('config sync failed', res.error);
        }).catch(function(e) {
            console.warn('config sync error', e.message || e);
        });
    }
}

function syncProducts() {
    var client = window.syncManager && window.syncManager.supabase;
    if (client) {
        var productList = PRODUCTS.map(function(p) {
            return { name: p.name, pack: p.pack, prefix: p.prefix };
        });
        client.from('config').upsert({
            key: 'product-list',
            value: JSON.stringify(productList)
        }, { onConflict: 'key' }).then(function(res) {
            if (res.error) console.warn('product sync failed', res.error);
        }).catch(function(e) {
            console.warn('product sync error', e.message || e);
        });
    }
}

let CONFIG = loadConfig();
let selectedWarehouses = new Set(CONFIG.warehouses);
let chartYearFilter = 'all';
let chartMonthFilter = 'all';

function rebuildWarehouseChips() {
    const bar = document.getElementById('warehouse-filter-bar');
    const chips = CONFIG.warehouses.map(w =>
        '<button class="wh-filter-chip ' + (selectedWarehouses.has(w) ? 'active' : '') + '" onclick="toggleWarehouse(\'' + w + '\', this)">' + w + '</button>'
    ).join('');
    bar.innerHTML = '<span class="filter-label">Warehouse</span>' + chips;
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONTH_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

// ==============================
// OPERATOR DATA LOADER
// ==============================
function loadOperatorData() {
    try {
        const saved = localStorage.getItem('operator-data');
        if (saved) {
            const data = JSON.parse(saved);
            return data;
        }
    } catch {}
    return { transactions: [], inventory: [] };
}

// ==============================
// EXPIRY COMPUTATION
// ==============================
function monthsUntilExpiry(expiryStr) {
    const now = new Date();
    const parts = expiryStr.split(' ');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthIndex = monthNames.indexOf(parts[0]);
    const year = parseInt(parts[1]);
    const expiry = new Date(year, monthIndex, 1);
    const years = expiry.getFullYear() - now.getFullYear();
    const months = expiry.getMonth() - now.getMonth();
    return years * 12 + months;
}

function getExpiryLevel(months) {
    if (months <= 3) return 'critical';
    if (months <= 6) return 'warning';
    if (months <= 12) return 'notice';
    return 'distant';
}

// ==============================
// WAREHOUSE FILTER
// ==============================

function toggleWarehouse(name, btn) {
    if (selectedWarehouses.has(name)) {
        if (selectedWarehouses.size === 1) return;
        selectedWarehouses.delete(name);
        btn.classList.remove('active');
    } else {
        selectedWarehouses.add(name);
        btn.classList.add('active');
    }
    refreshCurrentScreen();
}

function setChartYearFilter(year) {
    chartYearFilter = year;
    document.querySelectorAll('#chart-filter-bar .filter-btn').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-year') === year);
    });
    renderDashboard();
}

function setChartMonthFilter(month) {
    chartMonthFilter = month;
    renderDashboard();
}

function isActiveScreen(id) {
    return document.getElementById(id).classList.contains('active');
}

function refreshCurrentScreen() {
    if (isActiveScreen('screen-dashboard')) renderDashboard();
    if (isActiveScreen('screen-12m')) render12M(currentFilter);
    if (isActiveScreen('screen-inventory')) renderInventory();
    if (isActiveScreen('screen-activity')) renderActivity(currentActivityFilter);
    if (isActiveScreen('screen-products')) renderProducts();
}

function filterByWarehouse(data) {
    return data.filter(d => selectedWarehouses.has(d.warehouse));
}

// ==============================
// NAVIGATION
// ==============================
function showScreen(id, btn) {
    document.querySelectorAll('.admin-screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const titles = { 'screen-dashboard': 'Dashboard', 'screen-12m': '12M & 18M Report', 'screen-inventory': 'Inventory', 'screen-activity': 'Activity Log', 'screen-products': 'Products', 'screen-settings': 'Settings' };
    document.getElementById('page-title').textContent = titles[id] || 'Dashboard';

    if (id === 'screen-dashboard') renderDashboard();
    if (id === 'screen-activity') { renderActivityWarehouseChips(); renderActivity(currentActivityFilter); }
    if (id === 'screen-inventory') renderInventory();
    if (id === 'screen-12m') render12M(currentFilter || 'all');
    if (id === 'screen-products') renderProducts();
}

// ==============================
// CLOCK
// ==============================
function updateClock() {
    const now = new Date();
    document.getElementById('current-time').textContent = now.toLocaleString('en-BD', { hour: '2-digit', minute: '2-digit', hour12: true, day: 'numeric', month: 'short', year: 'numeric' });
}

// ==============================
// DASHBOARD
// ==============================
let dashboardCharts = {};

function renderDashboard() {
    const opData = loadOperatorData();

    const expiryItems = filterByWarehouse((opData.inventory || []).filter(item => item.expiryMonth).map(item => {
        const monthsLeft = monthsUntilExpiry(item.expiryMonth);
        return {
            product: item.product,
            pack: item.packSize,
            expiry: item.expiryMonth,
            qty: item.quantity,
            monthsLeft,
            level: getExpiryLevel(monthsLeft),
            warehouse: item.warehouse || ''
        };
    }));

    const critical = expiryItems.filter(d => d.level === 'critical').length;
    const warning = expiryItems.filter(d => d.level === 'warning').length;
    const notice = expiryItems.filter(d => d.level === 'notice').length;
    const distant = expiryItems.filter(d => d.level === 'distant').length;

    document.getElementById('stat-critical').textContent = critical || 0;
    document.getElementById('stat-warning').textContent = warning || 0;
    document.getElementById('stat-notice').textContent = notice || 0;
    document.getElementById('stat-distant').textContent = distant || 0;

    const whList = document.getElementById('wh-list');
    document.getElementById('wh-count').textContent = CONFIG.warehouses.length + ' configured';
    whList.innerHTML = CONFIG.warehouses.map(w => {
        const hasData = expiryItems.some(d => d.warehouse === w);
        return '<div class="warehouse-row">' +
            '<span class="warehouse-name">' + w + '</span>' +
            '<span class="warehouse-status"><span class="status-dot ' + (hasData ? '' : 'inactive') + '"></span> ' +
            (hasData ? 'Active' : 'Not started') +
            '</span></div>';
    }).join('');

    const recentEl = document.getElementById('recent-counts');
    const txs = (opData.transactions || []).slice(-5).reverse();
    if (txs.length === 0) {
        recentEl.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text-muted);font-size:13px;">No counts recorded yet.<br>Start counting from the operator app.</div>';
    } else {
        recentEl.innerHTML = txs.map(tx =>
            '<div class="recent-count-item">' +
            '<span class="recent-count-product">' + tx.product + ' ' + tx.packSize + '</span>' +
            '<span class="recent-count-meta">' + (tx.type === 'receive' ? '+' : '-') + tx.quantity + ' · ' + (tx.date || '') + '</span>' +
            '</div>'
        ).join('');
    }

    // Build chart year filter pills from available data
    buildChartYearFilters(opData.inventory || []);

    // Apply all dashboard filters for chart rendering
    var chartInventory = filterChartInventory(opData.inventory || []);

    renderCharts(chartInventory);
}

function buildChartYearFilters(inventory) {
    var years = new Set();
    inventory.forEach(function(item) {
        if (item.productionMonth && item.productionMonth.length >= 1) {
            years.add(item.productionMonth[0]);
        }
    });
    var sortedYears = Array.from(years).sort();

    var bar = document.getElementById('chart-filter-bar');
    if (!bar) return;

    var html = '<span class="filter-label">Year:</span>';
    html += '<button class="filter-btn ' + (chartYearFilter === 'all' ? 'active' : '') + '" data-year="all" onclick="setChartYearFilter(\'all\')">All</button>';
    sortedYears.forEach(function(y) {
        html += '<button class="filter-btn ' + (chartYearFilter === y ? 'active' : '') + '" data-year="' + y + '" onclick="setChartYearFilter(\'' + y + '\')">' + y + '</button>';
    });
    html += '<span class="filter-separator"></span>';
    html += '<span class="filter-label">Month:</span>';
    html += '<select class="chart-month-select" id="chart-month-select" onchange="setChartMonthFilter(this.value)">';
    html += '<option value="all">All</option>';
    html += '<option value="A">Jan (A)</option><option value="B">Feb (B)</option><option value="C">Mar (C)</option>';
    html += '<option value="D">Apr (D)</option><option value="E">May (E)</option><option value="F">Jun (F)</option>';
    html += '<option value="G">Jul (G)</option><option value="H">Aug (H)</option><option value="I">Sep (I)</option>';
    html += '<option value="J">Oct (J)</option><option value="K">Nov (K)</option><option value="L">Dec (L)</option>';
    html += '</select>';

    bar.innerHTML = html;
    // Restore month dropdown selection
    var sel = document.getElementById('chart-month-select');
    if (sel) sel.value = chartMonthFilter;
}

function filterChartInventory(inventory) {
    return inventory.filter(function(item) {
        // Warehouse filter
        if (!selectedWarehouses.has(item.warehouse)) return false;
        // Year filter
        if (chartYearFilter !== 'all' && (!item.productionMonth || item.productionMonth[0] !== chartYearFilter)) return false;
        // Month filter
        if (chartMonthFilter !== 'all' && (!item.productionMonth || item.productionMonth.length < 2 || item.productionMonth[1] !== chartMonthFilter)) return false;
        return true;
    });
}

function renderCharts(inventory) {
    const isEmpty = inventory.length === 0;

    if (typeof Chart === 'undefined') return;

    Object.values(dashboardCharts).forEach(c => { if (c) c.destroy(); });
    dashboardCharts = {};

    if (isEmpty) {
        document.getElementById('chart-top-products').innerHTML = '<div class="empty-state"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.4;margin-bottom:16px;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg><h3>No data yet</h3><p>Start counting products from the operator app to see charts here.</p></div>';
        document.getElementById('chart-stock-by-code').innerHTML = '<div class="empty-state"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.4;margin-bottom:16px;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg><h3>No data yet</h3><p>Inventory data will appear here once you start tracking.</p></div>';
        document.getElementById('chart-expiry-distribution').innerHTML = '<div class="empty-state"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.4;margin-bottom:16px;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg><h3>No data yet</h3><p>Products with expiry dates will appear here.</p></div>';
        return;
    }

    // Chart 1: Top Products (bar chart)
    const prodTotals = {};
    inventory.forEach(item => {
        const key = item.product + ' ' + (item.packSize || '');
        prodTotals[key] = (prodTotals[key] || 0) + item.quantity;
    });
    const topProducts = Object.entries(prodTotals)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    document.getElementById('chart-top-products').innerHTML = '<canvas id="chart-top-products-canvas"></canvas>';
    dashboardCharts.topProducts = new Chart(document.getElementById('chart-top-products-canvas'), {
        type: 'bar',
        data: {
            labels: topProducts.map(d => d[0].length > 20 ? d[0].substring(0, 18) + '\u2026' : d[0]),
            datasets: [{
                label: 'Total Quantity',
                data: topProducts.map(d => d[1]),
                backgroundColor: '#00843D',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Top 10 Products by Quantity', font: { size: 13, weight: '600' }, padding: { bottom: 12 } }
            },
            scales: {
                y: { beginAtZero: true, ticks: { precision: 0 } },
                x: { ticks: { maxRotation: 45 } }
            }
        }
    });

    // Chart 2: Stock by Batch Code
    const monthTotals = {};
    inventory.forEach(item => {
        const m = item.productionMonth || 'N/A';
        monthTotals[m] = (monthTotals[m] || 0) + item.quantity;
    });
    const monthEntries = Object.entries(monthTotals).sort();

    document.getElementById('chart-stock-by-code').innerHTML = '<canvas id="chart-stock-by-code-canvas"></canvas>';
    dashboardCharts.stockByCode = new Chart(document.getElementById('chart-stock-by-code-canvas'), {
        type: 'bar',
        data: {
            labels: monthEntries.map(d => d[0]),
            datasets: [{
                label: 'Quantity',
                data: monthEntries.map(d => d[1]),
                backgroundColor: '#005A2B',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Stock by Batch Code', font: { size: 13, weight: '600' }, padding: { bottom: 12 } }
            },
            scales: {
                y: { beginAtZero: true, ticks: { precision: 0 } },
                x: { ticks: { maxRotation: 0 } }
            }
        }
    });

    // Chart 3: Expiry Distribution (doughnut)
    const expiryLevels = { critical: 0, warning: 0, notice: 0, distant: 0 };
    inventory.filter(i => i.expiryMonth).forEach(item => {
        const ml = monthsUntilExpiry(item.expiryMonth);
        const level = getExpiryLevel(ml);
        expiryLevels[level] = (expiryLevels[level] || 0) + item.quantity;
    });

    document.getElementById('chart-expiry-distribution').innerHTML = '<canvas id="chart-expiry-distribution-canvas"></canvas>';
    dashboardCharts.expiryDist = new Chart(document.getElementById('chart-expiry-distribution-canvas'), {
        type: 'doughnut',
        data: {
            labels: ['Critical \u22643mo', 'Warning 4-6mo', 'Notice 7-12mo', 'Distant 13-18mo'],
            datasets: [{
                data: [expiryLevels.critical, expiryLevels.warning, expiryLevels.notice, expiryLevels.distant],
                backgroundColor: ['#DC2626', '#F97316', '#d97706', '#2563EB'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: 'Expiry Distribution', font: { size: 13, weight: '600' }, padding: { bottom: 12 } },
                legend: { position: 'bottom', labels: { boxWidth: 12, padding: 12, font: { size: 11 } } }
            }
        }
    });
}

// ==============================
// 12M & 18M TABLE
// ==============================
let currentFilter = 'all';

function render12M(filter) {
    const tbody = document.getElementById('tbody-12m');
    const opData = loadOperatorData();

    let expiryItems = filterByWarehouse((opData.inventory || []).filter(item => item.expiryMonth).map(item => {
        const monthsLeft = monthsUntilExpiry(item.expiryMonth);
        const level = getExpiryLevel(monthsLeft);
        return {
            product: item.product,
            pack: item.packSize,
            code: item.productionMonth || '',
            expiry: item.expiryMonth,
            qty: item.quantity,
            monthsLeft,
            level,
            warehouse: item.warehouse || ''
        };
    }));

    if (filter !== 'all') {
        expiryItems = expiryItems.filter(d => d.level === filter);
    }

    expiryItems.sort((a, b) => a.monthsLeft - b.monthsLeft);
    document.getElementById('filter-count').textContent = 'Showing ' + expiryItems.length + ' items';

    if (expiryItems.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted);">' +
            (filter === 'all' ? 'No inventory data yet. Start counting from the operator app.' : 'No items match this filter.') +
            '</td></tr>';
        return;
    }

    tbody.innerHTML = expiryItems.map(d => {
        const cls = d.level === 'distant' ? '' : 'row-' + d.level;
        const badgeLabel = d.monthsLeft + 'M';
        const badgeCls = d.level === 'distant' ? 'badge-distant' : 'badge-' + d.level;
        return '<tr class="' + cls + '"><td>' + d.product + '</td><td>' + d.pack + '</td><td>' + (d.code || '\u2014') + '</td><td>' + d.expiry + '</td><td>' + d.qty + '</td><td><span class="badge ' + badgeCls + '">' + badgeLabel + '</span></td><td>' + (d.warehouse || '\u2014') + '</td></tr>';
    }).join('');
}

function filter12M(filter, btn) {
    currentFilter = filter;
    document.querySelectorAll('#screen-12m .filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    render12M(filter);
}

// ==============================
// ACTIVITY LOG
// ==============================
let currentActivityFilter = 'all';
let activityWhFilter = 'all';

function renderActivityWarehouseChips() {
    const container = document.getElementById('activity-wh-chips');
    if (!container) return;
    const chips = CONFIG.warehouses.map(w =>
        '<button class="wh-filter-chip ' + (activityWhFilter === w ? 'active' : '') + '" onclick="filterActivityWh(\'' + w + '\', this)">' + w + '</button>'
    ).join('');
    container.innerHTML = '<button class="wh-filter-chip ' + (activityWhFilter === 'all' ? 'active' : '') + '" onclick="filterActivityWh(\'all\', this)">All</button>' + chips;
}

function filterActivityWh(warehouse, btn) {
    activityWhFilter = warehouse;
    document.querySelectorAll('#screen-activity .wh-filter-chip').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderActivity(currentActivityFilter);
}

function renderActivity(filter) {
    const tbody = document.getElementById('tbody-activity');
    const opData = loadOperatorData();
    let txs = opData.transactions || [];

    if (activityWhFilter !== 'all') {
        txs = txs.filter(d => d.warehouse === activityWhFilter);
    }

    if (filter !== 'all') {
        const typeMap = { 'add': 'receive', 'sub': 'dispatch' };
        txs = txs.filter(d => d.type === typeMap[filter]);
    }

    document.getElementById('activity-count').textContent = 'Showing ' + txs.length + ' entries';

    if (txs.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text-muted);">No activity recorded yet.</td></tr>';
        return;
    }

    txs.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));

    tbody.innerHTML = txs.map(d => {
        const isAdd = d.type === 'receive';
        const typeLabel = isAdd ? '<span style="color:#16A34A;font-weight:600;">+</span>' : '<span style="color:#DC2626;font-weight:600;">\u2212</span>';
        const typeText = isAdd ? 'Addition' : 'Subtraction';
        return '<tr><td>' + (d.date || d.timestamp || '') + '</td><td>' + d.product + '</td><td>' + (d.packSize || '') + '</td><td>' + (getAgiCode(d.product, d.packSize || '') || '\u2014') + '</td><td>' + (d.productionMonth || '') + '</td><td>' + (d.warehouse || '\u2014') + '</td><td>' + typeLabel + ' ' + typeText + '</td><td>' + d.quantity + '</td><td>' + (d.operator_name || '\u2014') + '</td></tr>';
    }).join('');
}

function filterActivity(filter, btn) {
    currentActivityFilter = filter;
    document.querySelectorAll('#screen-activity .filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    renderActivity(filter);
}

// ==============================
// INVENTORY TABLE
// ==============================
function renderInventory() {
    const search = document.getElementById('inv-search').value.toLowerCase();
    const tbody = document.getElementById('tbody-inventory');
    const opData = loadOperatorData();
    let data = filterByWarehouse((opData.inventory || []).map(item => ({
        product: item.product,
        pack: item.packSize,
        prefix: '',
        code: getAgiCode(item.product, item.packSize || ''),
        prodMonth: item.productionMonth || '',
        qty: item.quantity,
        warehouse: item.warehouse || ''
    })));

    if (search) {
        data = data.filter(d => d.product.toLowerCase().includes(search) || d.code.toLowerCase().includes(search));
    }

    data.sort((a, b) => {
        const nameCmp = a.product.localeCompare(b.product);
        if (nameCmp !== 0) return nameCmp;
        const packCmp = a.pack.localeCompare(b.pack);
        if (packCmp !== 0) return packCmp;
        return a.prodMonth.localeCompare(b.prodMonth);
    });

    const groups = {};
    data.forEach(d => {
        const key = d.product + '|' + d.pack;
        if (!groups[key]) groups[key] = [];
        groups[key].push(d);
    });

    const highlighted = new Set();
    Object.values(groups).forEach(group => {
        let runningMin = group[group.length - 1].qty
        for (let i = group.length - 2; i >= 0; i--) {
            if (group[i].qty > runningMin) {
                highlighted.add(group[i].product + '|' + group[i].pack + '|' + group[i].prodMonth);
            }
            runningMin = Math.min(runningMin, group[i].qty)
        }
    });

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted);">' +
            (search ? 'No results found' : 'No inventory data yet. Start counting from the operator app.') +
            '</td></tr>';
        return;
    }

    let html = '';
    for (const key in groups) {
        const items = groups[key];
        const first = items[0];
        html += '<tr style="background:var(--table-header)"><td colspan="7" style="padding:10px 16px;font-weight:600;font-size:14px;">' + first.product + ' ' + first.pack + '</td></tr>';
        items.forEach(d => {
            const fefoClass = highlighted.has(d.product + '|' + d.pack + '|' + d.prodMonth) ? ' style="background:#FEF3C7;"' : '';
            html += '<tr' + fefoClass + '><td>' + d.product + '</td><td>' + d.pack + '</td><td>' + (d.prefix || '\u2014') + '</td><td>' + (d.code || '\u2014') + '</td><td>' + d.prodMonth + '</td><td>' + d.qty + '</td><td>' + (d.warehouse || '\u2014') + '</td></tr>';
        });
    }

    tbody.innerHTML = html;
}

// ==============================
// PRODUCTS TABLE
// ==============================
let editingIndex = -1;

function renderProducts() {
    const search = document.getElementById('prod-search').value.toLowerCase();
    const tbody = document.getElementById('tbody-products');
    let data = PRODUCTS;

    if (search) {
        data = data.filter(d => d.name.toLowerCase().includes(search) || d.prefix.toLowerCase().includes(search));
    }

    tbody.innerHTML = data.map((d, i) => {
        const originalIndex = PRODUCTS.indexOf(d);
        return '<tr><td><span class="badge badge-green">' + (d.prefix || '\u2014') + '</span></td><td>' + d.name + '</td><td>' + (d.pack || '\u2014') + '</td><td>' + (getAgiCode(d.name, d.pack) || '\u2014') + '</td><td><button class="action-btn" onclick="editProduct(' + originalIndex + ')">Edit</button> <button class="action-btn danger" onclick="deleteProduct(' + originalIndex + ')">Delete</button></td></tr>';
    }).join('');
}

function openProductModal(idx) {
    editingIndex = idx !== undefined ? idx : -1;
    document.getElementById('modal-title').textContent = editingIndex >= 0 ? 'Edit Product' : 'Add Product';
    if (editingIndex >= 0) {
        const p = PRODUCTS[editingIndex];
        document.getElementById('modal-name').value = p.name;
        document.getElementById('modal-pack').value = p.pack;
        document.getElementById('modal-prefix').value = p.prefix;
        document.getElementById('modal-agi').value = getAgiCode(p.name, p.pack);
    } else {
        document.getElementById('modal-name').value = '';
        document.getElementById('modal-pack').value = '';
        document.getElementById('modal-prefix').value = 'SCH';
        document.getElementById('modal-agi').value = '';
    }
    document.getElementById('product-modal').classList.add('open');
}

function closeProductModal() {
    document.getElementById('product-modal').classList.remove('open');
}

function saveProduct() {
    const name = document.getElementById('modal-name').value.trim();
    const pack = document.getElementById('modal-pack').value.trim();
    const prefix = document.getElementById('modal-prefix').value;
    const agi = document.getElementById('modal-agi').value.trim();
    if (!name) { alert('Product name is required'); return; }

    if (editingIndex >= 0) {
        const old = PRODUCTS[editingIndex];
        if (old.name !== name || old.pack !== pack) {
            const oldKey = old.name + '|' + (old.pack || '');
            const codes = JSON.parse(localStorage.getItem('product-agi-codes') || '{}');
            delete codes[oldKey];
            localStorage.setItem('product-agi-codes', JSON.stringify(codes));
        }
        PRODUCTS[editingIndex] = { name, pack, prefix };
    } else {
        PRODUCTS.push({ name, pack, prefix });
    }
    setAgiCode(name, pack, agi);
    localStorage.setItem('custom-products', JSON.stringify(PRODUCTS));
    closeProductModal();
    renderProducts();
    syncProducts();
}

function editProduct(idx) {
    openProductModal(idx);
}

function deleteProduct(idx) {
    if (!confirm('Delete ' + PRODUCTS[idx].name + ' ' + PRODUCTS[idx].pack + '?')) return;
    const old = PRODUCTS[idx];
    const oldKey = old.name + '|' + (old.pack || '');
    const codes = JSON.parse(localStorage.getItem('product-agi-codes') || '{}');
    delete codes[oldKey];
    localStorage.setItem('product-agi-codes', JSON.stringify(codes));
    PRODUCTS.splice(idx, 1);
    localStorage.setItem('custom-products', JSON.stringify(PRODUCTS));
    renderProducts();
    syncProducts();
}

// ==============================
// CSV EXPORT HELPERS
// ==============================
function downloadCSV(csv, filename) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

function exportExcel() {
    const opData = loadOperatorData();
    let data = filterByWarehouse((opData.inventory || []).filter(item => item.expiryMonth)).map(item => {
        const monthsLeft = monthsUntilExpiry(item.expiryMonth);
        const level = getExpiryLevel(monthsLeft);
        return { product: item.product, pack: item.packSize, code: item.productionMonth || '', expiry: item.expiryMonth, qty: item.quantity, monthsLeft, range: monthsLeft <= 12 ? '12m' : '18m', warehouse: item.warehouse || '' };
    });
    let csv = 'Product,Pack,Code,Expiry,Qty,Months Left,Range,Warehouse\n';
    data.forEach(d => { csv += d.product + ',' + d.pack + ',' + d.code + ',' + d.expiry + ',' + d.qty + ',' + d.monthsLeft + ',' + d.range + ',' + d.warehouse + '\n'; });
    downloadCSV(csv, 'Expiry_Report_' + new Date().toISOString().slice(0, 10) + '.csv');
}

function exportDashboard() {
    const opData = loadOperatorData();
    const data = filterByWarehouse((opData.inventory || []).filter(item => item.expiryMonth)).map(item => {
        const monthsLeft = monthsUntilExpiry(item.expiryMonth);
        return { product: item.product, pack: item.packSize, code: item.productionMonth || '', expiry: item.expiryMonth, qty: item.quantity, monthsLeft, level: getExpiryLevel(monthsLeft), range: monthsLeft <= 12 ? '12m' : '18m', warehouse: item.warehouse || '' };
    });
    let csv = 'Product,Pack,Code,Expiry,Qty,Months Left,Level,Range,Warehouse\n';
    data.forEach(d => { csv += d.product + ',' + d.pack + ',' + d.code + ',' + d.expiry + ',' + d.qty + ',' + d.monthsLeft + ',' + d.level + ',' + d.range + ',' + d.warehouse + '\n'; });
    downloadCSV(csv, 'Dashboard_Expiry_' + new Date().toISOString().slice(0, 10) + '.csv');
}

function exportInventory() {
    const opData = loadOperatorData();
    const data = filterByWarehouse(opData.inventory || []).map(item => ({
        product: item.product, pack: item.packSize, prefix: '', code: item.productionMonth || '', prodMonth: item.productionMonth || '', qty: item.quantity, warehouse: item.warehouse || ''
    }));
    let csv = 'Product,Pack,Prefix,Code,Prod Month,Qty,Warehouse\n';
    data.forEach(d => { csv += d.product + ',' + d.pack + ',' + d.prefix + ',' + d.code + ',' + d.prodMonth + ',' + d.qty + ',' + d.warehouse + '\n'; });
    downloadCSV(csv, 'Inventory_' + new Date().toISOString().slice(0, 10) + '.csv');
}

function exportActivity() {
    const opData = loadOperatorData();
    const filtered = filterByWarehouse(opData.transactions || []);
    let csv = 'Date & Time,Product,Pack,AGI Code,Code,Warehouse,Type,Qty,Operator\n';
    filtered.forEach(d => {
        const typeText = d.type === 'receive' ? 'Addition' : 'Subtraction';
        csv += (d.date || '') + ',' + d.product + ',' + (d.packSize || '') + ',' + (getAgiCode(d.product, d.packSize || '') || '') + ',' + (d.productionMonth || '') + ',' + (d.warehouse || '') + ',' + typeText + ',' + d.quantity + ',' + (d.operator_name || '') + '\n';
    });
    downloadCSV(csv, 'Activity_Log_' + new Date().toISOString().slice(0, 10) + '.csv');
}

function exportProducts() {
    let csv = 'Prefix,Product Name,Pack Size,AGI Code\n';
    PRODUCTS.forEach(d => {
        csv += (d.prefix || '\u2014') + ',' + d.name + ',' + (d.pack || '\u2014') + ',' + (getAgiCode(d.name, d.pack) || '') + '\n';
    });
    downloadCSV(csv, 'Products_' + new Date().toISOString().slice(0, 10) + '.csv');
}

// ==============================
// DRILLDOWN
// ==============================
const DRILLDOWN_LABELS = { critical: 'Expiring \u22643mo', warning: 'Expiring 4-6mo', notice: 'Expiring 7-12mo', distant: 'Expiring 13-18mo' };

function showDrilldown(level) {
    const opData = loadOperatorData();
    const data = filterByWarehouse((opData.inventory || []).filter(item => item.expiryMonth).map(item => {
        const monthsLeft = monthsUntilExpiry(item.expiryMonth);
        return { product: item.product, pack: item.packSize, code: item.productionMonth || '', expiry: item.expiryMonth, qty: item.quantity, monthsLeft, level: getExpiryLevel(monthsLeft), warehouse: item.warehouse || '' };
    })).filter(d => d.level === level);

    document.getElementById('drilldown-title').textContent = DRILLDOWN_LABELS[level] + ' (' + data.length + ' items)';
    const tbody = document.getElementById('tbody-drilldown');

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--text-muted);">No items in this category</td></tr>';
    } else {
        tbody.innerHTML = data.map(d => {
            const cls = d.level === 'distant' ? '' : 'row-' + d.level;
            const badgeLabel = d.monthsLeft + 'M';
            const badgeCls = d.level === 'distant' ? 'badge-distant' : 'badge-' + d.level;
            return '<tr class="' + cls + '"><td>' + d.product + '</td><td>' + d.pack + '</td><td>' + d.code + '</td><td>' + d.expiry + '</td><td>' + d.qty + '</td><td><span class="badge ' + badgeCls + '">' + badgeLabel + '</span></td><td>' + (d.warehouse || '\u2014') + '</td></tr>';
        }).join('');
    }

    document.getElementById('drilldown-modal').classList.add('open');
}

function closeDrilldown() {
    document.getElementById('drilldown-modal').classList.remove('open');
}

// ==============================
// SETTINGS
// ==============================
function populateYearSelects() {
    const yearNow = new Date().getFullYear();
    const expiryStart = document.getElementById('setting-expiry-start');
    const expiryEnd = document.getElementById('setting-expiry-end');
    const prodStart = document.getElementById('setting-prod-start');
    const prodEnd = document.getElementById('setting-prod-end');

    [expiryStart, expiryEnd].forEach(sel => { sel.innerHTML = ''; });
    for (let y = yearNow - 1; y <= yearNow + 10; y++) {
        const o1 = new Option(y, y);
        const o2 = new Option(y, y);
        expiryStart.appendChild(o1);
        expiryEnd.appendChild(o2);
    }
    expiryStart.value = CONFIG.expiryYears.start;
    expiryEnd.value = CONFIG.expiryYears.end;

    [prodStart, prodEnd].forEach(sel => { sel.innerHTML = ''; });
    for (let y = 4; y <= 9; y++) {
        const o1 = new Option(y + ' (' + (2020 + y) + ')', y);
        const o2 = new Option(y + ' (' + (2020 + y) + ')', y);
        prodStart.appendChild(o1);
        prodEnd.appendChild(o2);
    }
    prodStart.value = CONFIG.prodYears.start;
    prodEnd.value = CONFIG.prodYears.end;
}

function updateSettingsPreviews() {
    const sy = parseInt(document.getElementById('setting-expiry-start').value);
    const ey = parseInt(document.getElementById('setting-expiry-end').value);
    const years = [];
    for (let y = sy; y <= ey; y++) years.push(y);
    document.getElementById('expiry-preview').textContent = years.join(', ');

    const ps = parseInt(document.getElementById('setting-prod-start').value);
    const pe = parseInt(document.getElementById('setting-prod-end').value);
    const prodYears = [];
    for (let y = ps; y <= pe; y++) prodYears.push(y + ' (' + (2020 + y) + ')');
    document.getElementById('prod-preview').textContent = prodYears.join(', ');
}

function renderSettings() {
    renderOperatorPinList();
    populateYearSelects();
    updateSettingsPreviews();
    renderWarehouseList();

    document.querySelectorAll('#screen-settings select').forEach(sel => {
        sel.onchange = updateSettingsPreviews;
    });
}

function renderOperatorPinList() {
    const list = document.getElementById('operator-pin-list');
    const whSelect = document.getElementById('new-op-warehouse');
    if (whSelect) {
        whSelect.innerHTML = CONFIG.warehouses.map(w => '<option value="' + w + '">' + w + '</option>').join('');
    }
    if (!CONFIG.operatorPins) CONFIG.operatorPins = [];
    list.innerHTML = CONFIG.operatorPins.length === 0
        ? '<div style="font-size:13px;color:var(--text-muted);padding:8px 0;">No operators configured. Add one below to enable login.</div>'
        : CONFIG.operatorPins.map((op, i) =>
            '<div class="settings-wh-row">' +
            '<span class="wh-name">' + op.name + ' \u2014 <code>' + op.pin + '</code> \u2014 ' + (op.warehouse || CONFIG.warehouses[0]) + '</span>' +
            '<button class="wh-remove" onclick="removeOperatorPin(' + i + ')">Remove</button>' +
            '</div>'
        ).join('');
}

function addOperatorPin() {
    const nameEl = document.getElementById('new-op-name');
    const pinEl = document.getElementById('new-op-pin');
    const whEl = document.getElementById('new-op-warehouse');
    const name = nameEl.value.trim();
    const pin = pinEl.value.trim();
    const warehouse = whEl ? whEl.value : CONFIG.warehouses[0];
    if (!name) { alert('Enter operator name'); return; }
    if (!pin || pin.length < 4 || isNaN(pin)) { alert('Enter a valid 4-digit PIN'); return; }
    if (CONFIG.operatorPins.some(op => op.pin === pin)) { alert('PIN already exists'); return; }
    CONFIG.operatorPins.push({ name, pin, warehouse });
    saveConfig(CONFIG);
    nameEl.value = '';
    pinEl.value = '';
    renderOperatorPinList();
}

function removeOperatorPin(idx) {
    if (!confirm('Remove operator "' + CONFIG.operatorPins[idx].name + '"?')) return;
    CONFIG.operatorPins.splice(idx, 1);
    saveConfig(CONFIG);
    renderOperatorPinList();
}

function saveExpiryYears() {
    const start = parseInt(document.getElementById('setting-expiry-start').value);
    const end = parseInt(document.getElementById('setting-expiry-end').value);
    if (start >= end) { alert('End year must be after start year'); return; }
    CONFIG.expiryYears = { start, end };
    saveConfig(CONFIG);
    document.getElementById('expiry-save-msg').style.display = 'inline';
    setTimeout(() => document.getElementById('expiry-save-msg').style.display = 'none', 2000);
}

function saveProdYears() {
    const start = parseInt(document.getElementById('setting-prod-start').value);
    const end = parseInt(document.getElementById('setting-prod-end').value);
    if (start >= end) { alert('End year must be after start year'); return; }
    CONFIG.prodYears = { start, end };
    saveConfig(CONFIG);
    document.getElementById('prod-save-msg').style.display = 'inline';
    setTimeout(() => document.getElementById('prod-save-msg').style.display = 'none', 2000);
}

function renderWarehouseList() {
    const list = document.getElementById('warehouse-list');
    list.innerHTML = CONFIG.warehouses.map((w, i) =>
        '<div class="settings-wh-row"><span class="wh-name">' + w + '</span>' +
        '<div style="display:flex;gap:6px;">' +
        '<button class="wh-delete-data" onclick="clearLocalDataForWarehouse(\'' + w.replace(/'/g, "\\'") + '\')">Delete Data</button>' +
        '<button class="wh-remove" onclick="removeWarehouse(' + i + ')">Remove</button></div></div>'
    ).join('');
}

function addWarehouse() {
    const input = document.getElementById('new-warehouse');
    const name = input.value.trim();
    if (!name) return;
    if (CONFIG.warehouses.includes(name)) { alert('Warehouse already exists'); return; }
    CONFIG.warehouses.push(name);
    saveConfig(CONFIG);
    input.value = '';
    renderWarehouseList();
}

function removeWarehouse(idx) {
    if (CONFIG.warehouses.length <= 1) { alert('Must have at least one warehouse'); return; }
    if (!confirm('Remove "' + CONFIG.warehouses[idx] + '"?')) return;
    CONFIG.warehouses.splice(idx, 1);
    saveConfig(CONFIG);
    renderWarehouseList();
}

function resetConfig() {
    if (!confirm('Reset all settings to defaults?')) return;
    localStorage.removeItem('shelf-life-config');
    CONFIG = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    selectedWarehouses = new Set(CONFIG.warehouses);
    renderSettings();
    rebuildWarehouseChips();
}

// ==============================
// DANGER ZONE: Clear data actions
// ==============================
function clearLocalData() {
    if (!confirm('Delete ALL local data (inventory, transactions) from this browser? This cannot be undone.')) return;
    if (!confirm('Are you sure? All counting data will be permanently removed from this device.')) return;
    localStorage.removeItem('operator-data');
    document.querySelectorAll('.admin-screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-dashboard').classList.add('active');
    renderDashboard();
    render12M('all');
    renderInventory();
    renderActivity('all');
    renderProducts();
    alert('Local data cleared. Note: auto-sync may re-download data from the cloud. Use "Clear Supabase Data" first to fully reset.');
}

function clearLocalDataForWarehouse(warehouse) {
    if (!confirm('Delete all local data for "' + warehouse + '"? This cannot be undone.')) return;
    try {
        var raw = localStorage.getItem('operator-data');
        if (!raw) { alert('No local data found.'); return; }
        var data = JSON.parse(raw);
        data.transactions = (data.transactions || []).filter(function(t) { return t.warehouse !== warehouse; });
        data.inventory = (data.inventory || []).filter(function(i) { return i.warehouse !== warehouse; });
        localStorage.setItem('operator-data', JSON.stringify(data));
        renderAll();
        alert('Cleared local data for "' + warehouse + '".');
    } catch (e) {
        alert('Error clearing data: ' + e.message);
    }
}

function clearSupabaseData() {
    if (!confirm('Delete ALL data from Supabase cloud? This will clear tables: transactions, inventory, config.')) return;
    if (!confirm('FINAL WARNING: This removes ALL data from the cloud database. Continue?')) return;

    var client = window.syncManager && window.syncManager.supabase;
    if (!client) {
        alert('Supabase not connected. Data may already be cleared, or the app needs a reload.');
        return;
    }

    var btn = document.querySelector('button[onclick*="clearSupabaseData"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Clearing...'; }

    client.rpc('clear_all_data_rpc').then(function(result) {
        if (result.error) {
            alert('Failed to clear: ' + (result.error.message || JSON.stringify(result.error)));
            console.warn('Clear error:', result.error);
        } else {
            alert('All Supabase data cleared successfully! Re-saving config and products.');
            localStorage.removeItem('operator-data');
            CONFIG._lastReset = Date.now();
            saveConfig(CONFIG);
            syncProducts();
        }
    }).catch(function(e) {
        alert('Failed to clear: ' + (e.message || e));
    }).finally(function() {
        if (btn) { btn.disabled = false; btn.textContent = 'Clear Supabase Data'; }
    });
}

// ==============================
// INIT
// ==============================
function renderAll() {
    CONFIG = loadConfig();
    selectedWarehouses = new Set(CONFIG.warehouses);
    rebuildWarehouseChips();
    renderDashboard();
    render12M('all');
    renderInventory();
    renderActivityWarehouseChips();
    renderActivity('all');
    renderProducts();
    renderSettings();
    updateClock();
    setInterval(updateClock, 60000);
}

function initApp() {
    renderAll(); // Show localStorage data immediately before async pull
    if (window.syncManager) {
        window.syncManager.init();
        (window.syncManager.pullConfig ? window.syncManager.pullConfig() : Promise.resolve()).then(function() {
            if (window.syncManager.pullFromSupabase) {
                return window.syncManager.pullFromSupabase().then(function() {
                    renderAll();
                    startAutoRefresh();
                });
            }
            renderAll();
            startAutoRefresh();
        });
    } else {
        renderAll();
    }
}

var _refreshInterval = null;
function startAutoRefresh() {
    if (_refreshInterval) clearInterval(_refreshInterval);
    _refreshInterval = setInterval(function() {
        if (window.syncManager && window.syncManager.pullFromSupabase) {
            window.syncManager.pullFromSupabase().then(function() {
                refreshCurrentScreen();
            });
        }
    }, 15000);
}

function manualRefresh() {
    if (window.syncManager && window.syncManager.pullFromSupabase) {
        window.syncManager.pullFromSupabase().then(function() {
            refreshCurrentScreen();
        });
    }
}

// Close modal on overlay click
document.getElementById('product-modal').addEventListener('click', function(e) {
    if (e.target === this) closeProductModal();
});
document.getElementById('drilldown-modal').addEventListener('click', function(e) {
    if (e.target === this) closeDrilldown();
});

// Initialize sync manager
document.addEventListener('DOMContentLoaded', () => {
    if (window.syncManager) {
        window.syncManager.init();
        window.syncManager.onSync(() => {
            if (document.getElementById('screen-dashboard').classList.contains('active')) renderDashboard();
            if (document.getElementById('screen-12m').classList.contains('active')) render12M(currentFilter);
            if (document.getElementById('screen-inventory').classList.contains('active')) renderInventory();
            if (document.getElementById('screen-activity').classList.contains('active')) { renderActivityWarehouseChips(); renderActivity(currentActivityFilter); }
        });
    }
});

// Auto-refresh when operator saves data in another tab
window.addEventListener('storage', function(e) {
    if (e.key === 'operator-data') {
        if (document.getElementById('screen-dashboard').classList.contains('active')) renderDashboard();
        if (document.getElementById('screen-12m').classList.contains('active')) render12M(currentFilter);
        if (document.getElementById('screen-inventory').classList.contains('active')) renderInventory();
        if (document.getElementById('screen-activity').classList.contains('active')) { renderActivityWarehouseChips(); renderActivity(currentActivityFilter); }
    }
});

// Initialize app (gated by password)
if (checkAdminAuth()) {
    initApp();
}
