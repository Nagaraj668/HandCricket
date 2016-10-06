
baseInstance.controller('LoginController', function($rootScope, $scope, $location, Modal) {

	$rootScope.$emit('LoginPage');
	
	var provider = new firebase.auth.GoogleAuthProvider();
	
	$scope.signInGoogle = function() {
		firebase.auth().signInWithRedirect(provider).then(function(result) {
			  // This gives you a Google Access Token. You can use it to
				// access the Google API.
			  var token = result.credential.accessToken;
			  // The signed-in user info.
			  var user = result.user;
			  // ...
			}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  // ...
			});
	};
	
	$scope.signInFacebook = function() {
		Modal.show({
			title : 'Alert',
			message  : 'This feature will come soon. Thanks for your patience!!'
		});
	};
	
	$scope.signInEmailPassword = function() {
		var email = $("#email").val();
		var password = $("#password").val();
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  L("inside login()");
			  L(errorMessage);
			  L(errorCode);
			  
			  switch(errorCode) {
			  case AUTH_OPR_NOT_ALLOWED: {
				  alert("You might have logged in using differnt login method(Ex, Google, Facebook..etc)")
				  break;
			  }
			  case AUTH_USER_NOT_FOUND: {
				  alert(errorMessage);
				  break;
			  }
			  case AUTH_INCORRECT_CREDS:{
				  alert("Invalid credentials, Please try again");
				  break;
			  }
			  }
			  
			});
	};
	
	$scope.register = function() {
		var email = $("#email").val();
		var password = $("#password").val();
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  alert(errorMessage);
			}).then(function() {
				localStorage.reg = "200";
			});
	};

});