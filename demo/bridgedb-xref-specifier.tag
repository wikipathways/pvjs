<bridgedb-xref-specifier>
       <form class="well well-sm col-sm-9 form-inline" role="form" onsubmit="{ submit }" action="#">
          <!--<div data-ng-show="xref">Selection from a modal: {{ xref }}</div>-->

      <bridgedb-gpml-type-selector id="gpmlTypeSelectorComponent" class="form-control">
      </bridgedb-gpml-type-selector>

      <bridgedb-dataset-selector id="datasetSelectorComponent" class="form-control">
      </bridgedb-dataset-selector>
  
      <section data-ng-hide="isEdited">
        <button class="btn pull-right" type="button">
         <i class="glyphicon glyphicon-remove" aria-hidden="true"></i>
        </button>
      </section>

      <section data-ng-show = "isEdited">
        <button type="button" class="btn btn-link pull-right" data-ng-click = "isEdited = false">Cancel</button>
        <button type="button" data-ng-click="success = true; isEdited = false" class="btn btn-success pull-right">OK</button>
      </section>

      <input type="text" onchange="{ edit }" data-ng-model="xref.identifier" class="form-control" placeholder="ID" data-ng-click="isEdited = true">
      <input type="text" data-ng-model="xref.displayName" class="form-control" placeholder="Display name" data-ng-click="isEdited = true">
  </form>

  <script>
  var vm = this;

  riot.observable(vm);
  riot.observable(vm.datasetSelectorComponent);
  vm.on('gpmlTypeChange', function(gpmlType) {
    console.log('gpmlType');
    console.log(gpmlType);
  });

  vm.on('start', function(result) {
    console.log('result');
    console.log(result);
  });

// this doesn't work
  console.log('vm.gpmlTypeSelectorComponent');
  console.log(vm.gpmlTypeSelectorComponent);
  riot.observable(vm.gpmlTypeSelectorComponent);
  vm.gpmlTypeSelectorComponent.on('start', function(result) {
    console.log('gpmlTypeSelectora result');
    console.log(result);
  });

  edit(e) {
    console.log('keyup');
    this.text = e.target.value
  }

  submit(e) {
  }
  </script>

</bridgedb-xref-specifier>
