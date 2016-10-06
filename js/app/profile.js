/**
 * Firebase main authentication change listener
 */
firebase.auth().onAuthStateChanged(function(user) {
	if (user != null) {
		var providerId;
		user.providerData.forEach(function(profile) {
			console.log("  Sign-in provider: " + profile.providerId);
			providerId = profile.providerId;
			if (providerId != PASSWORD) {
				displayName = profile.displayName;
				photoUrl = profile.photoURL;
				$("#displayName").text(displayName);
				if (photoUrl != null)
					$("#photoURL").attr("src", photoUrl);
			} else {
				displayName = user.displayName;
				photoUrl = user.photoURL;
				$("#displayNameField").val(displayName);
				$("#displayName").text(displayName);
				if (photoUrl != null)
					$("#photoURL").attr("src", photoUrl);
				$("#photoURLField").val(photoUrl);
			}
		});
	} else {
		nav("index.html");
	}
});

function updateProfile() {
	var user = firebase.auth().currentUser;
	user.updateProfile({
		displayName : $("#displayNameField").val(),
		photoURL : $("#photoURLField").val()
	}).then(function() {
		// Update successful.
		displayName = user.displayName;
		photoUrl = user.photoURL;
		$("#displayNameField").val(displayName);
		$("#displayName").text(displayName);

		if (photoUrl != null)
			$("#photoURL").attr("src", photoUrl);
		$("#photoURLField").val(photoUrl);
		console.log("  Provider-specific UID: " + user.uid);
		console.log("  Name: " + displayName);
		console.log("  Email: " + user.email);
		console.log("  Photo URL: " + photoUrl);
		alert("Updated");
	}, function(error) {
		// An error happened.
	});
}

$.get('nav-header.html', function(data, status) {
	$('#nav-header').html(data);
});
