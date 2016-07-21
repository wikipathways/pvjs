var _ = require('lodash');
var formatter = require('./format-xrefs-for-annotation-panel.js');
var Rx = require('rx-extra');

module.exports = function(bridgeDb, jsonldRx, pvjson, annotationElementOrSelector) {
  'use strict';

  var pathwaySearchUriStub = '/index.php?title=Special:SearchPathways&doSearch=1&query=';

  var expandEntityReference = function(metadata, entityReference) {
    var entityReferenceFallbackData = {
      identifier: metadata.label,
      isDataItemIn: {
        _isPrimary: true
      }
    };
    var id = entityReference.id;
    if (id) {
      entityReference.id = id;

      // If an IRI is provided but not a dataset name
      entityReferenceFallbackData.isDataItemIn.name = 'More information';
    }
    jsonldRx.defaultsDeep(entityReference, entityReferenceFallbackData);
    return entityReference;
  };

  /**
   * Data required to render the annotation panel.
   *
   * @typedef {object} AnnotationData
   * @param {string} AnnotationData.header
   * @param {string} AnnotationData.description
   * @param {ListItem[]} AnnotationData.listItems
   */

  /**
   * Entries in the key/value(s) table section of the annotation panel.
   *
   * @typedef {object} ListItem
   * @param {string} ListItem.key
   * @param {ListItemValue[]} ListItem.values
   */

  /**
   * Entries in the value(s) section of the table section
   * of the annotation panel.
   *
   * @typedef {object} ListItemValue
   * @param {string} ListItemValue.title This appears to always be
   *                                     the entityReference db, which
   *                                     would indicate it's the same as
   *                                     the ListItem.key, meaning it is
   *                                     not needed, right? Or is it only
   *                                     required for the sorting?
   * @param {string} ListItemValue.text
   * @param {string} ListItemValue._isPrimary Used for the sorting
   * @param {string} [ListItemValue.uri]
   */

  /**
   * Build the annotationData required to render the annotation panel using
   * only the information provided (not using any information from BridgeDb)
   *
   * @param {object} metadata
   * @param {object} entityReference
   * @return {object} preloadedData same format as annotationData
   */
  var getPreloadedData = function(metadata, entityReference) {
    var preloadedData = {};
    preloadedData.header = metadata.label;
    preloadedData.description = metadata.description;
    preloadedData.listItems = [];

    if (_.isEmpty(entityReference.isDataItemIn.name)) {
      return preloadedData;
    }

    var listItemValue = {
      text: entityReference.identifier
    };

    if (entityReference.id) {
      listItemValue.uri = entityReference.id;
    }

    preloadedData.listItems.push({
      key: entityReference.isDataItemIn.name,
      values: [listItemValue]
    });
    return preloadedData;
  };

  var addWikiPathwaysSearchItem = function(searchAtWikiPathwaysListItem, annotationData) {
    annotationData.listItems.push(searchAtWikiPathwaysListItem);
    return annotationData;
  };

  var getAllAnnotationPanelData = function(pvjsElement, entityReference) {
    var metadata = {
      label: pvjsElement.textContent,
      description: (pvjsElement.type || '')
                   .replace('biopax:', '')
                   .replace('gpml:', '')
    };
    entityReference = expandEntityReference(metadata, entityReference);

    var listItemsSource;

    if (entityReference.id.indexOf('identifiers.org') > -1 ||
        entityReference.id.indexOf('bridgedb.org') > -1) {
      // dereference the BridgeDB IRI to get multiple xrefs
      var bridgedbArgs = metadata;
      if (entityReference.id.indexOf('identifiers.org') > -1) {
        bridgedbArgs.id = entityReference.id;
      } else if (entityReference.id.indexOf('bridgedb.org') > -1) {
        bridgedbArgs.bridgedbUri = entityReference.id;
      }

      listItemsSource = bridgeDb.xref.get(bridgedbArgs)
      .doOnError(function(err, push) {
        err.message = (err.message || '') +
          ' observed in pvjs getAnnotationPanelData by identifiers.org @id';
        throw err;
      })
      .toArray()
      .doOnError(function(err, push) {
        err.message = (err.message || '') +
          ' observed in pvjs getAnnotationPanelData ' +
          'by identifiers.org @id toArray';
        throw err;
      })
      .map(function(xrefs) {
        var primaryResource = _.find(xrefs, function(xref) {
          return xref.id === entityReference.id;
        }) || entityReference || xrefs[0];

        return formatter.formatListForDisplay(xrefs, primaryResource);
      })
      .doOnError(function(err, push) {
        err.message = (err.message || '') +
          ' observed in pvjs getAnnotationPanelData ' +
          'by identifiers.org @id format';
        throw err;
      });
    } else if (entityReference.id) {
      var xrefWithContext = {
        '@context': pvjson['@context'],
        '@graph':{entityReference: entityReference.id}
      };
      listItemsSource = jsonldRx.expand(xrefWithContext)
      .doOnError(function(err, push) {
        err.message = (err.message || '') +
          ' observed in pvjs getAnnotationPanelData ' +
          'by non-identifiers.org @id expand';
        throw err;
      })
      // TODO should this be flatMap? It used to be, but it appears it should just be map,
      // so I changed it.
      .map(function(expandedXref) {
        var entityReferenceIri = 'http://www.biopax.org/release/biopax-level3.owl#entityReference';
        var xrefIri = expandedXref[0][entityReferenceIri][0].id;

        var listItems;
        if (xrefIri.indexOf('wikipathways') > -1 && xrefIri.search(/WP\d{1,5}(\_r\d+)?$/) > -1) {
          var wikipathwaysId = xrefIri.match(/WP\d{1,5}(\_r\d+)?$/)[0];
          listItems = [{
            key: 'WikiPathways',
            values: [{
              text: wikipathwaysId,
              uri: xrefIri
            }]
          }];
        } else if (xrefIri.search(/GO:\d{7}$/) > -1) {
          // because this is none of the types that BridgeDB handles,
          // I'm only expecting GO Cell Ontology terms here
          var goId = xrefIri.match(/GO:\d{7}$/)[0];
          listItems = [{
            key: 'GO Cellular Component Ontology',
            values: [{
              text: goId,
              uri: xrefIri
            }]
          }];
        } else {
          // TODO use data-sources.txt and identifiers.org to make this prettier
          listItems = [{
            key: entityReference.isDataItemIn.name || 'More information',
            values: [{
              text: xrefIri,
              uri: xrefIri
            }]
          }];
        }

        return listItems;
      })
      .doOnError(function(err, push) {
        err.message = (err.message || '') +
          ' observed in pvjs getAnnotationPanelData ' +
          'by non-identifiers.org @id format';
        throw err;
      });
    } else {
      var fallbackListItem = getPreloadedData(metadata, entityReference);
      listItemsSource = Rx.Observable.return(fallbackListItem);
      //annotationDataSource = Rx.Observable.throw(new Error('Could not get annotation data'));
      //document.querySelector('.annotation').style.visibility = 'hidden';
    }

    var annotationDataSource = listItemsSource
    .map(function(listItems) {
      var pathwaySearchQuery;
      if (metadata.description === 'CellularComponent') {
        // if it's a Nucleus, etc.
        pathwaySearchQuery = entityReference.id;
      } else {
        // if it's an entity reference for a DataNode, e.g., for a protein
        pathwaySearchQuery = metadata.label;
      }

      var searchAtWikiPathwaysListItem = {
        key: 'Find other pathways containing',
        values: [{
          text: pathwaySearchQuery,
          uri: pathwaySearchUriStub + pathwaySearchQuery
        }]
      };

      return listItems.concat(searchAtWikiPathwaysListItem);
    })
    .map(function(listItems) {
      return {
        'header': metadata.label,
        'description': metadata.description,
        'listItems': listItems
      };
    });

    return {
      annotationElementOrSelector: annotationElementOrSelector,
      annotationDataSource: annotationDataSource
    };
  };

  return {
    getAllAnnotationPanelData: getAllAnnotationPanelData
  };
};
