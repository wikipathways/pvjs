var _ = require('lodash');
var kaavioEditor = require('../../../kaavio-editor/index.js');
var jsondiffpatch = require('jsondiffpatch');
var WikipathwaysApiClient = require('wikipathways-api-client');

module.exports = function(pvjs) {
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

  function save(pvjson) {
    if (!pvjson) {
      console.warn('No pvjson to save.');
      return;
    }

    var pathwayIdentifier = pvjs.kaavioOptions.resource.match(/WP\d+/)[0];
    var version = pvjs.kaavioOptions.version;
    var pvjsonOriginal = pvjs.pvjsonOriginal;

    var serializerInstance = new XMLSerializer();

    // TODO refactor once pvjson -> gpml converter is done
    //var gpmlDocJquery = pvjs.kaavioOptions.original;
    var gpmlDocJquery = pvjs.kaavioOptions.original;
    var gpmlDoc = gpmlDocJquery[0];

    var delta = diffpatcher.diff(
      pvjson.elements,
      pvjsonOriginal.elements
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
      var selectedElement = pvjson.elements[index];
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
      var selectedElement = pvjson.elements[index];
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
        var entityReference = _.find(pvjson.elements,
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

    if (!document.baseURI.match(/wikipathways\.org/)) {
      var message = 'Cannot save on a non-WikiPathways server.';
      editor.trigger('error.nonwikipathwaysserver', {message: message}, false);
      throw new Error(message);
    }

    var wikipathwaysApiClientInstance = WikipathwaysApiClient();

    wikipathwaysApiClientInstance.updatePathway({
      identifier: pathwayIdentifier,
      version: version,
      gpml: gpmlString,
      // TODO have the user enter this or craft update from actual changes detected by pvjs
      description: 'Quick edit to datanode annotation or property'
    })
    .then(function(response) {
      console.log('response');
      console.log(response);
      var $revup = $($.parseXML(response)).find('ns1\\:success').text();
      console.log($revup);
      pvjs.kaavioOptions.pvjson.identifier = $revup;
      pvjsonOriginal.elements = pvjson.elements;
      editor.editorTabsComponent.vm.originalPvjsonAsString =
          JSON.stringify(pvjson);
      editor.trigger('success.response', {
          message: 'Your changes were saved. Refresh to update page information.'
        });
    }, function(err) {
      console.log(err);
      // Not necessarily an error; check status
      if (err.status !== 200) {
        throw err;
      } else {
        console.log('Status: ' + err.status + ' - ' + err.statusText);
        console.log('readyState: ' + err.readyState);
        console.log(decodeURI(err.responseText));
        if (err.responseText.indexOf('not logged in') > 0) {
          editor.trigger('error.err', {
            message: 'Your changes were NOT saved. You are not logged in. In order to ' +
            'save these changes, login in a separate tab, then click Save&Close again.'
          });
        } else if (err.responseText.indexOf('out of date') > 0) {
          editor.trigger('error.err', {
            message: 'Your changes were NOT saved. Somebody else modified the pathway ' +
            'while you were editing. Please refresh the page and try again.'
          });
        } else {
          editor.trigger('error.err', {
            message: 'An unknown error occurred. Please refresh and try again or ' +
            '<a href="http://wikipathways.org/index.php/Contact_Us">contact us</a> if stuck.'
          });
        }
      }
    });
  }

  var editor = kaavioEditor(pvjs);
  editor.save = _.flow(editor.save, save);
  return editor;
};
