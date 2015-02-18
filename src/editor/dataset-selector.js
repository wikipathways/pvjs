var _ = require('lodash');
var BridgeDb = require('bridgedb');
//var BridgeDb = require('../../../bridgedbjs/index.js');
var editorUtils = require('./editor-utils');
var gpmlDataNodeTypeSelector = require('./gpml-data-node-type-selector');
var highland = require('highland');
var m = require('mithril');

function DatasetSelector () {

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

  var datasetPrimaryFilter = function(datasetStream) {
    return datasetStream
      .filter(function filter(dataset) {
        return dataset['bridgedb:_isPrimary'] &&
        !!dataset['@id'];
      });
  };

  var primaryFreeSearch = function(args) {
    return bridgeDb.entityReference.freeSearch(args)
      .filter(function filter(searchResult) {
        return searchResult.isDataItemIn._isPrimary;
      });
  };

  var promisifiedPrimaryFreeSearch = highland.compose(
      promisify, primaryFreeSearch);

  /***********************************
   * Dataset Selector
   **********************************/

  var datasetSelector = {};

  datasetSelector.DatasetList = Array;

  //a dataset
  datasetSelector.Dataset = function(dataset) {
    this.id = m.prop(dataset['@id']);
    this.name = m.prop(dataset['bridgedb:_displayName']);
    var subject = dataset['dcterms:subject'];
    var subjectAsArray = _.isArray(subject) ? subject : [subject];
    var subjectIds = subjectAsArray.map(function(oneSubject) {
      return !!oneSubject && !!oneSubject['@id'] && oneSubject['@id'];
    });
    this.subject = m.prop(subjectIds);
  }

  datasetSelector.vm = (function() {
    var vm = {};
    vm.init = function() {

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

      var datasetPlaceholder = {
        '@id': '',
        'bridgedb:_displayName': 'Database'
      };

      var promisifiedGetDatasets = highland.compose(
          promisify, propify,
          function(filteredStream) {
            return highland([datasetPlaceholder]).concat(filteredStream)
          },
          datasetPrimaryFilter,
          function(expandedStream) {
            return expandedStream.flatMap(function(value) {
              return editorUtils.createJsonldCompactStream(value, editorUtils.context);
            });
          },
          function(inputStream) {
            return inputStream.flatMap(function(value) {
              return editorUtils.createJsonldExpandStream(value, null);
            });
          },
          bridgeDb.dataset.query);

      vm.datasetList = promisifiedGetDatasets();

      //specify initial selection
      //vm.currentDataset = vm.datasetList()[0];
      vm.currentDataset = {
        id: m.prop(''),
        'name': m.prop('')
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
    return m('select.col-sm-2.form-control', {
      value: datasetSelector.vm.currentDataset.id()
    }, [
      datasetSelector.vm.datasetList()
        .filter(function(dataset) {
          return !dataset.subject || _.isEmpty(dataset.subject()) ||
            gpmlDataNodeTypeSelector.vm.currentGpmlNodeType.id() === 'http://example.org/' ||
            gpmlDataNodeTypeSelector.vm.currentGpmlNodeType.id() === 'gpml:Unknown' ||
            dataset.subject().indexOf(gpmlDataNodeTypeSelector.vm.currentGpmlNodeType.id()) > -1;
        })
      .map(
        function(dataset, index) {
          return m('option[value=' + dataset.id() + ']',
              dataset.name());
        })
    ]);
  }

  return datasetSelector;
  /*
  datasetSelector.view = function() {
    return m('div.col-lg-2.form-control', [
      select2.view({
        data: datasetSelector.vm.datasetList(),
        value: datasetSelector.vm.currentDataset.id(),
        onchange: datasetSelector.vm.changeDataset
      })
    ]);
  }
  //*/

  //m.module(document.body, datasetSelector);
}

module.exports = DatasetSelector;
