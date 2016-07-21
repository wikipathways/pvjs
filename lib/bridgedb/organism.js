/* @module Organism */

var _ = require('lodash');
var httpErrors = require('./http-errors.js');
var hyperquest = require('hyperquest');
var csv = require('csv-streamify');
var normalizer = require('./normalizer.js');
var Rx = require('rx-extra');
var RxNode = Rx.RxNode;

var csvOptions = {objectMode: true, delimiter: '\t'};

/**
 * Used internally to create a new Organism instance
 * @class
 * @protected
 * @memberof BridgeDb
 * @param {Object} instance
 */
var Organism = function(instance) {
  'use strict';

  var config = instance.config;

  var jsonldRx = instance.jsonldRx;
  var normalizeText = normalizer.normalizeText;

  /**
   * See {@link http://identifiers.org/snomedct/410607006|snomedct:Organism}
   * @typedef {Object} Organism Organism with as many as possible of the properties listed below.
   * @property {JsonldContext} @context JSON-LD context.
   * @property {Iri} id Preferred IRI for identifying an organism,
   *    using {@link http://identifiers.org/taxonomy/|Taxonomy ontology}
   * @property {Object} nameLanguageMap
   * @property {String} nameLanguageMap.en English name, when available.
   * @property {String} nameLanguageMap.la Full Latin name.
   */

  var latinNameToIriMappings = {
    'Anopheles gambiae': 'http://identifiers.org/taxonomy/7165',
    'Arabidopsis thaliana': 'http://identifiers.org/taxonomy/3702',
    'Aspergillus niger': 'http://identifiers.org/taxonomy/5061',
    'Bacillus subtilis': 'http://identifiers.org/taxonomy/1423',
    'Bos taurus': 'http://identifiers.org/taxonomy/9913',
    'Caenorhabditis elegans': 'http://identifiers.org/taxonomy/6239',
    'Canis familiaris': 'http://identifiers.org/taxonomy/9615',
    'Ciona intestinalis': 'http://identifiers.org/taxonomy/7719',
    'Danio rerio': 'http://identifiers.org/taxonomy/7955',
    'Drosophila melanogaster': 'http://identifiers.org/taxonomy/7227',
    'Escherichia coli': 'http://identifiers.org/taxonomy/562',
    'Equus caballus': 'http://identifiers.org/taxonomy/9796',
    'Gallus gallus': 'http://identifiers.org/taxonomy/9031',
    'Gibberella zeae': 'http://identifiers.org/taxonomy/5518',
    'Glycine max': 'http://identifiers.org/taxonomy/3847',
    'Homo sapiens': 'http://identifiers.org/taxonomy/9606',
    'Hordeum vulgare': 'http://identifiers.org/taxonomy/4513',
    'Macaca mulatta': 'http://identifiers.org/taxonomy/9544',
    'Mus musculus': 'http://identifiers.org/taxonomy/10090',
    'Mycobacterium tuberculosis': 'http://identifiers.org/taxonomy/1773',
    'Ornithorhynchus anatinus': 'http://identifiers.org/taxonomy/9258',
    'Oryza indica': 'http://identifiers.org/taxonomy/39946',
    'Oryza sativa': 'http://identifiers.org/taxonomy/4530',
    'Oryza sativa Indica Group': 'http://identifiers.org/taxonomy/39946',
    'Populus trichocarpa': 'http://identifiers.org/taxonomy/3694',
    'Pan troglodytes': 'http://identifiers.org/taxonomy/9598',
    'Rattus norvegicus': 'http://identifiers.org/taxonomy/10116',
    'Saccharomyces cerevisiae': 'http://identifiers.org/taxonomy/4932',
    'Solanum lycopersicum': 'http://identifiers.org/taxonomy/4081',
    'Sus scrofa': 'http://identifiers.org/taxonomy/9823',
    'Vitis vinifera': 'http://identifiers.org/taxonomy/29760',
    'Xenopus tropicalis': 'http://identifiers.org/taxonomy/8364',
    'Zea mays': 'http://identifiers.org/taxonomy/4577'
  };

  /**
   * @private
   *
   * Convert organismIdentifier to Latin name.
   *
   * @param {String} organismIdentifier - Can be name in Latin (full like "Escherichia coli"
   *      or abbreviated like "E. coli") or English. In the future, we might include IRIs
   *      for organisms.
   * @return {Observable<String>} organismLatinName Full name in Latin
   */
  function _convertToLatinName(organismIdentifier) {
    return _normalize(organismIdentifier)
    .map(function(organism) {
      // returns either the organism name or false
      return !!organism.nameLanguageMap && !!organism.nameLanguageMap.la &&
          organism.nameLanguageMap.la;
    })
    .doOnError(function(err) {
      err.message = (err.message || '') + 'in BridgeDb.Organism._convertToLatinName';
      throw err;
    });
  }

//  /**
//   * Create a Node.js/Highland stream through which entity references
//   * can be piped to return their associated organism.
//   *
//   * @return {Stream} entityReferenceToOrganismTransformationStream
//   */
//  var createEntityReferenceToOrganismTransformationStream = function() {
//    return highland.pipeline(function(sourceStream) {
//      return highland(sourceStream).flatMap(_getByEntityReference);
//    });
//  };

  /**
   * Get one organism.
   *
   * @param {Object|String} searchCriteria
   * @param {String|String[]} [searchCriteria.type='Organism']
   * @return {Observable<Organism>} organismObservable
   */
  function get(searchCriteria) {
    if (_.isEmpty(searchCriteria)) {
      var err = new Error('No searchCriteria specified for BridgeDb.Organism.get');
      return Rx.Observable.throw(err);
    }

    return query(searchCriteria)
    .first()
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ' in BridgeDb.Organism.get';
      throw err;
    });
  }

  /**
   * @private
   *
   * Get all organisms currently supported by BridgeDb.
   *
   * @return {Observable<Organism>} organism
   */
  function _getAll() {
    var path = 'contents';
    var sourceUrl = config.baseIri + path;

    // TODO this is actually pausable
    return RxNode.fromUnpausableStream(
      hyperquest(sourceUrl, {
        withCredentials: false
      })
    )
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ' in BridgeDb.Organism._getAll from XHR request.';
      console.error(err.message);
      console.error(err.stack);
    })
    .streamThrough(csv(csvOptions))
    .map(function(array) {
      var nameLanguageMap = {};
      var englishName = array[0];
      var latinName = array[1];

      // Note: I intentionally used 'null' as a string, not a native value,
      // because BridgeDb returns the string value
      if (englishName !== 'null') {
        nameLanguageMap.en = englishName;
      }
      if (latinName !== 'null') {
        nameLanguageMap.la = latinName;
      }

      var normalizedOrganism = {
        '@context': [{
          'name': {
            '@id':'biopax:name',
            '@container':'@language'
          },
          'Organism': 'http://identifiers.org/snomedct/410607006'
        }],
        'id': latinNameToIriMappings[latinName],
        'type': 'Organism',
        nameLanguageMap: nameLanguageMap
      };

      return normalizedOrganism;
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ' in BridgeDb.Organism._getAll';
      throw err;
    });
  }

  /**
   * @private
   *
   * If the organism is not specified but the BridgeDb system code and
   * entity reference identifier are, we can identify the species by
   * trying species until we find one that exists for the system code
   * and identifier.
   *
   * @param systemCode
   * @param identifier
   * @return {Observable<Organism>} organismObservable
   */
  function _getBySystemCodeAndIdentifier(systemCode, identifier) {
    return query()
    // TODO sort organisms by number of pathways at WikiPathways.
    // Get that data as part of build step for this library.
    .flatMap(function(organism) {
      return instance.entityReference.exists(systemCode, identifier, organism.nameLanguageMap.la)
      .flatMap(function(exists) {
        if (exists) {
          return Rx.Observable.return(organism);
        } else {
          return Rx.Observable.empty();
        }
      });
    })
    .first()
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ' in BridgeDb.Organism._getBySystemCodeAndIdentifier';
      throw err;
    });
  }

  /**
   * @private
   *
   * Identifies the organism for the provided entity reference and returns all
   * the data BridgeDb has about that organism, which currently is the Latin name
   * and, when available, the English name.
   *
   * @param {Object} entityReference See bridgeDb.entityReference.enrich for information
   *                                  on acceptable entity reference inputs.
   * @return {Observable<Organism>} organismObservable
   */
  function _getByEntityReference(entityReference) {
    // TODO as part of the build process, query all species like this:
    // http://webservice.bridgedb.org/Human/sourceDataSources
    // http://webservice.bridgedb.org/Human/targetDataSources
    // to get a listing of which datasets go with which species.
    // Save that data as a JSON file.
    // Then use those limitations in this query.

    var entityReferenceSource;

    var systemCodeExists = !!entityReference.isDataItemIn &&
      (!!entityReference.isDataItemIn.systemCode ||
      _.isArray(entityReference.isDataItemIn.alternatePrefix) &&
      !!entityReference.isDataItemIn.alternatePrefix[0]);

    if (!systemCodeExists) {
      entityReferenceSource = instance.entityReference.enrich(entityReference, {
        bridgeDbXrefsUrl: false,
        dataset: true,
        organism: false,
        xref: false,
      });
    } else {
      entityReferenceSource = Rx.Observable.return(entityReference);
    }

    return entityReferenceSource
    .flatMap(function(entityReference) {
      var organism = entityReference.organism;
      if (!!organism) {
        return _normalize(organism);
      }

      var systemCode =
        entityReference.isDataItemIn.systemCode ||
        _.isArray(entityReference.isDataItemIn.alternatePrefix) &&
        entityReference.isDataItemIn.alternatePrefix[0];

      var identifier = entityReference.identifier;

      if (!!systemCode && !!identifier) {
        return _getBySystemCodeAndIdentifier(
          systemCode, identifier);
      } else {
        console.warn('Cannot get organism by entityReference.');
        return Rx.Observable.return(entityReference);
      }
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ' in BridgeDb.Organism._getByEntityReference';
      throw err;
    });
  }

  /**
   * @private
   *
   * Each BridgeDb instance has one organism associated with it. This
   * function gets the organism once and then always returns that organism.
   *
   * @param {Object|String} searchCriteria
   * @return {Observable<Organism>} Organism
   */
  function _getInstanceOrganism(searchCriteria) {
    var organismNormalized = instance.organismNormalized;
    var organismNormalizedSource = instance.organismNormalizedSource;
    if (organismNormalized) {
      return Rx.Observable.return(organismNormalized)
      .doOnError(function(err) {
        err.message = (err.message || '') + 'in BridgeDb.Organism._getInstanceOrganism (cached)';
        throw err;
      });
    } else if (organismNormalizedSource) {
      return organismNormalizedSource
      .doOnError(function(err) {
        err.message = (err.message || '') + 'in BridgeDb.Organism._getInstanceOrganism (getting)';
        throw err;
      });
    }

    var searchCriteriaUsed = instance.organismNonNormalized || searchCriteria;

    organismNormalizedSource = get(searchCriteriaUsed)
    .doOnNext(function(organism) {
      instance.organismNormalized = organism;
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ' in BridgeDb.Organism._getInstanceOrganism';
      throw err;
    });

    //instance.organismNormalizedSource = organismNormalizedSource.replay(null, 1);
    instance.organismNormalizedSource = organismNormalizedSource.share();

    return organismNormalizedSource
    .doOnError(function(err) {
      err.message = (err.message || '') + 'in BridgeDb.Organism._getInstanceOrganism';
      throw err;
    });
  }

  /**
   * @private
   *
   * Normalize organism.
   *
   * @param {String|Object|Organism} organism - Can be any one of the following:
   *    * IRI from the (@link http://identifiers.org/taxonomy/|Taxonomy ontology}
   *    * name in Latin
   *      - full like "Escherichia coli" or
   *      - abbreviated like "E. coli" or
   *    * name in English
   *    * an object with the key being the language and the value being the name
   *    * a full or partial Organism object
   * @param {Iri} [organism['id']] Taxonomy ontology IRI
   * @param {String} [organism.name] name in Latin (preferred) or English
   * @param {String} [organism.en] name in English - deprecated
   * @param {String} [organism.english] name in English - deprecated
   * @param {String} [organism.la] name in Latin - deprecated
   * @param {String} [organism.latin] name in Latin - deprecated
   * @param {Object} [organism.nameLanguageMap] {@link
   *    http://www.w3.org/TR/json-ld/#language-maps|language map}
   * @param {String} [organism.nameLanguageMap.en] name in English
   * @param {String} [organism.nameLanguageMap.la] name in Latin
   * @return {Observable<Organism>} organismObservable
   */
  function _normalize(organism) {
    // TODO has the input been transformed to use the internalContext yet?
    var organismName;
    var normalizedOrganismName;
    var organismIri;
    if (_.isString(organism)) {
      if (organism.indexOf('http://identifiers.org/taxonomy/') === 0) {
        organismIri = organism;
      } else {
        organismName = organism;
      }
    } else if (_.isPlainObject(organism)) {
      if (organism.id || organism['@id']) {
        organismIri = organism.id || organism['@id'];
      }
      var nameLanguageMap = organism.nameLanguageMap;
      if (nameLanguageMap) {
        organismName = nameLanguageMap.la || nameLanguageMap.en;
      } else {
        organismName = organism.name || organism.la || organism.latin ||
          organism.en || organism.english;
      }
    }

    if (!organismIri && !organismName) {
      console.error(organism);
      throw new Error('Cannot normalize provided organism (above).');
    }

    if (organismName) {
      normalizedOrganismName = normalizeText(organismName);
    }

    return _getAll()
    .filter(function(organism) {
      var organismIriMatch;
      if (organismIri) {
        organismIriMatch = organismIri === (organism.id || organism['@id']);
      }
      var normalizedOrganismNameMatch;
      if (normalizedOrganismName) {
        var nameLanguageMap = organism.nameLanguageMap;
        var latinName = nameLanguageMap.la;
        var latinNameComponents = latinName.split(' ');
        var latinNameAbbreviated = latinNameComponents[0][0] +
          latinNameComponents[1];
        var englishName = nameLanguageMap.en;
        var normalizedNameCandidates = [
          latinName,
          latinNameAbbreviated,
          englishName
        ]
        .map(function(value) {
          return normalizeText(value);
        });
        normalizedOrganismNameMatch = normalizedNameCandidates.indexOf(normalizedOrganismName) > -1;
      }
      return organismIriMatch || normalizedOrganismNameMatch;
    })
    .first()
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ' in BridgeDb.Organism._normalize';
      throw err;
    });
  }

  /**
   * Find organisms, either all or a subset by search criteria.
   *)
   * @param {Object|String} searchCriteria
   * @param {String|String[]} [searchCriteria.type='Organism']
   * @return {Observable<Organism>} organismObservable
   */
  function query(searchCriteria) {
    if (_.isEmpty(searchCriteria)) {
      return _getAll()
      .doOnError(function(err) {
        err.message = (err.message || '') + 'in BridgeDb.Organism.query';
        throw err;
      });
    }

    var typeToFunctionMapping = {
      Organism: _normalize,
      EntityReference: _getByEntityReference,
    };

    typeToFunctionMapping['http://identifiers.org/snomedct/410607006'] =
        typeToFunctionMapping.Organism;

    var providedType;
    if (_.isString(searchCriteria)) {
      providedType = 'Organism';
    } else {
      providedType = searchCriteria.type || searchCriteria['@type'] || 'Organism';
    }
    providedType = jsonldRx.arrayify(providedType);

    var supportedType = _(typeToFunctionMapping).keys()
    .intersection(providedType)
    .first();

    if (!!supportedType) {
      return typeToFunctionMapping[supportedType](searchCriteria)
      .doOnError(function(err) {
        err.message = err.message || '';
        err.message += ' in BridgeDb.Organism.query';
        throw err;
      });
    } else {
      return Rx.Observable.throw(new Error('Cannot get organism by specified type(s): "' +
          providedType + '"'));
    }
  }

  /**
   * @private
   *
   * Set the current organism for this instance so we don't have to look it up every time.
   *
   * @param {String|Object} organism The single organism for this bridgedbjs instance. It is
   *                                 preferably the full Latin name. If you need to work
   *                                 with another organism, create another bridgedbjs instance.
   */
  function _setInstanceOrganism(organism) {
    instance.organismNonNormalized = organism;
  }

  return {
    /*
    createEntityReferenceToOrganismTransformationStream:
      createEntityReferenceToOrganismTransformationStream,
    //*/
    get: get,
    _getByEntityReference: _getByEntityReference,
    _getBySystemCodeAndIdentifier: _getBySystemCodeAndIdentifier,
    _getInstanceOrganism: _getInstanceOrganism,
    query: query,
    _setInstanceOrganism: _setInstanceOrganism
  };
};

exports = module.exports = Organism;
