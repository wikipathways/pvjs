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

  function convertToPx(inputString, fontSize) {
    // if current fontSize is 12pt, 1em = 12pt = 16px = 100%
    var inputStringLowerCased = inputString.toLowerCase(),
      px;
    if (inputStringLowerCased.indexOf('em') > -1) {
      px = inputStringLowerCased.slice(0,inputStringLowerCased.length-2) * fontSize;
    }
    else if (inputStringLowerCased.indexOf('px') > -1) {
      px = inputStringLowerCased.slice(0,inputStringLowerCased.length-2);
    }
    else if (inputStringLowerCased.indexOf('pt') > -1) {
      px = inputStringLowerCased.slice(0,inputStringLowerCased.length-2) * (4/3);
    }
    else if (inputStringLowerCased.indexOf('%') > -1) {
      px = (inputStringLowerCased.slice(0,inputStringLowerCased.length-1) / 100) * fontSize;
    }
    else {
      px = inputString;
    }
    return px;
  }

  function render(parent, data) {
    console.log('****************');
    console.log('parent');
    console.log(parent);
    console.log('data');
    console.log(data);
    var containerPadding = data.containerPadding || 0,
      containerWidth = data.containerWidth,
      containerHeight = data.containerHeight,
      fontSize = data.fontSize;
    var containerPaddingInPx = convertToPx(containerPadding, fontSize);
    console.log('containerPaddingInPx');
    console.log(containerPaddingInPx);
    var textAnchor;
    if (data.textAlign == 'left'){
      textAnchor = 'start';
    } else if (data.textAlign == 'right') {
      textAnchor = 'end';
    } else {
      textAnchor = 'middle';
    }

    var textAlignXTranslation;
    if (data.textAlign === 'left'){
      textAlignXTranslation = containerPaddingInPx;
    } else if (data.textAlign === 'right') {
      textAlignXTranslation = containerWidth - containerPaddingInPx;
    } else {
      textAlignXTranslation = containerWidth / 2;
    }

    var textLines = data.textContent.split(/\r\n|\r|\n/g);
    var textLineCount = textLines.length;
    var textAreaHeight = ((textLineCount - 1) * 1.1 * fontSize);
    var verticalAlignYTranslation;
    if (data.verticalAlign === 'top'){
      verticalAlignYTranslation = containerPaddingInPx + textAreaHeight/2 + fontSize;
    } else if (data.verticalAlign === 'bottom') {
      verticalAlignYTranslation = containerHeight - containerPaddingInPx - textAreaHeight/2 - fontSize/3;
    } else {
      verticalAlignYTranslation = containerHeight/2 + fontSize/3;
    }

    var xTranslation = data.containerX + textAlignXTranslation;
    var yTranslation = data.containerY + verticalAlignYTranslation;

    var textArea = parent.append('g')
    .attr("id", function () {
      return 'text-container' + pathvisiojs.view.pathwayDiagram.svg.convertToId(data.id);
    })
    .attr('transform', function() {
      return 'translate(' + xTranslation + ' ' + yTranslation + ')';
    })
    .attr("class", "text-area");
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
    //.attr("alignment-baseline", data.verticalAlign)
    .attr("text-anchor", textAnchor)
    .text(function (d) { return d; });

    /*
    nodeText.attr('transform', function(d) {
      applyTextAlign(nodeText[0][0], d, function(translate) {
        return 'translate(' + translate.dx + ' ' + translate.dy + ')';
      });
    })
    //*/
    var pathRenderer = {
      fontStyle: function(fontStyleValue){
        textLine.attr('font-style', fontStyleValue);
      },
      fontWeight: function(fontWeightValue){
        textLine.attr('font-weight', fontWeightValue);
      },
      fontSize: function(fontSizeValue){
        textLine.attr('font-size', fontSizeValue);
      },
      fontFamily: function(fontFamilyValue){
        textLine.attr('font-family', fontFamilyValue);
      },
      strokeDasharray: function(strokeDasharrayValue){
        textLine.attr('stroke-dasharray', strokeDasharrayValue);
      },
      fill: function(fillValue){
        textLine.attr('fill', fillValue);
      },
      stroke: function(strokeValue){
        textLine.attr('stroke', strokeValue);
      },
      rotation: function(rotationValue) {
        var transform = 'rotate(' + rotationValue + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')';
        textLine.attr('transform', transform);
      },
      strokeWidth: function(strokeWidthValue) {
        textLine.attr('stroke-width', strokeWidthValue);
      }
    };

    var elementAttributeKey;
    var elementAttributes = d3.map(data).entries();
    d3.map(data).entries().forEach(function(elementAttribute){
      elementAttributeKey = elementAttribute.key;
      if (pathRenderer.hasOwnProperty(elementAttributeKey)) {
        pathRenderer[elementAttributeKey](elementAttribute.value);
      }
    });

    return parent;
  }

  return {
    render:render
  };
}();

