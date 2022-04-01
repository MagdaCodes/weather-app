let now = new Date();
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

today.innerHTML = `${day},  ${hours}:${minutes}`;

function showCityValues(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-display");
  let city = document.querySelector("h2");
  city.innerHTML = `${cityInput.value}`;
}

let showCity = document.querySelector("#city-input");
showCity.addEventListener("submit", showCityValues);

function changeTemp() {
  let tempCelsius = document.querySelector("#temperature");
  tempCelsius.innerHTML = "12°C";
}

let clickCelsius = document.querySelector("#celsius");
clickCelsius.addEventListener("click", changeTemp);

function changeTempF() {
  let tempFahrenheit = document.querySelector("#temperature");
  tempFahrenheit.innerHTML = "52°F";
}

let clickFahrenheit = document.querySelector("#fahrenheit");
clickFahrenheit.addEventListener("click", changeTempF);

function showTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h2").innerHTML = response.data.name;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function serachInput(event) {
  event.preventDefault();
  let apiKey = "32e21d67cb89f007d8b2ad84f78f5d7f";
  let units = "metric";
  let city = document.querySelector("#city-display").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
let searchCity = document.querySelector("#city-input");
searchCity.addEventListener("submit", serachInput);

function findLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "32e21d67cb89f007d8b2ad84f78f5d7f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
navigator.geolocation.getCurrentPosition(findLocation);

let currentLocation = document.querySelector("#current-location-button");
currentLocation.addEventListener("submit", findLocation);
