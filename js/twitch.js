/**
 * Created by sathishjayapal on 12/9/17.
 */
angular.module('TwitchAPIDemo', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .controller('TwitchAPIDemoCntrlr', function ($scope, $window, $http, $q, $timeout) {
        var TwitchAPIDemoCntrlr = this;
        TwitchAPIDemoCntrlr.tabs = [];
        TwitchAPIDemoCntrlr.response = [];

        TwitchAPIDemoCntrlr.streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
        for (var i = 0; i < TwitchAPIDemoCntrlr.streamers.length; i++) {
            var newTab = {title: TwitchAPIDemoCntrlr.streamers[i]};
            TwitchAPIDemoCntrlr.tabs.push(newTab);
        }
        TwitchAPIDemoCntrlr.alertMe = function (user) {
            var url = "https://wind-bow.glitch.me/twitch-api/users/";
            var defer = $q.defer();
            $http({
                method: "GET",
                //contentType: "application/json; charset=utf-8",
                url: url + user
            }).then(
                function success(response) {
                    TwitchAPIDemoCntrlr.response = response.data;
                    TwitchAPIDemoCntrlr.response.stream='Channel offline';
                    if(response.data.stream!=undefined && response.data.stream!=null) {
                        TwitchAPIDemoCntrlr.response.channel = response.data.display_name;
                        TwitchAPIDemoCntrlr.response.logo = response.data.logo;
                        TwitchAPIDemoCntrlr.response.bio = response.data.bio;
                        TwitchAPIDemoCntrlr.response.stream = response.data.stream;
                        TwitchAPIDemoCntrlr.response.link = response.data._links.self;
                    }

                }
            );
        };

        $scope.model = {
            name: 'Tabs'
        };
    });