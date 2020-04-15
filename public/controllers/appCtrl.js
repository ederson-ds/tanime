myApp.controller('appCtrl', function ($scope, $http, $location) {
    console.log("app controller");
    $http.get("/sessionValidate").then(function (response) {
        if(response.data.username) {
            $scope.loggedIn = true;
            $scope.sessUsername = response.data.username;
        }
    });
});