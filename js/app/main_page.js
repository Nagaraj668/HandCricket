var displayName;
var photoUrl;
var uid;
var email;
var database = firebase.database();

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
				uid = user.uid;
				email = profile.email;
				$("#displayName").text(displayName);
				$("#photoURL").attr("src", photoUrl);

				console.log("  Provider-specific UID: " + profile.uid);
				console.log("  AUTH UID: " + user.uid);
				console.log("  Name: " + profile.displayName);
				console.log("  Email: " + profile.email);
				console.log("  Photo URL: " + profile.photoURL);

			} else {
				displayName = user.displayName;
				photoUrl = user.photoURL;
				uid = user.uid;
				email = user.email;
				$("#displayName").text(displayName);
				$("#photoURL").attr("src", photoUrl);

				console.log("  Provider-specific UID: " + user.uid);
				console.log("  Name: " + user.displayName);
				console.log("  Email: " + user.email);
				console.log("  Photo URL: " + user.photoURL);
			}
			checkOneTimeSetup();
			setupListeners();
		});
	} else {
		// user authentication failed listener
		back();
	}
});

function checkOneTimeSetup() {
	return database.ref('users/' + uid).once('value').then(function(snapshot) {
		L(displayName);
		L(email);
		if (snapshot.val() == null) {
			L(snapshot.val());
			database.ref('users/' + uid).set({
				name : displayName,
				email_id : email
			})
		} else {
			L("User already added");
		}
	});
}

$.get('my_notes.html', function(data, status) {
	$('#page-area').html(data);
});

$.get('nav-header.html', function(data, status) {
	$('#nav-header').html(data);
});

function showAddNote() {
	$("#addNoteModal").modal();
	$("#update_note_btn").hide();
	$("#add_note_btn").show();
	$('#createNoteModalLabel').text('Add Note');
}

function addNote() {
	var noteTitle = $("#title").val(), noteContent = $("#content").val();
	if (noteTitle == null || noteContent == null || noteTitle == ""
			|| noteContent == "") {
		alert("Enter all values");
		return;
	}
	if (uid == undefined) {
		A("Unexpected error");
		return;
	}
	var promise = database.ref('users/' + uid + '/notes').push({
		note_title : noteTitle,
		note_content : noteContent,
		modified_on : Date.now()
	});

	$("#addNoteModal").modal('hide');
}

function refresh() {
	nav("main_page.html");
}

function deleteAll() {
	if (confirm('You want to delete all notes?'))
		database.ref('users/' + uid + '/notes').set(null);
}

function deleteNote(noteId) {
	if (confirm('You want to delete?'))
		database.ref('users/' + uid + '/notes/' + noteId).set(null);
}

var idToUpdate;
function showUpdateNote(noteId, title, content) {
	$("#addNoteModal").modal('show');
	$('#createNoteModalLabel').text('Update Note');
	$("#title").val(title);
	$("#content").val(content);
	idToUpdate = noteId;
	$("#update_note_btn").show();
	$("#add_note_btn").hide();
}

function updateNote() {
	var noteTitle = $("#title").val(), noteContent = $("#content").val();
	if (noteTitle == null || noteContent == null || noteTitle == ""
			|| noteContent == "") {
		alert("Enter all values");
		return;
	}
	if (uid == undefined) {
		A("Unexpected error");
		return;
	}

	database.ref('users/' + uid + '/notes/' + idToUpdate).set({
		note_title : noteTitle,
		note_content : noteContent,
		modified_on : Date.now()
	});

	$("#addNoteModal").modal('hide');
}

function setupListeners() {
	if (uid == undefined) {
		A("Unexpected error");
		return;
	}

	var noteCardHtml = "";

	database
			.ref('users/' + uid + '/notes/')
			.on(
					'child_added',
					function(data) {
						noteCardHtml = "<div class='col-sm-3' style='padding:3px' id='"
								+ data.key
								+ "'><div class='card'><span class='note_title'>"
								+ limitTo(data.val().note_title, 10)
								+ "</span><button style='margin-left: 5px' class='btn btn-danger btn-xs' onclick='deleteNote(\""
								+ data.key
								+ "\")'><span class='glyphicon glyphicon-remove'>"
								+ "</span></button><button style='margin-left: 5px' class='btn btn-primary btn-xs' onclick='showUpdateNote(\""
								+ data.key
								+ "\",\""
								+ data.val().note_title
								+ "\",\""
								+ data.val().note_content
								+ "\")'><span class='glyphicon glyphicon-edit'>"
								+ "</span></button><br><span class='modified_on'>"
								+ convertDateFormat(data.val().modified_on)
								+ "</span><p class='note_content'>"
								+ limitTo(data.val().note_content, 50)
								+ "</p></div></div>"
						$('#notes-wrapper').append(noteCardHtml);
					});

	database.ref('users/' + uid + '/notes/').on(
			'child_changed',
			function(data) {
				$("#" + data.key + " .card .note_title").text(
						limitTo(data.val().note_title, 10));
				$("#" + data.key + " .card .note_content").text(
						limitTo(data.val().note_content, 50));
			});

	database.ref('users/' + uid + '/notes/').on('child_removed',
			function(data) {
				$("#" + data.key).remove();
			});
}

$("#main-header .nav li").click(function() {
	$("#main-header .nav li").removeClass('active');
	$(this).addClass('active');
});