pathvisiojs.view.pathwayDiagram.svg.path.arc = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        path: 'M' + (99.5 + data.x) + ',' + (50 + data.y) + 'c0,27.338341 -22.162117,49.5 -49.5,49.5s-49.5,-22.161659 -49.5,-49.5'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
