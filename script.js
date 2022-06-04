var citySrhEl = document.querySelector('#citySrh');
var srhBtnEl = document.querySelector('#srhBtn');
var pastSearchEl = document.querySelector('#pastSearch');
var searchHistoryEl = citySrhEl.value.trim();

var apiKey = 'c5f7256db3858e45809dbd56d8c5b72d';
var city;

function geoCall(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            
            getOneCallWeather(data.coord.lat, data.coord.lon);
        });
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
        var tempEl = document.createElement('li');
        var windEl = document.createElement('li');
        var uvEl = document.createElement('li');
        var humidityEl = document.createElement('li');

        tempEl.textContent = "TEMP: " + temp;
        windEl.textContent = "WIND: " + wind_speed;
        uvEl.textContent = "UV: " + uvi;
        humidityEl.textContent = "HUMIDITY" + humidity;

        document.getElementById('currentWeather').append(tempEl, windEl, uvEl, humidityEl);

        for(var i = 0; i < 5; i++) {

            var day = data.daily[i];
            var minEl = day.temp.min;
            var maxEl = day.temp.max;
            var wind_speed = data.current.wind_speed;
            var uvi = data.current.uvi;
            var humidity = data.current.humidity;
            var tempEl = document.createElement('li');
            var windEl = document.createElement('li');
            var uvEl = document.createElement('li');
            var humidityEl = document.createElement('li');

            minEl.textContent = "MIN: " + temp;
            maxEl.textContent = "MAX: " + temp;
            windEl.textContent = "WIND: " + wind_speed;
            uvEl.textContent = "UV: " + uvi;
            humidityEl.textContent = "HUMIDITY" + humidity;

            document.getElementById('listGroup').append(minEl, maxEl, tempEl, windEl, uvEl, humidityEl);
       
        }
    });
}

var searchHistory = function() {
    searchHistoryEl = document.createElement('button');
    searchHistoryEl.textContent = city;
    searchHistoryEl.classList = "d-flex w-100 btn-light border p-2";
    searchHistoryEl.setAttribute('recent-city', searchHistory);
    searchHistoryEl.setAttribute('type', 'submit');
    var searchHistoryBtnEl = document.querySelector('searchHistoryBtn');
    searchHistoryBtnEl.prepend(searchHistoryEl);
    searchHistoryBtnEl.append('#pastSearch');
}


// event handlers here
$('#srhBtn').on('click', function() {
    geoCall($('#citySrh').val());
    localStorage.setItem(city, JSON.stringify(city));
    searchHistory(city);
    getOneCallWeather('');
});



