document.addEventListener("DOMContentLoaded", function() {
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const npBtn = document.getElementById("np-btn");
    const bronzeBtn = document.getElementById("bronze-btn");
    const silverBtn = document.getElementById("silver-btn");
    const goldBtn = document.getElementById("gold-btn");

    const npModal = document.getElementById("np-modal");
    const bronzeModal = document.getElementById("bronze-modal");
    const silverModal = document.getElementById("silver-modal");
    const goldModal = document.getElementById("gold-modal");

    const closeNp = document.getElementById("close-np");
    const closeBronze = document.getElementById("close-bronze");
    const closeSilver = document.getElementById("close-silver");
    const closeGold = document.getElementById("close-gold");

    if (npBtn && npModal) {
        npBtn.addEventListener("click", () => npModal.showModal());
        closeNp.addEventListener("click", () => npModal.close());
    }
    if (bronzeBtn && bronzeModal) {
        bronzeBtn.addEventListener("click", () => bronzeModal.showModal());
        closeBronze.addEventListener("click", () => bronzeModal.close());
    }
    if (silverBtn && silverModal) {
        silverBtn.addEventListener("click", () => silverModal.showModal());
        closeSilver.addEventListener("click", () => silverModal.close());
    }
    if (goldBtn && goldModal) {
        goldBtn.addEventListener("click", () => goldModal.showModal());
        closeGold.addEventListener("click", () => goldModal.close());
    }
});