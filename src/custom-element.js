var highland = require('highland');

/**
 * Enable the wikipathways-pvjs custom element
 *
 * @return
 */
function registerWikiPathwaysPvjsElement() {
  'use strict';

  var DivPrototype = Object.create(window.HTMLDivElement.prototype);

  DivPrototype.attributeChangedCallback = function(
      attrName, oldValue, newValue) {
    if (attrName === 'alt') {
      this.textContent = newValue;
    }
  };

  var WikiPathwaysPvjsPrototype = Object.create(DivPrototype);

  WikiPathwaysPvjsPrototype.createdCallback = function() {
    var vm = this;
    var args = {};

    var alt = args.alt = vm.getAttribute('alt');
    if (!!alt) {
      vm.attributeChangedCallback('alt', null, alt);
    }

    var displayErrors = args.displayErrors =
        Boolean(vm.getAttribute('display-errors'));
    if (!!displayErrors) {
      vm.attributeChangedCallback('display-errors', null, displayErrors);
    }

    var displayWarnings = args.displayErrors =
        Boolean(vm.getAttribute('display-warnings'));
    if (!!displayWarnings) {
      vm.attributeChangedCallback('display-warnings', null, displayWarnings);
    }

    var fitToContainer = args.fitToContainer =
        Boolean(vm.getAttribute('fit-to-container'));
    if (!!fitToContainer) {
      vm.attributeChangedCallback('fit-to-container', null, fitToContainer);
    }

    /* TODO should this be enabled? It doesn't seem needed for the web-component.
    var manualRender = args.manualRender =
        Boolean(vm.getAttribute('manual-render'));
    if (!!manualRender) {
      vm.attributeChangedCallback('manual-render', null, manualRender);
    }
    //*/

    var src = vm.getAttribute('src');
    if (!!src) {
      vm.attributeChangedCallback('src', null, src);
    }
    args.sourceData = [
      {
        uri: src,
        // TODO we should be able to use the content type
        // header from the server response instead of relying
        // on this.
        // Think analogous to image/png, image/gif, etc. for the img tag.
        fileType:'gpml' // generally will correspond to filename extension
      }
    ];

    vm.innerHTML = '';

    $(vm).pvjs(args);

    // Get first element from array of instances
    var pathInstance = $(vm).pvjs('get').pop()

    // Load notification plugin
    pvjsNotifications(pathInstance, {
      displayErrors: displayErrors,
      displayWarnings: displayWarnings
    });

    // Call after render
    pathInstance.on('rendered', function() {

    });
  };

  // Public: WikiPathwaysPvjsPrototype constructor.
  //
  //   # => <wikipathways-pvjs></wikipathways-pvjs>
  //
  window.WikiPathwaysPvjs = document.registerElement(
      'wikipathways-pvjs', {
      prototype: WikiPathwaysPvjsPrototype
  });
}

module.exports = {
  registerElement: registerWikiPathwaysPvjsElement
}
