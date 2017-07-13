angular.module('QuoteMachine', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('QuoteMachine').controller('ModalDemoCtrl', function ($uibModal, $log, $document, $http) {
    var maincontroller = this;
    maincontroller.items = ['item1', 'item2', 'item3'];
    maincontroller.animationsEnabled = true;
    maincontroller.quote;
    maincontroller.author;
    maincontroller.url =
        "https://andruxnet-random-famous-quotes.p.mashape.com/cat=Famous";
    maincontroller.data;
    maincontroller.myCoordinates = $http({
        method: "GET",
        contentType: "application/x-www-form-urlencoded",
        accept: "application/json",
        headers: {
            "x-mashape-Key": "rurjb9utjgmshHGn34nDVKtaAdcap1MCQWTjsnIZZ0EEMcaxQ8"
        },
        url: maincontroller.url
    }).then(
        function (response) {
            maincontroller.status = response.status;
            if (response.status === 200) {
                maincontroller.data = response.data;
                maincontroller.quote = response.data.quote;
                maincontroller.author = response.data.author;
            }
        },
        function errorCallback(response) {
            maincontroller.data = "No quote found";
        }
    );
    maincontroller.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: maincontroller.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                item: function () {
                    return maincontroller.quote + " - " + maincontroller.author;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            maincontroller.selected = selectedItem;
        }, function () {
            
        });
    };

    maincontroller.toggleAnimation = function () {
        maincontroller.animationsEnabled = !maincontroller.animationsEnabled;
    };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('QuoteMachine').controller('ModalInstanceCtrl', function ($uibModalInstance, item) {
    var $ctrl = this;
    $ctrl.item = item;

    $ctrl.ok = function () {
        $uibModalInstance.close($ctrl.item);
    };
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

