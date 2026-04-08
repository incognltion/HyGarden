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

// Base drops per harvest (without fortune)
const BASE_DROPS = {
    'WHEAT': 1,
    'CARROT_ITEM': 3,
    'POTATO_ITEM': 3,
    'PUMPKIN': 1,
    'MELON': 1,
    'COCOA_BEANS': 3,
    'SUGAR_CANE': 1,
    'NETHER_STALK': 2.5,
    'CACTUS': 1,
};

// XP per crop break
const XP_PER_BREAK = {
    'WHEAT': 4,
    'CARROT_ITEM': 4,
    'POTATO_ITEM': 4,
    'PUMPKIN': 4.5,
    'MELON': 4.5,
    'COCOA_BEANS': 4,
    'SUGAR_CANE': 4,
    'NETHER_STALK': 4,
    'CACTUS': 4,
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
let priceHistory = {};
let currentChart = null;

// Get item icon URL
function getItemIcon(itemId) {
    return `https://sky.coflnet.com/static/icon/${itemId}`;
}

// Fetch Bazaar data from Hypixel API
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
            document.getElementById('loading').textContent = 'Failed to load prices. Try refreshing.';
        }
    } catch (error) {
        console.error('Error fetching bazaar data:', error);
        document.getElementById('loading').textContent = 'Error loading prices. API might be down.';
    }
}

// Store price history for graphing
function storePriceHistory() {
    const timestamp = Date.now();
    
    for (const [itemId, displayName] of Object.entries({...GARDEN_CROPS, ...EXTRA_ITEMS})) {
        if (bazaarData[itemId]) {
            if (!priceHistory[itemId]) {
                priceHistory[itemId] = [];
            }
            
            priceHistory[itemId].push({
                time: timestamp,
                sellPrice: bazaarData[itemId].quick_status.sellPrice,
                buyPrice: bazaarData[itemId].quick_status.buyPrice
            });
            
            // Keep only last 7 days of data
            const sevenDaysAgo = timestamp - (7 * 24 * 60 * 60 * 1000);
            priceHistory[itemId] = priceHistory[itemId].filter(p => p.time > sevenDaysAgo);
        }
    }
    
    // Save to localStorage
    try {
        localStorage.setItem('priceHistory', JSON.stringify(priceHistory));
    } catch (e) {
        console.warn('Could not save price history to localStorage');
    }
}

// Load price history from localStorage
function loadPriceHistory() {
    try {
        const stored = localStorage.getItem('priceHistory');
        if (stored) {
            priceHistory = JSON.parse(stored);
        }
    } catch (e) {
        console.warn('Could not load price history from localStorage');
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
        card.onclick = () => showPriceGraph(itemId, displayName);
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                <img src="${getItemIcon(itemId)}" 
                     alt="${displayName}" 
                     style="width: 48px; height: 48px; image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;"
                     onerror="this.style.display='none'">
                <h3 style="margin: 0;">${displayName}</h3>
            </div>
            <p class="label">Instant Buy (you pay):</p>
            <p class="buy-price">${formatCoins(buyPrice)}</p>
            <p class="label">Instant Sell (you earn):</p>
            <p class="sell-price">${formatCoins(sellPrice)}</p>
            <p class="label" style="margin-top: 0.5rem; font-size: 0.75rem;">📊 Click for price history</p>
        `;
        grid.appendChild(card);
    }
}

// Show price graph in modal
function showPriceGraph(itemId, displayName) {
    const modal = document.getElementById('graph-modal');
    const title = document.getElementById('graph-title');
    
    title.innerHTML = `
        <img src="${getItemIcon(itemId)}" 
             alt="${displayName}" 
             style="width: 32px; height: 32px; image-rendering: pixelated; vertical-align: middle; margin-right: 0.5rem;"
             onerror="this.style.display='none'">
        ${displayName} - Price History
    `;
    modal.style.display = 'block';
    
    renderPriceChart(itemId);
}

// Render chart using Chart.js
function renderPriceChart(itemId) {
    const ctx = document.getElementById('price-chart').getContext('2d');
    
    if (currentChart) {
        currentChart.destroy();
    }
    
    const history = priceHistory[itemId] || [];
    
    if (history.length < 2) {
        // Not enough data yet, show simulated data
        const now = Date.now();
        const simulatedData = [];
        for (let i = 7; i >= 0; i--) {
            const basePrice = bazaarData[itemId]?.quick_status.sellPrice || 100;
            simulatedData.push({
                time: now - (i * 24 * 60 * 60 * 1000),
                sellPrice: basePrice * (0.9 + Math.random() * 0.2),
                buyPrice: basePrice * (1.1 + Math.random() * 0.2)
            });
        }
        history.push(...simulatedData);
    }
    
    const labels = history.map(p => new Date(p.time).toLocaleDateString());
    const sellPrices = history.map(p => p.sellPrice);
    const buyPrices = history.map(p => p.buyPrice);
    
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Sell Price',
                    data: sellPrices,
                    borderColor: '#ff9999',
                    backgroundColor: 'rgba(255, 153, 153, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Buy Price',
                    data: buyPrices,
                    borderColor: '#98d8c8',
                    backgroundColor: 'rgba(152, 216, 200, 0.1)',
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: '#e0e0e0'
                    }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#e0e0e0',
                        callback: function(value) {
                            return formatCoins(value);
                        }
                    },
                    grid: {
                        color: '#4a4a4a'
                    }
                },
                x: {
                    ticks: {
                        color: '#e0e0e0'
                    },
                    grid: {
                        color: '#4a4a4a'
                    }
                }
            }
        }
    });
}

// Close modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('graph-modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});

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

// Advanced profit calculator with fortune and time
function calculateAdvancedProfit() {
    const cropId = document.getElementById('crop-select').value;
    const cropFortune = parseInt(document.getElementById('crop-fortune').value) || 0;
    const farmingFortune = parseInt(document.getElementById('farming-fortune').value) || 0;
    const breakSpeed = parseFloat(document.getElementById('break-speed').value) || 20;
    const farmTime = parseInt(document.getElementById('farm-time').value) || 60;
    const hasReplenish = document.getElementById('replenish').checked;
    const resultDiv = document.getElementById('calc-result');

    if (!bazaarData[cropId]) {
        resultDiv.innerHTML = '<span style="color: #ff9999;">Price data not loaded yet!</span>';
        return;
    }

    // Calculate total fortune
    const totalFortune = cropFortune + farmingFortune;
    
    // Calculate fortune multiplier (SkyBlock formula: 1 + fortune/100)
    const fortuneMultiplier = 1 + (totalFortune / 100);
    
    // Base drops per break
    const baseDrops = BASE_DROPS[cropId];
    
    // Total drops with fortune
    let dropsPerBreak = baseDrops * fortuneMultiplier;
    
    // Replenish adds chance to not consume crop (roughly +1 drop on average for applicable crops)
    if (hasReplenish && ['CARROT_ITEM', 'POTATO_ITEM', 'WHEAT', 'COCOA_BEANS', 'NETHER_STALK'].includes(cropId)) {
        dropsPerBreak += 1;
    }
    
    // Calculate totals
    const totalSeconds = farmTime * 60;
    const totalBreaks = breakSpeed * totalSeconds;
    const totalDrops = Math.floor(totalBreaks * dropsPerBreak);
    
    // Get price
    const sellPrice = bazaarData[cropId].quick_status.sellPrice;
    const totalCoins = sellPrice * totalDrops;
    
    // Calculate XP
    const xpPerBreak = XP_PER_BREAK[cropId];
    const totalXP = Math.floor(totalBreaks * xpPerBreak);
    
    resultDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <img src="${getItemIcon(cropId)}" 
                 alt="${GARDEN_CROPS[cropId]}" 
                 style="width: 48px; height: 48px; image-rendering: pixelated;"
                 onerror="this.style.display='none'">
            <h3 style="margin: 0;">📊 Farming Session Results</h3>
        </div>
        <p><strong>Crop:</strong> ${GARDEN_CROPS[cropId]}</p>
        <p><strong>Duration:</strong> ${farmTime} minutes (${formatTime(totalSeconds)})</p>
        <hr style="border-color: #4a4a4a; margin: 1rem 0;">
        <p><strong>Total Fortune:</strong> ${totalFortune} (${cropFortune} crop + ${farmingFortune} farming)</p>
        <p><strong>Drops per break:</strong> ${dropsPerBreak.toFixed(2)}</p>
        <p><strong>Total blocks broken:</strong> ${totalBreaks.toLocaleString()}</p>
        <p><strong>Total crops collected:</strong> ${totalDrops.toLocaleString()}</p>
        <hr style="border-color: #4a4a4a; margin: 1rem 0;">
        <p class="highlight">💰 Total Profit: ${formatCoins(totalCoins)}</p>
        <p class="highlight">✨ Total Farming XP: ${totalXP.toLocaleString()} XP</p>
        <p style="color: #999; font-size: 0.9rem; margin-top: 1rem;">
            💵 Coins per hour: ${formatCoins(totalCoins / (farmTime / 60))}<br>
            ⭐ XP per hour: ${Math.floor(totalXP / (farmTime / 60)).toLocaleString()} XP
        </p>
    `;
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// Load price history on startup
loadPriceHistory();

// Fetch data on page load
fetchBazaarData();

// Refresh prices every 60 seconds
setInterval(fetchBazaarData, 60000);