angular.module('Xmas')

.controller("LoginController", function ($rootScope, $scope, $ionicModal, $timeout, $cordovaOauth, logService, toastr, loginService, validateService) {
	$scope.loginData = {};
	$rootScope.activeUser;

	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function (modal) {
		modal.backdropClickToClose = false;
		modal.hardwareBackButtonClose = false;
		$scope.modal = modal;

		if (validateService.userIsNotLoggedIn()) $scope.login();
	});

	$scope.logout = function () {
		toastr.info(localStorage.getItem("user") + " is now logged out!");

		localStorage.setItem("user", undefined);
		$rootScope.activeUser = undefined;

		$scope.login();
	}

	$scope.closeLogin = function () {
		$scope.modal.hide();
	};

	$scope.login = function () {
		$scope.modal.show();
	};

	$scope.doFacebookLogin = function () {
		$cordovaOauth.facebook("1146873065323972", ["public_profile"]).then(function (result) {
			loginService.getName(result.access_token).then(function successCallback(response) {
				localStorage.setItem("user", response.data.name);
				$rootScope.activeUser = response.data.name;
				toastr.success('Welcome ' + $rootScope.activeUser + "!");
				$scope.closeLogin();
			});
		}, function (error) {
			console.log(error);
		});
	}

	$scope.doLogin = function () {
		if (validateService.usernameIsValid($scope.loginData.username)) {
			if (validateService.passwordIsValid($scope.loginData.password)) {
				if ($scope.loginData.password.length > 4) {
					localStorage.setItem("user", $scope.loginData.username);
					$scope.activeUser = $scope.loginData.username;
					toastr.success('Welcome ' + $scope.loginData.username + "!");
					$scope.closeLogin();
				} else {
					logService.invalidPassword($scope.loginData.username);
					toastr.error("Password must be at least 5 characters in length");
				}
			} else {
				logService.invalidPassword($scope.loginData.username);
				toastr.error("Please enter a password!");
			}

			$scope.loginData.username = "";
			$scope.loginData.password = "";

			return;
		} else {
			logService.invalidUsername($scope.loginData.username);
			toastr.error($scope.loginData.username + " is not a valid username!");
			$scope.loginData.username = "";
			$scope.loginData.password = "";

			return;
		}
		$timeout(function () {
			$scope.closeLogin();
		}, 1000);
	};
})

.factory("loginService", function ($http) {
	return {
		getName: function (access_token) {
			return $http({
				method: 'GET',
				url: 'https://graph.facebook.com/v2.5/me',
				params: {
					access_token: access_token,
					fields: "name"
				}
			})
		}
	}
})

.factory("validateService", function ($http, $rootScope) {
	return {
		userIsNotLoggedIn: function () {
			$rootScope.activeUser = localStorage.getItem("user");
			if ($rootScope.activeUser == "undefined" ||
				$rootScope.activeUser == "" ||
				$rootScope.activeUser == null) return true;
			else return false;
		},
		usernameIsValid: function (username) {
			if (username != "guest" &&
				username != "Guest") return true;
			else return false;
		},
		passwordIsValid: function (password) {
			if (typeof password != "undefined") return true;
			else return false;
		}
	}
});