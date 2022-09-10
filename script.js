const apiKey = "ff77349cf3ff082fc8d44b4a9ebb3767"
var cityName = "tucson"

let date = moment().format("MMM DD, YYYY");

const addCities = $('.add-cities');
const citiesList = $('.cites');
const cities = JSON.parse(localStorage.getItem('cities')) || [];

function addCity(event) {
    event.preventDefault();
    const text = (this.$('name=city')).value;
    const item = {
        text
    };

    cities.push(item);
    populateList(city, citiesList);
    localStorage.setItem('items', JSON.stringify(cities));
    this.reset();
}

function populateList(cities = [], citiesList) {
    citiesList.innerHTML = cities.map((city, i) => {
        return `
        <li>
        <label for='city${i}'>${city.text}</label>
        <li>
        `;
    });
}

addCities.addEventListener('btn', addCity);
populateList(cities, citiesList);

function getApi() {
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //getWeather(data[0].lat, data[0].lon);
        var lat = data[0].lat;
        var lon = data[0].lon;
        var currentCity = data[0].name

        console.log(data);
        console.log('lat', lat)
        console.log('lon', lon)
        console.log('name', currentCity);
        getWeather(lat, lon, currentCity)
    });
  }


  function getWeather(lat, lon, currentCity) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;
        var uvi = data.main.uvi;

        document.getElementById('current').innerHTML =

        `<div class="col-sm-12" id="current-weather">
            <h3 class="city-name mb-1 mt-2 bolder" id="current-city">${currentCity}</h3>
            <p>Temperature: <span class="current" id="temperature">${temp}</span></p>
            <p>Humidity: <span class="current" id="humidity">${humidity}</span></p> 
            <p>Wind Speed: <span class="current" id="wind-speed">${windSpeed}</span></p>
            <p>UV index: <span class="current rounded py-2 px-2 text-white" id="uv-index"></span>${uvi}</p>
        </div>` 
        getForecast(lat, lon)
    });

    function getForecast(lat, lon) {
        var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

    for(let i = 0; i < 5; i++) {
        $("#fiveday").append(
    
        `<div class="col-sm-2 bg-primary text-light m-2 p-2">
            <p>${i + 1}</p>
            <p></p>
            <p>Temp:<span> ${data.list[i].main.temp}</span></p>
            <p>Wind:<span> ${data.list[i].wind.speed}</span></p>
            <p>Humidity:<span></span></p>
        </div>`
        )
    
    }

    });

    }
}

getApi();