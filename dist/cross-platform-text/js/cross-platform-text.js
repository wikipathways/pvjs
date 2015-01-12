/* cross-platform-text 0.0.11
Built on 2014-08-15
https://github.com/ariutta/cross-platform-text
License: http://www.apache.org/licenses/LICENSE-2.0/ */

var crossPlatformText = {
  getInstance: function(args){
    var targetSelector = args.targetSelector;
    var target = document.querySelector(targetSelector);
    var targetTagName = target.tagName;
    var format, targetImage;

    var htmlContainerElements = [
      'div',
      'section',
      'p'
    ];

    if (!!targetTagName && htmlContainerElements.indexOf(targetTagName.toLowerCase()) > -1) {
      format = args.format;
      targetImage = this[format].createTargetImage(crossPlatformTextInstance, target);
    } else {
      format = targetTagName;
      targetImage = target;
    }

    var viewport = this[format].getOrCreateViewport(this, targetImage);
    var crossPlatformTextInstance = Object.create(this);
    crossPlatformTextInstance.targetImage = targetImage;
    Object.keys(this[format]).forEach(function(key) {
      if (!crossPlatformTextInstance[key]) {
        if (typeof crossPlatformTextInstance[key] === 'object') {
          crossPlatformTextInstance[key] = Object.create(crossPlatformTextInstance[format][key]);
        } else {
          crossPlatformTextInstance[key] = crossPlatformTextInstance[format][key];
        }
      }
    });
    return crossPlatformTextInstance;
  },
  isNumber: function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  },
  convertToPx: function(inputString, fontSize) {
    // if current fontSize is 12pt, then 1em = 12pt = 16px = 100%
    var inputStringLowerCased, px;
    if (this.isNumber(inputString)) {
      px = inputString;
    }
    else {
      inputStringLowerCased = inputString.toLowerCase();
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
    }
    return px;
  }
};





crossPlatformText.svg = {
  xmlNS: 'http://www.w3.org/XML/1998/namespace',
  svgNS: 'http://www.w3.org/2000/svg',
  xmlnsNS: 'http://www.w3.org/2000/xmlns/',
  xlinkNS: 'http://www.w3.org/1999/xlink',
  evNS: 'http://www.w3.org/2001/xml-events',

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
  createTargetImage: function(crossPlatformTextInstance, targetElement) {
    var svgId = 'svg-' + new Date().toISOString().replace(/\D/g, '');
    var targetSvg = document.createElementNS(this.svgNS, 'svg');
    targetSvg.setAttribute('xmlns', this.svgNS);
    targetSvg.setAttributeNS(this.xmlnsNS, 'xmlns:xlink', this.xlinkNS);
    targetSvg.setAttributeNS(this.xmlnsNS, 'xmlns:ev', this.evNS);
    targetSvg.setAttribute('id', svgId);
    targetSvg.setAttribute('version', '1.1');
    targetSvg.setAttribute('baseProfile', 'full');
    targetSvg.setAttribute('preserveAspectRatio', 'xMidYMid');
    targetSvg.setAttribute('width', '100%');
    targetSvg.setAttribute('height', '100%');
    targetElement.appendChild(targetSvg);
    this.targetImage = targetSvg;
    return targetSvg;
  },
  getOrCreateViewport: function(crossPlatformTextInstance, targetSvg) {
    var viewport = targetSvg.querySelector('g.viewport');

    // If no g element with class 'viewport' exists, create one
    if (!viewport) {
      var viewportId = 'viewport-' + new Date().toISOString().replace(/\D/g, '');
      viewport = document.createElementNS(this.svgNS, 'g');
      viewport.setAttribute('id', viewportId);
      viewport.setAttribute('class', 'viewport');

      // Internet Explorer (all versions?) can't use childNodes, but other browsers prefer (require?) using childNodes
      var targetSvgChildren = targetSvg.childNodes || targetSvg.children;
      if (!!targetSvgChildren && targetSvgChildren.length > 0) {
        do {
          viewport.appendChild(targetSvgChildren[0]);
        } while (targetSvgChildren.length > 0);
      }
      targetSvg.appendChild(viewport);
    }

    return viewport;
  },
  render: function(data, callback) {
    // set defaults, if they are not specified.
    // TODO handle this better, more like svg-pan-zoom does the options
    data.color = data.color || 'black';
    data.fontSize = data.fontSize || 12;
    data.padding = data.padding || 0;

    var svgTextDataGenerator = this;
    var crossPlatformTextInstance = this.crossPlatformTextInstance;
    var attributeDependencyOrder = [
      'fontSize'
    ];

    var textContentSplitIntoLines = data.textContent.split(/\r\n|\r|\n|&#xA;/g);
    var textLineCount = textContentSplitIntoLines.length;

    var padding = data.padding,
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
    var textArea = document.createElementNS(this.svgNS, 'g');
    textArea.setAttribute('transform', transform);

    if (!!data.containerSelector) {
      this.targetImage.querySelector(data.containerSelector).appendChild(textArea);
    } else {
      this.targetImage.appendChild(textArea);
    }

    var textAreaSelection = d3.select(textArea);
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

    var attributes = [];

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

    if (!!callback) {
      return callback(textAreaSelection[0][0]);
    } else {
      return textAreaSelection[0][0];
    }
  }
};



crossPlatformText.canvas = {};
