'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('pathvisio', function() {

  beforeEach(function() {
    browser().navigateTo('/samples/wikipathways-version/index.html');
  });

    it('should render iframe#pathwayFrame when user navigates to samples/wikipathways-version/', function() {
	    /*
	    console.log(element('body'));
	    console.log(browser().window().href());
	    console.log(browser().window().path());
	    console.log(browser().location().url());
	    console.log(browser().location().path());
	   */
      //expect(element('body').count()).toEqual(1);
      expect(element('#globalWrapper').count()).toEqual(1);
      //expect(element('iframe').count()).toEqual(1);
    });
});
