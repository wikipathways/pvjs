pathvisiojs.view.pathwayDiagram.svg.path.none = function(){
  'use strict';

  function getAttributes(data) {
    var attributes = [
      {
        name:'d',
        value: 'M0 0'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
