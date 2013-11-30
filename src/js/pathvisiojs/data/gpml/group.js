pathvisiojs.data.gpml.group = function() {

  function toRenderableJson(gpmlGroup, pathwayIri, callbackInside) {
    try {
      var jsonGroup = {},
        shapeType,
        groupType;

      graphId = gpmlGroup.attr('GraphId') || ('id' + uuid.v4());
      jsonGroup["GraphId"] = graphId;
      groupId = gpmlGroup.attr('GroupId') || ('id' + uuid.v4());
      jsonGroup["@id"] = pathwayIri + "#" + groupId;
      jsonGroup["GroupId"] = groupId;
      shapeType = groupType = gpmlGroup.attr('Style') || 'rectangle';
      shapeType = strcase.paramCase(shapeType);
      jsonGroup["ShapeType"] = shapeType;
      jsonGroup["groupType"] = groupType;
      jsonGroup["@type"] = [
        "element",
        "node",
        shapeType,
        "Group",
        groupType,
        groupId
      ];
      var textLabel = {};
      var text = gpmlGroup.attr('TextLabel');
      if (!!text && text.length > 0) {
        textLabel.tspan = text.split(/\r\n|\r|\n|&#xA;/g);
        jsonGroup["TextLabel"] = textLabel;
      }
      callbackInside(jsonGroup);
    }
    catch (e) {
      throw new Error("Error converting Group to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();

