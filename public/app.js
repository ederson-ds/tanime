var myApp = angular.module("myApp", ["ngRoute", "angular.filter"]);

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
    .when("/char/create/:charname", {
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
    .when("/admin", {
      templateUrl: "views/admin/admin.html",
      controller: "adminCtrl",
    })
    .when("/logout", {
      templateUrl: "views/logout/logout.html",
      controller: "logoutCtrl",
    })
    .when("/series/approve/:_id", {
      templateUrl: "views/approve/approve.html",
      controller: "approveCtrl",
    })
    .otherwise({
      template: "<h1>None</h1><p>Nothing has been selected</p>",
    });
});


myApp.component("navbar", {
  bindings: { in: '=' },
  templateUrl: "components/navbar.html",
  controller: function() {
    var darkmode = localStorage.getItem("darkmode");
    var darkmodeToggle = document.querySelector("#darkMode");

    if (darkmode === "enabled"){
      document.body.classList.toggle("darkmode");
      $("#darkMode").attr("src","../img/on.png");
        localStorage.setItem("darkmode","enabled");
    }

    $( "#darkMode" ).click(function() {
      document.body.classList.toggle("darkmode");
      console.log(darkmode);
      if(darkmode === "disabled") {
        $("#darkMode").attr("src","../img/on.png");
        localStorage.setItem("darkmode","enabled");
      } else if (darkmode === "enabled") {
        $("#darkMode").attr("src","../img/off.png");
        localStorage.setItem("darkmode","disabled");
      }
      darkmode = localStorage.getItem("darkmode");
    });

    $( "#darkMode" ).hover(function() {
      $("#darkMode").css("-webkit-filter","brightness(150%)");
      $("#darkMode").css("cursor","pointer");
    });
    $( "#darkMode" ).mouseout(function() {
      $("#darkMode").css("-webkit-filter","brightness(100%)");
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
