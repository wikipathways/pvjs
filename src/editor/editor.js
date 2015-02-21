var _ = require('lodash');
var xrefSpecifier = require('./xref-specifier');
var insertCss = require('insert-css');
var m = require('mithril');

var css = [
];

module.exports = function(pvjs) {

  $('.edit-trigger').on('click', function(event) {
    var xrefSpecifierContainerElement = document.querySelector(
        '.pathvisiojs-editor-xref-selector');

    var editorToggleButton = document.querySelector('.edit-trigger').querySelector('button');

    var containerElement = pvjs.$element[0][0];
    var diagramContainerElement = containerElement.querySelector('.diagram-container');
    var editorToggleButtonText = editorToggleButton.textContent;
    if (editorToggleButtonText === 'Edit') {
      diagramContainerElement.setAttribute(
          'style', 'height: ' + (pvjs.elementHeight - 100) + 'px;');
      pvjs.panZoom.resizeDiagram();

      m.module(xrefSpecifierContainerElement, editor);

      editorToggleButton.textContent = 'Done';
    } else {
      xrefSpecifierContainerElement.innerHTML = '';
      diagramContainerElement.setAttribute(
          'style', 'height: ' + pvjs.elementHeight + 'px;');
      pvjs.panZoom.resizeDiagram();
      editorToggleButton.textContent = 'Edit';
    }
  });

  //module for editor
  //for simplicity, we use this module to namespace the model classes
  var editor = {};

  //the view-model,
  editor.vm = (function() {
    var vm = {}
    vm.init = function() {
      if (!_.isEmpty(css)) {
        css.map(insertCss);
      }

      xrefSpecifier.vm.init(pvjs);
    }
    return vm
  }());

  //the controller defines what part of the model is relevant for the current page
  //in our case, there's only one view-model that handles everything
  editor.controller = function() {
    editor.vm.init();
  }

  //here's the view
  editor.view = function() {
    return [
      m('section', {}, [
        xrefSpecifier.view()
      ])
    ];
  };

};
