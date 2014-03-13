(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var modes = ["XML", "HTML4", "HTML5"];

modes.reduce(function(prev, name, i){
	var obj = require("./entities/" + name.toLowerCase() + ".json");

	if(prev){
		Object.keys(prev).forEach(function(name){
			obj[name] = prev[name];
		});
	}

	var inverse = getInverse(obj);

	module.exports[name] = {
		strict: getStrictReplacer(obj),
		//there is no non-strict mode for XML
		normal: i === 0 ? null : getReplacer(obj),
		inverse: getInverseReplacer(inverse),
		inverseObj: inverse,
		obj: obj
	};

	return obj;
}, null);

function sortDesc(a, b){
	return a < b ? 1 : -1;
}

function getReplacer(obj){
	var keys = Object.keys(obj).sort(sortDesc);
	var re = keys.join("|")//.replace(/(\w+);\|\1/g, "$1;?");

	// also match hex and char codes
	re += "|#[xX][\\da-fA-F]+;?|#\\d+;?";

	return new RegExp("&(?:" + re + ")", "g");
}

function getStrictReplacer(obj){
	var keys = Object.keys(obj).sort(sortDesc).filter(RegExp.prototype.test, /;$/);
	var re = keys.map(function(name){
		return name.slice(0, -1); //remove trailing semicolon
	}).join("|");

	// also match hex and char codes
	re += "|#[xX][\\da-fA-F]+|#\\d+";

	return new RegExp("&(?:" + re + ");", "g");
}

function getInverse(obj){
	return Object.keys(obj).filter(function(name){
		//prefer identifiers with a semicolon
		return name.substr(-1) === ";" || obj[name + ";"] !== obj[name];
	}).reduce(function(inverse, name){
		inverse[obj[name]] = name;
		return inverse;
	}, {});
}

function getInverseReplacer(inverse){
	return new RegExp("\\" + Object.keys(inverse).sort().join("|\\"), "g");
}

},{}],2:[function(require,module,exports){
var compiled = require("./compile.js"),
    modes = ["XML", "HTML4", "HTML5"];

var levels = modes.map(function(name, i){
	var obj = compiled[name],
	    strict = genReplaceFunc(obj.strict, getStrictReplacer(obj.obj)),
	    //there is no non-strict mode for XML
	    normal = i === 0 ? strict : genReplaceFunc(obj.normal, getReplacer(obj.obj)),
	    inverse = getInverse(obj.inverseObj, obj.inverse);

	exports["decode" + name + "Strict"] = strict;
	exports["decode" + name] = normal;
	exports["encode" + name] = inverse;

	return {
		strict:  strict,
		normal:  normal,
		inverse: inverse
	};
});

var decode = levels.map(function(l){ return l.normal; }),
    decodeStrict = levels.map(function(l){ return l.strict; }),
    encode = levels.map(function(l){ return l.inverse; });

exports.decode = function(data, level){
	if(!(level >= 0 && level < 3)) level = 0;
	return decode[level](data);
};
exports.decodeStrict = function(data, level){
	if(!(level >= 0 && level < 3)) level = 0;
	return decodeStrict[level](data);
};
exports.encode = function(data, level){
	if(!(level >= 0 && level < 3)) level = 0;
	return encode[level](data);
};

function getReplacer(obj){
	return function normalReplacer(name){
		if(name.charAt(1) === "#"){
			if(name.charAt(2).toLowerCase() === "x"){
				return codePointToSymbol(parseInt(name.substr(3), 16));
			}
			return codePointToSymbol(parseInt(name.substr(2), 10));
		}
		return obj[name.substr(1)];
	};
}

function codePointToSymbol(entity){
	return String.fromCharCode(entity); //TODO
}

function getStrictReplacer(obj){
	return function strictReplacer(name){
		if(name.charAt(1) === "#"){
			if(name.charAt(2).toLowerCase() === "x"){
				return String.fromCharCode(parseInt(name.substr(3), 16));
			}
			return String.fromCharCode(parseInt(name.substr(2), 10));
		}
		return obj[name.substr(1)];
	};
}

var re_nonASCII = /[^\0-\x7F]/g,
    re_astralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function nonUTF8Replacer(c){
	return "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";";
}

function astralReplacer(c){
	// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	var high = c.charCodeAt(0);
	var low  = c.charCodeAt(1);
	var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
	return "&#x" + codePoint.toString(16).toUpperCase() + ";";
}

function getInverse(inverse, re){
	function func(name){
		return "&" + inverse[name];
	}

	return function(data){
		return data
				.replace(re, func)
				.replace(re_astralSymbols, astralReplacer)
				.replace(re_nonASCII, nonUTF8Replacer);
	};
}

function genReplaceFunc(regex, func){
	return function(data){
		return data.replace(regex, func);
	};
}

},{"./compile.js":1}]},{},[2])