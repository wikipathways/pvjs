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

function testTheCount(gpmlFile, gpmlElementName, expectedCount) {
  console.log('*************');
  console.log('gpmlFile');
  console.log(gpmlFile);
  console.log('gpmlElementName');
  console.log(gpmlElementName);
  console.log('expectedCount');
  console.log(expectedCount);
  describe(gpmlFile, function() {
    it('should have ' + expectedCount + ' ' + gpmlElementName + 's', function() {
      console.log('tested=============================');
    });
  });
}

ptor.get("http://127.0.0.1/~andersriutta/pathvisiojs/test/compare.html?gpml=http://127.0.0.1/~andersriutta/pathvisiojs/test/gpml/anchors.gpml").
  then(function() {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^anchors.gpml');
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    var expectedCount = 3;
    testTheCount('anchors.gpml', 'node', expectedCount);
    expect(element.all(by.css('.node')).count()).toEqual(expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 4;
    testTheCount('anchors.gpml', 'DataNode', expectedCount);
    expect(element.all(by.css('.data-node')).count()).toEqual(expectedCount);
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
    testTheCount('anchors.gpml', 'shape', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 9;
    expect(element.all(by.css('.edge')).count()).toEqual(expectedCount);
    testTheCount('anchors.gpml', 'edge', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 9;
    expect(element.all(by.css('.interaction')).count()).toEqual(expectedCount);
    testTheCount('anchors.gpml', 'GPML Interaction', expectedCount);
    return 'success';
  }).
  then(function() {
    return ptor.get("http://127.0.0.1/~andersriutta/pathvisiojs/test/compare.html?gpml=http://127.0.0.1/~andersriutta/pathvisiojs/test/gpml/shapes.gpml");
  }).
  then(function() {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^shapes.gpml');
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    var expectedCount = 31;
    expect(element.all(by.css('.shape')).count()).toEqual(expectedCount);
    testTheCount('shapes.gpml', 'shape', expectedCount);
    return 'success';
  }).
  then(function() {
    return ptor.get("http://127.0.0.1/~andersriutta/pathvisiojs/test/compare.html?gpml=WP1");
  }).
  then(function() {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^WP1');
    loadingIconBeforePathwayLoaded = element.all(by.css('#loading-icon'));
    //expect(loadingIconBeforePathwayLoaded.count()).toEqual(1);
    return 'success';
  }).
  then(function() {
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    var expectedCount = 0;
    testTheCount('WP1', 'loading icon', expectedCount);
    expect(element.all(by.css('#loading-icon')).count()).toEqual(expectedCount);
    return 'success';
  });

describe('shapes.gpml', function() {
  it('should have 31 Shapes', function() {
  });
});
