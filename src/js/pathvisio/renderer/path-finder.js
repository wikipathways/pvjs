pathvisio.renderer.pathFinder = function(){

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
    var totalColumnCount = Math.floor(pathway.metadata.boardWidth/pathvisioNS.grid.squareLength);
    var totalRowCount = Math.floor(pathway.metadata.boardHeight/pathvisioNS.grid.squareLength);

    var matrix = [];
    pathvisioNS.grid.gridRenderingData = [];
    for(var currentRow=0; currentRow<totalRowCount; currentRow++) {
      matrix[currentRow] = [];
      for(var currentColumn=0; currentColumn<totalColumnCount; currentColumn++) {
        matrix[currentRow][currentColumn] = 0;
      }
    }
    console.log(matrix);

    // mark off no-go non-walkable regions for path finder (regions under nodes)

    var upperLeftCorner, lowerRightCorner, rowStart, rowEnd, columnStart, columnEnd;
    nodes[0][0].forEach(function(node) {
      upperLeftCorner = xYCoordinatesToMatrixLocation(node.x, node.y, pathvisioNS.grid.squareLength);
      lowerRightCorner = xYCoordinatesToMatrixLocation(node.x + node.width, node.y + node.height, pathvisioNS.grid.squareLength);
      
      columnStart = Math.max((upperLeftCorner.column - 5), 0);
      columnEnd = Math.min((lowerRightCorner.column + 5), totalColumnCount);
      rowStart = Math.max((upperLeftCorner.row - 5), 0);
      rowEnd = Math.min((lowerRightCorner.row + 5), totalRowCount);

      for(var currentRow=rowStart; currentRow<rowEnd+1; currentRow++) {
        for(var currentColumn=columnStart; currentColumn<columnEnd+1; currentColumn++) {
          matrix[currentRow][currentColumn] = 1;
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
      column1 = (anchorPosition.column);
      column2 = Math.max(Math.min((anchorPosition.column + 5 * anchor.dx), totalColumnCount), 0);
      columnStart = Math.min(column1, column2);
      columnEnd = Math.max(column1, column2);

      row1 = (anchorPosition.row);
      row2 = Math.max(Math.min((anchorPosition.row + 5 * anchor.dy), totalRowCount), 0);
      rowStart = Math.min(row1, row2);
      rowEnd = Math.max(row1, row2);

      for(var currentRow=rowStart; currentRow<rowEnd + 1; currentRow++) {
        for(var currentColumn=columnStart; currentColumn < columnEnd + 1; currentColumn++) {
          matrix[currentRow][currentColumn] = 0;
          pathvisioNS.grid.gridRenderingData[currentRow * (totalColumnCount - 1) + currentColumn] = {
            'x': currentColumn * pathvisioNS.grid.squareLength,
            'y': currentRow * pathvisioNS.grid.squareLength,
            'fill': 'yellow'
          };
        }
      }
    });

    self.matrix = matrix;
    pathvisioNS.grid.pathFinderGrid = new PF.Grid(totalColumnCount, totalRowCount, matrix);
    pathvisioNS.grid.gridRenderingData = pathvisioNS.grid.gridRenderingData.filter(function(element) {return !!element});

    callback();
  }

  function getPath(pathway, edge) {
        var workingGrid = pathvisioNS.grid.pathFinderGrid.clone();
        var finder = new PF.BiBreadthFirstFinder({
            allowDiagonal: false,
            dontCrossCorners: true
        });
        var points = edge.points;
        var pointStart = points[0];
        var pointEnd = points[points.length - 1];
        startLocation = xYCoordinatesToMatrixLocation(pointStart.x, pointStart.y);
        endLocation = xYCoordinatesToMatrixLocation(pointEnd.x, pointEnd.y);

        var blockyPath = self.blockyPath = finder.findPath(startLocation.column, startLocation.row, endLocation.column, endLocation.row, workingGrid);

        


        /*
        var newWorkingGrid = pathvisioNS.grid.pathFinderGrid.clone();
        smoothPath = PF.Util.smoothenPath(newWorkingGrid, blockyPath);
        //*/

        // compress path data and extract points

        var smoothPath = self.smoothPath = [];
        var index = 0;
        if (blockyPath.length > 2) {
          do {
            index += 1;
            //console.log(blockyPath[index]);
            if ((blockyPath[index - 1][0] - blockyPath[index + 1][0]) && (blockyPath[index - 1][1] !== blockyPath[index + 1][1])) {


              smoothPath.push([
                blockyPath[index][0],
                blockyPath[index][1]
              ]);
            }
          } while (index < blockyPath.length - 2);
        }
        else {
          console.log('blockyPath too short');
        }


        var path = self.path = [];
        smoothPath.forEach(function(element, index) {
          path.push({
            'x': smoothPath[index][0] * pathvisioNS.grid.squareLength,
            'y': smoothPath[index][1] * pathvisioNS.grid.squareLength
          });
        });

        path.unshift({'x': pointStart.x, 'y': pointStart.y});
        path.push({'x': pointEnd.x, 'y': pointEnd.y});

        var smootherPath = self.smootherPath = [];
        index = 0;
        if (path.length > 2) {
          do {
            index += 1;
            if ((Math.abs(path[index].x - path[index - 1].x) > 2 * pathvisioNS.grid.squareLength || Math.abs(path[index + 1].x - path[index].x) > 2 * pathvisioNS.grid.squareLength) && (Math.abs(path[index].y - path[index - 1].y) > 2 * pathvisioNS.grid.squareLength || Math.abs(path[index + 1].y - path[index].y) > 2 * pathvisioNS.grid.squareLength)) {
              smootherPath.push(path[index]);
            }
          } while (index < path.length - 2);
        }
        else {
          console.log('path too short');
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






        return smootherPath;
        //*/

  }

  //createGrid(pathway);
  //getPath(pathway.elements[620]);

  return {
    generateGridData:generateGridData,
    getPath:getPath,
    xYCoordinatesToMatrixLocation:xYCoordinatesToMatrixLocation,
    matrixLocationToXYCoordinates:matrixLocationToXYCoordinates
  };
}();
