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

  var makeExplicit = function(gpmlSelection) {
    var dataNodesSelection = gpmlSelection.selectAll('DataNode');
    dataNodesSelection.filter(function(){
      return (!d3.select(this).select('Graphics').attr('ShapeType'));
    }).each(function(DataNode){
      d3.select(this).select('Graphics').attr('ShapeType', 'Rectangle');
    });

    dataNodesSelection.filter(function(){
      return (!d3.select(this).select('Graphics').attr('Color'));
    }).each(function(DataNode){
      d3.select(this).select('Graphics').attr('Color', '000000');
    });

    dataNodesSelection.filter(function(){
      return (!d3.select(this).select('Graphics').attr('FillColor'));
    }).each(function(DataNode){
      d3.select(this).select('Graphics').attr('FillColor', 'ffffff');
    });

    dataNodesSelection.filter(function(){
      return (!d3.select(this).select('Graphics').attr('LineThickness'));
    }).each(function(DataNode){
      d3.select(this).select('Graphics').attr('LineThickness', 1);
    });

    dataNodesSelection.filter(function(){
      return (!d3.select(this).select('Graphics').attr('ZOrder'));
    }).each(function(DataNode){
      d3.select(this).select('Graphics').attr('ZOrder', 10000);
    });

    dataNodesSelection.filter(function(){
      return (!d3.select(this).select('Graphics').attr('Valign'));
    }).each(function(DataNode){
      d3.select(this).select('Graphics').attr('Valign', 'Top');
    });
    return gpmlSelection;
  };

  var toPvjson = function(gpmlSelection, dataNodeSelection, callbackInside) {
    var jsonPath = {},
      pvjsonText;
    pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, dataNodeSelection, jsonPath, function(jsonPath, updatedPvjsonText) {
      pvjsonText = updatedPvjsonText;
      console.log('jsonPath');
      console.log(jsonPath);
      console.log(pvjsonText);
    });

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
