// includes GPML elements of type EntityNode and Group
pathvisiojs.data.gpml.element.node = function() {
  'use strict';

  var defaults = {};
  defaults.backgroundImage = {};
  defaults.shapeType = {};
  defaults.valign = defaults.verticalAlign = {};
  defaults.align = defaults.textAlign = {};
  defaults.padding = {};
  defaults.lineThickness = defaults.borderWidth = {};
  defaults.lineStyle = defaults.borderStyle;

  var setJsonBackgroundColor = function(jsonNode, currentGpmlFillColorValue) {
    var jsonBackgroundColor = pathvisiojs.data.gpml.gpmlColorToCssColorNew(currentGpmlFillColorValue);
    jsonNode.backgroundColor = jsonBackgroundColor;
    return jsonNode;
  };

  var getPorts = function(jsonNode, callback) {
    var getPerpendicularLine = function(sx, sy, rotate) {
      var rad = rotate * Math.PI/180;
      var sideAngleRotation = 2 * Math.PI - rad;
      var sideAngleBeforeRotate = Math.atan2(sy, sx);
      var dx = Math.cos(sideAngleBeforeRotate + sideAngleRotation - Math.PI/2);
      var dy = Math.sin(sideAngleBeforeRotate + sideAngleRotation - Math.PI/2);
      return {'dx': dx, 'dy': dy};
    };

    var ports = [];
    var relXYCombinations = [
      {
      RelX: -0.5,
      RelY: -1
    },
    {
      RelX: 0,
      RelY: -1
    },
    {
      RelX: 0.5,
      RelY: -1
    },
    {
      RelX: 1,
      RelY: -0.5
    },
    {
      RelX: 1,
      RelY: 0
    },
    {
      RelX: 1,
      RelY: 0.5
    },
    {
      RelX: -0.5,
      RelY: 1
    },
    {
      RelX: 0,
      RelY: 1
    },
    {
      RelX: 0.5,
      RelY: 1
    },
    {
      RelX: -1,
      RelY: -0.5
    },
    {
      RelX: -1,
      RelY: 0
    },
    {
      RelX: -1,
      RelY: 0.5
    }
    ];

    var side = {};

    var x, y, perpendicularUnitVector, rotate;
    relXYCombinations.forEach(function(relXYCombination) {
      if (Math.abs(relXYCombination.RelX) === 1) {
        side.sx = relXYCombination.RelX;
        side.sy = 0;
      }
      else {
        side.sx = 0;
        side.sy = relXYCombination.RelY;
      }

      // if rotate has a value, keep the value. Otherwise, it's 0deg.

      rotate = jsonNode.rotate || 0;
      perpendicularUnitVector = getPerpendicularLine(side.sx, side.sy, rotate);

      /*
       * then get line represented by side
       * and then get perpendicular to that line, taking
       * into account rotation
       * */

      ports.push({
        'x': (jsonNode.x + jsonNode.width * (relXYCombination.RelX + 1)/2),
        'y': (jsonNode.y + jsonNode.height * (relXYCombination.RelY + 1)/2),
        'positionRelative':{
          '@context':{
            'position':{
              '@value':'relative'
            }
          },
          'x': 100 * (relXYCombination.RelX + 1)/2 + '%',
          'y': 100 * (relXYCombination.RelY + 1)/2 + '%'
        },
        'dx': perpendicularUnitVector.dx,
        'dy': perpendicularUnitVector.dy,
        '@type':'Port'
      });
    });
    callback(ports);
  };

  // gpmlNode is NOT referring to data nodes exclusively. It is also referring to any other non-edge elements that can have anchors.

  var toPvjson = function(gpmlNode, jsonNode, callback) {
    jsonNode["@type"] = jsonNode["@type"] || [];
    jsonNode["@type"].push("node");

    pathvisiojs.data.gpml.element.toPvjson(gpmlNode, jsonNode, function(jsonNode) {
      callback(jsonNode);
    });

    /*
       var comments = gpmlNode.selectAll('Comment');
       if (comments[0].length > 0) {
       jsonNode.comments = [];
       comments.each(function() {
       jsonNode.comments.push(d3.select(this).text());
       });
       }

    // Be warned that support for zIndex in SVG is spotty (non-existent? TODO check css cross-browser). You should rely on ordering in the DOM.

    var shapeType = gpmlNode.select('Graphics').attr('ShapeType'); 
    if (!shapeType) {

  // To display correctly, a data-node must have a shape type.
  // If no shape type is specified in GPML, this code will
  // make the default be 'rectangle'

  if (jsonNode.nodeType === 'data-node') {
  jsonNode.shapeType = "rectangle";
  }
  else {
  jsonNode.shapeType = "none";
  }
  }
  else {
  jsonNode.shapeType = strcase.paramCase(shapeType);
  }

  var strokeWidth = gpmlNode.select('Graphics').attr('LineThickness'); 
  if (!!strokeWidth) {
  jsonNode.strokeWidth = strokeWidth;
  }

  var attributes = gpmlNode.selectAll('Attribute');
  console.log('attributes');
  console.log(attributes);
  ///*
  var doubleProperty, cellularComponent;
  if (attributes.length > 0) {
  doubleProperty = attributes.filter(function(d, i) {
  console.log('this');
  console.log(this);
  return d3.select(this).attr('Key') === 'org.pathvisio.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
  });
  if (doubleProperty[0].length > 0) {
  jsonNode.shapeType = shapeType + '-double';
  }
  cellularComponent = attributes.filter(function(d, i) {
  return d3.select(this).attr('Key') === 'org.pathvisiojs.CellularComponentProperty' && d3.select(this).attr('Value') != 'None';
  });
  if (cellularComponent[0].length > 0) {
  jsonNode.cellularComponent = cellularComponent.attr('Value');
  }
  }
  //*/
  };

  var getPortCoordinates = function(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  };

  return {
    setJsonBackgroundColor:setJsonBackgroundColor,
    getPorts:getPorts,
    getPortCoordinates:getPortCoordinates,
    toPvjson:toPvjson
  };
}();
