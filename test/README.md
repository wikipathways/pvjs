# How To View Diagrams During Development

A. You will need a web server running on your dev machine. If you already have one set up, you can skip ahead to Step B.
Otherwise, you can use the included development server like this:

1. Install [nodejs](http://nodejs.org/download/), if you haven't already done so.
2. When nodejs is installed, open a terminal and enter the following commands

```
cd ~/Sites/pathvisiojs/ #update this to where the pathvisiojs directory is actually located on your computer
npm install #this command uses npm (the node package manager) to install pathvisiojs dependencies
node devserver #this starts the server
```

B. Navigate to the pathvisiojs [test page](https://github.com/wikipathways/pathvisiojs/blob/master/test/index.html). If you are using the included dev server, it will be located at ["http://localhost:3000/test/"](http://localhost:3000/test/). If you are using another server, edit the URL as required for your server setup. Then follow a link for any one of the pathways listed.

C. If you add a new JS file, you will need to add a reference to it in [compare.js](https://github.com/wikipathways/pathvisiojs/blob/master/test/compare.js#L116).

# How To Run Tests

A. If you are using the included dev server, you can skip ahead to Step B.
Otherwise, you will need to follow these instructions:

1. Install [nodejs](http://nodejs.org/download/), if you haven't already done so.
2. When node is installed, open a terminal and enter the following commands

```
cd ~/Sites/pathvisiojs/ #update this to where the pathvisiojs directory is actually located on your computer
npm install #this command uses npm (the node package manager) to install pathvisiojs dependencies
```

B. Install the Chromedriver and other browser plugins for WebDriver manager, if you haven't already done so:

```
cd ~/Sites/pathvisiojs/node_modules/protractor/bin/ #update this to where the pathvisiojs directory is actually located on your computer
webdriver-manager update
```

C. Ensure your web server is running, then run the tests:

```
webdriver-manager start #Starts webdriver server (you will need both this server and your web server running)
cd ~/Sites/pathvisiojs/test/ #update this to where the pathvisiojs directory is actually located on your computer
protractor run.js #Run the tests and get test results in the terminal
```
