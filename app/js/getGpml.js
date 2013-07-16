function getGpml(url, callback) {
	// this needs to be updated to get a URL provided by the php backend. We could also consider getting the GPML from the SOAP webservice,
	// but that would require a more significant refactoring.
	// Should we allow for getting GPML from other locations than WikiPathways?
	// need to test whether it will work to get GPML from WikiPathways when viewer is used as widget on third-party site.

	function Right(str, n){
		if (n <= 0)
			return "";
		else if (n > String(str).length)
			return str;
		else {
			var iLen = String(str).length;
			return String(str).substring(iLen, iLen - n);
		}
	}

	function Left(str, n){
		if (n <= 0)
			return "";
		else if (n > String(str).length)
			return str;
		else {
			return String(str).substring(0, n);
		}
	}

	function getDataFile(callback) {
		try {
			jQuery.get(url).success(function(data) {
				callback(data);
			})
		}
		catch (e) {
			console.log("Error: File not found.");
			return {"@xmlns":"http://pathvisio.org/GPML/2013a","@Name":"Error - File not found.","@Version":"20130621","Graphics":[{"@BoardWidth":"471.0","@BoardHeight":"239.0"}],"InfoBox":{"@CenterX":"0.0","@CenterY":"0.0"},"Biopax":null,"DataNodes":[{"@TextLabel":"Error - File not found.","@GraphId":"ec16d","Graphics":{"@Width":"249.5","@Height":"73.5","@ZOrder":"32768","@FontName":"Verdana","@FontWeight":"Bold","@FontSize":"16","@Valign":"Middle","@Color":"#ff0000","x":1.5,"y":19.5,"@FillColor":"white"},"Xref":{"@Database":"","@ID":""}}]};
			/*
			 // jGpml
			 return 
			 var pathway = {
			 	"xmlns":"http://pathvisio.org/GPML/2013a",
				"name":"Error - File not found.",
				"organism":"Homo sapiens",
			       	"license":"CC BY 2.0",
				"version":"20130621",
				"boardWidth":471.0,
				"boardHeight":239.0,
			       	"comments":[
			       		{
				       		"source":"WikiPathways-description",
					       	"text":"sample text"
					},
					{
				       		"source":"WikiPathways-category",
					       	"text":"Cellular Process"
					}
				],
				"biopaxRefs":[
					"c42",
					"bfa"
				],
				"infoBox":{
					"x":0.0,
					"y":0.0
					},
				"biopax":null,
				"labelableElement":[ // includes data nodes, shapes (lines, arcs, braces, rectangles, cellular compartments...) and labels
					{
					       	"comments":[
					       		"abc",
					       		"cdf"
					       	],
						"graphId":"ec16d",
					       	"elementType":"data-node",
					       	"dataNodeType":"gene-product",
					       	"shapeType":"rectangle",
						"textLabel":{
							"text":"Error - File not found.",
							"color":"#ff0000",
							"fontFamily":"Verdana",
							"fontStyle":"italic", // must be lowercase
							"fontWeight":"bold", // must be lowercase
							"fontSize":16,
							"vAlign":"middle",
						       	"align":"center"
						},
						"x":1.5,
						"y":19.5,
						"width":249.5,
						"height":73.5,
						"zOrder":32768,
						"rotation":0,
					       	"transparent":false,
						"fill":"white"
						"stroke":"#ff0000",
					       	"strokeStyle":"dashed", // can be solid, dashed or double
					       	"strokeWidth":1,
						"xRef":{ // data nodes and edges only
							"database":"Entrez Gene",
							"id":"1950"
						}
					},
					{
					       	"comments":[
					       		"abc",
					       		"cdf"
					       	],
						"graphId":"ec16d",
					       	"elementType":"shape", // data-node, shape or label
					       	"shapeType":"rounded-rectangle",
						"textLabel":{
							"text":"Error - File not found.",
							"color":"#ff0000",
							"fontFamily":"Verdana",
							"fontSize":16,
							"fontStyle":"italic", // must be lowercase
							"fontWeight":"bold", // must be lowercase
							"vAlign":"middle",
						       	"align":"center"
						},
						"x":1.5,
						"y":19.5,
						"width":249.5,
						"height":73.5,
						"zOrder":32768,
					       	"transparent":false,
						"fill":"white"
						"stroke":"#ff0000",
					       	"strokeStyle":"solid", // can be solid, dashed or double
					       	"strokeWidth":0
					},
					{
					       	"comments":[
					       		"abc",
					       		"cdf"
					       	],
						"graphId":"ec16d",
					       	"elementType":"label", // shape or label
					       	"shapeType":"rectangle",
						"textLabel":{
							"text":"Error - File not found.",
							"color":"#ff0000",
							"fontFamily":"Verdana",
							"fontStyle":"italic", // must be lowercase
							"fontWeight":"bold", // must be lowercase
							"fontSize":16,
							"vAlign":"middle",
						       	"align":"center"
						},
						"x":1.5,
						"y":19.5,
						"width":249.5,
						"height":73.5,
						"zOrder":32768,
						"stroke":"none",
					       	"strokeWidth":0,
						"fill":"none"
					       	"transparent":true,
					       	"href":"http://www.wikipathways.org" // labels only
					}
				],
			       	"interactions":[
			       		{
					       	"comments":[
					       		"abc",
					       		"cdf"
					       	],
						"graphId":"ec16d",
						"zOrder":32768,
						"stroke":"black",
					       	"strokeWidth":1,
					       	"points":[
					       		{
								"x":1.5,
								"y":19.5,
						       	},
						       	{
							       	"source":"a6fe5", // node or interaction to which this is connected
							       	"target":"rp501"  // anchor on node or interaction to which this is connected
							       	"marker":"arrow"
						       	}
						],
						"xRef":{
							"database":"Entrez Gene",
							"id":"1950"
						}
					},
					{
					       	"comments":[
					       		"abc",
					       		"cdf"
					       	],
						"graphId":"ec16d",
						"zOrder":32768,
						"stroke":"black",
					       	"strokeWidth":1,
					       	"points":[
					       		{
							       	"source":"a6fe5", // node or interaction to which this is connected
							       	"target":"rp501"  // anchor on node or interaction to which this is connected
						       	},
						       	{
							       	"source":"a6fe5", // node or interaction to which this is connected
							       	"target":"rp501"  // anchor on node or interaction to which this is connected
							       	"marker":"arrow"
						       	}
						],
						"xRef":{
							"database":"Entrez Gene",
							"id":"1950"
						}
				       	}
				],
			       	"groups":[
			       		{
				       		"graphId":"f98d7"
				       		"groupId":"bad26"
				       		"style":"group"
				       	},
			       		{
				       		"graphId":"f98d8"
				       		"groupId":"bad27"
				       		"style":"complex"
				       	}
					]
			};
		}
	       */
	};

	function convertToArray(object) {
		if (Object.prototype.toString.call( object ) === '[object Object]' ) {
			var array = [];
			array.push(object)
			return array;
		}
		else {
			if( Object.prototype.toString.call( object ) === '[object Array]' ) {
				return object;
			}
		}
	}

	function validateCssColor(color){
		if (color == null | color == 'undefined' | color == '' | (!color)) {
			return false;
		}
		else {
			var rgb = $('<div style="color:#28e32a">');     // Use a non standard dummy color to ease checking for edge cases
			var valid_rgb = "rgb(40, 227, 42)";
			rgb.css("color", color);
			if(rgb.css('color') == valid_rgb && color != ':#28e32a' && color.replace(/ /g,"") != valid_rgb.replace(/ /g,""))
				return false;
			else
				return true;
		}
	};



	if (!(url)) {
		url = "../../samples/gpml/error.gpml";
	}
	var pathway = getDataFile(function(data) {
		var pathway = convertGpml2Json(data);
		return callback(pathway);
	})
}
