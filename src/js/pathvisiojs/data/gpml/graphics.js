pathvisiojs.data.gpml.graphics = function(){
  'use strict';

  var defaults = {
    'FontSize':{
      'Type':"FontSize",
      'Value':10
    }
  };

  var toPvjson = function(gpmlSelection, elementSelection, pvjsonElement, pvjsonText, callback) {
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
      pvjsonY;

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
        /*
        console.log('gpmlShapeTypeValue');
        console.log(gpmlShapeTypeValue);
        console.log('gpmlDoubleLineProperty');
        console.log(gpmlDoubleLineProperty);
        //*/
        gpmlShapeType = gpmlShapeTypeValue;
        if (gpmlShapeType.toLowerCase() === 'none') {
          pvjsonShape = 'rectangle';
        }
        else {
          pvjsonShape = strcase.paramCase(gpmlShapeType) + gpmlDoubleLineProperty;
        }
        /*
        console.log('pvjsonShape');
        console.log(pvjsonShape);
        //*/
        pvjsonElement.shape = pvjsonShape;
        return pvjsonShape;
      },
      ConnectorType: function(gpmlConnectorTypeValue){
        /*
        console.log('gpmlConnectorTypeValue');
        console.log(gpmlConnectorTypeValue);
        console.log('gpmlDoubleLineProperty');
        console.log(gpmlDoubleLineProperty);
        //*/
        var gpmlConnectorType = gpmlConnectorTypeValue;
        pvjsonShape = strcase.paramCase('line-' + gpmlConnectorType) + gpmlDoubleLineProperty;
        /*
        console.log('pvjsonShape');
        console.log(pvjsonShape);
        //*/
        pvjsonElement.connectorType = gpmlConnectorType;
        pvjsonElement.shape = pvjsonShape;
        return pvjsonShape;
      },
      FillColor: function(gpmlFillColorValue){
        var cssColor = gpmlColorToCssColor(gpmlFillColorValue);
        if (gpmlShapeType.toLowerCase() !== 'none') {
          pvjsonElement.fill = cssColor;
        }
        else {
          pvjsonElement.fill = 'transparent';
        }
      },
      Color: function(gpmlColorValue){
        var cssColor = gpmlColorToCssColor(gpmlColorValue);
        if (gpmlShapeType.toLowerCase() !== 'none') {
          pvjsonElement.stroke = cssColor;
        }
        else {
          pvjsonElement.stroke = 'transparent';
        }
        pvjsonText.fill = cssColor;
      },
      Padding: function(gpmlPaddingValue){
        var cssPadding = gpmlPaddingValue;
        pvjsonElement.padding = cssPadding;
        pvjsonText.containerPadding = cssPadding;
      },
      FontSize: function(gpmlFontSizeValue){
        var cssFontSize = parseFloat(gpmlFontSizeValue);
        pvjsonText.fontSize = cssFontSize;
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
      Width: function(gpmlWidthValue) {
        gpmlWidthValue = parseFloat(gpmlWidthValue);
        pvjsonWidth = gpmlWidthValue + pvjsonStrokeWidth;
        pvjsonElement.width = pvjsonWidth;
        pvjsonText.containerWidth = pvjsonWidth;
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
        parentElement = gpmlSelection.select('[GraphId=' + elementSelection.attr('GraphId') + ']');
        var parentCenterX = parentElement.attr('CenterX');
        var parentWidth = parentElement.attr('Width');
        var gpmlCenterXValue = parentCenterX + gpmlRelXValue * parentWidth/2;
        pvjsonX = gpmlCenterXValue - pvjsonWidth/2;
        pvjsonElement.x = pvjsonX;
        pvjsonText.containerX = pvjsonX;
        return pvjsonX;
      },
      RelY: function(gpmlRelYValue) {
        var pvjsonRelY = parseFloat(gpmlRelYValue);
        pvjsonElement.relY = pvjsonRelY;
        pvjsonText.relY = pvjsonRelY;
        var parentCenterY = parentElement.attr('CenterY');
        var parentHeight = parentElement.attr('Height');
        var gpmlCenterYValue = parentCenterY + pvjsonRelY * parentHeight/2;
        pvjsonY = gpmlCenterYValue - pvjsonHeight/2;
        pvjsonText.containerY = pvjsonY;
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
  };

  return {
    toPvjson:toPvjson
  };
}();
