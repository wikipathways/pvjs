var _ = require('lodash');
var insertCss = require('insert-css');
var fs = require('fs');
var EditorTabsComponent = require('./editor-tabs-component/editor-tabs-component');
var m = require('mithril');

var css = [
  fs.readFileSync(__dirname + '/editor.css')
];

module.exports = function(pvjs) {
  var containerElement = pvjs.$element[0][0];
  var diagramContainerElement;
  var editorTabsComponentContainerElement;
  var annotationPanelContainer;
  var editorTriggerButton;

  css.map(insertCss);

  var editorTabsComponent = new EditorTabsComponent(pvjs);

  //module for editorComponent
  //for simplicity, we use this module to namespace the model classes
  var editorComponent = {};

  //the view-model,
  editorComponent.vm = (function() {
    var vm = {};

    vm.init = function(pvjs) {
      vm.editorState = m.route.param('editorState');

      vm.onunload = function() {
        console.log('unloading editor module');
        vm[m.route.param('editorState')]();
      };

      vm.tester = m.prop('');

      // react to user updating tester value
      vm.updateTester = function(newTester) {
        if (!!newTester) {
          vm.tester = m.prop(newTester);
        }
      };

      vm.open = function() {
        diagramContainerElement = containerElement.querySelector('.diagram-container');
        editorTabsComponentContainerElement = containerElement.querySelector(
        '.pvjs-editor-tabs');
        annotationPanelContainer = containerElement.querySelector('.annotation');
        editorTriggerButton = containerElement.querySelector('.edit-trigger');

        diagramContainerElement.addEventListener('click', onClickDiagramContainer, false);

        editorTriggerButton.style.visibility = 'hidden';

        // TODO this is a kludge. refactor how we avoid displaying annotation panel in edit mode.
        annotationPanelContainer.style.display = 'none';
        annotationPanelContainer.style.visibility = 'hidden';

        editorTabsComponent.vm.init(pvjs);
      };

      vm.close = function() {
        clearSelection();

        // TODO this is a kludge. refactor how we avoid displaying annotation panel in edit mode.
        annotationPanelContainer.style.display = null;
        annotationPanelContainer.style.visibility = 'hidden';

        diagramContainerElement.setAttribute(
            'style', 'height: ' + pvjs.elementHeight + 'px;');
        pvjs.panZoom.resizeDiagram();
        editorTriggerButton.style.visibility = 'visible';

        editorTabsComponent.close();
      };

    };
    return vm;
  }());

  //the controller defines what part of the model is relevant for the current page
  //in our case, there's only one view-model that handles everything
  editorComponent.controller = function() {
    editorComponent.vm.init();
  };

  //here's the view
  editorComponent.view = function() {
    console.log('editorState');
    console.log(editorComponent.vm.editorState);
    if (editorComponent.vm.editorState === 'disabled') {
      return;
    } else if (editorComponent.vm.editorState === 'closed') {
      return m('div.edit-trigger.label.label-default', {}, [
        m('a[href="/editor/open"]', {
          config: m.route,
          /*
          onclick: m.withAttr('value', editorComponent.vm.open),
          value: editorComponent.vm.tester()
          //*/
        }, [
          m('span.glyphicon.glyphicon-chevron-up[aria-hidden="true"]', {}, 'Quick Edit'),
        ])
      ]);
      /*
      return m('div.edit-trigger.label.label-default', {}, [
        m('span.glyphicon.glyphicon-chevron-up[aria-hidden="true"]', {
          onclick: m.withAttr('value', editorComponent.vm.open),
          value: editorComponent.vm.tester()
        }, 'Quick Edit'),
      ]);
      //*/
    } else if (editorComponent.vm.editorState === 'open') {
      return [
        m('div.pvjs-editor-tabs', {
          onchange: m.withAttr('value',
                      editorComponent.vm.updateTester),
          value: editorComponent.vm.tester()
        }),
        editorTabsComponent.view()
      ];
    }
  };

  /***********************************************
   * DataNode onclick event handler
   **********************************************/
  function onClickDiagramContainer(event) {
    m.startComputation();

    var selectedElementId = event.target.id;

    if (!!pvjs.editor.selectedPvjsElement) {
      pvjs.publicInstance.highlighter.attenuate('#' + pvjs.editor.selectedPvjsElement.id);
    }

    pvjs.publicInstance.highlighter.highlight('#' + selectedElementId, null, {
      backgroundColor: 'white', borderColor: 'green'
    });

    pvjs.editor.selectedPvjsElement = pvjs.sourceData.pvjson.elements.filter(function(pvjsElement) {
      return pvjsElement.id === selectedElementId;
    })
    .map(function(pvjsElement) {
      return pvjsElement;
    })[0];

    if (!pvjs.editor.selectedPvjsElement) {
      m.endComputation();
      return;
    }

    editorTabsComponent.onClickDiagramContainer(pvjs.editor.selectedPvjsElement);

    m.endComputation();
  }

  function clearSelection() {
    if (pvjs.editor.selectedPvjsElement) {
      pvjs.publicInstance.highlighter.attenuate('#' + pvjs.editor.selectedPvjsElement.id);
    }

    pvjs.editor.selectedPvjsElement = null;
  }

  function cancel() {
    clearSelection();
    close();
  }

  function save(gpmlDoc) {
    var serializerInstance = new XMLSerializer();
    var gpmlString = serializerInstance.serializeToString(gpmlDoc[0]);

    console.log('');
    console.log('');
    console.log('');
    console.log('*********************************************************************');
    console.log('*********************************************************************');
    console.log('');
    console.log('Updated GPML file as string:');
    console.log('');
    console.log(gpmlString);
    console.log('');
    console.log('*********************************************************************');
    console.log('*********************************************************************');
    console.log('');

    console.log('You have successfully updated a GPML DataNode.');
    console.warn('This change applies to your browser only.');
    console.warn('You still need to save it to the backend.');

    var pvjsdatachangeEvent = new CustomEvent('pvjsdatachange', {
      detail: {
        pvjson: pvjs.sourceData.pvjson,
        gpml: gpmlString
      }
    });
    containerElement.dispatchEvent(pvjsdatachangeEvent);
  }

  return editorComponent;

  /*
  return {
    init: editorComponent.vm.init,
    open: open,
    close: close,
    cancel: cancel,
    clearSelection: clearSelection,
    save: save
  };
  //*/

};
