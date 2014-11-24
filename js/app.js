'use strict';

/* App Module */

var app = angular.module('baldurApp', [
    'ngRoute',
    'baldurControllers',
    'baldurDirectives',
    'baldurFilters',
    'ngSanitize'
]);

app.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        $routeProvider.otherwise({
            controller: 'BaldurCtrl'
        });

        $locationProvider.html5Mode(true).hashPrefix('!');
    }
]);
