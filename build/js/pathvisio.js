caseConverter = function(){ 

/**
 * "dot.case"
 */

var dotCase = function(string) {
  return separatorCase(string, '.');
}

/**
 * "ClassCase"
 */

var classCase = function(string) {
  return separatorCase(string, '_').replace(/(?:^|_|\-|\/)(.)/g, function(match, c) {
    return c.toUpperCase();
  });
}

/**
 * "Namespace.Case"
 */

var namespaceCase = function(string) {
  return separatorCase(string, '.').replace(/(^|_|\.|\-|\/)(.)/g, function(match, p, c) {
    return p + c.toUpperCase();
  });
}

/**
 * "CONSTANT_CASE"
 */

var constantCase = function(string) {
  return separatorCase(string, '_').replace(/[a-z]/g, function(c) {
    return c.toUpperCase();
  });
}

/**
 * "camelCase"
 */

var camelCase = function(string) {
  return separatorCase(string, '_').replace(/[-_\.\/\s]+(.)?/g, function(match, c) {
    return c.toUpperCase();
  });
}

/**
 * "Title Case"
 */

var titleCase = function(string) {
  return separatorCase(string, ' ').replace(/(?:^|\s)\S/g, function(c) {
    return c.toUpperCase();
  });
}

/**
 * "snake_case"
 */

var snakeCase = function(string) {
  return separatorCase(string, '_');
}

/**
 * "path/case"
 */

var pathCase = function(string) {
  return this.separatorCase(string, '/');
}

/**
 * "param-case"
 */

var paramCase = function(string) {
  return this.separatorCase(string, '-');
}

/**
 * Generic string transform.
 */

var separatorCase = function(string, separator) {
  return clean(trim(string), separator).replace(/([a-z\d])([A-Z]+)/g, '$1' + separator + '$2').replace(/[-\.\/\_\s]+/g, separator).toLowerCase();
}

/**
 * Remove non-word characters.
 */

var clean = function(string, separator) {
  return string.replace(/\W+/g, separator || ' ');
}

/**
 * Remove non-word from the start/end of the string only.
 */

var trim = function(string) {
  return string.replace(/^\W+|\W+$/g, '');
}

return { 
  camelCase:camelCase
} 
}();
;

/**
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * Copyright (c) 2012 Sam Tsvilik
 * Licensed under the MIT, GPL licenses.
 *
 * @name xml
 * @version 1.1
 * @author Sam Tsvilik
 * @description
 * This is a super light and simple XML to JSON converter.
 * All it does is scans through child elements of your XML and builds out a JSON structure.
 * To avoid attribute vs. node name conflicts - All attribute entities are prefixed with "@" (i.e. <node attr="1"/> == {node: {"@attr":"1"}} )
 * text or CDATA value will always be inside a "text" property (i.e. myNodeObj.text == <myNodeObj>Hello</myNodeObj> - Hello)
 * Node siblings with the same name will be automatically converted into arrays, else if node is singular it will just be an Object
 */

(function(window, undef) { /** @lends xml */
    //Trim polyfill (thanks gist: 1035982)
    ''.trim || (String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
    });

    var NULL = null,
        FALSE = !1,
        TRUE = !0,
        NODE_TYPES = {
            Element: 1,
            Attribute: 2,
            text: 3,
            CDATA: 4,
            Root: 9,
            Fragment: 11
        },
        XMLConverter, module;

    /**
     * Parses XML string and returns an XMLDocument object
     * @param  {String} strXML XML Formatted string
     * @return {XMLDocument|XMLElement}
     */

    function parseXMLString(strXML) {
        var xmlDoc = NULL,
            out = NULL,
            isParsed = TRUE;
        try {
            xmlDoc = ("DOMParser" in window) ? new DOMParser() : new ActiveXObject("MSXML2.DOMDocument");
            xmlDoc.async = FALSE;
        } catch(e) {
            throw new Error("XML Parser could not be instantiated");
        }

        if("parseFromString" in xmlDoc) {
            out = xmlDoc.parseFromString(strXML, "text/xml");
            isParsed = (out.documentElement.tagName !== "parsererror");
        } else { //If old IE
            isParsed = xmlDoc.loadXML(strXML);
            out = (isParsed) ? xmlDoc : FALSE;
        }
        if(!isParsed) {
            throw new Error("Error parsing XML string");
        }
        return out;
    }

    XMLConverter = {
        isUnsafe: FALSE,
        isXML: function(o) {
            return(typeof(o) === "object" && o.nodeType !== undef);
        },
        getRoot: function(doc) {
            return(doc.nodeType === NODE_TYPES.Root) ? doc.documentElement : (doc.nodeType === NODE_TYPES.Fragment) ? doc.firstChild : doc;
        },
        /**
         * Begins the conversion process. Will automatically convert XML string into XMLDocument
         * @param  {String|XMLDocument|XMLNode|XMLElement} xml XML you want to convert to JSON
         * @return {JSON} JSON object representing the XML data tree
         */
        convert: function(xml) {
            var out = {},
                xdoc = typeof(xml) === "string" ? parseXMLString(xml) : this.isXML(xml) ? xml : undef,
                root;
            if(!xdoc) {
                throw new Error("Unable to parse XML");
            }
            //If xdoc is just a text or CDATA return value
            if(xdoc.nodeType === NODE_TYPES.text || xdoc.nodeType === NODE_TYPES.CDATA) {
                return xdoc.nodeValue;
            }
            //Extract root node
            root = this.getRoot(xdoc);
            //Create first root node
            out[caseConverter.camelCase(root.nodeName)] = {};
            //Start assembling the JSON tree (recursive)
            this.process(root, out[caseConverter.camelCase(root.nodeName)]);
            //Parse JSON string and attempt to return it as an Object
            return out;
        },
        /**
         * Recursive xmlNode processor. It determines the node type and processes it accordingly.
         * @param  {XMLNode} node Any XML node
         * @param  {Object} buff Buffer object which will contain the JSON equivalent properties
         */
        process: function(node, buff) {
            var child, attr, name, att_name, value, i, j, tmp, iMax, jMax;
            if(node.hasChildNodes()) {
                iMax = node.childNodes.length;
                for(i = 0; i < iMax; i++) {
                    child = node.childNodes[i];
                    //Check nodeType of each child node
                    switch(child.nodeType) {
                    case NODE_TYPES.text:
                        //If parent node has both CDATA and text nodes, we just concatinate them together
                        buff.text = buff.text ? buff.text + child.nodeValue.trim() : child.nodeValue.trim();
                        break;
                    case NODE_TYPES.CDATA:
                        //If parent node has both CDATA and text nodes, we just concatinate them together
                        value = child[child.text ? "text" : "nodeValue"]; //IE attributes support
                        buff.text = buff.text ? buff.text + value : value;
                        break;
                    case NODE_TYPES.Element:
                        name = caseConverter.camelCase(child.nodeName);
                        tmp = {};
                        //Node name already exists in the buffer and it's a NodeSet
                        if(name in buff) {
                            if(buff[name].length) {
                                this.process(child, tmp);
                                buff[name].push(tmp);
                            } else { //If node exists in the parent as a single entity
                                this.process(child, tmp);
                                buff[name] = [buff[name], tmp];
                            }
                        } else { //If node does not exist in the parent
                            this.process(child, tmp);
                            buff[name] = tmp;
                        }
                        break;
                    }
                }
            }
            //Populate attributes
            if(node.attributes.length) {
                for(j = node.attributes.length - 1; j >= 0; j--) {
                    attr = node.attributes[j];
                    att_name = caseConverter.camelCase(attr.name.trim());
                    value = attr.value;
                    buff[(this.isUnsafe ? "" : "@") + att_name] = value;
                }
            }
        }
    };

    module = {
        /**
         * Public API to convert XML to JSON
         * @param  {String | XMLDocument} xml Any XML type
         * @param {Boolean} unsafe Allows unsafe processing that does not prefixes attributes with '@' character. It is considered unsafe bacause attribute names may collide with node names.
         * @return {JSON}     JSON object
         */
        xmlToJSON: function(xml, unsafe) {
            XMLConverter.isUnsafe = (unsafe !== undef) ? unsafe : FALSE;
            return XMLConverter.convert(xml);
        }
    };
    //Expose public Api
    window.xml = window.xml || module;
})(window);
;

/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 * @license Use it if you like it
 */
function RGBColor(color_string)
{
	color_string = color_string.toString();

    this.ok = false;

    // strip any leading #
    if (color_string.charAt(0) == '#') { // remove # if any
        color_string = color_string.substr(1,6);
    }

    color_string = color_string.replace(/ /g,'');
    color_string = color_string.toLowerCase();

    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred : 'cd5c5c',
        indigo : '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    };
    for (var key in simple_colors) {
        if (color_string == key) {
            color_string = simple_colors[key];
        }
    }
    // emd of simple type-in colors

    // array of color definition objects
    var color_defs = [
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            example: ['#00ff00', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            example: ['#fb0', 'f0f'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            this.ok = true;
        }

    }

    // validate/cleanup values
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);

    // some getters
    this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    }

    // help
    this.getHelpXML = function () {

        var examples = new Array();
        // add regexps
        for (var i = 0; i < color_defs.length; i++) {
            var example = color_defs[i].example;
            for (var j = 0; j < example.length; j++) {
                examples[examples.length] = example[j];
            }
        }
        // add type-in colors
        for (var sc in simple_colors) {
            examples[examples.length] = sc;
        }

        var xml = document.createElement('ul');
        xml.setAttribute('id', 'rgbcolor-examples');
        for (var i = 0; i < examples.length; i++) {
            try {
                var list_item = document.createElement('li');
                var list_color = new RGBColor(examples[i]);
                var example_div = document.createElement('div');
                example_div.style.cssText =
                        'margin: 3px; '
                        + 'border: 1px solid black; '
                        + 'background:' + list_color.toHex() + '; '
                        + 'color:' + list_color.toHex()
                ;
                example_div.appendChild(document.createTextNode('test'));
                var list_item_value = document.createTextNode(
                    ' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex()
                );
                list_item.appendChild(example_div);
                list_item.appendChild(list_item_value);
                xml.appendChild(list_item);

            } catch(e){}
        }
        return xml;

    }

}

;

var pathvisio = {};
pathvisio.data = {};
pathvisio.data.current = {};
pathvisio.data.current.svgSelector = null;
pathvisio.data.current.svg = null;
pathvisio.data.pathways = [];
;

pathvisio.helpers = function(){
  function splitStringByNewLine(str) {

    // PathVisio (Java) uses '&#xA;' for indicating newline, and browsers convert this into '\r\n' or '\n' in JavaScript.

    return str.split(/\r\n|\r|\n/g);
  };

  function cloneNode(selector) {
    var node = d3.select(selector).node();
    return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
  };

  function getUrlParam(name) {

    // Thanks to http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript
    // This will be replaced once we get the backend php to get the json

    var parameter = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    if (parameter !== null) {
      return parameter;
    }
    else {
      warn.log('Error: URL not given');
      return 'Error';
    };
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
      else {
        if( Object.prototype.toString.call( object ) === '[object String]' ) {
          var array = [];
          array.push(object)
          return array;
        };
      };
    };
  };

  return{
    splitStringByNewLine:splitStringByNewLine,
    getUrlParam:getUrlParam,
    cloneNode:cloneNode,
    convertToArray:convertToArray
  }
}();



;

pathvisio.pathway = function(){
  function gpml2json(gpml){

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    self.gpml = gpml;
    console.log('GPML')
    console.log(gpml)

    // We can use xml2json.js or JXON.js. Which is better?
    // JXON.js
    var pathway = pathvisio.data.pathways[pathvisio.data.current.svgSelector];
    pathway = self.pathway = xml.xmlToJSON(gpml, true).pathway;
    
    console.log('raw json from xml2json');
    console.log(xml.xmlToJSON(gpml, true).pathway);

    try {
      xmlns = pathway["xmlns"]
    }
    catch (e) {
      console.log(e.message);
      return;
    };

    // test for whether file is GPML based on xmlns without reference to version

    var gpmlXmlnsSupported = "http://pathvisio.org/GPML/2013a";
    var gpmlXmlnsIdentifier = "/GPML/";

    // current and previous GPML xmlns values
    // "http://pathvisio.org/GPML/2013a"
    // "http://genmapp.org/GPML/2010a"
    // "http://genmapp.org/GPML/2008a"
    // "http://genmapp.org/GPML/2007"

    if ( xmlns.indexOf(gpmlXmlnsIdentifier) !== -1 ) {

      // test for whether the GPML file version matches the current version supported by pathvisio.js

      if (xmlns != gpmlXmlnsSupported) {

        // preferably, this would call the Java RPC updater for the file to be updated.

        alert("Pathvisio.js may not fully support the version of GPML provided (xmlns: " + xmlns + "). Please convert to the supported version of GPML (xmlns: " + gpmlXmlnsSupported + ").")
      };

      // Convert output from xml2json.js into jsonGpml (well-formed JSON with all implied elements from gpml explicitly filled in).

      pathway.boardWidth = pathway.graphics.boardWidth;
      pathway.boardHeight = pathway.graphics.boardHeight;

      // infoBox
      // These values are a legacy from GenMAPP. They are always forced to be equal to 0 in PathVisio (Java) so as to place the infobox in the upper lefthand corner.

      pathway.infoBox.x = 0;
      delete pathway.infoBox.centerX;
      pathway.infoBox.y = 0;
      delete pathway.infoBox.centerY;

      // Comments 

      try {
        if (pathway.hasOwnProperty('comment')) {
          pathway.comments = pathvisio.helpers.convertToArray( pathway.comment );
          delete pathway.comment;

          pathway.comments.forEach(function(element, index, array) {
            // modify data
          });
        }
        else {
          console.log("No element(s) named 'comment' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting comment to json: " + e.message);
      };

      // Groups

      try {
        if (pathway.hasOwnProperty('group')) {
          pathway.groups = pathvisio.helpers.convertToArray( pathway.group );
          delete pathway.group;

          pathway.groups.forEach(function(element, index, array) {
            if (element.hasOwnProperty('style')) {
              element.style = element.style.toLowerCase();
            }
            else {
              element.style = 'none';
            };

          });
        }
        else {
          console.log("No element(s) named 'group' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting group to json: " + e.message);
      };

      // Graphical Lines 

      try {
        if (pathway.hasOwnProperty('graphicalLine')) {
          graphicalLines = pathvisio.helpers.convertToArray( pathway.graphicalLine );
          delete pathway.graphicalLine;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          };

          graphicalLines.forEach(function(element, index, array) {
            element.edgeType = 'graphical-line';
            pathway.edges.push(element);
          });
        }
        else {
          console.log("No element(s) named 'graphicalLine' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting graphicalLine to json: " + e.message);
      };

      // Interactions

      try {
        if (pathway.hasOwnProperty('interaction')) {
          var interactions = pathvisio.helpers.convertToArray( pathway.interaction );
          delete pathway.interaction;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          };

          interactions.forEach(function(element, index, array) {
            element.edgeType = 'interaction';
            pathway.edges.push(element);
          });

          self.interactions = interactions;
          self.edges = pathway.edges;
        }
        else {
          console.log("No element(s) named 'interaction' found in this gpml file.");
        }
      }
      catch (e) {
        console.log("Error converting interaction to json: " + e.message);
      };

      // Edges

      try {
        if (pathway.hasOwnProperty('edges')) {
          pathway.edges = pathvisio.pathway.edge.gpml2json(pathway.edges);
        }
        else {
          console.log("No element(s) named 'edges' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting edges to json: " + e.message);
      };

      // DataNodes 

      // GPML to jGPML shape name mappings: { "OldName":"new-name" }
      // replace spaces with dashes
      // Add dashes before every capital letter except any capital letters at the beginning of the string
      // Replace spaces with dashes
      // Replace double dashes with single dashes
      // replace capitals letters with lowercase. 

      var dataNodeTypeMappings = {
        "GeneProduct":"gene-product",
        "Metabolite":"metabolite",
        "Pathway":"pathway",
        "Protein":"protein",
        "Rna":"rna"
      };

      try {
        if (pathway.hasOwnProperty('dataNode')) {
          var dataNodes = pathvisio.helpers.convertToArray( pathway.dataNode );
          delete pathway.dataNode;

          dataNodes.forEach(function(element, index, array) {

            element.elementType = 'data-node';

            if (dataNodeTypeMappings.hasOwnProperty(element.type)) {
              element.dataNodeType = dataNodeTypeMappings[element.type];
            }
            else {
              element.dataNodeType = 'unknown';
            };
            delete element.type;

            if (element.hasOwnProperty('xref')) {
              if ((!element.xref.database) && (!element.xref.id)) {
                delete element.xref;
              }
              else {
                element.xref = element.xRef;
                delete element.xref;
              };
            };
          });

          if (pathway.hasOwnProperty('labelableElements')) {
            pathway.labelableElements = pathway.labelableElements.concat(dataNodes);
          }
          else {
            pathway.labelableElements = dataNodes;
          };

        }
        else {
          console.log("No element(s) named 'dataNode' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting dataNode to json: " + e.message);
      };

      // Labels

      try {
        if (pathway.hasOwnProperty('label')) {
          var labels = self.labels = pathvisio.helpers.convertToArray( pathway.label );
          delete pathway.label;

          labels.forEach(function(element, index, array) {
            element.elementType = 'label';
          });

          if (pathway.hasOwnProperty('labelableElements')) {
            pathway.labelableElements = pathway.labelableElements.concat(labels);
          }
          else {
            pathway.labelableElements = labels;
          };
        }
        else {
          console.log("No element(s) named 'label' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting label to json: " + e.message);
      };

      // Shapes

      try {
        if (pathway.hasOwnProperty('shape')) {
          var shapes = pathvisio.helpers.convertToArray( pathway.shape );
          delete pathway.shape;

          shapes.forEach(function(element, index, array) {
            element.elementType = 'shape';
          });

          if (pathway.hasOwnProperty('labelableElements')) {
            pathway.labelableElements = pathway.labelableElements.concat(shapes);
          }
          else {
            pathway.labelableElements = shapes;
          };
        }
        else {
          console.log("No element(s) named 'shape' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting shape to json: " + e.message);
      };

      // LabelableElements

      try {
        if (pathway.hasOwnProperty('labelableElements')) {
          pathway.labelableElements = pathvisio.pathway.labelableElement.gpml2json(pathway.labelableElements);
        }
        else {
          console.log("No element(s) named 'labelableElements' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting labelableElements to json: " + e.message);
      };


      // BiopaxRefs 

      try {
        if (pathway.hasOwnProperty('biopaxref')) {
          pathway.biopaxRefs = pathvisio.helpers.convertToArray( pathway.biopaxRef );
          delete pathway.biopaxRef;

          //biopaxRefs.forEach(function(element, index, array) {
            // do something
          //});
        }
        else {
          console.log("No element(s) named 'biopaxref' for the element 'pathway' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting biopaxRef to json: " + e.message);
      };

      // Biopax 

      try {
        if (pathway.hasOwnProperty('biopax')) {
          //do something
        }
        else {
          console.log("No element(s) named 'biopax' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting biopax to json: " + e.message);
      };

      console.log('JSON:');
      console.log(pathway);
      console.log('pathvisio.data.pathways[pathvisio.data.current.svgSelector]');
      console.log(pathvisio.data.pathways[pathvisio.data.current.svgSelector]);

      delete pathway.graphics;
      return pathvisio.data.pathways[pathvisio.data.current.svgSelector] = pathway;
    }
    else {
      alert("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.")
      console.log("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.")
      return;
    }
  };

  function get(url, mimeType, callback) {
    if (!url || !mimeType) {

      // TODO throw a proper error here

      var error = null;
      if (!url) {
        error += 'Error: URL not specified.';
      };
      if (!mimeType) {
        error += 'Error: URL not specified.';
      };
      return console.warn(error);
    }
    else {
      // be sure server has set gpml mime type to application/gpml+xml or application/gpml+xml

      d3.xml(url, "application/xml", function(gpmlDoc) {

        /* if from webservice, we would have used this code, but now, we've decided that the proper format
         * for the response (gpmlDoc) is GPML as an XML document. If the response would be anything else,
         * such as the XML document that the webservice gives as a response, the parsing and manipulation must
         * happen before calling get().

         var sGpml = gpmlDoc.getElementsByTagNameNS("http://www.wikipathways.org/webservice", "gpml")[0].textContent;
         var oParser = new DOMParser();
         var oDOM = oParser.parseFromString(sGpml, "text/xml");
         var gpml = oDOM.documentElement;

        */

        // if the response is a valid GPML document (ie, not from webservice)

        //var oSerializer = new XMLSerializer();
        //var sGpml = self.sGpml = oSerializer.serializeToString(gpmlDoc);
        var gpml = self.gpml = gpmlDoc.documentElement;
        var sGpml = null;
        console.log('GPML');
        console.log(gpml);

        pathvisio.pathway.gpml2json(gpml);
        //var sJson = self.sJson = JSON.stringify(pathvisio.data.pathways[pathvisio.data.current.svgSelector], undefined, 2);
        var sJson = null;

        callback(pathvisio.data.pathways[pathvisio.data.current.svgSelector], sGpml, sJson);
      });
    };
  };

  function draw(data){
    if (!data) {
      return console.warn('Error: No data entered as input.');
    };

    var drag = d3.behavior.drag()
    .on("drag", dragmove);

    function dragmove(d) {
      d.x=d3.event.x;
      d.y=d3.event.y;
      d3.select(this)
      .attr("x", d3.event.x)
      .attr("y", d3.event.y);
    };	

    pathvisio.data.current.svg.attr('width', data.boardWidth);
    pathvisio.data.current.svg.attr('height', data.boardHeight);

    if (!!pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopaxRefs) {
      var pathwayPublicationXrefs = pathvisio.data.current.svg.selectAll(".pathway-publication-xref-text")	
      .data(pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopaxRefs)
      .enter()
      .append("text")
      .attr("id", function (d) { return 'pathway-publication-xref-text-' + d; })
      .attr("x", 0)
      .attr("y", 0)
      .attr('transform', function(d,i) { return 'translate(' + (200 + i*12) + ' ' + 12 + ')'; })
      .attr("class", 'pathway-publication-xref-text')
      .attr("style", "")
      .text(function (d) {
        var index = 0;
        var gpmlId = null;
        do {
          gpmlId = pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.publicationXrefs[index].gpmlId;
          index += 1;
        } while (gpmlId !== d && index < pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.publicationXrefs.length);
        return index});
    };

    var symbolsAvailable = self.symbolsAvailable = pathvisio.data.current.svg.selectAll('symbol');

    var markersAvailable = markersAvailable = pathvisio.data.current.svg.selectAll('marker');

    pathvisio.pathway.group.drawAll();

    pathvisio.pathway.edge.drawAll();

    pathvisio.pathway.labelableElement.drawAll();

    pathvisio.pathway.infoBox.draw();
  };

  function load(svgSelector, url, mimeType){
    if (!!svgSelector) {
      pathvisio.data.current.svgSelector = svgSelector;
      pathvisio.data.current.svg = d3.select(svgSelector);
      var svgCount = pathvisio.data.current.svg.length;
      if (svgCount === 1) {
        console.log('Successfully loaded SVG pathway template.');
      }
      else {
        return console.warn('Error: ' + svgCount + ' SVG template(s) returned with selector "' + svgSelector + '". Please redefined selector so only 1 result is returned.');
      };
    }
    else {
      return console.warn('Error: No SVG template selector specified.');
    };

    /*
    // Use this code if you want to get the SVG using d3.xml
    pathvisio.data.current.svg = d3.select("#pathway-container").select(function() {
    return this.getSVGDocument().documentElement;
    });
    */

    if (!url) {
      return console.warn('Error: No url specified for GPML or JSON data.');
    };

    if (!mimeType) {
      mimeType = 'application/xml';
    };

    get(url, mimeType, function(data, sGpml, sJson) {
      draw(data);
    });
  };

  return {
    draw:draw,
    load:load,
    get:get,
    gpml2json:gpml2json
  }
}();
;

pathvisio.pathway.group = function(){ 
  function drawAll() {
    if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('groups')) {

      // only consider non-empty groups

      var validGroups = pathvisio.data.pathways[pathvisio.data.current.svgSelector].groups.filter(function(el) {
        var groupId = el.groupId
        return (pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements.filter(function(el) {return (el.groupRef === groupId)}).length>0)
      });
      var groupsContainer = pathvisio.data.current.svg.selectAll("use.group")	
      .data(validGroups)
      .enter()
      .append("path")
      .attr("id", function (d) { return 'group-' + d.graphId })
      .attr("class", function(d) { return 'group group-' +  d.style; })

      // We tried using symbols for the group shapes, but this wasn't possible because the symbols scaled uniformly, and the beveled corners of the complex group
      // are supposed to remain constant in size, regardless of changes in group size.

      .attr("d", function(d) {
        var groupDimensions = getDimensions(d.groupId);
        if (d.style === 'none' || d.style === 'group' || d.style === 'pathway') {
          var pathData = 'M ' + groupDimensions.x + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + groupDimensions.x + ' ' + (groupDimensions.y + groupDimensions.height) + ' Z';
        }
        else {
          if (d.style === 'complex') {
            var pathData = 'M ' + (groupDimensions.x + 20) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width - 20) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + 20) + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height - 20) + ' L ' + (groupDimensions.x + groupDimensions.width - 20) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + (groupDimensions.x + 20) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + (groupDimensions.x) + ' ' + (groupDimensions.y + groupDimensions.height - 20) + ' L ' + (groupDimensions.x) + ' ' + (groupDimensions.y + 20) + ' Z';
          }
          else {
            var pathData = 'M ' + groupDimensions.x + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + groupDimensions.y + ' L ' + (groupDimensions.x + groupDimensions.width) + ' ' + (groupDimensions.y + groupDimensions.height) + ' L ' + groupDimensions.x + ' ' + (groupDimensions.y + groupDimensions.height) + ' Z';
          };
        };
        return pathData;
      });
      //.call(drag);
    };
  };

  function getDimensions(groupId) {
    var groupMembers = pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements.filter(function(el) {return (el.groupRef === groupId)});
    var group = {};

    // I think this is margin, not padding, but I'm not sure

    var margin = 12;
    group.x = (d3.min(groupMembers, function(el) {return el.x})) - margin;
    group.y = (d3.min(groupMembers, function(el) {return el.y})) - margin;

    group.width = (d3.max(groupMembers, function(el) {return el.x + el.width})) - group.x + margin;
    group.height = (d3.max(groupMembers, function(el) {return el.y + el.height})) - group.y + margin;

    return group;
  };
 
  return { 
    drawAll:drawAll,
    getDimensions:getDimensions 
  } 
}();


;

pathvisio.pathway.infoBox = function(){ 
    
  function draw() {

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBox = [];
    if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('name')) {
      infoBox.push({'key':'Title', 'value':pathvisio.data.pathways[pathvisio.data.current.svgSelector].name});
    };

    if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('license')) {
      infoBox.push({'key':'Availability', 'value':pathvisio.data.pathways[pathvisio.data.current.svgSelector].license});
    };

    if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('lastModified')) {
      infoBox.push({'key':'Last modified', 'value':pathvisio.data.pathways[pathvisio.data.current.svgSelector].lastModified});
    };

    if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('organism')) {
      infoBox.push({'key':'Organism', 'value':pathvisio.data.pathways[pathvisio.data.current.svgSelector].organism});
    };

    var infoBoxElements = pathvisio.data.current.svg.selectAll("text.info-box")
    .data(infoBox)
    .enter()
    .append("text")
    .attr("id", function (d,i) { return "info-box-" + i; })
    .attr("class", "info-box")
    .attr("x", 0)
    .attr("y", function(d,i) {return 14 + 14 * i; });

    infoBoxElements.append("tspan")
    .attr("class", "info-box-property-name")
    .text(function (d) { return d.key + ': ' });

    infoBoxElements.append("tspan")
    .text(function (d) { return d.value });
  }; 

  return { 
    draw:draw 
  } 
}();





;

// Draw Labelable Elements. Includes data nodes, shapes, labels, cellular components...

pathvisio.pathway.labelableElement = function(){ 

  // GPML to JSON shape name mappings: { "OldName":"new-name" }
  // replace spaces with dashes
  // Add dashes before every capital letter except any capital letters at the beginning of the string
  // Replace spaces with dashes
  // Replace double dashes with single dashes
  // replace capitals letters with lowercase. 

  var shapeMappings = {
    "Arc" : "arc",
    "Brace" : "brace",
    "Cell" : "cell",
    "Endoplasmic Reticulum" : "endoplasmic-reticulum",
    "Extracellular region" : "extracellular-region",
    "Golgi Apparatus" : "golgi-apparatus",
    "Hexagon" : "hexagon",
    "mim-degradation" : "mim-degradation",
    "Mitochondria" : "mitochondria",
    "Nucleus" : "nucleus",
    "Organelle" : "organelle",
    "Oval" : "oval",
    "Pentagon" : "pentagon",
    "Rectangle" : "rectangle",
    "RoundedRectangle" : "rounded-rectangle",
    "Sarcoplasmic Reticulum" : "sarcoplasmic-reticulum",
    "Triangle" : "triangle",
    "Vesicle" : "vesicle"
  }; 

  // TODO What happens if we have right to left flowing text?

  var alignToAnchorMappings = { "Left":"start", "Center":"middle", "Right":"end" };

  function gpml2json(rawJsonLabelableElements) {
    try {

      // LabelableElements

      rawJsonLabelableElements.forEach(function(element, index, array) {
        if (element.hasOwnProperty('comment')) {
          element.comments = pathvisio.helpers.convertToArray( element.comment );
          delete element.comment;
        };

        if (element.hasOwnProperty('xref')) {
          if ((!element.xref.database) && (!element.xref.id)) {
            delete element.xref;
          }
          else {
            element.xref = element.xRef;
            delete element.xref;
          };
        };

        // Be warned that support for zIndex in SVG is spotty. It's best to rely on ordering in the DOM as well.

        if (element.graphics.hasOwnProperty("zorder")) {
          element.zIndex = parseFloat(element.graphics.zorder);
        };

        element.x = parseFloat(element.graphics.centerX) - parseFloat(element.graphics.width)/2;
        //element.x = Math.round( element.x * 100 ) / 100;

        element.y = parseFloat(element.graphics.centerY) - parseFloat(element.graphics.height)/2;
        //element.y = Math.round( element.y * 100 ) / 100;

        element.width = parseFloat(element.graphics.width);
        //element.width = Math.round( element.width * 100 ) / 100;

        element.height = parseFloat(element.graphics.height);
        //element.height = Math.round( element.height * 100 ) / 100;

        if (element.graphics.hasOwnProperty("color")) {
          var color = new RGBColor(element.graphics.color);
          if (color.ok) { 
            element.stroke = color.toHex();
          }
          else {
            console.warn('Invalid Color encountered. Setting Color to black.');
            element.fill = "#000000";
          };
        };

        if ((!(element.graphics.hasOwnProperty("shapeType")))) {
          if (element.elementType === 'data-node') {
            element.symbolType = "rectangle";
          }
          else {
            element.symbolType = "none";
          };
        }
        else {
          element.symbolType = shapeMappings[element.graphics.shapeType];
        };	

        if (element.graphics.hasOwnProperty("fillColor")) {

          // RGBColor() from http://www.phpied.com/rgb-color-parser-in-javascript/
          // license: Use it if you like it

          element.graphics.fillColor = element.graphics.fillColor.toLowerCase();

          if (element.graphics.fillColor === 'transparent') {
            element.fillOpacity = 0;
          }
          else {
            var fill = new RGBColor(element.graphics.fillColor);
            if (fill.ok) { 
              element.fill = fill.toHex();
            }
            else {
              console.warn('Invalid FillColor encountered. Setting FillColor to gray.');
              element.fill = "#999999";
            };

            if (element.symbolType !== 'none') {
              element.fillOpacity = 1;
            };
          };
        };

        if (element.graphics.hasOwnProperty("lineThickness")) {
          element.strokeWidth = element.graphics.lineThickness;
        };	

        if (element.graphics.hasOwnProperty('lineStyle')) {
          element.strokeStyle = element.graphics.lineStyle.toLowerCase();
          if (element.strokeStyle === 'broken') {
            element.strokeStyle = 'dashed';
          };
        };	

        if (element.hasOwnProperty('attribute')) {
          element.attributes = pathvisio.helpers.convertToArray( element.attribute );
          delete element.attribute;
          element.attributes.forEach(function(el, index, array) {
            if ((el.key === "org.pathvisio.DoubleLineProperty") && (el.value === "Double")) {
              console.log('double');
              console.log(el);
              element.strokeStyle = 'double';
            }
            else {
              if ((el.key === "org.pathvisio.CellularComponentProperty") && (el.value !== "None")) {
                element.cellularComponent = el.value;
              };
            };
          });
          delete element.attributes;
        };	

        if (element.graphics.hasOwnProperty("rotation")) {

          // get rotation in degrees because SVG rotate attribute uses degrees
          // http://www.w3.org/TR/SVG/coords.html#TransformAttribute

          element.rotation = element.graphics.rotation * (180 / Math.PI);
          //element.rotation = Math.round( element.rotation * 100 ) / 100;
        };	

        // textLabel data

        if (element.hasOwnProperty("textLabel")) {
          if (!element.textLabel) {
            delete element.textLabel;
          }
          else {
            var text = element.textLabel.toString().replace("&#xA;","\r\n");
            delete element.textLabel;

            element.textLabel = {};

            element.textLabel.text = text;

            if (element.hasOwnProperty("stroke")) {

              // element stroke color (referring to the color of a border or line) and text fill color appear to be the same property in the Java PathVisio code

              element.textLabel.fill = element.stroke;
            };	

            // default fontSize is already specified in the CSS of pathway-template.svg, but I need the font size
            // to calculate the vertical spacing. I could remove this if I could pull the value from the CSS.

            if (element.graphics.hasOwnProperty("fontSize")) {
              var fontSize = element.graphics.fontSize;
            }
            else {
              var fontSize = 10;
            };
            element.textLabel.fontSize = fontSize;

            if (element.graphics.hasOwnProperty("fontName")) {
              element.textLabel.fontFamily = element.graphics.fontName;
            };

            if (element.graphics.hasOwnProperty("fontWeight")) {
              element.textLabel.fontWeight = element.graphics.fontWeight.toLowerCase();
            };

            if (element.graphics.hasOwnProperty("fontStyle")) {
              element.textLabel.fontStyle = element.graphics.fontStyle.toLowerCase();
            };

            if (alignToAnchorMappings.hasOwnProperty(element.graphics.align)) {
              element.textLabel.textAnchor = alignToAnchorMappings[element.graphics.align];
            }
            else {
              element.textLabel.textAnchor = 'middle';
            };

            if (element.graphics.hasOwnProperty("valign")) {
              element.textLabel.vAlign = element.graphics.valign.toLowerCase();
            }
            else {
              element.textLabel.vAlign = 'top';
            };
          };
        };

        // BiopaxRefs 

        try {
          if (element.hasOwnProperty('biopaxRef')) {
            element.biopaxRefs = pathvisio.helpers.convertToArray( element.biopaxRef );
            delete element.biopaxRef;

            //biopaxRefs.forEach(function(element, index, array) {
            // do something
            //});
          }
          else {
            console.log("No element(s) named 'biopaxRef' found for this node in this gpml file.");
          };
        }
        catch (e) {
          console.log("Error converting node's biopaxRef to json: " + e.message);
        };

        delete element.graphics;
      });

      var validJsonLabelableElements = rawJsonLabelableElements.sort(function(a,b) {return a.zIndex - b.zIndex});
      return validJsonLabelableElements;
    }
    catch (e) {
      console.log("Error converting labelable elements to json: " + e.message);
      return e;
    };
  };

  function drawAll() {
    var labelableElementsContainer = pathvisio.data.current.svg.selectAll("g.labelable-elements-container")	
    .data(pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements)
    .enter()
    .append("g")
    .attr("id", function (d) { return 'labelable-elements-container-' + d.graphId })
    .attr('transform', function(d) { return 'translate(' + d.x + ' ' + d.y + ')'; })
    .attr("class", "labelable-elements-container")
    .on("click", function(d,i) {
      if (d.elementType === 'data-node') {
        var xrefDiv = $('.xrefinfo');

        // (id, datasource, species, symbol)

        var xrefHtml = XrefPanel.create(d.xRef.id, d.xRef.database, 'Homo sapiens', d.textLabel.text);
        //var xrefHtml = XrefPanel.create('HMDB01397', 'HMDB', 'Mus musculus', d.textLabel.text);
        window.setTimeout(function() {
          xrefDiv.empty();
          xrefDiv.append(xrefHtml);
        }, 2000);
      };
    });
    //.on("click", function(d,i) { alert(d.xRef.id); });
    //.call(drag);

    var labelableElements = labelableElementsContainer.each(function(d, i) {
      var labelableElement = d3.select(this).append('use')
      .attr("id", function (d) {return 'labelable-element-' + d.graphId})
      .attr('transform', function(d) { 
        var transform = 'none';
        if (d.hasOwnProperty('rotation')) {
          transform = 'rotate(' + d.rotation + ' ' + d.width / 2 + ' ' + d.height / 2 + ')';
        };
        return transform;
      })
      .attr("class", function (d) { 
        var styleClass = ''; 
        if (d.elementType === 'data-node') {
          styleClass = "labelable-element " + d.elementType + ' ' + d.dataNodeType; 
        }
        else {
          styleClass = "labelable-element " + d.elementType; 
        };
        return styleClass;
      })
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", function (d) { return d.width; })
      .attr("height", function (d) { return d.height; })
      .attr("z-index", function (d) { return d.zIndex; })
      .attr("style", function (d) { 
        var style = '';

        if (d.hasOwnProperty('fill')) {
          style += 'fill:' + d.fill + '; '; 
        };

        if (d.hasOwnProperty('fillOpacity')) {
          style += 'fill-opacity:' + d.fillOpacity + '; '; 
        };

        if (d.hasOwnProperty('stroke')) {
          style += 'stroke:' + d.stroke + '; '; 
        };

        if (d.hasOwnProperty('strokeWidth')) {

          // Doubling strokeWidth to create strokeWidthEffective.
          // Reason: stroke is centered on perimeter of node, requiring us to use an SVG clipping Path to clip off the outermost half
          // of the stroke so that the stroke does not go outside its bounding box. Because the outer half of the stroke is not displayed, we need to
          // double the stroke width so that the stroke's apparent width matches the value specified in GPML.

          var strokeWidthEffective = 2 * d.strokeWidth; 
        }
        else {
          var strokeWidthEffective = 2; 
        };

        style += 'stroke-width:' + strokeWidthEffective + '; '; 

        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'dashed') {
            style += 'stroke-dasharray: 5,3; '; 
          };

          if (d.strokeStyle === 'double') {

            // draw second element

            d3.select(labelableElementsContainer[0][i]).append("use")
            .attr("id", function (d) {return 'labelable-element-double' + d.graphId})
            .attr("class", function (d) { 
              var styleClass = ''; 
              if (d.elementType === 'data-node') {
                styleClass = "labelable-element " + d.elementType + ' ' + d.dataNodeType; 
              }
              else {
                styleClass = "labelable-element " + d.elementType; 
              };
              return styleClass;
            })
            .attr('transform', function(d) { 
              var transform = 'none';
              if (d.hasOwnProperty('rotation')) {

                // the reference to width and height here is to specify the center of rotation as the center of the second element

                transform = 'rotate(' + d.rotation + ' ' + (d.width/2) + ' ' + (d.height/2) + ')';
              };
              return transform;
            })
            .attr("x", function(d) {return strokeWidthEffective; })
            .attr("y", function(d) {return strokeWidthEffective; })
            .attr("width", function (d) { return d.width - 2*strokeWidthEffective; })
            .attr("height", function (d) { return d.height - 2*strokeWidthEffective; })
            .attr("xlink:xlink:href", function (d) {return "#" + d.symbolType; })
            //.attr("class", "drawing-board-color-stroke")
            .attr("style", function(d) { return style + 'fill-opacity:0; '});
          };
        };

        // be careful that all additions to 'style' go above the 'double-line second element' above
        // so that they are applied to both the first and second elements.

        return style; 
      });

      if (symbolsAvailable.filter(function(d, i) { return (symbolsAvailable[0][i].id === pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements[0].symbolType); }).length > 0) {
        // d3 bug strips 'xlink' so need to say 'xlink:xlink';
        labelableElement.attr("xlink:xlink:href", function (d) {return "#" + d.symbolType; });
      }
      else {
        labelableElement.attr("xlink:xlink:href", "#rectangle");
        console.log('Pathvisio.js does not have access to the requested symbol: ' + pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements[0].symbolType + '. Rectangle used as placeholder.');
      };

      // use this for tspan option for rendering text, including multi-line

      if (d.hasOwnProperty('textLabel')) {
        var labelableElementText = d3.select(this).append('text')
        .attr("id", function (d) { return 'labelable-element-text-' + d.graphId; })
        .attr("x", 0)
        .attr("y", 0)
        .attr('transform', function(d) {

          // tweak left, center, right horizontal alignment

          if (d.textLabel.hasOwnProperty('textAnchor')) {

            // giving padding of 5. maybe this should go into the CSS.

            if (d.textLabel.textAnchor === 'start') {
              var dx = 5;
            }
            else {
              if (d.textLabel.textAnchor === 'end') {
                var dx = d.width - 5;
              }
              else {
                var dx = d.width / 2;
              };
            };
          }
          else {
            var dx = d.width / 2;
          };

          // set top, middle, bottom vertical alignment

          if (d.textLabel.hasOwnProperty('vAlign')) {
            if (d.textLabel.vAlign === 'top') {
              var dy = 5 + (1 * d.textLabel.fontSize);
            }
            else {
              if (d.textLabel.vAlign === 'bottom') {
                var dy = d.height - (5 + (0.3 * d.textLabel.fontSize) + ((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize));
              }
              else {
                var dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
              };
            };
          }
          else {
            var dy = (d.height / 2) + (0.3 * d.textLabel.fontSize) - (((pathvisio.helpers.splitStringByNewLine(d.textLabel.text).length - 1) * d.textLabel.fontSize)/2);
          };
          return 'translate(' + dx + ' ' + dy + ')'; })
          .attr("class", function (d) { 
            var styleClass = ''; 
            if (d.elementType === 'data-node') {
              styleClass = d.dataNodeType; 
            };
            return styleClass })
            .attr("style", function (d) { 
              var style = '';
              var fontSize = d.fontSize;
              if (d.textLabel.hasOwnProperty('fill')) {
                style += 'fill:' + d.textLabel.fill + '; '; 
              };
              if (d.textLabel.hasOwnProperty('fontFamily')) {
                style += 'font-family:' + d.textLabel.fontFamily + '; '; 
              };
              if (d.textLabel.hasOwnProperty('fontSize')) {
                style += 'font-size:' + d.textLabel.fontSize + 'px; '; 
              };
              if (d.textLabel.hasOwnProperty('fontWeight')) {
                style += 'font-weight:' + d.textLabel.fontWeight + '; '; 
              };
              if (d.textLabel.hasOwnProperty('fontStyle')) {
                style += 'font-style:' + d.textLabel.fontStyle + '; '; 
              };
              if (d.textLabel.hasOwnProperty('textAnchor')) {
                style += 'text-anchor:' + d.textLabel.textAnchor + '; '; 
              };
              return style; 
            });

            var labelableElementTspan = labelableElementText.each(function(d) {
              var fontSize = d.textLabel.fontSize;
              d3.select(this).selectAll('tspan')
              .data(function (d) {
                var textArray = pathvisio.helpers.splitStringByNewLine(d.textLabel.text);
                return textArray;
              })
              .enter()
              .append('tspan')
              .attr("x", 0)
              .attr("y", function (d, i) { return i * fontSize; })
              .text(function (d) { return d; });
            });

            if (d.hasOwnProperty('biopaxRefs')) {
              var nodePublicationXrefs = d3.select(this).selectAll(".node-publication-xref-text")	
              .data(d.biopaxRefs)
              .enter()
              .append("text")
              .attr("id", function (d) { return 'node-publication-xref-text-' + d; })
              .attr("x", 0)
              .attr("y", 0)
              .attr('transform', function(d,i) { return 'translate(' + (i*12) + ' ' + (-12) + ')'; })
              .attr("class", 'node-publication-xref-text')
              .attr("style", "")
              .text(function (d) {
                var index = 0;
                var gpmlId = null;
                do {
                  gpmlId = pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.publicationXrefs[index].gpmlId;
                  index += 1;
                } while (gpmlId !== d && index < pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.publicationXrefs.length);
                return index});
            };

      };

      /*

      // use this for foreignObject object option for rendering text, including multi-line

      if (d.hasOwnProperty('textLabel')) {
      var labelableElementSwitch = d3.select(this).append('switch');

      var labelableElementForeignObject = labelableElementSwitch.append('foreignObject') 
      //.attr("x", 0)
      //.attr("y", 0)
      .attr("width", function (d) { return d.width + 'px'; })
      .attr("height", function (d) { return d.height + 'px'; });

      var labelableElementBody = labelableElementForeignObject.append('xhtml:body') 
      .attr("xmlns", "http://www.w3.org/1999/xhtml")
      .attr("id", function (d) { return 'labelable-element-text-' + d.graphId; })
      .attr("style", function (d) { return 'height:' + d.height + 'px'; });

      var labelableElementLink = labelableElementBody.append('link') 
      .attr("rel", "stylesheet")
      .attr("href", "pathways.css")
      .attr("type", "text/css");

      var labelableElementOuter = labelableElementBody.append('div') 
      .attr("class", "outer") 
      .attr("style", function (d) { return 'height:' + d.height + 'px'; });

      var labelableElementP = labelableElementOuter.append('p') 
      .attr("style", function (d) { 
      var style = 'height:' + d.height + 'px; ';
      if (d.textLabel.hasOwnProperty('color')) {
      style += 'color:' + d.textLabel.color + '; '; 
      };
      if (d.textLabel.hasOwnProperty('fontWeight')) {
      style += 'font-weight:' + d.textLabel.fontWeight + '; '; 
      };
      if (d.textLabel.hasOwnProperty('fontStyle')) {
      style += 'font-style:' + d.textLabel.fontStyle + '; '; 
      };
      return style; 
      })
      .text(function (d) {
      var text = d.textLabel.text;
      return text; 
      })
      .attr("class", function (d) { 
      var styleClass = ''; 
      if (d.elementType === 'data-node') {
      styleClass = "labelable-element " + d.elementType + ' ' + d.dataNodeType; 
      }
      else {
      styleClass = "labelable-element " + d.elementType; 
      };
      return styleClass });

      var labelableElementText = labelableElementSwitch.append('text')
      .attr("id", function (d) { return 'labelable-element-text-' + d.graphId; })
      .attr("x", function (d) { return d.width / 2; })
      .attr("y", function (d) { return d.height / 2 + 0.3 * d.textLabel.fontSize; })
      //.attr("style", function (d) { return 'stroke:' + 'red'; })
      .attr("style", function (d) { 
      var style = '';
      if (d.textLabel.hasOwnProperty('color')) {
      style += 'fill:' + d.textLabel.color + '; '; 
      };
      if (d.textLabel.hasOwnProperty('fontWeight')) {
      style += 'font-weight:' + d.textLabel.fontWeight + '; '; 
      };
      if (d.textLabel.hasOwnProperty('fontStyle')) {
      style += 'font-style:' + d.textLabel.fontStyle + '; '; 
      };
      return style; 
})
.text(function (d) { return d.textLabel.text; });

};
*/
});

};

function getPortCoordinates(boxDimensions, relX, relY) {
  var port = {};
  port.x = boxDimensions.x + (relX * boxDimensions.width);
  port.y = boxDimensions.y + (relY * boxDimensions.height);
  return port;
};

return { 
drawAll:drawAll,
          getPortCoordinates:getPortCoordinates, 
          gpml2json:gpml2json
} 
}();
;

// Edges (interactions and graphical lines)

pathvisio.pathway.edge = function(){

  // pathvisio.js vs PathVisio (Java) specification of anchor position
  // -----------------------------------------
  // pathvisio.js |  PathVisio  | Meaning
  //  relX | relY | relx | rely |
  // -----------------------------------------
  // 0.333   0      -0.5   -1.0   top side at left third-point 
  // 0.5     0       0.0   -1.0   top side at center 
  // 0.667   0       0.5   -1.0   top side at right third-point 
  // 1       0.333   1.0   -0.5   right side at top third-point 
  // 1       0.5     1.0    0.0   right side at middle 
  // 1       0.667   1.0    0.5   right side at bottom third-point 
  // 0.667   1       0.5    1.0   bottom side at right third-point 
  // 0.5     1       0.0    1.0   bottom side at center 
  // 0.333   1      -0.5    1.0   bottom side at left third-point 
  // 0       0.667  -1.0    0.5   left side at bottom third-point 
  // 0       0.5    -1.0    0.0   left side at middle 
  // 0       0.333  -1.0   -0.5   left side at top third-point 
  //
  // PathVisio (Java) also sometimes comes up with other values for relx and rely.
  // I don't know what those mean.

  var anchorPositionMappings = { "-1":0, "-0.5":0.333, "0":0.5, "0.5":0.667, "1":1 };

  // GPML to JSON shape name mappings: { "OldName":"new-name" }
  // replace spaces with dashes
  // Add dashes before every capital letter except any capital letters at the beginning of the string
  // Replace spaces with dashes
  // Replace double dashes with single dashes
  // replace capitals letters with lowercase. 

  var markerMappings = {
    "Arrow":"arrow",
    "mim-branching-left":"mim-branching-left",
    "mim-branching-right":"mim-branching-right",
    "mim-necessary-stimulation":"mim-necessary-stimulation",
    "mim-binding":"mim-binding",
    "mim-conversion":"mim-conversion",
    "mim-stimulation":"mim-stimulation",
    "mim-modification":"mim-modification",
    "mim-catalysis":"mim-catalysis",
    "mim-inhibition":"mim-inhibition",
    "mim-cleavage":"mim-cleavage",
    "mim-covalent-bond":"mim-covalent-bond",
    "mim-transcription-translation":"mim-transcription-translation",
    "mim-gap":"mim-gap",
    "None":"none",
    "TBar":"t-bar"
  };

  function gpml2json(rawJsonEdges) {
    try {
      rawJsonEdges.forEach(function(element, index, array) {
        if (element.graphics.hasOwnProperty('anchor')) {
          element.anchors = pathvisio.helpers.convertToArray(element.graphics.anchor);
        };

        if (element.graphics.hasOwnProperty('color')) {
          var color = new RGBColor(element.graphics.color);
          if (color.ok) { 
            element.stroke = color.toHex();
          }
        };	

        element.strokeWidth = element.graphics.lineThickness;

        if (element.graphics.hasOwnProperty('connectorType')) {
          element.connectorType = element.graphics.connectorType.toLowerCase();
        }	

        if (element.graphics.hasOwnProperty('lineStyle')) {
          element.strokeStyle = element.graphics.lineStyle.toLowerCase();
          if (element.strokeStyle === 'broken') {
            element.strokeStyle = 'dashed';
          };
        }	
        else {
          if (element.hasOwnProperty('attribute')) {
            if ((element.attribute.key === "org.pathvisio.DoubleLineProperty") && (element.attribute.value === "Double")) {
              element.strokeStyle = 'double';
              delete element.attribute;
            };
          };	
        };

        element.zIndex = element.graphics.zorder;

        if (element.hasOwnProperty('xref')) {
          if ((!element.xref.database) && (!element.xref.id)) {
            delete element.xref;
          }
          else {
            element.xref = element.xRef;
            delete element.xref;
          };
        };

        // Points

        var points = pathvisio.helpers.convertToArray( element.graphics.point );
        var pointsData = pathvisio.pathway.edge.point.gpml2json( points );
        element.points = pointsData.points;

        // Back to edges

        element.markerStart = pointsData.markerStart;
        element.markerEnd = pointsData.markerEnd;

        delete element.graphics;
      });

      // TODO this could be refactored to be more efficient
      // When being drawn, edges with anchors use the SVG path method path.getPointAtLength() to find endpoints. That means
      // a given path (edge) having an endpoint attached to an anchor requires that the path (edge) having that anchor be drawn
      // before the given path can be drawn. This means that sometimes the ordering of the edges in the DOM may not match the
      // z-index values specified in PathVisio. We could resort the edges after they are all drawn, but DOM operations are
      // expensive, so I will not do that unless it is required.

      rawJsonEdges.sort(function(a,b) {return a.zIndex - b.zIndex});

      // edges with anchors will come before edges without anchors

      var edgesWithAnchors = [];
      var edgesWithoutAnchors = [];
      rawJsonEdges.forEach(function(element) {
        if (!element.hasOwnProperty('anchors')) {
          edgesWithoutAnchors.push(element);
        }
        else {
          edgesWithAnchors.push(element);
        };
      });

      // edges with many anchors will probably come before edges few anchors
      // TODO Does this really help to speed things up? Need to research it.
      // I assume it does, because I think a sort like this is less expensive
      // than the processes below, but I could be wrong, because I didn't spend
      // much time on this item.

      //edgesWithAnchors.sort(function(a,b) {return b.anchors.length - a.anchors.length});

      // edges with endpoints not attached to anchors will come before edges with endpoints attached to anchors 

      function attachedToAnchor(point, edges) {
        var i = -1;
        do {
          i += 1;
          var anchor = edges[i].anchors.filter(function(element) {return element.graphId === point.graphRef})[0]
        } while (anchor === undefined && i < edges.length - 1);

        return (anchor !== undefined);
      };

      var validJsonEdges = [];
      var unsortedJsonEdges = edgesWithAnchors;

      unsortedJsonEdges.forEach(function(element, index, array) {
        if (!attachedToAnchor(element.points[0], edgesWithAnchors) && !attachedToAnchor(element.points[element.points.length - 1], edgesWithAnchors)) {
          validJsonEdges.push(element);
          array.splice(index, 1);
        };
      });

      // Recursively iterate through the list of unsorted json edges and check for whether each edge's endpoints are defined (either not attached to an anchor
      // or attached to an anchor on an edge that has already been defined in validJsonEdges. If true, add edge to validJsonEdges and remove it from unsortedJsonEdges.
      // Repeat until all edges are sorted.

      do {
        unsortedJsonEdges.forEach(function(element, index, array) {

          // TODO This is hard to read. It should be refactored.

          if (((!attachedToAnchor(element.points[0], edgesWithAnchors)) || attachedToAnchor(element.points[0], validJsonEdges)) && (attachedToAnchor(element.points[element.points.length - 1], validJsonEdges) || (!attachedToAnchor(element.points[element.points.length - 1], edgesWithAnchors)))) {
            validJsonEdges.push(element);
            array.splice(index, 1);
          };
        });
      } while (unsortedJsonEdges.length > 0);

      // add back in the edges having no anchors 
      
      validJsonEdges = validJsonEdges.concat(edgesWithoutAnchors);
      return validJsonEdges;
    }
    catch (e) {
      console.log("Error converting edge to json: " + e.message);
      return e;
    };
  };

  function drawAll() {
    if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('edges')) {
      var pathData = null;

      var edges = pathvisio.data.current.svg.selectAll("pathway.edge")
      .data(pathvisio.data.pathways[pathvisio.data.current.svgSelector].edges)
      .enter()
      .append("path")
      .attr("id", function (d) { return d.edgeType + '-' + d.graphId; })
      .attr("class", function (d) { 
        var styleClass = 'edge ' + d.edgeType + ' ';
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'dashed') {
            styleClass += " dashed-stroke"; 
          };
        };
        return styleClass; 
      })
      .attr("d", function (d) {
        pathData = pathvisio.pathway.edge.pathData.get(d);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            pathvisio.data.current.svg.append("path")
            .attr("class", d.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "drawing-board-color-stroke")
            .attr("style", "stroke-width:" + d.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisio.pathway.edge.marker.draw(d.markerStart, 'start', d.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisio.pathway.edge.marker.draw(d.markerEnd, 'end', d.stroke) + ')');
          };
        };
        return pathData; 
      })
      .attr("style", function (d) { 
        var style = 'stroke-width:' + d.strokeWidth + '; ';
        if (d.hasOwnProperty('stroke')) {
          style += 'stroke:' + d.stroke + '; '; 
        };
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * d.strokeWidth) + '; '; 
          };
        };
        return style; 
      })
      .attr("marker-start", function (d) { 
        markerStart = pathvisio.pathway.edge.marker.draw(d.markerStart, 'start', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          };
        };
        return 'url(#' + markerStart + ')'; 
      })
      .attr("marker-end", function (d) { 
        markerEnd = pathvisio.pathway.edge.marker.draw(d.markerEnd, 'end', d.stroke);
        if (d.hasOwnProperty('strokeStyle')) {
          if (d.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          };
        };
        return 'url(#' + markerEnd + ')'; 
      })
      .attr("fill", 'none');
    };
  };

  return {
    gpml2json:gpml2json,
    drawAll:drawAll
  }
}();
  
;

pathvisio.pathway.edge.marker = function(){ 
  function draw(name, position, color) {
    var markerName = '';
    if (name === 'none') {
      markerName = name;
    }
    else {

      // if it's black, use the default

      if ( (color === '#000') || (color === '#000000') || (!(color)) ) {
        markerName = name + '-' + position + '-black';
      }

      // else create a new marker with the desired color

      else {
        /*
        var pathvisio.data.pathways[pathvisio.data.current.svgSelector].svg = d3.select("#pathway-container").select(function() {
          return this.contentDocument.documentElement;
        });
        */

        var markerElementBlack = pathvisio.data.current.svg.select('marker#' + name + '-' + position + '-black');
        var markerElement = pathvisio.helpers.cloneNode(markerElementBlack[0][0]);

        // define style of marker element

        var markerElementStyle = '';

        if (markerElement[0][0].getAttribute('stroke') === 'black') {
          markerElementStyle += 'stroke:' + color + '; ';
        };

        if (markerElement[0][0].getAttribute('fill') === 'black') {
          markerElementStyle += 'fill:' + color + '; ';
        };

        markerElement[0][0].setAttribute('id', name + '-' + position + '-' + color );
        markerElement[0][0].setAttribute('style', markerElementStyle);

        markerName = name + '-' + position + '-' + color;
      };
    };
    return markerName;
  };
 
  return { 
    draw:draw 
  } 
}(); 
   




;

pathvisio.pathway.edge.point = function(){ 

  // pathvisio.js vs PathVisio (Java) specification of anchor position
  // -----------------------------------------
  // pathvisio.js |  PathVisio  | Meaning
  //  relX | relY | relX | relY |
  // -----------------------------------------
  // 0.333   0      -0.5   -1.0   top side at left third-point 
  // 0.5     0       0.0   -1.0   top side at center 
  // 0.667   0       0.5   -1.0   top side at right third-point 
  // 1       0.333   1.0   -0.5   right side at top third-point 
  // 1       0.5     1.0    0.0   right side at middle 
  // 1       0.667   1.0    0.5   right side at bottom third-point 
  // 0.667   1       0.5    1.0   bottom side at right third-point 
  // 0.5     1       0.0    1.0   bottom side at center 
  // 0.333   1      -0.5    1.0   bottom side at left third-point 
  // 0       0.667  -1.0    0.5   left side at bottom third-point 
  // 0       0.5    -1.0    0.0   left side at middle 
  // 0       0.333  -1.0   -0.5   left side at top third-point 
  //
  // PathVisio (Java) also sometimes comes up with other values for relX and relY.
  // I don't know what those mean.

  var anchorPositionMappings = { "-1":0, "-0.5":0.333, "0":0.5, "0.5":0.667, "1":1 };

  // GPML to jGPML shape name mappings: { "OldName":"new-name" }
  // replace spaces with dashes
  // Add dashes before every capital letter except any capital letters at the beginning of the string
  // Replace spaces with dashes
  // Replace double dashes with single dashes
  // replace capitals letters with lowercase. 

  var markerMappings = {
    "Arrow":"arrow",
    "mim-branching-left":"mim-branching-left",
    "mim-branching-right":"mim-branching-right",
    "mim-necessary-stimulation":"mim-necessary-stimulation",
    "mim-binding":"mim-binding",
    "mim-conversion":"mim-conversion",
    "mim-stimulation":"mim-stimulation",
    "mim-modification":"mim-modification",
    "mim-catalysis":"mim-catalysis",
    "mim-inhibition":"mim-inhibition",
    "mim-cleavage":"mim-cleavage",
    "mim-covalent-bond":"mim-covalent-bond",
    "mim-transcription-translation":"mim-transcription-translation",
    "mim-gap":"mim-gap",
    "none":"none",
    "TBar":"t-bar"
  };

  function gpml2json(rawJsonPoints) {
    try {
      var markerStart = 'none';
      var markerEnd = 'none';

      rawJsonPoints.forEach(function(element, index, array) {

        // for anchor points, the data model for a point is
        // relX, relY, [dx], [dy]
        // with dx and dy only being used for the first and last point
        //
        // "relX, relY" indicates where on the shape the anchor is located.
        //
        // Table of meanings for "relX, relY"
        // ----------------------------------
        //  relX   |   relY   | meaning
        // ----------------------------------
        // 0.333   0       top side at left third-point 
        // 0.5     0       top side at center 
        // 0.667   0       top side at right third-point 
        // 1       0.333   right side at top third-point 
        // 1       0.5     right side at middle 
        // 1       0.667   right side at bottom third-point 
        // 0.667   1       bottom side at right third-point 
        // 0.5     1       bottom side at center 
        // 0.333   1       bottom side at left third-point 
        // 0       0.667   left side at bottom third-point 
        // 0       0.5     left side at middle 
        // 0       0.333   left side at top third-point 
        //
        // "dx, dy" indicates the direction of the line relative to the shape
        //
        // Table of meanings for "dx, dy"
        // ------------------------------
        //  dx | dy | meaning
        // ------------------------------
        //   0   -1   line emanates upward from anchor 
        //   1    0   line emanates rightward from anchor 
        //   0    1   line emanates downward from anchor 
        //  -1    0   line emanates leftward from anchor 
        //
        //  adapted from jsPlumb implementation:
        //  https://github.com/sporritt/jsPlumb/wiki/anchors

        if (element.graphRef !== undefined) {
          delete element.x;
          delete element.y;

          var relX = (Math.round(element.relX * 2)/2).toString()
          element.relX = parseFloat(anchorPositionMappings[relX]);

          var relY = (Math.round(element.relY * 2)/2).toString()
          element.relY = parseFloat(anchorPositionMappings[relY]);

          if (element.relX === 0) {
            element.dx = -1;
          }
          else {
            if (element.relX === 1) {
              element.dx = 1;
            }
            else {
              if (element.relY === 0) {
                element.dy = -1;
              }
              else {
                if (element.relY === 1) {
                  element.dy = 1;
                };
              };
            };
          };
        };

        // This is probably unreliable. We need to establish a way to ensure we identify start and end markers correctly, and we should not relY on the order of elements in XML.

        if ((index === 0) && (markerMappings.hasOwnProperty(element.arrowHead))) {
          markerStart = markerMappings[element.arrowHead];
          delete element.arrowHead;
        }
        else {
          if ((index === array.length - 1) && (markerMappings.hasOwnProperty(element.arrowHead))) {
            markerEnd = markerMappings[element.arrowHead];
            delete element.arrowHead;
          }
        };
      });

      // This seems clumsy. I added it so it's clear that we are returning the points array after it has been processed.

      var validJsonPoints = rawJsonPoints;
      return { "points": validJsonPoints, "markerStart":markerStart, "markerEnd":markerEnd };
    }
    catch (e) {
      console.log("Error converting point to json: " + e.message);
      return e;
    };
  };
  function getGraphRef(point) {
    self.point=point;
    if (point.hasOwnProperty('graphRef')) {
      if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('labelableElements')) {
        var labelableElement = pathvisio.data.pathways[pathvisio.data.current.svgSelector].labelableElements.filter(function(element) {return element.graphId === point.graphRef})[0]
        if (labelableElement !== undefined) {
          return {'type':'labelableElement', 'element':labelableElement};
        };
      };

      if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('groups')) {
        var group = pathvisio.data.pathways[pathvisio.data.current.svgSelector].groups.filter(function(element) {return element.graphId === point.graphRef})[0]
        if (group !== undefined) {
          return {'type':'group', 'groupId':group.groupId};
        };
      };

      var edgesWithAnchors = pathvisio.data.pathways[pathvisio.data.current.svgSelector].edges.filter(function(element) {return element.hasOwnProperty('anchors')})
      self.edgesWithAnchors = edgesWithAnchors;
      var i = -1;
      do {
        i += 1;
        var anchor = edgesWithAnchors[i].anchors.filter(function(element) {return element.graphId === point.graphRef})[0]
      } while (anchor === undefined && i < edgesWithAnchors.length );

      return {'type':'anchor', 'element':anchor, 'edge':edgesWithAnchors[i]};

    }
    else {
      return {'type':'unconnected'};
    };
  };

  function getCoordinates(point) {
    var coordinates = {};
    var edgeTerminusRef = self.edgeTerminusRef = getGraphRef(point);
    if (edgeTerminusRef.type !== 'anchor') {
      if (edgeTerminusRef.type === 'unconnected') {
        coordinates.x = point.x;
        coordinates.y = point.y;

      }
      else {
        if (edgeTerminusRef.type === 'labelableElement') {
          var coordinates = pathvisio.pathway.labelableElement.getPortCoordinates(edgeTerminusRef.element, point.relX, point.relY);
        }
        else {
          if (edgeTerminusRef.type === 'group') {
            var groupDimensions = pathvisio.pathway.group.getDimensions(edgeTerminusRef.groupId);
            var coordinates = pathvisio.pathway.labelableElement.getPortCoordinates(groupDimensions, point.relX, point.relY);
          }
          else {
            return 'error';
          };
        };
      };
    }
    else {
      var path = d3.select("#interaction-" + edgeTerminusRef.edge.graphId)[0][0];
      var coordinates = path.getPointAtLength(edgeTerminusRef.element.position * path.getTotalLength());
    };

    return coordinates;
  };

  function isTwoPointElbow(source, target) {
    var isRightAngle = ( Math.abs(source.dx) === Math.abs(target.dy) && Math.abs(source.dy) === Math.abs(target.dx) ); 
    var sourcePasses = ( (((target.x - source.x)/Math.abs(target.x - source.x) === source.dx) || ((target.y - source.y)/Math.abs(target.y - source.y) === source.dy)) );
    var targetPasses = ( ((source.x - target.x)/Math.abs(source.x - target.x) === target.dx) || ((source.y - target.y)/Math.abs(source.y - target.y) === target.dy) );
    return ( isRightAngle && sourcePasses && targetPasses );
  }; 

  return { 
    getGraphRef:getGraphRef, 
    getCoordinates:getCoordinates, 
    isTwoPointElbow:isTwoPointElbow,
    gpml2json:gpml2json
  } 
}();
;

// TODO Rewrite the code for getting elbow and curve edge points. For reference, see these links:
//
// Elbows:
// [PathVisio Java code for elbows](http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisio.core/src/org/pathvisio/core/model/ElbowConnectorShape.java)
// [jsPlumb JavaScript implemention of elbows](https://github.com/sporritt/jsPlumb/blob/master/src/connectors-flowchart.js)
// [W3C documention on vertical and horizontal path movement - "lineto" commands - for SVG](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
//
// Bezier Curves:
// [PathVisio Java code for cubic bezier curve](http://svn.bigcat.unimaas.nl/pathvisio/trunk/modules/org.pathvisio.core/src/org/pathvisio/core/model/CurvedConnectorShape.java)
// [jsPlumb JavaScript implemention of bezier curves](https://github.com/sporritt/jsPlumb/blob/master/src/connectors-bezier.js)
// [W3C documention on cubic bezier curves for SVG](http://www.w3.org/TR/SVG/paths.html#PathDataLinetoCommands)
// There are other types of SVG curves, but I understand the Java code to use bezier curves.

pathvisio.pathway.edge.pathData = function(){ 

  function get(d) {
    var sourcePoint = d.points[0];
    var source = pathvisio.pathway.edge.point.getCoordinates(sourcePoint);

    if (sourcePoint.dx === undefined) {
      source.dx = 0;
    }
    else { 
      source.dx = sourcePoint.dx;
    };

    if (sourcePoint.dy === undefined) {
      source.dy = 0;
    }
    else { 
      source.dy = sourcePoint.dy;
    };

    var targetPoint = d.points[d.points.length - 1];
    var target = pathvisio.pathway.edge.point.getCoordinates(targetPoint);

    if (targetPoint.dx === undefined) {
      target.dx = 0;
    }
    else { 
      target.dx = targetPoint.dx;
    };

    if (targetPoint.dy === undefined) {
      target.dy = 0;
    }
    else { 
      target.dy = targetPoint.dy;
    };

    var pathData = 'M ' + source.x + ' ' + source.y;

    if ((!d.connectorType) || (d.connectorType === undefined) || (d.connectorType === 'straight')) {
      pathData += " L " + target.x + " " + target.y; 
    }
    else {

      // just a start for the elbow connector type. still need to consider several other potential configurations.
      // It doesn't make sense for an unconnected interaction or graphical line to be an elbow, so any that are
      // so specified will be drawn as segmented lines.

      if (d.connectorType === 'elbow' && d.points[0].hasOwnProperty('graphRef') && d.points[d.points.length - 1].hasOwnProperty('graphRef')) {

        function switchDirection(currentDirection) {
          if (currentDirection === 'H') {
            return 'V';
          }
          else {
            return 'H';
          };
        };

        // distance to move away from node when we can't go directly to the next node

        var step = 15;

        if (Math.abs(source.dx) === 1) {
          currentDirection = 'H';
        }
        else {
          currentDirection = 'V';
        };

        //if (d.points.length === 2) {
        //doesn't quite work yet, so this works for most cases

        if (( d.points.length === 2 && pathvisio.pathway.edge.point.isTwoPointElbow(source, target)) ) {
        }
        else {
          if ( d.points.length > 2 ) {
            d.points.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length - 1))) {
                if (currentDirection === 'H') {
                  pathData += ' ' + currentDirection + ' ' + element.x; 
                }
                else {
                  pathData += ' ' + currentDirection + ' ' + element.y; 
                };
                currentDirection = switchDirection(currentDirection);
              };
            });
          }
          else {
            //if (source.dx === ((source.x - target.x) / Math.abs(source.x - target.x)) || source.dx === target.dy || source.dy === target.dx) {
            if (Math.abs(source.dx) === 1) {
              pathData += " H " + (source.x + source.dx * 15); 
            }
            else {
              //if (source.dy === ((source.y - target.y) / Math.abs(source.y - target.y)) || source.dx === target.dy || source.dy === target.dx) {
              if (Math.abs(source.dy) === 1) {
                pathData += " V " + (source.y + source.dy * 15); 
                currentDirection = switchDirection(currentDirection);
              };
            };

            if (target.dx === ((target.x - source.x) / Math.abs(target.x - source.x)) || source.dx === target.dy || source.dy === target.dx) {
              //if (Math.abs(target.dx) === 1) {
              pathData += " H " + (target.x + target.dx * 15) + ' V ' + target.y + ' H ' + target.x; 
              currentDirection = switchDirection(currentDirection);
            }
            else {
              if (target.dy === ((target.y - source.y) / Math.abs(target.y - source.y)) || source.dx === target.dy || source.dy === target.dx) {
                //if (Math.abs(target.dy) === 1) {
                pathData += " V " + (target.y + target.dy * 15) + ' H ' + target.x + ' V ' + target.y; 
                currentDirection = switchDirection(currentDirection);
              };
            };
          };
        };

        if (currentDirection === 'H') {
          pathData += ' ' + currentDirection + ' ' + target.x; 
          currentDirection = switchDirection(currentDirection);
          pathData += ' ' + currentDirection + ' ' + target.y; 
          currentDirection = switchDirection(currentDirection);
        }
        else {
          pathData += ' ' + currentDirection + ' ' + target.y; 
          currentDirection = switchDirection(currentDirection);
          pathData += ' ' + currentDirection + ' ' + target.x; 
          currentDirection = switchDirection(currentDirection);
        };

        /*
           if (Math.abs(target.dx) === 1) {
           pathData += " V " + target.y + " H " + target.x; 
           console.log('pathData');
           console.log(pathData);
           }
           else {
           pathData += " H " + target.x + " V " + target.y; 
           console.log('pathData');
           console.log(pathData);
           };
           */
      }
      else {
        if (d.connectorType === 'segmented') {
          d.points.forEach(function(element, index, array) {
            if ((index > 0) && (index < (array.length -1))) {
              pathData += " L " + element.x + " " + element.y; 
            };
          });
          pathData += " L " + target.x + " " + target.y; 
        }
        else {
          if (d.connectorType === 'curved') {
            if (d.points.length === 3) {

              // what is here is just a starting point. It has not been tested to match the PathVisio (Java) implementation.

              var pointControl = d.points[1];

              pathData += " S" + pointControl.x + "," + pointControl.y + " " + target.x + "," + target.y; 
              return pathData;
            }
            else {

              // Some of the curved connector types only have two points. I don't know which function is used in these cases. For now, I approximated with a smooth quadratic bezier.

              pathData += " T" + target.x + "," + target.y; 
              return pathData;
            };
          }
          else {
            console.log('Warning: pathvisio.js does not support connector type: ' + d.connectorType);
            d.points.forEach(function(element, index, array) {
              if ((index > 0) && (index < (array.length -1))) {
                pathData += " L " + element.x + " " + element.y; 
              };
            });
            pathData += " L " + target.x + " " + target.y; 
          };
        };
      };
    };
    return pathData;
  };
 
  return { 
    get:get
  } 
}();
