'use strict';

var Utils = require('./../../utilities.js')
  , GpmlElement = require('./element.js')
  , Graphics = require('./graphics.js')
  , Async = require('async')
  ;

var Group = {
  getGroupDimensions: function(group, callback) {
    var dimensions = {};
    dimensions.topLeftCorner = {};
    dimensions.topLeftCorner.x = Infinity;
    dimensions.topLeftCorner.y = Infinity;
    dimensions.bottomRightCorner = {};
    dimensions.bottomRightCorner.x = 0;
    dimensions.bottomRightCorner.y = 0;
    // TODO what happens if this were set to '0.5em'?
    var padding = parseFloat(group.padding);
    var borderWidth = group.borderWidth;

    var groupContents = group.contains;
    groupContents = Utils.convertToArray(groupContents);

    dimensions.zIndex = Infinity;
    Async.each(groupContents, function(groupContent, callbackInside) {
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
      dimensions.x = dimensions.topLeftCorner.x - padding - borderWidth;
      dimensions.y = dimensions.topLeftCorner.y - padding - borderWidth;
      dimensions.width = (dimensions.bottomRightCorner.x - dimensions.topLeftCorner.x) + 2 * (padding + borderWidth);
      dimensions.height = (dimensions.bottomRightCorner.y - dimensions.topLeftCorner.y) + 2 * (padding + borderWidth);
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
      model = this.model;

    pvjsonPath.renderableType = 'GroupNode';
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = "GroupNode";

    groupType = groupSelection.attr('Style') || 'None';
    pvjsonPath.groupType = groupType;

    GpmlElement.toPvjson(gpmlSelection, groupSelection, pvjsonPath, function(pvjsonPath) {
      Graphics.toPvjson(gpmlSelection, groupSelection, pvjsonPath, function(pvjsonPath) {
          var contents = elementsPossiblyInGroup.filter(function(element){
            return element.isContainedBy === pvjsonPath.id;
          });
          if (contents.length > 0) {
            pvjsonPath.contains = contents;
            Group.getGroupDimensions(pvjsonPath, function(dimensions){
              pvjsonPath.x = dimensions.x;
              pvjsonPath.y = dimensions.y;
              pvjsonPath.width = dimensions.width;
              pvjsonPath.height = dimensions.height;
              pvjsonPath.zIndex = dimensions.zIndex;
            });
            pvjsonElements.push(pvjsonPath);
          }
        callback(pvjsonElements);
      });
    });
  }
};

module.exports = Group;
