

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);


function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let currentCity = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector ("#humidity");
  let windSpeedElement = document.querySelector ("#wind-speed");
  let iconElement = document.querySelector ("#icon");
  let timeElement = document.querySelector ("#time");
  let date = new Date(response.data.time * 1000)


  iconElement.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                class="current-temperature-icon"
              />`


  currentCity.innerHTML = response.data.city;
  descriptionElement.innerHTML= response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  timeElement.innerHTML = formatDate(date);
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = `${temperature}`;
  
}


function formatDate (date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
 }

  return `${day} ${hours}:${minutes}`

} 

function getForecast(city) {
  let apiKey = "44afe8df0cto8bd61386ce03b2c7b34e";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat",];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml = 
      forecastHtml + 
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15°</strong>
          </div>
          <div class="weather-forecast-temperature">9°</div>
        </div>
      </div>
      `;
  });

  forecastElement.innerHTML = forecastHtml;
}





function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let apiKey = "44afe8df0cto8bd61386ce03b2c7b34e";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayTemperature);
}

getForecast ();
displayForecast();
