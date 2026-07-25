document.addEventListener("DOMContentLoaded", function() {
    const resultsContainer = document.getElementById("results");
    const urlParams = new URLSearchParams(window.location.search);

    if (resultsContainer) {
        const fname = urlParams.get("fname") || "";
        const lname = urlParams.get("lname") || "";
        const title = urlParams.get("title") || "";
        const email = urlParams.get("email") || "";
        const phone = urlParams.get("phone") || "";
        const organization = urlParams.get("organization") || "";
        const membership = urlParams.get("membership") || "";
        const timestamp = urlParams.get("timestamp") || "";

        resultsContainer.innerHTML = `
            <p><span>First Name:</span> ${fname}</p>
            <p><span>Last Name:</span> ${lname}</p>
            <p><span>Organizational Title:</span> ${title}</p>
            <p><span>Email:</span> ${email}</p>
            <p><span>Mobile Phone:</span> ${phone}</p>
            <p><span>Business Name:</span> ${organization}</p>
            <p><span>Membership Level:</span> ${membership}</p>
            <p><span>Date Submitted:</span> ${timestamp}</p>
        `;
    }
});