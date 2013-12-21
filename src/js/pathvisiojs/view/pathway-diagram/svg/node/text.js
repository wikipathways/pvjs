pathvisiojs.view.pathwayDiagram.svg.node.text = function(){

  // for more details, see 
  // http://www.w3.org/TR/SVG11/text.html#TextAnchorProperty
  // start | middle | end | inherit
  // and
  // http://www.w3.org/TR/CSS2/text.html#alignment-prop
  // left | right | center | justify | inherit

    /*
    'left': 'start',
    'right': 'end',
    'center': 'middle',
    'inherit': 'inherit',
    'justify': null
    //*/

  function getTextAnchor(tspan0, cssTextAlignValue) {
    var direction, textAnchor;
    if (cssTextAlignValue === 'center') {
      textAnchor = 'middle';
    }
    else {
      if (cssTextAlignValue === 'left' || cssTextAlignValue === 'right') {
        direction = pathvisiojs.utilities.getTextDirection('tspan0');
        if (direction === 'ltr') {
          if (cssTextAlignValue === 'left') {
            textAnchor = 'start';
          }
          else {
            textAnchor = 'end';
          }
        }
        else {
          if (cssTextAlignValue === 'left') {
            textAnchor = 'end';
          }
          else {
            textAnchor = 'start';
          }
        }
      }
    }
    return textAnchor;
  };

  function render(nodeContainer, data) {
    var dx, dy, textAlign, textAnchor;

    // TODO don't repeat default fontSize here. Need to follow DRY principle.

    var fontSize = data.text.fontSize || 10;
    if (data.text.hasOwnProperty('textAlign')) {
      textAlign = data.text.textAlign;
      if (textAlign === 'left' || textAlign === 'center' || textAlign === 'right') {
        textAnchor = getTextAnchor(data.text.tspan[0], textAlign);
      }
      else {
        // TODO handle justify and inherit
        textAnchor = 'middle';
      }
    }
    else {
      textAnchor = 'middle';
    }

    var nodeText = nodeContainer.selectAll('text')
    .data(function(d) {
      return [d];
    })
    .enter()
    .append('text')
    .attr("id", function (d) {
      return 'node-text-' + strcase.paramCase(d['@id']);
    })
    .attr("x", 0)
    .attr("y", 0)
    .attr('transform', function(d) {

      // tweak left, center, right horizontal alignment
      // giving padding of 5. maybe this should go into the CSS.

      if (textAnchor === 'start') {
        dx = 5;
      }
      else {
        if (textAnchor === 'end') {
          dx = d.width - 5;
        }
        else {
          dx = d.width / 2;
        }
      }

      // set top, middle, bottom vertical alignment

      if (d.text.hasOwnProperty('verticalAlign')) {
        if (d.text.verticalAlign === 'top') {
          dy = 5 + (1 * fontSize);
        }
        else {
          if (d.text.verticalAlign === 'bottom') {
            dy = d.height - (5 + (0.3 * fontSize) + ((d.text.tspan.length - 1) * fontSize));
          }
          else {
            dy = (d.height / 2) + (0.3 * fontSize) - (((d.text.tspan.length - 1) * fontSize)/2);
          }
        }
      }
      else {
        dy = (d.height / 2) + (0.3 * fontSize) - (((d.text.tspan.length - 1) * fontSize)/2);
      }
      return 'translate(' + dx + ' ' + dy + ')';
    })
    .attr("style", function (d) {
      var style = '';
      if (nodeContainer[0][0]['__data__']['@type'].indexOf('Metabolite') != -1) {
	style += 'fill:#0000FF; ';
      }
      if (nodeContainer[0][0]['__data__']['@type'].indexOf('Pathway') != -1) {
        style += 'fill:rgb(20,150,30); ';
      }
      if (d.text.hasOwnProperty('color')) {
        style += 'fill:' + d.text.color + '; ';
      }
      if (d.text.hasOwnProperty('fontFamily')) {
        style += 'font-family:' + d.text.fontFamily + '; ';
      }
      if (d.text.hasOwnProperty('fontSize')) {
        style += 'font-size:' + d.text.fontSize + 'px; ';
      }
      if (d.text.hasOwnProperty('fontWeight')) {
        style += 'font-weight:' + d.text.fontWeight + '; ';
      }
      if (d.text.hasOwnProperty('fontStyle')) {
        style += 'font-style:' + d.text.fontStyle + '; ';
      }
      return style;
    });

    var nodeTspan = nodeText.selectAll('tspan')
    .data(function(d) {
      return d.text.tspan;
    })
    .enter()
    .append('tspan')
    .attr("x", 0)
    .attr("y", function (d, i) { return i * fontSize;})
    .attr("text-anchor", textAnchor)
    .text(function (d) { return d; });
    return nodeContainer;
  }

  return {
    render:render
  };
}();

