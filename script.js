const apiKey = '404eebb2beda0280252e321b70d1dddb';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';   

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherElement = document.querySelector('.weather'); // This is the main weather container

// Weather elements
const weatherIcon = document.querySelector('.weather-icon');
const cityElement = document.querySelector('.city');
const tempElement = document.querySelector('.temp');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

// Ensure weather is hidden initially
weatherElement.style.display = 'none';

async function checkWeather(city) {
    if (!city) {
        // If the search box is empty, hide weather
        weatherElement.style.display = 'none';
        return;
    }
    
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        console.log(data);

        // Show weather element
        weatherElement.style.display = 'block';

        // Display the weather information
        cityElement.innerHTML = data.name;
        tempElement.innerHTML = Math.round(data.main.temp) + '°C';
        humidityElement.innerHTML = data.main.humidity + '%';
        windElement.innerHTML = data.wind.speed + ' km/h';

        // Set the appropriate weather icon based on weather conditions
        if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = 'assets/cloudy-forecast-svgrepo.svg';
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = 'assets/egg-sunny-side-up-svgrepo.svg';
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = 'assets/rain-svgrepo (2).svg';
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = 'assets/cloud-drizzle-svgrepo.svg';
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = 'assets/mist-svgrepo.svg';
        } else if (data.weather[0].main === 'Snow') {
            weatherIcon.src = 'assets/snowing-forecast-svgrepo.svg';
        } else {
            // Default icon
            weatherIcon.src = 'assets/cloudy-forecast-svgrepo.svg';
        }
        
    } catch (error) {
        // Handle errors
        weatherElement.style.display = 'none';
        alert("City not found! Please try again.");
        console.error('Error:', error);
    }
}

// Event listeners
searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value.trim());
});

searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchBox.value.trim());
    }
});

// Optional: Load default city on startup
// checkWeather('London');