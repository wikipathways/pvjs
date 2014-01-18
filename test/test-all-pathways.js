/**
 * See https://github.com/ariya/phantomjs/blob/master/examples/waitfor.js
 * 
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param onReady what to do when testFx condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 8000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()), //< defensive code
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 250); //< repeat check every 250ms
};

var page = require('webpage').create(), system = require('system'), address;

address = 'http://localhost:3000/test/compare.html?gpml=WP1601';

    var resources = [];
    page.onResourceRequested = function(request) {
        resources[request.id] = request.stage;
    };
    page.onResourceReceived = function(response) {
        resources[response.id] = response.stage;
    };
    page.open(address, function(status) {
        if (status !== 'success') {
            console.log('Unable to load the address!');
            phantom.exit();
        } else {
            waitFor(function() {
                // Check in the page if a specific element is now visible
                for ( var i = 1; i < resources.length; ++i) {
                    if (resources[i] != 'end') {
                        return false;
                    }
                }
                return true;
            }, function() {
               phantom.exit();
            }, 10000);
        }
    });

/*
var path = require('path');
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path
//var binPath = '/usr/local/bin/phantomjs'

var childArgs = [
  path.join(__dirname, 'phantomjs-script.js'),
  'some other argument (passed to phantomjs script)'
]

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  // handle results
})
//*/
