pathvisiojs.view.pathwayDiagram.svg.node.pathShape.groupComplex = function(){

  // Be sure to specify style elements like default fill and stroke color!
  // This can be done in the JSON below, or it can be done via defining a CSS class. If you choose to use a CSS class,
  // the class name must be the same as the shape name, except in dash case (roundedRectangle would be rounded-rectangle).
  // The CSS file is located at /src/css/pathway-template.css


  function getAttributes(nodeWidth, nodeHeight) {
      var attributes = [
        {
          name:'d',
          value: 'M ' + (0 + 20) + ' ' + 0 + ' L ' + (0 + nodeWidth - 20) + ' ' + 0 + ' L ' + (0 + nodeWidth) + ' ' + (0 + 20) + ' L ' + (0 + nodeWidth) + ' ' + (0 + nodeHeight - 20) + ' L ' + (0 + nodeWidth - 20) + ' ' + (0 + nodeHeight) + ' L ' + (0 + 20) + ' ' + (0 + nodeHeight) + ' L ' + (0) + ' ' + (0 + nodeHeight - 20) + ' L ' + (0) + ' ' + (0 + 20) + ' Z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
