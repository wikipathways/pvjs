/******************************
  * Display name control
  *****************************/

var _ = require('lodash');
var editorUtils = require('../../../editor-utils');
var highland = require('highland');
var m = require('mithril');

//module for displayNameControl
//for simplicity, we use this module to namespace the model classes
var displayNameControl = {};

//the view-model,
displayNameControl.vm = (function() {
  var vm = {}
  vm.init = function() {
    vm.displayName = m.prop('');

    // react to user updating displayName value
    vm.updateDisplayName = function(newDisplayName) {
      if (!!newDisplayName) {
        vm.displayName = m.prop(newDisplayName);
      }
    };
  }
  return vm
}());

//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything
displayNameControl.controller = function() {
  displayNameControl.vm.init();
}

//here's the view
displayNameControl.view = function() {
  return [
    m('input[placeholder="Display name"].form-control.input.input-sm', {
      onchange: m.withAttr('value',
                  displayNameControl.vm.updateDisplayName),
      value: displayNameControl.vm.displayName()
    })
  ];
};

module.exports = displayNameControl;
