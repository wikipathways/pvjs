var _ = require('lodash');
var xrefSpecifier = require('./xref-specifier');
var insertCss = require('insert-css');
var m = require('mithril');

var css = [
];

module.exports = function(pvjs) {

  function open() {
    var xrefSpecifierContainerElement = document.querySelector(
        '.pathvisiojs-editor-xref-selector');

    var editorToggleButton = document.querySelector('.edit-trigger');

    var containerElement = pvjs.$element[0][0];
    var diagramContainerElement = containerElement.querySelector('.diagram-container');

    diagramContainerElement.setAttribute(
        'style', 'height: ' + (pvjs.elementHeight - 120) + 'px;');
    pvjs.panZoom.resizeDiagram();

    m.module(xrefSpecifierContainerElement, editor);

    editorToggleButton.style.visibility = 'hidden';
  }

  function close() {
    var xrefSpecifierContainerElement = document.querySelector(
        '.pathvisiojs-editor-xref-selector');

    var editorToggleButton = document.querySelector('.edit-trigger');

    var containerElement = pvjs.$element[0][0];
    var diagramContainerElement = containerElement.querySelector('.diagram-container');

    var editorToggleButtonVisibility = editorToggleButton.style.visibility;

    xrefSpecifierContainerElement.innerHTML = '';
    diagramContainerElement.setAttribute(
        'style', 'height: ' + pvjs.elementHeight + 'px;');
    pvjs.panZoom.resizeDiagram();
    editorToggleButton.style.visibility = 'visible';
  }

  $('.edit-trigger').on('click', function(event) {
    open();
  });

  //module for editor
  //for simplicity, we use this module to namespace the model classes
  var editor = {};

  //the view-model,
  editor.vm = (function() {
    var vm = {}

    vm.tabs = [
      {
        title: 'Identifiers',
        view: xrefSpecifier.view
      },
      /* TODO add the rest of the tabs
      {
        title: 'Citations',
        view: null
      },
      {
        title: 'Format',
        view: null
      }
      //*/
    ];

    vm.init = function() {
      if (!_.isEmpty(css)) {
        css.map(insertCss);
      }

      vm.currentTab = vm.tabs[0];

      xrefSpecifier.vm.init(pvjs);
    }

    vm.changeTab = function(tab) {
      vm.currentTab = tab;
    }

    return vm
  }());

  //the controller defines what part of the model is relevant for the current page
  //in our case, there's only one view-model that handles everything
  editor.controller = function() {
    editor.vm.init();
  }

  /*
    <ul class="nav nav-tabs">
      <li role="presentation" class="active"><a href="#">Home</a></li>
      <li role="presentation"><a href="#">Profile</a></li>
      <li role="presentation"><a href="#">Messages</a></li>
    </ul>
  //*/

  //here's the view
  editor.view = function() {
    return [
      m('section', {}, [
        m('ul.nav.nav-tabs', {}, [
          editor.vm.tabs.map(function(tab) {
            var activeString = tab.title === editor.vm.currentTab.title ?
                '.active' : '';
            return m('li' + activeString + '[role="presentation"]', {}, [
              m('a[href="#"]', {
                onchange: m.withAttr('value',
                            editor.vm.changeTab),
                value: tab
              }, tab.title)
            ])
          })
        ]),
        editor.vm.currentTab.view()
      ])
    ];
  };

  pvjs.editor = {};
  pvjs.editor.open = open;
  pvjs.editor.close = close;

};
