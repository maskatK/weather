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
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  formatData.innerHTML = `${day} ${hours}:${minutes}`;

  function yourPositionAuto () {
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
    }
    let farengeitLink = document.querySelector("#farengeit-link");
    farengeitLink.addEventListener("click", showFarengeit);

    function showCelcius(event) {
      event.preventDefault();
      celciusLink.classList.add("active");
      farengeitLink.classList.remove("active");
      let temperatureElement = document.querySelector("strong");
      temperatureElement.innerHTML = `${celciusTemperature}°`;
    }
    let celciusLink = document.querySelector("#celcius-link");
    celciusLink.addEventListener("click", showCelcius);
  }

  function yourPosition(position) {
    let apiKey = "d14a5f9f0440a82a056dfd79e5c778de";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let urlPositionAuto =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}&units=metric`;
  
  axios.get(urlPositionAuto).then(elements);

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
  }
  navigator.geolocation.getCurrentPosition(yourPosition);
}
window.addEventListener("load", yourPositionAuto);





