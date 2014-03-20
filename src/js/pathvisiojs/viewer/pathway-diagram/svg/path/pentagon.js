pathvisiojs.view.pathwayDiagram.svg.path.pentagon = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        value: 'M' + x + ',' + (y + 0.81*height) +
          'l0,-' + 0.62*height +
          'l' + 0.62*width + ',-' + 0.19*height +
          'l' + 0.38*width+',' + 0.5*height +
          'l-' + 0.38*width + ',' + 0.5*height +
          'l-' + 0.62*width + ',-' + 0.19*height +
          'z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
