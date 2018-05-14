/**
 * Created by skminfotech on 5/13/18.
 */
angular.module('pomodoroApp',
    ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'timer']);
angular.module('pomodoroApp').controller('pomodoroCntrlr',
    function ($uibModal, $log, $document, $http, $scope) {
      var pomodoroCntrlr = this;

      pomodoroCntrlr.timerRunning = false;
      pomodoroCntrlr.endTime = false;
      pomodoroCntrlr.twentyMinutesLater = new Date();
      pomodoroCntrlr.twentyMinutesLater.setMinutes(
          pomodoroCntrlr.twentyMinutesLater.getMinutes() + 25);
      pomodoroCntrlr.breakLength = new Date();
      pomodoroCntrlr.breakLength.setMinutes(5);
      pomodoroCntrlr.breakLength.setSeconds(00);

      pomodoroCntrlr.startTimer = function () {
        $scope.$broadcast('timer-start');
        pomodoroCntrlr.timerRunning = true;
      };

      pomodoroCntrlr.pauseTimer = function () {
        $scope.$broadcast('timer-stop');
        $scope.timerRunning = false;
      };
      pomodoroCntrlr.increaseBreak = function () {
        var minutes = pomodoroCntrlr.breakLength.getMinutes();
        pomodoroCntrlr.breakLength.setMinutes(minutes + 1);
        pomodoroCntrlr.breakLength.setSeconds(00);
      }
      pomodoroCntrlr.increaseDuration = function () {
        pomodoroCntrlr.timerRunning = false;
        var minutes = pomodoroCntrlr.twentyMinutesLater.getMinutes();
        pomodoroCntrlr.twentyMinutesLater.setMinutes(minutes + 1);
        pomodoroCntrlr.twentyMinutesLater.setSeconds(00);
        $scope.$broadcast('timer-start');
        pomodoroCntrlr.timerRunning = true;

      }

    });
