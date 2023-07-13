function changeTime(unixTimestamp) {
  let now = new Date(unixTimestamp);

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
  if (realhour < 10) {
    realhour = `0${realhour}`;
  }
  if (realminute < 10) {
    realminute = `0${realminute}`;
  }
  return `${weekday} <br> ${realhour}:${realminute} `;
}

function displayforcast() {
  let forcastElement = document.querySelector("#forcastdays");
  let forcastHTML = `<div class="row days" >`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `<div class="col-2">
                      <div class="card pfcards">
                        <div class="card-body wcard">
                          <h6 class="wd">${day}</h6>
                          <i class="fa-solid fa-sun"></i>
                          <p>4°c</p>
                        </div>
                      </div>
                    </div> `;
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

function displayprediction() {
  let predictionElement = document.querySelector("#predictiondays");
  let predictionHTML = `<div class="row hours">`;
  let hours = ["11:00", "12:00", "13:00", "14:00"];
  hours.forEach(function (hour) {
    predictionHTML =
      predictionHTML +
      `<div class="col-2">
                      <div class="card pfcards">
                        <div class="card-body wcard">
                          <h6 class="wd">${hour}</h6>
                          <i class="fa-solid fa-cloud-showers-heavy"></i>
                          <p>4°c</p>
                        </div>
                      </div>
                    </div> `;
  });
  predictionHTML = predictionHTML + `</div>`;
  predictionElement.innerHTML = predictionHTML;
}

function converttofarenheit(event) {
  event.preventDefault();

  let degree = document.querySelector("#currenttemprature");
  degree.innerHTML = Math.round((celsiusElement * 9) / 5 + 32);
}

function converttocelicious(event) {
  event.preventDefault();

  let degree = document.querySelector("#currenttemprature");
  degree.innerHTML = celsiusElement;
}

function citysearch(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#searchedcity");
  let newcity = document.querySelector("#city");
  let citytoweather = `${searchinput.value}`;
  newcity.innerHTML = citytoweather;

  //change city and getting real weather data//

  function showCityTemperature(response) {
    celsiusElement = Math.round(response.data.temperature.current);

    let temperature = Math.round(response.data.temperature.current);
    let htmltemp = document.querySelector("#currenttemprature");
    htmltemp.innerHTML = temperature;

    let wind = response.data.wind.speed;
    let htmlWind = document.querySelector("#wind");
    htmlWind.innerHTML = `Wind: ${wind}km/h`;

    let feeling = Math.round(response.data.temperature.feels_like);
    let htmlfeeling = document.querySelector("#feeling");
    htmlfeeling.innerHTML = `Feels like ${feeling}°`;

    let humidity = Math.round(response.data.temperature.humidity);
    let htmlhumidity = document.querySelector("#humidity");
    htmlhumidity.innerHTML = `Humidity: ${humidity}%`;

    let qualification = response.data.condition.description;
    let htmlqualification = document.querySelector("#qualification");
    htmlqualification.innerHTML = `${qualification}`;

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = changeTime(response.data.time * 1000);

    let weathericon = response.data.condition.icon;
    let htmlweathericon = document.querySelector("#weathericon");
    htmlweathericon.setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weathericon}.png`
    );
    htmlweathericon.setAttribute("alt", `${qualification}`);

    let country = response.data.country;
    let htmlcountry = document.querySelector("#country");
    htmlcountry.innerHTML = `${country}`;
  }

  let apiKey = "5f00d10b8t4ae2b91cc4f26o7dd3659d";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${citytoweather}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityTemperature);
}

let celsiusElement = null;

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
displayforcast();
displayprediction();
