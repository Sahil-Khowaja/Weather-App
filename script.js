import { apiKey } from './config.js';

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
// const apiKey1 = apiKey;
const searcBox = document.querySelector('.search input');
const searcBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
    if (response.status === 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.weather').style.display = "none";
    } else {
        const data = await response.json();

        document.querySelector('.city').innerHTML = data.name;    
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";    
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";    
        document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";    

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;
            default:
                weatherIcon.src = "images/default.png";
        }
        
        document.querySelector('.weather').style.display = "block";
        document.querySelector('.error').style.display = "none";
    }
}

searcBtn.addEventListener('click', () => {
    checkWeather(searcBox.value);
});
