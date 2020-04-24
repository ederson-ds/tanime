myApp.controller('signupCtrl', function ($scope, $http, $location) {
    console.log("signupCtrl controller");

    $scope.save = function (login) {
        if ($scope.myForm.$valid) {
            $http.post('/login/usernameexists', login).then(function (response) {
                if (response.data) {
                    console.log("usuário já existe");
                    $scope.usersExists = true;
                } else {
                    $http.post('/signup', login).then(function (response) {
                        $scope.$parent.loggedIn = true;
                        $scope.$parent.sessUsername = response.data.username;
                        $location.path("/user");
                    });
                }
            });
        }
    }
});