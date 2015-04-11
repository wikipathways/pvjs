var _ = require('lodash');
var jsondiffpatch = require('jsondiffpatch');
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

    var gpmlDoc = pvjs.sourceData.original;

    console.log('args');
    console.log(args);

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
      return pair[1].hasOwnProperty('color');
    })
    .map(function(pair) {
      var index = pair[0];
      var selectedElement = args.pvjson.elements[index];
      console.log('selectedElement for color');
      console.log(selectedElement);
      return selectedElement;
    })
    .map(function(element) {
      var selectedElementId = element.id;
      var color = element.color;

      var dataNodeElement = gpmlDoc.find('DataNode[GraphId="' + selectedElementId + '"]');
      var graphicsElement = dataNodeElement.find('Graphics');

      var gpmlColor = color.replace('#', '').toUpperCase();
      graphicsElement.attr('Color', gpmlColor);

      console.log('Updated values:');
      console.log('Color: ' + gpmlColor);
      //pvjs.editor.save(gpmlDoc);
    });

    /***********************************************
     * Temporary solution for handling updates
     * to GPML DataNode Graphics.
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
      console.log('selectedElement for annotation');
      console.log(selectedElement);
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

      var dataNodeElement = gpmlDoc.find('DataNode[GraphId="' + selectedElementId + '"]');
      var xrefElement = dataNodeElement.find('Xref');

      dataNodeElement.attr('Type', xrefType);
      dataNodeElement.attr('TextLabel', textContent);

      xrefElement.attr('Database', datasetName);
      xrefElement.attr('ID', identifier);

      console.log('Updated values:');
      console.log('GraphId: ' + selectedElementId);
      console.log('TextLabel: ' + textContent);
      console.log('Type: ' + xrefType);
      console.log('Database: ' + datasetName);
      console.log('ID: ' + identifier);
      //*/
    });

    //*
    var serializerInstance = new XMLSerializer();
    var gpmlString = serializerInstance.serializeToString(gpmlDoc[0]);

    console.log('');
    console.log('');
    console.log('');
    console.log('*********************************************************************');
    console.log('*********************************************************************');
    console.log('');
    console.log('Updated GPML file as string:');
    console.log('');
    console.log(gpmlString);
    console.log('');
    console.log('*********************************************************************');
    console.log('*********************************************************************');
    console.log('');

    console.log('You have successfully updated a GPML DataNode.');
    console.warn('This change applies to your browser only.');
    console.warn('You still need to save it to the backend.');

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
