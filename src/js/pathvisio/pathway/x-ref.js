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
        xRefDataParsed.forEach(function(xRef) {
          try {
            var priority = pathvisio.pathway.dataSources.filter(function(dataSource) {return dataSource.database.replace(/[^a-z0-9]/gi,'').toLowerCase() == xRef.database.replace(/[^a-z0-9]/gi,'').toLowerCase() })[0].priority;
          }
          catch (e) {
            console.warn(e);
            console.warn('Error: No database found for external reference database "' + xRef.database + '".');
          };
          if (priority == 1) {
            xRefDataSorted.unshift(xRef);
          }
          else {
            xRefDataSorted.push(xRef);
          };
        });
        var specifiedXRef = xRefDataSorted.filter(function(element) {return (element.database == node.xRef.database && element. id == node.xRef.id)});
        var currentIndex = xRefDataSorted.indexOf(specifiedXRef[0]);
        xRefDataSorted.move(currentIndex, 0);
        var features = {
          "id": node.textLabel.text,
          "description": node.dataNodeType
        };

        var features = [];
        xRefDataSorted.forEach(function(element) {
          console.log(element);
          if (element.id !== 'move' ) {
            if (!features[element.database]) {
              features[element.database] = [element.id];
            }
            else {
              features[element.database].push(element.id);
            };
          };
        });
        console.log(features);
        console.log(d3.map(features));
        console.log(d3.set(features));

        var detailsFrame = d3.select('#detailsFrame');
        detailsFrame[0][0].style.visibility = 'visible';

        if (!Biojs.DetailsFrame.set) {
          Biojs.DetailsFrame.set = true;
          Biojs.DetailsFrame.instance = new Biojs.DetailsFrame({
            target: "detailsFrame",
            features: features 
          });
        }
        else {

          // hack for making this work in IE8.
          // Biojs.detailsFrame.instance.updateFeatures() did not appear to work in IE8,
          // so I am just emptying the detailsFrame div and building a new one.

          detailsFrame.selectAll('*').remove();
          Biojs.DetailsFrame.instance = new Biojs.DetailsFrame({
            target: "detailsFrame",
            features: features 
          });
          /*
             Biojs.DetailsFrame.instance.updateFeatures({id: this.getAttribute('id'),
description:"new description",
newFeature:"its value",
otherFeature:"another value"});
*/
        };
      });
    };

    return { 
      getData:getData,
      displayData:displayData, 
    } 
}();
