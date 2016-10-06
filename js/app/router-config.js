baseInstance.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'html/login.html',
		controller : 'LoginController'
	}).when('/landing', {
		templateUrl : 'html/landing.html',
		controller : 'LandingPageController'
	}).when('/current', {
		templateUrl : 'html/current-matches.html',
		controller : 'CurrentMatchesController'
	}).when('/you-vs-friend', {
		templateUrl : 'html/you-vs-friend.html',
		controller : 'YouVsFriendController'
	}).when('/team-vs-team', {
		templateUrl : 'html/team-vs-team.html',
		controller : 'TeamVsTeamController'
	}).when('/players', {
		templateUrl : 'html/players.html',
		controller : 'PlayersController'
	}).otherwise({
		redirectTo : '/'
	});
} ]);