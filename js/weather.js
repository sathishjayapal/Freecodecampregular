/**
 * Created by sjayapal on 7/3/2017.
 */
angular
    .module("Weather", ["ui.select", "ngSanitize"])
    .service("WeatherModel", function($http, $q, $timeout) {
        var model = this;
        url = "http://ip-api.com/json";
        var weatherModel =
            {
                lat: 43.1946,
                longit: -89.2025,
                city: "Madison",
                state: "WI",
                country: "US",
                tempratureCelcius: 5,
                tempratureFarenhiet: 0
            };
        model.weatherModel=weatherModel;
        model.getWeatherLocation = function() {
            var defer = $q.defer();
            $http({
                method :"GET",
                //contentType: "application/json; charset=utf-8",
                url: url}).then(
                function success(response) {
                    model.weatherModel.lat = response.lat;
                    model.weatherModel.longit = response.lon;
                    console.log("service success");
                    console.log(model);
                    defer.resolve({weatherModel : model.weatherModel});
                },
                function errorCallback(response) {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(
                            position
                        ) {
                            model.weatherModel.lat = position.coords.latitude;
                            model.weatherModel.longit = position.coords.longitude;
                            console.log("Weather Model is "+model.weatherModel.lat);
                        });
                    }
                    console.log("service error");
                    console.log(model);
                    defer.resolve({weatherModel : model.weatherModel});
                }
            );
            return defer.promise;
        };
        model.getWeather = function() {
            getWeatherLocation();
            console.log(model.weatherModel);
            return model.weatherModel;
        };
        return model;
    })
    .controller("MainCntrl", [
        "$http",
        "$scope",
        "WeatherModel",
        "$q",
        function($http, $scope, WeatherModel, $q) {
            var maincontroller = this;
            maincontroller.itemArray = [
                { id: 1, name: "Degrees" },
                { id: 2, name: "Farenheit" }
            ];
            maincontroller.selectedItem = maincontroller.itemArray[0];
            maincontroller.data;
            maincontroller.actualWeatherCallData;
            //maincontroller.weatherModel = WeatherModel.getWeatherLocation();
            $q.when(WeatherModel.getWeatherLocation()).then(function success(response){
                    console.log("success");
                    console.log(response);
                },
                function error(errors){
                    console.log("error");
                    console.log(response);
                });
            maincontroller.callforWeatherData = function() {
                $http({
                    method: "JSONP",
                    contentType: "application/json; charset=utf-8",
                    url: "https://api.darksky.net/forecast/7a9d3a1510d164dd1dc6fa411163f295/" +
                    maincontroller.weatherModel.lat +
                    "," +
                    maincontroller.weatherModel.longit
                }).then(
                    function success(response) {
                        maincontroller.status = response.status;
                        maincontroller.actualWeatherCallData = response.data;
                        if (response.status === 200) {
                            maincontroller.weatherModel.tempratureCelcius =
                                response.data.main.temp;
                            maincontroller.weatherModel.tempratureFarenhiet = maincontroller.calcTemp(
                                maincontroller.weatherModel.tempratureCelcius
                            );
                        }
                    },
                    function errorCallback(response) {
                        alert('2');
                        maincontroller.status = response.status;
                        console.log(maincontroller.status);
                        maincontroller.weatherModel.tempratureFarenhiet = maincontroller.calcTemp(
                            maincontroller.weatherModel.tempratureCelcius
                        );
                    }
                );
            };
            maincontroller.calcTemp = function(temp) {
                return Math.round(temp * 9) / 5 + 32;
            };
        }
    ]);
