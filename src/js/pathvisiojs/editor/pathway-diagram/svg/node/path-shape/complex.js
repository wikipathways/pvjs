pathvisiojs.view.pathwayDiagram.svg.node.pathShape.complex = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight) {
      var attributes = [
        {
          name:'d',
          path: 'M ' + (0 + 18) + ' ' + 0 +
            ' L ' + (0 + nodeWidth - 18) + ' ' + 0 +
            ' L ' + (0 + nodeWidth) + ' ' + (0 + 18) +
            ' L ' + (0 + nodeWidth) + ' ' + (0 + nodeHeight - 18) +
            ' L ' + (0 + nodeWidth - 18) + ' ' + (0 + nodeHeight) +
            ' L ' + (0 + 18) + ' ' + (0 + nodeHeight) +
            ' L ' + (0) + ' ' + (0 + nodeHeight - 18) +
            ' L ' + (0) + ' ' + (0 + 18) +
            ' Z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
