/* @module EntityReference */

var _ = require('lodash');
var csv = require('csv-streamify');
var httpErrors = require('./http-errors.js');
var hyperquest = require('hyperquest');
var Rx = require('rx-extra');
var RxNode = Rx.RxNode;

var csvOptions = {objectMode: true, delimiter: '\t'};

var DATASOURCES_HEADERS_NS = [
  'https://github.com/bridgedb/BridgeDb/blob/master/',
  'org.bridgedb.bio/resources/org/bridgedb/bio/datasources_headers.txt#'
].join('');

/**
 * Used internally to create a new EntityReference instance
 * @class
 * @protected
 * @memberof BridgeDb
 * @param {Object} instance
 */
var EntityReference = function(instance) {
  'use strict';

  var config = instance.config;

  var jsonldRx = instance.jsonldRx;
  var internalContext = config.context;

  /**
   * See {@link http://www.biopax.org/release/biopax-level3.owl#EntityReference|
   *          biopax:EntityReference}
   * @typedef {Object} EntityReference Entity reference with as many as possible of
   *                    the properties listed below.
   * @property {JsonldContext} @context JSON-LD context.
   * @property {Iri} id JSON-LD IRI.
   * @property {String} displayName See
   *    {@link http://www.biopax.org/release/biopax-level3.owl#displayName|biopax:displayName}
   * @property {String} db See {@link http://www.biopax.org/release/biopax-level3.owl#db|biopax:db}
   * @property {Dataset} isDataItemIn The dataset (database) for the identifier. See
   *                  {@link http://semanticscience.org/resource/SIO_001278|SIO:001278}
   * @property {Array<String>} xref List of IRIs (URLs) for getting Xrefs,
   *                      such as from the BridgeDb webservices or from mygene.info.
   * @property {String} identifier See {@link http://www.biopax.org/release/biopax-level3.owl#id|
   *                      biopax:id} @example: "1234".
   * @property {JsonldType} type Biological type. See
   *    {@link http://www.w3.org/TR/json-ld/#dfn-node-type|JSON-LD documentation}
  */

  /**
   * @private
   * Add an {@link Iri|IRI} to semantically identify the provided entity
   * reference, replacing previous one, if present.
   *
   * @param {EntityReference} entityReference
   * @param {String} entityReference.identifier
   * @param {Dataset} entityReference.isDataItemIn
   * @param {String} entityReference.isDataItemIn.preferredPrefix
   * @return {EntityReference} {@link EntityReference} with an identifiers.org {@link Iri|id}.
   *                Additionally, "owl:sameAs" will be added if a previous, non-identifiers.org IRI
   *                was present. @example: "http://bio2rdf.org/ncbigene/1234".
   */
  function _addIdentifiersIri(entityReference) {
    var dataset = entityReference.isDataItemIn;
    if (!dataset || !dataset.preferredPrefix || !entityReference.identifier) {
      if (instance.debug) {
        var message = 'Could not add an identifiers.org IRI,' +
          ' because the provided entity' +
          ' reference was a dataset name and/or identifier.';
        console.warn(message);
        console.warn(entityReference);
      }
      return entityReference;
    }

    // If the entity reference has a non-identifiers ID, we will move
    // that ID to the property "owl:sameAs" and add an identifiers ID.
    if (!!entityReference.id &&
        entityReference.id.indexOf('identifiers.org') === -1) {
      if (!entityReference['owl:sameAs']) {
        entityReference['owl:sameAs'] = [];
      }
      entityReference['owl:sameAs'] =
        _.union(entityReference['owl:sameAs'], [entityReference.id]);
    }

    entityReference.id = encodeURI('http://identifiers.org/' +
      dataset.preferredPrefix + '/' +
      entityReference.identifier);
    return entityReference;
  }

  /**
   * Add BridgeDb IRI (URL) for getting xrefs for provided entity reference.
   *
   * If there is already an "xref" property, the following steps will occur:
   * 1) the value of the existing "xref" property will be converted to an array,
   *    unless it is already an array.
   * 2) If the BridgeDb IRI is already in the "xref" property, we're done.
   *    Otherwise, we add the BridgeDb Xrefs IRI (URL) as a new element in the array,
   *    keeping any existing xref elements.
   *
   * @private
   *
   * @param {EntityReference} entityReference
   * @param {String} entityReference.identifier
   * @param {Organism} [organism]
   * @param {Dataset} entityReference.isDataItemIn
   * @param {String} entityReference.isDataItemIn.systemCode
   * @return {EntityReference} entityReference {@link EntityReference} with
   *                    BridgeDb IRI (URL) added.
   */
  var _addBridgeDbXrefsIri = function(entityReference) {
    if (!entityReference ||
        !entityReference.organism ||
        !entityReference.isDataItemIn ||
        !entityReference.isDataItemIn.systemCode ||
        !entityReference.identifier) {
      if (instance.debug) {
        var message = 'Cannot add BridgeDb Xrefs IRI (URL).' +
          ' See bridgeDb.entityReference._addBridgeDbXrefsIri()' +
          ' method for required parameters';
        console.warn(message);
      }
      return entityReference;
    }

    var xrefs = entityReference.xref = jsonldRx.arrayifyClean(entityReference.xref);

    var bridgeDbXrefsIri = instance.xref._getBridgeDbIriByEntityReference(entityReference);
    if (xrefs.indexOf(bridgeDbXrefsIri) === -1) {
      xrefs.push(bridgeDbXrefsIri);
    }
    return entityReference;
  };

//  /**
//   * DISABLED
//   * Create a Node.js/Highland stream through which entity references
//   * can be piped to enrich each one with data from BridgeDb.
//   *
//   * @param {Object} [options]
//   * @param {Boolean} [options.organism=true] Enrich with organism name.
//   * @param {Boolean} [options.context=true] Enrich with JSON-LD @context.
//   * @param {Boolean} [options.dataset=true] Enrich from data-sources.txt
//   *                         (metadata about biological datasets).
//   * @param {Boolean} [options.xref=true] Enrich with IRI (URL) for BridgeDb webservices
//   *                                        to enable getting xrefs for this entity reference.
//   * @return {Stream} entityReferenceTransformationStream
//   */
//  var createEnrichmentStream = function(options) {
//    return highland.pipeline(function(sourceStream) {
//      options = options || {};
//      var enrichWithProvidedOptions = highland.partial(
//        highland.flip(enrich),
//        options
//      );
//      return highland(sourceStream).flatMap(enrichWithProvidedOptions);
//    });
//  };

  /**
   * Enrich entity reference. Default is to enrich as much as possible with data from BridgeDb,
   * with the exception of not dereferencing any xref IRIs, but this enrichment can be controlled
   * by setting the relevant option(s) to false.
   *
   * @param {(String|Object|String[]|Object[]|Observable)} input Entity reference(s).
   *    Each one must have an identifier (e.g. ENSG00000160791) and a
   *    means for identifying the dataset, such as one of the following
   *    acceptable entityReference input arguments:
   *      1. BridgeDb xref IRI (URL) or identifiers.org IRI as string
   *        BridgeDb xref IRI @example:
   *        'http://webservice.bridgedb.org/Human/xrefs/L/1234'
   *        identifiers.org IRI @example:
   *        'http://identifiers.org/ncbigene/1234'
   *      2. Object with at least one of these properties:
   *        a. { 'id': identifiers.org IRI }
   *        b. { bridgeDbXrefsIri: BridgeDb xref IRI }
   *        c. { xref: [
   *               BridgeDb xref IRI
   *               ...
   *             ]
   *           }
   *      3. Object with both of these properties:
   *        {
   *          DATASOURCES_HEADERS_NS + 'official_name': official, standardized database name
   *          identifier: entity reference identifier, such as ChEBI:1234
   *        }
   *      4. Object with both of these properties:
   *        {
   *          DATASOURCES_HEADERS_NS + 'datasource_name': database name as used in BridgeDb
   *          identifier: entity reference identifier, such as ChEBI:1234
   *        }
   *
   * @param {Object} [options]
   * @param {Boolean} [options.organism=true] Enrich with organism name.
   * @param {Boolean} [options.context=true] Enrich with JSON-LD @context.
   * @param {Boolean} [options.dataset=true] Enrich from data-sources.txt
   *                         (metadata about biological datasets).
   * @param {Boolean} [options.xref=true] Enrich with IRI (URL) for BridgeDb webservices
   *                                        to enable getting xrefs for this entity reference.
   * @return {Observable<EntityReference>} entityReference {@link EntityReference} with as many
   *                    properties as possible added, unless otherwise specified by options.
   */
  function enrich(input, options) {
    console.log('input');
    console.log(input);
    console.log('options');
    console.log(options);
    var inputSource;
    if (_.isPlainObject(input)) {
      inputSource = Rx.Observable.return(input);
    } else if (_.isString(input)) {
      inputSource = Rx.Observable.return(_handleStringInput(input));
    } else if (_.isArray(input)) {
      inputSource = Rx.Observable.from(input);
    } else if (input && _.isFunction(input.subscribe)) {
      // Test above from
      // https://github.com/Reactive-Extensions/RxJS/blob/master/src/modular/observable.js#L13
      inputSource = input;
    } else {
      throw new Error('input not of a recognized type: string|object|string[]|object[]|Observable');
    }
    options = options || {};
    options = _.defaults(options, {
      organism: true,
      context: true,
      dataset: true,
      xref: true
    });

    return inputSource
    .flatMap(instance.addContext)
    .flatMap(function(entityReference) {
      var bridgeDbInputOriginalContext = entityReference['@context'];
      return jsonldRx.replaceContext(entityReference, internalContext)
      .map(function(entityReference) {
        entityReference.bridgeDbInputOriginalContext = bridgeDbInputOriginalContext;

        // TODO can we get rid of this checking to ensure removal of empty type values?
        var entityReferenceType = entityReference.type;
        if (entityReferenceType) {
          entityReferenceType = jsonldRx.arrayifyClean(entityReference.type);
          entityReference.type = entityReferenceType.filter(function(value) {
            return value;
          });
        }
        return entityReference;
      });
    })
    .map(_expand)
    .map(function(entityReference) {
      if (!entityReference.isDataItemIn || typeof entityReference.identifier === 'undefined') {
        console.error('Insufficiently-specified entity reference:');
        console.error(JSON.stringify(entityReference, null, '  '));
        var message = 'Not enough data provided to identify' +
          ' the specified entity reference (above)';
        throw new Error(message);
      }

      return entityReference;
    })
    .flatMap(function(entityReference) {
      // TODO can we get rid of this checking to ensure removal of empty type values?
      var entityReferenceType = entityReference.type;
      if (entityReferenceType) {
        entityReferenceType = jsonldRx.arrayifyClean(entityReference.type);
        entityReference.type = entityReferenceType.filter(function(value) {
          return value;
        });
      }

      if (options.dataset) {
        return _enrichFromDataset(entityReference);
      } else {
        return Rx.Observable.return(entityReference);
      }
    })
    .flatMap(function(entityReference) {
      if (options.organism || options.xref) {
        return instance.organism._getInstanceOrganism(entityReference)
        .map(function(organism) {
          if (!!organism) {
            entityReference.organism = organism;
          }
          return entityReference;
        });
      } else {
        return Rx.Observable.return(entityReference);
      }
    })
    .map(function(entityReference) {
      // TODO need to get xrefs working
      if (options.xref) {
        var entityReferenceWithBridgeDbXrefsIri =
          _addBridgeDbXrefsIri(entityReference);

        var dataset = entityReference.isDataItemIn;
        var preferredPrefix = dataset && dataset.preferredPrefix;
        var preferredPrefixesSupportedByMyGeneInfo = [
          'ensembl',
          'ncbigene'
        ];
        if (preferredPrefixesSupportedByMyGeneInfo.indexOf(preferredPrefix) > -1) {
          var xrefs = entityReference.xref = jsonldRx.arrayifyClean(entityReference.xref);
          var myGeneInfoXrefsIri = encodeURI(
              'http://mygene.info/v2/gene/' + entityReference.identifier
          );
          if (xrefs.indexOf(myGeneInfoXrefsIri) === -1) {
            xrefs.push(myGeneInfoXrefsIri);
          }
        }

        if (!options.organism) {
          // We needed to get the organism in order to get the BridgeDb Xrefs IRI,
          // but we delete it here if the user didn't want it.
          delete entityReferenceWithBridgeDbXrefsIri.organism;
        }
        return entityReferenceWithBridgeDbXrefsIri;
      } else {
        return entityReference;
      }
      //*/
    })
    .flatMap(function(entityReference) {
      var bridgeDbInputOriginalContext = entityReference.bridgeDbInputOriginalContext;
      delete entityReference.bridgeDbInputOriginalContext;
      // TODO can we get rid of this checking to ensure removal of empty type values?
      var entityReferenceType = entityReference.type;
      if (entityReferenceType) {
        entityReferenceType = jsonldRx.arrayifyClean(entityReference.type);
        entityReference.type = entityReferenceType.filter(function(value) {
          return value;
        });
      }

      return jsonldRx.replaceContext(entityReference, bridgeDbInputOriginalContext)
      .map(function(value) {
        if (!options.context) {
          delete value['@context'];
        }

        // TODO can we get rid of this checking to ensure removal of empty type values?
        var entityReferenceType = entityReference.type;
        if (entityReferenceType) {
          entityReferenceType = jsonldRx.arrayifyClean(entityReference.type);
          entityReference.type = entityReferenceType.filter(function(value) {
            return value;
          });
        }
        return value;
      });
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.EntityReference.enrich';
      throw err;
    });
  }

  /**
   * @private
   *
   * Enrich an entity reference using the metadata
   * for biological datasets from datasources.txt.
   *
   * @param {EntityReference} entityReference Expanded entity reference.
   * @return {Observable<EntityReference>} entityReference {@link EntityReference}
   *                                            enriched from data-sources.txt
   */
  function _enrichFromDataset(entityReference) {
    return instance.dataset.get(entityReference.isDataItemIn)
    .map(function(dataset) {
      entityReference.isDataItemIn = dataset;
      entityReference.db = entityReference.db || dataset.name;
      var typeFromDataset = dataset.subject;
      if (!_.isEmpty(typeFromDataset)) {
        typeFromDataset = _.isArray(typeFromDataset) ? typeFromDataset :
          [typeFromDataset];
        entityReference.type = _.union(
          jsonldRx.arrayify(entityReference.type), typeFromDataset);
      }

      if (!!dataset.uriRegexPattern) {
        var directIri = _getDirectIri(entityReference.identifier, dataset);
        if (!entityReference.id && entityReference['@id']) {
          entityReference.id = directIri;
        } else {
          var owlSameAs = jsonldRx.arrayifyClean(entityReference['owl:sameAs'] || []);
          if (owlSameAs.indexOf(directIri) === -1) {
            owlSameAs.push(directIri);
          }
          entityReference['owl:sameAs'] = owlSameAs;
        }
        dataset.exampleResource = directIri;
      }

      return entityReference;
    })
    .map(_addIdentifiersIri)
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.EntityReference._enrichFromDataset';
      throw err;
    });
  }

  /**
   * Check whether an entity reference with the specified identifier is
   * known by the specified dataset.
   *
   * @param {String} systemCode
   * @param {String} identifier
   * @param {String|Organism} organism {@link Organism} or name in English or Latin or taxonomy IRI
   *       like {@link http://identifiers.org/taxonomy/9606|http://identifiers.org/taxonomy/9606}.
   * @return {Observable<Boolean>} exists Whether specified entity reference exists.
   */
  function exists(systemCode, identifier, organism) {
    return Rx.Observable.return(organism)
    .flatMap(function(organismName) {
      var path = encodeURIComponent(organismName) +
        '/xrefExists/' + systemCode + '/' + identifier;
      var sourceUrl = config.baseIri + path;

      // TODO this is actually pausable
      return RxNode.fromUnpausableStream(
        hyperquest(sourceUrl, {
          withCredentials: false
        })
      )
      .doOnError(function(err) {
        err.message = err.message || '';
        err.message += ', observed in BridgeDb.EntityReference.exists from XHR request.';
        console.error(err.message);
        console.error(err.stack);
      })
      .map(function(buf) {
        // Determine whether the response is a string with the value "true"

        // NOTE: we use "replace" to strip out anything that would
        // make the Boolean determination incorrect, e.g., line breaks.
        var str = buf.toString().replace(/([^a-z])+/g, '');
        if (str === 'true') {
          return true;
        } else if (str === 'false') {
          return false;
        } else {
          var message = 'Unrecognized response: "' + buf.toString() + '" for ' + sourceUrl;
          throw new Error(message);
        }
      });
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.EntityReference.exists';
      throw err;
    });
  }

  /**
   * @private
   * Parse provided object or string to return a normalized entity reference
   * in the form of a JS object.
   * Uses only provided input -- no external data lookups.
   * Any provided names/values will be retained as-is, even if doing so prevents
   * other methods in this library from being able to access the data they require,
   * because this library does not clean or transform the input.
   *
   * @param {Object|String} entityReference {@see bridgeDb.entityReference.enrich()}
   *    for details on what constitutes a usable entityReference
   * @return {EntityReference} EntityReference Entity reference converted to object,
   *                      if required, and normalized.
   */
  function _expand(entityReference) {
    // TODO should we even do this here?
    _handleStringInput(entityReference);

    entityReference.type = jsonldRx.arrayifyClean(entityReference.type);
    if (entityReference.type.indexOf('EntityReference') === -1) {
      entityReference.type.push('EntityReference');
    }

    // TODO The code below might have duplication in looping (normalizing pairs),
    // which could be refactored to normalize just once to speed things up.

    // Check for existence of and attempt to parse identifiers.org IRI or BridgeDb Xref IRI (URL).
    iriParserPairs.find(function(iriParserPair) {
      var iriPattern = new RegExp(iriParserPair[0]);
      var iri = _.find(entityReference, function(value) {
        var valueNormalized = String(encodeURI(decodeURI(value))).toLowerCase();
        return iriPattern.test(valueNormalized);
      });

      if (!_.isEmpty(iri)) {
        iri = encodeURI(decodeURI(iri));
        var parsedIri = iriParserPair[1](iri);
        _.defaultsDeep(entityReference, parsedIri);
      }
      return iri;
    });

    var organism = entityReference.organism;
    if (!!organism) {
      instance.organism._setInstanceOrganism(organism, false);
    }

    if (!entityReference.isDataItemIn) {
      entityReference.isDataItemIn = {};
    } else if (_.isString(entityReference.isDataItemIn)) {
      entityReference.isDataItemIn = {
        id: entityReference.isDataItemIn
      };
    }

    // jscs: disable
    var db = entityReference.datasource_name ||
      entityReference.db ||
    // jscs: enable
      entityReference['datasource_name'] ||
      (!!entityReference.isDataItemIn.name &&
       entityReference.isDataItemIn.name);

    if (!!db) {
      entityReference.db = db;
      entityReference.isDataItemIn.name = db;
    }

    var bdbDataSourceName = entityReference[DATASOURCES_HEADERS_NS + 'datasource_name'] ||
      (!!entityReference.isDataItemIn[DATASOURCES_HEADERS_NS + 'datasource_name'] &&
       entityReference.isDataItemIn[DATASOURCES_HEADERS_NS + 'datasource_name']);
    if (!!bdbDataSourceName) {
      entityReference[DATASOURCES_HEADERS_NS + 'datasource_name'] = bdbDataSourceName;
      entityReference.isDataItemIn[DATASOURCES_HEADERS_NS + 'datasource_name'] = bdbDataSourceName;
    }

    var identifier = entityReference.identifier;
    if (!!identifier) {
      entityReference.isDataItemIn.exampleIdentifier = identifier;
    }

    return entityReference;
  }

  /**
   * Get potential matches for a desired entity reference by free text search for matching
   * symbols or identifiers. See also
   * {@link
   * http://bridgedb.org/apidoc/2.0/org/bridgedb/IDMapper.html#freeSearch(java.lang.String,%20int)|
   * Java documentation}.
   * TODO the above link is dead. Where's the updated link?
   *
   * TODO: this might actually be attributeSearch, and freeSearch might be a different method,
   * one that corresponds to this webservice endpoint:
   * http://www.bridgedb.org/swagger/#!/Genes/get_organism_search_query
   * Was freeSearch changed to just be called "search"?
   *
   * @example
   * myBridgeDbInstance.entityReference.freeSearch({
   *   attribute: 'Nfkb1',
   *   organism: 'Mouse'
   * })
   * .subscribeOnNext(function(searchResult) {
   *   console.log('Result for Nfkb1');
   *   console.log(searchResult);
   * });
   *
   * @param {Object} args
   * @param {String} args.attribute - Attribute value to be used as search term
   * @param {String|Organism} organism {@link Organism} or name in English or Latin or taxonomy
   *  IRI like {@link http://identifiers.org/taxonomy/9606|http://identifiers.org/taxonomy/9606}.
   * @param {JsonldType} [args.type] - Entity reference type, such as ProteinReference,
   *              DnaReference, SmallMoleculeReference, etc.
   *              Not currently being used, but we might use it in the future to
   *              help narrow down the search results.
   * @param {String} [args.db] - Desired dataset name, such as Ensembl or Uniprot
   * @return {Observable<EntityReference>} entityReference {@link EntityReference}, enriched
   *                                    from data-sources.txt and BridgeDb organism data.
   */
  function freeSearch(args) {
    var attributeValue = args.attribute;
    var type = args.type;
    var organism = args.organism ||
      instance.organismNonNormalized;

    if (!organism) {
      throw new Error('Missing argument "organism"');
    }

    return Rx.Observable.return(organism)
    .flatMap(instance.organism._getInstanceOrganism)
    .map(function(organism) {
      return organism.nameLanguageMap.la;
    })
    .map(function(organismName) {
      var path = encodeURIComponent(organismName) +
        '/attributeSearch/' +
        encodeURIComponent(attributeValue);
      return config.baseIri + path;
    })
    .flatMap(function(sourceUrl) {
      // TODO this is actually pausable
      return RxNode.fromUnpausableStream(
        hyperquest(sourceUrl, {
          withCredentials: false
        })
      );
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.EntityReference.freeSearch from XHR request.';
      console.error(err.message);
      console.error(err.stack);
    })
    .streamThrough(csv(csvOptions))
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.EntityReference.freeSearch';
      throw err;
    })
    .map(function(array) {
      var result = {
        identifier: array[0],
        displayName: array[2]
      };

      result[DATASOURCES_HEADERS_NS + 'datasource_name'] = array[1];
      return result;
    })
    .map(function(searchResult) {
      // remove empty properties
      searchResult = _.omit(searchResult, function(value) {
        // Note: I intentionally used 'null' as
        // a string, not a native value, because
        // BridgeDb returns the string value
        return value === 'null';
      });

      return searchResult;
    })
    .flatMap(function(searchResult) {
      // NOTE if we just call enrich like
      //.flatMap(enrich);
      // then the index gets passed in
      // (as the second parameter).
      return enrich(searchResult);
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.EntityReference.freeSearch';
      throw err;
    });
  }

  function _getDirectIri(identifier, dataset) {
    var uriRegexPattern = dataset.uriRegexPattern;
    var identifierPattern = dataset.identifierPattern;
    var identifierPatternWithoutBeginEndRestriction =
      instance.dataset._getIdentifierPatternWithoutBeginEndRestriction(
          identifierPattern);

    var directIri = uriRegexPattern
    .replace(identifierPatternWithoutBeginEndRestriction, identifier)
    .toString();

    return directIri;
  }

  function _handleStringInput(entityReference) {
    if (!_.isPlainObject(entityReference)) {
      if (typeof entityReference === 'string') {
        // Convert input from IRI string to object
        return {
          'id': entityReference,
        };
      } else {
        console.error('insufficiently-specified entity reference:');
        console.error(entityReference);
        var message = [
          'Insufficient input data or incorrect format. Cannot identify',
          ' the specified entity reference (above)'
        ].join('');
        throw new Error(message);
      }
    }
    return entityReference;
  }

  // We currently only support identifiers.org and BridgeDb IRIs in this library.
  var iriParsers = {
    'identifiers.org': function(iri) {
      iri = decodeURI(iri);
      /*
      var iriComponents = iri.split('identifiers.org');
      var iriPath = iriComponents[iriComponents.length - 1];

      var iriPathComponents = iriPath.split('/');
      var preferredPrefix = iriPathComponents[1];
      var identifier = iriPathComponents[2];
      //*/

      var preferredPrefix = decodeURIComponent(iri.match(/(identifiers.org\/)(.*)(?=\/.*)/)[2]);
      var identifier = decodeURIComponent(iri.match(/(identifiers.org\/.*\/)(.*)$/)[2]);

      return {
        isDataItemIn: {
          'id': 'http://identifiers.org/' + preferredPrefix + '/',
          preferredPrefix: preferredPrefix
        },
        identifier: identifier,
        'id': iri
      };
    },
    'bridgedb.org': function(iri) {
      iri = decodeURI(iri);
      var systemCode = decodeURIComponent(
          iri.match(/(bridgedb.org\/.*\/xrefs\/)(\w+)(?=\/.*)/)[2]);
      var identifier = decodeURIComponent(iri.match(/(bridgedb.org\/.*\/xrefs\/\w+\/)(.*)$/)[2]);
      return {
        organism: decodeURIComponent(iri.match(/(bridgedb.org\/)(.*)(?=\/xrefs)/)[2]),
        isDataItemIn: {
          alternatePrefix: [systemCode],
          systemCode: systemCode,
          exampleIdentifier: identifier,
        },
        identifier: identifier,
        bridgeDbXrefsIri: iri,
        xref: [iri]
      };
    }
  };
  var iriParserPairs = _.toPairs(iriParsers);

  /**
   * @param {Object} args
   * @param {String} args.targetPreferredPrefix The Miriam namespace /
   *    identifiers.org preferredPrefix.
   * @param {String|Object} args.sourceEntityReference @see bridgeDb.entityReference.enrich()
   *                        method for what constitutes a usable entityReference
   * @return {Observable<EntityReference>} entityReference One or more
   *    {@link EntityReference|entity references} with the target preferredPrefix.
   */
  function map(args) {
    var targetPreferredPrefix = args.targetPreferredPrefix;
    if (!targetPreferredPrefix) {
      throw new Error('targetPreferredPrefix missing');
    }

    return instance.xref.get(args.sourceEntityReference)
    .filter(function(entityReferenceXref) {
      return entityReferenceXref.isDataItemIn.preferredPrefix ===
        targetPreferredPrefix;
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ', observed in BridgeDb.EntityReference.map';
      throw err;
    });
  }

  /**
   * Normalize object properties
   *
   * @param {String|Object} entityReference
   * @return {Observable<EntityReference>} Normalized {@link EntityReference}
   */
  function normalize(entityReference) {
    entityReference = _expand(entityReference);

    var organism = entityReference.organism;
    if (!!organism) {
      return Rx.Observable.return(entityReference)
      .flatMap(instance.organism._getInstanceOrganism)
      .map(function(organism) {
        entityReference.organism = organism;
        return entityReference;
      })
      .doOnError(function(err) {
        err.message = err.message || '';
        err.message += ', observed in BridgeDb.EntityReference.normalize';
        throw err;
      });
    } else {
      return Rx.Observable.return(entityReference)
      .doOnError(function(err) {
        err.message = err.message || '';
        err.message += ', observed in BridgeDb.EntityReference.normalize';
        throw err;
      });
    }
    // TODO normalize db, identifier, etc.
  }

  return {
    //createEnrichmentStream:createEnrichmentStream,
    enrich:enrich,
    exists:exists,
    _expand:_expand,
    freeSearch:freeSearch,
    map:map,
    normalize:normalize
  };
};

exports = module.exports = EntityReference;
