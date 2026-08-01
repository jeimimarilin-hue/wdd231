import { discoverItems } from '../data/discover.mjs';

const gridContainer = document.querySelector('.discover-grid');

function displayItems(items) {
  gridContainer.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('section');
    card.classList.add(`card-${index + 1}`);
    card.innerHTML = `
      <h2>${item.name}</h2>
      <figure>
        <img src="${item.photo}" alt="${item.name}" width="300" height="200" loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button>Learn More</button>
    `;
    gridContainer.appendChild(card);
  });
}

displayItems(discoverItems);

const visitMessage = document.getElementById('visit-message');
const lastVisit = localStorage.getItem('lastVisit-ls');
const currentDate = Date.now();

if (!lastVisit) {
  visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysDifference = Math.floor((currentDate - Number(lastVisit)) / (1000 * 60 * 60 * 24));
  if (daysDifference < 1) {
    visitMessage.textContent = "Back so soon! Awesome!";
  } else if (daysDifference === 1) {
    visitMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitMessage.textContent = `You last visited ${daysDifference} days ago.`;
  }
}

localStorage.setItem('lastVisit-ls', currentDate);