pathvisio.renderer.svg.node.label = function(){
  function render(svg, pathway, label) {
    if (!svg || !pathway) {
      if (!svg) {
        console.log('svg');
      }
      if (!pathway) {
        console.log('pathway');
      }
      return console.warn('Error: Missing one or more required parameters: svg, pathway.');
    }

    // Update… 
    var nodes = svg.selectAll("g.node")
    .data(function(d) { return d.pathway.elements.filter(function(element) {return element.renderableType === 'node'})})
    .attr('transform', function(d) {return 'translate(' + d.x + ' ' + d.y + ')';})
    .attr('class', 'node')
    .call(drag);

    // Enter…
    nodes.enter().append("g")
    .attr('class', 'node')
    .attr('transform', function(d) {return 'translate(' + d.x + ' ' + d.y + ')';})
    .call(drag);

    // Exit…
    nodes.exit().remove();


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

    return {
      render:render,
      renderAll:renderAll
    };
  }();
