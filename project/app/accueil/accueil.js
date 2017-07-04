// Ctrl+Alt+L = indentation
'use strict';

angular.module('myApp.accueil', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/accueil', {
            templateUrl: 'accueil/accueil.html',
            controller: 'AccueilCtrl'
        });
    }])

    .controller('AccueilCtrl', ['$scope', function ($scope) {

    }]);
