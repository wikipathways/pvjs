pathvisiojs.view.pathwayDiagram.svg.node.pathShape.triangle = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        path: 'm' + x + ','+height+'l' + y + ',-'+height+'l'+width+','+height/2+'l-'+width+','+height/2+'z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
