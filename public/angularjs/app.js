'use strict';

$(document).ready(function() {
    $("#message").hide();
})
var app = angular.module('albumsApp', ['ngAnimate', 'ngRoute']).config(function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: '/home.html'
    }).when('/albums', {
        templateUrl: 'angularjs/albums.html'
    }).when('/titles', {
        templateUrl: 'angularjs/titles.html'
    }).when('/artists', {
        templateUrl: 'angularjs/artists.html'
    }).otherwise({
        redirectTo: '/home'
    });
});

app.directive('lazyLoad', function() {
    return {
        restrict: 'A',
        link: function(scope, elem) {
            var scroller = elem[0]
            $(scroller).bind('scroll', function() {
                if (scroller.scrollTop + scroller.offsetHeight >= scroller.scrollHeight) {
                    scope.$apply('loadMoreRecords()')
                }
            })
        }
    }
});
