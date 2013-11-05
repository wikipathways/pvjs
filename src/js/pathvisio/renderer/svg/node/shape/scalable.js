pathvisio.renderer.svg.node.shape.scalable = function(){
  function appendCustom(customShape, callback) {
    // TODO don't select svg again
    var svg = d3.select('#pathway-svg');
    if (1===1) {
      d3.xml(customShape.url, 'image/svg+xml', function(svgXml) {

        def = svg.select('defs').select('#' + customShape.id);
        if (!def[0][0]) {
          def = svg.select('defs').append('symbol')
          .attr('id', customShape.id)
          .attr('preserveAspectRatio', 'none');
        }
        else {
          def.selectAll('*').remove();
        }


        var shape = d3.select(svgXml.documentElement)
        var width = shape.attr('width');
        var height = shape.attr('height');

        def.attr('viewBox', '0 0 ' + width + ' ' + height);

        var parent = document.querySelector('#' + customShape.id);


        var d3Svg = d3.select(svgXml.documentElement).selectAll('*');
        d3Svg[0].forEach(function(element){
          parent.appendChild(element);
        });
        callback(null);
      });
    }
    else {
      img = document.createElement('img');
      img.src = customShape.url;
      img.onload = function() {
        def = svg.select('defs').select('#' + customShape.id);
        if (!def[0][0]) {
          def = svg.select('defs').append('symbol')
          .attr('id', customShape.id)
          .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
          .attr('preserveAspectRatio', 'none');
        }
        else {
          def.selectAll('*').remove();
        }
        dimensions = def.attr('viewBox').split(' ');

        /*
        def.append('image').attr('xlink:xlink:href', customShape.url)
        .attr('x', dimensions[0])
        .attr('y', dimensions[1])
        .attr('width', dimensions[2])
        .attr('height', dimensions[3])
        .attr('externalResourcesRequired', "true");
        //*/

        callback(null);
      }
    }

    /*
    def.append('object').attr('data', customShape.url)
    .attr('x', dimensions[0])
    .attr('y', dimensions[1])
    .attr('width', dimensions[2])
    .attr('height', dimensions[3])
    .attr('type', "image/svg+xml");
    //*/


  }

  function loadAllCustom(customShapes, callback) {
    var image = null;
    var img = null;
    var def = null;
    var dimensions = null;
    var dimensionSet = [];

    async.each(customShapes, appendCustom, function(err){
        // if any of the saves produced an error, err would equal that error
      callback(null);
    });
  }

  function getScalableShapesList(svg, callback) {
    var scalableShapesList = [];
    svg.select('defs').selectAll('symbol')[0].forEach(function(element){
      scalableShapesList.push(element.id);
    });
    console.log('scalableShapesList');
    console.log(scalableShapesList);
    callback(scalableShapesList);
  }




  function render(nodes, pathway, scalableShapesList) {
    if (!nodes || !pathway || !scalableShapesList) {
      console.log(scalableShapesList);
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!scalableShapesList) {
        console.log('scalableShapesList not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or scalableShapesList.');
    }

    var scalableNodes = nodes.filter(function(d, i) { return scalableShapesList.indexOf(d.shapeType) > -1; });

    // Update… 
    var scalableShapes = scalableNodes.selectAll("use.shape scalable")
    .data(function(d) {
      self.hey = d;
      console.log('d for scalableShapes');
      console.log(d);
      return [d];
    })
    .attr("id", function (d) {return 'shape-' + d.id;})
    .attr('transform', function(d) {
      var transform = 'scale(1)';
      if (d.hasOwnProperty('rotation')) {
        transform = 'rotate(' + d.rotation + ' ' + d.width / 2 + ' ' + d.height / 2 + ')';
      }
      return transform;
    })
    .attr("class", function (d) {
      var styleClass = '';
      if (d.elementType === 'data-node') {
        styleClass = 'shape ' + d.dataNodeType;
      }
      else {
        styleClass = 'shape';
      }
      return styleClass;
    })
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", function (d) { return d.width;})
    .attr("height", function (d) { return d.height;})
    .attr("z-index", function (d) { return d.zIndex;})

    // Enter…
    scalableShapes.enter().append("use")
    .attr("id", function (d) {return 'shape-' + d.id;})
    .attr('transform', function(d) {
      var transform = 'scale(1)';
      if (d.hasOwnProperty('rotation')) {
        transform = 'rotate(' + d.rotation + ' ' + d.width / 2 + ' ' + d.height / 2 + ')';
      }
      return transform;
    })
    .attr("class", function (d) {
      var styleClass = '';
      if (d.elementType === 'data-node') {
        styleClass = 'shape ' + d.dataNodeType;
      }
      else {
        styleClass = 'shape';
      }
      return styleClass;
    })
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", function (d) { return d.width;})
    .attr("height", function (d) { return d.height;})
    .attr("z-index", function (d) { return d.zIndex;})
    .attr("style", function (d) {
      var style = '';

      if (d.hasOwnProperty('fill')) {
        style += 'fill:' + d.fill + '; ';
      }

      if (d.hasOwnProperty('fillOpacity')) {
        style += 'fill-opacity:' + d.fillOpacity + '; ';
      }

      if (d.hasOwnProperty('stroke')) {
        style += 'stroke:' + d.stroke + '; ';
      }

      var strokeWidthEffective = null;
      if (d.hasOwnProperty('strokeWidth')) {

        // Doubling strokeWidth to create strokeWidthEffective.
        // Reason: stroke is centered on perimeter of node, requiring us to use an SVG clipping Path to clip off the outermost half
        // of the stroke so that the stroke does not go outside its bounding box. Because the outer half of the stroke is not displayed, we need to
        // double the stroke width so that the stroke's apparent width matches the value specified in GPML.

        strokeWidthEffective = 2 * d.strokeWidth;
      }
      else {
        strokeWidthEffective = 2;
      }

      style += 'stroke-width:' + strokeWidthEffective + '; ';

      if (d.hasOwnProperty('strokeStyle')) {
        if (d.strokeStyle === 'dashed') {
          style += 'stroke-dasharray: 5,3; ';
        }

        if (d.strokeStyle === 'double') {

          // render second element

          d3.select(nodesContainer[0][i]).append("use")
          .attr("id", function (d) {return 'node-double' + d.id;})
          .attr("class", function (d) {
            var styleClass = '';
            if (d.elementType === 'data-node') {
              styleClass = 'node ' + d.dataNodeType;
            }
            else {
              styleClass = 'node';
            }
            return styleClass;
          })
          .attr('transform', function(d) {
            var transform = 'scale(1)';
            if (d.hasOwnProperty('rotation')) {

              // the reference to width and height here is to specify the center of rotation as the center of the second element

              transform = 'rotate(' + d.rotation + ' ' + (d.width/2) + ' ' + (d.height/2) + ')';
            }
            return transform;
          })
          .attr("x", function(d) {return strokeWidthEffective;})
          .attr("y", function(d) {return strokeWidthEffective;})
          .attr("width", function (d) { return d.width - 2*strokeWidthEffective;})
          .attr("height", function (d) { return d.height - 2*strokeWidthEffective;})
          .attr("xlink:xlink:href", function (d) {return "#" + d.shapeType;})
          //.attr("class", "stroke-color-equals-default-fill-color")
          .attr("style", function(d) { return style + 'fill-opacity:0; ';});
        }
      }

      // be careful that all additions to 'style' go above the 'double-line second element' above
      // so that they are applied to both the first and second elements.

      return style;
    })
    .attr("xlink:xlink:href", function(d) {return '#' + d.shapeType;});

    // Exit…
    scalableShapes.exit().remove();






    /*
      var nodeElement = nodeContainer.append('use')
      .attr("id", function () {return 'node-' + node.id;})
      .attr('transform', function() {
        var transform = 'scale(1)';
        if (node.hasOwnProperty('rotation')) {
          transform = 'rotate(' + node.rotation + ' ' + node.width / 2 + ' ' + node.height / 2 + ')';
        }
        return transform;
      })
      .attr("class", function () {
        var styleClass = '';
        if (node.elementType === 'data-node') {
          styleClass = "node " + node.elementType + ' ' + node.dataNodeType;
        }
        else {
          styleClass = "node " + node.elementType;
        }
        return styleClass;
      })
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", function () { return node.width;})
      .attr("height", function () { return node.height;})
      .attr("z-index", function () { return node.zIndex;})
      .attr("style", function () {
        var style = '';

        if (node.hasOwnProperty('fill')) {
          style += 'fill:' + node.fill + '; ';
        }

        if (node.hasOwnProperty('fillOpacity')) {
          style += 'fill-opacity:' + node.fillOpacity + '; ';
        }

        if (node.hasOwnProperty('stroke')) {
          style += 'stroke:' + node.stroke + '; ';
        }

        var strokeWidthEffective = null;
        if (node.hasOwnProperty('strokeWidth')) {

          // Doubling strokeWidth to create strokeWidthEffective.
          // Reason: stroke is centered on perimeter of node, requiring us to use an SVG clipping Path to clip off the outermost half
          // of the stroke so that the stroke does not go outside its bounding box. Because the outer half of the stroke is not displayed, we need to
          // double the stroke width so that the stroke's apparent width matches the value specified in GPML.

          strokeWidthEffective = 2 * node.strokeWidth;
        }
        else {
          strokeWidthEffective = 2;
        }

        style += 'stroke-width:' + strokeWidthEffective + '; ';

        if (node.hasOwnProperty('strokeStyle')) {
          if (node.strokeStyle === 'dashed') {
            style += 'stroke-dasharray: 5,3; ';
          }

          if (node.strokeStyle === 'double') {

            // render second element

            d3.select(nodesContainer[0][i]).append("use")
            .attr("id", function () {return 'node-double' + node.id;})
            .attr("class", function () {
              var styleClass = '';
              if (node.elementType === 'data-node') {
                styleClass = "node " + node.elementType + ' ' + node.dataNodeType;
              }
              else {
                styleClass = "node " + node.elementType;
              }
              return styleClass;
            })
            .attr('transform', function() {
              var transform = 'scale(1)';
              if (node.hasOwnProperty('rotation')) {

                // the reference to width and height here is to specify the center of rotation as the center of the second element

                transform = 'rotate(' + node.rotation + ' ' + (node.width/2) + ' ' + (node.height/2) + ')';
              }
              return transform;
            })
            .attr("x", function() {return strokeWidthEffective;})
            .attr("y", function() {return strokeWidthEffective;})
            .attr("width", function () { return node.width - 2*strokeWidthEffective;})
            .attr("height", function () { return node.height - 2*strokeWidthEffective;})
            .attr("xlink:xlink:href", function () {return "#" + node.shapeType;})
            //.attr("class", "stroke-color-equals-default-fill-color")
            .attr("style", function() { return style + 'fill-opacity:0; ';});
          }
        }

        // be careful that all additions to 'style' go above the 'double-line second element' above
        // so that they are applied to both the first and second elements.

        return style;
      });

      var shape = svg.select('symbol#' + node.shapeType)
      if (shape.length === 1) {

        // d3 bug strips 'xlink' so need to say 'xlink:xlink';

        nodeElement.attr("xlink:xlink:href", function () {return "#" + node.shapeType;});
      }
      else {
        nodeElement.attr("xlink:xlink:href", "#rectangle");
        console.warn('Pathvisio.js does not have access to the requested shape: ' + node.shapeType + '. Rectangle used as placeholder.');
      }
      //*/

  }


  return {
    render:render,
    loadAllCustom:loadAllCustom,
    getScalableShapesList:getScalableShapesList
  };
}();
