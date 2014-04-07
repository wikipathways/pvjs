pathvisiojs.renderer.svg.node.pathShape.rectangle = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'm0,0l'+ nodeWidth +',0l0,'+ nodeHeight + 'l-' + nodeWidth +',0l0,-' + nodeHeight +'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
