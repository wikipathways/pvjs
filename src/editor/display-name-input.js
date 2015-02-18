var _ = require('lodash');
var editorUtils = require('./editor-utils');
var highland = require('highland');
var m = require('mithril');

/******************************
  * display name input
  *****************************/

//module for bridgeDbDisplayNameInput
//for simplicity, we use this module to namespace the model classes
var bridgeDbDisplayNameInput = {};

//the view-model,
bridgeDbDisplayNameInput.vm = (function() {
  var vm = {}
  vm.init = function() {
    vm.displayName = m.prop('');

    // react to user updating displayName value
    vm.updateDisplayName = function() {
      if (vm.displayName()) {
        console.log('displayName:');
        console.log(vm.displayName());
      }
    };
  }
  return vm
}());

//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything
bridgeDbDisplayNameInput.controller = function() {
  bridgeDbDisplayNameInput.vm.init();
}

//here's the view
bridgeDbDisplayNameInput.view = function() {
  return [
    m('input[placeholder="Display name"].form-control.col-sm-1', {
      onchange: m.withAttr('value',
                  bridgeDbDisplayNameInput.vm.updateDisplayName),
      value: bridgeDbDisplayNameInput.vm.displayName()
    })
  ];
};

//initialize the application
//m.module(document.body, bridgeDbDisplayNameInput);

module.exports = bridgeDbDisplayNameInput;
