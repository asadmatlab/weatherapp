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
