pathvisiojs.view.pathwayDiagram.svg.text = function(){
  'use strict';

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


  function render(parent, data) {
    console.log('****************');
    console.log('parent');
    console.log(parent);
    console.log('data');
    console.log(data);
    // TODO make a better caching system
    var text = {};
    text = {};
    text.textAnchor = function() {
      if (data.textAlign == 'left'){
        return 'start';
      } else if (data.textAlign == 'right') {
        return 'end';
      } else {
        return 'middle';
      }
    };
    text.x = function() {
      if (data.textAlign == 'left'){
        return -1 * data.containerWidth / 2;
      } else if (data.textAlign == 'right') {
        return data.containerWidth / 2;
      } else {
        return 0;
      }
    };
    text.dx = data.containerX + data.containerWidth / 2;
    text.dy = data.containerY + data.containerHeight / 2;
    var textLineYValues = [];
    var textLines = data.textContent.split(/\r\n|\r|\n/g);
    var textLineCount = textLines.length;
    var i = 0;
    textLines.forEach(function(line) {
      textLineYValues.push(i * data.fontSize);
      i += 1;
    });

    var textArea = parent.data([data])
    .append('g')
    .attr("id", function (d) {
      return 'text-container' + pathvisiojs.view.pathwayDiagram.svg.convertToId(d.id);
    })
    .attr('transform', function(d) {
      return 'translate(' + text.dx + ' ' + text.dy + ')';
    })
    .attr("class", "text-area")
    .attr("style", function (d) {
      var style = '';
      if (d.hasOwnProperty('color')) {
        style += 'fill:' + d.color + '; ';
      }
      if (d.hasOwnProperty('fontFamily')) {
        style += 'font-family:' + d.fontFamily + '; ';
      }
      if (d.hasOwnProperty('fontSize')) {
        style += 'font-size:' + d.fontSize + 'px; ';
      }
      if (d.hasOwnProperty('fontWeight')) {
        style += 'font-weight:' + d.fontWeight + '; ';
      }
      if (d.hasOwnProperty('fontStyle')) {
        style += 'font-style:' + d.fontStyle + '; ';
      }
      return style;
    });
    console.log('textArea');
    console.log(textArea);

    var textLine = textArea.selectAll('text')
    .data(function(d) {
      return textLines;
    })
    .enter()
    .append('text')
    .attr("id", function (d, i) {
      return 'text-line' + i;
    })
    .attr("x", 0)
    .attr("y", function (d, i) { return (i - (textLineCount - 1)/2) * 1.1 + 'em';})
    .attr("alignment-baseline", data.verticalAlign)
    .attr("text-anchor", text.textAnchor)
    .text(function (d) { return d; });

    /*
    nodeText.attr('transform', function(d) {
      applyTextAlign(nodeText[0][0], d, function(translate) {
        return 'translate(' + translate.dx + ' ' + translate.dy + ')';
      });
    })
    //*/

    return parent;
  }

  return {
    render:render
  };
}();

