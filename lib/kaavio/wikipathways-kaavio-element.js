var Kaavio = require('./main.js');

/**
 * Enable the wikipathways-kaavio custom element
 *
 * @return
 */
(function registerWikipathwaysKaavioElement(window) {
  'use strict';

  var DivPrototype = Object.create(window.HTMLDivElement.prototype);

  DivPrototype.attributeChangedCallback = function(
      attrName, oldValue, newValue) {
    if (attrName === 'alt') {
      this.textContent = newValue;
    }
  };

  var WikipathwaysKaavioPrototype = Object.create(DivPrototype);

  WikipathwaysKaavioPrototype.createdCallback = function() {
    var vm = this;

    var alt = vm.getAttribute('alt');
    if (!!alt) {
      vm.attributeChangedCallback('alt', null, alt);
    }

    var displayErrors = Boolean(vm.getAttribute('display-errors'));
    if (!!displayErrors) {
      vm.attributeChangedCallback('display-errors', null, displayErrors);
    }

    var displayWarnings = Boolean(vm.getAttribute('display-warnings'));
    if (!!displayWarnings) {
      vm.attributeChangedCallback('display-warnings', null, displayWarnings);
    }

    var displaySuccess = Boolean(vm.getAttribute('display-success'));
    if (!!displaySuccess) {
      vm.attributeChangedCallback('display-success', null, displaySuccess);
    }

    var editor = vm.getAttribute('editor');
    if (!!editor) {
      vm.attributeChangedCallback('editor', null, editor);
    }

    var fitToContainer = Boolean(vm.getAttribute('fit-to-container'));
    if (!!fitToContainer) {
      vm.attributeChangedCallback('fit-to-container', null, fitToContainer);
    }

    /*
    var highlight = vm.getAttribute('highlight');
    if (!!highlight) {
      highlight = JSON.parse(highlight);
      highlight = !!highlight.length ? highlight : [highlight];
      options.highlight = highlight;
      vm.attributeChangedCallback('highlight', null, highlight);
    }
    //*/

    /* TODO should this be enabled? It doesn't seem needed for the web-component.
    var manualRender = options.manualRender =
        Boolean(vm.getAttribute('manual-render'));
    if (!!manualRender) {
      vm.attributeChangedCallback('manual-render', null, manualRender);
    }
    //*/

    var src = vm.getAttribute('src');
    if (!!src) {
      vm.attributeChangedCallback('src', null, src);
    }

    vm.innerHTML = '';

    var kaavio = new Kaavio(vm, {
      displayErrors: displayErrors,
      displayWarnings: displayWarnings,
      editor: editor,
      fitToContainer: fitToContainer,
      src: src
    })

    /*
    // Call after render
    vm.on('rendered', function() {
      // do something
    });
    //*/
  };

  // Public: WikipathwaysKaavioPrototype constructor.
  //
  //   # => <wikipathways-kaavio></wikipathways-kaavio>
  //
  window.WikipathwaysKaavioElement = document.registerElement(
      'wikipathways-kaavio', {
      prototype: WikipathwaysKaavioPrototype
  });
}(window));
