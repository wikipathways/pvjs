var _ = require('lodash');
var BridgeDb = require('bridgedb');
//var BridgeDb = require('../../../bridgedbjs/index.js');
var DatasetSelector = require('./dataset-selector');
var displayNameInput = require('./display-name-input');
var editorUtils = require('./editor-utils');
var fs = require('fs');
var gpmlDataNodeTypeSelector = require('./gpml-data-node-type-selector');
var highland = require('highland');
var identifierInput = require('./identifier-input');
var insertCss = require('insert-css');
var jsonld = require('jsonld');
var m = require('mithril');
var simpleModal = global.simpleModal = require('simple-modal');

var css = [
];

var editor = function(pvjs) {

  /***********************************************
   * Temporary solution for handling updates
   * to GPML DataNode Xrefs.
   * The long-term solution will be to convert
   * the pvjson to GPML.
   **********************************************/

  var currentGpmlNodeId;

  function updateGpmlXref(datasetName, identifier) {
    datasetName = datasetSelector.vm.currentDataset.name();
    identifier = identifierInput.vm.identifier();

    if (!datasetName || !identifier) {
      return 'Missing arg(s)';
    }

    var gpmlDoc = pvjs.sourceData.original;

    var dataNode = gpmlDoc
      .find('DataNode[GraphId="' + currentGpmlNodeId + '"]')
      .find('Xref');
    console.log('dataNode');
    console.log(dataNode);

    dataNode.attr('Database', datasetName);
    dataNode.attr('ID', identifier);
    console.log('Updated GPML string:');
    console.log(gpmlDoc.html());

    console.log('datasetName');
    console.log(datasetName);

    console.log('identifier');
    console.log(identifier);
  }

  function updateXref(xref) {
    var gpmlNodeTypes = [{
      '@id': 'http://example.org/',
      name: 'Type'
    }, {
      '@id': 'gpml:GeneProduct',
      name: 'Gene Product'
    }, {
      '@id': 'gpml:Metabolite',
      name: 'Metabolite'
    }, {
      '@id': 'biopax:Pathway',
      name: 'Pathway'
    }, {
      '@id': 'biopax:ProteinReference',
      name: 'Protein'
    }, {
      '@id': 'gpml:Unknown',
      name: 'Unknown'
    }];

    var gpmlDataNodeTypeId;

    // TODO make the way we specify xref types consistent
    if (!!xref.type) {
      var gpmlDataNodeTypeBiopaxId = xref.type;
      var biopaxToHybridMappings = {
        'DnaReference': 'gpml:GeneProduct',
        'ProteinReference': 'biopax:ProteinReference',
        'SmallMoleculeReference': 'gpml:Metabolite',
        'PhysicalEntity': 'gpml:Unknown',
        'Pathway': 'biopax:Pathway'
      };

      gpmlDataNodeTypeId = biopaxToHybridMappings[gpmlDataNodeTypeBiopaxId];
    } else {
      var candidateMatchIds = gpmlNodeTypes.map(function(gpmlNodeType) {
        return gpmlNodeType['@id'];
      });

      gpmlDataNodeTypeId = _.intersection(candidateMatchIds, xref['@type'])[0];
    }

    gpmlDataNodeTypeSelector.vm.changeGpmlNodeType(gpmlDataNodeTypeId);

    var dataset = xref.isDataItemIn;
    dataset.id = m.prop(dataset['@id']);
    dataset.name = m.prop(dataset['bridgedb:_displayName']);
    datasetSelector.vm.currentDataset = dataset;

    identifierInput.vm.identifier = m.prop(xref.identifier);
    displayNameInput.vm.displayName = m.prop(xref.displayName);
  }

  var xrefSpecifierToolbarElement = document.querySelector('.pathvisiojs-editor-xref-selector');

  var datasetSelector;

  var editorToggleButton = document.querySelector('.edit-trigger').querySelector('button');

  $('.edit-trigger').on('click', function(event) {
    var containerElement = pvjs.$element[0][0];
    var diagramContainerElement = containerElement.querySelector('.diagram-container');
    var editorToggleButtonText = editorToggleButton.textContent;
    if (editorToggleButtonText === 'Edit') {
      diagramContainerElement.setAttribute(
          'style', 'height: ' + (pvjs.elementHeight - 100) + 'px;');
      pvjs.panZoom.resizeDiagram();
      open(pvjs);
      editorToggleButton.textContent = 'Done';
    } else {
      xrefSpecifierToolbarElement.innerHTML = '';
      diagramContainerElement.setAttribute(
          'style', 'height: ' + pvjs.elementHeight + 'px;');
      pvjs.panZoom.resizeDiagram();
      editorToggleButton.textContent = 'Edit';
    }
  });

  function open(pvjs) {
    if (!_.isEmpty(css)) {
      css.map(insertCss);
    }

    datasetSelector = new DatasetSelector();

    /***********************************************
     * DataNode onclick event handler
     **********************************************/

    $('.diagram-container').on('click', function(event) {
      currentGpmlNodeId = event.target.id;
      var element = pvjs.sourceData.pvjson.elements.filter(function(element) {
        return element.id === currentGpmlNodeId;
      })
      .map(function(element) {
        return element;
      })[0];

      m.startComputation();
      var entityReference = _.find(pvjs.sourceData.pvjson.elements,
          function(elementItem) {
            return elementItem.id === element.entityReference;
          });

      var iri = element.entityReference;
      var iriComponents = iri.split('identifiers.org');
      var iriPath = iriComponents[iriComponents.length - 1];
      var iriPathComponents = iriPath.split('/');
      var preferredPrefix = iriPathComponents[1];
      var identifier = iriPathComponents[2];

      var datasetId = 'http://identifiers.org/' + preferredPrefix;
      var datasetMithril = _.find(datasetSelector.vm.datasetList(),
          function(datasetItem) {
            return datasetItem.id() === datasetId;
          });

      var dataset = {};
      dataset['@id'] = datasetMithril.id();
      dataset['bridgedb:_displayName'] = datasetMithril.name();

      entityReference.isDataItemIn = dataset;
      entityReference.identifier = identifier;

      updateXref(entityReference);

      m.endComputation();
    });

    /***********************************************
     ***********************************************
     ***********************************************
     * Search by name input and modal
     ***********************************************
     ***********************************************
     **********************************************/

    /* Convert a highland stream into a mithril promise
     * @param {stream} highlandStream
     * @result {promise} mithrilPromise See
     *  http://lhorie.github.io/mithril/mithril.deferred.html#differences-from-promises-a-
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

    var bridgeDb = new BridgeDb({
      baseIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php/',
      datasetsMetadataIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb-datasources.php',
      organism: 'Homo sapiens'
    });

    var promisifiedProp = highland.compose(m.prop, promisify);

    var primaryFreeSearch = function(args) {
      return bridgeDb.entityReference.freeSearch(args)
        .filter(function filter(searchResult) {
          return searchResult.isDataItemIn._isPrimary;
        });
    };

    var promisifiedPrimaryFreeSearch = highland.compose(
        promisify, primaryFreeSearch);

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
     * search by name input
     *****************************/

    //module for bridgeDbXrefSearch
    //for simplicity, we use this module to namespace the model classes
    var bridgeDbXrefSearch = {};

    //the XrefList class is a list of Xrefs
    bridgeDbXrefSearch.XrefList = function(query) {
      this.xrefs = m.prop(promisifiedPrimaryFreeSearch({attribute: query}));
    };

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
          updateXref(xref);

          /*
          if (vm.query()) {
            vm.modalList.push(new bridgeDbXrefSearch.XrefList(vm.query()));
            vm.query('');
          }
          //*/
        };

        //searches for xrefs, which are added to the list,
        //and clears the query field for user convenience
        vm.search = function() {
          if (vm.query()) {
            vm.modalList.push(new bridgeDbXrefSearch.XrefList(vm.query()));
            vm.query('');
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
      return m('div.well.well-sm', [
        m('div.form-search', [
          //m('div.input-group.input-group-sm', [
          m('div.input-group.input-group-sm', [
            m('input[placeholder="Search by name"][type="text"].form-control', {
              onchange: m.withAttr('value', bridgeDbXrefSearch.vm.query),
              value: bridgeDbXrefSearch.vm.query()
            }),
            m('span.input-group-btn', {onclick: bridgeDbXrefSearch.vm.search},
              m('button[type="submit"].btn.btn-success', [
                m('span[aria-hidden="true"].glyphicon.glyphicon-search')
              ])),
            bridgeDbXrefSearch.vm.modalList.map(function(xrefList, index) {
              return simpleModalComponent.view(xrefList);
            })
          ]),
        ]),
      ]);
    };

    /***********************************
     * bridgeDbXrefSpecifier
     **********************************/

    var bridgeDbXrefSpecifier = {};

    bridgeDbXrefSpecifier.ItemList = Array;

    bridgeDbXrefSpecifier.Item = function(item) {
      this.id = m.prop(item.id);
      this.name = m.prop(item.name);
    }

    bridgeDbXrefSpecifier.vm = (function() {
      var vm = {};
      vm.init = function() {
        bridgeDbXrefSearch.vm.init();
        gpmlDataNodeTypeSelector.vm.init();
        datasetSelector.vm.init();
        identifierInput.vm.init();
        displayNameInput.vm.init();
      }
      return vm;
    })();

    bridgeDbXrefSpecifier.controller = function() {
      bridgeDbXrefSpecifier.vm.init();
    }

    bridgeDbXrefSpecifier.view = function() {
      return m('nav.navbar.navbar-default.navbar-form.well.well-sm', [
        m('div.form-inline.form-inline-sm', [
          m('div.form-group.navbar-left', [
            bridgeDbXrefSearch.view(),
          ]),
          m('div.form-group.well.well-sm', [
            gpmlDataNodeTypeSelector.view(),
            datasetSelector.view(),
            identifierInput.view(),
            displayNameInput.view(),
          ]),
          m('div.navbar-right.well.well-sm', [
            m('div.btn-group.btn-group-sm', [
              m('button[type="submit"].btn.btn-success', {onclick: updateGpmlXref}, [
                m('span.glyphicon.glyphicon-floppy-save')
              ]),
              m('button[type="submit"].btn', {onclick: updateGpmlXref}, [
                m('span.glyphicon.glyphicon-remove')
              ])
            ])
          ])
        ])
      ]);
    }

    m.module(xrefSpecifierToolbarElement, bridgeDbXrefSpecifier);
  }

  return {
    open: open
  }
};

module.exports = editor;
