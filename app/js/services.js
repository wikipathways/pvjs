'use strict';

/* Services */

// If don't use resouce, I can get rid of ngResource here
//angular.module('pathvisio.services', ['ngResource'])
angular.module('pathvisio.services', [])
.factory('PathwayService', function($location, $http){
	return {
		// $scope is required, but url is optional
		getData: function($scope, url) {
			// maybe it would be better to use a try catch here to see whether url is found
			if (!(url)) {
				if (!($location.search().wgTitle)) {
					var url = "../samples/gpml/error.gpml";
				}
				else {
					var url = "../samples/gpml/" + $location.search().wgTitle + "_" + $location.search().wgCurRevisionId  + ".gpml";
				}
			};
			function getDataFile(url, callback) {
				$http.get(url).success(function(data) {
					return callback(data);
				})
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
				// what if a gpml file ends in .xml, .XML or .GPML?
				// this should have a better test for being in GPML format.
				if (Right(url,4) == "gpml") {
					var sMyString = data;
					var oParser = new DOMParser();
					var oDOM = oParser.parseFromString(sMyString, "text/xml");

					var json = xml2json(oDOM, "");

					var parsedJson = self.parsedJson = jQuery.parseJSON(json);

					// It would be better to do this in the conversion file xml2json.js.
					// check on dealing with interactions.
					parsedJson.Pathway.DataNodes = parsedJson.Pathway.DataNode;
					delete parsedJson.Pathway.DataNode;
					parsedJson.Pathway.Comments = parsedJson.Pathway.Comment;
					delete parsedJson.Pathway.Comment;
					parsedJson.Pathway.Groups = parsedJson.Pathway.Group;
					delete parsedJson.Pathway.Group;
					parsedJson.Pathway.Labels = parsedJson.Pathway.Label;
					delete parsedJson.Pathway.Label;
					parsedJson.Pathway.Lines = parsedJson.Pathway.Line;
					delete parsedJson.Pathway.Line;

					console.log(parsedJson);


					try {
						if( Object.prototype.toString.call( parsedJson.Pathway.DataNodes ) === '[object Array]' ) {
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
						else {
							if (Object.prototype.toString.call( parsedJson.Pathway.DataNodes ) === '[object Object]' ) {
								parsedJson.Pathway.DataNodes.Graphics["x"] = parseFloat(parsedJson.Pathway.DataNodes.Graphics["@CenterX"]) - parseFloat(parsedJson.Pathway.DataNodes.Graphics["@Width"])/2;
								parsedJson.Pathway.DataNodes.Graphics["y"] = parseFloat(parsedJson.Pathway.DataNodes.Graphics["@CenterY"]) - parseFloat(parsedJson.Pathway.DataNodes.Graphics["@Height"])/2;
								delete parsedJson.Pathway.DataNodes.Graphics["@CenterX"];
								delete parsedJson.Pathway.DataNodes.Graphics["@CenterY"];
								if (parsedJson.Pathway.DataNodes.Graphics["@FillColor"]) {
									parsedJson.Pathway.DataNodes.Graphics["@FillColor"] = "#" + parsedJson.Pathway.DataNodes.Graphics["@FillColor"]
								}
								else {
									parsedJson.Pathway.DataNodes.Graphics["@FillColor"] = "white";
								};	
								if (parsedJson.Pathway.DataNodes.Graphics["@Color"]) {
									parsedJson.Pathway.DataNodes.Graphics["@Color"] = "#" + parsedJson.Pathway.DataNodes.Graphics["@Color"]
								}
								else {
									parsedJson.Pathway.DataNodes.Graphics["@Color"] = "black";
								};	
							}
						}
					}
					catch (e) {
						alert("Error parsing DataNodes.");
					}
					finally {
					   //finally_statements
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

