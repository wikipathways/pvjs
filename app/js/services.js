'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('pathvisio.services', ['ngResource'])
	.value('pathwayService', 'pathwaytext')
	.factory('Pathway', function($location, $http){
	   return {
	       getSource: function(callback) {
		  //var url = $location.search().dataSrc;
		  if (!($location.search().wgTitle)) {
			  var url = "../samples/gpml/WP673_63184.gpml";
		  }
		  else {
			  var url = "../samples/gpml/" + $location.search().wgTitle + "_" + $location.search().wgCurRevisionId  + ".gpml";
		  };
		  return $http.get(url).success(function(data) {
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

