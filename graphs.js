function initializeGraphTab() {
    const graphSection = document.querySelector('[data-tab="graphs"]');
    if (!graphSection) return;

    // Optionally keep the loading text visible and update once data is loaded.
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.textContent = 'Loading prices...';
    }
}

document.addEventListener('DOMContentLoaded', initializeGraphTab);
