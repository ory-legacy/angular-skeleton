'use strict';

/* Filters */

angular.module('baldurFilters', []).filter('striptags', function () {
    return function (input, allowed) {
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

        allowed = (((allowed || '') + '')
            .toLowerCase()
            .match(/<[a-z][a-z0-9]*>/g) || [])
            .join('');

        return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    }
}).filter('preview', function () {
    return function (input, maxLength, tail) {
        tail = (tail || '...') + '';
        maxLength -= tail.length;
        return input.substr(0, maxLength) + tail;
    }
});