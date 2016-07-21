'use strict';

var _ = require('lodash');
var Rx = require('rx-extra');
var uuid = require('uuid');

// Use Biopax terms when available.
var entityTypeMappingsGpmlToNormalized = {
  'Complex': 'biopax:Complex',
  'GeneProduct': 'gpml:GeneProduct',
  'Metabolite': 'gpml:Metabolite',
  'Pathway': 'biopax:Pathway',
  'Protein': 'biopax:Protein',
  'Rna': 'biopax:Rna',
  'Unknown': 'gpml:Unknown'
};

var entityTypeMappingsNormalizedToGpml = _.invert(entityTypeMappingsGpmlToNormalized);

// TODO this is repeated elsewhere in the pvjs
// codebase (maybe kaavio-editor). DRY it up.
var typeMappingsEntityToEntityReference = {
  'biopax:Complex': 'biopax:Complex',
  'gpml:GeneProduct': 'gpml:GeneProduct',
  'gpml:Metabolite': 'biopax:SmallMoleculeReference',
  'biopax:Pathway': 'biopax:Pathway',
  'biopax:Protein': 'biopax:ProteinReference',
  'biopax:Rna': 'biopax:RnaReference',
  'gpml:Unknown': 'gpml:Unknown',
  /* In BioPAX terms?
  'gpml:GeneProduct':[
    'biopax:DnaReference',
    'biopax:Gene',
    'biopax:RnaReference',
    'biopax:ProteinReference'
  ],
  //*/
};

var typeMappingsEntityReferenceToEntity = _.invert(
    typeMappingsEntityToEntityReference);

/**
 * enrichPvjson
 *
 * @param {Object} pvjson
 * @return {Object} enriched pvjson
 */
var enrichPvjson = function(bridgeDb, pvjson) {
  var elements = Rx.Observable.from(pvjson.elements)
  .filter(function(el) {
    return el['gpml:element'] === 'gpml:DataNode';
  })
  .map(function(pvjsElement) {
    return addGetSetEntityReferenceMethodToDataNode(bridgeDb, pvjson, pvjsElement);
  })
  .flatMap(function(pvjsElement) {
    return pvjsElement.getSetEntityReference();
  });
};

/**
 * Generate an entityReference from the data available
 * in the GPML
 *
 * @return entityReference
 */
// jscs: disable
var generateEntityReference = function(displayName, datasource_name, identifier, organism, entityType) {
// jscs: enable

  var entityReference = {};
  entityReference.displayName = displayName;
  entityReference.isDataItemIn = {};

// jscs: disable
  entityReference.datasource_name = entityReference.isDataItemIn.datasource_name = datasource_name;
// jscs: enable

  entityReference.identifier = identifier;

  var entityReferenceTypeFromGpml =
      typeMappingsEntityToEntityReference[entityType];
  if (entityReferenceTypeFromGpml) {
    entityReference.type = [entityReferenceTypeFromGpml];
  }
  return entityReference;
};

/* TODO make pvjsElement.entityReference be a function instead of a string. The code
// below is a start on this.
function EntityReference(entityReference) {
  if (!entityReference) {
    return this.id;
  }
  this.id = typeof entityReference === 'object' ? entityReference.id : entityReference;
}

EntityReference.prototype.toJSON = function() {
  return this.id;
}

EntityReference.prototype.get = function() {
  // The value from bridgedb as done currently by getSetEntityReference
  return expandedEntityReference;
}

var entityReference = new EntityReference('http://identifiers.org/hello');

var pvjsElement = {
  a: 1,
  entityReference: entityReference
};

JSON.stringify(pvjsElement);
//*/

/**
 * Enrich an existing entityReference using bridgedbjs
 *
 * @return
 */
var enrichEntityReference = function(bridgeDb, context, entityReference, dataNode) {
  //entityReference['@context'] = context;
  var dataset = entityReference.isDataItemIn = entityReference.isDataItemIn || {};

  if (dataNode.type && !entityReference.type) {
    var entityReferenceType =
        [typeMappingsEntityToEntityReference[dataNode.type]];
    entityReference.type = entityReference.isDataItemIn.subject = entityReferenceType;
  }

  var entityReferenceId = entityReference.id;
  if (!entityReferenceId) {
    // TODO use a method that will allow us to always produce the same output for a given input
    entityReferenceId = uuid.v1();
    entityReference.id = entityReferenceId;

    if (!dataset.name && dataNode.db) {
      dataset.name = dataNode.db;
      // jscs: disable
    } else if (!dataset.datasource_name && dataNode.datasource_name) {
      dataset.datasource_name = dataNode.datasource_name;
      // jscs: enable
    }
  }

  var lastEnrichedEntityReferenceSourceError;
  var enrichedEntityReferenceSource = bridgeDb.entityReference.enrich(entityReference, {
    organism: false
  })
  .doOnError(function(err) {
    lastEnrichedEntityReferenceSourceError = err;
  });

  var errorHandlerSource = Rx.Observable.return({})
    .flatMap(function() {
      console.error('lastEnrichedEntityReferenceSourceError');
      console.error(lastEnrichedEntityReferenceSourceError);
      /* // TODO first, add an error code to bridgedbjs for a "no matches found" error.
      // Then try enriching just the dataset, if it is available.
      if (lastEnrichedEntityReferenceSourceError.code === 'ENTITYREFERENCEMISSINGDATA') {
        if (dataset) {
          return bridgeDb.dataset.get(dataset)
          .map(function(enrichedDataset) {
            entityReference.dataset = enrichedDataset;
            return entityReference;
          });
        }
        return Rx.Observable.return(entityReference);
      }
      return Rx.Observable.return(lastEnrichedEntityReferenceSourceError);
      //*/
      if (!entityReference.identifier) {
        delete entityReference['owl:sameAs'];
        delete entityReference.xref;
      }
      return Rx.Observable.return(entityReference);
    });

  //return Rx.Observable.catch(enrichedEntityReferenceSource, errorHandlerSource);
  return enrichedEntityReferenceSource;
};

/**
 * enrichDataNode
 *
 * @param {Object} bridgeDb instance of bridgedbjs
 * @param {Object} dataNode
 * @param {Object} [pvjson]
 * @return {Object} enriched dataNode
 */
var addGetSetEntityReferenceMethodToDataNode = function(bridgeDb, pvjson, dataNode) {
  var organism = pvjson.organism;
  // NOTE: when the DataNode is set to have a Type of "Unknown" in PathVisio-Java,
  // it is serialized into GPML without a Type attribute.
  var gpmlDataNodeType = dataNode['gpml:Type'];

  // Using Biopax classes, when possible, like biopax:Protein.
  // Otherwise, using gpml classes.
  var entityType = entityTypeMappingsGpmlToNormalized[gpmlDataNodeType];
  if (entityType) {
    dataNode.type = entityType;
  }

  // jscs: disable
  var dataSourceName = dataNode.datasource_name;
  // jscs: enable
  var identifier = dataNode.identifier;
  var userSpecifiedXref;

  var entityReference = generateEntityReference(dataNode.textContent, dataSourceName,
      identifier, organism, entityType);

  enrichEntityReference = enrichEntityReference.bind(
      undefined,
      bridgeDb,
      pvjson['@context'],
      entityReference,
      dataNode
  );

  function enrichEntityReferenceAndUpdateEntity() {
    return enrichEntityReference()
    .map(function(enrichedEntityReference) {
      if (!enrichedEntityReference) {
        return enrichedEntityReference;
      }

      var previousEntityReferenceId = dataNode.entityReference;

      dataNode.entityReference = enrichedEntityReference.id;

      var enrichedEntityReferenceId = enrichedEntityReference.id;
      // TODO why is entityReference defined here like this?
      entityReference = dataNode.entityReference = enrichedEntityReferenceId;

      var enrichedEntityReferenceExists = pvjson.elements
      .filter(function(element) {
        return element.id === enrichedEntityReferenceId;
      }).length > 0;

      entityType = dataNode.type;
      // Fill in type from bridgeDb if it's missing from GPML.
      if (!entityType && !_.isEmpty(enrichedEntityReference.type)) {
        var entityReferenceType = _.find(enrichedEntityReference.type,
            function(enrichedEntityReferenceType) {
              return typeMappingsEntityReferenceToEntity[enrichedEntityReferenceType];
            });
        dataNode.type = typeMappingsEntityReferenceToEntity[entityReferenceType];
        dataNode['gpml:Type'] = entityTypeMappingsNormalizedToGpml[dataNode.type];
      }

      dataNode.textContent = dataNode.textContent || enrichedEntityReference.displayName;

      // TODO how should we best handle sub-pathway instances in a pathway?
      if (entityType === 'biopax:Pathway') {
        dataNode.organism = organism;
      }

      // "db" the official, standardized name, which may be different from
      // "datasource_name", which is the name used in BridgeDb
      dataNode.db = enrichedEntityReference.isDataItemIn.name;

      // jscs: disable
      dataNode.datasource_name = enrichedEntityReference.isDataItemIn.datasource_name;
      // jscs: enable

      dataNode.identifier = enrichedEntityReference.identifier;

      if (!enrichedEntityReferenceExists) {
        pvjson.elements.push(enrichedEntityReference);
      }

      // Check for whether the previous entity reference is still
      // being referenced in this pathway, and if not, remove it.
      var firstEntityReferencingPreviousEntityReferenceId =
          _.find(pvjson.elements, function(element) {
            return element.entityReference === previousEntityReferenceId;
          });

      if (!firstEntityReferencingPreviousEntityReferenceId) {
        var previousEntityReference = _.find(pvjson.elements, function(element) {
          return element.id === previousEntityReferenceId;
        });
        var previousEntityReferenceIndex = pvjson.elements.indexOf(
            previousEntityReference);
        pvjson.elements.splice(previousEntityReferenceIndex, 1);
      }

      return enrichedEntityReference;
    })
    .toPromise();
  }

  /* Use it like this to get:
     var a = mypvjson.elements[20];
     a.getSetEntityReference().then(function(entityReference) {
       console.log('entityReference');
       console.log(entityReference);
     }, function(err) {
       console.log('err');
       console.log(err);
     });
     // and like this to set:
     a.getSetEntityReference({
        datasource_name: 'Gramene Rice',
        identifier: 'LOC_OS01G14630a'
     }).then(function(entityReference) {
       console.log('entityReference');
       console.log(entityReference);
     }, function(err) {
       console.log('err');
       console.log(err);
     });
     // you can then get again with the updated data:
     a.getSetEntityReference().then(function(entityReference) {
       console.log('entityReference');
       console.log(entityReference);
     }, function(err) {
       console.log('err');
       console.log(err);
     });
  //*/
  dataNode.getSetEntityReference = function(updatedEntityReference) {
    if (!updatedEntityReference) {
      return enrichEntityReferenceAndUpdateEntity();
    }

    // Fill in any missing entity reference data from previous
    // entity reference, if available.
    if (_.isPlainObject(updatedEntityReference) && !updatedEntityReference.id) {
      var updatedDataset = updatedEntityReference.isDataItemIn;
      var updatedIdentifier = updatedEntityReference.identifier;
      if (!updatedDataset) {
        updatedEntityReference.isDataItemIn = entityReference.isDataItemIn;
      } else if (!updatedIdentifier) {
        updatedEntityReference.identifier = entityReference.identifier;
      }
    } else if (_.isString(updatedEntityReference)) {
      updatedEntityReference = {
        id: updatedEntityReference
      };
    }

    enrichEntityReference = enrichEntityReference.bind(
        undefined,
        bridgeDb,
        pvjson['@context'],
        updatedEntityReference,
        dataNode
    );
    return enrichEntityReferenceAndUpdateEntity();
  };

  return dataNode;
};

module.exports = {
  addGetSetEntityReferenceMethodToDataNode: addGetSetEntityReferenceMethodToDataNode,
  enrichPvjson: enrichPvjson
};
