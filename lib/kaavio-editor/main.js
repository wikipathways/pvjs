var _ = require('lodash');
var insertCss = require('insert-css');
var fs = require('fs');
var editorTabsComponent = require('./editor-tabs-component/editor-tabs-component.js');
var editorUtils = require('./editor-utils.js');
var Rx = require('rx-extra');
// TODO figure out why m.redraw doesn't work with browserify
// and kaavio-editor
//var m = require('mithril');

var css = [
  fs.readFileSync(__dirname + '/editor.css')
];

css.map(insertCss);

//module for editor
//for simplicity, we use this module to namespace the model classes
var editor = {};

//the view-model,
editor.vm = (function() {
  var vm = {};

  editor.save = function save() {
    return vm.sourceData.pvjson;
  };

  vm.init = function(kaavio) {
    kaavio.annotationPanel.vm.disabled(true);
    var jsonldRx = kaavio.jsonldRx;
    editor.trigger = kaavio.trigger.bind(kaavio);

    kaavio.sourceData.pvjsonPreUpdateAsString = JSON.stringify(kaavio.sourceData.pvjson);
    vm.sourceData = kaavio.sourceData;

    vm.state = kaavio.kaavioComponent.vm.state.footer;

    vm.onunload = function() {
      vm.close();
    };

    vm.open = function() {
      vm.state('open');
      kaavio.on('rendered', function() {
        //m.redraw();
      });
    };

    vm.close = function() {
      kaavio.annotationPanel.vm.disabled(false);
      //kaavio.diagramComponent.vm.clickTargetIdSource.onNext(null);
      if (editorTabsComponent.vm.hasDataChanged()) {
        editor.save();
      }
      editor.vm.state('closed');
      if (!!editor.panZoom) {
        kaavio.panZoom.resizeDiagram();
      }
    };

    vm.disabled = vm.closed;

    var parentPartition = kaavio.diagramComponent.vm.selectionPartition;
    var pvjsElementPartition = vm.pvjsElementPartition = Rx.Observable.hierarchicalPartition(
        function(pvjsElement) {
          return pvjsElement.id;
        },
        parentPartition[0],
        parentPartition[1]
    );

    vm.pvjsElementSource = pvjsElementPartition[0];
    vm.resetSource = pvjsElementPartition[1];

    vm.pvjsElementSource.subscribe(function(pvjsElement) {
      // do something
    });
    vm.resetSource.subscribe(function() {
      vm.reset();
    });
  };

  vm.reset = function() {
    editorTabsComponent.vm.pvjsElement = null;
    // do something
  };

  return vm;
}());

//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything
editor.controller = function(ctrl) {
  editor.vm.init(ctrl);
};

//here's the view
editor.view = function(ctrl, args) {
  var vm = editor.vm;
  if (editor.vm.state() === 'open') {
    return m('div', {}, [
      m.component(editorTabsComponent, args)
    ]);
  } else {
    return;
  }
  //*/
};

module.exports = editor;
