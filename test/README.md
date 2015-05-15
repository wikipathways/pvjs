# How To Set Up Environment for Development

A. Fork and clone pvjs. If you've already done this, skip ahead to Step B. Otherwise:

Fork the [WikiPathways repo for pvjs](https://github.com/wikipathways/pvjs/fork) by clicking the "Fork" button on the upper right. Github will create a fork of pvjs for you and take you to your newly created fork. On your newly created fork, find the "HTTPS clone URL," copy it, open a terminal on your dev machine and enter the following command:

```
$ git clone https://github.com/YOUR-GITHUB-ACCOUNT/pvjs.git #replace with the HTTPS clone URL you copied
$ cd pvjs
```

B. Add the wikipathways pvjs repo as a remote named "wikipathways," if you have not already done so:

```
$ git remote add wikipathways https://github.com/wikipathways/pvjs.git
```

Pull latest code from wikipathways master branch of pvjs:

```
$ git pull wikipathways master
```

C. Install Node.js and all necessary plugin and modules

1. [PhantomJS](http://phantomjs.org/) headless web browser for testing. If you use ```sudo apt-get install``` or ```brew install```, be sure the resulting version installed is >=1.9.7. Older versions may not include the GhostDriver Remote WebDriver required for working with Selenium.
2. [ImageMagick](http://www.imagemagick.org/) for comparing screenshots during development against last known good screenshots for testing.
3. [Node.js](http://nodejs.org/download/)
4. [Phash dependencies](https://github.com/aaronm67/node-phash) depending on your system

Then in the console, `cd` into the `pvjs` directory, if you're not already there, and install the Node.js dependencies:

```
$ npm update && npm install #uses npm (the node package manager) to install pvjs dependencies
```

Install `gulp` globally (if you get an error about permissions or sudo, check out [this article](http://competa.com/blog/2014/12/how-to-run-npm-without-sudo/)):

```
$ npm install -g gulp
```

Then generate a custom build of the Modernizr feature detector library:

```
$ gulp modernizr
```

D. Make Updates

You can edit any of the files in the [lib directory](https://github.com/wikipathways/pvjs/tree/master/lib).

Before making updates, you'll usually always want to pull from the wikipathways repo to get the latest version of the code, as described in Step B. Then you can start up the test server:

```
$ gulp launchSelenium #starts Selenium server for running tests
```

Leave the [Selenium](http://docs.seleniumhq.org/) server terminal window open and running. Selenium is a web browser automation platform that tests the pvjs code to ensure it works. Open a second terminal window and enter the following command:

```
$ gulp #starts local web server and watches for your changes to the source files. Opens a browser to the pvjs test page. Runs a quick test whenever you change a source file.
```

View the test page(s) appropriate for your edits. When you change and save a file in the `lib` directory, the page will automatically reload.

E. Send Us a Pull Request

* Visually inspect each of the test pathways from the test page, comparing your version with the current version to ensure your code produces the correct visual result in terms of styling, etc.
* Run the tests
* Commit your changes and push them to your github fork of pvjs
* Create a pull request to the wikipathways fork of pvjs:
```
wikipathways:master ... YOUR-GITHUB-ACCOUNT:master
```

# How To Run Local End-To-End Test Protocol

The dev tests will run automatically. To run the more extensive local end-to-end test protocol, follow these steps:

A. Install the Chromedriver and other browser plugins for [Selenium WebDriver](http://docs.seleniumhq.org/projects/webdriver/) (if you haven't already done so).
B. Open the terminal and enter:

```
$ gulp testLocalhost
```

Once the tests finish running, you will see the results in the terminal window. Each test should pass (green).
