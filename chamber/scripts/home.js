const menuToggle = document.querySelector("#menu-toggle");
const navContainer = document.querySelector("#nav-container");

if (menuToggle && navContainer) {
    menuToggle.addEventListener("click", () => {
        navContainer.classList.toggle("open");
    });
}

const yearEl = document.querySelector("#current-year");
const modifiedEl = document.querySelector("#last-modified");
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modifiedEl) modifiedEl.textContent = document.lastModified;

const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=10.388&lon=-71.439&units=metric&appid=9100f3ee909e1823b986f0138f6a1fc9";
const membersUrl = "data/members.json";

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        }
    } catch (error) {
        console.error(error);
    }
}

function displayWeather(data) {
    const currentContainer = document.querySelector("#weather-current");
    const forecastContainer = document.querySelector("#weather-forecast");
    
    if (!currentContainer || !forecastContainer) return;

    const currentList = data.list[0];
    currentContainer.innerHTML = `
        <p class="temp-display"><strong>${Math.round(currentList.main.temp)}&deg;C</strong></p>
        <p class="desc-display">${currentList.weather[0].description}</p>
    `;

    forecastContainer.innerHTML = "";
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    
    dailyData.forEach(day => {
        const dateObj = new Date(day.dt_txt);
        const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
        const div = document.createElement("div");
        div.className = "forecast-day";
        div.innerHTML = `
            <span>${dayName}</span>
            <strong>${Math.round(day.main.temp)}&deg;C</strong>
        `;
        forecastContainer.appendChild(div);
    });
}

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            const members = data.members || data;
            displaySpotlights(members);
        }
    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {
    const container = document.querySelector("#spotlight-container");
    if (!container) return;

    const eligible = members.filter(m => m.membership === 2 || m.membership === 3 || m.membership === "Silver" || m.membership === "Gold");
    const shuffled = eligible.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    container.innerHTML = "";
    selected.forEach(member => {
        const card = document.createElement("div");
        card.className = "spotlight-card";
        const levelName = (member.membership === 3 || member.membership === "Gold") ? "Gold Member" : "Silver Member";

        card.innerHTML = `
            <h4>${member.name}</h4>
            <img src="images/${member.image}" alt="${member.name} Logo" width="80" height="80" loading="lazy">
            <p class="spotlight-tagline">${member.tagline || ""}</p>
            <hr class="spotlight-divider">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p class="spotlight-level">${levelName}</p>
            <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="spotlight-link">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

fetchWeather();
fetchSpotlights();