/***********************************
 * diagramComponent
 **********************************/

var _ = require('lodash');
var Annotation = require('../annotation-panel/annotation-panel.js');
var DiagramRenderer = require('./diagram-renderer.js');
var JSONStream = require('JSONStream');
//var m = require('mithril');
var hyperquest = require('hyperquest');
var resolveUrl = require('resolve-url');
var Rx = require('rx-extra');
var RxNode = Rx.RxNode;

var diagramComponent = {};

//* TODO standardize on either this mithril-style selection.id
// or else selectedPvjsElement().id
// need to also look at whether attenuate is being called incorrectly and
// whether it conflicts with previousHighlighting() calls anywhere
diagramComponent.Selection = function(pvjsElement, highlighter) {
  var that = this;
  pvjsElement = pvjsElement || {};

  this.selector = '#' + pvjsElement.id;
  this.pvjsElement = pvjsElement;
  this.id = pvjsElement.id;

  if (!pvjsElement || !highlighter) {
    return;
  }

  var groups = highlighter.groups;

  if (!_.isEmpty(groups.preset)) {
    this.previousHighlighting = _(groups.preset).map(function(presetItem) {
      return _.zip(presetItem.element, presetItem.highlighting).map(function(zipped) {
        var element = zipped[0];
        var highlighting = zipped[1];
        return {
          element: element,
          highlighting: highlighting
        };
      })
      .filter(function(item) {
        return item.element.id === pvjsElement.id;
      })
      .map(function(item) {
        return _.bind(highlighter.highlight, highlighter,
          that.selector, 'preset', item.highlighting);
      });
    })
    .flatten()
    .first();
  }

  if (!this.previousHighlighting) {
    // if current selection exists and
    // was not highlighted as part of the preset or typeahead groups,
    // this method will allow for de-highlighting this selection
    this.previousHighlighting = _.bind(highlighter.attenuate,
        highlighter, that.selector, 'selected');
  }
};
//*/

diagramComponent.vm = (function() {
  var vm = {};
  vm.diagramRenderer = new DiagramRenderer();

  vm.init = function(kaavio) {

    var selection = new diagramComponent.Selection();

    vm.clickTargetIdSource = new Rx.Subject();

    var clickTargetIdPartition = Rx.Observable.hierarchicalPartition(
        function(id) {
          return id;
        },
        vm.clickTargetIdSource
    );

    var selectionPartition = vm.selectionPartition = Rx.Observable.hierarchicalPartition(
        function(pvjsElement) {
          return pvjsElement;
        },
        clickTargetIdPartition[0]
        .flatMap(function(id) {
          // TODO look at using the code from selector.js here instead
          return Rx.Observable.from(kaavio.sourceData.pvjson.elements)
            .find(function(pvjsElement, i, obs) {
              return pvjsElement.id === id;
            });
        }),
        clickTargetIdPartition[1]
    );

    vm.pvjsElementSource = selectionPartition[0];
    vm.resetSource = selectionPartition[1];

    vm.pvjsElementSource.subscribe(function(pvjsElement) {
      // clear away any highlighting for previously selected element
      vm.reset();
      // highlight currently selected element
      kaavio.highlighter.highlight('#' + pvjsElement.id, 'selected', {
        backgroundColor: 'white', borderColor: 'green'
      });

      // TODO should creating a new selection remove old highlighting and
      // add new highlighting?
      selection = new diagramComponent.Selection(pvjsElement, kaavio.highlighter);
    });

    vm.resetSource.subscribe(function() {
      vm.reset();
    });

    kaavio.annotationPanel = {};
    kaavio.annotationPanel.vm = {};
    kaavio.annotationPanel.vm.disabled = window.m.prop(false);

    kaavio.diagramComponent = diagramComponent;
    // Listen for renderer errors
    kaavio.on('error.renderer', function() {
      vm.diagramRenderer.destroyRender(kaavio, kaavio.sourceData);
    });

    kaavio.on('rendered.renderer', function() {

      /*
      var myinput = {
        mykey: 'myvalue'
      };

      var myWorker = new Worker('my_task.js');

      myWorker.onmessage = function(oEvent) {
        console.log('myinput2');
        console.log(myinput);
        var data = oEvent.data;
        console.log('Worker said : ');
        console.log(data);
        console.log('myinput3');
        console.log(myinput);
        window.newerinput = _.assign(myinput, data);
      };

      myWorker.postMessage(myinput);
      console.log('myinput1');
      console.log(myinput);

      window.oldinput = _.clone(myinput)
      window.newinput = myinput;
      //*/

      kaavio.options.entityReferenceSource
      .subscribe(function(entityReference) {
        kaavio.sourceData.selector.addElement(entityReference);
      }, function(err) {
        throw err;
      }, function() {
        // Search for reference id on demand
        /*
        Rx.Observable.if(
            function() {
              console.log('!kaavio.annotationPanel.vm.disabled()');
              console.log(!kaavio.annotationPanel.vm.disabled());
              return !kaavio.annotationPanel.vm.disabled();
              //return true;
              //return false;
            },
            vm.pvjsElementSource
        )
        //*/
        //*
        vm.pvjsElementSource
        // TODO this seems like the wrong way to disable the annotation panel
        // when the editor is open.
        .filter(function(pvjsElement) {
          return !kaavio.annotationPanel.vm.disabled();
        })
        .filter(function(pvjsElement) {
          // jscs: disable
          return (pvjsElement.datasource_name || pvjsElement.db) && pvjsElement.identifier;
          // jscs: enable
        })
        .doOnNext(function(pvjsElement) {
          // TODO move this functionality into an annotation-panel driver
          var annotationElement = document.querySelector('.annotation');
          annotationElement.style.visibility = 'visible';

          annotationElement.querySelector('.annotation-items-container-list')
          .classList.add('ariutta-loading');

          annotationElement.querySelector('.annotation-header-text').textContent =
            pvjsElement.textContent;

          annotationElement.querySelector('.annotation-description').textContent =
            pvjsElement['gpml:Type'].replace('gpml:', '');
        })
        .filter(function(pvjsElement) {
          return !!pvjsElement.getSetEntityReference;
        })
        .flatMap(function(pvjsElement) {
          return Rx.Observable.zip(
              Rx.Observable.return(pvjsElement),
              Rx.Observable.fromPromise(pvjsElement.getSetEntityReference()),
              function(x, y) {
                return [x, y];
              }
          );
        })
        .doOnNext(function() {
          // TODO move this functionality into an annotation-panel driver
          var annotationElement = document.querySelector('.annotation');
          annotationElement.style.visibility = 'visible';
          annotationElement.querySelector('.annotation-items-container-list')
            .classList.remove('ariutta-loading');
        })
        .subscribe(function(pvjsElementAndEntityReference) {
          var pvjsElement = pvjsElementAndEntityReference[0];
          var entityReference = pvjsElementAndEntityReference[1];

          var entityReferenceId = pvjsElement.entityReference;
          // Get all xrefs with given id
          var selector = kaavio.sourceData.selector.filteredByXRef(
              'id:' + entityReferenceId).getFirst();

          var getAllAnnotationPanelData = pvjsElement.getAllAnnotationPanelData;
          if (getAllAnnotationPanelData) {
            var allAnnotationPanelData = getAllAnnotationPanelData();
            var annotationElementOrSelector = allAnnotationPanelData.annotationElementOrSelector;
            allAnnotationPanelData.annotationDataSource
            .subscribe(function(annotationData) {
              Annotation.render(annotationElementOrSelector, annotationData);
            }, function(err) {
              throw err;
            });
  //          } else {
  //          // TODO get the following working for non-pvjs use cases
  //            Annotation.render(
  //                kaavio.$element.select('.annotation')[0][0],
  //                dataConverter(pvjson, entityReference)
  //            );
          }
//          // If any xref found
//          if (!selector.isEmpty()) {
//            // If first element has xrefs field
//            if (selector[0].xref && selector[0].xref.length) {
//              // Filter to include only BridgeDb xrefs API endpoint
//              var filtered = selector[0].xref.filter(function(xref) {
//                return xref.indexOf('bridgedb.org' !== -1)
//              })
//
//              // If at least one xref left
//              if (filtered.length) {
//                entityReferenceId = filtered[0]
//              }
//            }
//          }
        }, function(err) {
          throw err;
        });
      });
    });

    vm.footerState = kaavio.kaavioComponent.vm.state.footer;

    vm.destroy = function() {
      vm.diagramRenderer.destroyRender(kaavio, kaavio.sourceData);
    };

    vm.onunload = function() {
      vm.reset();
      return;
    };

    vm.reset = function() {
      document.querySelector('.annotation').style.visibility = 'hidden';

      if (!!selection.previousHighlighting) {
        // return highlighting to previous state, if it exists
        selection.previousHighlighting();
      }
      selection = new diagramComponent.Selection();
    };
  };

  return vm;
})();

diagramComponent.controller = function(ctrl) {
  diagramComponent.vm.init(ctrl);
};

/*
//here's an example plugin that determines whether data has changes.
//in this case, it simply assumes data has changed the first time, and never changes after that.
var renderOnce = (function() {
  var cache = {};
  return function(view) {
    if (!cache[view.toString()]) {
      cache[view.toString()] = true;
      return view(cache);
    } else {
      return {subtree: 'retain'};
    }
  };
}());
//*/

function getEvent(e) {
  e = e || event;
  return e;
}

function getVmPropName(e, elPropName, vmPropName) {
  if (!vmPropName) {
    // e.g., clickTargetIdSource or keyupTargetTagNameSource
    vmPropName = e.type + 'Target' + elPropName.replace(/(^.)/, function(match) {
      return match.toUpperCase();
    }) + 'Source';
  }
  return vmPropName;
}

function getElPropValue(el, elPropName) {
  return elPropName in el ? el[elPropName] : el.getAttribute(elPropName);
}

function getCurrentTarget(e) {
  e = getEvent(e);
  var currentTarget = e.currentTarget || this;
  return currentTarget;
}

function getTarget(e) {
  e = getEvent(e);
  var target = e.target;
  return target;
}

function rxPushEvent(e, eventName) {
  var vm = this;
  e = getEvent(e);
  if (!eventName) {
    eventName = e.type + 'Source';
  }
  vm[eventName].onNext(e);
}

// gets attribute of the element to which the
// event was added
function rxWithAttr(elPropName, vmPropName) {
  var vm = this;
  return _.flow(getEvent.bind(this),
      function(e) {
        vmPropName = getVmPropName(e, elPropName, vmPropName);
        var currentTarget = getCurrentTarget.bind(this)(e);
        var elPropValue = getElPropValue(currentTarget, elPropName);
        vm[vmPropName].onNext(elPropValue);
      });
}

// gets attribute of the element upon which the event
// actually occurred
function rxWithTargetAttr(elPropName, vmPropName) {
  var vm = this;
  return _.flow(getEvent,
      function(e) {
        vmPropName = getVmPropName(e, elPropName, vmPropName);
        var target = e.target;
        var elPropValue = getElPropValue(target, elPropName);
        vm[vmPropName].onNext(elPropValue);
      });
}

diagramComponent.view = function(ctrl, kaavio) {
  var component = this;
  var vm = component.vm;
  /*
  return renderOnce(function() {
  });
  //*/
  return m('div', {
    //'class': 'diagram-container footer-' + diagramComponent.vm.footerState() + ' ariutta-loading',
    'class': 'diagram-container footer-' + diagramComponent.vm.footerState(),
    onclick: rxWithTargetAttr.call(vm, 'id'),
    config: function(el, isInitialized) {
      if (!isInitialized) {
        window.m.startComputation();
        kaavio.on('rendered.renderer', function() {
          window.m.endComputation();
        });

        kaavio.diagramContainerElement = el;

        // Init sourceData object
        kaavio.sourceData = {
          pvjson: null, // pvjson object
          selector: null, // selector instance
        };

        Rx.Observable.from([kaavio.options])
        .flatMap(function(options) {
          var pvjson = options.pvjson;
          var src = options.src;

          if (!!pvjson) {
            return Rx.Observable.from([pvjson]);
          } else if (!!src) {
            var absoluteSrc = resolveUrl(src);
            return RxNode.fromUnpausableStream(hyperquest(absoluteSrc)
              .pipe(JSONStream.parse()))
              .toArray()
              .map(function(body) {
                return body[0];
              });
          } else {
            throw new Error('Missing or invalid source pvjson data. The input options ' +
                'require either a "src" property with a string value representing ' +
                'an IRI to a pvjson JSON resource ' +
                'or a "pvjson" property with a parsed JavaScript object representing a ' +
                'pvjson JSON resource.');
          }
        })
        .subscribe(function(pvjson) {
          kaavio.sourceData.pvjson = pvjson;
          diagramComponent.vm.diagramRenderer.render(kaavio);
        }, function(err) {
          // TODO handle this
          throw err;
        }, function() {
          // onComplete
        });

      }
    }
  });
};

module.exports = diagramComponent;
