var _ = require('lodash');
var insertCss = require('insert-css');
var fs = require('fs');
//var m = require('mithril');

var css = [
  fs.readFileSync(__dirname + '/footer.css')
];

css.map(insertCss);

//module for footer
//for simplicity, we use this module to namespace the model classes
var footer = {};

//the view-model,
footer.vm = (function() {
  var vm = {};

  vm.init = function(ctrl) {
    var kaavio = ctrl;
    //*
    var placeholderContent = {};
    placeholderContent.controller = function(ctrl) {
      this.speak = function(name) {
        console.log('name: ' + name);
      }
    };
    placeholderContent.view = function(ctrl, args) {
      return window.m('div', {}, 'Placeholder' + new Date().toISOString());
    };
    vm.content = ctrl.footerContent || placeholderContent;
    //*/

    vm.state = kaavio.kaavioComponent.vm.state.footer;

    vm.onunload = function() {
      vm[vm.state()]();
    };

    vm.open = function() {
      window.setTimeout(function() {
        kaavio.panZoom.resizeDiagram();
      }, 1000);
    };

    vm.closed = function() {
      vm.state('closed');
      kaavio.panZoom.resizeDiagram();
    };

    return vm;
  };
  return vm;
}());

//the controller defines what part of the model is relevant for the current page
//in our case, there's only one view-model that handles everything
footer.controller = function(ctrl) {
  this.vm = footer.vm.init(ctrl);
};

/*
var ContactsWidget = {
  controller: function update() {
    this.contacts = Contact.list()
      this.save = function(contact) {
        Contact.save(contact).then(update.bind(this))
      }.bind(this)
  },
  view: function(ctrl) {
    return [
      window.m.component(ContactForm, {onsave: ctrl.save}),
      window.m.component(ContactList, {contacts: ctrl.contacts})
    ]
  }
};
//*/

// placeholder
//footer.content = window.m.prop(m('div', {}, 'Placeholder'));

//here's the view
footer.view = function(ctrl, args) {
  if (!args.footerContent && !ctrl.vm && !ctrl.vm.content) {
    return;
  }

  if (footer.vm.state() === 'closed') {
    return window.m.component(args.footerOpenButton, args);
  } else if (footer.vm.state() === 'open') {
    return window.m.component(ctrl.vm.content, args);
    /*
    return window.m('section.kaavio-footer.kaavio-footer-open', {}, [
      window.m.component(footer.content, kaavio)
    ]);
    //*/
  }
};

module.exports = footer;
