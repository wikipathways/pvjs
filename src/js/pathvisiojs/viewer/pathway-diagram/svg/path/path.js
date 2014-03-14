pathvisiojs.view.pathwayDiagram.svg.path = function(){
  'use strict';

  function render(parent, data) {
    var re, pathNameToUse;
    //*
    console.log('***********************');
    console.log('data');
    console.log(data);
    console.log(parent);
    console.log(data);
    console.log('data.shape');
    console.log(data.shape);
    //*/
    pathNameToUse = strcase.camelCase(data.shape);
    console.log('pathNameToUse');
    console.log(pathNameToUse);

    if (!pathvisiojs.view.pathwayDiagram.svg.path.hasOwnProperty(pathNameToUse)) {
      re = /double$/gi;
      pathNameToUse = pathNameToUse.replace(re, '');
      if (pathvisiojs.view.pathwayDiagram.svg.path.hasOwnProperty(pathNameToUse)) {
        console.warn('Requested path "' + data.shape + '" is not available with linetype of "Double". Using linetype of "Solid" instead');
      }
      else {
        console.warn('Requested path "' + data.shape + '" is not available. Using path "rounded-rectangle" instead');
        pathNameToUse = 'roundedRectangle';
      }
    }

    var path = parent.append('path');

    var pathRenderer = {
      strokeDasharray: function(strokeDasharrayValue){
        path.attr('stroke-dasharray', strokeDasharrayValue);
      },
      fill: function(fillValue){
        path.attr('fill', fillValue);
      },
      stroke: function(strokeValue){
        path.attr('stroke', strokeValue);
      },
      rotation: function(rotationValue) {
        var transform = 'rotate(' + rotationValue + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')';
        path.attr('transform', transform);
      },
      strokeWidth: function(strokeWidthValue) {
        path.attr('stroke-width', strokeWidthValue);
      }
    };

    var elementAttributeKey;
    var elementAttributes = d3.map(data).entries();
    d3.map(data).entries().forEach(function(elementAttribute){
      elementAttributeKey = elementAttribute.key;
      if (pathRenderer.hasOwnProperty(elementAttributeKey)) {
        pathRenderer[elementAttributeKey](elementAttribute.value);
      }
    });

    var shapeSpecificAttributes = pathvisiojs.view.pathwayDiagram.svg.path[pathNameToUse].getAttributes(data);
    shapeSpecificAttributes.forEach(function(attribute) {
      console.log('pathNameToUse');
      console.log(pathNameToUse);
      console.log('attribute');
      console.log(attribute);
      var names = [attribute.name];
      var paths = [attribute.path];
      for(var i = 0; i < names.length; i++){
        path.attr(names[i], paths[i]);
      }
    });
  }

  return {
    render:render
  };
}();
