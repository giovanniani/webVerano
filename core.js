var angularFunc = angular.module('angularFunc', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/home')
		.success(function(data) {
			$scope.home = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
}