'use strict';

/* Directives */

var svgns = "http://www.w3.org/2000/svg";

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
		$scope.$watch('pathwayImageStatus.editable', function(editable) {
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
		$scope.$watch('pathwayImageStatus.viewSize', function(viewSize) {
			if ($scope.Pathway) {
				//alert(viewSize);
				//alert("enableZoom in btnViewSize: " + $scope.pathwayImageStatus.enableZoom);
				if (viewSize) {
					if (viewSize == 'fullscreen') {
						fullScreenApi.requestFullScreen(parent.document.getElementById('pathwayFrame'));
						$scope.pathwayImageStatus.enableZoom = 1;
						elm.hide();
						$('#viewSmall').show();
					}
					else {
						if (viewSize == 'large') {
							// this doesn't work
							fullScreenApi.cancelFullScreen();
							$scope.pathwayImageStatus.enableZoom = 1;
							alert('Sorry, Large View not yet functional.');
						}
						else {
							if (viewSize == 'small') {
								fullScreenApi.cancelFullScreen();
								$scope.pathwayImageStatus.enableZoom = 0;
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
.directive('pathwayImage', ['PathwayStaticImageUrl', 'ImageFormat', function(PathwayStaticImageUrl, ImageFormat) {
	return function($scope, elm, attrs) {
/*
 // for svgweb
		function createFlashObject() {
			var obj = document.createElement('object', true);
			obj.id = 'pathwayObjectFlash';
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
			var doc = document.getElementById('pathwayObjectFlash').contentDocument;                
			var pathwayImageFlash = doc.getElementsByTagNameNS(svgns, 'svg');
			var viewport = document.createElementNS(svgns, 'g');
			viewport.id = 'viewport';
			pathwayImageFlash[0].appendChild(viewport);
			stylePathwayImage(pathwayImageFlash);
			// this works
			pathwayImageFlash[0].currentTranslate.setX(300);
			// but this does not. Why?
			// addEventListener does not work in IE8
			// http://help.dottoro.com/ljmojcxu.php#supByObj
			//pathwayImageFlash[0].addEventListener('drag', function(event) {
			//$('pathwayObjectFlash')[0].attachEvent('ondrag', function() {
			$('#pathwayContainer')[0].attachEvent('ondrag', function() {
				pathwayImageFlash[0].currentTranslate.setX(0);
				alert('This text may be dragged');
			})
		}
*/
		function stylePathwayImage(pathwayImage) {
			pathwayImage[0].setAttribute("style", "width: 100%; height: 100%; background-color: #f5f5f5; bottom:0; top:0; left:0; right:0; margin-top:0; margin-bottom:0; margin-right:0; margin-left:0;");
			// If any extra divs or other elements are added to this directive, make sure elm.parent() == $('pathwayContainer')
			//var pathwayContainer = $('pathwayContainer');
			var pathwayContainer = elm.parent();

			// scaling without using viewBox.
			var scaleViewAll = Math.min(pathwayContainer.width() / $scope.Pathway.Graphics["@BoardWidth"], pathwayContainer.height() / $scope.Pathway.Graphics["@BoardHeight"]);
			var translateX = (pathwayContainer.width() - $scope.Pathway.Graphics["@BoardWidth"]*scaleViewAll)/2;
			if ($scope.pathwayImageStatus.editable == true) {
				pathwayImage[0].getElementsByTagNameNS(svgns, 'g')[0].setAttribute("transform", "scale(1)")
			}
			else {
				pathwayImage[0].getElementsByTagNameNS(svgns, 'g')[0].setAttribute("transform", "scale(" + scaleViewAll + ") translate(" + translateX/scaleViewAll + ",0)")
			};
			pathwayImage.off()
			pathwayImage.svgPan('viewport', 1, $scope.pathwayImageStatus.enableZoom, 0, .2);

			/*
			// scaling using viewBox. Does not work correctly with svgPan.js.
			if ($scope.pathwayImageStatus.editable == true) {
			// would perhaps be better to do this without requiring jQuery
			elm[0].setAttribute("viewBox", "0 0 " + pathwayContainer.width() + " " + pathwayContainer.height());
			}
			else {
			elm[0].setAttribute("viewBox", "0 0 " + $scope.Pathway.Graphics["@BoardWidth"] + " " + $scope.Pathway.Graphics["@BoardHeight"]);
			};
			*/
		};

		// Define svg
		//$scope.$watch(function() { return angular.toJson(['Pathway["@Name"]', 'editable']) }, function(pathway) {
		$scope.$watch('pathwayImageStatus.enableZoom', function(enableZoom) {
			if ($scope.Pathway) {
				//console.log("enableZoom");
				//console.log(enableZoom);
				if (ImageFormat() == 'svg') {
					// need to check which of these lines should be included here. I think I can delete the $('svg') line.
					//$('svg').svgPan('viewport', $scope.pathwayImageStatus.enablePan, enableZoom, $scope.pathwayImageStatus.enableDrag, $scope.pathwayImageStatus.zoomScale);
					$('#pathwayImage').off()
					$('#pathwayImage').svgPan('viewport', 1, enableZoom, 0, .2);
				}
			}
		});
		$scope.$watch('Pathway["@Name"]', function() {
			//console.log("$scope inside pathwayImage");
			//console.log($scope);
			if ($scope.Pathway) {
				if (ImageFormat() == 'svg') {
					stylePathwayImage(elm)
				}
				else {
					var pathwayImageStatic = document.createElement("img");
					// do we want to automatically create image maps for this so that would could display details for
					// data nodes? I think I've seen automated systems for doing this on the backend.
					pathwayImageStatic.setAttribute("src", PathwayStaticImageUrl);
					pathwayImageStatic.setAttribute("height", "293");
					pathwayImageStatic.setAttribute("width", "600");
					pathwayImageStatic.setAttribute("alt", "Pathway Image");
					document.getElementById("pathwayContainer").appendChild(pathwayImageStatic);

					// should be able to make SVG viewer and possibly editor work with flash for browsers that don't support svg (IE8)
					// using svgweb, but at present, it is unclear whether it is better to build an svg within the svgweb flash object
					// or whether it is possible to build the svg normally using angular and then move it into the svgweb flash object
					// or refresh svgweb with this method: http://stackoverflow.com/questions/15486422/reinitialize-svgweb-for-ajax
					// It is also unclear whether the svg that angular builds in IE8 has the translate values needed for node positioning
					// and node label positioning.
					// For now, IE8 will default to a static PNG image.
					/*
					if (ImageFormat() == 'flash') {
						// might be able to modify this so that we're using the same function for svg and svgweb.
						if (window.svgweb) {
							svgweb.addOnLoad(createFlashObject);
						}
						else {
							window.addEventListener('load', createFlashObject, false);
						}
						stylePathwayImage(elm)
						pathwayImage.off()
						pathwayImage.svgPan('viewport', 1, $scope.pathwayImageStatus.enableZoom, 0, .2);
					}
					else {
						// display png image of pathway
					};
				       */
				}
			};
		}, true)
	}
}
])
.directive('node', ['ImageFormat', function(ImageFormat) {
	return function($scope, elm, attrs) {
		function styleNode(node) {
			node.id = 'node' + $scope.DataNode["@GraphId"];
			node.setAttribute("class", "node " + $scope.DataNode["@Type"]);
			node.setAttribute("transform", "translate(" + $scope.DataNode.Graphics.x + "," + $scope.DataNode.Graphics.y + ")");
		};

		if (ImageFormat() == 'svg') {
			styleNode(elm[0])
		}
		/*
 // for svgweb
		else {
			if (ImageFormat() == 'flash') {
				window.setTimeout(function() {
					var doc = document.getElementById('pathwayObjectFlash').contentDocument;                
					var viewport = doc.getElementsByTagNameNS(svgns, 'g')[0];
					var g = document.createElementNS(svgns, 'g');
					styleNode(g)
					viewport.appendChild(g);
				}, 500)
				styleNode(elm[0])
			}
			else {
				// do nothing
			};
		}
	       */
	}
}])
.directive('nodeBoundingBox', ['ImageFormat', function(ImageFormat) {
	return function($scope, elm, attrs) {

		function styleNodeBoundingBox(elm) {
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

		if (ImageFormat() == 'svg') {
			styleNodeBoundingBox(elm[0])
		}
		/*
 // for svgweb
		else {
			if (ImageFormat() == 'flash') {
				styleNodeBoundingBox(elm[0])
				window.setTimeout(function() {
					var doc = document.getElementById('pathwayObjectFlash').contentDocument;                
					var rect = document.createElementNS(svgns, 'rect');
					styleNodeBoundingBox(rect)
					var root = doc.getElementById('node' + $scope.DataNode["@GraphId"]); // Got it
					root.appendChild(rect);
				}, 700)
			}
			else {
				// do nothing
			};
		}
	       */
	}
}])
.directive('nodeShape', ['ImageFormat', function(ImageFormat) {
	return function($scope, elm, attrs) {

		function createNodeShape(nodeShapeContainer) {
			// nodeShape container
			nodeShapeContainer.id = 'nodeShapeContainer' + $scope.DataNode["@GraphId"];

			// Create Node Shape 
			if ( $scope.DataNode.Graphics["@ShapeType"] == "Rectangle" ) {
				var nodeShape = document.createElementNS(svgns, 'rect');
				nodeShape.setAttribute("x", 0)
				nodeShape.setAttribute("y", 0);
				nodeShape.setAttribute("width", $scope.DataNode.Graphics["@Width"]);
				nodeShape.setAttribute("height", $scope.DataNode.Graphics["@Height"]);
				nodeShapeContainer.appendChild(nodeShape);
			}
			else { if ( $scope.DataNode.Graphics["@ShapeType"] == "RoundedRectangle" ) {
				var nodeShape = document.createElementNS(svgns, 'rect');
				nodeShape.setAttribute("x", 0)
				nodeShape.setAttribute("y", 0);
				nodeShape.setAttribute("width", $scope.DataNode.Graphics["@Width"]);
				nodeShape.setAttribute("height", $scope.DataNode.Graphics["@Height"]);
				nodeShape.setAttribute("rx", 10);
				nodeShape.setAttribute("ry", 10);
				nodeShapeContainer.appendChild(nodeShape);
			}
			else { if ( $scope.DataNode.Graphics["@ShapeType"] == "Oval" ) {
				var nodeShape = document.createElementNS(svgns, 'ellipse');
				nodeShape.setAttribute("cx", $scope.DataNode.Graphics["@Width"]/2);
				nodeShape.setAttribute("cy", $scope.DataNode.Graphics["@Height"]/2);
				nodeShape.setAttribute("rx", $scope.DataNode.Graphics["@Width"]/2);
				nodeShape.setAttribute("ry", $scope.DataNode.Graphics["@Height"]/2);
				nodeShapeContainer.appendChild(nodeShape);
			}
			else {
				var nodeShape = document.createElementNS(svgns, 'rect');
				nodeShape.setAttribute("x", 0)
				nodeShape.setAttribute("y", 0);
				nodeShape.setAttribute("width", $scope.DataNode.Graphics["@Width"]);
				nodeShape.setAttribute("height", $scope.DataNode.Graphics["@Height"]);
				nodeShapeContainer.appendChild(nodeShape);
				//console.log("This node shape type is not defined in pathvisio.js. Substituting rectangle.");
			}}};

			nodeShape.id = 'nodeShape_' + $scope.DataNode["@GraphId"];
			nodeShape.setAttribute("stroke", $scope.DataNode.Graphics["@Color"]);
			nodeShape.setAttribute("fill", $scope.DataNode.Graphics["@FillColor"]);
			nodeShape.setAttribute("fill-opacity", 0);
		};

		if (ImageFormat() == 'svg') {
			createNodeShape(elm[0])
		}
		/*
 // for svgweb
		else {
			if (ImageFormat() == 'flash') {
				createNodeShape(elm[0])
				window.setTimeout(function() {
					createNodeShape(elm[0])
					var doc = document.getElementById('pathwayObjectFlash').contentDocument;                
					var g = document.createElementNS(svgns, 'g');
					createNodeShape(g)
					var root = doc.getElementById('node' + $scope.DataNode["@GraphId"]); // Got it
					root.appendChild(g);
				}, 700)
			}
			else {
				// do nothing
			};
		}
	       */
	}
}])
.directive('nodeLabel', ['ImageFormat', function(ImageFormat) {
	return function($scope, elm, attrs) {

		function styleNodeLabel(nodeContainer) {
			nodeContainer.textContent = $scope.DataNode["@TextLabel"];
			nodeContainer.id = 'nodeLabel_' + $scope.DataNode["@GraphId"];
			nodeContainer.setAttribute("class", "node " + $scope.DataNode.Graphics["@ShapeType"])
			nodeContainer.setAttributeNS(null,"font-family",$scope.DataNode.Graphics["@FontName"]);
			nodeContainer.setAttribute("font-size", $scope.DataNode.Graphics["@FontSize"] + "px")
			nodeContainer.setAttribute("fill", $scope.DataNode.Graphics["@Color"]);
			positionNodeLabel(nodeContainer);
		};

		function positionNodeLabel(nodeLabel){
			var labelBbox = nodeLabel.getBBox();
			var labelText = $scope.DataNode["@TextLabel"];
			if ( $scope.DataNode.Graphics["@Width"] < labelBbox["width"] ) {
				labelText = labelText.substring(0, labelText.length - 4);
				nodeLabel.textContent = labelText + "...";
				labelBbox = nodeLabel.getBBox();
				while ( $scope.DataNode.Graphics["@Width"] < labelBbox["width"] ) {
					labelText = labelText.substring(0, labelText.length - 1);
					nodeLabel.textContent = labelText + "...";
					labelBbox = nodeLabel.getBBox();
				};

			};
			var labelxtransform = -1*(labelBbox["x"]) + $scope.DataNode.Graphics["@Width"]/2 - labelBbox["width"]/2;
			var labelytransform = -1*(labelBbox["y"]) + $scope.DataNode.Graphics["@Height"]/2 - labelBbox["height"]/2;
			nodeLabel.setAttribute("transform", "translate(" + labelxtransform + "," + labelytransform + ")");
		};

		$scope.$watch('Pathway.DataNode["@TextLabel"]', function() {
			if ($scope.Pathway) {
				if (ImageFormat() == 'svg') {
					styleNodeLabel(elm[0])
				}
				/*
 // for svgweb
				else {
					if (ImageFormat() == 'flash') {
						window.setTimeout(function() {
							var textNode = document.createTextNode($scope.DataNode["@TextLabel"], true);
							var doc = document.getElementById('pathwayObjectFlash').contentDocument;                
							var metadata = doc.createElementNS(svgns, 'metadata');
							metadata.appendChild(textNode);
							var text = doc.createElementNS(svgns, 'text');

							styleNodeLabel(text);
							// the large timeout value results in a visible movement of text into position,
							// but a smaller value doesn't result in the text moving into its correct position.
							// Need to use listener or something other than a setTimeout.
							window.setTimeout(function() {
								positionNodeLabel(text);
							}, 1000)

							text.appendChild(textNode);
							var root = doc.getElementById('node' + $scope.DataNode["@GraphId"]); // Got it
							root.appendChild(text);
						}, 600)
						styleNodeLabel(elm[0])
						positionNodeLabel(elm[0]);
					}
					else {
						// do nothing
					};
				}
			       */

			}})
	}
}])

