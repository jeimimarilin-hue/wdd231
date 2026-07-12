const url = "data/members.json";
const container = document.querySelector("#directory-container");

const gridBtn = document.querySelector("#grid-btn");
const listBtn = document.querySelector("#list-btn");

async function getMembers() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data.members) {
                displayMembers(data.members);
            } else if (Array.isArray(data)) {
                displayMembers(data);
            }
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
        img.setAttribute("src", `images/${member.image || 'icon10.jpg'}`);
        img.setAttribute("alt", `Logo of ${member.name}`);
        img.setAttribute("width", "150");
        img.setAttribute("height", "150");
        img.setAttribute("loading", "lazy");
        img.decoding = "async";

        const h3 = document.createElement("h3");
        h3.textContent = member.name;

        const tagline = document.createElement("p");
        tagline.className = "tagline";
        tagline.textContent = member.tagline ? `"${member.tagline}"` : "";

        const address = document.createElement("p");
        address.innerHTML = `<strong>Address:</strong> ${member.address}`;

        const phone = document.createElement("p");
        phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

        const membership = document.createElement("p");
        membership.innerHTML = `<strong>Membership:</strong> ${member.membership}`;

        const website = document.createElement("a");
        website.setAttribute("href", member.website || "#");
        website.setAttribute("target", "_blank");
        website.setAttribute("rel", "noopener noreferrer");
        website.textContent = "Visit Website";

        section.appendChild(img);
        section.appendChild(h3);
        if (member.tagline) section.appendChild(tagline);
        section.appendChild(address);
        section.appendChild(phone);
        section.appendChild(membership);
        section.appendChild(website);

        container.appendChild(section);
    });
}

if (gridBtn && listBtn) {
    gridBtn.addEventListener("click", () => {
        if (container) container.className = "grid-view";
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
        if (container) container.className = "list-view";
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });
}

const yearEl = document.querySelector("#current-year");
const modifiedEl = document.querySelector("#last-modified");

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modifiedEl) modifiedEl.textContent = document.lastModified;

getMembers();