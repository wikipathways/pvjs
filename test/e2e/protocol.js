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
        it('should have ' + expectedCount + ' ' + elementName + '(s)', function() {
          expect(length).toEqual(expectedCount);
        });
      });
    });
  }
}

function testPathway(pathwayName) {
  var expectedCount;

  var uri = baseUri + "test/one-diagram.html?gpml=" + baseUri + "test/data/protocol/" + pathwayName + ".gpml.xml" ;

  ptor.get(uri).
  then(function() {
    return ptor.wait(forElementToBePresent(by.css('#viewport .info-box')), 30 * 1000);
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
    "elbows": {
        "DataNodeMetaboliteCount": 0,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 0,
        "AnchorCount": 576,
        "EdgeCount": 23,
        "ShapeCount": 0,
        "GroupCount": 0,
        "NodeAnchorCount": 576,
        "GraphicalLineCount": 0,
        "InteractionCount": 23,
        "DataNodePathwayCount": 0,
        "DataNodeProteinCount": 0,
        "DataNodeUnknownCount": 0,
        "DataNodeCount": 46,
        "LabelCount": 2,
        "EdgeAnchorCount": 0,
        "NodeCount": 48,
        "DataNodeGeneProductCount": 46
    },
    "anchors": {
        "DataNodeMetaboliteCount": 2,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 0,
        "AnchorCount": 82,
        "EdgeCount": 9,
        "ShapeCount": 1,
        "GroupCount": 1,
        "NodeAnchorCount": 72,
        "GraphicalLineCount": 0,
        "InteractionCount": 9,
        "DataNodePathwayCount": 1,
        "DataNodeProteinCount": 0,
        "DataNodeUnknownCount": 0,
        "DataNodeCount": 4,
        "LabelCount": 0,
        "EdgeAnchorCount": 10,
        "NodeCount": 6,
        "DataNodeGeneProductCount": 1
    },
    "interactions": {
        "DataNodeMetaboliteCount": 1,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 0,
        "AnchorCount": 1058,
        "EdgeCount": 72,
        "ShapeCount": 1,
        "GroupCount": 0,
        "NodeAnchorCount": 1032,
        "GraphicalLineCount": 0,
        "InteractionCount": 72,
        "DataNodePathwayCount": 0,
        "DataNodeProteinCount": 0,
        "DataNodeUnknownCount": 0,
        "DataNodeCount": 66,
        "LabelCount": 19,
        "EdgeAnchorCount": 26,
        "NodeCount": 86,
        "DataNodeGeneProductCount": 65
    },
    "text": {
        "DataNodeMetaboliteCount": 0,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 0,
        "AnchorCount": 528,
        "EdgeCount": 0,
        "ShapeCount": 0,
        "GroupCount": 0,
        "NodeAnchorCount": 528,
        "GraphicalLineCount": 0,
        "InteractionCount": 0,
        "DataNodePathwayCount": 0,
        "DataNodeProteinCount": 0,
        "DataNodeUnknownCount": 0,
        "DataNodeCount": 0,
        "LabelCount": 44,
        "EdgeAnchorCount": 0,
        "NodeCount": 44,
        "DataNodeGeneProductCount": 0
    },
    "graphical-lines": {
        "DataNodeMetaboliteCount": 0,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 0,
        "AnchorCount": 228,
        "EdgeCount": 10,
        "ShapeCount": 1,
        "GroupCount": 0,
        "NodeAnchorCount": 228,
        "GraphicalLineCount": 10,
        "InteractionCount": 0,
        "DataNodePathwayCount": 0,
        "DataNodeProteinCount": 0,
        "DataNodeUnknownCount": 0,
        "DataNodeCount": 8,
        "LabelCount": 10,
        "EdgeAnchorCount": 0,
        "NodeCount": 19,
        "DataNodeGeneProductCount": 8
    },
    "size-and-proportion": {
        "DataNodeMetaboliteCount": 0,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 0,
        "AnchorCount": 192,
        "EdgeCount": 16,
        "ShapeCount": 12,
        "GroupCount": 0,
        "NodeAnchorCount": 192,
        "GraphicalLineCount": 16,
        "InteractionCount": 0,
        "DataNodePathwayCount": 0,
        "DataNodeProteinCount": 0,
        "DataNodeUnknownCount": 0,
        "DataNodeCount": 0,
        "LabelCount": 4,
        "EdgeAnchorCount": 0,
        "NodeCount": 16,
        "DataNodeGeneProductCount": 0
    },
    "curves": {
        "DataNodeMetaboliteCount": 0,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 0,
        "AnchorCount": 576,
        "EdgeCount": 23,
        "ShapeCount": 0,
        "GroupCount": 0,
        "NodeAnchorCount": 576,
        "GraphicalLineCount": 0,
        "InteractionCount": 23,
        "DataNodePathwayCount": 0,
        "DataNodeProteinCount": 0,
        "DataNodeUnknownCount": 0,
        "DataNodeCount": 46,
        "LabelCount": 2,
        "EdgeAnchorCount": 0,
        "NodeCount": 48,
        "DataNodeGeneProductCount": 46
    },
    "shapes": {
        "DataNodeMetaboliteCount": 0,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 0,
        "AnchorCount": 864,
        "EdgeCount": 0,
        "ShapeCount": 45,
        "GroupCount": 7,
        "NodeAnchorCount": 864,
        "GraphicalLineCount": 0,
        "InteractionCount": 0,
        "DataNodePathwayCount": 0,
        "DataNodeProteinCount": 0,
        "DataNodeUnknownCount": 0,
        "DataNodeCount": 18,
        "LabelCount": 2,
        "EdgeAnchorCount": 0,
        "NodeCount": 72,
        "DataNodeGeneProductCount": 18
    },
    "z-index": {
        "DataNodeMetaboliteCount": 0,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 0,
        "AnchorCount": 254,
        "EdgeCount": 3,
        "ShapeCount": 11,
        "GroupCount": 0,
        "NodeAnchorCount": 252,
        "GraphicalLineCount": 0,
        "InteractionCount": 3,
        "DataNodePathwayCount": 0,
        "DataNodeProteinCount": 0,
        "DataNodeUnknownCount": 0,
        "DataNodeCount": 2,
        "LabelCount": 8,
        "EdgeAnchorCount": 2,
        "NodeCount": 21,
        "DataNodeGeneProductCount": 2
    },
    "citations": {
        "DataNodeMetaboliteCount": 1,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 0,
        "AnchorCount": 48,
        "EdgeCount": 3,
        "ShapeCount": 1,
        "GroupCount": 0,
        "NodeAnchorCount": 48,
        "GraphicalLineCount": 0,
        "InteractionCount": 3,
        "DataNodePathwayCount": 1,
        "DataNodeProteinCount": 0,
        "DataNodeUnknownCount": 0,
        "DataNodeCount": 3,
        "LabelCount": 0,
        "EdgeAnchorCount": 0,
        "NodeCount": 4,
        "DataNodeGeneProductCount": 1
    },
    "gpml-data-nodes": {
        "DataNodeMetaboliteCount": 4,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 4,
        "AnchorCount": 336,
        "EdgeCount": 0,
        "ShapeCount": 2,
        "GroupCount": 0,
        "NodeAnchorCount": 336,
        "GraphicalLineCount": 0,
        "InteractionCount": 0,
        "DataNodePathwayCount": 4,
        "DataNodeProteinCount": 4,
        "DataNodeUnknownCount": 4,
        "DataNodeCount": 24,
        "LabelCount": 2,
        "EdgeAnchorCount": 0,
        "NodeCount": 28,
        "DataNodeGeneProductCount": 4
    },
    "fill-and-stroke": {
        "DataNodeMetaboliteCount": 5,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 0,
        "AnchorCount": 756,
        "EdgeCount": 12,
        "ShapeCount": 10,
        "GroupCount": 5,
        "NodeAnchorCount": 756,
        "GraphicalLineCount": 12,
        "InteractionCount": 0,
        "DataNodePathwayCount": 10,
        "DataNodeProteinCount": 0,
        "DataNodeUnknownCount": 0,
        "DataNodeCount": 25,
        "LabelCount": 23,
        "EdgeAnchorCount": 0,
        "NodeCount": 63,
        "DataNodeGeneProductCount": 10
    },
    "groups": {
        "DataNodeMetaboliteCount": 2,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 1,
        "AnchorCount": 327,
        "EdgeCount": 12,
        "ShapeCount": 0,
        "GroupCount": 8,
        "NodeAnchorCount": 324,
        "GraphicalLineCount": 1,
        "InteractionCount": 11,
        "DataNodePathwayCount": 2,
        "DataNodeProteinCount": 2,
        "DataNodeUnknownCount": 1,
        "DataNodeCount": 15,
        "LabelCount": 4,
        "EdgeAnchorCount": 3,
        "NodeCount": 27,
        "DataNodeGeneProductCount": 7
    },
    "gpml-labels": {
        "DataNodeMetaboliteCount": 0,
        "InfoBoxCount": 1,
        "DataNodeRnaCount": 0,
        "AnchorCount": 528,
        "EdgeCount": 0,
        "ShapeCount": 0,
        "GroupCount": 0,
        "NodeAnchorCount": 528,
        "GraphicalLineCount": 0,
        "InteractionCount": 0,
        "DataNodePathwayCount": 0,
        "DataNodeProteinCount": 0,
        "DataNodeUnknownCount": 0,
        "DataNodeCount": 0,
        "LabelCount": 44,
        "EdgeAnchorCount": 0,
        "NodeCount": 44,
        "DataNodeGeneProductCount": 0
    }
};

for (var pathwayName in testPathwayData) {
  describe(pathwayName, function() {
    it('should render', function() {
    });
  });
  testPathway(pathwayName);
}
