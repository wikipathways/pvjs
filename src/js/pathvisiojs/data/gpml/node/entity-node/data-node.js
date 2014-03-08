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
    var pvjsonPath = {},
      pvjsonText = {};

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

        //*
        pathvisiojs.data.gpml.element.toPvjsonNew(gpmlSelection, dataNodeSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
          pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, dataNodeSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
            pvjsonText = updatedPvjsonText;
            if (!!jsonDataNode.DatasourceReference) {
              pvjsonPath.datasourceReference = jsonDataNode.DatasourceReference;
            }
            /*
            console.log('pvjsonPath inside');
            console.log(pvjsonPath);
            console.log('pvjsonText inside');
            console.log(pvjsonText);
            console.log('jsonDataNode inside');
            console.log(jsonDataNode);
            //*/
            callbackInside(jsonDataNode, pvjsonPath, pvjsonText);
          });
        });
        //*/
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();
