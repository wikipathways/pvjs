/**
 * Test public APIs
 */

var fs = require('fs');
var jsdom = require('mocha-jsdom')
var expect = require('chai').expect;
var pvjson = require('../inputs/WP1_73346.json');
var sinon = require('sinon');
var sologger = require('../sologger.js');

//process.env.NODE_ENV = 'development';

/* global describe, it, before, expect */
require('./setup')

// Run tests
describe('Public API', function() {
  var $;
  var d3;
  var Kaavio;
  var m;

  before(function() {
    //require('../../dist/kaavio-dev-polyfills.bundle.js');
    $ = window.$ = require('jquery');
    d3 = window.d3 = require('d3');
    m = window.m = require('mithril');
    require('../../index.js');
    Kaavio = window.Kaavio;
  });

  it('init', function() {
    var containerElement = document.createElement('div');
    document.body.appendChild(containerElement);
    var kaavioInstance = new Kaavio(containerElement, {
      pvjson: pvjson
    });
    expect(kaavioInstance).to.be.instanceof(Kaavio);
    expect(kaavioInstance).to.respondTo('init');
  });

  it('mount', function() {
    var containerElement = document.createElement('div');
    document.body.appendChild(containerElement);
    var kaavioInstance = new Kaavio(containerElement, {
      pvjson: pvjson
    });
    m.mount(containerElement, kaavioInstance);
    var kaavioElement = document.querySelector('.kaavio-container');
    expect(kaavioElement.tagName).to.equal('DIV');
  });

});
