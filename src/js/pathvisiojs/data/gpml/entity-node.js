pathvisiojs.data.gpml.entityNode = function() {
  function getPerpendicularLine3(sx, sy, rotate) {
    var rad = rotate * Math.PI/180;
    var sideAngleRotation = 2 * Math.PI - rad;
    var dx, dy;
    var sideAngleBeforeRotate = Math.atan2(sy, sx);
    var dx = Math.cos(sideAngleBeforeRotate + sideAngleRotation - Math.PI/2);
    var dy = Math.sin(sideAngleBeforeRotate + sideAngleRotation - Math.PI/2);
    return {'dx': dx, 'dy': dy};
  }

  function toRenderableJson(gpmlEntityNode, pathwayIri, entityNodeCallback) {
    try {
      jsonEntityNode = {};
      pathvisiojs.data.gpml.text.toRenderableJson(gpmlEntityNode, function(text) {
        if (!!text) {
          jsonEntityNode.text = text;
        }
      });
      graphId = gpmlEntityNode.attr('GraphId') || ('id' + uuid.v4());
      jsonEntityNode["@id"] = pathwayIri + graphId;
      jsonEntityNode.GraphId = graphId;

      var isContainedBy = gpmlEntityNode.attr('GroupRef');
      if (!!isContainedBy) {
        jsonEntityNode.isContainedBy = pathwayIri + isContainedBy;
      }

      shapeType = gpmlEntityNode.select('Graphics').attr('ShapeType') || 'rectangle';
      if (shapeType === 'None') {
        shapeType = 'rectangle';
      }
      shapeType = strcase.paramCase(shapeType);
      jsonEntityNode.ShapeType = shapeType;
      jsonEntityNode.zIndex = parseFloat(gpmlEntityNode.select('Graphics').attr('ZOrder'));
      jsonEntityNode.renderableType = 'entityNode';
      dataNodeType = gpmlEntityNode.attr('Type');
      jsonEntityNode.nodeType = "EntityNode";
      jsonEntityNode["@type"] = [
        "element",
        "node",
        "entityNode",
        shapeType,
        "EntityNode",
        isContainedBy || 'notGrouped'
      ];

      var linestyle = gpmlEntityNode.select('Graphics').attr('LineStyle') || 'Solid';
      jsonEntityNode.LineStyle = linestyle;

      var color;
      var colorValue = gpmlEntityNode.select('Graphics').attr('Color');
      if (!!colorValue) {
        color = new RGBColor(colorValue);
        if (color.ok) {
          jsonEntityNode.color = color.toHex();
        }
        else {
          console.warn('Invalid Color encountered. Setting Color to black.');
          jsonEntityNode.color = "#000000";
        }
      }

      jsonEntityNode.borderColor = jsonEntityNode.color;

      var backgroundColor;
      var backgroundColorValue = gpmlEntityNode.select('Graphics').attr('FillColor');
      if (!!backgroundColorValue) {
        backgroundColor = new RGBColor(backgroundColorValue);
        if (backgroundColor.ok) {
          jsonEntityNode.backgroundColor = backgroundColor.toHex();
        }
        else {
          console.warn('Invalid backgroundColor encountered. Setting backgroundColor to black.');
          jsonEntityNode.backgroundColor = "#000000";
        }
      }

      var borderWidth = gpmlEntityNode.select('Graphics').attr('LineThickness') || 1;
      jsonEntityNode.borderWidth = parseFloat(borderWidth);

      // the width and height values are not clearly specified in GPML, but the closest
      // I could come up with for interpreting them as actually rendered in PathVisio (Java)
      // at scales in common use is that gpmlWidth = elementWidth + elementPadding + elementBorderWidth (on each side)
      // with a similar calculation for gpmlHeight

      var gpmlWidth = parseFloat(gpmlEntityNode.select('Graphics').attr('Width'));
      jsonEntityNode.width = gpmlWidth + jsonEntityNode.borderWidth;

      var gpmlHeight = parseFloat(gpmlEntityNode.select('Graphics').attr('Height'));
      jsonEntityNode.height = gpmlHeight + jsonEntityNode.borderWidth;

      var centerX = parseFloat(gpmlEntityNode.select('Graphics').attr('CenterX'));
      jsonEntityNode.x = centerX - gpmlWidth/2;
      var centerY = parseFloat(gpmlEntityNode.select('Graphics').attr('CenterY'));
      jsonEntityNode.y = centerY - gpmlHeight/2;

      jsonEntityNode.padding = "0.5em";

      var rotate = gpmlEntityNode.attr('Rotation') || 0;
      jsonEntityNode.rotate = rotate + 'deg';

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

      var x, y, perpendicularUnitVector;
      relXYCombinations.forEach(function(relXYCombination) {
        if (Math.abs(relXYCombination.RelX) === 1) {
          side.sx = relXYCombination.RelX;
          side.sy = 0;
        }
        else {
          side.sx = 0;
          side.sy = relXYCombination.RelY;
        }

        perpendicularUnitVector = getPerpendicularLine3(side.sx, side.sy, rotate);

        /*
         * then get line represented by side
         * and then get perpendicular to that line, taking
         * into account rotation
         * */

        ports.push({
          'x': (jsonEntityNode.x + jsonEntityNode.width * (relXYCombination.RelX + 1)/2),
          'y': (jsonEntityNode.y + jsonEntityNode.height * (relXYCombination.RelY + 1)/2),
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
      jsonEntityNode.Port = ports;
      entityNodeCallback(jsonEntityNode);
    }
    catch (e) {
      throw new Error("Error converting EntityNode or Port to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
