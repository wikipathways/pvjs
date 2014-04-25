crossPlatformShapes.svg.path = {
  generateMarkerId: function(name, position, color){
    // only keep the alphanumeric characters and dashes. convert to lower case. start with 'id-' just to ensure the first character is a letter.
    var id = ('id-' + name + '-' + position + '-' + color).replace(/[^A-Za-z0-9-]/g, '').toLowerCase();

    return id;
  },
  render: function(shapeName, data, callback) {
    var svgPathGenerator = this;
    var targetImageSelection = this.targetImageSelection;
    var availableMarkers = this.availableMarkers;
    var crossPlatformShapesInstance = this.crossPlatformShapesInstance;
    var attributeDependencyOrder = [
      'color',
      'markerStart',
      'markerEnd'
    ];
    var canvasPathCommandToSvgPathCommandMappings = {
      moveTo: 'M',
      lineTo: 'L',
      closePath: 'Z',
      bezierCurveTo: 'C',
      quadraticCurveTo: 'Q'
    };

    var shapeSelection = targetImageSelection.select(data.containerSelector).append('path');

    // TODO rewrite the path calculation code to not use the d3 path generators
    var shapesUsingD3PathGenerators = [
      'lineCurved',
      'lineElbow',
      'lineSegmented'
    ];
    var d = '';
    if (shapesUsingD3PathGenerators.indexOf(shapeName) === -1) {
      var pathSegments = crossPlatformShapes.pathCalculator[shapeName](data);
      // the path segments are defined using the Canvas path command terms. The path commands used are only those
      // that are common to both Canvas and SVG
      pathSegments.forEach(function(pathSegment) {
        d += canvasPathCommandToSvgPathCommandMappings[pathSegment.command];
        d += pathSegment.points.join(',');
      });
    }
    else {
      d = crossPlatformShapes.pathCalculator[ shapeName ](data);
    }
    shapeSelection.attr('d', d);


    var backgroundColor = data.backgroundColor || 'transparent';
    shapeSelection.attr('fill', backgroundColor);

    var color;

    var svgPathAttributeGenerator = {
      id: function(idValue){
        shapeSelection.attr('id', idValue);
      },
      strokeDasharray: function(strokeDasharrayValue){
        shapeSelection.attr('stroke-dasharray', strokeDasharrayValue);
      },
      fillOpacity: function(fillOpacityValue){
        shapeSelection.attr('fill-opacity', fillOpacityValue);
      },
      color: function(colorValue){
        color = colorValue;
        shapeSelection.attr('stroke', colorValue);
      },
      markerStart: function(markerStartValue) {
        crossPlatformShapesInstance.svg.marker.append(markerStartValue, 'start', color, function(markerAttributeValue) {
          shapeSelection.attr('marker-start', markerAttributeValue);
        });
      },
      markerEnd: function(markerEndValue) {
        crossPlatformShapesInstance.svg.marker.append(markerEndValue, 'end', color, function(markerAttributeValue) {
          shapeSelection.attr('marker-end', markerAttributeValue);
        });
      },
      rotation: function(rotationValue) {
        var transform = 'rotate(' + rotationValue + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')';
        shapeSelection.attr('transform', transform);
      },
      borderWidth: function(borderWidthValue) {
        shapeSelection.attr('stroke-width', borderWidthValue);
      }
    };

    // These are generic attributes that can apply to any pathShape.
    var attributeListItemName, attributeListItemValue;
    var attributeList = d3.map(data).entries().sort(function(a, b) {
      return attributeDependencyOrder.indexOf(a.key) - attributeDependencyOrder.indexOf(b.key);
    });
    attributeList.forEach(function(attributeListItem){
      attributeListItemName = attributeListItem.key;
      attributeListItemValue = attributeListItem.value;
      if (svgPathAttributeGenerator.hasOwnProperty(attributeListItemName)) {
        svgPathAttributeGenerator[attributeListItemName](attributeListItemValue);
      }
    });

    if (!!callback) {
      callback(shapeSelection[0][0]);
    }
  }
};
