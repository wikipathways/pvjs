'use strict';

var _ = require('lodash');
var GpmlElement = require('./element.js');
var Graphics = require('./graphics.js');

var dataNode = {};

// Use Biopax terms when available.
// TODO this is repeated elsewhere in the pvjs codebase
//   (definitely pvjs/lib/diagram-loader/bridgedb-integration.js and maybe elsewhere).
//   DRY it up.
dataNode.entityTypeMappingsGpmlToNormalized = {
  'Complex': 'biopax:Complex',
  'GeneProduct': 'gpml:GeneProduct',
  'Metabolite': 'gpml:Metabolite',
  'Pathway': 'biopax:Pathway',
  'Protein': 'biopax:Protein',
  'Rna': 'biopax:Rna',
  'Unknown': 'gpml:Unknown'
};

dataNode.toPvjson = function(pvjson, gpmlSelection, dataNodeSelection, callback) {
  var organism = pvjson.organism;
  var pvjsonElements;
  var entity = {};
  // NOTE: when the DataNode is set to have a Type of "Unknown" in PathVisio-Java,
  // it is serialized into GPML without a Type attribute.
  var gpmlDataNodeType = dataNodeSelection.attr('Type') || 'Unknown';

  // Using Biopax classes, when possible, like biopax:Protein.
  // Otherwise, using gpml classes.
  var entityType = dataNode.entityTypeMappingsGpmlToNormalized[gpmlDataNodeType];
  if (entityType) {
    entity.type = entityType;
  }

  GpmlElement.toPvjson(pvjson, gpmlSelection, dataNodeSelection, entity, function(entity) {
    Graphics.toPvjson(pvjson, gpmlSelection, dataNodeSelection, entity, function(entity) {
      var dataSourceName;
      var identifier;
      var userSpecifiedXref;
      var xrefSelection = dataNodeSelection.find('Xref').eq(0);

      if (xrefSelection.length > 0) {
        dataSourceName = xrefSelection.attr('Database');
        if (!_.isEmpty(dataSourceName)) {
          // jscs: disable
          entity.datasource_name = dataSourceName;
          // jscs: enable
        }
        identifier = xrefSelection.attr('ID');
        if (!_.isEmpty(identifier)) {
          entity.identifier = identifier;
        }
      }

      return callback(entity);
    });
  });
};

module.exports = dataNode;
