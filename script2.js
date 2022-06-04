var searchResultsEl = document.querySelector('#search-results');
var qInput = document.querySelector('#q');
var citySearchForm = document.querySelector('#city-search-form');
var apiKey = 'c5f7256db3858e45809dbd56d8c5b72d';

var getSearchResults = function (q) {
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${apiKey}`)
        
        .then(function (response) {

            return response.json();
        })
        .then(function (data) {

            searchResultsEl.innerHTML = null;
        })
}

function getOneCallWeather(lat, lon) {
    
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)

    .then(function(response) {
    
        return response.json();
    })
    
    .then(function(data) {
        
        var temp = data.current.temp;
        var wind_speed = data.current.wind_speed;
        var uvi = data.current.uvi;
        var humidity = data.current.humidity;
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        var uvEl = document.createElement('p');
        var humidityEl = document.createElement('p');

        tempEl.textContent = "TEMPERATURE : " + temp;
        windEl.textContent = "WIND SPEED : " + wind_speed;
        uvEl.textContent = "UV INDEX : " + uvi;
        humidityEl.textContent = "HUMIDITY : " + humidity;

        document.getElementById('current-weather').append(tempEl, windEl, uvEl, humidityEl);

        for(var i = 0; i < 5; i++) {

            var day = data.daily[i];
            var minTempEl = day.temp.min;
            var maxTempEl = day.temp.max;
            var wind_speed = data.current.wind_speed;
            var uvi = data.current.uvi;
            var humidity = data.current.humidity;
            var minTempEl = document.createElement('p');
            var maxTempEl = document.createElement('p');
            var windEl = document.createElement('p');
            var uvEl = document.createElement('p');
            var humidityEl = document.createElement('p');

            minTempEl.textContent = "MIN TEMP: " + temp;
            maxTempEl.textContent = "MAX TEMP: " + temp;
            windEl.textContent = "WIND SPEED: " + wind_speed;
            uvEl.textContent = "UV INDEX: " + uvi;
            humidityEl.textContent = "HUMIDITY: " + humidity;

            document.getElementById('five-day-forecast').append(minTempEl, maxTempEl, windEl, uvEl, humidityEl);
       
        }
    });
}