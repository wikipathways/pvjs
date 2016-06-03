var _ = require('lodash');
var he = require('he');
var kaavioEditor = require('kaavio-editor');
var jsondiffpatch = require('jsondiffpatch');
// TODO figure out why m.redraw doesn't work with browserify
// and kaavio-editor
//var m = require('mithril');
var WikipathwaysApiClient = require('wikipathways-api-client');

module.exports = function(pvjs1) {
  var pvjs = this;
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
    var pvjsonOriginal = JSON.parse(pvjs.sourceData.pvjsonPreUpdateAsString);

    var serializerInstance = new XMLSerializer();

    // TODO refactor once pvjson -> gpml converter is done
    var gpmlDoc = pvjs.kaavioOptions.original;

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
    _.toPairs(delta)
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

        var selectedElement = gpmlDoc.querySelector('[GraphId="' + selectedElementId + '"]');
        var graphicsElement = selectedElement.querySelector('Graphics');

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

    // TODO this data is basically duplicated in gpml2pvjson. DRY it up.
    var standardToGpmlEntityTypeIdMappings = {
      'biopax:Complex': 'Complex',
      'gpml:GeneProduct': 'GeneProduct',
      'gpml:Metabolite': 'Metabolite',
      'biopax:Pathway': 'Pathway',
      'biopax:Protein': 'Protein',
      'biopax:Rna': 'Rna',
      'gpml:Unknown': 'Unknown'
    };

    _.toPairs(delta)
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
      .filter(function(selectedElement) {
        return selectedElement['gpml:element'] === 'gpml:DataNode';
      })
      .map(function(selectedPvjsElement) {
        //*
        var selectedElementId = selectedPvjsElement.id;

        var xrefType = standardToGpmlEntityTypeIdMappings[
            selectedPvjsElement.type];

        var textContent = selectedPvjsElement.textContent;
        var bridgeDbDataSourceName;
        var identifier;
        var entityReferenceComponents;
        if (!!selectedPvjsElement.entityReference) {
          var entityReference = _.find(pvjson.elements,
              function(pvjsElement) {
                return pvjsElement.id === selectedPvjsElement.entityReference;
              });

          if (!!entityReference) {
            bridgeDbDataSourceName = entityReference.isDataItemIn.bridgeDbDataSourceName;
            identifier = entityReference.identifier;
          }
        }

        var selectedElement = gpmlDoc.querySelector('[GraphId="' + selectedElementId + '"]');
        var xrefElement = selectedElement.querySelector('Xref');

        selectedElement.setAttribute('Type', xrefType);
        selectedElement.setAttribute('TextLabel', textContent);

        xrefElement.setAttribute('Database', bridgeDbDataSourceName);
        xrefElement.setAttribute('ID', identifier);
      });

    //*
    var gpmlString = serializerInstance.serializeToString(gpmlDoc)
      .replace('<?xml version="1.0" encoding="UTF-8"?>', '');

    var noNamedCharacterReferencesGpmlString = gpmlString.replace(/&\w+;/g, function(match) {
      return he.encode(he.decode(match));
    });
    var encodedGpmlString = he.encode(noNamedCharacterReferencesGpmlString, {
      // allowUnsafeSymbols means don't encode "<" and ">"
      // (plus some other symbols), but we do encode all other
      // symbols, such as the soft hyphen, which would cause
      // trouble in IE.
      'allowUnsafeSymbols': true
    });

    //*
    console.log('');
    console.log('');
    console.log('');
    console.log('*********************************************************************');
    console.log('*********************************************************************');
    console.log('');
    console.log('Updated GPML as string:');
    console.log('');
    console.log(encodedGpmlString);
    console.log('');
    console.log('*********************************************************************');
    console.log('*********************************************************************');
    console.log('');
    //*/

    if (!document.location.host.match(/wikipathways\.org/)) {
      var message = 'Cannot save on a non-WikiPathways server.';
      editor.trigger('error.nonwikipathwaysserver', {message: message}, false);
      throw new Error(message);
    }

    var wikipathwaysApiClientInstance = WikipathwaysApiClient();

    wikipathwaysApiClientInstance.updatePathway({
      identifier: pathwayIdentifier,
      version: version,
      gpml: encodedGpmlString,
      // TODO have the user enter this or craft update from actual changes detected by pvjs
      description: 'Quick edit to datanode annotation or property',
      username: window.wikipathwaysUsername,
    })
    .then(function(response) {
      console.log('response');
      console.log(response);
      var $responseString = new XMLSerializer().serializeToString(response);
      var $revup = $responseString.match(/\d{5}/g);
      console.log('$revup[0]');
      console.log($revup[0]);
      // TODO we should only need to update the version in one place, shouldn't we?
      pvjs.kaavioOptions.pvjson.version = $revup[0];
      pvjs.kaavioOptions.version = $revup[0];
      pvjson.version = $revup[0];
      pvjsonOriginal.elements = pvjson.elements;
      pvjs.sourceData.pvjsonPreUpdateAsString =
          JSON.stringify(pvjson);
      editor.trigger('success.response', {
          message: 'Your changes were saved. Refresh to update page information.'
        });

      var SGLEnabled = false;
      if (SGLEnabled) {
        var activity_body = {
          _t: 'activity.create',
          accounttoken: 'userTokenGoesHere',
          details: { gameId: '5751ed90e4b050b536ba7a03' },
          activity: 'basicquickedit',
          time: (new Date()).toTimeString()
        };
        window.SGL.create_activity(activity_body, function(response) {
          console.log('SGL response');
          console.log(response);
        });
      }

      // Reload the current page, allowing use of the cache
      document.location.reload();
      // Reload the current page, without using the cache
      //document.location.reload(true);
    }, function(err) {
      console.log('err');
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

  var editor = kaavioEditor;
  editor.save = _.flow(editor.save, save);
  //pvjs.footerOpenButton.vm.label('Quick Edit');

  //*
  pvjs.footerContent = editor;
  //*/

  //footer.content(m('div', {}, 'Hello'));
  /*
  var testFooterContent = {};
  testFooterContent.controller = function(ctrl) {};
  testFooterContent.view = function(ctrl, args) {
    return m('div', {}, 'testFooterContent');
  };
  footer.content = testFooterContent;
  //*/

  return editor;
};
