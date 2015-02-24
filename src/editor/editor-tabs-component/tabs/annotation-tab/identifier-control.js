/******************************
  * identifier control
  *****************************/

var _ = require('lodash');
var editorUtils = require('../../../editor-utils');
var highland = require('highland');
var m = require('mithril');

//module for identifierControl
//for simplicity, we use this module to namespace the model classes
var identifierControl = {};

//the view-model,
identifierControl.vm = (function() {
  var vm = {}
  vm.init = function() {
    vm.identifier = m.prop('');

    // react to user updating identifier value
    vm.update = function(newIdentifier) {
      if (!!newIdentifier) {
        vm.identifier = m.prop(newIdentifier);
      }
    };
  }
  return vm
}());

//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything
identifierControl.controller = function() {
  identifierControl.vm.init();
}

//here's the view
identifierControl.view = function() {
  return [
    m('input[placeholder="Identifier"].pathvisiojs-editor-identifier.form-control.input.input-sm', {
      onchange: m.withAttr('value',
                  identifierControl.vm.update),
      value: identifierControl.vm.identifier()
    })
  ];
};

module.exports = identifierControl;
