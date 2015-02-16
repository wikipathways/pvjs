var _ = require('lodash');
var fs = require('fs');
var highland = require('highland');
var insertCss = require('insert-css');
var m = require('mithril');
var simpleModal = global.simpleModal = require('simple-modal');

var css = [
];

var editor = (function() {
  function open() {
    if (!_.isEmpty(css)) {
      css.map(insertCss);
    }

    /* Convert a highland stream into a mithril promise
     * @param {stream} highlandStream
     * @result {promise} mithrilPromise See http://lhorie.github.io/mithril/mithril.deferred.html#differences-from-promises-a-
     */
    function promisify(highlandStream) {
      //tell Mithril to wait for this service to complete before redrawing
      m.startComputation();
      var deferred = m.deferred();

      highlandStream.toArray(function(results) {
        deferred.resolve(results);
        //the service is done, tell Mithril that it may redraw
        m.endComputation();
      });

      return deferred.promise;
    }

    var bridgedb = new BridgeDb({
      baseIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php/',
      //datasetsMetadataIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb-datasources.php',
      datasetsMetadataIri: 'http://localhost:3000/demo-mithril/datasources.txt',
      organism: 'Homo sapiens'
    });

    var promisifiedProp = highland.compose(m.prop, promisify);

    var datasetPrimaryFilter = function(datasetStream) {
      return datasetStream
        .filter(function filter(dataset) {
          return dataset._isPrimary;
        });
    };

    var primaryFreeSearch = function(args) {
      return bridgedb.entityReference.freeSearch(args)
        .filter(function filter(searchResult) {
          return searchResult.isDataItemIn._isPrimary;
        });
    };

    var promisifiedPrimaryFreeSearch = highland.compose(
        promisify, primaryFreeSearch);

    /******************************
      * dummy sample component
      *****************************/

    //namespace
    var app = {};

    //model
    app.DummyList = function() {
      return m.request({method: 'GET', url: 'pages.json'});
    };

    //controller
    app.controller = function() {
      var dummys = app.DummyList();
      return {
        dummys: dummys,
        rotate: function() {
          dummys().push(dummys().shift());
        }
      }
    };

    //view
    app.view = function(ctrl) {
      return [
        ctrl.dummys().map(function(dummy) {
          return m('a', {href: dummy.url}, dummy.title);
        }),
        m('button', {onclick: ctrl.rotate}, 'Rotate links')
      ];
    };

    //initialize

    /******************************
      * simpleModal
      *****************************/

    /** @namespace */
    var simpleModalComponent = {};

    /**
    simpleModalComponent config factory. The params in this doc refer to properties of the `ctrl` argument
    @param {Object} data - the data with which to populate the <option> list
    @param {number} value - the id of the item in `data` that we want to select
    @param {function(Object id)} onchange - the event handler to call when the selection changes.
        `id` is the the same as `value`
    */
    simpleModalComponent.config = function(ctrl) {
      m.startComputation();
      var deferred = m.deferred();
      return function(element, isInitialized) {
        var el = document.querySelector('.simple-modal-content');

        if (!isInitialized) {
          m.startComputation();
          el = simpleModal({content: 'modal content'});
          //el.opts.content = 'updated modal content';
          window.setTimeout(function() {
            deferred.resolve();
            //the service is done, tell Mithril that it may redraw
            m.endComputation();
          }, 1500);
          //m.module(document.querySelector('.simple-modal-content'), bridgeDbXrefSearchResults);
          /*
          //set up simpleModalComponent (only if not initialized already)
          el.simpleModalComponent()
            //this event handler updates the controller when the view changes
            .on('change', function(e) {
              //integrate with the auto-redrawing system...
              m.startComputation();

              //...so that Mithril autoredraws the view after calling the controller callback
              if (typeof ctrl.onchange == 'function') {
                ctrl.onchange(el.simpleModalComponent('val'));
              }

              m.endComputation();
              //end integration
              });
          //*/
        }

        return deferred.promise;

        //update the view with the latest controller value
        //theModal.content = 'updated modal content';
      }
    }

    simpleModalComponent.view = function(xrefList) {

      var theModal = document.querySelector('.simple-modal-content');

      if (!theModal) {
        theModal = simpleModal({content: 'modal content'});
      }

      //m.render(document.body, {config: simpleModalComponent.config({})} [
      //m.render(theModal, [
      //m('body', {config: simpleModalComponent.config({})}, [
      m('body', {} [
        m.render(document.querySelector('.simple-modal-content'), [
          m('table', [
            //bridgeDbXrefSearch.vm.xrefList().map(function(xref, index) {
            xrefList.xrefs().map(function(xref, index) {
              //return m('tr', {onclick: m.withAttr('xref', bridgeDbXrefSearch.vm.selectXref), xref: xref}, [
              return m('tr', {onclick: function() {
                return bridgeDbXrefSearch.vm.selectXref(xref);
              }}, [
                m('td', {}, xref.displayName),
                m('td', {}, xref.db),
                m('td', {}, xref.identifier),
              ])
            })
          ])
        ])
      ]);
    };

    /******************************
      * bridgeDbXrefSearch
      *****************************/

    //module for bridgeDbXrefSearch
    var bridgeDbXrefSearch = {};

    //for simplicity, we use this module to namespace the model classes

    //the XrefList class is a list of Xrefs

    bridgeDbXrefSearch.XrefList = function(query) {
      this.xrefs = m.prop(promisifiedPrimaryFreeSearch({attribute: query}));
      //return promisifiedPrimaryFreeSearch({attribute: query});
    };

    /*
    vm.xrefCandidates = [];

    function displaySearchResults(query) {
      bridgedb.entityReference.freeSearch({attribute: query})
      .filter(function(searchResult) {
        return searchResult.isDataItemIn._isPrimary;
      })
      .reduce('', function(accumulator, searchResult) {
        accumulator += '<br>' + searchResult.db;
        vm.xrefCandidates.push(searchResult);
        return accumulator;
      })
      .each(function(innerHtmlString) {
        console.log('innerHtmlString');
        console.log(innerHtmlString);

        console.log(JSON.stringify(vm.xrefCandidates));

        vm.parent.trigger('loadedXrefSearchResults', vm.xrefCandidates, true)

        var theModal = simpleModal();
        theModal.show(innerHtmlString);
        theModal.updateContent(innerHtmlString);

      });
    }
    //*/

    bridgeDbXrefSearch.ModalList = Array;

    //the view-model tracks a running list of xrefs,
    //stores a query for new xrefs before they are created
    //and takes care of the logic surrounding when searching is permitted
    //and clearing the input after searching a xref to the list
    bridgeDbXrefSearch.vm = (function() {
      var vm = {}
      vm.init = function() {
        // list of xrefs that match the query
        vm.xrefList = m.prop([]);
        vm.modalList = new bridgeDbXrefSearch.ModalList();

        //a slot to store the name of a new xref before it is created
        vm.query = m.prop('');

        //react to the user selecting an xref in the modal
        vm.selectXref = function(xref) {
          // TODO keep working here
          var dataset = xref.isDataItemIn;
          dataset.id = m.prop(dataset['@id']);
          dataset.name = m.prop(dataset._displayName);
          datasetSelector.vm.currentDataset = dataset;
          console.log('xref');
          console.log(xref);
          /*
          if (vm.query()) {
            vm.modalList.push(new bridgeDbXrefSearch.XrefList(vm.query()));
            vm.query('');
          }
          //*/
        };

        //searches for xrefs, which are added to the list, and clears the query field for user convenience
        vm.search = function() {
          if (vm.query()) {
            vm.modalList.push(new bridgeDbXrefSearch.XrefList(vm.query()));
            //vm.modalList.concat(new bridgeDbXrefSearch.XrefList(vm.query()));
            //vm.modalList.push(vm.query());
            //vm.modalList = new bridgeDbXrefSearch.XrefList(vm.query())();
            vm.query('');
            //vm.modalList.push(new bridgeDbXrefSearch.ModalList(vm.xrefList));
            //displaySearchResults(vm.xrefList);
          }
        };
      }
      return vm
    }());

    //the controller defines what part of the model is relevant for the current page
    //in our case, there's only one view-model that handles everything
    bridgeDbXrefSearch.controller = function() {
      bridgeDbXrefSearch.vm.init();
    }

    //here's the view
    bridgeDbXrefSearch.view = function() {
      return [
        m('div[id=example]', {}, 'hello'),
        m('input', {
          onchange: m.withAttr('value', bridgeDbXrefSearch.vm.query),
          value: bridgeDbXrefSearch.vm.query()
        }),
        m('button', {onclick: bridgeDbXrefSearch.vm.search}, 'Search'),
        bridgeDbXrefSearch.vm.modalList.map(function(xrefList, index) {
          return simpleModalComponent.view(xrefList);
        })
      ];
    };

    //initialize the application
    //m.module(document.body, bridgeDbXrefSearch);

    /******************************************************
    //Select2 component (assumes both jQuery and Select2 are included in the page)
    *****************************************/

    /** @namespace */
    var select2 = {};

    /**
    select2 config factory. The params in this doc refer to properties of the `ctrl` argument
    @param {Object} data - the data with which to populate the <option> list
    @param {number} value - the id of the item in `data` that we want to select
    @param {function(Object id)} onchange - the event handler to call when the selection changes.
        `id` is the the same as `value`
    */
    select2.config = function(ctrl) {
      return function(element, isInitialized) {
        var el = $(element);

        if (!isInitialized) {
            //set up select2 (only if not initialized already)
          el.select2({width: '300px'})
                //this event handler updates the controller when the view changes
                .on('change', function(e) {
                  //integrate with the auto-redrawing system...
                  m.startComputation();

                  //...so that Mithril autoredraws the view after calling the controller callback
                  if (typeof ctrl.onchange == 'function') {
                    ctrl.onchange(el.select2('val'));
                  }

                  m.endComputation();
                  //end integration
                });
        }

        //update the view with the latest controller value
        el.select2('val', ctrl.value);
      }
    }

    //this view implements select2's `<select>` progressive enhancement mode
    select2.view = function(ctrl) {
      return m('select', {config: select2.config(ctrl)}, [
        ctrl.data.map(function(item) {
          return m('option', {value: item.id()}, item.name())
        })
      ]);
    };

    //end component

    //usage
    var datasetSelector = {};

    datasetSelector.DatasetList = Array;

    //a dataset
    datasetSelector.Dataset = function(dataset) {
      this.id = m.prop(dataset['@id']);
      this.name = m.prop(dataset._displayName);
    }

    datasetSelector.vm = (function() {
      var vm = {};
      vm.init = function() {
        /*
        //list of datasets to show
        var asyncStream = highland.wrapCallback(highland.flip(window.setTimeout));

        var getDatasets = function() {
          return asyncStream(500).map(function() {
            return [{'@id': 1, '_displayName': 'John'}, {'@id': 2, '_displayName': 'Mary'}, {'@id': 3, '_displayName': 'Jane'}];
          })
          .sequence()
          .map(function(inputDataset) {
            return new datasetSelector.Dataset(inputDataset);
          });
        }

        var promisifiedGetDatasets = highland.compose(promisify, getDatasets);
        //*/

        var propify = function(highlandStream) {
          return highlandStream.map(function(item) {
            return new datasetSelector.Dataset(item);
          });
          /*
          return highlandStream.flatMap(function(item) {
            return highland.pairs(item).reduce({}, function(accumulator, pair) {
              var key = pair[0];
              var value = pair[1];
              accumulator[key] = m.prop(value);
              return accumulator;
            });
          });
          //*/
        }

        var promisifiedGetDatasets = highland.compose(
            promisify, propify, datasetPrimaryFilter, bridgedb.dataset.query);

        vm.datasetList = promisifiedGetDatasets();

        //specify initial selection
        //vm.currentDataset = vm.datasetList()[0];
        vm.currentDataset = {
          id: m.prop('http://identifiers.org/ncbigene'),
          'name': m.prop('Entrez Gene')
        };

        vm.changeDataset = function(id) {
          vm.currentDataset = vm.datasetList().filter(function(dataset) {
            return id == dataset.id();
          })[0];
          console.log(id)
        };
      }
      return vm;
    })();

    datasetSelector.controller = function() {
      datasetSelector.vm.init();
    }

    datasetSelector.view = function() {
      return m('div', [
        m('label', 'Data source:'),
        select2.view({
          data: datasetSelector.vm.datasetList(),
          value: datasetSelector.vm.currentDataset.id(),
          onchange: datasetSelector.vm.changeDataset
        })
      ]);
    }

    //m.module(document.body, datasetSelector);

    /*
    //usage
    var dashboard = {};

    dashboard.ItemList = Array;

    //a user
    dashboard.Item = function(item) {
      this.id = m.prop(item.id);
      this.name = m.prop(item.name);
    }

    dashboard.vm = (function() {
      var vm = {};
      vm.init = function() {
        //list of users to show
        var inputItems = [{id: 1, name: 'John'}, {id: 2, name: 'Mary'}, {id: 3, name: 'Jane'}];

        vm.itemList = inputItems.map(function(inputItem) {
          return new dashboard.Item(inputItem);
        });

        //select Mary
        vm.currentUser = vm.itemList[1];

        vm.changeUser = function(id) {
          vm.currentUser = vm.itemList.filter(function(item) {
              return id == item.id();
          })[0];
          console.log(id)
        };
      }
      return vm;
    })();

    dashboard.controller = function() {
      dashboard.vm.init();
    }

    dashboard.view = function() {
      return m('div', [
        m('label', 'User:'),
        select2.view({data: dashboard.vm.itemList, value: dashboard.vm.currentUser.id(), onchange: dashboard.vm.changeUser})
      ]);
    }

    m.module(document.body, dashboard);
    //*/

    //*
    //usage
    var bridgeDbXrefSpecifier = {};

    bridgeDbXrefSpecifier.ItemList = Array;

    //a user
    bridgeDbXrefSpecifier.Item = function(item) {
      this.id = m.prop(item.id);
      this.name = m.prop(item.name);
    }

    bridgeDbXrefSpecifier.vm = (function() {
      var vm = {};
      vm.init = function() {
        bridgeDbXrefSearch.vm.init();
        datasetSelector.vm.init();
      }
      return vm;
    })();

    bridgeDbXrefSpecifier.controller = function() {
      bridgeDbXrefSpecifier.vm.init();
    }

    bridgeDbXrefSpecifier.view = function() {
      return m('div', [
        bridgeDbXrefSearch.view(),
        datasetSelector.view()
      ]);
    }

    m.module(document.querySelector('#dummy-toolbar'), bridgeDbXrefSpecifier);
    //*/
  }

  return {
    open: open
  }
})();

module.exports = editor;

function renderer() {

  if (!_.isEmpty(css)) {
    css.map(insertCss);
  }

  /* Convert a highland stream into a mithril promise
   * @param {stream} highlandStream
   * @result {promise} mithrilPromise See http://lhorie.github.io/mithril/mithril.deferred.html#differences-from-promises-a-
   */
  function promisify(highlandStream) {
    //tell Mithril to wait for this service to complete before redrawing
    m.startComputation();
    var deferred = m.deferred();

    highlandStream.toArray(function(results) {
      deferred.resolve(results);
      //the service is done, tell Mithril that it may redraw
      m.endComputation();
    });

    return deferred.promise;
  }

  var datasetPrimaryFilter = function(datasetStream) {
    return datasetStream
      .filter(function filter(dataset) {
        return dataset._isPrimary;
      });
  };

  /**
   * Components for specifying a particular Xref
   * @param  {Object} pvjs       pvjs Instance Object
   */
  function bridgeDbXrefSpecifier(pvjs) {
  }

  /**
   * Components for specifying a dataset
   * @param  {Object} pvjs       pvjs Instance Object
   */
  function datasetSelector(pvjs) {
    //usage
    var datasetSelectorInstance = {};

    datasetSelectorInstance.DatasetList = Array;

    //a dataset
    datasetSelectorInstance.Dataset = function(dataset) {
      this.id = m.prop(dataset['@id']);
      this.name = m.prop(dataset._displayName);
    }

    datasetSelectorInstance.vm = (function() {
      var vm = {};
      vm.init = function() {
        /*
        //list of datasets to show
        var asyncStream = highland.wrapCallback(highland.flip(window.setTimeout));

        var getDatasets = function() {
          return asyncStream(500).map(function() {
            return [{'@id': 1, '_displayName': "John"}, {'@id': 2, '_displayName': "Mary"}, {'@id': 3, '_displayName': "Jane"}];
          })
          .sequence()
          .map(function(inputDataset) {
            return new datasetSelectorInstance.Dataset(inputDataset);
          });
        }

        var promisifiedGetDatasets = highland.compose(promisify, getDatasets);
        //*/

        var propify = function(highlandStream) {
          return highlandStream.map(function(item) {
            return new datasetSelectorInstance.Dataset(item);
          });
          /*
          return highlandStream.flatMap(function(item) {
            return highland.pairs(item).reduce({}, function(accumulator, pair) {
              var key = pair[0];
              var value = pair[1];
              accumulator[key] = m.prop(value);
              return accumulator;
            });
          });
          //*/
        }

        var promisifiedGetDatasets = highland.compose(
            promisify, propify, datasetPrimaryFilter, bridgedb.dataset.query);

        vm.datasetList = promisifiedGetDatasets();

        //specify initial selection
        //vm.currentDataset = vm.datasetList()[0];
        vm.currentDataset = {
          id: m.prop('http://identifiers.org/ncbigene'),
          'name': m.prop('Entrez Gene')
        };

        vm.changeDataset = function(id) {
          vm.currentDataset = vm.datasetList().filter(function(dataset) {
            return id == dataset.id();
          })[0];
          console.log(id)
        };
      }
      return vm;
    })();

    datasetSelectorInstance.controller = function() {
      datasetSelectorInstance.vm.init();
    }

    datasetSelectorInstance.view = function() {
      return m('div', [
        m('label', 'Data source:'),
        select2.view({
          data: datasetSelectorInstance.vm.datasetList(),
          value: datasetSelectorInstance.vm.currentDataset.id(),
          onchange: datasetSelectorInstance.vm.changeDataset
        })
      ]);
    }

    return datasetSelectorInstance;

    //m.module(document.body, datasetSelectorInstance);
  }

  return {
    bridgeDbXrefSpecifier: bridgeDbXrefSpecifier,
    datasetSelector: datasetSelector
  }
};
