var m = require('mithril');

//module for footerOpenButton
//for simplicity, we use this module to namespace the model classes
var footerOpenButton = {};

//the view-model,
footerOpenButton.vm = (function() {
  var vm = {};

  vm.stateMappings = {
    closed: {
      style: 'visibility: visible; '
    },
    open: {
      style: 'visibility: hidden; '
    }
    // nothing displays for disabled
  };

  vm.label = m.prop('Quick Edit');

  vm.init = function(ctrl) {
    vm.onunload = function() {
      console.log('unloading footerOpenButton module');
    };
  };

  return vm;
}());

//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything
footerOpenButton.controller = function(ctrl) {
  footerOpenButton.vm.init(ctrl);
};

//here's the view
footerOpenButton.view = function(ctrl, args) {
  var vm = footerOpenButton.vm;
  vm.stateMapping = vm.stateMappings[
    args.kaavioComponent.vm.state.footer()];
  return window.m('div', {
    'onclick': function onClick(e) {
      args.kaavioComponent.vm.state.footer('open');
    },
    'style': vm.stateMapping.style,
    'class': 'editor-open-control editor-' +
        args.kaavioComponent.vm.state.footer() +
        ' label label-default'
  }, [
    window.m('span.glyphicon.glyphicon-chevron-up[aria-hidden="true"]'),
    window.m('span', {}, ' ' + vm.label()),
  ])
};

module.exports = footerOpenButton;
