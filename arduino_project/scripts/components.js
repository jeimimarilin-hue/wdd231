export function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            let currentTheme = 'dark';
            if (body.classList.contains('light-mode')) {
                currentTheme = 'light';
            }
            localStorage.setItem('theme', currentTheme);
        });
    }
}

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
    let modal = document.getElementById('component-modal');
    
    if (!modal) {
        modal = document.createElement('dialog');
        modal.id = 'component-modal';
        modal.innerHTML = `
            <div id="modal-content">
                <img id="modal-img" src="" alt="">
                <h3 id="modal-title"></h3>
                <p><strong>Symbol:</strong> <span id="modal-symbol"></span></p>
                <p><strong>Category:</strong> <span id="modal-category"></span></p>
                <p><strong>Function:</strong> <span id="modal-function"></span></p>
                <button id="close-modal">Close</button>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById('close-modal').addEventListener('click', () => {
            modal.close();
        });

        modal.addEventListener('click', (event) => {
            const rect = modal.getBoundingClientRect();
            if (event.clientX < rect.left || event.clientX > rect.right ||
                event.clientY < rect.top || event.clientY > rect.bottom) {
                modal.close();
            }
        });
    }

    document.getElementById('modal-img').src = comp.image;
    document.getElementById('modal-img').alt = comp.name;
    document.getElementById('modal-title').textContent = comp.name;
    document.getElementById('modal-symbol').textContent = comp.symbol;
    document.getElementById('modal-category').textContent = comp.category;
    document.getElementById('modal-function').textContent = comp.function;

    modal.showModal();
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadComponents();
});