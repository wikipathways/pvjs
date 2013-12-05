pathvisiojs.data.gpml.shape = function(){
  function toRenderableJson(gpmlShape, pathwayIri, callbackInside) {
    try {



      var jsonShape = {};
      graphId = gpmlShape.attr('GraphId') || ('id' + uuid.v4());
      jsonShape["@id"] = pathwayIri + "#" + graphId;
      jsonShape["GraphId"] = graphId;
      var groupRef = gpmlShape.attr('GroupRef');
      if (!!groupRef) {
        jsonShape["GroupRef"] = groupRef;
        jsonShape["dependsOn"] = [pathwayIri + "#" + groupRef];
      }
      shapeType = gpmlShape.select('Graphics').attr('ShapeType') || 'rectangle';
      shapeType = strcase.paramCase(shapeType);
      jsonShape["ShapeType"] = shapeType;
      jsonShape["zIndex"] = parseFloat(gpmlShape.select('Graphics').attr('ZOrder'));
      jsonShape["renderableType"] = 'entityNode';
      jsonShape["nodeType"] = "Shape";
      jsonShape["@type"] = [
        "element",
        "node",
        "entityNode",
        shapeType,
        "Shape",
        groupRef || 'notGrouped'
      ];

      pathvisiojs.data.gpml.text.toRenderableJson(gpmlShape, function(text) {
        jsonShape["text"] = text;
      });
      jsonShape["CenterX"] = parseFloat(gpmlShape.select('Graphics').attr('CenterX'));
      jsonShape["CenterY"] = parseFloat(gpmlShape.select('Graphics').attr('CenterY'));
      var linestyle = gpmlShape.select('Graphics').attr('LineStyle') || 'Solid';
      jsonShape["LineStyle"] = linestyle;

      var color = gpmlShape.select('Graphics').attr('Color');
      if (!!color) {
        jsonShape["color"] = color;
      }

      var backgroundColor = gpmlShape.select('Graphics').attr('FillColor');
      if (!!backgroundColor) {
        jsonShape["backgroundColor"] = backgroundColor;
      }

      var borderColor = gpmlShape.select('Graphics').attr('Color');
      if (!!borderColor) {
        jsonShape["borderColor"] = borderColor;
      }     

      var borderWidth = gpmlShape.select('Graphics').attr('LineThickness') || 1;
      jsonShape["borderWidth"] = parseFloat(borderWidth);

      // the width and height values are not clearly specified in GPML, but the closest
      // I could come up with for interpreting them as actually rendered in PathVisio (Java)
      // at scales in common use is that gpmlWidth = elementWidth + elementPadding + elementBorderWidth (on each side)
      // with a similar calculation for gpmlHeight

      var gpmlWidth = parseFloat(gpmlShape.select('Graphics').attr('Width'));
      jsonShape["offsetWidth"] = gpmlWidth + jsonShape["borderWidth"];

      var gpmlHeight = parseFloat(gpmlShape.select('Graphics').attr('Height'));
      jsonShape["offsetHeight"] = gpmlHeight + jsonShape["borderWidth"];

      jsonShape["padding"] = "0.5em";

      callbackInside(jsonShape);


      

    }
    catch (e) {
      console.log("Error converting shape to json: " + e.message);
      return e;
    }
  }


  return {
    toRenderableJson:toRenderableJson
  };
}();


