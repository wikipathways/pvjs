pathvisiojs.view.pathwayDiagram.svg.node.pathShape.roundedRectangle = function(){

  // Be sure to specify style elements like default fill and stroke color!
  // This can be done in the JSON below, or it can be done via defining a CSS class. If you choose to use a CSS class,
  // the class name must be the same as the shape name, except in dash case (roundedRectangle would be rounded-rectangle).
  // The CSS file is located at /src/css/pathway-template.css

  function getAttributes(nodeWidth, nodeHeight) {
      var attributes = [
        {
          name:'d',
          value: 'm0,2.5c0,-1.35845 1.14155,-2.5 2.5,-2.5l' + (nodeWidth - 5) + ',0c1.35844,0 2.5,1.14155 2.5,2.5l0,' + (nodeHeight - 5) + 'c0,1.35845 -1.14156,2.5 -2.5,2.5l' + (5 - nodeWidth) + ',0c-1.35845,0 -2.5,-1.14155 -2.5,-2.5l0,' + (5 - nodeHeight) + 'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
