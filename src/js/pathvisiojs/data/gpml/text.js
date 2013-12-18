pathvisiojs.data.gpml.text = function() {

  var pathvisioDefaultStyleValues = {
    'Align':null,
    'Valign':'Middle',
    'FontStyle':null,
    'FontName':null
  }

  function toRenderableJson(gpmlNode, inputDefaultValues, textCallbackOutside) {
    /*
    console.log('gpmlNode');
    console.log(gpmlNode[0][0]);
    console.log('inputDefaultValues');
    console.log(inputDefaultValues);
    console.log('textCallbackOutside');
    console.log(textCallbackOutside);
    //*/
    try {
      var text = gpmlNode.attr('TextLabel');
      if (!!text) {
        jsonText = {};
        jsonText.tspan = text.split(/\r\n|\r|\n|&#xA;/g);

        var graphics = gpmlNode.select('Graphics');
        var textAlign, fontStyle, fontWeight, fontSize, fontFamily;
        if (!!graphics[0][0]) {
          textAlign = gpmlNode.select('Graphics').attr('Align') || 'center';
          jsonText.textAlign = textAlign.toLowerCase();

          verticalAlign = gpmlNode.select('Graphics').attr('Valign') || 'middle';
          jsonText.verticalAlign = verticalAlign.toLowerCase();

          fontStyle = gpmlNode.select('Graphics').attr('FontStyle');
          if (fontStyle !== pathvisioDefaultStyleValues['FontStyle']) {
            jsonText.fontStyle = fontStyle.toLowerCase();
          }

          fontWeight = gpmlNode.select('Graphics').attr('FontWeight');
          if (fontWeight !== inputDefaultValues['FontWeight']) {
            jsonText.fontWeight = fontWeight.toLowerCase();
          }

          fontSize = gpmlNode.select('Graphics').attr('FontSize') || 10;
          if (parseFloat(fontSize) !== inputDefaultValues['FontSize']) {
            jsonText.fontSize = parseFloat(fontSize);
          }

          fontFamily = gpmlNode.select('Graphics').attr('FontName');
          if (fontFamily !== pathvisioDefaultStyleValues['FontName']) {
            jsonText.fontFamily = fontFamily;
          }
        }
        textCallbackOutside(jsonText);
      }
      else {
        textCallbackOutside(null);
      }
    }
    catch (e) {
      throw new Error("Error converting gpmlNode's text to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
