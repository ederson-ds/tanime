myApp.controller('charCtrl', function ($scope, $http, $location) {

    $scope.index = function () {

        $http.get('/series')
            .then(function (response) {
                $scope.series = response.data;
            });

        $http.get('/char')
            .then(function (response) {
                $scope.characters = response.data;
            });
    }

    $scope.index();

    $scope.save = function () {
        console.log("save");
        $http.post('/char/create', $scope.char).then(function (response) {
            //$location.path("/");
        });
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