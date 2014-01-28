pathvisiojs.view.pathwayDiagram.svg.node.pathShape.roundedRectangle = function(){

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'm0,10c0,-5.43379 4.56621,-10 10,-10l' 
		+ (nodeWidth - 20) 
		+ ',0c5.43379,0 10,4.56621 10,10l0,'
		+ (nodeHeight - 20) 
		+ 'c0,5.43379 -4.56621,10 -10,10l' 
		+ (20 - nodeWidth) 
		+ ',0c-5.43379,0 -10,-4.56621 -10,-10l0,' 
		+ (20 - nodeHeight) 
		+ 'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
