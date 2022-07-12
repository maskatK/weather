  let date = new Date();
  let formatData = document.querySelector("#day_hour_min");
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
      minutes = `0${minutes}`;
  }
  let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  let day = days[date.getDay()];
  formatData.innerHTML = `${day} ${hours}:${minutes}`;
  let apiKey="d14a5f9f0440a82a056dfd79e5c778de";
  
   
    
    function formatDay(timestemp) {
     let date = new Date(timestemp * 1000);
      let day = date.getDay();
      days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return days[day];
    }

   
  function displeyDayInWeek (response) {
    let forecast = response.data.daily;
    let dayElement = document.querySelector("#days-week");
    let daysHTML = `<div class="row row-cols-5 gx-3">`;
        forecast.forEach(function(elem, index) {
          if (index < 5) {
      daysHTML = daysHTML +
        `<div class="col">${formatDay(elem.dt)}</div>`;
          }
  });
      daysHTML = daysHTML + `</div>`;
    dayElement.innerHTML = daysHTML;
  
  let tempWeekElement = document.querySelector("#temp-week");
  let tempWeekHTML = `<div class="row row-cols-5">`;
    forecast.forEach(function(elem, index) {
      if (index < 5) {
  tempWeekHTML = tempWeekHTML +
  `<div class="col">
  <div class="p-3 border bg-white">
    <img 
    src="http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png" 
      alt="" 
      width="42"
    />
    <br />
    <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">
                  ${Math.round(elem.temp.max)}°
                </span>
                <span class="weather-forecast-temperature-min">
                     ${Math.round(elem.temp.min)}°
                </span>
            </div>
  </div>
</div>`
  }
});
tempWeekHTML = tempWeekHTML + `</div>`;
tempWeekElement.innerHTML = tempWeekHTML;
}

function getCityCoord(coordinates) {  
  let apiUrlWeekCel = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlWeekCel).then(displeyDayInWeek);
}
function changeApiUrl(coordinates) {
  let apiUrlWeekFar = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`; 
  axios.get(apiUrlWeekFar).then(displeyDayInWeek);  
}

    function elements (response) {
      let h1 = document.querySelector("h1");
      h1.innerHTML = `${response.data.name}`;
      let strong = document.querySelector("strong");
      let celciusTemperature = Math.round(response.data.main.temp);
      let humidityElement = document.querySelector("#humidity");
      let windElement = document.querySelector("#wind");
      let weatherElement = document.querySelector("#discription");
      let iconElement = document.querySelector("#icon");

      strong.innerHTML = `${celciusTemperature}°`;
      humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    weatherElement.innerHTML = response.data.weather[0].description;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    
    
    function showFarengeit(event) {
      event.preventDefault();
      let temperatureElement = document.querySelector("strong");
      celciusLink.classList.remove("active");
      farengeitLink.classList.add("active");
      let farengeitTemperature = celciusTemperature * 1.8 + 32;
      temperatureElement.innerHTML = `${Math.round(farengeitTemperature)}°`;
      changeApiUrl(response.data.coord);
    }
    let farengeitLink = document.querySelector("#farengeit-link");
    farengeitLink.addEventListener("click", showFarengeit);

    function showCelcius(event) {
      event.preventDefault();
      celciusLink.classList.add("active");
      farengeitLink.classList.remove("active");
      let temperatureElement = document.querySelector("strong");
      temperatureElement.innerHTML = `${celciusTemperature}°`;
      getCityCoord(response.data.coord);
    }
    
    let celciusLink = document.querySelector("#celcius-link");
    celciusLink.addEventListener("click", showCelcius);

   getCityCoord(response.data.coord);
    }
    

let celciusTemperature = null;

function cityUp(event) {
  event.preventDefault();
    let cityName = document.querySelector("#serch_city");
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${cityName.value}`;
    city = `${cityName.value}`;
    let urlPositionManually = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            
  axios.get(urlPositionManually).then(elements);
       
  }
  let send = document.querySelector("#button-addon2");
  send.addEventListener("click", cityUp);

  function yourPositionAuto () {
    function yourPosition(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let urlPositionAuto =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}&units=metric`;
    
    axios.get(urlPositionAuto).then(elements);
    }
    navigator.geolocation.getCurrentPosition(yourPosition);
  }

window.addEventListener("load", yourPositionAuto);






