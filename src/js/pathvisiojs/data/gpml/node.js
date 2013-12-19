// includes GPML elements of type EntityNode and Group

pathvisiojs.data.gpml.node = function(){

  function setJsonBackgroundColor(jsonNode, currentGpmlFillColorValue, defaultGpmlFillColorValue) {
    var jsonBackgroundColor;
    if (currentGpmlFillColorValue !== defaultGpmlFillColorValue) {
      jsonBackgroundColor = pathvisiojs.data.gpml.getColor(currentGpmlFillColorValue, defaultGpmlFillColorValue);
      jsonNode.backgroundColor = jsonBackgroundColor;
    }
    return jsonNode;
  }

  function getPerpendicularLine(sx, sy, rotate) {
    var rad = rotate * Math.PI/180;
    var sideAngleRotation = 2 * Math.PI - rad;
    var dx, dy;
    var sideAngleBeforeRotate = Math.atan2(sy, sx);
    var dx = Math.cos(sideAngleBeforeRotate + sideAngleRotation - Math.PI/2);
    var dy = Math.sin(sideAngleBeforeRotate + sideAngleRotation - Math.PI/2);
    return {'dx': dx, 'dy': dy};
  }

  function getPorts(jsonNode, callback) {
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
  }

  // TODO What happens if we have right to left flowing text?

  var alignToAnchorMappings = { "Left":"start", "Center":"middle", "Right":"end" };

  // gpmlNode is NOT referring to data nodes exclusively. It is also referring to any other non-edge elements that can have anchors.

  function toRenderableJson(gpmlNode, jsonNode, callback) {
    try {
      /*
      var comments = gpmlNode.selectAll('Comment');
      if (comments[0].length > 0) {
        jsonNode.comments = [];
        comments.each(function() {
          jsonNode.comments.push(d3.select(this).text());
        });
      }

      // Be warned that support for zIndex in SVG is spotty (non-existent? TODO check css cross-browser). You should rely on ordering in the DOM.

      var zIndex = gpmlNode.select('Graphics').attr('ZOrder');
      if (!!zIndex) {
        jsonNode.zIndex = parseFloat(zIndex);
      }

      var centerX = parseFloat(gpmlNode.select('Graphics').attr('CenterX'));
      jsonNode.width = parseFloat(gpmlNode.select('Graphics').attr('Width'));
      jsonNode.x = centerX - jsonNode.width/2;

      var centerY = parseFloat(gpmlNode.select('Graphics').attr('CenterY'));
      jsonNode.height = parseFloat(gpmlNode.select('Graphics').attr('Height'));
      jsonNode.y = centerY - jsonNode.height/2;

      jsonNode.id = gpmlNode.attr('GraphId');

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



      // BiopaxRefs 

      try {
        if (element.hasOwnProperty('biopaxRef')) {
          element.biopaxRefs = pathvisiojs.utilities.convertToArray( element.biopaxRef );
          delete element.biopaxRef;

          //biopaxRefs.forEach(function(element, index, array) {
          // do something
          //});
        }
        else {
          console.log("No element(s) named 'biopaxRef' found for this node in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting node's biopaxRef to json: " + e.message);
      }

      delete element.graphics;
      //*/

      callback(jsonNode, jsonPorts);
      //*/
    }
    catch (e) {
      console.log("Error converting node to json: " + e.message);
      return e;
    }
  }

  function getPortCoordinates(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  }

  return {
    toRenderableJson:toRenderableJson,
    getPortCoordinates:getPortCoordinates,
    getPorts:getPorts,
    setJsonBackgroundColor:setJsonBackgroundColor
  };
}();
