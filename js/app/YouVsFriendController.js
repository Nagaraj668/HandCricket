baseInstance.controller('YouVsFriendController', function($scope, $location,
		Modal) {

	$('.title').animateCss("bounce", function() {

	});
	
	$scope.users = [];
	

	database.ref('users/').on('child_added', function(data) {
		var user = data.val();
		user.key = data.key;
		
		$scope.users.push(user);
		
		L($scope.users.length);
	});

	$scope.ok = function() {
		A($scope.value);
	};
	
	
	
});