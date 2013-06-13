'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource'])
	.value('pathwayService', 'pathwaytext')
	.value('drawingParameters', {editable:false, enablePan:1, enableZoom:0, enableDrag:0, zoomScale:0.2 })
	.factory('Pathway', function($location, $http){
	   return {
	       getSource: function(callback) {
		  //var url = $location.search().dataSrc;
		  var url = "../samples/gpml/" + $location.search().wgTitle + "_" + $location.search().wgCurRevisionId  + ".gpml";
		  console.log(url)
		  $http.get(url).success(function(data) {
		     callback(data);
		  })
	       }
	   }

	/* I would like to use $resource, but this isn't working now.
	return $scope.pathway
		return $resource('../samples/gpml/DatanodeShapes.gpml', {}, {
			query: {method:'GET', headers:{'Content-Type':'text/xml'}}
		});
	       */
});

