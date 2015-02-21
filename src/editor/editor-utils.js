var _ = require('lodash');
var highland = require('highland');
var jsonld = require('jsonld');

/**
 * Convert an input into an array, if it is not already.
 *
 * @param {*} arg
 * @return {array} arrayified version on input arg
 */
function arrayify(arg) {
  return _.isArray(arg) ? arg : [arg];
}

/**
 * Convert an input into an array, if it is not already.
 * If the input is falsey but not false or 0, return an empty array.
 *
 * @param {*} arg
 * @return {array} arrayified version on input arg
 */
function arrayifyClean(arg) {
  if (!arg && arg !== false && arg !== 0) {
    return [];
  }
  return arrayify(arg);
}

var context = {
  'biopax': {
    '@id': 'http://www.biopax.org/release/biopax-level3.owl#',
    '@type': '@id'
  },
  'bridgedb': 'http://www.example.org/bridgedb/input-vocab/',
  'dcterms': {
    '@id': 'http://purl.org/dc/terms/',
    '@type': '@id'
  },
  'displayName': 'bridgedb:_displayName',
  /* Weird that the above works, but the below does not.
  'displayName': {
    '@id': 'bridgedb:_displayName',
    '@type': '@id'
  },
  //*/
  'gpml': {
    '@id': 'http://vocabularies.wikipathways.org/gpml#',
    '@type': '@id'
  },
  'id': '@id',
  'identifier': {
    '@id': 'http://rdaregistry.info/Elements/u/P60052',
    '@type': '@id'
  },
  'prefLabel': {
    '@id': 'skos:prefLabel',
    '@type': '@id'
  },
  'skos': {
    '@id': 'http://www.w3.org/2004/02/skos/core#',
    '@type': '@id'
  },
  'subject': {
    '@id': 'dcterms:subject',
    '@type': '@id'
  },
  'type': '@type',
};

/**
 * Convert from Biopax-ish entityReference to pvjs entity.
 *
 * @param {object} entityReference
 * @param {string} entityReference.id || entityReference['@id']
 * @param {string} entityReference.type || entityReference['@type']
 * @param {string} entityReference.displayName || entityReference._displayName
 * @param {string} entityReference.identifier Character string that differentiates this
 *                                          entityReference from other entityReferences.
 * @param {object} entityReference.isDataItemIn Dataset of which this entityReference
 *                                              reference is a member
 * @param {string} entityReference.isDataItemIn.id || entityReference.isDataItemIn['@id'] IRI
 * @param {string} entityReference.isDataItemIn.displayName
 * @return
 */
function convertXrefToPvjsEntity(entityReference) {
  var pvjsEntity = _.clone(entityReference);
  pvjsEntity.id = pvjsEntity.id || pvjsEntity['@id'];

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

  // TODO make the way we specify pvjsEntity types consistent
  if (!!pvjsEntity.type) {
    var gpmlDataNodeTypeBiopaxId = pvjsEntity.type;
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

    gpmlDataNodeTypeId = _.intersection(candidateMatchIds, pvjsEntity['@type'])[0];
  }

  pvjsEntity.type = gpmlDataNodeTypeId;

  var dataset = pvjsEntity.isDataItemIn;
  dataset.id = dataset.id || dataset['@id'];

  return pvjsEntity;
}

var createJsonldCompactStream = highland.wrapCallback(jsonld.compact);
var createJsonldExpandStream = highland.wrapCallback(jsonld.expand);

module.exports = {
  arrayify: arrayify,
  arrayifyClean: arrayifyClean,
  context: context,
  convertXrefToPvjsEntity: convertXrefToPvjsEntity,
  createJsonldCompactStream: createJsonldCompactStream,
  createJsonldExpandStream: createJsonldExpandStream
};
