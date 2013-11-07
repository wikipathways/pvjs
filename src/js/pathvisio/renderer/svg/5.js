var svg = d3.select('svg');
var symbols = svg.selectAll('symbol');
var symbolDouble, symbolElements, symbolElementDouble;
symbols.each(function(d, i) {
  symbolDouble = pathvisio.helpers.cloneNode(this);
  symbolDouble[0][0].setAttribute('id', this.getAttribute('id') + '-double' );
  symbolElements = d3.select(symbolDouble[0][0]).selectAll('*');
  console.log('symbolElements');
  console.log(symbolElements);
  symbolElementsContainerOriginal = symbolDouble.append('g').attr('id', 'container-original');
  symbolElementsContainerOriginal.push(symbolElements);
  symbolElementsContainerDouble = pathvisio.helpers.cloneNode(symbolElementsContainerOriginal[0][0]);
  symbolElementsContainerDouble[0][0].setAttribute('id', 'container-double' );
});
/*
          symbolDouble[0][0].setAttribute('style', 'stroke:white; stroke-width:2; fill:none;');
doubleOverlay[0][0].setAttribute('x', 'scale(0.95)');
});
var doubleOriginals = d3.select('svg').selectAll('.double-original');

// imagine a forEach or something here

var doubleOriginal = doubleOriginals[0][0];

          var doubleOverlay = pathvisio.helpers.cloneNode(doubleOriginal);

          // define style of marker element

          doubleOverlay[0][0].setAttribute('id', '#shape-e3c5e-double-overlay' );
          doubleOverlay[0][0].setAttribute('style', 'stroke:white; stroke-width:2; fill:none;');
doubleOverlay[0][0].setAttribute('style', 'stroke:white; stroke-width:4; fill:none;')
doubleOverlay[0][0].setAttribute('x', 'scale(0.95)');
//*/
/*
var doubleOverlay = doubleOriginals.append('use')
.attr('id', '#shape-e3c5e-double-overlay')
.attr('xlink:xlink:href', '#rectangle')
.attr('class', 'double-overlay')
.attr('style', 'stroke:white; stroke-width:2; fill:none;')
.attr('x', 1)
.attr('y', 1)
.attr('width', 78)
.attr('height', 18);
//*/ 




///******

function createDoubleContainer(doubleSymbol) {
  var doubleContainer = svg.append('g').attr('id', 'double-container');
  var doubleSymbolChildren = doubleSymbol[0][0].children;
  console.log(doubleSymbolChildren);
        var i = -1;
        do {
          i += 1;

          console.log(doubleSymbolChildren[0]);
          doubleContainer[0][0].appendChild(doubleSymbolChildren[0]);
        } while (doubleSymbolChildren.length > 0);
  doubleContainer.attr('transform', 'translate(' + offset + ', ' + offset + ') scale(' + ((width-2 * offset)/width) + ', ' + ((height-2 * offset)/height) + ')');
  //id = this.getAttribute('id');
  
  doubleSymbol[0][0].appendChild(doubleContainer[0][0]);
  //return doubleContainer;
  
}


var svg = d3.select('svg');
var rectangle = svg.select('symbol#rectangle');
var viewBoxDimensions = rectangle.attr('viewBox').split(' ');
var width = parseFloat(viewBoxDimensions[2]);
var height = parseFloat(viewBoxDimensions[3]);
var offset = 10;


var svg = d3.select('svg');
var symbols = svg.selectAll('symbol');
var symbolDouble, symbolElements, symbolElementDouble;
symbols.each(function(d, i) {
  symbolDouble = pathvisio.helpers.cloneNode(this);
  symbolDouble[0][0].setAttribute('id', this.getAttribute('id') + '-double' );
  



  symbolElements = d3.select(symbolDouble[0][0]).selectAll('*');
  console.log('symbolElements');
  console.log(symbolElements);
  symbolElementsContainerOriginal = symbolDouble.append('g').attr('id', 'container-original');
  symbolElementsContainerOriginal.push(symbolElements);
  symbolElementsContainerDouble = pathvisio.helpers.cloneNode(symbolElementsContainerOriginal[0][0]);
  symbolElementsContainerDouble[0][0].setAttribute('id', 'container-double' );
});


//******/

function moveElementsIntoContainer(parent) {
  var container = svg.append('g').attr('id', 'container');
  var children = parent[0][0].children;
  console.log(children);
        var i = -1;
        do {
          i += 1;

          console.log(children[0]);
          container[0][0].appendChild(children[0]);
        } while (children.length > 0);
  container.attr('transform', 'translate(' + offset + ', ' + offset + ') scale(' + ((width-2 * offset)/width) + ', ' + ((height-2 * offset)/height) + ')');
  //id = this.getAttribute('id');
  
  parent[0][0].appendChild(container[0][0]);
  //return container;
  
}


var svg = d3.select('svg');
var rectangle = svg.select('symbol#rectangle');
var viewBoxDimensions = rectangle.attr('viewBox').split(' ');
var width = parseFloat(viewBoxDimensions[2]);
var height = parseFloat(viewBoxDimensions[3]);
var offset = 10;


var svg = d3.select('svg');
var symbols = svg.selectAll('symbol');
var symbolDouble, symbolElements, symbolElementDouble;
symbols.each(function(d, i) {
  symbolDouble = pathvisio.helpers.cloneNode(this);
  symbolDouble[0][0].setAttribute('id', this.getAttribute('id') + '-double' );

  //moveElementsIntoContainer(symbolDouble);
});


//****

function moveElementsIntoContainer(parent) {
  console.log('parent[0][0]');
  console.log(parent[0][0]);
  var viewBoxDimensions = parent.attr('viewBox').split(' ');
  var width = parseFloat(viewBoxDimensions[2]);
  var height = parseFloat(viewBoxDimensions[3]);
  var offset = 10;
  var container = svg.append('g').attr('id', 'container');
  var children = parent[0][0].children;
  console.log('children');
  console.log(children);
        var i = -1;
        do {
          i += 1;

          console.log('children[0]');
          console.log(children[0]);
          container[0][0].appendChild(children[0]);
        } while (children.length > 0);
  container.attr('transform', 'translate(' + offset + ', ' + offset + ') scale(' + ((width-2 * offset)/width) + ', ' + ((height-2 * offset)/height) + ')');
  //id = this.getAttribute('id');
  
  //parent[0][0].appendChild(container[0][0]);
  //return container;
  
}

var svg = d3.select('svg');
var symbols = svg.selectAll('symbol:not(#none)');
var symbolDouble, symbolElements, symbolElementDouble;
symbols.each(function(d, i) {
  symbolDouble = pathvisio.helpers.cloneNode(this);
  symbolDouble[0][0].setAttribute('id', this.getAttribute('id') + '-double' );

  moveElementsIntoContainer(symbolDouble);
});


//***

function moveElementsIntoContainer(parent) {
  console.log('parent[0][0]');
  console.log(parent[0][0]);
  var viewBoxDimensions = parent.attr('viewBox').split(' ');
  var width = parseFloat(viewBoxDimensions[2]);
  var height = parseFloat(viewBoxDimensions[3]);
  var offset = 10;
  var container = svg.append('g').attr('id', 'container');
  var children = parent[0][0].children;
  console.log('children');
  console.log(children);
        var i = -1;
        do {
          i += 1;

          console.log('children[0]');
          console.log(children[0]);
          container[0][0].appendChild(children[0]);
        } while (children.length > 0);
  
  //id = this.getAttribute('id');
  
  //parent[0][0].appendChild(container[0][0]);
  return container;
  
}

var svg = d3.select('svg');
var symbols = svg.selectAll('symbol:not(#none)');
var doubleSymbol, symbolElements, symbolElementDouble;
symbols.each(function(d, i) {
  doubleSymbol = pathvisio.helpers.cloneNode(this);
  doubleSymbol[0][0].setAttribute('id', this.getAttribute('id') + '-double' );
  var container = moveElementsIntoContainer(doubleSymbol);
  doubleSymbol[0][0].appendChild(container[0][0]);
  var doubleContainer = pathvisio.helpers.cloneNode(container);
  doubleContainer[0][0].setAttribute('id', 'container-double' );
  doubleContainer.attr('transform', 'translate(' + offset + ', ' + offset + ') scale(' + ((width-2 * offset)/width) + ', ' + ((height-2 * offset)/height) + ')');
});
d3.select('#rectangle-double')[0][0];

//*******

function moveElementsIntoContainer(parent) {
  console.log('parent[0][0]');
  console.log(parent[0][0]);

  var container = svg.append('g').attr('id', 'container');
  var children = parent[0][0].children;
  console.log('children');
  console.log(children);
        var i = -1;
        do {
          i += 1;

          console.log('children[0]');
          console.log(children[0]);
          container[0][0].appendChild(children[0]);
        } while (children.length > 0);
  
  //id = this.getAttribute('id');
  
  //parent[0][0].appendChild(container[0][0]);
  return container;
  
}

var svg = d3.select('svg');
var symbols = svg.selectAll('symbol:not(#none)');
var doubleSymbol, symbolElements, symbolElementDouble;
symbols.each(function(d, i) {
  doubleSymbol = pathvisio.helpers.cloneNode(this);
  doubleSymbol[0][0].setAttribute('id', this.getAttribute('id') + '-double' );

  var viewBoxDimensions = doubleSymbol.attr('viewBox').split(' ');
  var width = parseFloat(viewBoxDimensions[2]);
  var height = parseFloat(viewBoxDimensions[3]);
  var offset = 10;

  var container = moveElementsIntoContainer(doubleSymbol);
  doubleSymbol[0][0].appendChild(container[0][0]);
  var doubleContainer = pathvisio.helpers.cloneNode(container[0][0]);
  doubleContainer[0][0].setAttribute('id', 'container-double' );
  doubleContainer[0][0].setAttribute('transform', 'translate(' + offset + ', ' + offset + ') scale(' + ((width-2 * offset)/width) + ', ' + ((height-2 * offset)/height) + ')');
});
d3.select('#rectangle-double')[0][0];


//***********

function moveElementsIntoContainer(parent) {
  console.log('parent[0][0]');
  console.log(parent[0][0]);

  var container = svg.append('g').attr('id', 'container');
  var children = parent[0][0].children;
  console.log('children');
  console.log(children);
        var i = -1;
        do {
          i += 1;

          console.log('children[0]');
          console.log(children[0]);
          container[0][0].appendChild(children[0]);
        } while (children.length > 0);
  
  //id = this.getAttribute('id');
  
  //parent[0][0].appendChild(container[0][0]);
  return container;
  
}

var svg = d3.select('svg');
var symbols = svg.selectAll('symbol:not(#none)');
var doubleSymbol, symbolElements, symbolElementDouble;
symbols.each(function(d, i) {
  doubleSymbol = pathvisio.helpers.cloneNode(this);
  doubleSymbol[0][0].setAttribute('id', this.getAttribute('id') + '-double' );

  var viewBoxDimensions = doubleSymbol.attr('viewBox').split(' ');
  var width = parseFloat(viewBoxDimensions[2]);
  var height = parseFloat(viewBoxDimensions[3]);
  var offset = 10;

  var container = moveElementsIntoContainer(doubleSymbol);
  doubleSymbol[0][0].appendChild(container[0][0]);
  var doubleContainer = pathvisio.helpers.cloneNode(container[0][0]);
  doubleContainer[0][0].setAttribute('id', 'container-double' );
  doubleContainer[0][0].setAttribute('transform', 'translate(' + offset + ', ' + offset + ') scale(' + ((width-2 * offset)/width) + ', ' + ((height-2 * offset)/height) + ')');
});
d3.select('#rectangle-double')[0][0];
d3.select('use#shape-e3c5e').attr('xlink:xlink:href', '#rectangle-double');


 
 
