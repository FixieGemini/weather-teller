const apiKey = "ff77349cf3ff082fc8d44b4a9ebb3767"
var cityName = "tucson"

let date = moment().format("MMM DD, YYYY");

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
    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        
        var temp = data.current.temp;
        var humidity = data.current.humidity;
        var windSpeed = data.current.wind_speed;
        var uvi = data.current.uvi;

        document.getElementById('current').innerHTML =

        `<div class="col-sm-12" id="current-weather">
            <h3 class="city-name mb-1 mt-2 bolder" id="current-city">${currentCity}</h3>
            <p>Temperature: <span class="current" id="temperature">${temp}</span></p>
            <p>Humidity: <span class="current" id="humidity">${humidity}</span></p> 
            <p>Wind Speed: <span class="current" id="wind-speed">${windSpeed}</span></p>
            <p>UV index: <span class="current rounded py-2 px-2 text-white" id="uv-index"></span>${uvi}</p>
        </div>` 

        for(let i = 0; i < 5; i++) {
            $("#fiveday").append(
        
            `<div class="col-sm-2 bg-primary text-light m-2 p-2">
                <p>${date}</p>
                <p></p>
                <p>Temp:<span> ${data.daily[i].temp.day}</span></p>
                <p>Wind:<span> ${data.daily[i].wind_speed}</span></p>
                <p>Humidity:<span> ${data.daily[i].humidity}</span></p>
            </div>`
            )
        }

    });

  }

getApi();