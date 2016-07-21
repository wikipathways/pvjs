/***********************************
 * Datasource Control
 **********************************/

/**
 * Module dependencies.
 */

// TODO add the CSS

var _ = require('lodash');
var Rx = global.Rx = global.Rx || require('rx-extra');
var BridgeDb = require('../main.js');
var JsonldRx = require('jsonld-rx-extra');
var yolk = require('yolk');

var h = yolk.h;

var entityTypeTermsByGpmlTerm = {
  'gpml:Pathway': [
    'gpml:Pathway',
    'biopax:Pathway',
  ],
  'gpml:Metabolite': [
    'gpml:Metabolite',
    'biopax:SmallMolecule',
    'biopax:SmallMoleculeReference',
  ],
  'gpml:Protein': [
    'gpml:Protein',
    'biopax:Protein',
    'biopax:ProteinReference',
  ],
  'gpml:Rna': [
    'gpml:Rna',
    'biopax:Rna',
    'biopax:RnaReference',
  ],
  'gpml:GeneProduct': [
    'gpml:GeneProduct',
    'gpml:Protein',
    'gpml:Rna',
    'biopax:Dna',
    'biopax:DnaReference',
    'biopax:Rna',
    'biopax:RnaReference',
    'biopax:Protein',
    'biopax:ProteinReference',
  ],
};

var expandEntityTypes = function(entityTypes) {
  if (_.isEmpty(entityTypes)) {
    return entityTypes;
  }
  return entityTypes.reduce(function(acc, entityType) {
    var mappedTerms;
    if (entityType.indexOf('gpml') === 1) {
      mappedTerms = entityTypeTermsByGpmlTerm[entityType];
    } else {
      // e.g., if entityType is a BioPAX term
      mappedTerms = _.toPairs(entityTypeTermsByGpmlTerm)
      .reduce(function(acc, pair) {
        var gpmlTerm = pair[0];
        var allTerms = pair[1];
        if (allTerms.indexOf(entityType) > -1) {
          acc = acc.concat(allTerms);
        }
        return acc;
      }, []);
    }
    if (!mappedTerms) {
      return acc;
    }
    return acc.concat(mappedTerms);
  }, []);
};

function DatasourceControl(args) {
  var jsonldRx = new JsonldRx();

  var bridgeDbInstance = new BridgeDb();

  var createEventHandler = args.createEventHandler;
  var props = args.props;

  var disabled$ = props.disabled || Rx.Observable.return(false);
  var onChange$ = props.onChange;
  var required$ = props.required || Rx.Observable.return(false);

  var datasourcePlaceholder = {
    'id': '',
    'name': 'Select datasource'
  };

  var primaryDatasourceList$ = bridgeDbInstance.dataset.query()
  .map(function(datasource) {
    datasource.subject = jsonldRx.arrayifyClean(datasource.subject);
    return datasource;
  })
  .filter(function(datasource) {
    // Datasource subjects that indicate the datasource should not be used for identifying
    // an Entity Reference for a gpml:DataNode.
    var nonApplicableSubjects = [
      'interaction',
      'ontology',
      'probe',
      'experiment',
      'publication',
      'model',
      'organism'
    ];
    return datasource.primary &&
        !!datasource.id &&
        nonApplicableSubjects.indexOf(datasource._bridgeDbType) === -1;
  })
  .toArray()
  .repeat();

  var handleChange = createEventHandler();
  var selectedDatasource$ = Rx.Observable.merge(
      props.datasource || Rx.Observable.return(datasourcePlaceholder),
      handleChange
      .map(function(datasourceSelection) {
        return datasourceSelection.target.value;
      })
      .filter(function(selectedDatasourceId) {
        return !!selectedDatasourceId && selectedDatasourceId !== 'null';
      })
      .concatMap(function(selectedDatasourceId) {
        return primaryDatasourceList$
        .take(1)
        .map(function(candidateDatasources) {
          return _.find(candidateDatasources, function(candidateDatasource) {
            return candidateDatasource.id === selectedDatasourceId;
          });
        });
      })
      .doOnNext(function(selectedDatasource) {
        if (onChange$) {
          onChange$.subscribe(function(onChange) {
            onChange(selectedDatasource);
          });
        }
      })
      //.startWith({})
  );

  var getCurrentDatasourceList = function(selectedTypes, selectedDatasource) {
    return Rx.Observable.return(datasourcePlaceholder)
    .concat(
        primaryDatasourceList$
        .take(1)
        .concatMap(function(candidateDatasources) {
          var candidateDatasource$ = Rx.Observable.from(candidateDatasources);

          // return all if no entity type specified
          if (_.isEmpty(selectedTypes)) {
            return candidateDatasource$;
          }

          return candidateDatasource$
          .filter(function(candidateDatasource) {
            // Filtering datasources based on the currently
            // selected GPML DataNode Type

            var candidateDatasourceSubjects = expandEntityTypes(jsonldRx.arrayifyClean(
                candidateDatasource.subject));

            // If the IRIs are the same, we include the entry
            // regardless of entity type
            if (candidateDatasource.id === selectedDatasource.id) {
              return true;
            }

            // We include all Datasources when GPML DataNode Type is equal to
            // one of these entries:
            var includeAllForTheseTerms = [
              'biopax:Complex',
              'gpml:Unknown',
              'gpml:UnknownReference',
            ];
            if (_.intersection(selectedTypes, includeAllForTheseTerms).length > 0) {
              return true;
            }

            var pathwayTerms = entityTypeTermsByGpmlTerm['gpml:Pathway'];
            if (_.intersection(selectedTypes, pathwayTerms).length > 0 &&
                _.intersection(candidateDatasourceSubjects, pathwayTerms).length > 0) {
              return true;
            }

            var metaboliteTerms = entityTypeTermsByGpmlTerm['gpml:Metabolite'];
            if (_.intersection(selectedTypes, metaboliteTerms).length > 0 &&
                _.intersection(candidateDatasourceSubjects, metaboliteTerms).length > 0) {
              return true;
            }

            var geneProductTerms = entityTypeTermsByGpmlTerm['gpml:GeneProduct'];
            if (_.intersection(selectedTypes, geneProductTerms).length > 0 &&
                _.intersection(candidateDatasourceSubjects, geneProductTerms).length > 0) {
              return true;
            }

            // NOTE: we are intentionally filtering out datasources that lack a subject.
            // That's a BridgeDb curation issue, not an issue for this client.
            return false;
          });
        })
    )
    .toArray();
  };

  var entityTypeList$ = (props.entityType || Rx.Observable.return('gpml:GeneProduct'))
  .map(jsonldRx.arrayifyClean)
  .map(expandEntityTypes);

  return h('select', {
    'className': 'pvjs-editor-dataset form-control input input-sm',
    data: selectedDatasource$,
    disabled: disabled$,
    onChange: handleChange,
    required: required$,
    style: 'max-width: 135px; '
  },
    Rx.Observable.merge(
        entityTypeList$
        .withLatestFrom(selectedDatasource$)
        .concatMap(function(result) {
          var selectedTypes = result[0];
          var selectedDatasource = result[1];
          return getCurrentDatasourceList(selectedTypes, selectedDatasource)
          .map(function(currentDatasourceList) {
            return [
              currentDatasourceList,
              selectedDatasource,
            ];
          });
        }),
        selectedDatasource$
        .withLatestFrom(entityTypeList$)
        .concatMap(function(result) {
          var selectedDatasource = result[0];
          var selectedTypes = result[1];
          return getCurrentDatasourceList(selectedTypes, selectedDatasource)
          .map(function(currentDatasourceList) {
            return [
              currentDatasourceList,
              selectedDatasource,
            ];
          });
        })
    )
    .map(function(result) {
      var candidateDatasources = result[0];
      var selectedDatasource = result[1];
      return candidateDatasources
      .map(function(candidateDatasource) {
        var candidateDatasourceId = candidateDatasource.id;

        return h('option', {
          key: candidateDatasourceId,
          value: candidateDatasourceId,
          selected: (candidateDatasourceId === selectedDatasource.id)
        }, candidateDatasource.name);
      });
    })
  );
}

module.exports = DatasourceControl;
