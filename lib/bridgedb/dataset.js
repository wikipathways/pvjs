/* @module Dataset */

var _ = require('lodash');
var csv = require('csv-streamify');
var httpErrors = require('./http-errors.js');
var hyperquest = require('hyperquest');
var Rx = require('rx-extra');
var RxNode = Rx.RxNode;
var URI = require('URIjs');

var csvOptions = {objectMode: true, delimiter: '\t'};

var BIOPAX = 'http://www.biopax.org/release/biopax-level3.owl#';
// TODO the entries below are from datasource_headers.txt
// but elsewhere in this codebase, we're using terms from
// existing ontologies. Pick one and use throughout.
var BDB = 'http://vocabularies.bridgedb.org/ops#';
var DCTERMS = 'http://purl.org/dc/terms/';
var FOAF = 'http://xmlns.com/foaf/0.1/';
var IDENTIFIERS = 'http://identifiers.org/';
var IDOT = IDENTIFIERS + 'idot/';
var OWL = 'http://www.w3.org/2002/07/owl#';
//var RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
//var RDFS = 'http://www.w3.org/2000/01/rdf-schema#';
//var SKOS = 'http://www.w3.org/2004/02/skos/core#';
var SCHEMA = 'http://schema.org/';
var VOID_NS = 'http://rdfs.org/ns/void#';

var DATASOURCES_HEADERS_NS = [
  'https://github.com/bridgedb/BridgeDb/blob/master/',
  'org.bridgedb.bio/resources/org/bridgedb/bio/datasources_headers.txt#'
].join('');

var datasourcesHeadersKeys = [
  'datasource_name',
  'system_code',
  'website_url',
  'linkout_pattern',
  'example_identifier',
  'entity_identified',
  'single_species',
  'identifier_type',
  'uri',
  'regex',
  'official_name',
];
var datasourcesHeadersBDBIris = [
  BDB + 'hasDataSource',
  BDB + 'systemCode',
  BDB + 'mainUrl',
  BDB + 'hasRegexUriPattern',
  BDB + 'idExample',
  BDB + 'type',
  BDB + 'aboutOrganism',
  BDB + 'primary',
  '@id',
  BDB + 'hasRegexPattern',
  BDB + 'fullName',
];

var datasourcesHeadersSameAsMappings = {};
datasourcesHeadersSameAsMappings[BDB + 'systemCode'] = {
  vocab: IDOT,
  term: 'alternatePrefix'
};
datasourcesHeadersSameAsMappings[BDB + 'mainUrl'] = {
  vocab: FOAF,
  term: 'page'
};
datasourcesHeadersSameAsMappings[BDB + 'idExample'] = {
  vocab: IDOT,
  term: 'exampleIdentifier'
};
datasourcesHeadersSameAsMappings[BDB + 'aboutOrganism'] = {
  vocab: BIOPAX,
  term: 'organism'
};
datasourcesHeadersSameAsMappings[BDB + 'hasRegexPattern'] = {
  vocab: IDOT,
  term: 'identifierPattern'
};
datasourcesHeadersSameAsMappings[BDB + 'fullName'] = {
  vocab: SCHEMA,
  term: 'name'
};
datasourcesHeadersSameAsMappings['@id'] = {
  term: 'id'
};

var datasourcesHeadersMappings = _.zip(datasourcesHeadersKeys, datasourcesHeadersBDBIris)
.reduce(function(accumulator, zipped) {
  var key = zipped[0];
  var bdbIri = zipped[1];
  var term = bdbIri.replace(BDB, '');

  if (accumulator[key] || accumulator[term]) {
    throw new Error('Clobbering term "' + term + '"!');
  }
  accumulator[key] = accumulator[term] =
    accumulator[bdbIri] = bdbIri;
  var mapping = datasourcesHeadersSameAsMappings[bdbIri];
  if (mapping) {
    var mappingTerm = mapping.term;
    if (accumulator[mappingTerm]) {
      throw new Error('Clobbering term "' + mappingTerm + '"!');
    }
    var mappingVocab = mapping.vocab;
    var sameAsIri;
    if (mappingVocab) {
      sameAsIri = mappingVocab + mappingTerm;
    } else {
      sameAsIri = mappingTerm;
    }
    accumulator[mappingTerm] = accumulator[sameAsIri] = bdbIri;
  }
  return accumulator;
}, {});

/**
 * Used internally to create a new Dataset instance. See related
 * {@link http://bridgedb.org/apidoc/2.0/org/bridgedb/DataSource.html|DataSource}
 * from BridgeDb-Java.
 * @class
 * @memberof BridgeDb
 * @param {Object} instance
 */
var Dataset = function(instance) {
  'use strict';

  var config = instance.config;

  var jsonldRx = instance.jsonldRx;
  var internalContext = config.context;

  var matchers = [{
    characteristics: [
      BDB + 'mainUrl',
      '@id',
      DATASOURCES_HEADERS_NS + 'uri',
      SCHEMA + 'webPage',
      FOAF + 'page',
      DATASOURCES_HEADERS_NS + 'wesbite_url',
    ],
    probabilityTruePositive: 0.95,
    probabilityFalsePositive: 0.01,
  }, {
    characteristics: [
      SCHEMA + 'name',
      BDB + 'hasDataSource',
      BDB + 'fullName',
      BDB + 'systemCode',
      DATASOURCES_HEADERS_NS + 'official_name',
      DATASOURCES_HEADERS_NS + 'datasource_name',
      DATASOURCES_HEADERS_NS + 'system_code',
      IDENTIFIERS + 'idot/preferredPrefix',
      IDENTIFIERS + 'idot/alternatePrefix',
    ],
    probabilityTruePositive: 0.8,
    probabilityFalsePositive: 0.02,
  }, {
    characteristics: [
      VOID_NS + 'exampleResource',
    ],
    probabilityTruePositive: 0.9,
    probabilityFalsePositive: 0.01,
    tests: [
     function(toMatchRecord, toMatchRecordValue, referenceRecord, referenceRecordValue) {
       var reEntry = referenceRecord[VOID_NS + 'uriRegexPattern'];
       if (reEntry && reEntry[0] && reEntry[0]['@value']) {
         var reString = reEntry[0]['@value'];
         var re = new RegExp(reString);
         return re.test(toMatchRecordValue);
       }
     },
    ]
  }, {
    characteristics: [
      BDB + 'idExample',
      IDENTIFIERS + 'idot/exampleIdentifier',
      DATASOURCES_HEADERS_NS + 'example_identifier',
    ],
    probabilityTruePositive: function(matcher, toMatchRecord, referenceRecord) {
      // set the default to use if non of the condition(s) below change it.
      // TODO this is currently just a quick guess at an appropriate value.
      var probability = 0.02;
      var reEntry = referenceRecord[IDENTIFIERS + 'idot/identifierPattern'] ||
          referenceRecord[DATASOURCES_HEADERS_NS + 'regex'];
      if (reEntry && reEntry[0] && reEntry[0]['@value']) {
        var reString = reEntry[0]['@value'];
        var re = new RegExp(reString);
        // TODO look at exact match vs. regex
        if (re.test('1234')) {
          // TODO both of these values may change if datasources.txt is changed.
          // maybe 25 identifier regex's match numbers, and
          // there are currently 137 total rows in datasources.txt.
          probability = (137 - 25) / 137;
        }
      }
      return probability;
      //*/
    },
    probabilityFalsePositive: function(matcher, toMatchRecord, referenceRecord) {
      // TODO improve this very rough first attempt at calculating the prob. for
      // an identifier Regular Expression to match an example identifier and yet
      // incorrectly identify the database.

      // set the default to use if non of the condition(s) below change it.
      // TODO this is currently just a quick guess at an appropriate value.
      var probability = 0.01;
      var reEntry = referenceRecord[IDENTIFIERS + 'idot/identifierPattern'] ||
          referenceRecord[DATASOURCES_HEADERS_NS + 'regex'];
      if (reEntry && reEntry[0] && reEntry[0]['@value']) {
        var reString = reEntry[0]['@value'];
        var re = new RegExp(reString);
        if (re.test('1234')) {
          // TODO both of these values may change if datasources.txt is changed.
          // maybe 25 identifier regex's match numbers, and
          // there are currently 137 total rows in datasources.txt.
          probability = 25 / 137;
        }
      }
      return probability;
    },
    tests: [
     function(toMatchRecord, toMatchRecordValue, referenceRecord, referenceRecordValue) {
       var reEntry = referenceRecord[IDENTIFIERS + 'idot/identifierPattern'] ||
          referenceRecord[DATASOURCES_HEADERS_NS + 'regex'];
       if (reEntry && reEntry[0] && reEntry[0]['@value']) {
         var reString = reEntry[0]['@value'];
         var re = new RegExp(reString);
         var testResult = re.test(toMatchRecordValue);
         return re.test(toMatchRecordValue);
       }
     },
    ],
  }, {
    characteristics: [
      BDB + 'aboutOrganism',
      DCTERMS + 'subject',
      DATASOURCES_HEADERS_NS + 'entity_identified',
    ],
    probabilityTruePositive: 0.85,
    probabilityFalsePositive: 0.2,
  }];

  /**
   * getIdentifiersIriFromMiriamUrnInDataset
   *
   * @param {object} dataset compacted dataset based on datasources.txt and
                             datasources_headers.txt
   * @param {string} dataset['http://vocabularies.bridgedb.org/ops#uri']
   * @return {string} e.g., "http://identifiers.org/ncbigene/"
   */
  function getIdentifiersIriFromMiriamUrnInDataset(dataset) {
    var preferredPrefix = getPreferredPrefixFromMiriamUrnInDataset(dataset);
    if (preferredPrefix) {
      return IDENTIFIERS + preferredPrefix + '/';
    }
  }

  // jscs:disable
  /**
   * See {@link http://rdfs.org/ns/void#Dataset|void:Dataset}
   * @typedef {Object} Dataset Dataset with as many as possible of the properties listed below.
   * @property {JsonldContext} @context JSON-LD context.
   * @property {Iri} id Preferred IRI for identifying a dataset.
   * @property {String[]} 'http://www.w3.org/2002/07/owl#' Alternate IRI for identifying a dataset.
   *                    See {@link http://www.w3.org/TR/owl-ref/#sameAs-def|owl:sameAs}.
   * @property {String} name Official, standardized name for the data set.
   *  See {@link http://schema.org/name|schema:name}.
   * @property {String} webPage See
   *  {@link http://bridgedb.org/apidoc/2.0/org/bridgedb/DataSource.html#getMainUrl()|
   *    Java documentation} and {@link http://www.w3.org/2001/XMLSchema#anyURI|xsd:anyURI}.
   * @property {String} uriRegexPattern See
   *  {@link http://rdfs.org/ns/void#uriRegexPattern|void:uriRegexPattern}.
   * @property {Iri} exampleResource See
   *  {@link http://rdfs.org/ns/void#exampleResource|void:exampleResource}.
   * @property {String} exampleIdentifier See
   *  {@link http://identifiers.org/idot/exampleIdentifier|idot:exampleIdentifier}.
   * @property {String} organism Provided only if the dataset is for a single organism. See
   *  {@link http://www.biopax.org/release/biopax-level3.owl#organism|biopax:organism}.
   * @property {String} entityType Biological type, as used at BridgeDb. See
   *  {@link
   *  http://bridgedb.org/apidoc/2.0/org/bridgedb/DataSource.Builder.html#type(java.lang.String)|
   *  Java documentation}.
   * @property {JsonldType} type {@link http://rdfs.org/ns/void#Dataset|void:Dataset}
   * @property {String|String[]} subject Subject of the database, such as the biological type of
   *  its contained entity references. Biological type as used in GPML at WikiPathways and in
   *  PathVisio-Java:
   *  {@link http://vocabularies.wikipathways.org/gpml#Type|gpml:Type}.
   *  Biological type as used in Biopax: see the domain for
   *  {@link
   *  http://www.biopax.org/release/biopax-level3.owl#entityReference|biopax:entityReference}.
   * @property {Boolean} primary See Java documentation for
   *  {@link http://bridgedb.org/apidoc/2.0/org/bridgedb/DataSource.html#isPrimary()|"isPrimary"}
   *  and for
   *  {@link http://bridgedb.org/apidoc/2.0/org/bridgedb/DataSource.Builder.html#primary(boolean)|
   *  "primary" method}.
   * @property {String} identifierPattern Regular expression for the identifiers from this dataset.
   *  See {@link http://identifiers.org/idot/identifierPattern|idot:identifierPattern}.
   * @property {String} preferredPrefix Abbreviation as used by identifiers.org to identify a
   *  dataset. See {@link http://identifiers.org/idot/preferredPrefix|idot:preferredPrefix}.
   *  @example: 'ncbigene'
   * @property {String[]} alternatePrefix Abbreviation as used elsewhere to identify a dataset,
   *  such as at BridgeDb (systemCode located both here and on its own).
   *  See {@link http://identifiers.org/idot/alternatePrefix|idot:alternatePrefix}.
   * @property {String} systemCode See
   *  {@link http://bridgedb.org/apidoc/2.0/org/bridgedb/DataSource.html#getSystemCode()|
   *    Java documentation}.
   * @property {String} datasource_name Name for the data set as used in the BridgeDb project and
   *                    in GPML as Xref Datasource.
   */
   // jscs:enable

  /**
   * At least one of the following properties must be provided.
   * @typedef {Object} DatasetArgs
   * @property {Iri} [id]
   * @property {String} [preferredPrefix]
   * @property {String|String[]} [systemCode]
   * @property {String|String[]} [name]
   * @property {String} [identifier] The identifier of the entity reference. This property
   *                                   will only be used if no other properties return results,
   *                                   because many different datasets have overlapping
   *                                   identifierPatterns.
   */

  /**
   * @private
   *
   * Get all biological datasets supported by BridgeDb, with all
   * available metadata, largely as specified in
   * {@link
   * https://github.com/bridgedb/BridgeDb/blob/master/org.bridgedb.bio/
   * resources/org/bridgedb/bio/datasources.txt|
   * datasources.txt}.
   *
   * @return {Stream<Dataset>} datasetStream
   */
  function _getAll() {
    // TODO this is actually pausable
    return RxNode.fromUnpausableStream(
      hyperquest(config.datasetsMetadataIri, {
        withCredentials: false,
      })
    )
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.Dataset._getAll from XHR request.';
      console.error(err.message);
      console.error(err.stack);
    })
    .streamThrough(csv(csvOptions))
    .map(function(array) {
      var result = {
        '@context': internalContext,
        systemCode: array[1],
        webPage: array[2],
        exampleIdentifier: array[4],
        entityType: array[5],
        // TODO this is returning organism as a string
        // when elsewhere we are using organism as an
        // object. Will that cause problems?
        organism: array[6],
        primary: array[7] === '1',
        identifierPattern: array[9],
        name: array[10]
      };

      // jscs: disable
      result.datasource_name = array[0];
      result.linkout_pattern = array[3];
      result.uri = array[8];
      // jscs: enable

      return result;
    })
    .map(function(dataset) {

      // remove empty properties, ie., propeties with these values:
      // ''
      // NaN
      // null
      // undefined
      // TODO what about empty plain object {} or array []

      return _.omitBy(dataset, function(value) {
        return value === '' ||
          _.isNaN(value) ||
        _.isNull(value) ||
        _.isUndefined(value);
      });
    })
    .map(function(dataset) {
      // jscs: disable
      var linkoutPattern = dataset.linkout_pattern;
      // jscs: enable
      var identifierPattern = dataset.identifierPattern;
      if (!!linkoutPattern) {
        dataset.uriRegexPattern = linkoutPattern.replace(
          '$id',
          _getIdentifierPatternWithoutBeginEndRestriction(identifierPattern)
        );

        // if '$id' is at the end of the linkoutPattern
        var indexOfDollaridWhenAtEnd = linkoutPattern.length - 3;
        if (linkoutPattern.indexOf('$id') === indexOfDollaridWhenAtEnd) {
          dataset[OWL + 'sameAs'] = dataset[OWL + 'sameAs'] || [];
          dataset[OWL + 'sameAs'].push(linkoutPattern.substr(0, indexOfDollaridWhenAtEnd));
        }
      }

      dataset.type = 'Dataset';

      return dataset;
    })
    .map(function(dataset) {
      var preferredPrefix = getPreferredPrefixFromMiriamUrnInDataset(dataset);
      if (preferredPrefix) {
        var _miriamRootUrn = dataset.uri;
        dataset[OWL + 'sameAs'] = dataset[OWL + 'sameAs'] || [];
        dataset[OWL + 'sameAs'].push(_miriamRootUrn);

        dataset.preferredPrefix = preferredPrefix;
        var identifiersIri = getIdentifiersIriFromMiriamUrnInDataset(dataset);
        if (identifiersIri) {
          dataset.id = identifiersIri;
        }
      }
      return dataset;
    })
    .map(function(dataset) {
      if (!!dataset.entityType) {
        dataset.subject = [];
        /* Example of using 'subject' (from the VOID docs <http://www.w3.org/TR/void/#subject>):
            :Bio2RDF a void:Dataset;
                dcterms:subject <http://purl.uniprot.org/core/Gene>;
                .

        The closest concepts from the GPML, BioPAX and MESH vocabularies are included below.

        Note that in BioPAX, 'ProteinReference' is to 'Protein' as
            'Class' is to 'Instance' or
            'platonic ideal of http://identifiers.org/uniprot/P78527' is to
                  'one specific example of http://identifiers.org/uniprot/P78527'
        with the same logic applying for Dna, Rna and SmallMolecule. As such, it appears the
        subject of Uniprot is best described in BioPAX terms as biopax:ProteinReference instead
        of biopax:Protein.

        It is unclear whether the subject of Entrez Gene is biopax:DnaReference or biopax:Gene,
        but I'm going with biopax:DnaReference for now because it appears to be analogous to
        ProteinReference and SmallMoleculeReference.
        //*/
        if (dataset.entityType === 'gene' ||
            // TODO should the following two conditions be removed?
            dataset.entityType === 'probe' ||
            dataset.preferredPrefix === 'go') {
          dataset.subject.push('gpml:GeneProduct');
          dataset.subject.push('biopax:DnaReference');
        } else if (dataset.entityType === 'probe') {
          dataset.subject.push('probe');
        } else if (dataset.entityType === 'rna') {
          dataset.subject.push('gpml:Rna');
          dataset.subject.push('biopax:RnaReference');
        } else if (dataset.entityType === 'protein') {
          dataset.subject.push('gpml:Protein');
          dataset.subject.push('biopax:ProteinReference');
        } else if (dataset.entityType === 'metabolite') {
          dataset.subject.push('gpml:Metabolite');
          dataset.subject.push('biopax:SmallMoleculeReference');
        } else if (dataset.entityType === 'pathway') {
          // BioPAX does not have a term for pathways that is analogous to
          // biopax:ProteinReference for proteins.
          dataset.subject.push('gpml:Pathway');
          dataset.subject.push('biopax:Pathway');
        } else if (dataset.entityType === 'ontology') {
          dataset.subject.push(OWL + 'Ontology');
        } else if (dataset.entityType === 'interaction') {
          dataset.subject.push('biopax:Interaction');
        }
      }

      dataset.alternatePrefix = [
        dataset.systemCode
      ];

      return dataset;
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.Dataset._getAll';
      throw err;
    })
    .shareReplay();
  }

  function _getAllProcessedForMatcher() {
    var datasetsProcessedForMatcher = instance.datasetsProcessedForMatcher;
    var datasetsProcessedForMatcherSource = instance.datasetsProcessedForMatcherSource;
    if (datasetsProcessedForMatcher) {
      return Rx.Observable.from(datasetsProcessedForMatcher)
      .doOnError(function(err) {
        err.message = (err.message || '') +
            ', observed in BridgeDb.Dataset._getAllProcessedForMatcher (cached)';
        throw err;
      });
    } else if (datasetsProcessedForMatcherSource) {
      return datasetsProcessedForMatcherSource
      .doOnError(function(err) {
        err.message = (err.message || '') +
            ', observed in BridgeDb.Dataset._getAllProcessedForMatcher (getting)';
        throw err;
      });
    }

    datasetsProcessedForMatcherSource = jsonldRx.matcher._processReferenceRecords(
        _getAll(),
        matchers
    )
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.Dataset._getAllProcessedForMatcher';
      throw err;
    });

    instance.datasetsProcessedForMatcherSource = datasetsProcessedForMatcherSource.share();

    return datasetsProcessedForMatcherSource
    .toArray()
    .doOnNext(function(datasetsProcessedForMatcher) {
      instance.datasetsProcessedForMatcher = datasetsProcessedForMatcher;
    })
    .flatMap(Rx.Observable.from)
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.Dataset._getAllProcessedForMatcher';
      throw err;
    });
  }

  function _getIdentifierPatternWithoutBeginEndRestriction(identifierPattern) {
    identifierPattern = identifierPattern || '.*';
    var identifierPatternWithoutBeginEndRestriction =
      '(' + identifierPattern.replace(/(^\^|\$$)/g, '') + ')';
    return identifierPatternWithoutBeginEndRestriction;
  }

  /**
   * Get one dataset, which will be the first dataset that matches
   * at least one of the provided argument(s).
   *
   * @param {DatasetArgs} args
   * @return {Stream<Dataset>} datasetsStream
   */
  function get(args) {
    return query(args)
    .first()
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.Dataset.get';
      throw err;
    });
  }

  /**
   * getPreferredPrefixFromMiriamUrnInDataset
   *
   * @param {object} dataset expanded dataset based on datasources.txt and
                             datasources_headers.txt
   * @param {string} dataset.uri, e.g., "urn:miriam:ncbigene"
   * @return {string} preferredPrefix from identifiers.org, e.g., "ncbigene"
   */
  function getPreferredPrefixFromMiriamUrnInDataset(dataset) {
    var uriProperty = dataset.uri;
    if (!!uriProperty) {
      // Make sure it's actually an identifiers.org namespace,
      // not a BridgeDb system code:
      if (uriProperty.indexOf('urn:miriam:') > -1) {
        return uriProperty.substring(11, uriProperty.length);
      }
    }
  }

  /**
   * Get all datasets, or find the datasets that match at least one of the provided argument(s).
   *
   * @param {DatasetArgs} [args] If no args specified, will return all datasets.
   * @return {Stream<Dataset>} datasetsStream
   */
  function query(args) {
    if (_.isEmpty(args)) {
      return _getAll()
      .doOnError(function(err) {
        err.message = err.message || '';
        err.message += ', observed in BridgeDb.Dataset.query';
        throw err;
      });
    }

    var parsedArgs = _.fromPairs(
        _.toPairs(args)
        .map(function(pair) {
          var key = pair[0];
          var value = pair[1];
          var mapping = datasourcesHeadersMappings[key];
          var updatedKey;
          if (!mapping) {
            updatedKey = key;
          } else {
            updatedKey = mapping;
          }
          return [updatedKey, value];
        })
    );

    //*
    var options = {
      threshold: 1,
      skipReferenceRecordExpansion: true,
    };
    //*/

    return jsonldRx.matcher.filter(parsedArgs, _getAllProcessedForMatcher(), matchers, options)
    .toArray()
    .map(function(matcherResults) {
      if (matcherResults.length < 2) {
        return matcherResults;
      }

      var weights = matcherResults.map(function(matcherResult) {
        return matcherResult.weight;
      });
      var maxWeight = Math.max.apply(null, weights);
      var minWeight = Math.min.apply(null, weights);
      var totalWeightRange = maxWeight - minWeight;

      var wpPreferredDatasets = [
        'ensembl',
        'ncbigene',
        'chebi',
        'cas',
        'hmdb',
        'uniprot',
        'kegg.compound'
      ];

      matcherResults.sort(function(matcherResult1, matcherResult2) {
        var dataset1 = matcherResult1.value;
        var dataset2 = matcherResult2.value;

        // sort by weight (but only if one weight is much larger than the other)
        if (totalWeightRange > 0) {
          var weightRange = matcherResult1.weight - matcherResult2.weight;
          // TODO fix magic number. this is just a placeholder.
          var muchLargerThan = 0.1;
          var normalizedWeight = weightRange / totalWeightRange;
          if (normalizedWeight > muchLargerThan) {
            return -1;
          } else if (-1 * normalizedWeight > muchLargerThan) {
            return 1;
          }
        }

        // next sort by whether preferredPrefix (if present) is in the list
        // of prefixes preferred for use at WikiPathways
        var preferredPrefix1 = dataset1.preferredPrefix;
        var preferredPrefix2 = dataset2.preferredPrefix;
        var preferenceAtWPIndex1 = wpPreferredDatasets.indexOf(preferredPrefix1);
        var preferenceAtWPIndex2 = wpPreferredDatasets.indexOf(preferredPrefix2);
        var preferredAtWP1 = preferenceAtWPIndex1 > -1;
        var preferredAtWP2 = preferenceAtWPIndex2 > -1;
        if (preferredAtWP1 && !preferredAtWP2) {
          return -1;
        } else if (!preferredAtWP1 && preferredAtWP2) {
          return 1;
        } else if (preferredAtWP1 && preferredAtWP2) {
          return preferredAtWP1 > preferredAtWP2;
        }

        // sort by is primary (as tagged at BridgeDb)
        var isPrimary1 = dataset1.primary;
        var isPrimary2 = dataset2.primary;
        if (isPrimary1 && !isPrimary2) {
          return -1;
        } else if (!isPrimary1 && isPrimary2) {
          return 1;
        }

        // sort by presence of a preferredPrefix (it will have one if it has a Miriam URN)
        if (preferredPrefix1 && !preferredPrefix2) {
          return -1;
        } else if (!preferredPrefix1 && preferredPrefix2) {
          return 1;
        }

        return preferredPrefix1 > preferredPrefix2;
      });

      return matcherResults;
    })
    .concatMap(function(sortedResults) {
      // TODO We should distinguish between exact and fuzzy matches.
      return Rx.Observable.from(sortedResults)
      .map(function(result) {
        return result.value;
      });
      /*
      .filter(function(dataset) {
        // TODO Make it optional whether to apply this filter.
        // or else maybe just run this filter outside bridgedbjs,
        // wherever this function is being called?

        // Dataset subjects that indicate the dataset should not be used for identifying
        // a BioPAX Entity Reference for a gpml:DataNode.
        var nonApplicableSubjects = [
          'interaction',
          'ontology',
          'probe',
          'experiment',
          'publication',
          'model',
          'organism'
        ];
        return dataset.primary &&
            !!dataset.id &&
            nonApplicableSubjects.indexOf(dataset.entityType) === -1;
      });
      //*/
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.Dataset.query';
      throw err;
    });
  }

  function convertPreferredPrefixToSystemCode(preferredPrefix) {
    return getByPreferredPrefix(preferredPrefix)
      .map(function(dataset) {
      if (!dataset) {
        var message = 'No BridgeDb-supported dataset available for ' +
           'preferredPrefix + "' + preferredPrefix + '"';
        return new Error(message);
      }
      return dataset.systemCode;
    });
  }

  return {
    convertPreferredPrefixToSystemCode:
      convertPreferredPrefixToSystemCode,
    get:get,
    _getIdentifierPatternWithoutBeginEndRestriction:
      _getIdentifierPatternWithoutBeginEndRestriction,
    query:query
  };
};

module.exports = Dataset;
