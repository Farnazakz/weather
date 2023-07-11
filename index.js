function changetime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = days[now.getDay()];

  let realhour = now.getHours();
  let realminute = now.getMinutes();

  let changetime = document.querySelector("#time");
  if (realminute < 10) {
    changetime.innerHTML = `${realhour} : 0${realminute}`;
  } else {
    changetime.innerHTML = `${realhour} : ${realminute}`;
  }

  let changeweekday = document.querySelector("#date");
  changeweekday.innerHTML = weekday;
}

function converttofarenheit(event) {
  event.preventDefault();
  let degree = document.querySelector("#currenttemprature");
  let farenheitdegree = degree.innerHTML;
  degree.innerHTML = Math.round((farenheitdegree * 9) / 5 + 32);
}

function converttocelicious(event) {
  event.preventDefault();
  let degree = document.querySelector("#currenttemprature");
  let celiciousdegree = degree.innerHTML;
  degree.innerHTML = Math.round(((celiciousdegree - 32) * 5) / 9);
}

function citysearch(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#searchedcity");
  let newcity = document.querySelector("#city");
  let citytoweather = `${searchinput.value}`;
  newcity.innerHTML = citytoweather;

  //change city and getting real weather data//

  function showCityTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let htmltemp = document.querySelector("#currenttemprature");
    htmltemp.innerHTML = temperature;

    let wind = response.data.wind.speed;
    let htmlWind = document.querySelector("#wind");
    htmlWind.innerHTML = `Wind: ${wind}km/h`;

    let feeling = Math.round(response.data.main.feels_like);
    let htmlfeeling = document.querySelector("#feeling");
    htmlfeeling.innerHTML = `Feels like ${feeling}°`;

    let humidity = Math.round(response.data.main.humidity);
    let htmlhumidity = document.querySelector("#humidity");
    htmlhumidity.innerHTML = `Humidity: ${feeling}%`;

    let qualification = response.data.weather[0].description;
    let htmlqualification = document.querySelector("#qualification");
    htmlqualification.innerHTML = `${qualification}`;
  }

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citytoweather}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityTemperature);
}

changetime();

let searchelement = document.querySelector("#searching");
searchelement.addEventListener("submit", citysearch);

let farenhitTemp = document.querySelector("#farenheit");
farenhitTemp.addEventListener("click", converttofarenheit);

let celiciousTemp = document.querySelector("#celicious");
celiciousTemp.addEventListener("click", converttocelicious);

// current city and getting real weather data//
function findLocation() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function showWeather(response) {
  console.log(response);
  let realTemp = Math.round(response.data.main.temp);
  let htmlTemp = document.querySelector("#currenttemperature");
  htmlTemp.innerHTML = `${realTemp}`;
  let newcity = document.querySelector("#city");
  newcity.innerHTML = response.data.name;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(function (response) {
    showWeather(response);
  });
}

let currentLocationTemp = document.querySelector("#btnsecondary");
currentLocationTemp.addEventListener("click", findLocation);
