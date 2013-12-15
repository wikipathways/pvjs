pathvisiojs.view.pathwayDiagram.pathFinder = function(){

  /*  Linear algebra conventions call for specifying an element of a matrix as row #, column #.
   *  The rows and columns use one-based indexing. Example: Element.1,2 is the element in the first row and the second column.
   *  The code in PathFinding.js uses x to refer to column # and y to refer to row #.
   *  JavaScript uses zero-based indexing for matrices. Example: matrix[0][1] refers to the element in the first row and the second column.
   *  This code will follow the PathFinding.js conventions and use zero-based indexing,
   *  so be careful to note this may differ from linear algebra conventions.
   * */

  function initGrid(nodes, pathwayImageWidth, pathwayImageHeight, callback) {
    var gridData = {}
    nodes = d3.select(nodes).sort(function(node1, node2) {
      Math.min(node1.height, node1.width) - Math.min(node2.height, node2.width);
    })[0][0];
    gridData.squareLength = Math.min(nodes[0].height, nodes[0].width) / 14;

    // Here we set how much padding to place around the entityNodes, in units of grid squares.
    // TODO change the static value of 12 to be a calculated value equal to the
    // largest dimension of a marker in the diagram.
    //
    // Curves need more padding than elbows do. Elbows look OK when padding is just
    // larger than the marker size, but curves slope down, so the padding needs to be
    // closer to twice the marker size for the marker to look properly connected to
    // the curve.

    gridData.padding = Math.ceil(22 / gridData.squareLength);
    var currentRow, currentColumn;
    gridData.totalColumnCount = Math.ceil(pathwayImageWidth/gridData.squareLength);
    gridData.totalRowCount = Math.ceil(pathwayImageHeight/gridData.squareLength);

    generateEntirelyWalkableMatrix(gridData.totalRowCount, gridData.totalColumnCount, function(entirelyWalkableMatrix) {
      // need this to generate path data as last resort when populated grids do not result in a path

      gridData.emptyGrid = new PF.Grid(gridData.totalColumnCount, gridData.totalRowCount, entirelyWalkableMatrix);
      gridData.entirelyWalkableMatrix = entirelyWalkableMatrix;
      callback(gridData);
    });
  }

  function getPath(svg, edge, callbackOutside) {
    var gridData = svg[0][0].pathvisiojs.gridData;
    var workingGrid;

    var Point = edge.Point;
    var pointStart = Point[0];
    var pointEnd = Point[Point.length - 1];
    var startLocation = xYCoordinatesToMatrixLocation(pointStart.x, pointStart.y, gridData.squareLength);
    var endLocation = xYCoordinatesToMatrixLocation(pointEnd.x, pointEnd.y, gridData.squareLength);
    var finder = new PF.BiBreadthFirstFinder({
      allowDiagonal: false,
      dontCrossCorners: true
    });

    // TODO need to rethink this wrt to reactions and other ways of
    // doing the data structure where we may have more than just a
    // source and a target

    var edgeGraphRefNodes = [];
    if (edge.edgeType === 'Interaction') {
      edgeGraphRefNodes.push(edge.InteractionGraph[0]);
      edgeGraphRefNodes.push(edge.InteractionGraph[0].interactsWith);
    }

    // TODO this handles both graphicalLines and Interactions for now, but it's a little clumsy.

    var pathData = [];
    async.waterfall([
      function(callback){
        if (edge.edgeType === 'Interaction') {
          generateGrid(gridData, edgeGraphRefNodes, null, function(grid) {
            callback(null, grid);
          });
        }
        else {
          callback(null);
        }
      },
      function(grid, callback){
        if (edge.edgeType === 'Interaction') {
          workingGrid = grid;
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
          runPathFinder(workingGrid,
                        finder,
                        Point,
                        pointStart,
                        pointEnd,
                        startLocation,
                        endLocation,
                        gridData.squareLength,
                        function(data) {
            pathData = data;
            callback(null);
          });
        }
        else {
          callback(null);
        }
      },
      function(callback){

        // graphicalLines will have pathData = [],
        // Interactions will have pathData = [startPoint, endPoint] if the nodes
        // block a real path from being found.

        if (pathData.length < 3) {
          workingGrid = gridData.emptyGrid.clone();
          runPathFinder(workingGrid,
                        finder,
                        Point,
                        pointStart,
                        pointEnd,
                        startLocation,
                        endLocation,
                        gridData.squareLength,
                        function(data) {
            pathData = data;
            pathData.push({'x': pointEnd.x, 'y': pointEnd.y});
          callbackOutside(pathData);
          });
        }
        else {
          callbackOutside(pathData);
        }
      }
    ]);
  }

  function xYCoordinatesToMatrixLocation(x, y, squareLength) {
    var results = {};
    results.column = Math.floor(x/squareLength);
    results.row = Math.floor(y/squareLength);
    return results;
  }

  function matrixLocationToXYCoordinates(column, row, squareLength) {
    var results = {};
    results.x = column * squareLength;
    results.y = row * squareLength;
    return results;
  }

  function generateEntirelyWalkableMatrix(totalRowCount, totalColumnCount, callback) {
    var entirelyWalkableMatrix = [];
    for(var currentRow = 0; currentRow < totalRowCount; currentRow++) {
      entirelyWalkableMatrix[currentRow] = [];
      for(var currentColumn = 0; currentColumn < totalColumnCount; currentColumn++) {
        entirelyWalkableMatrix[currentRow][currentColumn] = 0;
      }
    }
    callback(entirelyWalkableMatrix);
  }

  function populateMatrix(args, callback) {
    if (!args) {
      throw new Error('No args specified.');
    }
    if (!args.inputMatrix) {
      throw new Error('No inputMatrix specified.');
    }
    if (!args.padding) {
      throw new Error('No padding specified.');
    }
    if (!args.squareLength) {
      throw new Error('No squareLength specified.');
    }
    if (!args.totalRowCount) {
      throw new Error('No totalRowCount specified.');
    }
    if (!args.totalColumnCount) {
      throw new Error('No totalColumnCount specified.');
    }
    if (!args.nodes) {
      console.warn('No nodes specified. Returning unmodified inputMatrix.');
      callback(args.inputMatrix);
    }

    // populatedMatrix is the matrix that has non-walkable areas for each node specified in the input

    var populatedMatrix = args.inputMatrix;

    // mark off no-go non-walkable regions for path finder (regions under edgeGraphRefNodes)

    var upperLeftCorner, lowerRightCorner, rowStart, rowEnd, columnStart, columnEnd;
    args.nodes.forEach(function(node) {
      upperLeftCorner = xYCoordinatesToMatrixLocation(node.x, node.y, args.squareLength);
      lowerRightCorner = xYCoordinatesToMatrixLocation(node.x + node.width, node.y + node.height, args.squareLength);

      columnStart = Math.max((upperLeftCorner.column - args.padding), 0);
      columnEnd = Math.min((lowerRightCorner.column + args.padding), args.totalColumnCount - 1);
      rowStart = Math.max((upperLeftCorner.row - args.padding), 0);
      rowEnd = Math.min((lowerRightCorner.row + args.padding), args.totalRowCount - 1);

      for(var currentRow=rowStart; currentRow<rowEnd + 1; currentRow++) {
        for(var currentColumn=columnStart; currentColumn<columnEnd + 1; currentColumn++) {
          populatedMatrix[currentRow][currentColumn] = 1;
        }
      }
    });
    callback(populatedMatrix);
  }

  function generateGrid(gridData, edgeGraphRefNodes, otherNodes, callback) {
    if (!gridData) {
      throw new Error('No gridData specified.');
    }
    if (!gridData.entirelyWalkableMatrix) {
      throw new Error('No entirelyWalkableMatrix specified.');
    }
    if (!gridData.padding) {
      throw new Error('No padding specified.');
    }
    if (!gridData.squareLength) {
      throw new Error('No squareLength specified.');
    }
    if (!gridData.totalRowCount) {
      throw new Error('No totalRowCount specified.');
    }
    if (!gridData.totalColumnCount) {
      throw new Error('No totalColumnCount specified.');
    }

    // edgeGraphRefNodes and otherNodes are clumsy names but are the best I could come up
    // with for now.
    //
    // edgeGraphRefNodes refers to the set of nodes that an edge is snapped to.
    // At present, this set is only the source and target nodes, but in the future,
    // it could include nodes that a waypoint is snapped to
    // if we allow for waypoints to be snappable.
    //
    // otherNodes refers to any other nodes that should be non-walkable.


    async.parallel({
      'populatedMatrix':function(populateMatrixCallback) {
        async.waterfall([
          function(waterfallCallback) {

            // mark off no-go non-walkable regions for path finder
            // (in this case, regions under edgeGraphRefNodes)

            populateMatrix({
              'nodes':edgeGraphRefNodes,
              'inputMatrix':pathvisiojs.utilities.clone(gridData.entirelyWalkableMatrix),
              'padding':gridData.padding,
              'squareLength':gridData.squareLength,
              'totalRowCount':gridData.totalRowCount,
              'totalColumnCount':gridData.totalColumnCount
            },
            function(populatedMatrix) {
              waterfallCallback(null, populatedMatrix);
            })
          },
          function(populatedMatrix, waterfallCallback) {

            // mark off no-go non-walkable regions for path finder
            // (in this case, regions under otherNodes)

            if (!!otherNodes) {
              populateMatrix({
                'nodes':otherNodes,
                'inputMatrix':populatedMatrix,
                'padding':1,
                'squareLength':gridData.squareLength,
                'totalRowCount':gridData.totalRowCount,
                'totalColumnCount':gridData.totalColumnCount
              },
              function(populatedMatrix) {
                populateMatrixCallback(null, populatedMatrix);
              })
            }
            else {
              populateMatrixCallback(null, populatedMatrix);
            }
          }
        ]);
      },
      'ports':function(populateMatrixCallback) {
        var portFrame = {
          '@context': pathvisiojs.context,
          '@type': 'Port'
        };  
        var allNodesContainer = {};
        allNodesContainer['@context'] = pathvisiojs.context;
        allNodesContainer.DataNode = edgeGraphRefNodes;
        if (!!otherNodes) {
          otherNodes.forEach(function(node){
            allNodesContainer.DataNode = allNodesContainer.DataNode.concat(node);
          });
        }
        jsonld.frame(allNodesContainer, portFrame, function(err, ports) {
          /*
          async.series([
            function(portsCallback) {
              var ports = [];
              portSets['@graph'].forEach(function(portSet) {
                ports = ports.concat(portSet);
              });

              portsCallback(null, ports);
            }
          ],
          function(err, results) {
            var ports = results.ports;

            var column1, column2, row1, row2, portLocation;
            ports.forEach(function(port) {
              portLocation = xYCoordinatesToMatrixLocation(port.x, port.y, gridData.squareLength);
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
                }
              }
            });

            populateMatrixCallback(null, results.ports);
          });
          //*/
          populateMatrixCallback(null, ports['@graph']);
        });
      }
    },
    function(err, results) {
      var populatedMatrix = results.populatedMatrix;
      var ports = results.ports;
      var grid;

      // mark off walkable regions emanating from ports

      if (!!ports) {
        var column1, column2, row1, row2, portLocation, columnStart, columnEnd, rowStart, rowEnd;
        ports.forEach(function(port) {
          portLocation = xYCoordinatesToMatrixLocation(port.x, port.y, gridData.squareLength);
          column1 = Math.max(Math.min((portLocation.column - gridData.padding * port.dy), gridData.totalColumnCount - 1), 0);
          column2 = Math.max(Math.min((portLocation.column + port.dy), gridData.totalColumnCount - 1), 0);
          columnStart = Math.min(column1, column2);
          columnEnd = Math.max(column1, column2);

          row1 = Math.max(Math.min((portLocation.row - port.dx), gridData.totalRowCount - 1), 0);
          row2 = Math.max(Math.min((portLocation.row + gridData.padding * port.dx), gridData.totalRowCount - 1), 0);
          rowStart = Math.min(row1, row2);
          rowEnd = Math.max(row1, row2);

          for(var currentRow=rowStart; currentRow<rowEnd + 1; currentRow++) {
            populatedMatrix[currentRow] = populatedMatrix[currentRow] || [];
            for(var currentColumn=columnStart; currentColumn<columnEnd + 1; currentColumn++) {
              populatedMatrix[currentRow][currentColumn] = 0;
            }
          }
        });
        grid = new PF.Grid(gridData.totalColumnCount, gridData.totalRowCount, populatedMatrix);
        callback(grid);
      }
      else {
        grid = new PF.Grid(gridData.totalColumnCount, gridData.totalRowCount, populatedMatrix);
        callback(grid);
      }

      //console.log('gridData.totalColumnCount');
      //console.log(gridData.totalColumnCount);
      //console.log('gridData.totalRowCount');
      //console.log(gridData.totalRowCount);
      //console.log('populatedMatrix');
      //console.log(populatedMatrix);


      // we only want to render the non-walkable areas the walkable areas emanating out from nodes.
      // Rendering all the rest of the walkable areas would be too demanding in terms of number of
      // elements rendered in SVG.

    });
  }

  /*
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
  //*/

  function runPathFinder(workingGrid, finder, Point, pointStart, pointEnd, startLocation, endLocation, squareLength, callback) {
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
        'x': compressedMidPoint[index][0] * squareLength,
        'y': compressedMidPoint[index][1] * squareLength
      });
    });

    fullXYPath.unshift({'x': pointStart.x, 'y': pointStart.y});
    fullXYPath.push({'x': pointEnd.x, 'y': pointEnd.y});
    //console.log('fullXYPath');
    //console.log(fullXYPath);

    /* 
     * Get smootherPath
     */

    var smootherPath = [];
    index = 0;
    if (fullXYPath.length > 2) {
      do {
        index += 1;
        if ((Math.abs(fullXYPath[index].x - fullXYPath[index - 1].x) > 2 * squareLength || Math.abs(fullXYPath[index + 1].x - fullXYPath[index].x) > 2 * squareLength) && (Math.abs(fullXYPath[index].y - fullXYPath[index - 1].y) > 2 * squareLength || Math.abs(fullXYPath[index + 1].y - fullXYPath[index].y) > 2 * squareLength)) {
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
    //generateGridData:generateGridData,
    getPath:getPath
  };
}();
