'use strict';

/* Directives */

angular.module('myApp.directives', [])
.directive('goFullScreen', ['pathwayService', function(pathwayService) {
	return function($scope, elm, attrs) {
		//console.log("$scope-goFullScreen");
		//console.log($scope);

		$scope.$watch('editable', function(editable) {
			if (editable) {
				//var svg = d3.select("svg#pathwaySvg")
				if ($scope.editable == true) {
					//circle.attr("fill", "black");
					fullScreenApi.requestFullScreen(document.body)
					// if inside iframe use this: fullScreenApi.requestFullScreen(parent.parent.document.getElementById('pathwayFrame'))
				}
			}
		});
	}
}])
.directive('draggable', function() {
	return {
		// A = attribute, E = Element, C = Class and M = HTML Comment
		restrict:'A',
		//The link function is responsible for registering DOM listeners as well as updating the DOM.
		link: function(scope, element, attrs) {
			element.draggable({
				revert:true
			});
		}
	};
})
.directive('paper', ['pathwayService', function(pathwayService) {
	return function($scope, elm, attrs) {
		function objToString (obj) {
			var str = '';
			for (var p in obj) {
				if (obj.hasOwnProperty(p)) {
					str += p + '::' + obj[p] + '\n';
				}
			}
			return str;
		}

		// Define svg
		//$scope.$watch(function() { return angular.toJson(['pathways.Pathway["@Name"]', 'editable']) }, function(pathway) {
		$scope.$watch('pathways.Pathway["@Name"]', function() {
			if ($scope.pathways)
				{
					//console.log("inside");
					//console.log($scope.pathways.Pathway["@Name"]);
					//paper.attr("preserveAspectRatio", "xMidYMid")
					//paper.attr("style", "background-color: beige; : xMidYMid; display: block; position:absolute; height:auto; bottom:0; top:0; left:0; right:0; margin-top:0; margin-bottom:0; margin-right:0; margin-left:0;")
					//paper.attr("viewBox", "0 0 " + $scope.pathway.width + " " + $scope.pathway.height);

					if ($scope.editable == true) {
						//paper.attr("viewBox", "0 0 " + paper[0][0].clientWidth + " " + paper[0][0].clientHeight)
						//alert("true: " + $scope.pathway.editable);
						//fullScreenApi.requestFullScreen(parent.parent.document.getElementById('pathwayFrame'))
					}
					else {
						//svg.attr("viewBox", "0 0 " + $scope.pathway.width + " " + $scope.pathway.height)
						//alert("else: " + $scope.pathway.editable);
					};
				}
		}, true)
	}
}
])
.directive('node', ['pathwayService', function(pathwayService) {
	return function($scope, elm, attrs) {
		//console.log("you");
		//console.log("elm");
		//console.log(elm[0]);
		//console.log($scope);
		//elm[0].id = $scope.DataNode["@GraphId"];
		elm[0].setAttribute("transform", "translate(" + $scope.DataNode.Graphics.x + "," + $scope.DataNode.Graphics.y + ")");

	}
}])
.directive('nodeBoundingBox', ['pathwayService', function(pathwayService) {
	return function($scope, elm, attrs) {
		//console.log("nodeBoundingBox elm");
		//console.log(elm[0]);
		//console.log($scope);
		elm[0].id = $scope.DataNode["@GraphId"];
		elm[0].setAttribute("x", 0)
		elm[0].setAttribute("y", 0);
		elm[0].setAttribute("width", $scope.DataNode.Graphics["@Width"]);
		elm[0].setAttribute("height", $scope.DataNode.Graphics["@Height"]);
		elm[0].setAttribute("stroke", $scope.DataNode.Graphics["@Color"]);
		elm[0].setAttribute("fill", $scope.DataNode.Graphics["@FillColor"]);
	}
}])
.directive('nodeLabel', ['pathwayService', function(pathwayService) {
	return function($scope, elm, attrs) {
		$scope.$watch('pathways.Pathway.DataNode["@TextLabel"]', function() {
			if ($scope.pathways)
				{
					elm[0].id = $scope.DataNode["@GraphId"];
					elm[0].setAttribute("class", "node " + $scope.DataNode.Graphics["@ShapeType"])
					elm[0].setAttribute("font-size", $scope.DataNode.Graphics["@FontSize"] + "px")
					elm[0].setAttribute("fill", $scope.DataNode.Graphics["@Color"]);

					var positionLabel = function (){
						var labelBbox = elm[0].getBBox();
						var labelText = $scope.DataNode["@TextLabel"];
						if ( $scope.DataNode.Graphics["@Width"] < labelBbox["width"] ) {
							labelText = labelText.substring(0, labelText.length - 4);
							elm[0].textContent = labelText + "...";
							labelBbox = elm[0].getBBox();
							while ( $scope.DataNode.Graphics["@Width"] < labelBbox["width"] ) {
								labelText = labelText.substring(0, labelText.length - 1);
								elm[0].textContent = labelText + "...";
								labelBbox = elm[0].getBBox();
							};

						};
						var labelxtransform = -1*(labelBbox["x"]) + $scope.DataNode.Graphics["@Width"]/2 - labelBbox["width"]/2;
						var labelytransform = -1*(labelBbox["y"]) + $scope.DataNode.Graphics["@Height"]/2 - labelBbox["height"]/2;
						elm[0].setAttribute("transform", "translate(" + labelxtransform + "," + labelytransform + ")");
					}
					positionLabel();
				}})
	}
}])
