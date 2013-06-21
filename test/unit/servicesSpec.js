'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('pathvisio.services'));

  describe('PathwayService', function() {
    it('should not be null', inject(function(PathwayService) {
	    console.log("PathwayService.getData()");
	    console.log(PathwayService.getData());
	    expect(PathwayService.getData()).not.toBe(null);
    }));
  });
});
