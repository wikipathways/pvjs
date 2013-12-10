pathvisiojs.data.gpml.dataNode = function() {
  function toRenderableJson(gpmlDataNode, pathwayIri, callbackInside) {
    try {
      var jsonDataNode = {};
      graphId = gpmlDataNode.attr('GraphId') || ('id' + uuid.v4());
      jsonDataNode["@id"] = pathwayIri + "#" + graphId;
      jsonDataNode.GraphId = graphId;
      var groupRef = gpmlDataNode.attr('GroupRef');
      if (!!groupRef) {
        jsonDataNode.GroupRef = groupRef;
        jsonDataNode.dependsOn = [pathwayIri + "#" + groupRef];
      }
      var database, ID, 
        datasourceReference = gpmlDataNode.select('Xref');
      if (!!datasourceReference) {
        database = datasourceReference.attr('Database')
        ID = datasourceReference.attr('ID')
        if (!!database && !!ID) {
          jsonDataNode.DatasourceReference = {};
          jsonDataNode.DatasourceReference.Database = database;
          jsonDataNode.DatasourceReference.ID = ID;
        }
      }
      shapeType = gpmlDataNode.select('Graphics').attr('ShapeType') || 'rectangle';
      shapeType = strcase.paramCase(shapeType);
      jsonDataNode.ShapeType = shapeType;
      jsonDataNode.zIndex = parseFloat(gpmlDataNode.select('Graphics').attr('ZOrder'));
      jsonDataNode.renderableType = 'entityNode';
      dataNodeType = gpmlDataNode.attr('Type');
      jsonDataNode.nodeType = "DataNode";
      jsonDataNode.dataNodeType = dataNodeType;
      jsonDataNode["@type"] = [
        "element",
        "node",
        "entityNode",
        shapeType,
        "DataNode",
        dataNodeType,
        groupRef || 'notGrouped'
      ];

      pathvisiojs.data.gpml.text.toRenderableJson(gpmlDataNode, function(text) {
        jsonDataNode.text = text;
      });
      var linestyle = gpmlDataNode.select('Graphics').attr('LineStyle') || 'Solid';
      jsonDataNode.LineStyle = linestyle;

      var color;
      var colorValue = gpmlDataNode.select('Graphics').attr('Color');
      if (!!colorValue) {
        color = new RGBColor(colorValue);
        if (color.ok) {
          jsonDataNode.color = color.toHex();
        }
        else {
          console.warn('Invalid Color encountered. Setting Color to black.');
          jsonDataNode.color = "#000000";
        }
      }

      jsonDataNode.borderColor = jsonDataNode.color;

      var backgroundColor;
      var backgroundColorValue = gpmlDataNode.select('Graphics').attr('FillColor');
      if (!!backgroundColorValue) {
        backgroundColor = new RGBColor(backgroundColorValue);
        if (backgroundColor.ok) {
          jsonDataNode.backgroundColor = backgroundColor.toHex();
        }
        else {
          console.warn('Invalid backgroundColor encountered. Setting backgroundColor to black.');
          jsonDataNode.backgroundColor = "#000000";
        }
      }

      var borderWidth = gpmlDataNode.select('Graphics').attr('LineThickness') || 1;
      jsonDataNode.borderWidth = parseFloat(borderWidth);

      // the width and height values are not clearly specified in GPML, but the closest
      // I could come up with for interpreting them as actually rendered in PathVisio (Java)
      // at scales in common use is that gpmlWidth = elementWidth + elementPadding + elementBorderWidth (on each side)
      // with a similar calculation for gpmlHeight

      var gpmlWidth = parseFloat(gpmlDataNode.select('Graphics').attr('Width'));
      jsonDataNode.width = gpmlWidth + jsonDataNode.borderWidth;

      var gpmlHeight = parseFloat(gpmlDataNode.select('Graphics').attr('Height'));
      jsonDataNode.height = gpmlHeight + jsonDataNode.borderWidth;

      var centerX = parseFloat(gpmlDataNode.select('Graphics').attr('CenterX'));
      jsonDataNode.x = centerX - gpmlWidth/2;
      var centerY = parseFloat(gpmlDataNode.select('Graphics').attr('CenterY'));
      jsonDataNode.y = centerY - gpmlHeight/2;

      jsonDataNode.padding = "0.5em";

      var ports = [];
      console.log('hey');
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

      var dx, dy;
      relXYCombinations.forEach(function(relXYCombination) {
        dx = (relXYCombination.RelX + 1)/2;
        dy = (relXYCombination.RelY + 1)/2;

        ports.push({
          'x': (jsonDataNode.x + jsonDataNode.width * dx),
          'y': (jsonDataNode.y + jsonDataNode.height * dy),
          'dx': (relXYCombination.RelX + 0.5)/2,
          'dy': (relXYCombination.RelY + 0.5)/2,
          '@type':'Port'
        }); 
        console.log('ports');
        console.log(ports);
      }); 


      callbackInside(jsonDataNode, ports);
    }
    catch (e) {
      throw new Error("Error converting DataNode or Port to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
