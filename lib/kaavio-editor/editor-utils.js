var _ = require('lodash');

var context = {
  'biopax': {
    '@id': 'http://www.biopax.org/release/biopax-level3.owl#',
    '@type': '@id'
  },
  /* TODO the vocab at https://wikipathwayscontexts.firebaseio.com/display/.json
   * must be wrong, because it insists on compacting to
   * css2:fonts.html#font-family-prop instead of just fontFamily.
  'css2': {
    '@id': 'http://www.w3.org/TR/CSS2/',
    '@type': '@vocab'
  },
  //*/
  'entityReference': {
    '@id': 'biopax:entityReference',
    '@type': '@id'
  },
  'bridgedb': {
    '@id': 'http://www.example.org/bridgedb/input-vocab/',
    '@type': '@vocab'
  },
  'color': 'http://www.w3.org/TR/CSS2/colors.html#propdef-color',
  /*
  'color': {
    //'@id': 'css2:colors.html#propdef-color',
    '@id': 'http://www.w3.org/TR/CSS2/colors.html#propdef-color',
    '@type': '@vocab'
  },
  //*/
  'db': {
    '@id': 'biopax:db',
    '@type': 'xsd:string'
  },
  'dcterms': {
    '@id': 'http://purl.org/dc/terms/',
    '@type': '@id'
  },
  'displayName': {
    '@id': 'biopax:displayName',
    '@type': 'xsd:string'
  },
  'fontFamily': 'http://www.w3.org/TR/CSS2/fonts.html#font-family-prop',
  /*
  'fontFamily': {
    //'@id': 'css2:fonts.html#font-family-prop',
    '@id': 'http://www.w3.org/TR/CSS2/fonts.html#font-family-prop',
    '@type': 'xsd:string'
  },
  //*/
  'fontSize': 'http://www.w3.org/TR/CSS2/fonts.html#propdef-font-size',
  /*
  'fontSize': {
    //'@id': 'css2:fonts.html#propdef-font-size',
    '@id': 'http://www.w3.org/TR/CSS2/fonts.html#propdef-font-size',
    '@type': '@id'
  },
  //*/
  'fontStyle': 'http://www.w3.org/TR/CSS2/fonts.html#propdef-font-style',
  /*
  'fontStyle': {
    //'@id': 'css2:fonts.html#propdef-font-style',
    '@id': 'http://www.w3.org/TR/CSS2/fonts.html#propdef-font-style',
    '@type': '@id'
  },
  //*/
  'fontWeight': 'http://www.w3.org/TR/CSS2/fonts.html#propdef-font-weight',
  /*
  'fontWeight': {
    //'@id': 'css2:fonts.html#propdef-font-weight',
    '@id': 'http://www.w3.org/TR/CSS2/fonts.html#propdef-font-weight',
    '@type': '@vocab'
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
  'idot': {
    '@id': 'http://identifiers.org/idot/',
    '@type': '@vocab'
  },
  /*
  'identifiers': {
    '@id': 'http://identifiers.org/',
    '@type': '@id'
  },
  //*/
  'isDataItemIn': {
    '@id': 'http://semanticscience.org/resource/SIO_001278',
    '@type': '@id'
  },
  'name': {
    '@id': 'schema:name',
    '@type': '@id'
  },
  'prefLabel': {
    '@id': 'skos:prefLabel',
    '@type': '@id'
  },
  'preferredPrefix': {
    '@id': 'idot:preferredPrefix',
    '@type': 'xsd:string'
  },
  'schema': {
    '@id': 'http://schema.org/',
    '@type': '@vocab'
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
  'xref': {
    '@id': 'biopax:xref',
    '@type': '@id'
  },
  'xsd': {
    '@id': 'http://www.w3.org/2001/XMLSchema#',
    '@type': '@id'
  },
};

/**
 * Convert from Biopax-ish entityReference to pvjs annotationEntity.
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
 * @param {object} selectedPvjsElement
 * @param {string} selectedPvjsElement.displayName || selectedPvjsElement._displayName
 * @return {object} an annotationEntity, which is a combination of an Xref plus
 *                  the displayName of the selected element, which may differ from
 *                  the displayName of the referenced Xref.
 */
function createAnnotationEntity(entityReference, selectedPvjsElement) {
  var annotationEntity = _.clone(entityReference);
  annotationEntity.displayName = selectedPvjsElement.textContent || annotationEntity.displayName;
  annotationEntity.id = annotationEntity.id || annotationEntity['@id'];

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

  // TODO make the way we specify annotationEntity types consistent
  if (!!annotationEntity.type) {
    var gpmlDataNodeTypeBiopaxId = annotationEntity.type;
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

    gpmlDataNodeTypeId = _.intersection(candidateMatchIds, annotationEntity['@type'])[0];
  }

  annotationEntity.type = gpmlDataNodeTypeId;

  var dataset = annotationEntity.isDataItemIn;
  dataset.id = dataset.id || dataset['@id'];

  return annotationEntity;
}

module.exports = {
  context: context,
  createAnnotationEntity: createAnnotationEntity
};
