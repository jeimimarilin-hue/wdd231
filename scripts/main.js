document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }

    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedParagraph = document.getElementById("last-modified");
    if (lastModifiedParagraph) {
        lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
    }

    const gridBtn = document.getElementById("grid-view-btn");
    const listBtn = document.getElementById("list-view-btn");
    const displayContainer = document.getElementById("directory-display");

    if (gridBtn && listBtn && displayContainer) {
        gridBtn.addEventListener("click", () => {
            displayContainer.classList.remove("list-layout");
            displayContainer.classList.add("grid-layout");
            gridBtn.classList.add("active-btn");
            listBtn.classList.remove("active-btn");
        });

        listBtn.addEventListener("click", () => {
            displayContainer.classList.remove("grid-layout");
            displayContainer.classList.add("list-layout");
            listBtn.classList.add("active-btn");
            gridBtn.classList.remove("active-btn");
        });
    }
});