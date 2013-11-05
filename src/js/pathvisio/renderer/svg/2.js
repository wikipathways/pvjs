var myData = [
  {'pathway':{'elements':[
    {id:'node-a', label:'123', renderableType:'node', x:0, y:0, width:10, height:10, fill:'green'},
    {id:'node-b', label:'456', renderableType:'node', x:100, y:50, width:10, height:10, fill:'red'},
    {id:'edge-c', label:'79', renderableType:'edge', points: [
      {x:10, y:0, anchorId:'anchor-a'},
      {x:50, y:20, anchorId:'anchor-b'}
    ]},
    {id:'anchor-a', renderableType:'anchor', parentId:'node-a', side:'right', position:0.5, x:10, y:5},
    {id:'anchor-b', renderableType:'anchor', parentId:'node-b', side:'top', position:0.5, x:105, y:50}
  ]}}
];

var drag = d3.behavior.drag()
    .origin(Object)
    .on("drag", dragmove);

function dragmove(d) {
  console.log(d3.event.x);
  console.log(d);
  console.log(this);
  var changingAnchor = myData[0].pathway.elements.filter(function(element) {return element.parentId === d.id})[0];
  console.log(changingAnchor);
  d3.select(this).attr('transform', function(d) {return 'translate(' + d3.event.x + ' ' + d3.event.y + ')';});
  changingAnchor.x = d3.select(this).select('.anchor')[0][0].getCTM().e;
  changingAnchor.y = d3.select(this).select('.anchor')[0][0].getCTM().f;
  d.x = d3.event.x;
  d.y = d3.event.y;
  draw();
}

function draw(){
// Update…
var svg = d3.select('svg.test')
.data(myData)
.attr('class', 'test');  

// Enter…
svg.enter().append("svg")
.attr('class', 'test');  

// Exit…
svg.exit().remove();

// Nodes
// Update… 
var nodes = svg.selectAll("g.node")
.data(function(d) { return d.pathway.elements.filter(function(element) {return element.renderableType === 'node'})})
.attr('transform', function(d) {return 'translate(' + d.x + ' ' + d.y + ')';})
.attr('class', 'node')
.call(drag);

// Enter…
nodes.enter().append("g")
.attr('class', 'node')
.attr('transform', function(d) {return 'translate(' + d.x + ' ' + d.y + ')';})
.call(drag);

// Exit…
nodes.exit().remove();

// Shapes
var shape = nodes.append("rect")
.attr('class', 'node')
.attr('style', function(d) {return 'fill:' + d.fill;})
.attr('x', 0)
.attr('y', 0)
.attr('width', function(d) {return d.width;})
.attr('height', function(d) {return d.height;});

// Anchors
// Update… 
var anchors = nodes.selectAll(".anchor")
.data(function(d) { return myData[0].pathway.elements.filter(function(element) { return element.renderableType === 'anchor'; })})
.attr('class', 'anchor')
.attr('r', 2)
.attr('transform', function(d) { return 'translate(10 10)'; });

// Enter…
anchors.enter().append("circle")
.attr('class', 'anchor')
.attr('r', 2)
.attr('transform', function(d) { return 'translate(10 10)'; });

// Exit…
anchors.exit().remove();

// Update… 
var edges = svg.selectAll("path.edge")
.data(function(d) { return d.pathway.elements.filter(function(element) {return element.renderableType === 'edge'}); })
.attr('d', function(d) {return getPathData(d.points); });

// Enter…
edges.enter().append("path")
.attr('class', 'edge')
.attr('d', function(d) {return getPathData(d.points); });

// Exit…
edges.exit().remove();
}

function getPathData(points) {
  var pathData, anchor1, anchor2;
  if (!!points[0].anchorId) {
    anchor1 = myData[0].pathway.elements.filter(function(element) {return element.id === points[0].anchorId})[0];
    points[0].x = anchor1.x;
    points[0].y = anchor1.y;
    anchor2 = myData[0].pathway.elements.filter(function(element) {return element.id === points[1].anchorId})[0];
    points[1].x = anchor2.x;
    points[1].y = anchor2.y;
    pathData = 'M ' + points[0].x + ' ' + points[0].y;
    pathData += 'L ' + points[1].x + ' ' + points[1].y;
  }
  else {
    pathData = 'M ' + points[0].x + ' ' + points[0].y;
    pathData += 'L ' + points[1].x + ' ' + points[1].y;
  }
  return pathData;
}

draw();
