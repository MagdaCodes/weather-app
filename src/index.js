function formatDate(timestamp) {
  let now = new Date(timestamp);
  let today = document.querySelector("#today");
  let date = now.getDate();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  return `${day},  ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
          <div class="col-2">
              <div class="weather-forecast-date">
              ${formatDay(forecastDay.dt)}<br><br></div>
               <img src="https://openweathermap.org/img/wn/${
                 forecastDay.weather[0].icon
               }@2x.png" 
                alt="" 
                width="70"
                />
              <div class="weather-forecast-temperatures">
               <span class= "temperature">${Math.round(
                 forecastDay.temp.max
               )}°</span>
               <span class="temp-day">${Math.round(
                 forecastDay.temp.min
               )}°</span> 
            </div>
           </div>
    
           `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "32e21d67cb89f007d8b2ad84f78f5d7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("h2");
  let descriptionElement = document.querySelector("#description");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let dateElement = document.querySelector("#date");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  getForecast(response.data.coord);
}
function showCityValues(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-display");
  let city = document.querySelector("h2");
  search(cityInput.value);
}

function search(city) {
  let apiKey = "32e21d67cb89f007d8b2ad84f78f5d7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function findLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "32e21d67cb89f007d8b2ad84f78f5d7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let showCity = document.querySelector("#city-input");
showCity.addEventListener("submit", showCityValues);

let searchCity = document.querySelector("#city-input");
searchCity.addEventListener("submit", search);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("click", showLocation);

search("Warsaw");
displayForecast();
