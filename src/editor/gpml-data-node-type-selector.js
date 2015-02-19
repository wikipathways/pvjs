var _ = require('lodash');
var editorUtils = require('./editor-utils');
var highland = require('highland');
var m = require('mithril');

/***********************************
 * GPML DataNode Type Selector
 **********************************/

var gpmlDataNodeTypeSelector = {};

gpmlDataNodeTypeSelector.GpmlNodeTypeList = Array;

//a gpmlNodeType
gpmlDataNodeTypeSelector.GpmlNodeType = function(gpmlNodeType) {
  this.id = m.prop(gpmlNodeType['@id']);
  this.name = m.prop(gpmlNodeType.name);
}

gpmlDataNodeTypeSelector.vm = (function() {
  var vm = {};
  vm.init = function() {

    var gpmlNodeTypes = [{
      '@id': 'http://example.org/',
      name: 'Type'
    }, {
      '@id': 'gpml:GeneProduct',
      name: 'Gene Product'
    }, {
      '@id': 'gpml:Metabolite',
      name: 'Metabolite'
    }, {
      '@id': 'biopax:Pathway',
      name: 'Pathway'
    }, {
      '@id': 'biopax:ProteinReference',
      name: 'Protein'
    }, {
      '@id': 'gpml:Unknown',
      name: 'Unknown'
    }];

    var propify = function(highlandStream) {
      return highlandStream.map(function(item) {
        return new gpmlDataNodeTypeSelector.GpmlNodeType(item);
      });
    }

    var promisifiedGetGpmlNodeTypes = highland.compose(
        editorUtils.promisify, propify, function(items) {
          return highland(items);
        });

    vm.gpmlNodeTypeList = promisifiedGetGpmlNodeTypes(gpmlNodeTypes);

    //specify initial selection
    //vm.currentGpmlNodeType = vm.gpmlNodeTypeList()[0];
    vm.currentGpmlNodeType = {
      id: m.prop('http://example.org/'),
      'name': m.prop('Type')
    };

    vm.changeGpmlNodeType = function(id) {
      vm.currentGpmlNodeType = vm.gpmlNodeTypeList()
        .filter(function(gpmlNodeType) {
          return id == gpmlNodeType.id();
        })[0];
    };
  }
  return vm;
})();

gpmlDataNodeTypeSelector.controller = function() {
  gpmlDataNodeTypeSelector.vm.init();
}

gpmlDataNodeTypeSelector.view = function() {
  return m('select.form-control.input.input-sm',
  {
    onchange: m.withAttr('value', gpmlDataNodeTypeSelector.vm.changeGpmlNodeType),
    value: gpmlDataNodeTypeSelector.vm.currentGpmlNodeType.id()
  },
  [
    gpmlDataNodeTypeSelector.vm.gpmlNodeTypeList().map(
      function(gpmlNodeType, index) {
        return m('option[value="' + gpmlNodeType.id() + '"]', gpmlNodeType.name());
      })
  ]);
}

module.exports = gpmlDataNodeTypeSelector;
