const menuToggle = document.getElementById('menu-toggle');
const navContainer = document.getElementById('nav-container');
const currentYearSpan = document.getElementById('current-year');
const lastModifiedSpan = document.getElementById('last-modified');
const weatherCurrentDiv = document.getElementById('weather-current');
const weatherForecastDiv = document.getElementById('weather-forecast');
const spotlightContainer = document.getElementById('spotlight-container');

if (menuToggle && navContainer) {
    menuToggle.addEventListener('click', () => {
        navContainer.classList.toggle('open');
    });
}

if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}

const weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=10.388&lon=-71.439&units=metric&appid=9100f3ee909e1823b986f0138f6a1fc9";

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        displayCurrentWeather(data);
        displayWeatherForecast(data);
    } catch (error) {
        console.error(error);
        if (weatherCurrentDiv) {
            weatherCurrentDiv.innerHTML = `<p>Weather data temporarily unavailable.</p>`;
        }
    }
}

function displayCurrentWeather(data) {
    if (!weatherCurrentDiv) return;
    const current = data.list[0];
    const temp = Math.round(current.main.temp);
    const description = current.weather[0].description;
    const iconCode = current.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherCurrentDiv.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 10px;">
            <img src="${iconUrl}" alt="${description}" width="50" height="50">
            <div>
                <p class="temp-display">${temp}°C</p>
                <p class="desc-display">${description}</p>
            </div>
        </div>
    `;
}

function displayWeatherForecast(data) {
    if (!weatherForecastDiv) return;
    const dailyData = {};
    const todayStr = new Date().toISOString().split('T')[0];

    data.list.forEach(item => {
        const dateStr = item.dt_txt.split(' ')[0];
        if (dateStr !== todayStr) {
            if (!dailyData[dateStr]) {
                dailyData[dateStr] = [];
            }
            dailyData[dateStr].push(item.main.temp);
        }
    });

    const forecastDays = Object.keys(dailyData).slice(0, 3);
    weatherForecastDiv.innerHTML = '';

    forecastDays.forEach(dateStr => {
        const temps = dailyData[dateStr];
        const avgTemp = Math.round(temps.reduce((sum, t) => sum + t, 0) / temps.length);
        const dateObj = new Date(dateStr + 'T00:00:00');
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

        const dayCard = document.createElement('div');
        dayCard.className = 'forecast-day';
        dayCard.innerHTML = `
            <strong>${dayName}</strong>
            <span>${avgTemp}°C</span>
        `;
        weatherForecastDiv.appendChild(dayCard);
    });
}

const membersUrl = "data/members.json";

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const members = await response.json();
        const eligibleMembers = members.filter(m => m.membershipLevel === "Gold" || m.membershipLevel === "Silver");
        const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
        const selectedMembers = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);
        displaySpotlights(selectedMembers);
    } catch (error) {
        console.error(error);
        if (spotlightContainer) {
            spotlightContainer.innerHTML = `<p>Member spotlights temporarily unavailable.</p>`;
        }
    }
}

function displaySpotlights(members) {
    if (!spotlightContainer) return;
    spotlightContainer.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <h4>${member.name}</h4>
            <p class="spotlight-tagline">"${member.tagline || 'Driving community success.'}"</p>
            <img src="${member.image}" alt="${member.name} Logo" width="100" height="100" loading="lazy">
            <hr class="spotlight-divider">
            <p><strong>Email:</strong> ${member.email || 'info@' + member.name.toLowerCase().replace(/\s+/g, '') + '.com'}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p class="spotlight-level">${member.membershipLevel} Member</p>
            <a href="${member.website}" target="_blank" rel="noopener" class="spotlight-link">Visit Website</a>
        `;
        spotlightContainer.appendChild(card);
    });
}

fetchWeather();
fetchSpotlights();