pathvisiojs.view.pathwayDiagram.svg.label = function(){
  function renderAll(nodes, pathway) {
    if (!nodes || !pathway) {
      if (!nodes) {
        console.log('nodes');
      }
      if (!pathway) {
        console.log('pathway');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway.');
    }

    // Update… 
    var labels = nodes.selectAll("text.label")
    .data(function(d) { return [d]; })
    .call(render);

    // Enter…
    labels.enter().append("text")
    .call(render);

    // Exit…
    labels.exit().remove();
  }

  function render(nodeText) {
    nodeText.attr("id", function (d) { return 'node-text-' + d.id;})
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
            dy = d.height - (5 + (0.3 * d.textLabel.fontSize) + ((pathvisiojs.utilities.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize));
          }
          else {
            dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisiojs.utilities.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
          }
        }
      }
      else {
        dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisiojs.utilities.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
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
            var textArray = pathvisiojs.utilities.splitStringByNewLine(d.textLabel.text);
            return textArray;
          })
          .enter()
          .append('tspan')
          .attr("x", 0)
          .attr("y", function (d, i) { return i * fontSize;})
          .text(function (d) { return d;});
        });
  }


  return {
    renderAll:renderAll
  };
}();
