pathvisiojs.data.gpml.graphics = {
  defaults: {
    'FontSize':{
      'Type':"FontSize",
      'Value':10
    }
  },

  toPvjson: function(gpmlSelection, elementSelection, pvjsonElement, pvjsonText, callback) {
      var parentElement,
      attribute,
      i,
      graphics = elementSelection.select('Graphics')[0][0],
      gpmlDoubleLineProperty = '',
      pvjsonHeight,
      pvjsonWidth,
      pvjsonStrokeWidth,
      gpmlShapeType = '',
      pvjsonShape,
      pvjsonZIndex,
      pvjsonTextAlign,
      pvjsonVerticalAlign,
      pvjsonRelY,
      pvjsonX,
      pvjsonY,
      model = this.model;

    var attributeDependencyOrder = [
      'LineStyle',
      'ShapeType',
      'FillColor',
      'Color',
      'LineThickness',
      'Width',
      'Height',
      'RelX',
      'RelY',
      'CenterX',
      'CenterY'
    ];

    var gpmlToPvjsonConverter = {
      LineStyle: function(gpmlLineStyleValue){
        var pvjsonStrokeDasharray;
        // TODO hard-coding these here is not the most maintainable
        if (gpmlLineStyleValue === 'Broken') {
          pvjsonStrokeDasharray = '5,3';
          pvjsonElement.strokeDasharray = pvjsonStrokeDasharray;
        }
        else if (gpmlLineStyleValue === 'Double') {
          gpmlDoubleLineProperty = '-double';
        }
        return pvjsonStrokeDasharray;
      },
      ShapeType: function(gpmlShapeTypeValue){
        gpmlShapeType = gpmlShapeTypeValue;
        if (gpmlShapeType.toLowerCase() === 'none') {
          pvjsonShape = 'rectangle';
        }
        else {
          pvjsonShape = strcase.paramCase(gpmlShapeType) + gpmlDoubleLineProperty;
        }
        pvjsonElement.shape = pvjsonShape;
        return pvjsonShape;
      },
      ConnectorType: function(gpmlConnectorTypeValue){
        var gpmlConnectorType = gpmlConnectorTypeValue;
        pvjsonShape = strcase.paramCase('line-' + gpmlConnectorType) + gpmlDoubleLineProperty;
        pvjsonElement.connectorType = gpmlConnectorType;
        pvjsonElement.shape = pvjsonShape;
        return pvjsonShape;
      },
      FillColor: function(gpmlFillColorValue){
        var cssColor = gpmlColorToCssColor(gpmlFillColorValue);
        if (gpmlShapeType.toLowerCase() !== 'none') {
          pvjsonElement.fill = cssColor;
          pvjsonElement.backgroundColor = cssColor;
        }
        else {
          pvjsonElement.fill = 'transparent';
        }
      },
      Color: function(gpmlColorValue){
        var cssColor = gpmlColorToCssColor(gpmlColorValue);
        if (gpmlShapeType.toLowerCase() !== 'none') {
          pvjsonElement.stroke = cssColor;
          pvjsonElement.color = cssColor;
        }
        else {
          pvjsonElement.stroke = 'transparent';
        }
        pvjsonText.fill = cssColor;
      },
      Padding: function(gpmlPaddingValue){
        var cssPadding;
        if (pathvisiojs.utilities.isNumber(gpmlPaddingValue)) {
          cssPadding = parseFloat(gpmlPaddingValue);
        }
        else {
          cssPadding = gpmlPaddingValue;
        }
        pvjsonElement.padding = cssPadding;
        pvjsonText.containerPadding = cssPadding;
      },
      FontSize: function(gpmlFontSizeValue){
        var cssFontSize;
        if (pathvisiojs.utilities.isNumber(gpmlFontSizeValue)) {
          cssFontSize = parseFloat(gpmlFontSizeValue);
        }
        else {
          cssFontSize = gpmlFontSizeValue;
        }
        pvjsonText.fontSize = cssFontSize;
      },
      FontName: function(gpmlFontNameValue){
        var cssFontFamily = gpmlFontNameValue;
        pvjsonText.fontFamily = cssFontFamily;
      },
      FontStyle: function(gpmlFontStyleValue){
        var cssFontStyle = gpmlFontStyleValue.toLowerCase();
        pvjsonText.fontStyle = cssFontStyle;
      },
      FontWeight: function(gpmlFontWeightValue){
        var cssFontWeight = gpmlFontWeightValue.toLowerCase();
        pvjsonText.fontWeight = cssFontWeight;
      },
      Rotation: function(gpmlRotationValue) {
        // GPML can hold a rotation value for State elements in an element named "Attribute" like this:
        // Key="org.pathvisio.core.StateRotation"
        // From discussion with AP and KH, we've decided to ignore this value, because we don't actually want States to be rotated.
        gpmlRotationValue = parseFloat(gpmlRotationValue);
        var pvjsonRotation = gpmlRotationValue * 180/Math.PI; //converting from radians to degrees
        // TODO how do we want to store this value?
        pvjsonElement.rotation = pvjsonRotation;
        pvjsonText.rotation = pvjsonRotation;
        return pvjsonRotation;
      },
      LineThickness: function(gpmlLineThicknessValue) {
        pvjsonStrokeWidth = parseFloat(gpmlLineThicknessValue);
        pvjsonElement.strokeWidth = pvjsonStrokeWidth;
        return pvjsonStrokeWidth;
      },
      Position: function(gpmlPositionValue) {
        var pvjsonPosition = parseFloat(gpmlPositionValue);
        pvjsonElement.position = pvjsonPosition;
        return pvjsonPosition;
      },
      Width: function(gpmlWidthValue) {
        gpmlWidthValue = parseFloat(gpmlWidthValue);
        pvjsonWidth = gpmlWidthValue + pvjsonStrokeWidth;
        pvjsonElement.width = pvjsonWidth;
        //pvjsonText.containerWidth = pvjsonWidth;
        pvjsonText.containerWidth = function() {
          var parentElement = model.elements.filter(function(element) {
            return element.id === pvjsonText.describes;
          })[0];
          var textWidth = parentElement.width;
          return textWidth;
        };
        return pvjsonWidth;
      },
      Height: function(gpmlHeightValue) {
        gpmlHeightValue = parseFloat(gpmlHeightValue);
        pvjsonHeight = gpmlHeightValue + pvjsonStrokeWidth;
        pvjsonElement.height = pvjsonHeight;
        pvjsonText.containerHeight = pvjsonHeight;
        return pvjsonHeight;
      },
      CenterX: function(gpmlCenterXValue) {
        gpmlCenterXValue = parseFloat(gpmlCenterXValue);
        pvjsonX = gpmlCenterXValue - pvjsonWidth/2;
        pvjsonElement.x = pvjsonX;
        pvjsonText.containerX = pvjsonX;
        return pvjsonX;
      },
      CenterY: function(gpmlCenterYValue) {
        gpmlCenterYValue = parseFloat(gpmlCenterYValue);
        pvjsonY = gpmlCenterYValue - pvjsonHeight/2;
        pvjsonElement.y = pvjsonY;
        pvjsonText.containerY = pvjsonY;
        return pvjsonY;
      },
      RelX: function(gpmlRelXValue) {
        var pvjsonRelX = parseFloat(gpmlRelXValue);
        pvjsonElement.relX = pvjsonRelX;
        pvjsonText.relX = pvjsonRelX;
        parentElement = gpmlSelection.select('[GraphId=' + elementSelection.attr('GraphRef') + ']');
        var parentCenterX = parseFloat(parentElement.select('Graphics').attr('CenterX'));
        var parentWidth = parseFloat(parentElement.select('Graphics').attr('Width'));
        var parentZIndex = parseFloat(parentElement.select('Graphics').attr('ZOrder'));
        var gpmlCenterXValue = parentCenterX + gpmlRelXValue * parentWidth/2;
        pvjsonX = gpmlCenterXValue - pvjsonWidth/2;
        pvjsonElement.x = pvjsonX;
        pvjsonText.containerX = pvjsonX;
        pvjsonElement.zIndex = parentZIndex + 0.2;
        pvjsonText.zIndex = parentZIndex + 0.3;
        pvjsonText.containerPadding = '0';
        pvjsonText.fontSize = '10';
        return pvjsonX;
      },
      RelY: function(gpmlRelYValue) {
        var pvjsonRelY = parseFloat(gpmlRelYValue);
        pvjsonElement.relY = pvjsonRelY;
        pvjsonText.relY = pvjsonRelY;
        var parentCenterY = parseFloat(parentElement.select('Graphics').attr('CenterY'));
        var parentHeight = parseFloat(parentElement.select('Graphics').attr('Height'));
        var elementCenterY = parentCenterY + pvjsonRelY * parentHeight/2;
        // TODO do we need to consider LineThickness (strokewidth) here?
        pvjsonY = elementCenterY - pvjsonHeight/2;
        pvjsonElement.y = pvjsonY;
        // TODO this and other elements here are hacks
        pvjsonText.containerY = pvjsonY + 12;
        return pvjsonY;
      },
      Align: function(gpmlAlignValue) {
        pvjsonTextAlign = strcase.paramCase(gpmlAlignValue);
        pvjsonText.textAlign = pvjsonTextAlign;
        return pvjsonTextAlign;
      },
      Valign: function(gpmlValignValue) {
        pvjsonVerticalAlign = strcase.paramCase(gpmlValignValue);
        pvjsonText.verticalAlign = pvjsonVerticalAlign;
        return pvjsonVerticalAlign;
      },
      ZOrder: function(gpmlZOrderValue) {
        pvjsonZIndex = parseFloat(gpmlZOrderValue);
        pvjsonElement.zIndex = pvjsonZIndex;
        pvjsonText.zIndex = pvjsonZIndex + 0.5;
        return pvjsonZIndex;
      }
    };

    var attributeName, attributeListItem, attributeListItemName, attributeList = [];
    if (!!graphics) {
      for (i = 0; i < graphics.attributes.length; i++) {
        attribute = graphics.attributes[i];
        attributeName = attribute.name;
        attributeListItem = {
          name: attributeName,
          value: attribute.value,
          dependencyOrder: attributeDependencyOrder.indexOf(attributeName),
        };
        attributeList.push(attributeListItem);
      }
      attributeList.sort(function(a, b) {
        return a.dependencyOrder - b.dependencyOrder;
      });
      attributeList.forEach(function(attributeListItem){
        attributeListItemName = attributeListItem.name;
        if (gpmlToPvjsonConverter.hasOwnProperty(attributeListItemName)) {
          gpmlToPvjsonConverter[attributeListItemName](attributeListItem.value);
        }
        else {
          console.warn('Pathvisiojs has no handler for attribute "' + attributeListItemName + '"');
          attributeListItemName = strcase.camelCase(attributeListItemName);
          pvjsonElement[attributeListItemName] = attributeListItem.value;
        }
      });
    }

    function gpmlColorToCssColor(gpmlColor) {
      var color;
      if (gpmlColor.toLowerCase() === 'transparent') {
        return 'transparent';
      }
      else {
        color = new RGBColor(gpmlColor);
        if (color.ok) {
          return color.toHex();
        }
        else {
          console.warn('Could not convert GPML Color value of "' + gpmlColor + '" to a valid CSS color. Using "#c0c0c0" as a fallback.');
          return '#c0c0c0';
        }
      }
    }
    callback(pvjsonElement, pvjsonText);
  }
};
