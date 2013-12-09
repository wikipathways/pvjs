pathvisiojs.data.gpml.label = function(){
  function toRenderableJson(gpmlLabel, pathwayIri, callbackInside) {
    try {
      var jsonLabel = {};
      graphId = gpmlLabel.attr('GraphId') || ('id' + uuid.v4());
      jsonLabel["@id"] = pathwayIri + "#" + graphId;
      jsonLabel["GraphId"] = graphId;
      var groupRef = gpmlLabel.attr('GroupRef');
      if (!!groupRef) {
        jsonLabel["GroupRef"] = groupRef;
        jsonLabel["dependsOn"] = [pathwayIri + "#" + groupRef];
      }
      shapeType = gpmlLabel.select('Graphics').attr('ShapeType') || 'rectangle';
      shapeType = strcase.paramCase(shapeType);
      jsonLabel["ShapeType"] = shapeType;
      jsonLabel["zIndex"] = parseFloat(gpmlLabel.select('Graphics').attr('ZOrder'));
      jsonLabel["renderableType"] = 'entityNode';
      labelType = gpmlLabel.attr('Type');
      jsonLabel["nodeType"] = "Label";
      jsonLabel["@type"] = [
        "element",
        "node",
        "entityNode",
        shapeType,
        "Label",
        groupRef || 'notGrouped'
      ];

      pathvisiojs.data.gpml.text.toRenderableJson(gpmlLabel, function(text) {
        jsonLabel["text"] = text;
      });
      jsonLabel["CenterX"] = parseFloat(gpmlLabel.select('Graphics').attr('CenterX'));
      jsonLabel["CenterY"] = parseFloat(gpmlLabel.select('Graphics').attr('CenterY'));
      var linestyle = gpmlLabel.select('Graphics').attr('LineStyle') || 'Solid';
      jsonLabel["LineStyle"] = linestyle;

      var color = gpmlLabel.select('Graphics').attr('Color');
      if (!!color) {
        jsonLabel["color"] = color;
      }

      var backgroundColor = gpmlLabel.select('Graphics').attr('FillColor');
      if (!!backgroundColor) {
        jsonLabel["backgroundColor"] = backgroundColor;
      }

      var borderColor = gpmlLabel.select('Graphics').attr('Color');
      if (!!borderColor) {
        jsonLabel["borderColor"] = borderColor;
      }     

      var borderWidth = gpmlLabel.select('Graphics').attr('LineThickness') || 1;
      jsonLabel["borderWidth"] = parseFloat(borderWidth);

      // the width and height values are not clearly specified in GPML, but the closest
      // I could come up with for interpreting them as actually rendered in PathVisio (Java)
      // at scales in common use is that gpmlWidth = elementWidth + elementPadding + elementBorderWidth (on each side)
      // with a similar calculation for gpmlHeight

      var gpmlWidth = parseFloat(gpmlLabel.select('Graphics').attr('Width'));
      jsonLabel["width"] = gpmlWidth + jsonLabel["borderWidth"];

      var gpmlHeight = parseFloat(gpmlLabel.select('Graphics').attr('Height'));
      jsonLabel["height"] = gpmlHeight + jsonLabel["borderWidth"];

      jsonLabel["padding"] = "0.5em";

      callbackInside(jsonLabel);
    }
    catch (e) {
      console.log("Error converting label to json: " + e.message);
      return e;
    }
  }


  return {
    toRenderableJson:toRenderableJson
  };
}();


