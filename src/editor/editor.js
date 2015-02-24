var _ = require('lodash');
var insertCss = require('insert-css');
var EditorTabsComponent = require('./editor-tabs-component/editor-tabs-component');

var css = [
  './editor.css'
];

module.exports = function(pvjs) {

  var editorTabsComponent = new EditorTabsComponent(pvjs);
  var containerElement = pvjs.$element[0][0];
  var diagramContainerElement = containerElement.querySelector('.diagram-container');
  var editorTriggerButton = containerElement.querySelector('.edit-trigger');

  // TODO get rid of jQuery
  $(editorTriggerButton).on('click', function(event) {
    open();
  });

  function open() {
    diagramContainerElement.setAttribute(
        'style', 'height: ' + (pvjs.elementHeight - 120) + 'px;');
    pvjs.panZoom.resizeDiagram();
    editorTriggerButton.style.visibility = 'hidden';
    editorTabsComponent.open();
  }

  function close() {
    diagramContainerElement.setAttribute(
        'style', 'height: ' + pvjs.elementHeight + 'px;');
    pvjs.panZoom.resizeDiagram();
    editorTriggerButton.style.visibility = 'visible';

    editorTabsComponent.close();
  }

  return {
    open: open,
    close: close
  };

};
