var _ = require('lodash');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var colors = require('colors');
var expect = chai.expect;
var fs = require('fs');
var gulp = require('gulp');
var highland = require('highland');
//var imageDiff = require('image-diff');
//var imagemagick = require('imagemagick-native');
var os   = require('os');
//var pHash = require('phash');
var wd = require('wd');

var pathway = JSON.parse(process.env.PVJS_PATHWAY);
var pathwayName = pathway.name;

var browserName = process.env.BROWSER;
var desired = {'browserName': browserName};
desired.name = 'Local Protocol for ' + pathwayName.toUpperCase().cyan +
    ' (' + browserName.grey + ')';
desired.tags = ['localhost'];

var lastKnownGoodScreenshotHashes = JSON.parse(
    fs.readFileSync('./test/last-known-goods/protocol/screenshot-hashes.json'));

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

/*
// http configuration, not needed for simple runs
wd.configureHttp({
    timeout: 1500,
    retryDelay: 1500,
    retries: 1
});
//*/

describe(desired.name, function() {
  var browser;
  var allPassed = true;
  // how long the details panel takes to load
  var detailsPanelTimeout = 6000;
  var localServerPort = process.env.LOCALSERVER_PORT;
  console.log('process.env.RESET_SELENIUM_SERVER');
  console.log(process.env.RESET_SELENIUM_SERVER);
  var resetSeleniumServer = (process.env.RESET_SELENIUM_SERVER === 'true');

  before(function(done) {
    var testsRunCount;
    console.log('**********************************');
    console.log('before');
    console.log('**********************************');

    browser = wd.remote({
      hostname: '127.0.0.1',
        port: process.env.SELENIUM_PORT || 4444
    }, 'promiseChain');

    browser.sessions(function(err, sessions) {
      if (!!err) {
        console.log('sessions err:');
        console.log(err);
      }
      var oneSessionExists = !!sessions && !!sessions.length && !!sessions[0];
      var selectedSessionId;
      if (oneSessionExists) {
        var previousSession = sessions[0];
        var selectedSessionIds = sessions.map(function(session) {
          return session.id;
        })
        //*
        .filter(function(sessionId) {
          return sessions.length === 1 || sessionId !== previousSession.id;
        })
        //*/
        //*
        .sort(function(a, b) {
          if (a.firstname < b.firstname) {
            return -1;
          }
          if (a.firstname > b.firstname) {
            return 1;
          }
          return 0;
        });
        //*/

        console.log(selectedSessionIds);
        selectedSessionId = selectedSessionIds[0];
        //selectedSessionId = selectedSessionIds[selectedSessionIds.length - 1];
      }
      console.log('selectedSessionId: ' + selectedSessionId);
      console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv');
      console.log('resetSeleniumServer');
      console.log(resetSeleniumServer);
      console.log('process.env.RESET_SELENIUM_SERVER');
      console.log(process.env.RESET_SELENIUM_SERVER);
      console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');

      if (!selectedSessionId || resetSeleniumServer) {
        console.log('Launching new session.');
        var width = 1024;
        var height = 768;
        browser
        .init(desired)
        .setWindowSize(width, height)
        .nodeify(done);
      } else {
        console.log('Attaching to existing session.');
        /*
        console.log('process.env.iteration');
        console.log(process.env.iteration);
        process.env.iteration += 1;
        //*/
        browser.attach(selectedSessionId, function(err) {
          if (!!err) {
            console.log('attach err:');
            console.log(err);
          }
          return done();
        });
      }
    });

    /*
    // optional extra logging
    browser.on('status', function(info) {
      console.log(info.cyan);
    });
    browser.on('command', function(eventType, command, response) {
      console.log(' > ' + eventType.cyan, command, (response || '').grey);
    });
    browser.on('http', function(meth, path, data) {
      console.log(' > ' + meth.magenta, path, (data || '').grey);
    });
    //*/
  });

  afterEach(function(done) {
    allPassed = allPassed && (this.currentTest.state === 'passed');
    done();
  });

  after(function(done) {
    console.log('----------------------------------');
    console.log('after');
    console.log('----------------------------------');
    /*
    browser
      .quit()
      .nodeify(function() {
        return done(null, allPassed);
      });
    //*/

    /*
    browser.detach(function() {
      return done(null, allPassed);
    });
    //*/

    return done(null, allPassed);
  });

  it('work1', function(done) {
    /* this allows all 17 pathways to run
    return done();
    //*/
    /* this allows all 17 pathways to run
    expect(1).to.equal(1);
    return done();
    //*/
    /* this allows all 17 pathways to run
    browser
      .get('http://localhost:' + localServerPort +
          '/test/one-diagram.html?gpml=' +
          'http://localhost:' + localServerPort +
          '/test/input-data/protocol/' + pathway.fileName)
      .then(function() {
        return done();
      });
    //*/
    /*
    browser
      .get('http://localhost:' + localServerPort +
          '/test/one-diagram.html?gpml=' +
          'http://localhost:' + localServerPort +
          '/test/input-data/protocol/' + pathway.fileName)
      .then(function() {
        return done();
      });
    //*/
    //* this hangs at 12
    browser
      .get('http://localhost:' + localServerPort +
          '/test/one-diagram.html?gpml=' +
          'http://localhost:' + localServerPort +
          '/test/input-data/protocol/' + pathway.fileName)
      .waitForElementById('pvjs-diagram-1', wd.asserters.isDisplayed, 4000)
      //*
      .waitForElementByCss('.pathvisiojs-highlighter',
          wd.asserters.isDisplayed, 4000)
      //*/
      .then(function() {
        return done();
      });
    //*/
    /* this hangs at 12
    browser
      .get('http://localhost:' + localServerPort +
          '/test/one-diagram.html?gpml=' +
          'http://localhost:' + localServerPort +
          '/test/input-data/protocol/' + pathway.fileName)
      .waitForElementById('pvjs-diagram-1', wd.asserters.isDisplayed, 4000)
      .waitForElementByCss('.pathvisiojs-highlighter',
          wd.asserters.isDisplayed, 4000)
      .nodeify(done);
    //*/
    /* this hangs at 12
    return browser
      .get('http://localhost:' + localServerPort +
          '/test/one-diagram.html?gpml=' +
          'http://localhost:' + localServerPort +
          '/test/input-data/protocol/' + pathway.fileName)
      .waitForElementById('pvjs-diagram-1', wd.asserters.isDisplayed, 4000)
      .waitForElementByCss('.pathvisiojs-highlighter',
          wd.asserters.isDisplayed, 4000)
      .nodeify(done);
    //*/
  });

});
