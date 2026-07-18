const url = "data/projects.json";
const grid = document.querySelector("#project-grid");

async function getProjects() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayProjects(data.projects);
    } catch (error) {
        console.error("Error loading projects:", error);
    }
}

function displayProjects(projects) {
    projects.forEach(p => {
        const section = document.createElement("section");
        section.innerHTML = `
            <h3>${p.title}</h3>
            <p><strong>Difficulty:</strong> ${p.difficulty}</p>
            <p>${p.description}</p>
            <a href="${p.link}" target="_blank">View Details</a>
        `;
        grid.appendChild(section);
    });
}

getProjects();