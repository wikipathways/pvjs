pathvisiojs.data.gpml.element.node.entityNode.dataNode = function() {
  'use strict';

  var defaults = {
    'Color':'000000',
    'FillColor':'ffffff',
    'FontSize':10,
    'FontWeight':'Normal',
    'LineStyle':'Solid',
    'LineThickness':1
  };

  var toPvjson = function(gpmlSelection, dataNodeSelection, callbackInside) {
    var jsonPath = {},
      pvjsonText = {};

      // This works when I just process the graphics attributes, but the one below, which processes both the element attributes and the graphics attributes, does not. 
      //*
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, dataNodeSelection, jsonPath, pvjsonText, function(jsonPath, updatedPvjsonText) {
        pvjsonText = updatedPvjsonText;
        console.log('jsonPath');
        console.log(jsonPath);
        console.log(pvjsonText);
      });
      //*/

    /*
    pathvisiojs.data.gpml.element.toPvjsonNew(gpmlSelection, dataNodeSelection, jsonPath, function(jsonPath, updatedPvjsonText) {
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, dataNodeSelection, jsonPath, updatedPvjsonText, function(jsonPath, updatedPvjsonText) {
        pvjsonText = updatedPvjsonText;
        console.log('jsonPath');
        console.log(jsonPath);
        console.log(pvjsonText);
      });
    });
    //*/

    var jsonDataNode = {};
    var dataNodeType = dataNodeSelection.attr('Type');
    if (!dataNodeType) {
      dataNodeType = 'Unknown';
    }
    jsonDataNode.nodeType = "DataNode";
    jsonDataNode.dataNodeType = dataNodeType;
    jsonDataNode["@type"] = jsonDataNode["@type"] || [];
    jsonDataNode["@type"].push("DataNode");
    jsonDataNode["@type"].push(dataNodeType);

    pathvisiojs.data.gpml.element.node.entityNode.toPvjson(dataNodeSelection, jsonDataNode, function(jsonDataNode) {
      var database, ID,
        datasourceReference = dataNodeSelection.select('Xref');
      if (!!datasourceReference) {
        database = datasourceReference.attr('Database');
        ID = datasourceReference.attr('ID');
        if (!!database && !!ID) {
          jsonDataNode.DatasourceReference = {};
          jsonDataNode.DatasourceReference.Database = database;
          jsonDataNode.DatasourceReference.ID = ID;
        }
      }
      pathvisiojs.data.gpml.text.toPvjson(dataNodeSelection, defaults, function(text) {
        if (!!text) {
          jsonDataNode.text = text;
        }

        var gpmlLineStyle = dataNodeSelection.select('Graphics').attr('LineStyle') || defaults.LineStyle;
        jsonDataNode = pathvisiojs.data.gpml.setBorderStyleAsJsonNew(jsonDataNode, gpmlLineStyle);
        
        var gpmlColor = dataNodeSelection.select('Graphics').attr('Color') || defaults.Color;
        jsonDataNode = pathvisiojs.data.gpml.setColorAsJsonNew(jsonDataNode, gpmlColor);

        var gpmlFillColor = dataNodeSelection.select('Graphics').attr('FillColor') || defaults.FillColor;
        jsonDataNode = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonDataNode, gpmlFillColor);
        callbackInside(jsonDataNode, jsonPath, pvjsonText);
      });
    });
  };

  return {
    toPvjson:toPvjson,
    makeExplicit:makeExplicit
  };
}();
