pathvisiojs.data.gpml.group = {
  getGroupDimensions: function(group, callback) {
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
  },

  toPvjson: function(elementsPossiblyInGroup, gpmlSelection, groupSelection, callback) {
    var pvjsonPath = {},
      pvjsonElements = [],
      groupId,
      groupType,
      textElementsDescribingGroup,
      model = this.model;

    pvjsonPath.renderableType = 'GroupNode';
    pvjsonPath.nodeType = "GroupNode";

    groupType = groupSelection.attr('Style') || 'None';
    pvjsonPath.groupType = groupType;












    pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, groupSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {



      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, groupSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
        pvjsonText = updatedPvjsonText;





          var contents = elementsPossiblyInGroup.filter(function(element){
            return element.isContainedBy === pvjsonPath.id;
          });
          if (contents.length > 0) {
            pvjsonPath.contains = contents;
            pathvisiojs.data.gpml.group.getGroupDimensions(pvjsonPath, function(dimensions){
              pvjsonPath.x = dimensions.x;
              pvjsonPath.y = dimensions.y;
              pvjsonPath.width = dimensions.width;
              pvjsonPath.height = dimensions.height;
              pvjsonPath.zIndex = dimensions.zIndex;
              pvjsonText.containerX = dimensions.x;
              pvjsonText.containerY = dimensions.y;
              pvjsonText.containerWidth = dimensions.width;


              // TODO move all of these functions to a model section so they aren't repeated (e.g., this also appears in graphics.js)
              pvjsonText.containerWidth = function() {
                var parentElement = model.elements.filter(function(element) {
                  return element.id === pvjsonText.describes;
                })[0];
                var textWidth = parentElement.width;
                return textWidth;
              };

              pvjsonText.containerHeight = dimensions.height;
              pvjsonText.zIndex = dimensions.zIndex;
            });
            pvjsonElements.push(pvjsonPath);

            if (!!pvjsonText.textContent) {
              pvjsonElements.push(pvjsonText);
            }
          }
        callback(pvjsonElements);
      });
    });
  }
};

