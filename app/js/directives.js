'use strict';

/* Directives */

angular.module('myApp.directives', [])
.directive('btnZoomable', ['pathwayService', function(pathwayService) {
	return function($scope, elm, attrs) {
		elm[0].textContent = "Enable Zoom";
		$scope.$watch('zoomable', function(zoomable) {
			if (zoomable) {
				if ($scope.zoomable == 'restState') {
					if (enableZoom == 1) {
						enableZoom = 0;
						elm[0].textContent = "Enable Zoom";
					}
					else {
						enableZoom = 1;
						elm[0].textContent = "Disable Zoom";
					}
				}
				else {
					$scope.zoomable = 'restState';
				}
			}
		});
	}
}])
.directive('btnEditable', ['pathwayService', function(pathwayService) {
	return function($scope, elm, attrs, $location) {
		$scope.$watch('editable', function(editable) {
			if (editable) {
				if ($scope.editable == true) {
					parent.document.getElementById('pathwayFrame').src = "../../app/#/wpEditor?wgTitle=WP299&wgCurRevisionId=61677";
				}
				else {
					parent.document.getElementById('pathwayFrame').src = "../../app/#/wpViewer?wgTitle=WP299&wgCurRevisionId=61677";
				
				}
			}
		});
	}
}])
.directive('btnViewSize', ['pathwayService', function(pathwayService) {
	return function($scope, elm, attrs) {
		$scope.$watch('viewSize', function(viewSize) {
			if (viewSize) {
				if ($scope.viewSize == 'fullscreen') {
					fullScreenApi.requestFullScreen(parent.document.getElementById('pathwayFrame'));
				}
				else {
					fullScreenApi.cancelFullScreen();
					if ($scope.viewSize == 'large') {
						alert('Sorry, Large View not yet functional.');
					}
				}
			}
		});
	}
}])
// this directive is not currently in use. It would be nice to move the SVG script in view.html to this location.
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
.directive('drawingBoard', ['pathwayService', function(pathwayService) {
	return function($scope, elm, attrs) {
		// I don't remember what this is for - maybe checking whether I'm inside an iframe?
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
		console.log($scope);
		var cscope = self.cscope = $scope;
			if ($scope.pathways)
				{
					console.log("inside");
					console.log($scope);
					console.log($scope.editable);
					console.log($scope.pathways);
					console.log($scope.pathways.Pathway);
					console.log($scope.pathways.Pathway.Graphics["@BoardWidth"]);
					//console.log($scope.pathways.Pathway["@Name"]);
					//elm.attr("style", "background-color: beige; display: block; position:absolute; height:auto; bottom:0; top:0; left:0; right:0; margin-top:0; margin-bottom:0; margin-right:0; margin-left:0;");
					elm.attr("preserveAspectRatio", "xMidYMid");
				       // removed position:absolute and display:block in order to not break the pan ability
					elm.attr("style", "background-color: #fff0ff; height:auto; bottom:0; top:0; left:0; right:0; margin-top:0; margin-bottom:0; margin-right:0; margin-left:0;");
				       // it appears the g viewport container is messing up the viewbox somehow
					elm.attr("viewBox", "0 0 " + $scope.pathways.Pathway.Graphics["@BoardWidth"] + " " + $scope.pathways.Pathway.Graphics["@BoardHeight"]);

					if ($scope.editable == true) {
						elm.attr("viewBox", "0 0 " + elm[0].clientWidth + " " + elm[0].clientHeight)
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
		//elm[0].setAttribute("x", $scope.DataNode.Graphics.x);
		//elm[0].setAttribute("y", $scope.DataNode.Graphics.y);
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

