/**
 * Created by sjayapal on 7/3/2017.
 */
angular
    .module('Weather', [])
    .controller('MainCntrl', ['$scope',function ($scope) {
        var mainContrl= this;
         $scope.test1="This is Sathish" ;
        mainContrl.test="This is another swap"
        console.log("The Constructor");
    }]);
