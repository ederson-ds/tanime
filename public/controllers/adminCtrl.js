myApp.controller('adminCtrl', function ($scope, $http, $location) {
    console.log("admin controller");

    $http.get("admin/preseries").then(function (response) {
        $scope.series = response.data;
        $http.get("admin/prechars").then(function (response) {
            $scope.prechars = response.data;
            $scope.loading = true;
        });
    });
});