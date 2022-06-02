var citySrhEl = document.querySelector('#citySrh');
var srhBtnEl = document.querySelector('#srhBtn');
var pastSearchEl = document.querySelector('#pastSearch')

var apiKey = 'c5f7256db3858e45809dbd56d8c5b72d';
var city;

function inti() {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey)
        .then(function (response) {
            return response.json();
        });
        .then(function(data) {
            console.log(data[0].lat, data[0].lon);
            getOneCallWeather(data[0].lat, data[0].lon);
        });
}

function getOneCallWeather(lat, lon) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=' + apiKey + '&units=imperial')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });
}







inti();