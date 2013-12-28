// ************************
// define the PathVisioJsElement Class
// ************************
function PathVisioJsElement() {}

// set default values. "swing" refers to PathVisio-Java.
PathVisioJsElement.prototype.color = {};
PathVisioJsElement.prototype.color.swing = '000000';
PathVisioJsElement.prototype.color.gpml = null;

PathVisioJsElement.prototype.fillColor = {};
PathVisioJsElement.prototype.fillColor.swing = 'ffffff';
PathVisioJsElement.prototype.fillColor.gpml = null;

PathVisioJsElement.prototype.lineStyle = {};
PathVisioJsElement.prototype.lineStyle.swing = 'Solid';
PathVisioJsElement.prototype.lineStyle.gpml = null;

PathVisioJsElement.prototype.fontSize = {};
PathVisioJsElement.prototype.fontSize.swing = 10;
PathVisioJsElement.prototype.fontSize.gpml = 10;

PathVisioJsElement.prototype.fontWeight = {};
PathVisioJsElement.prototype.fontWeight.swing = null;
PathVisioJsElement.prototype.fontWeight.gpml = null;

PathVisioJsElement.prototype.fontName = {};
PathVisioJsElement.prototype.fontName.swing = 'Arial';
PathVisioJsElement.prototype.fontName.gpml = null;

// ************************
// define the PathVisioJsNode class
// ************************
function PathVisioJsNode() {
  PathVisioJsElement.call(this);
}

PathVisioJsNode.prototype = new PathVisioJsElement();
PathVisioJsNode.prototype.constructor = PathVisioJsNode;

PathVisioJsNode.prototype.shapeType = PathVisioJsNode.prototype.backgroundImage = {};
PathVisioJsNode.prototype.shapeType.swing = 'Rectangle';
PathVisioJsNode.prototype.shapeType.gpml = 'Rectangle';

PathVisioJsNode.prototype.valign = PathVisioJsNode.prototype.verticalAlign = {};
PathVisioJsNode.prototype.valign.swing = 'Middle';
PathVisioJsNode.prototype.valign.gpml = 'Middle';

PathVisioJsNode.prototype.align = PathVisioJsNode.prototype.textAlign = {};
PathVisioJsNode.prototype.align.swing = 'Center';
PathVisioJsNode.prototype.align.gpml = null;

PathVisioJsNode.prototype.padding = {};
PathVisioJsNode.prototype.padding.swing = '0.5em';
PathVisioJsNode.prototype.padding.gpml = null;

PathVisioJsNode.prototype.lineThickness = PathVisioJsNode.prototype.borderWidth = {};
PathVisioJsNode.prototype.lineThickness.swing = 1;
PathVisioJsNode.prototype.lineThickness.gpml = null;

PathVisioJsNode.prototype.lineStyle = PathVisioJsNode.prototype.borderStyle;

// ************************
// define the EntityNode class
// ************************
function EntityNode() {
  PathVisioJsNode.call(this);
}

EntityNode.prototype = new PathVisioJsNode();
EntityNode.prototype.constructor = EntityNode;

// ************************
// define the DataNode class
// ************************
function DataNode() {
  EntityNode.call(this);
}

DataNode.prototype = new EntityNode();
DataNode.prototype.constructor = DataNode;

// ************************
// define the GeneProduct class
// ************************
function GeneProduct() {
  DataNode.call(this);
}

GeneProduct.prototype = new DataNode();
GeneProduct.prototype.constructor = GeneProduct;

// ************************
// define the Metabolite class
// ************************
function Metabolite() {
  DataNode.call(this);
}

Metabolite.prototype = new DataNode();
Metabolite.prototype.constructor = Metabolite;

Metabolite.prototype.color = {};
Metabolite.prototype.color.swing = '0000ff';
Metabolite.prototype.color.gpml = '0000ff';

// ************************
// define the Protein class
// ************************
function Protein() {
  DataNode.call(this);
}

Protein.prototype = new DataNode();
Protein.prototype.constructor = Protein;

// ************************
// define the Rna class
// ************************
function Rna() {
  DataNode.call(this);
}

Rna.prototype = new DataNode();
Rna.prototype.constructor = Rna;

// ************************
// define the Pathway class
// ************************
function DataNodePathway() {
  DataNode.call(this);
}

DataNodePathway.prototype = new DataNode();
DataNodePathway.prototype.constructor = DataNodePathway;

DataNodePathway.prototype.color = {};
DataNodePathway.prototype.color.swing = '14961e';
DataNodePathway.prototype.color.gpml = '14961e';

DataNodePathway.prototype.fontSize = {};
DataNodePathway.prototype.fontSize.swing = 12;
DataNodePathway.prototype.fontSize.gpml = 12;

DataNodePathway.prototype.fontWeight = {};
DataNodePathway.prototype.fontWeight.swing = 'Bold';
DataNodePathway.prototype.fontWeight.gpml = 'Bold';

// ************************
// define the Unknown class
// ************************
function Unknown() {
  DataNode.call(this);
}

Unknown.prototype = new DataNode();
Unknown.prototype.constructor = Unknown;

// ************************
// define the GroupNode class
// ************************
function GroupNode() {
  PathVisioJsNode.call(this);
}

GroupNode.prototype = new PathVisioJsNode();
GroupNode.prototype.constructor = GroupNode;

GroupNode.prototype.fontSize = {};
GroupNode.prototype.fontSize.swing = 32;
GroupNode.prototype.fontSize.gpml = null;

GroupNode.prototype.fontName = GroupNode.prototype.fontFamily = {};
GroupNode.prototype.fontName.swing = 'Times New Roman';
GroupNode.prototype.fontName.gpml = null;

GroupNode.prototype.padding = {};
GroupNode.prototype.padding.swing = 8;
GroupNode.prototype.padding.gpml = null;

GroupNode.prototype.lineThickness = GroupNode.prototype.borderWidth = {};
GroupNode.prototype.lineThickness.swing = 0.4;
GroupNode.prototype.lineThickness.gpml = undefined;

// ************************
// define the Complex class
// ************************
function Complex() {
  GroupNode.call(this);
}

Complex.prototype = new GroupNode();
Complex.prototype.constructor = Complex;

Complex.prototype.Style = Complex.prototype.backgroundImage = {};
Complex.prototype.Style.swing = 'Complex.prototype';
Complex.prototype.Style.gpml = 'Complex.prototype';

Complex.prototype.fillColor = Complex.prototype.backgroundColor = {};
Complex.prototype.fillColor.swing = 'B4B464';
Complex.prototype.fillColor.gpml = undefined;

Complex.prototype.padding = {};
Complex.prototype.padding.swing = 11;
Complex.prototype.padding.gpml = null;

// ************************
// define the Group class (note this is referring to
// the GroupStyle named "Group". Groups in general
// are GroupNodes.)
// ************************
function Group() {
  GroupNode.call(this);
}

Group.prototype = new GroupNode();
Group.prototype.constructor = Group;

Group.prototype.fillOpacity = {};
Group.prototype.fillOpacity.swing = 0;
Group.prototype.fillOpacity.gpml = undefined;

Group.prototype.lineThickness = Group.prototype.borderWidth = {};
Group.prototype.lineThickness.swing = 0;
Group.prototype.lineThickness.gpml = undefined;

Group.prototype.fillColor = Group.prototype.backgroundColor = {};
Group.prototype.fillColor.swing = 'lightgreen';
Group.prototype.fillColor.gpml = null;

// ************************
// define the Pathway class (note this is referring to
// Groups of Style Pathway. Be aware that DataNodes of
// Type Pathway exist.)
// ************************
function GroupNodePathway() {
  GroupNode.call(this);
}

GroupNodePathway.prototype = new GroupNode();
GroupNodePathway.prototype.constructor = GroupNodePathway;

GroupNodePathway.prototype.fillColor = GroupNodePathway.prototype.backgroundColor = {};
GroupNodePathway.prototype.fillColor.swing = 'lightgreen';
GroupNodePathway.prototype.fillColor.gpml = null;

// ************************
// define the PathVisioJsEdge class
// ************************
function PathVisioJsEdge() {
  PathVisioJsElement.call(this);
}

PathVisioJsEdge.prototype = new PathVisioJsElement();
PathVisioJsEdge.prototype.constructor = PathVisioJsEdge;

PathVisioJsEdge.prototype.color = PathVisioJsEdge.prototype.stroke = {};
PathVisioJsEdge.prototype.color.swing = '000000';
PathVisioJsEdge.prototype.color.gpml = null;

PathVisioJsEdge.prototype.lineThickness = PathVisioJsEdge.prototype.strokeWidth = {};
PathVisioJsEdge.prototype.lineThickness.swing = '000000';
PathVisioJsEdge.prototype.lineThickness.gpml = null;

// this is only approximately correct, because "double" is
// not a valid value for stroke-dasharray.
PathVisioJsEdge.prototype.lineStyle = PathVisioJsEdge.prototype.strokeDasharray;

// TODO fill in any missing attributes for the elements defined above
// and also add all the elements not yet defined, such as Shape, Label,
// Interaction, GraphicalLine...
//
// The inheritance currently does not allow me to get a default color
// for a GeneProduct.
