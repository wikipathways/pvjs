'use strict';

/* Services */

// If don't use resouce, I can get rid of ngResource here
//angular.module('pathvisio.services', ['ngResource'])
angular.module('pathvisio.services', [])
.factory('Pathway', function($location, $http){
	return {
		// $scope is required, but url is optional
		getData: function($scope, url) {
			// maybe it would be better to use a try catch here to see whether url is found
			if (!(url)) {
				if (!($location.search().wgTitle)) {
					// should replace this with an error message, possibly in the form of a custom gpml file
					var url = "../samples/gpml/DatanodeShapes.gpml";
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
				// what is the file ends in .xml, .XML or .GPML?
				if (Right(url,4) == "gpml") {
					var sMyString = data;
					var oParser = new DOMParser();
					var oDOM = oParser.parseFromString(sMyString, "text/xml");

					var json = xml2json(oDOM, "");

					var parsedJson = jQuery.parseJSON(json);

					parsedJson.Pathway.DataNode.forEach(function(element, index, array) {
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

					$scope.Pathway = parsedJson.Pathway;
				}
				else {
					console.log("file type error")
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

