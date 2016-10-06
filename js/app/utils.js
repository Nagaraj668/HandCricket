// constants
var PASSWORD = "password";

// error codes
var AUTH_OPR_NOT_ALLOWED = "auth/operation-not-allowed";
var AUTH_USER_NOT_FOUND = "auth/user-not-found";
var AUTH_INCORRECT_CREDS = "auth/wrong-password";

function nav(path) {
	window.location.href = path;
}

function back() {
	window.history.back();
}

function L(msg) {
	console.log(msg);
}

function E(msg) {
	console.error(msg);
}

function A(msg) {
	alert(msg);
}

function convertDateFormat(timestamp) {
	var d = new Date(timestamp);
	var dateFormat = d.getDate() + '/' + (d.getMonth() + 1) + '/'
			+ d.getFullYear();
	return dateFormat;
}

function limitTo(str, limitTo) {
	if (str.length <= limitTo) {
		return str;
	}
	return str.substring(0, limitTo) + "...";
}

$.fn
		.extend({
			animateCss : function(animationName, callBack) {
				var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
				$(this).addClass('animated ' + animationName).one(animationEnd,
						function() {
							$(this).removeClass('animated ' + animationName);
							callBack();
						});
			}
		});

function J(object) {
	return angular.toJson(object);
}

function loadingOn() {
	$('.loadingWrapper').removeClass('hidden');
}

function loadingOff() {
	$('.loadingWrapper').addClass('hidden');
}

var animationEffects = [ "bounce", "flash", "pulse", "rubberBand", "shake",
		"headShake", "swing", "tada", "wobble", "jello", "bounceIn",
		"bounceInDown", "bounceInLeft", "bounceInRight", "bounceInUp",
		"fadeIn", "fadeInDown", "fadeInDownBig", "fadeInLeft", "fadeInLeftBig",
		"fadeInRight", "fadeInRightBig", "fadeInUp", "fadeInUpBig", "flipInX",
		"flipInY", "lightSpeedIn", "rotateIn", "rotateInDownLeft",
		"rotateInDownRight", "rotateInUpLeft", "rotateInUpRight", "hinge",
		"rollIn", "zoomIn", "zoomInDown", "zoomInLeft", "zoomInRight",
		"zoomInUp", "slideInDown", "slideInLeft", "slideInRight", "slideInUp" ];

function getAnimationEffect() {
	return animationEffects[generateRandomNo(animationEffects.length)];
}

function generateRandomNo(range) {
	return Math.floor(Math.random() * range)
}