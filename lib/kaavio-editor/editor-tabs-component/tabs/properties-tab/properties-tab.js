/***********************************
 * propertiesTab
 **********************************/

var _ = window._ = require('lodash');
var colorPickerControl = require('../../../sub-components/color-picker-control');
var fs = require('fs');
var highland = require('highland');
// TODO figure out why m.redraw doesn't work with browserify
// and kaavio-editor
//var m = require('mithril');
var m = window.m;
var mithrilUtils = require('../../../mithril-utils');
var Rx = require('rx-extra');

var propertiesTab = {};

propertiesTab.Item = function(item) {
  this.id = m.prop(item.id);
  this.name = m.prop(item.name);
};

propertiesTab.vm = (function() {

  var vm = {};

  vm.fontStyleToButtonStyleMappings = {
    italic: 'background-color: lightgray; ',
    normal: ''
  };

  vm.fontWeightToButtonStyleMappings = {
    bold: 'background-color: lightgray; ',
    normal: ''
  };

  vm.init = function(kaavio) {
    var jsonldRx = kaavio.jsonldRx;

    var editorTabsComponent = kaavio.editor.editorTabsComponent;

    vm.containerElement = kaavio.containerElement;

    vm.disabled = m.prop(true);
    vm.color = m.prop('#000000');
    vm.fontStyle = m.prop('normal');
    vm.fontWeight = m.prop('normal');

    vm.cancel = function() {
      kaavio.editor.cancel();
    };

    vm.reset = function() {
      vm.disabled(true);
      vm.color('#000000');
      vm.fontStyle('normal');
      vm.fontWeight('normal');
    };

    var parentPartition = editorTabsComponent.vm.pvjsElementPartition;
    var pvjsElementPartition = vm.pvjsElementPartition = Rx.Observable.hierarchicalPartition(
        function(pvjsElement) {
          return pvjsElement['gpml:element'] === 'gpml:DataNode';
        },
        parentPartition[0],
        parentPartition[1]
    );

    vm.pvjsElementSource = pvjsElementPartition[0];
    vm.resetSource = pvjsElementPartition[1];

    /*
    Rx.Observable.merge(vm.pvjsElementSource, vm.resetSource)
      .subscribe(function(value) {
        var dataset = bridgeDbIdControl.vm.dataset();
        var identifier = bridgeDbIdControl.vm.identifier();
        var pvjsElement = vm.pvjsElement;
        if (pvjsElement && dataset && identifier) {
          pvjsElement.getSetEntityReference({
            id: dataset.id + identifier
          });
        }
      });
    //*/

    vm.pvjsElementSource.subscribe(function(pvjsElement) {
      // Was the data already changed before we make explicit any implicit default values below?
      var dataWasAlreadyChanged = editorTabsComponent.vm.hasDataChanged();

      pvjsElement.color = pvjsElement.color || '#000000';
      vm.color(pvjsElement.color);

      pvjsElement.fontWeight = !!pvjsElement.fontWeight ?
          pvjsElement.fontWeight : 'normal';
      vm.fontWeight(pvjsElement.fontWeight);

      pvjsElement.fontStyle = !!pvjsElement.fontStyle ?
          pvjsElement.fontStyle : 'normal';
      vm.fontStyle(pvjsElement.fontStyle);

      // Kludge to handle cases where we change the pvjson, but the change doesn't constitute
      // a real change to the GPML, e.g., we explicitly define an implied value, as we do above.
      if (!dataWasAlreadyChanged) {
        kaavio.sourceData.pvjsonPreUpdateAsString = JSON.stringify(
            kaavio.sourceData.pvjson);
      }

      vm.pvjsElement = pvjsElement;
      vm.disabled(false);
      m.redraw();
    });

    /*
    vm.syncPvjson = function(pvjsElement) {
      var elements = kaavio.sourceData.normalizedPvjsonCurrent['@graph'];
      // TODO why do I need to re-find the pvjsElement? Why doesn't updating
      // vm.pvjsElement also update the pvjsElement in kaavio.sourceData.normalizedPvjsonCurrent?
      var pvjsElementInPvjson = _.find(elements, function(element) {
        return element.id === pvjsElement.id;
      });
      _.assign(pvjsElementInPvjson, pvjsElement);
    }
    //*/

    vm.resetSource.subscribe(function() {
      vm.reset();
    });

    kaavio.diagramComponent.vm.selectionPartition.replay();

    vm.onunload = function() {
      // do something
    };

  };

  return vm;
})();

propertiesTab.controller = function(ctrl) {
  propertiesTab.vm.init(ctrl);
};

//here's the view
propertiesTab.view = function(ctrl, args) {
  var component = propertiesTab;
  //var component = this;
  var vm = component.vm;
  if (!vm) {
    return;
  }

  var pvjsElement = vm.pvjsElement || {};
  var pvjsElementId = pvjsElement.id;
  var containerElement = vm.containerElement;

  var disabled = vm.disabled();
  return m('nav.kaavio-editor-properties.navbar.navbar-default.navbar-form.well.well-sm', [
    m('div.form-group.navbar-left', [
      m('div.input-group.input-group-sm.form-control', {}, [
        m.component(colorPickerControl, {
          color: vm.color,
          disabled: vm.disabled,
          onchange: function(color) {
            vm.color(color);
            pvjsElement.color = color;
            // change border color
            containerElement.querySelector('#' + pvjsElementId).style.stroke = color;
            // change text color
            var textElement = containerElement.querySelector('#text-for-' + pvjsElementId);
            if (textElement) {
              textElement.style.fill = color;
            }
          }
        })
      ]),
    ]),
    m('div.form-group.navbar-left', [
      m('button.btn.btn-sm.btn-default', {
        style: disabled ? 'pointer-events: none; ' : null,
        onclick: function() {
          if (vm.fontWeight() === 'normal') {
            vm.fontWeight('bold');
          } else {
            vm.fontWeight('normal');
          }
          var fontWeight = pvjsElement.fontWeight = vm.fontWeight();

          var textElement = containerElement.querySelector('#text-for-' + pvjsElementId);
          if (textElement) {
            textElement.style.fontWeight = fontWeight;
          }
        }
      }, [
        m('span.glyphicon.icon-bold.form-control', {
          style: disabled ? null :
              vm.fontWeightToButtonStyleMappings[
                  vm.pvjsElement.fontWeight]
        })
      ]),
      m('button.btn.btn-sm.btn-default', {
        style: disabled ? 'pointer-events: none; ' : null,
        onclick: function() {
          if (vm.fontStyle() === 'normal') {
            vm.fontStyle('italic');
          } else {
            vm.fontStyle('normal');
          }
          var fontStyle = pvjsElement.fontStyle = vm.fontStyle();

          var textElement = containerElement.querySelector('#text-for-' + pvjsElementId);
          if (textElement) {
            textElement.style.fontStyle = fontStyle;
          }
        }
      }, [
        m('span.glyphicon.icon-italic.form-control', {
          style: disabled ? null :
              vm.fontStyleToButtonStyleMappings[vm.pvjsElement.fontStyle]
        })
      ]),
    ]),
  ]);
};

module.exports = propertiesTab;
