# How To View Diagrams During Development

A. You will need a web server running on your dev machine. If you already have one set up, you can simply update the base URL in [run.js](https://github.com/wikipathways/pathvisiojs/blob/master/test/run.js#L73) then skip to Step B. Please change base URL back before making a pull request.

If you don't have a web server available, you can use the included development server by following these steps:

1. Install [nodejs](http://nodejs.org/download/), if you haven't already done so.
2. When nodejs is installed, open a terminal and enter the following commands (update file path if pathvisiojs directory is not located in ~/Sites/ on your computer):

```
$ cd ~/Sites/pathvisiojs/
$ npm install #this command uses npm (the node package manager) to install pathvisiojs dependencies
$ node devserver #this starts the web server
```
Leave web server running in terminal window.

B. Open a browser and navigate to the pathvisiojs [test page](https://github.com/wikipathways/pathvisiojs/blob/master/test/index.html). If you are using the included dev server, it will be located at ["http://localhost:3000/test/"](http://localhost:3000/test/). If you are using another server, edit the URL as required for your server setup. Then follow a link for any one of the pathways listed.

C. If you add a new JS file, you will need to add a reference to it in [compare.js](https://github.com/wikipathways/pathvisiojs/blob/master/test/compare.js#L116).

# How To Run The Tests

A. If you are using the included dev server, you can skip ahead to Step B.
Otherwise, you will need to follow these instructions:

1. Install [nodejs](http://nodejs.org/download/) (if you haven't already done so).
2. When node is installed, open a terminal and enter the following commands (update file path if pathvisiojs directory is not located in ~/Sites/ on your computer):

```
$ cd ~/Sites/pathvisiojs/
$ npm install #this command uses npm (the node package manager) to install pathvisiojs dependencies
```

B. Install the Chromedriver and other browser plugins for [WebDriver](http://docs.seleniumhq.org/projects/webdriver/) (if you haven't already done so). Instructions for Mac (update file path if pathvisiojs directory is not located in ~/Sites/ on your computer):

```
$ ~/Sites/pathvisiojs/node_modules/protractor/bin/webdriver-manager update
```

C. Ensure your web server is running. Start your webdriver server, a second server responsible for tests, as follows (update file paths below if pathvisiojs directory is not located in ~/Sites/ on your computer):

```
$ ~/Sites/pathvisiojs/node_modules/protractor/bin/webdriver-manager start
```

Leave test server running in terminal window. Open a new terminal tab or window and run the tests:

```
$ cd  #update this to where the pathvisiojs directory is actually located on your computer
$ ~/Sites/pathvisiojs/node_modules/protractor/bin/protractor/protractor ./test/run.js
```

Once the tests finish running, you will see the test results in the terminal window. Everything should be successful and displayed in green.
