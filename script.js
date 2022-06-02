var apiKey = 'c5f7256db3858e45809dbd56d8c5b72d';
var city;

function inti() {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey)
        .then(function (response) {
            return response.json();
        });
        
}









inti();