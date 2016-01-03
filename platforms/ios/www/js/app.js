angular.module('Xmas', ['ionic', "ngCordova", "toastr"])

.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
})

.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'templates/menu.html',
			controller: 'LoginController'
		})

	.state('app.search', {
		url: '/search',
		views: {
			'menuContent': {
				templateUrl: 'templates/search.html'
			}
		},
		controller: "SearchController"
	})

	.state('app.findStore', {
		url: '/find-store',
		views: {
			'menuContent': {
				templateUrl: 'templates/find-store.html'
			}
		},
		controller: "StoreController"
	})

	.state('app.logs', {
		url: '/logs',
		views: {
			'menuContent': {
				templateUrl: 'templates/logs.html'
			}
		},
		controller: "LogController"
	});

	$urlRouterProvider.otherwise('/app/search');
});