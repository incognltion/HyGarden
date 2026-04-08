function initializeCalculatorTab() {
    const cropSelect = document.getElementById('crop-select');
    if (cropSelect) {
        cropSelect.addEventListener('change', updateCropInfo);
    }

    const farmTime = document.getElementById('farm-time');
    if (farmTime) {
        farmTime.addEventListener('change', updateCropInfo);
    }
}

document.addEventListener('DOMContentLoaded', initializeCalculatorTab);
