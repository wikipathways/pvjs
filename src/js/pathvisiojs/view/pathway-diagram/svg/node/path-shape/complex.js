pathvisiojs.view.pathwayDiagram.svg.node.pathShape.complex = function(){

  // Be sure to specify style elements like default fill and stroke color!
  // This can be done in the JSON below, or it can be done via defining a CSS class. If you choose to use a CSS class,
  // the class name must be the same as the shape name, except in dash case (roundedRectangle would be rounded-rectangle).
  // The CSS file is located at /src/css/pathway-diagram.css

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