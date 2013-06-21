'use strict';

/* Services */

// If don't use resouce, I can get rid of ngResource here
//angular.module('pathvisio.services', ['ngResource'])
angular.module('pathvisio.services', [])
.factory('PathwayService', function($location, $http){
	return {
		// $scope is required, but url is optional
		getData: function($scope, url) {
			if (!(url)) {
				if (!($location.search().wgTitle)) {
					var url = "../samples/gpml/error.gpml";
				}
				else {
					var url = "../samples/gpml/" + $location.search().wgTitle + "_" + $location.search().wgCurRevisionId  + ".gpml";
				}
			};

			function getDataFile(url, callback) {
				try {
					$http.get(url).success(function(data) {
						return callback(data);
					})
				}
				catch (e) {
					console.log("Error: File not found.");
					$scope.Pathway = {"@xmlns":"http://pathvisio.org/GPML/2013a","@Name":"Error - File not found.","@Version":"20130621","Graphics":[{"@BoardWidth":"471.0","@BoardHeight":"239.0"}],"InfoBox":{"@CenterX":"0.0","@CenterY":"0.0"},"Biopax":null,"DataNodes":[{"@TextLabel":"Error - File not found.","@GraphId":"ec16d","Graphics":{"@Width":"249.5","@Height":"73.5","@ZOrder":"32768","@FontName":"Verdana","@FontWeight":"Bold","@FontSize":"16","@Valign":"Middle","@Color":"#ff0000","x":1.5,"y":19.5,"@FillColor":"white"},"Xref":{"@Database":"","@ID":""}}]};
				}
			}

			var getData = getDataFile(url, function(data) {
				function Right(str, n){
					if (n <= 0)
						return "";
					else if (n > String(str).length)
						return str;
					else {
						var iLen = String(str).length;
						return String(str).substring(iLen, iLen - n);
					}
				}

				function cleanJson(object) {
					if (Object.prototype.toString.call( object ) === '[object Object]' ) {
						var array = [];
						array.push(object)
						return array;
					}
					else {
						if( Object.prototype.toString.call( object ) === '[object Array]' ) {
							return object;
						}
					}
				}

				// what if a gpml file ends in .xml, .XML or .GPML?
				// this should have a better test for being in GPML format.
				if (Right(url,4) == "gpml") {
					var sMyString = data;
					var oParser = new DOMParser();
					var oDOM = oParser.parseFromString(sMyString, "text/xml");

					var json = xml2json(oDOM, "");

					var parsedJson = jQuery.parseJSON(json);

					// It would be better to do this in the conversion file xml2json.js.

					// BiopaxRefs
					try {
						parsedJson.Pathway.BiopaxRefs = cleanJson( parsedJson.Pathway.BiopaxRef );
						delete parsedJson.Pathway.BiopaxRef;

						parsedJson.Pathway.BiopaxRefs.forEach(function(element, index, array) {
							// modify data
						});
					}
					catch (e) {
						console.log("No BiopaxRefs found.");
					}

					// Comments 
					try {
						parsedJson.Pathway.Comments = cleanJson( parsedJson.Pathway.Comment );
						delete parsedJson.Pathway.Comment;

						parsedJson.Pathway.Comments.forEach(function(element, index, array) {
							// modify data
						});
					}
					catch (e) {
						console.log("No Comments found.");
					}

					// DataNodes 
					try {
						parsedJson.Pathway.DataNodes = cleanJson( parsedJson.Pathway.DataNode );
						delete parsedJson.Pathway.DataNode;

						parsedJson.Pathway.DataNodes.forEach(function(element, index, array) {
							element.Graphics["x"] = parseFloat(element.Graphics["@CenterX"]) - parseFloat(element.Graphics["@Width"])/2;
							element.Graphics["y"] = parseFloat(element.Graphics["@CenterY"]) - parseFloat(element.Graphics["@Height"])/2;
							delete element.Graphics["@CenterX"];
							delete element.Graphics["@CenterY"];
							if (element.Graphics["@FillColor"]) {
								element.Graphics["@FillColor"] = "#" + element.Graphics["@FillColor"]
							}
							else {
								element.Graphics["@FillColor"] = "white";
							};	
							if (element.Graphics["@Color"]) {
								element.Graphics["@Color"] = "#" + element.Graphics["@Color"]
							}
							else {
								element.Graphics["@Color"] = "black";
							};	
						});
					}
					catch (e) {
						console.log("No DataNodes found.");
					}

					// Graphics
					try {
						parsedJson.Pathway.Graphics = cleanJson( parsedJson.Pathway.Graphics );

						parsedJson.Pathway.Graphics.forEach(function(element, index, array) {
							// modify data
						});
					}
					catch (e) {
						console.log("No Graphics found.");
					}

					// Groups
					try {
						parsedJson.Pathway.Groups = cleanJson( parsedJson.Pathway.Group );
						delete parsedJson.Pathway.Group;

						parsedJson.Pathway.Groups.forEach(function(element, index, array) {
							// modify data
						});
					}
					catch (e) {
						console.log("No Groups found.");
					}

					// Interactions
					try {
						parsedJson.Pathway.Interactions = cleanJson( parsedJson.Pathway.Interaction );
						delete parsedJson.Pathway.Interaction;

						parsedJson.Pathway.Interactions.forEach(function(element, index, array) {
							// modify data
						});
					}
					catch (e) {
						console.log("No Interactions found.");
					}

					// Labels
					try {
						parsedJson.Pathway.Labels = cleanJson( parsedJson.Pathway.Label );
						delete parsedJson.Pathway.Label;

						parsedJson.Pathway.Labels.forEach(function(element, index, array) {
							// modify data
						});
					}
					catch (e) {
						console.log("No Labels found.");
					}

					// Shapes
					try {
						parsedJson.Pathway.Shapes = cleanJson( parsedJson.Pathway.Shape );
						delete parsedJson.Pathway.Shape;

						parsedJson.Pathway.Shapes.forEach(function(element, index, array) {
							// modify data
						});
					}
					catch (e) {
						console.log("No Shapes found.");
					}

					$scope.Pathway = parsedJson.Pathway;
					console.log("$scope");
					console.log($scope);
				}
				else {
					alert("Pathvisio.js does not support this data format. Please convert to GPML and retry.")
				}
			});

		}
	}

	/* I would like to use $resource, but this isn't working now.
	   return $scope.pathway
	   return $resource('../samples/gpml/DatanodeShapes.gpml', {}, {
query: {method:'GET', headers:{'Content-Type':'text/xml'}}
});
*/
});

