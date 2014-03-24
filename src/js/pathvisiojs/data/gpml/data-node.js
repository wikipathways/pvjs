pathvisiojs.data.gpml.dataNode = function() {
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



    pathvisiojs.data.gpml.element.toPvjsonNew(gpmlSelection, dataNodeSelection, pvjsonPath, function(pvjsonPath, updatedPvjsonText) {
      pvjsonText = updatedPvjsonText;
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, dataNodeSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
        pvjsonText = updatedPvjsonText;

        var database, id, datasourceReference,
          datasourceReferenceSelection = dataNodeSelection.select('Xref');
        if (!!datasourceReferenceSelection) {
          database = datasourceReferenceSelection.attr('Database');
          id = datasourceReferenceSelection.attr('ID');
          if (!!database && !!id) {
            datasourceReference = {};
            datasourceReference.database = database;
            datasourceReference.id = id;
            datasourceReference.organism = gpmlSelection.attr('Organism');
            pvjsonPath.datasourceReference = datasourceReference;
            pvjsonText.datasourceReference = datasourceReference;
          }
        }

        var pvjsonElements = [pvjsonPath];
        if (!!pvjsonText.textContent) {
          pvjsonElements.push(pvjsonText);
        }
        callbackInside(pvjsonElements);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();
