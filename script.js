var citySrhEl = document.querySelector('#citySrh');
var srhBtnEl = document.querySelector('#srhBtn');
var pastSearchEl = document.querySelector('#pastSearch');

// var dateHeader = moment(today).format('dddd');
// document.getElementById('currentHeader').text(dateHeader);

var apiKey = 'c5f7256db3858e45809dbd56d8c5b72d';


function loadPastSearches () {
    var pastCities = JSON.parse(localStorage.getItem('cities')) || [];
    for(let city of pastCities) {
        searchHistory(city);
    }
}

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
        document.getElementById('currentWeather').innerHTML = '';

        var temp = data.current.temp;
        var wind_speed = data.current.wind_speed;
        var uvi = data.current.uvi;
        var humidity = data.current.humidity;
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        var uvEl = document.createElement('p');
        var humidityEl = document.createElement('p');

        tempEl.textContent = "TEMP: " + temp;
        windEl.textContent = "WIND: " + wind_speed;
        uvEl.textContent = "UV: " + uvi;
        humidityEl.textContent = "HUMIDITY" + humidity;

        document.getElementById('currentWeather').append(tempEl, windEl, uvEl, humidityEl);
        document.getElementById('listGroup').innerHTML = ''; 

        
        for(var i = 0; i < 5; i++) {
            
            var day = data.daily[i];
            var minEl = day.temp.min;
            var maxEl = day.temp.max;
            var wind_speed = data.current.wind_speed;
            var uvi = data.current.uvi;
            var humidity = data.current.humidity;
            var forecastList = document.createElement('ul');
            var lowTemp = document.createElement('li');
            var highTemp = document.createElement('li');
            var windEl = document.createElement('li');
            var uvEl = document.createElement('li');
            var humidityEl = document.createElement('li');
            var forecastCard = document.createElement('div');
            
            lowTemp.textContent = "MIN: " + minEl;
            forecastCard.classList.add('card');
            highTemp.textContent = "MAX: " + maxEl;
            windEl.textContent = "WIND: " + wind_speed;
            uvEl.textContent = "UV: " + uvi;
            humidityEl.textContent = "HUMIDITY" + humidity;
            forecastList.append(lowTemp, highTemp, windEl, uvEl, humidityEl);
            forecastCard.append(forecastList);
            forecastList.classList.add('list-group');
            forecastList.classList.add('list-group-flush');
            lowTemp.classList.add('list-group-item');
            highTemp.classList.add('list-group-item');
            windEl.classList.add('list-group-item');
            uvEl.classList.add('list-group-item');
            humidityEl.classList.add('list-group-item');
            
            document.getElementById('listGroup').append(forecastCard);
            
        }
    });
}

var searchHistory = function(city) {

    var searchHistoryEl = document.createElement('button');
    searchHistoryEl.textContent = city;
    searchHistoryEl.classList = "btn btn-secondary btn-lg btn-block mt-2";
    searchHistoryEl.addEventListener('click', function(event) {
        var searchBtnValue = event.target.textContent;
        geoCall(searchBtnValue);
    })
    var searchHistoryBtnEl = document.querySelector('#pastSearch');
    searchHistoryBtnEl.append(searchHistoryEl);

    
}

loadPastSearches ();

// event handlers here
$('#srhBtn').on('click', function() {
    geoCall($('#citySrh').val());
    var currentCities = JSON.parse(localStorage.getItem('cities')) || [];
    currentCities.push($('#citySrh').val());
    localStorage.setItem('cities', JSON.stringify(currentCities));
    searchHistory($('#citySrh').val());
    getOneCallWeather('');
});



