// Shared Bazaar data and price history for the app
let bazaarData = {};
let priceHistory = {};

async function fetchBazaarData() {
    try {
        const response = await fetch('https://api.hypixel.net/v2/skyblock/bazaar');
        const data = await response.json();

        if (data.success) {
            bazaarData = data.products;
            storePriceHistory();
            displayPrices();
            updateCropInfoPrices();
            document.getElementById('loading').style.display = 'none';
        } else {
            document.getElementById('loading').textContent = 'Failed to load. Refresh page.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loading').textContent = 'API error. Try refreshing.';
    }
}

function storePriceHistory() {
    const timestamp = Date.now();
    const tenDaysAgo = timestamp - (10 * 24 * 60 * 60 * 1000);

    for (const itemId of Object.keys({...GARDEN_CROPS, ...EXTRA_ITEMS})) {
        if (bazaarData[itemId]) {
            if (!priceHistory[itemId]) priceHistory[itemId] = [];

            priceHistory[itemId].push({
                time: timestamp,
                sellPrice: bazaarData[itemId].quick_status.sellPrice,
                buyPrice: bazaarData[itemId].quick_status.buyPrice
            });

            priceHistory[itemId] = priceHistory[itemId].filter(p => p.time > tenDaysAgo);
        }
    }

    try {
        localStorage.setItem('priceHistory', JSON.stringify(priceHistory));
    } catch (e) {
        console.warn('Could not save price history to localStorage');
    }
}

function loadPriceHistory() {
    try {
        const stored = localStorage.getItem('priceHistory');
        if (stored) priceHistory = JSON.parse(stored);
    } catch (e) {
        console.warn('Could not load price history from localStorage');
    }
}
