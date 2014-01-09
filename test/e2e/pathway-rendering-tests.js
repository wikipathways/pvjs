'use strict';


function forElementToBePresent(findBy) {
  return function() {
    return ptor.isElementPresent(findBy);
  };
}

var ptor = protractor.getInstance();
ptor.ignoreSynchronization = true

var ptorWp1 = protractor.getInstance();
ptorWp1.ignoreSynchronization = true

var bodyElements, shapes, wp1, loadingIconBeforePathwayLoaded, loadingIconAfterPathwayLoaded,
  shapesInShapes, shapesInWp1;

function testTheCount(gpmlFile, elementName, expectedCount) {
  //console.log('elementName: ' + elementName);
  //console.log('expectedCount: ' + expectedCount);
  describe(gpmlFile, function() {
    it('should have ' + expectedCount + ' ' + elementName + 's', function() {
    });
  });
}

ptor.get("http://localhost:3000/test/compare.html?gpml=WP2545").
  then(function() {
    console.log('************** running anchors rendering test protocol...');
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    var expectedCount = 11; // should actually be higher, because anchors are nodes. but they aren't being drawn yet.
    testTheCount('anchors test protocol pathway', 'node', expectedCount);
    expect(element.all(by.css('#viewport .node')).count()).toEqual(expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 4;
    testTheCount('anchors', 'DataNode', expectedCount);
    expect(element.all(by.css('#viewport .data-node')).count()).toEqual(expectedCount);
    return 'success';
  }).
  /*
  then(function() {
    return expect(element.all(by.css('.metabolite')).count()).toEqual(2);
  }).
  //*/
  then(function() {
    var expectedCount = 4;
    expect(element.all(by.css('.shape')).count()).toEqual(expectedCount);
    testTheCount('anchors test protocol pathway', 'shape', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 1;
    expect(element.all(by.css('#viewport .info-box')).count()).toEqual(expectedCount);
    testTheCount('anchors test protocol pathway', 'info-box', expectedCount);
    return 'success';
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
    ptor.get("http://localhost:3000/test/compare.html?gpml=WP2605");
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
    var expectedCount = 6;
    expect(element.all(by.css('#viewport .node')).count()).toEqual(expectedCount);
    testTheCount('citations test protocol pathway', 'node', expectedCount);
    return 'success';
  }).
  then(function() {
    console.log('************** running shapes rendering test protocol...');
    ptor.get("http://localhost:3000/test/compare.html?gpml=WP2554");
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    var expectedCount = 31;
    expect(element.all(by.css('#viewport .node')).count()).toEqual(expectedCount);
    testTheCount('shapes test protocol pathway', 'node', expectedCount);
    return 'success';
  }).
  then(function() {
    console.log('************** attempting to render pathway "WP1"...');
    return ptor.get("http://localhost:3000/test/compare.html?gpml=WP1");
  }).
    /*
  then(function() {
    loadingIconBeforePathwayLoaded = element.all(by.css('#loading-icon'));
    //expect(loadingIconBeforePathwayLoaded.count()).toEqual(1);
    return 'success';
  }).
  //*/
  then(function() {
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    var expectedCount = 0;
    testTheCount('WP1 pathway', 'loading icon', expectedCount);
    expect(element.all(by.css('#loading-icon')).count()).toEqual(expectedCount);
    return 'success';
  });

describe('shapes', function() {
  it('should have 32 Shapes', function() {
  });
});
