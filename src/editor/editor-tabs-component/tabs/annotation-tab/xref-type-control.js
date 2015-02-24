/***********************************
 * Entity Type Control
 **********************************/

/**
 * Module dependencies.
 */

var _ = require('lodash');
var datasetControl = require('./dataset-control');
var editorUtils = require('../../../editor-utils');
var highland = require('highland');
var m = require('mithril');
var mithrilUtils = require('../../../../mithril-utils');

var xrefTypeControl = {};

xrefTypeControl.XrefTypeList = Array;

//a xrefType
xrefTypeControl.XrefType = function(xrefType) {
  this.id = m.prop(xrefType['@id']);
  this.name = m.prop(xrefType.name);
}

xrefTypeControl.vm = (function() {
  var vm = {};
  vm.init = function() {

    var propify = function(highlandStream) {
      return highlandStream.map(function(item) {
        return new xrefTypeControl.XrefType(item);
      });
    }

    var promisifiedGetXrefTypes = highland.compose(
        mithrilUtils.promisify, propify, function(items) {
          return highland(items);
        });

    //specify initial selection
    var xrefTypePlaceholder = {
      '@id': '',
      'name': 'Select type'
    };
    vm.currentXrefType = new xrefTypeControl.XrefType(xrefTypePlaceholder);

    var xrefTypes = [xrefTypePlaceholder].concat([{
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
    }]);

    vm.xrefTypeList = promisifiedGetXrefTypes(xrefTypes);

    vm.changeXrefType = function(xrefTypeId) {
      vm.currentXrefType = vm.xrefTypeList()
        .filter(function(xrefType) {
          return xrefTypeId === xrefType.id();
        })[0];
      datasetControl.vm.filterDatasetListByXrefType(xrefTypeId);
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
    onchange: m.withAttr('value', xrefTypeControl.vm.changeXrefType),
    value: xrefTypeControl.vm.currentXrefType.id()
  },
  [
    xrefTypeControl.vm.xrefTypeList().map(
      function(xrefType, index) {
        var selectedString = xrefType.id() !== xrefTypeControl.vm.currentXrefType.id() ?
          '' : '[selected]';
        return m('option' + selectedString, {
          value : xrefType.id(), innerHTML : xrefType.name()
        })
      })
  ]);
}

module.exports = xrefTypeControl;
