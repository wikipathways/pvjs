"use strict";
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

  // TODO make a better caching system
  var cachedFontSize = 12;
  var cachedPadding = 5;

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

  function applyTextAlign(d) {
    console.log('repositioning text');
    var element = this;
    var dx, dy;
    var computedStyle = window.getComputedStyle(element);
    var textAlign = computedStyle.textAlign;
    var verticalAlign = computedStyle.verticalAlign;
    var fontSize = computedStyle.fontSize;
    var bBox = element.getBBox()
    var parent = element.parentElement;
    parent.bBox = parent.getBBox();

    // tweak left, center, right horizontal alignment
    // giving padding of 5. maybe this should go into the CSS.

    if (textAlign === 'left') {
      dx = 5 + (-1)*bBox.x;
    }
    else {
      if (textAlign === 'right') {
        dx = parent.bBox.width - (5 + bBox.width) + (-1)*bBox.x;
      }
      else {
        dx = parent.bBox.width / 2 + (-1)*bBox.x;
      }
    }

    //var textAnchor = getTextAnchor(element.tspan[0], textAlign);
    //element.style.textAnchor = textAnchor;

    // set top, middle, bottom vertical alignment

    if (!!verticalAlign) {
      if (verticalAlign === 'top') {
        dy = 5 + bBox.height + (-1)*bBox.y;
      }
      else {
        if (verticalAlign === 'bottom') {
          dy = parent.bBox.height - (5 + bBox.height) + (-1)*bBox.y;
        }
        else {
          dy = ((parent.bBox.height / 2) + bBox.height/2) + (-1)*bBox.y;
        }
      }
    }
    else {
      dy = ((parent.bBox.height / 2) + bBox.height/2) + (-1)*bBox.y;
    }

    var nodeText = d3.select(element) 
    .attr('transform', function(d) {
      return 'translate(' + dx + ' ' + dy + ')';
    });

    var tSpanComputedStyle, tSpanBBox;
    var tSpans = nodeText.selectAll('tspan').map(function(tSpan) {
      tSpanComputedStyle = window.getComputedStyle(tSpan[0]);
      tSpanBBox = tSpan[0].getBBox();
      d3.select(this).attr("y", function (d, i) { return i * tSpanBBox.height;})
    });
  }

  function render(nodeContainer, data) {
    var dx, dy, textAlign, textAnchor;

    // TODO don't repeat default fontSize here. Need to follow DRY principle.

    var fontSize = data.text.fontSize || cachedFontSize;
    /*
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
    //*/

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
      var dx, dy;
      dx = d.width - (cachedPadding + d.text.tspan[0].length * cachedFontSize / 2);
      dy = d.height - (cachedPadding + (d.text.tspan.length + 1) * cachedFontSize);
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
    })
    .on('progress', applyTextAlign);

    var nodeTspan = nodeText.selectAll('tspan')
    .data(function(d) {
      return d.text.tspan;
    })
    .enter()
    .append('tspan')
    .attr("x", 0)
    .attr("y", function (d, i) { return i * fontSize;})
    .attr("text-anchor", 'middle')
    .text(function (d) { return d; });


    /*
    nodeText.attr('transform', function(d) {
      applyTextAlign(nodeText[0][0], d, function(translate) {
        return 'translate(' + translate.dx + ' ' + translate.dy + ')';
      });
    })
    //*/

    return nodeContainer;
  }

  return {
    render:render,
    applyTextAlign:applyTextAlign
  };
}();

