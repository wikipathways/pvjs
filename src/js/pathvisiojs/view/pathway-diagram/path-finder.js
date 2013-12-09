pathvisiojs.view.pathwayDiagram.pathFinder = function(){

  /*  Linear algebra conventions call for specifying an element of a matrix as row #, column #.
   *  The rows and columns use one-based indexing. Example: Element.1,2 is the element in the first row and the second column.
   *  The code in PathFinding.js uses x to refer to column # and y to refer to row #.
   *  JavaScript uses zero-based indexing for matrices. Example: matrix[0][1] refers to the element in the first row and the second column.
   *  This code will follow the PathFinding.js conventions and use zero-based indexing,
   *  so be careful to note this may differ from linear algebra conventions.
   * */

  function xYCoordinatesToMatrixLocation(X, Y) {
    var results = {};
    results.column = Math.floor(X/pathvisioNS.grid.squareLength);
    results.row = Math.floor(Y/pathvisioNS.grid.squareLength);
    return results;
  }

  function matrixLocationToXYCoordinates(column, row) {
    var results = {};
    results.X = column * pathvisioNS.grid.squareLength;
    results.Y = row * pathvisioNS.grid.squareLength;
    return results;
  }

  function generateGridData(shapes, pathwayImageWidth, pathwayImageHeight, callback) {
    console.log('***************');
    console.log('shapes');
    console.log(shapes);
    console.log('pathwayImageWidth');
    console.log(pathwayImageWidth);
    console.log('pathwayImageHeight');
    console.log(pathwayImageHeight);
    console.log('***************');

    shapes = d3.select(shapes).sort(function(shape1, shape2) {
      Math.min(shape1.height, shape1.width) - Math.min(shape2.height, shape2.width);
    })[0][0];
    pathvisioNS.grid.squareLength = Math.min(shapes[0].height, shapes[0].width) / 14;
    var currentRow, currentColumn;
    var totalColumnCount = Math.ceil(pathwayImageWidth/pathvisioNS.grid.squareLength);
    var totalRowCount = Math.ceil(pathwayImageHeight/pathvisioNS.grid.squareLength);

    var paddedMatrix = [];
    pathvisioNS.grid.gridRenderingData = [];

    // remember zero-based indexing means we want to go from 0 to totalRowCount - 1
    // and 0 to totalColumnCount - 1
    // last element is matrix[totalRowCount - 1][totalColumnCount - 1]

    for(currentRow = 0; currentRow < totalRowCount; currentRow++) {
      paddedMatrix[currentRow] = [];
      for(currentColumn = 0; currentColumn < totalColumnCount; currentColumn++) {
        paddedMatrix[currentRow][currentColumn] = 0;
      }
    }
    
    var tightMatrix, emptyMatrix;
    emptyMatrix = tightMatrix = paddedMatrix;

    // mark off no-go non-walkable regions for path finder (regions under shapes)

    var upperLeftCorner, lowerRightCorner, rowStart, rowEnd, columnStart, columnEnd;
    shapes.forEach(function(shape) {
      upperLeftCorner = xYCoordinatesToMatrixLocation(shape.CenterX - shape.width/2, shape.CenterY - shape.height/2, pathvisioNS.grid.squareLength);
      lowerRightCorner = xYCoordinatesToMatrixLocation(shape.CenterX + shape.width/2, shape.CenterY + shape.height/2, pathvisioNS.grid.squareLength);

      columnStartTight = Math.max((upperLeftCorner.column), 0);
      columnEndTight = Math.min((lowerRightCorner.column), totalColumnCount - 1);
      rowStartTight = Math.max((upperLeftCorner.row), 0);
      rowEndTight = Math.min((lowerRightCorner.row), totalRowCount - 1);

      for(currentRow=rowStartTight; currentRow<rowEndTight + 1; currentRow++) {
        for(currentColumn=columnStartTight; currentColumn<columnEndTight + 1; currentColumn++) {
          tightMatrix[currentRow][currentColumn] = 1;
        }
      }

      columnStart = Math.max((upperLeftCorner.column - 5), 0);
      columnEnd = Math.min((lowerRightCorner.column + 5), totalColumnCount - 1);
      rowStart = Math.max((upperLeftCorner.row - 5), 0);
      rowEnd = Math.min((lowerRightCorner.row + 5), totalRowCount - 1);

      for(currentRow=rowStart; currentRow<rowEnd + 1; currentRow++) {
        for(currentColumn=columnStart; currentColumn<columnEnd + 1; currentColumn++) {
          paddedMatrix[currentRow][currentColumn] = 1;
          pathvisioNS.grid.gridRenderingData[currentRow * (totalColumnCount - 1) + currentColumn] = {
            'X': currentColumn * pathvisioNS.grid.squareLength,
            'Y': currentRow * pathvisioNS.grid.squareLength,
            'fill': 'blue'
          };
        }
      }
    });

    var anchors = [];
    var relXYCombinations = [
      {
        RelX: -0.5,
        RelY: -1
      },
      {
        RelX: 0,
        RelY: -1
      },
      {
        RelX: 0.5,
        RelY: -1
      },
      {
        RelX: 1,
        RelY: -0.5
      },
      {
        RelX: 1,
        RelY: 0
      },
      {
        RelX: 1,
        RelY: 0.5
      },
      {
        RelX: -0.5,
        RelY: 1
      },
      {
        RelX: 0,
        RelY: 1
      },
      {
        RelX: 0.5,
        RelY: 1
      },
      {
        RelX: -1,
        RelY: -0.5
      },
      {
        RelX: -1,
        RelY: 0
      },
      {
        RelX: -1,
        RelY: 0.5
      }
    ];

    var dx, dy;
    shapes.forEach(function(shape) {
      relXYCombinations.forEach(function(relXYCombination) {
        if (relXYCombination.RelX === 1 || relXYCombination.RelX === -1) {
          dx = relXYCombination.RelX;
          dy = 0;
        }
        else {
          dx = 0;
          dy = relXYCombination.RelY;
        }

        anchors.push({
          'X': (shape.CenterX + shape.width * relXYCombination.RelX / 2),
          'Y': (shape.CenterY + shape.height * relXYCombination.RelY / 2),
          'dx': dx,
          'dy': dy
        }); 
        console.log('anchors');
        console.log(anchors);
      }); 
    });

    //console.log('anchors');
    //console.log(anchors);

    var column1, column2, row1, row2, anchorLocation;
    anchors.forEach(function(anchor) {
      anchorLocation = xYCoordinatesToMatrixLocation(anchor.X, anchor.Y);
      console.log('anchor');
      console.log(anchorLocation);
      console.log('anchorLocation');
      console.log(anchorLocation);
      column1 = Math.max(Math.min((anchorLocation.column - 5 * anchor.dx), totalColumnCount - 1), 0);
      column2 = Math.max(Math.min((anchorLocation.column + 5 * anchor.dx), totalColumnCount - 1), 0);
      columnStart = Math.min(column1, column2);
      columnEnd = Math.max(column1, column2);

      row1 = Math.max(Math.min((anchorLocation.row - 5 * anchor.dy), totalRowCount - 1), 0);
      row2 = Math.max(Math.min((anchorLocation.row + 5 * anchor.dy), totalRowCount - 1), 0);
      rowStart = Math.min(row1, row2);
      rowEnd = Math.max(row1, row2);

      for(currentRow=rowStart; currentRow<rowEnd + 1; currentRow++) {
        paddedMatrix[currentRow] = paddedMatrix[currentRow] || [];
        for(currentColumn=columnStart; currentColumn<columnEnd + 1; currentColumn++) {
          console.log('currentColumn');
          console.log(currentColumn);
          paddedMatrix[currentRow][currentColumn] = 0;
          pathvisioNS.grid.gridRenderingData[currentRow * (totalColumnCount - 1) + currentColumn] = {
            'X': currentColumn * pathvisioNS.grid.squareLength,
            'Y': currentRow * pathvisioNS.grid.squareLength,
            'fill': 'yellow'
          };
          console.log('currentColumn * pathvisioNS.grid.squareLength');
          console.log(currentColumn * pathvisioNS.grid.squareLength);
        }
      }
    });

    console.log('totalColumnCount');
    console.log(totalColumnCount);
    console.log('totalRowCount');
    console.log(totalRowCount);
    console.log('paddedMatrix');
    console.log(paddedMatrix);

    pathvisioNS.grid.paddedGrid = new PF.Grid(totalColumnCount, totalRowCount, paddedMatrix);
    pathvisioNS.grid.tightGrid = new PF.Grid(totalColumnCount, totalRowCount, tightMatrix);
    pathvisioNS.grid.emptyGrid = new PF.Grid(totalColumnCount, totalRowCount, emptyMatrix);
    pathvisioNS.grid.gridRenderingData = pathvisioNS.grid.gridRenderingData.filter(function(element) {return !!element});

    callback();
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
    startLocation = xYCoordinatesToMatrixLocation(pointStart.X, pointStart.Y);
    endLocation = xYCoordinatesToMatrixLocation(pointEnd.X, pointEnd.Y);
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
            pathData.push({'X': pointEnd.X, 'Y': pointEnd.Y});
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
        'X': compressedMidPoint[index][0] * pathvisioNS.grid.squareLength,
        'Y': compressedMidPoint[index][1] * pathvisioNS.grid.squareLength
      });
    });

    fullXYPath.unshift({'X': pointStart.X, 'Y': pointStart.Y});
    fullXYPath.push({'X': pointEnd.X, 'Y': pointEnd.Y});

    /* 
     * Get smootherPath
     */

    var smootherPath = [];
    index = 0;
    if (fullXYPath.length > 2) {
      do {
        index += 1;
        if ((Math.abs(fullXYPath[index].X - fullXYPath[index - 1].X) > 2 * pathvisioNS.grid.squareLength || Math.abs(fullXYPath[index + 1].X - fullXYPath[index].X) > 2 * pathvisioNS.grid.squareLength) && (Math.abs(fullXYPath[index].Y - fullXYPath[index - 1].Y) > 2 * pathvisioNS.grid.squareLength || Math.abs(fullXYPath[index + 1].Y - fullXYPath[index].Y) > 2 * pathvisioNS.grid.squareLength)) {
          smootherPath.push(fullXYPath[index]);
        }
      } while (index < fullXYPath.length - 2);
    }
    else {
      //console.log('fullXYPath too short to smooth.');
    }

    smootherPath.unshift({'X': pointStart.X, 'Y': pointStart.Y});
    smootherPath.push({'X': pointEnd.X, 'Y': pointEnd.Y});

    console.log('smootherPath');
    console.log(smootherPath);


    /*
    // reposition start and end point to match source and origin
    if (smootherPath.length === 2) {
    if (Math.abs(smootherPath[1].X - pointStart.X) < Math.abs(smootherPath[1].X - pointEnd.X)) {
    smootherPath[1].X = pointStart.X;
    smootherPath[1].Y = pointEnd.Y;
    }
    else {
    smootherPath[1].X = pointEnd.X;
    smootherPath[1].Y = pointStart.Y;
    }
    }
    else {
    if (Math.abs(smootherPath[1].X - pointStart.X) < Math.abs(smootherPath[1].Y - pointStart.Y)) {
    smootherPath[1].X = pointStart.X;
    }
    else {
    smootherPath[1].Y = pointStart.Y;
    }

    if (Math.abs(smootherPath[smootherPath.length - 2].X - pointEnd.X) < Math.abs(smootherPath[smootherPath.length - 2].Y - pointEnd.Y)) {
    smootherPath[smootherPath.length - 2].X = pointEnd.X;
    }
    else {
    smootherPath[smootherPath.length - 2].Y = pointEnd.Y;
    }
    }
    //*/





    callback(smootherPath);
    //return smootherPath;
  }

  return {
    generateGridData:generateGridData,
    getPath:getPath,
    xYCoordinatesToMatrixLocation:xYCoordinatesToMatrixLocation,
    matrixLocationToXYCoordinates:matrixLocationToXYCoordinates
  };
}();
