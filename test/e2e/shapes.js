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
    testTheCount('anchors.gpml', 'node', 3);
    expect(element.all(by.css('.node')).count()).toEqual(3);
    return 'success';
  }).
  then(function() {
    testTheCount('anchors.gpml', 'DataNode', 4);
    expect(element.all(by.css('.data-node')).count()).toEqual(4);
    return 'success';
  }).
  /*
  then(function() {
    return expect(element.all(by.css('.metabolite')).count()).toEqual(2);
  }).
  //*/
  then(function() {
    expect(element.all(by.css('.shape')).count()).toEqual(4);
    testTheCount('anchors.gpml', 'shape', 4);
    return 'success';
  }).
  then(function() {
    expect(element.all(by.css('.edge')).count()).toEqual(9);
    testTheCount('anchors.gpml', 'edge', 9);
    return 'success';
  }).
  then(function() {
    expect(element.all(by.css('.interaction')).count()).toEqual(9);
    testTheCount('anchors.gpml', 'GPML Interaction', 9);
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
    expect(element.all(by.css('.shape')).count()).toEqual(31);
    testTheCount('shapes.gpml', 'shape', 31);
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
    testTheCount('WP1', 'loading icon', 0);
    expect(element.all(by.css('#loading-icon')).count()).toEqual(0);
    return 'success';
  });

describe('shapes.gpml', function() {
  it('should have 31 Shapes', function() {
  });
});
