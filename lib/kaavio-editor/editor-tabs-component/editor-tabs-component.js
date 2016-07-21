var _ = require('lodash');
var annotationTab = require('./tabs/annotation-tab/annotation-tab');
var propertiesTab = require('./tabs/properties-tab/properties-tab');
// TODO figure out why m.redraw doesn't work with browserify
// and kaavio-editor
//var m = require('mithril');
var m = window.m;

//module for editorTabsComponent
//for simplicity, we use this module to namespace the model classes
var editorTabsComponent = {};

//the view-model,
editorTabsComponent.vm = (function() {
  var vm = {};

  vm.init = function(kaavio) {
    var jsonldRx = kaavio.jsonldRx;
    kaavio.editor.editorTabsComponent = editorTabsComponent;

    vm.state = kaavio.kaavioComponent.vm.state;
    vm.close = kaavio.editor.vm.close;

    var parentPartition = vm.pvjsElementPartition = kaavio.editor.vm.pvjsElementPartition;

    vm.pvjsElementSource = parentPartition[0];
    vm.resetSource = parentPartition[1];

    vm.hasDataChanged = function() {
      if (!kaavio.sourceData || !kaavio.sourceData.pvjsonPreUpdateAsString) {
        return false;
      }

      var currentPvjsonAsString = JSON.stringify(kaavio.sourceData.pvjson);
      var dataChanged = (currentPvjsonAsString !==
          kaavio.sourceData.pvjsonPreUpdateAsString);
      return dataChanged;
    }

    vm.pvjsElementSource
      .subscribe(function(pvjsElement) {
        vm.pvjsElement = pvjsElement;
      }, function(err) {
        console.log(err);
      }, function(value) {
        // do something
      });

    vm.reset = function() {
      // do something
    };

    vm.resetSource
      .subscribe(function(value) {
        vm.reset();
      }, function(err) {
        console.log(err);
      }, function(value) {
        // do something
      });

    //the Tab class has two properties
    editorTabsComponent.Tab = function(data) {
      this.title = m.prop(data.title);
      this.component = data.component;
    };

    //the TabList class is a list of Tabs
    editorTabsComponent.TabList = m.prop([
      {
        title: 'Annotation',
        component: annotationTab
      },
      {
        title: 'Properties',
        component: propertiesTab
      }
      /* TODO add the rest of the tabs
      {
        title: 'Citations',
        component: null
      },
      //*/
    ]
    .map(function(tab) {
      return new editorTabsComponent.Tab(tab);
    }));

    vm.changeStateToBtnStyle = {
      'true': 'btn-success',
      'false': 'btn-close'
    };

    vm.changeStateToGlyphicon = {
      'true': 'span.glyphicon.glyphicon-ok[aria-hidden="true"]',
      'false': 'span.glyphicon.glyphicon-chevron-down[aria-hidden="true"]'
    };

    vm.changeStateToBtnText = {
      'true': ' Save & Close',
      'false': ' Close'
    };

    // TODO is this needed?
    vm.open = function() {
    };

    /*
    vm.close = function() {
      annotationTab.vm.onunload();
      propertiesTab.vm.onunload();
    };
    //*/

    vm.tabList = new editorTabsComponent.TabList();
    vm.currentTab = m.prop(vm.tabList[0]);
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
editorTabsComponent.controller = function(ctrl) {
  editorTabsComponent.vm.init(ctrl);
};

//here's the view
editorTabsComponent.view = function(ctrl, args) {
  var vm = editorTabsComponent.vm;
  var dataChanged = vm.hasDataChanged();

  return m('div', {
    'class': 'kaavio-editor'
  }, [
    m('div', {
      'class': 'kaavio-editor-top-row'
    }, [
      m('ul.nav.nav-tabs', {
        'class': 'kaavio-editor-tabs'
      }, [
        vm.tabList.map(function(tab) {
          var activeString = tab.title() === vm.currentTab().title() ?
              '.active' : '';
          return m('li' + activeString + '[role="presentation"]', {}, [
            m('a[style="cursor: pointer"]', {
              onchange: m.withAttr('value', tab.title),
              onclick: m.withAttr('value', vm.changeTab),
              value: tab.title()
            }, tab.title())
          ]);
        })
      ]),
      m('span', {
        'class': 'kaavio-editor-close-control btn ' +
            vm.changeStateToBtnStyle[
                dataChanged],
        'onclick': function onClick(e) {
          vm.state.footer('closed');
          vm.close();
        },
        title: dataChanged ? 'Save and Close' : 'Close'
      }, [
      m(vm.changeStateToGlyphicon[dataChanged]),
      vm.changeStateToBtnText[dataChanged]
      ])
      /*
      m('div', {
        'class': 'kaavio-editor-close-control',
        'onclick': function onClick(e) {
          vm.state.footer('closed');
          vm.close();
        },
        title: dataChanged ? 'Save and Close' : 'Close'
      }, [
        m('span', {
          'class': 'btn ' +
              vm.changeStateToBtnStyle[
                  dataChanged],
        }, [
        m(vm.changeStateToGlyphicon[
            dataChanged]),
        m('span', {}, vm.changeStateToBtnText[
            dataChanged])
        ])
      ])
      //*/
    ]),
    m.component(vm.currentTab().component, args),
  ]);
};

module.exports = editorTabsComponent;
