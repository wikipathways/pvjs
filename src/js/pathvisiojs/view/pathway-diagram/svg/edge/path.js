pathvisiojs.view.pathwayDiagram.svg.edge.path = function(){	
    function getPath(edge) {
	var path;
	var type = edge.ConnectorType;
	
	if (type == 'Straight'){
	    return calcStraightPath(edge.Point);	
	}

	else if (type == 'Segmented') {
	    return calcSegmentedPath(edge.Point);
	}

	else if (type == 'Elbow'){
	    return calcElbowPath(edge.Point);
	}

	else if (type == 'Curved'){
	    return calcCurvedPath(edge.Point);
	}
	
	else {
	    console.log("Unknown connector type: " + type);
	    return null;
	}
    }

    function calcStraightPath(pts){
	if (pts.length == 2) {
	  return svgLine(pts);
	}
	else {
	  console.log("Too many points for a straight line!");
	  return null;
	}
    }

    function calcSegmentedPath(pts){
	return svgLine(pts);
    }

    function calcElbowPath(pts){
//	var wpts = calcWaypoints(pts);
//	var segs = calcSegments(wpts);

	var ppts = calcPathpoints(pts);
	return svgLine(ppts);;
    }

    function calcCurvedPath(pts){
	var wpts = calcWaypoints(pts);                                                                       
        var segs = calcSegments(wpts);
	//calc lo and hi-res curves and set on edge
	//calc path
	return null;
    }

    function calcPathpoints(p){
	//check to see if all waypoints are provided
	if (p.length == 2) {
	  p = calcAllWaypoints(p);
	}

	var ppts = [];

	//first path point is start
	ppts[0] = p[0];

	var axis = getAxis(p[0]); //TODO: account for starting on an anchor..
	var i;
	for (i=1; i<p.length-1; i++){ 
	  var dy = p[i].y - p[i-1].y;
	  var dx = p[i].x - p[i-1].x;
	  
	  if (axis == 1){ //Vertical
	  	ppts[i] = {x:p[i-1].x,y:p[i-1].y+dy};
	  } else { //Horizontal
		ppts[i] = {x:p[i-1].x+dx,y:p[i-1].y};
	  }
	  axis = (axis+1)%2;  //toggle 1|0
	}
	// one extra path point based on final waypoint
	  if (axis == 0){ //Verticali (ignoring last toggle)
                ppts[i] = {x:p[i-1].x+(p[i-1].x - p[i-2].x),y:p[i-1].y};
          } else { //Horizontal (ignoring last toggle)
                ppts[i] = {x:p[i-1].x,y:p[i-1].y+(p[i-1].y - p[i-2].y)};
          }

	// final path point is end
	ppts[p.length] = p[p.length-1];

        return ppts                                                                                        
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
	if (wptCount == 1) {
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
	]

	return wptMatrix[x][y][z];
    }

    function sign(x) { return x ? x < 0 ? -1 : 1 : 0; }; //caution: sign("0") -> 1

    function calcSegments(wpts){
	//Remember: wpts include start and end points

	return segs;
    }

    function getSide(p){
	if(p.RelX == 0){
           if (p.RelY == 1){
              return 2; //South
           } else {
               return 0; //North
           }
         } else if (p.RelX == 1){
            return 1; //East
         } else {
           return 3; //West
         }
      }

    function getAxis(p) {
        if (p.RelY == 0){
           return 0; // Y-Axis; Vertical
        } else {
          return 1; // X-Axis; Horzontal
        }
    }

    function getDir(p){ 
	return p.RelX + p.RelY;
    }

    function moveTo(p){
	return 'M'+p.x+','+p.y;
    }
    function lineTo(p){
	return 'L'+p.x+','+p.y;
    }
    function curveTo(cp){
	//control point: array of 3 points
	return 'C'+cp[0].x+','+cp[0].y+' '+cp[1].x+','+cp[1].y+' '+cp[2].x+','+cp[2].y;
    }
 
    var svgLine = d3.svg.line()
	.x(function(d) {return d.x; })
	.y(function(d) {return d.y;})
	.interpolate("linear");


  return {
    getPath:getPath
  };
}();
