var rectangle = d3.select('svg').select('symbol#rectangle');
var doubleContainer = rectangle.append('g').attr('id', 'double-container');
var doubleClipPath = doubleContainer.append('clipPath').attr('id', 'double-clip-path');
var doubleClipPathRectangle = doubleClipPath.append('rect').attr('id', 'rectangle-double-clip-path').attr('x', 10).attr('y', 10).attr('width', 80).attr('height', 30).attr('vector-effect', 'non-scaling-stroke');
var doubleRectangle = rectangle.append('rect').attr('id', 'rectangle-double').attr('x', 10).attr('y', 10).attr('width', 80).attr('height', 30).attr('vector-effect', 'non-scaling-stroke').attr('clip-path', 'url(#double-clip-path)');

var scaleFactor = 0.7;
var rectangle = d3.select('svg').select('symbol#rectangle');
var doubleContainer = rectangle.append('g').attr('id', 'double-container');
var doubleClipPath = doubleContainer.append('clipPath').attr('id', 'double-clip-path');
var doubleClipPathRectangle = doubleClipPath.append('rect').attr('id', 'rectangle-double-clip-path').attr('x', 0).attr('y', 0).attr('width', 100).attr('height', 50).attr('vector-effect', 'non-scaling-stroke');
var doubleRectangle = doubleContainer.append('rect').attr('id', 'rectangle-double').attr('x', 0).attr('y', 0).attr('width', 100).attr('height', 50).attr('vector-effect', 'non-scaling-stroke').attr('clip-path', 'url(#double-clip-path)');
doubleContainer.attr('transform', 'translate(' + (1-scaleFactor)*100/2 + ', ' + (1-scaleFactor)*50/2 + ') scale(' + scaleFactor + ')')

var scaleFactor = 0.7;
var rectangle = d3.select('svg').select('symbol#rectangle');
var doubleContainer = rectangle.append('g').attr('id', 'double-container');
var doubleClipPath = doubleContainer.append('clipPath').attr('id', 'double-clip-path');
var doubleClipPathRectangle = doubleClipPath.append('rect').attr('id', 'rectangle-double-clip-path').attr('x', 0).attr('y', 0).attr('width', 100).attr('height', 50).attr('vector-effect', 'non-scaling-stroke');
var doubleRectangle = doubleContainer.append('rect').attr('id', 'rectangle-double').attr('x', 0).attr('y', 0).attr('width', 100).attr('height', 50).attr('vector-effect', 'non-scaling-stroke').attr('clip-path', 'url(#double-clip-path)');
doubleContainer.attr('transform', 'translate(' + (1-scaleFactor)*100/2 + ', ' + (1-scaleFactor)*50/2 + ') scale(' + scaleFactor + ')')

var scaleFactor = 0.7;
var rectangle = d3.select('svg').select('symbol#rectangle');
var doubleContainer = rectangle.append('g').attr('id', 'double-container');
var doubleClipPath = doubleContainer.append('clipPath').attr('id', 'double-clip-path');
var doubleClipPathRectangle = doubleClipPath.append('rect').attr('id', 'rectangle-double-clip-path').attr('x', 0).attr('y', 0).attr('width', 100).attr('height', 50).attr('vector-effect', 'non-scaling-stroke');
var doubleRectangle = doubleContainer.append('rect').attr('id', 'rectangle-double').attr('x', 0).attr('y', 0).attr('width', 100).attr('height', 50).attr('vector-effect', 'non-scaling-stroke').attr('clip-path', 'url(#double-clip-path)');
doubleContainer.attr('transform', 'translate(' + (1-scaleFactor)*100/2 + ', ' + (1-scaleFactor)*100/2 + ') scale(' + scaleFactor + ', ' + scaleFactor/2 + ')')

var width = 100;
var height = 50;
var offset = 10;
var rectangle = d3.select('svg').select('symbol#rectangle');
var doubleContainer = rectangle.append('g').attr('id', 'double-container');
var doubleClipPath = doubleContainer.append('clipPath').attr('id', 'double-clip-path');
var doubleClipPathRectangle = doubleClipPath.append('rect').attr('id', 'rectangle-double-clip-path').attr('x', 0).attr('y', 0).attr('width', width).attr('height', height).attr('vector-effect', 'non-scaling-stroke');
var doubleRectangle = doubleContainer.append('rect').attr('id', 'rectangle-double').attr('x', 0).attr('y', 0).attr('width', width).attr('height', height).attr('vector-effect', 'non-scaling-stroke').attr('clip-path', 'url(#double-clip-path)');
doubleContainer.attr('transform', 'translate(' + offset + ', ' + offset + ') scale(' + ((width-2 * offset)/width) + ', ' + ((height-2 * offset)/height) + ')')

var rectangle = d3.select('svg').select('symbol#rectangle');
var viewBoxDimensions = rectangle.attr('viewBox').split(' ');
var width = parseFloat(viewBoxDimensions[2]);
var height = parseFloat(viewBoxDimensions[3]);
var offset = 10;
var doubleContainer = rectangle.append('g').attr('id', 'double-container');
var doubleClipPath = doubleContainer.append('clipPath').attr('id', 'double-clip-path');
var doubleClipPathRectangle = doubleClipPath.append('rect').attr('id', 'rectangle-double-clip-path').attr('x', 0).attr('y', 0).attr('width', width).attr('height', height).attr('vector-effect', 'non-scaling-stroke');
var doubleRectangle = doubleContainer.append('rect').attr('id', 'rectangle-double').attr('x', 0).attr('y', 0).attr('width', width).attr('height', height).attr('vector-effect', 'non-scaling-stroke').attr('clip-path', 'url(#double-clip-path)');
doubleContainer.attr('transform', 'translate(' + offset + ', ' + offset + ') scale(' + ((width-2 * offset)/width) + ', ' + ((height-2 * offset)/height) + ')')

var svg = d3.select('svg');
var rectangle = svg.select('symbol#rectangle');
var viewBoxDimensions = rectangle.attr('viewBox').split(' ');
var width = parseFloat(viewBoxDimensions[2]);
var height = parseFloat(viewBoxDimensions[3]);
var offset = 10;
var doubleContainer = svg.append('g').attr('id', 'double-container');
var rectangleChildren = rectangle[0][0].children;
console.log(rectangleChildren);
        var i = -1;
        do {
          i += 1;

          console.log(rectangleChildren[0]);
          doubleContainer[0][0].appendChild(rectangleChildren[0]);
        } while (rectangleChildren.length > 0);

//id = this.getAttribute('id');
rectangle[0][0].appendChild(doubleContainer[0][0]);

doubleContainer.attr('transform', 'translate(' + offset + ', ' + offset + ') scale(' + ((width-2 * offset)/width) + ', ' + ((height-2 * offset)/height) + ')')
