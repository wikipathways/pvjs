/***********************************
 * propertiesTab
 **********************************/

var _ = require('lodash');
var colorPickerControl = require('../../../sub-components/color-picker-control');
var editorUtils = require('../../../editor-utils');
var fs = require('fs');
var highland = require('highland');
var m = require('mithril');
var mithrilUtils = require('../../../../mithril-utils');

var propertiesTab = {};

propertiesTab.Item = function(item) {
  this.id = m.prop(item.id);
  this.name = m.prop(item.name);
}

propertiesTab.vm = (function() {

  var selectedPvjsElement;

  var vm = {};
  vm.init = function(pvjs) {

    colorPickerControl.vm.init();

    propertiesTab.vm.saveButtonClass = 'btn-default';

    vm.onClickDiagramContainer = function(selectedPvjsElement) {
      colorPickerControl.vm.color(selectedPvjsElement.color);

      // TODO this is a kludge. refactor.
      propertiesTab.vm.saveButtonClass = 'btn-success';
    }

    vm.cancel = function() {
      propertiesTab.vm.saveButtonClass = 'btn-default';
      pvjs.editor.cancel();
    }

    vm.reset = function() {
      colorPickerControl.vm.color('');
      pvjs.editor.clearSelection();
    }

    vm.save = function() {
      var selectedPvjsElement = pvjs.editor.selectedPvjsElement;
      propertiesTab.vm.saveButtonClass = 'btn-default';
      updateGraphicsInGpml(pvjs, selectedPvjsElement.id, colorPickerControl.vm.color());
      vm.reset();
    }

  }

  return vm;
})();

propertiesTab.controller = function() {
  propertiesTab.vm.init();
}

/*
<input type='color' name='color2' value='#3355cc' />
//*/

//here's the view
propertiesTab.view = function() {
  return m('nav.pathvisiojs-editor-properties.navbar.navbar-default.navbar-form.well.well-sm', [
    m('div.form-group.navbar-left', [
      m('div.input-group.input-group-sm.form-control', {}, [
        m('span.glyphicon.glyphicon-text-color.input-group-addon', {}),
        colorPickerControl.view()
      ]),
    ]),
    /* TODO this displays the same value as the text color input
    m('div.form-group.well.well-sm.navbar-left', [
      m('div.input-group.input-group-sm', {}, [
        m('span.glyphicon.glyphicon-text-background.input-group-addon', {}),
        colorPickerControl.view()
      ])
    ]),
    //*/
    m('div.form-group.navbar-left', [
      m('button[type="submit"][style="height: 44px;"].btn.form-control.' + propertiesTab.vm.saveButtonClass, {
        onclick: propertiesTab.vm.save
      }, [
        m('span.glyphicon.glyphicon-ok')
      ]),
    ]),
    m('span.glyphicon.glyphicon-remove.btn.navbar-right[style="color: #aaa; transform: translateY(-10px);"]', {
      onclick: propertiesTab.vm.cancel
    })
  ]);
}
/***********************************************
 * Temporary solution for handling updates
 * to GPML DataNode Graphics.
 * The long-term solution will be to convert
 * the pvjson to GPML.
 **********************************************/
function updateGraphicsInGpml(pvjs, selectedElementId, color) {
  var gpmlDoc = pvjs.sourceData.original;

  pvjs.$element.select('#' + selectedElementId)
    .style('stroke', color);
  pvjs.$element.select('#text-for-' + selectedElementId)
    .style('fill', color);

  var dataNodeElement = gpmlDoc.find('DataNode[GraphId="' + selectedElementId + '"]');
  var graphicsElement = dataNodeElement.find('Graphics');

  var gpmlColor = color.replace('#', '').toUpperCase();
  graphicsElement.attr('Color', gpmlColor);

  console.log('Updated values:');
  console.log('Color: ' + gpmlColor);

  pvjs.editor.save(gpmlDoc);
}

module.exports = propertiesTab;
