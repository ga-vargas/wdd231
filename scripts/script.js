// Show current year

const currentYearElement = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
currentYearElement.textConect = currentYear;

// Last time modified
const lastModifiedElement = document.getElementById("lastModified");
lastModifiedElement.textContent += document.lastModified;

// Course list
const courses = [
    { code: "CSE 110", name: "Intro to Programming", completed: true, credits: 2 },
    { code: "WDD 130", name: "Web Fundamentals", completed: true, credits: 2 },
    { code: "CSE 111", name: "Programming with Functions", completed: true, credits: 2 },
    { code: "CSE 210", name: "Programming with Classes", completed: true, credits: 2 },
    { code: "WDD 131", name: "Dynamic Web Fundamentals", completed: true, credits: 2 },
    { code: "WDD 231", name: "Web Frontend Development I", completed: false, credits: 2 }
];

const courseListElement = document.getElementById("course-list");
const buttons = document.querySelectorAll("#course-buttons button");
const totalCreditsElement = document.querySelector("#total-credits span");

// Show course function

function displayCourses(filter = "All") {
    courseListElement.innerHTML = "";
    let totalCredits = 0;

    const filteredCourses = courses.filter(course => {
        if (filter === "All") return true;
        if (filter === "CSE") return course.code.startsWith("CSE");
        if (filter === "WDD") return course.code.startsWith("WDD");
    });

    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        if (course.completed) {
            courseCard.classList.add('completed');
        }
        courseCard.textContent = `${course.code} - ${course.name} (${course.credits} credits)`;
        courseListElement.appendChild(courseCard);
        totalCredits += course.credits;
    });

    totalCreditsElement.textContent = totalCredits;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        displayCourses(button.textContent);
    });
});

displayCourses();