var _ = require('lodash');
var Rx = global.Rx = global.Rx || require('rx-extra');
var BridgeDb = require('../main.js');
var Levenshtein = require('levenshtein');
var YolkSimpleModal = require('yolk-simple-modal').default;

var yolk = require('yolk');
var h = yolk.h;
var render = yolk.render;

var changeStateToGlyphiconMappings = {
  'true': 'btn-success',
  'false': 'btn-default'
};

function EntityReferenceSearch(args) {
  var createEventHandler = args.createEventHandler;
  var props = args.props;

  var disabled$ = props.disabled || Rx.Observable.return(false);
  var onChange$ = props.onChange;
  var organism$ = props.organism;
  var required$ = props.required || Rx.Observable.return(false);

  var bridgeDbInstance$ = organism$
  .map(function(organism) {
    return new BridgeDb({organism: organism});
  });

  var queryFieldDisplayValue$ = new Rx.BehaviorSubject();
  queryFieldDisplayValue$.onNext('');

  var handleQueryFieldChange$ = createEventHandler(function(ev) {
    return ev.target.value;
  });
  handleQueryFieldChange$.subscribe(queryFieldDisplayValue$);

  var handleQuerySubmit$ = createEventHandler(function(ev) {
    return ev.preventDefault();
  });
  var querySubject$ = new Rx.Subject();
  var query$ = Rx.Observable.merge(
      handleQuerySubmit$
      .withLatestFrom(queryFieldDisplayValue$, function(_, val) {
        return val;
      }),
      querySubject$
  );

  var reset = function() {
    // results in the entity references modal going away
    querySubject$.onNext('');
    // clears the query field
    queryFieldDisplayValue$.onNext('');
    // clear candidate entity reference list
    entityReferencesSubject$.onNext([]);
  };

  var hiddenModalPlaceholder = h('span', {}, '');

  var handleEntityReferencesSelection$ = createEventHandler(function(x) {
    return x.currentTarget.id;
  });

  var entityReferencesSubject$ = new Rx.BehaviorSubject();
  handleEntityReferencesSelection$
  .withLatestFrom(entityReferencesSubject$)
  .map(function(result) {
    var selectedEntityReferenceId = result[0];
    var candidateEntityReferences = result[1];
    return _.find(candidateEntityReferences, function(candidateEntityReference) {
      return candidateEntityReference.id === selectedEntityReferenceId;
    });
  })
  .subscribe(function(entityReference) {
    if (onChange$) {
      onChange$.subscribe(function(onChange) {
        onChange(entityReference);
      });
    }
    reset();
  });
  //.startWith({})

  return h('form.form-search.form-group', {
    onSubmit: handleQuerySubmit$,
  },
    h('div.input-group.input-group-sm.form-control', null,
      h('input', {
        id: 'entity-reference-search-input',
        'className': 'form-control',
        disabled: disabled$,
        onChange: handleQueryFieldChange$,
        'placeholder': 'Search by name',
        required: required$,
        type: 'text',
        value: queryFieldDisplayValue$//.debounce(300)
      }),
      h('span.input-group-btn', {
        style: disabled$.map(function(disabled) {
          return disabled ? 'pointer-events: none; ' : null;
        }),
      },
        h('button[type="submit"]', {
          'className': disabled$.map(function(disabled) {
            return 'btn ' + changeStateToGlyphiconMappings[!disabled];
          }),
        },
          h('span[aria-hidden="true"].glyphicon.glyphicon-search')
        )
      ),
      query$
      .withLatestFrom(bridgeDbInstance$)
      .map(function(result) {
        var query = result[0];
        var bridgeDbInstance = result[1];

        if (!query) {
          return hiddenModalPlaceholder;
        }

        var queryLowerCase = query.toLowerCase();
        var queryLength = query.length;

        var content = bridgeDbInstance.entityReference.freeSearch({
          attribute: query
        })
        //.timeout(45 * 1000)
        .doOnError(function(err) {
          console.error('Error: timed out while trying to get entity references');
          console.error(err);
          reset();

          var message = err.message ? err.message : err.toString();
          entityReferenceSearch.trigger('error.' + message, {
            message: message
          });
        })
        .filter(function(entityReference) {
          return entityReference.isDataItemIn.primary;
        })
        .groupBy(function(entityReference) {return entityReference.isDataItemIn.preferredPrefix;})
        .flatMap(function(entityReferenceGroupSource) {
          return entityReferenceGroupSource.toArray().map(function(entityReferenceGroup) {
            return entityReferenceGroup.sort(function(entityReference1, entityReference2) {
              var displayName1 = entityReference1.displayName;
              var displayNameLowerCase1 = displayName1.toLowerCase();
              var displayName2 = entityReference2.displayName;
              var displayNameLowerCase2 = displayName2.toLowerCase();

              if (displayNameLowerCase1 === queryLowerCase) {
                return -1;
              } else if (displayNameLowerCase2 === queryLowerCase) {
                return 1;
              }

              /*
              // match based on letter characters only (must be at least three in query)
              var queryLetters = queryLowerCase.replace(/[^a-zA-Z]/g, '');
              if (queryLetters.length > 2) {
                var letters1 = displayNameLowerCase1.replace(/[^a-zA-Z]/g, '');
                var letters2 = displayNameLowerCase2.replace(/[^a-zA-Z]/g, '');
                var letterMatch1 = letters1 === queryLetters;
                var letterMatch2 = letters2 === queryLetters;

                if (letterMatch1 && !letterMatch2) {
                  return -1;
                } else if (!letterMatch1 && letterMatch2) {
                  return 1;
                }

                if (queryLetters.length > 3) {
                  var queryMatchIndex1 = displayNameLowerCase1.indexOf(queryLowerCase);
                  var queryMatchIndex2 = displayNameLowerCase2.indexOf(queryLowerCase);
                  var queryMatch1 = queryMatchIndex1 > -1;
                  var queryMatch2 = queryMatchIndex2 > -1;

                  if (queryMatch1 && !queryMatch2) {
                    return -1;
                  } else if (!queryMatch1 && queryMatch2) {
                    return 1;
                  } else if (queryMatch1 && queryMatch2) {
                    return queryMatchIndex1 > queryMatchIndex2;
                  }
                }
              }
              //*/

              //*
              // sort by letter characters in query appearing in the candidate name
              // (must be at least two letters in query)
              // if not all the letter characters appear in the candidate name but
              // the first letter of each candidate matches the first letter of the query,
              // sort by smallest Levenshtein distance between query and candidate name
              var queryLetters = queryLowerCase.replace(/[^a-zA-Z]/g, '');
              var queryLettersLength = queryLetters.length;
              if (queryLettersLength >= 2) {
                var letters1 = displayNameLowerCase1.replace(/[^a-zA-Z]/g, '');
                var letters2 = displayNameLowerCase2.replace(/[^a-zA-Z]/g, '');

                var lettersPrefixMatch1 = letters1.substr(0, queryLettersLength) === queryLetters;
                var lettersPrefixMatch2 = letters2.substr(0, queryLettersLength) === queryLetters;

                if (lettersPrefixMatch1 && !lettersPrefixMatch2) {
                  return -1;
                } else if (!lettersPrefixMatch1 && lettersPrefixMatch2) {
                  return 1;
                } else {
                  var firstLetterMatch1 = letters1[0] === queryLetters[0];
                  var firstLetterMatch2 = letters2[0] === queryLetters[0];

                  if (firstLetterMatch1 && !firstLetterMatch2) {
                    return -1;
                  } else if (!firstLetterMatch1 && firstLetterMatch2) {
                    return 1;
                  } else if (firstLetterMatch1 && firstLetterMatch2) {
                    var levenshtein1 = new Levenshtein(queryLetters, letters1);
                    var levenshtein2 = new Levenshtein(queryLetters, letters2);
                    var levenshteinDistance1 = levenshtein1.distance;
                    var levenshtein1Distance2 = levenshtein2.distance;
                    if (levenshteinDistance1 !== levenshtein1Distance2) {
                      // Sort by closest match between letters in displayName and query
                      return levenshteinDistance1 > levenshtein1Distance2;
                    }
                  }
                }
              }

              return displayName1 > displayName2;
            });
          });
        })
        .toArray()
        .map(function(entityReferenceGroups) {
          return entityReferenceGroups.sort(function(entityReferenceGroup1, entityReferenceGroup2) {
            var datasetPreferredPrefix1 = entityReferenceGroup1[0].isDataItemIn.preferredPrefix;
            var datasetPreferredPrefix2 = entityReferenceGroup2[0].isDataItemIn.preferredPrefix;

            // Ensembl shows up first
            if (datasetPreferredPrefix1 === 'ensembl') {
              return -1;
            } else if (datasetPreferredPrefix2 === 'ensembl') {
              return 1;
            }

            // Entrez Gene shows up next
            if (datasetPreferredPrefix1 === 'ncbigene') {
              return -1;
            } else if (datasetPreferredPrefix2 === 'ncbigene') {
              return 1;
            }

            // The rest are sorted alphabetically
            return datasetPreferredPrefix1 > datasetPreferredPrefix2;
          })
          .reduce(function(entityReferences, entityReferenceGroup) {
            return entityReferences.concat(entityReferenceGroup);
          }, []);
          //*/
        })
        .doOnError(function(err) {
          console.error('Error getting entity references');
          console.error(err);
          reset();

          var message = err.message ? err.message : err.toString();
          entityReferenceSearch.trigger('error.' + message, {
            message: message
          });
        })
        .map(function(entityReferences) {
          entityReferencesSubject$.onNext(entityReferences);
          if (entityReferences.length > 0) {
            return h('table.table.table-hover.table-bordered', null,
              h('thead', null,
                h('tr', {},
                  h('th', {}, 'Name'),
                  h('th', {}, 'Datasource'),
                  h('th', {}, 'Identifier')
                )
              ),
              h('tbody', {},
                entityReferences.map(function(entityReference, index) {
                  return h('tr', {
                    id: entityReference.id,
                    style: 'cursor: pointer;',
                    onClick: handleEntityReferencesSelection$,
                  },
                    h('td', {}, entityReference.displayName),
                    h('td', {}, entityReference.db),
                    h('td', {}, entityReference.identifier)
                  );
                })
              )
            );
          } else {
            return h('div', {}, 'No results found.');
          }
        });

        return h(YolkSimpleModal, {
          content: content,
          buttons: [{
            text: 'Cancel',
            closeOnClick: true,
            callback: function(value) {
              reset();
            }
          }],
          //status: vm.modalStatus()
        });
      })
      .startWith(hiddenModalPlaceholder)
    )
  );
}

module.exports = EntityReferenceSearch;
