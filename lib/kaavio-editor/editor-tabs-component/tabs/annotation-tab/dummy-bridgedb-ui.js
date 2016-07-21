var Rx = require('rx-extra');
var yolk = require('yolk');
var h = yolk.h;

var BridgeDbUIElement = function(args) {
  var createEventHandler = args.createEventHandler;
  var props = args.props;

  var onChange$ = props.onChange;
  var entityIn$ = props.entity;
  var organismIn$ = props.organism;

  //return h('p', {}, organismIn$);

  return h('div', {
      entity: entityIn$,
      onChange: onChange$,
      organism: organismIn$,
    }, 
    h('p', null, organismIn$)
  );
};

module.exports = BridgeDbUIElement;
