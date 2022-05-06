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
}

let apiKey = "4a3dabcb0d3320338e6143377feb5126";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

let form = document.querySelector("search-box");
