var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/", {
            templateUrl: "views/home.html",
            controller: "charCtrl"
        })
        .when("/char/create", {
            templateUrl: "views/char/create.html",
            controller: "charCtrl"
        })
        .when("/series/create", {
            templateUrl: "views/series/create.html",
            controller: "seriesCtrl"
        })
        .when("/series/create/:seriesname", {
            templateUrl: "views/series/create.html",
            controller: "seriesCtrl"
        })
        .when("/login", {
            templateUrl: "views/login/login.html",
            controller: "loginCtrl"
        })
        .when("/blue", {
            templateUrl: "blue.htm"
        }).otherwise({
            template: "<h1>None</h1><p>Nothing has been selected</p>"
        });
});

myApp.directive('myDirective', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngModel, function (v) {
                if (v) {
                    element.val(v.replace(/ /g, '_'));
                }
            });
        }
    };
});

myApp.filter('spaceless',function() {
    return function(input) {
        if (input) {
            return input.replace(/_/g, ' ');    
        }
    }
});