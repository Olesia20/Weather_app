function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
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
function displauForecast() {
  let forcastElement = document.querySelector("#forecast");
  let days = ["Sat", "Sun", "Mon", "Thu", "Wed", "Thu"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img
        src="http://openweathermap.org/img/wn/10d@2x.png"
        alt="Clear"
        width="70"
      />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-weather-max">18°</span>
        <span class="weather-forecast-weather-min">12°</span>
      </div>
    </div>
 `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forcastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "32326959e29561c07003e2cd9a21f791";
  let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let descriptionElemennt = document.querySelector("#description");
  descriptionElemennt.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dataElemet = document.querySelector("#date");
  celsiumTemperature = response.data.main.temp;
  dataElemet.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "32326959e29561c07003e2cd9a21f791";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function displayFuhrenheitTemperature(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#temperature");
  tempFuhrenheit.classList.remove("active");
  tempC.classList.add("active");
  let tempF = (celsiumTemperature * 9) / 5 + 32;
  tempCelsius.innerHTML = Math.round(tempF);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  tempC.classList.remove("active");
  tempFuhrenheit.classList.add("active");
  let tempCelsius = document.querySelector("#temperature");
  tempCelsius.innerHTML = Math.round(celsiumTemperature);
}

let celsiumTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let tempFuhrenheit = document.querySelector("#fuhrenheit-link");
tempFuhrenheit.addEventListener("click", displayFuhrenheitTemperature);

let tempC = document.querySelector("#celsium-link");
tempC.addEventListener("click", displayCelsiusTemperature);
search("kyiv");
displauForecast();
