document.addEventListener("DOMContentLoaded", () => {
    const courses = [
        { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
        { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
        { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
        { subject: 'WDD', number: 131, title: 'Web Frontend Development I', credits: 3, completed: true },
        { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: false },
        { subject: 'WDD', number: 230, title: 'Web Frontend Development II', credits: 3, completed: false }
    ];

    const container = document.getElementById("course-list-container");
    const totalCreditsSpan = document.getElementById("total-credits");

    function displayCourses(filterType) {
        if (!container || !totalCreditsSpan) return;
        container.innerHTML = "";
        
        const filtered = courses.filter(course => {
            if (filterType === "ALL") return true;
            return course.subject === filterType;
        });

        filtered.forEach(course => {
            const div = document.createElement("div");
            div.classList.add("course-card");
            if (course.completed) {
                div.classList.add("completed");
            }
            div.innerHTML = `<strong>${course.subject} ${course.number}</strong><br><small>${course.title}</small>`;
            container.appendChild(div);
        });

        const totalCredits = filtered.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsSpan.textContent = totalCredits;
    }

    const btnAll = document.getElementById("btn-all");
    const btnCse = document.getElementById("btn-cse");
    const btnWdd = document.getElementById("btn-wdd");

    if (btnAll && btnCse && btnWdd) {
        btnAll.addEventListener("click", () => { setActiveButton(btnAll); displayCourses("ALL"); });
        btnCse.addEventListener("click", () => { setActiveButton(btnCse); displayCourses("CSE"); });
        btnWdd.addEventListener("click", () => { setActiveButton(btnWdd); displayCourses("WDD"); });
    }

    function setActiveButton(activeBtn) {
        [btnAll, btnCse, btnWdd].forEach(btn => btn.classList.remove("active-btn"));
        activeBtn.classList.add("active-btn");
    }

    displayCourses("ALL");
});