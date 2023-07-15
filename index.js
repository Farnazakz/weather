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

function formatForcastDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getforcast(response) {
  let apiKey = "5f00d10b8t4ae2b91cc4f26o7dd3659d";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${response}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayforcast);
}

function displayforcast(response) {
  let forcast = response.data.daily;
  console.log(response.data.daily);
  let forcastElement = document.querySelector("#forcastdays");
  let forcastHTML = `<div class="row days" >`;

  forcast.forEach(function (forcastday, index) {
    if (0 < index && index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col-2">
                      <div class="card pfcards">
                        <div class="card-body wcard">
                          <h6 class="wd">${formatForcastDays(
                            forcastday.time
                          )}</h6>
                          <img src="${forcastday.condition.icon_url}" alt="${
          forcastday.condition.description
        }" width="50px">
                         <span>${Math.round(
                           forcastday.temperature.maximum
                         )}°C</span>
                         <span>${Math.round(
                           forcastday.temperature.minimum
                         )}°C </span>

                        </div>
                      </div>
                    </div> `;
    }
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
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
    console.log(response);

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

    getforcast(response.data.city);
  }

  let apiKey = "5f00d10b8t4ae2b91cc4f26o7dd3659d";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${citytoweather}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCityTemperature);
}

let searchelement = document.querySelector("#searching");
searchelement.addEventListener("submit", citysearch);

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
