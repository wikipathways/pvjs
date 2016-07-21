var _ = require('lodash');
var config = require('./config.js');
var EntityReference = require('./entity-reference.js');
//var JsonldRx = require('jsonld-rx-extra');
var JsonldRx = require('../jsonld-rx-extra/main.js');
//var JsonldMatcher = require('jsonld-rx-extra/lib/matcher.js');
var JsonldMatcher = require('../jsonld-rx-extra/matcher.js');
var Dataset = require('./dataset.js');
var Organism = require('./organism.js');
var Rx = require('rx-extra');
var Xref = require('./xref.js');

/**
 * The keyword {@link http://www.w3.org/TR/json-ld/#the-context|@context} indicates
 *    an object with information for identifying or defining terms used in the data.
 *    The data is just regular JSON, so you can safely ignore the context. If you
 *    choose to use the context, you can work with JSON-LD tools to view the JSON as
 *    Linked Open Data.
 * @typedef {String|Object|Array<String>|Array<Object>} JsonldContext
*/

/**
 * The keyword {@link http://www.w3.org/TR/json-ld/#iris|id} indicates a unique identifier for a
 *                      concept or thing. In JSON-LD terms, this unique identifier is called an IRI,
 *                      which is usually a persistent (stable) URL. You can safely ignore this if
 *                      you don't care about JSON-LD.
 *                      @example http://identifiers.org/ncbigene/1234
 * @typedef {String} Iri
*/

/**
 * The keyword {@link http://www.w3.org/TR/json-ld/#typed-values|type} sets data types in JSON-LD.
 *                      You can safely ignore this if you don't care about JSON-LD.
 * @typedef {String|String[]} JsonldType
*/

/**
 * {@link http://nodejs.org/api/stream.html|Node.js stream}. This library additionally uses
 *      {@link http://highlandjs.org/|highland} for easier stream handling, so you can use
 *      the highland methods on all streams returned.
 * @typedef Stream
*/

/**
 * Creates a new BridgeDb instance.
 * There is no need to use the "new" keyword.
 * @class
 *
 * @example
 * BridgeDb = require('bridgedb'); // Only needed if using Node.js.
 * var myBridgeDbInstance = new BridgeDb({
 *   baseIri: 'http://webservice.bridgedb.org/', // Optional
 *   datasetsMetadataIri:
 *    'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb-datasources.php'  // Optional
 * });
 *
 * @param {object} [options] Overwrite any or all of the defaults in [config.js]{@link config}
 * @param {string} [options.baseIri='http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php/'] Base
 *    IRI (URL) for your BridgeDb webservice instance.
 *    TODO Enable CORS at bridgedb.org, because the default should be
 *    'http://webservice.bridgedb.org/', but we are forced to use pointer as
 *    a proxy for now for CORS so that web browsers can access the data.
 * @param {string} [options.datasetsMetadataIri=
 *    'https://cdn.rawgit.com/bridgedb/BridgeDb/master/org.bridgedb.bio/
 *        resources/org/bridgedb/bio/datasources.txt'] Location
 *    (URL) of the datasources.txt file that contains metadata for selected biological datasets.
 *    This metadata includes information such as name (e.g., Entrez Gene),
 *    Miriam identifier (e.g., urn:miriam:ncbigene) and BridgeDb system code (e.g., L).
 * @param {string} [options.organism] Full name in Latin, e.g., Homo sapiens.
 *    Each bridgedbjs instance has one organism associated with it.
 *    Specifying it here will result in faster response times, because bridgedbjs
 *    will not have to infer it from the other provided data.
 * @param {string|object|string[]|object[]} [options.context] default context to use
 */
var BridgeDb = function(options) {
  var instance = this;
  options = options || {};
  instance.config = _.clone(config);
  instance.config = _.defaultsDeep(options, instance.config);

  var internalContext = options.context;

  var jsonldRx = instance.jsonldRx = new JsonldRx({
    defaultContext: internalContext
  });

  var jsonldMatcher = jsonldRx._matcher = new JsonldMatcher(jsonldRx);
  //jsonldRx.normalizeText = jsonldMatcher._normalizeText;
  //jsonldRx.tieredFind = jsonldMatcher.tieredFind;

  instance.addContext = jsonldRx.addContext;
//  instance.addContext = function(inputDoc) {
//    // our BridgeDbJs context, internal to this library
//    internalContext = _.isArray(internalContext) ? internalContext : [internalContext];
//    var externalContext = inputDoc['@context'] || [{'@vocab': 'http://bridgedb.org/input-vocab/'}];
//    externalContext = _.isArray(externalContext) ? externalContext : [externalContext];
//    var unionContext = internalContext.concat(externalContext);
//
//    return jsonldRx.mergeContexts(unionContext)
//    .map(function(mergedContexts) {
//      // this looks awkward, but it is needed in order to put the @context property first
//      var outputDoc = {
//        '@context': mergedContexts
//      };
//      _.defaults(outputDoc, inputDoc);
//      // TODO why do we need to stringify it here and parse it in the next step?
//      return JSON.stringify(outputDoc);
//    })
//    .map(function(value) {
//      var parsedValue = JSON.parse(value);
//      return parsedValue;
//    });
//  };

  instance.entityReference = Object.create(EntityReference(instance));
  instance.entityReference = Object.create(EntityReference(instance));
  instance.organism = Object.create(Organism(instance));
  if (!!options.organism) {
    instance.organism._setInstanceOrganism(options.organism, false);
  }

  instance.dataset = Object.create(Dataset(instance));
  instance.xref = Object.create(Xref(instance));
};

(function() {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    //in browser environment
    window.BridgeDb = BridgeDb;
  }

  if (!!module && !!module.exports) {
    //in node and/or CommonJS environment
    module.exports = BridgeDb;
  }
})();
