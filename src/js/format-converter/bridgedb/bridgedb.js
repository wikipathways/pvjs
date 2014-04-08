pathvisiojs.formatConverter.bridgedb = function(){
  'use strict';

  function getXrefAnnotationDataByDataNode(singleSpecies, id, datasource, label, desc, callback) {
    //For unannotated nodes, without datasource or identifier
    if (null === id || null === datasource){
        var annotationData = {
          "header": label,
          "description": desc,
          "listItems": ['Missing ID and datasource']
        };
        callback(annotationData);
    }
    else {
    getDataSources(function(dataSources) {
      var dataSourceRowCorrespondingToDataNodeXrefDatabase = getDataSourceRowByName(datasource, dataSources);
      var systemCode = dataSourceRowCorrespondingToDataNodeXrefDatabase.systemCode;
      getXrefAliases(singleSpecies, systemCode, id, function(xRefAliases) {
        var currentDataSourceRow;
        var listItems = [];
        if (typeof xRefAliases != 'undefined') { //BridgeDb Error
        listItems = xRefAliases.map(function(xRefAlias) {
          var listItem = {};
          listItem.title = xRefAlias.dataSourceName;
          listItem.text = xRefAlias.xRefId;
          currentDataSourceRow = getDataSourceRowByName(xRefAlias.dataSourceName, dataSources);
          listItem.priority = currentDataSourceRow.priority;
          if (currentDataSourceRow.hasOwnProperty('linkoutPattern')) {
            if (currentDataSourceRow.linkoutPattern !== "" && currentDataSourceRow.linkoutPattern !== null) {
              listItem.uri = currentDataSourceRow.linkoutPattern.replace('$id', listItem.text);
            }
          }
          return listItem;
        });
        }

        listItems.sort(function(a, b) {
          if (a.priority === b.priority)
          {
              var x = a.title.toLowerCase(), y = b.title.toLowerCase();
              
              return x < y ? -1 : x > y ? 1 : 0;
          }
          return b.priority - a.priority;
        });

        var nestedListItems = d3.nest()
        .key(function(d) { return d.title; })
        .entries(listItems);

        // handle case where nothing is returned by bridgedb webservice
        if (nestedListItems.length === 0){
          var uri = "";
          var ds = getDataSourceRowByName(datasource, dataSources);
           if (ds.hasOwnProperty('linkoutPattern')) {
             if (ds.linkoutPattern !== "" && ds.linkoutPattern !== null) {
               uri = ds.linkoutPattern.replace('$id', id);
             }
           }
          nestedListItems = [{"key": datasource, "values":[{"priority": "1","text": id,"title": datasource,"uri":uri}]}];
        }

        // We want the identifier that was listed by the pathway creator for this data node to be listed first.

        var specifiedListItem = nestedListItems.filter(function(element) {return (element.key == datasource);})[0];
        var currentListItemIndex = nestedListItems.indexOf(specifiedListItem);
        nestedListItems = pathvisiojs.utilities.moveArrayItem(nestedListItems, currentListItemIndex, 0);

        var specifiedXRefId = specifiedListItem.values.filter(function(element) {return (element.text == id);})[0];
        var currentXRefIdIndex = specifiedListItem.values.indexOf(specifiedXRefId);
        specifiedListItem.values = pathvisiojs.utilities.moveArrayItem(specifiedListItem.values, currentXRefIdIndex, 0);

        var annotationData = {
          "header": label,
          "description": desc,
          "listItems": nestedListItems
        };
        callback(annotationData);
      });
    });
   }
  }

  function getDataSourceRowByName(dataSourceName, dataSources) {
    var regexp = /[^\w]/gi;
    var dataSourceRow = dataSources.filter(function(row) { return row.dataSourceName === dataSourceName; })[0];
    if (!dataSourceRow) {
      dataSourceRow = dataSources.filter(function(row) { return row.dataSourceName.replace(regexp, '').toLowerCase() === dataSourceName.replace(regexp, '').toLowerCase(); })[0];
    }
    return dataSourceRow;
  }

  function getDataSources(callback) {
    d3.tsv(pathvisiojs.config.bridgedbDatasources)
    .response(function(request) {
      return d3.tsv.parseRows(request.responseText, function(d) {
        return {dataSourceName: d[0], systemCode: d[1], websiteUri: d[2], linkoutPattern: d[3], exampleIdentifier: d[4], entityIdentified: d[5], singleSpecies: d[6], priority: d[7], uri: d[8], regex: d[9], officialName: d[10]};
      });
    })
    .get(function(error, rows) {
      callback(rows);
    });
  }

  function getXrefAliases(singleSpecies, systemCode, xRefId, callback) {
    var bridgedbUri = pathvisiojs.config.bridgedbLinkOutsUriStub + encodeURIComponent(singleSpecies) + '/xrefs/' + encodeURIComponent(systemCode) + '/' + encodeURIComponent(xRefId);
    //console.log(bridgedbUri);
    d3.tsv(bridgedbUri)
    .response(function(request) {
      return d3.tsv.parseRows(request.responseText, function(d) {
        return {xRefId: d[0], dataSourceName: d[1]};
      });
    })
    .get(function(error, rows) {
      callback(rows);
    });
  }

  return {
    getXrefAnnotationDataByDataNode:getXrefAnnotationDataByDataNode
  };
}();
