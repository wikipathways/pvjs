// ************************
// define the PathVisioJsElement Class
// ************************
function PathVisioJsElement() {}

// set default values. "swing" refers to PathVisio-Java.
PathVisioJsElement.color = {};
PathVisioJsElement.color.swing = '000000';
PathVisioJsElement.color.gpml = null;

PathVisioJsElement.fillColor = {};
PathVisioJsElement.fillColor.swing = 'ffffff';
PathVisioJsElement.fillColor.gpml = null;

PathVisioJsElement.lineStyle = {};
PathVisioJsElement.lineStyle.swing = 'Solid';
PathVisioJsElement.lineStyle.gpml = null;

PathVisioJsElement.fontSize = {};
PathVisioJsElement.fontSize.swing = 10;
PathVisioJsElement.fontSize.gpml = 10;

PathVisioJsElement.fontWeight = {};
PathVisioJsElement.fontWeight.swing = null;
PathVisioJsElement.fontWeight.gpml = null;

PathVisioJsElement.fontName = {};
PathVisioJsElement.fontName.swing = 'Arial';
PathVisioJsElement.fontName.gpml = null;

// ************************
// define the PathVisioJsNode class
// ************************
function PathVisioJsNode() {
  PathVisioJsElement.call(this);
}

PathVisioJsNode.prototype = new PathVisioJsElement();
PathVisioJsNode.prototype.constructor = PathVisioJsNode;

PathVisioJsNode.shapeType = PathVisioJsNode.backgroundImage = {};
PathVisioJsNode.shapeType.swing = 'Rectangle';
PathVisioJsNode.shapeType.gpml = 'Rectangle';

PathVisioJsNode.valign = PathVisioJsNode.verticalAlign = {};
PathVisioJsNode.valign.swing = 'Middle';
PathVisioJsNode.valign.gpml = 'Middle';

PathVisioJsNode.align = PathVisioJsNode.textAlign = {};
PathVisioJsNode.align.swing = 'Center';
PathVisioJsNode.align.gpml = null;

PathVisioJsNode.padding = {};
PathVisioJsNode.padding.swing = '0.5em';
PathVisioJsNode.padding.gpml = null;

PathVisioJsNode.lineThickness = PathVisioJsNode.borderWidth = {};
PathVisioJsNode.lineThickness.swing = 1;
PathVisioJsNode.lineThickness.gpml = null;

PathVisioJsNode.lineStyle = PathVisioJsNode.borderStyle;

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

Metabolite.color = {};
Metabolite.color.swing = '0000ff';
Metabolite.color.gpml = '0000ff';

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
function Pathway() {
  DataNode.call(this);
}

Pathway.prototype = new DataNode();
Pathway.prototype.constructor = Pathway;

Pathway.color = {};
Pathway.color.swing = '14961e';
Pathway.color.gpml = '14961e';

Pathway.fontSize = {};
Pathway.fontSize.swing = 12;
Pathway.fontSize.gpml = 12;

Pathway.fontWeight = {};
Pathway.fontWeight.swing = 'Bold';
Pathway.fontWeight.gpml = 'Bold';

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

GroupNode.fontSize = {};
GroupNode.fontSize.swing = 32;
GroupNode.fontSize.gpml = null;

GroupNode.fontName = GroupNode.fontFamily = {};
GroupNode.fontName.swing = 'Times New Roman';
GroupNode.fontName.gpml = null;

GroupNode.padding = {};
GroupNode.padding.swing = 8;
GroupNode.padding.gpml = null;

GroupNode.lineThickness = GroupNode.borderWidth = {};
GroupNode.lineThickness.swing = 0.4;
GroupNode.lineThickness.gpml = undefined;

// ************************
// define the Complex class
// ************************
function Complex() {
  GroupNode.call(this);
}

Complex.prototype = new GroupNode();
Complex.prototype.constructor = Complex;

Complex.Style = Complex.backgroundImage = {};
Complex.Style.swing = 'Complex';
Complex.Style.gpml = 'Complex';

Complex.fillColor = Complex.backgroundColor = {};
Complex.fillColor.swing = 'B4B464';
Complex.fillColor.gpml = undefined;

Complex.padding = {};
Complex.padding.swing = 11;
Complex.padding.gpml = null;

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

Group.fillOpacity = {};
Group.fillOpacity.swing = 0;
Group.fillOpacity.gpml = undefined;

Group.lineThickness = Group.borderWidth = {};
Group.lineThickness.swing = 0;
Group.lineThickness.gpml = undefined;

Group.fillColor = Group.backgroundColor = {};
Group.fillColor.swing = 'lightgreen';
Group.fillColor.gpml = null;

// ************************
// define the Pathway class (note this is referring to
// Groups of Style Pathway. Be aware that DataNodes of
// Type Pathway exist.)
// ************************
function Pathway() {
  GroupNode.call(this);
}

Pathway.prototype = new GroupNode();
Pathway.prototype.constructor = Pathway;

Pathway.fillColor = Pathway.backgroundColor = {};
Pathway.fillColor.swing = 'lightgreen';
Pathway.fillColor.gpml = null;

// ************************
// define the PathVisioJsEdge class
// ************************
function PathVisioJsEdge() {
  PathVisioJsElement.call(this);
}

PathVisioJsEdge.prototype = new PathVisioJsElement();
PathVisioJsEdge.prototype.constructor = PathVisioJsEdge;

PathVisioJsEdge.color = PathVisioJsEdge.stroke = {};
PathVisioJsEdge.color.swing = '000000';
PathVisioJsEdge.color.gpml = null;

PathVisioJsEdge.lineThickness = PathVisioJsEdge.strokeWidth = {};
PathVisioJsEdge.lineThickness.swing = '000000';
PathVisioJsEdge.lineThickness.gpml = null;

// this is only approximately correct, because "double" is
// not a valid value for stroke-dasharray.
PathVisioJsEdge.lineStyle = PathVisioJsEdge.strokeDasharray;

// TODO fill in any missing attributes for the elements defined above
// and also add all the elements not yet defined, such as Shape, Label,
// Interaction, GraphicalLine...
//
// The inheritance currently does not allow me to get a default color
// for a GeneProduct.
