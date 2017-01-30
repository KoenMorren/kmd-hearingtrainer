(function() {
	'use strict';

	angular
		.module('kmd-hearingtrainer', ['ngRoute'])
		.config(configuration)
		.constant('VF', window.Vex.Flow);

	configuration.$inject = ['$routeProvider', '$locationProvider'];
	function configuration($routeProvider, $locationProvider) {
		$locationProvider.hashPrefix('');

		$routeProvider
			.when('/', {
				templateUrl: '../partials/settings.html',
				controller: 'SettingsController',
				controllerAs: 'vm'
			})
			.when('/exercise', {
				templateUrl: '../partials/exercise.html',
				controller: 'ExerciseController',
				controllerAs: 'vm'
			})
			.otherwise('/');

		//$locationProvider.html5Mode(true);
	}
})();