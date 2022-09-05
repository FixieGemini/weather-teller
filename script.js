const apiKey = "ff77349cf3ff082fc8d44b4a9ebb3767"
const andrewsApi = "7a6b3354e50774f952a848fe125c2899"
const cityName = "tucson"

for(let i = 0; i < 5; i++) {
    $("#fiveday").append(
        `<div class="col-sm-2 bg-primary text-light m-2 p-2">
        <p id="">Day</p>
        <p id=""></p>
        <p>Temp:<span id="">${i} Degrees F</span></p>
        <p>Wind:<span id=""></span></p>
        <p>Humidity:<span id=""></span></p>
    </div>`
    )
}

function getApi() {
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        getWeather(data[0].lat, data[0].lon);
      });
  }

  function getWeather(lat, lon) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
  }

getApi();