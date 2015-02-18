var _ = require('lodash');
var editorUtils = require('./editor-utils');
var highland = require('highland');
var m = require('mithril');

/******************************
  * identifier input
  *****************************/

//module for bridgeDbIdentifierInput
//for simplicity, we use this module to namespace the model classes
var bridgeDbIdentifierInput = {};

//the view-model,
bridgeDbIdentifierInput.vm = (function() {
  var vm = {}
  vm.init = function() {
    vm.identifier = m.prop('');

    // react to user updating identifier value
    vm.updateIdentifier = function() {
      if (vm.identifier()) {
        console.log('identifier:');
        console.log(vm.identifier());
      }
    };
  }
  return vm
}());

//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything
bridgeDbIdentifierInput.controller = function() {
  bridgeDbIdentifierInput.vm.init();
}

//here's the view
bridgeDbIdentifierInput.view = function() {
  return [
    m('input[placeholder="Identifier"].form-control.col-sm-1', {
      onchange: m.withAttr('value',
                  bridgeDbIdentifierInput.vm.updateIdentifier),
      value: bridgeDbIdentifierInput.vm.identifier()
    })
  ];
};

//initialize the application
//m.module(document.body, bridgeDbIdentifierInput);

module.exports = bridgeDbIdentifierInput;
