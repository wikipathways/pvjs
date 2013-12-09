pathvisiojs.data.gpml.group = function() {

  function toRenderableJson(gpmlGroup, pathwayIri, callbackInside) {
    try {
      var jsonGroup = {},
        shapeType,
        groupType;

      graphId = gpmlGroup.attr('GraphId') || ('id' + uuid.v4());
      jsonGroup.GraphId = graphId;
      groupId = gpmlGroup.attr('GroupId') || ('id' + uuid.v4());
      jsonGroup["@id"] = pathwayIri + "#" + groupId;
      jsonGroup.GroupId = groupId;
      shapeType = groupType = gpmlGroup.attr('Style') || 'None';
      shapeType = strcase.paramCase('group-' + shapeType);
      jsonGroup.ShapeType = shapeType;
      jsonGroup.zIndex = 0;
      //jsonGroup.ZIndex = gpmlGroup.selectAll('Graphics').attr('ZOrder');
      jsonGroup.renderableType = 'Group';
      jsonGroup.nodeType = "Group";
      jsonGroup.groupType = groupType;
      jsonGroup["@type"] = [
        "element",
        "node",
        shapeType,
        "Group",
        groupType
      ];


    
      // Groups in PathVisio (Java) appear to have unchangable padding values,
      // but they are different based on GroupType.

      var groupTypeToPaddingValueMappings = {
        'Complex': 11,
        'Group': 8,
        'None': 8,
        'Pathway': 8
      };

      jsonGroup.padding = groupTypeToPaddingValueMappings[groupType];

      var textLabel = {};
      var text = gpmlGroup.attr('TextLabel');
      if (!!text && text.length > 0) {
        textLabel.tspan = text.split(/\r\n|\r|\n|&#xA;/g);
        textLabel.fontSize = 32;
        textLabel.textAlign = 'center';
        textLabel.verticalAlign = 'middle';
        jsonGroup.text = textLabel;
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

