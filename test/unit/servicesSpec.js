'use strict';

/* jasmine specs for services go here */

describe('service', function() {
	beforeEach(module('pathvisio.services'));
	beforeEach(inject(function($rootScope) {

		describe('PathwayService', function() {
			it('should not be null', inject(function(PathwayService) {
				$scope = $rootScope.$new();
				console.log("PathwayService.getData()");
				console.log(PathwayService.getData());
				console.log(PathwayService.getData($scope, "https://raw.github.com/wikipathways/pathvisio/dev/samples/gpml/WP254_63143.gpml"));
				expect(PathwayService.getData()).not.toBe(null);
			}));
		});
	}));
});
