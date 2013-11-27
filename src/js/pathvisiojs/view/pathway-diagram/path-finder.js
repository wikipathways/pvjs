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

  function generateGridData(pathway, callback) {
    var nodes = pathway.elements.filter(function(element) {
      return element.renderableType === 'node';
    });
    nodes = d3.select(nodes).sort(function(node1, node2) {
      Math.min(node1.height, node1.width) - Math.min(node2.height, node2.width);
    });
    pathvisioNS.grid.squareLength = Math.min(nodes[0][0][0].height, nodes[0][0][0].width) / 7;
    var totalColumnCount = self.totalColumnCount = Math.ceil(pathway.image.width/pathvisioNS.grid.squareLength);
    var totalRowCount = self.totalRowCount = Math.ceil(pathway.image.height/pathvisioNS.grid.squareLength);

    var paddedMatrix = self.paddedMatrix = [];
    pathvisioNS.grid.gridRenderingData = [];

    // remember zero-based indexing means we want to go from 0 to totalRowCount - 1
    // and 0 to totalColumnCount - 1
    // last element is matrix[totalRowCount - 1][totalColumnCount - 1]

    for(var currentRow = 0; currentRow < totalRowCount; currentRow++) {
      paddedMatrix[currentRow] = [];
      for(var currentColumn = 0; currentColumn < totalColumnCount; currentColumn++) {
        paddedMatrix[currentRow][currentColumn] = 0;
      }
    }
    
    var tightMatrix, emptyMatrix;
    emptyMatrix = tightMatrix = paddedMatrix;

    // mark off no-go non-walkable regions for path finder (regions under nodes)

    var upperLeftCorner, lowerRightCorner, rowStart, rowEnd, columnStart, columnEnd;
    nodes[0][0].forEach(function(node) {
      upperLeftCorner = xYCoordinatesToMatrixLocation(node.x, node.y, pathvisioNS.grid.squareLength);
      lowerRightCorner = xYCoordinatesToMatrixLocation(node.x + node.width, node.y + node.height, pathvisioNS.grid.squareLength);

      columnStartTight = self.columnStartTight = Math.max((upperLeftCorner.column), 0);
      columnEndTight = self.columnEndTight = Math.min((lowerRightCorner.column), totalColumnCount - 1);
      rowStartTight = self.rowStartTight = Math.max((upperLeftCorner.row), 0);
      rowEndTight = self.rowEndTight = Math.min((lowerRightCorner.row), totalRowCount - 1);

      for(var currentRow=rowStartTight; currentRow<rowEndTight + 1; currentRow++) {
        for(var currentColumn=columnStartTight; currentColumn<columnEndTight + 1; currentColumn++) {
          tightMatrix[currentRow][currentColumn] = 1;
        }
      }

      columnStart = self.columnStart = Math.max((upperLeftCorner.column - 5), 0);
      columnEnd = self.columnEnd = Math.min((lowerRightCorner.column + 5), totalColumnCount - 1);
      rowStart = self.rowStart = Math.max((upperLeftCorner.row - 5), 0);
      rowEnd = self.rowEnd = Math.min((lowerRightCorner.row + 5), totalRowCount - 1);

      for(var currentRow=rowStart; currentRow<rowEnd + 1; currentRow++) {
        for(var currentColumn=columnStart; currentColumn<columnEnd + 1; currentColumn++) {
          paddedMatrix[currentRow][currentColumn] = 1;
          pathvisioNS.grid.gridRenderingData[currentRow * (totalColumnCount - 1) + currentColumn] = {
            'x': currentColumn * pathvisioNS.grid.squareLength,
            'y': currentRow * pathvisioNS.grid.squareLength,
            'fill': 'blue'
          };
        }
      }
    });

    var anchors = pathway.elements.filter(function(element) {
      return element.renderableType === 'anchor';
    });

    var column1, column2, row1, row2, anchorPosition;
    anchors.forEach(function(anchor) {
      anchorPosition = xYCoordinatesToMatrixLocation(anchor.x, anchor.y);
      column1 = Math.max(Math.min((anchorPosition.column - 5 * anchor.dx), totalColumnCount - 1), 0);
      column2 = Math.max(Math.min((anchorPosition.column + 5 * anchor.dx), totalColumnCount - 1), 0);
      columnStart = Math.min(column1, column2);
      columnEnd = Math.max(column1, column2);

      row1 = Math.max(Math.min((anchorPosition.row - 5 * anchor.dy), totalRowCount - 1), 0);
      row2 = Math.max(Math.min((anchorPosition.row + 5 * anchor.dy), totalRowCount - 1), 0);
      rowStart = Math.min(row1, row2);
      rowEnd = Math.max(row1, row2);

      for(var currentRow=rowStart; currentRow<rowEnd + 1; currentRow++) {
        for(var currentColumn=columnStart; currentColumn < columnEnd + 1; currentColumn++) {
          paddedMatrix[currentRow][currentColumn] = 0;
          pathvisioNS.grid.gridRenderingData[currentRow * (totalColumnCount - 1) + currentColumn] = {
            'x': currentColumn * pathvisioNS.grid.squareLength,
            'y': currentRow * pathvisioNS.grid.squareLength,
            'fill': 'yellow'
          };
        }
      }
    });

    pathvisioNS.grid.paddedGrid = new PF.Grid(totalColumnCount, totalRowCount, paddedMatrix);
    pathvisioNS.grid.tightGrid = new PF.Grid(totalColumnCount, totalRowCount, tightMatrix);
    pathvisioNS.grid.emptyGrid = new PF.Grid(totalColumnCount, totalRowCount, emptyMatrix);
    pathvisioNS.grid.gridRenderingData = pathvisioNS.grid.gridRenderingData.filter(function(element) {return !!element});

    callback();
  }

  function getPath(pathway, edge, callbackOutside) {
    var workingGrid = self.workingGrid = pathvisioNS.grid.paddedGrid.clone();
    var finder = self.finder = new PF.BiBreadthFirstFinder({
      allowDiagonal: false,
      dontCrossCorners: true
    });
    var points = edge.points;
    var pointStart = points[0];
    var pointEnd = points[points.length - 1];
    startLocation = self.startLocation = xYCoordinatesToMatrixLocation(pointStart.x, pointStart.y);
    endLocation = self.endLocation = xYCoordinatesToMatrixLocation(pointEnd.x, pointEnd.y);
    var pathData;
    async.series([
      function(callback){
        runPathFinder(pathway, edge, workingGrid, finder, points, pointStart, pointEnd, startLocation, endLocation, function(data) {
          pathData = data;
          console.log('padded');
          console.log(pathData);
          console.log(pathData.length);
          callback(null);
        });
      },
      function(callback){
        if (pathData.length < 3) {
          workingGrid = self.workingGrid = pathvisioNS.grid.tightGrid.clone();
          runPathFinder(pathway, edge, workingGrid, finder, points, pointStart, pointEnd, startLocation, endLocation, function(data) {
            pathData = data;
            console.log('tight');
            console.log(pathData);
            console.log(pathData.length);
            callback(null);
          });
        }
        else {
          callback(null);
        }
      },
      function(callback){
        if (pathData.length < 3) {
          workingGrid = self.workingGrid = pathvisioNS.grid.emptyGrid.clone();
          runPathFinder(pathway, edge, workingGrid, finder, points, pointStart, pointEnd, startLocation, endLocation, function(data) {
            pathData = data;
            console.log('empty');
            console.log(pathData);
            console.log(pathData.length);
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
      console.log('returned');
      console.log(pathData);
      console.log(pathData.length);
      callbackOutside(pathData);
      //return pathData;
    });
  }

  function runPathFinder(pathway, edge, workingGrid, finder, points, pointStart, pointEnd, startLocation, endLocation, callback) {

    /* 
     * Get blockyPath
     */

    var blockyPath = self.blockyPath = finder.findPath(startLocation.column, startLocation.row, endLocation.column, endLocation.row, workingGrid);
    console.log('blockyPath');
    console.log(blockyPath);

    /*
       var newWorkingGrid = pathvisioNS.grid.paddedGrid.clone();
       compressedMidpoints = PF.Util.smoothenPath(newWorkingGrid, blockyPath);
    //*/

    /* 
     * Get compressedMidpoints
     */
    // compress path data and extract points

    var compressedMidpoints = self.compressedMidpoints = [];
    var index = 0;
    if (blockyPath.length > 3) {
      do {
        index += 1;
        if ((blockyPath[index - 1][0] - blockyPath[index + 1][0]) && (blockyPath[index - 1][1] !== blockyPath[index + 1][1])) {
          compressedMidpoints.push([
            blockyPath[index][0],
            blockyPath[index][1]
          ]);
        }
      } while (index < blockyPath.length - 2);
    }
    else {
      console.log('blockyPath too short to compress.');
    }

    /* 
     * Get fullXYPath
     */

    var fullXYPath = self.fullXYPath = [];

    compressedMidpoints.forEach(function(element, index) {
      fullXYPath.push({
        'x': compressedMidpoints[index][0] * pathvisioNS.grid.squareLength,
        'y': compressedMidpoints[index][1] * pathvisioNS.grid.squareLength
      });
    });

    fullXYPath.unshift({'x': pointStart.x, 'y': pointStart.y});
    fullXYPath.push({'x': pointEnd.x, 'y': pointEnd.y});

    /* 
     * Get smootherPath
     */

    var smootherPath = self.smootherPath = [];
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
      console.log('fullXYPath too short to smooth.');
    }

    smootherPath.unshift({'x': pointStart.x, 'y': pointStart.y});
    smootherPath.push({'x': pointEnd.x, 'y': pointEnd.y});


    /*
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
    generateGridData:generateGridData,
    getPath:getPath,
    xYCoordinatesToMatrixLocation:xYCoordinatesToMatrixLocation,
    matrixLocationToXYCoordinates:matrixLocationToXYCoordinates
  };
}();
