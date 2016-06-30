/**********
 * Mithril wrapper around BridgeDb UI Combo (Yolk Component)
 * TODO clean this up.
 *********/

var _ = require('lodash');
//var m = require('mithril');
var m = window.m;

//var Rx = require('rx-extra');
var yolk = require('yolk');
var h = yolk.h;
var render = yolk.render;
var Rx = yolk.Rx;

//var BridgeDbUIElement = require('../../../../bridgedbjs/lib/ui-components');
var BridgeDbUIElement = require('../../../../bridgedbjs/lib/ui-components');

/**********
 * Mithril wrapper code
 *********/

var BridgeDbMithrilComponent = {
  //    Returns a select box
  view: function(ctrl, attrs) {
    //var selectedId = attrs.value().id;
    //Create a Select2 progrssively enhanced SELECT element
    return m('div', {
      config: BridgeDbMithrilComponent.config(attrs)
    });
  },
  /**
   Select2 config factory. The params in this doc refer to properties of the `ctrl` argument
   @param {Object} data - the data with which to populate the <option> list
   @param {prop} value - the prop of the item in `data` that we want to select
   @param {function(Object id)} onchange - the event handler to call when the selection changes.
   `id` is the the same as `value`
   */
  //    Note: The config is never run server side.
  config: function(ctrl) {
    var entity = ctrl.entity;
    return function(element, isInitialized) {

      if (!isInitialized) {
        console.log('NOT isInitialized');
        m.startComputation();

        render(h(BridgeDbUIElement, {
          className: 'hello',
          onChange: function(updatedEntity) {
            console.log('updatedEntity');
            console.log(updatedEntity);
          },
        //  '@context': context,
        //  baseIri: 'http://localhost:' + process.env.MOCKSERVER_PORT + '/',
        //  datasetsMetadataIri:
        //      'http://localhost:' + process.env.MOCKSERVER_PORT + '/datasources.txt',
          organism: entity.organism,
          entity: entity,
        }), element);

        m.endComputation();
//        window.setTimeout(function() {
//          m.endComputation();
//        }, 1000);
      } else {
        console.log('isInitialized');
      }
      //el.val(ctrl.value().id).trigger("change");
    };
  }
};

/***********************************
 * annotationTab
 **********************************/

var annotationTab = {};

annotationTab.vm = (function() {

  var vm = {};

  vm.init = function(kaavio) {

    var jsonldRx = kaavio.jsonldRx;

    vm.organism = kaavio.sourceData.pvjson.organism;

    var editorTabsComponent = kaavio.editor.editorTabsComponent;

    // TODO this data is repeated elsewhere in the pvjs
    // codebase (possibly in gpml2pvjson). It would be
    // better not to repeat it.
    var typeMappingsEntityReferenceToEntity =
        vm.typeMappingsEntityReferenceToEntity = {
          'biopax:Complex': 'biopax:Complex',
          'gpml:GeneProduct': 'gpml:GeneProduct',
          'biopax:SmallMoleculeReference': 'gpml:Metabolite',
          'biopax:Pathway': 'biopax:Pathway',
          'biopax:ProteinReference': 'biopax:Protein',
          'biopax:RnaReference': 'biopax:Rna',
          'gpml:Unknown': 'gpml:Unknown',
        };

    var typeMappingsEntityToEntityReference =
        vm.typeMappingsEntityToEntityReference =
        _.invert(typeMappingsEntityReferenceToEntity);

    var editableElementTypes = _.keys(typeMappingsEntityToEntityReference);

    vm.containerElement = kaavio.containerElement;

    vm.disabled = m.prop(true);

    vm.cancel = function() {
      vm.reset();
      kaavio.editor.cancel();
    };

    // initialize values
    vm.pvjsElement = {};
    vm.entityReference = m.prop({});

    var parentPartition = editorTabsComponent.vm.pvjsElementPartition;
    var pvjsElementPartition = vm.pvjsElementPartition = Rx.Observable.hierarchicalPartition(
        function(pvjsElement) {
          var pvjsElementType = _.isArray(pvjsElement.type) ? pvjsElement.type : [pvjsElement.type];
          var result = !_.isEmpty(_.intersection(pvjsElementType, editableElementTypes));
          return result;
        },
        parentPartition[0],
        parentPartition[1]
    );

    vm.pvjsElementSource = pvjsElementPartition[0];
    vm.resetSource = pvjsElementPartition[1];

    var bridgeDbIdControlChangeOrInputSource =
        vm.bridgeDbIdControlChangeOrInputSource = new Rx.Subject();

    bridgeDbIdControlChangeOrInputSource.subscribe(function(entityReference) {
      vm.entityReference = entityReference;
    });

    // For most use cases, a user will first enter or change the dataset and then enter or change
    // the identifier. For those cases, we want to wait for both of these to be entered to avoid
    // a useless refresh of the data, which may cause a momentary pause in the responsiveness of
    // the app. We thus wait for user to either click anywhere else on the page or else wait for
    // a small moment of time before updating the model.
    var bridgeDbIdCompleteSource = bridgeDbIdControlChangeOrInputSource
      .flatMap(function(entityReference) {
        var documentClickSource = Rx.Observable.fromEvent(document.body, 'click');
        return Rx.Observable.merge(
            Rx.Observable.return(entityReference),
            documentClickSource).first();
      })
      .debounce(500 /* ms */);

    Rx.Observable.merge(vm.pvjsElementSource, vm.resetSource, bridgeDbIdCompleteSource)
      .subscribe(function(value) {
        var pvjsElement = vm.pvjsElement;
        if (_.isEmpty(pvjsElement)) {
          return;
        }

        var entityReference = vm.entityReference;
        if (_.isEmpty(entityReference)) {
          return;
        }

        /*
        var updatedEntityReference = {
          id: entityReference.id,
          type: entityReference.type
        };
        //*/

        pvjsElement.getSetEntityReference(entityReference)
          .then(function(enrichedEntityReference) {
            if (vm.entityReference && vm.entityReference.id === enrichedEntityReference.id) {
              vm.entityReference = enrichedEntityReference;
            }
            m.redraw();
          });
      });

    vm.clearControls = function() {
      vm.pvjsElement = {};
      vm.entityReference = {};
    };

    vm.reset = function() {
      vm.disabled(true);
      vm.clearControls();
    };

    vm.pvjsElementSource
      .flatMap(function(pvjsElement) {
        var entityReferenceSource;
        if (pvjsElement.entityReference) {
          entityReferenceSource = Rx.Observable.fromPromise(pvjsElement.getSetEntityReference());
        } else {
          entityReferenceSource = Rx.Observable.return({isDataItemIn: {}});
        }
        // TODO apparently Rx now requires zip to have a selector. zipArray appears to not exist.
        return Rx.Observable.zip(
            Rx.Observable.return(pvjsElement),
            entityReferenceSource,
            function(x, y) {
              return [x, y];
            }
        );
      })
      .subscribe(function(pvjsElementAndEntityReference) {
        var pvjsElement = pvjsElementAndEntityReference[0];
        var currentEntityReference = _.clone(pvjsElementAndEntityReference[1]);

        vm.clearControls();

        vm.disabled(false);

        vm.entityReference = currentEntityReference;
        var entityReferenceIri = pvjsElement.entityReference;

        // Pathway author can override default display name (xref display name)
        // for a specific DataNode.
        pvjsElement.textContent = pvjsElement.textContent || currentEntityReference.displayName;
        vm.pvjsElement = pvjsElement;
        m.redraw();
      }, function(err) {
        throw err;
      });

    vm.resetSource
      .subscribe(function(value) {
        vm.reset();
        m.redraw();
      }, function(err) {
        console.error(err);
      }, function(value) {
        // do something
      });

    kaavio.diagramComponent.vm.selectionPartition.replay();

    vm.updateTextContent = function(pvjsElement, updatedTextContent) {
      pvjsElement.textContent = updatedTextContent;
      var textContainerElementId = '#text-for-' + pvjsElement.id;
      var textContainerElement = vm.containerElement.querySelector(textContainerElementId);
      if (!textContainerElement) {
        var viewportElement = vm.containerElement.querySelector('.viewport');
        textContainerElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        textContainerElement.setAttribute('id', textContainerElementId);
        var textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        viewportElement.appendChild(textContainerElement);
        textContainerElement.appendChild(textElement);
        // TODO this isn't quite right.
        textContainerElement.setAttribute('transform',
            'translate(' + pvjsElement.x + ' ' + (pvjsElement.y + 14) + ')');
      }
      textContainerElement.querySelector('text').textContent = updatedTextContent;
    };

    vm.onunload = function() {
      // do something
    };
  };

  return vm;
})();

annotationTab.controller = function(ctrl) {
  annotationTab.vm.init(ctrl);
};

var fs = require('fs');
var context = JSON.parse(
    fs.readFileSync(
        __dirname + '/../../../../../../bridgedbjs/test/jsonld-context.jsonld'
    )
);

annotationTab.view = function(ctrl, args) {
  var vm = annotationTab.vm;

  var entity = {
    '@context': context['@context'],
    organism: 'Mus musculus',
    type: ['gpml:GeneProduct'],
    'datasource_name': 'Ensembl',
    identifier: 'Pdha1',
    name: 'pyruvate dehydrogenase E1 alpha 1',
    displayName: 'Pdha1',
    entityReference: {
      type: ['biopax:Gene'],
      isDataItemIn: {
        id: 'http://identifiers.org/ensembl/'
      },
    },
  };

  return m('nav.kaavio-editor-annotation.navbar.navbar-default.navbar-form.well.well-sm', [
    m.component(BridgeDbMithrilComponent, {
      entity: entity
    })

//    m('div.navbar-left', [
//      m.component(annotationTab.xrefSearch, {
//        disabled: vm.disabled,
//        onchange: function(selectedEntityReference) {
//          //var previousEntityReference = vm.entityReference;
//          vm.entityReference = selectedEntityReference;
//          var pvjsElement = vm.pvjsElement;
//          pvjsElement.textContent = undefined;
//          pvjsElement.type = undefined;
//          pvjsElement.getSetEntityReference(selectedEntityReference)
//            .then(function(enrichedEntityReference) {
//              if (vm.entityReference && vm.entityReference.id === enrichedEntityReference.id) {
//                vm.entityReference = enrichedEntityReference;
//              }
//              if (pvjsElement.textContent) {
//                vm.updateTextContent(pvjsElement, pvjsElement.textContent);
//              }
//              m.redraw();
//            }, function(err) {
//              throw err;
//            });
//        },
//        organism: vm.organism,
//        trigger: args.trigger.bind(args)
//      })
//    ]),
//    m('div.form-group.navbar-left', [
//      m('div', {
//        'class': 'form-control',
//        style: {
//          'min-width': '580px',
//          height: '44px'
//        }
//      }, [
//        m('input', {
//          class: 'form-control input input-sm',
//          oninput: m.withAttr('value', vm.updateTextContent.bind(null, vm.pvjsElement)),
//          placeholder: 'Display name',
//          value: vm.pvjsElement.textContent || '',
//          disabled: vm.disabled()
//        }),
//      ]),
//    ]),
  ]);
};

//var sampleEntity = {
//  '@context': context['@context'],
//  organism: 'Homo sapiens',
//  type: ['gpml:Metabolite'],
//  'datasource_name': 'CAS',
//  identifier: '50-00-0',
//  name: 'Formaldehyde',
//  displayName: 'formaldehyde',
//  entityReference: {
//    type: ['biopax:SmallMoleculeReference'],
//    isDataItemIn: {
//      id: 'http://identifiers.org/cas/'
//    },
//    identifier: '50-00-0',
//  },
//};
//
//var node = document.createElement('div');
////node.setAttribute('class', 'dummy');
//document.body.appendChild(node);
//
//function MyComponent(args) {
//  var props = args.props;
//  var createEventHandler = args.createEventHandler;
//  var handleClick = createEventHandler()
//
//  var numberOfClicks = 
//    handleClick.scan(function(acc, ev) {
//      return acc + 1;
//    }, 0)
//    .startWith(0);
//
//  return h('div.my-counter-component', {}, [
//    h('span#counter', {}, 'Number of clicks: ', numberOfClicks),
//    h('span#dummyhey', {}, 'Number of clicks: ', Rx.Observable.return('wow').delay(3000)),
//    h('button#clicker', {onClick: handleClick}, 'Click me!')
//  ]);
//}
//
//render(h(BridgeDbUIElement, {
//  className: 'hello',
//  onChange: function(updatedEntity) {
//    console.log('updatedEntity');
//    console.log(updatedEntity);
//  },
////  '@context': context,
////  baseIri: 'http://localhost:' + process.env.MOCKSERVER_PORT + '/',
////  datasetsMetadataIri:
////      'http://localhost:' + process.env.MOCKSERVER_PORT + '/datasources.txt',
//  organism: sampleEntity.organism,
//  entity: sampleEntity,
//}), node);

module.exports = annotationTab;
