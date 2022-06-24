let city = "Kiev";

function cityUp(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityName.value}`;
  city = `${cityName.value}`;
  if (city.length === 0) {
    city = "Kiev";
  }

  let apiKey = "d14a5f9f0440a82a056dfd79e5c778de";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(function Temp(response) {
    let h2 = document.querySelector("h2");
    let temperature = Math.round(response.data.main.temp);
    h2.innerHTML = `${temperature}°C`;
  });
}
let send = document.querySelector("#send");
send.addEventListener("click", cityUp);

function yourPositionButt() {
  function yourPosition(position) {
    let apiKey = "d14a5f9f0440a82a056dfd79e5c778de";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let urlPosition = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}&units=metric`;

    axios.get(urlPosition).then(function (response) {
      let h1 = document.querySelector("h1");
      h1.innerHTML = `${response.data.name}`;
      console.log(response.data.name);
      let h2 = document.querySelector("h2");
      let temperature = Math.round(response.data.main.temp);
      h2.innerHTML = `${temperature}°C`;
    });
  }
  navigator.geolocation.getCurrentPosition(yourPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", yourPositionButt);
