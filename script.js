async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const apiKey = "4e303af6547636b8369bd5cdb2318185"; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("weatherResult").innerText = "City not found!";
            return;
        }

        updateWeatherUI(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weatherResult").innerText = "Error fetching weather data!";
    }
}

async function getWeatherByLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = "4e303af6547636b8369bd5cdb2318185"; // Replace with your actual API key
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod !== 200) {
                document.getElementById("weatherResult").innerText = "Location not found!";
                return;
            }

            updateWeatherUI(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            document.getElementById("weatherResult").innerText = "Error fetching weather data!";
        }
    }, () => {
        alert("Unable to retrieve location.");
    });
}

function updateWeatherUI(data) {
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("weatherResult").innerText = 
        `🌡 Temperature: ${data.main.temp}°C | 🌤 ${data.weather[0].description}`;
    
    const icon = document.getElementById("weatherIcon");
    icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    icon.style.display = "block";
}

// Attach event listener to the location button
document.getElementById("location-btn").addEventListener("click", getWeatherByLocation);
