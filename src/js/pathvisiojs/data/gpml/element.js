pathvisiojs.data.gpml.element = function(){
  // ...element includes all GPML elements and is the parent of both ...node and ...edge.
  'use strict';

  var gpmlColorToCssColor = function(gpmlColor, pathvisioDefault) {
    var color;
    if (gpmlColor !== pathvisioDefault) {
      if (!!gpmlColor) {
        color = new RGBColor(gpmlColor);
        if (color.ok) {
          return color.toHex();
        }
        else {
          return 'black';
        }
      }
      else {
        return 'black';
      }
    }
    else {
      return null;
    }
  };

  var setColorAsJson = function(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
    var jsonColor;
    if (currentGpmlColorValue !== defaultGpmlColorValue) {
      jsonColor = gpmlColorToCssColor(currentGpmlColorValue, defaultGpmlColorValue);
      jsonElement.color = jsonColor;
      jsonElement.borderColor = jsonColor;
      if (jsonElement.hasOwnProperty('text')) {
        jsonElement.text.color = jsonColor;
      }
    }
    return jsonElement;
  };

  // TODO can we delete this function?

  var getLineStyle = function(gpmlElement) {
    var LineStyle, attributes;
    var graphics = gpmlElement.select('Graphics');
    if (!!graphics) {
      LineStyle = graphics.attr('LineStyle');
      if (!!LineStyle) {
        return LineStyle;
      }
      else {

        // As currently specified, a given element can only have one LineStyle.
        // This one LineStyle can be solid, dashed (broken) or double.
        // If no value is specified in GPML for LineStyle, then we need to check
        // for whether the element has LineStyle of double.

        attributes = gpmlElement.selectAll('Attribute');
        if (attributes.length > 0) {
          LineStyle = attributes.filter(function(d, i) {
            return d3.select(this).attr('Key') === 'org.pathvisiojs.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
          });

          if (LineStyle[0].length > 0) {
            return 'double';
          }
          else {
            return null;
          }
        }
        else {
          return null;
        }
      }
    }
  };

  var getBorderStyle = function(gpmlLineStyle, pathvisioDefault) {

    // Double-lined EntityNodes will be handled by using a symbol with double lines.
    // Double-lined edges will be rendered as single-lined, solid edges, because we
    // shouldn't need double-lined edges other than for cell walls/membranes, which
    // should be symbols. Any double-lined edges are curation issues.

    var lineStyleToBorderStyleMapping = {
      'Solid':'solid',
      'Double':'solid',
      'Broken':'dashed'
    };
    var borderStyle;
    if (gpmlLineStyle !== pathvisioDefault) {
      if (!!gpmlLineStyle) {
        borderStyle = lineStyleToBorderStyleMapping[gpmlLineStyle];
        if (borderStyle) {
          return borderStyle;
        }
        else {
          console.warn('LineStyle "' + gpmlLineStyle + '" does not have a corresponding borderStyle. Using "solid"');
          return 'solid';
        }
      }
      else {
        return 'solid';
      }
    }
    else {

      // TODO use code to actually get the default

      return 'whatever the default value is';
    }
  };

  var setBorderStyleAsJson = function(jsonElement, currentGpmlLineStyleValue, defaultGpmlLineStyleValue) {
    var borderStyle;

    // this check happens twice because it doesn't make sense to have getBorderStyle() tell us
    // whether it has returned the default value, and we need to know whether we are using the
    // default here.

    if (currentGpmlLineStyleValue !== defaultGpmlLineStyleValue) {
      borderStyle = getBorderStyle(currentGpmlLineStyleValue, defaultGpmlLineStyleValue);
      jsonElement.borderStyle = borderStyle;
    }
    return jsonElement;
  };

  var toPvjson = function(gpmlElement, jsonElement, elementCallback) {
    jsonElement["@type"] = jsonElement["@type"] || [];
    jsonElement["@type"].push("element");

    pathvisiojs.data.gpml.biopaxRef.getAllAsPvjson(gpmlElement, function(publicationXrefs) {
      if (!!publicationXrefs) {
        jsonElement.PublicationXref = publicationXrefs;
      }
      elementCallback(jsonElement);
    });
  };

  //*
  var toPvjsonNew = function(gpmlSelection, elementSelection, pvjsonElement, callback) {
    var pvjsonText = {},
      attribute,
      i,
      pvjsonHeight,
      pvjsonWidth,
      pvjsonStrokeWidth,
      gpmlShapeType,
      pvjsonShape,
      pvjsonZIndex,
      pvjsonRelX,
      pvjsonRelY,
      pvjsonX,
      pvjsonY;
    pvjsonElement.graphicalType = 'path';
    pvjsonText.graphicalType = 'text';

    var attributeDependencyOrder = [
      'GraphId',
      'GraphRef',
      'GraphRef',
      'IsContainedBy',
      'TextLabel',
      'Type',
      'CellularComponent'
    ];

    var gpmlToPvjsonConverter = {
      GraphId: function(gpmlGraphIdValue){
        // TODO this is a hack so we don't have two items with the same ID while I'm building out the code to create the flattened data structure
        pvjsonElement.id = gpmlGraphIdValue;
        pvjsonText.id = 'text' + gpmlGraphIdValue;
        pvjsonText.describes = gpmlGraphIdValue;
        return gpmlGraphIdValue;
      },
      TextLabel: function(gpmlTextLabelValue){
        pvjsonText.textContent = he.decode(gpmlTextLabelValue);
        return gpmlTextLabelValue;
      },
      Type: function(gpmlTypeValue){
        pvjsonElement.biologicalType = gpmlTypeValue;
        return gpmlTypeValue;
      },
      IsContainedBy: function(gpmlIsContainedByValue){
        pvjsonElement.isContainedBy = gpmlIsContainedByValue;
        return gpmlIsContainedByValue;
      },
      GraphRef: function(gpmlGraphRefValue){
        pvjsonElement.isAttachedTo = gpmlGraphRefValue;
        return gpmlGraphRefValue;
      },
    };

    var attributeName, attributeListItem, attributeListItemName, attributeList = [];
    for (i = 0; i < elementSelection[0][0].attributes.length; i++) {
      attribute = elementSelection[0][0].attributes[i];
      attributeName = attribute.name;
      attributeListItem = {
        name: attributeName,
        value: attribute.value,
        dependencyOrder: attributeDependencyOrder.indexOf(attributeName),
      };
      attributeList.push(attributeListItem);
    }
    attributeList.sort(function(a, b) {
      return a.dependencyOrder - b.dependencyOrder;
    });
    attributeList.forEach(function(attributeListItem){
      attributeListItemName = attributeListItem.name;
      if (gpmlToPvjsonConverter.hasOwnProperty(attributeListItemName)) {
        gpmlToPvjsonConverter[attributeListItemName](attributeListItem.value);
      }
      else {
        console.warn('Pathvisiojs has no handler for attribute "' + attributeListItemName + '"');
        attributeListItemName = strcase.camelCase(attributeListItemName);
        pvjsonElement[attributeListItemName] = attributeListItem.value;
      }
    });
    callback(pvjsonElement, pvjsonText);
  };
  //*/

  return {
    toPvjson:toPvjson,
    toPvjsonNew:toPvjsonNew,
    gpmlColorToCssColor:gpmlColorToCssColor,
    setColorAsJson:setColorAsJson,
    getLineStyle:getLineStyle,
    getBorderStyle:getBorderStyle,
    setBorderStyleAsJson:setBorderStyleAsJson
  };
}();
  

