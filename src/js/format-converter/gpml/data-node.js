pathvisiojs.formatConverter.gpml.dataNode = function() {
  'use strict';

  var toPvjson = function(pathway, gpmlSelection, dataNodeSelection, callbackInside) {
    var pvjsonPath = {};
    var dataNodeType = dataNodeSelection.attr('Type');
    if (!dataNodeType) {
      dataNodeType = 'Unknown';
    }
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = 'DataNode';
    pvjsonPath.dataNodeType = dataNodeType;
    pvjsonPath['@type'] = pvjsonPath['@type'] || [];
    pvjsonPath['@type'].push('DataNode');
    pvjsonPath['@type'].push(dataNodeType);



    pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, dataNodeSelection, pvjsonPath, function(pvjsonPath) {
      pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, dataNodeSelection, pvjsonPath, function(pvjsonPath) {
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
          }
        }

        var pvjsonElements = [pvjsonPath];
        callbackInside(pvjsonElements);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();
