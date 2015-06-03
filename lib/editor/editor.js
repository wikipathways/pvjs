var _ = require('lodash');
var jsondiffpatch = require('jsondiffpatch');
//var WikipathwaysApiClient = require('wikipathways-api-client');
// TODO use the remote, not local
var WikipathwaysApiClient = require('../../../wikipathways-api-client-js/index.js');

var diffpatcher = jsondiffpatch.create({
  // used to match objects when diffing arrays,
  // by default only === operator is used
  objectHash: function(obj) {
    // this function is used only when objects are not equal by ref
    return obj.id;
  },
  arrays: {
    // default true, detect items moved inside the array
    // (otherwise they will be registered as remove+add)
    detectMove: false,
    // default false, the value of items moved is not included in deltas
    includeValueOnMove: false
  },
  textDiff: {
    // default 60, minimum string length (left and right sides)
    // to use text diff algorythm: google-diff-match-patch
    minLength: 60
  }
});

module.exports = function(pvjs) {
  function save(args) {

    var serializerInstance = new XMLSerializer();

    // TODO refactor once pvjson -> gpml converter is done
    //var gpmlDocJquery = pvjs.sourceData.original;
    var gpmlDocJquery = pvjs.options.original;
    var gpmlDoc = gpmlDocJquery[0];

    var delta = diffpatcher.diff(
      args.pvjson.elements,
      args.pvjsonOriginal.elements
    );

    /***********************************************
     * Temporary solution for handling updates
     * to GPML DataNode Graphics.
     * The long-term solution will be to convert
     * the pvjson to GPML.
     **********************************************/
    _.pairs(delta)
    .filter(function(pair) {
      var value = pair[1];
      return value.hasOwnProperty('color') || value.hasOwnProperty('fontStyle') ||
          value.hasOwnProperty('fontWeight');
    })
    .map(function(pair) {
      var index = pair[0];
      var selectedElement = args.pvjson.elements[index];
      return selectedElement;
    })
    .map(function(element) {
      var selectedElementId = element.id;
      var color = element.color;
      var fontStyle = element.fontStyle;
      var fontWeight = element.fontWeight;

      var selectedElementJquery = gpmlDoc.querySelector('[GraphId="' + selectedElementId + '"]');
      var graphicsElement = selectedElementJquery.querySelector('Graphics');

      if (!color) {
        graphicsElement.removeAttribute('Color');
      } else {
        var gpmlColor = color.replace('#', '').toLowerCase();
        graphicsElement.setAttribute('Color', gpmlColor);
      }

      if (!fontStyle || fontStyle === 'normal') {
        graphicsElement.removeAttribute('FontStyle');
      } else {
        var gpmlFontStyle = fontStyle.replace('italic', 'Italic');
        graphicsElement.setAttribute('FontStyle', gpmlFontStyle);
      }

      if (!fontWeight || fontWeight === 'normal') {
        graphicsElement.removeAttribute('FontWeight');
      } else {
        var gpmlFontWeight = fontWeight.replace('bold', 'Bold');
        graphicsElement.setAttribute('FontWeight', gpmlFontWeight);
      }

      //pvjs.editor.save(gpmlDocJquery);
    });

    /***********************************************
     * Temporary solution for handling updates
     * to GPML DataNode entity reference Xref.
     * The long-term solution will be to convert
     * the pvjson to GPML.
     **********************************************/
    _.pairs(delta)
    .filter(function(pair) {
      var value = pair[1];
      return value.hasOwnProperty('textContent') || value.hasOwnProperty('gpml:Type') ||
          value.hasOwnProperty('entityReference');
    })
    .map(function(pair) {
      var index = pair[0];
      var selectedElement = args.pvjson.elements[index];
      return selectedElement;
    })
    .map(function(selectedPvjsElement) {
      //*
      var selectedElementId = selectedPvjsElement.id;

      var xrefType = selectedPvjsElement['gpml:Type'].replace('gpml:', '');
      var textContent = selectedPvjsElement.textContent;
      var datasetName;
      var identifier;
      var entityReferenceComponents;
      if (!!selectedPvjsElement.entityReference) {
        var entityReference = _.find(pvjs.sourceData.pvjson.elements,
            function(pvjsElement) {
              return pvjsElement.id === selectedPvjsElement.entityReference;
            });

        if (!!entityReference) {
          datasetName = entityReference.dbName;
          identifier = entityReference.dbId;
        }

        /*
        entityReferenceComponents = element.entityReference.match(
            /http\:\/\/identifiers.org\/(.*)\/(.*)$/);

        if (!!entityReferenceComponents && !!entityReferenceComponents.length &&
            entityReferenceComponents.length === 3) {
          datasetName = entityReferenceComponents[1];
          identifier = entityReferenceComponents[2];
        }
        //*/
      }

      var selectedElementJquery = gpmlDocJquery.find(
          '[GraphId="' + selectedElementId + '"]');
      var xrefElement = selectedElementJquery.find('Xref');

      selectedElementJquery.attr('Type', xrefType);
      selectedElementJquery.attr('TextLabel', textContent);

      xrefElement.attr('Database', datasetName);
      xrefElement.attr('ID', identifier);
    });

    //*
    var gpmlString = serializerInstance.serializeToString(gpmlDocJquery[0]);

    //*
    console.log('');
    console.log('');
    console.log('');
    console.log('*********************************************************************');
    console.log('*********************************************************************');
    console.log('');
    console.log('Updated GPML as string:');
    console.log('');
    console.log(gpmlString);
    console.log('');
    console.log('*********************************************************************');
    console.log('*********************************************************************');
    console.log('');
    //*/

    var pvjson = pvjs.sourceData.pvjson;

    if (!document.baseURI.match(/wikipathways\.org/)) {
      throw new Error('Cannot save on a non-WikiPathways server.');
    }

    var wikipathwaysApiClientInstance = WikipathwaysApiClient();

    wikipathwaysApiClientInstance.updatePathway({
      identifier: pvjs.options.resource.match(/WP\d+/)[0],
      version: pvjs.options.version,
      gpml: gpmlString,
      // TODO have the user enter this or craft update from actual changes detected by pvjs
      description: 'Quick edit to datanode annotation or property'
    })
    .then(function(response) {
      console.log('response');
      console.log(response);
    }, function(err) {
      console.log(err);
      // Not necessarily an error; check status
      if(err.status!=200){
        throw err;
      } else {
        console.log("Status: "+err.status + " - " + err.statusText);
        console.log("readyState: "+err.readyState);
        console.log(decodeURI(err.responseText));
      }
    });

    /*
    console.log('You have successfully updated the pathway.');
    console.log('');
    console.warn('This change was only in your browser. ' +
        'You still need to save it to the backend.');
    console.log('');
    //*/

    /*
    var pvjsdatachangeEvent = new CustomEvent('pvjsdatachange', {
      detail: {
        pvjson: pvjs.sourceData.pvjson,
        gpml: gpmlString
      }
    });
    pvjs.selector.dispatchEvent(pvjsdatachangeEvent);
    //*/
  }

  return {
    save: save
  };
};
