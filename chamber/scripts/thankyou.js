document.addEventListener("DOMContentLoaded", () => {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    const resultsContainer = document.querySelector("#results");

    const fname = urlParams.get("fname");
    const lname = urlParams.get("lname");
    const email = urlParams.get("email");
    const phone = urlParams.get("phone");
    const organization = urlParams.get("organization");
    const timestamp = urlParams.get("timestamp");

    resultsContainer.innerHTML = `
        <p><strong>First Name:</strong> ${fname || ""}</p>
        <p><strong>Last Name:</strong> ${lname || ""}</p>
        <p><strong>Email:</strong> ${email || ""}</p>
        <p><strong>Mobile Phone:</strong> ${phone || ""}</p>
        <p><strong>Business Name:</strong> ${organization || ""}</p>
        <p><strong>Application Date:</strong> ${timestamp ? new Date(timestamp).toLocaleString() : ""}</p>
    `;
});