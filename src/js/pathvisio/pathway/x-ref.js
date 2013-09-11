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
          };    
        });

        var featuresSorted = [];
        features.forEach(function(feature) {
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
        console.log('featuresSorted1');
        console.log(featuresSorted);
        self.featuresSorted = featuresSorted;

        var specifiedFeature = featuresSorted.filter(function(element) {return (element.database == node.xRef.database)})[0];
        console.log('specifiedFeature');
        console.log(specifiedFeature);
        var currentFeatureIndex = featuresSorted.indexOf(specifiedFeature);
        console.log('currentFeatureIndex');
        console.log(currentFeatureIndex);

        var specifiedXRefId = specifiedFeature.ids.filter(function(element) {return (element == node.xRef.id)})[0];
        console.log('specifiedXRefId');
        console.log(specifiedXRefId);
        var currentXRefIdIndex = specifiedFeature.ids.indexOf(specifiedXRefId);
        console.log('currentXRefIdIndex');
        console.log(currentXRefIdIndex);

        featuresSorted = pathvisio.helpers.moveArrayItem(featuresSorted, currentFeatureIndex, 0);
        specifiedFeature.ids = pathvisio.helpers.moveArrayItem(specifiedFeature.ids, currentXRefIdIndex, 0);

        var pathwayViewer = d3.select('#pathway-viewer');
        var detailsFrame = pathwayViewer.insert('div');
        var detailsList = detailsFrame.append('ul');
        detailsListItems = detailsList.selectAll('li')
        .data(featuresSorted)
        .enter()
        .append('li');

        /*
        [{'database':'a','ids':[1,2,3]},{'database':'b','ids':[1,2,3]}]
        <li><span class='feature-title'></span><span class='feature-item'></span></li>
        features[element.database] = [element.id];
        */

        detailsListItems[0].forEach(function(detailsListItem) {
          console.log('detailsListItem');
          console.log(detailsListItem);
          var featureTitle = d3.select(detailsListItem).append('span')
          .attr('class', 'feature-title')
          .text(function(d) {return d.database});
          
          var featureText = d3.select(detailsListItem).selectAll('span.feature-text')
          .data(function(d) {return d.ids})
          .enter()
          .append('span')
          .attr('class', 'feature-text')
          .text(function(d) {return d + ', '});
        });

        //detailsFrame[0][0].style.visibility = 'visible';

      });
    };

    return { 
      getData:getData,
      displayData:displayData, 
    } 
}();
