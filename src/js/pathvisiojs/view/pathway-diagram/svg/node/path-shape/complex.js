pathvisiojs.view.pathwayDiagram.svg.node.pathShape.complex = function(){

  function getAttributes(nodeWidth, nodeHeight) {
      var attributes = [
        {
          name:'d',
          value: 'M ' + (0 + 18) + ' ' + 0 +
            ' L ' + (0 + nodeWidth - 18) + ' ' + 0 +
            ' L ' + (0 + nodeWidth) + ' ' + (0 + 18) +
            ' L ' + (0 + nodeWidth) + ' ' + (0 + nodeHeight - 18) +
            ' L ' + (0 + nodeWidth - 18) + ' ' + (0 + nodeHeight) +
            ' L ' + (0 + 18) + ' ' + (0 + nodeHeight) +
            ' L ' + (0) + ' ' + (0 + nodeHeight - 18) +
            ' L ' + (0) + ' ' + (0 + 18) +
            ' Z'
        },
/*        {
          name:'vector-effect',
          value: 'non-scaling-stroke'
        }
*/      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
