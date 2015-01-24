riot.tag('bridgedb-xref-search', '<form class="well well-sm col-sm-3 form-search" onsubmit="{ submit }"> <div class = "input-group"> <input id="bridgedb-xref-search-input" type="text" class="form-control" placeholder="Search by name"> <span class="input-group-btn"> <button type="submit" class="btn btn-success"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span> </button> </span> </div> </form>', function(opts) {
  var bridgedb = BridgeDb({
    baseIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb.php/',
    datasetsMetadataIri: 'http://pointer.ucsf.edu/d3/r/data-sources/bridgedb-datasources.php',
    organism: 'Homo sapiens'
  });

  function displaySearchResults(query) {
    bridgedb.entityReference.freeSearch({attribute: query})
    .filter(function(searchResult) {
      return searchResult.isDataItemIn._isPrimary;
    })
    .reduce('', function(accumulator, searchResult) {
      accumulator += '<br>' + searchResult.db;
      return accumulator;
    })
    .each(function(innerHtmlString) {
      console.log('innerHtmlString');
      console.log(innerHtmlString);

      var theModal = simpleModal();
      theModal.show(innerHtmlString);
      theModal.updateContent(innerHtmlString);
    });
  }

  this.submit = function(e) {
    var query = document.querySelector('#bridgedb-xref-search-input').value;
    displaySearchResults(query);
  }.bind(this)

})
