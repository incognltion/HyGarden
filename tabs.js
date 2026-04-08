function initializeTabs() {
    const buttons = document.querySelectorAll('.tab-button');
    const panels = document.querySelectorAll('.tab-panel');

    function activateTab(tabName) {
        buttons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tabName);
        });
        panels.forEach(panel => {
            panel.classList.toggle('active', panel.dataset.tab === tabName);
        });
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => activateTab(button.dataset.tab));
    });

    // Default tab
    activateTab('graphs');
}

document.addEventListener('DOMContentLoaded', initializeTabs);
