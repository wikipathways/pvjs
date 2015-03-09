/***********************************
 * diagramComponent
 **********************************/

var m = require('mithril');

function DiagramComponent(pvjs) {
  var isInitializedHere = false;
  var diagramComponent = {};

  diagramComponent.vm = (function() {
    var vm = {};
    vm.init = function() {

      vm.color = m.prop('');

      vm.onClickHandler = function(el) {
        if (!!el) {
          console.log('el');
          console.log(el);
        }
      };

      // react to user updating color value
      vm.updateColor = function(newColor) {
        if (!!newColor) {
          vm.color(newColor);
        }
      };

      vm.reset = function() {
        vm.color('');
      };
    };

    return vm;
  })();

  diagramComponent.controller = function() {
    diagramComponent.vm.init();
  };

  /*
  diagramContainerElement.setAttribute(
      'style', 'height: ' + (pvjs.elementHeight - 120) + 'px;');
  pvjs.panZoom.resizeDiagram();
  //*/

  //this view implements a color-picker input for both
  //browers that support it natively and those that don't
  diagramComponent.view = function(ctrl) {
    return m('div.diagram-container.editor-' + m.route.param('editorState'), {
      //*
      config: function(el, isInitialized) {
        if (!isInitializedHere && !isInitialized) {
          //isInitializedHere = true;
          //integrate with the auto-redrawing system...
          //*
          m.startComputation();
          //pvjs.diagramRendererInstance.render(pvjs);
          pvjs.render();
          pvjs.on('rendered', function() {
            m.endComputation();
          });
          //*/
        } else if (!isInitialized) {
          pvjs.render();
          //pvjs.diagramRendererInstance.render(pvjs);
          /*
          m.startComputation();
          pvjs.diagramRendererInstance.render(pvjs);
          m.endComputation();
          //*/
        }

        /*
        if (!isInitialized) {
          //integrate with the auto-redrawing system...
          m.startComputation();
          //pvjs.diagramRendererInstance.render(pvjs);
          pvjs.render();
          pvjs.on('rendered', function() {
            m.endComputation();
          });
        } else {
          m.startComputation();
          pvjs.diagramRendererInstance.render(pvjs);
          m.endComputation();
        }
        //*/
      },
      //*/
      //onclick: diagramComponent.vm.onClickHandler,
      //config: diagramComponent.config(ctrl),
      /*
      onchange: m.withAttr('value', diagramComponent.vm.updateColor),
      value: diagramComponent.vm.color()
      //*/
    });
  };

  return diagramComponent;
}

module.exports = DiagramComponent;
