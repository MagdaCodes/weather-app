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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
          <div class="col-2">
              <div class="weather-forecast-date">
              ${day}<br><br></div>
             <i class="fa-solid fa-sun"></i>
              <div class="weather-forecast-temperatures">
               <span class= "temperature">-4°</span><span class="temp-day">4°</span> 
            </div>
           </div>
     `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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
}
function showCityValues(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-display");
  let city = document.querySelector("h2");
  search(cityInput.value);
}

function changeTemp(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#temperature");
  tempCelsius.innerHTML = Math.round(celsiusTemperature);
  clickCelsius.classList.add("active");
  clickFahrenheit.classList.remove("active");
}

function changeTempF(event) {
  event.preventDefault();
  let tempFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  clickCelsius.classList.remove("active");
  clickFahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(tempFahrenheit);
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
navigator.geolocation.getCurrentPosition(findLocation);

let showCity = document.querySelector("#city-input");
showCity.addEventListener("submit", showCityValues);

let celsiusTemperature = null;

let searchCity = document.querySelector("#city-input");
searchCity.addEventListener("submit", search);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("submit", findLocation);

let clickFahrenheit = document.querySelector("#fahrenheit");
clickFahrenheit.addEventListener("click", changeTempF);

let clickCelsius = document.querySelector("#celsius");
clickCelsius.addEventListener("click", changeTemp);

search("Warsaw");
displayForecast();
