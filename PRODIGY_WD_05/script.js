// script.js

const apiKey = '3ddf8c104c8c1a01c321e8f45cc95aa4'; // Replace with your API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const cityInput = document.getElementById('city-input').value;
        if (cityInput) {
            fetchWeather(cityInput);
        }
    });
});

function fetchWeather(city) {
    fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateWeather(data);
            } else {
                alert('City not found!');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });
}

function updateWeather(data) {
    const location = document.getElementById('location');
    const description = document.getElementById('description');
    const temperature = document.getElementById('temperature');

    location.textContent = `${data.name}, ${data.sys.country}`;
    description.textContent = data.weather[0].description;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;

    updateBackground(data.weather[0].main);
}

function updateBackground(weather) {
    const timestamp = new Date().getTime(); // Generate a timestamp
    const weatherConditions = {
        Clear: `url(./images/clear.jpg?${timestamp})`,
        Clouds: `url(./images/cloudy.jpg?${timestamp})`,
        Rain: `url(./images/rainy.jpg?${timestamp})`,
        Snow: `url(./images/snowy.jpg?${timestamp})`,
        Thunderstorm: `url(./images/thunderstorm.jpeg?${timestamp})`,
        Drizzle: `url(./images/drizzle.jpg?${timestamp})`,
        Mist: `url(./images/mist.jpeg?${timestamp})`,
        Haze: `url(./images/haze.jpeg?${timestamp})`,
        Fog: `url(./images/fog.jpg?${timestamp})`
    };

    const background = weatherConditions[weather] || `url(./images/default.jpg?${timestamp})`;
    document.body.style.backgroundImage = background;
}

function setDefaultBackground() {
    document.body.style.backgroundImage = 'url(./images/default.jpg)';
}
