crossPlatformText.svg = {

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
  init: function(data, callback) {
    var viewport;
    if (!this.targetImageSelection) {
      var id = args.id || 'cross-platform-text-svg';
      targetImageSelection = this.targetSelection.append('svg')
      .attr('id', id)
      .attr('version', '1.1')
      .attr('baseProfile', 'full')
      .attr('xmlns', 'http://www.w3.org/1999/xlink')
      .attr('xmlns:xmlns:xlink', 'http://www.w3.org/1999/xlink')
      .attr('xmlns:xmlns:ev', 'http://www.w3.org/2001/xml-events')
      .attr('preserveAspectRatio', 'xMidYMid')
      .attr('width', width)
      .attr('height', height);

      viewport = targetImageSelection.append('g')
      .attr('id', 'viewport');
    }
    else {
      targetImageSelection = this.targetImageSelection;
      viewport = targetImageSelection.select('#viewport');
      if (!viewport[0][0]) {
        viewport = targetImageSelection.select('g');
      }
    }

    if (!!callback) {
      callback(viewport);
    }
  },
  render: function(data, callback) {
    var svgTextDataGenerator = this;
    var crossPlatformTextInstance = this.crossPlatformTextInstance;
    var attributeDependencyOrder = [
      'fontSize'
    ];

    var textContentSplitIntoLines = data.textContent.split(/\r\n|\r|\n|&#xA;/g);
    var textLineCount = textContentSplitIntoLines.length;

    var padding = data.padding || 0,
      width = data.width,
      height = data.height,
      fontSize = data.fontSize;
    var paddingInPx = crossPlatformText.convertToPx(padding, fontSize);
    fontSize = crossPlatformText.convertToPx(fontSize, fontSize);

    var textAnchor;
    if (data.textAlign === 'left'){
      textAnchor = 'start';
      textAlignXTranslation = paddingInPx;
    } else if (data.textAlign === 'right') {
      textAnchor = 'end';
      textAlignXTranslation = width - paddingInPx;
    } else {
      textAnchor = 'middle';
      textAlignXTranslation = width / 2;
    }
    var xTranslation = data.x + textAlignXTranslation;

    var textAreaHeight = ((textLineCount - 1) * 1.1 * fontSize);
    var verticalAlignYTranslation;
    if (data.verticalAlign === 'top'){
      verticalAlignYTranslation = paddingInPx + textAreaHeight/2 + fontSize * (2/3);
    } else if (data.verticalAlign === 'bottom') {
      verticalAlignYTranslation = height - paddingInPx - textAreaHeight/2 - fontSize * (2/3);
    } else {
      verticalAlignYTranslation = height/2;
    }

    var yTranslation = data.y + verticalAlignYTranslation;

    var transform = 'translate(' + xTranslation + ' ' + yTranslation + ')';
    var textAreaSelection = targetImageSelection.select(data.containerSelector).append('g')
    .attr('transform', transform);

    var textLinesSelection = textAreaSelection.selectAll('text')
    .data(textContentSplitIntoLines)
    .enter()
    .append('text')
    .attr("id", function (d, i) {
      return 'text-line' + i;
    })
    .attr("x", 0)
    .attr("y", function (d, i) {
      return (i - (textLineCount - 1)/2) * 1.1 + 'em';
    })
    .attr("dominant-baseline", 'central') 
    //.attr("alignment-baseline", data.verticalAlign) 
    .attr("text-anchor", textAnchor)
    .text(function (d) { return d; });

    var result = {};
    var attributes = [];
    result.elementName = 'g';

    var backgroundColor = data.backgroundColor || 'transparent';
    attributes.push({name: 'fill', value: backgroundColor});

    var color;

    var svgTextAttributeGenerator = {
      color: function(colorValue){
        textAreaSelection.attr('fill', colorValue);
      },
      id: function(idValue){
        textAreaSelection.attr('id', 'text-for-' + idValue);
      },
      fill: function(fillValue){
        textAreaSelection.attr('fill', fillValue);
      },
      fillOpacity: function(fillOpacityValue){
        textAreaSelection.attr('fill-opacity', fillOpacityValue);
      },
      fontFamily: function(fontFamilyValue){
        textAreaSelection.attr('font-family', fontFamilyValue);
      },
      fontSize: function(fontSizeValue){
        textAreaSelection.attr('font-size', fontSizeValue);
      },
      fontStyle: function(fontStyleValue){
        textAreaSelection.attr('font-style', fontStyleValue);
      },
      fontWeight: function(fontWeightValue){
        textAreaSelection.attr('font-weight', fontWeightValue);
      },
      rotation: function(rotationValue) {
        transform += ' rotate(' + rotationValue + ',' + (width/2 - textAlignXTranslation) + ',' + (height/2 - verticalAlignYTranslation) + ')';
        textAreaSelection.attr('transform', transform);
      }
    };

    var attributeListItemName, attributeListItemValue;
    var attributeList = d3.map(data).entries().sort(function(a, b) {
      return attributeDependencyOrder.indexOf(a.key) - attributeDependencyOrder.indexOf(b.key);
    });
    attributeList.forEach(function(attributeListItem){
      attributeListItemName = attributeListItem.key;
      attributeListItemValue = attributeListItem.value;
      if (svgTextAttributeGenerator.hasOwnProperty(attributeListItemName)) {
        svgTextAttributeGenerator[attributeListItemName](attributeListItemValue);
      }
    });

    //result.attributes = attributes;
    if (!!callback) {
      callback(textAreaSelection[0][0]);
    }
  }
};

