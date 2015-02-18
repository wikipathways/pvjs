var Annotation = require('./annotation-panel.js');
var BridgeDb = require('bridgedb');
//var BridgeDb = require('../../../bridgedbjs/index.js');
var formatter = require('./format');
var highland = require('highland');
var jsonld = require('jsonld');

module.exports = function() {
  'use strict';

  var pathwaySearchUriStub = '/index.php?title=Special:SearchPathways&doSearch=1&query=';

  function render(pvjs, args) {
    var xrefs = args.xrefs;
    var metadata = args.metadata;
    var preloadedData = {
      'header': metadata.label,
      'description': metadata.description,
      // TODO there's probably a better way to do this.
      'listItems':[null]
    };
    Annotation.render(pvjs, preloadedData);

    if (xrefs.id.indexOf('bridgedb.org') > -1) {
      // dereference the BridgeDB IRI to get multiple xrefs
      var bridgedbArgs = metadata;
      bridgedbArgs.bridgedbUri = xrefs.id;

      var bridgeDb = new BridgeDb({
        baseIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php/',
        //datasetsMetadataIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb-datasources.php',
        datasetsMetadataIri: 'http://localhost:3000/demo-mithril/datasources.txt',
        organism: 'Homo sapiens'
      });

      var xRefData = bridgeDb.xref.get(bridgedbArgs)
        .collect()
        .flatMap(function(xrefs) {
          return formatter.formatListForDisplay({
            inputStream: highland(xrefs),
            primaryResource: xrefs[0],
            label: metadata.label,
            description: metadata.description
          });
        })
        .each(function(annotationData) {
          annotationData.listItems = annotationData.listItems[0];
          var searchAtWikiPathwaysListItem = {
            key:'WikiPathways',
            values:[{
              text: 'Search for ' + metadata.label,
              uri: pathwaySearchUriStub + metadata.label
            }]};
          annotationData.listItems.unshift(searchAtWikiPathwaysListItem);

          Annotation.render(pvjs, annotationData);
        });
    } else {
      var xrefWithContext = {
        '@context': pvjs.sourceData.pvjson['@context'],
        '@graph':{entityReference:xrefs.id}
      }
      jsonld.expand(xrefWithContext, function(err, expandedXref) {
        console.log('err');
        console.log(err);
        var xrefIri = expandedXref[0]['http://www.biopax.org/release/biopax-level3.owl#entityReference'][0]['@id'];

        var directLinkData;
        if (xrefIri.indexOf('wikipathways') > -1 && xrefIri.search(/WP\d{1,5}(\_r\d+)?$/) > -1) {
          var wikipathwaysId = xrefIri.match(/WP\d{1,5}(\_r\d+)?$/)[0];
          directLinkData = {
            'header': metadata.label,
            'description': metadata.description,
            'listItems':[{key:'WikiPathways', values:[{text: wikipathwaysId, uri: xrefIri}]}]
          };
        } else if (xrefIri.search(/GO:\d{7}$/) > -1) {
          // because this is none of the types that BridgeDB handles,
          // I'm only expecting GO Cell Ontology terms here
          var goId = xrefIri.match(/GO:\d{7}$/)[0];
          directLinkData = {
            'header': xrefs.id,
            'description': '',
            'listItems':[{
              key:'GO Cellular Component Ontology',
              values:[{text: goId, uri: xrefIri}]
            }]
          };
        } else {
          // TODO use data-sources.txt and identifiers.org to make this prettier
          directLinkData = {
            'header': metadata.label,
            'description': metadata.description,
            'listItems':[{
              key:'More Information',
              values:[{text: xrefIri, uri: xrefIri}]}]
          };
        }

        Annotation.render(pvjs, directLinkData);
      });
    }
  }

  return {
    render:render
  };
}();
