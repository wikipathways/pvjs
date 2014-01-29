'use strict';


function forElementToBePresent(findBy) {
  return function() {
    return ptor.isElementPresent(findBy);
  };
}

var ptor = protractor.getInstance();
ptor.ignoreSynchronization = true;

var bodyElements, shapes, loadingIconBeforePathwayLoaded, loadingIconAfterPathwayLoaded,
  shapesInShapes;

var baseUri = 'http://localhost:3000/';

function testTheCount(gpmlFile, elementName, expectedCount) {
  //console.log('elementName: ' + elementName);
  //console.log('expectedCount: ' + expectedCount);
  describe(gpmlFile, function() {
    it('should have ' + expectedCount + ' ' + elementName + 's', function() {
    });
  });
}

describe('myTest', function() {
  it('should run', function() {
  });
});

ptor.get(baseUri + "test/development.html?gpml=" + baseUri + "test/data/protocol/WP2545.gpml.xml").
  then(function() {
    console.log('************** running anchors rendering test protocol...');
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    var expectedCount = 1;
    expect(element.all(by.css('#viewport .info-box')).count()).toEqual(expectedCount);
    testTheCount('anchors test protocol pathway', 'info-box', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 22; // includes anchors as nodes
    testTheCount('anchors test protocol pathway', 'node', expectedCount);
    expect(element.all(by.css('#viewport .node')).count()).toEqual(expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 10;
    testTheCount('anchors test protocol pathway', 'anchor', expectedCount);
    expect(element.all(by.css('#viewport .anchor')).count()).toEqual(expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 4;
    testTheCount('anchors test protocol pathway', 'DataNode', expectedCount);
    expect(element.all(by.css('#viewport .data-node')).count()).toEqual(expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 1;
    expect(element.all(by.css('#viewport .gene-product')).count()).toEqual(expectedCount);
    testTheCount('anchors test protocol pathway', 'gene-product', expectedCount);
    return 'sucess';
  }).
  then(function() {
    var expectedCount = 2;
    expect(element.all(by.css('#viewport .metabolite')).count()).toEqual(expectedCount);
    testTheCount('anchors test protocol pathway', 'metabolite', expectedCount);
    return 'sucess';
  }).
  then(function() {
    var expectedCount = 1;
    expect(element.all(by.css('#viewport .data-node.pathway')).count()).toEqual(expectedCount);
    testTheCount('anchors test protocol pathway', 'pathway (as data-node)', expectedCount);
    return 'sucess';
  }).
  then(function() {
    var expectedCount = 0;
    expect(element.all(by.css('#viewport .protein')).count()).toEqual(expectedCount);
    testTheCount('anchors test protocol pathway', 'protein', expectedCount);
    return 'sucess';
  }).
  then(function() {
    var expectedCount = 0;
    expect(element.all(by.css('#viewport .rna')).count()).toEqual(expectedCount);
    testTheCount('anchors test protocol pathway', 'rna', expectedCount);
    return 'sucess';
  }).
  then(function() {
    var expectedCount = 0;
    expect(element.all(by.css('#viewport .unknown')).count()).toEqual(expectedCount);
    testTheCount('anchors test protocol pathway', 'unknown', expectedCount);
    return 'sucess';
  }).
  then(function() {
    var expectedCount = 1;
    expect(element.all(by.css('#viewport .group-node')).count()).toEqual(expectedCount);
    testTheCount('anchors test protocol pathway', 'group', expectedCount);
    return 'sucess';
  }).
  then(function() {
    var expectedCount = 9;
    expect(element.all(by.css('#viewport .edge')).count()).toEqual(expectedCount);
    testTheCount('anchors test protocol pathway', 'edge', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 9;
    expect(element.all(by.css('#viewport .interaction')).count()).toEqual(expectedCount);
    testTheCount('anchors test protocol pathway', 'GPML Interaction', expectedCount);
    return 'success';
  }).
  then(function() {
    console.log('************** running citations rendering test protocol...');
    ptor.get(baseUri + "test/development.html?gpml=" + baseUri + "test/data/protocol/WP2605.gpml.xml");
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    // This is using the direction from APico that citations that apply to an entire pathway
    // are not to be displayed, so there are actually 6 citation list strings in this
    // pathway, but only 5 of them are element-specific.
    var expectedCount = 5;
    expect(element.all(by.css('#viewport .citation')).count()).toEqual(expectedCount);
    testTheCount('citations test protocol pathway', 'element-specific citation list string', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 9;
    expect(element.all(by.css('#viewport .node')).count()).toEqual(expectedCount);
    testTheCount('citations test protocol pathway', 'node', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 3;
    expect(element.all(by.css('#viewport .edge')).count()).toEqual(expectedCount);
    testTheCount('citations test protocol pathway', 'edge', expectedCount);
    return 'success';
  }).
  then(function() {
    console.log('************** running shapes rendering test protocol...');
    ptor.get(baseUri + "test/development.html?gpml=" + baseUri + "test/data/protocol/WP2554.gpml.xml");
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    var expectedCount = 31;
    expect(element.all(by.css('#viewport .node')).count()).toEqual(expectedCount);
    testTheCount('shapes test protocol pathway', 'node', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 0;
    expect(element.all(by.css('#viewport .edge')).count()).toEqual(expectedCount);
    testTheCount('shapes test protocol pathway', 'edge', expectedCount);
    return 'success';
  }).
  then(function() {
    console.log('************** running interactions rendering test protocol...');
    ptor.get(baseUri + "test/development.html?gpml=" + baseUri + "test/data/protocol/WP2557.gpml.xml");
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    return ptor.sleep(3 * 1000);
  }).
  then(function() {
    var expectedCount = 115; // DataNodes (66), Anchors (26), Shapes (1), Labels (22)
    expect(element.all(by.css('#viewport .node')).count()).toEqual(expectedCount);
    testTheCount('interactions test protocol pathway', 'node', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 62;
    expect(element.all(by.css('#viewport .edge')).count()).toEqual(expectedCount);
    testTheCount('interactions test protocol pathway', 'edge', expectedCount);
    return 'success';
  }).
  then(function() {
    console.log('************** running curves rendering test protocol...');
    ptor.get(baseUri + "test/development.html?gpml=" + baseUri + "test/data/protocol/curves.gpml.xml");
  }).
  then(function() {
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    var expectedCount = 51;
    expect(element.all(by.css('#viewport .node')).count()).toEqual(expectedCount);
    testTheCount('curves test protocol pathway', 'node', expectedCount);
    return 'success';
  }).
  then(function() {
    return ptor.sleep(5 * 1000);
  }).
  then(function() {
    var expectedCount = 23;
    expect(element.all(by.css('#viewport .edge')).count()).toEqual(expectedCount);
    testTheCount('curves test protocol pathway', 'edge', expectedCount);
    return 'success';
  }).
  then(function() {
    console.log('************** running elbows rendering test protocol...');
    ptor.get(baseUri + "test/development.html?gpml=" + baseUri + "test/data/protocol/elbows.gpml.xml");
  }).
  then(function() {
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    var expectedCount = 51;
    expect(element.all(by.css('#viewport .node')).count()).toEqual(expectedCount);
    testTheCount('elbows test protocol pathway', 'node', expectedCount);
    return 'success';
  }).
  then(function() {
    return ptor.sleep(5 * 1000);
  }).
  then(function() {
    var expectedCount = 23;
    expect(element.all(by.css('#viewport .edge')).count()).toEqual(expectedCount);
    testTheCount('elbows test protocol pathway', 'edge', expectedCount);
    return 'success';
  }).
  then(function() {
    console.log('************** running groups rendering test protocol...');
    ptor.get(baseUri + "test/development.html?gpml=" + baseUri + "test/data/protocol/WP2551.gpml.xml");
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    return ptor.sleep(5 * 1000);
  }).
  then(function() {
    var expectedCount = 31;
    expect(element.all(by.css('#viewport .node')).count()).toEqual(expectedCount);
    testTheCount('groups test protocol pathway', 'node', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 8;
    expect(element.all(by.css('#viewport .group-node')).count()).toEqual(expectedCount);
    testTheCount('groups test protocol pathway', 'groups, also called group-node', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 4;
    expect(element.all(by.css('#viewport .complex')).count()).toEqual(expectedCount);
    testTheCount('groups test protocol pathway', 'groups of type "complex"', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 1;
    expect(element.all(by.css('#viewport .group-node.group')).count()).toEqual(expectedCount);
    testTheCount('groups test protocol pathway', 'groups of type "group"', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 2;
    expect(element.all(by.css('#viewport .group-node.pathway')).count()).toEqual(expectedCount);
    testTheCount('groups test protocol pathway', 'groups of type "pathway"', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 1;
    expect(element.all(by.css('#viewport .group-node.none')).count()).toEqual(expectedCount);
    testTheCount('groups test protocol pathway', 'groups of type "none"', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 12;
    expect(element.all(by.css('#viewport .edge')).count()).toEqual(expectedCount);
    testTheCount('groups test protocol pathway', 'edge', expectedCount);
    return 'success';
  });



