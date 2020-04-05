var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', function ($scope, $http) {
    console.log("Hello World from controller");

    $scope.loadContacts = function() {
        $http.get('/contactlist').then(function(response) {
            console.log("I got the data I requested");
            $scope.contactList = response.data;
        });
        delete $scope.contact;
    }

    $scope.loadContacts();

    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).then(function(response) {
            console.log(response);
            $scope.loadContacts();
        });
    }


});