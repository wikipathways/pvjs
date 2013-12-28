"use strict";

pathvisiojs.data.gpml.element.node.entityNode.dataNode = Object.create(pathvisiojs.data.gpml.element.node.entityNode);

var pathvisioDefaultStyleValues = {
  'DataNode':{
    'LineStyle':null,
    'FillColor':null,
    'GeneProduct':{
      'Color':null,
      'FontSize':10,
      'FontWeight':null
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
    },
    'Pathway':{
      'Color':'14961e',
      'FontSize':12,
      'FontWeight':'Bold'
    },
    'Metabolite':{
      'Color':'0000ff',
      'FontSize':10,
      'FontWeight':null
    }
  }
}

pathvisiojs.data.gpml.element.node.entityNode.dataNode.toRenderableJson = function(gpmlDataNode, pathwayIri, callbackInside) {
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

  pathvisiojs.data.gpml.element.node.entityNode.toRenderableJson(gpmlDataNode, jsonDataNode, thisPathvisioDefaultStyleValues, pathwayIri, function(jsonDataNode) {
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
    pathvisiojs.data.gpml.text.toRenderableJson(gpmlDataNode, thisPathvisioDefaultStyleValues, function(text) {
      if (!!text) {
        jsonDataNode.text = text;
      }

      jsonDataNode = pathvisiojs.data.gpml.setBorderStyleAsJson(jsonDataNode,
                                                                gpmlDataNode.select('Graphics').attr('LineStyle'),
                                                                thisPathvisioDefaultStyleValues.LineStyle);

                                                                jsonDataNode = pathvisiojs.data.gpml.setColorAsJson(jsonDataNode,
                                                                                                                    gpmlDataNode.select('Graphics').attr('Color'),
                                                                                                                    thisPathvisioDefaultStyleValues.Color);

                                                                                                                    jsonDataNode = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonDataNode,
                                                                                                                                                                                     gpmlDataNode.select('Graphics').attr('FillColor'),
                                                                                                                                                                                     thisPathvisioDefaultStyleValues.FillColor);

                                                                                                                                                                                     callbackInside(jsonDataNode);
    });
  });
}
