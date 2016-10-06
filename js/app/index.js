baseInstance = angular.module("HandCricket", [ "ngRoute", "ngStorage" ]);

baseInstance.controller("MainController", [
		"$scope",
		"$http",
		"$interval",
		"$location",
		"$localStorage",
		"$rootScope",
		"$window",
		"Modal",
		function($scope, $http, $interval, $location, $localStorage,
				$rootScope, $window, Modal) {
			
			
			$rootScope.$on('LoginPage', function() {
				$scope.ifLoginPage = true;
			});
			
			$rootScope.$on('LandingPage', function() {
				$scope.ifLoginPage = false;
			});
			
			/**
			 * Firebase main authentication change listener
			 */
			firebase.auth().onAuthStateChanged(function(user) {
				if (user != null) {
					nav("#/landing");
				} else {
					E("auth failed: " + user);
					nav("#/");
				}
			});

		} ]);

baseInstance.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if (event.which === 13) {
				scope.$apply(function() {
					scope.$eval(attrs.ngEnter);
				});

				event.preventDefault();
			}
		});
	};
});