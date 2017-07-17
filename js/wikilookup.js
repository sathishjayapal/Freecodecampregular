/**
 * Created by sjayapal on 7/14/2017.
 */

angular.module('wikilookup', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('wikilookup').controller('WikiController', function ($uibModal, $log, $document, $http, $sce) {
    var wikiCntrl = this;
    wikiCntrl.name = "Sathish";
    wikiCntrl.apiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=Einstien';
    wikiCntrl.cb = '&callback=JSON_CALLBACK'
    wikiCntrl.url = wikiCntrl.apiURL + wikiCntrl.cb;
    wikiCntrl.getRandomArticle = function () {
        $http({
            dataType: 'jsonp',
            url: wikiCntrl.url,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:63343/**"
            }

        }).then(
            function success(response) {
                console.log(response);
            })
    }
});