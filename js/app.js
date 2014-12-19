'use strict';

/* App Module */

var app = angular.module('oryApp', [
    'ngRoute',
    'oryControllers',
    'oryDirectives',
    'oryServices',
    'oryFilters',
    'ngSanitize'
]);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.otherwise({
            templateUrl: "templates/app.html"
        });

        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);
