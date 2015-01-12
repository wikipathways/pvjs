# How To Set Up Environment for Development

A. Install required software:
1. [PhantomJS](http://phantomjs.org/) headless web browser for testing. If you use ```sudo apt-get install``` or ```brew install```, be sure the resulting version installed is >=1.9.7. Older versions may not include the GhostDriver Remote WebDriver required for working with Selenium.
2. [ImageMagick](http://www.imagemagick.org/) for comparing screenshots during development against last known good screenshots for testing.
3. [Node.js](http://nodejs.org/download/)
4. [Phash dependencies](https://github.com/aaronm67/node-phash)
B. When software is installed, open a terminal and enter the following commands:

```
$ git clone git@github.com:wikipathways/pathvisiojs.git #gets pathvisiojs source code
$ cd pathvisiojs/
$ npm update && npm install #uses npm (the node package manager) to install pathvisiojs dependencies
$ bower update && bower install #installs non-npm JS dependencies
$ gulp launchSelenium #starts Selenium server for running tests
```

C. Leave the [Selenium](http://docs.seleniumhq.org/) server terminal window open and running. Selenium is a web browser automation platform that tests the pathvisiojs code to ensure it works. Open a second terminal window and enter the following command:

```
$ gulp watch #starts local web server and watches for your changes to the source files. Opens a browser to the pathvisiojs test page. Runs a quick test whenever you change a source file.
```

# How To Run Local End-To-End Test Protocol

The dev tests will run automatically. To run the more extensive local end-to-end test protocol, follow these steps:

A. Install the Chromedriver and other browser plugins for [Selenium WebDriver](http://docs.seleniumhq.org/projects/webdriver/) (if you haven't already done so).
B. Open the terminal and enter:

```
$ gulp testLocalhost
```

Once the tests finish running, you will see the results in the terminal window. Each test should pass (green).
