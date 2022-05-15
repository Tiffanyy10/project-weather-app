function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay (timestamp) {
  let date = new Date (timestamp * 1000);
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
  let forecastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay, index) {
  if (index < 2) {
  forecastHTML =
    forecastHTML +
    `
    <div class="col-6">
              Avgerage expected temp tomorrow: 
              <div class="tomorrow-temp">
                ${formatDay (forecastDay.dt.temp.day)}c
              </div> 
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}" alt="tomorrow-image"/>
            </div>
        
        `;
  forecastHTML =
    forecastHTML +
    `
            <div class="col-6">
              Avgerage expected temp next day: 
              <div class="tomorrow-temp">
                ${formatDay (forecastDay.dt.temp.day)}c
              </div> 
              <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}" alt="tomorrow-image"/>
            </div>
        `;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  }
});

function getForecast(coordinates) {
  let apiKey = "4a3dabcb0d3320338e6143377feb5126";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#currentTemperature");
  temperatureElement.innerHTML = response.data.main.temp;
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#current-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#current-wind-speed");
  windElement.innerHTML = response.data.wind.speed;
  let dateElement = document.querySelector("#todays-date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#current-image");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "4a3dabcb0d3320338e6143377feb5126";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function submitted(event) {
  event.preventDefault();
  let searchedCityElement = document.querySelector("#searched-city");
  search(searchedCityElement.value);
}

let form = document.querySelector("#search-box");
form.addEventListener("submit", submitted);
