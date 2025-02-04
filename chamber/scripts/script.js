
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


document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "019a5fe4b0d0408cffa1c9dd52dcbbb3";
    const lat = "-32.89";
    const lon = "-68.86";

    // API urls
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const membersUrl = "data/members.json";

    // weather
    async function fetchWeather() {
        try {
            const response = await fetch(weatherUrl);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();

            // weather data dom
            document.getElementById("current-temp").textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById("current-condition").textContent = capitalizeFirstLetter(data.weather[0].description);
            document.getElementById("humidity").textContent = `${data.main.humidity}%`;
            document.getElementById("wind-speed").textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    // 3 days forecast weather
    async function fetchForecast() {
        try {
            const response = await fetch(forecastUrl);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            const forecastList = document.getElementById("forecast-list");
            forecastList.innerHTML = "";

            
            const dailyForecasts = {};
            data.list.forEach(item => {
                const date = item.dt_txt.split(" ")[0]; 
                if (!dailyForecasts[date]) {
                    dailyForecasts[date] = item; 
                }
            });

            const dates = Object.keys(dailyForecasts).slice(0, 3); 
            dates.forEach((date, index) => {
                const item = dailyForecasts[date];
                const temp = Math.round(item.main.temp);

                let dayLabel = index === 0 ? "Today" : getDayOfWeek(date); 

                const li = document.createElement("li");
                li.textContent = `${dayLabel}: ${temp}°C`;
                forecastList.appendChild(li);
            });

        } catch (error) {
            console.error("Error fetching forecast data:", error);
        }
    }

    async function fetchSpotlights() {
        try {
            const response = await fetch(membersUrl);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const members = await response.json();

            const eligibleMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

            const selectedMembers = [];
            while (selectedMembers.length < 3 && eligibleMembers.length > 0) {
                const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
                selectedMembers.push(eligibleMembers.splice(randomIndex, 1)[0]);
            }

            const spotlightContainer = document.querySelector(".spotlight-cards");
            spotlightContainer.innerHTML = "";

            selectedMembers.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("spotlight-card");

                card.innerHTML = `
                    <img src="${member.image}" alt="${member.name}">
                    <h3>${member.name}</h3>
                    <p><strong>Address:</strong> ${member.address}</p>
                    <p><strong>Phone:</strong> ${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                    <p><strong>Membership Level:</strong> ${member.membershipLevel === 2 ? "Gold" : "Silver"}</p>
                `;

                spotlightContainer.appendChild(card);
            });

        } catch (error) {
            console.error("Error fetching spotlight members:", error);
        }
    }

    function getDayOfWeek(dateString) {
        const date = new Date(dateString);
        if (isNaN(date)) {
            console.error("Fecha inválida:", dateString);
            return "Unknown";
        }
        return date.toLocaleDateString('en-US', { weekday: 'long' });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    fetchWeather();
    fetchForecast();
    fetchSpotlights();
});

document.addEventListener("DOMContentLoaded", () => {
    const membersUrl = "data/members.json";

    async function fetchSpotlights() {
        try {
            const response = await fetch(membersUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const members = await response.json();

            const eligibleMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);

            const selectedMembers = [];
            while (selectedMembers.length < 3 && eligibleMembers.length > 0) {
                const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
                selectedMembers.push(eligibleMembers.splice(randomIndex, 1)[0]);
            }

            const spotlightContainer = document.querySelector(".spotlight-cards");
            spotlightContainer.innerHTML = "";

            selectedMembers.forEach(member => {
                const card = document.createElement("div");
                card.classList.add("member-card");

                card.innerHTML = `
                    <div class="member-header">
                        <h3>${member.name}</h3>
                    </div>
                    <div class="member-content">
                        <div class="member-image">
                            <img src="${member.image}" alt="${member.name}">
                        </div>
                        <div class="member-info">
                            <p><strong>Address:</strong> ${member.address}</p>
                            <p><strong>Phone:</strong> ${member.phone}</p>
                            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                        </div>
                    </div>
                `;

                spotlightContainer.appendChild(card);
            });

        } catch (error) {
            console.error("Error fetching spotlight members:", error);
        }
    }

    fetchSpotlights();
});