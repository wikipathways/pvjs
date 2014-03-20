pathvisiojs.view.pathwayDiagram.svg.path = function(){
  'use strict';

  function render(parent, data) {
    var re, shapeNameFormatted;
    if (!!data.shape) {
      shapeNameFormatted = strcase.camelCase(data.shape);
      if (!pathvisiojs.view.pathwayDiagram.svg.path.hasOwnProperty(shapeNameFormatted)) {
        // if pathvisiojs cannot render the shape name indicated, check for whether the shape name a double-line shape.
        // If so, check whether pathvisiojs can render a single-line version of the shape.
        // If yes, render the single-line version. Otherwise, render a rounded rectangle.
        re = /double$/gi;
        shapeNameFormatted = shapeNameFormatted.replace(re, '');
        if (pathvisiojs.view.pathwayDiagram.svg.path.hasOwnProperty(shapeNameFormatted)) {
          console.warn('Requested path "' + data.shape + '" is not available with linetype of "Double". Using linetype of "Solid" instead');
        }
        else {
          console.warn('Requested path "' + data.shape + '" is not available. Using path "rounded-rectangle" instead');
          shapeNameFormatted = 'roundedRectangle';
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
        markerStart: function(markerStartValue) {
          path.attr('marker-start', 'url(#src-shape-library-markers-' + markerStartValue + '-svg-start-default)');
        },
        markerEnd: function(markerEndValue) {
          path.attr('marker-end', 'url(#src-shape-library-markers-' + markerEndValue + '-svg-end-default)');
        },
        rotation: function(rotationValue) {
          var transform = 'rotate(' + rotationValue + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')';
          path.attr('transform', transform);
        },
        strokeWidth: function(strokeWidthValue) {
          path.attr('stroke-width', strokeWidthValue);
        }
      };

      // These are generic attributes that can apply to any pathShape.
      var genericAttributeName, genericAttributeValue;
      var genericAttributes = d3.map(data).entries();
      d3.map(data).entries().forEach(function(genericAttribute){
        genericAttributeName = genericAttribute.key;
        genericAttributeValue = genericAttribute.value;
        if (pathRenderer.hasOwnProperty(genericAttributeName)) {
          pathRenderer[genericAttributeName](genericAttributeValue);
        }
      });

      // These attributes apply only to the specific pathShape indicated by "shapeNameFormatted".
      // At time of writing (2014-03-20), the only attribute specified for any shape is the "d" attribute (path data),
      // but pathvisiojs is capable of rendering other attributes if they were to be specified.
      var specificAttributes = pathvisiojs.view.pathwayDiagram.svg.path[shapeNameFormatted].getAttributes(data);
      specificAttributes.forEach(function(attribute) {
        path.attr(attribute.name, attribute.value);
      });
    }
  }

  return {
    render:render
  };
}();
