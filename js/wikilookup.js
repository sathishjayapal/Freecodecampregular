/**
 * Created by sjayapal on 7/14/2017.
 */

angular.module('wikilookup', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);
angular.module('wikilookup').config(function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
});
angular.module('wikilookup').controller('WikiController', function ($uibModal, $log, $document, $http, $sce) {
    var wikiCntrl = this;
    wikiCntrl.name = "Sathish";
    wikiCntrl.apiURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=Einstien';
    wikiCntrl.cb = '&callback=JSON_CALLBACK'
    wikiCntrl.url = wikiCntrl.apiURL + wikiCntrl.cb;
    wikiCntrl.req = {
        url: wikiCntrl.apiURL,
        headers: {
            'Content-Type': 'json',
            'Access-Control-Allow-Origin':'*'
        }
    }
    wikiCntrl.getRandomArticle = function () {
        $http(wikiCntrl.req).then(function (response) {
            console.log(response.status);
            console.log(response.data);
        }, function (response) {
            console.log(response.status);
            console.log(response.data || 'you request failed');
        });
    };
    // $http.jsonp({
    //     url: wikiCntrl.url, headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Credentials': 'true',
    //     }.then(function successCallback(response) {
    //         console.log(response);
    //     }, function errorCallback(response) {
    //         console.log("error"+response);
    //     })
    // })
    // }
});