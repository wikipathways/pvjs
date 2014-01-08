pathvisiojs.view.pathwayDiagram.svg.node.pathShape.roundedRectangle = function(){

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          value: 'm0,2.5' +
            'c0,-1.35845 1.14155,-10 10,-10' +
            'l' + (nodeWidth - 20) + ',0' + 
            'c1.35844,0 10,1.14155 10,10' + 
            'l0,' + (nodeHeight - 20) + 
            'c0,1.35845 -1.14156,10 -10,10' + 
            'l' + (20 - nodeWidth) + ',0' + 
            'c-1.35845,0 -10,-1.14155 -10,-10' + 
            'l0,' + (20 - nodeHeight) + 
            'z'
        },
        {
          name:'vector-effect',
          value: 'non-scaling-stroke'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
