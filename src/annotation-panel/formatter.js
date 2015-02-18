var _ = require('lodash');
var highland = require('highland');

var Formatter = (function() {
  'use strict';

  /**
   * @private
   * Additional details about a given concept or thing, formatted for
   *        display in a details panel, e.g.,
   *        {@link http://www.biopax.org/release/biopax-level3.owl#Xref|biopax:Xrefs}
   *        for an {@link EntityReference}.
   * @typedef {Object} DetailsPanelData
   * @property {String} label
   * @property {String} description
   * @property {DetailsPanelListItem[]} listItems Such as sets of Xrefs grouped by dataset.
  */

  /**
   * @private
   * List element with one or more subelements, e.g., Xrefs for one dataset.
   * @typedef {Object} DetailsPanelListItem
   * @property {String} key Title of the list element, e.g., "WikiPathways"
   * @property {DetailsPanelListItemValue[]} values
  */

  /**
   * @private
   * Used to create an HTML string for one or more identifiers/links.
   * @typedef {Object} DetailsPanelListItemValue Set of identifiers,
   *                      each with a linkout when available, such as for a specific Xref.
   * @property {String} text Displayed value, e.g., "WP1"
   * @property {String} [uri] (when available) Link to the main human-readable description/page
   *                          about that identifier.
   *                          Sometimes called a "linkout.". See
   *                          {@link http://www.w3.org/2001/XMLSchema#anyURI|xsd:anyURI}.
   *                          Example: {@link http://wikipathways.org/index.php/Pathway:WP1}
  */

  /**
   * Add label (header) and description. Nest list items for display.
   *
   * TODO This is still rough and has not been tested much.
   * It needs to be cleaned up.
   *
   * @param {Object} args
   * @param {Stream} args.inputStream Will have one or more entities to be displayed.
   * @param {Object} args.primaryResource Resource (entity) that the user chose, so it should
   *                 be displayed first.
   * @param {String} args.label
   * @param {String} args.description
   * @return {Stream<DetailsPanelData>} result {@link DetailsPanelData}
   */
  function formatListForDisplay(args) {
    var inputStream = args.inputStream;
    var primaryResource = args.primaryResource;
    var label = args.label;
    var description = args.description;

    var result = {
      'header': label,
      'description': description
    };

    return _nestAll(args)
    .errors(function(err, push) {
      console.log(err);
      console.log('in xref._nestAll()');
      //For unannotated nodes, without db or identifier
      result.listItems = ['Missing identifier and/or db'];
      return result;
    })
    .map(function(listItems) {
      result.listItems = listItems;
      return result;
    });
  }

  /**
   * @private
   *
   * Format one or more resources for display in a details panel.
   *
   * @param {Object} args
   * @param {Stream} args.inputStream
   * @param {Object} args.primaryResource
   * @return {DetailsPanelListItem[]} result Collection of
   *    {@link DetailsPanelListItem|DetailsPanelListItems}
   */
  function _nestAll(args) {
    var inputStream = args.inputStream;
    var primaryEntityReference = args.primaryResource;
    return inputStream.errors(function(err, push) {
      console.log(err);
      console.log('in Formatter._nestAll()');
      // TODO this is only half thought out
      //For unannotated nodes, without db or identifier
      return inputStream;
      //return 'No entityReferenceXrefs returned. Is BridgeDb down?';
    })
    .map(function(entityReference) {
      var identifier = entityReference.identifier;
      var listItem = {};
      listItem.title = entityReference.db;
      listItem.text = identifier;
      listItem._isPrimary = entityReference._isPrimary;
      /*
      if (entityReference.hasOwnProperty('urlPattern')) {
        listItem.uri =
          entityReference.urlPattern.replace('$id', identifier);
      }
      //*/
      var uri = _([entityReference['@id']])
      .concat(entityReference['owl:sameAs'])
      .compact()
      .filter(function(thisUri) {
        return thisUri.indexOf('http') > -1;
      })
      .last();

      if (!!uri) {
        listItem.uri = uri;
      }

      return listItem;
    })
    .collect()
    .map(function(listItems) {
      return listItems.sort(function(a, b) {
        // two-factor sort: primary key is "_isPrimary" and
        // secondary key is "title," which in this case is the db
        if (a._isPrimary === b._isPrimary) {
          var x = a.title.toLowerCase();
          var y = b.title.toLowerCase();
          return x < y ? -1 : x > y ? 1 : 0;
        }
        return b._isPrimary - a._isPrimary;
      });
    })
    .sequence()
    .group('title')
    .flatMap(highland.pairs)
    .reduce([], function(listItems, pair) {
      listItems.push({
        key: pair[0],
        values: pair[1]
      });
      return listItems;
    })
    /*
     * TODO Use JsonldMatcher to find the primary entity reference
     *      and put it first.
    .map(function(listItems) {
      console.log('listItems');
      console.log(listItems);
      // TODO is this needed? It seems as if it should be handled before this stage.

      // Here we handle case where either 0 or 1 result
      // is returned by BridgeDb webservice. This would most likely happen if BridgeDb is down.
      if (listItems.length < 2) {
        var uri = '';
        if (primaryEntityReference.hasOwnProperty('urlPattern')) {
          uri = primaryEntityReference.urlPattern.replace(
            '$id',
            primaryEntityReference.identifier
          );
        }
        listItems = [{
          'key': primaryEntityReference.db,
          'values':[{
            '_isPrimary': true,
            'text': primaryEntityReference.identifier,
            'title': primaryEntityReference.db,
            'uri':uri}]
        }];
      } else {
        // We want the identifier that was primary
        // by the pathway creator for this data node to be listed first.
        var primaryListItem = _.remove(listItems, function(element) {
          return (element.key === primaryEntityReference.db);
        })[0];

        var primaryXRefId =
          _.remove(primaryListItem.values, function(element) {
          return (element.text === primaryEntityReference.identifier);
        })[0];

        primaryListItem.values.unshift(primaryXRefId);

        listItems.unshift(primaryListItem);
      }

      return listItems;
    })
    //*/
    .collect();
  }

  return {
    formatListForDisplay: formatListForDisplay
  };
})();

module.exports = Formatter;
