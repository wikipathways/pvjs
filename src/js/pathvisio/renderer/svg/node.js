// Draw nodes. Includes data nodes, shapes, labels, cellular components...

pathvisio.renderer.svg.node = function(){

  // TODO What happens if we have right to left flowing text?

  var alignToAnchorMappings = { "Left":"start", "Center":"middle", "Right":"end" };

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



  function render(svg, pathway, node) {
    if (!svg || !pathway || !node) {
      if (!svg) {
        console.log('svg not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!node) {
        console.log('node not specified');
      }
      return console.warn('Error: Missing one or more required parameters: svg, pathway, node.');
    }

    var nodeContainer = svg.select('#viewport')
    .append("g")
    .attr("id", function () { return 'nodes-container-' + node.id;})
    .attr('transform', function() { return 'translate(' + node.x + ' ' + node.y + ')';})
    .attr("class", "nodes-container")
    .on("click", function(d,i) {
      if (node.elementType === 'data-node') {
        pathvisio.renderer.svg.xRef.displayData(pathway.organism, d);
      }
      /*
         var xrefDiv = $('.xrefinfo');

      // (id, datasource, species, shape)

      var xrefHtml = XrefPanel.create(node.xRef.id, node.xRef.database, 'Homo sapiens', node.textLabel.text);
      //var xrefHtml = XrefPanel.create('HMDB01397', 'HMDB', 'Mus musculus', node.textLabel.text);
      window.setTimeout(function() {
      xrefDiv.empty();
      xrefDiv.append(xrefHtml);
      }, 2000);
      //*/
      });

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

      // use this for tspan option for rendering text, including multi-line

      if (node.hasOwnProperty('textLabel')) {
        var nodeText = nodeElement.append('text')
        .attr("id", function () { return 'node-text-' + node.id;})
        .attr("x", 0)
        .attr("y", 0)
        .attr('transform', function() {

          // tweak left, center, right horizontal alignment

          var dx = null;

          if (node.textLabel.hasOwnProperty('textAnchor')) {

            // giving padding of 5. maybe this should go into the CSS.

            if (node.textLabel.textAnchor === 'start') {
              dx = 5;
            }
            else {
              if (node.textLabel.textAnchor === 'end') {
                dx = node.width - 5;
              }
              else {
                dx = node.width / 2;
              }
            }
          }
          else {
            dx = node.width / 2;
          }

          // set top, middle, bottom vertical alignment

          var dy = null;

          if (node.textLabel.hasOwnProperty('vAlign')) {
            if (node.textLabel.vAlign === 'top') {
              dy = 5 + (1 * node.textLabel.fontSize);
            }
            else {
              if (node.textLabel.vAlign === 'bottom') {
                dy = node.height - (5 + (0.3 * node.textLabel.fontSize) + ((pathvisio.helpers.splitStringByNewLine(node.textLabel.text).length - 1) * node.textLabel.fontSize));
              }
              else {
                dy = (node.height / 2) + (0.3 * node.textLabel.fontSize) - (((pathvisio.helpers.splitStringByNewLine(node.textLabel.text).length - 1) * node.textLabel.fontSize)/2);
              }
            }
          }
          else {
            dy = (node.height / 2) + (0.3 * node.textLabel.fontSize) - (((pathvisio.helpers.splitStringByNewLine(node.textLabel.text).length - 1) * node.textLabel.fontSize)/2);
          }
          return 'translate(' + dx + ' ' + dy + ')';})
          .attr("class", function () {
            var styleClass = '';
            if (node.elementType === 'data-node') {
              styleClass = node.dataNodeType;
            }
            return styleClass; })
            .attr("style", function () {
              var style = '';
              var fontSize = node.fontSize;
              if (node.textLabel.hasOwnProperty('fill')) {
                style += 'fill:' + node.textLabel.fill + '; ';
              }
              if (node.textLabel.hasOwnProperty('fontFamily')) {
                style += 'font-family:' + node.textLabel.fontFamily + '; ';
              }
              if (node.textLabel.hasOwnProperty('fontSize')) {
                style += 'font-size:' + node.textLabel.fontSize + 'px; ';
              }
              if (node.textLabel.hasOwnProperty('fontWeight')) {
                style += 'font-weight:' + node.textLabel.fontWeight + '; ';
              }
              if (node.textLabel.hasOwnProperty('fontStyle')) {
                style += 'font-style:' + node.textLabel.fontStyle + '; ';
              }
              if (node.textLabel.hasOwnProperty('textAnchor')) {
                style += 'text-anchor:' + node.textLabel.textAnchor + '; ';
              }
              return style;
            });

            var nodeTspan = nodeText.each(function() {
              var fontSize = node.textLabel.fontSize;
              nodeElement.selectAll('tspan')
              .data(function () {
                var textArray = pathvisio.helpers.splitStringByNewLine(node.textLabel.text);
                return textArray;
              })
              .enter()
              .append('tspan')
              .attr("x", 0)
              .attr("y", function (d, i) { return i * fontSize;})
              .text(function (d) { return d;});
            });

            if (node.hasOwnProperty('biopaxRefs')) {
              var nodePublicationXrefs = nodeElement.selectAll(".node-publication-xref-text")
              .data(node.biopaxRefs)
              .enter()
              .append("text")
              .attr("id", function (d) { return 'node-publication-xref-text-' + d;})
              .attr("x", 0)
              .attr("y", 0)
              .attr('transform', function(d,i) { return 'translate(' + (i*12) + ' ' + (-12) + ')';})
              .attr("class", 'node-publication-xref-text')
              .attr("style", "")
              .text(function (d) {

                // d is an array of biopaxRefs

                var index = 0;
                var rdfId = null;
                do {
                  console.log('pathway.biopax');
                  console.log(pathway.biopax);
                  rdfId = pathway.biopax.bpPublicationXrefs[index].rdfId;
                  index += 1;
                } while (rdfId !== node.Text && index < pathway.biopax.bpPublicationXrefs.length);
                return index;});
            }

      }
  }









  function renderAll(svg, pathway) {
    if (!svg || !pathway) {
      if (!svg) {
        console.log('svg');
      }
      if (!pathway) {
        console.log('pathway');
      }
      return console.warn('Error: Missing one or more required parameters: svg, pathway.');
    }

    var nodesContainer = svg.select('#viewport').selectAll("g.nodes-container")
    .data(pathway.nodes)
    .enter()
    .append("g")
    .attr("id", function (d) { return 'nodes-container-' + d.id;})
    .attr('transform', function(d) { return 'translate(' + d.x + ' ' + d.y + ')';})
    .attr("class", "nodes-container")
    .on("click", function(d,i) {
      if (d.elementType === 'data-node') {
        pathvisio.renderer.svg.xRef.displayData(pathway.organism, d);
      }
      /*
         var xrefDiv = $('.xrefinfo');

      // (id, datasource, species, shape)

      var xrefHtml = XrefPanel.create(d.xRef.id, d.xRef.database, 'Homo sapiens', d.textLabel.text);
      //var xrefHtml = XrefPanel.create('HMDB01397', 'HMDB', 'Mus musculus', d.textLabel.text);
      window.setTimeout(function() {
      xrefDiv.empty();
      xrefDiv.append(xrefHtml);
      }, 2000);
      //*/
      });

    var nodes = nodesContainer.each(function(d, i) {
      var node = d3.select(this).append('use')
      .attr("id", function (d) {return 'node-' + d.id;})
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
          styleClass = "node " + d.elementType + ' ' + d.dataNodeType;
          }
          else {
          styleClass = "node " + d.elementType;
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
                      styleClass = "node " + d.elementType + ' ' + d.dataNodeType;
                      }
                      else {
                      styleClass = "node " + d.elementType;
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
        });

    var shape = svg.select('symbol#' + d.shapeType)
      if (shape.length === 1) {

        // d3 bug strips 'xlink' so need to say 'xlink:xlink';

        node.attr("xlink:xlink:href", function (d) {return "#" + d.shapeType;});
      }
      else {
        node.attr("xlink:xlink:href", "#rectangle");
        console.warn('Pathvisio.js does not have access to the requested shape: ' + pathway.nodes[0].shapeType + '. Rectangle used as placeholder.');
      }

    // use this for tspan option for rendering text, including multi-line

    if (d.hasOwnProperty('textLabel')) {
      var nodeText = d3.select(this).append('text')
        .attr("id", function (d) { return 'node-text-' + d.id;})
        .attr("x", 0)
        .attr("y", 0)
        .attr('transform', function(d) {

            // tweak left, center, right horizontal alignment

            var dx = null;

            if (d.textLabel.hasOwnProperty('textAnchor')) {

            // giving padding of 5. maybe this should go into the CSS.

            if (d.textLabel.textAnchor === 'start') {
            dx = 5;
            }
            else {
            if (d.textLabel.textAnchor === 'end') {
            dx = d.width - 5;
            }
            else {
            dx = d.width / 2;
            }
            }
            }
            else {
              dx = d.width / 2;
            }

            // set top, middle, bottom vertical alignment

            var dy = null;

            if (d.textLabel.hasOwnProperty('vAlign')) {
              if (d.textLabel.vAlign === 'top') {
                dy = 5 + (1 * d.textLabel.fontSize);
              }
              else {
                if (d.textLabel.vAlign === 'bottom') {
                  dy = d.height - (5 + (0.3 * d.textLabel.fontSize) + ((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize));
                }
                else {
                  dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
                }
              }
            }
            else {
              dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
            }
            return 'translate(' + dx + ' ' + dy + ')';})
              .attr("class", function (d) {
                  var styleClass = '';
                  if (d.elementType === 'data-node') {
                  styleClass = d.dataNodeType;
                  }
                  return styleClass; })
              .attr("style", function (d) {
                  var style = '';
                  var fontSize = d.fontSize;
                  if (d.textLabel.hasOwnProperty('fill')) {
                  style += 'fill:' + d.textLabel.fill + '; ';
                  }
                  if (d.textLabel.hasOwnProperty('fontFamily')) {
                  style += 'font-family:' + d.textLabel.fontFamily + '; ';
                  }
                  if (d.textLabel.hasOwnProperty('fontSize')) {
                  style += 'font-size:' + d.textLabel.fontSize + 'px; ';
                  }
                  if (d.textLabel.hasOwnProperty('fontWeight')) {
                  style += 'font-weight:' + d.textLabel.fontWeight + '; ';
                  }
                  if (d.textLabel.hasOwnProperty('fontStyle')) {
                  style += 'font-style:' + d.textLabel.fontStyle + '; ';
                  }
                  if (d.textLabel.hasOwnProperty('textAnchor')) {
                  style += 'text-anchor:' + d.textLabel.textAnchor + '; ';
                  }
                  return style;
              });

            var nodeTspan = nodeText.each(function(d) {
                var fontSize = d.textLabel.fontSize;
                d3.select(this).selectAll('tspan')
                .data(function (d) {
                  var textArray = pathvisio.helpers.splitStringByNewLine(d.textLabel.text);
                  return textArray;
                  })
                .enter()
                .append('tspan')
                .attr("x", 0)
                .attr("y", function (d, i) { return i * fontSize;})
                .text(function (d) { return d;});
                });

            if (d.hasOwnProperty('biopaxRefs')) {
              var nodePublicationXrefs = d3.select(this).selectAll(".node-publication-xref-text")
                .data(d.biopaxRefs)
                .enter()
                .append("text")
                .attr("id", function (d) { return 'node-publication-xref-text-' + d;})
                .attr("x", 0)
                .attr("y", 0)
                .attr('transform', function(d,i) { return 'translate(' + (i*12) + ' ' + (-12) + ')';})
                    .attr("class", 'node-publication-xref-text')
                    .attr("style", "")
                    .text(function (d) {

                      // d is an array of biopaxRefs

                      var index = 0;
                      var rdfId = null;
                      do {
                      console.log('pathway.biopax');
                      console.log(pathway.biopax);
                      rdfId = pathway.biopax.bpPublicationXrefs[index].rdfId;
                      index += 1;
                      } while (rdfId !== d.Text && index < pathway.biopax.bpPublicationXrefs.length);
                      return index;});
                    }

                    }

                    /*

    // use this for foreignObject object option for rendering text, including multi-line

    if (d.hasOwnProperty('textLabel')) {
    var nodeSwitch = d3.select(this).append('switch');

    var nodeForeignObject = nodeSwitch.append('foreignObject') 
    //.attr("x", 0)
    //.attr("y", 0)
    .attr("width", function (d) { return d.width + 'px';})
    .attr("height", function (d) { return d.height + 'px';});

    var nodeBody = nodeForeignObject.append('xhtml:body') 
    .attr("xmlns", "http://www.w3.org/1999/xhtml")
    .attr("id", function (d) { return 'node-text-' + d.id;})
    .attr("style", function (d) { return 'height:' + d.height + 'px';});

    var nodeLink = nodeBody.append('link') 
    .attr("rel", "stylesheet")
    .attr("href", "pathways.css")
    .attr("type", "text/css");

    var nodeOuter = nodeBody.append('div') 
    .attr("class", "outer") 
    .attr("style", function (d) { return 'height:' + d.height + 'px';});

    var nodeP = nodeOuter.append('p') 
    .attr("style", function (d) { 
    var style = 'height:' + d.height + 'px; ';
    if (d.textLabel.hasOwnProperty('color')) {
    style += 'color:' + d.textLabel.color + '; ';
    }
    if (d.textLabel.hasOwnProperty('fontWeight')) {
    style += 'font-weight:' + d.textLabel.fontWeight + '; ';
    }
    if (d.textLabel.hasOwnProperty('fontStyle')) {
    style += 'font-style:' + d.textLabel.fontStyle + '; ';
    }
    return style;
    })
    .text(function (d) {
    var text = d.textLabel.text;
    return text;
    })
    .attr("class", function (d) { 
    var styleClass = '';
    if (d.elementType === 'data-node') {
    styleClass = "node " + d.elementType + ' ' + d.dataNodeType;
    }
    else {
    styleClass = "node " + d.elementType;
    }
    return styleClass });

    var nodeText = nodeSwitch.append('text')
    .attr("id", function (d) { return 'node-text-' + d.id;})
    .attr("x", function (d) { return d.width / 2;})
    .attr("y", function (d) { return d.height / 2 + 0.3 * d.textLabel.fontSize;})
    //.attr("style", function (d) { return 'stroke:' + 'red';})
    .attr("style", function (d) { 
    var style = '';
    if (d.textLabel.hasOwnProperty('color')) {
    style += 'fill:' + d.textLabel.color + '; ';
    }
    if (d.textLabel.hasOwnProperty('fontWeight')) {
    style += 'font-weight:' + d.textLabel.fontWeight + '; ';
    }
    if (d.textLabel.hasOwnProperty('fontStyle')) {
    style += 'font-style:' + d.textLabel.fontStyle + '; ';
    }
    return style;
    })
    .text(function (d) { return d.textLabel.text;});

    }
    */
      });

    }

    function getPortCoordinates(boxDimensions, relX, relY) {
      var port = {};
      port.x = boxDimensions.x + (relX * boxDimensions.width);
      port.y = boxDimensions.y + (relY * boxDimensions.height);
      return port;
    }

    function highlightByLabel(svg, nodeLabel) {
      svg.selectAll('.highlighted-node').remove();
      var dataNodes = pathway.nodes.filter(function(element) {return element.elementType === 'data-node';});
      var dataNodesWithText = dataNodes.filter(function(element) {return (!!element.textLabel);});
      var selectedNodes = dataNodesWithText.filter(function(element) {return element.textLabel.text.indexOf(nodeLabel) !== -1;});
      selectedNodes.forEach(function(node) {
        var nodeDomElement = svg.select('#nodes-container-' + node.graphId);
        var height = nodeDomElement[0][0].getBBox().height;
        var width = nodeDomElement[0][0].getBBox().width;
        nodeDomElement.append('rect')
        .attr('class', 'highlighted-node')
        .attr('x', -2.5)
        .attr('y', -2.5)
        .attr('width', width + 5)
        .attr('height', height + 5);
      });
    }
    return {
      render:render,
      renderAll:renderAll,
      getPortCoordinates:getPortCoordinates,
      loadAllCustom:loadAllCustom,
      highlightByLabel:highlightByLabel
    };
  }();
