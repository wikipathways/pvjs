'use strict';

var Strcase = require('tower-strcase')
  , _ = require('lodash')
  , RGBColor = require('rgbcolor')
  , GpmlUtilities = require('./gpml-utilities.js')
  ;

module.exports = {
  defaults: {
    'FontSize':{
      'Type':'FontSize',
      'Value':10
    }
  },

  toPvjson: function(pvjson, gpmlPathwaySelection, elementSelection, pvjsonElement, callback) {
      var parentElement,
      attribute,
      i,
      graphicsSelection = elementSelection.find('Graphics').eq(0),
      gpmlDoubleLineProperty = '',
      pvjsonHeight,
      pvjsonWidth,
      pvjsonBorderWidth,
      gpmlShapeType = '',
      pvjsonShape,
      pvjsonZIndex,
      pvjsonTextAlign,
      pvjsonVerticalAlign,
      pvjsonRelY,
      pvjsonX,
      pvjsonY
      ;

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
          // The line below is left here for future reference, but after discussing with AP, the desired behavior is for the entire shape to be filled. -AR
          //pvjsonElement.fillRule = 'evenodd';
        }
        return pvjsonStrokeDasharray;
      },
      ShapeType: function(gpmlShapeTypeValue){
        gpmlShapeType = gpmlShapeTypeValue;
        pvjsonShape = Strcase.paramCase(gpmlShapeType) + gpmlDoubleLineProperty;
        pvjsonElement.shape = pvjsonShape;
        return pvjsonShape;
      },
      ConnectorType: function(gpmlConnectorTypeValue){
        var gpmlConnectorType = gpmlConnectorTypeValue;
        pvjsonShape = Strcase.paramCase('line-' + gpmlConnectorType) + gpmlDoubleLineProperty;
        pvjsonElement.shape = pvjsonShape;
        return pvjsonShape;
      },
      FillColor: function(gpmlFillColorValue){
        var cssColor = this.gpmlColorToCssColor(gpmlFillColorValue);
        if (gpmlShapeType.toLowerCase() !== 'none') {
          pvjsonElement.backgroundColor = cssColor;
        }
        else {
          pvjsonElement.backgroundColor = 'transparent';
        }
      },
      FillOpacity: function(gpmlFillOpacityValue){
        var cssFillOpacity = parseFloat(gpmlFillOpacityValue);
        pvjsonElement.fillOpacity = cssFillOpacity;
      },
      Color: function(gpmlColorValue){
        var cssColor = this.gpmlColorToCssColor(gpmlColorValue);
        pvjsonElement.color = cssColor;
      },
      Padding: function(gpmlPaddingValue){
        var cssPadding;
        if (_.isNumber(gpmlPaddingValue)) {
          cssPadding = parseFloat(gpmlPaddingValue);
        }
        else {
          cssPadding = gpmlPaddingValue;
        }
        pvjsonElement.padding = cssPadding;
      },
      FontSize: function(gpmlFontSizeValue){
        var cssFontSize;
        if (_.isNumber(gpmlFontSizeValue)) {
          cssFontSize = parseFloat(gpmlFontSizeValue);
        }
        else {
          cssFontSize = gpmlFontSizeValue;
        }
        pvjsonElement.fontSize = cssFontSize;
      },
      FontName: function(gpmlFontNameValue){
        var cssFontFamily = gpmlFontNameValue;
        pvjsonElement.fontFamily = cssFontFamily;
      },
      FontStyle: function(gpmlFontStyleValue){
        var cssFontStyle = gpmlFontStyleValue.toLowerCase();
        pvjsonElement.fontStyle = cssFontStyle;
      },
      FontWeight: function(gpmlFontWeightValue){
        var cssFontWeight = gpmlFontWeightValue.toLowerCase();
        pvjsonElement.fontWeight = cssFontWeight;
      },
      Rotation: function(gpmlRotationValue) {
        // GPML can hold a rotation value for State elements in an element named "Attribute" like this:
        // Key="org.pathvisio.core.StateRotation"
        // From discussion with AP and KH, we've decided to ignore this value, because we don't actually want States to be rotated.
        gpmlRotationValue = parseFloat(gpmlRotationValue);
        var pvjsonRotation = gpmlRotationValue * 180/Math.PI; //converting from radians to degrees
        pvjsonElement.rotation = pvjsonRotation;
        return pvjsonRotation;
      },
      LineThickness: function(gpmlLineThicknessValue) {
        pvjsonBorderWidth = parseFloat(gpmlLineThicknessValue);
        pvjsonElement.borderWidth = pvjsonBorderWidth;
        return pvjsonBorderWidth;
      },
      Position: function(gpmlPositionValue) {
        var pvjsonPosition = parseFloat(gpmlPositionValue);
        pvjsonElement.position = pvjsonPosition;
        return pvjsonPosition;
      },
      Width: function(gpmlWidthValue) {
        gpmlWidthValue = parseFloat(gpmlWidthValue);
        pvjsonWidth = gpmlWidthValue + pvjsonBorderWidth;
        pvjsonElement.width = pvjsonWidth;
        return pvjsonWidth;
      },
      Height: function(gpmlHeightValue) {
        gpmlHeightValue = parseFloat(gpmlHeightValue);
        pvjsonHeight = gpmlHeightValue + pvjsonBorderWidth;
        pvjsonElement.height = pvjsonHeight;
        return pvjsonHeight;
      },
      CenterX: function(gpmlCenterXValue) {
        gpmlCenterXValue = parseFloat(gpmlCenterXValue);
        pvjsonX = gpmlCenterXValue - pvjsonWidth/2;
        pvjsonElement.x = pvjsonX;
        return pvjsonX;
      },
      CenterY: function(gpmlCenterYValue) {
        gpmlCenterYValue = parseFloat(gpmlCenterYValue);
        pvjsonY = gpmlCenterYValue - pvjsonHeight/2;
        pvjsonElement.y = pvjsonY;
        return pvjsonY;
      },
      RelX: function(gpmlRelXValue) {
        var pvjsonRelX = parseFloat(gpmlRelXValue);
        pvjsonElement.relX = pvjsonRelX;
        parentElement = gpmlPathwaySelection.find('[GraphId=' + elementSelection.attr('GraphRef') + ']');
        //if (parentElement.length < 1) throw new Error('cannot find parent');
        var parentCenterX = parseFloat(parentElement.find('Graphics').attr('CenterX'));
        var parentWidth = parseFloat(parentElement.find('Graphics').attr('Width'));
        var parentZIndex = parseFloat(parentElement.find('Graphics').attr('ZOrder'));
        var gpmlCenterXValue = parentCenterX + gpmlRelXValue * parentWidth/2;
        pvjsonX = gpmlCenterXValue - pvjsonWidth/2;
        pvjsonElement.x = pvjsonX || 0;
        pvjsonElement.zIndex = parentZIndex + 0.2 || 0;
        //pvjsonText.containerPadding = '0';
        //pvjsonText.fontSize = '10';
        return pvjsonX;
      },
      RelY: function(gpmlRelYValue) {
        var pvjsonRelY = parseFloat(gpmlRelYValue);
        pvjsonElement.relY = pvjsonRelY;
        var parentCenterY = parseFloat(parentElement.find('Graphics').attr('CenterY'));
        var parentHeight = parseFloat(parentElement.find('Graphics').attr('Height'));
        var elementCenterY = parentCenterY + pvjsonRelY * parentHeight/2;
        // TODO do we need to consider LineThickness (strokewidth) here?
        pvjsonY = elementCenterY - pvjsonHeight/2;
        pvjsonElement.y = pvjsonY || 0;
        // TODO this and other elements here are hacks
        //pvjsonText.containerY = pvjsonY + 12;
        return pvjsonY;
      },
      Align: function(gpmlAlignValue) {
        pvjsonTextAlign = Strcase.paramCase(gpmlAlignValue);
        pvjsonElement.textAlign = pvjsonTextAlign;
        return pvjsonTextAlign;
      },
      Valign: function(gpmlValignValue) {
        pvjsonVerticalAlign = Strcase.paramCase(gpmlValignValue);
        pvjsonElement.verticalAlign = pvjsonVerticalAlign;
        return pvjsonVerticalAlign;
      },
      ZOrder: function(gpmlZOrderValue) {
        pvjsonZIndex = parseFloat(gpmlZOrderValue);
        pvjsonElement.zIndex = pvjsonZIndex;
        return pvjsonZIndex;
      },
      gpmlColorToCssColor: function(gpmlColor) {
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
    };

    if (!!graphicsSelection) {
      pvjsonElement = GpmlUtilities.convertAttributesToJson(graphicsSelection, pvjsonElement, gpmlToPvjsonConverter, attributeDependencyOrder);
    }

    callback(pvjsonElement);
  },

};
