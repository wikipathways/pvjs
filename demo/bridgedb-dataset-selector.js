riot.tag('bridgedb-dataset-selector', '<select id="thisSelector" onchange="{sayHi}" onclick="{isEdited = true}"> <option>Database</option> <option each="{datasets}">{_displayName}</option> </select>', function(opts) {
  var vm = this;

function sayHi(event) {
console.log('hi');
}

  var bridgedb = BridgeDb({
    baseIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php/',
    datasetsMetadataIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb-datasources.php',
    organism: 'Homo sapiens'
  });

  vm.parent.on('gpmlTypeChange', function(gpmlType) {
    console.log('gpmlType in bds');
    console.log(gpmlType);
    filterDatasetsByGpmlType(gpmlType);
  });

vm.allPrimaryDatasets = [];

  bridgedb.dataset.query()
  .filter(function(dataset) {
	    return dataset._isPrimary && !/(.+Ensembl)|(Ensembl.+)/.test(dataset._displayName);
  })
  .toArray(function(datasets) {
    vm.allPrimaryDatasets = _.clone(datasets);
    vm.datasets = datasets;
    vm.update();
  });

function filterDatasetsByGpmlType(gpmlType) {
	console.log('gpmlType in filter');
	console.log(gpmlType);
	vm.datasets = vm.allPrimaryDatasets.filter(function(dataset) {
	    return !dataset.subject || gpmlType === 'Unknown' || (_.isArray(dataset.subject) &&
	      dataset.subject.indexOf('gpml:' + gpmlType) > -1);
	})
	.map(function(dataset) {
		console.log('dataset');
		console.log(dataset);
		return dataset;
	})
    vm.update();
}

  this.submit = function(e) {
    var query = document.querySelector('#bridgedb-dataset-selector-input').value;
    displaySearchResults(query);
  }.bind(this)

})
