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

ptor.get("http://localhost:3000/test/compare.html?gpml=WP2545").
  then(function() {
    console.log('************** testing anchors **************');
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    var expectedCount = 3;
    testTheCount('anchors', 'node', expectedCount);
    expect(element.all(by.css('.node')).count()).toEqual(expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 4;
    testTheCount('anchors', 'DataNode', expectedCount);
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
    testTheCount('anchors', 'shape', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 1;
    expect(element.all(by.css('.info-box')).count()).toEqual(expectedCount);
    testTheCount('anchors', 'info-box', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 9;
    expect(element.all(by.css('.edge')).count()).toEqual(expectedCount);
    testTheCount('anchors', 'edge', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 9;
    expect(element.all(by.css('.interaction')).count()).toEqual(expectedCount);
    testTheCount('anchors', 'GPML Interaction', expectedCount);
    return 'success';
  }).
  then(function() {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^citations');
    ptor.get("http://localhost:3000/test/compare.html?gpml=WP2605");
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    // This is using the direction from APico that citations that apply to an entire pathway
    // are not to be displayed.
    var expectedCount = 5;
    expect(element.all(by.css('.citation')).count()).toEqual(expectedCount);
    testTheCount('citations', 'citation', expectedCount);
    return 'success';
  }).
  then(function() {
    var expectedCount = 3;
    expect(element.all(by.css('.node')).count()).toEqual(expectedCount);
    testTheCount('citations', 'node', expectedCount);
    return 'success';
  }).
  then(function() {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^shapes');
    ptor.get("http://localhost:3000/test/compare.html?gpml=WP2554");
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 30 * 1000);
  }).
  then(function() {
    var expectedCount = 32;
    expect(element.all(by.css('.shape')).count()).toEqual(expectedCount);
    testTheCount('shapes', 'shape', expectedCount);
    return 'success';
  }).
  then(function() {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^WP1');
    return ptor.get("http://localhost:3000/test/compare.html?gpml=WP1");
  }).
  then(function() {
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

describe('shapes', function() {
  it('should have 32 Shapes', function() {
  });
});
