pathvisiojs.view.pathwayDiagram.svg.path.brace = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var pathData = 'm' + x + ',' + (y + height) +
      'C' + (x) + ' ' + (y) + ' ' + (x + width/2) + ' ' + (y + height) + ' ' + (x + width/2) + ' ' + (y) +
      'C' + (x + width/2) + ' ' + (y + height) + ' ' + (x + width) + ' ' + (y) + ' ' + (x + width) + ' ' + (y + height);
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
