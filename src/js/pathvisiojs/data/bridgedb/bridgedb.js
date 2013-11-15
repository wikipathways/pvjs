pathvisiojs.data.bridgedb = function(){
  function getXrefAnnotationDataByDataNode(singleSpecies, node, callback) {
    getDataSources(function(dataSources) {
      var dataSourceRowCorrespondingToDataNodeXrefDatabase = getDataSourceRowByName(node.xRef.database, dataSources);
      var systemCode = dataSourceRowCorrespondingToDataNodeXrefDatabase.systemCode;
      getXrefAliases(singleSpecies, systemCode, node.xRef.id, function(xRefAliases) {
        var currentDataSourceRow;
        var listItems = xRefAliases.map(function(xRefAlias) {
          var listItem = {}
          listItem.title = xRefAlias.dataSourceName;
          listItem.text = xRefAlias.xRefId;
          currentDataSourceRow = getDataSourceRowByName(xRefAlias.dataSourceName, dataSources);
          listItem.priority = currentDataSourceRow.priority;
          if (currentDataSourceRow.hasOwnProperty('linkoutPattern')) {
            if (currentDataSourceRow.linkoutPattern !== "" && currentDataSourceRow.linkoutPattern !== null) {
              listItem.uri = currentDataSourceRow.linkoutPattern.replace('$id', node.xRef.id);
            }
          }
          return listItem;
        });

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

        // We want the identifier that was listed by the pathway creator for this data node to be listed first.

        var specifiedListItem = nestedListItems.filter(function(element) {return (element.key == node.xRef.database);})[0];
        var currentListItemIndex = nestedListItems.indexOf(specifiedListItem);
        nestedListItems = pathvisiojs.utilities.moveArrayItem(nestedListItems, currentListItemIndex, 0);

        var specifiedXRefId = specifiedListItem.values.filter(function(element) {return (element.text == node.xRef.id);})[0];
        var currentXRefIdIndex = specifiedListItem.values.indexOf(specifiedXRefId);
        specifiedListItem.values = pathvisiojs.utilities.moveArrayItem(specifiedListItem.values, currentXRefIdIndex, 0);

        var annotationData = {
          "header": node.textLabel.text,
          "description": node.dataNodeType,
          "listItems": nestedListItems
        };
        callback(annotationData);
      });
    });
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
    d3.tsv("http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php?target=datasources")
    .row(function(d) { return {dataSourceName: d.datasource_name, systemCode: d.system_code, websiteUrl: d.website_url, linkoutPattern: d.linkout_pattern, exampleIdentifier: d.example_identifier, entityIdentified: d.entity_identified, singleSpecies: d.single_species, priority: d.identifier_type, uri: d.uri, regex: d.regex, officialName: d.official_name}; })
    .get(function(error, rows) {
      callback(rows);
    });
  }

  function getXrefAliases(singleSpecies, systemCode, xRefId, callback) {
    var bridgedbUrl = 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php?single_species=' + encodeURIComponent(singleSpecies) + '&system_code=' + encodeURIComponent(systemCode) + '&id=' + encodeURIComponent(xRefId);
    d3.tsv(bridgedbUrl)
    .row(function(d) { return {xRefId: d.id, dataSourceName: d.datasource_name}; })
    .get(function(error, rows) {
      callback(rows);
    });
  }

  return {
    getXrefAnnotationDataByDataNode:getXrefAnnotationDataByDataNode
  };
}();
