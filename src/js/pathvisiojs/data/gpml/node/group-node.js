"use strict";
pathvisiojs.data.gpml.node.groupNode = function() {

  var groupTypeToShapeTypeMappings = {
    'Complex':'complex',
    'Group':'rectangle',
    'None':'rectangle',
    'Pathway':'rectangle'
  };

  var pathvisioDefaultStyleValues = {
    'FontSize':null,
    'FontWeight':null
  }

  function getGroupDimensions(group, groupContents, callback) {
    console.log('group');
    console.log(group);
    console.log('groupContents');
    console.log(groupContents);
    var dimensions = {};
    dimensions.topLeftCorner = {};
    dimensions.topLeftCorner.x = 99999;
    dimensions.topLeftCorner.y = 99999;
    dimensions.bottomRightCorner = {};
    dimensions.bottomRightCorner.x = 0;
    dimensions.bottomRightCorner.y = 0;
    groupContents.forEach(function(groupContent) {
      if (groupContent.renderableType === 'EntityNode') {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.x + groupContent.width);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.y + groupContent.height);
      }
      else {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.Point[0].x, groupContent.Point[groupContent.Point.length - 1].x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.Point[0].y, groupContent.Point[groupContent.Point.length - 1].y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.Point[0].x, groupContent.Point[groupContent.Point.length - 1].x);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.Point[0].y, groupContent.Point[groupContent.Point.length - 1].y);
      }
      dimensions.x = dimensions.topLeftCorner.x - group.padding - group.borderWidth;
      dimensions.y = dimensions.topLeftCorner.y - group.padding - group.borderWidth;
      dimensions.width = (dimensions.bottomRightCorner.x - dimensions.topLeftCorner.x) + 2 * (group.padding + group.borderWidth);
      dimensions.height = (dimensions.bottomRightCorner.y - dimensions.topLeftCorner.y) + 2 * (group.padding + group.borderWidth);
      callback(dimensions);
    });
  }

  function toRenderableJson(pathway, gpmlGroup, pathwayIri, callbackOutside) {
    try {
      var jsonGroup = {},
      groupId;
      var shapeType,
      groupType;

      var graphId = gpmlGroup.attr('GraphId') || ('id' + uuid.v4());
      jsonGroup.GraphId = graphId;
      groupId = gpmlGroup.attr('GroupId') || ('id' + uuid.v4());
      jsonGroup["@id"] = pathwayIri + groupId;
      jsonGroup.GroupId = groupId;
      groupType = gpmlGroup.attr('Style') || 'None';

      var shapeType = groupTypeToShapeTypeMappings[groupType];
      jsonGroup.ShapeType = shapeType || 'rectangle';

      jsonGroup.renderableType = 'GroupNode';
      jsonGroup.nodeType = "GroupNode";
      jsonGroup.groupType = groupType;

      jsonGroup["@type"] = [];
      jsonGroup["@type"].push(shapeType);
      jsonGroup["@type"].push("GroupNode");
      jsonGroup["@type"].push(groupType);

      // Groups in PathVisio (Java) appear to have unchangable padding values,
      // but they are different based on GroupType.

      var groupTypeToPaddingValueMappings = {
        'Complex': 11,
        'Group': 8,
        'None': 8,
        'Pathway': 8
      };

      jsonGroup.padding = groupTypeToPaddingValueMappings[groupType];

      // Groups in PathVisio (Java) appear to have a default borderWidth
      // of 1px at normal zoom levels, but unlike for edges and EntityNodes, 
      // this borderWidth does not change when I zoom in or out.
      //
      // TODO this should be updated to check for whether it is defined
      // in CSS. If it is, this could conflict or require defining
      // borderWidth twice -- once here and once in CSS.

      jsonGroup.borderWidth = 1;
      pathvisiojs.data.gpml.text.toRenderableJson(gpmlGroup, pathvisioDefaultStyleValues, function(text) {
        console.log('text');
        console.log(text);
        if (!!text) {
          jsonGroup.text = text;

          // TODO set fontSize in CSS, not here. Need to be able to still calculate font rendering, however,
          // which depends in part on font size.

          jsonGroup.text.fontSize = 32;
          jsonGroup.text.textAlign = 'center';
          jsonGroup.text.verticalAlign = 'middle';
        }
        pathvisiojs.data.gpml.node.toRenderableJson(gpmlGroup, jsonGroup, function(jsonGroup) {
          callbackOutside(jsonGroup);
        });
      });
    }
    catch (e) {
      throw new Error("Error converting Group to renderable json: " + e.message);
    }
  }

  function calculateImplicitRenderingData(jsonGroup, callbackOutside) {
    console.log('jsonGroup');
    console.log(jsonGroup);
    try {
      getGroupDimensions(jsonGroup, jsonGroup['contains'], function(dimensions) {
        jsonGroup.x = dimensions.x;
        jsonGroup.y = dimensions.y;
        jsonGroup.width = dimensions.width;
        jsonGroup.height = dimensions.height;
        pathvisiojs.data.gpml.node.getPorts(jsonGroup, function(ports) {
          jsonGroup.Port = ports;
        });
      });
    }
    catch (e) {
      throw new Error("Error converting Group to renderable json: " + e.message);
    }
    finally {
      callbackOutside(jsonGroup);
    }
  }

  return {
    toRenderableJson:toRenderableJson,
    calculateImplicitRenderingData:calculateImplicitRenderingData
  };
}();

