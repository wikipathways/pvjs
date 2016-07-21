'use strict';

var _ = require('lodash')
  , GpmlElement = require('./element.js')
  , Graphics = require('./graphics.js')
  , Async = require('async')
  ;

// Biopax when possible, otherwise GPML. Note that Biopax is the default namespace,
// so if a namespace is not specified below, there is an implied "bp:"
var gpmlToSemanticMappings = {
  'gpml:Group': 'gpml:Group',
  'gpml:Complex': 'Complex',
  'gpml:Pathway': 'Pathway'
};

var gpmlToSemanticMappings = {
  'gpml:Group': 'gpml:Group',
  'gpml:Complex': 'Complex',
  'gpml:Pathway': 'Pathway'
};

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
    groupContents = _.toArray(groupContents);

    dimensions.zIndex = Infinity;
    Async.each(groupContents, function(groupContent, callbackInside) {
      if (!groupContent.hasOwnProperty('points')) {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.x + groupContent.width);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.y + groupContent.height);
      } else {
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

  toPvjson: function(pvjson, elementsPossiblyInGroup, gpmlPathwaySelection, groupSelection, callback) {
    var pvjsonPath = {},
      pvjsonElements = []
      ;

    GpmlElement.toPvjson(pvjson, gpmlPathwaySelection, groupSelection, pvjsonPath, function(pvjsonPath) {
      Graphics.toPvjson(pvjson, gpmlPathwaySelection, groupSelection, pvjsonPath, function(pvjsonPath) {
        var contents = elementsPossiblyInGroup.filter(function(element){
          return element.isPartOf === pvjsonPath.id;
        });
        if (contents.length > 0) {

          var type = gpmlToSemanticMappings[ pvjsonPath['gpml:Type'] ] || 'gpml:Group';
          pvjsonPath.type = type;

          // TODO once GPML supports it, we should create entityReferences for Groups of Type "Complex" and "Pathway"

          pvjsonPath.contains = contents;
          Group.getGroupDimensions(pvjsonPath, function(dimensions){
            pvjsonPath.x = dimensions.x || 0;
            pvjsonPath.y = dimensions.y || 0;
            if (pvjsonPath.x === 0 || pvjsonPath.y === 0) {
              console.warn('Error in groups. cannot get x or y value.');
            }
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
