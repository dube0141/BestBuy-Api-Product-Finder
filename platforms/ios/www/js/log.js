angular.module('Xmas')

.controller("LogController", function ($scope, logService) {
	$scope.logs = [];
	$scope.logs = logService.getAll();
	$scope.updateLogs = function () {
		$scope.logs = logService.getAll();
	}
})

.factory("logService", function ($http) {
	return {
		invalidUsername: function (username) {
			var errorMessage = "LOGIN ERROR: '" + username + "' is not a valid username!";

			if (localStorage.getItem("logs") === null) {
				var logs = [errorMessage];
				localStorage.setItem("logs", JSON.stringify(logs));
			} else {
				var logList = JSON.parse(localStorage.getItem("logs"));
				logList.push(errorMessage);
				localStorage.setItem("logs", JSON.stringify(logList));
			}
		},
		invalidPassword: function (username) {
			var errorMessage = "INVALID PASSWORD ERROR: Password for user " + username + " was invalid.";

			if (localStorage.getItem("logs") === null) {
				var logs = [errorMessage];
				localStorage.setItem("logs", JSON.stringify(logs));
			} else {
				var logList = JSON.parse(localStorage.getItem("logs"));
				logList.push(errorMessage);
				localStorage.setItem("logs", JSON.stringify(logList));
			}
		},
		getAll: function () {
			return JSON.parse(localStorage.getItem("logs"));
		}
	}
});