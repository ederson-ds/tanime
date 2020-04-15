myApp.controller('loginCtrl', function ($scope, $http, $location) {
    console.log("login controller");
    $scope.save = function (login) {
        if ($scope.myForm.$valid) {
            $http.post('/login/exists', login).then(function (response) {
                if (response.data.username) {
                    $scope.$parent.loggedIn = true;
                    $scope.$parent.sessUsername = response.data.username;
                    $location.path("/user");
                } else {
                    $scope.usersExists = true;
                }
            });

        }
    }
});