pathvisiojs.data.gpml.graphics = function(){
  'use strict';

  var defaults = {
    'FontSize':{
      'Type':"FontSize",
      'Value':10
    }
  };

  var toPvjson = function(gpmlSelection, elementSelection, pvjsonElement, callback) {
      var parentElement,
      pvjsonText = {},
      attribute,
      i,
      graphics = elementSelection.select('Graphics')[0][0],
      pvjsonHeight,
      pvjsonWidth,
      pvjsonStrokeWidth,
      gpmlShapeType,
      pvjsonShape,
      pvjsonZIndex,
      pvjsonRelX,
      pvjsonRelY,
      pvjsonX,
      pvjsonY;

    var attributeDependencyOrder = [
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
        // LineStyle of "Double" is set using a new element named "Attribute"
        // but it's not actually an attribute on the Graphics element.
        // It is handled when determining ShapeType below.
        var pvjsonStrokeDasharray;
        // TODO hard-coding these here is not the most maintainable
        if (gpmlLineStyleValue === 'Broken') {
          pvjsonStrokeDasharray = '5,3';
        }
        else {
          pvjsonStrokeDasharray = '9999999999999999999999999';
        }
        pvjsonElement.strokeDasharray = pvjsonStrokeDasharray;
        return pvjsonStrokeDasharray;
      },
      ShapeType: function(gpmlShapeTypeValue){
        var doubleProperty;
        gpmlShapeType = gpmlShapeTypeValue;
        if (gpmlShapeType === 'None') {
          pvjsonShape = 'rectangle';
        }
        else {
          pvjsonShape = strcase.paramCase(gpmlShapeType);
          doubleProperty = elementSelection.select('[Key="org.pathvisio.DoubleLineProperty"]')[0][0];
          if (!!doubleProperty) {
            pvjsonShape += '-double';
          }
        }
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
        if (gpmlShapeType !== 'None') {
          pvjsonElement.stroke = cssColor;
        }
        else {
          pvjsonElement.stroke = 'transparent';
        }
        pvjsonText.fill = cssColor;
      },
      FontSize: function(gpmlFontSizeValue){
        var cssFontSize = gpmlFontSizeValue;
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
        console.log(gpmlWidthValue);
        gpmlWidthValue = parseFloat(gpmlWidthValue);
        pvjsonWidth = gpmlWidthValue + pvjsonStrokeWidth;
        pvjsonElement.width = pvjsonWidth;
        pvjsonText.width = pvjsonWidth;
        return pvjsonWidth;
      },
      Height: function(gpmlHeightValue) {
        gpmlHeightValue = parseFloat(gpmlHeightValue);
        pvjsonHeight = gpmlHeightValue + pvjsonStrokeWidth;
        pvjsonElement.height = pvjsonHeight;
        pvjsonText.height = pvjsonHeight;
        return pvjsonHeight;
      },
      CenterX: function(gpmlCenterXValue) {
        gpmlCenterXValue = parseFloat(gpmlCenterXValue);
        pvjsonX = gpmlCenterXValue - pvjsonWidth/2;
        pvjsonElement.x = pvjsonX;
        pvjsonText.x = pvjsonX;
        return pvjsonX;
      },
      CenterY: function(gpmlCenterYValue) {
        gpmlCenterYValue = parseFloat(gpmlCenterYValue);
        pvjsonY = gpmlCenterYValue - pvjsonHeight/2;
        pvjsonElement.y = pvjsonY;
        pvjsonText.y = pvjsonY;
        return pvjsonY;
      },
      RelX: function(gpmlRelXValue) {
        pvjsonRelX = parseFloat(gpmlRelXValue);
        pvjsonElement.relX = pvjsonRelX;
        pvjsonText.relX = pvjsonRelX;
        parentElement = gpmlSelection.select('[GraphId=' + elementSelection.attr('GraphId') + ']');
        var parentCenterX = parentElement.attr('CenterX');
        var parentWidth = parentElement.attr('Width');
        var gpmlCenterXValue = parentCenterX + gpmlRelXValue * parentWidth/2;
        pvjsonX = gpmlCenterXValue - pvjsonWidth/2;
        pvjsonElement.x = pvjsonX;
        pvjsonText.x = pvjsonX;
        return pvjsonX;
      },
      RelY: function(gpmlRelYValue) {
        gpmlRelYValue = parseFloat(gpmlRelYValue);
        pvjsonElement.relY = gpmlRelYValue;
        pvjsonText.relY = gpmlRelYValue;
        var parentCenterY = parentElement.attr('CenterY');
        var parentHeight = parentElement.attr('Height');
        var gpmlCenterYValue = parentCenterY + gpmlRelYValue * parentHeight/2;
        pvjsonY = gpmlCenterYValue - pvjsonHeight/2;
        pvjsonElement.y = pvjsonY;
        pvjsonText.y = pvjsonY;
        return pvjsonY;
      },
      ZOrder: function(gpmlZOrderValue) {
        pvjsonZIndex = parseFloat(gpmlZOrderValue);
        pvjsonElement.zIndex = pvjsonZIndex;
        pvjsonText.zIndex = pvjsonZIndex;
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
          attributeListItemName = strcase.paramCase(attributeListItemName);
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
