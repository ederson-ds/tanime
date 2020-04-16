myApp.controller('charCtrl', function ($scope, $http, $location) {

    $scope.options = [];

    var data = [
        {
            id: 0, text: 'enhancement',
            children: [{
                id: 5,
                text: 'enhancement child1'
            },
            {
                id: 6,
                text: 'enhancement child2'

            }]
        },
        { id: 1, text: 'bug' },
        { id: 2, text: 'duplicate' },
        { id: 3, text: 'invalid' },
        { id: 4, text: 'wontfix' }
    ];
    $("#series_id").select2({
        data: data
    });

    $http.get('/preseries')
        .then(function (response) {
            $scope.options = [{
                id: 0, text: 'PreSeries'
            }];
            response.data.forEach(element => {
                /* $scope.options[0].children = [];
                 $scope.options[0].children.push({ id: element._id, text: element.name });
 
                 console.log($scope.options);
                 console.log(JSON.stringify($scope.options));*/

                //$scope.options.push({ name: element.id, value: element.name, type: "PreSeries" })
            });

            $http.get('/series')
                .then(function (response) {
                    /*
                                                $scope.options = [{
                                                    id: 0, text: 'PreSeries'
                                                }];
                    
                                                $scope.options[0].children = [{
                                                    id: 5,
                                                    text: 'enhancement child1'
                                                },
                                                {
                                                    id: 6,
                                                    text: 'enhancement child2'
                                                }]*/

                    response.data.forEach(element => {
                        //$scope.options.push({ name: element.id, value: element.name, type: "Series" })




                    });

                    /*var data = [
                        {
                            id: 0, text: 'enhancement',
                            children: [{
                                id: 5,
                                text: 'enhancement child1'
                            },
                            {
                                id: 6,
                                text: 'enhancement child2'

                            }]
                        },
                        { id: 1, text: 'bug' },
                        { id: 2, text: 'duplicate' },
                        { id: 3, text: 'invalid' },
                        { id: 4, text: 'wontfix' }
                    ];
                    $("#series_id").select2({
                        data: data
                    });*/
                });
        });


    $scope.index = function () {
        $http.get('/series')
            .then(function (response) {
                $scope.series = response.data;
            });
        /*
    $http.get('/char')
        .then(function (response) {
            $scope.characters = response.data;
        });*/
    }

    if ($location.path() == "/") {
        $scope.index();
    } else if ($location.path() == "/char/create") {

    }

    $scope.save = function (char) {
        if ($scope.charCreateForm.$valid) {
            $http.post('/char/create', char).then(function (response) {
                $location.path("/");
            });
        } else {
            console.log("invalido");
        }
    }

    $scope.encodeImageFileAsURL = function () {
        var filesSelected = document.getElementById("inputFileToLoad").files;
        if (filesSelected.length > 0) {
            var fileToLoad = filesSelected[0];
            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                var srcData = fileLoadedEvent.target.result; // <--- data: base64

                $scope.updateImgBase64(srcData);
            }
            fileReader.readAsDataURL(fileToLoad);
        }
    }

    $scope.updateImgBase64 = function (imageSrc) {
        $scope.series.image = imageSrc;
        var newImage = document.createElement('img');
        newImage.style = "width: 100px;";
        newImage.src = imageSrc;
        document.getElementById("myImg").innerHTML = newImage.outerHTML;
    }

    $scope.rarities = [
        {
            name: 'Very Rare',
            id: '0'
        },
        {
            name: 'Epic',
            id: '1'
        },
        {
            name: 'Legendary',
            id: '2'
        },
        {
            name: 'Common',
            id: '3'
        },
        {
            name: 'Rare',
            id: '4'
        },
        {
            name: 'Empyrean',
            id: '5'
        },
        {
            name: 'True Divinity',
            id: '6'
        },
        {
            name: 'Void Tier',
            id: '7'
        },
        {
            name: 'God',
            id: '8'
        }
    ];

    $scope.getRarity = function (rarity) {
        if (rarity == 0) {
            return 'very-rare';
        } else if (rarity == 1) {
            return 'epic';
        } else if (rarity == 2) {
            return 'legendary';
        } else if (rarity == 3) {
            return 'common';
        } else if (rarity == 4) {
            return 'rare';
        } else if (rarity == 5) {
            return 'empyrean';
        } else if (rarity == 6) {
            return 'true-divinity';
        } else if (rarity == 7) {
            return 'void-tier';
        } else if (rarity == 8) {
            return 'god';
        }
        return '';
    }

    $scope.stringRefactory = function (name) {
        return name.replace(/ /g, '_');
    }
});