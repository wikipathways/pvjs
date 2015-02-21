/***********************************
 * Entity Type Control
 **********************************/

/**
 * Module dependencies.
 */

var _ = require('lodash');
var datasetControl = require('./dataset-control');
var editorUtils = require('./editor-utils');
var highland = require('highland');
var m = require('mithril');
var mithrilUtils = require('../mithril-utils');

var xrefTypeControl = {};

xrefTypeControl.GpmlNodeTypeList = Array;

//a gpmlNodeType
xrefTypeControl.GpmlNodeType = function(gpmlNodeType) {
  this.id = m.prop(gpmlNodeType['@id']);
  this.name = m.prop(gpmlNodeType.name);
}

xrefTypeControl.vm = (function() {
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
        return new xrefTypeControl.GpmlNodeType(item);
      });
    }

    var promisifiedGetGpmlNodeTypes = highland.compose(
        mithrilUtils.promisify, propify, function(items) {
          return highland(items);
        });

    vm.gpmlNodeTypeList = promisifiedGetGpmlNodeTypes(gpmlNodeTypes);

    //specify initial selection
    vm.currentGpmlNodeType = {
      id: m.prop('http://example.org/'),
      'name': m.prop('Type')
    };

    vm.changeGpmlNodeType = function(gpmlNodeTypeId) {
      vm.currentGpmlNodeType = vm.gpmlNodeTypeList()
        .filter(function(gpmlNodeType) {
          return gpmlNodeTypeId === gpmlNodeType.id();
        })[0];
    };

    vm.onChange = function(gpmlNodeTypeId) {
      console.log('currentGpmlNodeType id');
      console.log(gpmlNodeTypeId);
      datasetControl.vm.filterDatasetListByXrefType(gpmlNodeTypeId);
    };
  }
  return vm;
})();

xrefTypeControl.controller = function() {
  xrefTypeControl.vm.init();
}

xrefTypeControl.view = function() {
  return m('select.form-control.input.input-sm',
  {
    onchange: m.withAttr('value', xrefTypeControl.vm.onChange),
    value: xrefTypeControl.vm.currentGpmlNodeType.id()
  },
  [
    xrefTypeControl.vm.gpmlNodeTypeList().map(
      function(gpmlNodeType, index) {
        return m('option', {value : gpmlNodeType.id(), innerHTML : gpmlNodeType.name()})
      })
  ]);
}

module.exports = xrefTypeControl;
