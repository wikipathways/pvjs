'use strict';



/* Controllers */
angular.module('myApp.controllers', [])
.controller('HomeCtrl', [function() {

}])
.controller('PathwayCtrl', ['$scope', 'Pathway', function($scope, Pathway) {
	// I would like to put this code in the service, but doing so gave me errors.
	$scope.pathways = Pathway.getSource(function(data) {
		var sMyString = data;
		var oParser = new DOMParser();
		var oDOM = oParser.parseFromString(sMyString, "text/xml");

		var json = self.json = xml2json(oDOM, "");

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
		$scope.editable = false;
		return pathway;
	
	}
					   );
}])


