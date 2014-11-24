'use strict';

/* Directives */
var app = angular.module('baldurDirectives', []);

app.directive('baldurNavigation', function ($q, $http) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            var name = attrs.baldurNavigation;
            $http.get('mock/navigations/' + name + '.json').then(function (result) {

                // This app relies on relative paths, not absolute ones. Therefore we need to strip the leading /
                angular.forEach(result.data, function (v, k) {
                    result.data[k].url = v.url.substr(1, v.length);
                });

                scope.navigation = result.data;
            });
        },
        templateUrl: function (elem, attrs) {
            return attrs.template || 'partials/navigation.html'
        }
    };
});

app.directive('baldurRender', ["$compile", "$http", "$location", function ($compile, $http, $location) {
    return {
        restrict: 'EA',
        scope: {
            scope: '='
        },
        link: function (scope, element, attrs) {
            var render = function () {
                var route = $location.url();

                var fetchCallBack = function (id) {
                    $http.get('mock/nodes/' + id + '.json').then(function (node) {
                        $http.get(attrs.templateDir.replace(/\/$/, '') + '/' + node.data.type + ".html").then(function (template) {
                            var s = angular.extend(scope, node.data);
                            element.append(template.data);
                            $compile(element.contents())(s);
                        });
                    });
                };

                if (scope.scope !== undefined) {
                    var s = scope.scope;
                    if (s.id !== undefined) {
                        fetchCallBack(s.id);
                    } else {
                        console.log("Scope needs to be an object containing the property id, got", s);
                    }
                } else {
                    $http.post('mock/mapper/' + route + '.json', {url: route}).then(function (resolved) {
                        fetchCallBack(resolved.data.id);
                    });
                }
            };

            render();

            scope.$watch("$routeChangeStart", function (event, next, current) {
                console.log("wowy",  $location.url());
            });
        }
    }
}]);
