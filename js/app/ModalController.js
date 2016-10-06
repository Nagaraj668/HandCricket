baseInstance.controller('ModalController', function($scope, $rootScope,
		$interval) {

	$scope.title = 'Message';
	$scope.message = 'Success';
	$scope.error = false;
	$scope.data = {};

	$scope.$on('ModalShow', function(event, data) {
		if (data != undefined) {
			$scope.title = data.title;
			$scope.message = data.message;
			$scope.error = data.error;
			$scope.data = data;

			var delayedFocus = $interval(function() {
				$interval.cancel(delayedFocus);
				$(".ok").trigger("focus");
			}, 1000);
		}
	});

	$scope.$on('ListModalShow', function(event, data) {
		if (angular.isDefined(data)) {
			$scope.title = data.title;
			$scope.error = data.error;
			$scope.data = data;
			$scope.List = data.list;
		}
	});

	$scope.$on('GameNameModalShow', function(event, data) {
		if (angular.isDefined(data)) {
			$scope.title = data.title;
			$scope.error = data.error;
			$scope.data = data;
		}
	});

	$scope.$on("RegSetupModalShow", function(event, data) {
		if (angular.isDefined(data)) {

		}
	});

	$scope.game = {
		title : '',
		id : 2
	};

	$scope.onGroupNameEntered = function() {
		var gameBkp = $scope.game;
		$rootScope.$broadcast($scope.data.broadcast, gameBkp);
		$scope.game = {};
	};

	$scope.itemSelected = function(itemData) {
		$(".close").trigger("click");
		$rootScope.$broadcast($scope.data.broadcast, itemData);
	};

	$scope.onConfirmed = function() {
		$rootScope.$broadcast($scope.data.broadcast);
	};

	$scope.onDisplayNameEntered = function() {
		database.ref('users/' + localStorage.user.uid).set({
			displayName : $scope.displayName
		}).then(function() {
			nav("#/landing");
		});
	};
	
	$("input").blur();
});
