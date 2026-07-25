const url = "data/components.json";
const passiveGrid = document.querySelector("#passive-grid");
const activeGrid = document.querySelector("#active-grid");

async function getComponents() {
    const response = await fetch(url);
    const data = await response.json();
    displayComponents(data.components);
}

function displayComponents(components) {
    components.forEach(c => {
        const section = document.createElement("section");
        section.classList.add(c.category.toLowerCase());
        section.innerHTML = `
            <h3>${c.name}</h3>
            <p><strong>Symbol:</strong> ${c.symbol}</p>
            <p>${c.function}</p>
        `;
        if (c.category === "Passive") {
            passiveGrid.appendChild(section);
        } else {
            activeGrid.appendChild(section);
        }
    });
}

getComponents();