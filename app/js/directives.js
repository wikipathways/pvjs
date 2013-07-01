'use strict';

/* Directives */

// might need this for Firefox compatibility, but haven't tested FF enough to know yet. Otherwise, can remove.
// https://developer.mozilla.org/en-US/docs/xml/xml:id
var getElementByIdWrapper = function (xmldoc, myID) {
	return xmldoc.evaluate('//*[@xml:id="'+myID+'"]', xmldoc, 
			       function () {
				       return 'http://www.w3.org/XML/1998/namespace';},
				       XPathResult.FIRST_ORDERED_NODE_TYPE, 
				       null).singleNodeValue;
};

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
.directive('draggable', function($scope) {
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
.directive('pathwayImage', [function() {
	return function($scope, elm, attrs) {

	function createFlashObject() {
		var obj = document.createElement('object', true);
		obj.id = 'pathwayImageFlash';
		//obj.setAttribute('classid', 'image/svg+xml');
		obj.setAttribute('type', 'image/svg+xml');
		obj.setAttribute('src', 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"></svg>');
		//obj.setAttribute('data', 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"></svg>');
		obj.setAttribute('width', '100%');
		obj.setAttribute('height', '100%');

		obj.addEventListener(window.svgweb ? 'SVGLoad' : 'load', stylePathwayImageFlash, false);

		var container = document.getElementById('pathwayContainer');
		if (window.svgweb) {
			svgweb.appendChild(obj, container);
		} else {
			container.appendChild(obj);
		}
	}

	function stylePathwayImageFlash(pathwayImageFlash) {
		var doc = document.getElementById('pathwayImageFlash').contentDocument;                
		var pathwayImageFlash = doc.getElementsByTagNameNS(svgns, 'svg')[0];
		var viewport = document.createElementNS(svgns, 'g');
		viewport.id = 'viewport';
		pathwayImageFlash.appendChild(viewport);
		stylePathwayImage(pathwayImageFlash);
	}

	function stylePathwayImage(pathwayImage) {
		pathwayImage.setAttribute("style", "width: 100%; height: 100%; background-color: #f5f5f5; bottom:0; top:0; left:0; right:0; margin-top:0; margin-bottom:0; margin-right:0; margin-left:0;");
		// If any extra divs or other elements are added to this directive, make sure elm.parent() == $('pathwayContainer')
		//var pathwayContainer = $('pathwayContainer');
		var pathwayContainer = elm.parent();
		self.pI = pathwayImage;

		// scaling without using viewBox.
		var scaleViewAll = Math.min(pathwayContainer.width() / $scope.Pathway.Graphics["@BoardWidth"], pathwayContainer.height() / $scope.Pathway.Graphics["@BoardHeight"]);
		var translateX = (pathwayContainer.width() - $scope.Pathway.Graphics["@BoardWidth"]*scaleViewAll)/2;
		if ($scope.drawingParameters.editable == true) {
			pathwayImage.getElementsByTagNameNS(svgns, 'g')[0].setAttribute("transform", "scale(1)")
		}
		else {
			pathwayImage.getElementsByTagNameNS(svgns, 'g')[0].setAttribute("transform", "scale(" + scaleViewAll + ") translate(" + translateX/scaleViewAll + ",0)")
		};

		/*
		// scaling using viewBox. Does not work correctly with svgPan.js.
		if ($scope.drawingParameters.editable == true) {
		// would perhaps be better to do this without requiring jQuery
		elm[0].setAttribute("viewBox", "0 0 " + pathwayContainer.width() + " " + pathwayContainer.height());
		}
		else {
		elm[0].setAttribute("viewBox", "0 0 " + $scope.Pathway.Graphics["@BoardWidth"] + " " + $scope.Pathway.Graphics["@BoardHeight"]);
		};
		*/
		$('#pathwayImage').off()
		$('#pathwayImage').svgPan('viewport', 1, $scope.drawingParameters.enableZoom, 0, .2);
	};

		// Define svg
		//$scope.$watch(function() { return angular.toJson(['Pathway["@Name"]', 'editable']) }, function(pathway) {
		$scope.$watch('drawingParameters.enableZoom', function(enableZoom) {
			if ($scope.Pathway) {
				//console.log("enableZoom");
				//console.log(enableZoom);
				$('svg').svgPan('viewport', $scope.drawingParameters.enablePan, enableZoom, $scope.drawingParameters.enableDrag, $scope.drawingParameters.zoomScale);
				$('#pathwayImage').off()
				$('#pathwayImage').svgPan('viewport', 1, enableZoom, 0, .2);
			}
		});
		$scope.$watch('Pathway["@Name"]', function() {
			//console.log("$scope inside pathwayImage");
			//console.log($scope);
			if ($scope.Pathway) {
				if ($scope.drawingParameters.imageFormat == 'svg') {
					stylePathwayImage(elm[0])
				}
				else {
					if ($scope.drawingParameters.imageFormat == 'flash') {
						// might be able to modify this so that we're using the same function for svg and svgweb.
						if (window.svgweb) {
							svgweb.addOnLoad(createFlashObject);
						}
						else {
							window.addEventListener('load', createFlashObject, false);
						}
					}
					else {
						// display png image of pathway
					};
				}
			};
		}, true)
	}
}
])
.directive('node', [function() {
	function createNode($scope, elm, attrs) {
		elm.id = 'node' + $scope.DataNode["@GraphId"];
		elm.setAttribute("class", "node " + $scope.DataNode["@Type"]);
		elm.setAttribute("transform", "translate(" + $scope.DataNode.Graphics.x + "," + $scope.DataNode.Graphics.y + ")");
	};

	return function($scope, elm, attrs) {
		if ($scope.drawingParameters.imageFormat == 'svg') {
			createNode($scope, elm[0], attrs)
		}
		else {
			if ($scope.drawingParameters.imageFormat == 'flash') {
				window.setTimeout(function() {
					var doc = document.getElementById('pathwayImageFlash').contentDocument;                
					var viewport = doc.getElementsByTagNameNS(svgns, 'g')[0];
					var g = document.createElementNS(svgns, 'g');
					createNode($scope, g, attrs)
					viewport.appendChild(g);
				}, 1500)
			}
			else {
				// do nothing
			};
		}
	}
}])
.directive('nodeBoundingBox', [function() {
	function createNodeBoundingBox($scope, elm, attrs) {
		elm.id = 'nodeBoundingBox' + $scope.DataNode["@GraphId"];
		elm.setAttribute("x", 0)
		elm.setAttribute("y", 0);
		elm.setAttribute("width", $scope.DataNode.Graphics["@Width"]);
		elm.setAttribute("height", $scope.DataNode.Graphics["@Height"]);
		elm.setAttribute("stroke", '#FFD300');
		elm.setAttribute("stroke-opacity", 0.1);
		elm.setAttribute("fill", '#FFFFED');
		elm.setAttribute("fill-opacity", 0);
	};

	return function($scope, elm, attrs) {
		if ($scope.drawingParameters.imageFormat == 'svg') {
			createNodeBoundingBox($scope, elm[0], attrs)
		}
		else {
			if ($scope.drawingParameters.imageFormat == 'flash') {
				window.setTimeout(function() {
					var doc = document.getElementById('pathwayImageFlash').contentDocument;                
					var rect = document.createElementNS(svgns, 'rect');
					createNodeBoundingBox($scope, rect, attrs)
					var root = doc.getElementById('node' + $scope.DataNode["@GraphId"]); // Got it
					root.appendChild(rect);
				}, 1700)
			}
			else {
				// do nothing
			};
		}
	}
}])
.directive('nodeShape', [function() {
	function createNodeShape($scope, elm, nodeShape, attrs) {
		// nodeShape container
		elm.id = 'nodeShapeContainer' + $scope.DataNode["@GraphId"];

		// Define Node Shape 
		if ( $scope.DataNode.Graphics["@ShapeType"] == "Rectangle" ) {
			nodeShape.setAttribute("width", $scope.DataNode.Graphics["@Width"]);
			nodeShape.setAttribute("height", $scope.DataNode.Graphics["@Height"]);
		}
		else { if ( $scope.DataNode.Graphics["@ShapeType"] == "RoundedRectangle" ) {
			nodeShape.setAttribute("width", $scope.DataNode.Graphics["@Width"]);
			nodeShape.setAttribute("height", $scope.DataNode.Graphics["@Height"]);
			nodeShape.setAttribute("rx", 10);
			nodeShape.setAttribute("ry", 10);
		}
		else { if ( $scope.DataNode.Graphics["@ShapeType"] == "Oval" ) {
			nodeShape.setAttribute("cx", $scope.DataNode.Graphics["@Width"]/2);
			nodeShape.setAttribute("cy", $scope.DataNode.Graphics["@Height"]/2);
			nodeShape.setAttribute("rx", $scope.DataNode.Graphics["@Width"]/2);
			nodeShape.setAttribute("ry", $scope.DataNode.Graphics["@Height"]/2);
		}
		else {
			nodeShape.setAttribute("width", $scope.DataNode.Graphics["@Width"]);
			nodeShape.setAttribute("height", $scope.DataNode.Graphics["@Height"]);
		}}};
		nodeShape.id = 'nodeShape' + $scope.DataNode["@GraphId"];
		nodeShape.setAttribute("stroke", $scope.DataNode.Graphics["@Color"]);
		nodeShape.setAttribute("fill", $scope.DataNode.Graphics["@FillColor"]);
		nodeShape.setAttribute("fill-opacity", 0);
	};

	return function($scope, elm, attrs) {
		if ($scope.drawingParameters.imageFormat == 'svg') {
			// Define Node Shape 
			if ( $scope.DataNode.Graphics["@ShapeType"] == "Rectangle" ) {
				var nodeShape = document.createElementNS(svgns, 'rect');
				elm.append(nodeShape);
			}
			else { if ( $scope.DataNode.Graphics["@ShapeType"] == "RoundedRectangle" ) {
				var nodeShape = document.createElementNS(svgns, 'rect');
				elm.append(nodeShape);
			}
			else { if ( $scope.DataNode.Graphics["@ShapeType"] == "Oval" ) {
				var nodeShape = document.createElementNS(svgns, 'ellipse');
				elm.append(nodeShape);
			}
			else {
				var nodeShape = document.createElementNS(svgns, 'rect');
				elm.append(nodeShape);
				//console.log("This node shape type is not defined in pathvisio.js. Substituting rectangle.");
			}}};
			createNodeShape($scope, elm[0], nodeShape, attrs)
		}
		else {
			if ($scope.drawingParameters.imageFormat == 'flash') {
				window.setTimeout(function() {
					var doc = document.getElementById('pathwayImageFlash').contentDocument;                
					var g = document.createElementNS(svgns, 'g');
					// Define Node Shape 
					if ( $scope.DataNode.Graphics["@ShapeType"] == "Rectangle" ) {
						var nodeShape = document.createElementNS(svgns, 'rect');
						g.appendChild(nodeShape);
					}
					else { if ( $scope.DataNode.Graphics["@ShapeType"] == "RoundedRectangle" ) {
						var nodeShape = document.createElementNS(svgns, 'rect');
						g.appendChild(nodeShape);
					}
					else { if ( $scope.DataNode.Graphics["@ShapeType"] == "Oval" ) {
						var nodeShape = document.createElementNS(svgns, 'ellipse');
						g.appendChild(nodeShape);
					}
					else {
						var nodeShape = document.createElementNS(svgns, 'rect');
						g.appendChild(nodeShape);
						//console.log("This node shape type is not defined in pathvisio.js. Substituting rectangle.");
					}}};
					createNodeShape($scope, g, nodeShape, attrs)
					var root = doc.getElementById('node' + $scope.DataNode["@GraphId"]); // Got it
					root.appendChild(g);
				}, 1700)
			}
			else {
				// do nothing
			};
		}
	}
}])
.directive('nodeLabel', [function() {
	function createNodeLabel($scope, elm, attrs) {
		elm.textContent = $scope.DataNode["@TextLabel"];
		elm.id = 'nodeLabel' + $scope.DataNode["@GraphId"];
		elm.setAttribute("class", "node " + $scope.DataNode.Graphics["@ShapeType"])
		elm.setAttribute("font-size", $scope.DataNode.Graphics["@FontSize"] + "px")
		elm.setAttribute("fill", $scope.DataNode.Graphics["@Color"]);
	};

	var positionLabel = function ($scope, elm, attrs){
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

	return function($scope, elm, attrs) {
		$scope.$watch('Pathway.DataNode["@TextLabel"]', function() {
			if ($scope.Pathway) {
				if ($scope.drawingParameters.imageFormat == 'svg') {
					createNodeLabel($scope, elm[0], attrs)
					// disabled for svgweb version. need to modify to support it.
					positionLabel($scope, elm, attrs);
				}
				else {
					if ($scope.drawingParameters.imageFormat == 'flash') {
						// I don't think I can use the exact same function here for svg and svgweb
						window.setTimeout(function() {
							var textNode = document.createTextNode($scope.DataNode["@TextLabel"], true);
							var doc = document.getElementById('pathwayImageFlash').contentDocument;                
							var metadata = doc.createElementNS(svgns, 'metadata');
							metadata.appendChild(textNode);

							var text = doc.createElementNS(svgns, 'text');
							text.setAttributeNS(null,"font-size",$scope.DataNode.Graphics["@FontSize"] + "px");
							text.appendChild(textNode);
							var root = doc.getElementById('node' + $scope.DataNode["@GraphId"]); // Got it
							root.appendChild(text);
						}, 1600)
					}
					else {
						// do nothing
					};
				}

			}})
	}
}])

