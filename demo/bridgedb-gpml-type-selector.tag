<bridgedb-gpml-type-selector id="gpmlTypeSelectorTemplate" class="col-lg-2 form-control">

      <select id="gpmlTypeSelector" onchange={ setGpmlType } onclick="isEdited = true">
        <option>Type</option>
        <option value="GeneProduct">Gene Product</option>
        <option>Metabolite</option>
        <option>Pathway</option>
        <option>Protein</option>
        <option>Unknown</option>
      </select>

  var vm = this;

riot.observable(vm);
  setGpmlType(event) {
    console.log('event');
    console.log(event);
    this.gpmlType = event.target.value
	// trigger start event with extra parameters
	vm.parent.trigger('gpmlTypeChange', this.gpmlType, true)
  }

// this one doesn't work
	vm.trigger('start', { fuel: 89 }, true)
// this one does
	vm.parent.trigger('start', { fuel: 89 }, true)


  submit(e) {
    var query = document.querySelector('#bridgedb-dataset-selector-input').value;
    displaySearchResults(query);
  }

</bridgedb-gpml-type-selector>
