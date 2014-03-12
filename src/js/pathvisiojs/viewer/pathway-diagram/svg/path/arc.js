pathvisiojs.view.pathwayDiagram.svg.path.arc = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm99.5,50c0,27.338341 -22.162117,49.5 -49.5,49.5s-49.5,-22.161659 -49.5,-49.5'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
