pathvisiojs.data.gpml.edge.point = function(){
  'use strict';

  var gpmlRelXToJsonSideAndPositionMapping = {
    '-1.0': {'side': 'left'},
    '-0.5': {'position': 0.25},
    '0.0': {'position': 0.5},
    '0.5': {'position': 0.75},
    '1.0': {'side': 'right'}
  };

  var gpmlRelYToJsonSideAndPositionMapping = {
    '-1.0': {'side': 'top'},
    '-0.5': {'position': 0.25},
    '0.0': {'position': 0.5},
    '0.5': {'position': 0.75},
    '1.0': {'side': 'bottom'}
  };

  function toPvjson(gpmlEdgeSelection, callback) {
    var gpmlPointSelection, gpmlPoint, pvjsonPoint, pvjsonPoints;
    var gpmlPoints = [];
    gpmlEdgeSelection.selectAll('Point').each(function() {
      gpmlPointSelection = d3.select(this);
      console.log('gpmlPointSelection');
      console.log(gpmlPointSelection);
      gpmlPoint = {};
      gpmlPoint.x = parseFloat(gpmlPointSelection.attr('X'));
      gpmlPoint.y = parseFloat(gpmlPointSelection.attr('Y'));

      var relX = String(gpmlPointSelection.attr('RelX'));
      var relY = String(gpmlPointSelection.attr('RelY'));

      var side;
      var position;
      if (!!relX && !!relY && relX != 'null' && relY != 'null') {
        if (relX == '0.0' && relY == '0.0') {
          gpmlPoint.anchorId = gpmlPointSelection.attr('GraphRef');
        }
        else {
          side = gpmlRelXToJsonSideAndPositionMapping[relX].side !== undefined ? gpmlRelXToJsonSideAndPositionMapping[relX].side : gpmlRelYToJsonSideAndPositionMapping[relY].side;
          position = gpmlRelXToJsonSideAndPositionMapping[relX].position !== undefined ? gpmlRelXToJsonSideAndPositionMapping[relX].position : gpmlRelYToJsonSideAndPositionMapping[relY].position;
          gpmlPoint.anchorId = String(gpmlPointSelection.attr('GraphRef')) + String(side) + String(position);
        }
      }
      gpmlPoints.push(gpmlPoint);
    });

    var type = gpmlEdgeSelection.select('Graphics').attr('ConnectorType');

    var gpmlToD3InterpolationMapping = {
      Straight: 'linear',
      Segmented: 'linear',
      Elbow: 'linear',
      Curved: 'basis'
    };

    if (type === 'Straight'){
      if (gpmlPoints.length < 2) {
        console.warn("Too many points for a straight line!");
      }
      pvjsonPoints = gpmlPoints;
    }
    else if (type === 'Segmented'){
      pvjsonPoints = gpmlPoints;
    }
    else if (type === 'Elbow'){
      pvjsonPoints = calcPathpoints(gpmlPoints);
    }
    else if (type === 'Curved'){
      pvjsonPoints = calcPathpoints(gpmlPoints);
    }
    else {
      console.warn("Unknown connector type: " + type);
    }
    callback(pvjsonPoints);
  }

  function calcPathpoints(p){
    //check to see if all waypoints are provided
    if (p.length == 2) {
      p = calcAllWaypoints(p);
    }

    var ppts = [];

    //first path point is start
    ppts[0] = p[0];

    //intermediate path points
    var axis = getAxis(p[0]); //TODO: account for starting on an anchor..
    var i;
    for (i=1; i<p.length; i++){
      var dy = p[i].y - p[i-1].y;
      var dx = p[i].x - p[i-1].x;

      if (axis == 1){ //Vertical
        ppts[i] = {x:p[i-1].x,y:p[i-1].y+dy};
      } else { //Horizontal
        ppts[i] = {x:p[i-1].x+dx,y:p[i-1].y};
      }
      axis = (axis+1)%2;  //toggle 1|0
    }

    // final path point is end
    ppts[p.length] = p[p.length-1];

    return ppts;
  }

  function calcAllWaypoints(p) {
    var wptCount = getNumWaypoints(p);
    var offset = 20;
    var start = p[0];
    var end = p[1];

    var wpts = [];

    // first waypoint is start
    wpts[0] = start;

    // calc new waypoints	
    if (wptCount === 0) {
      //done!
    }
    else if (wptCount == 1) {
      wpts[1] = calcWaypoint(start, end, getAxis(start), getDir(end));
    } else if (wptCount == 2){
      wpts[1] = calcWaypoint(start, {x:(end.x + offset * getDir(end)), y:(end.y + offset * getDir(end))}, getAxis(start), getDir(start));
      wpts[2] = calcWaypoint(end, wpts[1], getAxis(end), getDir(end));
    } else if (wptCount == 3){
      wpts[2] = {x:(start.x + (end.x - start.x)/2), y:(start.y + (end.y - start.y)/2)};
      wpts[1] = calcWaypoint(start, wpts[2], getAxis(start), getDir(start));
      wpts[3] = calcWaypoint(end, wpts[2], getAxis(end), getDir(end));
    } else {
      console.log("Too many waypoint estimated!!!");
    }

    // final waypoint is end
    wpts[wptCount+1] = end;

    //console.log(wptCount);
    //console.log(wpts);

    return wpts;
  }

  function calcWaypoint(start, end, axis, dir){
    var offset = 20;
    var x = 0;
    var y = 0;
    if (axis == 1){ //Vertical
      x = start.x + (end.x - start.x)/2;
      y = start.y + offset * dir;
    } else {  //Horizontal
      x = start.x + offset * dir;
      y = start.y + (end.y - start.y)/2;
    }
    return {x:x, y:y};
  }

  function getNumWaypoints(pts){
    var start = pts[0];
    var end = pts[1];

    var leftToRight = sign(end.x - start.x) > 0;
    var left = leftToRight ? start : end;
    var right = leftToRight ? end : start;

    var leftIsBottom = sign(left.y - right.y) < 0;
    var z = leftIsBottom ? 1 : 0;
    var x = leftToRight ? getSide(start) : getSide(end);
    var y = leftToRight ? getSide(end) : getSide(start);

    var wptMatrix = [
      [
      [ 1, 1 ],
      [ 2, 2 ],
      [ 1, 3 ],
      [ 0, 2 ]
    ],
    [
      [ 2, 0 ],
      [ 1, 1 ],
      [ 0, 2 ],
      [ 1, 1 ],
    ],
    [
      [ 3, 1 ],
      [ 2, 2 ],
      [ 1, 1 ],
      [ 2, 0 ],
    ],
    [
      [ 2, 2 ],
      [ 3, 3 ],
      [ 2, 2 ],
      [ 1, 1 ],
    ]
    ];

    return wptMatrix[x][y][z];
  }

  function sign(x) {
    return x ? x < 0 ? -1 : 1 : 0; //caution: sign("0") -> 1 
  }

  function getSide(p){
    if(Math.abs(p.RelX) > Math.abs(p.RelY)) {
      if(p.RelX > 0) {
        return 1; //East
      } else {
        return 3; //West
      }
    } else {
      if(p.RelY > 0) {
        return 2; //South
      } else {
        return 0; //North
      }
    }
  }

  function getAxis(p) {
    if (Math.abs(p.RelX) > Math.abs(p.RelY)){
      return 0; // Y-Axis; Vertical
    } else {
      return 1; // X-Axis; Horzontal
    }
  }

  function getDir(p){
    if(Math.abs(p.RelX) > Math.abs(p.RelY)) {
      if(p.RelX > 0) {
        return 1; //Right
      } else {
        return -1; //Left
      }
    } else {
      if(p.RelY > 0) {
        return 1; //Down
      } else {
        return -1; //Up
      }
    }
  }

  return {
    toPvjson:toPvjson
  };
}();
