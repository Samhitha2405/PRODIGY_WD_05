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
        Clear: 'url(https://blogger.googleusercontent.com/img/a/AVvXsEit3RrkwUabYVako7ItgBEW9uZHYWklJ1mBVLRP067oq3hcOIjZbxeBb9NtnEnz7_Qk9bNF1I1dMoN4gBmhfsxex8_f9SSmylbhiERGyMvscRpxVLrv3KZL_nd6EcuPSS18yB6w39EOWf56j08fqsHFWepslRk4YCmvDozGNCWJPazK7hnueUR3BvOl1Z6F)',
        Clouds: 'url(https://blogger.googleusercontent.com/img/a/AVvXsEgXamhTrX7kwX6gKNLlN9khMrO8Bfw92bL1aoYtFABJ8HVlnG6XnWxRZF43SWoNPoc7yVDoN1BkMZNAJYHrd09hh3h2fwpfi6wmlsBd5d7mb550C-pRZJ9bpdW8Qn60UTnbbnlqfZfeq4pDWtnNES6Vk0nyFk01b4CY5jR6v-7mT2NhAy8J4q5SEhesuXDs)',
        Rain: 'url(https://blogger.googleusercontent.com/img/a/AVvXsEghduBiOECHC2clY7esxXg9Pc7dm-iCnMox5bul4qRLFAQkJ0vM5GmvbwiGECxSiPtWW4WaYn0tfX5oODpxqaAnqMDbUpKCcrzumHeurqhLnodOcfYeHXmufILfD64BiX9bz4n_71ePf1IZFzNNh8YJ7qst0B3vENUGIKGIj98B7Nv17PU1NL0G7_hkFLpG)',
        Snow: 'url(https://blogger.googleusercontent.com/img/a/AVvXsEhNWelLfej7H0N6XpFolK-hLd56eDI-NlB9tYYrpZqNLMap88vhhgr4HYv5GTpyYZD_D1-zxq_wAwITVH8DB3WxBD1JV4u_5DTJxp3Ugp71RP7EetIgkMC3RBIEE29k8hp_vpdWdnpiW0CY-B7VPvISwq8_zDuDfcy6AlU6P_ievPxb8bgaSOEdt1gwOl3v)',
        Thunderstorm: 'url(https://blogger.googleusercontent.com/img/a/AVvXsEgCthTRjfziWLyzzCvVIqtbUjCI3etSDA2bf2Fz9jUSTiwl-dbcVeDtgd9iYJOQcqbbLcCnpKl34tadWKRT8QM2sqisBkE8VgPAI8jXPLvfpjQRo1pe2Lh6iJbyGmZnk3wurejXq_DGigeOxKjL9hxYzrsF8-_CgPRx23UXmUk7q__OS-xWjlOLb3Bu4zIY)',
        Drizzle: 'url(https://blogger.googleusercontent.com/img/a/AVvXsEghduBiOECHC2clY7esxXg9Pc7dm-iCnMox5bul4qRLFAQkJ0vM5GmvbwiGECxSiPtWW4WaYn0tfX5oODpxqaAnqMDbUpKCcrzumHeurqhLnodOcfYeHXmufILfD64BiX9bz4n_71ePf1IZFzNNh8YJ7qst0B3vENUGIKGIj98B7Nv17PU1NL0G7_hkFLpG)',
        Mist: 'url(https://blogger.googleusercontent.com/img/a/AVvXsEhvpZKwbWvVp1ahSi7nKupgXb2wWODMzDfZM8WOlFBpzCwz_CA3bf-ZcMIRR16wp8s2R5XcY1jDfmlkBUtYz253tGqyYW6GqTHCmRhH7z6-km2yQWV-n20W99YV9Ja5g5ETbWYiBN5RqcGH6XXYyT5a4rel7qApF28sNxXPL9LsUGxVdO00GvuI0VBd6n9a)',
        Haze: 'url(https://blogger.googleusercontent.com/img/a/AVvXsEjlso06uH5HXURbbonAoZij3aMBIPCLwbGnw4PzQqhLR-yyctPs64d3JR0PpeptS1GScYoeDOSxM7f0sFqg9IheALsxlJgdGVFa9MpJ8V1f9W5C-RMUwjEkSj080UCZHlsN7xNFtaQG845ck3ELdbzMSxcANSKAu3zGafnAe7MNQ5aZnZ12UjKzeyX7U3JH)',
        Fog: 'url(https://blogger.googleusercontent.com/img/a/AVvXsEiRdKgGblf60loBong9E15RSwZVr_LCwV-NBvCCMxHpajl05hWKb56Art9nrWHi0CVtg7XLF9ITJt58TfXPxFeAk7L7QME7LVEWPM3MKUPIcuDy_VjEHfcxdFSKomKr-fYykCm5Y2AjQIslTe-r1sFhu6_Y3ejEN2Cn87YLRVCgKgI6kYkD7gJCLY2JIWkv)'
    };

    const background = weatherConditions[weather] || 'url(https://blogger.googleusercontent.com/img/a/AVvXsEg2n4PPen8SSeOPUa583Sx-PGME60osWxVA1Z-5gkhXp7sAJwUTlYT-JKwrKwqdyCP9_5z89tA9RBQbza4L4v3JpYAN6RgNV9sNG2-5mg2zi-HUchJUaKABx_qO0wGnLdEqYqgFR1TuLwsKQEo07wlVHvKg0_A8t9UnOYFkQc8tyXgR9NS3B90ikJZNQwpS)';
    document.body.style.backgroundImage = background;
}
function setDefaultBackground() {
    document.body.style.backgroundImage = 'url(https://blogger.googleusercontent.com/img/a/AVvXsEg2n4PPen8SSeOPUa583Sx-PGME60osWxVA1Z-5gkhXp7sAJwUTlYT-JKwrKwqdyCP9_5z89tA9RBQbza4L4v3JpYAN6RgNV9sNG2-5mg2zi-HUchJUaKABx_qO0wGnLdEqYqgFR1TuLwsKQEo07wlVHvKg0_A8t9UnOYFkQc8tyXgR9NS3B90ikJZNQwpS)';
}
