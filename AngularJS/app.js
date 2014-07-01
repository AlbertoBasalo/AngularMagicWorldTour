var worldTourApp = angular.module('worldTourApp', []);

worldTourApp.controller('WorldTourCtrl', function ($scope, $http) {
    var urlCountries='http://restcountries.eu/rest/v1/region/';
    var urlOpenWeather='http://api.openweathermap.org/data/2.5/weather?q=';
    var urlJsonp= '&callback=JSON_CALLBACK';
    $scope.loadCountries = function () {
        $http.get(urlCountries + $scope.region_code).success(function (countryList) {
            $scope.country_list = countryList;
            countryList.forEach(function(country) {
                $http.jsonp(urlOpenWeather + country.capital + ',' + country.alpha2Code + urlJsonp)
                    .success(function (openWeather) 
                             {country.weather = openWeather.weather[0];});
            })
        });
    };
});