// global variables 
var citySrhEl = document.querySelector('#citySrh');
var srhBtnEl = document.querySelector('#srhBtn');
var pastSearchEl = document.querySelector('#pastSearch');

var apiKey = 'c5f7256db3858e45809dbd56d8c5b72d';

// function for pulling past searches from local storage 
function loadPastSearches () {
    var pastCities = JSON.parse(localStorage.getItem('cities')) || [];
    for(let city of pastCities) {
        searchHistory(city);
    }
}
// function to call geo api for lat and lon
function geoCall(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) { 
        getOneCallWeather(data.coord.lat, data.coord.lon);
    });
}
// function to take in lat and lon and provide data needed for weather display
function getOneCallWeather(lat, lon) {
    var apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    
    fetch(apiCall)
    
    .then(function(response) {
        
        return response.json();
    })
    // search through data returned from call 
    .then(function(data) {
        document.getElementById('currentWeather').innerHTML = '';
        // moment for date display
        var dateHeader = moment().format('dddd');
        document.getElementById('currentHeader').textContent = dateHeader;
        // all data variables needed and creating elements for current weather
        var temp = data.current.temp;
        var wind_speed = data.current.wind_speed;
        var uvi = data.current.uvi;
        var humidity = data.current.humidity;
        var currentIcon = data.current.weather[0].icon;
        var currentImg = document.createElement('img');
        var tempEl = document.createElement('p');
        var windEl = document.createElement('p');
        var uvEl = document.createElement('p');
        var humidityEl = document.createElement('p');
        // calling icon from url
        currentImg.setAttribute('src', `https://openweathermap.org/img/wn/${currentIcon}@4x.png`);
        tempEl.textContent = "TEMP: " + temp + " °F";
        windEl.textContent = "WIND: " + wind_speed;
        uvEl.textContent = "UV: " + uvi;
        humidityEl.textContent = "HUMIDITY: " + humidity + " %";
        // setting uv index color based on what uv is 
        var uviClass = 'btn-success';
        if(uvi >= 3){uviClass = 'btn-warning'};
        if(uvi >= 8){uviClass = 'btn-danger'};
        // adding classes to elements 
        uvEl.setAttribute('class', 'btn-active');
        uvEl.setAttribute('class', uviClass);
        document.getElementById('todayDiv').setAttribute('class', 'card text-center');
        document.getElementById('todayDiv').setAttribute('style', 'width:18rem; font-weight:bold');
        document.getElementById('currentHeader').append(currentImg);
        document.getElementById('currentWeather').append(tempEl, windEl, uvEl, humidityEl);
        document.getElementById('listGroup').innerHTML = ''; 
        // loop for 5 day forecast
        for(var i = 0; i < 5; i++) {
            // variables needed from data with day having i + 1 so starts day after current
            var day = data.daily[i + 1];
            var dateHeader = moment(day.dt, 'X').format('dddd');
            var minEl = day.temp.min;
            var maxEl = day.temp.max;
            var wind_speed = day.wind_speed;
            var uvi = day.uvi;
            var humidity = day.humidity;
            var dailyIcon = day.weather[0].icon;
            var dailyImg = document.createElement('img');
            var imgSpan = document.createElement('span');
            var dailyHeader = document.createElement('h3');
            var forecastList = document.createElement('ul');
            var lowTemp = document.createElement('li');
            var highTemp = document.createElement('li');
            var windEl = document.createElement('li');
            var uvEl = document.createElement('li');
            var humidityEl = document.createElement('li');
            var forecastCard = document.createElement('div');
            // pulling icon and setting element text contents
            dailyImg.setAttribute('src', `https://openweathermap.org/img/wn/${dailyIcon}.png`);
            dailyHeader.textContent = dateHeader + " ";
            imgSpan.append(dailyImg);
            lowTemp.textContent = "MIN: " + minEl + " °F";
            highTemp.textContent = "MAX: " + maxEl + " °F";
            windEl.textContent = "WIND: " + wind_speed;
            uvEl.textContent = "UV: " + uvi;
            humidityEl.textContent = "HUMIDITY: " + humidity;
            // appending all elements to to list and list to card
            forecastList.append(dailyHeader, imgSpan, lowTemp, highTemp, windEl, uvEl, humidityEl);
            forecastCard.append(forecastList);
            // setting classes for elements 
            forecastCard.setAttribute('class', 'card')
            forecastList.setAttribute('class', 'list-group list-group-flush text-center');
            forecastList.setAttribute('style', 'font-weight:bold')
            lowTemp.classList.add('list-group-item');
            highTemp.classList.add('list-group-item');
            windEl.classList.add('list-group-item');
            uvEl.classList.add('list-group-item');
            humidityEl.classList.add('list-group-item');
            // uv index based on what it is that day
            var uviClass = 'btn-success';
            if(uvi >= 3){uviClass = 'btn-warning'};
            if(uvi >= 8){uviClass = 'btn-danger'};

            uvEl.setAttribute('class', 'btn-active');
            uvEl.setAttribute('class', uviClass);
            // appending forecastCard to listGroup
            document.getElementById('listGroup').append(forecastCard);
            
        }
    });
}
// function for city search history that turns searches into buttons
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

// event handlers here for when search button is clicked 
$('#srhBtn').on('click', function() {
    geoCall($('#citySrh').val());
    var currentCities = JSON.parse(localStorage.getItem('cities')) || [];
    currentCities.push($('#citySrh').val());
    localStorage.setItem('cities', JSON.stringify(currentCities));
    searchHistory($('#citySrh').val());
});



