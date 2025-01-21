
document.addEventListener("DOMContentLoaded", () => {
    fetchMembers();

    // button config
    const gridButton = document.getElementById("grid");
    const listButton = document.getElementById("list");

    // change view
    gridButton.addEventListener("click", () => setView("grid"));
    listButton.addEventListener("click", () => setView("list"));

    // hamburguer button
    const hamburgerButton = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");

    // mobile button
    hamburgerButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

    updateFooterDate();
});

// obtain and show members function
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error("Error al cargar los datos.");
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error al cargar los datos: ", error);
    }
}

function displayMembers(members) {
    const directoryContainer = document.getElementById("directory");

    // dynamic HTML view
    const membersHTML = members.map(member => `
        <div class="member-card">
            <img 
                src="${member.image}" 
                alt="${member.name}" 
                width="250" 
                height="167" 
            >
            <h3>${member.name}</h3>
            <p>Address: ${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        </div>
    `).join("");

    directoryContainer.innerHTML = membersHTML;
}

// change grid and list
function setView(view) {
    const directoryContainer = document.getElementById("directory");

    if (view === "grid") {
        directoryContainer.classList.add("grid");
        directoryContainer.classList.remove("list");
    } else if (view === "list") {
        directoryContainer.classList.add("list");
        directoryContainer.classList.remove("grid");
    }
}

// update dates function
function updateFooterDate() {
    // year
    const yearElement = document.getElementById("year");
    yearElement.textContent = new Date().getFullYear();

    // last modified
    const lastModifiedElement = document.getElementById("lastModified");
    lastModifiedElement.textContent = document.lastModified;
}