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
			 {
			 	"xmlns":"http://pathvisio.org/GPML/2013a",
				"name":"Error - File not found.",
				"version":"20130621",
				"boardWidth":471.0,
				"boardHeight":239.0,
				"infoBox":{
					"x":0.0,
					"y":0.0
					},
				"biopax":null,
				"dataNodes":[
					{
						"textLabel":"Error - File not found.",
						"graphId":"ec16d",
						"width":249.5,
						"height":73.5,
						"zOrder":32768,
						"fontName":"Verdana",
						"fontWeight":"Bold",
						"fontSize":16,
						"valign":"middle",
						"color":"#ff0000",
						"x":1.5,
						"y":19.5,
						"fillColor":"white"
						"xRef":{
							"database":"",
							"id":""
							}
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
