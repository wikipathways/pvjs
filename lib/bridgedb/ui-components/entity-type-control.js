/***********************************
 * Entity Type Control
 **********************************/

/**
 * Module dependencies.
 */

var _ = require('lodash');
var Rx = global.Rx = global.Rx || require('rx-extra');
var yolk = require('yolk');

var h = yolk.h;

var entityTypes = [{
  'id': 'biopax:Complex',
  name: 'Complex'
}, {
  'id': 'gpml:GeneProduct',
  name: 'Gene Product'
}, {
  'id': 'gpml:Metabolite',
  name: 'Metabolite'
}, {
  'id': 'biopax:Pathway',
  name: 'Pathway'
}, {
  'id': 'biopax:Protein',
  name: 'Protein'
}, {
  'id': 'biopax:Rna',
  name: 'RNA'
}, {
  'id': 'gpml:Unknown',
  name: 'Unknown'
}];

function EntityTypeControl(args) {
  var createEventHandler = args.createEventHandler;
  var props = args.props;

  var disabled$ = props.disabled || Rx.Observable.return(false);
  var required$ = props.required || Rx.Observable.return(false);
  var onChange$ = props.onChange;

  // specify placeholder selection
  var entityTypePlaceholder = {
    'id': '',
    'name': 'Select type'
  };

  var entityTypeIn$;
  if (!props.entityType) {
    entityTypeIn$ = Rx.Observable.return(entityTypePlaceholder);
  } else {
    entityTypeIn$ = props.entityType
    .concatMap(function(entityTypeOrTypes) {
      if (_.isArray(entityTypeOrTypes)) {
        return Rx.Observable.from(entityTypeOrTypes);
      } else {
        return Rx.Observable.return(entityTypeOrTypes);
      }
    })
    .map(function(entityType) {
      var entityTypeId;
      if (entityType.id) {
        entityTypeId = entityTypePlaceholder;
      } else if (_.isString(entityType)) {
        entityTypeId = entityType;
      } else {
        var message = [
          'Cannot get entityTypeId from ',
          JSON.stringify(entityType),
          '.'
        ].join('');
        return Rx.Observable.throw(new Error(message));
      }

      return _.find(entityTypes, function(candidateEntityType) {
        return candidateEntityType.id === entityTypeId;
      });
    })
    .filter(function(x) {
      return !_.isEmpty(x);
    });
  }

  var handleChange = createEventHandler();
  var selectedEntityType$ = Rx.Observable.merge(
      entityTypeIn$.defaultIfEmpty(entityTypePlaceholder),
      handleChange
      .map(function(entityTypeSelection) {
        return entityTypeSelection.target.value;
      })
      .filter(function(entityTypeSelection) {
        return !!entityTypeSelection && entityTypeSelection !== 'null';
      })
      .map(function(selectedEntityTypeId) {
        return _.find(entityTypes, function(candidateEntityType) {
          return candidateEntityType.id === selectedEntityTypeId;
        });
      })
      .doOnNext(function(entityType) {
        if (onChange$) {
          onChange$.subscribe(function(onChange) {
            onChange(entityType);
          });
        }
      })
  );

  return h('select.form-control.input.input-sm', {
    data: selectedEntityType$,
    disabled: disabled$,
    onChange: handleChange,
    required: required$,
  }, [
    selectedEntityType$.map(function(selectedEntityType) {
      return [entityTypePlaceholder]
      .concat(entityTypes)
      .map(function(entityType, index) {
        return h('option', {
          key: entityType.id,
          value: entityType.id,
          selected: (entityType.id === selectedEntityType.id),
        }, entityType.name);
      });
    })
  ]);
}

module.exports = EntityTypeControl;
