// =====================================================
// GREENHOUSE MUTATIONS - COMPLETE DATABASE
// =====================================================

const MUTATIONS = {
    // COMMON RARITY
    'ASHWREATH': {
        name: 'Ashwreath',
        rarity: 'COMMON',
        size: '1x1',
        surface: 'Soul Sand',
        baseDrop: { 'NETHER_STALK': 360 },
        primaryCrop: 'NETHER_STALK'
    },
    'CHOCONUT': {
        name: 'Choconut',
        rarity: 'COMMON',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'COCOA_BEANS': 200 },
        primaryCrop: 'COCOA_BEANS'
    },
    'DUSTGRAIN': {
        name: 'Dustgrain',
        rarity: 'COMMON',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'WHEAT': 100 },
        primaryCrop: 'WHEAT'
    },
    'GLOOMGOURD': {
        name: 'Gloomgourd',
        rarity: 'COMMON',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'PUMPKIN': 30, 'MELON': 140 },
        primaryCrop: 'MELON'
    },
    'LONELILY': {
        name: 'Lonelily',
        rarity: 'COMMON',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'POTATO_ITEM': 600, 'CARROT_ITEM': 700, 'PUMPKIN': 340 },
        primaryCrop: 'CARROT_ITEM'
    },
    'SCOURROOT': {
        name: 'Scourroot',
        rarity: 'COMMON',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'POTATO_ITEM': 105, 'CARROT_ITEM': 122 },
        primaryCrop: 'CARROT_ITEM'
    },
    'SHADEVINE': {
        name: 'Shadevine',
        rarity: 'COMMON',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'CACTUS': 68, 'SUGAR_CANE': 90 },
        primaryCrop: 'SUGAR_CANE'
    },
    'VEILSHROOM': {
        name: 'Veilshroom',
        rarity: 'COMMON',
        size: '1x1',
        surface: 'Mycelium',
        baseDrop: { 'MUSHROOM_COLLECTION': 66 }, // 33+33
        primaryCrop: 'MUSHROOM_COLLECTION'
    },
    'WITHERBLOOM': {
        name: 'Witherbloom',
        rarity: 'COMMON',
        size: '1x1',
        surface: 'Soul Sand',
        baseDrop: { 'WILD_ROSE': 300 },
        primaryCrop: 'WILD_ROSE'
    },
    // UNCOMMON RARITY
    'CHOCOBERRY': {
        name: 'Chocoberry',
        rarity: 'UNCOMMON',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'COCOA_BEANS': 400, 'PUMPKIN': 170, 'MELON': 1600 },
        primaryCrop: 'COCOA_BEANS'
    },
    'CINDERSHADE': {
        name: 'Cindershade',
        rarity: 'UNCOMMON',
        size: '1x1',
        surface: 'Soul Sand',
        baseDrop: { 'NETHER_STALK': 1200, 'WILD_ROSE': 800 },
        primaryCrop: 'NETHER_STALK'
    },
    'COALROOT': {
        name: 'Coalroot',
        rarity: 'UNCOMMON',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'POTATO_ITEM': 600, 'CARROT_ITEM': 1400, 'NETHER_STALK': 600 },
        primaryCrop: 'CARROT_ITEM'
    },
    'CREAMBLOOM': {
        name: 'Creambloom',
        rarity: 'UNCOMMON',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'COCOA_BEANS': 1600 },
        primaryCrop: 'COCOA_BEANS'
    },
    'DUSKBLOOM': {
        name: 'Duskbloom',
        rarity: 'UNCOMMON',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'SUNFLOWER': 533, 'MOONFLOWER': 533, 'WHEAT': 267 },
        primaryCrop: 'MOONFLOWER'
    },
    'THORNSHADE': {
        name: 'Thornshade',
        rarity: 'UNCOMMON',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'MUSHROOM_COLLECTION': 380, 'WILD_ROSE': 800 }, // 190+190 mushrooms
        primaryCrop: 'WILD_ROSE'
    },
    // RARE RARITY
    'BLASTBERRY': {
        name: 'Blastberry',
        rarity: 'RARE',
        size: '1x1',
        surface: 'Sand',
        baseDrop: { 'COCOA_BEANS': 1200, 'NETHER_STALK': 1800 },
        primaryCrop: 'NETHER_STALK'
    },
    'CHEESEBITE': {
        name: 'Cheesebite',
        rarity: 'RARE',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'MUSHROOM_COLLECTION': 380, 'CACTUS': 600, 'SUGAR_CANE': 800 }, // 190+190 mushrooms
        primaryCrop: 'SUGAR_CANE'
    },
    'CHLORONITE': {
        name: 'Chloronite',
        rarity: 'RARE',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'MUSHROOM_COLLECTION': 190, 'POTATO_ITEM': 600, 'CARROT_ITEM': 700, 'WILD_ROSE': 400 }, // 95+95 mushrooms
        primaryCrop: 'CARROT_ITEM'
    },
    'DO_NOT_EAT_SHROOM': {
        name: 'Do-not-eat-shroom',
        rarity: 'RARE',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'MUSHROOM_COLLECTION': 760, 'POTATO_ITEM': 1200, 'CARROT_ITEM': 1400 }, // 380+380 mushrooms
        primaryCrop: 'CARROT_ITEM'
    },
    'FLESHTRAP': {
        name: 'Fleshtrap',
        rarity: 'RARE',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'POTATO_ITEM': 1200, 'CARROT_ITEM': 1400, 'PUMPKIN': 680 },
        primaryCrop: 'CARROT_ITEM'
    },
    'MAGIC_JELLYBEAN': {
        name: 'Magic Jellybean',
        rarity: 'RARE',
        size: '1x1',
        surface: 'Sand',
        baseDrop: { 'MOONFLOWER': 600, 'SUNFLOWER': 600, 'SUGAR_CANE': 1200 },
        primaryCrop: 'SUGAR_CANE'
    },
    'NOCTILUME': {
        name: 'Noctilume',
        rarity: 'RARE',
        size: '2x2',
        surface: 'Farmland',
        baseDrop: { 'CACTUS': 1200, 'WILD_ROSE': 1600 },
        primaryCrop: 'WILD_ROSE'
    },
    'SNOOZLING': {
        name: 'Snoozling',
        rarity: 'RARE',
        size: '3x3',
        surface: 'Farmland',
        baseDrop: { 'MOONFLOWER': 800, 'SUNFLOWER': 800, 'CACTUS': 600, 'SUGAR_CANE': 800 },
        primaryCrop: 'MOONFLOWER'
    },
    'SOGGYBUD': {
        name: 'Soggybud',
        rarity: 'RARE',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'MELON': 3200 },
        primaryCrop: 'MELON'
    },
    // EPIC RARITY
    'CHORUS_FRUIT': {
        name: 'Chorus Fruit',
        rarity: 'EPIC',
        size: '1x1',
        surface: 'End Stone',
        baseDrop: { 'POTATO_ITEM': 1500, 'CARROT_ITEM': 1700, 'SUGAR_CANE': 2000 },
        primaryCrop: 'SUGAR_CANE'
    },
    'PLANTBOY_ADVANCE': {
        name: 'PlantBoy Advance',
        rarity: 'EPIC',
        size: '2x2',
        surface: 'Farmland',
        baseDrop: { 'MOONFLOWER': 1200, 'SUNFLOWER': 1200, 'WHEAT': 122 },
        primaryCrop: 'MOONFLOWER'
    },
    'PUFFERCLOUD': {
        name: 'Puffercloud',
        rarity: 'EPIC',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'MUSHROOM_COLLECTION': 1330, 'MOONFLOWER': 1400, 'SUNFLOWER': 1400 }, // 665+665 mushrooms
        primaryCrop: 'MOONFLOWER'
    },
    'SHELLFRUIT': {
        name: 'Shellfruit',
        rarity: 'EPIC',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'COCOA_BEANS': 400, 'MELON': 800 },
        primaryCrop: 'MELON'
    },
    'STARTLEVINE': {
        name: 'Startlevine',
        rarity: 'EPIC',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'CACTUS': 1500, 'SUGAR_CANE': 2000 },
        primaryCrop: 'SUGAR_CANE'
    },
    'STOPLIGHT_PETAL': {
        name: 'Stoplight Petal',
        rarity: 'EPIC',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'CACTUS': 2400, 'WILD_ROSE': 3200 },
        primaryCrop: 'WILD_ROSE'
    },
    'THUNDERLING': {
        name: 'Thunderling',
        rarity: 'EPIC',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'CACTUS': 900, 'MELON': 2400, 'WILD_ROSE': 2400 },
        primaryCrop: 'WILD_ROSE'
    },
    'TURTLELLINI': {
        name: 'Turtlellini',
        rarity: 'EPIC',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: {}, // No crop drops
        primaryCrop: 'NONE'
    },
    'ZOMBUD': {
        name: 'Zombud',
        rarity: 'EPIC',
        size: '1x1',
        surface: 'Soul Sand',
        baseDrop: { 'PUMPKIN': 1190, 'WILD_ROSE': 2800 },
        primaryCrop: 'WILD_ROSE'
    },
    // LEGENDARY RARITY
    'ALL_IN_ALOE': {
        name: 'All-in Aloe',
        rarity: 'LEGENDARY',
        size: '1x1',
        surface: 'Sand',
        baseDrop: { 'MOONFLOWER': 100, 'SUNFLOWER': 100, 'WHEAT': 100 },
        primaryCrop: 'MOONFLOWER'
    },
    'DEVOURER': {
        name: 'Devourer',
        rarity: 'LEGENDARY',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: { 'PUMPKIN': 1700, 'MUSHROOM_COLLECTION': 1900, 'WILD_ROSE': 0 }, // 950+950 mushrooms (intentionally showing as 1900 for calculation)
        primaryCrop: 'PUMPKIN'
    },
    'GLASSCORN': {
        name: 'Glasscorn',
        rarity: 'LEGENDARY',
        size: '2x2',
        surface: 'Sand',
        baseDrop: { 'CACTUS': 2400, 'POTATO_ITEM': 4800 },
        primaryCrop: 'POTATO_ITEM'
    },
    'GODSEED': {
        name: 'Godseed',
        rarity: 'LEGENDARY',
        size: '3x3',
        surface: 'Farmland',
        baseDrop: {
            'CACTUS': 369,
            'CARROT_ITEM': 862,
            'MELON': 985,
            'COCOA_BEANS': 492,
            'MOONFLOWER': 492,
            'SUNFLOWER': 492,
            'SUGAR_CANE': 492,
            'WILD_ROSE': 492,
            'NETHER_STALK': 738,
            'POTATO_ITEM': 738,
            'PUMPKIN': 209,
            'MUSHROOM_COLLECTION': 234, // 117+117
            'WHEAT': 246
        },
        primaryCrop: 'CARROT_ITEM'
    },
    'JERRYFLOWER': {
        name: 'Jerryflower',
        rarity: 'LEGENDARY',
        size: '1x1',
        surface: 'Farmland',
        baseDrop: {}, // No crop drops
        primaryCrop: 'NONE'
    },
    'PHANTOMLEAF': {
        name: 'Phantomleaf',
        rarity: 'LEGENDARY',
        size: '1x1',
        surface: 'Soul Sand',
        baseDrop: { 'POTATO_ITEM': 4800, 'CARROT_ITEM': 5600 },
        primaryCrop: 'CARROT_ITEM'
    },
    'TIMESTALK': {
        name: 'Timestalk',
        rarity: 'LEGENDARY',
        size: '1x1',
        surface: 'End Stone',
        baseDrop: { 'CACTUS': 3000, 'SUGAR_CANE': 4000 },
        primaryCrop: 'SUGAR_CANE'
    }
};

// Greenhouse crop XP rates (XP per unit)
const MUTATION_XP_RATES = {
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
    'WILD_ROSE': 5,      // Exotic crops have higher XP
    'MOONFLOWER': 5,
    'SUNFLOWER': 5
};

function getMutationProfit(mutationId, includeAllDrops = false) {
    const mutation = MUTATIONS[mutationId];
    if (!mutation) return { total: 0, breakdown: {} };

    const breakdown = {};
    let totalProfit = 0;
    let totalXP = 0;

    for (const [cropId, amount] of Object.entries(mutation.baseDrop)) {
        const npcPrice = NPC_SELL_PRICES[cropId] || 0;
        const profit = amount * npcPrice;
        const xp = (amount * (MUTATION_XP_RATES[cropId] || 1));
        
        breakdown[cropId] = {
            amount,
            price: npcPrice,
            profit,
            xp
        };
        totalProfit += profit;
        totalXP += xp;
    }

    return { total: totalProfit, totalXP, breakdown, mutation };
}

function displayGreenhouseMutations() {
    const container = document.getElementById('greenhouse-grid');
    if (!container) return;
    container.innerHTML = '';

    // Sort mutations by profit
    const ranked = Object.entries(MUTATIONS)
        .map(([id, mut]) => ({
            id,
            ...mut,
            ...getMutationProfit(id)
        }))
        .sort((a, b) => b.total - a.total);

    for (const mutation of ranked) {
        const card = document.createElement('div');
        card.className = 'greenhouse-card';
        card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <img src="${getItemIcon(mutation.id)}" style="width: 24px; height: 24px; border-radius: 4px;" onerror="this.style.display='none'">
                <h3 style="margin: 0; flex: 1;">${mutation.name}</h3>
                <span class="rarity-badge rarity-${mutation.rarity.toLowerCase()}">${mutation.rarity}</span>
            </div>
            <p style="font-size: 0.85rem; color: #888; margin: 0.25rem 0;">Size: ${mutation.size} | Surface: ${mutation.surface}</p>
            <div style="margin: 0.5rem 0; padding-top: 0.5rem; border-top: 1px solid #2A2A2A;">
                ${Object.entries(mutation.breakdown).map(([cropId, data]) => `
                    <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin: 0.25rem 0;">
                        <span><img src="${getItemIcon(cropId)}" style="width: 16px; height: 16px; vertical-align: middle; margin-right: 0.25rem; border-radius: 2px;" onerror="this.style.display='none'">${data.amount}x</span>
                        <span style="color: #A5F0D6;">${formatCoins(data.profit)}</span>
                    </div>
                `).join('')}
            </div>
            ${Object.keys(mutation.baseDrop).length === 0 ? '<p style="font-size: 0.85rem; color: #FF6B6B;">❌ No crop drops</p>' : ''}
            <div style="padding-top: 0.5rem; border-top: 1px solid #2A2A2A; margin-top: 0.5rem;">
                <div style="display: flex; justify-content: space-between;">
                    <div>
                        <strong style="color: #A5F0D6;">💰 ${formatCoins(mutation.total)}</strong>
                    </div>
                    <div>
                        <strong style="color: #FFD700;">✨ ${Math.round(mutation.totalXP)} XP</strong>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    }
}

// Initialize greenhouse display when bazaar data loads
function initGreenhouse() {
    if (bazaarData && Object.keys(bazaarData).length > 0) {
        displayGreenhouseMutations();
        populateGreenhouseMutationSelect();
        populateMutationHarvestSelect();
        updateGhCropFortuneList();
    }
}

function populateGreenhouseMutationSelect() {
    const select = document.getElementById('gh-mutation-select');
    if (!select) return;

    select.innerHTML = '<option value="">-- Choose a Mutation --</option>'; // reset before populating

    const mutations = Object.entries(MUTATIONS)
        .sort((a, b) => {
            const rarityOrder = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY'];
            const rarityCompare = rarityOrder.indexOf(a[1].rarity) - rarityOrder.indexOf(b[1].rarity);
            return rarityCompare !== 0 ? rarityCompare : a[1].name.localeCompare(b[1].name);
        });

    for (const [id, mut] of mutations) {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = `${mut.name} (${mut.rarity})`;
        select.appendChild(option);
    }
}

function toggleGreenhouseView(view) {
    const listView = document.getElementById('gh-view-list');
    const calcView = document.getElementById('gh-view-calculator');
    const listBtn = document.getElementById('gh-view-toggle-list');
    const calcBtn = document.getElementById('gh-view-toggle-calc');

    if (view === 'list') {
        listView.style.display = 'block';
        calcView.style.display = 'none';
        listBtn.classList.add('active');
        calcBtn.classList.remove('active');
    } else if (view === 'calculator') {
        listView.style.display = 'none';
        calcView.style.display = 'block';
        listBtn.classList.remove('active');
        calcBtn.classList.add('active');
    }
}

function updateGreenhouseCalc() {
    const mutationId = document.getElementById('gh-mutation-select').value;
    if (!mutationId) {
        document.getElementById('gh-result-coins').textContent = '0 coins';
        document.getElementById('gh-result-xp').textContent = '0 XP';
        document.getElementById('gh-result-pet-xp').textContent = '0 PXP';
        document.getElementById('gh-result-crops').textContent = '0';
        document.getElementById('gh-crop-breakdown').innerHTML = '<span style="color: #888;">Select a mutation to see results</span>';
        return;
    }

    const mutation = MUTATIONS[mutationId];
    const harvests = parseInt(document.getElementById('gh-harvests').value) || 1;
    const farmingFortune = parseInt(document.getElementById('gh-farming-fortune').value) || 0;
    const farmingWisdom = parseInt(document.getElementById('gh-farming-wisdom').value) || 0;
    const petExpMult = parseFloat(document.getElementById('gh-pet-exp-mult').value) || 1;
    const anitaBonus = document.getElementById('gh-anita-bonus').checked;
    const derpy = document.getElementById('gh-derpy').checked;

    // Calculate fortune multiplier
    const fortuneMult = 1 + (farmingFortune / 100);

    let totalCoins = 0;
    let totalXP = 0;
    let totalCrops = 0;
    const breakdown = {};

    // Process each crop in the mutation
    for (const [cropId, baseAmount] of Object.entries(mutation.baseDrop)) {
        const npcPrice = NPC_SELL_PRICES[cropId] || 0;
        const xpRate = MUTATION_XP_RATES[cropId] || 1;

        // Apply fortune multiplier
        const cropsPerHarvest = baseAmount * fortuneMult;
        const totalCropsFromThisCrop = cropsPerHarvest * harvests;

        // Calculate coins (NPC sell price)
        const coinsPerHarvest = cropsPerHarvest * npcPrice * harvests;
        
        // Calculate XP
        const xpPerHarvest = cropsPerHarvest * xpRate;
        const totalXPThisCrop = xpPerHarvest * harvests;

        totalCoins += coinsPerHarvest;
        totalXP += totalXPThisCrop;
        totalCrops += totalCropsFromThisCrop;

        breakdown[cropId] = {
            crops: totalCropsFromThisCrop,
            coins: coinsPerHarvest,
            xp: totalXPThisCrop
        };
    }

    // Apply Anita Bonus (10% coins)
    if (anitaBonus) {
        totalCoins *= 1.1;
    }

    // Apply Derpy bonus (25% XP)
    if (derpy) {
        totalXP *= 1.25;
    }

    // Apply Farming Wisdom (boosts XP)
    totalXP *= (1 + farmingWisdom * 0.01);

    // Pet XP calculation (usually 5% of farming XP for balance)
    const totalPetXP = totalXP * 0.05 * petExpMult;

    // Display results
    document.getElementById('gh-result-coins').textContent = formatCoins(totalCoins);
    document.getElementById('gh-result-xp').textContent = formatNumber(Math.round(totalXP));
    document.getElementById('gh-result-pet-xp').textContent = formatNumber(Math.round(totalPetXP));
    document.getElementById('gh-result-crops').textContent = formatNumber(Math.round(totalCrops));

    // Display crop breakdown
    let breakdownHTML = '';
    for (const [cropId, data] of Object.entries(breakdown)) {
        const cropName = GARDEN_CROPS[cropId] || cropId;
        breakdownHTML += `<div style="display: flex; justify-content: space-between; margin: 0.5rem 0; padding: 0.5rem; background: #0F1317; border-radius: 4px;">
            <img src="${getItemIcon(cropId)}" style="width: 18px; height: 18px; vertical-align: middle; border-radius: 2px;" onerror="this.style.display='none'">
            <span>${cropName}: <strong style="color: #61C9B1;">${formatNumber(Math.round(data.crops))}</strong></span>
            <span>${formatCoins(data.coins)}</span>
        </div>`;
    }
    document.getElementById('gh-crop-breakdown').innerHTML = breakdownHTML;
}

// =====================================================
// MUTATION HARVEST SYSTEM FOR COMBINED CALCULATIONS
// =====================================================

let mutationHarvest = {}; // { mutationId_harvests: { mutationId, harvests }, ... }

let ghCropFortunes = {};

function populateMutationHarvestSelect() {
    const select = document.getElementById('gh-mutation-select');
    if (!select) return;
    
    // This select is already populated by populateGreenhouseMutationSelect()
    // Just ensure it has the right ID - it should
}

function addGhCropFortuneEntry() {
    const cropSelect = document.getElementById('gh-crop-fortune-crop-select');
    const fortuneInput = document.getElementById('gh-crop-fortune-value');
    const cropId = cropSelect.value;
    const fortuneValue = parseFloat(fortuneInput.value) || 0;

    if (!cropId) {
        alert('Please choose a crop to add fortune for.');
        return;
    }
    if (fortuneValue <= 0) {
        alert('Please enter a crop fortune percent above 0.');
        return;
    }

    ghCropFortunes[cropId] = fortuneValue;
    cropSelect.value = '';
    fortuneInput.value = '100';
    updateGhCropFortuneList();
    updateMutationHarvestResults();
}

function removeGhCropFortuneEntry(cropId) {
    delete ghCropFortunes[cropId];
    updateGhCropFortuneList();
    updateMutationHarvestResults();
}

function updateGhCropFortuneList() {
    const list = document.getElementById('gh-crop-fortune-list');
    if (!list) return;

    const entries = Object.entries(ghCropFortunes);
    if (entries.length === 0) {
        list.innerHTML = 'No crop fortunes added yet.';
        return;
    }

    list.innerHTML = entries.map(([cropId, value]) => {
        const cropName = GARDEN_CROPS[cropId] || cropId;
        return `<div style="display:flex; justify-content:space-between; align-items:center; gap:0.75rem; padding:0.35rem 0; border-bottom:1px solid #0F1317;">
            <span style="color:#D7FFF2;">${cropName}: ${value}%</span>
            <button onclick="removeGhCropFortuneEntry('${cropId}')" style="background:#FF4444; color:white; border:none; border-radius:6px; padding:0.35rem 0.75rem; cursor:pointer;">Remove</button>
        </div>`;
    }).join('');
}

function addMutationToHarvest() {
    const mutationId = document.getElementById('gh-mutation-select').value;
    const harvests = parseInt(document.getElementById('gh-harvests').value) || 1;
    
    if (!mutationId) {
        alert('Please select a mutation');
        return;
    }
    
    if (harvests < 1) {
        alert('Please enter at least 1 harvest');
        return;
    }
    
    // Create unique key for this mutation (can add same mutation multiple times)
    const key = `${mutationId}_${Date.now()}`;
    mutationHarvest[key] = {
        mutationId: mutationId,
        harvests: harvests
    };
    
    // Reset form
    document.getElementById('gh-mutation-select').value = '';
    document.getElementById('gh-harvests').value = '1';
    
    updateMutationHarvestDisplay();
}

function removeMutationFromHarvest(key) {
    delete mutationHarvest[key];
    updateMutationHarvestDisplay();
}

function clearMutationHarvest() {
    mutationHarvest = {};
    updateMutationHarvestDisplay();
}

function updateMutationHarvestDisplay() {
    const list = document.getElementById('gh-harvest-list');
    
    if (Object.keys(mutationHarvest).length === 0) {
        list.innerHTML = '<div style="padding: 1rem; color: #888; text-align: center;">No mutations added yet</div>';
    } else {
        let html = '';
        
        for (const [key, data] of Object.entries(mutationHarvest)) {
            const mutation = MUTATIONS[data.mutationId];
            const mutationName = mutation ? mutation.name : data.mutationId;
            
            html += `<div style="padding: 0.75rem; border-bottom: 1px solid #0F1317; display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <strong>${data.harvests} harvest${data.harvests > 1 ? 's' : ''}: ${mutationName}</strong>
                    <div style="font-size: 0.85rem; color: #888;">ID: ${data.mutationId}</div>
                </div>
                <button onclick="removeMutationFromHarvest('${key}')" style="background: #FF4444; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem;">Remove</button>
            </div>`;
        }
        
        list.innerHTML = html;
    }
    
    // Update results
    updateMutationHarvestResults();
}

function updateMutationHarvestResults() {
    const anitaBonus = document.getElementById('gh-anita-bonus').checked;
    const derpy = document.getElementById('gh-derpy').checked;
    const farmingFortune = parseInt(document.getElementById('gh-farming-fortune').value) || 0;
    const chipYield = parseInt(document.getElementById('gh-chip-yield').value) || 0;
    const gardenUpgrade = parseInt(document.getElementById('gh-garden-upgrade').value) || 0;
    
    let totalCoins = 0;
    let totalXP = 0;
    let totalPetXP = 0;
    let totalCrops = 0;
    const cropBreakdown = {};
    
    const fortuneMult = 1 + (farmingFortune / 100);
    const chipYieldMult = 1 + (chipYield / 100);
    const gardenUpgradeMult = 1 + (gardenUpgrade / 100);
    
    for (const [key, data] of Object.entries(mutationHarvest)) {
        const mutation = MUTATIONS[data.mutationId];
        if (!mutation) continue;
        
        for (const [cropId, baseAmount] of Object.entries(mutation.baseDrop)) {
            const npcPrice = NPC_SELL_PRICES[cropId] || 0;
            const xpRate = MUTATION_XP_RATES[cropId] || 1;
            const cropFortune = ghCropFortunes[cropId] || 0;
            const fortuneMultForCrop = 1 + ((farmingFortune + cropFortune) / 100);
            const cropsPerHarvest = baseAmount * fortuneMultForCrop * chipYieldMult * gardenUpgradeMult;
            const totalCropsFromThisCrop = cropsPerHarvest * data.harvests;
            const coinsFromThisMutation = cropsPerHarvest * npcPrice * data.harvests;
            const totalXPThisCrop = cropsPerHarvest * xpRate * data.harvests;
            
            totalCoins += coinsFromThisMutation;
            totalXP += totalXPThisCrop;
            totalCrops += totalCropsFromThisCrop;
            
            if (!cropBreakdown[cropId]) {
                cropBreakdown[cropId] = {
                    name: GARDEN_CROPS[cropId] || (typeof EXTRA_ITEMS !== 'undefined' ? EXTRA_ITEMS[cropId] : undefined) || cropId,
                    crops: 0,
                    coins: 0,
                    xp: 0
                };
            }
            cropBreakdown[cropId].crops += totalCropsFromThisCrop;
            cropBreakdown[cropId].coins += coinsFromThisMutation;
            cropBreakdown[cropId].xp += totalXPThisCrop;
        }
    }
    
    if (anitaBonus) {
        totalCoins *= 1.1;
    }
    if (derpy) {
        totalXP *= 1.25;
    }
    totalPetXP = totalXP * 0.05;
    
    document.getElementById('gh-harvest-coins').textContent = formatCoins(totalCoins);
    document.getElementById('gh-harvest-xp').textContent = formatNumber(Math.round(totalXP)) + ' XP';
    document.getElementById('gh-harvest-pet-xp').textContent = formatNumber(Math.round(totalPetXP)) + ' PXP';
    document.getElementById('gh-harvest-crops').textContent = formatNumber(Math.round(totalCrops));
    
    const sortedCrops = Object.entries(cropBreakdown).sort((a, b) => b[1].coins - a[1].coins);
    let breakdownHTML = '';
    let bestCropText = '';
    
    for (const [cropId, data] of sortedCrops) {
        const cropIcon = getItemIcon(cropId);
        const recipe = ENCHANTING_RECIPES[cropId];
        const totalDrops = Math.floor(data.crops);
        let outputLines = [];

        if (recipe) {
            if (recipe.t2) {
                const t2Count = Math.floor(totalDrops / recipe.t2.cost);
                const t2Left = totalDrops - (t2Count * recipe.t2.cost);
                const t1Count = recipe.t1 ? Math.floor(t2Left / recipe.t1.cost) : 0;
                const rawLeft = t2Left - (t1Count * recipe.t1.cost);
                const t2Id = recipe.t2.id;
                const t1Id = recipe.t1?.id;
                const t2Name = GARDEN_CROPS[t2Id] || EXTRA_ITEMS[t2Id] || t2Id;
                const t1Name = GARDEN_CROPS[t1Id] || EXTRA_ITEMS[t1Id] || t1Id;

                if (t2Count > 0) {
                    outputLines.push(`<span style="display:flex; align-items:center; gap:0.35rem;"><img src="${getItemIcon(t2Id)}" style="width:16px;height:16px;border-radius:2px;" onerror="this.style.display='none'"> ${formatNumber(t2Count)}x ${t2Name}</span>`);
                }
                if (t1Count > 0) {
                    outputLines.push(`<span style="display:flex; align-items:center; gap:0.35rem;"><img src="${getItemIcon(t1Id)}" style="width:16px;height:16px;border-radius:2px;" onerror="this.style.display='none'"> ${formatNumber(t1Count)}x ${t1Name}</span>`);
                }
                if (rawLeft > 0) {
                    outputLines.push(`<span style="display:flex; align-items:center; gap:0.35rem;"><img src="${getItemIcon(cropId)}" style="width:16px;height:16px;border-radius:2px;" onerror="this.style.display='none'"> ${formatNumber(rawLeft)}x ${data.name}</span>`);
                }
            } else if (recipe.t1) {
                const t1Count = Math.floor(totalDrops / recipe.t1.cost);
                const rawLeft = totalDrops - (t1Count * recipe.t1.cost);
                const t1Id = recipe.t1.id;
                const t1Name = GARDEN_CROPS[t1Id] || EXTRA_ITEMS[t1Id] || t1Id;

                if (t1Count > 0) {
                    outputLines.push(`<span style="display:flex; align-items:center; gap:0.35rem;"><img src="${getItemIcon(t1Id)}" style="width:16px;height:16px;border-radius:2px;" onerror="this.style.display='none'"> ${formatNumber(t1Count)}x ${t1Name}</span>`);
                }
                if (rawLeft > 0) {
                    outputLines.push(`<span style="display:flex; align-items:center; gap:0.35rem;"><img src="${getItemIcon(cropId)}" style="width:16px;height:16px;border-radius:2px;" onerror="this.style.display='none'"> ${formatNumber(rawLeft)}x ${data.name}</span>`);
                }
            }
        }

        if (outputLines.length === 0) {
            outputLines.push(`<span style="display:flex; align-items:center; gap:0.35rem;"><img src="${cropIcon}" style="width:16px;height:16px;border-radius:2px;" onerror="this.style.display='none'"> ${formatNumber(totalDrops)}x ${data.name}</span>`);
        }

        breakdownHTML += `<div style="padding: 0.75rem; background: #0F1317; border-radius: 6px; margin-bottom: 0.5rem; display: flex; align-items: flex-start; gap: 0.75rem;">
            <img src="${cropIcon}" style="width: 24px; height: 24px; border-radius: 3px; margin-top: 3px;" onerror="this.style.display='none'">
            <div style="flex: 1; display:flex; flex-direction:column; gap:0.35rem;">
                ${outputLines.join('')}
            </div>
        </div>`;

        if (!bestCropText) {
            bestCropText = `<span style="display:flex; align-items:center; gap:0.5rem;"><img src="${cropIcon}" style="width:20px;height:20px;border-radius:3px;" onerror="this.style.display='none'"> <strong>${data.name}</strong> → ${formatCoins(data.coins)}</span>`;
        }
    }
    
    if (breakdownHTML === '') {
        breakdownHTML = '<span style="color: #888;">Add mutations to see the breakdown</span>';
        document.getElementById('gh-best-coin-crop').style.display = 'none';
    } else {
        document.getElementById('gh-best-coin-crop').style.display = 'block';
        document.getElementById('gh-best-coin-text').innerHTML = `Top money maker: ${bestCropText}`;
    }
    
    document.getElementById('gh-harvest-breakdown').innerHTML = breakdownHTML;
}

