/**
 * Test public APIs
 */

var fs = require('fs');
var jsdom = require('mocha-jsdom');
var expect = require('chai').expect;
var customMockserver = require('../custom-mockserver.js');
var sinon = require('sinon');
var sologger = require('../sologger.js');

//process.env.NODE_ENV = 'development';

/* global describe, it, before, expect */
require('./setup');

// Run tests
describe('Public API', function() {
  var d3;
  var Kaavio;
  var kaavioEditor;
  var m;
  var Pvjs;

  before(function() {
    customMockserver.launch();
    d3 = window.d3 = require('d3');
    m = window.m = require('mithril');
    //require('../../dist/kaavio-dev-polyfills.bundle.js');
    //require('Kaavio');
    //Kaavio = window.Kaavio;
    //kaavioEditor = require('../../index.js') || window.kaavioEditor;
    Pvjs = require('../../index.js') || window.Pvjs;
  });

  after(function() {
    customMockserver.close();
  });

  it('init Pvjs', function() {
    var containerElement = document.createElement('div');
    containerElement.setAttribute('class', 'container-element');
    document.body.appendChild(containerElement);

    var pvjsInstance = new Pvjs('.container-element', {
      sourceData: [{
        uri: 'http://localhost:' + process.env.MOCKSERVER_PORT + '/pathways/dev',
        fileType: 'gpml'
      }]
    });
    expect(pvjsInstance).to.be.instanceof(Pvjs);
    expect(pvjsInstance).to.respondTo('init');
  });

  it('see rendered pathway', function(done) {
    console.log('document.body.innerHTML');
    console.log(document.body.innerHTML);
    setTimeout(function() {
      console.log('document.body.innerHTML');
      console.log(document.body.innerHTML);
      done();
    }, 8000);
  });

//  it('init Kaavio', function() {
//    var containerElement = document.createElement('div');
//    var kaavioInstance = new Kaavio(containerElement, {
//      pvjson: {}
//    });
//    expect(kaavioInstance).to.be.instanceof(Kaavio);
//    expect(kaavioInstance).to.respondTo('init');
//  });
//
//  it('init kaavioEditor', function() {
//    var containerElement = document.createElement('div');
//    expect(kaavioEditor).to.respondTo('save');
//  });
//
//  it('mount kaavioInstance only', function() {
//    var containerElement = document.createElement('div');
//    var kaavioInstance = new Kaavio(containerElement, {
//      pvjson: {}
//    });
//    m.mount(containerElement, kaavioInstance);
//    expect(kaavioEditor).to.respondTo('save');
//  });
//
//  it('mount kaavioInstance with kaavioEditor closed', function() {
//    var containerElement = document.createElement('div');
//    var kaavioInstance = new Kaavio(containerElement, {
//      pvjson: {}
//    });
//    kaavioInstance.footer = kaavioEditor;
//    m.mount(containerElement, kaavioInstance);
//    console.log('div?');
//    console.log(document.querySelector('div'));
//    console.log(document.body.innerHTML);
//    expect(kaavioEditor).to.respondTo('save');
//  });
//
//  it('mount kaavioInstance with kaavioEditor open', function() {
//    var containerElement = document.createElement('div');
//    var kaavioInstance = new Kaavio(containerElement, {
//      pvjson: {},
//      editor: 'open'
//    });
//    kaavioInstance.footer = kaavioEditor;
//    m.mount(containerElement, kaavioInstance);
//    console.log('.diagram-container:');
//    console.log(document.querySelector('.diagram-container'));
//    console.log(document.body.innerHTML);
//    expect(kaavioEditor).to.respondTo('save');
//  });

});
