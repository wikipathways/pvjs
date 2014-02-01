'use strict';

function forElementToBePresent(findBy) {
  return function() {
    return ptor.isElementPresent(findBy);
  };
}

function testElementCount(pathwayName, elementName, element, selector) {
  //console.log('elementName: ' + elementName);
  //console.log('expectedCount: ' + expectedCount);
  
  var expectedCount = testPathwayData[pathwayName][elementName + 'Count'];

  if (expectedCount > 0) {
    ptor.findElements(protractor.By.css(selector)).
    then(function(arr){
      var length=arr.length; //length
      describe(pathwayName + ' test protocol pathway', function() {
        it('should have ' + expectedCount + ' ' + elementName + 's', function() {
          expect(length).toEqual(expectedCount);
        });
      });
    });
  }
}

function testPathway(pathwayName) {
  var expectedCount;

  var uri = baseUri + pathwayName;

  ptor.get(uri).
  then(function() {
    return ptor.wait(forElementToBePresent(by.css('svg')), 30 * 1000);
  }).
  then(function() {
    console.log('Running ' + pathwayName + ' rendering test protocol...');
    testElementCount(pathwayName, 'InfoBox', element, '#viewport .info-box');
    testElementCount(pathwayName, 'EdgeAnchor', element, '#viewport .anchor');
    testElementCount(pathwayName, 'DataNode', element, '#viewport .data-node');
    testElementCount(pathwayName, 'DataNodeGeneProduct', element, '#viewport .gene-product');
    testElementCount(pathwayName, 'DataNodeMetabolite', element, '#viewport .metabolite');
    testElementCount(pathwayName, 'DataNodePathway', element, '#viewport .data-node.pathway');
    testElementCount(pathwayName, 'DataNodeProtein', element, '#viewport .protein');
    testElementCount(pathwayName, 'DataNodeRna', element, '#viewport .rna');
    testElementCount(pathwayName, 'DataNodeUnknown', element, '#viewport .unknown');
    testElementCount(pathwayName, 'Group', element, '#viewport .group-node');
    testElementCount(pathwayName, 'Edge', element, '#viewport .edge');
    testElementCount(pathwayName, 'GraphicalLine', element, '#viewport .graphical-line');
    testElementCount(pathwayName, 'Interaction', element, '#viewport .interaction');
  });
}

var ptor = protractor.getInstance();
ptor.ignoreSynchronization = true;

// TODO get this from the config or Grunt files
var baseUri = 'http://wikipathways.org/index.php/Pathway:';

var testPathwayData = require('../data/protocol/wp-counts.json');

for (var pathwayName in testPathwayData) {
  describe(pathwayName, function() {
    it('should render', function() {
    });
  });
  testPathway(pathwayName);
}
