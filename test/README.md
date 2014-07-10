# How To Set Up Environment for Development 

A. Install required software:
1. [Selenium](http://docs.seleniumhq.org/download/) web browser automation platform for testing.
2. [PhantomJS](http://phantomjs.org/) headless web browser for testing. If you use ```sudo apt-get install``` or ```brew install```, be sure the resulting version installed is >=1.9.7. Older versions may not include the GhostDriver Remote WebDriver required for working with Selenium.
3. [ImageMagick](http://www.imagemagick.org/) for comparing screenshots during development against last known good screenshots for testing.
4. [Node.js](http://nodejs.org/download/).
B. When software is installed, open a terminal and enter the following commands:

```
$ cd YOUR-SITES-DIRECTORY #use whichever directory you prefer for containing your projects
$ git clone git@github.com:wikipathways/pathvisiojs.git #gets pathvisiojs source code
$ cd pathvisiojs/
$ npm update && npm install #uses npm (the node package manager) to install pathvisiojs dependencies
$ bower update && bower install #installs non-npm JS dependencies
$ grunt #starts local web server and watches for changes to source files to trigger dev tests
```

# How To View Diagrams During Development

Open a browser and navigate to the pathvisiojs [test page](http://localhost:3000/test/).

# How To Run Local End-To-End Test Protocol

The dev tests will run automatically. To run the more extensive local end-to-end test protocol, follow these steps:

A. Install the Chromedriver and other browser plugins for [Selenium WebDriver](http://docs.seleniumhq.org/projects/webdriver/) (if you haven't already done so).
B. Open the terminal and enter:

```
$ grunt test:protocol
```

Once the tests finish running, you will see the results in the terminal window. Everything should be successful and displayed in green.
