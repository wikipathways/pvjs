'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('wikipathways version', function() {

  beforeEach(function() {
    browser().navigateTo('/samples/wikipathways-version/index.html');
  });

    it('should have 1 body when user navigates to samples/wikipathways-version/', function() {
      expect(element('body').count()).toEqual(1);
    });

    it('should have 1 iframe#pathwayFrame when user navigates to samples/wikipathways-version/', function() {
      expect(element('iframe#pathwayFrame').count()).toEqual(1);
    });

});

describe('viewer', function() {

  beforeEach(function() {
    browser().navigateTo('/app/index.html#/?wgTitle=WP673&wgCurRevisionId=63184');
  });

    it('should have 1 svg#drawingBoard', function() {
      expect(element('svg#drawingBoard').count()).toEqual(1);
    });

    it('should have 2 Metabolites', function() {
      expect(element('g.Metabolite').count()).toEqual(2);
    });

    it('should have 5 Pathways', function() {
      expect(element('g.Pathway').count()).toEqual(5);
    });

    it('should have 68 GeneProducts', function() {
      expect(element('g.GeneProduct').count()).toEqual(68);
    });

    it('should have an svg#drawingBoard with height equal to the height of the body', function() {
	    element('body').query(function(body, done) {
	      expect(element('#drawingBoard').height()).toEqual(body.height());
	      done();
	    });
    });
});
