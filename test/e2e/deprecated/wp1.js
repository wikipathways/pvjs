'use strict';

function forElementToBePresent(findBy) {
  return function() {
    return ptor.isElementPresent(findBy);
  };
}

var ptor = protractor.getInstance();
ptor.ignoreSynchronization = true

var bodyElements, shapes, wp1, loadingIconBeforePathwayLoaded, loadingIconAfterPathwayLoaded, shapesInShapes, shapesInWp1, svg;

ptor.get('http://127.0.0.1/~andersriutta/pathvisiojs/test/').
  then(function() {
    return ptor.get("http://127.0.0.1/~andersriutta/pathvisiojs/test/compare.html?gpml=http://127.0.0.1/~andersriutta/pathvisiojs/test/gpml/shapes.gpml");
  }).
  then(function() {
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 15 * 1000);
  }).
  then(function() {
    loadingIconAfterPathwayLoaded = element.all(by.css('#loading-icon'));
    return loadingIconAfterPathwayLoaded;
  }).
  then(function() {
    svg = element.all(by.css('svg#pathvisiojs-diagram'));
    expect(svg.count()).toEqual(1);
    return svg;
  }).
  then(function() {
    shapesInShapes = element.all(by.css('.shape'));
    expect(shapesInShapes.count()).toEqual(31);
    return shapesInShapes;
  }).
  then(function(q) {
    ptor.get("http://127.0.0.1/~andersriutta/pathvisiojs/test/compare.html?gpml=WP1");
    loadingIconBeforePathwayLoaded = element.all(by.css('#loading-icon'));
    //expect(loadingIconBeforePathwayLoaded.count()).toEqual(1);
    return loadingIconBeforePathwayLoaded;
  }).
  then(function() {
    return ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 15 * 1000);
  }).
  then(function() {
    shapesInWp1 = element.all(by.css('.shape'));
    expect(shapesInWp1.count()).toEqual(6);
    return shapesInWp1;
  });

describe('a pathway widget page', function() {
  ptor.wait(forElementToBePresent(by.css('#pathvisiojs-is-loaded')), 15 * 1000);
  it('should have a body element', function() {
    expect(shapesInWp1.count()).toEqual(6);
  });
});


