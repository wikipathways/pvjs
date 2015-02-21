/***********************************
 * Dataset Control
 **********************************/

/**
 * Module dependencies.
 */

var _ = require('lodash');
var BridgeDb = require('bridgedb');
var editorUtils = require('./editor-utils');
var highland = require('highland');
var m = require('mithril');
var mithrilUtils = require('../mithril-utils');

/**
 * Module variables.
 * @private
 */
// Add some here

var datasetControl = {};

datasetControl.DatasetList = Array;

//a dataset
datasetControl.Dataset = function(dataset) {
  this.id = m.prop(dataset.id);
  this.name = m.prop(dataset.displayName);
  this.subject = m.prop(dataset.subject);
}

datasetControl.vm = (function() {
  var vm = {};
  vm.init = function() {

    var bridgeDb = new BridgeDb({
      baseIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php/',
      datasetsMetadataIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb-datasources.php',
      organism: 'Homo sapiens'
    });

    var propify = function(highlandStream) {
      return highlandStream.map(function(item) {
        return new datasetControl.Dataset(item);
      });
    }

    var propifyStream = highland.compose(mithrilUtils.promisify, propify);

    var propifyArray = function(arrayArg) {
      return propifyStream(highland(arrayArg));
    }

    var datasetPlaceholder = {
      'id': '',
      'displayName': 'Database'
    };

    //specify placeholder selection
    vm.currentDataset = new datasetControl.Dataset(datasetPlaceholder);

    vm.datasetListFull = highland.compose(
        mithrilUtils.promisify,
        function(filteredStream) {
          return highland([datasetPlaceholder]).concat(filteredStream)
        },
        filterDatasetsForPrimaryDataNodes,
        standardizeDataset,
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
        bridgeDb.dataset.query)();

    var promisifiedGetDatasets = highland.compose(
        mithrilUtils.promisify, propify,
        function(filteredStream) {
          return highland([datasetPlaceholder]).concat(filteredStream)
        },
        filterDatasetsForPrimaryDataNodes,
        standardizeDataset,
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

    vm.filterDatasetListByXrefType = function(xrefType) {
      vm.datasetList = propifyArray(vm.datasetListFull().filter(function(dataset) {
        // pass of true means "do not filter out this dataset"
        var pass = true;

        var currentDatasetSubjects = dataset.subject;
        currentDatasetSubjects = editorUtils.arrayifyClean(currentDatasetSubjects);

        // We show all Datasets when GPML DataNode Type is not selected or is "gpml:Unknown"
        var alwaysPassGpmlNodeTypeIds = [
          'http://example.org/',
          'gpml:Unknown'
        ];
        if (alwaysPassGpmlNodeTypeIds.indexOf(xrefType) === -1) {

          // We show all datasets that don't have a subject
          if (!_.isEmpty(currentDatasetSubjects[0])) {

            // We show all datasets with a subject matching the current GPML DataNode Type
            if (currentDatasetSubjects.indexOf(xrefType) === -1) {

              // When GPML DataNode Type is "gpml:GeneProduct" or "biopax:ProteinReference,"
              // we show all datasets with subject of "gene" or "protein".
              var geneProductOrProteinIds = [
                'gpml:GeneProduct',
                'biopax:ProteinReference'
              ]
              if (_.intersection(
                    geneProductOrProteinIds, currentDatasetSubjects).length === 0) {

                // if we finally get here, then we filter out this dataset.
                pass = false;
              }
            }
          }
        }

        return pass;
      }));
    }

    vm.changeDataset = function(datasetId) {
      vm.currentDataset = propifyArray(vm.datasetListFull().filter(function(vmDataset) {
        return datasetId === vmDataset.id;
      }))()[0];
    };

    vm.onChange = function(datasetId) {
      // do something
    };
  }
  return vm;

})();

datasetControl.controller = function() {
  datasetControl.vm.init();
}

datasetControl.view = function() {
  return m('select.form-control.input.input-sm[style="max-width:100px"][required]', {
    onchange: m.withAttr('value', datasetControl.vm.onChange),
    value: datasetControl.vm.currentDataset.id()
  }, [
    datasetControl.vm.datasetList()
      .map(function(dataset, index) {
        return m('option', {value : dataset.id(), innerHTML : dataset.name()})
        /*
        return m('option[value=' + dataset.id() + ']',
          dataset.name());
        //*/
      })
  ]);
}

function filterDatasetsForPrimaryDataNodes(datasetStream) {

  // Dataset subjects that indicate the dataset should not be used for identifying
  // an Entity Reference for a gpml:DataNode.
  var nonApplicableSubjects = [
    'interaction',
    'ontology',
    'probe',
    'experiment',
    'publication',
    'model',
    'organism'
  ];
  return datasetStream
    .filter(function filter(dataset) {
      return dataset['bridgedb:_isPrimary'] &&
          !!dataset.id &&
          nonApplicableSubjects.indexOf(dataset['bridgedb:_bridgeDbType']) === -1;
    });
}

function standardizeDataset(stream) {
  return stream.map(function(dataset) {
    dataset.subject = editorUtils.arrayifyClean(dataset.subject);
    return dataset;
  });
}

module.exports = datasetControl;
