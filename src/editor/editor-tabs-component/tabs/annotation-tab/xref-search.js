var _ = require('lodash');
var BridgeDb = require('bridgedb');
var editorUtils = require('../../../editor-utils');
var highland = require('highland');
var m = require('mithril');
var mithrilUtils = require('../../../../mithril-utils');
var simpleModal = require('simple-modal');

module.exports = function(xrefSpecifier) {

  /******************************
  * simpleModal
  *****************************/

  /** @namespace */
  var simpleModalComponent = {};

  /**
  simpleModalComponent config factory. The params in this doc refer to properties
                                        of the `ctrl` argument
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
        window.setTimeout(function() {
          deferred.resolve();
          //the service is done, tell Mithril that it may redraw
          m.endComputation();
        }, 1500);
        //m.module(document.querySelector('.simple-modal-content'), xrefSearchResults);
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
      //xrefSelectionModal.content = 'updated modal content';
    }
  }

  simpleModalComponent.view = function(xrefList) {

    var xrefSelectionModal = document.querySelector('.simple-modal-content');

    if (!xrefSelectionModal) {
      xrefSelectionModal = simpleModal({
        title: 'Click a row to select an xref',
        content: 'modal content',
        buttons: [{
          text:'Cancel',
          closeOnClick: true
        }]
      });
    }

    m.render(document.querySelector('.simple-modal-content'), [
      m('table.table.table-hover.table-bordered', [
        m('thead', [
          m('tr', {}, [
            m('th', {}, 'Name'),
            m('th', {}, 'Datasource'),
            m('th', {}, 'Identifier')
          ])
        ]),
        m('tbody', {}, [
          xrefList.xrefs().map(function(xref, index) {
            return m('tr[style="cursor: pointer;"]', {onclick: function() {
              xrefSelectionModal.deconstruct();
              return xrefSearch.vm.selectXref(xref);
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
   * search by name input
   *****************************/

  //module for xrefSearch
  //for simplicity, we use this module to namespace the model classes
  var xrefSearch = {};

  //the XrefList class is a list of Xrefs
  xrefSearch.XrefList = function(query) {
    this.xrefs = m.prop(xrefSearch.vm.promisifiedPrimaryFreeSearch(
          {attribute: query}));
  };

  xrefSearch.ModalList = Array;

  //the view-model tracks a running list of xrefs,
  //stores a query for new xrefs before they are created
  //and takes care of the logic surrounding when searching is permitted
  //and clearing the input after searching a xref to the list
  xrefSearch.vm = (function() {
    var vm = {}

    vm.init = function() {
      var bridgeDb = new BridgeDb({
        baseIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php/',
        datasetsMetadataIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb-datasources.php',
        organism: 'Homo sapiens'
      });

      var primaryFreeSearch = function(args) {
        return bridgeDb.entityReference.freeSearch(args)
          .filter(function filter(searchResult) {
            return searchResult.isDataItemIn._isPrimary;
          });
      };

      var promisifiedPrimaryFreeSearch = highland.compose(
          mithrilUtils.promisify, primaryFreeSearch);

      vm.promisifiedPrimaryFreeSearch = promisifiedPrimaryFreeSearch;

      // list of xrefs that match the query
      vm.xrefList = m.prop([]);
      vm.modalList = new xrefSearch.ModalList();

      //a slot to store the name of a new xref before it is created
      vm.query = m.prop('');

      //react to the user selecting an xref in the modal
      vm.selectXref = function(xref) {
        var entity = editorUtils.convertXrefToPvjsEntity(xref);
        xrefSpecifier.vm.updateControlValues(entity);
        vm.modalList = new xrefSearch.ModalList();

        /*
        if (vm.query()) {
          vm.modalList.push(new xrefSearch.XrefList(vm.query()));
          vm.query('');
        }
        //*/
      };

      //searches for xrefs, which are added to the list,
      //and clears the query field for user convenience
      vm.search = function() {
        if (vm.query()) {
          vm.modalList.push(new xrefSearch.XrefList(vm.query()));
          vm.query('');
        }
      };
    }
    return vm
  }());

  //the controller defines what part of the model is relevant for the current page
  //in our case, there's only one view-model that handles everything
  xrefSearch.controller = function() {
    xrefSearch.vm.init();
  }

  //here's the view
  xrefSearch.view = function() {
    return m('div.form-search.form-group', [
      m('div.input-group.input-group-sm.form-control', [
        m('input[placeholder="Search by name"][type="text"].form-control', {
          onchange: m.withAttr('value', xrefSearch.vm.query),
          value: xrefSearch.vm.query()
        }),
        m('span.input-group-btn', {onclick: xrefSearch.vm.search},
          m('button[type="submit"].btn.btn-success', [
            m('span[aria-hidden="true"].glyphicon.glyphicon-search')
          ])),
        xrefSearch.vm.modalList.map(function(xrefList, index) {
          return simpleModalComponent.view(xrefList);
        })
      ])
    ]);
  };

  return xrefSearch;
};
