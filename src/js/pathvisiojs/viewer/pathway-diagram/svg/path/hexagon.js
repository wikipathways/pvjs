pathvisiojs.view.pathwayDiagram.svg.path.hexagon = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var pathData = 'M' + (x + 0.25 * width) + ',' + y +
      'l' + (0.5 * width) + ',' + 0 +
      'l' + (0.25 * width) + ',' + (0.5 * height) +
      'l' + (-0.25 * width) + ',' + (0.5 * height) +
      'l' + (-0.5 * width) + ',' + 0 +
      'l' + (-0.25 * width) + ',' + (-0.5 * height) +
      'z';
      var attributes = [
        {
          name:'d',
          value: pathData
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
