pathvisiojs.data.gpml.element.node.entityNode.dataNode = function() {

  var pathvisioDefaultStyleValues = {
    'DataNode':{
      'LineStyle':null,
      'FillColor':null,
      'Complex':{
        'Color':null,
        'FontSize':10,
        'FontWeight':null
      },
      'GeneProduct':{
        'Color':null,
        'FontSize':10,
        'FontWeight':null
      },
      'Metabolite':{
        'Color':'0000ff',
        'FontSize':10,
        'FontWeight':null
      },
      'Pathway':{
        'Color':'14961e',
        'FontSize':12,
        'FontWeight':'Bold'
      },
      'Protein':{
        'Color':null,
        'FontSize':10,
        'FontWeight':null
      },
      'Rna':{
        'Color':null,
        'FontSize':10,
        'FontWeight':null
      },
      'Unknown':{
        'Color':null,
        'FontSize':10,
        'FontWeight':null
      }
    }
  }

  var defaults = {
    'Color':'000000',
    'FillColor':'ffffff',
    'FontSize':10,
    'FontWeight':'Normal',
    'LineStyle':'Solid',
  };

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

    var thisPathvisioDefaultStyleValues = pathvisiojs.utilities.collect(pathvisioDefaultStyleValues.DataNode, pathvisioDefaultStyleValues.DataNode[dataNodeType]);

    pathvisiojs.data.gpml.element.node.entityNode.toPvjson(gpmlDataNode, jsonDataNode, thisPathvisioDefaultStyleValues, pathwayIri, function(jsonDataNode) {
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
      pathvisiojs.data.gpml.text.toPvjson(gpmlDataNode, thisPathvisioDefaultStyleValues, function(text) {
        if (!!text) {
          jsonDataNode.text = text;
        }
        jsonDataNode = pathvisiojs.data.gpml.setBorderStyleAsJson(jsonDataNode,
                                                                  gpmlDataNode.select('Graphics').attr('LineStyle'),
                                                                  thisPathvisioDefaultStyleValues.LineStyle);
        
        jsonDataNode = pathvisiojs.data.gpml.setColorAsJson(jsonDataNode,
                                                            gpmlDataNode.select('Graphics').attr('Color'),
                                                            thisPathvisioDefaultStyleValues.Color);

        var jsonBackgroundColor = gpmlDataNode.select('Graphics').attr('FillColor') || defaultsByType[dataNodeType].FillColor;
        jsonDataNode.backgroundColor = jsonBackgroundColor;
        callbackInside(jsonDataNode);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();
