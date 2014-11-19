'use strict';

/* App Module */

var app = angular.module('baldurApp', [
    'ngRoute',
    'baldurControllers',
    'baldurDirectives'
]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);
