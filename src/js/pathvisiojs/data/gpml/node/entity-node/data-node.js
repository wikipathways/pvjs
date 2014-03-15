pathvisiojs.data.gpml.element.node.entityNode.dataNode = function() {
  'use strict';

  var toPvjson = function(gpmlSelection, dataNodeSelection, callbackInside) {
    var pvjsonPath = {},
      pvjsonText = {};

    var dataNodeType = dataNodeSelection.attr('Type');
    if (!dataNodeType) {
      dataNodeType = 'Unknown';
    }
    pvjsonPath.nodeType = "DataNode";
    pvjsonPath.dataNodeType = dataNodeType;
    pvjsonPath["@type"] = pvjsonPath["@type"] || [];
    pvjsonPath["@type"].push("DataNode");
    pvjsonPath["@type"].push(dataNodeType);

    var database, ID,
      datasourceReference = dataNodeSelection.select('Xref');
    if (!!datasourceReference) {
      database = datasourceReference.attr('Database');
      ID = datasourceReference.attr('ID');
      if (!!database && !!ID) {
        pvjsonPath.DatasourceReference = {};
        pvjsonPath.DatasourceReference.Database = database;
        pvjsonPath.DatasourceReference.ID = ID;
      }
    }

    pathvisiojs.data.gpml.element.toPvjsonNew(gpmlSelection, dataNodeSelection, pvjsonPath, function(pvjsonPath, updatedPvjsonText) {
      pvjsonText = updatedPvjsonText;
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, dataNodeSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
        pvjsonText = updatedPvjsonText;
        if (!!pvjsonPath.DatasourceReference) {
          pvjsonPath.datasourceReference = pvjsonPath.DatasourceReference;
        }

        var pvjsonElements = [pvjsonPath];
        if (!!pvjsonText.textContent) {
          pvjsonElements.push(pvjsonText);
        }
        /*
        console.log('pvjsonPath inside');
        console.log(pvjsonPath);
        console.log('pvjsonText inside');
        console.log(pvjsonText);
        //*/
        callbackInside(pvjsonElements);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();
