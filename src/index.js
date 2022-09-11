function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

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
  let currentDay = days[day];
  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = date.getMonth();
  let currentMonth = months[month];
  let year = date.getFullYear();
  let currentDate = date.getDate();

  return `${currentMonth} ${currentDate} ${year} <br /> ${currentDay} <br /> ${hours}:${minutes}`;
}

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityName.innerHTML = cityInput.value;
}

function convertFahrenheit(event) {
  event.preventDefault();
  let tempNow = document.querySelector("#temperature");
  tempNow.innerHTML = "80°";
}

function convertCelsius(event) {
  event.preventDefault();
  let tempNow = document.querySelector("#temperature");
  tempNow.innerHTML = "26°";
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function search(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function searchCity(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentTime = new Date();
let date = document.querySelector("#date");
date.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", searchCity);

let fahrenheitNow = document.querySelector("#fahrenheit-Temp");
fahrenheitNow.addEventListener("click", convertFahrenheit);

let celsiusNow = document.querySelector("#celsius-Temp");
celsiusNow.addEventListener("click", convertCelsius);

let button = document.querySelector("#search-button");
button.addEventListener("click", handleSubmit);

let locationButton = document.querySelector("#current-button");
locationButton.addEventListener("click", getCurrentLocation);

searchCity("Tokyo");
