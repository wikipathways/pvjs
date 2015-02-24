var _ = require('lodash');
var insertCss = require('insert-css');
var EditorTabsComponent = require('./editor-tabs-component/editor-tabs-component');
var m = require('mithril');

var css = [
  './editor.css'
];

module.exports = function(pvjs) {

  var editorTabsComponent = new EditorTabsComponent(pvjs);
  var containerElement = pvjs.$element[0][0];
  var diagramContainerElement = containerElement.querySelector('.diagram-container');
  var editorTriggerButton = containerElement.querySelector('.edit-trigger');
  var selectedPvjsElement;

  editorTriggerButton.addEventListener('click', function(event) {
    open();
  }, false);

  /***********************************************
   * DataNode onclick event handler
   **********************************************/
  var diagramContainer = document.querySelector('.diagram-container');
  function onClickDiagramContainer(event) {
    m.startComputation();

    var selectedElementId = event.target.id;

    pvjs.publicInstance.highlighter.highlight('#' + selectedElementId);

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

    editorTabsComponent.onClickDiagramContainer(selectedPvjsElement);

    m.endComputation();
  }

  function clearSelection() {
    if (selectedPvjsElement) {
      pvjs.publicInstance.highlighter.attenuate('#' + selectedPvjsElement.id);
    }

    selectedPvjsElement = null;
  }

  function cancel() {
    clearSelection();
    close();
  }

  function open() {
    diagramContainer.addEventListener('click', onClickDiagramContainer, false);

    // TODO this is a kludge. refactor how we avoid displaying annotation panel in edit mode.
    document.querySelector('.annotation').style.display = 'none';
    document.querySelector('.annotation').style.visibility = 'hidden';

    diagramContainerElement.setAttribute(
        'style', 'height: ' + (pvjs.elementHeight - 120) + 'px;');
    pvjs.panZoom.resizeDiagram();
    editorTriggerButton.style.visibility = 'hidden';
    editorTabsComponent.open();
  }

  function close() {
    diagramContainer.removeEventListener('click', onClickDiagramContainer);

    if (selectedPvjsElement) {
      pvjs.publicInstance.highlighter.attenuate('#' + selectedPvjsElement.id);
    }

    // TODO this is a kludge. refactor how we avoid displaying annotation panel in edit mode.
    document.querySelector('.annotation').style.display = null;
    document.querySelector('.annotation').style.visibility = 'hidden';

    diagramContainerElement.setAttribute(
        'style', 'height: ' + pvjs.elementHeight + 'px;');
    pvjs.panZoom.resizeDiagram();
    editorTriggerButton.style.visibility = 'visible';

    editorTabsComponent.close();
  }

  return {
    open: open,
    close: close,
    cancel: cancel,
    clearSelection: clearSelection
  };

};
