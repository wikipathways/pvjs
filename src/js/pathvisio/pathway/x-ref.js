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

        features.forEach(function(feature) {
          try {
            var dataSource = pathvisio.pathway.dataSources.filter(function(dataSource) {return dataSource.database.replace(/[^a-z0-9]/gi,'').toLowerCase() == feature.database.replace(/[^a-z0-9]/gi,'').toLowerCase() })[0];
            feature.dataSourceId = dataSource.id;
            feature.linkOut = dataSource.linkOut;
            feature.priority = dataSource.priority;
          }
          catch (e) {
            console.warn(e);
            console.warn('Error: No database found for external reference database "' + feature.database + '".');
          };
        });

        features.sort(function(a, b) {
            if (a.priority === b.priority)
            {
                var x = a.database.toLowerCase(), y = b.database.toLowerCase();
                
                return x < y ? -1 : x > y ? 1 : 0;
            }
            return b.priority - a.priority;
        });

        var specifiedFeature = features.filter(function(element) {return (element.database == node.xRef.database)})[0];
        var currentFeatureIndex = features.indexOf(specifiedFeature);

        var specifiedXRefId = specifiedFeature.ids.filter(function(element) {return (element == node.xRef.id)})[0];
        var currentXRefIdIndex = specifiedFeature.ids.indexOf(specifiedXRefId);

        features = pathvisio.helpers.moveArrayItem(features, currentFeatureIndex, 0);
        specifiedFeature.ids = pathvisio.helpers.moveArrayItem(specifiedFeature.ids, currentXRefIdIndex, 0);

        var detailsFrame = d3.select('#details-frame')
        //.attr('style', 'visibility:visible');

        var detailsHeader = detailsFrame.append('header')
        .attr('class', 'data-node-label');

        var detailsPullLeftSpan = detailsHeader.append('span')
        .attr('class', 'pull-left');
        var detailsMoveSpan = detailsPullLeftSpan.append('span')
        .attr('class', 'header-move');
        var detailsMoveIcon = detailsMoveSpan.append('i')
        .attr('class', 'icon-move')
        .attr('style', 'color:#aaa');

        var detailsHeaderLabelSpan = detailsHeader.append('span')
        .attr('style', 'font-size: 120%;')
        .text(function(d) {return node.textLabel.text + ' '});
        
        var detailsSearchSpan = detailsHeaderLabelSpan.append('span')
        .attr('class', 'header-search')
        .attr('title', function(d) {return 'Search for pathways containing ' + node.textLabel.text });
        var detailsSearchLink = detailsSearchSpan.append('a')
        .attr('href', function(d) {return 'http://wikipathways.org//index.php?title=Special:SearchPathways&doSearch=1&ids=' + node.xRef.id + '&codes=' + pathvisio.pathway.dataSources.filter(function(dataSource) {return dataSource.database.replace(/[^a-z0-9]/gi,'').toLowerCase() == node.xRef.database.replace(/[^a-z0-9]/gi,'').toLowerCase() })[0].id + '&type=xref'});
        var detailsSearchIcon = detailsSearchLink.append('i')
        .attr('class', 'icon-search')
        .attr('style', 'color:blue; font-size:50%');
        
        var detailsPullRightSpan = detailsHeader.append('span')
        .attr('class', 'pull-right');
        var detailsCloseSpan = detailsPullRightSpan.append('span')
        .attr('class', 'header-close')
        .on("click", function(d, i){
          detailsFrame.selectAll('*').remove();
          detailsFrame[0][0].style.visibility = 'hidden';
        });
        var detailsCloseIcon = detailsCloseSpan.append('i')
        .attr('class', 'icon-remove')
        .attr('style', 'color:#aaa; font-size:120%');

        var dataNodeTypeDiv = detailsHeader.append('div')
        .attr('class', 'data-node-description');
        var dataNodeType = dataNodeTypeDiv.append('h2')
        .text(node.dataNodeType);
        
        var detailsList = detailsFrame.append('ul')
        .attr('class', 'data-node');

        detailsListItems = detailsList.selectAll('li')
        .data(features)
        .enter()
        .append('li');

        /*
        [{'database':'a','ids':[1,2,3]},{'database':'b','ids':[1,2,3]}]
        <li><span class='feature-title'></span><span class='feature-item'></span></li>
        features[element.database] = [element.id];
        */

        detailsListItems[0].forEach(function(detailsListItem) {
          var featureTitle = d3.select(detailsListItem).append('span')
          .attr('class', 'feature-title')
          .text(function(d) {return d.database + ': '});
          
          var linkOuts = d3.select(detailsListItem).selectAll('a')
          .data(function(d) {
            var featuresFilled = [];
            console.log('d');
            console.log(d);
            d.ids.forEach(function(id) {
              console.log('id');
              console.log(id);
              var linkOut = d.linkOut.replace('$id', id);
              featuresFilled.push({'id':id, 'linkOut':linkOut});
              console.log(featuresFilled);
            });
            return featuresFilled;
          })
          .enter()
          .append('a')
          .attr('href', function(d) {return d.linkOut});
          
          var featureText = linkOuts.append('span')
          .attr('class', 'feature-text')
          .attr('style', function(d) {
            if (!!d.linkOut) {
              return '';
            }
            else {
              return 'color: #696969;';
            };
          })
          .text(function(d) {return ' ' + d.id});
        });

        detailsFrame[0][0].style.visibility = 'visible';

      });
    };

    return { 
      getData:getData,
      displayData:displayData, 
    } 
}();
