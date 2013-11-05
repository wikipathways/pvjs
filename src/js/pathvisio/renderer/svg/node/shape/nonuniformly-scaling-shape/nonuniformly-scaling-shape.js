pathvisio.renderer.svg.node.shape.nonuniformlyScalingShape = function(){

  // Be sure to specify style elements like default fill and stroke color!
  // This can be done in the JSON below, or it can be done via defining a CSS class. If you choose to use a CSS class,
  // the class name must be the same as the shape name, except in dash case (roundedRectangle would be rounded-rectangle).
  // The CSS file is located at /src/css/pathway-template.css

  var definitions = {
    roundedRectangle: {
      name: 'roundedRectangle',
      attributes: [
        {
          name:'d',
          value: 'm0,2.5c0,-1.35845 1.14155,-2.5 2.5,-2.5l95,0c1.35844,0 2.5,1.14155 2.5,2.5l0,45c0,1.35845 -1.14156,2.5 -2.5,2.5l-95,0c-1.35845,0 -2.5,-1.14155 -2.5,-2.5l0,-45z'
        }
      ]
    },
    fancifulShape: {
      name: 'fancifulShape',
      attributes: [
        {
          name:'d',
          value: 'm25.73027,4.84839c-1,0 -3.01291,-0.16018 -4,0c-3.12144,0.50654 -4.31001,1.33749 -7,3c-1.203,0.7435 -3.58579,3.58579 -5,5c-0.70711,0.70711 -1.54049,3.0535 -2,5c-0.51374,2.17625 -1,3 -1,4c0,2 0,2 0,3c0,1 2.4588,2.69344 3,4c1.14805,2.77164 2.13464,4.81145 5,7c2.51308,1.91948 6.87856,3.49346 10,4c2.96126,0.48055 5,0 6,0c3,0 3,-1 3,-3c0,0 2.2565,-2.797 3,-4c1.66251,-2.68999 0.82108,-6.29869 4,-8c0.88168,-0.47186 1.85273,-2.1731 3,-3c1.81399,-1.30745 2.41886,-0.41886 4,-2c1.58114,-1.58114 2,-2 5,-2c1,0 2.07612,-0.38268 3,0c2.61312,1.08239 3.67947,2.5711 6,7c1.46763,2.80108 2.49346,4.87856 3,8c0.16018,0.98709 0,3 0,4c0,0 0.41422,0.58578 -1,2c-1.41422,1.41422 -5,0 -7,0c-5,0 -10.30448,0.46926 -14,2c-2.61312,1.08239 -2.22836,1.85195 -5,3c-1.30656,0.54119 -2.58578,-0.41422 -4,1c-0.70711,0.70711 -0.23463,1.15224 -1,3c-0.54119,1.30656 -1.76537,1.15224 -1,3c1.08239,2.61312 5.22936,4.33198 9,6c3.29733,1.45864 7.90779,3.49623 12,4c4.96254,0.61092 9,1 13,1c2,0 4,0 7,0c1,0 3,0 5,0c0,0 2.1034,-0.90633 3,-2c2.28588,-2.78833 3.95517,-5.54916 5,-9c0.57957,-1.91418 -0.37135,-5.74675 -3,-10c-1.17557,-1.90211 -2.49346,-3.87856 -3,-7c-0.16018,-0.98709 -2,-1 -2,-3c0,-1 0,-3 0,-6c0,-2 0,-4 0,-4c1,-1 2,-1 3,-1c2,0 5,0 7,0c2,0 6,0 8,0c2,0 5.87856,0.49346 9,1c0.98709,0.16018 2.2987,-1.05146 4,0c1.90211,1.17557 1.19028,3.88152 3,7c1.12234,1.934 1,5 1,5c0,1 -1.29289,3.29289 -2,4c-1.41422,1.41422 -1.81145,2.13464 -4,5c-1.91948,2.51308 -2,4 -2,4l0,2l-1,0'
        },
        {
          name:'fill',
          value:'yellow' 
        },
        {
          name:'stroke',
          value:'red' 
        }
      ]
    }
  };

  function render(nonuniformlyScalingShape) {
    nonuniformlyScalingShape.attr("id", function (d) {return 'shape-' + d.id;})
    .attr("class", function (d) {
      var styleClass = '';
      if (d.elementType === 'data-node') {
        styleClass = 'shape nonscalable ' + d.dataNodeType + ' ' + d.shapeType;
      }
      else {
        styleClass = 'shape nonscalable ' + d.shapeType;
      }
      return styleClass;
    })

    // TODO there must be a cleaner, less brittle way of getting nodeData here

    var nodeData = nonuniformlyScalingShape[0].parentNode.__data__;
    var shapeType = caseConverter.camelCase(nodeData.shapeType);
    var nonuniformlyScalingShapeAttributes = pathvisio.renderer.svg.node.shape.nonuniformlyScalingShape[shapeType].getAttributes(nodeData.width, nodeData.height);
    nonuniformlyScalingShapeAttributes.forEach(function(attribute) {
      nonuniformlyScalingShape.attr(attribute.name, attribute.value)
    });

  }

  function renderAll(nodes, pathway, uniformlyScalingShapesList) {
    if (!nodes || !pathway || !uniformlyScalingShapesList) {
      console.log(uniformlyScalingShapesList);
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!uniformlyScalingShapesList) {
        console.log('uniformlyScalingShapesList not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or uniformlyScalingShapesList.');
    }

    var nonscalableNodes = nodes.filter(function(d, i) { return uniformlyScalingShapesList.indexOf(d.shapeType) === -1; });

    // Update… 
    var nonuniformlyScalingShapes = nonscalableNodes.selectAll("path.shape nonscalable")
    .data(function(d) {
      return [d];
    })
    .call(render);

    // Enter…
    nonuniformlyScalingShapes.enter().append("path")
    .call(render);

    // Exit…
    nonuniformlyScalingShapes.exit().remove();
  }

  return {
    renderAll:renderAll
  };
}();
