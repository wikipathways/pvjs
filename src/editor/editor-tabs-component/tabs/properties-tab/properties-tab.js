/***********************************
 * propertiesTab
 **********************************/

var _ = require('lodash');
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

    vm.color = m.prop('');

    // react to user updating color value
    vm.updateColor = function(newColor) {
      if (!!newColor) {
        vm.color = m.prop(newColor);
      }
    };

    propertiesTab.vm.saveButtonClass = 'btn-default';

    /***********************************************
     * DataNode onclick event handler
     **********************************************/

    var diagramContainer = document.querySelector('.diagram-container');
    diagramContainer.addEventListener('click', editorOnClickDiagramContainer, false);

    function editorOnClickDiagramContainer(event) {
      m.startComputation();

      // TODO this is a kludge. refactor.
      propertiesTab.vm.saveButtonClass = 'btn-success';

      var selectedElementId = event.target.id;

      selectedPvjsElement = pvjs.sourceData.pvjson.elements.filter(function(pvjsElement) {
        return pvjsElement.id === selectedElementId;
      })
      .map(function(pvjsElement) {
        return pvjsElement;
      })[0];

      if (!selectedPvjsElement) {
        m.endComputation();
        return;
      }

      // TODO next section is a kludge. refactor to not display annotation panel in edit mode.
      event.preventDefault();
      document.querySelector('.annotation').properties.display = 'none';
      window.setTimeout(function() {
        document.querySelector('.annotation').properties.visibility = 'hidden';
        document.querySelector('.annotation').properties.display = null;
      }, 2000);

      m.endComputation();
    }

    vm.save = function() {
      propertiesTab.vm.saveButtonClass = 'btn-default';

      updateGraphicsInGpml(pvjs, selectedPvjsElement.id, propertiesTab.vm.color());
    }

    vm.cancel = function() {
      propertiesTab.vm.saveButtonClass = 'btn-default';
      diagramContainer.removeEventListener('click', editorOnClickDiagramContainer);
    }
  }

  return vm;
})();

propertiesTab.controller = function() {
  propertiesTab.vm.init();
}

//here's the view
propertiesTab.view = function() {
  return m('nav.navbar.navbar-default.navbar-form.well.well-sm', [
    m('div.form-group.well.well-sm.navbar-left', [
      m('input[placeholder="Color"].form-control.input.input-sm', {
        onchange: m.withAttr('value',
                    propertiesTab.vm.updateColor),
        value: propertiesTab.vm.color()
      })
    ]),
    m('div.form-group.well.well-sm.navbar-left', [
      m('button[type="submit"].btn.btn-sm.' + propertiesTab.vm.saveButtonClass, {
        onclick: propertiesTab.vm.save
      }, [
        m('span.glyphicon.glyphicon-ok')
      ]),
    ]),
    m('span.glyphicon.glyphicon-remove.navbar-right[style="color: #aaa;"]', {
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

  var dataNodeElement = gpmlDoc.find('DataNode[GraphId="' + selectedElementId + '"]');
  var graphicsElement = dataNodeElement.find('Graphics');

  graphicsElement.attr('Color', color);

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
}

module.exports = propertiesTab;
