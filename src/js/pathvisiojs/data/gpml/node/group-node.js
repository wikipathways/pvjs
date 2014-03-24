pathvisiojs.data.gpml.element.node.groupNode = function() {
  'use strict';

  var pathvisioDefaultStyleValues = {
    'FontSize':null,
    'FontWeight':null
  };

  function getGroupDimensions(group, callback) {
    var dimensions = {};
    dimensions.topLeftCorner = {};
    dimensions.topLeftCorner.x = 9999999999999999999999999999;
    dimensions.topLeftCorner.y = 9999999999999999999999999999;
    dimensions.bottomRightCorner = {};
    dimensions.bottomRightCorner.x = 0;
    dimensions.bottomRightCorner.y = 0;
    // TODO what happens if this were set to '0.5em'?
    var padding = parseFloat(group.padding);

    var groupContents = group.contains;
    groupContents = pathvisiojs.utilities.convertToArray(groupContents);

    dimensions.zIndex = 9999999999999999999999999999;
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
      dimensions.x = dimensions.topLeftCorner.x - padding - group.strokeWidth;
      dimensions.y = dimensions.topLeftCorner.y - padding - group.strokeWidth;
      dimensions.width = (dimensions.bottomRightCorner.x - dimensions.topLeftCorner.x) + 2 * (padding + group.strokeWidth);
      dimensions.height = (dimensions.bottomRightCorner.y - dimensions.topLeftCorner.y) + 2 * (padding + group.strokeWidth);
      dimensions.zIndex = Math.min(dimensions.zIndex, groupContent.zIndex);
      callbackInside(null);
    },
    function (err) {
      dimensions.zIndex = dimensions.zIndex - 0.1;
      callback(dimensions);
    });
  }

  function toPvjson(gpmlSelection, groupSelection, callback) {
    var pvjsonPath = {},
      groupId,
      groupType;

    pvjsonPath.renderableType = 'GroupNode';
    pvjsonPath.nodeType = "GroupNode";

    groupType = groupSelection.attr('Style') || 'None';
    pvjsonPath.groupType = groupType;

    pathvisiojs.data.gpml.element.toPvjsonNew(gpmlSelection, groupSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, groupSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
        pvjsonText = updatedPvjsonText;
        if (!!pvjsonText.textContent) {
          pvjsonPath = [pvjsonPath, pvjsonText];
        }
        callback(pvjsonPath);
      });
    });
  }

  return {
    toPvjson:toPvjson,
    getGroupDimensions:getGroupDimensions
  };
}();

