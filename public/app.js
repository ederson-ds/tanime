var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html"
        })
        .when("/red", {
            templateUrl: "views/red.html"
        })
        .when("/green", {
            templateUrl: "green.htm"
        })
        .when("/blue", {
            templateUrl: "blue.htm"
        }).otherwise({
            template: "<h1>None</h1><p>Nothing has been selected</p>"
        });
});