'use strict';

/* Services */

var app = angular.module('oryServices', ['ngResource']);

app.factory('oryResources', function ($resource) {
    return {
        "versioning/repositories": $resource('/versioning/repositories/:repository'),
        "versioning/repository/revision": $resource('/versioning/repositories/:repository/revisions/:revision.json'),
        "versioning/repository/revisions": $resource('/versioning/repositories/:repository/revisions.json', {}, {
            get: {isArray: true}
        })
    };
});
