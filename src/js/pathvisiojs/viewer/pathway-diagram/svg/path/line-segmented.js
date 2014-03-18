// TODO this is currently just a renamed copy of lineStraight
pathvisiojs.view.pathwayDiagram.svg.path.lineSegmented = function(){
  'use strict';

  function getAttributes(data) {
    var pathData = [];
    var firstPoint = data.points[0];
    var points = data.points;
    var pointCount = points.length;
    pathData.push('M' + firstPoint.x + ',' + firstPoint.y + ' ');
    var i = 1;
    do {
      pathData.push('L' + points[i].x + ',' + points[i].y + ' ');
      i += 1;
    } while (i < pointCount);

    var attributes = [
      {
        name:'d',
        path: pathData
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
