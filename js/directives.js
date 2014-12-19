'use strict';

/* Directives */
var app = angular.module('oryDirectives', []);

app.directive('oryNavigation', function ($q, $http) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            var name = attrs.oryNavigation;
            $http.get('mock/navigations/' + name + '.json').then(function (result) {

                // This app relies on relative paths, not absolute ones. Therefore we need to strip the leading /
                angular.forEach(result.data, function (v, k) {
                    result.data[k].url = v.url.substr(1, v.length);
                });

                scope.navigation = result.data;
            });
        },
        templateUrl: function (elem, attrs) {
            return attrs.template || 'templates/navigation.html'
        }
    };
});

app.directive('oryGet', ['$q', '$http', 'oryResources', '$compile', function ($q, $http, oryResources, $compile) {
    return {
        restrict: 'E',
        scope: {},
        link: function (scope, element, attrs) {
            var api = attrs.api,
                params = {};

            if (oryResources[api] === undefined) {
                console.log('No resource found for:', api);
                return;
            }

            angular.forEach(attrs, function(v, k){
                if(k !== 'api' && k.indexOf('$') == -1){
                    params[k] = v;
                }
            });
            console.log(params);

            oryResources[api].get(params, function (result) {
                var s = angular.extend(scope, result);
                $compile(element.contents())(s);
            }, function (message) {
                console.log('Could not get "', api, '":', message);
            });
        }
    };
}]);

app.directive('oryMessage', function ($q, $http, $compile) {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
            var message = element.html();

            $http.post('mock/message/.json', {'message': message}).then(function (result) {

                element.html(result.data[message]);
                $compile(element.contents())(scope);
            });
        }
    };
});

app.directive('oryMessage', function ($q, $http, $compile) {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
            var message = element.html();

            $http.post('mock/message/.json', {'message': message}).then(function (result) {
                element.html(result.data[message]);
                $compile(element.contents())(scope);
            });
        }
    };
});

app.directive('oryRender', ["$rootScope", "$compile", "$http", "$location", "$route", function ($rootScope, $compile, $http, $location, $route) {
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

            if (scope.scope !== undefined) {
                $rootScope.$on("$locationChangeSuccess", function (event, next, current) {
                    $route.reload();
                });
            }
        }
    }
}]);
