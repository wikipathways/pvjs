<bridgedb-xref-search>

  <form class="well well-sm col-sm-3 form-search" onsubmit="{submit}">
    <div class = "input-group">
      <input id="bridgedb-xref-search-input" type="text" class="form-control" placeholder="Search by name">
      <span class="input-group-btn">
        <button type="submit" class="btn btn-success">
          <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
        </button>
      </span>
    </div>
  </form>

  <script>

  var vm = this;
  riot.observable(vm);

  var bridgedb = BridgeDb({
    baseIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php/',
    datasetsMetadataIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb-datasources.php',
    organism: 'Homo sapiens'
  });

  vm.xrefCandidates = [];

  function displaySearchResults(query) {
    bridgedb.entityReference.freeSearch({attribute: query})
    .filter(function(searchResult) {
      return searchResult.isDataItemIn._isPrimary;
    })
    .reduce('', function(accumulator, searchResult) {
      accumulator += '<br>' + searchResult.db;
      vm.xrefCandidates.push(searchResult);
      return accumulator;
    })
    .each(function(innerHtmlString) {
      console.log('innerHtmlString');
      console.log(innerHtmlString);

      console.log(JSON.stringify(vm.xrefCandidates));

      vm.parent.trigger('loadedXrefSearchResults', vm.xrefCandidates, true)

      /*

      var theModal = simpleModal();
      theModal.show(innerHtmlString);
      theModal.updateContent(innerHtmlString);

      */


    });
  }

  /* jshint ignore:start */

  submit(e) {
    var query = document.querySelector('#bridgedb-xref-search-input').value;
    displaySearchResults(query);
  }

  /* jshint ignore:end */
  </script>

</bridgedb-xref-search>
