pathvisiojs.data.gpml.element.node.groupNode = function() {
  'use strict';

  var groupTypeToShapeTypeMappings = {
    'Complex':'complex',
    'Group':'rectangle',
    'None':'rectangle',
    'Pathway':'rectangle'
  };

  var pathvisioDefaultStyleValues = {
    'FontSize':null,
    'FontWeight':null
  };

  function getGroupDimensions(group, callback) {
    /*
    console.log('group');
    console.log(group);
    console.log('groupContents');
    console.log(groupContents);
    //*/
    var dimensions = {};
    dimensions.topLeftCorner = {};
    dimensions.topLeftCorner.x = 99999;
    dimensions.topLeftCorner.y = 99999;
    dimensions.bottomRightCorner = {};
    dimensions.bottomRightCorner.x = 0;
    dimensions.bottomRightCorner.y = 0;

    var groupContents = group.contains;
    groupContents = pathvisiojs.utilities.convertToArray(groupContents);

    // TODO check what happens if the contained element lacks a z-index
    dimensions.zIndex = groupContents[0].zIndex;
    async.each(groupContents, function(groupContent, callbackInside) {
      if (!groupContent.hasOwnProperty('points')) {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.x + groupContent.width);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.y + groupContent.height);
      }
      else {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.points[0].x, groupContent.points[groupContent.points.length - 1].x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.points[0].y, groupContent.points[groupContent.points.length - 1].y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.points[0].x, groupContent.points[groupContent.points.length - 1].x);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.points[0].y, groupContent.points[groupContent.points.length - 1].y);
      }
      dimensions.x = dimensions.topLeftCorner.x - group.padding - group.strokeWidth;
      dimensions.y = dimensions.topLeftCorner.y - group.padding - group.strokeWidth;
      dimensions.width = (dimensions.bottomRightCorner.x - dimensions.topLeftCorner.x) + 2 * (group.padding + group.strokeWidth);
      dimensions.height = (dimensions.bottomRightCorner.y - dimensions.topLeftCorner.y) + 2 * (group.padding + group.strokeWidth);
      dimensions.zIndex = Math.min(dimensions.zIndex, groupContent.zIndex);
      callbackInside(null);
    },
    function (err) {
      callback(dimensions);
    });
  }

  function toPvjson(gpmlSelection, groupSelection, callback) {
    var jsonGroup = {},
      groupId,
      shapeType,
      pvjsonPath = {},
      groupType;

    var graphId = groupSelection.attr('GraphId') || ('id' + uuid.v4());
    jsonGroup.GraphId = graphId;
    groupId = groupSelection.attr('GroupId') || ('id' + uuid.v4());
    jsonGroup.id = groupId;
    jsonGroup.GroupId = groupId;
    groupType = groupSelection.attr('Style') || 'None';

    shapeType = groupTypeToShapeTypeMappings[groupType];
    jsonGroup.ShapeType = shapeType || 'rectangle';

    jsonGroup.renderableType = 'GroupNode';
    jsonGroup.nodeType = "GroupNode";
    jsonGroup.groupType = groupType;

    pvjsonPath.renderableType = 'GroupNode';
    pvjsonPath.nodeType = "GroupNode";
    pvjsonPath.groupType = groupType;

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

    // Groups in PathVisio (Java) appear to have a default strokeWidth
    // of 1px at normal zoom levels, but unlike for edges and EntityNodes, 
    // this strokeWidth does not change when I zoom in or out.
    //
    // TODO this should be updated to check for whether it is defined
    // in CSS. If it is, this could conflict or require defining
    // strokeWidth twice -- once here and once in CSS.

    jsonGroup.strokeWidth = 1;
    pathvisiojs.data.gpml.text.toPvjson(groupSelection, pathvisioDefaultStyleValues, function(text) {
      /*
      console.log('text');
      console.log(text);
      //*/
      if (!!text) {
        jsonGroup.text = text;

        // TODO set fontSize in CSS, not here. Need to be able to still calculate font rendering, however,
        // which depends in part on font size.

        jsonGroup.text.fontSize = 32;
        jsonGroup.text.textAlign = 'center';
        jsonGroup.text.verticalAlign = 'middle';
      }
      pathvisiojs.data.gpml.element.node.toPvjson(groupSelection, jsonGroup, function(jsonGroup) {
        //*
        pathvisiojs.data.gpml.element.toPvjsonNew(gpmlSelection, groupSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
          pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, groupSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
            pvjsonText = updatedPvjsonText;
            if (!!pvjsonText.textContent) {
              pvjsonPath = [pvjsonPath, pvjsonText];
            }
            //*
            console.log('jsonGroup inside');
            console.log(jsonGroup);
            console.log('pvjsonPath inside');
            console.log(pvjsonPath);
            console.log('pvjsonText inside');
            console.log(pvjsonText);
            //*/
            callback(jsonGroup, pvjsonPath, pvjsonText);
          });
        });
        //*/
      });
    });
  }

  return {
    toPvjson:toPvjson,
    getGroupDimensions:getGroupDimensions
  };
}();

