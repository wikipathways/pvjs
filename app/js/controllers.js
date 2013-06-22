'use strict';

/* Controllers */
angular.module('pathvisio.controllers', [])
.controller('HomeCtrl', ['$scope', function($scope) {
	$scope.test = "blue";
	return $scope;

}])
.controller('PathwayCtrl', ['$scope', '$location', '$http', 'PathwayService', function($scope, $location, $http, PathwayService) {

	PathwayService.getData($scope);

	if (!($scope.drawingParameters)) {
		$scope.drawingParameters = {};
	}
	if (!($scope.drawingParameters.editable)) {
		$scope.drawingParameters.editable = false;
	}
	if (!($scope.drawingParameters.viewSize)) {
		$scope.drawingParameters.viewSize = 'small';
	}
	$scope.drawingParameters.enablePan = 1;
	if (!($scope.drawingParameters.enableZoom)) {
		if ($scope.drawingParameters.viewSize == 'small') {
			$scope.drawingParameters.enableZoom = 0;
		}
		else {
			$scope.drawingParameters.enableZoom = 1;
		}
	};
	$scope.drawingParameters.enableDrag = 0;
	$scope.drawingParameters.zoomScale = 0.2;
	$scope.databases = ["GeneOntology2", "HMDB", "WormBase", "Metabolome", "Kegg"];
	$scope.identifiers = ["GO:0030528", "GO:0030528", "GO:0004871", "GO:0005634", "GO:0007165"];
	return $scope;
}])


