'use strict';

/* Directives */

angular.module('pathvisio.directives', [])
.directive('btnEditable', [function() {
	return function($scope, elm, attrs, $location) {
		$scope.$watch('drawingParameters.editable', function(editable) {
			if (editable) {
				if (editable == true) {
					parent.document.getElementById('pathwayFrame').src = "../../app/#/wpEditor?wgTitle=WP299&wgCurRevisionId=61677";
				}
				else {
					parent.document.getElementById('pathwayFrame').src = "../../app/#/wpViewer?wgTitle=WP299&wgCurRevisionId=61677";
				}
			}
		});
	}
}])
.directive('btnViewSize', [function() {
	return function($scope, elm, attrs) {
		$scope.$watch('drawingParameters.viewSize', function(viewSize) {
			if ($scope.Pathway) {
				//alert(viewSize);
				//alert("enableZoom in btnViewSize: " + $scope.drawingParameters.enableZoom);
				if (viewSize) {
					if (viewSize == 'fullscreen') {
						fullScreenApi.requestFullScreen(parent.document.getElementById('pathwayFrame'));
						$scope.drawingParameters.enableZoom = 1;
						elm.hide();
						$('#viewSmall').show();
					}
					else {
						if (viewSize == 'large') {
							// this doesn't work
							fullScreenApi.cancelFullScreen();
							$scope.drawingParameters.enableZoom = 1;
							alert('Sorry, Large View not yet functional.');
						}
						else {
							if (viewSize == 'small') {
								fullScreenApi.cancelFullScreen();
								$scope.drawingParameters.enableZoom = 0;
								elm.hide();
								$('#viewFullScreen').show();
								//alert('btnViewSize: small');
							}
						}
					}
				}
			}
		}, true);
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
.directive('drawingBoard', [function() {
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
		//$scope.$watch(function() { return angular.toJson(['Pathway["@Name"]', 'editable']) }, function(pathway) {
		$scope.$watch('drawingParameters.enableZoom', function(enableZoom) {
			if ($scope.Pathway) {
				//console.log("enableZoom");
				//console.log(enableZoom);
				//$('svg').svgPan('viewport', $scope.drawingParameters.enablePan, enableZoom, $scope.drawingParameters.enableDrag, $scope.drawingParameters.zoomScale);
				$('#drawingBoard').off()
				$('#drawingBoard').svgPan('viewport', 1, enableZoom, 0, .2);
			}
		});
		$scope.$watch('Pathway["@Name"]', function() {
			//console.log("$scope inside drawingBoard");
			//console.log($scope);
			if ($scope.Pathway)
				{
					//console.log("$scope inside drawingBoard if statement");
					//console.log($scope);

					elm.attr("style", "width: 100%; height: 100%; background-color: #f5f5f5; bottom:0; top:0; left:0; right:0; margin-top:0; margin-bottom:0; margin-right:0; margin-left:0;");
			       		// scaling without using viewBox.
					// would perhaps be better to get max svg width allowed without requiring jQuery
					var scaleViewAll = Math.min($('body').width() / $scope.Pathway.Graphics["@BoardWidth"], $('body').height() / $scope.Pathway.Graphics["@BoardHeight"]);
					var translateX = ($('body').width() - $scope.Pathway.Graphics["@BoardWidth"]*scaleViewAll)/2;
					if ($scope.drawingParameters.editable == true) {
						$('#viewport').attr("transform", "scale(1)")
					}
					else {
						$('#viewport').attr("transform", "scale(" + scaleViewAll + ") translate(" + translateX/scaleViewAll + ",0)")
					};
				       /*
			       		// scaling using viewBox. Does not work correctly with svgPan.js.
					if ($scope.drawingParameters.editable == true) {
						// would perhaps be better to do this without requiring jQuery
						elm[0].setAttribute("viewBox", "0 0 " + $('body').width() + " " + $('body').height());
					}
					else {
						elm[0].setAttribute("viewBox", "0 0 " + $scope.Pathway.Graphics["@BoardWidth"] + " " + $scope.Pathway.Graphics["@BoardHeight"]);
					};
				       */
					$('#drawingBoard').off()
					$('#drawingBoard').svgPan('viewport', 1, $scope.drawingParameters.enableZoom, 0, .2);
					// there must be a better way to put the svg into svgweb than using a time out.
					console.log("elm.parent()[0]");
					console.log(elm.parent()[0]);
					//setTimeout(function(){svgweb.appendChild(elm[0], document.getElementById('dog'));},100);
					//setTimeout(function(){svgweb.appendChild(elm[0], elm.parent()[0]);},100);
					// This would seem to be the better option, but it doesn't render the text labels.
					//$scope.$evalAsync(svgweb.appendChild(elm[0], document.getElementById('dog'))); // note that we call svgweb.appendChild
				}
		}, true)
	}
}
])
.directive('node', [function() {
	return function($scope, elm, attrs) {
		console.log("$scope inside node");
		//console.log($scope);
		elm[0].setAttribute("class", "node " + $scope.DataNode["@Type"]);
		elm[0].setAttribute("transform", "translate(" + $scope.DataNode.Graphics.x + "," + $scope.DataNode.Graphics.y + ")");
		console.log("$scope inside node end");
	}
}])
.directive('nodeBoundingBox', [function() {
	return function($scope, elm, attrs) {
		console.log("$scope inside nodeBoundingBox");
		elm[0].id = $scope.DataNode["@GraphId"];
		elm[0].setAttribute("x", 0)
		elm[0].setAttribute("y", 0);
		elm[0].setAttribute("width", $scope.DataNode.Graphics["@Width"]);
		elm[0].setAttribute("height", $scope.DataNode.Graphics["@Height"]);
		elm[0].setAttribute("stroke", $scope.DataNode.Graphics["@Color"]);
		elm[0].setAttribute("fill", $scope.DataNode.Graphics["@FillColor"]);
	}
}])
.directive('nodeLabel', [function() {
	return function($scope, elm, attrs) {
		console.log("$scope inside nodeLabel");
		$scope.$watch('Pathway.DataNode["@TextLabel"]', function() {
			if ($scope.Pathway)
				{
					elm[0].textContent = $scope.DataNode["@TextLabel"];
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
					//disable for testing svgweb
					//positionLabel();
				}})
		console.log("$scope inside nodeLabel end");
	}
}])

