pathvisiojs.data.gpml.element.node.entityNode.dataNode = function() {

  var defaults = {
    'Color':'000000',
    'FillColor':'ffffff',
    'FontSize':10,
    'FontWeight':'Normal',
    'LineStyle':'Solid',
  };

  /*
  var defaultsByType = {};

  defaultsByType.Complex = Object.create(defaults);
  defaultsByType.GeneProduct = Object.create(defaults);

  defaultsByType.Metabolite = Object.create(defaults);
  defaultsByType.Metabolite.Color = '0000ff';

  defaultsByType.Pathway = Object.create(defaults);
  defaultsByType.Pathway.Color = '14961e';
  defaultsByType.Pathway.FontSize = '12';
  defaultsByType.Pathway.FontWeight = 'Bold';

  defaultsByType.Protein = Object.create(defaults);
  defaultsByType.Rna = Object.create(defaults);
  defaultsByType.Unknown = Object.create(defaults);
  //*/

  var toPvjson = function(gpmlDataNode, pathwayIri, callbackInside) {
    'use strict';
    var jsonDataNode = {};
    var dataNodeType = gpmlDataNode.attr('Type');
    if (!dataNodeType) {
      dataNodeType = 'Unknown';
    }
    jsonDataNode.nodeType = "DataNode";
    jsonDataNode.dataNodeType = dataNodeType;
    jsonDataNode["@type"] = jsonDataNode["@type"] || [];
    jsonDataNode["@type"].push("DataNode");
    jsonDataNode["@type"].push(dataNodeType);

    //var defaultsForThisDataNode = defaultsByType[dataNodeType];

    pathvisiojs.data.gpml.element.node.entityNode.toPvjson(gpmlDataNode, jsonDataNode, defaults, pathwayIri, function(jsonDataNode) {
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
      pathvisiojs.data.gpml.text.toPvjson(gpmlDataNode, defaults, function(text) {
        if (!!text) {
          jsonDataNode.text = text;
        }

        var gpmlLineStyle = gpmlDataNode.select('Graphics').attr('LineStyle') || defaults.LineStyle;
        jsonDataNode = pathvisiojs.data.gpml.setBorderStyleAsJsonNew(jsonDataNode, gpmlLineStyle);
        
        var gpmlColor = gpmlDataNode.select('Graphics').attr('Color') || defaults.Color;
        jsonDataNode = pathvisiojs.data.gpml.setColorAsJsonNew(jsonDataNode, gpmlColor);

        var gpmlFillColor = gpmlDataNode.select('Graphics').attr('FillColor') || defaults.FillColor;
        jsonDataNode = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonDataNode, gpmlFillColor);
        callbackInside(jsonDataNode);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();
