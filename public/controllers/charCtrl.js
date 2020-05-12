myApp.controller("charCtrl", function ($scope, $http, $location, $routeParams) {
  $scope.index = function () {
    console.log("teste");
    $http.get("/series").then(function (response) {
      $scope.series = response.data;

      $scope.series.forEach((series, i) => {
        $scope.series[i].chars = [];
        var length = $scope.series.length;
        $http.get("/api/char/" + series._id).then(function (response) {
          var chars = response.data;
          $scope.series[i].chars.push(chars);
          if(i == 0) {
            $scope.loading = true;
          }
        });
      });
    });
  };

  if ($location.path() == "/") {
    $scope.index();
  } else if ($location.path() == "/char/create") {
    $scope.peopleInGroups = {
      PreSeries: [],
      Series: [],
    };

    $http.get("/preseries").then(function (response) {
      response.data.forEach((element) => {
        $scope.peopleInGroups.PreSeries.push({
          id: element._id,
          name: element.name,
        });
      });

      $http.get("/series").then(function (response) {
        response.data.forEach((element) => {
          $scope.peopleInGroups.Series.push({
            id: element._id,
            name: element.name,
          });
        });

        $scope.char.series_id = $scope.peopleInGroups.Series[0].id;
        $scope.char.origin_series_id = $scope.peopleInGroups.Series[0].id;
        $scope.loading = true;
      });
    });
  } else {
    // Update
    $scope.peopleInGroups = {
      PreSeries: [],
      Series: [],
    };

    $http.get("/preseries").then(function (response) {
      response.data.forEach((element) => {
        $scope.peopleInGroups.PreSeries.push({
          id: element._id,
          name: element.name,
        });
      });

      $http.get("/series").then(function (response) {
        response.data.forEach((element) => {
          $scope.peopleInGroups.Series.push({
            id: element._id,
            name: element.name,
          });
        });

        $http
          .get("/api/prechar/create/" + $routeParams.charname)
          .then(function (response) {
            var char = response.data;
            $scope.char = char;
            console.log($scope.char);

            $scope.updateImgBase64($scope.char.image);
            $scope.loading = true;
          });
      });
    });
  }

  $scope.save = function (char) {
    if ($scope.charCreateForm.$valid) {
      if ($routeParams.charname) {
        // Update
        $http
          .put("api/prechar/create/" + $routeParams.charname, char)
          .then(function (response) {
            $location.path("/user");
          });
      } else {
        //Create
        $http.post("/prechar/create", char).then(function (response) {
          $location.path("/user");
        });
      }
    } else {
      console.log("invalido");
    }
  };

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
    $scope.char.image = imageSrc;
    var newImage = document.createElement("img");
    newImage.style = "width: 100px;";
    newImage.src = imageSrc;
    document.getElementById("myImg").innerHTML = newImage.outerHTML;
  };

  $scope.rarities = [
    {
      name: "Very Rare",
      id: 0,
    },
    {
      name: "Epic",
      id: 1,
    },
    {
      name: "Legendary",
      id: 2,
    },
    {
      name: "Common",
      id: 3,
    },
    {
      name: "Rare",
      id: 4,
    },
    {
      name: "Empyrean",
      id: 5,
    },
    {
      name: "True Divinity",
      id: 6,
    },
    {
      name: "Void Tier",
      id: 7,
    },
    {
      name: "God",
      id: 8,
    },
  ];

  $scope.getRarity = function (rarity) {
    if (rarity == 0) {
      return "very-rare";
    } else if (rarity == 1) {
      return "epic";
    } else if (rarity == 2) {
      return "legendary";
    } else if (rarity == 3) {
      return "common";
    } else if (rarity == 4) {
      return "rare";
    } else if (rarity == 5) {
      return "empyrean";
    } else if (rarity == 6) {
      return "true-divinity";
    } else if (rarity == 7) {
      return "void-tier";
    } else if (rarity == 8) {
      return "god";
    }
    return "";
  };

  $scope.stringRefactory = function (name) {
    return name.replace(/ /g, "_");
  };
});
