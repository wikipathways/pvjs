pathvisio.renderer.pathFinder = function(){

  function createGrid(pathway) {
    var nodes = pathway.elements.filter(function(element) {
      return element.renderableType === 'node';
    });
    nodes = d3.select(nodes).sort(function(node1, node2) {
      Math.min(node1.height, node1.width) - Math.min(node2.height, node2.width);
    });
    var cellLength = Math.min(nodes[0][0][0].height, nodes[0][0][0].width) / 7;
    pathway.metadata.cellLength = cellLength;
    var rows = Math.floor(pathway.metadata.boardHeight/cellLength);
    var columns = Math.floor(pathway.metadata.boardWidth/cellLength);

    var matrix = [];
    for(var i=0; i<rows; i++) {
        matrix[i] = [];
        for(var j=0; j<columns; j++) {
            matrix[i][j] = 0;
        }
    }

    var rowStart, rowEnd, columnStart, columnEnd;
    nodes[0][0].forEach(function(node) {
      rowStart = Math.floor(node.x/cellLength);
      rowEnd = Math.ceil((node.x + node.width)/cellLength);
      columnStart = Math.floor(node.y/cellLength);
      columnEnd = Math.ceil((node.y + node.height)/cellLength);

      for(var i=rowStart-1; i<rowEnd-1; i++) {
        for(var j=columnStart-1; j<columnEnd-1; j++) {
            matrix[i][j] = 1;
        }
      }
    });

    var anchors = pathway.elements.filter(function(element) {
      return element.renderableType === 'anchor';
    });

    anchors.forEach(function(anchor) {
      rowStart = Math.floor(anchor.x/cellLength);
      rowEnd = Math.ceil((anchor.x + 4 * anchor.dx * cellLength)/cellLength);
      columnStart = Math.floor(anchor.y/cellLength);
      columnEnd = Math.ceil((anchor.y + 4 * anchor.dy * cellLength)/cellLength);

      for(var i=rowStart-1; i<rowEnd-1; i++) {
        for(var j=columnStart-1; j<columnEnd-1; j++) {
            matrix[i][j] = 0;
        }
      }
    });
    pathway.metadata.grid = new PF.Grid(columns, rows, matrix);
    return pathway.metadata.grid;
  }

  function getPath(pathway, edge) {
    if (!pathway.metadata.grid) {
      pathway.metadata.grid = createGrid(pathway);
    }
    var workingGrid = pathway.metadata.grid.clone();
    var finder = new PF.BiBreadthFirstFinder({
        allowDiagonal: false,
        dontCrossCorners: true
    });
    var points = edge.points;
    var pointStart = points[0];
    var pointEnd = points[points.length - 1];
    pointStart.column = Math.ceil(pointStart.x / pathway.metadata.cellLength);
    pointStart.row = Math.ceil(pointStart.y / pathway.metadata.cellLength);
    pointEnd.column = Math.ceil(pointEnd.x / pathway.metadata.cellLength);
    pointEnd.row = Math.ceil(pointEnd.y / pathway.metadata.cellLength);
    var blockyPath = self.blockyPath = finder.findPath(pointStart.column, pointStart.row, pointEnd.column, pointEnd.row, workingGrid);
    var path = self.path = [];
    var index = 0;
    do {
      index += 1;
      if ((blockyPath[index - 1][0] !== blockyPath[index + 1][0]) && (blockyPath[index - 1][1] !== blockyPath[index + 1][1])) {
        path.push(blockyPath[index].map(function(coordinate) { return coordinate * pathway.metadata.cellLength; }));
      }
    } while (index < blockyPath.length - 2);

    if (path.length === 1) {
      if (Math.abs(blockyPath[0][0] - pointStart.x) < Math.abs(blockyPath[blockyPath.length - 1][1] - pointEnd.x)) {
        path[0][0] = pointStart.x;
        path[0][1] = pointEnd.y;
      }
      else {
        path[0][0] = pointEnd.x;
        path[0][1] = pointStart.y;
      }
    }
    else {
      if (Math.abs(blockyPath[0][0] - pointStart.x) < Math.abs(blockyPath[0][1] - pointStart.y)) {
        path[0][0] = pointStart.x;
      }
      else {
        path[0][1] = pointStart.y;
      }

      if (Math.abs(blockyPath[blockyPath.length - 1][0] - pointEnd.x) < Math.abs(blockyPath[blockyPath.length - 1][1] - pointEnd.y)) {
        path[path.length - 1][0] = pointEnd.x;
      }
      else {
        path[path.length - 1][1] = pointEnd.y;
      }
    }

    path.unshift([pointStart.x, pointStart.y]);
    path.push([pointEnd.x, pointEnd.y]);
    return path;
    /*
    var newWorkingGrid = pathway.metadata.grid.clone();
    var newPath = PF.Util.smoothenPath(newWorkingGrid, path);
    console.log('newPath');
    console.log(newPath);
    return newPath;
    //*/
  }

  //createGrid(pathway);
  //getPath(pathway.elements[620]);

  return {
    createGrid:createGrid,
    getPath:getPath
  };
}();
