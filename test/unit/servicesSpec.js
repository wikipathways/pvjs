'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('pathvisio.services'));

  describe('Pathway', function() {
    it('should not be null', inject(function(Pathway) {
	    expect(Pathway).not.toBe(null);
    }));
  });
});
