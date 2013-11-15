'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  beforeEach(module('pathvisiojs.directives'));

  describe('drawing-board', function(elm, attrs) {
    it('should print correct height and width', function() {
      inject(function($compile, $rootScope) {
      var scope = $rootScope.$new();
      scope.Pathway = {};
      scope.Pathway.Graphics = {};
      scope.Pathway.Graphics["@BoardWidth"] = 500;
        var element = self.elementc = $compile('<svg id="drawingBoard" style="width:100%; height:100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" drawing-board></svg>')($rootScope);
	//console.log("element");
	//console.log(element[0].getBBox().width);
        expect(element[0].getBBox().width).toEqual(0);
      });
    });
  });
});
