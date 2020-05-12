myApp.controller("approveCtrl", function (
  $scope,
  $http,
  $location,
  $routeParams
) {
  console.log("approveCtrl controller");

  if ($routeParams.series_id) {
    $http.get("/series/approve/" + $routeParams.series_id).then(function (response) {
      $location.path("/");
    });
  } else if ($routeParams.char_id) {
    $http.get("/char/approve/" + $routeParams.char_id).then(function (response) {
      $location.path("/");
    });
  }
});
