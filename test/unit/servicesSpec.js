'use strict';

/* jasmine specs for services go here */

describe('service', function() {
	beforeEach(module('pathvisio.services'));
	beforeEach(inject(function($rootScope) {

		describe('PathwayService', function() {
			it('should not be null', inject(function(PathwayService) {
				console.log("PathwayService.getData()");
				console.log(PathwayService.getData());
				console.log(PathwayService.getData($scope));
				expect(PathwayService.getData()).not.toBe(null);
			}));
		});
	});
});
