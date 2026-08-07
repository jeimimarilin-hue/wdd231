async function loadComponents() {
    const activeGrid = document.getElementById('active-grid');
    const passiveGrid = document.getElementById('passive-grid');
    
    if (!activeGrid || !passiveGrid) return;

    try {
        const response = await fetch('data/components.json');
        if (!response.ok) throw new Error('Could not load JSON file');
        
        const data = await response.json();
        const components = data.components;

        activeGrid.innerHTML = '';
        passiveGrid.innerHTML = '';

        const activeComponents = components.filter(comp => comp.category.toLowerCase().includes('active'));
        const passiveComponents = components.filter(comp => comp.category.toLowerCase().includes('passive'));

        renderGrid(activeComponents, activeGrid);
        renderGrid(passiveComponents, passiveGrid);

    } catch (error) {
        console.error('Error fetching components:', error);
    }
}

function renderGrid(items, container) {
    items.forEach(comp => {
        const card = document.createElement('div');
        card.className = 'component-card';
        card.innerHTML = `
            <img src="${comp.image}" alt="${comp.name}" loading="lazy">
            <h3>${comp.name}</h3>
            <p><strong>Symbol:</strong> ${comp.symbol}</p>
            <p><strong>Category:</strong> ${comp.category}</p>
        `;

        card.addEventListener('click', () => {
            showModal(comp);
        });

        container.appendChild(card);
    });
}

function showModal(comp) {
    const modal = document.getElementById('component-dialog');
    
    if (!modal) return;

    const modalContent = document.getElementById('modal-content');
    if (modalContent) {
        modalContent.innerHTML = `
            <img id="modal-img" src="${comp.image}" alt="${comp.name}">
            <h3 id="modal-title">${comp.name}</h3>
            <p><strong>Symbol:</strong> <span id="modal-symbol">${comp.symbol}</span></p>
            <p><strong>Category:</strong> <span id="modal-category">${comp.category}</span></p>
            <p><strong>Function:</strong> <span id="modal-function">${comp.function}</span></p>
        `;
    }

    modal.showModal();
}

document.addEventListener('DOMContentLoaded', () => {
    loadComponents();

    const modal = document.getElementById('component-dialog');
    const closeBtn = document.getElementById('close-modal');

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.close();
        });
    }

    if (modal) {
        modal.addEventListener('click', (event) => {
            const rect = modal.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right ||
                event.clientY < rect.top || event.clientY > rect.bottom) {
                modal.close();
            }
        });
    }
});