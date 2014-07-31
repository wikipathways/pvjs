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

  var uri = baseUri + "test/one-diagram.html?gpml=" + baseUri + "test/data/protocol/" + pathwayName + ".gpml" ;

  ptor.get(uri).
  then(function() {
    return ptor.wait(forElementToBePresent(by.css('#viewport')), 30 * 1000);
  }).
  then(function() {
    //console.log('Running ' + pathwayName + ' rendering test protocol...');
    testElementCount(pathwayName, 'InfoBox', element, '#viewport .info-box');
    testElementCount(pathwayName, 'gpml:Anchor', element, '#viewport [typeof~="gpml:Anchor"]');
    testElementCount(pathwayName, 'gpml:DataNode', element, '#viewport [typeof~="gpml:DataNode"]');
    testElementCount(pathwayName, 'gpml:GeneProduct', element, '#viewport [typeof~="gpml:GeneProduct"]');
    testElementCount(pathwayName, 'gpml:Metabolite', element, '#viewport [typeof~="gpml:Metabolite"]');
    testElementCount(pathwayName, 'gpml:Pathway', element, '#viewport [typeof~="gpml:DataNode"] + [typeof~="gpml:Pathway"]');
    testElementCount(pathwayName, 'gpml:Protein', element, '#viewport [typeof~="gpml:Protein"]');
    testElementCount(pathwayName, 'gpml:Rna', element, '#viewport [typeof~="gpml:Rna"]');
    testElementCount(pathwayName, 'gpml:Unknown', element, '#viewport [typeof~="gpml:Unknown"]');
    testElementCount(pathwayName, 'gpml:Group', element, '#viewport [typeof~="gpml:Group"]');
    //testElementCount(pathwayName, 'Edge', element, '#viewport .edge');
    testElementCount(pathwayName, 'gpml:GraphicalLine', element, '#viewport [typeof~="gpml:GraphicalLine"]');
    testElementCount(pathwayName, 'gpml:Interaction', element, '#viewport [typeof~="gpml:Interaction"]');
  });
}

var ptor = protractor.getInstance();
ptor.ignoreSynchronization = true;

// TODO get this from the config or Grunt files
var baseUri = 'http://localhost:3000/';

var testPathwayData = {
    "minimal": {
        "DataNodeMetaboliteCount": 3,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 1,
        "EdgeCount": 10,
        "ShapeCount": 54,
        "GroupCount": 1,
        "GraphicalLineCount": 2,
        "InteractionCount": 8,
        "DataNodePathwayCount": 1,
        "DataNodeProteinCount": 1,
        "DataNodeUnknownCount": 1,
        "DataNodeCount": 11,
        "LabelCount": 1,
        "EdgeAnchorCount": 2,
        "NodeCount": 48,
        "DataNodeGeneProductCount": 4
    }
};

for (var pathwayName in testPathwayData) {
  describe(pathwayName, function() {
    it('should render', function() {
    });
  });
  testPathway(pathwayName);
}
