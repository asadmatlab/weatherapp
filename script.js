<<<<<<< HEAD
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

        document.getElementById("weatherResult").innerText = 
            `🌡 Temperature: ${data.main.temp}°C | 🌤 ${data.weather[0].description}`;
        
        console.log("Weather data received:", data); // Debugging log
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weatherResult").innerText = "Error fetching weather data!";
    }
}
=======
const apiKey = "4e303af6547636b8369bd5cdb2318185"; // Replace with your actual API key

// Function to get weather by city name
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetchWeather(url);
}

// Function to get weather by user’s GPS location
async function getWeatherByLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetchWeather(url);
    }, (error) => {
        alert("Unable to retrieve your location.");
        console.error("Geolocation error:", error);
    });
}

// Function to fetch weather data from API
async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("weatherResult").innerText = `❌ Error: ${data.message}`;
            return;
        }

        document.getElementById("cityName").innerText = `📍 ${data.name}, ${data.sys.country}`;
        document.getElementById("weatherResult").innerText =
            `🌡 Temperature: ${data.main.temp}°C | 🌤 ${data.weather[0].description}`;
        
        const iconCode = data.weather[0].icon;
        const weatherIcon = document.getElementById("weatherIcon");
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;
        weatherIcon.style.display = "block";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.getElementById("weatherResult").innerText = "⚠️ Error fetching weather data!";
    }
}
>>>>>>> 908f00a (Initial commit)
