const url = "data/members.json";
const container = document.querySelector("#directory-container");

const gridBtn = document.getElementById("grid-btn") || document.querySelector(".menu-view button:first-child");
const listBtn = document.getElementById("list-btn") || document.querySelector(".menu-view button:last-child");

async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data.members);
        } else {
            console.error("Error fetching data");
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

function displayMembers(members) {
    if (!container) return;
    container.innerHTML = "";

    members.forEach((member) => {
        const section = document.createElement("section");
        
        const img = document.createElement("img");
        img.setAttribute("src", `images/${member.image || member.logo || 'logo.png'}`);
        img.setAttribute("alt", `Logo of ${member.name}`);
        img.setAttribute("width", "150");
        img.setAttribute("height", "150");
        img.setAttribute("loading", "lazy");

        const h3 = document.createElement("h3");
        h3.textContent = member.name;

        const tagline = document.createElement("p");
        tagline.className = "tagline";
        tagline.textContent = `"${member.tagline}"`;

        const address = document.createElement("p");
        address.innerHTML = `<strong>Address:</strong> ${member.address}`;

        const phone = document.createElement("p");
        phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

        const membership = document.createElement("p");
        membership.innerHTML = `<strong>Membership:</strong> ${member.membership}`;

        const website = document.createElement("a");
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        website.setAttribute("rel", "noopener noreferrer");
        website.textContent = "Visit Website";

        section.appendChild(img);
        section.appendChild(h3);
        section.appendChild(tagline);
        section.appendChild(address);
        section.appendChild(phone);
        section.appendChild(membership);
        section.appendChild(website);

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