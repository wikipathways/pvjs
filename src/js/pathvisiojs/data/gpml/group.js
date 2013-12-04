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
      shapeType = groupType = gpmlGroup.attr('Style') || 'none';
      shapeType = strcase.paramCase('group-' + shapeType);
      jsonGroup["ShapeType"] = shapeType;
      jsonGroup["zIndex"] = 0;
      //jsonGroup["ZIndex"] = gpmlGroup.selectAll('Graphics').attr('ZOrder');
      jsonGroup["renderableType"] = 'Group';
      jsonGroup["groupType"] = groupType;
      jsonGroup["@type"] = [
        "element",
        "node",
        shapeType,
        "Group",
        groupType
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

