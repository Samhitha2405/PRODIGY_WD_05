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
    const weatherConditions = {
        Clear: 'url(clear.jpg)',
        Clouds: 'url(cloudy.jpg)',
        Rain: 'url(rainy.jpg)',
        Snow: 'url(snowy.jpg)',
        Thunderstorm: 'url(thunderstorm.jpeg)',
        Drizzle: 'url(drizzle.jpg)',
        Mist: 'url(mist.jpeg)',
        Haze: 'url(haze.jpeg)',
        Fog: 'url(fog.jpg)'
    };

    const background = weatherConditions[weather] || 'url(default.jpg)';
    document.body.style.backgroundImage = background;
}
function setDefaultBackground() {
    document.body.style.backgroundImage = 'url(default.jpg)';
}