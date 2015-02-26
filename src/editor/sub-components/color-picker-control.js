/***********************************
 * colorPickerControl
 **********************************/

var m = require('mithril');

var colorPickerControl = {};

/**
colorPickerControl config factory. The params in this doc refer to properties
                                      of the `ctrl` argument
@param {Object} data - the data with which to populate the <input>
@param {number} value - the hex value of the item in `data` that we want to select
@param {function(Object id)} onchange - the event handler to call when the selection changes.
    `id` is the the same as `value`
*/
colorPickerControl.config = function(ctrl) {
  return function(element, isInitialized) {
    var el = $(element).find('input[type="color"]');

    if (!Modernizr.inputtypes.color && !isInitialized) {
      // Polyfill for browsers that don't natively
      // support inputs of type "color"
      m.startComputation();
      window.setTimeout(function() {
        el.spectrum({
          preferredFormat: 'hex',
          showPalette: true,
          palette: [
            ['black', 'white', 'blanchedalmond'],
            ['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
          ]
        });
        //the service is done, tell Mithril that it may redraw
        m.endComputation();
      }, 250);
    }
  }
}

colorPickerControl.vm = (function() {

  var vm = {};
  vm.init = function() {

    vm.color = m.prop('');

    // react to user updating color value
    vm.updateColor = function(newColor) {
      if (!!newColor) {
        vm.color(newColor);
      }
    };

    vm.reset = function() {
      vm.color('');
    }

  }

  return vm;
})();

colorPickerControl.controller = function() {
  colorPickerControl.vm.init();
}

//this view implements a color-picker input for both
//browers that support it natively and those that don't
colorPickerControl.view = function(ctrl) {
  return m('div.input-group.input-group-sm', {config: colorPickerControl.config(ctrl)}, [
    m('span.input-group-addon', {}, 'Color'),
    m('input[type="color"][value="#3355cc"][style="width: 50px; height: 30px;"]', {
      onchange: m.withAttr('value', colorPickerControl.vm.updateColor),
      value: colorPickerControl.vm.color()
    })
  ]);
}

module.exports = colorPickerControl;
