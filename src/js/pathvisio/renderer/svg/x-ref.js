pathvisio.renderer.svg.xRef = function(){

    function getData(species, database, id, callback) {
      var databaseId = pathvisio.renderer.svg.dataSources.filter(function(element) {return element.database === database;})[0].id;
      var currentUrl = document.location.origin + document.location.pathname;
      var rootDirectoryUrl = document.location.origin + document.location.pathname.split("pathvisio.js/")[0] + 'pathvisio.js/';
      var url = rootDirectoryUrl + 'remote-data-sources/php/bridgedb.php?species=' + encodeURIComponent(species) + '&database=' + encodeURIComponent(databaseId) + '&id=' + encodeURIComponent(id);
      $.ajax({
        url: url,
        dataType: "text",
        success: function(data) {callback(data);}
      });
    }

    function displayData(organism, node) {
      self.node = node;
      var xRefData = getData(organism, node.xRef.database, node.xRef.id, function(data) {
        var parser = CSVParser.parse(data, true, ' ', false, false, '.');
        var parsed = DataGridRenderer.json(parser.dataGrid, parser.headerNames, parser.headerTypes,'\t','\n');
        var xRefDataParsed = self.xRefDataParsed = JSON.parse(parsed);

        var idsByDatabase = xRefDataParsed;
        var feature = {};
        idsByDatabase.ids = [];
        var features = [];
        xRefDataParsed.forEach(function(xRefForEach, index, array) {
          feature.database = xRefForEach.database;
          feature.ids = [];
          if (features.filter(function(featureFilter) {return featureFilter.database === xRefForEach.database;}).length === 0) {
            array.filter(function(xRefFilter) {
              return xRefFilter.database === xRefForEach.database;}).forEach(function(element) {
                feature.ids.push(element.id);
              });
            features.push({'database':xRefForEach.database, 'ids': feature.ids});
          }
        });

        features.forEach(function(feature) {
          try {
            var dataSource = pathvisio.renderer.svg.dataSources.filter(function(dataSource) {return dataSource.database.replace(/[^a-z0-9]/gi,'').toLowerCase() == feature.database.replace(/[^a-z0-9]/gi,'').toLowerCase(); })[0];
            feature.dataSourceId = dataSource.id;
            feature.linkOut = dataSource.linkOut;
            feature.priority = dataSource.priority;
          }
          catch (e) {
            console.warn(e);
            console.warn('Error: No database found for external reference database "' + feature.database + '".');
          }
        });

        features.sort(function(a, b) {
            if (a.priority === b.priority)
            {
                var x = a.database.toLowerCase(), y = b.database.toLowerCase();
                
                return x < y ? -1 : x > y ? 1 : 0;
            }
            return b.priority - a.priority;
        });

        var specifiedFeature = features.filter(function(element) {return (element.database == node.xRef.database);})[0];
        var currentFeatureIndex = features.indexOf(specifiedFeature);

        var specifiedXRefId = specifiedFeature.ids.filter(function(element) {return (element == node.xRef.id);})[0];
        var currentXRefIdIndex = specifiedFeature.ids.indexOf(specifiedXRefId);

        features = self.features = pathvisio.helpers.moveArrayItem(features, currentFeatureIndex, 0);
        specifiedFeature.ids = pathvisio.helpers.moveArrayItem(specifiedFeature.ids, currentXRefIdIndex, 0);

        var detailsFrame = self.detailsFrame = d3.select('#details-frame');
        //.attr('style', 'visibility:visible');
        
        //detailsFrame.selectAll('*').remove();

        var detailsHeaderText = detailsFrame.select('#details-frame-header-text')
        .text(node.textLabel.text);

        var detailsSearchUri = detailsFrame.select('#details-frame-header-search').select('a')
        .attr('href', function() {
          return 'http://wikipathways.org//index.php?title=Special:SearchPathways&doSearch=1&ids=' + node.xRef.id + '&codes=' + pathvisio.renderer.svg.dataSources.filter(function(dataSource) {
            return dataSource.database.replace(/[^a-z0-9]/gi,'').toLowerCase() == node.xRef.database.replace(/[^a-z0-9]/gi,'').toLowerCase();
          })[0].id + '&type=xref';
        })
        .attr('title', function() {return 'Search for pathways containing ' + node.textLabel.text; });

        var dataNodeType = detailsFrame.select('#details-frame-description')
        .text(node.dataNodeType);
        
        var detailsFrameItems = self.detailsFrameItems = detailsFrame.select('#details-frame-items-container').selectAll('li')
        .remove()
        .data(features)
        .enter()
        .append('li');

        var detailsFrameItemTitles = detailsFrameItems.append('span')
        .attr('class', 'details-frame-item-title')
        .text(function(d) {return d.database + ': ';});

        /*
        [{'database':'a','ids':[1,2,3]},{'database':'b','ids':[1,2,3]}]
        <li><span class='feature-title'></span><span class='feature-item'></span></li>
        features[element.database] = [element.id];
        */

        detailsFrameItems[0].forEach(function(detailsFrameItem) {
          var detailsFrameItemTextNonLink = d3.select(detailsFrameItem).selectAll('.details-frame-item-text')
          .data(function(d) {
            var featuresFilled = [];
            d.ids.forEach(function(id) {
              var linkOut = d.linkOut.replace('$id', id);
              if (!d.linkOut) {
                featuresFilled.push({'id':id});
              }
            });
            return featuresFilled;
          })
          .enter()
          .append('span')
          .attr('class', 'details-frame-item-text')
          .text(function(d) { return ' ' + d.id; })

          var detailsFrameItemTextLinkOuts = d3.select(detailsFrameItem).selectAll('.details-frame-item-text')
          .data(function(d) {
            var featuresFilled = [];
            d.ids.forEach(function(id) {
              var linkOut = d.linkOut.replace('$id', id);
              if (!!d.linkOut) {
                featuresFilled.push({'id':id, 'linkOut':linkOut});
              }
            });
            return featuresFilled;
          })
          .enter()
          .append('a')
          .attr('class', 'details-frame-item-text')
          .attr('href', function(d) {return d.linkOut;})
          .text(function(d) { return ' ' + d.id; })

        });

        detailsFrame[0][0].style.visibility = 'visible';

      });
    }

    return {
      getData:getData,
      displayData:displayData,
    };
}();
