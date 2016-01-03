angular.module('Xmas')

.controller("StoreController", function ($scope, $cordovaGeolocation, storeService) {
	var posOptions = {
		timeout: 10000,
		enableHighAccuracy: false
	};
	$scope.storeList = [];

	$cordovaGeolocation
		.getCurrentPosition(posOptions)
		.then(function (position) {
			var lat = position.coords.latitude
			var long = position.coords.longitude

			storeService.searchMain(lat, long).then(function successCallback(response) {
				$scope.mainStore = response.data.stores[0];
			}, function errorCallback(response) {
				console.log(response);
			});
		}, function (err) {
			console.log(err);
		});

	$scope.searchStore = function (storeName) {
		if (storeName != null) {
			storeService.searchAll(storeName).then(function successCallback(response) {
				$scope.storeList = response.data.stores;
			}, function errorCallback(response) {
				console.log(response);
			});
		}
	}
})

.factory("storeService", function ($http) {
	return {
		searchMain: function (lat, long) {
			return $http({
				method: 'GET',
				url: 'http://api.bestbuy.com/v1/stores(area(' + lat + ',' + long + ', 150))?format=json&apiKey=fxg5b2hu74d23dv3rkmtfsy3'
			});
		},
		searchAll: function (storeName) {
			return $http({
				method: 'GET',
				url: 'http://api.bestbuy.com/v1/stores(city=' + storeName + ')?format=json&apiKey=fxg5b2hu74d23dv3rkmtfsy3'
			});
		}
	}
});