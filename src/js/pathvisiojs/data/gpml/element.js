'use strict';

// includes all GPML elements. Is parent of node and edge.

pathvisiojs.data.gpml.element = {};


var pathvisioDefaultStyleValues = {
  'FontSize':{
    'Type':"FontSize",
    'Value':10
  }
}

pathvisiojs.data.gpml.element.gpmlColorToCssColor = function(gpmlColor, pathvisioDefault) {
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
}

pathvisiojs.data.gpml.element.setColorAsJson = function(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
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
}


pathvisiojs.data.gpml.element.setColorAsJson = function(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
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
}

// TODO can we delete this function?

pathvisiojs.data.gpml.element.getLineStyle = function(gpmlElement) {
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
}

pathvisiojs.data.gpml.element.getBorderStyle = function(gpmlLineStyle, pathvisioDefault) {

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
}

pathvisiojs.data.gpml.element.setBorderStyleAsJson = function(jsonElement, currentGpmlLineStyleValue, defaultGpmlLineStyleValue) {
  var borderStyle;

  // this check happens twice because it doesn't make sense to have getBorderStyle() tell us
  // whether it has returned the default value, and we need to know whether we are using the
  // default here.

  if (currentGpmlLineStyleValue !== defaultGpmlLineStyleValue) {
    borderStyle = getBorderStyle(currentGpmlLineStyleValue, defaultGpmlLineStyleValue);
    jsonElement.borderStyle = borderStyle;
  }
  return jsonElement;
}

// set default values. "swing" refers to PathVisio-Java.
pathvisiojs.data.gpml.element.color = {};
pathvisiojs.data.gpml.element.color.swing = '000000';
pathvisiojs.data.gpml.element.color.gpml = null;

pathvisiojs.data.gpml.element.fillColor = {};
pathvisiojs.data.gpml.element.fillColor.swing = 'ffffff';
pathvisiojs.data.gpml.element.fillColor.gpml = null;

pathvisiojs.data.gpml.element.lineStyle = {};
pathvisiojs.data.gpml.element.lineStyle.swing = 'Solid';
pathvisiojs.data.gpml.element.lineStyle.gpml = null;

pathvisiojs.data.gpml.element.fontSize = {};
pathvisiojs.data.gpml.element.fontSize.swing = 10;
pathvisiojs.data.gpml.element.fontSize.gpml = 10;

pathvisiojs.data.gpml.element.fontWeight = {};
pathvisiojs.data.gpml.element.fontWeight.swing = null;
pathvisiojs.data.gpml.element.fontWeight.gpml = null;

pathvisiojs.data.gpml.element.fontName = {};
pathvisiojs.data.gpml.element.fontName.swing = 'Arial';
pathvisiojs.data.gpml.element.fontName.gpml = null;
  
pathvisiojs.data.gpml.element.toRenderableJson = function(gpmlElement, jsonElement, elementCallback) {
  jsonElement["@type"] = jsonElement["@type"] || [];
  jsonElement["@type"].push("element");

  pathvisiojs.data.gpml.biopaxRef.getAllAsRenderableJson(gpmlElement, function(publicationXrefs) {
    if (!!publicationXrefs) {
      jsonElement.PublicationXref = publicationXrefs;
    }
    elementCallback(jsonElement);
  });

  /*
     var graphics = gpmlElement.select('Graphics'),
     zIndex,
     borderWidth;
     if (graphics[0].length > 0) {
     zIndex = graphics.attr('ZOrder') || 1;
     jsonElement.zIndex = parseFloat(borderWidth);

     borderWidth = graphics.attr('LineThickness') || 1;
     jsonElement.borderWidth = parseFloat(borderWidth);
     }
  //*/
};
