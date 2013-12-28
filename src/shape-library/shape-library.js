// ************************
// define the Pathvisiojs Class
// ************************

var Pathvisiojs = (function(){

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

Pathvisiojs.Data = {};
Pathvisiojs.Data.Gpml = {};

// ************************
// define the Pathvisiojs.Element Class
// ************************

Pathvisiojs.Element = Object.create(Pathvisiojs);

// set default values. "swing" refers to PathVisio-Java.
Pathvisiojs.Element.color = {};
Pathvisiojs.Element.color.swing = '000000';
Pathvisiojs.Element.color.gpml = null;

Pathvisiojs.Element.fillColor = {};
Pathvisiojs.Element.fillColor.swing = 'ffffff';
Pathvisiojs.Element.fillColor.gpml = null;

Pathvisiojs.Element.lineStyle = {};
Pathvisiojs.Element.lineStyle.swing = 'Solid';
Pathvisiojs.Element.lineStyle.gpml = null;

Pathvisiojs.Element.fontSize = {};
Pathvisiojs.Element.fontSize.swing = 10;
Pathvisiojs.Element.fontSize.gpml = 10;

Pathvisiojs.Element.fontWeight = {};
Pathvisiojs.Element.fontWeight.swing = null;
Pathvisiojs.Element.fontWeight.gpml = null;

Pathvisiojs.Element.fontName = {};
Pathvisiojs.Element.fontName.swing = 'Arial';
Pathvisiojs.Element.fontName.gpml = null;

// ************************
// define the Pathvisiojs.Element.Node class
// ************************
Pathvisiojs.Element.Node = Object.create(Pathvisiojs.Element);

Pathvisiojs.Element.Node.shapeType = Pathvisiojs.Element.Node.backgroundImage = {};
Pathvisiojs.Element.Node.shapeType.swing = 'Rectangle';
Pathvisiojs.Element.Node.shapeType.gpml = 'Rectangle';

Pathvisiojs.Element.Node.valign = Pathvisiojs.Element.Node.verticalAlign = {};
Pathvisiojs.Element.Node.valign.swing = 'Middle';
Pathvisiojs.Element.Node.valign.gpml = 'Middle';

Pathvisiojs.Element.Node.align = Pathvisiojs.Element.Node.textAlign = {};
Pathvisiojs.Element.Node.align.swing = 'Center';
Pathvisiojs.Element.Node.align.gpml = null;

Pathvisiojs.Element.Node.padding = {};
Pathvisiojs.Element.Node.padding.swing = '0.5em';
Pathvisiojs.Element.Node.padding.gpml = null;

Pathvisiojs.Element.Node.lineThickness = Pathvisiojs.Element.Node.borderWidth = {};
Pathvisiojs.Element.Node.lineThickness.swing = 1;
Pathvisiojs.Element.Node.lineThickness.gpml = null;

Pathvisiojs.Element.Node.lineStyle = Pathvisiojs.Element.Node.borderStyle;

// ************************
// define the Pathvisiojs.Element.Node.EntityNode class
// ************************
Pathvisiojs.Element.Node.EntityNode = Object.create(Pathvisiojs.Element.Node);

// ************************
// define the Pathvisiojs.Element.Node.EntityNode.DataNode class
// ************************
Pathvisiojs.Element.Node.EntityNode.DataNode = Object.create(Pathvisiojs.Element.Node.EntityNode);

// ************************
// define the Pathvisiojs.Element.Node.EntityNode.DataNode.GeneProduct class
// ************************
Pathvisiojs.Element.Node.EntityNode.DataNode.GeneProduct = Object.create(Pathvisiojs.Element.Node.EntityNode.DataNode);

// ************************
// define the Pathvisiojs.Element.Node.EntityNode.DataNode.Metabolite class
// ************************
Pathvisiojs.Element.Node.EntityNode.DataNode.Metabolite = Object.create(Pathvisiojs.Element.Node.EntityNode.DataNode);

Pathvisiojs.Element.Node.EntityNode.DataNode.Metabolite.color = {};
Pathvisiojs.Element.Node.EntityNode.DataNode.Metabolite.color.swing = '0000ff';
Pathvisiojs.Element.Node.EntityNode.DataNode.Metabolite.color.gpml = '0000ff';

// ************************
// define the Pathvisiojs.Element.Node.EntityNode.DataNode.Protein class
// ************************
Pathvisiojs.Element.Node.EntityNode.DataNode.Protein = Object.create(Pathvisiojs.Element.Node.EntityNode.DataNode);

// ************************
// define the Pathvisiojs.Element.Node.EntityNode.DataNode.Rna class
// ************************
Pathvisiojs.Element.Node.EntityNode.DataNode.Rna = Object.create(Pathvisiojs.Element.Node.EntityNode.DataNode);

// ************************
// define the Pathway class
// ************************
Pathvisiojs.Element.Node.EntityNode.DataNode.Pathway = Object.create(Pathvisiojs.Element.Node.EntityNode.DataNode);

Pathvisiojs.Element.Node.EntityNode.DataNode.Pathway.color = {};
Pathvisiojs.Element.Node.EntityNode.DataNode.Pathway.color.swing = '14961e';
Pathvisiojs.Element.Node.EntityNode.DataNode.Pathway.color.gpml = '14961e';

Pathvisiojs.Element.Node.EntityNode.DataNode.Pathway.fontSize = {};
Pathvisiojs.Element.Node.EntityNode.DataNode.Pathway.fontSize.swing = 12;
Pathvisiojs.Element.Node.EntityNode.DataNode.Pathway.fontSize.gpml = 12;

Pathvisiojs.Element.Node.EntityNode.DataNode.Pathway.fontWeight = {};
Pathvisiojs.Element.Node.EntityNode.DataNode.Pathway.fontWeight.swing = 'Bold';
Pathvisiojs.Element.Node.EntityNode.DataNode.Pathway.fontWeight.gpml = 'Bold';

// ************************
// define the Pathvisiojs.Element.Node.EntityNode.DataNode.Unknown class
// ************************
Pathvisiojs.Element.Node.EntityNode.DataNode.Unknown = Object.create(Pathvisiojs.Element.Node.EntityNode.DataNode);

// ************************
// define the Pathvisiojs.Element.Node.GroupNode class
// ************************
Pathvisiojs.Element.Node.GroupNode = Object.create(Pathvisiojs.Element.Node);

Pathvisiojs.Element.Node.GroupNode.fontSize = {};
Pathvisiojs.Element.Node.GroupNode.fontSize.swing = 32;
Pathvisiojs.Element.Node.GroupNode.fontSize.gpml = null;

Pathvisiojs.Element.Node.GroupNode.fontName = Pathvisiojs.Element.Node.GroupNode.fontFamily = {};
Pathvisiojs.Element.Node.GroupNode.fontName.swing = 'Times New Roman';
Pathvisiojs.Element.Node.GroupNode.fontName.gpml = null;

Pathvisiojs.Element.Node.GroupNode.padding = {};
Pathvisiojs.Element.Node.GroupNode.padding.swing = 8;
Pathvisiojs.Element.Node.GroupNode.padding.gpml = null;

Pathvisiojs.Element.Node.GroupNode.lineThickness = Pathvisiojs.Element.Node.GroupNode.borderWidth = {};
Pathvisiojs.Element.Node.GroupNode.lineThickness.swing = 0.4;
Pathvisiojs.Element.Node.GroupNode.lineThickness.gpml = undefined;

// ************************
// define the Pathvisiojs.Element.Node.GroupNode.Complex class
// ************************
Pathvisiojs.Element.Node.GroupNode.Complex = Object.create(Pathvisiojs.Element.Node.GroupNode);

Pathvisiojs.Element.Node.GroupNode.Complex.Style = Pathvisiojs.Element.Node.GroupNode.Complex.backgroundImage = {};
Pathvisiojs.Element.Node.GroupNode.Complex.Style.swing = 'Pathvisiojs.Element.Node.GroupNode.Complex';
Pathvisiojs.Element.Node.GroupNode.Complex.Style.gpml = 'Pathvisiojs.Element.Node.GroupNode.Complex';

Pathvisiojs.Element.Node.GroupNode.Complex.fillColor = Pathvisiojs.Element.Node.GroupNode.Complex.backgroundColor = {};
Pathvisiojs.Element.Node.GroupNode.Complex.fillColor.swing = 'B4B464';
Pathvisiojs.Element.Node.GroupNode.Complex.fillColor.gpml = undefined;

Pathvisiojs.Element.Node.GroupNode.Complex.padding = {};
Pathvisiojs.Element.Node.GroupNode.Complex.padding.swing = 11;
Pathvisiojs.Element.Node.GroupNode.Complex.padding.gpml = null;

// ************************
// define the Pathvisiojs.Element.Node.GroupNode.Group class (note this is referring to
// the GroupStyle named "Group". Groups in general
// are Pathvisiojs.Element.Node.GroupNodes.)
// ************************
Pathvisiojs.Element.Node.GroupNode.Group = Object.create(Pathvisiojs.Element.Node.GroupNode);

Pathvisiojs.Element.Node.GroupNode.Group.fillOpacity = {};
Pathvisiojs.Element.Node.GroupNode.Group.fillOpacity.swing = 0;
Pathvisiojs.Element.Node.GroupNode.Group.fillOpacity.gpml = undefined;

Pathvisiojs.Element.Node.GroupNode.Group.lineThickness = Pathvisiojs.Element.Node.GroupNode.Group.borderWidth = {};
Pathvisiojs.Element.Node.GroupNode.Group.lineThickness.swing = 0;
Pathvisiojs.Element.Node.GroupNode.Group.lineThickness.gpml = undefined;

Pathvisiojs.Element.Node.GroupNode.Group.fillColor = Pathvisiojs.Element.Node.GroupNode.Group.backgroundColor = {};
Pathvisiojs.Element.Node.GroupNode.Group.fillColor.swing = 'lightgreen';
Pathvisiojs.Element.Node.GroupNode.Group.fillColor.gpml = null;

// ************************
// define the Pathway class (note this is referring to
// Groups of Style Pathway. Be aware that Pathvisiojs.Element.Node.EntityNode.DataNodes of
// Type Pathway exist.)
// ************************
Pathvisiojs.Element.Node.GroupNode.Pathway = Object.create(Pathvisiojs.Element.Node.GroupNode);

Pathvisiojs.Element.Node.GroupNode.Pathway.fillColor = Pathvisiojs.Element.Node.GroupNode.Pathway.backgroundColor = {};
Pathvisiojs.Element.Node.GroupNode.Pathway.fillColor.swing = 'lightgreen';
Pathvisiojs.Element.Node.GroupNode.Pathway.fillColor.gpml = null;

// ************************
// define the Pathvisiojs.Element.Edge class
// ************************
Pathvisiojs.Element.Edge = Object.create(Pathvisiojs.Element);

Pathvisiojs.Element.Edge.color = Pathvisiojs.Element.Edge.stroke = {};
Pathvisiojs.Element.Edge.color.swing = '000000';
Pathvisiojs.Element.Edge.color.gpml = null;

Pathvisiojs.Element.Edge.lineThickness = Pathvisiojs.Element.Edge.strokeWidth = {};
Pathvisiojs.Element.Edge.lineThickness.swing = '000000';
Pathvisiojs.Element.Edge.lineThickness.gpml = null;

// this is only approximately correct, because "double" is
// not a valid value for stroke-dasharray.
Pathvisiojs.Element.Edge.lineStyle = Pathvisiojs.Element.Edge.strokeDasharray;

// TODO fill in any missing attributes for the elements defined above
// and also add all the elements not yet defined, such as Shape, Label,
// Interaction, GraphicalLine...
//
// The inheritance currently does not allow me to get a default color
// for a Pathvisiojs.Element.Node.EntityNode.DataNode.GeneProduct.
