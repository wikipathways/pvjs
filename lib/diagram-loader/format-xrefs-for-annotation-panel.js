var _ = require('lodash');

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
   * @private
   *
   * Format one or more resources for display in a details panel.
   *
   * @param {Object[]} input
   * @param {Object} primaryResource
   * @return {DetailsPanelListItem[]} one or more
   *    {@link DetailsPanelListItem|DetailsPanelListItems}
   */
  function formatListForDisplay(input, primaryEntityReference) {
    var recordList = _.map(input, function(entityReference) {
      var identifier = entityReference.identifier;
      var listItem = {};
      listItem.title = entityReference.db;
      listItem.text = identifier;
      listItem.primary = entityReference.isDataItemIn.primary;
      /*
      if (entityReference.hasOwnProperty('urlPattern')) {
        listItem.uri =
          entityReference.urlPattern.replace('$id', identifier);
      }
      //*/
      var uri = _([entityReference.id])
      .concat(entityReference['owl:sameAs'])
      .compact()
      .find(function(thisUri) {
        return thisUri.indexOf('http') > -1;
      });

      if (!!uri) {
        listItem.uri = uri;
      }

      return listItem;
    });

    recordList.sort(function(a, b) {
      // two-factor sort: primary key is "_isPrimary" and
      // secondary key is "title," which in this case is the db
      if (a._isPrimary === b._isPrimary) {
        var x = a.title.toLowerCase();
        var y = b.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      }
      return b._isPrimary - a._isPrimary;
    });

    var listItems = _.toPairs(_.groupBy(recordList, 'title'))
    .reduce(function(accumulator, pair) {
      accumulator.push({
        key: pair[0],
        values: pair[1]
      });
      return accumulator;
    }, []);
    /*
     * TODO Use JsonldMatcher to find the primary entity reference
     *      and put it first.
     //*/
//      // TODO is this needed? It seems as if it should be handled before this stage.
//      listItems.values = _.sortBy(listItems.values, function(value) {
//        return value.identifier;
//      });

    // Here we handle case where either 0 or 1 result
    // is returned by BridgeDb webservice. This would most likely happen if BridgeDb is down.
    if (listItems.length === 0) {
      var uri = '';
      if (primaryEntityReference.hasOwnProperty('urlPattern')) {
        uri = primaryEntityReference.urlPattern.replace(
          '$id',
          primaryEntityReference.identifier
        );
      } else if (primaryEntityReference.id) {
        uri = primaryEntityReference.id;
      }

      var listItemValue = {
        '_isPrimary': true,
        'text': primaryEntityReference.identifier,
        'title': primaryEntityReference.db,
      };

      if (uri) {
        listItemValue.uri = uri;
      }

      listItems = [{
        'key': primaryEntityReference.db,
        'values': [listItemValue]
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

  }

  return {
    formatListForDisplay: formatListForDisplay
  };
})();

module.exports = Formatter;
