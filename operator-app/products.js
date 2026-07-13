// Product Master Data - 69 SKUs
// Format: { name, packSize, prefix }
const PRODUCTS = [
    // SCH Products
    { name: "Actara", packSize: "5g", prefix: "SCH" },
    { name: "Amistar", packSize: "50ml", prefix: "SCH" },
    { name: "Amistar", packSize: "100ml", prefix: "SCH" },
    { name: "Amistar", packSize: "500ml", prefix: "SCH" },
    { name: "Alika", packSize: "50ml", prefix: "SCH" },
    { name: "Armure", packSize: "100ml", prefix: "SCH" },
    { name: "Bingo", packSize: "100g", prefix: "SCH" },
    { name: "Bingo", packSize: "500g", prefix: "SCH" },
    { name: "Denim Fit", packSize: "10g", prefix: "SCH" },
    { name: "Filia", packSize: "50ml", prefix: "SCH" },
    { name: "Filia", packSize: "100ml", prefix: "SCH" },
    { name: "Filia", packSize: "500ml", prefix: "SCH" },
    { name: "Grozin", packSize: "1kg", prefix: "SCH" },
    { name: "Grozin", packSize: "2kg", prefix: "SCH" },
    { name: "Incipio", packSize: "40ml", prefix: "SCH" },
    { name: "Incipio", packSize: "100ml", prefix: "SCH" },
    { name: "Karate", packSize: "50ml", prefix: "SCH" },
    { name: "Karate", packSize: "100ml", prefix: "SCH" },
    { name: "Karate", packSize: "500ml", prefix: "SCH" },
    { name: "Lanirat", packSize: "100g", prefix: "SCH" },
    { name: "Magma", packSize: "1kg", prefix: "SCH" },
    { name: "Magma", packSize: "2kg", prefix: "SCH" },
    { name: "Miravis Duo", packSize: "50ml", prefix: "SCH" },
    { name: "Miravis Duo", packSize: "100ml", prefix: "SCH" },
    { name: "Pegasus", packSize: "50ml", prefix: "SCH" },
    { name: "Pegasus", packSize: "100ml", prefix: "SCH" },
    { name: "Proclam", packSize: "10g", prefix: "SCH" },
    { name: "Proclam", packSize: "30g", prefix: "SCH" },
    { name: "Revus", packSize: "50ml", prefix: "SCH" },
    { name: "Revus", packSize: "100ml", prefix: "SCH" },
    { name: "Ridomil", packSize: "100g", prefix: "SCH" },
    { name: "Ridomil", packSize: "500g", prefix: "SCH" },
    { name: "Rifit", packSize: "100ml", prefix: "SCH" },
    { name: "Rifit", packSize: "500ml", prefix: "SCH" },
    { name: "Score", packSize: "50ml", prefix: "SCH" },
    { name: "Score", packSize: "100ml", prefix: "SCH" },
    { name: "Score", packSize: "500ml", prefix: "SCH" },
    { name: "Shobicron", packSize: "50ml", prefix: "SCH" },
    { name: "Shobicron", packSize: "100ml", prefix: "SCH" },
    { name: "Shobicron", packSize: "500ml", prefix: "SCH" },
    { name: "Silika", packSize: "1kg", prefix: "SCH" },
    { name: "Silika", packSize: "2kg", prefix: "SCH" },
    { name: "Thiovit", packSize: "1kg", prefix: "SCH" },
    { name: "Thiovit", packSize: "2kg", prefix: "SCH" },
    { name: "Tilt", packSize: "50ml", prefix: "SCH" },
    { name: "Tilt", packSize: "100ml", prefix: "SCH" },
    { name: "Tilt", packSize: "500ml", prefix: "SCH" },
    { name: "Vestoria", packSize: "15g", prefix: "SCH" },
    { name: "Vertimec", packSize: "50ml", prefix: "SCH" },
    { name: "Vertimec", packSize: "100ml", prefix: "SCH" },
    { name: "Vertimec", packSize: "500ml", prefix: "SCH" },
    { name: "Virtako", packSize: "10g", prefix: "SCH" },
    { name: "Virtako", packSize: "30g", prefix: "SCH" },
    { name: "Voliam", packSize: "50ml", prefix: "SCH" },
    { name: "Plenum", packSize: "50g", prefix: "SCH" },

    // Non-SCH Products
    { name: "Atresia", packSize: "50ml", prefix: "JAK" },
    { name: "Cruiser", packSize: "20g", prefix: "SPL" },
    { name: "Caliber", packSize: "100g", prefix: "EC" },
    { name: "Caliber", packSize: "500g", prefix: "EC" },
    { name: "Gayte", packSize: "100g", prefix: "BG" },
    { name: "Jazz", packSize: "100g", prefix: "DKC" },
    { name: "Jazz", packSize: "500g", prefix: "DKC" },
    { name: "Jazz", packSize: "1kg", prefix: "DKC" },
    { name: "Laser", packSize: "25g", prefix: "RB" },
    { name: "Protozim", packSize: "50ml", prefix: "BWL" },
    { name: "Protozim", packSize: "100ml", prefix: "BWL" },
    { name: "Protozim", packSize: "500ml", prefix: "BWL" },

    // No Prefix Products
    { name: "PJ-16", packSize: "", prefix: "" },
    { name: "XP-16", packSize: "", prefix: "" }
];

// Helper: Get unique product names
function getUniqueProductNames() {
    const names = [...new Set(PRODUCTS.map(p => p.name))];
    return names.sort();
}

// Helper: Get pack sizes for a product name
function getPackSizes(productName) {
    return PRODUCTS.filter(p => p.name === productName);
}

// Helper: Find product by name and pack size
function findProduct(name, packSize) {
    return PRODUCTS.find(p => p.name === name && p.packSize === packSize);
}

// Helper: Filter products by search term
function filterProducts(searchTerm, selectedProduct) {
    let filtered = PRODUCTS;

    // Filter by selected product (Excel-like filter)
    if (selectedProduct) {
        filtered = filtered.filter(p => p.name === selectedProduct);
    }

    // Filter by search term - matches START of name only
    if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(p => {
            const name = p.name.toLowerCase();
            const pack = p.packSize.toLowerCase();
            // Match if name STARTS WITH search term
            return name.startsWith(term) || pack.startsWith(term);
        });
    }

    return filtered;
}
