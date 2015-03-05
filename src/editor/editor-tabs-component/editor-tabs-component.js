var _ = require('lodash');
var annotationTab = require('./tabs/annotation-tab/annotation-tab');
var highland = require('highland');
var propertiesTab = require('./tabs/properties-tab/properties-tab');
var m = require('mithril');

module.exports = function(pvjs) {

  var containerElement = pvjs.$element[0][0];
  var editorTabsComponentContainerElement = containerElement.querySelector(
      '.pvjs-editor-tabs');

  //module for editorTabsComponent
  //for simplicity, we use this module to namespace the model classes
  var editorTabsComponent = {};

  //the Tab class has two properties
  editorTabsComponent.Tab = function(data) {
    this.title = m.prop(data.title);
    this.view = highland.partial(data.view);
  };

  //the TabList class is a list of Tabs
  editorTabsComponent.TabList = m.prop([
    {
      title: 'Annotation',
      view: annotationTab.view
    },
    {
      title: 'Properties',
      view: propertiesTab.view
      //view: propertiesTab.view
    }
    /* TODO add the rest of the tabs
    {
      title: 'Citations',
      view: null
    },
    //*/
  ]
  .map(function(tab) {
    return new editorTabsComponent.Tab(tab);
  }));

  //the view-model,
  editorTabsComponent.vm = (function() {
    var vm = {};

    vm.onClickDiagramContainer = function(selectedPvjsElement) {
      annotationTab.vm.onClickDiagramContainer(selectedPvjsElement);
      propertiesTab.vm.onClickDiagramContainer(selectedPvjsElement);
    }

    // TODO is this needed?
    vm.open = function() {
    };

    vm.close = function() {
      //editorTabsComponentContainerElement.innerHTML = '';
    };

    vm.tabList = new editorTabsComponent.TabList();
    vm.currentTab = m.prop(vm.tabList[0]);

    vm.init = function() {
      annotationTab.vm.init(pvjs);
      propertiesTab.vm.init(pvjs);
    };

    vm.changeTab = function(title) {
      vm.currentTab(_.find(vm.tabList, function(tab) {
        return tab.title() === title;
      }));
    };

    return vm;
  }());

  //the controller defines what part of the model is relevant for the current page
  //in our case, there's only one view-model that handles everything
  editorTabsComponent.controller = function() {
    editorTabsComponent.vm.init();
  };

  //here's the view
  editorTabsComponent.view = function() {
    return [
      m('ul.nav.nav-tabs', {}, [
        editorTabsComponent.vm.tabList.map(function(tab) {
          var activeString = tab.title() === editorTabsComponent.vm.currentTab().title() ?
              '.active' : '';
          return m('li' + activeString + '[role="presentation"]', {}, [
            m('a[style="cursor: pointer"]', {
              onchange: m.withAttr('value', tab.title),
              onclick: m.withAttr('value', editorTabsComponent.vm.changeTab),
              value: tab.title()
            }, tab.title())
          ]);
        })
      ]),
      /*
      m('span.glyphicon.glyphicon-remove.btn.navbar-right[style="color: #aaa; transform: translateY(-10px);"]', {
        onclick: annotationTab.vm.cancel
      }),
      //*/
      m('a[href="/editor/closed"]', {
        config: m.route,
        /*
        onclick: m.withAttr('value', editorComponent.vm.open),
        value: editorComponent.vm.tester()
        //*/
      }, [
        m('span.editor-close-control.glyphicon.glyphicon-remove.btn.navbar-right')
      ]),
      editorTabsComponent.vm.currentTab().view()
    ];
  };

  return editorTabsComponent;

};
