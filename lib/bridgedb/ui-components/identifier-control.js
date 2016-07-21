/******************************
  * identifier control
  *****************************/

var Rx = global.Rx = global.Rx || require('rx-extra');
var yolk = require('yolk');
var h = yolk.h;

function IdentifierControl(args) {
  var createEventHandler = args.createEventHandler;
  var props = args.props;

  var disabled$ = (props.disabled || Rx.Observable.return(false));
  var onChange$ = props.onChange;
  var required$ = (props.required || Rx.Observable.return(false));

  var identifierDisplayValue$ = new Rx.BehaviorSubject();

  var handleExternalChange$ = (props.identifier || Rx.Observable.return(''))
  .subscribe(function(identifier) {
    identifierDisplayValue$.onNext(identifier);
  });

  var handleInputFieldChange$ = createEventHandler(function(ev) {
    return ev.target.value;
  });

  handleInputFieldChange$
  .subscribe(function(identifier) {
    if (onChange$) {
      onChange$.subscribe(function(onChange) {
        onChange(identifier);
      });
    }
  });
  //handleInputFieldChange$.subscribe(identifierDisplayValue$);

  return h('input', {
    className: 'pvjs-editor-identifier form-control input input-sm',
    placeholder: 'Identifier',
    disabled: disabled$,
    onChange: handleInputFieldChange$,
    required: required$,
    type: 'text',
    value: identifierDisplayValue$
  });
}

module.exports = IdentifierControl;
