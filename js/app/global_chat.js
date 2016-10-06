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

$.get('nav-header.html', function(data, status) {
	$('#nav-header').html(data);
});