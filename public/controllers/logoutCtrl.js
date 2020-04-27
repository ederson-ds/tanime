myApp.controller("logoutCtrl", function ($scope, $http, $location) {
  console.log("logout controller");

  $http.get("/api/logout").then(function (response) {
    $scope.$parent.loggedIn = false;
    $scope.$parent.sessUsername = null;
    $scope.$parent.priority = null;
    $location.path("/");
  });
});
