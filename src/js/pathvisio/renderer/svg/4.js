var myData = [
  {'pathway':{'elements':[
    {id:'node-a', label:'123', renderableType:'node', x:0, y:0, width:10, height:10, fill:'green'},
    {id:'node-b', label:'456', renderableType:'node', x:50, y:20, width:10, height:10, fill:'red'},
    {id:'edge-c', label:'79', renderableType:'edge', points: [
      {x:10, y:0, anchorId:'anchornodeabottom05'},
      {x:20, y:20, anchorId:'anchornodebleft075'}
    ]},
    {id:'anchornodeatop025', renderableType:'anchor', parentId:'node-a', side:'top', position:0.25, x:2.5, y:0},
    {id:'anchornodeatop05', renderableType:'anchor', parentId:'node-a', side:'top', position:0.5, x:5, y:0},
    {id:'anchornodeatop075', renderableType:'anchor', parentId:'node-a', side:'top', position:0.75, x:7.5, y:0},
    {id:'anchornodearight025', renderableType:'anchor', parentId:'node-a', side:'right', position:0.25, x:10, y:2.5},
    {id:'anchornodearight05', renderableType:'anchor', parentId:'node-a', side:'right', position:0.5, x:10, y:5},
    {id:'anchornodearight075', renderableType:'anchor', parentId:'node-a', side:'right', position:0.75, x:10, y:7.5},
    {id:'anchornodeabottom025', renderableType:'anchor', parentId:'node-a', side:'bottom', position:0.25, x:2.5, y:10},
    {id:'anchornodeabottom05', renderableType:'anchor', parentId:'node-a', side:'bottom', position:0.5, x:5, y:10},
    {id:'anchornodeabottom075', renderableType:'anchor', parentId:'node-a', side:'bottom', position:0.75, x:7.5, y:10},
    {id:'anchornodealeft025', renderableType:'anchor', parentId:'node-a', side:'left', position:0.25, x:0, y:2.5},
    {id:'anchornodealeft05', renderableType:'anchor', parentId:'node-a', side:'left', position:0.5, x:0, y:5},
    {id:'anchornodealeft075', renderableType:'anchor', parentId:'node-a', side:'left', position:0.75, x:0, y:7.5},
    {id:'anchornodebtop025', renderableType:'anchor', parentId:'node-b', side:'top', position:0.25, x:52.5, y:20},
    {id:'anchornodebtop05', renderableType:'anchor', parentId:'node-b', side:'top', position:0.5, x:55, y:20},
    {id:'anchornodebtop075', renderableType:'anchor', parentId:'node-b', side:'top', position:0.75, x:57.5, y:20},
    {id:'anchornodebright025', renderableType:'anchor', parentId:'node-b', side:'right', position:0.25, x:60, y:22.5},
    {id:'anchornodebright05', renderableType:'anchor', parentId:'node-b', side:'right', position:0.5, x:60, y:25},
    {id:'anchornodebright075', renderableType:'anchor', parentId:'node-b', side:'right', position:0.75, x:60, y:27.5},
    {id:'anchornodebbottom025', renderableType:'anchor', parentId:'node-b', side:'bottom', position:0.25, x:52.5, y:30},
    {id:'anchornodebbottom05', renderableType:'anchor', parentId:'node-b', side:'bottom', position:0.5, x:55, y:30},
    {id:'anchornodebbottom075', renderableType:'anchor', parentId:'node-b', side:'bottom', position:0.75, x:57.5, y:30},
    {id:'anchornodebleft025', renderableType:'anchor', parentId:'node-b', side:'left', position:0.25, x:50, y:22.5},
    {id:'anchornodebleft05', renderableType:'anchor', parentId:'node-b', side:'left', position:0.5, x:50, y:25},
    {id:'anchornodebleft075', renderableType:'anchor', parentId:'node-b', side:'left', position:0.75, x:50, y:27.5}
  ]}}
];

function strToHtmlId(str) {
  var re = /\W/gi;
  var id = str.replace(re, "");
  return id;
}

var drag = d3.behavior.drag()
    .origin(Object)
    .on("drag", dragmove);

function dragmove(d) {
  console.log(d3.event.x);
  console.log('d');
  console.log(d);
  console.log('this');
  console.log(this);
  var changingAnchors = myData[0].pathway.elements.filter(function(element) {return element.parentId === d.id});
  var d3Node = self.d3Node = d3.select(this);
  console.log('changingAnchors');
  console.log(changingAnchors);
  d3Node.attr('transform', function(d) {return 'translate(' + d3.event.x + ' ' + d3.event.y + ')';});
  changingAnchors.forEach(function(anchor){
    console.log('anchor');
    console.log(anchor);
    self.anchor = anchor;
    anchor.x = d3Node.select('#' + anchor.id)[0][0].getCTM().e;
    anchor.y = d3Node.select('#' + anchor.id)[0][0].getCTM().f; 
  });
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
.attr('id', function(d) {
  var str = strToHtmlId('anchor' + d.parentId + d.side + d.position);
  return str; 
})
.attr('class', 'anchor')
.attr('r', 2)
.attr('transform', function(d) {
  return 'translate(10 10)'; 
});

// Enter…
anchors.enter().append("circle")
.attr('id', function(d) {
  var str = strToHtmlId('anchor' + d.parentId + d.side + d.position);
  return str; 
})
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
    console.log('anchor1');
    console.log(anchor1);
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
