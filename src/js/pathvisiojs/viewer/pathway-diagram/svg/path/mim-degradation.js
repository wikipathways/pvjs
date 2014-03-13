pathvisiojs.view.pathwayDiagram.svg.path.mimDegradation = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        path: 'm8,50c0,-23.20442 18.79558,-42 42,-42c23.20442,0 42,18.79558 42,42c0,23.20442 -18.79558,42 -42,42c-23.20442,0 -42,-18.79558 -42,-42z'
      },
      {
        name:'d',
        path:'m1,1l99,99'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
