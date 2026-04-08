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

// NPC sell prices (from Hypixel Wiki)
const NPC_SELL_PRICES = {
    // Raw
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
    'ENCHANTED_CACTUS': 25600,
};

// Base drops per block
const BASE_DROPS = {
    'WHEAT': 1,
    'CARROT_ITEM': 3,
    'POTATO_ITEM': 3,
    'PUMPKIN': 1,
    'MELON': 4,
    'COCOA_BEANS': 2.5,
    'SUGAR_CANE': 1,
    'NETHER_STALK': 2.5,
    'CACTUS': 1,
    'MUSHROOM_COLLECTION': 1,
};

// XP per block
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
    'CACTUS': { t1: { id: 'ENCHANTED_CACTUS_GREEN', cost: 160 }, t2: { id: 'ENCHANTED_CACTUS', cost: 25600 } },
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
    return Math.floor(num).toLocaleString();
}

// =====================================================
// CROP INFO UPDATE
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
        if (elephantDisplay) elephantDisplay.innerHTML = `☘️ <strong>+${fortune.toFixed(1)} Farming Fortune</strong>`;
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
                <img src="${getItemIcon(itemId)}" alt="${displayName}" style="width: 32px; height: 32px;" onerror="this.style.display='none'">
                <h3>${displayName}</h3>
            </div>
            <p class="label">Insta-Buy</p>
            <p class="buy-price">${formatCoins(buyPrice)}</p>
            <p class="label">Insta-Sell</p>
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
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded.');
        return;
    }
    
    if (currentChart) {
        currentChart.destroy();
        currentChart = null;
    }
    
    let history = [...(priceHistory[itemId] || [])];
    
    if (history.length < 2) {
        const now = Date.now();
        const basePrice = bazaarData[itemId]?.quick_status.sellPrice || 100;
        for (let i = 10; i >= 0; i--) {
            history.push({
                time: now - (i * 24 * 60 * 60 * 1000),
                sellPrice: basePrice * (0.9 + Math.random() * 0.2),
                buyPrice: basePrice * (1.1 + Math.random() * 0.2)
            });
        }
    }
    
    currentChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: history.map(p => new Date(p.time).toLocaleDateString()),
            datasets: [
                { label: 'Sell', data: history.map(p => p.sellPrice), borderColor: '#FF6B6B', backgroundColor: 'rgba(255, 107, 107, 0.1)', tension: 0.4 },
                { label: 'Buy', data: history.map(p => p.buyPrice), borderColor: '#5EEAD4', backgroundColor: 'rgba(94, 234, 212, 0.1)', tension: 0.4 }
            ]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: '#F0F0F0' } } },
            scales: {
                y: { ticks: { color: '#888', callback: v => formatCoins(v) }, grid: { color: '#2A2A2A' } },
                x: { ticks: { color: '#888' }, grid: { color: '#2A2A2A' } }
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
// FIND BEST SELL METHOD
// =====================================================

function findBestSellMethod(cropId, totalDrops) {
    const strategies = [];
    
    const bazaarSell = bazaarData[cropId]?.quick_status?.sellPrice || 0;
    const bazaarBuy = bazaarData[cropId]?.quick_status?.buyPrice || 0;
    const npcPrice = NPC_SELL_PRICES[cropId] || 0;
    
    // Raw sells
    if (bazaarSell > 0) {
        strategies.push({ 
            name: 'Raw → Bazaar Insta-Sell', 
            coins: totalDrops * bazaarSell,
            detail: `${formatNumber(totalDrops)} × ${formatCoins(bazaarSell)}`
        });
    }
    if (bazaarBuy > 0) {
        strategies.push({ 
            name: 'Raw → Bazaar Sell Order', 
            coins: totalDrops * bazaarBuy,
            detail: `${formatNumber(totalDrops)} × ${formatCoins(bazaarBuy)}`
        });
    }
    if (npcPrice > 0) {
        strategies.push({ 
            name: 'Raw → NPC', 
            coins: totalDrops * npcPrice,
            detail: `${formatNumber(totalDrops)} × ${formatCoins(npcPrice)}`
        });
    }
    
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
            strategies.push({ 
                name: 'Ench T1 → Bazaar Insta-Sell', 
                coins: (t1Count * t1Sell) + (leftover * bazaarSell),
                detail: `${formatNumber(t1Count)} enchanted + ${formatNumber(leftover)} raw`
            });
        }
        if (t1Buy > 0 && t1Count > 0) {
            strategies.push({ 
                name: 'Ench T1 → Bazaar Sell Order', 
                coins: (t1Count * t1Buy) + (leftover * bazaarBuy),
                detail: `${formatNumber(t1Count)} enchanted + ${formatNumber(leftover)} raw`
            });
        }
        if (t1Npc > 0 && t1Count > 0) {
            strategies.push({ 
                name: 'Ench T1 → NPC', 
                coins: (t1Count * t1Npc) + (leftover * npcPrice),
                detail: `${formatNumber(t1Count)} enchanted + ${formatNumber(leftover)} raw`
            });
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
                    name: 'Ench T2 → Bazaar Insta-Sell', 
                    coins: (t2Count * t2Sell) + (t1FromLeft * t1Sell) + (rawLeft * bazaarSell),
                    detail: `${formatNumber(t2Count)} T2 + ${formatNumber(t1FromLeft)} T1 + ${formatNumber(rawLeft)} raw`
                });
            }
            if (t2Buy > 0 && t2Count > 0) {
                strategies.push({ 
                    name: 'Ench T2 → Bazaar Sell Order', 
                    coins: (t2Count * t2Buy) + (t1FromLeft * t1Buy) + (rawLeft * bazaarBuy),
                    detail: `${formatNumber(t2Count)} T2 + ${formatNumber(t1FromLeft)} T1 + ${formatNumber(rawLeft)} raw`
                });
            }
            if (t2Npc > 0 && t2Count > 0) {
                strategies.push({ 
                    name: 'Ench T2 → NPC', 
                    coins: (t2Count * t2Npc) + (t1FromLeft * t1Npc) + (rawLeft * npcPrice),
                    detail: `${formatNumber(t2Count)} T2 + ${formatNumber(t1FromLeft)} T1 + ${formatNumber(rawLeft)} raw`
                });
            }
        }
    }
    
    // Sort and return best
    strategies.sort((a, b) => b.coins - a.coins);
    return strategies[0] || { name: 'N/A', coins: 0, detail: '' };
}

// =====================================================
// MAIN CALCULATION
// =====================================================

function calculateProfit() {
    const cropId = document.getElementById('crop-select').value;
    const farmTime = parseInt(document.getElementById('farm-time')?.value) || 60;
    const breakSpeed = parseFloat(document.getElementById('break-speed')?.value) || 20;
    const farmingFortune = parseFloat(document.getElementById('farming-fortune')?.value) || 0;
    const cropFortune = parseFloat(document.getElementById('crop-fortune')?.value) || 0;
    const farmingWisdom = parseFloat(document.getElementById('farming-wisdom')?.value) || 0;
    
    const anitaBonus = document.getElementById('anita-bonus')?.checked ? 1.10 : 1.0;
    const derpyActive = document.getElementById('derpy-active')?.checked;
    
    const resultDiv = document.getElementById('calc-result');
    if (!resultDiv) return;
    
    // Validate input
    if (breakSpeed <= 0) {
        resultDiv.innerHTML = `<p style="color: var(--red);">⚠️ Please enter a valid break speed.</p>`;
        return;
    }
    
    const baseDrop = BASE_DROPS[cropId] || 1;
    const totalFortune = farmingFortune + cropFortune + getPetFortune(cropId);
    const fortuneMultiplier = 1 + (totalFortune / 100);
    const dropsPerBlock = baseDrop * fortuneMultiplier * anitaBonus;
    
    const totalSeconds = farmTime * 60;
    const totalBreaks = breakSpeed * totalSeconds;
    const totalDrops = Math.floor(totalBreaks * dropsPerBlock);
    const cropsPerMin = (totalDrops / totalSeconds) * 60;
    
    // Calculate XP
    const baseXP = XP_PER_BLOCK[cropId] || 4;
    const wisdomMult = 1 + (farmingWisdom / 100);
    const derpyXPMult = derpyActive ? 1.5 : 1.0;
    const totalXP = Math.floor(totalBreaks * baseXP * wisdomMult * derpyXPMult);
    
    // Find best sell method
    let bestMethod = findBestSellMethod(cropId, totalDrops);
    
    // Apply Derpy coin penalty
    if (derpyActive) {
        bestMethod.coins *= 0.5;
    }
    
    // Hourly rates
    const hours = farmTime / 60;
    const coinsPerHour = bestMethod.coins / hours;
    const xpPerHour = totalXP / hours;
    const cropsPerHour = totalDrops / hours;
    
    resultDiv.innerHTML = `
        <div class="result-header">
            <img src="${getItemIcon(cropId)}" alt="${GARDEN_CROPS[cropId]}" class="crop-icon" onerror="this.style.display='none'">
            <div>
                <h3>${GARDEN_CROPS[cropId]}</h3>
                <p>⏱️ ${farmTime} minutes farming</p>
            </div>
        </div>
        
        <div class="result-section">
            <h4>📊 Session Stats</h4>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(breakSpeed)}</div>
                    <div class="stat-label">Blocks/sec</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(Math.floor(cropsPerMin))}</div>
                    <div class="stat-label">Crops/min</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(totalDrops)}</div>
                    <div class="stat-label">Total Crops</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${formatNumber(totalXP)}</div>
                    <div class="stat-label">Total XP</div>
                </div>
            </div>
        </div>
        
        <div class="best-profit-box">
            <h4>💰 Best Profit</h4>
            <div class="big-number">${formatCoins(bestMethod.coins)}</div>
            <div class="method">👑 ${bestMethod.name}</div>
            <div class="method-detail">${bestMethod.detail}</div>
            ${derpyActive ? '<p style="color: var(--red); font-size: 0.8rem; margin-top: 0.5rem;">🤪 Derpy: Coins halved</p>' : ''}
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
        
        ${totalFortune > 0 ? `
        <div class="result-section">
            <h4>☘️ Fortune Breakdown</h4>
            <p>☘️ Farming Fortune: <strong>${farmingFortune}</strong></p>
            <p>🌾 Crop Fortune: <strong>${cropFortune}</strong></p>
            ${getPetFortune(cropId) > 0 ? `<p>🐾 Pet Fortune: <strong>+${getPetFortune(cropId).toFixed(1)}</strong></p>` : ''}
            <p>📊 Total: <span class="highlight-value">${totalFortune.toFixed(1)}</span> (×${fortuneMultiplier.toFixed(2)} drops)</p>
        </div>
        ` : ''}
        
        ${farmingWisdom > 0 || derpyActive ? `
        <div class="result-section">
            <h4>⭐ XP Bonuses</h4>
            ${farmingWisdom > 0 ? `<p>📚 Wisdom: <strong>+${farmingWisdom}%</strong></p>` : ''}
            ${derpyActive ? `<p>🤪 Derpy: <strong>+50% XP</strong></p>` : ''}
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
    updateCropInfo();
});

setInterval(fetchBazaarData, 60000);