const url = "data/members.json";
const container = document.querySelector("#directory-container");

const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error("Data load failed.");
        }
    } catch (error) {
        console.error("Connection error:", error);
    }
}

function displayMembers(members) {
    container.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        const levels = { 1: "Member", 2: "Silver", 3: "Gold" };

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <h3>${member.name}</h3>
            <p class="tagline"><em>"${member.tagline}"</em></p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Membership:</strong> ${levels[member.membership] || "Regular"}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

gridBtn.addEventListener("click", () => {
    container.classList.add("grid-view");
    container.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
    container.classList.add("list-view");
    container.classList.remove("grid-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

getMembers();