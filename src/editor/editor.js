var _ = require('lodash');
var insertCss = require('insert-css');
var fs = require('fs');
var EditorTabsComponent = require('./editor-tabs-component/editor-tabs-component');
var m = require('mithril');

var css = [
  fs.readFileSync(__dirname + '/editor.css')
];

module.exports = function(pvjs) {
  css.map(insertCss);

  var editorTabsComponent = new EditorTabsComponent(pvjs);
  var containerElement = pvjs.$element[0][0];
  var diagramContainerElement = containerElement.querySelector('.diagram-container');
  var editorTriggerButton = containerElement.querySelector('.edit-trigger');

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

    clearSelection();

    // TODO this is a kludge. refactor how we avoid displaying annotation panel in edit mode.
    document.querySelector('.annotation').style.display = null;
    document.querySelector('.annotation').style.visibility = 'hidden';

    diagramContainerElement.setAttribute(
        'style', 'height: ' + pvjs.elementHeight + 'px;');
    pvjs.panZoom.resizeDiagram();
    editorTriggerButton.style.visibility = 'visible';

    editorTabsComponent.close();
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

    var pathvisiojsdatachangeEvent = new CustomEvent('pvjsdatachange', {
      detail: {
        pvjson: pvjs.sourceData.pvjson,
        gpml: gpmlString
      }
    });
    containerElement.dispatchEvent(pathvisiojsdatachangeEvent);
  }

  return {
    open: open,
    close: close,
    cancel: cancel,
    clearSelection: clearSelection,
    save: save
  };

};
