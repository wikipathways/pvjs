'use strict';

/* Services */

angular.module('pathvisio.services', ['ngResource'])
.factory('Pathway', function($location, $http){
	return {
		getData: function($scope) {
			if (!($location.search().wgTitle)) {
				var url = "../samples/gpml/WP673_63184.gpml";
			}
			else {
				var url = "../samples/gpml/" + $location.search().wgTitle + "_" + $location.search().wgCurRevisionId  + ".gpml";
			};
			function getDataFile(url, callback) {
				$http.get(url).success(function(data) {
					return callback(data);
				})
			}
			getDataFile(url, function(data) {
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
				if (Right(url,4) == "gpml") {
					var sMyString = data;
					var oParser = new DOMParser();
					var oDOM = oParser.parseFromString(sMyString, "text/xml");

					var json = xml2json(oDOM, "");

					var pathway = jQuery.parseJSON(json);

					pathway.Pathway.DataNode.forEach(function(element, index, array) {
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

					$scope.pathways = pathway;
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

