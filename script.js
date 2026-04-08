// =====================================================
// SKYBLOCK GARDEN HUB - ADVANCED FARMING CALCULATOR
// =====================================================

// Crop items we want to track from the Bazaar
const GARDEN_CROPS = {
    'WHEAT': 'Wheat',
    'CARROT_ITEM': 'Carrot',
    'POTATO_ITEM': 'Potato',
    'PUMPKIN': 'Pumpkin',
    'MELON': 'Melon',
    'COCOA_BEANS': 'Cocoa Beans',
    'SUGAR_CANE': 'Sugar Cane',
    'NETHER_STALK': 'Nether Wart',
    'CACTUS': 'Cactus',
    'MUSHROOM_COLLECTION': 'Mushroom',
};

// =====================================================
// OFFICIAL NPC SELL PRICES (From Hypixel SkyBlock Wiki)
// =====================================================
const NPC_SELL_PRICES = {
    // Base crops
    'WHEAT': 1,
    'CARROT_ITEM': 1,
    'POTATO_ITEM': 1,
    'PUMPKIN': 4,
    'MELON': 0.5,
    'COCOA_BEANS': 3,
    'SUGAR_CANE': 2,
    'NETHER_STALK': 3,
    'CACTUS': 1,
    'RED_MUSHROOM': 4,
    'BROWN_MUSHROOM': 4,
    'MUSHROOM_COLLECTION': 4,
    'SEEDS': 0.5,
    'POISONOUS_POTATO': 1,
    
    // Enchanted Tier 1
    'ENCHANTED_WHEAT': 160,
    'ENCHANTED_BREAD': 120,
    'ENCHANTED_CARROT': 160,
    'ENCHANTED_POTATO': 160,
    'ENCHANTED_PUMPKIN': 640,
    'ENCHANTED_MELON': 80,
    'ENCHANTED_COCOA': 480,
    'ENCHANTED_SUGAR': 320,
    'ENCHANTED_CACTUS_GREEN': 160,
    'ENCHANTED_CACTUS': 160,
    'ENCHANTED_NETHER_STALK': 480,
    'ENCHANTED_RED_MUSHROOM': 640,
    'ENCHANTED_BROWN_MUSHROOM': 640,
    'ENCHANTED_SEEDS': 80,
    
    // Enchanted Tier 2
    'ENCHANTED_HAY_BALE': 25600,
    'ENCHANTED_GOLDEN_CARROT': 25600,
    'ENCHANTED_BAKED_POTATO': 25600,
    'POLISHED_PUMPKIN': 102400,
    'ENCHANTED_MELON_BLOCK': 12800,
    'ENCHANTED_SUGAR_CANE': 51200,
    'MUTANT_NETHER_STALK': 76800,
    'ENCHANTED_RED_MUSHROOM_BLOCK': 102400,
    'ENCHANTED_BROWN_MUSHROOM_BLOCK': 102400,
};

// =====================================================
// BASE DROPS PER BREAK (SkyBlock mechanics)
// =====================================================
// In SkyBlock, fortune is applied to a base drop of 1 for most crops
// The formula is: drops = 1 × (1 + fortune/100)
const BASE_DROPS = {
    'WHEAT': 1,
    'CARROT_ITEM': 1,
    'POTATO_ITEM': 1,
    'PUMPKIN': 1,
    'MELON': 1,           // Fortune applies per slice
    'COCOA_BEANS': 1,
    'SUGAR_CANE': 1,      // Per block broken
    'NETHER_STALK': 1,
    'CACTUS': 1,          // Per block broken
    'MUSHROOM_COLLECTION': 1,
};

// =====================================================
// FARMING XP PER CROP BREAK
// =====================================================
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
    'MUSHROOM_COLLECTION': 4,
};

// =====================================================
// EXTRA ITEMS TO TRACK
// =====================================================
const EXTRA_ITEMS = {
    'ENCHANTED_WHEAT': '✨ Ench. Wheat',
    'ENCHANTED_HAY_BALE': '✨ Ench. Hay Bale',
    'ENCHANTED_CARROT': '✨ Ench. Carrot',
    'ENCHANTED_GOLDEN_CARROT': '✨ Ench. Golden Carrot',
    'ENCHANTED_POTATO': '✨ Ench. Potato',
    'ENCHANTED_BAKED_POTATO': '✨ Ench. Baked Potato',
    'ENCHANTED_PUMPKIN': '✨ Ench. Pumpkin',
    'POLISHED_PUMPKIN': '✨ Polished Pumpkin',
    'ENCHANTED_MELON': '✨ Ench. Melon',
    'ENCHANTED_MELON_BLOCK': '✨ Ench. Melon Block',
    'ENCHANTED_SUGAR': '✨ Ench. Sugar',
    'ENCHANTED_SUGAR_CANE': '✨ Ench. Sugar Cane',
    'ENCHANTED_COCOA': '✨ Ench. Cocoa',
    'ENCHANTED_CACTUS_GREEN': '✨ Ench. Cactus Green',
    'ENCHANTED_NETHER_STALK': '✨ Ench. Nether Wart',
    'MUTANT_NETHER_STALK': '✨ Mutant Nether Wart',
};

// =====================================================
// ENCHANTING RECIPES
// =====================================================
const ENCHANTING_RECIPES = {
    'WHEAT': {
        tier1: { result: 'ENCHANTED_WHEAT', amount: 160 },
        tier2: { result: 'ENCHANTED_HAY_BALE', amount: 25600 }
    },
    'CARROT_ITEM': {
        tier1: { result: 'ENCHANTED_CARROT', amount: 160 },
        tier2: { result: 'ENCHANTED_GOLDEN_CARROT', amount: 25600 }
    },
    'POTATO_ITEM': {
        tier1: { result: 'ENCHANTED_POTATO', amount: 160 },
        tier2: { result: 'ENCHANTED_BAKED_POTATO', amount: 25600 }
    },
    'PUMPKIN': {
        tier1: { result: 'ENCHANTED_PUMPKIN', amount: 160 },
        tier2: { result: 'POLISHED_PUMPKIN', amount: 25600 }
    },
    'MELON': {
        tier1: { result: 'ENCHANTED_MELON', amount: 160 },
        tier2: { result: 'ENCHANTED_MELON_BLOCK', amount: 25600 }
    },
    'SUGAR_CANE': {
        tier1: { result: 'ENCHANTED_SUGAR', amount: 160 },
        tier2: { result: 'ENCHANTED_SUGAR_CANE', amount: 25600 }
    },
    'COCOA_BEANS': {
        tier1: { result: 'ENCHANTED_COCOA', amount: 160 }
    },
    'NETHER_STALK': {
        tier1: { result: 'ENCHANTED_NETHER_STALK', amount: 160 },
        tier2: { result: 'MUTANT_NETHER_STALK', amount: 25600 }
    },
    'CACTUS': {
        tier1: { result: 'ENCHANTED_CACTUS_GREEN', amount: 160 },
        tier2: { result: 'ENCHANTED_CACTUS', amount: 25600 }
    },
    'MUSHROOM_COLLECTION': {
        tier1: { result: 'ENCHANTED_RED_MUSHROOM', amount: 160 },
        tier2: { result: 'ENCHANTED_RED_MUSHROOM_BLOCK', amount: 25600 }
    }
};

// =====================================================
// CULTIVATING MILESTONES (fortune bonus)
// =====================================================
const CULTIVATING_MILESTONES = [
    { count: 1000, bonus: 1 },
    { count: 5000, bonus: 2 },
    { count: 25000, bonus: 3 },
    { count: 100000, bonus: 4 },
    { count: 300000, bonus: 5 },
    { count: 1500000, bonus: 6 },
    { count: 5000000, bonus: 7 },
    { count: 20000000, bonus: 8 },
    { count: 100000000, bonus: 9 },
    { count: 1000000000, bonus: 10 }
];

// =====================================================
// GLOBAL STATE
// =====================================================
let bazaarData = {};
let priceHistory = {};
let currentChart = null;

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function getItemIcon(itemId) {
    return `https://sky.coflnet.com/static/icon/${itemId}`;
}

function formatCoins(amount) {
    if (amount === null || amount === undefined || isNaN(amount)) return '0 coins';
    if (amount >= 1000000000) {
        return `${(amount / 1000000000).toFixed(2)}B coins`;
    } else if (amount >= 1000000) {
        return `${(amount / 1000000).toFixed(2)}M coins`;
    } else if (amount >= 1000) {
        return `${(amount / 1000).toFixed(2)}K coins`;
    }
    return `${amount.toFixed(1)} coins`;
}

function formatNumber(num) {
    if (num === null || num === undefined || isNaN(num)) return '0';
    if (num >= 1000000000) {
        return `${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
        return `${(num / 1000000).toFixed(2)}M`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(2)}K`;
    }
    return num.toLocaleString();
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
    } else {
        return `${secs}s`;
    }
}

// =====================================================
// API FUNCTIONS
// =====================================================

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

function storePriceHistory() {
    const timestamp = Date.now();
    
    for (const itemId of Object.keys({...GARDEN_CROPS, ...EXTRA_ITEMS})) {
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
    
    try {
        localStorage.setItem('priceHistory', JSON.stringify(priceHistory));
    } catch (e) {
        console.warn('Could not save price history to localStorage');
    }
}

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

// =====================================================
// DISPLAY FUNCTIONS
// =====================================================

function displayPrices() {
    const grid = document.getElementById('prices-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const allItems = { ...GARDEN_CROPS, ...EXTRA_ITEMS };

    for (const [itemId, displayName] of Object.entries(allItems)) {
        const product = bazaarData[itemId];
        if (!product) continue;

        const buyPrice = product.quick_status.buyPrice;
        const sellPrice = product.quick_status.sellPrice;
        const npcPrice = NPC_SELL_PRICES[itemId] || 0;

        const card = document.createElement('div');
        card.className = 'price-card';
        card.onclick = () => showPriceGraph(itemId, displayName);
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
                <img src="${getItemIcon(itemId)}" 
                     alt="${displayName}" 
                     class="crop-icon"
                     onerror="this.style.display='none'">
                <h3>${displayName}</h3>
            </div>
            <p class="label">Instant Buy (you pay):</p>
            <p class="buy-price">${formatCoins(buyPrice)}</p>
            <p class="label">Instant Sell (you earn):</p>
            <p class="sell-price">${formatCoins(sellPrice)}</p>
            <p class="label">NPC Sell:</p>
            <p class="npc-price">${formatCoins(npcPrice)}</p>
            <p class="label" style="margin-top: 0.5rem; font-size: 0.75rem;">📊 Click for price history</p>
        `;
        grid.appendChild(card);
    }
}

function showPriceGraph(itemId, displayName) {
    const modal = document.getElementById('graph-modal');
    const title = document.getElementById('graph-title');
    
    if (!modal || !title) return;
    
    title.innerHTML = `
        <img src="${getItemIcon(itemId)}" 
             alt="${displayName}" 
             style="width: 32px; height: 32px;"
             onerror="this.style.display='none'">
        ${displayName} - Price History
    `;
    modal.style.display = 'block';
    
    renderPriceChart(itemId);
}

function renderPriceChart(itemId) {
    const canvas = document.getElementById('price-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    if (currentChart) {
        currentChart.destroy();
    }
    
    let history = [...(priceHistory[itemId] || [])];
    
    if (history.length < 2) {
        const now = Date.now();
        const basePrice = bazaarData[itemId]?.quick_status.sellPrice || 100;
        for (let i = 7; i >= 0; i--) {
            history.push({
                time: now - (i * 24 * 60 * 60 * 1000),
                sellPrice: basePrice * (0.9 + Math.random() * 0.2),
                buyPrice: basePrice * (1.1 + Math.random() * 0.2)
            });
        }
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
                    labels: { color: '#e0e0e0' }
                }
            },
            scales: {
                y: {
                    ticks: {
                        color: '#e0e0e0',
                        callback: function(value) { return formatCoins(value); }
                    },
                    grid: { color: '#4a4a4a' }
                },
                x: {
                    ticks: { color: '#e0e0e0' },
                    grid: { color: '#4a4a4a' }
                }
            }
        }
    });
}

function updateCropInfoPrices() {
    for (const [itemId, displayName] of Object.entries(GARDEN_CROPS)) {
        const el = document.getElementById(`info-${itemId}`);
        if (el && bazaarData[itemId]) {
            const sellPrice = bazaarData[itemId].quick_status.sellPrice;
            el.innerHTML = `💰 Bazaar: ${formatCoins(sellPrice)}`;
        }
    }
}

// =====================================================
// FORTUNE CALCULATION
// =====================================================

function calculateTotalFortune(cropId) {
    // Backwards-compatible: prefer explicit fields if present, otherwise fall back
    // to the simpler `crop-fortune` and `farming-fortune` inputs used earlier.
    const cropFortune = parseFloat(document.getElementById('crop-fortune')?.value) || 0;
    const farmingFortune = parseFloat(document.getElementById('farming-fortune')?.value) || 0;

    const baseFortune = parseFloat(document.getElementById('base-fortune')?.value) || 0;
    const toolFortune = parseFloat(document.getElementById('tool-fortune')?.value) || 0;
    const armorFortune = parseFloat(document.getElementById('armor-fortune')?.value) || 0;
    const petFortune = parseFloat(document.getElementById('pet-fortune')?.value) || 0;
    const turboLevel = parseInt(document.getElementById('turbo-level')?.value) || 0;
    const harvestingLevel = parseInt(document.getElementById('harvesting-level')?.value) || 0;
    const cultivatingCount = parseInt(document.getElementById('cultivating-count')?.value) || 0;
    const dedicationLevel = parseInt(document.getElementById('dedication-level')?.value) || 0;
    const gardenLevel = parseInt(document.getElementById('garden-level')?.value) || 1;
    const cropUpgrade = parseInt(document.getElementById('crop-upgrade')?.value) || 0;
    const plotBonus = parseFloat(document.getElementById('plot-bonus')?.value) || 0;
    const extraFortune = parseFloat(document.getElementById('extra-fortune')?.value) || 0;
    
    // Turbo enchant: +5 fortune per level (crop specific)
    const turboBonus = turboLevel * 5;
    
    // Harvesting: +12.5 fortune per level
    const harvestingBonus = harvestingLevel * 12.5;
    
    // Cultivating bonus based on counter
    let cultivatingBonus = 0;
    for (const milestone of CULTIVATING_MILESTONES) {
        if (cultivatingCount >= milestone.count) {
            cultivatingBonus = milestone.bonus;
        }
    }
    
    // Garden level: approximately 4 fortune per level
    const gardenLevelBonus = gardenLevel * 4;
    
    // Crop upgrade: +5 fortune per level
    const cropUpgradeBonus = cropUpgrade * 5;
    
    // Dedication bonus (simplified - would need milestone data for accuracy)
    const dedicationBonus = dedicationLevel > 0 ? dedicationLevel * 0.5 : 0;
    
    // Include the legacy inputs if they exist (cropFortune + farmingFortune)
    const total = 
        baseFortune + 
        toolFortune + 
        armorFortune + 
        petFortune + 
        turboBonus + 
        harvestingBonus +
        cultivatingBonus +
        gardenLevelBonus +
        cropUpgradeBonus +
        plotBonus +
        extraFortune +
        dedicationBonus +
        cropFortune +
        farmingFortune;
    
    return {
        total: total,
        breakdown: {
            'Base Fortune': baseFortune,
            'Tool Fortune': toolFortune,
            'Armor Fortune': armorFortune,
            'Pet Fortune': petFortune,
            'Turbo Enchant': turboBonus,
            'Harvesting': harvestingBonus,
            'Cultivating': cultivatingBonus,
            'Garden Level': gardenLevelBonus,
            'Crop Upgrade': cropUpgradeBonus,
            'Plot Bonus': plotBonus,
            'Extra Fortune': extraFortune,
            'Dedication': dedicationBonus
        }
    };
}

// =====================================================
// DROP CALCULATION
// =====================================================

function calculateDropsPerBreak(cropId, totalFortune) {
    const baseDrop = BASE_DROPS[cropId] || 1;
    const anitaBonus = document.getElementById('anita-bonus')?.checked ? 1.10 : 1.0;
    const replenishChecked = document.getElementById('replenish')?.checked ? true : false;

    // SkyBlock Fortune formula: drops = base × (1 + fortune/100)
    const fortuneMultiplier = 1 + (totalFortune / 100);

    let drops = baseDrop * fortuneMultiplier;

    // Apply Anita bonus (10% more crops)
    drops *= anitaBonus;

    // If Replenish enchant is toggled and crop supports it, add an average +1 drop
    if (replenishChecked && ['CARROT_ITEM', 'POTATO_ITEM', 'WHEAT', 'COCOA_BEANS', 'NETHER_STALK'].includes(cropId)) {
        drops += 1;
    }

    return drops;
}

// =====================================================
// SELL STRATEGY CALCULATION
// =====================================================

function calculateSellStrategies(cropId, totalDrops) {
    const strategies = [];
    
    // Get bazaar prices
    const bazaarSell = bazaarData[cropId]?.quick_status?.sellPrice || 0;
    const bazaarBuy = bazaarData[cropId]?.quick_status?.buyPrice || 0;
    const npcPrice = NPC_SELL_PRICES[cropId] || 0;
    
    // 1. Raw Bazaar Instant Sell
    if (bazaarSell > 0) {
        strategies.push({
            name: 'Bazaar Instant Sell (Raw)',
            coins: totalDrops * bazaarSell,
            description: `${formatNumber(totalDrops)} × ${formatCoins(bazaarSell)}`
        });
    }
    
    // 2. Raw Bazaar Sell Order
    if (bazaarBuy > 0) {
        strategies.push({
            name: 'Bazaar Sell Order (Raw)',
            coins: totalDrops * bazaarBuy,
            description: `${formatNumber(totalDrops)} × ${formatCoins(bazaarBuy)}`
        });
    }
    
    // 3. NPC Sell
    if (npcPrice > 0) {
        strategies.push({
            name: 'NPC Sell (Raw)',
            coins: totalDrops * npcPrice,
            description: `${formatNumber(totalDrops)} × ${formatCoins(npcPrice)}`
        });
    }
    
    // 4. Enchanted sells
    const recipes = ENCHANTING_RECIPES[cropId];
    if (recipes?.tier1) {
        const tier1Id = recipes.tier1.result;
        const tier1Cost = recipes.tier1.amount;
        const tier1Count = Math.floor(totalDrops / tier1Cost);
        const leftover = totalDrops - (tier1Count * tier1Cost);
        
        const tier1BazaarSell = bazaarData[tier1Id]?.quick_status?.sellPrice || 0;
        const tier1BazaarBuy = bazaarData[tier1Id]?.quick_status?.buyPrice || 0;
        const tier1NpcPrice = NPC_SELL_PRICES[tier1Id] || 0;
        
        // Enchanted Bazaar Instant Sell
        if (tier1BazaarSell > 0 && tier1Count > 0) {
            const coins = (tier1Count * tier1BazaarSell) + (leftover * bazaarSell);
            strategies.push({
                name: `Bazaar Instant Sell (${EXTRA_ITEMS[tier1Id] || tier1Id})`,
                coins: coins,
                description: `${formatNumber(tier1Count)} ench. + ${formatNumber(leftover)} raw`
            });
        }
        
        // Enchanted Bazaar Sell Order
        if (tier1BazaarBuy > 0 && tier1Count > 0) {
            const coins = (tier1Count * tier1BazaarBuy) + (leftover * bazaarBuy);
            strategies.push({
                name: `Bazaar Sell Order (${EXTRA_ITEMS[tier1Id] || tier1Id})`,
                coins: coins,
                description: `${formatNumber(tier1Count)} ench. + ${formatNumber(leftover)} raw`
            });
        }
        
        // Enchanted NPC Sell
        if (tier1NpcPrice > 0 && tier1Count > 0) {
            const coins = (tier1Count * tier1NpcPrice) + (leftover * npcPrice);
            strategies.push({
                name: `NPC Sell (${EXTRA_ITEMS[tier1Id] || tier1Id})`,
                coins: coins,
                description: `${formatNumber(tier1Count)} ench. + ${formatNumber(leftover)} raw`
            });
        }
        
        // Tier 2 enchanted
        if (recipes.tier2) {
            const tier2Id = recipes.tier2.result;
            const tier2Cost = recipes.tier2.amount;
            const tier2Count = Math.floor(totalDrops / tier2Cost);
            const tier2Leftover = totalDrops - (tier2Count * tier2Cost);
            const tier1FromLeftover = Math.floor(tier2Leftover / tier1Cost);
            const rawLeftover = tier2Leftover - (tier1FromLeftover * tier1Cost);
            
            const tier2BazaarSell = bazaarData[tier2Id]?.quick_status?.sellPrice || 0;
            const tier2BazaarBuy = bazaarData[tier2Id]?.quick_status?.buyPrice || 0;
            const tier2NpcPrice = NPC_SELL_PRICES[tier2Id] || 0;
            
            if (tier2BazaarSell > 0 && tier2Count > 0) {
                const coins = (tier2Count * tier2BazaarSell) + 
                             (tier1FromLeftover * tier1BazaarSell) + 
                             (rawLeftover * bazaarSell);
                strategies.push({
                    name: `Bazaar Instant Sell (${EXTRA_ITEMS[tier2Id] || tier2Id})`,
                    coins: coins,
                    description: `${formatNumber(tier2Count)} T2 + ${formatNumber(tier1FromLeftover)} T1 + ${formatNumber(rawLeftover)} raw`
                });
            }
            
            if (tier2BazaarBuy > 0 && tier2Count > 0) {
                const coins = (tier2Count * tier2BazaarBuy) + 
                             (tier1FromLeftover * tier1BazaarBuy) + 
                             (rawLeftover * bazaarBuy);
                strategies.push({
                    name: `Bazaar Sell Order (${EXTRA_ITEMS[tier2Id] || tier2Id})`,
                    coins: coins,
                    description: `${formatNumber(tier2Count)} T2 + ${formatNumber(tier1FromLeftover)} T1 + ${formatNumber(rawLeftover)} raw`
                });
            }
            
            if (tier2NpcPrice > 0 && tier2Count > 0) {
                const coins = (tier2Count * tier2NpcPrice) + 
                             (tier1FromLeftover * tier1NpcPrice) + 
                             (rawLeftover * npcPrice);
                strategies.push({
                    name: `NPC Sell (${EXTRA_ITEMS[tier2Id] || tier2Id})`,
                    coins: coins,
                    description: `${formatNumber(tier2Count)} T2 + ${formatNumber(tier1FromLeftover)} T1 + ${formatNumber(rawLeftover)} raw`
                });
            }
        }
    }
    
    // Sort by profit (highest first)
    strategies.sort((a, b) => b.coins - a.coins);
    
    return strategies;
}

// =====================================================
// MAIN CALCULATION FUNCTION
// =====================================================

function calculateAdvancedProfit() {
    const cropId = document.getElementById('crop-select').value;
    const breakSpeed = parseFloat(document.getElementById('break-speed')?.value) || 20;
    const farmTime = parseInt(document.getElementById('farm-time')?.value) || 60;
    const resultDiv = document.getElementById('calc-result');
    const derpyBonus = document.getElementById('derpy-bonus')?.checked ? 1.5 : 1.0;
    
    if (!resultDiv) return;
    
    // Calculate fortune
    const fortuneData = calculateTotalFortune(cropId);
    const totalFortune = fortuneData.total;
    
    // Calculate drops
    const dropsPerBreak = calculateDropsPerBreak(cropId, totalFortune);
    
    // Calculate totals
    const totalSeconds = farmTime * 60;
    const totalBreaks = breakSpeed * totalSeconds;
    const totalDrops = Math.floor(totalBreaks * dropsPerBreak);
    
    // Calculate XP
    const xpPerBreak = XP_PER_BREAK[cropId] || 4;
    const totalXP = Math.floor(totalBreaks * xpPerBreak * derpyBonus);
    
    // Get sell strategies
    const strategies = calculateSellStrategies(cropId, totalDrops);
    const bestStrategy = strategies[0] || { name: 'N/A', coins: 0, description: 'No data' };
    
    // Build fortune breakdown HTML
    const fortuneBreakdownHtml = Object.entries(fortuneData.breakdown)
        .filter(([key, val]) => val > 0)
        .map(([key, val]) => `<span class="fortune-tag">${key}: +${val.toFixed(1)}</span>`)
        .join('');
    
    // Build strategies HTML
    const strategiesHtml = strategies.slice(0, 6).map((s, i) => `
        <div class="strategy-item ${i === 0 ? 'best-strategy' : ''}">
            <div class="strategy-info">
                <span class="strategy-name">${i === 0 ? '👑 ' : ''}${s.name}</span>
                <span class="strategy-desc">${s.description}</span>
            </div>
            <span class="strategy-coins">${formatCoins(s.coins)}</span>
        </div>
    `).join('');
    
    // Calculate hourly rates
    const hoursSpent = farmTime / 60;
    const coinsPerHour = bestStrategy.coins / hoursSpent;
    const xpPerHour = totalXP / hoursSpent;
    const cropsPerHour = totalDrops / hoursSpent;
    
    resultDiv.innerHTML = `
        <div class="result-header">
            <img src="${getItemIcon(cropId)}" 
                 alt="${GARDEN_CROPS[cropId]}" 
                 class="crop-icon"
                 style="width: 64px; height: 64px;"
                 onerror="this.style.display='none'">
            <div>
                <h3>📊 ${GARDEN_CROPS[cropId]} Farming Results</h3>
                <p style="color: #999; margin: 0;">Duration: ${farmTime} minutes (${formatTime(totalSeconds)})</p>
            </div>
        </div>
        
        <div class="result-section">
            <h4>🍀 Fortune Breakdown</h4>
            <p><strong>Total Farming Fortune:</strong> <span class="highlight-value">${totalFortune.toFixed(1)}</span></p>
            <div class="fortune-tags">
                ${fortuneBreakdownHtml || '<span class="fortune-tag">No bonuses configured</span>'}
            </div>
            <p><strong>Fortune Multiplier:</strong> ${(1 + totalFortune/100).toFixed(2)}x drops</p>
        </div>
        
        <div class="result-section">
            <h4>📦 Collection Stats</h4>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(totalBreaks)}</div>
                    <div class="stat-label">Blocks Broken</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${dropsPerBreak.toFixed(2)}</div>
                    <div class="stat-label">Drops/Break</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(totalDrops)}</div>
                    <div class="stat-label">Total Crops</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(totalXP)}</div>
                    <div class="stat-label">Farming XP</div>
                </div>
            </div>
        </div>
        
        <div class="result-section">
            <h4>💰 Sell Strategies</h4>
            <div class="strategies-container">
                ${strategiesHtml || '<p style="color: #999;">No pricing data available</p>'}
            </div>
        </div>
        
        <div class="result-section highlight-section">
            <h4>🏆 Best Profit</h4>
            <div class="big-number">${formatCoins(bestStrategy.coins)}</div>
            <p style="margin: 0;">${bestStrategy.name}</p>
        </div>
        
        <div class="result-section">
            <h4>📈 Hourly Rates</h4>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${formatCoins(coinsPerHour)}</div>
                    <div class="stat-label">Coins/Hour</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(Math.floor(xpPerHour))}</div>
                    <div class="stat-label">XP/Hour</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(Math.floor(cropsPerHour))}</div>
                    <div class="stat-label">Crops/Hour</div>
                </div>
            </div>
        </div>
    `;
}

// =====================================================
// EVENT LISTENERS
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Modal close functionality
    const modal = document.getElementById('graph-modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    // Load saved price history
    loadPriceHistory();
    
    // Fetch initial data
    fetchBazaarData();
});

// Refresh prices every 60 seconds
setInterval(fetchBazaarData, 60000);