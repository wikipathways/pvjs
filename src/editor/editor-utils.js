var _ = require('lodash');
var highland = require('highland');
var jsonld = require('jsonld');
var m = require('mithril');

var editorUtils = (function() {

  var context = {
    bridgedb: 'http://www.example.org/bridgedb/input-vocab/',
    'biopax': {
      '@id': 'http://www.biopax.org/release/biopax-level3.owl#',
      '@type': '@id'
    },
    'dcterms': {
      '@id': 'http://purl.org/dc/terms/',
      '@type': '@id'
    },
    'gpml': {
      '@id': 'http://vocabularies.wikipathways.org/gpml#',
      '@type': '@id'
    }
  };

  var createJsonldCompactStream = highland.wrapCallback(jsonld.compact);
  var createJsonldExpandStream = highland.wrapCallback(jsonld.expand);

  /* Convert a highland stream into a mithril promise
   * @param {stream} highlandStream
   * @result {promise} mithrilPromise See
   *  http://lhorie.github.io/mithril/mithril.deferred.html#differences-from-promises-a-
   */
  function promisify(highlandStream) {
    //tell Mithril to wait for this service to complete before redrawing
    m.startComputation();
    var deferred = m.deferred();

    highlandStream.toArray(function(results) {
      deferred.resolve(results);
      //the service is done, tell Mithril that it may redraw
      m.endComputation();
    });

    return deferred.promise;
  }

  var promisifiedProp = highland.compose(m.prop, promisify);

  return {
    context: context,
    createJsonldCompactStream: createJsonldCompactStream,
    createJsonldExpandStream: createJsonldExpandStream,
    promisify: promisify,
    promisifiedProp: promisifiedProp
  };
})();

module.exports = editorUtils;
