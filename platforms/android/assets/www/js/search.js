angular.module('Xmas')

.controller("SearchController", function ($scope, searchService) {
	$scope.data = [];
	$scope.search = function (productName) {
		if (productName != null) {
			searchService.find(productName).then(function successCallback(response) {
				$scope.data = response.data.products;
			}, function errorCallback(response) {
				console.log(response);
			});
		}
	};
})

.factory("searchService", function ($http) {
	return {
		find: function (productName) {
			return $http({
				method: 'GET',
				url: 'http://api.bestbuy.com/v1/products((search=' + productName + '))?show=name,sku,salePrice,image&format=json&apiKey=fxg5b2hu74d23dv3rkmtfsy3'
			});
		}
	}
});