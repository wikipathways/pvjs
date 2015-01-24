riot.tag('bridgedb-gpml-type-selector', '<select id="gpmlTypeSelector" onchange="{ setGpmlType }" onclick="isEdited = true"> <option>Type</option> <option value="GeneProduct">Gene Product</option> <option>Metabolite</option> <option>Pathway</option> <option>Protein</option> <option>Unknown</option> </select>', function(opts) {
  var vm = this;

riot.observable(vm);
  this.setGpmlType = function(event) {
    console.log('event');
    console.log(event);
    this.gpmlType = event.target.value
	vm.parent.trigger('gpmlTypeChange', this.gpmlType, true)
  }.bind(this)

	vm.trigger('start', { fuel: 89 }, true)
	vm.parent.trigger('start', { fuel: 89 }, true)


  this.submit = function(e) {
    var query = document.querySelector('#bridgedb-dataset-selector-input').value;
    displaySearchResults(query);
  }.bind(this)

})
