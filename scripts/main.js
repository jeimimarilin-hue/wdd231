document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modification: ${document.lastModified}`;

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development I', credits: 3, completed: false }
];

const courseContainer = document.getElementById('course-container');
const totalCreditsDisplay = document.getElementById('total-credits');

function displayCourses(filteredCourses) {
    courseContainer.innerHTML = '';
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        if (course.completed) {
            card.classList.add('completed');
        }
        card.textContent = `${course.subject} ${course.number}`;
        courseContainer.appendChild(card);
    });
    calculateCredits(filteredCourses);
}

function calculateCredits(filteredCourses) {
    const total = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = total;
}

document.getElementById('filter-all').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses);
});

document.getElementById('filter-wdd').addEventListener('click', (e) => {
    setActiveButton(e.target);
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});

document.getElementById('filter-cse').addEventListener('click', (e) => {
    setActiveButton(e.target);
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});

function setActiveButton(activeBtn) {
    document.querySelectorAll('.filter-buttons .btn').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

displayCourses(courses);