myApp.controller('AppCtrl', function ($scope, $http) {
    console.log("Hello World from controller");

    $scope.loadContacts = function() {
        $http.get('/contactlist').then(function(response) {
            $scope.contactList = response.data;
            console.log($scope.contactList);
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