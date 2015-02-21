/***********************************
 * xrefSpecifier
 **********************************/

var _ = require('lodash');
var datasetControl = require('./dataset-control');
var displayNameControl = require('./display-name-control');
var editorUtils = require('./editor-utils');
var fs = require('fs');
var XrefSearch = require('./xref-search');
var xrefTypeControl = require('./xref-type-control');
var highland = require('highland');
var identifierControl = require('./identifier-control');
var m = require('mithril');
var mithrilUtils = require('../mithril-utils');

var xrefSpecifier = {};
var xrefSearch;

xrefSpecifier.ItemList = Array;

xrefSpecifier.Item = function(item) {
  this.id = m.prop(item.id);
  this.name = m.prop(item.name);
}

xrefSpecifier.vm = (function() {

  var selectedElementId;

  var vm = {};
  vm.init = function(pvjs) {

    xrefSearch = new XrefSearch(xrefSpecifier);

    /***********************************************
     * DataNode onclick event handler
     **********************************************/

    $('.diagram-container').on('click', function(event) {
      m.startComputation();

      selectedElementId = event.target.id;
      var element = pvjs.sourceData.pvjson.elements.filter(function(element) {
        return element.id === selectedElementId;
      })
      .map(function(element) {
        return element;
      })[0];

      var xref = _.find(pvjs.sourceData.pvjson.elements,
          function(elementItem) {
            return elementItem.id === element.entityReference;
          });

      var iri = element.entityReference;
      var iriComponents = iri.split('identifiers.org');
      var iriPath = iriComponents[iriComponents.length - 1];
      var iriPathComponents = iriPath.split('/');
      var preferredPrefix = iriPathComponents[1];
      var identifier = iriPathComponents[2];

      var datasetId = 'http://identifiers.org/' + preferredPrefix;
      xref.isDataItemIn = {id: datasetId};

      xref.identifier = identifier;

      var entity = editorUtils.convertXrefToPvjsEntity(xref);
      xrefSpecifier.vm.updateControlValues(entity);

      m.endComputation();
    });

    vm.save = function() {
      var xrefType = xrefTypeControl.vm.currentXrefType.name();
      var datasetName = datasetControl.vm.currentDataset.name();
      var identifier = identifierControl.vm.identifier();
      var displayName = displayNameControl.vm.displayName();
      updateXrefsInGpml(pvjs, selectedElementId, xrefType, datasetName, identifier, displayName);
    }

    vm.cancel = function() {
      xrefTypeControl.vm.currentXrefType.id = m.prop('');
      datasetControl.vm.currentDataset.id = m.prop('');
      identifierControl.vm.identifier = m.prop('');
      displayNameControl.vm.displayName = m.prop('');
      selectedElementId = null;
    }

    xrefSearch.vm.init();
    xrefTypeControl.vm.init();
    datasetControl.vm.init();
    identifierControl.vm.init();
    displayNameControl.vm.init();
  }

  /**
   * update the dropdowns and input boxes that
   * identify and/or describe an entity.
   *
   * @param {object} entity
   * @param {string} entity.type Type
   * @param {string} entity.displayName Short name for display
   * @param {string} entity.identifier Character string that differentiates this
   *                                          entity from other entitys.
   * @param {object} entity.isDataItemIn Dataset of which this entity
   *                                              reference is a member
   * @param {string} entity.isDataItemIn.id IRI
   * @param {string} entity.isDataItemIn.displayName Short name for display
   * @return
   */
  vm.updateControlValues = function(entity) {
    xrefTypeControl.vm.changeXrefType(entity.type);
    datasetControl.vm.changeDataset(entity.isDataItemIn.id);
    identifierControl.vm.identifier = m.prop(entity.identifier);
    displayNameControl.vm.displayName = m.prop(entity.displayName);
  }

  return vm;
})();

xrefSpecifier.controller = function() {
  xrefSpecifier.vm.init();
}

xrefSpecifier.view = function() {
  return m('nav.navbar.navbar-default.navbar-form.well.well-sm', [
    //m('div.form-inline.form-inline-sm', [
      m('div.form-group.navbar-left', [
        xrefSearch.view(),
      ]),
      m('div.form-group.well.well-sm.navbar-left', [
        xrefTypeControl.view(),
        datasetControl.view(),
        identifierControl.view(),
        displayNameControl.view(),
      ]),
      m('div.form-group.well.well-sm.navbar-left', [
        m('button[type="submit"].btn.btn-sm.btn-success', {
          onclick: xrefSpecifier.vm.save
        }, [
          m('span.glyphicon.glyphicon-floppy-disk')
        ]),
      ]),
      m('span.glyphicon.glyphicon-remove.navbar-right[style="color: #aaa;"]', {
        onclick: xrefSpecifier.vm.cancel
      })
    //])
  ]);
}

/***********************************************
 * Temporary solution for handling updates
 * to GPML DataNode Xrefs.
 * The long-term solution will be to convert
 * the pvjson to GPML.
 **********************************************/
function updateXrefsInGpml(pvjs, selectedElementId, xrefType,
    datasetName, identifier, displayName) {
  if (!datasetName || !identifier) {
    throw new Error('Missing datasetName and/or identifier for updateXrefsInGpml');
  }

  var gpmlDoc = pvjs.sourceData.original;

  var dataNodeElement = gpmlDoc.find('DataNode[GraphId="' + selectedElementId + '"]');
  var xrefElement = dataNodeElement.find('Xref');

  dataNodeElement.attr('Type', xrefType);
  dataNodeElement.attr('TextLabel', displayName);

  xrefElement.attr('Database', datasetName);
  xrefElement.attr('ID', identifier);

  console.log('');
  console.log('');
  console.log('');
  console.log('*********************************************************************');
  console.log('*********************************************************************');
  console.log('');
  console.log('Updated GPML file as string:');
  console.log('');
  console.log(gpmlDoc.html());
  console.log('');
  console.log('*********************************************************************');
  console.log('*********************************************************************');
  console.log('');

  console.log('You successfully performed a local update for a GPML DataNode.')
  console.log('It now has the following values:');
  console.log('GraphId: ' + selectedElementId);
  console.log('TextLabel: ' + displayName);
  console.log('Type: ' + xrefType);
  console.log('Database: ' + datasetName);
  console.log('ID: ' + identifier);
}

module.exports = xrefSpecifier;
