const gridContainer = document.querySelector(".discover-grid");

async function getDiscoverItems() {
    try {
        const response = await fetch("data/discover.json");
        const data = await response.json();
        displayItems(data.discoverItems);
    } catch (error) {
        console.error("Error loading discover data:", error);
    }
}

function displayItems(items) {
    gridContainer.innerHTML = "";
    items.forEach((item, index) => {
        const section = document.createElement("section");
        section.classList.add(`card-${index + 1}`);

        const h2 = document.createElement("h2");
        h2.textContent = item.name;

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.loading = "lazy";
        img.width = 300;
        img.height = 200;
        figure.appendChild(img);

        const address = document.createElement("address");
        address.textContent = item.address;

        const p = document.createElement("p");
        p.textContent = item.description || item.cultural;

        const button = document.createElement("button");
        button.textContent = "Learn More";

        section.appendChild(h2);
        section.appendChild(figure);
        section.appendChild(address);
        section.appendChild(p);
        section.appendChild(button);

        gridContainer.appendChild(section);
    });
}

getDiscoverItems();

const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit-ls");
const currentDate = Date.now();

if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const daysBetween = Math.floor((currentDate - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    
    if (daysBetween < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
    } else {
        visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
    }
}

localStorage.setItem("lastVisit-ls", currentDate);