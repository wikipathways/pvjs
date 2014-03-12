pathvisiojs.view.pathwayDiagram.svg.path.none = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'M0 0'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
