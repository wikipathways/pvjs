/* See https://en.wikipedia.org/wiki/Record_linkage
 * Tabular data like data sources (set or list of objects)
 * Search criteria like a db name and an identifier, sorted by the preference for matching ()
 * Given tabular data, we want to find one row that matches
 * a provided object.
 *
 * First, we pull out the keys from the provided object that match the column headers
 * in the tabular data.
 *
 * Then we try matching based on the sum of the match/non-match weights for the values
 * for each of the specified keys.
 */

var _ = require('lodash');
var normalizeUrl = require('normalize-url');
var Rx = global.Rx = global.Rx || require('rx-extra');

var FOAF = 'http://xmlns.com/foaf/0.1/';
var OWL = 'http://www.w3.org/2002/07/owl#';
var RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
var RDFS = 'http://www.w3.org/2000/01/rdf-schema#';
var SCHEMA = 'http://schema.org/';
var SKOS = 'http://www.w3.org/2004/02/skos/core#';

var MATCHER_NS = 'http://example.org/' +
  // this is just an alphanumeric string I generated pseudo-randomly
  'g08hftwyppyp77whdiq7y9xq2uowiv5uyq5p82t2dswo2t5om595asj1d8hw8r5b/';
var CHARACTERISTIC_VALUES_PROPERTY_KEY_STUB = MATCHER_NS + 'characteristicvalues/';
var PLACEHOLDER_ID_VALUE_IRI = MATCHER_NS + 'placeholderid/';
var PLACEHOLDER_VALUE_IRI = MATCHER_NS + 'placholdervalue/';
var PLACEHOLDER_VOCAB_IRI = MATCHER_NS + 'placeholdervocab/';

var Matcher = function(jsonldRx) {
  'use strict';

  //var jsonldRx = new JsonldRx();

  function addCharacteristicValuesProperty(expanded, expandedKeys, matcher) {
    var normalize = matcher.normalize || _.identity;
    var characteristicValuesPropertyKey = matcher.characteristicValuesPropertyKey;
    var characteristicValueGenerators = matcher.characteristicValueGenerators;
    var characteristicValues = [];
    // From functions
    if (!_.isEmpty(characteristicValueGenerators)) {
      characteristicValues = characteristicValues.concat(
        characteristicValueGenerators.map(function(fn) {
          return fn(expanded);
        })
      );
    }

    // From keys
    var characteristicKeys = matcher.characteristicKeys;
    var matchingCharacteristicKeys = _.intersection(expandedKeys, characteristicKeys);
    if (matchingCharacteristicKeys) {
      var keySetIsForIri = matchingCharacteristicKeys.indexOf('@id') > -1;
      characteristicValues = characteristicValues.concat(
        matchingCharacteristicKeys.reduce(function(accumulator, characteristicKey) {
          var propertyValue = expanded[characteristicKey];
          if (!_.isEmpty(propertyValue)) {
            if (keySetIsForIri && _.isString(propertyValue)) {
              propertyValue = {
                '@id': propertyValue
              };
            }
            propertyValue = jsonldRx.arrayifyClean(propertyValue);
            accumulator = accumulator.concat(propertyValue);
          }
          return accumulator;
        }, [])
      );
    }

    if (!_.isEmpty(characteristicValues)) {
      characteristicValues = characteristicValues
      .filter(function(value) {
        return typeof value !== 'undefined' && value !== null;
      })
      .reduce(function(accumulator, item) {
        // TODO what about @list, @set, @lang, etc.?
        var values = [];
        if (item.hasOwnProperty('@id')) {
          var iri = item['@id'];
          values.push(iri);
          // TODO check whether there is a JSON-LD standard for
          // normalizing IRIs
          var normalizedIri = normalizeUrl(iri, {
            stripFragment: false,
            stripWWW: false
          });
          if (normalizedIri !== iri) {
            values.push(normalizedIri);
          }
        } else if (item.hasOwnProperty('@value')) {
          values.push(item['@value']);
        } else {
          console.error(JSON.stringify(item, null, '  '));
          throw new Error('Cannot handle above item type.');
        }
        return accumulator.concat(values);
      }, [])
      .map(normalize);

      if (!_.isEmpty(characteristicValues)) {
        expanded[characteristicValuesPropertyKey] = characteristicValues;
      }
    }

    return expanded;
  }

  function addCharacteristicValuesProperties(matchers, expandedItem) {
    var expandedItemKeys = _.keys(expandedItem);
    return matchers.reduce(function(accumulator, matcher) {
      return addCharacteristicValuesProperty(expandedItem, expandedItemKeys, matcher);
    }, expandedItem);
  }

  /**
   * isNullMatch - a non-match due to one or both records
   * missing the relevant characteristic. If the characteristic
   * is not specified, the non-match weight should not be the
   * same as a non-match where there are actual values that
   * differ.
   *
   * @param matcher
   * @param toMatchRecord
   * @param referenceRecord
   * @return {boolean}
   */
  function isNullMatch(matcher, toMatchRecord, referenceRecord) {
    // TODO what about a non-match where a characteristic generator
    // function is present and does return a value?
    var characteristicKeys = matcher.characteristicKeys;
    var toMatchRecordKeys = _.keys(toMatchRecord);
    var referenceRecordKeys = _.keys(referenceRecord);

    return !_.intersection(characteristicKeys, toMatchRecordKeys).length ||
      !_.intersection(characteristicKeys, referenceRecordKeys).length;
  }

  function cloneWithoutAddedProperties(doc) {
    return _.reduce(doc, function(result, value, key) {
      if (key.indexOf(MATCHER_NS) !== 0) {
        result[key] = value;
      }
      return result;
    }, {});
  }

  function compactWithoutExpandWhenContext(doc) {
    var context = doc['@context'];
    if (context) {
      return jsonldRx.compact(doc, context, {skipExpansion: true})
      .map(function(compacted) {
        return compacted[0];
      })
      .doOnError(function(err) {
        err.message = err.message || '';
        err.message += ' in JsonldRx.Matcher.compactWithoutExpandWhenContext';
        throw err;
      });
    }

    return Rx.Observable.return(doc)
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ' in JsonldRx.Matcher.compactWithoutExpandWhenContext';
      throw err;
    });
  }

  function getTotalWeight(matchers, toMatchRecord, referenceRecord) {
    return Rx.Observable.from(matchers).map(function(matcher) {
      var characteristicValueSets = getCharacteristicValueSets(
          matcher, toMatchRecord, referenceRecord);
      var toMatchValues = characteristicValueSets.toMatchValues;
      var referenceValues = characteristicValueSets.referenceValues;

      // mValueOrGenerator and uValueOrGenerator are either:
      //  * values or
      //  * functions that return values
      // for m (probabilityTruePositive) and u (probabilityFalsePositive)
      var mValueOrGenerator = matcher.probabilityTruePositive;
      var probabilityTruePositive = _.isFunction(mValueOrGenerator) ?
//mValueOrGenerator(toMatchRecord, toMatchValues, referenceRecord, referenceValues) :
          mValueOrGenerator(matcher, toMatchRecord, referenceRecord) :
          mValueOrGenerator;

      var uValueOrGenerator = matcher.probabilityFalsePositive;
      var probabilityFalsePositive = _.isFunction(uValueOrGenerator) ?
          uValueOrGenerator(matcher, toMatchRecord, referenceRecord) :
          uValueOrGenerator;

      var passes = testByMatcher(matcher, toMatchRecord, referenceRecord);
      if (passes) {
        var matchWeight = getMatchWeight(probabilityTruePositive, probabilityFalsePositive);
        return getMatchWeight(probabilityTruePositive, probabilityFalsePositive);
      } else if (isNullMatch(matcher, toMatchRecord, referenceRecord)) {
        // if one or both records are entirely missing a characteristic, that does not
        // mean a NON-match. It's undefined, so we don't affect the match weight.
        // TODO is this always a reasonable assumption?
        return 0;
      } else {
        var nonMatchWeight = getNonMatchWeight(probabilityTruePositive, probabilityFalsePositive);
        return getNonMatchWeight(probabilityTruePositive, probabilityFalsePositive);
      }
    })
    .reduce(function(accumulator, weight) {
      return accumulator + weight;
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ' in JsonldRx.Matcher.getTotalWeight';
      throw err;
    });
  }

  function contextify(context, doc) {
    if (context) {
      doc['@context'] = context;
    }
    return doc;
  }

  function enhanceMatchers(matchers) {
    // These are the defaults, which are used if the user did not specify
    // the probabilities in the matcher.
    var PROBABILITY_TRUE_POSITIVE = 0.95;
    var PROBABILITY_FALSE_POSITIVE = 0.05;

    // TODO allow user to override/disable these.
    var sameAsStringSets = [
      [
        '@id',
        RDF + 'about',
        RDF + 'ID', // (requires that @base is set in the context!)
        OWL + 'sameAs',
        SKOS + 'exactMatch',
        SCHEMA + 'url',
        SCHEMA + 'sameAs',
        // TODO include the following?
        //SCHEMA + 'about',
        //SCHEMA + 'mainEntityOfPage',
        //FOAF + 'page',
      ],
      [
        RDFS + 'label',
        SCHEMA + 'name',
        SCHEMA + 'alternateName',
        SKOS + 'prefLabel',
        SKOS + 'altLabel',
        SKOS + 'hiddenLabel',
        FOAF + 'name',
      ],
      [
        '@type',
        RDF + 'type',
        SCHEMA + 'additionalType',
      ],
    ];

    // if no matchers specified, create the bare minimum set from defaults.
    if (!matchers) {
      matchers = sameAsStringSets.map(function(sameAsStringSet) {
        return {
          characteristics: sameAsStringSet,
          characteristicKeys: sameAsStringSet
        };
      });
    } else {
      matchers = matchers.map(function(matcher) {
        var characteristicValueKeysAndGenerators = matcher.characteristics;

        matcher.characteristicValueGenerators = characteristicValueKeysAndGenerators
        .filter(_.isFunction);

        var characteristicKeys = characteristicValueKeysAndGenerators.filter(_.isString);

        var moreIdentifierStrings = sameAsStringSets.find(function(sameAsStringSet) {
          return _.intersection(sameAsStringSet, characteristicKeys).length > 0;
        });

        if (!_.isEmpty(moreIdentifierStrings)) {
          characteristicKeys = _.union(characteristicKeys, moreIdentifierStrings);
        }

        matcher.characteristicKeys = characteristicKeys;

        return matcher;
      });
    }

    return matchers
    .map(function(matcher) {
      matcher.characteristicValuesPropertyKey = CHARACTERISTIC_VALUES_PROPERTY_KEY_STUB +
          matcher.characteristicKeys[0];
      return matcher;
    })
    .map(function(matcher) {
      matcher.characteristicKeys = matcher.characteristicKeys
      .map(function(characteristicKey) {
        // TODO should we be turning all characteristicKeys into values of type @id?
        // if the user specifies a non @id characteristicKey, we turn it into an @id.
        // TODO is this regular expression appropriate?
        // see also
        // http://stackoverflow.com/questions/161738/
        // what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url
        var re = new RegExp(/\/\//);
        if (re.test(characteristicKey) || characteristicKey.indexOf('@id') === 0) {
          return characteristicKey;
        } else {
          return PLACEHOLDER_VOCAB_IRI + characteristicKey;
        }
      });
      return matcher;
    })
    .map(function(matcher) {
      matcher.probabilityTruePositive = matcher.hasOwnProperty('probabilityTruePositive') ?
          matcher.probabilityTruePositive : PROBABILITY_TRUE_POSITIVE;
      matcher.probabilityFalsePositive = matcher.hasOwnProperty('probabilityFalsePositive') ?
          matcher.probabilityFalsePositive : PROBABILITY_FALSE_POSITIVE;
      return matcher;
    });
  }

  function flatFilter(test, value) {
    if (test(value)) {
      return Rx.Observable.return(value)
      .doOnError(function(err) {
        err.message = err.message || '';
        err.message += ' in JsonldRx.Matcher.flatFilter';
        throw err;
      });
    } else {
      return Rx.Observable.empty();
    }
  }

  function getMatchWeight(probabilityTruePositive, probabilityFalsePositive) {
    return Math.log(probabilityTruePositive / probabilityFalsePositive) / Math.LN2;
  }

  function getNonMatchWeight(probabilityTruePositive, probabilityFalsePositive) {
    return Math.log((1 - probabilityTruePositive) / (1 - probabilityFalsePositive)) / Math.LN2;
  }

  function getNonAddedKeyCount(doc) {
    var possiblyAddedKeys = ['@id'];
    var originalDocCloned = cloneWithoutAddedProperties(doc);
    return _.keys(originalDocCloned).filter(function(key) {
      return possiblyAddedKeys.indexOf(key) === -1;
    }).length;
  }

  function losslessExpand(doc, options) {
    options = options || {};
    if (!options.hasOwnProperty('keepFreeFloatingNodes')) {
      options.keepFreeFloatingNodes = true;
    }
    var context = doc['@context'];
    var boundContextify = contextify.bind(null, context);

    return jsonldRx.expand(doc, {
      keepFreeFloatingNodes: options.keepFreeFloatingNodes
    })
    .map(function(expanded) {
      return expanded.map(boundContextify);
    })
    .map(boundContextify)
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ' in JsonldRx.Matcher.losslessExpand';
      throw err;
    });
  }

  // TODO DRY things up. The code here and the code for processing
  // toMatchRecord (in filter) should share many of the same steps.
  function processReferenceRecords(referenceRecordsSource, matchers) {
    matchers = enhanceMatchers(matchers);
    return referenceRecordsSource
    .flatMap(function(referenceRecord) {
      return losslessExpand(referenceRecord)
      .flatMap(function(expanded) {
        var context = expanded['@context'];
        var boundContextify = contextify.bind(null, context);

        return Rx.Observable.from(expanded)
        .map(boundContextify);
      })
      .map(function(expandedItem) {
        return addCharacteristicValuesProperties(matchers, expandedItem);
      })
      .toArray();
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ' in JsonldRx.Matcher.processReferenceRecords';
      throw err;
    });
  }

  function getCharacteristicValueSets(matcher, toMatchRecord, referenceRecord) {
    var characteristicValuesPropertyKey = matcher.characteristicValuesPropertyKey;
    var toMatchValues = toMatchRecord[characteristicValuesPropertyKey];
    var referenceValues = referenceRecord[characteristicValuesPropertyKey];
    return {
      toMatchValues: toMatchValues,
      referenceValues: referenceValues
    };
  }

  function testByMatcher(matcher, toMatchRecord, referenceRecord) {
    var characteristicValueSets = getCharacteristicValueSets(
        matcher, toMatchRecord, referenceRecord);
    var toMatchValues = characteristicValueSets.toMatchValues;
    var referenceValues = characteristicValueSets.referenceValues;
    var tests = matcher.tests;
    if (!tests) {
      // TODO look at using bitmasks
      // (exact match for the property value)
      return _.intersection(toMatchValues, referenceValues).length > 0;
    } else {
      // find a test that passes. if we find such a test, the "!!" means we return true.
      return !!_.find(tests, function(test) {
        return _.find(referenceValues, function(referenceValue) {
          return _.find(toMatchValues, function(toMatchValue) {
            return test(toMatchRecord, toMatchValue, referenceRecord, referenceValue);
          });
        });
      });
    }
  }

  /**
   * filter: filter reference records by record to match, returning only match(es) that
   * have a total match/non-match weight greater than the match threshold.
   *
   * @param {string|object} toMatchRecord record for which we want to find one or more matches
   *                        in the reference records
   * 1. If string, must be an IRI dereferenceable as JSON-LD
   * 2. JSON-LD object (may or may not have a @context)
   *    a. just has an @id
   *    b. just has one property, not an @id
   *    c. a full object
   *
   * @param {Observable} referenceRecordsSource contains one or more valid JSON-LD objects
   * @param {object[]} [matchers] if not specied, will use most common IRIs indicating
   *                              @id and http://schema.org/name
   * @param {string[]|function[]} matchers.characteristics includes one or more items to use
   *                              to extract characteristic values to use for matching. Can
   *                              be one or more of either or both of the following:
   *
   *                              characteristicKey: IRI string that is a key for a characteristic
   *                                  property with a characteristic value
   *
   *                              characteristicValueGenerator: a function that returns
   *                                  a characteristic value
   *
   *                              All the characteristic value(s), whether extracted by means of
   *                              characteristicKeys or characteristicValueGenerators, are added to
   *                              a new property that has all the equivalent characteristic values.
   * @param {number} [matchers.probabilityTruePositive] See "m" from Wikipedia article:
   *               {@link https://en.wikipedia.org/wiki/Record_linkage#Probabilistic_record_linkage}
   *               Range: (0,1)
   * @param {number} [matchers.probabilityFalsePositive] See "u" from Wikipedia article:
   *               {@link https://en.wikipedia.org/wiki/Record_linkage#Probabilistic_record_linkage}
   *               Range: (0,1)
   * @param {function} [matchers.normalize] optional function that transforms both the
   *                   characteristic values of both the toMatchRecord and each reference
   *                   record, e.g., make all letters uppercase to make matcher case
   *                   insensitive.
   * @param {function[]} [matchers.tests] optional function(s) to test whether a toMatchRecord
   *                     and a reference record are a match based on more than simple equality
   *                     of their (optionally normalized) values. If this is specified, note
   *                     that it disables the default test for value equality, so you will
   *                     need to add a test function to compare value equality if you still
   *                     want to test for it.
   * @param {object} [options]
   * @param {boolean} [options.skipReferenceRecordExpansion] if you run processReferenceRecords
   *                  on the referenceRecordsSource before you pass it in here, you can get
   *                  quicker results by skipping the JSON-LD expansion of each reference record.
   * @param {number} [options.threshold] total match/non-match weight value to beat to be
   *                                     considered a match. (maximum unacceptable value)
   *                                     Default: 0
   * @param {boolean} [options.cache] whether to cache the result and return it if the
   *                  same toMatchRecord is requested again
   *                  TODO set this up. it is not coded yet.
   * @return {Observable} contains every referenceRecord that matches enough to pass the threshold.
   */
  function filter(toMatchRecord, referenceRecordsSource, matchers, options) {
    options = options || {};

    matchers = enhanceMatchers(matchers);

    var THRESHOLD_DEFAULT = 0;
    var threshold = options.hasOwnProperty('threshold') ? options.threshold : THRESHOLD_DEFAULT;

    /****************************************************
    * process the toMatchRecord into something that allows
    * us to know more about what to expect in terms
    * of structure, key names, property values, etc.
    *****************************************************/
    var processedToMatchRecordSource = losslessExpand(toMatchRecord)
    .flatMap(Rx.Observable.from)
    .flatMap(function(expandedItem) {
      if (_.isPlainObject(expandedItem) &&
          getNonAddedKeyCount(toMatchRecord) === getNonAddedKeyCount(expandedItem)) {
        return Rx.Observable.return(expandedItem);
      }

      if (_.isPlainObject(toMatchRecord)) {
        if (!expandedItem) {
          var toMatchRecordKeys = _.keys(toMatchRecord);
          var valueKeys = toMatchRecordKeys.filter(function(key) {
            return ['@context', '@id'].indexOf(key) === -1;
          });
          if (valueKeys.length === 0) {
            // jsonld.js will return nothing when expanding something like this:
            // {"@id": "http://example.org/1234"}
            //
            // But we want to be able to process a toMatchRecord that just has
            // an @id and optionally a @context. So for this case, we add a
            // placeholder property to make sure we return an expanded result.
            // NOTE: side-effect
            toMatchRecord[PLACEHOLDER_VALUE_IRI] = toMatchRecord[PLACEHOLDER_VALUE_IRI] ||
            PLACEHOLDER_VALUE_IRI;
            return losslessExpand(toMatchRecord)
            .flatMap(Rx.Observable.from);
          }
        } else if (_.isPlainObject(expandedItem) &&
            getNonAddedKeyCount(toMatchRecord) !== getNonAddedKeyCount(expandedItem)) {
          // In this case, we lost some properties, which indicates no default @vocab was set.
          // We want to keep all properties in the toMatchRecord, so we set a placeholder
          // @vocab to avoid losing properties.
          // NOTE: toMatchRecord must not be in the form of {"@context":..., "@graph": [...]}
          // so we don't need to worry about handling items from a @graph.
          var context = toMatchRecord['@context'] || [];
          context = jsonldRx.arrayifyClean(context);
          context.push({
            '@vocab': PLACEHOLDER_VOCAB_IRI
          });
          // NOTE: side-effect
          toMatchRecord['@context'] = context;
          return losslessExpand(toMatchRecord)
          .flatMap(Rx.Observable.from);
        }
      }

      // If none of the above handlers were able to process the toMatchRecord,
      // we return an error.
      var message = 'Could not process provided toMatchRecord.\n' +
        'Expected plain object as expandedItem.\n';
      if (_.isString(toMatchRecord)) {
        message += 'Could not expand. May have been a URL. If so, is it accessible?\n';
      }
      var toMatchRecordString = JSON.stringify(toMatchRecord);
      message += 'toMatchRecord is shown below:' + '\n' +
          toMatchRecordString;
      return Rx.Observable.throw(new Error(message));
    })
    .map(function(expandedItem) {
      return addCharacteristicValuesProperties(matchers, expandedItem);
    });

    /****************************************************
    * process referenceRecordsSource into something
    * that allows us to know more about what to expect in
    * terms of structure, key names, property values, etc.
    *****************************************************/
    var expandedReferenceRecordsSource;
    var skipReferenceRecordExpansion = options.skipReferenceRecordExpansion;
    if (skipReferenceRecordExpansion) {
      expandedReferenceRecordsSource = referenceRecordsSource;
    } else {
      expandedReferenceRecordsSource = processReferenceRecords(
          referenceRecordsSource, matchers);
    }

    var filterOutBelowThreshold = flatFilter.bind(null, function(weight) {
      return weight > threshold;
    });

    /**********************
    * Find Match(es)
    **********************/
    return processedToMatchRecordSource
    .flatMap(function(processedToMatchRecord) {
      var getTotalWeightByReferenceRecord = getTotalWeight.bind(
          null, matchers, processedToMatchRecord);
      return expandedReferenceRecordsSource
      .flatMap(function(oneOrMoreCandidateMatchesFromReferenceRecord) {

        var cleanedReferenceRecordItems = oneOrMoreCandidateMatchesFromReferenceRecord
        .map(cloneWithoutAddedProperties);

        // TODO currently assuming any expanded values of length
        // greater than 1 is JSON-LD in the @graph format. But what
        // about @set or @list? Could they cause problems here?
        if (oneOrMoreCandidateMatchesFromReferenceRecord.length === 1) {
          var candidateMatch = oneOrMoreCandidateMatchesFromReferenceRecord[0];
          var cleanedReferenceRecordItem = cleanedReferenceRecordItems[0];
          var context = candidateMatch['@context'];
          return getTotalWeightByReferenceRecord(candidateMatch)
          .flatMap(filterOutBelowThreshold)
          .flatMap(function(weight) {
            return compactWithoutExpandWhenContext(cleanedReferenceRecordItem)
            .map(function(compacted) {
              return {
                weight: weight,
                value: compacted
              };
            });
          });
        } else if (oneOrMoreCandidateMatchesFromReferenceRecord.length > 1) {
          return Rx.Observable.from(oneOrMoreCandidateMatchesFromReferenceRecord)
          .flatMap(function(candidateMatch) {
            var context = candidateMatch['@context'];
            var frame = {
              '@context': context
            };
            var candidateMatchKeys = _.keys(candidateMatch);

            var matchingKeySet = _.map(matchers, function(matcher) {
              return matcher.characteristicKeys;
            })
            .find(function(characteristicKeys) {
              return _.intersection(characteristicKeys, candidateMatchKeys).length > 0;
            });

            if (!matchingKeySet) {
              // This happens whenever there is a @graph element (in the reference record) that
              // has no overlap with the record to match. In that case, we want to terminate
              // our determination of whether the current @graph element is a match.
              return Rx.Observable.empty();
            }

            var matchingKeys = _.intersection(matchingKeySet, candidateMatchKeys);

            var matchingKey = matchingKeys[0];
            frame[matchingKey] = candidateMatch[matchingKey];

            return getTotalWeightByReferenceRecord(candidateMatch)
            .flatMap(filterOutBelowThreshold)
            .flatMap(function(weight) {
              return jsonldRx.frame(cleanedReferenceRecordItems, frame)
              .flatMap(function(framed) {
                var graph = framed['@graph'];
                if (graph.length === 1) {
                  var doc = {};
                  doc['@context'] = context;
                  _.assign(doc, graph[0]);
                  return Rx.Observable.return({
                    weight: weight,
                    value: doc
                  });
                } else {
                  return Rx.Observable.throw(
                      new Error('Expected "framed" to have property "@graph" w/ length of 1.'));
                }
              });
            });
          });
        } else {
          return Rx.Observable.throw(new Error('Empty referenceRecord'));
        }
      });
    })
    .doOnError(function(err) {
      err.message = err.message || '';
      err.message += ' in JsonldRx.Matcher.filter';
      throw err;
    });
  }

  return {
    _processReferenceRecords: processReferenceRecords,
    filter: filter,
  };
};

module.exports = Matcher;
