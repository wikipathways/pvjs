var _ = require('lodash');
var annotationTab = require('./tabs/annotation-tab/annotation-tab');
var propertiesTab = require('./tabs/properties-tab/properties-tab');
var insertCss = require('insert-css');
var m = require('mithril');

var css = [
  './editor-tabs-component.css'
];

module.exports = function(pvjs) {

  var containerElement = pvjs.$element[0][0];
  var editorTabsComponentContainerElement = containerElement.querySelector(
      '.pathvisiojs-editor-tabs');

  function open() {
    m.module(editorTabsComponentContainerElement, editorTabsComponent);
  }

  function close() {
    editorTabsComponentContainerElement.innerHTML = '';
  }

  //module for editorTabsComponent
  //for simplicity, we use this module to namespace the model classes
  var editorTabsComponent = {};

  //the view-model,
  editorTabsComponent.vm = (function() {
    var vm = {}

    vm.tabs = [
      {
        title: 'Annotation',
        view: annotationTab.view
      },
      {
        title: 'Properties',
        view: propertiesTab.view
      }
      /* TODO add the rest of the tabs
      {
        title: 'Citations',
        view: null
      },
      //*/
    ].map(function(tab) {
      return m.prop(tab);
    });

    vm.init = function() {
      if (!_.isEmpty(css)) {
        css.map(insertCss);
      }

      vm.currentTab = vm.tabs[0];

      annotationTab.vm.init(pvjs);
      propertiesTab.vm.init(pvjs);
    }

    vm.changeTab = function(title) {
      vm.currentTab = _.find(vm.tabs, function(tab) {
        return tab().title === title;
      });
    }

    return vm
  }());

  //the controller defines what part of the model is relevant for the current page
  //in our case, there's only one view-model that handles everything
  editorTabsComponent.controller = function() {
    editorTabsComponent.vm.init();
  }

  //here's the view
  editorTabsComponent.view = function() {
    return [
      m('section.pathvisiojs-editor-tabs', {}, [
        m('ul.nav.nav-tabs', {}, [
          editorTabsComponent.vm.tabs.map(function(tab) {
            var title = tab().title;
            var currentTitle = editorTabsComponent.vm.currentTab().title;
            var activeString = title === currentTitle ?
                '.active' : '';
            return m('li' + activeString + '[role="presentation"]', {}, [
              m('a[href="#"]', {
                onclick: m.withAttr('value',
                            editorTabsComponent.vm.changeTab),
                value: tab().title
              }, tab().title)
            ])
          })
        ]),
        editorTabsComponent.vm.currentTab().view()
      ])
    ];
  };

  return {
    open: open,
    close: close
  };

};
