'use strict';

/* Directives */

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
function objLoadFunc() {

	var doc = document.getElementById('mySVG').contentDocument;                
	var circle = document.createElementNS(svgns, 'circle');
	circle.setAttribute('x', 15);
	circle.setAttribute('y', 15);
	circle.setAttribute('r', 5);
	circle.setAttribute('fill', 'purple');
	var root = doc.getElementsByTagNameNS(svgns, 'svg')[0];
	root.appendChild(circle);

}

function loadFunc() {
	var obj = document.createElement('object', true);
	obj.id = 'mySVG';
	//obj.setAttribute('classid', 'image/svg+xml');
	obj.setAttribute('type', 'image/svg+xml');
	obj.setAttribute('src', 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"></svg>');
	//obj.setAttribute('data', 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"></svg>');
	//obj.setAttribute('src', 'svg-files/mysvg.svg');
	//obj.setAttribute('data', '../svg-files/mysvg.svg');
	obj.setAttribute('width', '1000');
	obj.setAttribute('height', '1000');

	obj.addEventListener(window.svgweb ? 'SVGLoad' : 'load', objLoadFunc, false);

	var container = document.getElementById('svgContainer1');
	if (window.svgweb) {
		svgweb.appendChild(obj, container);
	} else {
		container.appendChild(obj);
	}

}
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


if (window.svgweb) {
	svgweb.addOnLoad(loadFunc);
}
else {
	window.addEventListener('load', loadFunc, false);
}

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
		//console.log("$scope inside node");
		//console.log($scope);
		elm[0].id = 'node' + $scope.DataNode["@GraphId"];
		elm[0].setAttribute("class", "node " + $scope.DataNode["@Type"]);
		elm[0].setAttribute("transform", "translate(" + $scope.DataNode.Graphics.x + "," + $scope.DataNode.Graphics.y + ")");

		// I will want to use something better than a timeout to know when the object is created.
		// I also may want to do conditional checking so as not to run this if not IE8
		window.setTimeout(function() {
			var doc = document.getElementById('mySVG').contentDocument;                
			var g = document.createElementNS(svgns, 'g');
			g.id = 'node' + $scope.DataNode["@GraphId"];
			g.setAttribute("class", "node " + $scope.DataNode["@Type"]);
			g.setAttribute("transform", "translate(" + $scope.DataNode.Graphics['x'] + "," + $scope.DataNode.Graphics['y'] + ")");
			//g.setAttribute("transform", "translate(" + $scope.DataNode.Graphics.x + "," + $scope.DataNode.Graphics.y + ")");
			var root = doc.getElementsByTagNameNS(svgns, 'svg')[0];
			root.appendChild(g);
		}, 1500)

		
/*
		var rectGreen = document.createElementNS(svgns, 'rect');
		rectGreen.setAttribute('x', 10);
		rectGreen.setAttribute('y', 10);
		rectGreen.setAttribute('width', 40);
		rectGreen.setAttribute('height', 20);
		rectGreen.setAttribute('fill', 'green');
		svg.appendChild(rectGreen);
*/
		}
}])
.directive('nodeBoundingBox', [function() {
	return function($scope, elm, attrs) {
		//console.log("$scope inside nodeBoundingBox");
		elm[0].id = 'nodeBoundingBox' + $scope.DataNode["@GraphId"];
		elm[0].setAttribute("x", 0)
		elm[0].setAttribute("y", 0);
		elm[0].setAttribute("width", $scope.DataNode.Graphics["@Width"]);
		elm[0].setAttribute("height", $scope.DataNode.Graphics["@Height"]);
		elm[0].setAttribute("stroke", $scope.DataNode.Graphics["@Color"]);
		elm[0].setAttribute("fill", $scope.DataNode.Graphics["@FillColor"]);

		window.setTimeout(function() {
			var doc = document.getElementById('mySVG').contentDocument;                
			var rect = document.createElementNS(svgns, 'rect');
			rect.id = 'nodeBoundingBox' + $scope.DataNode["@GraphId"];
			rect.setAttribute("x", 0)
			rect.setAttribute("y", 0);
			rect.setAttribute("width", $scope.DataNode.Graphics["@Width"]);
			rect.setAttribute("height", $scope.DataNode.Graphics["@Height"]);
			rect.setAttribute("stroke", $scope.DataNode.Graphics["@Color"]);
			rect.setAttribute("fill", $scope.DataNode.Graphics["@FillColor"]);
			//var root = doc.getElementsByTagNameNS(svgns, "g")[0];
			//var root = getElementByIdWrapper(doc, 'node' + $scope.DataNode["@GraphId"]); // Got it
			var root = doc.getElementById('node' + $scope.DataNode["@GraphId"]); // Got it
			root.appendChild(rect);
		}, 1700)
	}
}])
.directive('nodeShape', [function() {
	return function($scope, elm, attrs) {
		//console.log("$scope inside nodeShape");
		elm[0].id = 'nodeShape' + $scope.DataNode["@GraphId"];
		elm[0].setAttribute("x", 0)
		elm[0].setAttribute("y", 0);
		elm[0].setAttribute("width", $scope.DataNode.Graphics["@Width"]);
		elm[0].setAttribute("height", $scope.DataNode.Graphics["@Height"]);
		elm[0].setAttribute("stroke", $scope.DataNode.Graphics["@Color"]);
		elm[0].setAttribute("stroke-opacity", 0.3);
		elm[0].setAttribute("fill", $scope.DataNode.Graphics["@FillColor"]);
		elm[0].setAttribute("fill-opacity", 0.3);

		window.setTimeout(function() {
			var doc = document.getElementById('mySVG').contentDocument;                
			var rect = document.createElementNS(svgns, 'rect');
			rect.id = 'nodeBoundingBox' + $scope.DataNode["@GraphId"];
			rect.setAttribute("x", 0)
			rect.setAttribute("y", 0);
			rect.setAttribute("width", $scope.DataNode.Graphics["@Width"]);
			rect.setAttribute("height", $scope.DataNode.Graphics["@Height"]);
			rect.setAttribute("stroke", $scope.DataNode.Graphics["@Color"]);
			rect.setAttribute("stroke-opacity", 0.3);
			rect.setAttribute("fill", $scope.DataNode.Graphics["@FillColor"]);
			rect.setAttribute("fill-opacity", 0.3);
			//var root = doc.getElementsByTagNameNS(svgns, "g")[0];
			//var root = getElementByIdWrapper(doc, 'node' + $scope.DataNode["@GraphId"]); // Got it
			var root = doc.getElementById('node' + $scope.DataNode["@GraphId"]); // Got it
			root.appendChild(rect);
		}, 1700)
	}
}])
.directive('nodeLabel', [function() {
	return function($scope, elm, attrs) {
		//console.log("$scope inside nodeLabel");
		$scope.$watch('Pathway.DataNode["@TextLabel"]', function() {
			if ($scope.Pathway)
				{
					elm[0].textContent = $scope.DataNode["@TextLabel"];
					elm[0].id = 'nodeLabel' + $scope.DataNode["@GraphId"];
					elm[0].setAttribute("class", "node " + $scope.DataNode.Graphics["@ShapeType"])
					elm[0].setAttribute("font-size", $scope.DataNode.Graphics["@FontSize"] + "px")
					elm[0].setAttribute("fill", $scope.DataNode.Graphics["@Color"]);

		window.setTimeout(function() {

			var textNode = document.createTextNode($scope.DataNode["@TextLabel"], true);
			var doc = document.getElementById('mySVG').contentDocument;                
			var metadata = doc.createElementNS(svgns, 'metadata');
			metadata.appendChild(textNode);


			var text = doc.createElementNS(svgns, 'text');
			//text.setAttributeNS(null,"x",x);     
			//text.setAttributeNS(null,"y",y); 
			text.setAttributeNS(null,"font-size",$scope.DataNode.Graphics["@FontSize"] + "px");
			text.appendChild(textNode);
			//var root = doc.getElementsByTagNameNS(svgns, "g")[0];
			var root = doc.getElementById('node' + $scope.DataNode["@GraphId"]); // Got it
			root.appendChild(text);
		}, 1600)

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
	}
}])

