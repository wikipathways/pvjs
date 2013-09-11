pathvisio.pathway.xRef = function(){ 

    function getData(species, database, id, callback) {
      var databaseId = pathvisio.pathway.dataSources.filter(function(element) {return element.database === database})[0].id;
      var url = '../../remote-data-sources/php/bridgedb.php?species=' + encodeURIComponent(species) + '&database=' + encodeURIComponent(databaseId) + '&id=' + encodeURIComponent(id);
      $.ajax({
        url: url,
        dataType: "text",
        success: function(data) {console.log(data); self.data = data; callback(data);}
      });
    };

    function displayData(node) {
      self.node = node;
      var xRefData = getData(pathway.organism, node.xRef.database, node.xRef.id, function(data) {
        var parser = CSVParser.parse(data, true, ' ', false, false, '.');
        var parsed = DataGridRenderer.json(parser.dataGrid, parser.headerNames, parser.headerTypes,'\t','\n');
        var xRefDataParsed = self.xRefDataParsed = JSON.parse(parsed);

        xRefDataSorted = self.xRefDataSorted = [];
        var idsByDatabase = xRefDataParsed;
        var feature = {};
        idsByDatabase.ids = [];
        var features = [];
        xRefDataParsed.forEach(function(xRefForEach, index, array) {
          feature.database = xRefForEach.database;
          feature.ids = [];          
          if (features.filter(function(featureFilter) {return featureFilter.database === xRefForEach.database}).length === 0) {
            array.filter(function(xRefFilter) {return xRefFilter.database === xRefForEach.database}).forEach(function(element) {feature.ids.push(element.id)});
            features.push({'database':xRefForEach.database, 'ids': feature.ids});
            console.log(features);
          };    
        });

        featuresSorted.forEach(function(feature) {
          try {
            var priority = pathvisio.pathway.dataSources.filter(function(dataSource) {return dataSource.database.replace(/[^a-z0-9]/gi,'').toLowerCase() == feature.database.replace(/[^a-z0-9]/gi,'').toLowerCase() })[0].priority;
          }
          catch (e) {
            console.warn(e);
            console.warn('Error: No database found for external reference database "' + feature.database + '".');
          };
          if (priority == 1) {
            featuresSorted.unshift(feature);
          }
          else {
            featuresSorted.push(feature);
          };
        });

        var specifiedfeature = featuresSorted.filter(function(element) {return (element.database == node.xRef.database)});
        var currentFeatureIndex = featuresSorted.indexOf(specifiedfeature[0]);

        var specifiedXRefId = specifiedfeature.ids.filter(function(element) {return (element == node.xRef.id)});
        var currentXRefIdIndex = specifiedfeature.ids.indexOf(specifiedXRefId);

        featuresSorted = pathvisio.helpers.moveArrayItem(featuresSorted, currentFeatureIndex, 0);
        featuresSorted.ids = pathvisio.helpers.moveArrayItem(featuresSorted.ids, currentXRefIdIndex, 0);

        self.features = features;

        var pathwayContainer = d3.select('#pathway-container');
        var detailsFrame = pathwayContainer.append('div');
        var detailsList = detailsFrame.select('ul');
        detailsListItems = detailsList.selectAll('li')
        .data(featuresSorted)
        .enter()
        .append('li');

        /*
        [{'database':'a','ids':[1,2,3]},{'database':'b','ids':[1,2,3]}]
        <li><span class='feature-title'></span><span class='feature-item'></span></li>
        features[element.database] = [element.id];
        */

        detailsListItems.forEach(function(d) {
          var detailsListItem = d3.select(this);

          var featureTitle = detailsListItem.append('span')
          .attr('class', 'feature-title')
          .text(function(d) {return d.database});


          /*
          detailsListItems.forEach(function(d) {
            var featureItem = detailsListItem.selectAll('span.feature-item')
            .data(d.
            .append('span')
            .attr('class', 'feature-title')
            .text(d.database);
            */

        });

        console.log(features);

        //detailsFrame[0][0].style.visibility = 'visible';

      });
    };

    return { 
      getData:getData,
      displayData:displayData, 
    } 
}();
