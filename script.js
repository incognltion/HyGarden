// =====================================================
// SKYBLOCK GARDEN HUB - ACCURATE FARMING CALCULATOR
// =====================================================

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

// Official NPC sell prices (from Hypixel Wiki)
const NPC_SELL_PRICES = {
    'WHEAT': 1,
    'CARROT_ITEM': 1,
    'POTATO_ITEM': 1,
    'PUMPKIN': 4,
    'MELON': 0.5,
    'COCOA_BEANS': 3,
    'SUGAR_CANE': 2,
    'NETHER_STALK': 3,
    'CACTUS': 1,
    'MUSHROOM_COLLECTION': 4,
    
    // Enchanted T1
    'ENCHANTED_WHEAT': 160,
    'ENCHANTED_CARROT': 160,
    'ENCHANTED_POTATO': 160,
    'ENCHANTED_PUMPKIN': 640,
    'ENCHANTED_MELON': 80,
    'ENCHANTED_COCOA': 480,
    'ENCHANTED_SUGAR': 320,
    'ENCHANTED_CACTUS_GREEN': 160,
    'ENCHANTED_NETHER_STALK': 480,
    'ENCHANTED_RED_MUSHROOM': 640,
    
    // Enchanted T2
    'ENCHANTED_HAY_BALE': 25600,
    'ENCHANTED_GOLDEN_CARROT': 25600,
    'ENCHANTED_BAKED_POTATO': 25600,
    'POLISHED_PUMPKIN': 102400,
    'ENCHANTED_MELON_BLOCK': 12800,
    'ENCHANTED_SUGAR_CANE': 51200,
    'MUTANT_NETHER_STALK': 76800,
    'ENCHANTED_RED_MUSHROOM_BLOCK': 102400,
};

// =============================================================
// CORRECT BASE DROPS PER BLOCK - THIS IS THE KEY FIX!
// =============================================================
const BASE_DROPS = {
    'WHEAT': 1,
    'CARROT_ITEM': 3,
    'POTATO_ITEM': 3,
    'PUMPKIN': 1,
    'MELON': 4,
    'COCOA_BEANS': 2.5,
    'SUGAR_CANE': 1,
    'NETHER_STALK': 2.5,  // Nether Wart = 2.5 base
    'CACTUS': 1,
    'MUSHROOM_COLLECTION': 1,
};

// Farming XP per block broken
const XP_PER_BLOCK = {
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

const EXTRA_ITEMS = {
    'ENCHANTED_WHEAT': '✨ Ench. Wheat',
    'ENCHANTED_HAY_BALE': '✨ Hay Bale',
    'ENCHANTED_CARROT': '✨ Ench. Carrot',
    'ENCHANTED_GOLDEN_CARROT': '✨ Golden Carrot',
    'ENCHANTED_POTATO': '✨ Ench. Potato',
    'ENCHANTED_BAKED_POTATO': '✨ Baked Potato',
    'ENCHANTED_PUMPKIN': '✨ Ench. Pumpkin',
    'POLISHED_PUMPKIN': '✨ Polished Pumpkin',
    'ENCHANTED_MELON': '✨ Ench. Melon',
    'ENCHANTED_MELON_BLOCK': '✨ Melon Block',
    'ENCHANTED_SUGAR': '✨ Ench. Sugar',
    'ENCHANTED_SUGAR_CANE': '✨ Sugar Cane',
    'ENCHANTED_COCOA': '✨ Ench. Cocoa',
    'ENCHANTED_CACTUS_GREEN': '✨ Ench. Cactus',
    'ENCHANTED_NETHER_STALK': '✨ Ench. Wart',
    'MUTANT_NETHER_STALK': '✨ Mutant Wart',
};

const ENCHANTING_RECIPES = {
    'WHEAT': { t1: { id: 'ENCHANTED_WHEAT', cost: 160 }, t2: { id: 'ENCHANTED_HAY_BALE', cost: 25600 } },
    'CARROT_ITEM': { t1: { id: 'ENCHANTED_CARROT', cost: 160 }, t2: { id: 'ENCHANTED_GOLDEN_CARROT', cost: 25600 } },
    'POTATO_ITEM': { t1: { id: 'ENCHANTED_POTATO', cost: 160 }, t2: { id: 'ENCHANTED_BAKED_POTATO', cost: 25600 } },
    'PUMPKIN': { t1: { id: 'ENCHANTED_PUMPKIN', cost: 160 }, t2: { id: 'POLISHED_PUMPKIN', cost: 25600 } },
    'MELON': { t1: { id: 'ENCHANTED_MELON', cost: 160 }, t2: { id: 'ENCHANTED_MELON_BLOCK', cost: 25600 } },
    'SUGAR_CANE': { t1: { id: 'ENCHANTED_SUGAR', cost: 160 }, t2: { id: 'ENCHANTED_SUGAR_CANE', cost: 25600 } },
    'COCOA_BEANS': { t1: { id: 'ENCHANTED_COCOA', cost: 160 } },
    'NETHER_STALK': { t1: { id: 'ENCHANTED_NETHER_STALK', cost: 160 }, t2: { id: 'MUTANT_NETHER_STALK', cost: 25600 } },
    'CACTUS': { t1: { id: 'ENCHANTED_CACTUS_GREEN', cost: 160 } },
    'MUSHROOM_COLLECTION': { t1: { id: 'ENCHANTED_RED_MUSHROOM', cost: 160 }, t2: { id: 'ENCHANTED_RED_MUSHROOM_BLOCK', cost: 25600 } },
};

// Pet data
const MOOSHROOM_FORTUNE = {
    'common': { base: 10, perLevel: 0.1 },
    'uncommon': { base: 10, perLevel: 0.15 },
    'rare': { base: 15, perLevel: 0.2 },
    'epic': { base: 20, perLevel: 0.25 },
    'legendary': { base: 25, perLevel: 0.3 },
    'mythic': { base: 30, perLevel: 0.35 },
};

const ELEPHANT_FORTUNE_MULT = {
    'common': 0.15,
    'uncommon': 0.17,
    'rare': 0.19,
    'epic': 0.21,
    'legendary': 0.25,
    'mythic': 0.27,
};

let bazaarData = {};
let priceHistory = {};
let currentChart = null;
let activePet = null;
let inputMode = 'manual';

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function getItemIcon(itemId) {
    return `https://sky.coflnet.com/static/icon/${itemId}`;
}

function formatCoins(amount) {
    if (amount === null || isNaN(amount)) return '0 coins';
    if (amount >= 1e9) return `${(amount / 1e9).toFixed(2)}B coins`;
    if (amount >= 1e6) return `${(amount / 1e6).toFixed(2)}M coins`;
    if (amount >= 1e3) return `${(amount / 1e3).toFixed(2)}K coins`;
    return `${amount.toFixed(1)} coins`;
}

function formatNumber(num) {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return Math.floor(num).toLocaleString();
}

// =====================================================
// INPUT MODE TOGGLE
// =====================================================

function setInputMode(mode) {
    inputMode = mode;
    
    const manualInputs = document.getElementById('manual-inputs');
    const ingameInputs = document.getElementById('ingame-inputs');
    const manualBtn = document.getElementById('mode-manual');
    const ingameBtn = document.getElementById('mode-ingame');
    
    if (mode === 'manual') {
        manualInputs.style.display = 'block';
        ingameInputs.style.display = 'none';
        manualBtn.classList.add('active');
        ingameBtn.classList.remove('active');
    } else {
        manualInputs.style.display = 'none';
        ingameInputs.style.display = 'block';
        manualBtn.classList.remove('active');
        ingameBtn.classList.add('active');
    }
}

// =====================================================
// UPDATE CROP INFO DISPLAY
// =====================================================

function updateCropInfo() {
    const cropId = document.getElementById('crop-select').value;
    const baseDrop = BASE_DROPS[cropId] || 1;
    const cropName = GARDEN_CROPS[cropId];
    
    const infoBox = document.getElementById('crop-base-info');
    if (infoBox) {
        infoBox.textContent = `🌱 ${cropName} base drop: ${baseDrop} per block`;
    }
}

// =====================================================
// PET FUNCTIONS
// =====================================================

function togglePetOptions(pet) {
    const mooshroomChecked = document.getElementById('mooshroom-pet')?.checked;
    const elephantChecked = document.getElementById('elephant-pet')?.checked;
    
    const petOptions = document.getElementById('pet-options');
    const elephantOptions = document.getElementById('elephant-options');
    
    if (pet === 'mooshroom' && mooshroomChecked) {
        document.getElementById('elephant-pet').checked = false;
        activePet = 'mooshroom';
        petOptions.style.display = 'block';
        elephantOptions.style.display = 'none';
        updatePetBonus();
    } else if (pet === 'elephant' && elephantChecked) {
        document.getElementById('mooshroom-pet').checked = false;
        activePet = 'elephant';
        petOptions.style.display = 'block';
        elephantOptions.style.display = 'block';
        updatePetBonus();
    } else {
        activePet = null;
        petOptions.style.display = 'none';
        elephantOptions.style.display = 'none';
    }
}

function updatePetBonus() {
    const rarity = document.getElementById('pet-rarity')?.value || 'legendary';
    const level = parseInt(document.getElementById('pet-level')?.value) || 100;
    const speed = parseInt(document.getElementById('player-speed')?.value) || 100;
    
    const petDisplay = document.getElementById('pet-bonus-display');
    const elephantDisplay = document.getElementById('elephant-bonus-display');
    
    if (activePet === 'mooshroom') {
        const data = MOOSHROOM_FORTUNE[rarity];
        const fortune = data.base + (data.perLevel * level);
        if (petDisplay) petDisplay.innerHTML = `🐄 <strong>+${fortune.toFixed(1)} Mushroom Fortune</strong>`;
    } else if (activePet === 'elephant') {
        const mult = ELEPHANT_FORTUNE_MULT[rarity];
        const fortune = mult * Math.max(0, speed - 100);
        if (petDisplay) petDisplay.innerHTML = `🐘 <strong>Elephant Pet</strong> - ${rarity} Lv${level}`;
        if (elephantDisplay) elephantDisplay.innerHTML = `🍀 <strong>+${fortune.toFixed(1)} Farming Fortune</strong> from ${speed} speed`;
    }
}

function getPetFortune(cropId) {
    if (!activePet) return 0;
    
    const rarity = document.getElementById('pet-rarity')?.value || 'legendary';
    const level = parseInt(document.getElementById('pet-level')?.value) || 100;
    const speed = parseInt(document.getElementById('player-speed')?.value) || 100;
    
    if (activePet === 'mooshroom' && cropId === 'MUSHROOM_COLLECTION') {
        const data = MOOSHROOM_FORTUNE[rarity];
        return data.base + (data.perLevel * level);
    } else if (activePet === 'elephant') {
        const mult = ELEPHANT_FORTUNE_MULT[rarity];
        return mult * Math.max(0, speed - 100);
    }
    
    return 0;
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
            document.getElementById('loading').textContent = 'Failed to load. Refresh page.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loading').textContent = 'API error. Try refreshing.';
    }
}

function storePriceHistory() {
    const timestamp = Date.now();
    const sevenDaysAgo = timestamp - (7 * 24 * 60 * 60 * 1000);
    
    for (const itemId of Object.keys({...GARDEN_CROPS, ...EXTRA_ITEMS})) {
        if (bazaarData[itemId]) {
            if (!priceHistory[itemId]) priceHistory[itemId] = [];
            
            priceHistory[itemId].push({
                time: timestamp,
                sellPrice: bazaarData[itemId].quick_status.sellPrice,
                buyPrice: bazaarData[itemId].quick_status.buyPrice
            });
            
            priceHistory[itemId] = priceHistory[itemId].filter(p => p.time > sevenDaysAgo);
        }
    }
    
    try { localStorage.setItem('priceHistory', JSON.stringify(priceHistory)); } catch (e) {}
}

function loadPriceHistory() {
    try {
        const stored = localStorage.getItem('priceHistory');
        if (stored) priceHistory = JSON.parse(stored);
    } catch (e) {}
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
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <img src="${getItemIcon(itemId)}" alt="${displayName}" style="width: 36px; height: 36px;" onerror="this.style.display='none'">
                <h3>${displayName}</h3>
            </div>
            <p class="label">Insta-Buy:</p>
            <p class="buy-price">${formatCoins(buyPrice)}</p>
            <p class="label">Insta-Sell:</p>
            <p class="sell-price">${formatCoins(sellPrice)}</p>
            <p class="label">NPC: <span class="npc-price">${formatCoins(npcPrice)}</span></p>
        `;
        grid.appendChild(card);
    }
}

function showPriceGraph(itemId, displayName) {
    const modal = document.getElementById('graph-modal');
    const title = document.getElementById('graph-title');
    if (!modal || !title) return;
    
    title.innerHTML = `<img src="${getItemIcon(itemId)}" style="width: 32px; height: 32px;" onerror="this.style.display='none'"> ${displayName}`;
    modal.style.display = 'block';
    renderPriceChart(itemId);
}

function renderPriceChart(itemId) {
    const canvas = document.getElementById('price-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (currentChart) currentChart.destroy();
    
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
    
    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: history.map(p => new Date(p.time).toLocaleDateString()),
            datasets: [
                { label: 'Sell', data: history.map(p => p.sellPrice), borderColor: '#ff9999', tension: 0.4 },
                { label: 'Buy', data: history.map(p => p.buyPrice), borderColor: '#98d8c8', tension: 0.4 }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#e0e0e0' } } },
            scales: {
                y: { ticks: { color: '#e0e0e0', callback: v => formatCoins(v) }, grid: { color: '#4a4a4a' } },
                x: { ticks: { color: '#e0e0e0' }, grid: { color: '#4a4a4a' } }
            }
        }
    });
}

function updateCropInfoPrices() {
    for (const [itemId] of Object.entries(GARDEN_CROPS)) {
        const el = document.getElementById(`info-${itemId}`);
        if (el && bazaarData[itemId]) {
            el.innerHTML = `💰 ${formatCoins(bazaarData[itemId].quick_status.sellPrice)}`;
        }
    }
}

// =====================================================
// SELL STRATEGY CALCULATION
// =====================================================

function calculateSellStrategies(cropId, totalDrops) {
    const strategies = [];
    
    const bazaarSell = bazaarData[cropId]?.quick_status?.sellPrice || 0;
    const bazaarBuy = bazaarData[cropId]?.quick_status?.buyPrice || 0;
    const npcPrice = NPC_SELL_PRICES[cropId] || 0;
    
    // Raw sells
    if (bazaarSell > 0) strategies.push({ name: 'Bazaar Insta-Sell', coins: totalDrops * bazaarSell });
    if (bazaarBuy > 0) strategies.push({ name: 'Bazaar Sell Order', coins: totalDrops * bazaarBuy });
    if (npcPrice > 0) strategies.push({ name: 'NPC Sell', coins: totalDrops * npcPrice });
    
    // Enchanted sells
    const recipes = ENCHANTING_RECIPES[cropId];
    if (recipes?.t1) {
        const t1 = recipes.t1;
        const t1Count = Math.floor(totalDrops / t1.cost);
        const leftover = totalDrops - (t1Count * t1.cost);
        
        const t1Sell = bazaarData[t1.id]?.quick_status?.sellPrice || 0;
        const t1Buy = bazaarData[t1.id]?.quick_status?.buyPrice || 0;
        const t1Npc = NPC_SELL_PRICES[t1.id] || 0;
        
        if (t1Sell > 0 && t1Count > 0) {
            strategies.push({ name: 'Ench. T1 Insta-Sell', coins: (t1Count * t1Sell) + (leftover * bazaarSell) });
        }
        if (t1Buy > 0 && t1Count > 0) {
            strategies.push({ name: 'Ench. T1 Sell Order', coins: (t1Count * t1Buy) + (leftover * bazaarBuy) });
        }
        if (t1Npc > 0 && t1Count > 0) {
            strategies.push({ name: 'Ench. T1 NPC', coins: (t1Count * t1Npc) + (leftover * npcPrice) });
        }
        
        // T2
        if (recipes.t2) {
            const t2 = recipes.t2;
            const t2Count = Math.floor(totalDrops / t2.cost);
            const t2Left = totalDrops - (t2Count * t2.cost);
            const t1FromLeft = Math.floor(t2Left / t1.cost);
            const rawLeft = t2Left - (t1FromLeft * t1.cost);
            
            const t2Sell = bazaarData[t2.id]?.quick_status?.sellPrice || 0;
            const t2Buy = bazaarData[t2.id]?.quick_status?.buyPrice || 0;
            const t2Npc = NPC_SELL_PRICES[t2.id] || 0;
            
            if (t2Sell > 0 && t2Count > 0) {
                strategies.push({ 
                    name: 'Ench. T2 Insta-Sell', 
                    coins: (t2Count * t2Sell) + (t1FromLeft * t1Sell) + (rawLeft * bazaarSell) 
                });
            }
            if (t2Buy > 0 && t2Count > 0) {
                strategies.push({ 
                    name: 'Ench. T2 Sell Order', 
                    coins: (t2Count * t2Buy) + (t1FromLeft * t1Buy) + (rawLeft * bazaarBuy) 
                });
            }
            if (t2Npc > 0 && t2Count > 0) {
                strategies.push({ 
                    name: 'Ench. T2 NPC', 
                    coins: (t2Count * t2Npc) + (t1FromLeft * t1Npc) + (rawLeft * npcPrice) 
                });
            }
        }
    }
    
    return strategies.sort((a, b) => b.coins - a.coins);
}

// =====================================================
// MAIN CALCULATION - THE KEY FUNCTION
// =====================================================

function calculateAdvancedProfit() {
    const cropId = document.getElementById('crop-select').value;
    const farmTime = parseInt(document.getElementById('farm-time')?.value) || 60;
    const farmingWisdom = parseFloat(document.getElementById('farming-wisdom')?.value) || 0;
    
    const anitaBonus = document.getElementById('anita-bonus')?.checked ? 1.10 : 1.0;
    const derpyActive = document.getElementById('derpy-active')?.checked;
    
    const resultDiv = document.getElementById('calc-result');
    if (!resultDiv) return;
    
    // =====================================================
    // GET BASE DROP FOR THIS CROP - THIS IS CRITICAL!
    // =====================================================
    const baseDrop = BASE_DROPS[cropId];
    
    console.log('=== CALCULATION DEBUG ===');
    console.log('Crop:', cropId);
    console.log('Base Drop:', baseDrop);
    
    let totalDrops, cropsPerMinute, blocksPerMinute;
    let totalFortune = 0;
    let fortuneMultiplier = 1;
    let dropsPerBlock = 1;
    
    if (inputMode === 'ingame') {
        // =====================================================
        // IN-GAME MODE - Use exact crops/min from screen
        // =====================================================
        const cropsPerMin = parseFloat(document.getElementById('crops-per-min')?.value) || 0;
        
        if (cropsPerMin <= 0) {
            resultDiv.innerHTML = `<p style="color: #ff9999;">⚠️ Please enter your Crops/min from the game.</p>`;
            return;
        }
        
        cropsPerMinute = cropsPerMin;
        totalDrops = Math.floor(cropsPerMin * farmTime);
        
        // Try to calculate fortune from optional inputs
        const blocksPerMin = parseFloat(document.getElementById('blocks-per-min')?.value) || 0;
        const ff = parseFloat(document.getElementById('farming-fortune-ingame')?.value) || 0;
        const cf = parseFloat(document.getElementById('crop-fortune-ingame')?.value) || 0;
        
        if (blocksPerMin > 0) {
            blocksPerMinute = blocksPerMin;
            // Reverse: drops/block = crops/min ÷ blocks/min
            dropsPerBlock = cropsPerMin / blocksPerMin;
            // fortune mult = drops/block ÷ baseDrop ÷ anita
            fortuneMultiplier = dropsPerBlock / baseDrop / anitaBonus;
            totalFortune = (fortuneMultiplier - 1) * 100;
        } else if (ff > 0 || cf > 0) {
            totalFortune = ff + cf + getPetFortune(cropId);
            fortuneMultiplier = 1 + (totalFortune / 100);
            dropsPerBlock = baseDrop * fortuneMultiplier * anitaBonus;
            blocksPerMinute = cropsPerMin / dropsPerBlock;
        } else {
            blocksPerMinute = 0;
            dropsPerBlock = 0;
        }
        
    } else {
        // =====================================================
        // MANUAL MODE - Calculate from fortune + speed
        // =====================================================
        const farmingFortune = parseFloat(document.getElementById('farming-fortune')?.value) || 0;
        const cropFortune = parseFloat(document.getElementById('crop-fortune')?.value) || 0;
        const blocksPerSecond = parseFloat(document.getElementById('blocks-per-second')?.value) || 20;
        const petFortune = getPetFortune(cropId);
        
        // Total fortune = farming + crop specific + pet
        totalFortune = farmingFortune + cropFortune + petFortune;
        
        // Fortune multiplier
        fortuneMultiplier = 1 + (totalFortune / 100);
        
        // =====================================================
        // THE KEY FORMULA: drops = base × fortune × anita
        // =====================================================
        dropsPerBlock = baseDrop * fortuneMultiplier * anitaBonus;
        
        console.log('Farming Fortune:', farmingFortune);
        console.log('Crop Fortune:', cropFortune);
        console.log('Pet Fortune:', petFortune);
        console.log('Total Fortune:', totalFortune);
        console.log('Fortune Multiplier:', fortuneMultiplier);
        console.log('Anita Bonus:', anitaBonus);
        console.log('Drops Per Block:', dropsPerBlock);
        
        // Calculate rates
        blocksPerMinute = blocksPerSecond * 60;
        cropsPerMinute = blocksPerMinute * dropsPerBlock;
        
        console.log('Blocks/min:', blocksPerMinute);
        console.log('Crops/min:', cropsPerMinute);
        
        // Total for session
        totalDrops = Math.floor(cropsPerMinute * farmTime);
        
        console.log('Farm Time:', farmTime, 'minutes');
        console.log('Total Drops:', totalDrops);
        console.log('=========================');
    }
    
    // =====================================================
    // Calculate XP
    // =====================================================
    const baseXP = XP_PER_BLOCK[cropId] || 4;
    const wisdomMult = 1 + (farmingWisdom / 100);
    const derpyXPMult = derpyActive ? 1.5 : 1.0;
    
    let totalXP = 0;
    if (blocksPerMinute > 0) {
        totalXP = Math.floor(blocksPerMinute * farmTime * baseXP * wisdomMult * derpyXPMult);
    }
    
    // =====================================================
    // Get sell strategies
    // =====================================================
    let strategies = calculateSellStrategies(cropId, totalDrops);
    
    // Apply Derpy coin penalty
    if (derpyActive) {
        strategies = strategies.map(s => ({...s, coins: s.coins * 0.5}));
        strategies.sort((a, b) => b.coins - a.coins);
    }
    
    const bestStrategy = strategies[0] || { name: 'N/A', coins: 0 };
    
    // Hourly rates
    const hours = farmTime / 60;
    const coinsPerHour = bestStrategy.coins / hours;
    const xpPerHour = totalXP / hours;
    const cropsPerHour = totalDrops / hours;
    
    // =====================================================
    // Build HTML output
    // =====================================================
    const strategiesHtml = strategies.slice(0, 6).map((s, i) => `
        <div class="strategy-item ${i === 0 ? 'best' : ''}">
            <span class="strategy-name">${i === 0 ? '👑 ' : ''}${s.name}</span>
            <span class="strategy-coins">${formatCoins(s.coins)}</span>
        </div>
    `).join('');
    
    resultDiv.innerHTML = `
        <div class="result-header">
            <img src="${getItemIcon(cropId)}" alt="${GARDEN_CROPS[cropId]}" class="crop-icon" onerror="this.style.display='none'">
            <div>
                <h3>${GARDEN_CROPS[cropId]} Results</h3>
                <p>${farmTime} minutes farming</p>
            </div>
        </div>
        
        <div class="result-section calculation-breakdown">
            <h4>🔢 Calculation Breakdown</h4>
            <table class="calc-table">
                <tr>
                    <td>Base drop per block:</td>
                    <td><strong>${baseDrop}</strong></td>
                </tr>
                <tr>
                    <td>Total Fortune:</td>
                    <td><strong>${totalFortune.toFixed(1)}</strong></td>
                </tr>
                <tr>
                    <td>Fortune Multiplier:</td>
                    <td><strong>×${fortuneMultiplier.toFixed(3)}</strong></td>
                </tr>
                ${anitaBonus > 1 ? `
                <tr>
                    <td>Anita Bonus:</td>
                    <td><strong>×${anitaBonus}</strong></td>
                </tr>
                ` : ''}
                <tr class="highlight-row">
                    <td>Final drops/block:</td>
                    <td><strong>${dropsPerBlock.toFixed(2)}</strong></td>
                </tr>
            </table>
            <p class="formula">Formula: ${baseDrop} × ${fortuneMultiplier.toFixed(2)} ${anitaBonus > 1 ? `× ${anitaBonus}` : ''} = <strong>${dropsPerBlock.toFixed(2)}</strong></p>
        </div>
        
        <div class="result-section">
            <h4>📊 Farming Stats</h4>
            <div class="stats-grid">
                ${blocksPerMinute > 0 ? `
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(blocksPerMinute)}</div>
                    <div class="stat-label">Blocks/min</div>
                </div>
                ` : ''}
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(cropsPerMinute)}</div>
                    <div class="stat-label">Crops/min</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(totalDrops)}</div>
                    <div class="stat-label">Total Crops</div>
                </div>
            </div>
        </div>
        
        <div class="best-profit-box">
            <h4>💰 Best Profit (${farmTime} min)</h4>
            <div class="big-number">${formatCoins(bestStrategy.coins)}</div>
            <div class="method">${bestStrategy.name}</div>
            ${derpyActive ? '<p style="color:#ff9999;font-size:0.8rem;margin-top:0.5rem;">⚠️ Derpy: Coins halved</p>' : ''}
        </div>
        
        <div class="result-section">
            <h4>💹 All Sell Options</h4>
            <div class="strategies-container">${strategiesHtml}</div>
        </div>
        
        <div class="result-section">
            <h4>📈 Hourly Rates</h4>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${formatCoins(coinsPerHour)}</div>
                    <div class="stat-label">Coins/hr</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(Math.floor(xpPerHour))}</div>
                    <div class="stat-label">XP/hr</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(Math.floor(cropsPerHour))}</div>
                    <div class="stat-label">Crops/hr</div>
                </div>
            </div>
        </div>
        
        ${totalXP > 0 ? `
        <div class="result-section">
            <h4>⭐ Experience</h4>
            <p>Total XP: <strong>${formatNumber(totalXP)}</strong></p>
            ${farmingWisdom > 0 ? `<p>Wisdom: +${farmingWisdom}%</p>` : ''}
            ${derpyActive ? `<p>Derpy: +50% XP</p>` : ''}
        </div>
        ` : ''}
    `;
}

// =====================================================
// EVENT LISTENERS
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('graph-modal');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    if (closeBtn) {
        closeBtn.onclick = () => modal.style.display = 'none';
    }
    
    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = 'none';
    };
    
    loadPriceHistory();
    fetchBazaarData();
    setInputMode('manual');
    updateCropInfo();
    
    // Test with your exact values
    console.log('=== TESTING YOUR VALUES ===');
    console.log('Nether Wart base drop:', BASE_DROPS['NETHER_STALK']);
    const testFortune = 664.8 + 136;
    const testMult = 1 + (testFortune / 100);
    const testDrops = 2.5 * testMult;
    console.log('Fortune:', testFortune);
    console.log('Multiplier:', testMult);
    console.log('Expected drops/block:', testDrops);
    console.log('At 20 BPS (1200/min):', 1200 * testDrops, 'crops/min');
    console.log('============================');
});

setInterval(fetchBazaarData, 60000);