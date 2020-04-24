myApp.controller('userCtrl', function ($scope, $http, $location) {
    console.log("user controller");

    $http.get("/preseries").then(function (response) {
        $scope.series = response.data;
        $http.get("/prechars").then(function (response) {
            $scope.prechars = response.data;
            $scope.loading = true;
        });
    });

});