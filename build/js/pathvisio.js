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
  dotCase:dotCase,
  classCase:classCase,
  namespaceCase:namespaceCase,
  constantCase:constantCase,
  camelCase:camelCase,
  titleCase:titleCase,
  snakeCase:snakeCase,
  pathCase:pathCase,
  paramCase:paramCase
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
 * Text or CDATA value will always be inside a "Text" property (i.e. myNodeObj.Text == <myNodeObj>Hello</myNodeObj> - Hello)
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
            Text: 3,
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
            if(xdoc.nodeType === NODE_TYPES.Text || xdoc.nodeType === NODE_TYPES.CDATA) {
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
                    case NODE_TYPES.Text:
                        //If parent node has both CDATA and Text nodes, we just concatinate them together
                        buff.Text = buff.Text ? buff.Text + child.nodeValue.trim() : child.nodeValue.trim();
                        break;
                    case NODE_TYPES.CDATA:
                        //If parent node has both CDATA and Text nodes, we just concatinate them together
                        value = child[child.text ? "text" : "nodeValue"]; //IE attributes support
                        buff.Text = buff.Text ? buff.Text + value : value;
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
      console.warn('Warning: URL parameter is null.');
      return null;
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
    convertToArray:convertToArray,
    getUrlParam:getUrlParam
  }
}();



;

pathvisio.pathway = function(){

  // first pass GPML (pathway XML) through an automatic XML to JSON converter, 
  // then make specific modifications to make the JSON well-formatted, then return the JSON

  function gpml2json(gpml, callback){

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    self.gpml = gpml;
    console.log('GPML')
    console.log(gpml)
    
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

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisio.js). As of this writing, the latest version is 2013a.

      if (xmlns != gpmlXmlnsSupported) {

        // preferably, this would call the Java RPC updater for the file to be updated.

        alert("Pathvisio.js may not fully support the version of GPML provided (xmlns: " + xmlns + "). Please convert to the supported version of GPML (xmlns: " + gpmlXmlnsSupported + ").")
      };

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

      // GPML to JSON shape name mappings: { "OldName":"new-name" }
      // replace spaces with dashes
      // Add dashes before every capital letter except any capital letters at the beginning of the string
      // Replace double dashes with single dashes
      // replace capitals letters with lowercase. 
      // TODO use caseConverter.paramCase() instead of this mapping. Eventually, implement and enforce conventions for GPML data node type names

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
                element.xRef = element.xref;
                delete element.xref;
              };
            };
          });

          if (pathway.hasOwnProperty('nodes')) {
            pathway.nodes = pathway.nodes.concat(dataNodes);
          }
          else {
            pathway.nodes = dataNodes;
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

          if (pathway.hasOwnProperty('nodes')) {
            pathway.nodes = pathway.nodes.concat(labels);
          }
          else {
            pathway.nodes = labels;
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

          if (pathway.hasOwnProperty('nodes')) {
            pathway.nodes = pathway.nodes.concat(shapes);
          }
          else {
            pathway.nodes = shapes;
          };
        }
        else {
          console.log("No element(s) named 'shape' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting shape to json: " + e.message);
      };

      // Nodes

      try {
        if (pathway.hasOwnProperty('nodes')) {
          pathway.nodes = pathvisio.pathway.node.gpml2json(pathway.nodes);
        }
        else {
          console.log("No element(s) named 'nodes' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting nodes to json: " + e.message);
      };

      // BiopaxRefs 

      try {
        if (pathway.hasOwnProperty('biopaxRef')) {
          pathway.biopaxRefs = pathvisio.helpers.convertToArray( pathway.biopaxRef );
          delete pathway.biopaxRef;

          //biopaxRefs.forEach(function(element, index, array) {
            // do something
          //});
        }
        else {
          console.log("No element(s) named 'biopaxRef' for the element 'pathway' found in this gpml file.");
        };
      }
      catch (e) {
        console.log("Error converting biopaxRef to json: " + e.message);
      };

      // Biopax 

      try {
        if (pathway.hasOwnProperty('biopax')) {
          pathway.biopax.bpPublicationXrefs = pathvisio.helpers.convertToArray( pathway.biopax.bpPublicationXref );
          delete pathway.biopax.bpPublicationXref;
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
      pathvisio.data.pathways[pathvisio.data.current.svgSelector] = pathway;
      callback(pathvisio.data.pathways[pathvisio.data.current.svgSelector] = pathway);
    }
    else {
      alert("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.")
      console.log("Pathvisio.js does not support the data format provided. Please convert to GPML and retry.")
      return;
    }
  };

  // get GPML (pathway XML) from WikiPathways (by ID) or a URL (could be a local file or any other accessible GPML source),
  // convert to formatted JSON and return the JSON to the function that called getJson()

  function getJson(url, mimeType, callback) {
    if (!url) {

      // TODO throw a proper error here

      var error = 'Error: URL not specified.';
      console.warn(error);
      return error;
    }
    else {

      // be sure server has set gpml mime type to application/xml or application/gpml+xml

      if (!mimeType) {
        mimeType = 'application/xml';
      };

      if (!pathvisio.data.current.svgSelector) {
        pathvisio.data.current.svgSelector = new Date().toString();
      };


      // I would prefer to use d3.xml for the http request in order to not depend on jQuery,
      // but d3.xml doesn't seem to work with IE8. TODO remove dependency on jQuery

      console.log('callback');
      console.log(callback);

      $.get(url, mimeType, function(data) {
        pathvisio.pathway.gpml2json(data, function(json) {
          callback(json);
        });
      });
    };
  };

  function draw(data){
    if (!data) {
      console.warn('Error: No data entered as input.');
      return 'Error';
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
      var pathwayPublicationXrefs = pathvisio.data.current.svg.select('#viewport').selectAll(".pathway-publication-xref-text")	
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

        // d is an array of biopaxRefs. There are several IDs for biopaxRefs, but rdfId (rdf:id) is the one used for
        // GPML to link pathway elements with biopaxRefs.
        // TODO I set rdfId to null here because I think not doing so could result in errors if the rdfId value for
        // a previous instance of biopaxRefs had a value that was used when evaluating a later instance

        var index = 0;
        var rdfId = null;
        do {
          rdfId = pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.bpPublicationXrefs[index].rdfId;
          index += 1;
        } while (rdfId !== d.Text && index < pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.bpPublicationXrefs.length);
        return index});
    };

    var symbolsAvailable = self.symbolsAvailable = pathvisio.data.current.svg.selectAll('symbol');

    var markersAvailable = markersAvailable = pathvisio.data.current.svg.selectAll('marker');

    pathvisio.pathway.group.drawAll();

    pathvisio.pathway.edge.drawAll();

    pathvisio.pathway.node.drawAll();

    pathvisio.pathway.infoBox.draw();
  };

  // get JSON and draw SVG representation of pathway

  function load(svgSelector, url, mimeType){
    if (!!svgSelector) {
      pathvisio.data.current.svgSelector = svgSelector;
      pathvisio.data.current.svg = d3.select(svgSelector);
      var svgCount = pathvisio.data.current.svg.length;
      if (svgCount === 1) {
        console.log('Successfully loaded SVG pathway template.');
      }
      else {
        console.warn('Error: ' + svgCount + ' SVG template(s) returned with selector "' + svgSelector + '". Please redefined selector so only 1 result is returned.');
        return 'Error';
      };
    }
    else {
      console.warn('Error: No SVG template selector specified.');
      return 'Error';
    };

    /*
    // Use this code if you want to get the SVG using d3.xml.
    // I think this would be used if the SVG were included in the document as an embedded object instead of included directly in the DOM.
    pathvisio.data.current.svg = d3.select("#pathway-container").select(function() {
      return this.getSVGDocument().documentElement;
    });
    */

    if (!url) {
      console.warn('Error: No url specified for GPML or JSON data.');
      return 'No URL specified.';
    };

    getJson(url, null, function(data, sGpml, sJson) {
      draw(data);
    });
  };

  return {
    draw:draw,
    load:load,
    getJson:getJson,
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
        return (pathvisio.data.pathways[pathvisio.data.current.svgSelector].nodes.filter(function(el) {return (el.groupRef === groupId)}).length>0)
      });
      var groupsContainer = pathvisio.data.current.svg.select('#viewport').selectAll("use.group")	
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
    var groupMembers = pathvisio.data.pathways[pathvisio.data.current.svgSelector].nodes.filter(function(el) {return (el.groupRef === groupId)});
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

    var infoBoxElements = pathvisio.data.current.svg.select('#viewport').selectAll("text.info-box")
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

// Draw nodes. Includes data nodes, shapes, labels, cellular components...

pathvisio.pathway.node = function(){ 

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

  function gpml2json(rawJsonNodes) {
    try {

      // Nodes

      rawJsonNodes.forEach(function(element, index, array) {
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

      var validJsonNodes = rawJsonNodes.sort(function(a,b) {return a.zIndex - b.zIndex});
      return validJsonNodes;
    }
    catch (e) {
      console.log("Error converting labelable elements to json: " + e.message);
      return e;
    };
  };

  function drawAll() {
    var nodesContainer = pathvisio.data.current.svg.select('#viewport').selectAll("g.nodes-container")	
    .data(pathvisio.data.pathways[pathvisio.data.current.svgSelector].nodes)
    .enter()
    .append("g")
    .attr("id", function (d) { return 'nodes-container-' + d.graphId })
    .attr('transform', function(d) { return 'translate(' + d.x + ' ' + d.y + ')'; })
    .attr("class", "nodes-container")
    .on("click", function(d,i) {
      if (d.elementType === 'data-node') {
        pathvisio.pathway.xRef.displayData(d.graphId);
      };
        /*
        var xrefDiv = $('.xrefinfo');

        // (id, datasource, species, symbol)

        var xrefHtml = XrefPanel.create(d.xRef.id, d.xRef.database, 'Homo sapiens', d.textLabel.text);
        //var xrefHtml = XrefPanel.create('HMDB01397', 'HMDB', 'Mus musculus', d.textLabel.text);
        window.setTimeout(function() {
          xrefDiv.empty();
          xrefDiv.append(xrefHtml);
        }, 2000);
        //*/
  });

    var nodes = nodesContainer.each(function(d, i) {
      var node = d3.select(this).append('use')
      .attr("id", function (d) {return 'node-' + d.graphId})
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
          styleClass = "node " + d.elementType + ' ' + d.dataNodeType; 
        }
        else {
          styleClass = "node " + d.elementType; 
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

            d3.select(nodesContainer[0][i]).append("use")
            .attr("id", function (d) {return 'node-double' + d.graphId})
            .attr("class", function (d) { 
              var styleClass = ''; 
              if (d.elementType === 'data-node') {
                styleClass = "node " + d.elementType + ' ' + d.dataNodeType; 
              }
              else {
                styleClass = "node " + d.elementType; 
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

      if (symbolsAvailable.filter(function(d, i) { return (symbolsAvailable[0][i].id === pathvisio.data.pathways[pathvisio.data.current.svgSelector].nodes[0].symbolType); }).length > 0) {
        // d3 bug strips 'xlink' so need to say 'xlink:xlink';
        node.attr("xlink:xlink:href", function (d) {return "#" + d.symbolType; });
      }
      else {
        node.attr("xlink:xlink:href", "#rectangle");
        console.log('Pathvisio.js does not have access to the requested symbol: ' + pathvisio.data.pathways[pathvisio.data.current.svgSelector].nodes[0].symbolType + '. Rectangle used as placeholder.');
      };

      // use this for tspan option for rendering text, including multi-line

      if (d.hasOwnProperty('textLabel')) {
        var nodeText = d3.select(this).append('text')
        .attr("id", function (d) { return 'node-text-' + d.graphId; })
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

            var nodeTspan = nodeText.each(function(d) {
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

                // d is an array of biopaxRefs

                var index = 0;
                var rdfId = null;
                do {
                  console.log('pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax');
                  console.log(pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax);
                  rdfId = pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.bpPublicationXrefs[index].rdfId;
                  index += 1;
                } while (rdfId !== d.Text && index < pathvisio.data.pathways[pathvisio.data.current.svgSelector].biopax.bpPublicationXrefs.length);
                return index});
            };

      };

      /*

      // use this for foreignObject object option for rendering text, including multi-line

      if (d.hasOwnProperty('textLabel')) {
      var nodeSwitch = d3.select(this).append('switch');

      var nodeForeignObject = nodeSwitch.append('foreignObject') 
      //.attr("x", 0)
      //.attr("y", 0)
      .attr("width", function (d) { return d.width + 'px'; })
      .attr("height", function (d) { return d.height + 'px'; });

      var nodeBody = nodeForeignObject.append('xhtml:body') 
      .attr("xmlns", "http://www.w3.org/1999/xhtml")
      .attr("id", function (d) { return 'node-text-' + d.graphId; })
      .attr("style", function (d) { return 'height:' + d.height + 'px'; });

      var nodeLink = nodeBody.append('link') 
      .attr("rel", "stylesheet")
      .attr("href", "pathways.css")
      .attr("type", "text/css");

      var nodeOuter = nodeBody.append('div') 
      .attr("class", "outer") 
      .attr("style", function (d) { return 'height:' + d.height + 'px'; });

      var nodeP = nodeOuter.append('p') 
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
      styleClass = "node " + d.elementType + ' ' + d.dataNodeType; 
      }
      else {
      styleClass = "node " + d.elementType; 
      };
      return styleClass });

      var nodeText = nodeSwitch.append('text')
      .attr("id", function (d) { return 'node-text-' + d.graphId; })
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

      var edges = pathvisio.data.current.svg.select('#viewport').selectAll("pathway.edge")
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

            pathvisio.data.current.svg.select('#viewport').append("path")
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
      if (pathvisio.data.pathways[pathvisio.data.current.svgSelector].hasOwnProperty('nodes')) {
        var node = pathvisio.data.pathways[pathvisio.data.current.svgSelector].nodes.filter(function(element) {return element.graphId === point.graphRef})[0]
        if (node !== undefined) {
          return {'type':'node', 'element':node};
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
        if (edgeTerminusRef.type === 'node') {
          var coordinates = pathvisio.pathway.node.getPortCoordinates(edgeTerminusRef.element, point.relX, point.relY);
        }
        else {
          if (edgeTerminusRef.type === 'group') {
            var groupDimensions = pathvisio.pathway.group.getDimensions(edgeTerminusRef.groupId);
            var coordinates = pathvisio.pathway.node.getPortCoordinates(groupDimensions, point.relX, point.relY);
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
;

pathvisio.pathway.xRef = function(){ 

  var dataSources = [{"database":"Affy","id":"X","url":"https://www.affymetrix.com/LinkServlet?probeset=$id","name":"Affymetrix Probeset"},
    {"database":"Agilent","id":"Ag","url":"","name":"Agilent"},
    {"database":"BIND","id":"Bi","url":"http://www.bind.ca/Action?identifier=bindid&idsearch=$id","name":"BIND"},
    {"database":"BioCyc","id":"Bc","url":"http://biocyc.org/getid?id=$id","name":"BioCyc"},
    {"database":"BioGrid","id":"Bg","url":"http://thebiogrid.org/$id","name":"BioGRID"},
    {"database":"BioModels Database","id":"Bm","url":"http://www.ebi.ac.uk/biomodels-main/$id","name":"BioModels Database"},
    {"database":"BioSystems","id":"Bs","url":"http://www.ncbi.nlm.nih.gov/biosystems/$id","name":"BioSystems"},
    {"database":"BRENDA","id":"Br","url":"http://www.brenda-enzymes.org/php/result_flat.php4?ecno=$id","name":"BRENDA"},
    {"database":"CAS","id":"Ca","url":"http://commonchemistry.org/ChemicalDetail.aspx?ref=$id","name":"CAS"},
    {"database":"CCDS","id":"Cc","url":"http://www.ncbi.nlm.nih.gov/CCDS/CcdsBrowse.cgi?REQUEST=ALLFIELDS&DATA=$id","name":"CCDS"},
    {"database":"ChEBI","id":"Ce","url":"http://www.ebi.ac.uk/chebi/searchId.do?chebiId=$id","name":"ChEBI"},
    {"database":"Chemspider","id":"Cs","url":"http://www.chemspider.com/Chemical-Structure.$id.html","name":"ChemSpider"},
    {"database":"CodeLink","id":"Ge","url":"","name":"CodeLink"},
    {"database":"Database of Interacting Proteins","id":"Dip","url":"http://dip.doe-mbi.ucla.edu/dip/DIPview.cgi?ID=$id","name":"Database of Interacting Proteins"},
    {"database":"dbSNP","id":"Sn","url":"http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=$id","name":"dbSNP"},
    {"database":"DrugBank","id":"Dr","url":"http://www.drugbank.ca/drugs/$id","name":"DrugBank"},
    {"database":"EcoCyc","id":"Eco","url":"http://ecocyc.org/ECOLI/NEW-IMAGE?type=NIL&object=$id","name":"EcoCyc"},
    {"database":"EcoGene","id":"Ec","url":"http://ecogene.org/geneInfo.php?eg_id=$id","name":"EcoGene"},
    {"database":"EMBL","id":"Em","url":"http://www.ebi.ac.uk/ena/data/view/$id","name":"European Nucleotide Archive"},
    {"database":"Ensembl","id":"En","url":"http://www.ensembl.org/id/$id","name":"Ensembl"},
    {"database":"Ensembl B. subtilis","id":"EnBs","url":"http://bacteria.ensembl.org/Bacillus/B_subtilis/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl C. elegans","id":"EnCe","url":"http://www.ensembl.org/Caenorhabditis_elegans/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Chicken","id":"EnGg","url":"http://www.ensembl.org/Gallus_gallus/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Chimp","id":"EnPt","url":"http://www.ensembl.org/Pan_troglodytes/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Cow","id":"EnBt","url":"http://www.ensembl.org/Bos_taurus/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Dog","id":"EnCf","url":"http://www.ensembl.org/Canis_familiaris/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl E. coli","id":"EnEc","url":"http://bacteria.ensembl.org/Escherichia_Shigella/E_coli_K12/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Fruitfly","id":"EnDm","url":"http://www.ensembl.org/Drosophila_melanogaster/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Horse","id":"EnQc","url":"http://www.ensembl.org/Equus_caballus/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Human","id":"EnHs","url":"http://www.ensembl.org/Homo_sapiens/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl M. tuberculosis","id":"EnMx","url":"http://bacteria.ensembl.org/Mycobacterium/M_tuberculosis_H37Rv/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Mosquito","id":"EnAg","url":"http://www.ensembl.org/Anopheles_gambiae/Gene/Summary?_q=$id","name":"Ensembl"},
    {"database":"Ensembl Mouse","id":"EnMm","url":"http://www.ensembl.org/Mus_musculus/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Pig","id":"EnSs","url":"http://www.ensembl.org/Sus_scrofa/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Plants","id":"EP","url":"http://plants.ensembl.org/id/$id","name":"Ensembl Plants"},
    {"database":"Ensembl Rat","id":"EnRn","url":"http://www.ensembl.org/Rattus_norvegicus/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Xenopus","id":"EnXt","url":"http://www.ensembl.org/Xenopus_tropicalis/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Yeast","id":"EnSc","url":"http://www.ensembl.org/Saccharomyces_cerevisiae/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Zebrafish","id":"EnDr","url":"http://www.ensembl.org/Danio_rerio/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Entrez Gene","id":"L","url":"http://www.ncbi.nlm.nih.gov/gene/$id","name":"Entrez Gene"},
    {"database":"Enzyme Nomenclature","id":"E","url":"http://www.ebi.ac.uk/intenz/query?cmd=SearchEC&ec=$id","name":"Enzyme Nomenclature"},
    {"database":"FlyBase","id":"F","url":"http://flybase.org/reports/$id.html","name":"FlyBase"},
    {"database":"GenBank","id":"G","url":"http://www.ncbi.nlm.nih.gov/nuccore/$id","name":"GenBank"},
    {"database":"Gene Wiki","id":"Gw","url":"http://plugins.biogps.org/cgi-bin/wp.cgi?id=$id","name":"Gene Wiki"},
    {"database":"GeneOntology","id":"T","url":"http://www.ebi.ac.uk/QuickGO/GTerm?id=$id","name":"Gene Ontology"},
    {"database":"Gramene Arabidopsis","id":"EnAt","url":"http://www.gramene.org/Arabidopsis_thaliana/Gene/Summary?g=$id","name":"Grameen Arabidopsis"},
    {"database":"Gramene Genes DB","id":"Gg","url":"http://www.gramene.org/db/genes/search_gene?acc=$id","name":"Gramene Genes"},
    {"database":"Gramene Literature","id":"Gl","url":"http://www.gramene.org/db/literature/pub_search?ref_id=$id","name":"Gramene Literature"},
    {"database":"Gramene Maize","id":"EnZm","url":"http://www.maizesequence.org/Zea_mays/Gene/Summary?g=$id","name":"Gramene Maize"},
    {"database":"Gramene Pathway","id":"Gp","url":"","name":"Gramene Pathway"},
    {"database":"Gramene Rice","id":"EnOj","url":"http://www.gramene.org/Oryza_sativa/Gene/Summary?db=core;g=$id","name":"Gramene Rice"},
    {"database":"HGNC","id":"H","url":"http://www.genenames.org/data/hgnc_data.php?match=$id","name":"HGNC Symbol"},
    {"database":"HGNC Accession number","id":"Hac","url":"http://www.genenames.org/data/hgnc_data.php?hgnc_id=$id","name":"HGNC"},
    {"database":"HMDB","id":"Ch","url":"http://www.hmdb.ca/metabolites/$id","name":"HMDB"},
    {"database":"HomoloGene","id":"Hg","url":"http://www.ncbi.nlm.nih.gov/homologene/$id","name":"HomoloGene"},
    {"database":"HPRD","id":"Hp","url":"","name":"HPRD"},
    {"database":"Illumina","id":"Il","url":"","name":"Illumina"},
    {"database":"IntAct","id":"Ia","url":"http://www.ebi.ac.uk/intact/pages/details/details.xhtml?interactionAc=$id","name":"IntAct"},
    {"database":"InterPro","id":"I","url":"http://www.ebi.ac.uk/interpro/DisplayIproEntry?ac=$id","name":"InterPro"},
    {"database":"IPI","id":"Ip","url":"http://www.ebi.ac.uk/cgi-bin/dbfetch?db=IPI&id=$id&format=default","name":"IPI"},
    {"database":"IRGSP Gene","id":"Ir","url":"","name":"IRGSP Gene"},
    {"database":"Kegg Compound","id":"Ck","url":"http://www.genome.jp/dbget-bin/www_bget?cpd:$id","name":"KEGG Compound"},
    {"database":"KEGG Drug","id":"Kd","url":"http://www.genome.jp/dbget-bin/www_bget?dr:$id","name":"KEGG Drug"},
    {"database":"KEGG Genes","id":"Kg","url":"http://www.genome.jp/dbget-bin/www_bget?$id","name":"KEGG Genes"},
    {"database":"KEGG Glycan","id":"Kgl","url":"http://www.genome.jp/dbget-bin/www_bget?gl:$id","name":"KEGG Glycan"},
    {"database":"KEGG Pathway","id":"Kp","url":"http://www.genome.jp/dbget-bin/www_bget?pathway+$id","name":"KEGG Pathway"},
    {"database":"KEGG Reaction","id":"Kr","url":"http://www.genome.jp/dbget-bin/www_bget?rn:$id","name":"KEGG Reaction"},
    {"database":"LIPID MAPS","id":"Lm","url":"http://www.lipidmaps.org/data/get_lm_lipids_dbgif.php?LM_ID=$id","name":"LIPID MAPS"},
    {"database":"LipidBank","id":"Lb","url":"http://lipidbank.jp/cgi-bin/detail.cgi?id=$id","name":"LipidBank"},
    {"database":"MACiE","id":"Ma","url":"http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/MACiE/entry/getPage.pl?id=$id","name":"MACiE"},
    {"database":"MaizeGDB","id":"Mg","url":"http://www.maizegdb.org/cgi-bin/displaylocusresults.cgi?term=$id","name":"MaizeGDB"},
    {"database":"MatrixDB","id":"Md","url":"http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=$id&class=Association","name":"MatrixDB"},
    {"database":"MetaCyc","id":"Mc","url":"http://www.metacyc.org/META/NEW-IMAGE?type=NIL&object=$id","name":"MetaCyc"},
    {"database":"MGI","id":"M","url":"http://www.informatics.jax.org/marker/$id","name":"Mouse Genome Database"},
    {"database":"MINT","id":"Mi","url":"http://mint.bio.uniroma2.it/mint/search/inFrameInteraction.do?interactionAc=$id","name":"MINT"},
    {"database":"miRBase mature sequence","id":"Mbm","url":"http://www.mirbase.org/cgi-bin/mature.pl?mature_acc=$id","name":"miRBase mature sequence"},
    {"database":"miRBase Sequence","id":"Mb","url":"http://microrna.sanger.ac.uk/cgi-bin/sequences/mirna_entry.pl?acc=$id","name":"miRBase Sequence"},
    {"database":"NASC Gene","id":"N","url":"","name":"NASC Gene"},
    {"database":"NCBI Protein","id":"Np","url":"http://www.ncbi.nlm.nih.gov/protein/$id","name":"NCBI Protein"},
    {"database":"NCI Pathway Interaction Database","id":"Pid","url":"http://pid.nci.nih.gov/search/pathway_landing.shtml?what=graphic&jpg=on&pathway_id=$id","name":"NCI Pathway Interaction Database"},
    {"database":"NuGO wiki","id":"Nw","url":"http://wiki.nugo.org/index.php/$id","name":"NuGO wiki"},
    {"database":"OMIM","id":"Om","url":"http://omim.org/entry/$id","name":"OMIM"},
    {"database":"Oryzabase","id":"Ob","url":"http://www.shigen.nig.ac.jp/rice/oryzabase/gateway/gatewayAction.do?target=symbol&id=$id","name":"Oryzabase"},
    {"database":"Other","id":"O","url":"","name":"Other"},
    {"database":"Pathway Commons","id":"Pc","url":"http://www.pathwaycommons.org/pc/record2.do?id=$id","name":"Pathway Commons"},
    {"database":"PDB","id":"Pd","url":"http://www.rcsb.org/pdb/explore/explore.do?structureId=$id","name":"Protein Data Bank"},
    {"database":"Pfam","id":"Pf","url":"http://pfam.sanger.ac.uk/family/$id/","name":"Pfam"},
    {"database":"PharmGKB Drug","id":"Pgd","url":"http://www.pharmgkb.org/drug/$id","name":"PharmGKB Drug"},
    {"database":"PharmGKB Gene","id":"Pgg","url":"http://www.pharmgkb.org/gene/$id","name":"PharmGKB Gene"},
    {"database":"PharmGKB Pathways","id":"Pgp","url":"http://www.pharmgkb.org/pathway/$id","name":"PharmGKB Pathways"},
    {"database":"PhosphoSite Protein","id":"Pp","url":"http://www.phosphosite.org/proteinAction.do?id=$id","name":"PhosphoSite Protein"},
    {"database":"PINA","id":"Pi","url":"http://cbg.garvan.unsw.edu.au/pina/interactome.oneP.do?ac=$id&showExtend=null","name":"PINA"},
    {"database":"PlantGDB","id":"Pl","url":"","name":"PlantGDB"},
    {"database":"PubChem-bioassay","id":"Cpb","url":"http://pubchem.ncbi.nlm.nih.gov/assay/assay.cgi?aid=$id","name":"PubChem-bioassay"},
    {"database":"PubChem-compound","id":"Cpc","url":"http://pubchem.ncbi.nlm.nih.gov/summary/summary.cgi?cid=$id","name":"PubChem-compound"},
    {"database":"PubChem-substance","id":"Cps","url":"http://pubchem.ncbi.nlm.nih.gov/summary/summary.cgi?sid=$id","name":"PubChem-substance"},
    {"database":"Reactome","id":"Re","url":"http://www.reactome.org/cgi-bin/eventbrowser_st_id?FROM_REACTOME=1&ST_ID=$id","name":"Reactome"},
    {"database":"RefSeq","id":"Q","url":"http://www.ncbi.nlm.nih.gov/entrez/viewer.fcgi?val=$id","name":"RefSeq"},
    {"database":"RESID","id":"Res","url":"http://srs.ebi.ac.uk/srsbin/cgi-bin/wgetz?-id+6JSUg1NA6u4+-e+[RESID:'$id']","name":"RESID"},
    {"database":"Rfam","id":"Rf","url":"http://www.sanger.ac.uk/cgi-bin/Rfam/getacc?$id","name":"RFAM"},
    {"database":"RGD","id":"R","url":"http://rgd.mcw.edu/tools/genes/genes_view.cgi?id=$id","name":"Rat Genome Database"},
    {"database":"Rhea","id":"Rh","url":"http://www.ebi.ac.uk/rhea/reaction.xhtml?id=$id","name":"Rhea"},
    {"database":"Rice Ensembl Gene","id":"Os","url":"http://www.gramene.org/Oryza_sativa/geneview?gene=$id","name":"Rice Ensembl Gene"},
    {"database":"SGD","id":"D","url":"http://www.yeastgenome.org/cgi-bin/locus.fpl?dbid=$id","name":"SGD"},
    {"database":"Small Molecule Pathway Database","id":"Sm","url":"http://pathman.smpdb.ca/pathways/$id/pathway","name":"Small Molecule Pathway Database"},
    {"database":"SMART","id":"Sma","url":"http://smart.embl-heidelberg.de/smart/do_annotation.pl?DOMAIN=$id","name":"SMART"},
    {"database":"SPIKE","id":"Sk","url":"http://www.cs.tau.ac.il/~spike/maps/$id.html","name":"SPIKE Map"},
    {"database":"SPRINT","id":"Spr","url":"http://www.bioinf.manchester.ac.uk/cgi-bin/dbbrowser/sprint/searchprintss.cgi?prints_accn=$id&display_opts=Prints&category=None&queryform=false&regexpr=off","name":"SPRINT"},
    {"database":"STRING","id":"Str","url":"http://string.embl.de/interactions/$id","name":"STRING"},
    {"database":"SubstrateDB","id":"Sdb","url":"http://substrate.burnham.org/protein/annotation/$id/html","name":"SubstrateDB"},
    {"database":"SubtiWiki","id":"Sw","url":"http://www.subtiwiki.uni-goettingen.de/wiki/index.php/$id","name":"SubtiWiki"},
    {"database":"SUPFAM","id":"Sf","url":"http://supfam.org/SUPERFAMILY/cgi-bin/scop.cgi?ipid=$id","name":"SUPFAM"},
    {"database":"SWISS-MODEL","id":"Sw","url":"http://swissmodel.expasy.org/repository/smr.php?sptr_ac=$id","name":"SWISS-MODEL"},
    {"database":"Systems Biology Ontology","id":"Sbo","url":"http://www.ebi.ac.uk/sbo/main/$id","name":"Systems Biology Ontology"},
    {"database":"TAIR","id":"A","url":"http://arabidopsis.org/servlets/TairObject?type=locus&name=$id","name":"TAIR Locus"},
    {"database":"TIGR","id":"Ti","url":"","name":"TIGR"},
    {"database":"TTD Drug","id":"Td","url":"http://bidd.nus.edu.sg/group/cjttd/ZFTTDDRUG.asp?ID=$id","name":"TTD Drug"},
    {"database":"TTD Target","id":"Tt","url":"http://bidd.nus.edu.sg/group/cjttd/ZFTTDDetail.asp?ID=$id","name":"TTD Target"},
    {"database":"TubercuList","id":"Tb","url":"http://tuberculist.epfl.ch/quicksearch.php?gene+name=$id","name":"TubercuList"},
    {"database":"UCSC Genome Browser","id":"Uc","url":"http://genome.ucsc.edu/cgi-bin/hgTracks?position=$id","name":"UCSC Genome Browser"},
    {"database":"UniGene","id":"U","url":"http://www.ncbi.nlm.nih.gov/UniGene/clust.cgi?UGID=1548618&SEARCH=$id","name":"UniGene"},
    {"database":"Unipathway","id":"Up","url":"http://www.grenoble.prabi.fr/obiwarehouse/unipathway/upa?upid=$id","name":"Unipathway"},
    {"database":"Uniprot-TrEMBL","id":"S","url":"http://www.uniprot.org/uniprot/$id","name":"UniProtKB/TrEMBL"},
    {"database":"Uniprot-SwissProt","id":"Sp","url":"http://www.uniprot.org/uniprot/$id","name":"UniProtKB/Swiss-Prot"},
    {"database":"Wheat gene names","id":"Wn","url":"http://wheat.pw.usda.gov/report?class=gene;name=$id","name":"Wheat gene names"},
    {"database":"Wheat gene refs","id":"Wr","url":"http://wheat.pw.usda.gov/cgi-bin/graingenes/report.cgi?class=reference&name=$id","name":"Wheat gene refs"},
    {"database":"WikiGenes","id":"Wg","url":"http://www.wikigenes.org/e/gene/e/$id.html","name":"WikiGenes"},
    {"database":"WikiPathways","id":"Wp","url":"http://www.wikipathways.org/index.php/Pathway:$id","name":"WikiPathways"},
    {"database":"Wikipedia","id":"Wi","url":"http://en.wikipedia.org/wiki/$id","name":"Wikipedia"},
    {"database":"WormBase","id":"W","url":"http://www.wormbase.org/db/gene/gene?name=$id;class=Gene","name":"WormBase"},
    {"database":"ZFIN","id":"Z","url":"http://zfin.org/action/marker/view/$id","name":"ZFIN Gene"}];

    function getData(species, database, id, callback) {
      var databaseId = dataSources.filter(function(element) {return element.database === database})[0].id;
      var url = './src/data/xrefs.php?species=' + encodeURIComponent(species) + '&database=' + encodeURIComponent(databaseId) + '&id=' + encodeURIComponent(id);
      console.log('url');
      console.log(url);
      $.ajax({
        url: url,
        dataType: "text",
        success: function(data) {console.log(data); self.data = data; callback(data);}
      });
    };

    function displayData(id) {
      var pathway = pathvisio.data.pathways[pathvisio.data.current.svgSelector];
      var node = pathway.nodes.filter(function(element) {return element.graphId == id })[0];
      var xRefData = getData(pathway.organism, node.xRef.database, node.xRef.id, function(data) {
        var parser = CSVParser.parse(data, true, ' ', false, false, '.');
        var parsed = DataGridRenderer.json(parser.dataGrid, parser.headerNames, parser.headerTypes,'\t','\n');
        var xRefDataParsed = self.xRefDataParsed = JSON.parse(parsed);
        console.log(xRefDataParsed);
        var features = {
          "id": node.dataNodeType + ' ' + node.textLabel.text,
          "description": node.xRef.database + ' ' + node.xRef.id
        };
        xRefDataParsed.forEach(function(element) {
          console.log(element);
          features[element.database] = element.id;
        });
        if (!Biojs.DetailsFrame.set) {
          Biojs.DetailsFrame.set = true;
          Biojs.DetailsFrame.instance = new Biojs.DetailsFrame({
            target: "detailsFrame",
            features: features 
          });
        }
        else {

          // hack for making this work in IE8.
          // Biojs.detailsFrame.instance.updateFeatures() did not appear to work in IE8,
          // so I am just emptying the detailsFrame div and building a new one.

          d3.select('#detailsFrame').selectAll('*').remove();
          Biojs.DetailsFrame.instance = new Biojs.DetailsFrame({
            target: "detailsFrame",
            features: features 
          });
          /*
             Biojs.DetailsFrame.instance.updateFeatures({id: this.getAttribute('id'),
description:"new description",
newFeature:"its value",
otherFeature:"another value"});
*/
        };
      });
    };

    return { 
      getData:getData,
      displayData:displayData, 
    } 
}();
