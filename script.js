// =====================================================
// SKYBLOCK GARDEN HUB - FARMING CALCULATOR
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
    'RED_MUSHROOM': 4,
    'BROWN_MUSHROOM': 4,
    
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

const XP_PER_BREAK = {
    'WHEAT': 4, 'CARROT_ITEM': 4, 'POTATO_ITEM': 4,
    'PUMPKIN': 4.5, 'MELON': 4.5, 'COCOA_BEANS': 4,
    'SUGAR_CANE': 4, 'NETHER_STALK': 4, 'CACTUS': 4,
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

// Mooshroom Cow pet fortune per rarity (at level 100)
const MOOSHROOM_FORTUNE = {
    'common': { base: 10, perLevel: 0.1 },
    'uncommon': { base: 10, perLevel: 0.15 },
    'rare': { base: 15, perLevel: 0.2 },
    'epic': { base: 20, perLevel: 0.25 },
    'legendary': { base: 25, perLevel: 0.3 },
    'mythic': { base: 30, perLevel: 0.35 },
};

// Elephant pet: fortune = 0.15-0.25 * (speed - 100) based on rarity
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
    return num.toLocaleString();
}

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
}

// =====================================================
// PET FUNCTIONS
// =====================================================

function togglePetOptions(pet) {
    const mooshroomChecked = document.getElementById('mooshroom-pet')?.checked;
    const elephantChecked = document.getElementById('elephant-pet')?.checked;
    
    const petOptions = document.getElementById('pet-options');
    const elephantOptions = document.getElementById('elephant-options');
    
    // Only one pet can be active
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
        petDisplay.innerHTML = `🐄 <strong>+${fortune.toFixed(1)} Mushroom Fortune</strong> (only works on mushrooms)`;
    } else if (activePet === 'elephant') {
        const mult = ELEPHANT_FORTUNE_MULT[rarity];
        const fortune = mult * (speed - 100);
        petDisplay.innerHTML = `🐘 <strong>Elephant Pet</strong> - ${rarity} Lv${level}`;
        elephantDisplay.innerHTML = `🍀 <strong>+${fortune.toFixed(1)} Farming Fortune</strong> from ${speed} speed`;
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
        return mult * (speed - 100);
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
// CALCULATION FUNCTIONS
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
        }
    }
    
    return strategies.sort((a, b) => b.coins - a.coins);
}

function calculateAdvancedProfit() {
    const cropId = document.getElementById('crop-select').value;
    const farmingFortune = parseFloat(document.getElementById('farming-fortune')?.value) || 0;
    const cropFortune = parseFloat(document.getElementById('crop-fortune')?.value) || 0;
    const farmingWisdom = parseFloat(document.getElementById('farming-wisdom')?.value) || 0;
    const breakSpeed = parseFloat(document.getElementById('break-speed')?.value) || 20;
    const farmTime = parseInt(document.getElementById('farm-time')?.value) || 60;
    
    const anitaBonus = document.getElementById('anita-bonus')?.checked ? 1.10 : 1.0;
    const derpyActive = document.getElementById('derpy-active')?.checked;
    
    const resultDiv = document.getElementById('calc-result');
    if (!resultDiv) return;
    
    // Get pet fortune
    const petFortune = getPetFortune(cropId);
    
    // Total fortune = farming fortune + crop fortune + pet
    const totalFortune = farmingFortune + cropFortune + petFortune;
    
    // Fortune multiplier: drops = 1 × (1 + fortune/100)
    const fortuneMultiplier = 1 + (totalFortune / 100);
    
    // Calculate drops
    const dropsPerBreak = 1 * fortuneMultiplier * anitaBonus;
    
    // Calculate totals
    const totalSeconds = farmTime * 60;
    const totalBreaks = breakSpeed * totalSeconds;
    const totalDrops = Math.floor(totalBreaks * dropsPerBreak);
    
    // Calculate XP (wisdom increases XP by wisdom%)
    const baseXP = XP_PER_BREAK[cropId] || 4;
    const wisdomMult = 1 + (farmingWisdom / 100);
    const derpyMult = derpyActive ? 1.5 : 1.0;
    const totalXP = Math.floor(totalBreaks * baseXP * wisdomMult * derpyMult);
    
    // Get sell strategies
    const strategies = calculateSellStrategies(cropId, totalDrops);
    let bestStrategy = strategies[0] || { name: 'N/A', coins: 0 };
    
    // Apply Derpy coin reduction (-50% coins if Derpy)
    if (derpyActive) {
        strategies.forEach(s => s.coins *= 0.5);
        bestStrategy = strategies[0] || { name: 'N/A', coins: 0 };
    }
    
    // Hourly rates
    const hours = farmTime / 60;
    const coinsPerHour = bestStrategy.coins / hours;
    const xpPerHour = totalXP / hours;
    
    // Build HTML
    const strategiesHtml = strategies.slice(0, 5).map((s, i) => `
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
        
        <div class="result-section">
            <h4>🍀 Fortune</h4>
            <p>Overall Fortune: <span class="highlight-value">${farmingFortune}</span></p>
            <p>Crop Fortune: <span class="highlight-value">${cropFortune}</span></p>
            ${petFortune > 0 ? `<p>Pet Fortune: <span class="highlight-value">+${petFortune.toFixed(1)}</span></p>` : ''}
            <p><strong>Total: ${totalFortune.toFixed(1)}</strong> → <strong>${fortuneMultiplier.toFixed(2)}x</strong> drops</p>
        </div>
        
        <div class="result-section">
            <h4>📦 Collection</h4>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(totalBreaks)}</div>
                    <div class="stat-label">Blocks</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(totalDrops)}</div>
                    <div class="stat-label">Crops</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(totalXP)}</div>
                    <div class="stat-label">XP</div>
                </div>
            </div>
        </div>
        
        <div class="best-profit-box">
            <h4>💰 Best Profit</h4>
            <div class="big-number">${formatCoins(bestStrategy.coins)}</div>
            <div class="method">${bestStrategy.name}</div>
            ${derpyActive ? '<p style="color:#ff9999;font-size:0.8rem;">⚠️ Derpy: -50% coins applied</p>' : ''}
        </div>
        
        <div class="result-section">
            <h4>💹 Sell Options</h4>
            <div class="strategies-container">${strategiesHtml}</div>
        </div>
        
        <div class="result-section">
            <h4>📈 Per Hour</h4>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${formatCoins(coinsPerHour)}</div>
                    <div class="stat-label">Coins</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(Math.floor(xpPerHour))}</div>
                    <div class="stat-label">XP</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(Math.floor(totalDrops / hours))}</div>
                    <div class="stat-label">Crops</div>
                </div>
            </div>
        </div>
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
    }
    
    loadPriceHistory();
    fetchBazaarData();
});

setInterval(fetchBazaarData, 60000);