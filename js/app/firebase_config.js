var config = {
	apiKey : "AIzaSyBbyH1vJltO_HWCvLs6g9br-EwhWHAtU-4",
	authDomain : "web-project-abeeb.firebaseapp.com",
	databaseURL : "https://web-project-abeeb.firebaseio.com",
	storageBucket : "",
	messagingSenderId : "72426663949"
};
firebase.initializeApp(config);

var database = firebase.database();


function logout() {
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		nav("index.html");
	}, function(error) {
		// An error happened.
		E("logout error");
	});
}