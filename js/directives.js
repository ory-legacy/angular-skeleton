'use strict';

/* Directives */
var app = angular.module('baldurDirectives', []);

app.directive('baldurNavigation', function ($q, $http) {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
            var name = attrs.baldurNavigation;
            $http.get('mock/navigations/' + name + '.json').then(function(result) {
                scope.navigation = result.data;
            });
        },
        templateUrl: function (elem, attrs) {
            return attrs.template || 'partials/navigation.html'
        }
    };
});

app.directive('baldurPage', function ($compile, $http) {
    return {
        restrict: 'EA',
        scope: {},
        link: function (scope, element, attrs) {

            // Todo
            var route = '/home';

            $http.post('mock/mapper/url.json', {url: route}).then(function(resolved) {
                $http.get('mock/nodes/' + resolved.data.id + '.json').then(function(node) {
                    $http.get('partials/nodes/' + node.data.type + ".html").then(function(template){
                        scope = angular.extend(scope, node.data);
                        element.html(template.data);
                        $compile(element.contents())(scope);
                    });
                })
            });
        }
    };
});
