<bridgedb-dataset-selector class="col-lg-2 form-control"">

  <select id="thisSelector" onchange="{sayHi}" onclick="{isEdited = true}">
    <option>Database</option>
    <option each="{datasets}">{_displayName}</option>
  </select>

  <script>
  var vm = this;

  /* jshint ignore:start */

  sayHi(event) {
    alert('hi');
  }

  /* jshint ignore:end */

  var bridgedb = BridgeDb({
    baseIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php/',
    datasetsMetadataIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb-datasources.php',
    organism: 'Homo sapiens'
  });

  //riot.observable(vm.parent);
  vm.parent.on('gpmlTypeChange', function(gpmlType) {
    console.log('gpmlType in bds');
    console.log(gpmlType);
    filterDatasetsByGpmlType(gpmlType);
  });

  vm.allPrimaryDatasets = [];

  bridgedb.dataset.query()
    .filter(function(dataset) {
      // we don't want to include species-specific Ensembl datasets.
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

  </script>

</bridgedb-dataset-selector>
