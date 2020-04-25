var myApp = angular.module("myApp", ["ngRoute"]);

myApp.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/", {
      templateUrl: "views/home.html",
      controller: "charCtrl",
    })
    .when("/char/create", {
      templateUrl: "views/char/create.html",
      controller: "charCtrl",
    })
    .when("/series/create", {
      templateUrl: "views/series/create.html",
      controller: "seriesCtrl",
    })
    .when("/series/create/:seriesname", {
      templateUrl: "views/series/create.html",
      controller: "seriesCtrl",
    })
    .when("/login", {
      templateUrl: "views/login/login.html",
      controller: "loginCtrl",
    })
    .when("/signup", {
      templateUrl: "views/signup/signup.html",
      controller: "signupCtrl",
    })
    .when("/user", {
      templateUrl: "views/user/home.html",
      controller: "userCtrl",
    })
    .otherwise({
      template: "<h1>None</h1><p>Nothing has been selected</p>",
    });
});

myApp.component("navbar", {
  bindings: { in: '=' },
  templateUrl: "components/navbar.html",
  controller: function() {
    let toggle = false;
    $( "#darkMode" ).click(function() {
      if(!toggle) {
        $("#darkMode").attr("src","../img/on.png");
        $("body").css("background","linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(84,168,187,1) 50%, rgba(0,0,0,1) 100%)");
        toggle = true;
      } else {
        $("#darkMode").attr("src","../img/off.png");
        $("body").css("background","linear-gradient(90deg, rgba(154, 154, 154, 1) 0%, rgba(236, 236, 236, 1) 38%, rgba(236, 236, 236, 1) 64%, rgba(154, 154, 154, 1) 100%)");
        toggle = false;
      }
    });
    $( "#darkMode" ).hover(function() {
      $("#darkMode").css("filter","brightness(150%)");
    });
    $( "#darkMode" ).mouseout(function() {
      $("#darkMode").css("filter","brightness(100%)");
    });
  }
});

myApp.directive("myDirective", function () {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      scope.$watch(attrs.ngModel, function (v) {
        if (v) {
          element.val(v.replace(/ /g, "_"));
        }
      });
    },
  };
});

myApp.filter("spaceless", function () {
  return function (input) {
    if (input) {
      return input.replace(/_/g, " ");
    }
  };
});

myApp.directive("matchPassword", function () {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=matchPassword",
    },
    link: function (scope, element, attributes, ngModel) {
      ngModel.$validators.matchPassword = function (modelValue) {
        return modelValue == scope.otherModelValue;
      };

      scope.$watch("otherModelValue", function () {
        ngModel.$validate();
      });
    },
  };
});

myApp.directive("validFile", function () {
  return {
    require: "ngModel",
    link: function (scope, el, attrs, ngModel) {
      ngModel.$render = function () {
        ngModel.$setViewValue(el.val());
      };

      el.bind("change", function () {
        scope.$apply(function () {
          ngModel.$render();
        });
      });
    },
  };
});
