pathvisiojs.view.pathwayDiagram.svg.path.pentagon = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'm0,'+0.81*nodeHeight+'l0,-'+0.62*nodeHeight+'l'+0.62*nodeWidth+',-'+0.19*nodeHeight+'l'+0.38*nodeWidth+','+0.5*nodeHeight+'l-'+0.38*nodeWidth+','+0.5*nodeHeight+'l-'+0.62*nodeWidth+',-'+0.19*nodeHeight+'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
