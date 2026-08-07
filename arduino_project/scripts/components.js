const url = "data/components.json";
const passiveGrid = document.querySelector("#passive-grid");
const activeGrid = document.querySelector("#active-grid");
const themeToggleBtn = document.querySelector("#theme-toggle");
const modal = document.querySelector("#component-modal");
const modalImg = document.querySelector("#modal-img");
const modalTitle = document.querySelector("#modal-title");
const modalSymbol = document.querySelector("#modal-symbol");
const modalFunction = document.querySelector("#modal-function");
const modalCategory = document.querySelector("#modal-category");
const closeModalBtn = document.querySelector("#close-modal");

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
    document.body.classList.add("light-mode");
}

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    let theme = "dark";
    if (document.body.classList.contains("light-mode")) {
        theme = "light";
    }
    localStorage.setItem("theme", theme);
});

async function getComponents() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayComponents(data.components);
    } catch (error) {
        console.error("Error fetching components data:", error);
        passiveGrid.innerHTML = "<p>Sorry, unable to load components at this time.</p>";
    }
}

function displayComponents(components) {
    passiveGrid.innerHTML = "";
    activeGrid.innerHTML = "";

    components.forEach(c => {
        const section = document.createElement("section");
        section.classList.add("component-card");
        
        section.innerHTML = `
            <img src="${c.image}" alt="${c.name}" loading="lazy">
            <h3>${c.name}</h3>
            <p><strong>Symbol:</strong> ${c.symbol}</p>
            <p><strong>Function:</strong> ${c.function}</p>
            <p><strong>Category:</strong> ${c.category}</p>
        `;

        section.addEventListener("click", () => {
            modalImg.src = c.image;
            modalImg.alt = c.name;
            modalTitle.textContent = c.name;
            modalSymbol.innerHTML = `<strong>Symbol:</strong> ${c.symbol}`;
            modalFunction.innerHTML = `<strong>Function:</strong> ${c.function}`;
            modalCategory.innerHTML = `<strong>Category:</strong> ${c.category}`;
            modal.showModal();
        });

        if (c.category.toLowerCase() === "passive") {
            passiveGrid.appendChild(section);
        } else {
            activeGrid.appendChild(section);
        }
    });
}

closeModalBtn.addEventListener("click", () => {
    modal.close();
});

modal.addEventListener("click", (event) => {
    const rect = modal.getBoundingClientRect();
    if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
    ) {
        modal.close();
    }
});

getComponents();