var Rx = global.Rx = global.Rx || require('rx-extra');
var bridgeDbConfig = require('../config.js');
var BridgeDb = require('../main.js');
var JsonldRx = require('jsonld-rx-extra');

var yolk = require('yolk');
var h = yolk.h;

var EntityTypeControl = require('./entity-type-control.js');
var DatasourceControl = require('./datasource-control.js');
var IdentifierControl = require('./identifier-control.js');
var EntityReferenceSearch = require('./entity-reference-search.js');

var fs = require('fs');
var insertCss = require('insert-css');

var DATASOURCES_HEADERS_NS = [
  'https://github.com/bridgedb/BridgeDb/blob/master/',
  'org.bridgedb.bio/resources/org/bridgedb/bio/datasources_headers.txt#'
].join('');

var css = [
  fs.readFileSync(__dirname + '/index.css'),
  fs.readFileSync(__dirname + '/stripped-bootstrap.css')
];

function BridgeDbUIElement(args) {

  css.map(insertCss);

  var jsonldRx = new JsonldRx();

  var createEventHandler = args.createEventHandler;
  var props = args.props;

  var onChange$ = props.onChange;
  var entityIn$ = props.entity;
  var organismIn$ = props.organism;

  bridgeDbConfig.organism = null;
  var bridgeDbInstance$ = Rx.Observable.pairs(bridgeDbConfig)
  .flatMap(function(pair) {
    var key = pair[0];
    var value$;
    if (props.hasOwnProperty(key)) {
      value$ = props[key].first();
    } else {
      value$ = Rx.Observable.return(pair[1]);
    }
    return value$
    .map(function(value) {
      return [key, value];
    });
  })
  .reduce(function(acc, pair) {
    var key = pair[0];
    var value = pair[1];
    acc[key] = value;
    return acc;
  }, {})
  .doOnError(function(err) {
    err.message = err.message || '';
    err.message += ', observed when getting bridgeDbConfig';
    throw err;
  })
  .map(function(bridgeDbConfig) {
    return new BridgeDb(bridgeDbConfig)
  });

  var convertEntityTypesToEntityReferenceTypes = function(entityTypes) {
    // TODO this could likely fail for many different inputs
    var entityReferenceTypes = entityTypes
    .filter(function(entityType) {
      return entityType.indexOf('gpml') === 0 || entityType.indexOf('biopax') === 0;
    })
    .map(function(entityType) {
      if (entityType.indexOf('gpml') === 0 || !entityType.match(/Reference$/)) {
        return entityType;
      }
      return entityType + 'Reference';
    });
    entityReferenceTypes.unshift('EntityReference');
    return entityReferenceTypes;
  };

  var convertEntityReferenceTypesToEntityTypes = function(entityReferenceTypes) {
    // TODO this could likely fail for many different inputs
    return entityReferenceTypes
    .filter(function(entityReferenceType) {
      return entityReferenceType.indexOf('gpml') > -1 || entityReferenceType.indexOf('biopax') > -1;
    })
    .map(function(entityReferenceType) {
      return entityReferenceType.replace(/(.+)Reference$/, '$1');
    });
  };

  var enrichEntityAndEntityReferenceSync = function(entity, bridgeDbInstance) {
    if (_.isEmpty(entity) || (!entity.identifier && !entity.entityReference)) {
      throw new Error('Insufficiently specified entity arg in enrichEntityAndEntityReferenceSync');
    }
    var entityReference = entity.entityReference;
    if (!entityReference) {
      entityReference = entity.entityReference = {};
    } else if (_.isString(entity.entityReference)) {
      entityReference = entity.entityReference = {
        id: entity.entityReference
      };
    }
    entityReference.isDataItemIn = entityReference.isDataItemIn || {};
    var bridgeDbDatasourceName = entity.bridgeDbDatasourceName ||
        entity[DATASOURCES_HEADERS_NS + 'datasource_name'] ||
        entityReference[DATASOURCES_HEADERS_NS + 'datasource_name'] ||
        entityReference.isDataItemIn[DATASOURCES_HEADERS_NS + 'datasource_name'] ||
        entity['datasource_name'] ||
        entityReference['datasource_name'] ||
        entityReference.isDataItemIn['datasource_name'];

    entity['datasource_name'] =
      entityReference['datasource_name'] =
      entityReference.isDataItemIn['datasource_name'] =
      bridgeDbDatasourceName;

    delete entity.bridgeDbDatasourceName;

    var standardDatasourceName = entityReference.isDataItemIn.name ||
                                 entity.db ||
                                 entityReference.db;
    if (standardDatasourceName) {
      entityReference.isDataItemIn.name = entity.db = entityReference.db = standardDatasourceName;
    }

    var context = entity['@context'] || entityReference['@context'];
    if (context) {
      entity['@context'] = entity['@context'] || context;
      entityReference['@context'] = entityReference['@context'] || context;
    }

    var organism = entity.organism || entityReference.organism;
    if (organism) {
      entity.organism = entityReference.organism = organism;
    }

    var identifier = entity.identifier || entityReference.identifier;
    entity.identifier = entityReference.identifier = identifier;

    var entityTypes = entity.type = jsonldRx.arrayifyClean(entity.type);
    if (_.isEmpty(entityTypes)) {
      entity.type = entityTypes = convertEntityReferenceTypesToEntityTypes(
          jsonldRx.arrayifyClean(entityReference.type)
      );
    }
    var entityReferenceTypes = entityReference.type = jsonldRx.arrayifyClean(entityReference.type);
    if (_.isEmpty(entityReferenceTypes)) {
      entityReference.type = entityReferenceTypes = convertEntityTypesToEntityReferenceTypes(
          jsonldRx.arrayifyClean(entity.type)
      );
    }

    var entityName = entity.name ||
                     entityReference.name ||
                     entity.displayName ||
                     entityReference.displayName;
    if (entityName) {
      entity.name = entityName;

      entity.displayName = entity.displayName ||
                           entityReference.displayName ||
                           entityName;

      entityReference.name = entityReference.name ||
                             entityReference.displayName ||
                             entity.name ||
                             entity.displayName;

      entityReference.displayName = entityReference.displayName ||
                                    entityReference.name ||
                                    entity.displayName ||
                                    entity.name;
    }

    return entity;
  };

  var enrichEntityAndEntityReference = function(entity, bridgeDbInstance) {
    entity = enrichEntityAndEntityReferenceSync(entity, bridgeDbInstance);
    if (!entity['datasource_name'] || !entity.identifier) {
      // NOTE: enrichEntityAndEntityReferenceSync will look at all properties
      // to try to fill in datasource_name and identifier. If these values cannot
      // be determined, bridgeDb.dataset.enrich will throw an error, so we don't
      // want to call it.
      return Rx.Observable.return(entity);
    }
    return bridgeDbInstance.entityReference.enrich(entity.entityReference)
    .map(function(enrichedEntityReference) {
      entity.entityReference = enrichedEntityReference;
      return enrichEntityAndEntityReferenceSync(entity, bridgeDbInstance);
    });
  };

  var transferSpecifiedProperties = function(keys, source, dest) {
    dest = dest || {};
    return keys.reduce(function(accumulator, key) {
      if (source.hasOwnProperty(key)) {
        accumulator[key] = source[key];
      }
      return accumulator;
    }, dest);
  };

  var latestEntity$ = new Rx.BehaviorSubject();

  entityIn$
  .withLatestFrom(bridgeDbInstance$)
  .concatMap(function(result) {
    var entity = result[0];
    var bridgeDbInstance = result[1];
    entity = enrichEntityAndEntityReferenceSync(entity, bridgeDbInstance);
    var entityReference = entity.entityReference;
    latestEntity$.onNext(entity);
    return enrichEntityAndEntityReference(entity, bridgeDbInstance);
  })
  .subscribe(function(entity) {
    latestEntity$.onNext(entity);
  }, function(err) {
    err.message = err.message || '';
    err.message += ', observed in entityIn$';
    throw err;
  });

  var entityOut$ = new Rx.Subject();

  entityOut$
  .debounce(300)
  .withLatestFrom(bridgeDbInstance$)
  .concatMap(function(result) {
    var entity = result[0];
    var bridgeDbInstance = result[1];
    return enrichEntityAndEntityReference(entity, bridgeDbInstance);
  })
  .subscribe(function(entity) {
    latestEntity$.onNext(entity);
    if (onChange$) {
      onChange$
      .subscribe(function(onChange) {
        onChange(entity);
      });
    }
  }, function(err) {
    err.message = err.message || '';
    err.message += ', observed in entityOut$';
    throw err;
  });

//  return h('div.ln42', {
////      entity: entityIn$,
////      onChange: onChange$,
//      organism: organismIn$,
//    }, [
//      //'c-el'
//      //h('p', null, organismIn$),
//      //h('p', null, Rx.Observable.combineLatest(organismIn$, bridgeDbInstance$)
//      h('p', null, '', Rx.Observable.return('hi')
//          .map(function(latestEntity) {
//            console.log('latestEntity');
//            console.log(latestEntity);
//            return latestEntity;
//          })
//          .delay(200)
//      )
////      h('p', null, latestEntity$
////          .map(function(entity) {
////            console.log('latestEntity');
////            console.log(latestEntity);
////            return JSON.stringify(latestEntity);
////          })
////      )
//    ]
//  );

  return h('nav', {
          'className': 'bridgedb kaavio-editor-annotation navbar ' +
                       'navbar-default navbar-form well well-sm',
        },
        h('div', {
              'className': 'navbar-left',
            },
            h(EntityReferenceSearch, {
              organism: latestEntity$.map(function(entity) {
                return entity.organism;
              }),
              onChange: function(entityReference) {
                if (!entityReference) {
                  console.warn('no entityReference specified');
                  return;
                }

                // NOTE: AP requested that selection via
                // entity reference search NOT change the value
                // of the entity type
                latestEntity$
                .first()
                .subscribe(function(latestEntity) {
                  var updatedEntity = {};

                  // transfer the properties that should not change,
                  // even if they conflict with new entityReference
                  var specifiedEntityKeys = [
                    '@context',
                    'type',
                    'organism',
                  ];
                  updatedEntity = transferSpecifiedProperties(
                      specifiedEntityKeys, latestEntity, updatedEntity
                  );

                  // transfer the one property that shoould always change
                  updatedEntity.entityReference = entityReference;

                  entityOut$.onNext(updatedEntity);
                }, function(err) {
                  err.message = err.message || '';
                  err.message += ', observed in latestEntity$ in EntityReferenceSearch.onChange';
                  throw err;
                });
              },
            })
        ),
        h('div', {
              'className': 'form-group.navbar-left',
            },
            h('div', {
              'className': 'form-control',
              style: {
                'min-width': '580px',
                height: '44px'
              }
            },
            h(EntityTypeControl, {
              entityType: latestEntity$.map(function(entity) {
                return entity.type;
              }),
              onChange: function(entityType) {
                if (!entityType) {
                  console.warn('no entityType specified');
                  return;
                }

                latestEntity$
                .first()
                .subscribe(function(entity) {
                  if (entityType.id) {
                    entity.type = [entityType.id];
                  } else if (_.isString(entityType)) {
                    entity.type = [entityType];
                  } else {
                    var message = 'Cannot handle entityType: "' + JSON.stringify(entityType) + '"';
                    throw new Error(message);
                  }
                  entityOut$.onNext(entity);
                }, function(err) {
                  err.message = err.message || '';
                  err.message += ', observed in latestEntity$ in EntityTypeControl.onChange';
                  throw err;
                });
              },
            }),
            h(DatasourceControl, {
              datasource: latestEntity$.map(function(entity) {
                return entity.entityReference.isDataItemIn;
              }),
              entityType: latestEntity$
              .map(function(entity) {
                return entity.type;
              }),
              onChange: function(datasource) {
                if (!datasource) {
                  console.warn('no datasource specified');
                  return;
                }

                latestEntity$
                .first()
                .subscribe(function(latestEntity) {
                  var updatedEntity = {};

                  // transfer the properties that should not change,
                  // even if they conflict with new datasource
                  var specifiedEntityKeys = [
                    '@context',
                    'identifier',
                    'type',
                    'organism',
                    'name',
                    'displayName',
                  ];
                  updatedEntity = transferSpecifiedProperties(
                      specifiedEntityKeys, latestEntity, updatedEntity
                  );

                  var specifiedEntityReferenceKeys = [
                    '@context',
                    'identifier',
                    'organism',
                    'name',
                    'displayName',
                  ];
                  updatedEntity.entityReference = transferSpecifiedProperties(
                      specifiedEntityReferenceKeys, latestEntity.entityReference
                  );

                  // transfer the properties that shoould always change
                  updatedEntity.entityReference.isDataItemIn = datasource;
                  // NOTE: we are changing this one in order to give a
                  // placeholder so that the entity.type does not pollute
                  // these values. TODO is this correct?
                  updatedEntity.entityReference.type = ['EntityReference'];

                  entityOut$.onNext(updatedEntity);
                }, function(err) {
                  err.message = err.message || '';
                  err.message += ', observed in latestEntity$ in DatasourceControl.onChange';
                  throw err;
                });
              },
            }),
            h(IdentifierControl, {
              identifier: latestEntity$
                          .map(function(entity) {
                            return entity.identifier || '';
                          }),
              onChange: function(identifier) {
                latestEntity$
                .first()
                .subscribe(function(latestEntity) {
                  var updatedEntity = {};

                  // transfer the one property that shoould always change
                  updatedEntity.identifier = identifier;

                  // transfer the properties that should not change,
                  // even if they conflict with new identifier
                  var specifiedEntityKeys = [
                    '@context',
                    'db',
                    'datasource_name',
                    'type',
                    'organism',
                    'name',
                    'displayName',
                  ];
                  updatedEntity = transferSpecifiedProperties(
                      specifiedEntityKeys, latestEntity, updatedEntity
                  );

                  var specifiedEntityReferenceKeys = [
                    '@context',
                    'db',
                    'datasource_name',
                    'isDataItemIn',
                    'type',
                    'organism',
                    'name',
                    'displayName',
                  ];
                  updatedEntity.entityReference = transferSpecifiedProperties(
                      specifiedEntityReferenceKeys, latestEntity.entityReference
                  );

                  entityOut$.onNext(updatedEntity);
                }, function(err) {
                  err.message = err.message || '';
                  err.message += ', observed in latestEntity$ in IdentifierControl.onChange';
                  throw err;
                });
              },
            }),
            h('input', {
              className: 'pvjs-editor-label form-control input input-sm',
              placeholder: 'Display name',
              //disabled: disabled$,
              onChange: function(ev) {
                var updatedDisplayName = ev.target.value || '';
                latestEntity$
                .first()
                .subscribe(function(latestEntity) {
                  latestEntity.displayName = updatedDisplayName;
                  entityOut$.onNext(latestEntity);
                }, function(err) {
                  err.message = err.message || '';
                  err.message += ', observed in latestEntity$ in DisplayNameControl.onChange';
                  throw err;
                });
              },
              //required: required$,
              type: 'text',
              value: latestEntity$
                     .map(function(entity) {
                       return entity.displayName || '';
                     }),
            })
        )
    )
  );
}

module.exports = BridgeDbUIElement;

// TODO should index.js be the combo ui component, or should it
// export all the other ui comoponents as shown below?
//module.exports = {
//  BridgeDbUIElement: require('./bridgedb-ui-element.js'),
//  EntityTypeControl: require('./entity-type-control.js'),
//  DatasourceControl: require('./datasource-control.js'),
//  IdentifierControl: require('./identifier-control.js'),
//  EntityReferenceSearch: require('./entity-reference-search.js'),
//};
