myApp.controller("approveCtrl", function (
  $scope,
  $http,
  $location,
  $routeParams
) {
  console.log("approveCtrl controller");

  $http.get("/series/approve/" + $routeParams._id).then(function (response) {
    $location.path("/");
  });
});
