pathvisiojs.data.gpml.dataNode = function() {

  var pathvisioDefaultStyleValues = {
    'GeneProduct':{
      'LineStyle':null,
      'Color':null,
      'FillColor':null,
      'FontSize':10,
      'FontWeight':null
    },
    'Protein':{
      'LineStyle':null,
      'Color':null,
      'FillColor':null,
      'FontSize':10,
      'FontWeight':null
    },
    'Rna':{
      'LineStyle':null,
      'Color':null,
      'FillColor':null,
      'FontSize':10,
      'FontWeight':null
    },
    'Unknown':{
      'LineStyle':null,
      'Color':null,
      'FillColor':null,
      'FontSize':10,
      'FontWeight':null
    },
    'Pathway':{
      'LineStyle':null,
      'Color':'14961e',
      'FillColor':null,
      'FontSize':12,
      'FontWeight':'Bold'
    },
    'Metabolite':{
      'LineStyle':null,
      'Color':'0000ff',
      'FillColor':null,
      'FontSize':10,
      'FontWeight':null
    }
  }


  function toRenderableJson(gpmlDataNode, pathwayIri, callbackInside) {
    try {
      pathvisiojs.data.gpml.entityNode.toRenderableJson(gpmlDataNode, pathwayIri, function(jsonDataNode) {
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
        dataNodeType = gpmlDataNode.attr('Type');
        if (!dataNodeType) {
          dataNodeType = 'Unknown';
        }
        jsonDataNode.nodeType = "DataNode";
        jsonDataNode.dataNodeType = dataNodeType;
        jsonDataNode["@type"].push(dataNodeType);

        pathvisiojs.data.gpml.text.toRenderableJson(gpmlDataNode, pathvisioDefaultStyleValues[dataNodeType], function(text) {
          if (!!text) {
            jsonDataNode.text = text;
          }

          jsonDataNode = pathvisiojs.data.gpml.setBorderStyleAsJson(jsonDataNode,
                        gpmlDataNode.select('Graphics').attr('LineStyle'),
                        pathvisioDefaultStyleValues[dataNodeType].LineStyle);

          jsonDataNode = pathvisiojs.data.gpml.setColorAsJson(jsonDataNode,
                        gpmlDataNode.select('Graphics').attr('Color'),
                        pathvisioDefaultStyleValues[dataNodeType].Color);

          jsonDataNode = pathvisiojs.data.gpml.node.setJsonBackgroundColor(jsonDataNode,
                        gpmlDataNode.select('Graphics').attr('FillColor'),
                        pathvisioDefaultStyleValues[dataNodeType].FillColor);

          callbackInside(jsonDataNode);
        });
      });
    }
    catch (e) {
      throw new Error("Error converting DataNode or Port to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
