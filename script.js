// Crop items we want to track from the Bazaar
const GARDEN_CROPS = {
    'WHEAT': '🌾 Wheat',
    'CARROT_ITEM': '🥕 Carrot',
    'POTATO_ITEM': '🥔 Potato',
    'PUMPKIN': '🎃 Pumpkin',
    'MELON': '🍈 Melon',
    'COCOA_BEANS': '🍫 Cocoa Beans',
    'SUGAR_CANE': '🌿 Sugar Cane',
    'NETHER_STALK': '🍄 Nether Wart',
    'CACTUS': '🌵 Cactus',
};

// Also track some enchanted/valuable garden items
const EXTRA_ITEMS = {
    'ENCHANTED_CARROT': '✨ Ench. Carrot',
    'ENCHANTED_POTATO': '✨ Ench. Potato',
    'ENCHANTED_PUMPKIN': '✨ Ench. Pumpkin',
    'ENCHANTED_MELON': '✨ Ench. Melon',
    'ENCHANTED_SUGAR': '✨ Ench. Sugar',
    'ENCHANTED_COCOA': '✨ Ench. Cocoa',
    'ENCHANTED_CACTUS_GREEN': '✨ Ench. Cactus Green',
    'ENCHANTED_NETHER_STALK': '✨ Ench. Nether Wart',
};

let bazaarData = {};

// Fetch Bazaar data from Hypixel API
async function fetchBazaarData() {
    try {
        const response = await fetch('https://api.hypixel.net/v2/skyblock/bazaar');
        const data = await response.json();

        if (data.success) {
            bazaarData = data.products;
            displayPrices();
            updateCropInfoPrices();
            document.getElementById('loading').style.display = 'none';
        } else {
            document.getElementById('loading').textContent = 'Failed to load prices. Try refreshing.';
        }
    } catch (error) {
        console.error('Error fetching bazaar data:', error);
        document.getElementById('loading').textContent = 'Error loading prices. API might be down.';
    }
}

// Display prices in the grid
function displayPrices() {
    const grid = document.getElementById('prices-grid');
    grid.innerHTML = '';

    // Combine both crop lists
    const allItems = { ...GARDEN_CROPS, ...EXTRA_ITEMS };

    for (const [itemId, displayName] of Object.entries(allItems)) {
        const product = bazaarData[itemId];
        if (!product) continue;

        const buyPrice = product.quick_status.buyPrice;
        const sellPrice = product.quick_status.sellPrice;

        const card = document.createElement('div');
        card.className = 'price-card';
        card.innerHTML = `
            <h3>${displayName}</h3>
            <p class="label">Instant Buy (you pay):</p>
            <p class="buy-price">${formatCoins(buyPrice)}</p>
            <p class="label">Instant Sell (you earn):</p>
            <p class="sell-price">${formatCoins(sellPrice)}</p>
        `;
        grid.appendChild(card);
    }
}

// Update the crop info section with prices
function updateCropInfoPrices() {
    for (const [itemId, displayName] of Object.entries(GARDEN_CROPS)) {
        const el = document.getElementById(`info-${itemId}`);
        if (el && bazaarData[itemId]) {
            const sellPrice = bazaarData[itemId].quick_status.sellPrice;
            el.textContent = `💰 Sell Price: ${formatCoins(sellPrice)}`;
        }
    }
}

// Format coins nicely
function formatCoins(amount) {
    if (amount >= 1000000) {
        return `${(amount / 1000000).toFixed(2)}M coins`;
    } else if (amount >= 1000) {
        return `${(amount / 1000).toFixed(2)}K coins`;
    }
    return `${amount.toFixed(1)} coins`;
}

// Profit calculator
function calculateProfit() {
    const cropId = document.getElementById('crop-select').value;
    const amount = parseInt(document.getElementById('amount').value);
    const resultDiv = document.getElementById('calc-result');

    if (!bazaarData[cropId]) {
        resultDiv.innerHTML = '<span style="color: #ff6b6b;">Price data not loaded yet!</span>';
        return;
    }

    if (isNaN(amount) || amount <= 0) {
        resultDiv.innerHTML = '<span style="color: #ff6b6b;">Enter a valid amount!</span>';
        return;
    }

    const sellPrice = bazaarData[cropId].quick_status.sellPrice;
    const totalProfit = sellPrice * amount;

    resultDiv.innerHTML = `
        <p>📦 <strong>${amount.toLocaleString()}</strong> × <strong>${GARDEN_CROPS[cropId]}</strong></p>
        <p>💰 Price per unit: <strong>${formatCoins(sellPrice)}</strong></p>
        <p style="font-size: 1.3rem; color: #4CAF50; margin-top: 0.5rem;">
            💵 Total: <strong>${formatCoins(totalProfit)}</strong>
        </p>
    `;
}

// Fetch data on page load
fetchBazaarData();

// Refresh prices every 60 seconds
setInterval(fetchBazaarData, 60000);