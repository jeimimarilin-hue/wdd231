const url = "data/members.json";
const container = document.querySelector("#directory-container");
const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");
const menuToggle = document.querySelector("#menu-toggle");
const navContainer = document.querySelector("#nav-container");

if (menuToggle && navContainer) {
    menuToggle.addEventListener("click", () => {
        navContainer.classList.toggle("open");
    });
}

async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members || data);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

function displayMembers(members) {
    if (!container) return;
    container.innerHTML = "";

    members.forEach((member) => {
        const section = document.createElement("section");
        const img = document.createElement("img");
        img.setAttribute("src", `images/${member.image}`);
        img.setAttribute("alt", `Logo of ${member.name}`);
        img.setAttribute("width", "150");
        img.setAttribute("height", "150");
        img.setAttribute("loading", "lazy");
        img.decoding = "async";

        section.innerHTML = `
            <img src="images/${member.image}" alt="Logo of ${member.name}" width="150" height="150" loading="lazy">
            <h3>${member.name}</h3>
            <p class="tagline">${member.tagline ? `"${member.tagline}"` : ""}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Membership Level:</strong> ${member.membership}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a>
        `;
        container.appendChild(section);
    });
}

if (gridBtn && listBtn) {
    gridBtn.addEventListener("click", () => {
        container.className = "grid-view";
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
        container.className = "list-view";
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });
}

const yearEl = document.querySelector("#current-year");
const modifiedEl = document.querySelector("#last-modified");
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modifiedEl) modifiedEl.textContent = document.lastModified;

getMembers();