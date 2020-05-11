myApp.controller("seriesCtrl", function (
  $scope,
  $http,
  $location,
  $routeParams
) {
  $scope.series = {};

  if ($routeParams.seriesname) {
    $scope.editing = true;
    // Update
    $http
      .get("api/preseries/create/" + $routeParams.seriesname)
      .then(function (response) {
        var series = response.data;
        $scope.series = series;

        $scope.updateImgBase64($scope.series.image);
      });
  } else if($routeParams.seriesnamedelete) {
    // Delete
    $http
      .delete("api/series/delete/" + $routeParams.seriesnamedelete)
      .then(function (response) {
        $location.path("/");
      });
  }

  $scope.encodeImageFileAsURL = function () {
    var filesSelected = document.getElementById("inputFileToLoad").files;
    if (filesSelected.length > 0) {
      var fileToLoad = filesSelected[0];
      var fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64

        $("#scream").attr("src", srcData);
        setTimeout(function () {
          var c = document.getElementById("myCanvas");
          var ctx = c.getContext("2d");
          ctx.clearRect(0, 0, c.width, c.height);
          var img = document.getElementById("scream");
          ctx.drawImage(img, 0, 0, 320, 200);
          var pngUrl = c.toDataURL();
          $scope.updateImgBase64(pngUrl);
        }, 500);

      };
      fileReader.readAsDataURL(fileToLoad);
    }
  };

  $scope.updateImgBase64 = function (imageSrc) {
    $scope.series.image = imageSrc;
    var newImage = document.createElement("img");
    newImage.style = "width: 100px;";
    newImage.src = imageSrc;
    document.getElementById("myImg").innerHTML = newImage.outerHTML;
  };

  $scope.save = function (series) {
    if ($routeParams.seriesname) {
      // Update
      $http
        .post("api/preseries/create/" + $routeParams.seriesname, series)
        .then(function (response) {
          $location.path("/user");
        });
      /*
      $http
        .put("api/preseries/create/" + $routeParams.seriesname, series)
        .then(function (response) {
          $location.path("/user");
        });*/
    } else {
      //Create
      $http.post("/series/create", series).then(function (response) {
        console.log("salvou com sucesso");
        $location.path("/user");
      });
    }
  };
});