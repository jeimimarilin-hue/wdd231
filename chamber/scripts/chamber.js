document.addEventListener("DOMContentLoaded", () => {
    const timestampField = document.querySelector("#timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const modals = [
        { btn: document.querySelector("#np-btn"), modal: document.querySelector("#np-modal"), close: document.querySelector("#close-np") },
        { btn: document.querySelector("#bronze-btn"), modal: document.querySelector("#bronze-modal"), close: document.querySelector("#close-bronze") },
        { btn: document.querySelector("#silver-btn"), modal: document.querySelector("#silver-modal"), close: document.querySelector("#close-silver") },
        { btn: document.querySelector("#gold-btn"), modal: document.querySelector("#gold-modal"), close: document.querySelector("#close-gold") }
    ];

    modals.forEach(item => {
        if (item.btn && item.modal && item.close) {
            item.btn.addEventListener("click", () => item.modal.showModal());
            item.close.addEventListener("click", () => item.modal.close());
        }
    });
});