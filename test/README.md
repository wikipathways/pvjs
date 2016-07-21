# Resources

* [Release management of pvjs](https://docs.google.com/a/gladstone.ucsf.edu/document/d/1F_byBNbX--BAduMOUPiHauith7NJ5kBzzIdSDt9q2gM/edit?usp=sharing)
* [pvjs code architecture/structure](../lib/README.md)

# How To Set Up Environment for Development

## A. Get a local copy of the code

  If you've already done this, skip ahead to next step.

  1. If you have write access to this repo

    ```
    $ git clone git@github.com:wikipathways/pvjs.git
    $ cd pvjs
    ```

  2. If you DON'T have write access to this repo

    Fork the [WikiPathways repo for pvjs](https://github.com/wikipathways/pvjs/fork) by clicking the "Fork" button on the upper right. Github will create a fork of pvjs for you and take you to your newly created fork. On your newly created fork, find the "HTTPS clone URL," copy it, open a terminal on your dev machine and enter the following command:

    ```
    $ git clone https://github.com/YOUR-GITHUB-ACCOUNT/pvjs.git # replace with the HTTPS clone URL you copied
    $ cd pvjs
    ```

    Add the wikipathways pvjs repo as a remote named "wikipathways"

    ```
    $ git remote add wikipathways https://github.com/wikipathways/pvjs.git
    ```

## B. Install system-level dependencies

  If you've already done this, skip ahead to next step.

  Install [Node.js](http://nodejs.org/download/)

## C. Sync with latest version of the code

  To keep your work in sync with everyone else's, regularly pull the latest changes from the wikipathways master branch of pvjs:

  ```
  $ git pull wikipathways master
  ```

  Install/update pvjs-specific dependencies (this command uses the node package manager to install/update pvjs dependencies; may take a long time):

  ```
  $ npm update && npm install
  ```

## D. Start Development Server

  In a first terminal tab or window:

  ```
  $ npm run start:server
  ```

  In a second terminal tab or window:

  ```
  $ npm run build:watch
  ```

  Now visit http://localhost:8080/test/

## E. Make Updates

  View the test page(s) appropriate for your edits. When you change and save a file in the `lib` directory, the bundle will be automatically compiled. (Ideally the page would also automatically reload, but the auto-reload feature is not working at present. You'll need to manually reload the page.) You can edit any of the files in the [lib directory](https://github.com/wikipathways/pvjs/tree/master/lib).

## F. Test

  * Visually inspect each of the test pathways from the test page, comparing your version with the current version to ensure your code produces the correct visual result in terms of styling, etc.
  * Run the tests

    ```
    $ npm test
    ```
