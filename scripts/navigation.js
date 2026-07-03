document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("show");
            if (navMenu.classList.contains("show")) {
                menuToggle.innerHTML = "&times;";
                menuToggle.setAttribute("aria-label", "Close navigation menu");
            } else {
                menuToggle.innerHTML = "&#9776;";
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            }
        });
    }
});