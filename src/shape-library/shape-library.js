// ************************
// define the Pvjs Class
// ************************

var Pvjs = (function(){

    var static_var; //static private var

    var MyClass = function () {

        var privateVar; //private
        var privateFn = function(){}; //private 

        this.someProperty = 5;  //public
        this.anotherProperty = false;  //public
        this.someFunction = function () {  //public
            //do something
        };
    };

    return MyClass;

})();

Pvjs.Data = {};
Pvjs.Data.Gpml = {};

// ************************
// define the Pvjs.Element Class
// ************************

Pvjs.Element = Object.create(Pvjs);

// set default values. "swing" refers to PathVisio-Java.
Pvjs.Element.color = {};
Pvjs.Element.color.swing = '000000';
Pvjs.Element.color.gpml = null;

Pvjs.Element.fillColor = {};
Pvjs.Element.fillColor.swing = 'ffffff';
Pvjs.Element.fillColor.gpml = null;

Pvjs.Element.lineStyle = {};
Pvjs.Element.lineStyle.swing = 'Solid';
Pvjs.Element.lineStyle.gpml = null;

Pvjs.Element.fontSize = {};
Pvjs.Element.fontSize.swing = 10;
Pvjs.Element.fontSize.gpml = 10;

Pvjs.Element.fontWeight = {};
Pvjs.Element.fontWeight.swing = null;
Pvjs.Element.fontWeight.gpml = null;

Pvjs.Element.fontName = {};
Pvjs.Element.fontName.swing = 'Arial';
Pvjs.Element.fontName.gpml = null;

// ************************
// define the Pvjs.Element.Node class
// ************************
Pvjs.Element.Node = Object.create(Pvjs.Element);

Pvjs.Element.Node.shapeType = Pvjs.Element.Node.backgroundImage = {};
Pvjs.Element.Node.shapeType.swing = 'Rectangle';
Pvjs.Element.Node.shapeType.gpml = 'Rectangle';

Pvjs.Element.Node.valign = Pvjs.Element.Node.verticalAlign = {};
Pvjs.Element.Node.valign.swing = 'Middle';
Pvjs.Element.Node.valign.gpml = 'Middle';

Pvjs.Element.Node.align = Pvjs.Element.Node.textAlign = {};
Pvjs.Element.Node.align.swing = 'Center';
Pvjs.Element.Node.align.gpml = null;

Pvjs.Element.Node.padding = {};
Pvjs.Element.Node.padding.swing = '0.5em';
Pvjs.Element.Node.padding.gpml = null;

Pvjs.Element.Node.lineThickness = Pvjs.Element.Node.borderWidth = {};
Pvjs.Element.Node.lineThickness.swing = 1;
Pvjs.Element.Node.lineThickness.gpml = null;

Pvjs.Element.Node.lineStyle = Pvjs.Element.Node.borderStyle;

// ************************
// define the Pvjs.Element.Node.EntityNode class
// ************************
Pvjs.Element.Node.EntityNode = Object.create(Pvjs.Element.Node);

// ************************
// define the Pvjs.Element.Node.EntityNode.DataNode class
// ************************
Pvjs.Element.Node.EntityNode.DataNode = Object.create(Pvjs.Element.Node.EntityNode);

// ************************
// define the Pvjs.Element.Node.EntityNode.DataNode.GeneProduct class
// ************************
Pvjs.Element.Node.EntityNode.DataNode.GeneProduct = Object.create(Pvjs.Element.Node.EntityNode.DataNode);

// ************************
// define the Pvjs.Element.Node.EntityNode.DataNode.Metabolite class
// ************************
Pvjs.Element.Node.EntityNode.DataNode.Metabolite = Object.create(Pvjs.Element.Node.EntityNode.DataNode);

Pvjs.Element.Node.EntityNode.DataNode.Metabolite.color = {};
Pvjs.Element.Node.EntityNode.DataNode.Metabolite.color.swing = '0000ff';
Pvjs.Element.Node.EntityNode.DataNode.Metabolite.color.gpml = '0000ff';

// ************************
// define the Pvjs.Element.Node.EntityNode.DataNode.Protein class
// ************************
Pvjs.Element.Node.EntityNode.DataNode.Protein = Object.create(Pvjs.Element.Node.EntityNode.DataNode);

// ************************
// define the Pvjs.Element.Node.EntityNode.DataNode.Rna class
// ************************
Pvjs.Element.Node.EntityNode.DataNode.Rna = Object.create(Pvjs.Element.Node.EntityNode.DataNode);

// ************************
// define the Pathway class
// ************************
Pvjs.Element.Node.EntityNode.DataNode.Pathway = Object.create(Pvjs.Element.Node.EntityNode.DataNode);

Pvjs.Element.Node.EntityNode.DataNode.Pathway.color = {};
Pvjs.Element.Node.EntityNode.DataNode.Pathway.color.swing = '14961e';
Pvjs.Element.Node.EntityNode.DataNode.Pathway.color.gpml = '14961e';

Pvjs.Element.Node.EntityNode.DataNode.Pathway.fontSize = {};
Pvjs.Element.Node.EntityNode.DataNode.Pathway.fontSize.swing = 12;
Pvjs.Element.Node.EntityNode.DataNode.Pathway.fontSize.gpml = 12;

Pvjs.Element.Node.EntityNode.DataNode.Pathway.fontWeight = {};
Pvjs.Element.Node.EntityNode.DataNode.Pathway.fontWeight.swing = 'Bold';
Pvjs.Element.Node.EntityNode.DataNode.Pathway.fontWeight.gpml = 'Bold';

// ************************
// define the Pvjs.Element.Node.EntityNode.DataNode.Unknown class
// ************************
Pvjs.Element.Node.EntityNode.DataNode.Unknown = Object.create(Pvjs.Element.Node.EntityNode.DataNode);

// ************************
// define the Pvjs.Element.Node.GroupNode class
// ************************
Pvjs.Element.Node.GroupNode = Object.create(Pvjs.Element.Node);

Pvjs.Element.Node.GroupNode.fontSize = {};
Pvjs.Element.Node.GroupNode.fontSize.swing = 32;
Pvjs.Element.Node.GroupNode.fontSize.gpml = null;

Pvjs.Element.Node.GroupNode.fontName = Pvjs.Element.Node.GroupNode.fontFamily = {};
Pvjs.Element.Node.GroupNode.fontName.swing = 'Times New Roman';
Pvjs.Element.Node.GroupNode.fontName.gpml = null;

Pvjs.Element.Node.GroupNode.padding = {};
Pvjs.Element.Node.GroupNode.padding.swing = 8;
Pvjs.Element.Node.GroupNode.padding.gpml = null;

Pvjs.Element.Node.GroupNode.lineThickness = Pvjs.Element.Node.GroupNode.borderWidth = {};
Pvjs.Element.Node.GroupNode.lineThickness.swing = 0.4;
Pvjs.Element.Node.GroupNode.lineThickness.gpml = undefined;

// ************************
// define the Pvjs.Element.Node.GroupNode.Complex class
// ************************
Pvjs.Element.Node.GroupNode.Complex = Object.create(Pvjs.Element.Node.GroupNode);

Pvjs.Element.Node.GroupNode.Complex.Style = Pvjs.Element.Node.GroupNode.Complex.backgroundImage = {};
Pvjs.Element.Node.GroupNode.Complex.Style.swing = 'Pvjs.Element.Node.GroupNode.Complex';
Pvjs.Element.Node.GroupNode.Complex.Style.gpml = 'Pvjs.Element.Node.GroupNode.Complex';

Pvjs.Element.Node.GroupNode.Complex.fillColor = Pvjs.Element.Node.GroupNode.Complex.backgroundColor = {};
Pvjs.Element.Node.GroupNode.Complex.fillColor.swing = 'B4B464';
Pvjs.Element.Node.GroupNode.Complex.fillColor.gpml = undefined;

Pvjs.Element.Node.GroupNode.Complex.padding = {};
Pvjs.Element.Node.GroupNode.Complex.padding.swing = 11;
Pvjs.Element.Node.GroupNode.Complex.padding.gpml = null;

// ************************
// define the Pvjs.Element.Node.GroupNode.Group class (note this is referring to
// the GroupStyle named "Group". Groups in general
// are Pvjs.Element.Node.GroupNodes.)
// ************************
Pvjs.Element.Node.GroupNode.Group = Object.create(Pvjs.Element.Node.GroupNode);

Pvjs.Element.Node.GroupNode.Group.fillOpacity = {};
Pvjs.Element.Node.GroupNode.Group.fillOpacity.swing = 0;
Pvjs.Element.Node.GroupNode.Group.fillOpacity.gpml = undefined;

Pvjs.Element.Node.GroupNode.Group.lineThickness = Pvjs.Element.Node.GroupNode.Group.borderWidth = {};
Pvjs.Element.Node.GroupNode.Group.lineThickness.swing = 0;
Pvjs.Element.Node.GroupNode.Group.lineThickness.gpml = undefined;

Pvjs.Element.Node.GroupNode.Group.fillColor = Pvjs.Element.Node.GroupNode.Group.backgroundColor = {};
Pvjs.Element.Node.GroupNode.Group.fillColor.swing = 'lightgreen';
Pvjs.Element.Node.GroupNode.Group.fillColor.gpml = null;

// ************************
// define the Pathway class (note this is referring to
// Groups of Style Pathway. Be aware that Pvjs.Element.Node.EntityNode.DataNodes of
// Type Pathway exist.)
// ************************
Pvjs.Element.Node.GroupNode.Pathway = Object.create(Pvjs.Element.Node.GroupNode);

Pvjs.Element.Node.GroupNode.Pathway.fillColor = Pvjs.Element.Node.GroupNode.Pathway.backgroundColor = {};
Pvjs.Element.Node.GroupNode.Pathway.fillColor.swing = 'lightgreen';
Pvjs.Element.Node.GroupNode.Pathway.fillColor.gpml = null;

// ************************
// define the Pvjs.Element.Edge class
// ************************
Pvjs.Element.Edge = Object.create(Pvjs.Element);

Pvjs.Element.Edge.color = Pvjs.Element.Edge.stroke = {};
Pvjs.Element.Edge.color.swing = '000000';
Pvjs.Element.Edge.color.gpml = null;

Pvjs.Element.Edge.lineThickness = Pvjs.Element.Edge.strokeWidth = {};
Pvjs.Element.Edge.lineThickness.swing = '000000';
Pvjs.Element.Edge.lineThickness.gpml = null;

// this is only approximately correct, because "double" is
// not a valid value for stroke-dasharray.
Pvjs.Element.Edge.lineStyle = Pvjs.Element.Edge.strokeDasharray;

// TODO fill in any missing attributes for the elements defined above
// and also add all the elements not yet defined, such as Shape, Label,
// Interaction, GraphicalLine...
//
// The inheritance currently does not allow me to get a default color
// for a Pvjs.Element.Node.EntityNode.DataNode.GeneProduct.
