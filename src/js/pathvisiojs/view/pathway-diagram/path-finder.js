pathvisiojs.view.pathwayDiagram.pathFinder = function(){

  /*  Linear algebra conventions call for specifying an element of a matrix as row #, column #.
   *  The rows and columns use one-based indexing. Example: Element.1,2 is the element in the first row and the second column.
   *  The code in PathFinding.js uses x to refer to column # and y to refer to row #.
   *  JavaScript uses zero-based indexing for matrices. Example: matrix[0][1] refers to the element in the first row and the second column.
   *  This code will follow the PathFinding.js conventions and use zero-based indexing,
   *  so be careful to note this may differ from linear algebra conventions.
   * */

  function xYCoordinatesToMatrixLocation(x, y) {
    var results = {};
    results.column = Math.floor(x/pathvisioNS.grid.squareLength);
    results.row = Math.floor(y/pathvisioNS.grid.squareLength);
    return results;
  }

  function matrixLocationToXYCoordinates(column, row) {
    var results = {};
    results.x = column * pathvisioNS.grid.squareLength;
    results.y = row * pathvisioNS.grid.squareLength;
    return results;
  }

  function initGrid(nodes, ports, pathwayImageWidth, pathwayImageHeight, callback) {
    var gridData = {}
    nodes = d3.select(nodes).sort(function(node1, node2) {
      Math.min(node1.height, node1.width) - Math.min(node2.height, node2.width);
    })[0][0];
    gridData.squareLength = Math.min(nodes[0].height, nodes[0].width) / 14;
    console.log('pathvisioNS');
    console.log(pathvisioNS);

    // Here we set how much padding to place around the entityNodes, in units of grid squares.
    // TODO change the static value of 12 to be a calculated value equal to the
    // largest dimension of a marker in the diagram

    gridData.padding = Math.ceil(12 / gridData.squareLength);
    var currentRow, currentColumn;
    gridData.totalColumnCount = Math.ceil(pathwayImageWidth/gridData.squareLength);
    gridData.totalRowCount = Math.ceil(pathwayImageHeight/gridData.squareLength);

    // remember zero-based indexing means we want to go from 0 to gridData.totalRowCount - 1
    // and 0 to gridData.totalColumnCount - 1
    // last element is matrix[gridData.totalRowCount - 1][gridData.totalColumnCount - 1]

    var entirelyWalkableMatrix = [];
    for(var currentRow = 0; currentRow < gridData.totalRowCount; currentRow++) {
      entirelyWalkableMatrix[currentRow] = [];
      for(var currentColumn = 0; currentColumn < gridData.totalColumnCount; currentColumn++) {
        entirelyWalkableMatrix[currentRow][currentColumn] = 0;
      }
    }
    gridData.entirelyWalkableMatrix = entirelyWalkableMatrix;
    callback(gridData);
  }

  function generateGrid(svg, nodes, ports, callback) {

    // Here we set how much padding to place around the entityNodes, in units of grid squares.
    // TODO change the static value of 12 to be a calculated value equal to the
    // largest dimension of a marker in the diagram

    var padding = Math.ceil(12 / pathvisioNS.grid.squareLength);
    var currentRow, currentColumn;
    var totalColumnCount = Math.ceil(pathwayImageWidth/pathvisioNS.grid.squareLength);
    var totalRowCount = Math.ceil(pathwayImageHeight/pathvisioNS.grid.squareLength);

    // remember zero-based indexing means we want to go from 0 to totalRowCount - 1
    // and 0 to totalColumnCount - 1
    // last element is matrix[totalRowCount - 1][totalColumnCount - 1]

    var entirelyWalkableMatrix = [];
    for(var currentRow = 0; currentRow < totalRowCount; currentRow++) {
      entirelyWalkableMatrix[currentRow] = [];
      for(var currentColumn = 0; currentColumn < totalColumnCount; currentColumn++) {
        entirelyWalkableMatrix[currentRow][currentColumn] = 0;
      }
    }
    callback(entirelyWalkableMatrix);
  }

  function generateGridData(shapes, ports, pathwayImageWidth, pathwayImageHeight, callback) {
    //console.log('***************');
    //console.log('shapes');
    //console.log(shapes);
    //console.log('ports');
    //console.log(ports);
    //console.log('pathwayImageWidth');
    //console.log(pathwayImageWidth);
    //console.log('pathwayImageHeight');
    //console.log(pathwayImageHeight);
    //console.log('***************');

    shapes = d3.select(shapes).sort(function(shape1, shape2) {
      Math.min(shape1.height, shape1.width) - Math.min(shape2.height, shape2.width);
    })[0][0];
    pathvisioNS.grid.squareLength = Math.min(shapes[0].height, shapes[0].width) / 14;
    console.log('pathvisioNS');
    console.log(pathvisioNS);

    // how much padding to place around the entityNodes, in units of grid squares
    // TODO change the static value of 12 to be a calculated value equal to the
    // largest dimension of a marker in the diagram

    var padding = Math.ceil(12 / pathvisioNS.grid.squareLength);
    var currentRow, currentColumn;
    var totalColumnCount = Math.ceil(pathwayImageWidth/pathvisioNS.grid.squareLength);
    var totalRowCount = Math.ceil(pathwayImageHeight/pathvisioNS.grid.squareLength);

    initGrid(shapes, ports, pathwayImageWidth, pathwayImageHeight, function(gridData) {
      var paddedMatrix = tightMatrix = entirelyWalkableMatrix = gridData.entirelyWalkableMatrix;
      pathvisioNS.grid.gridRenderingData = [];

      // mark off no-go non-walkable regions for path finder (regions under shapes)

      var upperLeftCorner, lowerRightCorner, rowStart, rowEnd, columnStart, columnEnd;
      shapes.forEach(function(shape) {
        upperLeftCorner = xYCoordinatesToMatrixLocation(shape.x, shape.y, pathvisioNS.grid.squareLength);
        lowerRightCorner = xYCoordinatesToMatrixLocation(shape.x + shape.width, shape.y + shape.height, pathvisioNS.grid.squareLength);

        columnStartTight = Math.max((upperLeftCorner.column), 0);
        columnEndTight = Math.min((lowerRightCorner.column), totalColumnCount - 1);
        rowStartTight = Math.max((upperLeftCorner.row), 0);
        rowEndTight = Math.min((lowerRightCorner.row), totalRowCount - 1);

        for(currentRow=rowStartTight; currentRow<rowEndTight + 1; currentRow++) {
          for(currentColumn=columnStartTight; currentColumn<columnEndTight + 1; currentColumn++) {
            tightMatrix[currentRow][currentColumn] = 1;
          }
        }

        columnStart = Math.max((upperLeftCorner.column - padding), 0);
        columnEnd = Math.min((lowerRightCorner.column + padding), totalColumnCount - 1);
        rowStart = Math.max((upperLeftCorner.row - padding), 0);
        rowEnd = Math.min((lowerRightCorner.row + padding), totalRowCount - 1);

        for(currentRow=rowStart; currentRow<rowEnd + 1; currentRow++) {
          for(currentColumn=columnStart; currentColumn<columnEnd + 1; currentColumn++) {
            paddedMatrix[currentRow][currentColumn] = 1;
            pathvisioNS.grid.gridRenderingData[currentRow * (totalColumnCount - 1) + currentColumn] = {
              'x': currentColumn * pathvisioNS.grid.squareLength,
              'y': currentRow * pathvisioNS.grid.squareLength,
              'fill': 'blue'
            };
          }
        }
      });

      var column1, column2, row1, row2, portLocation;
      ports.forEach(function(port) {
        portLocation = xYCoordinatesToMatrixLocation(port.x, port.y);
        column1 = Math.max(Math.min((portLocation.column - padding * port.dy), totalColumnCount - 1), 0);
        column2 = Math.max(Math.min((portLocation.column + port.dy), totalColumnCount - 1), 0);
        columnStart = Math.min(column1, column2);
        columnEnd = Math.max(column1, column2);

        row1 = Math.max(Math.min((portLocation.row - port.dx), totalRowCount - 1), 0);
        row2 = Math.max(Math.min((portLocation.row + padding * port.dx), totalRowCount - 1), 0);
        rowStart = Math.min(row1, row2);
        rowEnd = Math.max(row1, row2);

        for(currentRow=rowStart; currentRow<rowEnd + 1; currentRow++) {
          paddedMatrix[currentRow] = paddedMatrix[currentRow] || [];
          for(currentColumn=columnStart; currentColumn<columnEnd + 1; currentColumn++) {
            paddedMatrix[currentRow][currentColumn] = 0;
            pathvisioNS.grid.gridRenderingData[currentRow * (totalColumnCount - 1) + currentColumn] = {
              'x': currentColumn * pathvisioNS.grid.squareLength,
              'y': currentRow * pathvisioNS.grid.squareLength,
              'fill': 'yellow'
            };
          }
        }
      });

      //console.log('totalColumnCount');
      //console.log(totalColumnCount);
      //console.log('totalRowCount');
      //console.log(totalRowCount);
      //console.log('paddedMatrix');
      //console.log(paddedMatrix);

      pathvisioNS.grid.paddedGrid = new PF.Grid(totalColumnCount, totalRowCount, paddedMatrix);
      pathvisioNS.grid.tightGrid = new PF.Grid(totalColumnCount, totalRowCount, tightMatrix);
      pathvisioNS.grid.emptyGrid = new PF.Grid(totalColumnCount, totalRowCount, entirelyWalkableMatrix);
      pathvisioNS.grid.gridRenderingData = pathvisioNS.grid.gridRenderingData.filter(function(element) {return !!element});

      callback(pathvisioNS.grid.emptyGrid);
    })
  }

  function getPath(edge, callbackOutside) {
    var workingGrid = pathvisioNS.grid.paddedGrid.clone();
    var finder = new PF.BiBreadthFirstFinder({
      allowDiagonal: false,
      dontCrossCorners: true
    });
    var Point = edge.Point;
    var pointStart = Point[0];
    var pointEnd = Point[Point.length - 1];
    startLocation = xYCoordinatesToMatrixLocation(pointStart.x, pointStart.y);
    endLocation = xYCoordinatesToMatrixLocation(pointEnd.x, pointEnd.y);
    var pathData;
    async.series([
      function(callback){
        runPathFinder(workingGrid, finder, Point, pointStart, pointEnd, startLocation, endLocation, function(data) {
          pathData = data;
          //console.log('padded');
          //console.log(pathData);
          //console.log(pathData.length);
          callback(null);
        });
      },
      function(callback){
        if (pathData.length < 3) {
          workingGrid = pathvisioNS.grid.tightGrid.clone();
          runPathFinder(workingGrid, finder, Point, pointStart, pointEnd, startLocation, endLocation, function(data) {
            pathData = data;
            //console.log('tight');
            //console.log(pathData);
            //console.log(pathData.length);
            callback(null);
          });
        }
        else {
          callback(null);
        }
      },
      function(callback){
        if (pathData.length < 3) {
          workingGrid = pathvisioNS.grid.emptyGrid.clone();
          runPathFinder(workingGrid, finder, Point, pointStart, pointEnd, startLocation, endLocation, function(data) {
            pathData = data;
            //console.log('empty');
            //console.log(pathData);
            //console.log(pathData.length);
            pathData.push({'x': pointEnd.x, 'y': pointEnd.y});
            callback(null);
          });
        }
        else {
          callback(null);
        }
      }
    ],
    function(err) {
      //console.log('returned');
      //console.log(pathData);
      //console.log(pathData.length);
      callbackOutside(pathData);
      //return pathData;
    });
  }

  function runPathFinder(workingGrid, finder, Point, pointStart, pointEnd, startLocation, endLocation, callback) {
    /*
    console.log('workingGrid');
    console.log(workingGrid);
    console.log('finder');
    console.log(finder);
    console.log('Point');
    console.log(Point);
    console.log('pointStart');
    console.log(pointStart);
    console.log('pointEnd');
    console.log(pointEnd);
    console.log('startLocation');
    console.log(startLocation);
    console.log('endLocation');
    console.log(endLocation);
    //*/

    /* 
     * Get blockyPath
     */

    var blockyPath = finder.findPath(startLocation.column, startLocation.row, endLocation.column, endLocation.row, workingGrid);
    //console.log('blockyPath');
    //console.log(blockyPath);

    /*
       var newWorkingGrid = pathvisioNS.grid.paddedGrid.clone();
       compressedMidPoint = PF.Util.smoothenPath(newWorkingGrid, blockyPath);
    //*/

    /* 
     * Get compressedMidPoint
     */
    // compress path data and extract Point

    var compressedMidPoint = [];
    var index = 0;
    if (blockyPath.length > 3) {
      do {
        index += 1;
        if ((blockyPath[index - 1][0] - blockyPath[index + 1][0]) && (blockyPath[index - 1][1] !== blockyPath[index + 1][1])) {
          compressedMidPoint.push([
            blockyPath[index][0],
            blockyPath[index][1]
          ]);
        }
      } while (index < blockyPath.length - 2);
    }
    else {
      //console.log('blockyPath too short to compress.');
    }

    /* 
     * Get fullXYPath
     */

    var fullXYPath = [];

    compressedMidPoint.forEach(function(element, index) {
      fullXYPath.push({
        'x': compressedMidPoint[index][0] * pathvisioNS.grid.squareLength,
        'y': compressedMidPoint[index][1] * pathvisioNS.grid.squareLength
      });
    });
    //console.log('fullXYPath');
    //console.log(fullXYPath);

    fullXYPath.unshift({'x': pointStart.x, 'y': pointStart.y});
    fullXYPath.push({'x': pointEnd.x, 'y': pointEnd.y});

    /* 
     * Get smootherPath
     */

    var smootherPath = [];
    index = 0;
    if (fullXYPath.length > 2) {
      do {
        index += 1;
        if ((Math.abs(fullXYPath[index].x - fullXYPath[index - 1].x) > 2 * pathvisioNS.grid.squareLength || Math.abs(fullXYPath[index + 1].x - fullXYPath[index].x) > 2 * pathvisioNS.grid.squareLength) && (Math.abs(fullXYPath[index].y - fullXYPath[index - 1].y) > 2 * pathvisioNS.grid.squareLength || Math.abs(fullXYPath[index + 1].y - fullXYPath[index].y) > 2 * pathvisioNS.grid.squareLength)) {
          smootherPath.push(fullXYPath[index]);
        }
      } while (index < fullXYPath.length - 2);
    }
    else {
      //console.log('fullXYPath too short to smooth.');
    }

    smootherPath.unshift({'x': pointStart.x, 'y': pointStart.y});
    smootherPath.push({'x': pointEnd.x, 'y': pointEnd.y});

    //console.log('smootherPath');
    //console.log(smootherPath);


    //*
    // reposition start and end point to match source and origin
    if (smootherPath.length === 2) {
      if (Math.abs(smootherPath[1].x - pointStart.x) < Math.abs(smootherPath[1].x - pointEnd.x)) {
        smootherPath[1].x = pointStart.x;
        smootherPath[1].y = pointEnd.y;
      }
      else {
        smootherPath[1].x = pointEnd.x;
        smootherPath[1].y = pointStart.y;
      }
    }
    else {
      if (Math.abs(smootherPath[1].x - pointStart.x) < Math.abs(smootherPath[1].y - pointStart.y)) {
        smootherPath[1].x = pointStart.x;
      }
      else {
        smootherPath[1].y = pointStart.y;
      }

      if (Math.abs(smootherPath[smootherPath.length - 2].x - pointEnd.x) < Math.abs(smootherPath[smootherPath.length - 2].y - pointEnd.y)) {
        smootherPath[smootherPath.length - 2].x = pointEnd.x;
      }
      else {
        smootherPath[smootherPath.length - 2].y = pointEnd.y;
      }
    }
    //*/





    callback(smootherPath);
    //return smootherPath;
  }

  return {
    initGrid:initGrid,
    generateGridData:generateGridData,
    getPath:getPath,
    xYCoordinatesToMatrixLocation:xYCoordinatesToMatrixLocation,
    matrixLocationToXYCoordinates:matrixLocationToXYCoordinates
  };
}();
