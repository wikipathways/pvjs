'use strict';

/* Controllers */
angular.module('pathvisio.controllers', [])
.controller('HomeCtrl', ['$scope', function($scope) {
	$scope.test = "blue";
	return $scope;

}])
.controller('PathwayCtrl', ['$scope', 'PathwayService', function($scope, PathwayService) {
	PathwayService.getData(function(pathway) {
		$scope.Pathway = pathway;
	}
	);

	if (!($scope.pathwayImageStatus)) {
		$scope.pathwayImageStatus = {};
	}
	if (!($scope.pathwayImageStatus.editable)) {
		$scope.pathwayImageStatus.editable = false;
	}
	if (!($scope.pathwayImageStatus.viewSize)) {
		$scope.pathwayImageStatus.viewSize = 'small';
	}
	$scope.pathwayImageStatus.enablePan = 1;
	if (!($scope.pathwayImageStatus.enableZoom)) {
		if ($scope.pathwayImageStatus.viewSize == 'small') {
			$scope.pathwayImageStatus.enableZoom = 0;
		}
		else {
			$scope.pathwayImageStatus.enableZoom = 1;
		}
	};
	$scope.pathwayImageStatus.enableDrag = 0;
	$scope.pathwayImageStatus.zoomScale = 0.2;

	// this is for demo purposes. need to add code to pull this data, probably in services.js.
	$scope.databases = ["GeneOntology2", "HMDB", "WormBase", "Metabolome", "Kegg"];
	$scope.identifiers = ["GO:0030528", "GO:0030528", "GO:0004871", "GO:0005634", "GO:0007165"];
	return $scope;

}])


