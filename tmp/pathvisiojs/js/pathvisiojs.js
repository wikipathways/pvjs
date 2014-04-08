/* pathvisiojs 1.0.8
Built on 2014-04-07
https://github.com/wikipathways/pathvisiojs
License: http://www.apache.org/licenses/LICENSE-2.0/ */

(function(definition){if(typeof define=="function"){define(definition)}else if(typeof YUI=="function"){YUI.add("es5-sham",definition)}else{definition()}})(function(){var call=Function.prototype.call;var prototypeOfObject=Object.prototype;var owns=call.bind(prototypeOfObject.hasOwnProperty);var defineGetter;var defineSetter;var lookupGetter;var lookupSetter;var supportsAccessors;if(supportsAccessors=owns(prototypeOfObject,"__defineGetter__")){defineGetter=call.bind(prototypeOfObject.__defineGetter__);defineSetter=call.bind(prototypeOfObject.__defineSetter__);lookupGetter=call.bind(prototypeOfObject.__lookupGetter__);lookupSetter=call.bind(prototypeOfObject.__lookupSetter__)}if(!Object.getPrototypeOf){Object.getPrototypeOf=function getPrototypeOf(object){return object.__proto__||(object.constructor?object.constructor.prototype:prototypeOfObject)}}function doesGetOwnPropertyDescriptorWork(object){try{object.sentinel=0;return Object.getOwnPropertyDescriptor(object,"sentinel").value===0}catch(exception){}}if(Object.defineProperty){var getOwnPropertyDescriptorWorksOnObject=doesGetOwnPropertyDescriptorWork({});var getOwnPropertyDescriptorWorksOnDom=typeof document=="undefined"||doesGetOwnPropertyDescriptorWork(document.createElement("div"));if(!getOwnPropertyDescriptorWorksOnDom||!getOwnPropertyDescriptorWorksOnObject){var getOwnPropertyDescriptorFallback=Object.getOwnPropertyDescriptor}}if(!Object.getOwnPropertyDescriptor||getOwnPropertyDescriptorFallback){var ERR_NON_OBJECT="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function getOwnPropertyDescriptor(object,property){if(typeof object!="object"&&typeof object!="function"||object===null){throw new TypeError(ERR_NON_OBJECT+object)}if(getOwnPropertyDescriptorFallback){try{return getOwnPropertyDescriptorFallback.call(Object,object,property)}catch(exception){}}if(!owns(object,property)){return}var descriptor={enumerable:true,configurable:true};if(supportsAccessors){var prototype=object.__proto__;object.__proto__=prototypeOfObject;var getter=lookupGetter(object,property);var setter=lookupSetter(object,property);object.__proto__=prototype;if(getter||setter){if(getter){descriptor.get=getter}if(setter){descriptor.set=setter}return descriptor}}descriptor.value=object[property];descriptor.writable=true;return descriptor}}if(!Object.getOwnPropertyNames){Object.getOwnPropertyNames=function getOwnPropertyNames(object){return Object.keys(object)}}if(!Object.create){var createEmpty;var supportsProto=Object.prototype.__proto__===null;if(supportsProto||typeof document=="undefined"){createEmpty=function(){return{__proto__:null}}}else{createEmpty=function(){var iframe=document.createElement("iframe");var parent=document.body||document.documentElement;iframe.style.display="none";parent.appendChild(iframe);iframe.src="javascript:";var empty=iframe.contentWindow.Object.prototype;parent.removeChild(iframe);iframe=null;delete empty.constructor;delete empty.hasOwnProperty;delete empty.propertyIsEnumerable;delete empty.isPrototypeOf;delete empty.toLocaleString;delete empty.toString;delete empty.valueOf;empty.__proto__=null;function Empty(){}Empty.prototype=empty;createEmpty=function(){return new Empty};return new Empty}}Object.create=function create(prototype,properties){var object;function Type(){}if(prototype===null){object=createEmpty()}else{if(typeof prototype!=="object"&&typeof prototype!=="function"){throw new TypeError("Object prototype may only be an Object or null")}Type.prototype=prototype;object=new Type;object.__proto__=prototype}if(properties!==void 0){Object.defineProperties(object,properties)}return object}}function doesDefinePropertyWork(object){try{Object.defineProperty(object,"sentinel",{});return"sentinel"in object}catch(exception){}}if(Object.defineProperty){var definePropertyWorksOnObject=doesDefinePropertyWork({});var definePropertyWorksOnDom=typeof document=="undefined"||doesDefinePropertyWork(document.createElement("div"));if(!definePropertyWorksOnObject||!definePropertyWorksOnDom){var definePropertyFallback=Object.defineProperty,definePropertiesFallback=Object.defineProperties}}if(!Object.defineProperty||definePropertyFallback){var ERR_NON_OBJECT_DESCRIPTOR="Property description must be an object: ";var ERR_NON_OBJECT_TARGET="Object.defineProperty called on non-object: ";var ERR_ACCESSORS_NOT_SUPPORTED="getters & setters can not be defined "+"on this javascript engine";Object.defineProperty=function defineProperty(object,property,descriptor){if(typeof object!="object"&&typeof object!="function"||object===null){throw new TypeError(ERR_NON_OBJECT_TARGET+object)}if(typeof descriptor!="object"&&typeof descriptor!="function"||descriptor===null){throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR+descriptor)}if(definePropertyFallback){try{return definePropertyFallback.call(Object,object,property,descriptor)}catch(exception){}}if(owns(descriptor,"value")){if(supportsAccessors&&(lookupGetter(object,property)||lookupSetter(object,property))){var prototype=object.__proto__;object.__proto__=prototypeOfObject;delete object[property];object[property]=descriptor.value;object.__proto__=prototype}else{object[property]=descriptor.value}}else{if(!supportsAccessors){throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED)}if(owns(descriptor,"get")){defineGetter(object,property,descriptor.get)}if(owns(descriptor,"set")){defineSetter(object,property,descriptor.set)}}return object}}if(!Object.defineProperties||definePropertiesFallback){Object.defineProperties=function defineProperties(object,properties){if(definePropertiesFallback){try{return definePropertiesFallback.call(Object,object,properties)}catch(exception){}}for(var property in properties){if(owns(properties,property)&&property!="__proto__"){Object.defineProperty(object,property,properties[property])}}return object}}if(!Object.seal){Object.seal=function seal(object){return object}}if(!Object.freeze){Object.freeze=function freeze(object){return object}}try{Object.freeze(function(){})}catch(exception){Object.freeze=function freeze(freezeObject){return function freeze(object){if(typeof object=="function"){return object}else{return freezeObject(object)}}}(Object.freeze)}if(!Object.preventExtensions){Object.preventExtensions=function preventExtensions(object){return object}}if(!Object.isSealed){Object.isSealed=function isSealed(object){return false}}if(!Object.isFrozen){Object.isFrozen=function isFrozen(object){return false}}if(!Object.isExtensible){Object.isExtensible=function isExtensible(object){if(Object(object)!==object){throw new TypeError}var name="";while(owns(object,name)){name+="?"}object[name]=true;var returnValue=owns(object,name);delete object[name];return returnValue}}});
//# sourceMappingURL=es5-sham.map

/*! http://mths.be/he v0.3.6 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	var regexASCII = /[\0-\x7F]/g;
	var regexNonASCII = /[^\0-\x7F]/g;

	var regexEncodeNonASCII = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
	var encodeMap = {'\xC1':'Aacute','\xE1':'aacute','\u0102':'Abreve','\u0103':'abreve','\u223E':'ac','\u223F':'acd','\u223E\u0333':'acE','\xC2':'Acirc','\xE2':'acirc','\xB4':'acute','\u0410':'Acy','\u0430':'acy','\xC6':'AElig','\xE6':'aelig','\u2061':'af','\uD835\uDD04':'Afr','\uD835\uDD1E':'afr','\xC0':'Agrave','\xE0':'agrave','\u2135':'aleph','\u0391':'Alpha','\u03B1':'alpha','\u0100':'Amacr','\u0101':'amacr','\u2A3F':'amalg','&':'amp','\u2A55':'andand','\u2A53':'And','\u2227':'and','\u2A5C':'andd','\u2A58':'andslope','\u2A5A':'andv','\u2220':'ang','\u29A4':'ange','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u2221':'angmsd','\u221F':'angrt','\u22BE':'angrtvb','\u299D':'angrtvbd','\u2222':'angsph','\xC5':'angst','\u237C':'angzarr','\u0104':'Aogon','\u0105':'aogon','\uD835\uDD38':'Aopf','\uD835\uDD52':'aopf','\u2A6F':'apacir','\u2248':'ap','\u2A70':'apE','\u224A':'ape','\u224B':'apid','\'':'apos','\xE5':'aring','\uD835\uDC9C':'Ascr','\uD835\uDCB6':'ascr','\u2254':'colone','*':'ast','\u224D':'CupCap','\xC3':'Atilde','\xE3':'atilde','\xC4':'Auml','\xE4':'auml','\u2233':'awconint','\u2A11':'awint','\u224C':'bcong','\u03F6':'bepsi','\u2035':'bprime','\u223D':'bsim','\u22CD':'bsime','\u2216':'setmn','\u2AE7':'Barv','\u22BD':'barvee','\u2305':'barwed','\u2306':'Barwed','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u0411':'Bcy','\u0431':'bcy','\u201E':'bdquo','\u2235':'becaus','\u29B0':'bemptyv','\u212C':'Bscr','\u0392':'Beta','\u03B2':'beta','\u2136':'beth','\u226C':'twixt','\uD835\uDD05':'Bfr','\uD835\uDD1F':'bfr','\u22C2':'xcap','\u25EF':'xcirc','\u22C3':'xcup','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A06':'xsqcup','\u2605':'starf','\u25BD':'xdtri','\u25B3':'xutri','\u2A04':'xuplus','\u22C1':'Vee','\u22C0':'Wedge','\u290D':'rbarr','\u29EB':'lozf','\u25AA':'squf','\u25B4':'utrif','\u25BE':'dtrif','\u25C2':'ltrif','\u25B8':'rtrif','\u2423':'blank','\u2592':'blk12','\u2591':'blk14','\u2593':'blk34','\u2588':'block','=\u20E5':'bne','\u2261\u20E5':'bnequiv','\u2AED':'bNot','\u2310':'bnot','\uD835\uDD39':'Bopf','\uD835\uDD53':'bopf','\u22A5':'bot','\u22C8':'bowtie','\u29C9':'boxbox','\u2510':'boxdl','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u250C':'boxdr','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2500':'boxh','\u2550':'boxH','\u252C':'boxhd','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2534':'boxhu','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u229F':'minusb','\u229E':'plusb','\u22A0':'timesb','\u2518':'boxul','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u2514':'boxur','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u2502':'boxv','\u2551':'boxV','\u253C':'boxvh','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2524':'boxvl','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u251C':'boxvr','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u02D8':'breve','\xA6':'brvbar','\uD835\uDCB7':'bscr','\u204F':'bsemi','\u29C5':'bsolb','\\':'bsol','\u27C8':'bsolhsub','\u2022':'bull','\u224E':'bump','\u2AAE':'bumpE','\u224F':'bumpe','\u0106':'Cacute','\u0107':'cacute','\u2A44':'capand','\u2A49':'capbrcup','\u2A4B':'capcap','\u2229':'cap','\u22D2':'Cap','\u2A47':'capcup','\u2A40':'capdot','\u2145':'DD','\u2229\uFE00':'caps','\u2041':'caret','\u02C7':'caron','\u212D':'Cfr','\u2A4D':'ccaps','\u010C':'Ccaron','\u010D':'ccaron','\xC7':'Ccedil','\xE7':'ccedil','\u0108':'Ccirc','\u0109':'ccirc','\u2230':'Cconint','\u2A4C':'ccups','\u2A50':'ccupssm','\u010A':'Cdot','\u010B':'cdot','\xB8':'cedil','\u29B2':'cemptyv','\xA2':'cent','\xB7':'middot','\uD835\uDD20':'cfr','\u0427':'CHcy','\u0447':'chcy','\u2713':'check','\u03A7':'Chi','\u03C7':'chi','\u02C6':'circ','\u2257':'cire','\u21BA':'olarr','\u21BB':'orarr','\u229B':'oast','\u229A':'ocir','\u229D':'odash','\u2299':'odot','\xAE':'reg','\u24C8':'oS','\u2296':'ominus','\u2295':'oplus','\u2297':'otimes','\u25CB':'cir','\u29C3':'cirE','\u2A10':'cirfnint','\u2AEF':'cirmid','\u29C2':'cirscir','\u2232':'cwconint','\u201D':'rdquo','\u2019':'rsquo','\u2663':'clubs',':':'colon','\u2237':'Colon','\u2A74':'Colone',',':'comma','@':'commat','\u2201':'comp','\u2218':'compfn','\u2102':'Copf','\u2245':'cong','\u2A6D':'congdot','\u2261':'equiv','\u222E':'oint','\u222F':'Conint','\uD835\uDD54':'copf','\u2210':'coprod','\xA9':'copy','\u2117':'copysr','\u21B5':'crarr','\u2717':'cross','\u2A2F':'Cross','\uD835\uDC9E':'Cscr','\uD835\uDCB8':'cscr','\u2ACF':'csub','\u2AD1':'csube','\u2AD0':'csup','\u2AD2':'csupe','\u22EF':'ctdot','\u2938':'cudarrl','\u2935':'cudarrr','\u22DE':'cuepr','\u22DF':'cuesc','\u21B6':'cularr','\u293D':'cularrp','\u2A48':'cupbrcap','\u2A46':'cupcap','\u222A':'cup','\u22D3':'Cup','\u2A4A':'cupcup','\u228D':'cupdot','\u2A45':'cupor','\u222A\uFE00':'cups','\u21B7':'curarr','\u293C':'curarrm','\u22CE':'cuvee','\u22CF':'cuwed','\xA4':'curren','\u2231':'cwint','\u232D':'cylcty','\u2020':'dagger','\u2021':'Dagger','\u2138':'daleth','\u2193':'darr','\u21A1':'Darr','\u21D3':'dArr','\u2010':'dash','\u2AE4':'Dashv','\u22A3':'dashv','\u290F':'rBarr','\u02DD':'dblac','\u010E':'Dcaron','\u010F':'dcaron','\u0414':'Dcy','\u0434':'dcy','\u21CA':'ddarr','\u2146':'dd','\u2911':'DDotrahd','\u2A77':'eDDot','\xB0':'deg','\u2207':'Del','\u0394':'Delta','\u03B4':'delta','\u29B1':'demptyv','\u297F':'dfisht','\uD835\uDD07':'Dfr','\uD835\uDD21':'dfr','\u2965':'dHar','\u21C3':'dharl','\u21C2':'dharr','\u02D9':'dot','`':'grave','\u02DC':'tilde','\u22C4':'diam','\u2666':'diams','\xA8':'die','\u03DD':'gammad','\u22F2':'disin','\xF7':'div','\u22C7':'divonx','\u0402':'DJcy','\u0452':'djcy','\u231E':'dlcorn','\u230D':'dlcrop','$':'dollar','\uD835\uDD3B':'Dopf','\uD835\uDD55':'dopf','\u20DC':'DotDot','\u2250':'doteq','\u2251':'eDot','\u2238':'minusd','\u2214':'plusdo','\u22A1':'sdotb','\u21D0':'lArr','\u21D4':'iff','\u27F8':'xlArr','\u27FA':'xhArr','\u27F9':'xrArr','\u21D2':'rArr','\u22A8':'vDash','\u21D1':'uArr','\u21D5':'vArr','\u2225':'par','\u2913':'DownArrowBar','\u21F5':'duarr','\u0311':'DownBreve','\u2950':'DownLeftRightVector','\u295E':'DownLeftTeeVector','\u2956':'DownLeftVectorBar','\u21BD':'lhard','\u295F':'DownRightTeeVector','\u2957':'DownRightVectorBar','\u21C1':'rhard','\u21A7':'mapstodown','\u22A4':'top','\u2910':'RBarr','\u231F':'drcorn','\u230C':'drcrop','\uD835\uDC9F':'Dscr','\uD835\uDCB9':'dscr','\u0405':'DScy','\u0455':'dscy','\u29F6':'dsol','\u0110':'Dstrok','\u0111':'dstrok','\u22F1':'dtdot','\u25BF':'dtri','\u296F':'duhar','\u29A6':'dwangle','\u040F':'DZcy','\u045F':'dzcy','\u27FF':'dzigrarr','\xC9':'Eacute','\xE9':'eacute','\u2A6E':'easter','\u011A':'Ecaron','\u011B':'ecaron','\xCA':'Ecirc','\xEA':'ecirc','\u2256':'ecir','\u2255':'ecolon','\u042D':'Ecy','\u044D':'ecy','\u0116':'Edot','\u0117':'edot','\u2147':'ee','\u2252':'efDot','\uD835\uDD08':'Efr','\uD835\uDD22':'efr','\u2A9A':'eg','\xC8':'Egrave','\xE8':'egrave','\u2A96':'egs','\u2A98':'egsdot','\u2A99':'el','\u2208':'in','\u23E7':'elinters','\u2113':'ell','\u2A95':'els','\u2A97':'elsdot','\u0112':'Emacr','\u0113':'emacr','\u2205':'empty','\u25FB':'EmptySmallSquare','\u25AB':'EmptyVerySmallSquare','\u2004':'emsp13','\u2005':'emsp14','\u2003':'emsp','\u014A':'ENG','\u014B':'eng','\u2002':'ensp','\u0118':'Eogon','\u0119':'eogon','\uD835\uDD3C':'Eopf','\uD835\uDD56':'eopf','\u22D5':'epar','\u29E3':'eparsl','\u2A71':'eplus','\u03B5':'epsi','\u0395':'Epsilon','\u03F5':'epsiv','\u2242':'esim','\u2A75':'Equal','=':'equals','\u225F':'equest','\u21CC':'rlhar','\u2A78':'equivDD','\u29E5':'eqvparsl','\u2971':'erarr','\u2253':'erDot','\u212F':'escr','\u2130':'Escr','\u2A73':'Esim','\u0397':'Eta','\u03B7':'eta','\xD0':'ETH','\xF0':'eth','\xCB':'Euml','\xEB':'euml','\u20AC':'euro','!':'excl','\u2203':'exist','\u0424':'Fcy','\u0444':'fcy','\u2640':'female','\uFB03':'ffilig','\uFB00':'fflig','\uFB04':'ffllig','\uD835\uDD09':'Ffr','\uD835\uDD23':'ffr','\uFB01':'filig','\u25FC':'FilledSmallSquare','fj':'fjlig','\u266D':'flat','\uFB02':'fllig','\u25B1':'fltns','\u0192':'fnof','\uD835\uDD3D':'Fopf','\uD835\uDD57':'fopf','\u2200':'forall','\u22D4':'fork','\u2AD9':'forkv','\u2131':'Fscr','\u2A0D':'fpartint','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\u2154':'frac23','\u2156':'frac25','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\u2044':'frasl','\u2322':'frown','\uD835\uDCBB':'fscr','\u01F5':'gacute','\u0393':'Gamma','\u03B3':'gamma','\u03DC':'Gammad','\u2A86':'gap','\u011E':'Gbreve','\u011F':'gbreve','\u0122':'Gcedil','\u011C':'Gcirc','\u011D':'gcirc','\u0413':'Gcy','\u0433':'gcy','\u0120':'Gdot','\u0121':'gdot','\u2265':'ge','\u2267':'gE','\u2A8C':'gEl','\u22DB':'gel','\u2A7E':'ges','\u2AA9':'gescc','\u2A80':'gesdot','\u2A82':'gesdoto','\u2A84':'gesdotol','\u22DB\uFE00':'gesl','\u2A94':'gesles','\uD835\uDD0A':'Gfr','\uD835\uDD24':'gfr','\u226B':'gg','\u22D9':'Gg','\u2137':'gimel','\u0403':'GJcy','\u0453':'gjcy','\u2AA5':'gla','\u2277':'gl','\u2A92':'glE','\u2AA4':'glj','\u2A8A':'gnap','\u2A88':'gne','\u2269':'gnE','\u22E7':'gnsim','\uD835\uDD3E':'Gopf','\uD835\uDD58':'gopf','\u2AA2':'GreaterGreater','\u2273':'gsim','\uD835\uDCA2':'Gscr','\u210A':'gscr','\u2A8E':'gsime','\u2A90':'gsiml','\u2AA7':'gtcc','\u2A7A':'gtcir','>':'gt','\u22D7':'gtdot','\u2995':'gtlPar','\u2A7C':'gtquest','\u2978':'gtrarr','\u2269\uFE00':'gvnE','\u200A':'hairsp','\u210B':'Hscr','\u042A':'HARDcy','\u044A':'hardcy','\u2948':'harrcir','\u2194':'harr','\u21AD':'harrw','^':'Hat','\u210F':'hbar','\u0124':'Hcirc','\u0125':'hcirc','\u2665':'hearts','\u2026':'mldr','\u22B9':'hercon','\uD835\uDD25':'hfr','\u210C':'Hfr','\u2925':'searhk','\u2926':'swarhk','\u21FF':'hoarr','\u223B':'homtht','\u21A9':'larrhk','\u21AA':'rarrhk','\uD835\uDD59':'hopf','\u210D':'Hopf','\u2015':'horbar','\uD835\uDCBD':'hscr','\u0126':'Hstrok','\u0127':'hstrok','\u2043':'hybull','\xCD':'Iacute','\xED':'iacute','\u2063':'ic','\xCE':'Icirc','\xEE':'icirc','\u0418':'Icy','\u0438':'icy','\u0130':'Idot','\u0415':'IEcy','\u0435':'iecy','\xA1':'iexcl','\uD835\uDD26':'ifr','\u2111':'Im','\xCC':'Igrave','\xEC':'igrave','\u2148':'ii','\u2A0C':'qint','\u222D':'tint','\u29DC':'iinfin','\u2129':'iiota','\u0132':'IJlig','\u0133':'ijlig','\u012A':'Imacr','\u012B':'imacr','\u2110':'Iscr','\u0131':'imath','\u22B7':'imof','\u01B5':'imped','\u2105':'incare','\u221E':'infin','\u29DD':'infintie','\u22BA':'intcal','\u222B':'int','\u222C':'Int','\u2124':'Zopf','\u2A17':'intlarhk','\u2A3C':'iprod','\u2062':'it','\u0401':'IOcy','\u0451':'iocy','\u012E':'Iogon','\u012F':'iogon','\uD835\uDD40':'Iopf','\uD835\uDD5A':'iopf','\u0399':'Iota','\u03B9':'iota','\xBF':'iquest','\uD835\uDCBE':'iscr','\u22F5':'isindot','\u22F9':'isinE','\u22F4':'isins','\u22F3':'isinsv','\u0128':'Itilde','\u0129':'itilde','\u0406':'Iukcy','\u0456':'iukcy','\xCF':'Iuml','\xEF':'iuml','\u0134':'Jcirc','\u0135':'jcirc','\u0419':'Jcy','\u0439':'jcy','\uD835\uDD0D':'Jfr','\uD835\uDD27':'jfr','\u0237':'jmath','\uD835\uDD41':'Jopf','\uD835\uDD5B':'jopf','\uD835\uDCA5':'Jscr','\uD835\uDCBF':'jscr','\u0408':'Jsercy','\u0458':'jsercy','\u0404':'Jukcy','\u0454':'jukcy','\u039A':'Kappa','\u03BA':'kappa','\u03F0':'kappav','\u0136':'Kcedil','\u0137':'kcedil','\u041A':'Kcy','\u043A':'kcy','\uD835\uDD0E':'Kfr','\uD835\uDD28':'kfr','\u0138':'kgreen','\u0425':'KHcy','\u0445':'khcy','\u040C':'KJcy','\u045C':'kjcy','\uD835\uDD42':'Kopf','\uD835\uDD5C':'kopf','\uD835\uDCA6':'Kscr','\uD835\uDCC0':'kscr','\u21DA':'lAarr','\u0139':'Lacute','\u013A':'lacute','\u29B4':'laemptyv','\u2112':'Lscr','\u039B':'Lambda','\u03BB':'lambda','\u27E8':'lang','\u27EA':'Lang','\u2991':'langd','\u2A85':'lap','\xAB':'laquo','\u21E4':'larrb','\u291F':'larrbfs','\u2190':'larr','\u219E':'Larr','\u291D':'larrfs','\u21AB':'larrlp','\u2939':'larrpl','\u2973':'larrsim','\u21A2':'larrtl','\u2919':'latail','\u291B':'lAtail','\u2AAB':'lat','\u2AAD':'late','\u2AAD\uFE00':'lates','\u290C':'lbarr','\u290E':'lBarr','\u2772':'lbbrk','{':'lcub','[':'lsqb','\u298B':'lbrke','\u298F':'lbrksld','\u298D':'lbrkslu','\u013D':'Lcaron','\u013E':'lcaron','\u013B':'Lcedil','\u013C':'lcedil','\u2308':'lceil','\u041B':'Lcy','\u043B':'lcy','\u2936':'ldca','\u201C':'ldquo','\u2967':'ldrdhar','\u294B':'ldrushar','\u21B2':'ldsh','\u2264':'le','\u2266':'lE','\u21C6':'lrarr','\u27E6':'lobrk','\u2961':'LeftDownTeeVector','\u2959':'LeftDownVectorBar','\u230A':'lfloor','\u21BC':'lharu','\u21C7':'llarr','\u21CB':'lrhar','\u294E':'LeftRightVector','\u21A4':'mapstoleft','\u295A':'LeftTeeVector','\u22CB':'lthree','\u29CF':'LeftTriangleBar','\u22B2':'vltri','\u22B4':'ltrie','\u2951':'LeftUpDownVector','\u2960':'LeftUpTeeVector','\u2958':'LeftUpVectorBar','\u21BF':'uharl','\u2952':'LeftVectorBar','\u2A8B':'lEg','\u22DA':'leg','\u2A7D':'les','\u2AA8':'lescc','\u2A7F':'lesdot','\u2A81':'lesdoto','\u2A83':'lesdotor','\u22DA\uFE00':'lesg','\u2A93':'lesges','\u22D6':'ltdot','\u2276':'lg','\u2AA1':'LessLess','\u2272':'lsim','\u297C':'lfisht','\uD835\uDD0F':'Lfr','\uD835\uDD29':'lfr','\u2A91':'lgE','\u2962':'lHar','\u296A':'lharul','\u2584':'lhblk','\u0409':'LJcy','\u0459':'ljcy','\u226A':'ll','\u22D8':'Ll','\u296B':'llhard','\u25FA':'lltri','\u013F':'Lmidot','\u0140':'lmidot','\u23B0':'lmoust','\u2A89':'lnap','\u2A87':'lne','\u2268':'lnE','\u22E6':'lnsim','\u27EC':'loang','\u21FD':'loarr','\u27F5':'xlarr','\u27F7':'xharr','\u27FC':'xmap','\u27F6':'xrarr','\u21AC':'rarrlp','\u2985':'lopar','\uD835\uDD43':'Lopf','\uD835\uDD5D':'lopf','\u2A2D':'loplus','\u2A34':'lotimes','\u2217':'lowast','_':'lowbar','\u2199':'swarr','\u2198':'searr','\u25CA':'loz','(':'lpar','\u2993':'lparlt','\u296D':'lrhard','\u200E':'lrm','\u22BF':'lrtri','\u2039':'lsaquo','\uD835\uDCC1':'lscr','\u21B0':'lsh','\u2A8D':'lsime','\u2A8F':'lsimg','\u2018':'lsquo','\u201A':'sbquo','\u0141':'Lstrok','\u0142':'lstrok','\u2AA6':'ltcc','\u2A79':'ltcir','<':'lt','\u22C9':'ltimes','\u2976':'ltlarr','\u2A7B':'ltquest','\u25C3':'ltri','\u2996':'ltrPar','\u294A':'lurdshar','\u2966':'luruhar','\u2268\uFE00':'lvnE','\xAF':'macr','\u2642':'male','\u2720':'malt','\u2905':'Map','\u21A6':'map','\u21A5':'mapstoup','\u25AE':'marker','\u2A29':'mcomma','\u041C':'Mcy','\u043C':'mcy','\u2014':'mdash','\u223A':'mDDot','\u205F':'MediumSpace','\u2133':'Mscr','\uD835\uDD10':'Mfr','\uD835\uDD2A':'mfr','\u2127':'mho','\xB5':'micro','\u2AF0':'midcir','\u2223':'mid','\u2212':'minus','\u2A2A':'minusdu','\u2213':'mp','\u2ADB':'mlcp','\u22A7':'models','\uD835\uDD44':'Mopf','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\u039C':'Mu','\u03BC':'mu','\u22B8':'mumap','\u0143':'Nacute','\u0144':'nacute','\u2220\u20D2':'nang','\u2249':'nap','\u2A70\u0338':'napE','\u224B\u0338':'napid','\u0149':'napos','\u266E':'natur','\u2115':'Nopf','\xA0':'nbsp','\u224E\u0338':'nbump','\u224F\u0338':'nbumpe','\u2A43':'ncap','\u0147':'Ncaron','\u0148':'ncaron','\u0145':'Ncedil','\u0146':'ncedil','\u2247':'ncong','\u2A6D\u0338':'ncongdot','\u2A42':'ncup','\u041D':'Ncy','\u043D':'ncy','\u2013':'ndash','\u2924':'nearhk','\u2197':'nearr','\u21D7':'neArr','\u2260':'ne','\u2250\u0338':'nedot','\u200B':'ZeroWidthSpace','\u2262':'nequiv','\u2928':'toea','\u2242\u0338':'nesim','\n':'NewLine','\u2204':'nexist','\uD835\uDD11':'Nfr','\uD835\uDD2B':'nfr','\u2267\u0338':'ngE','\u2271':'nge','\u2A7E\u0338':'nges','\u22D9\u0338':'nGg','\u2275':'ngsim','\u226B\u20D2':'nGt','\u226F':'ngt','\u226B\u0338':'nGtv','\u21AE':'nharr','\u21CE':'nhArr','\u2AF2':'nhpar','\u220B':'ni','\u22FC':'nis','\u22FA':'nisd','\u040A':'NJcy','\u045A':'njcy','\u219A':'nlarr','\u21CD':'nlArr','\u2025':'nldr','\u2266\u0338':'nlE','\u2270':'nle','\u2A7D\u0338':'nles','\u226E':'nlt','\u22D8\u0338':'nLl','\u2274':'nlsim','\u226A\u20D2':'nLt','\u22EA':'nltri','\u22EC':'nltrie','\u226A\u0338':'nLtv','\u2224':'nmid','\u2060':'NoBreak','\uD835\uDD5F':'nopf','\u2AEC':'Not','\xAC':'not','\u226D':'NotCupCap','\u2226':'npar','\u2209':'notin','\u2279':'ntgl','\u22F5\u0338':'notindot','\u22F9\u0338':'notinE','\u22F7':'notinvb','\u22F6':'notinvc','\u29CF\u0338':'NotLeftTriangleBar','\u2278':'ntlg','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA1\u0338':'NotNestedLessLess','\u220C':'notni','\u22FE':'notnivb','\u22FD':'notnivc','\u2280':'npr','\u2AAF\u0338':'npre','\u22E0':'nprcue','\u29D0\u0338':'NotRightTriangleBar','\u22EB':'nrtri','\u22ED':'nrtrie','\u228F\u0338':'NotSquareSubset','\u22E2':'nsqsube','\u2290\u0338':'NotSquareSuperset','\u22E3':'nsqsupe','\u2282\u20D2':'vnsub','\u2288':'nsube','\u2281':'nsc','\u2AB0\u0338':'nsce','\u22E1':'nsccue','\u227F\u0338':'NotSucceedsTilde','\u2283\u20D2':'vnsup','\u2289':'nsupe','\u2241':'nsim','\u2244':'nsime','\u2AFD\u20E5':'nparsl','\u2202\u0338':'npart','\u2A14':'npolint','\u2933\u0338':'nrarrc','\u219B':'nrarr','\u21CF':'nrArr','\u219D\u0338':'nrarrw','\uD835\uDCA9':'Nscr','\uD835\uDCC3':'nscr','\u2284':'nsub','\u2AC5\u0338':'nsubE','\u2285':'nsup','\u2AC6\u0338':'nsupE','\xD1':'Ntilde','\xF1':'ntilde','\u039D':'Nu','\u03BD':'nu','#':'num','\u2116':'numero','\u2007':'numsp','\u224D\u20D2':'nvap','\u22AC':'nvdash','\u22AD':'nvDash','\u22AE':'nVdash','\u22AF':'nVDash','\u2265\u20D2':'nvge','>\u20D2':'nvgt','\u2904':'nvHarr','\u29DE':'nvinfin','\u2902':'nvlArr','\u2264\u20D2':'nvle','<\u20D2':'nvlt','\u22B4\u20D2':'nvltrie','\u2903':'nvrArr','\u22B5\u20D2':'nvrtrie','\u223C\u20D2':'nvsim','\u2923':'nwarhk','\u2196':'nwarr','\u21D6':'nwArr','\u2927':'nwnear','\xD3':'Oacute','\xF3':'oacute','\xD4':'Ocirc','\xF4':'ocirc','\u041E':'Ocy','\u043E':'ocy','\u0150':'Odblac','\u0151':'odblac','\u2A38':'odiv','\u29BC':'odsold','\u0152':'OElig','\u0153':'oelig','\u29BF':'ofcir','\uD835\uDD12':'Ofr','\uD835\uDD2C':'ofr','\u02DB':'ogon','\xD2':'Ograve','\xF2':'ograve','\u29C1':'ogt','\u29B5':'ohbar','\u03A9':'ohm','\u29BE':'olcir','\u29BB':'olcross','\u203E':'oline','\u29C0':'olt','\u014C':'Omacr','\u014D':'omacr','\u03C9':'omega','\u039F':'Omicron','\u03BF':'omicron','\u29B6':'omid','\uD835\uDD46':'Oopf','\uD835\uDD60':'oopf','\u29B7':'opar','\u29B9':'operp','\u2A54':'Or','\u2228':'or','\u2A5D':'ord','\u2134':'oscr','\xAA':'ordf','\xBA':'ordm','\u22B6':'origof','\u2A56':'oror','\u2A57':'orslope','\u2A5B':'orv','\uD835\uDCAA':'Oscr','\xD8':'Oslash','\xF8':'oslash','\u2298':'osol','\xD5':'Otilde','\xF5':'otilde','\u2A36':'otimesas','\u2A37':'Otimes','\xD6':'Ouml','\xF6':'ouml','\u233D':'ovbar','\u23DE':'OverBrace','\u23B4':'tbrk','\u23DC':'OverParenthesis','\xB6':'para','\u2AF3':'parsim','\u2AFD':'parsl','\u2202':'part','\u041F':'Pcy','\u043F':'pcy','%':'percnt','.':'period','\u2030':'permil','\u2031':'pertenk','\uD835\uDD13':'Pfr','\uD835\uDD2D':'pfr','\u03A6':'Phi','\u03C6':'phi','\u03D5':'phiv','\u260E':'phone','\u03A0':'Pi','\u03C0':'pi','\u03D6':'piv','\u210E':'planckh','\u2A23':'plusacir','\u2A22':'pluscir','+':'plus','\u2A25':'plusdu','\u2A72':'pluse','\xB1':'pm','\u2A26':'plussim','\u2A27':'plustwo','\u2A15':'pointint','\uD835\uDD61':'popf','\u2119':'Popf','\xA3':'pound','\u2AB7':'prap','\u2ABB':'Pr','\u227A':'pr','\u227C':'prcue','\u2AAF':'pre','\u227E':'prsim','\u2AB9':'prnap','\u2AB5':'prnE','\u22E8':'prnsim','\u2AB3':'prE','\u2032':'prime','\u2033':'Prime','\u220F':'prod','\u232E':'profalar','\u2312':'profline','\u2313':'profsurf','\u221D':'prop','\u22B0':'prurel','\uD835\uDCAB':'Pscr','\uD835\uDCC5':'pscr','\u03A8':'Psi','\u03C8':'psi','\u2008':'puncsp','\uD835\uDD14':'Qfr','\uD835\uDD2E':'qfr','\uD835\uDD62':'qopf','\u211A':'Qopf','\u2057':'qprime','\uD835\uDCAC':'Qscr','\uD835\uDCC6':'qscr','\u2A16':'quatint','?':'quest','"':'quot','\u21DB':'rAarr','\u223D\u0331':'race','\u0154':'Racute','\u0155':'racute','\u221A':'Sqrt','\u29B3':'raemptyv','\u27E9':'rang','\u27EB':'Rang','\u2992':'rangd','\u29A5':'range','\xBB':'raquo','\u2975':'rarrap','\u21E5':'rarrb','\u2920':'rarrbfs','\u2933':'rarrc','\u2192':'rarr','\u21A0':'Rarr','\u291E':'rarrfs','\u2945':'rarrpl','\u2974':'rarrsim','\u2916':'Rarrtl','\u21A3':'rarrtl','\u219D':'rarrw','\u291A':'ratail','\u291C':'rAtail','\u2236':'ratio','\u2773':'rbbrk','}':'rcub',']':'rsqb','\u298C':'rbrke','\u298E':'rbrksld','\u2990':'rbrkslu','\u0158':'Rcaron','\u0159':'rcaron','\u0156':'Rcedil','\u0157':'rcedil','\u2309':'rceil','\u0420':'Rcy','\u0440':'rcy','\u2937':'rdca','\u2969':'rdldhar','\u21B3':'rdsh','\u211C':'Re','\u211B':'Rscr','\u211D':'Ropf','\u25AD':'rect','\u297D':'rfisht','\u230B':'rfloor','\uD835\uDD2F':'rfr','\u2964':'rHar','\u21C0':'rharu','\u296C':'rharul','\u03A1':'Rho','\u03C1':'rho','\u03F1':'rhov','\u21C4':'rlarr','\u27E7':'robrk','\u295D':'RightDownTeeVector','\u2955':'RightDownVectorBar','\u21C9':'rrarr','\u22A2':'vdash','\u295B':'RightTeeVector','\u22CC':'rthree','\u29D0':'RightTriangleBar','\u22B3':'vrtri','\u22B5':'rtrie','\u294F':'RightUpDownVector','\u295C':'RightUpTeeVector','\u2954':'RightUpVectorBar','\u21BE':'uharr','\u2953':'RightVectorBar','\u02DA':'ring','\u200F':'rlm','\u23B1':'rmoust','\u2AEE':'rnmid','\u27ED':'roang','\u21FE':'roarr','\u2986':'ropar','\uD835\uDD63':'ropf','\u2A2E':'roplus','\u2A35':'rotimes','\u2970':'RoundImplies',')':'rpar','\u2994':'rpargt','\u2A12':'rppolint','\u203A':'rsaquo','\uD835\uDCC7':'rscr','\u21B1':'rsh','\u22CA':'rtimes','\u25B9':'rtri','\u29CE':'rtriltri','\u29F4':'RuleDelayed','\u2968':'ruluhar','\u211E':'rx','\u015A':'Sacute','\u015B':'sacute','\u2AB8':'scap','\u0160':'Scaron','\u0161':'scaron','\u2ABC':'Sc','\u227B':'sc','\u227D':'sccue','\u2AB0':'sce','\u2AB4':'scE','\u015E':'Scedil','\u015F':'scedil','\u015C':'Scirc','\u015D':'scirc','\u2ABA':'scnap','\u2AB6':'scnE','\u22E9':'scnsim','\u2A13':'scpolint','\u227F':'scsim','\u0421':'Scy','\u0441':'scy','\u22C5':'sdot','\u2A66':'sdote','\u21D8':'seArr','\xA7':'sect',';':'semi','\u2929':'tosa','\u2736':'sext','\uD835\uDD16':'Sfr','\uD835\uDD30':'sfr','\u266F':'sharp','\u0429':'SHCHcy','\u0449':'shchcy','\u0428':'SHcy','\u0448':'shcy','\u2191':'uarr','\xAD':'shy','\u03A3':'Sigma','\u03C3':'sigma','\u03C2':'sigmaf','\u223C':'sim','\u2A6A':'simdot','\u2243':'sime','\u2A9E':'simg','\u2AA0':'simgE','\u2A9D':'siml','\u2A9F':'simlE','\u2246':'simne','\u2A24':'simplus','\u2972':'simrarr','\u2A33':'smashp','\u29E4':'smeparsl','\u2323':'smile','\u2AAA':'smt','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u042C':'SOFTcy','\u044C':'softcy','\u233F':'solbar','\u29C4':'solb','/':'sol','\uD835\uDD4A':'Sopf','\uD835\uDD64':'sopf','\u2660':'spades','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u228F':'sqsub','\u2291':'sqsube','\u2290':'sqsup','\u2292':'sqsupe','\u25A1':'squ','\uD835\uDCAE':'Sscr','\uD835\uDCC8':'sscr','\u22C6':'Star','\u2606':'star','\u2282':'sub','\u22D0':'Sub','\u2ABD':'subdot','\u2AC5':'subE','\u2286':'sube','\u2AC3':'subedot','\u2AC1':'submult','\u2ACB':'subnE','\u228A':'subne','\u2ABF':'subplus','\u2979':'subrarr','\u2AC7':'subsim','\u2AD5':'subsub','\u2AD3':'subsup','\u2211':'sum','\u266A':'sung','\xB9':'sup1','\xB2':'sup2','\xB3':'sup3','\u2283':'sup','\u22D1':'Sup','\u2ABE':'supdot','\u2AD8':'supdsub','\u2AC6':'supE','\u2287':'supe','\u2AC4':'supedot','\u27C9':'suphsol','\u2AD7':'suphsub','\u297B':'suplarr','\u2AC2':'supmult','\u2ACC':'supnE','\u228B':'supne','\u2AC0':'supplus','\u2AC8':'supsim','\u2AD4':'supsub','\u2AD6':'supsup','\u21D9':'swArr','\u292A':'swnwar','\xDF':'szlig','\t':'Tab','\u2316':'target','\u03A4':'Tau','\u03C4':'tau','\u0164':'Tcaron','\u0165':'tcaron','\u0162':'Tcedil','\u0163':'tcedil','\u0422':'Tcy','\u0442':'tcy','\u20DB':'tdot','\u2315':'telrec','\uD835\uDD17':'Tfr','\uD835\uDD31':'tfr','\u2234':'there4','\u0398':'Theta','\u03B8':'theta','\u03D1':'thetav','\u205F\u200A':'ThickSpace','\u2009':'thinsp','\xDE':'THORN','\xFE':'thorn','\u2A31':'timesbar','\xD7':'times','\u2A30':'timesd','\u2336':'topbot','\u2AF1':'topcir','\uD835\uDD4B':'Topf','\uD835\uDD65':'topf','\u2ADA':'topfork','\u2034':'tprime','\u2122':'trade','\u25B5':'utri','\u225C':'trie','\u25EC':'tridot','\u2A3A':'triminus','\u2A39':'triplus','\u29CD':'trisb','\u2A3B':'tritime','\u23E2':'trpezium','\uD835\uDCAF':'Tscr','\uD835\uDCC9':'tscr','\u0426':'TScy','\u0446':'tscy','\u040B':'TSHcy','\u045B':'tshcy','\u0166':'Tstrok','\u0167':'tstrok','\xDA':'Uacute','\xFA':'uacute','\u219F':'Uarr','\u2949':'Uarrocir','\u040E':'Ubrcy','\u045E':'ubrcy','\u016C':'Ubreve','\u016D':'ubreve','\xDB':'Ucirc','\xFB':'ucirc','\u0423':'Ucy','\u0443':'ucy','\u21C5':'udarr','\u0170':'Udblac','\u0171':'udblac','\u296E':'udhar','\u297E':'ufisht','\uD835\uDD18':'Ufr','\uD835\uDD32':'ufr','\xD9':'Ugrave','\xF9':'ugrave','\u2963':'uHar','\u2580':'uhblk','\u231C':'ulcorn','\u230F':'ulcrop','\u25F8':'ultri','\u016A':'Umacr','\u016B':'umacr','\u23DF':'UnderBrace','\u23DD':'UnderParenthesis','\u228E':'uplus','\u0172':'Uogon','\u0173':'uogon','\uD835\uDD4C':'Uopf','\uD835\uDD66':'uopf','\u2912':'UpArrowBar','\u2195':'varr','\u03C5':'upsi','\u03D2':'Upsi','\u03A5':'Upsilon','\u21C8':'uuarr','\u231D':'urcorn','\u230E':'urcrop','\u016E':'Uring','\u016F':'uring','\u25F9':'urtri','\uD835\uDCB0':'Uscr','\uD835\uDCCA':'uscr','\u22F0':'utdot','\u0168':'Utilde','\u0169':'utilde','\xDC':'Uuml','\xFC':'uuml','\u29A7':'uwangle','\u299C':'vangrt','\u228A\uFE00':'vsubne','\u2ACB\uFE00':'vsubnE','\u228B\uFE00':'vsupne','\u2ACC\uFE00':'vsupnE','\u2AE8':'vBar','\u2AEB':'Vbar','\u2AE9':'vBarv','\u0412':'Vcy','\u0432':'vcy','\u22A9':'Vdash','\u22AB':'VDash','\u2AE6':'Vdashl','\u22BB':'veebar','\u225A':'veeeq','\u22EE':'vellip','|':'vert','\u2016':'Vert','\u2758':'VerticalSeparator','\u2240':'wr','\uD835\uDD19':'Vfr','\uD835\uDD33':'vfr','\uD835\uDD4D':'Vopf','\uD835\uDD67':'vopf','\uD835\uDCB1':'Vscr','\uD835\uDCCB':'vscr','\u22AA':'Vvdash','\u299A':'vzigzag','\u0174':'Wcirc','\u0175':'wcirc','\u2A5F':'wedbar','\u2259':'wedgeq','\u2118':'wp','\uD835\uDD1A':'Wfr','\uD835\uDD34':'wfr','\uD835\uDD4E':'Wopf','\uD835\uDD68':'wopf','\uD835\uDCB2':'Wscr','\uD835\uDCCC':'wscr','\uD835\uDD1B':'Xfr','\uD835\uDD35':'xfr','\u039E':'Xi','\u03BE':'xi','\u22FB':'xnis','\uD835\uDD4F':'Xopf','\uD835\uDD69':'xopf','\uD835\uDCB3':'Xscr','\uD835\uDCCD':'xscr','\xDD':'Yacute','\xFD':'yacute','\u042F':'YAcy','\u044F':'yacy','\u0176':'Ycirc','\u0177':'ycirc','\u042B':'Ycy','\u044B':'ycy','\xA5':'yen','\uD835\uDD1C':'Yfr','\uD835\uDD36':'yfr','\u0407':'YIcy','\u0457':'yicy','\uD835\uDD50':'Yopf','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDCCE':'yscr','\u042E':'YUcy','\u044E':'yucy','\xFF':'yuml','\u0178':'Yuml','\u0179':'Zacute','\u017A':'zacute','\u017D':'Zcaron','\u017E':'zcaron','\u0417':'Zcy','\u0437':'zcy','\u017B':'Zdot','\u017C':'zdot','\u2128':'Zfr','\u0396':'Zeta','\u03B6':'zeta','\uD835\uDD37':'zfr','\u0416':'ZHcy','\u0436':'zhcy','\u21DD':'zigrarr','\uD835\uDD6B':'zopf','\uD835\uDCB5':'Zscr','\uD835\uDCCF':'zscr','\u200D':'zwj','\u200C':'zwnj'};

	var regexEscape = /[&<>"']/g;
	var escapeMap = {
		'&': '&amp;',
		'<': '&lt;',
		'"': '&quot;',
		'\'': '&#x27;',
		// See http://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
		// following is not strictly necessary unless it’s part of a tag or an
		// unquoted attribute value. We’re only escaping it for XML support, and to
		// match existing `htmlEscape` implementations.
		'>': '&gt;'
	};

	var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
	var regexDecode = /&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+);|&(Aacute|iacute|Uacute|plusmn|otilde|Otilde|Agrave|agrave|yacute|Yacute|oslash|Oslash|Atilde|atilde|brvbar|Ccedil|ccedil|ograve|curren|divide|Eacute|eacute|Ograve|oacute|Egrave|egrave|ugrave|frac12|frac14|frac34|Ugrave|Oacute|Iacute|ntilde|Ntilde|uacute|middot|Igrave|igrave|iquest|aacute|laquo|THORN|micro|iexcl|icirc|Icirc|Acirc|ucirc|ecirc|Ocirc|ocirc|Ecirc|Ucirc|aring|Aring|aelig|AElig|acute|pound|raquo|acirc|times|thorn|szlig|cedil|COPY|Auml|ordf|ordm|uuml|macr|Uuml|auml|Ouml|ouml|para|nbsp|Euml|quot|QUOT|euml|yuml|cent|sect|copy|sup1|sup2|sup3|Iuml|iuml|shy|eth|reg|not|yen|amp|AMP|REG|uml|ETH|deg|gt|GT|LT|lt)([=a-zA-Z0-9])?/g;
	var decodeMap = {'Aacute':'\xC1','aacute':'\xE1','Abreve':'\u0102','abreve':'\u0103','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','Acirc':'\xC2','acirc':'\xE2','acute':'\xB4','Acy':'\u0410','acy':'\u0430','AElig':'\xC6','aelig':'\xE6','af':'\u2061','Afr':'\uD835\uDD04','afr':'\uD835\uDD1E','Agrave':'\xC0','agrave':'\xE0','alefsym':'\u2135','aleph':'\u2135','Alpha':'\u0391','alpha':'\u03B1','Amacr':'\u0100','amacr':'\u0101','amalg':'\u2A3F','amp':'&','AMP':'&','andand':'\u2A55','And':'\u2A53','and':'\u2227','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angmsd':'\u2221','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','Aogon':'\u0104','aogon':'\u0105','Aopf':'\uD835\uDD38','aopf':'\uD835\uDD52','apacir':'\u2A6F','ap':'\u2248','apE':'\u2A70','ape':'\u224A','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','Aring':'\xC5','aring':'\xE5','Ascr':'\uD835\uDC9C','ascr':'\uD835\uDCB6','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','Atilde':'\xC3','atilde':'\xE3','Auml':'\xC4','auml':'\xE4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','Bcy':'\u0411','bcy':'\u0431','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','Beta':'\u0392','beta':'\u03B2','beth':'\u2136','between':'\u226C','Bfr':'\uD835\uDD05','bfr':'\uD835\uDD1F','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bNot':'\u2AED','bnot':'\u2310','Bopf':'\uD835\uDD39','bopf':'\uD835\uDD53','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxHd':'\u2564','boxhD':'\u2565','boxHD':'\u2566','boxhu':'\u2534','boxHu':'\u2567','boxhU':'\u2568','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsolb':'\u29C5','bsol':'\\','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpE':'\u2AAE','bumpe':'\u224F','Bumpeq':'\u224E','bumpeq':'\u224F','Cacute':'\u0106','cacute':'\u0107','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','cap':'\u2229','Cap':'\u22D2','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','Ccaron':'\u010C','ccaron':'\u010D','Ccedil':'\xC7','ccedil':'\xE7','Ccirc':'\u0108','ccirc':'\u0109','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','Cdot':'\u010A','cdot':'\u010B','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','CHcy':'\u0427','chcy':'\u0447','check':'\u2713','checkmark':'\u2713','Chi':'\u03A7','chi':'\u03C7','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cir':'\u25CB','cirE':'\u29C3','cire':'\u2257','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','Colone':'\u2A74','colone':'\u2254','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','Cscr':'\uD835\uDC9E','cscr':'\uD835\uDCB8','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cup':'\u222A','Cup':'\u22D3','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','Darr':'\u21A1','dArr':'\u21D3','dash':'\u2010','Dashv':'\u2AE4','dashv':'\u22A3','dbkarow':'\u290F','dblac':'\u02DD','Dcaron':'\u010E','dcaron':'\u010F','Dcy':'\u0414','dcy':'\u0434','ddagger':'\u2021','ddarr':'\u21CA','DD':'\u2145','dd':'\u2146','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','Delta':'\u0394','delta':'\u03B4','demptyv':'\u29B1','dfisht':'\u297F','Dfr':'\uD835\uDD07','dfr':'\uD835\uDD21','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','DJcy':'\u0402','djcy':'\u0452','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','Dopf':'\uD835\uDD3B','dopf':'\uD835\uDD55','Dot':'\xA8','dot':'\u02D9','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','DownArrowBar':'\u2913','downarrow':'\u2193','DownArrow':'\u2193','Downarrow':'\u21D3','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVectorBar':'\u2956','DownLeftVector':'\u21BD','DownRightTeeVector':'\u295F','DownRightVectorBar':'\u2957','DownRightVector':'\u21C1','DownTeeArrow':'\u21A7','DownTee':'\u22A4','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','Dscr':'\uD835\uDC9F','dscr':'\uD835\uDCB9','DScy':'\u0405','dscy':'\u0455','dsol':'\u29F6','Dstrok':'\u0110','dstrok':'\u0111','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','DZcy':'\u040F','dzcy':'\u045F','dzigrarr':'\u27FF','Eacute':'\xC9','eacute':'\xE9','easter':'\u2A6E','Ecaron':'\u011A','ecaron':'\u011B','Ecirc':'\xCA','ecirc':'\xEA','ecir':'\u2256','ecolon':'\u2255','Ecy':'\u042D','ecy':'\u044D','eDDot':'\u2A77','Edot':'\u0116','edot':'\u0117','eDot':'\u2251','ee':'\u2147','efDot':'\u2252','Efr':'\uD835\uDD08','efr':'\uD835\uDD22','eg':'\u2A9A','Egrave':'\xC8','egrave':'\xE8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','Emacr':'\u0112','emacr':'\u0113','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp13':'\u2004','emsp14':'\u2005','emsp':'\u2003','ENG':'\u014A','eng':'\u014B','ensp':'\u2002','Eogon':'\u0118','eogon':'\u0119','Eopf':'\uD835\uDD3C','eopf':'\uD835\uDD56','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','Epsilon':'\u0395','epsilon':'\u03B5','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','Esim':'\u2A73','esim':'\u2242','Eta':'\u0397','eta':'\u03B7','ETH':'\xD0','eth':'\xF0','Euml':'\xCB','euml':'\xEB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','Fcy':'\u0424','fcy':'\u0444','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','Ffr':'\uD835\uDD09','ffr':'\uD835\uDD23','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','Fopf':'\uD835\uDD3D','fopf':'\uD835\uDD57','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','Gamma':'\u0393','gamma':'\u03B3','Gammad':'\u03DC','gammad':'\u03DD','gap':'\u2A86','Gbreve':'\u011E','gbreve':'\u011F','Gcedil':'\u0122','Gcirc':'\u011C','gcirc':'\u011D','Gcy':'\u0413','gcy':'\u0433','Gdot':'\u0120','gdot':'\u0121','ge':'\u2265','gE':'\u2267','gEl':'\u2A8C','gel':'\u22DB','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','gescc':'\u2AA9','ges':'\u2A7E','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','Gfr':'\uD835\uDD0A','gfr':'\uD835\uDD24','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','GJcy':'\u0403','gjcy':'\u0453','gla':'\u2AA5','gl':'\u2277','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','Gopf':'\uD835\uDD3E','gopf':'\uD835\uDD58','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','Gscr':'\uD835\uDCA2','gscr':'\u210A','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gtcc':'\u2AA7','gtcir':'\u2A7A','gt':'>','GT':'>','Gt':'\u226B','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','HARDcy':'\u042A','hardcy':'\u044A','harrcir':'\u2948','harr':'\u2194','hArr':'\u21D4','harrw':'\u21AD','Hat':'^','hbar':'\u210F','Hcirc':'\u0124','hcirc':'\u0125','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','Hstrok':'\u0126','hstrok':'\u0127','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','Iacute':'\xCD','iacute':'\xED','ic':'\u2063','Icirc':'\xCE','icirc':'\xEE','Icy':'\u0418','icy':'\u0438','Idot':'\u0130','IEcy':'\u0415','iecy':'\u0435','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','Igrave':'\xCC','igrave':'\xEC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','IJlig':'\u0132','ijlig':'\u0133','Imacr':'\u012A','imacr':'\u012B','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','Im':'\u2111','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','incare':'\u2105','in':'\u2208','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','intcal':'\u22BA','int':'\u222B','Int':'\u222C','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','IOcy':'\u0401','iocy':'\u0451','Iogon':'\u012E','iogon':'\u012F','Iopf':'\uD835\uDD40','iopf':'\uD835\uDD5A','Iota':'\u0399','iota':'\u03B9','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','Itilde':'\u0128','itilde':'\u0129','Iukcy':'\u0406','iukcy':'\u0456','Iuml':'\xCF','iuml':'\xEF','Jcirc':'\u0134','jcirc':'\u0135','Jcy':'\u0419','jcy':'\u0439','Jfr':'\uD835\uDD0D','jfr':'\uD835\uDD27','jmath':'\u0237','Jopf':'\uD835\uDD41','jopf':'\uD835\uDD5B','Jscr':'\uD835\uDCA5','jscr':'\uD835\uDCBF','Jsercy':'\u0408','jsercy':'\u0458','Jukcy':'\u0404','jukcy':'\u0454','Kappa':'\u039A','kappa':'\u03BA','kappav':'\u03F0','Kcedil':'\u0136','kcedil':'\u0137','Kcy':'\u041A','kcy':'\u043A','Kfr':'\uD835\uDD0E','kfr':'\uD835\uDD28','kgreen':'\u0138','KHcy':'\u0425','khcy':'\u0445','KJcy':'\u040C','kjcy':'\u045C','Kopf':'\uD835\uDD42','kopf':'\uD835\uDD5C','Kscr':'\uD835\uDCA6','kscr':'\uD835\uDCC0','lAarr':'\u21DA','Lacute':'\u0139','lacute':'\u013A','laemptyv':'\u29B4','lagran':'\u2112','Lambda':'\u039B','lambda':'\u03BB','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larrb':'\u21E4','larrbfs':'\u291F','larr':'\u2190','Larr':'\u219E','lArr':'\u21D0','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','latail':'\u2919','lAtail':'\u291B','lat':'\u2AAB','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','Lcaron':'\u013D','lcaron':'\u013E','Lcedil':'\u013B','lcedil':'\u013C','lceil':'\u2308','lcub':'{','Lcy':'\u041B','lcy':'\u043B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','LeftArrowBar':'\u21E4','leftarrow':'\u2190','LeftArrow':'\u2190','Leftarrow':'\u21D0','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVectorBar':'\u2959','LeftDownVector':'\u21C3','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','LeftRightArrow':'\u2194','Leftrightarrow':'\u21D4','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTeeArrow':'\u21A4','LeftTee':'\u22A3','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangleBar':'\u29CF','LeftTriangle':'\u22B2','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVectorBar':'\u2958','LeftUpVector':'\u21BF','LeftVectorBar':'\u2952','LeftVector':'\u21BC','lEg':'\u2A8B','leg':'\u22DA','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','lescc':'\u2AA8','les':'\u2A7D','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','Lfr':'\uD835\uDD0F','lfr':'\uD835\uDD29','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','LJcy':'\u0409','ljcy':'\u0459','llarr':'\u21C7','ll':'\u226A','Ll':'\u22D8','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','Lmidot':'\u013F','lmidot':'\u0140','lmoustache':'\u23B0','lmoust':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','LongLeftArrow':'\u27F5','Longleftarrow':'\u27F8','longleftrightarrow':'\u27F7','LongLeftRightArrow':'\u27F7','Longleftrightarrow':'\u27FA','longmapsto':'\u27FC','longrightarrow':'\u27F6','LongRightArrow':'\u27F6','Longrightarrow':'\u27F9','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','Lopf':'\uD835\uDD43','lopf':'\uD835\uDD5D','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','Lstrok':'\u0141','lstrok':'\u0142','ltcc':'\u2AA6','ltcir':'\u2A79','lt':'<','LT':'<','Lt':'\u226A','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','Map':'\u2905','map':'\u21A6','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','Mcy':'\u041C','mcy':'\u043C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','Mfr':'\uD835\uDD10','mfr':'\uD835\uDD2A','mho':'\u2127','micro':'\xB5','midast':'*','midcir':'\u2AF0','mid':'\u2223','middot':'\xB7','minusb':'\u229F','minus':'\u2212','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','Mopf':'\uD835\uDD44','mopf':'\uD835\uDD5E','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','Mu':'\u039C','mu':'\u03BC','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','Nacute':'\u0143','nacute':'\u0144','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natural':'\u266E','naturals':'\u2115','natur':'\u266E','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','Ncaron':'\u0147','ncaron':'\u0148','Ncedil':'\u0145','ncedil':'\u0146','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','Ncy':'\u041D','ncy':'\u043D','ndash':'\u2013','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','ne':'\u2260','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','Nfr':'\uD835\uDD11','nfr':'\uD835\uDD2B','ngE':'\u2267\u0338','nge':'\u2271','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','nGt':'\u226B\u20D2','ngt':'\u226F','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','NJcy':'\u040A','njcy':'\u045A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nlE':'\u2266\u0338','nle':'\u2270','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nLt':'\u226A\u20D2','nlt':'\u226E','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','Not':'\u2AEC','not':'\xAC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangle':'\u22EA','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangle':'\u22EB','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','nparallel':'\u2226','npar':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','nprec':'\u2280','npreceq':'\u2AAF\u0338','npre':'\u2AAF\u0338','nrarrc':'\u2933\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','Nscr':'\uD835\uDCA9','nscr':'\uD835\uDCC3','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsubE':'\u2AC5\u0338','nsube':'\u2288','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupE':'\u2AC6\u0338','nsupe':'\u2289','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','Ntilde':'\xD1','ntilde':'\xF1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','Nu':'\u039D','nu':'\u03BD','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','Oacute':'\xD3','oacute':'\xF3','oast':'\u229B','Ocirc':'\xD4','ocirc':'\xF4','ocir':'\u229A','Ocy':'\u041E','ocy':'\u043E','odash':'\u229D','Odblac':'\u0150','odblac':'\u0151','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','OElig':'\u0152','oelig':'\u0153','ofcir':'\u29BF','Ofr':'\uD835\uDD12','ofr':'\uD835\uDD2C','ogon':'\u02DB','Ograve':'\xD2','ograve':'\xF2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','Omacr':'\u014C','omacr':'\u014D','Omega':'\u03A9','omega':'\u03C9','Omicron':'\u039F','omicron':'\u03BF','omid':'\u29B6','ominus':'\u2296','Oopf':'\uD835\uDD46','oopf':'\uD835\uDD60','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','orarr':'\u21BB','Or':'\u2A54','or':'\u2228','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','Oscr':'\uD835\uDCAA','oscr':'\u2134','Oslash':'\xD8','oslash':'\xF8','osol':'\u2298','Otilde':'\xD5','otilde':'\xF5','otimesas':'\u2A36','Otimes':'\u2A37','otimes':'\u2297','Ouml':'\xD6','ouml':'\xF6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','para':'\xB6','parallel':'\u2225','par':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','Pcy':'\u041F','pcy':'\u043F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','Pfr':'\uD835\uDD13','pfr':'\uD835\uDD2D','Phi':'\u03A6','phi':'\u03C6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','Pi':'\u03A0','pi':'\u03C0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plus':'+','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','prap':'\u2AB7','Pr':'\u2ABB','pr':'\u227A','prcue':'\u227C','precapprox':'\u2AB7','prec':'\u227A','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','pre':'\u2AAF','prE':'\u2AB3','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportional':'\u221D','Proportion':'\u2237','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','Pscr':'\uD835\uDCAB','pscr':'\uD835\uDCC5','Psi':'\u03A8','psi':'\u03C8','puncsp':'\u2008','Qfr':'\uD835\uDD14','qfr':'\uD835\uDD2E','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','Qscr':'\uD835\uDCAC','qscr':'\uD835\uDCC6','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','Racute':'\u0154','racute':'\u0155','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarr':'\u2192','Rarr':'\u21A0','rArr':'\u21D2','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','Rarrtl':'\u2916','rarrtl':'\u21A3','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','Rcaron':'\u0158','rcaron':'\u0159','Rcedil':'\u0156','rcedil':'\u0157','rceil':'\u2309','rcub':'}','Rcy':'\u0420','rcy':'\u0440','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','Re':'\u211C','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','Rho':'\u03A1','rho':'\u03C1','rhov':'\u03F1','RightAngleBracket':'\u27E9','RightArrowBar':'\u21E5','rightarrow':'\u2192','RightArrow':'\u2192','Rightarrow':'\u21D2','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVectorBar':'\u2955','RightDownVector':'\u21C2','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTeeArrow':'\u21A6','RightTee':'\u22A2','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangleBar':'\u29D0','RightTriangle':'\u22B3','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVectorBar':'\u2954','RightUpVector':'\u21BE','RightVectorBar':'\u2953','RightVector':'\u21C0','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoustache':'\u23B1','rmoust':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','Sacute':'\u015A','sacute':'\u015B','sbquo':'\u201A','scap':'\u2AB8','Scaron':'\u0160','scaron':'\u0161','Sc':'\u2ABC','sc':'\u227B','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','Scedil':'\u015E','scedil':'\u015F','Scirc':'\u015C','scirc':'\u015D','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','Scy':'\u0421','scy':'\u0441','sdotb':'\u22A1','sdot':'\u22C5','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','Sfr':'\uD835\uDD16','sfr':'\uD835\uDD30','sfrown':'\u2322','sharp':'\u266F','SHCHcy':'\u0429','shchcy':'\u0449','SHcy':'\u0428','shcy':'\u0448','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','Sigma':'\u03A3','sigma':'\u03C3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','SOFTcy':'\u042C','softcy':'\u044C','solbar':'\u233F','solb':'\u29C4','sol':'/','Sopf':'\uD835\uDD4A','sopf':'\uD835\uDD64','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squ':'\u25A1','squf':'\u25AA','srarr':'\u2192','Sscr':'\uD835\uDCAE','sscr':'\uD835\uDCC8','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','Star':'\u22C6','star':'\u2606','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','subE':'\u2AC5','sube':'\u2286','subedot':'\u2AC3','submult':'\u2AC1','subnE':'\u2ACB','subne':'\u228A','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succapprox':'\u2AB8','succ':'\u227B','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','sup':'\u2283','Sup':'\u22D1','supdot':'\u2ABE','supdsub':'\u2AD8','supE':'\u2AC6','supe':'\u2287','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supnE':'\u2ACC','supne':'\u228B','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','Tau':'\u03A4','tau':'\u03C4','tbrk':'\u23B4','Tcaron':'\u0164','tcaron':'\u0165','Tcedil':'\u0162','tcedil':'\u0163','Tcy':'\u0422','tcy':'\u0442','tdot':'\u20DB','telrec':'\u2315','Tfr':'\uD835\uDD17','tfr':'\uD835\uDD31','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','Theta':'\u0398','theta':'\u03B8','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','ThinSpace':'\u2009','thinsp':'\u2009','thkap':'\u2248','thksim':'\u223C','THORN':'\xDE','thorn':'\xFE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','timesbar':'\u2A31','timesb':'\u22A0','times':'\xD7','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','topbot':'\u2336','topcir':'\u2AF1','top':'\u22A4','Topf':'\uD835\uDD4B','topf':'\uD835\uDD65','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','Tscr':'\uD835\uDCAF','tscr':'\uD835\uDCC9','TScy':'\u0426','tscy':'\u0446','TSHcy':'\u040B','tshcy':'\u045B','Tstrok':'\u0166','tstrok':'\u0167','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','Uacute':'\xDA','uacute':'\xFA','uarr':'\u2191','Uarr':'\u219F','uArr':'\u21D1','Uarrocir':'\u2949','Ubrcy':'\u040E','ubrcy':'\u045E','Ubreve':'\u016C','ubreve':'\u016D','Ucirc':'\xDB','ucirc':'\xFB','Ucy':'\u0423','ucy':'\u0443','udarr':'\u21C5','Udblac':'\u0170','udblac':'\u0171','udhar':'\u296E','ufisht':'\u297E','Ufr':'\uD835\uDD18','ufr':'\uD835\uDD32','Ugrave':'\xD9','ugrave':'\xF9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','Umacr':'\u016A','umacr':'\u016B','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','Uogon':'\u0172','uogon':'\u0173','Uopf':'\uD835\uDD4C','uopf':'\uD835\uDD66','UpArrowBar':'\u2912','uparrow':'\u2191','UpArrow':'\u2191','Uparrow':'\u21D1','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','UpDownArrow':'\u2195','Updownarrow':'\u21D5','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','Upsilon':'\u03A5','upsilon':'\u03C5','UpTeeArrow':'\u21A5','UpTee':'\u22A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','Uring':'\u016E','uring':'\u016F','urtri':'\u25F9','Uscr':'\uD835\uDCB0','uscr':'\uD835\uDCCA','utdot':'\u22F0','Utilde':'\u0168','utilde':'\u0169','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','Uuml':'\xDC','uuml':'\xFC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','Vcy':'\u0412','vcy':'\u0432','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','veebar':'\u22BB','vee':'\u2228','Vee':'\u22C1','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','Vfr':'\uD835\uDD19','vfr':'\uD835\uDD33','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','Vopf':'\uD835\uDD4D','vopf':'\uD835\uDD67','vprop':'\u221D','vrtri':'\u22B3','Vscr':'\uD835\uDCB1','vscr':'\uD835\uDCCB','vsubnE':'\u2ACB\uFE00','vsubne':'\u228A\uFE00','vsupnE':'\u2ACC\uFE00','vsupne':'\u228B\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','Wcirc':'\u0174','wcirc':'\u0175','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','Wfr':'\uD835\uDD1A','wfr':'\uD835\uDD34','Wopf':'\uD835\uDD4E','wopf':'\uD835\uDD68','wp':'\u2118','wr':'\u2240','wreath':'\u2240','Wscr':'\uD835\uDCB2','wscr':'\uD835\uDCCC','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','Xfr':'\uD835\uDD1B','xfr':'\uD835\uDD35','xharr':'\u27F7','xhArr':'\u27FA','Xi':'\u039E','xi':'\u03BE','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','Xopf':'\uD835\uDD4F','xopf':'\uD835\uDD69','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','Xscr':'\uD835\uDCB3','xscr':'\uD835\uDCCD','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','Yacute':'\xDD','yacute':'\xFD','YAcy':'\u042F','yacy':'\u044F','Ycirc':'\u0176','ycirc':'\u0177','Ycy':'\u042B','ycy':'\u044B','yen':'\xA5','Yfr':'\uD835\uDD1C','yfr':'\uD835\uDD36','YIcy':'\u0407','yicy':'\u0457','Yopf':'\uD835\uDD50','yopf':'\uD835\uDD6A','Yscr':'\uD835\uDCB4','yscr':'\uD835\uDCCE','YUcy':'\u042E','yucy':'\u044E','yuml':'\xFF','Yuml':'\u0178','Zacute':'\u0179','zacute':'\u017A','Zcaron':'\u017D','zcaron':'\u017E','Zcy':'\u0417','zcy':'\u0437','Zdot':'\u017B','zdot':'\u017C','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','Zeta':'\u0396','zeta':'\u03B6','zfr':'\uD835\uDD37','Zfr':'\u2128','ZHcy':'\u0416','zhcy':'\u0436','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','Zscr':'\uD835\uDCB5','zscr':'\uD835\uDCCF','zwj':'\u200D','zwnj':'\u200C'};
	var decodeMapLegacy = {'Aacute':'\xC1','aacute':'\xE1','Acirc':'\xC2','acirc':'\xE2','acute':'\xB4','AElig':'\xC6','aelig':'\xE6','Agrave':'\xC0','agrave':'\xE0','amp':'&','AMP':'&','Aring':'\xC5','aring':'\xE5','Atilde':'\xC3','atilde':'\xE3','Auml':'\xC4','auml':'\xE4','brvbar':'\xA6','Ccedil':'\xC7','ccedil':'\xE7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','Eacute':'\xC9','eacute':'\xE9','Ecirc':'\xCA','ecirc':'\xEA','Egrave':'\xC8','egrave':'\xE8','ETH':'\xD0','eth':'\xF0','Euml':'\xCB','euml':'\xEB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','Iacute':'\xCD','iacute':'\xED','Icirc':'\xCE','icirc':'\xEE','iexcl':'\xA1','Igrave':'\xCC','igrave':'\xEC','iquest':'\xBF','Iuml':'\xCF','iuml':'\xEF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','Ntilde':'\xD1','ntilde':'\xF1','Oacute':'\xD3','oacute':'\xF3','Ocirc':'\xD4','ocirc':'\xF4','Ograve':'\xD2','ograve':'\xF2','ordf':'\xAA','ordm':'\xBA','Oslash':'\xD8','oslash':'\xF8','Otilde':'\xD5','otilde':'\xF5','Ouml':'\xD6','ouml':'\xF6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','THORN':'\xDE','thorn':'\xFE','times':'\xD7','Uacute':'\xDA','uacute':'\xFA','Ucirc':'\xDB','ucirc':'\xFB','Ugrave':'\xD9','ugrave':'\xF9','uml':'\xA8','Uuml':'\xDC','uuml':'\xFC','Yacute':'\xDD','yacute':'\xFD','yen':'\xA5','yuml':'\xFF'};
	var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
	var invalidCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	var contains = function(array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};

	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var key;
		var result = {};
		for (key in defaults) {
			// `hasOwnProperty` check is not needed here, since only recognized
			// option names are used
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};

	// Modified version of `ucs2encode`; see http://mths.be/punycode
	var codePointToSymbol = function(codePoint, strict) {
		var output = '';
		if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
			// See issue #4:
			// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
			// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
			// REPLACEMENT CHARACTER.”
			if (strict) {
				parseError('character reference outside the permissible Unicode range');
			}
			return '\uFFFD';
		}
		if (has(decodeMapNumeric, codePoint)) {
			if (strict) {
				parseError('disallowed character reference');
			}
			return decodeMapNumeric[codePoint];
		}
		if (strict && contains(invalidCodePoints, codePoint)) {
			parseError('disallowed character reference');
		}
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};

	var hexEscape = function(symbol) {
		return '&#x' + symbol.charCodeAt(0).toString(16).toUpperCase() + ';';
	};

	var parseError = function(message) {
		throw Error('Parse error: ' + message);
	};

	/*--------------------------------------------------------------------------*/

	var encode = function(string, options) {
		options = merge(options, encode.options);
		var encodeEverything = options.encodeEverything;
		var useNamedReferences = options.useNamedReferences;
		if (encodeEverything) {
			// Encode ASCII symbols
			string = string.replace(regexASCII, function(symbol) {
				// Use named references if requested & possible
				if (useNamedReferences && has(encodeMap, symbol)) {
					return '&' + encodeMap[symbol] + ';';
				}
				return hexEscape(symbol);
			});
			// Shorten a few escapes that represent two symbols, of which at least one
			// is within the ASCII range
			if (useNamedReferences) {
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;')
					.replace(/&#x66;&#x6A;/g, '&fjlig;');
			}
			// Encode non-ASCII symbols
			if (useNamedReferences) {
				// Encode non-ASCII symbols that can be replaced with a named reference
				string = string.replace(regexEncodeNonASCII, function(string) {
					return '&' + encodeMap[string] + ';'; // no need to check `has()` here
				});
			}
			// Note: any remaining non-ASCII symbols are handled outside of the `if`
		} else if (useNamedReferences) {
			// Apply named character references
			// Encode `<>"'&` using named character references
			string = string.replace(regexEscape, function(string) {
				return '&' + encodeMap[string] + ';'; // no need to check `has()` here
			});
			// Shorten escapes that represent two symbols, of which at least one is
			// `<>"'&`
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;');
			// Encode non-ASCII symbols that can be replaced with a named reference
			string = string.replace(regexEncodeNonASCII, function(string) {
				return '&' + encodeMap[string] + ';'; // no need to check `has()` here
			});
		} else {
			// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
			// using named character references
			string = string.replace(regexEscape, hexEscape);
		}
		return string
			// Encode astral symbols
			.replace(regexAstralSymbols, function($0) {
				// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return '&#x' + codePoint.toString(16).toUpperCase() + ';';
			})
			// Encode any remaining non-ASCII symbols using a hexadecimal escape
			.replace(regexNonASCII, hexEscape);
	};
	// Expose default options (so they can be overridden globally)
	encode.options = {
		'useNamedReferences': false,
		'encodeEverything': false
	};

	var decode = function(html, options) {
		options = merge(options, decode.options);
		var strict = options.strict;
		if (strict && regexInvalidEntity.test(html)) {
			parseError('malformed character reference');
		}
		return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7) {
			var codePoint;
			var semicolon;
			var hexDigits;
			var reference;
			var next;
			if ($1) {
				// Decode decimal escapes, e.g. `&#119558;`
				codePoint = $1;
				semicolon = $2;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				return codePointToSymbol(codePoint, strict);
			}
			if ($3) {
				// Decode hexadecimal escapes, e.g. `&#x1D306;`
				hexDigits = $3;
				semicolon = $4;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint, strict);
			}
			if ($5) {
				// Decode named character references with trailing `;`, e.g. `&copy;`
				reference = $5;
				if (has(decodeMap, reference)) {
					return decodeMap[reference];
				} else {
					// ambiguous ampersand; see http://mths.be/notes/ambiguous-ampersands
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					return $0;
				}
			}
			// If we’re still here, it’s a legacy reference for sure. No need for an
			// extra `if` check.
			// Decode named character references without trailing `;`, e.g. `&amp`
			// This is only a parse error if it gets converted to `&`, or if it is
			// followed by `=` in an attribute context.
			reference = $6;
			next = $7;
			if (next && options.isAttributeValue) {
				if (strict && next == '=') {
					parseError('`&` did not start a character reference');
				}
				return $0;
			} else {
				if (strict) {
					parseError(
						'named character reference was not terminated by a semicolon'
					);
				}
				// no need to check `has()` here
				return decodeMapLegacy[reference] + (next || '');
			}
		});
	};
	// Expose default options (so they can be overridden globally)
	decode.options = {
		'isAttributeValue': false,
		'strict': false
	};

	var escape = function(string) {
		return string.replace(regexEscape, function($0) {
			return escapeMap[$0]; // no need to check `has()` here
		});
	};

	/*--------------------------------------------------------------------------*/

	var he = {
		'version': '0.3.6',
		'encode': encode,
		'decode': decode,
		'escape': escape,
		'unescape': decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return he;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = he;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (var key in he) {
				has(he, key) && (freeExports[key] = he[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.he = he;
	}

}(this));


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



//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

(function() {
  var _global = this;

  // Unique ID creation requires a high quality random # generator.  We feature
  // detect to determine the best RNG source, normalizing to a function that
  // returns 128-bits of randomness, since that's what's usually required
  var _rng;

  // Node.js crypto-based RNG - http://nodejs.org/docs/v0.6.2/api/crypto.html
  //
  // Moderately fast, high quality
  if (typeof(require) == 'function') {
    try {
      var _rb = require('crypto').randomBytes;
      _rng = _rb && function() {return _rb(16);};
    } catch(e) {}
  }

  if (!_rng && _global.crypto && crypto.getRandomValues) {
    // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
    //
    // Moderately fast, high quality
    var _rnds8 = new Uint8Array(16);
    _rng = function whatwgRNG() {
      crypto.getRandomValues(_rnds8);
      return _rnds8;
    };
  }

  if (!_rng) {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var  _rnds = new Array(16);
    _rng = function() {
      for (var i = 0, r; i < 16; i++) {
        if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
        _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
      }

      return _rnds;
    };
  }

  // Buffer class to use
  var BufferClass = typeof(Buffer) == 'function' ? Buffer : Array;

  // Maps for number <-> hex string conversion
  var _byteToHex = [];
  var _hexToByte = {};
  for (var i = 0; i < 256; i++) {
    _byteToHex[i] = (i + 0x100).toString(16).substr(1);
    _hexToByte[_byteToHex[i]] = i;
  }

  // **`parse()` - Parse a UUID into it's component bytes**
  function parse(s, buf, offset) {
    var i = (buf && offset) || 0, ii = 0;

    buf = buf || [];
    s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
      if (ii < 16) { // Don't overflow!
        buf[i + ii++] = _hexToByte[oct];
      }
    });

    // Zero out remaining bytes if string was short
    while (ii < 16) {
      buf[i + ii++] = 0;
    }

    return buf;
  }

  // **`unparse()` - Convert UUID byte array (ala parse()) into a string**
  function unparse(buf, offset) {
    var i = offset || 0, bth = _byteToHex;
    return  bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] + '-' +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]] +
            bth[buf[i++]] + bth[buf[i++]];
  }

  // **`v1()` - Generate time-based UUID**
  //
  // Inspired by https://github.com/LiosK/UUID.js
  // and http://docs.python.org/library/uuid.html

  // random #'s we need to init node and clockseq
  var _seedBytes = _rng();

  // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
  var _nodeId = [
    _seedBytes[0] | 0x01,
    _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
  ];

  // Per 4.2.2, randomize (14 bit) clockseq
  var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

  // Previous uuid creation time
  var _lastMSecs = 0, _lastNSecs = 0;

  // See https://github.com/broofa/node-uuid for API details
  function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || [];

    options = options || {};

    var clockseq = options.clockseq != null ? options.clockseq : _clockseq;

    // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs != null ? options.msecs : new Date().getTime();

    // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs != null ? options.nsecs : _lastNSecs + 1;

    // Time since last uuid creation (in msecs)
    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

    // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq == null) {
      clockseq = clockseq + 1 & 0x3fff;
    }

    // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs == null) {
      nsecs = 0;
    }

    // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
      throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
    }

    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq;

    // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000;

    // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff;

    // `time_mid`
    var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff;

    // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff;

    // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80;

    // `clock_seq_low`
    b[i++] = clockseq & 0xff;

    // `node`
    var node = options.node || _nodeId;
    for (var n = 0; n < 6; n++) {
      b[i + n] = node[n];
    }

    return buf ? buf : unparse(b);
  }

  // **`v4()` - Generate random UUID**

  // See https://github.com/broofa/node-uuid for API details
  function v4(options, buf, offset) {
    // Deprecated - 'format' argument, as supported in v1.2
    var i = buf && offset || 0;

    if (typeof(options) == 'string') {
      buf = options == 'binary' ? new BufferClass(16) : null;
      options = null;
    }
    options = options || {};

    var rnds = options.random || (options.rng || _rng)();

    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = (rnds[6] & 0x0f) | 0x40;
    rnds[8] = (rnds[8] & 0x3f) | 0x80;

    // Copy bytes to buffer, if provided
    if (buf) {
      for (var ii = 0; ii < 16; ii++) {
        buf[i + ii] = rnds[ii];
      }
    }

    return buf || unparse(rnds);
  }

  // Export public API
  var uuid = v4;
  uuid.v1 = v1;
  uuid.v4 = v4;
  uuid.parse = parse;
  uuid.unparse = unparse;
  uuid.BufferClass = BufferClass;

  if (typeof define === 'function' && define.amd) {
    // Publish as AMD module
    define(function() {return uuid;});
  } else if (typeof(module) != 'undefined' && module.exports) {
    // Publish as node.js module
    module.exports = uuid;
  } else {
    // Publish as global (in browsers)
    var _previousRoot = _global.uuid;

    // **`noConflict()` - (browser only) to reset global 'uuid' var**
    uuid.noConflict = function() {
      _global.uuid = _previousRoot;
      return uuid;
    };

    _global.uuid = uuid;
  }
}).call(this);


!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.strcase=e():"undefined"!=typeof global?global.strcase=e():"undefined"!=typeof self&&(self.strcase=e())}(function(){return function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){exports.dotCase=function(string){return exports.separatorCase(string,".")},exports.classCase=function(string){return exports.separatorCase(string,"_").replace(/(?:^|_|\-|\/)(.)/g,function(match,c){return c.toUpperCase()})},exports.namespaceCase=function(string){return exports.separatorCase(string,".").replace(/(^|_|\.|\-|\/)(.)/g,function(match,p,c){return p+c.toUpperCase()})},exports.constantCase=function(string){return exports.separatorCase(string,"_").replace(/[a-z]/g,function(c){return c.toUpperCase()})},exports.camelCase=function(string){return exports.separatorCase(string,"_").replace(/[-_\.\/\s]+(.)?/g,function(match,c){return c.toUpperCase()})},exports.titleCase=function(string){return exports.separatorCase(string," ").replace(/(?:^|\s)\S/g,function(c){return c.toUpperCase()})},exports.snakeCase=function(string){return exports.separatorCase(string,"_")},exports.pathCase=function(string){return this.separatorCase(string,"/")},exports.paramCase=function(string){return this.separatorCase(string,"-")},exports.separatorCase=function(string,separator){return exports.clean(exports.trim(string),separator).replace(/([a-z\d])([A-Z]+)/g,"$1"+separator+"$2").replace(/(([A-Z])(?=[A-Z][a-z]))/g,"$1"+separator).replace(/(([a-z])(?=[A-Z][a-z]))/g,"$1"+separator).replace(/[-\.\/\_\s]+/g,separator).toLowerCase()},exports.clean=function(string,separator){return string.replace(/\W+/g,separator||" ")},exports.trim=function(string){return string.replace(/^\W+|\W+$/g,"")}},{}]},{},[1])(1)});


var crossPlatformText={init:function(args,callback){var crossPlatformTextInstance=this;this.svg.crossPlatformTextInstance=this;var format,targetSelector=args.targetSelector,target=document.querySelector(targetSelector),targetTagName=target.tagName.toLowerCase(),targetSelection=d3.select(target),htmlContainerElements=["div","section","p"];htmlContainerElements.indexOf(this.targetTagName)>-1?(format=args.format,this[format].targetSelection=targetSelection,this.setFormat(format,targetTagName,targetSelection),crossPlatformTextInstance[format].init(args,function(viewport){callback&&callback(viewport)})):(format=targetTagName,this[format].targetImageSelection=targetSelection,this.setFormat(format,targetTagName,targetSelection),this[format].init(args,function(viewport){callback&&callback(viewport)}))},convertToPx:function(inputString,fontSize){var inputStringLowerCased,px;return pathvisiojs.utilities.isNumber(inputString)?px=inputString:(inputStringLowerCased=inputString.toLowerCase(),px=inputStringLowerCased.indexOf("em")>-1?inputStringLowerCased.slice(0,inputStringLowerCased.length-2)*fontSize:inputStringLowerCased.indexOf("px")>-1?inputStringLowerCased.slice(0,inputStringLowerCased.length-2):inputStringLowerCased.indexOf("pt")>-1?inputStringLowerCased.slice(0,inputStringLowerCased.length-2)*(4/3):inputStringLowerCased.indexOf("%")>-1?inputStringLowerCased.slice(0,inputStringLowerCased.length-1)/100*fontSize:inputString),px},setFormat:function(format,targetTagName){this[format].targetTagName=targetTagName,this.render=this[format].render}};crossPlatformText.svg={init:function(data,callback){var viewport;if(this.targetImageSelection)targetImageSelection=this.targetImageSelection,viewport=targetImageSelection.select("#viewport"),viewport[0][0]||(viewport=targetImageSelection.select("g"));else{var id=args.id||"cross-platform-text-svg";targetImageSelection=this.targetSelection.append("svg").attr("id",id).attr("version","1.1").attr("baseProfile","full").attr("xmlns","http://www.w3.org/1999/xlink").attr("xmlns:xmlns:xlink","http://www.w3.org/1999/xlink").attr("xmlns:xmlns:ev","http://www.w3.org/2001/xml-events").attr("preserveAspectRatio","xMidYMid").attr("width",width).attr("height",height),viewport=targetImageSelection.append("g").attr("id","viewport")}callback&&callback(viewport)},render:function(data,callback){var attributeDependencyOrder=(this.crossPlatformTextInstance,["fontSize"]),textContentSplitIntoLines=data.textContent.split(/\r\n|\r|\n|&#xA;/g),textLineCount=textContentSplitIntoLines.length,padding=data.padding||0,width=data.width,height=data.height,fontSize=data.fontSize,paddingInPx=crossPlatformText.convertToPx(padding,fontSize);fontSize=crossPlatformText.convertToPx(fontSize,fontSize);var textAnchor;"left"===data.textAlign?(textAnchor="start",textAlignXTranslation=paddingInPx):"right"===data.textAlign?(textAnchor="end",textAlignXTranslation=width-paddingInPx):(textAnchor="middle",textAlignXTranslation=width/2);var verticalAlignYTranslation,xTranslation=data.x+textAlignXTranslation,textAreaHeight=1.1*(textLineCount-1)*fontSize;verticalAlignYTranslation="top"===data.verticalAlign?paddingInPx+textAreaHeight/2+fontSize*(2/3):"bottom"===data.verticalAlign?height-paddingInPx-textAreaHeight/2-fontSize*(2/3):height/2;var yTranslation=data.y+verticalAlignYTranslation,transform="translate("+xTranslation+" "+yTranslation+")",textAreaSelection=targetImageSelection.select(data.containerSelector).append("g").attr("transform",transform),result=(textAreaSelection.selectAll("text").data(textContentSplitIntoLines).enter().append("text").attr("id",function(d,i){return"text-line"+i}).attr("x",0).attr("y",function(d,i){return 1.1*(i-(textLineCount-1)/2)+"em"}).attr("dominant-baseline","central").attr("text-anchor",textAnchor).text(function(d){return d}),{}),attributes=[];result.elementName="g";var backgroundColor=data.backgroundColor||"transparent";attributes.push({name:"fill",value:backgroundColor});var attributeListItemName,attributeListItemValue,svgTextAttributeGenerator={color:function(colorValue){textAreaSelection.attr("fill",colorValue)},id:function(idValue){textAreaSelection.attr("id","text-for-"+idValue)},fill:function(fillValue){textAreaSelection.attr("fill",fillValue)},fillOpacity:function(fillOpacityValue){textAreaSelection.attr("fill-opacity",fillOpacityValue)},fontFamily:function(fontFamilyValue){textAreaSelection.attr("font-family",fontFamilyValue)},fontSize:function(fontSizeValue){textAreaSelection.attr("font-size",fontSizeValue)},fontStyle:function(fontStyleValue){textAreaSelection.attr("font-style",fontStyleValue)},fontWeight:function(fontWeightValue){textAreaSelection.attr("font-weight",fontWeightValue)},rotation:function(rotationValue){transform+=" rotate("+rotationValue+","+(width/2-textAlignXTranslation)+","+(height/2-verticalAlignYTranslation)+")",textAreaSelection.attr("transform",transform)}},attributeList=d3.map(data).entries().sort(function(a,b){return attributeDependencyOrder.indexOf(a.key)-attributeDependencyOrder.indexOf(b.key)});attributeList.forEach(function(attributeListItem){attributeListItemName=attributeListItem.key,attributeListItemValue=attributeListItem.value,svgTextAttributeGenerator.hasOwnProperty(attributeListItemName)&&svgTextAttributeGenerator[attributeListItemName](attributeListItemValue)}),callback&&callback(textAreaSelection[0][0])}},crossPlatformText.canvas={};

var crossPlatformShapesNS=crossPlatformShapesNS||{};crossPlatformShapesNS["markers.svg"]='<svg id="markers" version="1.1" baseProfile="full" xmlns="http://www.w3.org/1999/xlink" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" preserveAspectRatio="xMidYMid">\n<g>\n<desc>This SVG file contains a set of markers that can be duplicated for other colors.</desc>\n</g>\n<title>markers</title>\n<defs>\n<marker id="shape-library-markers-arrow-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-arrow-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- arrow markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker>\n<marker id="shape-library-markers-arrow-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-arrow-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- arrow markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker>\n<marker id="shape-library-markers-mim-necessary-stimulation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 16 12" markerWidth="16" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6">\n<g id="g-src-shape-library-markers-mim-necessary-stimulation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-necessary-stimulation markers: triangular polygons, drawing-board fill, default color stroke; and vertical line -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line fill="none" stroke-width="1" x1="14" y1="0" x2="14" y2="12"></line>\n	<line fill="none" stroke="none" x1="16" y1="6" x2="16" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 9,11 9,1"></polygon>\n\n</g></marker>\n<marker id="shape-library-markers-mim-necessary-stimulation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 16 12" markerWidth="16" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="16" refY="6"><g id="g-src-shape-library-markers-mim-necessary-stimulation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 8, 6)">\n\n	<!-- mim-necessary-stimulation markers: triangular polygons, drawing-board fill, default color stroke; and vertical line -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line fill="none" stroke-width="1" x1="14" y1="0" x2="14" y2="12"></line>\n	<line fill="none" stroke="none" x1="16" y1="6" x2="16" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 9,11 9,1"></polygon>\n\n</g></marker>\n<marker id="shape-library-markers-mim-binding-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-binding-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-binding markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker>\n<marker id="shape-library-markers-mim-binding-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-binding-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-binding markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker>\n<marker id="shape-library-markers-mim-conversion-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-conversion-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-conversion markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker>\n<marker id="shape-library-markers-mim-conversion-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-conversion-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-conversion markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker>\n<marker id="shape-library-markers-mim-stimulation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-stimulation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-stimulation markers: triangular polygons, drawing-board fill, default color stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line stroke="none" fill="none" x1="12" y1="6" x2="12" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 11,11 11,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-stimulation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-stimulation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-stimulation markers: triangular polygons, drawing-board fill, default color stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line stroke="none" fill="none" x1="12" y1="6" x2="12" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 11,11 11,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-modification-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-modification-svg-start-default" class="default-fill-color solid-stroke">\n\n	<!-- mim-modification markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-modification-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-modification-svg-end-default" class="default-fill-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-modification markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-catalysis-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-catalysis-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-catalysis markers: circle, drawing-board fill and default color stroke -->\n\n	<circle cx="6.0" cy="6" r="5.3px" stroke-width="1px"></circle>\n\n</g></marker><marker id="shape-library-markers-mim-catalysis-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-catalysis-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-catalysis markers: circle, drawing-board fill and default color stroke -->\n\n	<circle cx="6.0" cy="6" r="5.3px" stroke-width="1px"></circle>\n\n</g></marker><marker id="shape-library-markers-mim-inhibition-svg-start-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="0" refY="10"><g id="g-src-shape-library-markers-mim-inhibition-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-inhibition markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-mim-inhibition-svg-end-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="10" refY="10"><g id="g-src-shape-library-markers-mim-inhibition-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 5, 10)">\n\n	<!-- mim-inhibition markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-mim-cleavage-svg-start-default" preserveAspectRatio="none" viewBox="0 0 20 30" markerWidth="20" markerHeight="30" markerUnits="strokeWidth" orient="auto" refX="9" refY="15"><g id="g-src-shape-library-markers-mim-cleavage-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-cleavage markers: two lines and extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="14.3" width="18.4" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="18" y1="14.5" x2="18" y2="30"></line>	\n	<line fill="none" stroke-width="1" x1="18" y1="30" x2="0" y2="0"></line>	\n\n\n</g></marker><marker id="shape-library-markers-mim-cleavage-svg-end-default" preserveAspectRatio="none" viewBox="0 0 20 30" markerWidth="20" markerHeight="30" markerUnits="strokeWidth" orient="auto" refX="10" refY="15"><g id="g-src-shape-library-markers-mim-cleavage-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 10, 15)">\n\n	<!-- mim-cleavage markers: two lines and extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="14.3" width="18.4" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="18" y1="14.5" x2="18" y2="30"></line>	\n	<line fill="none" stroke-width="1" x1="18" y1="30" x2="0" y2="0"></line>	\n\n\n</g></marker><marker id="shape-library-markers-mim-covalent-bond-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="6"><g id="g-src-shape-library-markers-mim-covalent-bond-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-covalent-bond markers: not much to see here! -->\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-covalent-bond-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="11" refY="6"><g id="g-src-shape-library-markers-mim-covalent-bond-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-covalent-bond markers: not much to see here! -->\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-transcription-translation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 20 24" markerWidth="20" markerHeight="24" markerUnits="strokeWidth" orient="auto" refX="0" refY="12"><g id="g-src-shape-library-markers-mim-transcription-translation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-transcription-translation markers: two lines and an open trigular polygon, plus extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="11" width="12" height="2"></rect>\n	<line fill="none" stroke-width="1" x1="15" y1="12" x2="15" y2="5"></line>\n	<line fill="none" stroke-width="1" x1="15.5" y1="5" x2="8" y2="5"></line>\n	<polygon stroke-width="1" points="0,5 8,1 8,9"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-transcription-translation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 20 24" markerWidth="20" markerHeight="24" markerUnits="strokeWidth" orient="auto" refX="20" refY="12"><g id="g-src-shape-library-markers-mim-transcription-translation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 10, 12)">\n\n	<!-- mim-transcription-translation markers: two lines and an open trigular polygon, plus extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="11" width="12" height="2"></rect>\n	<line fill="none" stroke-width="1" x1="15" y1="12" x2="15" y2="5"></line>\n	<line fill="none" stroke-width="1" x1="15.5" y1="5" x2="8" y2="5"></line>\n	<polygon stroke-width="1" points="0,5 8,1 8,9"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-gap-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-gap-svg-start-default" class="board-fill-color solid-stroke">\n\n	<!-- mim-gap markers: just an extended drawing-board rect -->\n	<!-- \n	TODO This could be refactored to make the shape match the viewbox.\n	It can overlap the side of the shape, blanking out a small part of it when the edge is at an angle.\n	-->\n\n	<rect stroke="none" x="0" y="5.3" width="8" height="1.4"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-gap-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-gap-svg-end-default" class="board-fill-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-gap markers: just an extended drawing-board rect -->\n	<!-- \n	TODO This could be refactored to make the shape match the viewbox.\n	It can overlap the side of the shape, blanking out a small part of it when the edge is at an angle.\n	-->\n\n	<rect stroke="none" x="0" y="5.3" width="8" height="1.4"></rect>\n\n</g></marker><marker id="shape-library-markers-t-bar-svg-start-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="0" refY="10"><g id="g-src-shape-library-markers-t-bar-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n        <!-- t-bar markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-t-bar-svg-end-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="10" refY="10"><g id="g-src-shape-library-markers-t-bar-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 5, 10)">\n\n        <!-- t-bar markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-none-svg-start-default" preserveAspectRatio="none" viewBox="0 0 0 0" markerWidth="0" markerHeight="0" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-none-svg-start-default" class="board-fill-color board-stroke-color node shape">\n\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-none-svg-end-default" preserveAspectRatio="none" viewBox="0 0 0 0" markerWidth="0" markerHeight="0" markerUnits="strokeWidth" orient="auto" refX="11" refY="6"><g id="g-src-shape-library-markers-none-svg-end-default" class="board-fill-color board-stroke-color node shape" transform="rotate(180, 0, 0)">\n\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-branching-left-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0.4" refY="6"><g id="g-src-shape-library-markers-mim-branching-left-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-branching-left markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="3.9" y1="6.2" x2="0.2" y2="0"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-left-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="11.6" refY="6"><g id="g-src-shape-library-markers-mim-branching-left-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-branching-left markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="3.9" y1="6.2" x2="0.2" y2="0"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-right-svg-start-default" preserveAspectRatio="none" viewBox="0 0 4 12" markerWidth="4" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0.4" refY="6"><g id="g-src-shape-library-markers-mim-branching-right-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-branching-right markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="0.2" y1="12" x2="3.9" y2="5.8"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-right-svg-end-default" preserveAspectRatio="none" viewBox="0 0 4 12" markerWidth="4" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="3.6" refY="6"><g id="g-src-shape-library-markers-mim-branching-right-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 2, 6)">\n\n	<!-- mim-branching-right markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="0.2" y1="12" x2="3.9" y2="5.8"></line>	\n\n</g>\n</marker>\n<style type="text/css">	\n	/* default color for pathway elements */\n	.default-fill-color {\n		fill: black; \n	}\n	.default-stroke-color {\n		stroke: black;\n	}\n	\n	/* default color of the background drawing board */ 	\n	.board-fill-color {\n		fill: white;\n	}\n	.board-stroke-color {\n		stroke: white;\n	}\n\n	marker {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n</style>\n</defs>\n</svg>\n';var crossPlatformShapes={init:function(args,callback){var customShapes=args.customShapes,crossPlatformShapesInstance=this;this.svg.crossPlatformShapesInstance=this.svg.path.crossPlatformShapesInstance=crossPlatformShapesInstance;var format,targetSelector=args.targetSelector,target=document.querySelector(targetSelector),targetTagName=target.tagName.toLowerCase(),targetSelection=d3.select(target);"div"===targetTagName?(format=args.format,this[format].targetSelection=targetSelection,this.setFormat(format,customShapes,targetTagName,targetSelection),crossPlatformShapesInstance[format].init(args,function(viewport){callback&&callback(viewport)})):(format=targetTagName,this[format].targetImageSelection=targetSelection,this.setFormat(format,customShapes,targetTagName,targetSelection),this[format].init(args,function(viewport){callback&&callback(viewport)}))},setFormat:function(format,customShapes,targetTagName){var crossPlatformShapesInstance=this;this[format].targetTagName=targetTagName;var presetShapesNames=["arc","arrow","brace","complex","endoplasmicReticulum","golgiApparatus","hexagon","lineCurved","lineElbow","lineSegmented","lineStraight","mimDegradation","mitochondria","ellipseDouble","ellipse","pentagon","rectangle","roundedRectangleDouble","roundedRectangle","sarcoplasmicReticulum","triangle","mimNecessaryStimulation","mimBinding","mimConversion","mimStimulation","mimModification","mimCatalysis","mimInhibition","mimCleavage","mimCovalentBond","mimTranscriptionTranslation","mimGap","tBar","mimBranchingLeft","mimBranchingRight"];presetShapesNames.forEach(function(presetShapeName){crossPlatformShapesInstance[presetShapeName]=function(data,callback){return crossPlatformShapesInstance[format].path.render(presetShapeName,data,callback)}}),customShapes&&(crossPlatformShapesInstance.customShapes=customShapes,crossPlatformShapesInstance[format].image.customShapes=customShapes,d3.map(customShapes).keys().forEach(function(customShapeName){crossPlatformShapesInstance[customShapeName]=function(data,callback){return crossPlatformShapesInstance[format].image.render(customShapeName,data,callback)}}))}};crossPlatformShapes.pathCalculator={},crossPlatformShapes.pathCalculator.arc=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,yControlPoint=height*(2/3),pathData=[{command:"moveTo",points:[x,y]},{command:"bezierCurveTo",points:[x,y+yControlPoint,x+width,y+yControlPoint,x+width,y]}];return pathData},crossPlatformShapes.pathCalculator.arrow=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,pathData=[{command:"moveTo",points:[x,y]},{command:"lineTo",points:[x+width,y+height/2]},{command:"lineTo",points:[x,y+height]},{command:"closePath",points:[]}];return pathData},crossPlatformShapes.pathCalculator.brace=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,pathData=[{command:"moveTo",points:[x,y+height]},{command:"bezierCurveTo",points:[x,y,x+width/2,y+height,x+width/2,y]},{command:"bezierCurveTo",points:[x+width/2,y+height,x+width,y,x+width,y+height]}];return pathData},crossPlatformShapes.pathCalculator.complex=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,pathData=[{command:"moveTo",points:[x+18,y]},{command:"lineTo",points:[x+width-18,y]},{command:"lineTo",points:[x+width,y+18]},{command:"lineTo",points:[x+width,y+height-18]},{command:"lineTo",points:[x+width-18,y+height]},{command:"lineTo",points:[x+18,y+height]},{command:"lineTo",points:[x,y+height-18]},{command:"lineTo",points:[x,y+18]},{command:"closePath",points:[]}];return pathData},crossPlatformShapes.pathCalculator.endoplasmicReticulum=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,pathData=[{command:"moveTo",points:[x,y]},{command:"lineTo",points:[x+width,y]},{command:"lineTo",points:[x+width,y+height]},{command:"lineTo",points:[x,y+height]},{command:"closePath",points:[]}];return pathData},crossPlatformShapes.pathCalculator.golgiApparatus=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,pathData=[{command:"moveTo",points:[x,y]},{command:"lineTo",points:[x+width,y]},{command:"lineTo",points:[x+width,y+height]},{command:"lineTo",points:[x,y+height]},{command:"closePath",points:[]}];return pathData},crossPlatformShapes.pathCalculator.hexagon=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,pathData=[{command:"moveTo",points:[x,y]},{command:"lineTo",points:[x+width,y]},{command:"lineTo",points:[x+width,y+height]},{command:"lineTo",points:[x,y+height]},{command:"closePath",points:[]}];return pathData},crossPlatformShapes.pathCalculator.lineCurved=function(data){"use strict";var svgCurve=d3.svg.line().x(function(d){return d.x}).y(function(d){return d.y}).interpolate("basis"),pathData=svgCurve(data.points);return pathData},crossPlatformShapes.pathCalculator.lineElbow=function(data){"use strict";var svgLine=d3.svg.line().x(function(d){return d.x}).y(function(d){return d.y}).interpolate("linear"),pathData=svgLine(data.points);return pathData},crossPlatformShapes.pathCalculator.lineSegmented=function(data){"use strict";var svgLine=d3.svg.line().x(function(d){return d.x}).y(function(d){return d.y}).interpolate("linear"),pathData=svgLine(data.points);return pathData},crossPlatformShapes.pathCalculator.lineStraight=function(data){"use strict";var x0=data.points[0].x,y0=data.points[0].y,x1=data.points[1].x,y1=data.points[1].y,pathData=[{command:"moveTo",points:[x0,y0]},{command:"lineTo",points:[x1,y1]}];return pathData},crossPlatformShapes.pathCalculator.mimDegradation=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,ellipse=crossPlatformShapes.pathCalculator.ellipse(data),line=[{command:"moveTo",points:[x,y]},{command:"lineTo",points:[x+width,y+height]}],pathData=ellipse.concat(line);return pathData},crossPlatformShapes.pathCalculator.mitochondria=function(data){"use strict";var outerEllipse=(data.x,data.y,data.width,data.height,crossPlatformShapes.pathCalculator.ellipse(data)),pathData=outerEllipse;return pathData},crossPlatformShapes.pathCalculator.ellipseDouble=function(data){"use strict";var outerEllipse=crossPlatformShapes.pathCalculator.ellipse(data),innerEllipseData=data,doubleLineGap=2*data.borderWidth||6;innerEllipseData.x=data.x+doubleLineGap,innerEllipseData.y=data.y+doubleLineGap,innerEllipseData.width=data.width-2*doubleLineGap,innerEllipseData.height=data.height-2*doubleLineGap;var innerEllipse=crossPlatformShapes.pathCalculator.ellipse(innerEllipseData),pathData=outerEllipse.concat(innerEllipse);return pathData},crossPlatformShapes.pathCalculator.ellipse=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,cx=x+width/2,cy=y+height/2,width_two_thirds=2*width/3,height_over_2=height/2,pathData=[{command:"moveTo",points:[cx,cy-height_over_2]},{command:"bezierCurveTo",points:[cx+width_two_thirds,cy-height_over_2,cx+width_two_thirds,cy+height_over_2,cx,cy+height_over_2]},{command:"bezierCurveTo",points:[cx-width_two_thirds,cy+height_over_2,cx-width_two_thirds,cy-height_over_2,cx,cy-height_over_2]}];return pathData},crossPlatformShapes.pathCalculator.pentagon=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,pathData=[{command:"moveTo",points:[x,y]},{command:"lineTo",points:[x+width,y]},{command:"lineTo",points:[x+width,y+height]},{command:"lineTo",points:[x,y+height]},{command:"closePath",points:[]}];return pathData},crossPlatformShapes.pathCalculator.rectangle=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,pathData=[{command:"moveTo",points:[x,y]},{command:"lineTo",points:[x+width,y]},{command:"lineTo",points:[x+width,y+height]},{command:"lineTo",points:[x,y+height]},{command:"closePath",points:[]}];return pathData},crossPlatformShapes.pathCalculator.roundedRectangleDouble=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,borderWidth=data.borderWidth,outerRoundedRectangle=crossPlatformShapes.pathCalculator.roundedRectangle(data),innerRoundedRectangleData=data,doubleLineGap=2*borderWidth||6;innerRoundedRectangleData.x=x+doubleLineGap,innerRoundedRectangleData.y=y+doubleLineGap,innerRoundedRectangleData.width=width-2*doubleLineGap,innerRoundedRectangleData.height=height-2*doubleLineGap;var innerRoundedRectangle=crossPlatformShapes.pathCalculator.roundedRectangle(innerRoundedRectangleData),pathData=outerRoundedRectangle.concat(innerRoundedRectangle);return pathData},crossPlatformShapes.pathCalculator.roundedRectangle=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,pathData=[{command:"moveTo",points:[x,y+10]},{command:"bezierCurveTo",points:[x,y+10-5.43379,x+4.56621,y,x+10,y]},{command:"lineTo",points:[x+width-10,y]},{command:"bezierCurveTo",points:[x+width-10+5.43379,y,x+width,y+4.56621,x+width,y+10]},{command:"lineTo",points:[x+width,y+height-10]},{command:"bezierCurveTo",points:[x+width,y+height-10+5.43379,x+width-4.56621,y+height,x+width-10,y+height]},{command:"lineTo",points:[x+10,y+height]},{command:"bezierCurveTo",points:[x+10-5.43379,y+height,x,y+height-4.56621,x,y+height-10]},{command:"closePath",points:[]}];return pathData},crossPlatformShapes.pathCalculator.sarcoplasmicReticulum=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,pathData=[{command:"moveTo",points:[x,y]},{command:"lineTo",points:[x+width,y]},{command:"lineTo",points:[x+width,y+height]},{command:"lineTo",points:[x,y+height]},{command:"closePath",points:[]}];return pathData},crossPlatformShapes.pathCalculator.triangle=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,pathData=[{command:"moveTo",points:[x,y]},{command:"lineTo",points:[x+width,y]},{command:"lineTo",points:[x+width,y+height]},{command:"lineTo",points:[x,y+height]},{command:"closePath",points:[]}];return pathData},crossPlatformShapes.pathCalculator.arc=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,yControlPoint=height*(2/3),pathData=[{command:"moveTo",points:[x,y]},{command:"bezierCurveTo",points:[x,y+yControlPoint,x+width,y+yControlPoint,x+width,y]}];return pathData},crossPlatformShapes.pathCalculator.arc=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,yControlPoint=height*(2/3),pathData=[{command:"moveTo",points:[x,y]},{command:"bezierCurveTo",points:[x,y+yControlPoint,x+width,y+yControlPoint,x+width,y]}];return pathData},crossPlatformShapes.pathCalculator.arc=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,yControlPoint=height*(2/3),pathData=[{command:"moveTo",points:[x,y]},{command:"bezierCurveTo",points:[x,y+yControlPoint,x+width,y+yControlPoint,x+width,y]}];return pathData},crossPlatformShapes.pathCalculator.arc=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,yControlPoint=height*(2/3),pathData=[{command:"moveTo",points:[x,y]},{command:"bezierCurveTo",points:[x,y+yControlPoint,x+width,y+yControlPoint,x+width,y]}];return pathData},crossPlatformShapes.pathCalculator.arc=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,yControlPoint=height*(2/3),pathData=[{command:"moveTo",points:[x,y]},{command:"bezierCurveTo",points:[x,y+yControlPoint,x+width,y+yControlPoint,x+width,y]}];
return pathData},crossPlatformShapes.pathCalculator.arc=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,yControlPoint=height*(2/3),pathData=[{command:"moveTo",points:[x,y]},{command:"bezierCurveTo",points:[x,y+yControlPoint,x+width,y+yControlPoint,x+width,y]}];return pathData},crossPlatformShapes.pathCalculator.arc=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,yControlPoint=height*(2/3),pathData=[{command:"moveTo",points:[x,y]},{command:"bezierCurveTo",points:[x,y+yControlPoint,x+width,y+yControlPoint,x+width,y]}];return pathData},crossPlatformShapes.pathCalculator.arc=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,yControlPoint=height*(2/3),pathData=[{command:"moveTo",points:[x,y]},{command:"bezierCurveTo",points:[x,y+yControlPoint,x+width,y+yControlPoint,x+width,y]}];return pathData},crossPlatformShapes.pathCalculator.arc=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,yControlPoint=height*(2/3),pathData=[{command:"moveTo",points:[x,y]},{command:"bezierCurveTo",points:[x,y+yControlPoint,x+width,y+yControlPoint,x+width,y]}];return pathData},crossPlatformShapes.pathCalculator.tBar=function(data){"use strict";var x=data.x,y=data.y,height=(data.width,data.height),pathData=[{command:"moveTo",points:[x,y]},{command:"lineTo",points:[x,y+height]}];return pathData},crossPlatformShapes.pathCalculator.arc=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,yControlPoint=height*(2/3),pathData=[{command:"moveTo",points:[x,y]},{command:"bezierCurveTo",points:[x,y+yControlPoint,x+width,y+yControlPoint,x+width,y]}];return pathData},crossPlatformShapes.pathCalculator.arc=function(data){"use strict";var x=data.x,y=data.y,width=data.width,height=data.height,yControlPoint=height*(2/3),pathData=[{command:"moveTo",points:[x,y]},{command:"bezierCurveTo",points:[x,y+yControlPoint,x+width,y+yControlPoint,x+width,y]}];return pathData},crossPlatformShapes.customShapes={arc:{href:"http://www.example.org/arc.png"},brace:{href:"http://www.example.org/brace.png"},rectangle:{href:"http://www.example.org/rectangle.png"}},crossPlatformShapes.svg={init:function(args,callback){{var viewport,defs,width=args.width||"100%",height=args.height||"100%",backgroundColor=args.backgroundColor||"#ffffff";this.crossPlatformShapesInstance}if("svg"!==this.targetTagName){var id=args.id||"cross-platform-shape-svg";targetImageSelection=this.targetSelection.append("svg").attr("id",id).attr("version","1.1").attr("baseProfile","full").attr("xmlns","http://www.w3.org/1999/xlink").attr("xmlns:xmlns:xlink","http://www.w3.org/1999/xlink").attr("xmlns:xmlns:ev","http://www.w3.org/2001/xml-events").attr("preserveAspectRatio","xMidYMid").attr("width",width).attr("height",height).attr("style","background-color:"+backgroundColor+"; "),this.path.targetImageSelection=this.image.targetImageSelection=targetImageSelection,defs=targetImageSelection.append("defs").attr("id","defs"),this.marker.targetImageSelectionDefs=defs,viewport=targetImageSelection.append("g").attr("id","viewport")}else targetImageSelection=this.targetImageSelection,this.path.targetImageSelection=this.image.targetImageSelection=targetImageSelection,this.marker.targetImageSelectionDefs=this.targetImageSelection.select("defs"),viewport=targetImageSelection.select("#viewport"),viewport[0][0]||(viewport=targetImageSelection.select("g"));this.path.availableMarkers=this.marker.availableMarkers={},this.path.backgroundColor=this.marker.backgroundColor=backgroundColor,targetImageSelection.attr("style","background-color:"+backgroundColor+"; "),callback&&callback(viewport)}},crossPlatformShapes.svg.image={render:function(shapeName,data,callback){var customShapes=this.customShapes,shapeSelection=targetImageSelection.select(data.containerSelector).append("image").attr("xlink:xlink:href",customShapes[shapeName].href).attr("x",data.x||0).attr("y",data.y||0).attr("width",data.width||0).attr("height",data.height||0),rotation=data.rotation;rotation&&shapeSelection.attr("transform","rotate("+rotation+","+(data.x+data.width/2)+","+(data.y+data.height/2)+")"),callback&&callback(shapeSelection[0][0])}},crossPlatformShapes.svg.marker={generateId:function(name,position,color){var id=("id-"+name+"-"+position+"-"+color).replace(/[^A-Za-z0-9-]/g,"").toLowerCase();return id},append:function(name,position,color,callback){var availableMarkers=this.availableMarkers,targetImageSelectionDefs=this.targetImageSelectionDefs,backgroundColor=this.backgroundColor,markerData={arrow:{markerElement:{markerWidth:12,markerHeight:12},shapes:[{elementTag:"rect",x:0,y:5.4,width:2,height:1.2,stroke:backgroundColor,fill:backgroundColor},{elementTag:"polygon",points:"12,11 0,6 12,1","stroke-width":0,fill:color}]},mimBinding:{markerElement:{markerWidth:12,markerHeight:12},shapes:[{elementTag:"rect",x:0,y:5.4,width:2,height:1.2,stroke:backgroundColor,fill:backgroundColor},{elementTag:"polygon",points:"12,12 0,6 12,0 5,6","stroke-width":0,fill:color}]},mimNecessaryStimulation:{markerElement:{markerWidth:16,markerHeight:12},shapes:[{elementTag:"rect",x:0,y:5.4,width:2,height:1.2,stroke:"none",fill:backgroundColor},{elementTag:"line",x1:14,y1:0,x2:14,y2:12,stroke:color,"stroke-width":1,fill:"none"},{elementTag:"line",x1:16,y1:6,x2:16,y2:6,stroke:"none",fill:"none"},{elementTag:"polygon",points:"0,6 9,11 9,1","stroke-width":1,stroke:color,fill:backgroundColor}]},mimStimulation:{markerElement:{markerWidth:12,markerHeight:12},shapes:[{elementTag:"rect",x:0,y:5.4,width:2,height:1.2,stroke:"none",fill:backgroundColor},{elementTag:"line",x1:12,y1:6,x2:12,y2:6,stroke:"none",fill:"none"},{elementTag:"polygon",points:"0,6 11,11 11,1","stroke-width":1,stroke:color,fill:backgroundColor}]},mimModification:{markerElement:{markerWidth:12,markerHeight:12},shapes:[{elementTag:"rect",x:0,y:5.4,width:2,height:1.2,stroke:backgroundColor,fill:backgroundColor},{elementTag:"polygon",points:"12,12 0,6 12,0 5,6","stroke-width":0,fill:color}]},mimCatalysis:{markerElement:{markerWidth:12,markerHeight:12},shapes:[{elementTag:"circle",cx:6,cy:6,r:"5.3px",stroke:color,"stroke-width":1,fill:backgroundColor}]},mimCleavage:{markerElement:{markerWidth:20,markerHeight:30},shapes:[{elementTag:"rect",x:0,y:14.3,width:18.4,height:1.4,stroke:backgroundColor,fill:backgroundColor},{elementTag:"line",stroke:color,"stroke-width":1,x1:18,y1:14.5,x2:18,y2:30},{elementTag:"line",stroke:color,"stroke-width":1,x1:18,y1:30,x2:0,y2:0}]},mimCovalentBond:{markerElement:{markerWidth:12,markerHeight:12},shapes:[{elementTag:"rect",x:0,y:0,width:0,height:0,stroke:backgroundColor,"stroke-width":0,fill:backgroundColor}]},mimTranscriptionTranslation:{markerElement:{markerWidth:20,markerHeight:24},shapes:[{elementTag:"rect",x:0,y:11,width:12,height:2,stroke:backgroundColor,fill:backgroundColor},{elementTag:"line",stroke:color,fill:"none","stroke-width":1,x1:15,y1:12,x2:15,y2:5},{elementTag:"line",stroke:color,fill:"none","stroke-width":1,x1:15.5,y1:5,x2:8,y2:5},{elementTag:"polygon",points:"0,5 8,1 8,9","stroke-width":1,stroke:color,fill:backgroundColor}]},mimGap:{markerElement:{markerWidth:12,markerHeight:12},shapes:[{elementTag:"rect",x:0,y:5.3,width:8,height:1.4,stroke:"none",fill:backgroundColor}]},mimBranchingLeft:{markerElement:{markerWidth:12,markerHeight:12},shapes:[{elementTag:"rect",x:.4,y:5.3,width:3.1,height:1.4,fill:backgroundColor,stroke:"none"},{elementTag:"line",fill:"none",stroke:color,"stroke-width":1,x1:3.9,y1:6.2,x2:.2,y2:0}]},mimBranchingRight:{markerElement:{markerWidth:12,markerHeight:12},shapes:[{elementTag:"rect",x:.4,y:5.3,width:3.1,height:1.4,fill:backgroundColor,stroke:"none"},{elementTag:"line",fill:"none",stroke:color,"stroke-width":1,x1:.2,y1:12,x2:3.9,y2:5.8}]},tBar:{markerElement:{markerWidth:10,markerHeight:20},shapes:[{elementTag:"rect",x:0,y:9,width:8,height:2,fill:backgroundColor},{elementTag:"line",x:0,y:0,width:12,height:12,stroke:color,"stroke-width":1.8,x1:7,y1:0,x2:7,y2:20}]}};if(markerData.mimInhibition=markerData.tBar,markerData.mimConversion=markerData.arrow,markerData[name]){var markerId=this.generateId(name,position,color),markerAttributeValue="url(#"+markerId+")";if(availableMarkers[markerId])callback(markerAttributeValue);else{var marker=targetImageSelectionDefs.append("marker").attr("id",markerId).attr("orient","auto").attr("markerUnits","strokeWidth").attr("preserveAspectRatio","none").attr("refY",markerData[name].markerElement.markerHeight/2).attr("viewBox","0 0 "+markerData[name].markerElement.markerWidth+" "+markerData[name].markerElement.markerHeight);d3.map(markerData[name].markerElement).entries().forEach(function(attribute){marker.attr(attribute.key,attribute.value)}),"end"===position?marker.attr("refX",markerData[name].markerElement.markerWidth):marker.attr("refX",0);var markerContainer=marker.append("g").attr("id","g-"+markerId);"end"===position&&markerContainer.attr("transform","rotate(180, "+markerData[name].markerElement.markerWidth/2+", "+markerData[name].markerElement.markerHeight/2+")"),markerData[name].shapes.forEach(function(shape){var shapeSelection=markerContainer.append(shape.elementTag);d3.map(shape).entries().forEach(function(attribute){"elementTag"!==attribute.key&&shapeSelection.attr(attribute.key,attribute.value)})}),availableMarkers[markerId]=!0,callback(markerAttributeValue)}}else console.warn('Marker (arrowhead) named "'+name+'" is not available.'),callback("none")}},crossPlatformShapes.svg.path={generateMarkerId:function(name,position,color){var id=("id-"+name+"-"+position+"-"+color).replace(/[^A-Za-z0-9-]/g,"").toLowerCase();return id},render:function(shapeName,data,callback){var targetImageSelection=this.targetImageSelection,crossPlatformShapesInstance=(this.availableMarkers,this.crossPlatformShapesInstance),attributeDependencyOrder=["color","markerStart","markerEnd"],canvasPathCommandToSvgPathCommandMappings={moveTo:"M",lineTo:"L",closePath:"Z",bezierCurveTo:"C",quadraticCurveTo:"Q"},shapeSelection=targetImageSelection.select(data.containerSelector).append("path"),shapesUsingD3PathGenerators=["lineCurved","lineElbow","lineSegmented"],d="";if(-1===shapesUsingD3PathGenerators.indexOf(shapeName)){var pathSegments=crossPlatformShapes.pathCalculator[shapeName](data);pathSegments.forEach(function(pathSegment){d+=canvasPathCommandToSvgPathCommandMappings[pathSegment.command],d+=pathSegment.points.join(",")})}else d=crossPlatformShapes.pathCalculator[shapeName](data);shapeSelection.attr("d",d);var backgroundColor=data.backgroundColor||"transparent";shapeSelection.attr("fill",backgroundColor);var color,attributeListItemName,attributeListItemValue,svgPathAttributeGenerator={id:function(idValue){shapeSelection.attr("id",idValue)},strokeDasharray:function(strokeDasharrayValue){shapeSelection.attr("stroke-dasharray",strokeDasharrayValue)},fillOpacity:function(fillOpacityValue){shapeSelection.attr("fill-opacity",fillOpacityValue)},color:function(colorValue){color=colorValue,shapeSelection.attr("stroke",colorValue)},markerStart:function(markerStartValue){crossPlatformShapesInstance.svg.marker.append(markerStartValue,"start",color,function(markerAttributeValue){shapeSelection.attr("marker-start",markerAttributeValue)})},markerEnd:function(markerEndValue){crossPlatformShapesInstance.svg.marker.append(markerEndValue,"end",color,function(markerAttributeValue){shapeSelection.attr("marker-end",markerAttributeValue)})},rotation:function(rotationValue){var transform="rotate("+rotationValue+","+(data.x+data.width/2)+","+(data.y+data.height/2)+")";shapeSelection.attr("transform",transform)},borderWidth:function(borderWidthValue){shapeSelection.attr("stroke-width",borderWidthValue)}},attributeList=d3.map(data).entries().sort(function(a,b){return attributeDependencyOrder.indexOf(a.key)-attributeDependencyOrder.indexOf(b.key)});attributeList.forEach(function(attributeListItem){attributeListItemName=attributeListItem.key,attributeListItemValue=attributeListItem.value,svgPathAttributeGenerator.hasOwnProperty(attributeListItemName)&&svgPathAttributeGenerator[attributeListItemName](attributeListItemValue)}),callback&&callback(shapeSelection[0][0])}},crossPlatformShapes.canvas={};

svgPanZoom = function(){

  /** 
   * This code is licensed under the following BSD license:
   *
   * Copyright 2009-2010 Andrea Leofreddi <a.leofreddi@itcharm.com>. All rights reserved.
   * 
   * Redistribution and use in source and binary forms, with or without modification, are
   * permitted provided that the following conditions are met:
   * 
   *    1. Redistributions of source code must retain the above copyright notice, this list of
   *       conditions and the following disclaimer.
   * 
   *    2. Redistributions in binary form must reproduce the above copyright notice, this list
   *       of conditions and the following disclaimer in the documentation and/or other materials
   *       provided with the distribution.
   * 
   * THIS SOFTWARE IS PROVIDED BY Andrea Leofreddi ``AS IS'' AND ANY EXPRESS OR IMPLIED
   * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
   * FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Andrea Leofreddi OR
   * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
   * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
   * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
   * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
   * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
   * 
  * The views and conclusions contained in the software and documentation are those of the
    * authors and should not be interpreted as representing official policies, either expressed
    * or implied, of Andrea Leofreddi.
    */

  'use strict';

  var state = 'none', viewportCTM, stateTarget, stateOrigin, stateTf;

  /// CONFIGURATION 
  /// ====>

  var panEnabled = true; // true or false: enable or disable panning (default enabled)
  var zoomEnabled = true; // true or false: enable or disable zooming (default enabled)
  var dragEnabled = false; // true or false: enable or disable dragging (default disabled)
  var zoomScaleSensitivity = 0.2; // Zoom sensitivity
  var minZoom = 0.5; // Minimum Zoom
  var maxZoom = 10; // Maximum Zoom
  var onZoom = null; // Zoom callback

  /// <====
  /// END OF CONFIGURATION 

  /**
   * Enable svgPanZoom 
   */

  function init(args) {
    args = args || {};
    getSvg(args.selector, function(err, svg) {
      if (args.hasOwnProperty('panEnabled')) {
        panEnabled = args.panEnabled;
      }
      if (args.hasOwnProperty('zoomEnabled')) {
        zoomEnabled = args.zoomEnabled;
      }
      if (args.hasOwnProperty('dragEnabled')) {
        dragEnabled = args.dragEnabled;
      }
      if (args.hasOwnProperty('zoomScaleSensitivity')) {
        zoomScaleSensitivity = args.zoomScaleSensitivity;
      }
      if (args.hasOwnProperty('onZoom')) {
        onZoom = args.onZoom;
      }
      if (args.hasOwnProperty('minZoom')) {
        minZoom = args.minZoom;
      }
      if (args.hasOwnProperty('maxZoom')) {
        maxZoom = args.maxZoom;
      }
      setupHandlers(svg);
      if (!!svg.ownerDocument.documentElement.tagName.toLowerCase() !== 'svg') {
        svg.ownerDocument.defaultView.svgPanZoom = svgPanZoom;
      }
    });
  }

  /**
   * Change settings 
   */

  function setZoomScaleSensitivity(newZoomScaleSensitivity) {
    zoomScaleSensitivity = newZoomScaleSensitivity;
  }

  function enablePan() {
    panEnabled = true;
  }

  function disablePan() {
    panEnabled = false;
  }

  function enableZoom() {
    zoomEnabled = true;
  }

  function disableZoom() {
    zoomEnabled = false;
  }

  function enableDrag() {
    dragEnabled = true;
  }

  function disableDrag() {
    dragEnabled = false;
  }

  /**
   * Register handlers
   */

  function setupHandlers(svg){
    setAttributes(svg, {
      'onmouseup': 'svgPanZoom.handleMouseUp(evt)',
      'onmousedown': 'svgPanZoom.handleMouseDown(evt)',
      'onmousemove': 'svgPanZoom.handleMouseMove(evt)',
      'onmouseleave' : 'svgPanZoom.handleMouseUp(evt)', // Decomment this to stop the pan functionality when dragging out of the SVG element; Note that 'onmouseleave' works over parent svg and all children.
    });

    svg.setAttribute('xmlns', 'http://www.w3.org/1999/xlink')
    svg.setAttributeNS('xmlns', 'xlink', 'http://www.w3.org/1999/xlink')
    svg.setAttributeNS('xmlns', 'ev', 'http://www.w3.org/2001/xml-events')

    if(navigator.userAgent.toLowerCase().indexOf('webkit') >= 0) {
      svg.addEventListener('mousewheel', handleMouseWheel, false); // Chrome/Safari
    }
    else {
      svg.addEventListener('DOMMouseScroll', handleMouseWheel, false); // Others
    }
  }

  /**
   * Retrieves the svg element for SVG manipulation. The element is then cached into the viewport global variable.
   */

  function getViewport(svg) {
    var initialViewportCTM, svgViewBox;
    if (!svg.__viewportElement) {
      svg.__viewportElement = svg.getElementById('viewport');
      if (!svg.__viewportElement) {

        // If no g container with id 'viewport' exists, as last resort, use first g element.

        svg.__viewportElement = svg.getElementsByTagName('g')[0]
      }

      if (!svg.__viewportElement) {

        // TODO could automatically move all elements from SVG into a newly created viewport g element.

        throw new Error('No g element containers in SVG document to use for viewport.');
      }

      svgViewBox = svg.getAttribute('viewBox');
      if (svgViewBox) {
        svg.__viewportElement.setAttribute('viewBox', svgViewBox);
        svg.removeAttribute('viewBox');
      }
    }

    viewportCTM = svg.__viewportElement.getCTM();
    return svg.__viewportElement;
  }

  /**
   * Get an SVGPoint of the mouse co-ordinates of the event, relative to the SVG element.
   */

  function getRelativeMousePoint(evt) {
    var svg = (evt.target.tagName === 'svg' || evt.target.tagName === 'SVG') ? evt.target : evt.target.ownerSVGElement || evt.target.correspondingElement.ownerSVGElement;
    var point = svg.createSVGPoint();
    point.x = evt.clientX
    point.y = evt.clientY;
    point = point.matrixTransform(svg.getScreenCTM().inverse());
    return point;
  };

  /**
   * Instance an SVGPoint object with given event coordinates.
   */

  function getEventPoint(evt) {
    var svg = (evt.target.tagName === 'svg' || evt.target.tagName === 'SVG') ? evt.target : evt.target.ownerSVGElement || evt.target.correspondingElement.ownerSVGElement;

    var p = svg.createSVGPoint();

    p.x = evt.clientX;
    p.y = evt.clientY;

    return p;
  }

  /**
   * Sets the current transform matrix of an element.
   */

  function setCTM(element, matrix) {
    var s = 'matrix(' + matrix.a + ',' + matrix.b + ',' + matrix.c + ',' + matrix.d + ',' + matrix.e + ',' + matrix.f + ')';
    element.setAttribute('transform', s);
  }

  /**
   * Dumps a matrix to a string (useful for debug).
   */

  function dumpMatrix(matrix) {
    var s = '[ ' + matrix.a + ', ' + matrix.c + ', ' + matrix.e + '\n  ' + matrix.b + ', ' + matrix.d + ', ' + matrix.f + '\n  0, 0, 1 ]';
    return s;
  }

  /**
   * Sets attributes of an element.
   */
  function setAttributes(element, attributes){
    for (var i in attributes)
      element.setAttributeNS(null, i, attributes[i]);
  }

  function findFirstSvg(callback) {
    var i, candidateSvg, foundSvg;
    var candidateSvg = document.querySelector('svg');
    if (!!candidateSvg) {
      foundSvg = candidateSvg;
      callback(foundSvg);
    }

    var candidateObjectElements = document.querySelectorAll('object');
    i = 0;
    do {
      i += 1;
      getSvg('object:nth-of-type(' + i + ')', function(err, candidateSvg) {
        if (!!candidateSvg) {
          foundSvg = candidateSvg;
          callback(foundSvg);
        }
      });
    } while (i < candidateObjectElements.length);

    var candidateEmbedElements = document.querySelectorAll('embed');
    i = 0;
    do {
      i += 1;
      getSvg('embed:nth-of-type(' + i + ')', function(err, candidateSvg) {
        if (!!candidateSvg) {
          foundSvg = candidateSvg;
          callback(foundSvg);
        }
      });
    } while (i < candidateEmbedElements.length);

    // TODO add a timeout
  }

  function getSvg(selector, callback) {
    var target, err, svg;
    if (!selector) {
      if(typeof console !== "undefined") {
        console.warn('No selector specified for getSvg(). Using first svg element found.');
      }
      target = findFirstSvg(function(svg) {
        if (!svg) {
          err = new Error('No SVG found in this document.');
        }
        if (!!callback) {
          callback(err, svg);
        }
        else {
          if (!svg) {
            throw err;
          }
          return svg;
        }
      });
    }
    else {
      target = document.querySelector(selector);
      if (!!target) {
        if (target.tagName.toLowerCase() === 'svg') {
          svg = target;
        }
        else {
          if (target.tagName.toLowerCase() === 'object') {
            svg = target.contentDocument.documentElement;
          }
          else {
            if (target.tagName.toLowerCase() === 'embed') {
              svg = target.getSVGDocument().documentElement;
            }
            else {
              if (target.tagName.toLowerCase() === 'img') {
                throw new Error('Cannot script an SVG in an "img" element. Please use an "object" element or an in-line SVG.');
              }
              else {
                throw new Error('Cannot get SVG.');
              }
            }
          }
        }
      }
      if (!svg) {
        err = new Error('No SVG found in this document.');
      }

      if (!!callback) {
        callback(err, svg);
      }
      else {
        if (!svg) {
          throw err;
        }
        return svg;
      }
    }
  }

  function pan(selector, direction) {
    if (!direction) {
      throw new Error('No direction specified for direction of panning. Please enter a string value of up, right, down or left.');
    }
    var tx, ty;
    var panIncrement = 0.1;
    var directionToXYMapping = {
      'top':{
        'x': 0,
        'y': -1
      },
      't':{
        'x': 0,
        'y': -1
      },
      'up':{
        'x': 0,
        'y': -1
      },
      'u':{
        'x': 0,
        'y': -1
      },
      'right':{
        'x': 1,
        'y': 0
      },
      'r':{
        'x': 1,
        'y': 0
      },
      'bottom':{
        'x': 0,
        'y': 1
      },
      'b':{
        'x': 0,
        'y': 1
      },
      'down':{
        'x': 0,
        'y': 1
      },
      'd':{
        'x': 0,
        'y': 1
      },
      'left':{
        'x': -1,
        'y': 0
      },
      'l':{
        'x': -1,
        'y': 0
      }
    };

    var directionXY = directionToXYMapping[direction];

    if (!directionXY) {
      throw new Error('Direction specified was not understood. Please enter a string value of up, right, down or left.');
    }

    getSvg(selector, function(err, svg) {
      var viewport = getViewport(svg);
      tx = svg.getBBox().width * panIncrement * directionXY.x;
      ty = svg.getBBox().height * panIncrement * directionXY.y;
      viewportCTM.e += tx;
      viewportCTM.f += ty;
      setCTM(viewport, viewportCTM);
    });
  }

  function zoom(args) {
    if (!args.scale) {
      throw new Error('No scale specified for zoom. Please enter a number.');
    }
    getSvg(args.selector, function(err, svg) {
      var viewport = getViewport(svg);
      viewportCTM.a = viewportCTM.d = args.scale;
      if ( viewportCTM.a < minZoom ) { viewportCTM.a = viewportCTM.d = minZoom ; } 
      if ( viewportCTM.a > maxZoom ) { viewportCTM.a = viewportCTM.d = maxZoom ; } 
      setCTM(viewport, viewportCTM);
      if (onZoom) { onZoom(viewportCTM.a); }
    });
  }

  function zoomIn(selector) {

    // TODO zoom origin isn't center of screen

    getSvg(selector, function(err, svg) {
      var viewport = getViewport(svg);
      viewportCTM.a = viewportCTM.d = (1 + zoomScaleSensitivity) * viewportCTM.a;
      if ( viewportCTM.a > maxZoom ) { viewportCTM.a = viewportCTM.d = maxZoom ; }
      setCTM(viewport, viewportCTM);
      if (onZoom) { onZoom(viewportCTM.a); }
    });
  }

  function zoomOut(selector) {

    // TODO zoom origin isn't center of screen

    getSvg(selector, function(err, svg) {
      var viewport = getViewport(svg);
      viewportCTM.a = viewportCTM.d = (1/(1 + zoomScaleSensitivity)) * viewportCTM.a;
      if ( viewportCTM.a < minZoom ) { viewportCTM.a = viewportCTM.d = minZoom ; } 
      setCTM(viewport, viewportCTM);
      if (onZoom) { onZoom(viewportCTM.a); }
    });
  }

  function resetZoom(selector) {
    var oldCTM, newCTM;
    getSvg(selector, function(err, svg) {
      var viewport = getViewport(svg);

      var bBox = svg.getBBox();
      var boundingClientRect = svg.getBoundingClientRect();
      oldCTM = newCTM = viewportCTM;
      var newScale = Math.min(boundingClientRect.width/bBox.width, boundingClientRect.height/bBox.height);
      newCTM.a = newScale * oldCTM.a; //x-scale
      newCTM.d = newScale * oldCTM.d; //y-scale
      newCTM.e = oldCTM.e * newScale - (boundingClientRect.width - bBox.width * newScale)/2 - bBox.x * newScale; //x-transform
      newCTM.f = oldCTM.f * newScale - (boundingClientRect.height - bBox.height * newScale)/2 - bBox.y * newScale; //y-transform
      setCTM(viewport, newCTM);
      if (onZoom) { onZoom(newCTM.a); }
    });
  }

  /**
   * Handle mouse wheel event.
   */

  function handleMouseWheel(evt) {
    if(!zoomEnabled) {
      return;
    }

    if(evt.preventDefault) {
      evt.preventDefault();
    }
    else {
      evt.returnValue = false;
    }

    var svg = (evt.target.tagName === 'svg' || evt.target.tagName === 'SVG') ? evt.target : evt.target.ownerSVGElement || evt.target.correspondingElement.ownerSVGElement;

    var delta;

    if(evt.wheelDelta)
      delta = evt.wheelDelta / 360; // Chrome/Safari
    else
      delta = evt.detail / -9; // Mozilla

    var z = Math.pow(1 + zoomScaleSensitivity, delta);

    var g = getViewport(svg);

    var p = getRelativeMousePoint(evt);
    p = p.matrixTransform(g.getCTM().inverse());

    // Compute new scale matrix in current mouse position
    var k = svg.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y);
  	var wasZoom = g.getCTM();
  	var setZoom = g.getCTM().multiply(k);
  	
  	if ( setZoom.a < minZoom ) { setZoom.a = setZoom.d = wasZoom.a }
  	if ( setZoom.a > maxZoom ) { setZoom.a = setZoom.d = wasZoom.a } 	
  	if ( setZoom.a != wasZoom.a ) { setCTM(g, setZoom) } 

    if(typeof(stateTf) == 'undefined')
      stateTf = g.getCTM().inverse();

    stateTf = stateTf.multiply(k.inverse());
    if (onZoom) { onZoom(g.getCTM().a); }
  }

  /**
   * Handle mouse move event.
   */

  function handleMouseMove(evt) {
    if(evt.preventDefault) {
      evt.preventDefault();
    }
    else {
      evt.returnValue = false;
    }

    var svg = (evt.target.tagName === 'svg' || evt.target.tagName === 'SVG') ? evt.target : evt.target.ownerSVGElement || evt.target.correspondingElement.ownerSVGElement;
    
    var g = getViewport(svg);

    if(state == 'pan' && panEnabled) {
      // Pan mode
      var p = getEventPoint(evt).matrixTransform(stateTf);

      setCTM(g, stateTf.inverse().translate(p.x - stateOrigin.x, p.y - stateOrigin.y));
    } else if(state == 'drag' && dragEnabled) {
      // Drag mode
      var p = getEventPoint(evt).matrixTransform(g.getCTM().inverse());

      setCTM(stateTarget, svg.createSVGMatrix().translate(p.x - stateOrigin.x, p.y - stateOrigin.y).multiply(g.getCTM().inverse()).multiply(stateTarget.getCTM()));

      stateOrigin = p;
    }
  }

/**
   * Handle double click event. 
   * See handleMouseDown() for alternate detection method.
   */

  function handleDblClick(evt) {
    if(evt.preventDefault) {
      evt.preventDefault();
    }
    else {
      evt.returnValue = false;
    }

    var svg = (evt.target.tagName === 'svg' || evt.target.tagName === 'SVG') ? evt.target : evt.target.ownerSVGElement || evt.target
.correspondingElement.ownerSVGElement;

    var zoomFactor = 4; // 4x zoom!
    if(evt.shiftKey){
        zoomFactor = -1.66; // zoom out when shift key pressed
    }

    var z = 1 + zoomScaleSensitivity * zoomFactor;

    var g = getViewport(svg);

    var p = getRelativeMousePoint(evt);

    p = p.matrixTransform(g.getCTM().inverse());

    // Compute new scale matrix in current mouse position                                                         
    var k = svg.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y);
  	var wasZoom = g.getCTM();
  	var setZoom = g.getCTM().multiply(k);
  	
  	if ( setZoom.a < minZoom ) { setZoom.a = setZoom.d = wasZoom.a }
  	if ( setZoom.a > maxZoom ) { setZoom.a = setZoom.d = wasZoom.a } 	
  	if ( setZoom.a != wasZoom.a ) { setCTM(g, setZoom) } 

    if(typeof(stateTf) == 'undefined')
      stateTf = g.getCTM().inverse();

    stateTf = stateTf.multiply(k.inverse());
    if (onZoom) { onZoom(g.getCTM().a); }
  }
  
  /**
   * Handle click event.
   */

  function handleMouseDown(evt) {
    // Double click detection; more consistent than ondblclick                                                    
    if(evt.detail==2){
        handleDblClick(evt);
    }
    
    if(evt.preventDefault) {
      evt.preventDefault();
    }
    else {
      evt.returnValue = false;
    }

    var svg = (evt.target.tagName === 'svg' || evt.target.tagName === 'SVG') ? evt.target : evt.target.ownerSVGElement || evt.target.correspondingElement.ownerSVGElement;

    var g = getViewport(svg);

    if(
      evt.target.tagName == 'svg' 
        || !dragEnabled // Pan anyway when drag is disabled and the user clicked on an element 
    ) {
      // Pan mode
      state = 'pan';

      stateTf = g.getCTM().inverse();

      stateOrigin = getEventPoint(evt).matrixTransform(stateTf);
    } else {
      // Drag mode
      state = 'drag';

      stateTarget = evt.target;

      stateTf = g.getCTM().inverse();

      stateOrigin = getEventPoint(evt).matrixTransform(stateTf);
    }
  }

  /**
   * Handle mouse button release event.
   */

  function handleMouseUp(evt) {
    if(evt.preventDefault) {
      evt.preventDefault();
    }
    else {
      evt.returnValue = false;
    }

    var svg = (evt.target.tagName === 'svg' || evt.target.tagName === 'SVG') ? evt.target : evt.target.ownerSVGElement || evt.target.correspondingElement.ownerSVGElement;

    if(state == 'pan' || state == 'drag') {
      // Quit pan mode
      state = '';
    }
  }

  return{
    init:init,
    handleMouseUp:handleMouseUp,
    handleMouseDown:handleMouseDown,
    handleMouseMove:handleMouseMove,
    handleDblClick:handleDblClick,
    pan:pan,
    zoom:zoom,
    zoomIn:zoomIn,
    zoomOut:zoomOut,
    resetZoom:resetZoom,
    setZoomScaleSensitivity:setZoomScaleSensitivity,
    enablePan:enablePan,
    disablePan:disablePan,
    enableZoom:enableZoom,
    disableZoom:disableZoom,
    enableDrag:enableDrag,
    disableDrag:disableDrag
  };
}();


!function(a){"use strict";var b=function(a,c,d){var e,f,g=document.createElement("img");if(g.onerror=c,g.onload=function(){!f||d&&d.noRevoke||b.revokeObjectURL(f),c&&c(b.scale(g,d))},b.isInstanceOf("Blob",a)||b.isInstanceOf("File",a))e=f=b.createObjectURL(a),g._type=a.type;else{if("string"!=typeof a)return!1;e=a,d&&d.crossOrigin&&(g.crossOrigin=d.crossOrigin)}return e?(g.src=e,g):b.readFile(a,function(a){var b=a.target;b&&b.result?g.src=b.result:c&&c(a)})},c=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL&&webkitURL;b.isInstanceOf=function(a,b){return Object.prototype.toString.call(b)==="[object "+a+"]"},b.transformCoordinates=function(){},b.getTransformedOptions=function(a){return a},b.renderImageToCanvas=function(a,b,c,d,e,f,g,h,i,j){return a.getContext("2d").drawImage(b,c,d,e,f,g,h,i,j),a},b.hasCanvasOption=function(a){return a.canvas||a.crop},b.scale=function(a,c){c=c||{};var d,e,f,g,h,i,j,k,l,m=document.createElement("canvas"),n=a.getContext||b.hasCanvasOption(c)&&m.getContext,o=a.naturalWidth||a.width,p=a.naturalHeight||a.height,q=o,r=p,s=function(){var a=Math.max((f||q)/q,(g||r)/r);a>1&&(q=Math.ceil(q*a),r=Math.ceil(r*a))},t=function(){var a=Math.min((d||q)/q,(e||r)/r);1>a&&(q=Math.ceil(q*a),r=Math.ceil(r*a))};return n&&(c=b.getTransformedOptions(c),j=c.left||0,k=c.top||0,c.sourceWidth?(h=c.sourceWidth,void 0!==c.right&&void 0===c.left&&(j=o-h-c.right)):h=o-j-(c.right||0),c.sourceHeight?(i=c.sourceHeight,void 0!==c.bottom&&void 0===c.top&&(k=p-i-c.bottom)):i=p-k-(c.bottom||0),q=h,r=i),d=c.maxWidth,e=c.maxHeight,f=c.minWidth,g=c.minHeight,n&&d&&e&&c.crop?(q=d,r=e,l=h/i-d/e,0>l?(i=e*h/d,void 0===c.top&&void 0===c.bottom&&(k=(p-i)/2)):l>0&&(h=d*i/e,void 0===c.left&&void 0===c.right&&(j=(o-h)/2))):((c.contain||c.cover)&&(f=d=d||f,g=e=e||g),c.cover?(t(),s()):(s(),t())),n?(m.width=q,m.height=r,b.transformCoordinates(m,c),b.renderImageToCanvas(m,a,j,k,h,i,0,0,q,r)):(a.width=q,a.height=r,a)},b.createObjectURL=function(a){return c?c.createObjectURL(a):!1},b.revokeObjectURL=function(a){return c?c.revokeObjectURL(a):!1},b.readFile=function(a,b,c){if(window.FileReader){var d=new FileReader;if(d.onload=d.onerror=b,c=c||"readAsDataURL",d[c])return d[c](a),d}return!1},"function"==typeof define&&define.amd?define(function(){return b}):a.loadImage=b}(this),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image"],a):a(window.loadImage)}(function(a){"use strict";if(window.navigator&&window.navigator.platform&&/iP(hone|od|ad)/.test(window.navigator.platform)){var b=a.renderImageToCanvas;a.detectSubsampling=function(a){var b,c;return a.width*a.height>1048576?(b=document.createElement("canvas"),b.width=b.height=1,c=b.getContext("2d"),c.drawImage(a,-a.width+1,0),0===c.getImageData(0,0,1,1).data[3]):!1},a.detectVerticalSquash=function(a,b){var c,d,e,f,g,h=a.naturalHeight||a.height,i=document.createElement("canvas"),j=i.getContext("2d");for(b&&(h/=2),i.width=1,i.height=h,j.drawImage(a,0,0),c=j.getImageData(0,0,1,h).data,d=0,e=h,f=h;f>d;)g=c[4*(f-1)+3],0===g?e=f:d=f,f=e+d>>1;return f/h||1},a.renderImageToCanvas=function(c,d,e,f,g,h,i,j,k,l){if("image/jpeg"===d._type){var m,n,o,p,q=c.getContext("2d"),r=document.createElement("canvas"),s=1024,t=r.getContext("2d");if(r.width=s,r.height=s,q.save(),m=a.detectSubsampling(d),m&&(e/=2,f/=2,g/=2,h/=2),n=a.detectVerticalSquash(d,m),m||1!==n){for(f*=n,k=Math.ceil(s*k/g),l=Math.ceil(s*l/h/n),j=0,p=0;h>p;){for(i=0,o=0;g>o;)t.clearRect(0,0,s,s),t.drawImage(d,e,f,g,h,-o,-p,g,h),q.drawImage(r,0,0,s,s,i,j,k,l),o+=s,i+=k;p+=s,j+=l}return q.restore(),c}}return b(c,d,e,f,g,h,i,j,k,l)}}}),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image"],a):a(window.loadImage)}(function(a){"use strict";var b=a.hasCanvasOption;a.hasCanvasOption=function(a){return b(a)||a.orientation},a.transformCoordinates=function(a,b){var c=a.getContext("2d"),d=a.width,e=a.height,f=b.orientation;if(f)switch(f>4&&(a.width=e,a.height=d),f){case 2:c.translate(d,0),c.scale(-1,1);break;case 3:c.translate(d,e),c.rotate(Math.PI);break;case 4:c.translate(0,e),c.scale(1,-1);break;case 5:c.rotate(.5*Math.PI),c.scale(1,-1);break;case 6:c.rotate(.5*Math.PI),c.translate(0,-e);break;case 7:c.rotate(.5*Math.PI),c.translate(d,-e),c.scale(-1,1);break;case 8:c.rotate(-.5*Math.PI),c.translate(-d,0)}},a.getTransformedOptions=function(a){if(!a.orientation||1===a.orientation)return a;var b,c={};for(b in a)a.hasOwnProperty(b)&&(c[b]=a[b]);switch(a.orientation){case 2:c.left=a.right,c.right=a.left;break;case 3:c.left=a.right,c.top=a.bottom,c.right=a.left,c.bottom=a.top;break;case 4:c.top=a.bottom,c.bottom=a.top;break;case 5:c.left=a.top,c.top=a.left,c.right=a.bottom,c.bottom=a.right;break;case 6:c.left=a.top,c.top=a.right,c.right=a.bottom,c.bottom=a.left;break;case 7:c.left=a.bottom,c.top=a.right,c.right=a.top,c.bottom=a.left;break;case 8:c.left=a.bottom,c.top=a.left,c.right=a.top,c.bottom=a.right}return a.orientation>4&&(c.maxWidth=a.maxHeight,c.maxHeight=a.maxWidth,c.minWidth=a.minHeight,c.minHeight=a.minWidth,c.sourceWidth=a.sourceHeight,c.sourceHeight=a.sourceWidth),c}}),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image"],a):a(window.loadImage)}(function(a){"use strict";var b=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);a.blobSlice=b&&function(){var a=this.slice||this.webkitSlice||this.mozSlice;return a.apply(this,arguments)},a.metaDataParsers={jpeg:{65505:[]}},a.parseMetaData=function(b,c,d){d=d||{};var e=this,f=d.maxMetaDataSize||262144,g={},h=!(window.DataView&&b&&b.size>=12&&"image/jpeg"===b.type&&a.blobSlice);(h||!a.readFile(a.blobSlice.call(b,0,f),function(b){if(b.target.error)return console.log(b.target.error),c(g),void 0;var f,h,i,j,k=b.target.result,l=new DataView(k),m=2,n=l.byteLength-4,o=m;if(65496===l.getUint16(0)){for(;n>m&&(f=l.getUint16(m),f>=65504&&65519>=f||65534===f);){if(h=l.getUint16(m+2)+2,m+h>l.byteLength){console.log("Invalid meta data: Invalid segment size.");break}if(i=a.metaDataParsers.jpeg[f])for(j=0;j<i.length;j+=1)i[j].call(e,l,m,h,g,d);m+=h,o=m}!d.disableImageHead&&o>6&&(g.imageHead=k.slice?k.slice(0,o):new Uint8Array(k).subarray(0,o))}else console.log("Invalid JPEG file: Missing JPEG marker.");c(g)},"readAsArrayBuffer"))&&c(g)}}),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image","load-image-meta"],a):a(window.loadImage)}(function(a){"use strict";a.ExifMap=function(){return this},a.ExifMap.prototype.map={Orientation:274},a.ExifMap.prototype.get=function(a){return this[a]||this[this.map[a]]},a.getExifThumbnail=function(a,b,c){var d,e,f;if(!c||b+c>a.byteLength)return console.log("Invalid Exif data: Invalid thumbnail data."),void 0;for(d=[],e=0;c>e;e+=1)f=a.getUint8(b+e),d.push((16>f?"0":"")+f.toString(16));return"data:image/jpeg,%"+d.join("%")},a.exifTagTypes={1:{getValue:function(a,b){return a.getUint8(b)},size:1},2:{getValue:function(a,b){return String.fromCharCode(a.getUint8(b))},size:1,ascii:!0},3:{getValue:function(a,b,c){return a.getUint16(b,c)},size:2},4:{getValue:function(a,b,c){return a.getUint32(b,c)},size:4},5:{getValue:function(a,b,c){return a.getUint32(b,c)/a.getUint32(b+4,c)},size:8},9:{getValue:function(a,b,c){return a.getInt32(b,c)},size:4},10:{getValue:function(a,b,c){return a.getInt32(b,c)/a.getInt32(b+4,c)},size:8}},a.exifTagTypes[7]=a.exifTagTypes[1],a.getExifValue=function(b,c,d,e,f,g){var h,i,j,k,l,m,n=a.exifTagTypes[e];if(!n)return console.log("Invalid Exif data: Invalid tag type."),void 0;if(h=n.size*f,i=h>4?c+b.getUint32(d+8,g):d+8,i+h>b.byteLength)return console.log("Invalid Exif data: Invalid data offset."),void 0;if(1===f)return n.getValue(b,i,g);for(j=[],k=0;f>k;k+=1)j[k]=n.getValue(b,i+k*n.size,g);if(n.ascii){for(l="",k=0;k<j.length&&(m=j[k],"\x00"!==m);k+=1)l+=m;return l}return j},a.parseExifTag=function(b,c,d,e,f){var g=b.getUint16(d,e);f.exif[g]=a.getExifValue(b,c,d,b.getUint16(d+2,e),b.getUint32(d+4,e),e)},a.parseExifTags=function(a,b,c,d,e){var f,g,h;if(c+6>a.byteLength)return console.log("Invalid Exif data: Invalid directory offset."),void 0;if(f=a.getUint16(c,d),g=c+2+12*f,g+4>a.byteLength)return console.log("Invalid Exif data: Invalid directory size."),void 0;for(h=0;f>h;h+=1)this.parseExifTag(a,b,c+2+12*h,d,e);return a.getUint32(g,d)},a.parseExifData=function(b,c,d,e,f){if(!f.disableExif){var g,h,i,j=c+10;if(1165519206===b.getUint32(c+4)){if(j+8>b.byteLength)return console.log("Invalid Exif data: Invalid segment size."),void 0;if(0!==b.getUint16(c+8))return console.log("Invalid Exif data: Missing byte alignment offset."),void 0;switch(b.getUint16(j)){case 18761:g=!0;break;case 19789:g=!1;break;default:return console.log("Invalid Exif data: Invalid byte alignment marker."),void 0}if(42!==b.getUint16(j+2,g))return console.log("Invalid Exif data: Missing TIFF marker."),void 0;h=b.getUint32(j+4,g),e.exif=new a.ExifMap,h=a.parseExifTags(b,j,j+h,g,e),h&&!f.disableExifThumbnail&&(i={exif:{}},h=a.parseExifTags(b,j,j+h,g,i),i.exif[513]&&(e.exif.Thumbnail=a.getExifThumbnail(b,j+i.exif[513],i.exif[514]))),e.exif[34665]&&!f.disableExifSub&&a.parseExifTags(b,j,j+e.exif[34665],g,e),e.exif[34853]&&!f.disableExifGps&&a.parseExifTags(b,j,j+e.exif[34853],g,e)}}},a.metaDataParsers.jpeg[65505].push(a.parseExifData)}),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image","load-image-exif"],a):a(window.loadImage)}(function(a){"use strict";a.ExifMap.prototype.tags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright",36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",42240:"Gamma",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubSecTime",37521:"SubSecTimeOriginal",37522:"SubSecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"PhotographicSensitivity",34856:"OECF",34864:"SensitivityType",34865:"StandardOutputSensitivity",34866:"RecommendedExposureIndex",34867:"ISOSpeed",34868:"ISOSpeedLatitudeyyy",34869:"ISOSpeedLatitudezzz",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRatio",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",42016:"ImageUniqueID",42032:"CameraOwnerName",42033:"BodySerialNumber",42034:"LensSpecification",42035:"LensMake",42036:"LensModel",42037:"LensSerialNumber",0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential",31:"GPSHPositioningError"},a.ExifMap.prototype.stringValues={ExposureProgram:{0:"Undefined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Undefined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},ComponentsConfiguration:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"},Orientation:{1:"top-left",2:"top-right",3:"bottom-right",4:"bottom-left",5:"left-top",6:"right-top",7:"right-bottom",8:"left-bottom"}},a.ExifMap.prototype.getText=function(a){var b=this.get(a);switch(a){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":case"Orientation":return this.stringValues[a][b];case"ExifVersion":case"FlashpixVersion":return String.fromCharCode(b[0],b[1],b[2],b[3]);case"ComponentsConfiguration":return this.stringValues[a][b[0]]+this.stringValues[a][b[1]]+this.stringValues[a][b[2]]+this.stringValues[a][b[3]];case"GPSVersionID":return b[0]+"."+b[1]+"."+b[2]+"."+b[3]}return String(b)},function(a){var b,c=a.tags,d=a.map;for(b in c)c.hasOwnProperty(b)&&(d[c[b]]=b)}(a.ExifMap.prototype),a.ExifMap.prototype.getAll=function(){var a,b,c={};for(a in this)this.hasOwnProperty(a)&&(b=this.tags[a],b&&(c[b]=this.getText(b)));return c}});

var pathvisioNS = pathvisioNS || {};
pathvisioNS["src/pathvisiojs.html"] = '<div id="pathvisiojs-container" style="width: inherit; height: inherit;">\n\n  <!-- **********************************************************************\n    Pathway Container (JavaScript inserts pathway image inside this div)\n    *********************************************************************** -->\n  <div id="diagram-container">\n  </div>\n\n  <!-- **********************************************************************\n    Highlight Element by Label Control\n    *********************************************************************** -->\n  <div id="typeahead">\n    <input id="highlight-by-label-input" placeholder="Enter node name to highlight" role="textbox" aria-autocomplete="list" aria-haspopup="true">\n    <i id="clear-highlights-from-typeahead" class="control-icon icon-remove"></i>\n  </div> \n\n  <!-- **********************************************************************\n    Pan/Zoom Controls \n    *********************************************************************** -->\n  <div id="pan-zoom-control" class="pan-zoom-controls">                           \n    <!-- TODO get this working\n    <i id="zoom-in" class="control-icon pan-zoom-control-icon glyphicon glyphicon-plus-sign"></i>\n    -->\n    <i id="reset-pan-zoom" class="control-icon pan-zoom-control-icon glyphicon glyphicon-screenshot"></i>\n    <!-- TODO get this working\n    <i id="zoom-out" class="control-icon pan-zoom-control-icon glyphicon glyphicon-minus-sign"></i>\n    -->\n    <!-- TODO get this working\n    <i id="full-screen-control" class="control-icon pan-zoom-control-icon glyphicon glyphicon-fullscreen"></i>\n    -->\n  </div>\n\n  <div id="viewer-toolbar">\n  </div>\n\n  <!-- **********************************************************************\n    Details Frame\n    *********************************************************************** -->\n  <div id="annotation" class="annotation ui-draggable">\n    <header class="annotation-header">\n      <span id="annotation-move" class="annotation-header-move">\n        <i class="icon-move"></i>\n      </span>\n      <span class="annotation-header-close" class="annotation-header-close">\n        <i class="icon-remove"></i>\n      </span>   \n      <span id="annotation-header-text" class="annotation-header-text">\n        Header\n      </span> \n      <span id="annotation-header-search" class="annotation-header-search" title="Search for pathways containing \'Header Text\'">\n        <a href="http://wikipathways.org//index.php?title=Special:SearchPathways">\n          <i class="icon-search"></i>\n        </a>\n      </span>\n      <div id="annotation-description" class="annotation-description">\n        <h2>description</h2>\n      </div>\n    </header>\n    <span class="annotation-items-container" class="annotation-items-container">\n      <ul id="annotation-items-container">\n        <!-- List items inside this ul element are generated automatically by JavaScript.\n            Each item will be composed of a title and text. The text can be set to be an href.\n            You can edit the styling of the title by editing CSS class "annotation-item-title"\n            and the styling of the text by editing CSS class "annotation-item-text.\n            -->\n      </ul>\n    </span>\n  </div>\n</div>\n';
pathvisioNS["tmp/pathvisiojs.svg"] = '<svg id="pathvisiojs-diagram" version="1.1" baseProfile="full" xmlns="http://www.w3.org/1999/xlink" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" width="100%" height="100%" style="display: none; width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit; " preserveAspectRatio="xMidYMid" onmouseup="svgPanZoom.handleMouseUp(evt)" onmousedown="svgPanZoom.handleMouseDown(evt)" onmousemove="svgPanZoom.handleMouseMove(evt)" onmouseleave="svgPanZoom.handleMouseUp(evt)" xlink="http://www.w3.org/1999/xlink" ev="http://www.w3.org/2001/xml-events"><g><desc>This SVG file contains all the graphical elements (markers and symbols in defs as well as\nstyle data) used by the program pathvisiojs, which has two components:\n1) a viewer for transforming GPML biological pathway data into an SVG visual representation and\n2) an editor for creating both views and models for biological pathways.</desc></g><title>pathvisiojs diagram</title><defs><marker id="shape-library-markers-arrow-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-arrow-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- arrow markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-arrow-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-arrow-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- arrow markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-necessary-stimulation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 16 12" markerWidth="16" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-necessary-stimulation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-necessary-stimulation markers: triangular polygons, drawing-board fill, default color stroke; and vertical line -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line fill="none" stroke-width="1" x1="14" y1="0" x2="14" y2="12"></line>\n	<line fill="none" stroke="none" x1="16" y1="6" x2="16" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 9,11 9,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-necessary-stimulation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 16 12" markerWidth="16" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="16" refY="6"><g id="g-src-shape-library-markers-mim-necessary-stimulation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 8, 6)">\n\n	<!-- mim-necessary-stimulation markers: triangular polygons, drawing-board fill, default color stroke; and vertical line -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line fill="none" stroke-width="1" x1="14" y1="0" x2="14" y2="12"></line>\n	<line fill="none" stroke="none" x1="16" y1="6" x2="16" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 9,11 9,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-binding-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-binding-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-binding markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-binding-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-binding-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-binding markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-conversion-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-conversion-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-conversion markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-conversion-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-conversion-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-conversion markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-stimulation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-stimulation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-stimulation markers: triangular polygons, drawing-board fill, default color stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line stroke="none" fill="none" x1="12" y1="6" x2="12" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 11,11 11,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-stimulation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-stimulation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-stimulation markers: triangular polygons, drawing-board fill, default color stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line stroke="none" fill="none" x1="12" y1="6" x2="12" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 11,11 11,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-modification-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-modification-svg-start-default" class="default-fill-color solid-stroke">\n\n	<!-- mim-modification markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-modification-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-modification-svg-end-default" class="default-fill-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-modification markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-catalysis-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-catalysis-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-catalysis markers: circle, drawing-board fill and default color stroke -->\n\n	<circle cx="6.0" cy="6" r="5.3px" stroke-width="1px"></circle>\n\n</g></marker><marker id="shape-library-markers-mim-catalysis-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-catalysis-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-catalysis markers: circle, drawing-board fill and default color stroke -->\n\n	<circle cx="6.0" cy="6" r="5.3px" stroke-width="1px"></circle>\n\n</g></marker><marker id="shape-library-markers-mim-inhibition-svg-start-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="0" refY="10"><g id="g-src-shape-library-markers-mim-inhibition-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-inhibition markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-mim-inhibition-svg-end-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="10" refY="10"><g id="g-src-shape-library-markers-mim-inhibition-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 5, 10)">\n\n	<!-- mim-inhibition markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-mim-cleavage-svg-start-default" preserveAspectRatio="none" viewBox="0 0 20 30" markerWidth="20" markerHeight="30" markerUnits="strokeWidth" orient="auto" refX="9" refY="15"><g id="g-src-shape-library-markers-mim-cleavage-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-cleavage markers: two lines and extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="14.3" width="18.4" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="18" y1="14.5" x2="18" y2="30"></line>	\n	<line fill="none" stroke-width="1" x1="18" y1="30" x2="0" y2="0"></line>	\n\n\n</g></marker><marker id="shape-library-markers-mim-cleavage-svg-end-default" preserveAspectRatio="none" viewBox="0 0 20 30" markerWidth="20" markerHeight="30" markerUnits="strokeWidth" orient="auto" refX="10" refY="15"><g id="g-src-shape-library-markers-mim-cleavage-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 10, 15)">\n\n	<!-- mim-cleavage markers: two lines and extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="14.3" width="18.4" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="18" y1="14.5" x2="18" y2="30"></line>	\n	<line fill="none" stroke-width="1" x1="18" y1="30" x2="0" y2="0"></line>	\n\n\n</g></marker><marker id="shape-library-markers-mim-covalent-bond-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="6"><g id="g-src-shape-library-markers-mim-covalent-bond-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-covalent-bond markers: not much to see here! -->\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-covalent-bond-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="11" refY="6"><g id="g-src-shape-library-markers-mim-covalent-bond-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-covalent-bond markers: not much to see here! -->\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-transcription-translation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 20 24" markerWidth="20" markerHeight="24" markerUnits="strokeWidth" orient="auto" refX="0" refY="12"><g id="g-src-shape-library-markers-mim-transcription-translation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-transcription-translation markers: two lines and an open trigular polygon, plus extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="11" width="12" height="2"></rect>\n	<line fill="none" stroke-width="1" x1="15" y1="12" x2="15" y2="5"></line>\n	<line fill="none" stroke-width="1" x1="15.5" y1="5" x2="8" y2="5"></line>\n	<polygon stroke-width="1" points="0,5 8,1 8,9"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-transcription-translation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 20 24" markerWidth="20" markerHeight="24" markerUnits="strokeWidth" orient="auto" refX="20" refY="12"><g id="g-src-shape-library-markers-mim-transcription-translation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 10, 12)">\n\n	<!-- mim-transcription-translation markers: two lines and an open trigular polygon, plus extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="11" width="12" height="2"></rect>\n	<line fill="none" stroke-width="1" x1="15" y1="12" x2="15" y2="5"></line>\n	<line fill="none" stroke-width="1" x1="15.5" y1="5" x2="8" y2="5"></line>\n	<polygon stroke-width="1" points="0,5 8,1 8,9"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-gap-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-gap-svg-start-default" class="board-fill-color solid-stroke">\n\n	<!-- mim-gap markers: just an extended drawing-board rect -->\n	<!-- \n	TODO This could be refactored to make the shape match the viewbox.\n	It can overlap the side of the shape, blanking out a small part of it when the edge is at an angle.\n	-->\n\n	<rect stroke="none" x="0" y="5.3" width="8" height="1.4"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-gap-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-gap-svg-end-default" class="board-fill-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-gap markers: just an extended drawing-board rect -->\n	<!-- \n	TODO This could be refactored to make the shape match the viewbox.\n	It can overlap the side of the shape, blanking out a small part of it when the edge is at an angle.\n	-->\n\n	<rect stroke="none" x="0" y="5.3" width="8" height="1.4"></rect>\n\n</g></marker><marker id="shape-library-markers-t-bar-svg-start-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="0" refY="10"><g id="g-src-shape-library-markers-t-bar-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n        <!-- t-bar markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-t-bar-svg-end-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="10" refY="10"><g id="g-src-shape-library-markers-t-bar-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 5, 10)">\n\n        <!-- t-bar markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-none-svg-start-default" preserveAspectRatio="none" viewBox="0 0 0 0" markerWidth="0" markerHeight="0" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-none-svg-start-default" class="board-fill-color board-stroke-color node shape">\n\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-none-svg-end-default" preserveAspectRatio="none" viewBox="0 0 0 0" markerWidth="0" markerHeight="0" markerUnits="strokeWidth" orient="auto" refX="11" refY="6"><g id="g-src-shape-library-markers-none-svg-end-default" class="board-fill-color board-stroke-color node shape" transform="rotate(180, 0, 0)">\n\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-branching-left-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0.4" refY="6"><g id="g-src-shape-library-markers-mim-branching-left-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-branching-left markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="3.9" y1="6.2" x2="0.2" y2="0"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-left-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="11.6" refY="6"><g id="g-src-shape-library-markers-mim-branching-left-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-branching-left markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="3.9" y1="6.2" x2="0.2" y2="0"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-right-svg-start-default" preserveAspectRatio="none" viewBox="0 0 4 12" markerWidth="4" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0.4" refY="6"><g id="g-src-shape-library-markers-mim-branching-right-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-branching-right markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="0.2" y1="12" x2="3.9" y2="5.8"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-right-svg-end-default" preserveAspectRatio="none" viewBox="0 0 4 12" markerWidth="4" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="3.6" refY="6"><g id="g-src-shape-library-markers-mim-branching-right-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 2, 6)">\n\n	<!-- mim-branching-right markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="0.2" y1="12" x2="3.9" y2="5.8"></line>	\n\n</g></marker><style type="text/css">	svg {\n		color-interpolation: auto;\n		image-rendering: auto;\n		shape-rendering: auto;\n		vector-effect: non-scaling-stroke;\n                background: white;\n	/* removed fill and stroke since they override marker specs */\n	/*	fill: white;\n    		stroke: black; */\n	}\n\n	/* default color for pathway elements */\n	.default-fill-color {\n		fill: black; \n	}\n	.default-stroke-color {\n		stroke: black;\n	}\n	\n	/* default color of the background drawing board */ 	\n	.board-fill-color {\n		fill: white;\n	}\n	.board-stroke-color {\n		stroke: white;\n	}\n\n	.text-area {\n		font-family: Sans-Serif, Helvetica, Arial;\n		text-align: center;\n		vertical-align: middle;\n		font-size: 10px;\n		fill: black;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.citation {\n		font-family: Sans-Serif, Helvetica, Arial;\n		text-align: center;\n		vertical-align: top;\n		font-size: 7px;\n		fill: #999999;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.info-box {\n		font-family: Sans-Serif;\n		font-size: 10px;\n		fill: black;\n		stroke: none;\n		text-align: left;\n		vertical-align: top;\n	}\n\n	.info-box-item-property-name {\n		font-weight: bold;\n	}\n\n	.info-box-item-property-value {\n	}\n\n	.data-node {\n		text-align: right;\n		fill-opacity: 1;\n		fill: white;\n		stroke: black;\n		stroke-width: 1;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n    		pointer-events:auto;\n	}\n	.data-node:hover {\n	 	cursor: pointer;\n	}\n	\n	.has-xref:hover {\n		cursor: pointer;\n	}\n\n	.data-node.gene-product {\n	}\n\n	.metabolite {\n		stroke: blue;\n	}\n\n	.data-node.metabolite &gt; .text-area {\n		fill: blue;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.data-node.pathway {\n		stroke: none;\n		fill-opacity: 0;\n	}\n\n	.data-node.pathway &gt; .text-area {\n		fill: rgb(20,150,30);\n		fill-opacity: 1;\n		font-size: 12px;\n		font-weight: bold;\n	}\n\n	.data-node.protein {\n	}\n\n	.data-node.rna {\n	}\n\n	.data-node.unknown {\n	}\n\n	.label {\n		stroke: null;\n		stroke-width: 0;\n		fill-opacity: 0;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	.shape {\n		fill-opacity: 0;\n		stroke: black;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	.shape.none {\n		fill: none;\n		fill-opacity: 0;\n		stroke: none;\n	}\n\n	g.group-node &gt; .shape {\n		fill-opacity: 0.098;\n		stroke: gray;\n		stroke-miterlimit: 1;\n		stroke-width: 1px;\n    		pointer-events:none;\n	}\n\n	.group-node {\n		fill-opacity: 0.098;\n		stroke: gray;\n		stroke-miterlimit: 1;\n		stroke-width: 1px;\n    		pointer-events:none;\n	}\n\n	.group-node &gt; .text-area {\n		fill-opacity: 0.4;\n		font-family: Serif, Times;\n		font-size: 32px;\n		fill: black;\n		stroke-width: 0;\n		font-weight: bold;\n  	}	\n\n	.group-node.none {\n		fill: rgb(180,180,100);\n		stroke-dasharray: 5,3;\n	}\n\n	.group-node.none &gt; .text-area {\n		display: none;\n  	}	\n\n	/*.group-node.none:hover {\n		fill: rgb(255,180,100);\n		fill-opacity: 0.05;\n	}*/\n\n	.group-node.group {\n		fill-opacity: 0;\n		stroke: none;\n	}\n\n	.group-node.group &gt; .text-area {\n		display: none;\n  	}\n	/*.group-node.group:hover {\n		fill: rgb(0,0,255);\n		stroke-width: 1px;\n		stroke-dasharray: 5,3;\n		stroke: gray;\n		fill-opacity: 0.1;\n	}*/\n\n	.group-node.complex {\n		fill: rgb(180,180,100);\n	}\n\n	.group-node.complex &gt; .text-area {\n		display: none;\n  	}\n	/*.group-node.complex:hover {\n		fill: rgb(255,0,0);\n		fill-opacity: 0.05;\n	}*/	\n\n  	.group-node.pathway {\n		fill: rgb(0,255,0);\n		stroke-dasharray: 5,3;\n	}\n	/*.group-node.pathway:hover {\n		fill: rgb(0,255,0);\n		fill-opacity: 0.2;\n	}*/\n	.group-node.pathway &gt; .text-area {\n		fill: rgb(20,150,30);\n		stroke: rgb(20,150,30);\n  }\n\n  .cellular-component {\n		fill-opacity: 0;\n		stroke: silver;\n	}\n\n  .graphical-line {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	.interaction {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	marker {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n  .marker-end {\n    -webkit-transform: rotate(180deg);\n    -webkit-transform-origin: 50% 50%;\n\n    -o-transform: rotate(180deg); \n    -o-transform-origin: 50% 50%;\n\n    transform: rotate(180deg);\n    transform-origin: 50% 50%;\n  }\n\n	.solid-stroke {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n	.dashed-stroke {\n		stroke-dasharray: 5,3;\n	}\n\n  .highlighted-node {\n		fill: yellow;\n    fill-opacity: 0.2;\n		stroke: orange; \n    stroke-width: 3px;\n  }\n</style></defs><filter id="highlight" width="150%" height="150%"><feOffset result="offOut" in="SourceGraphic" dx="30" dy="30"></feOffset><feGaussianBlur result="blurOut" in="offOut" stdDeviation="10"></feGaussianBlur><feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend></filter><g id="viewport" transform="matrix(0.9264531435349941, 0, 0, 0.9264531435349941, 607.8902728351127, 20) "></g></svg>\n';
pathvisioNS["src/css/pathway-diagram.css"] = '	svg {\n		color-interpolation: auto;\n		image-rendering: auto;\n		shape-rendering: auto;\n		vector-effect: non-scaling-stroke;\n                background: white;\n	/* removed fill and stroke since they override marker specs */\n	/*	fill: white;\n    		stroke: black; */\n	}\n\n	/* default color for pathway elements */\n	.default-fill-color {\n		fill: black; \n	}\n	.default-stroke-color {\n		stroke: black;\n	}\n	\n	/* default color of the background drawing board */ 	\n	.board-fill-color {\n		fill: white;\n	}\n	.board-stroke-color {\n		stroke: white;\n	}\n\n	.text-area {\n		font-family: Sans-Serif, Helvetica, Arial;\n		text-align: center;\n		vertical-align: middle;\n		font-size: 10px;\n		fill: black;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.citation {\n		font-family: Sans-Serif, Helvetica, Arial;\n		text-align: center;\n		vertical-align: top;\n		font-size: 7px;\n		fill: #999999;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.info-box {\n		font-family: Sans-Serif;\n		font-size: 10px;\n		fill: black;\n		stroke: none;\n		text-align: left;\n		vertical-align: top;\n	}\n\n	.info-box-item-property-name {\n		font-weight: bold;\n	}\n\n	.info-box-item-property-value {\n	}\n\n	.data-node {\n		text-align: right;\n		fill-opacity: 1;\n		fill: white;\n		stroke: black;\n		stroke-width: 1;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n    		pointer-events:auto;\n	}\n	.data-node:hover {\n	 	cursor: pointer;\n	}\n	\n	.has-xref:hover {\n		cursor: pointer;\n	}\n\n	.data-node.gene-product {\n	}\n\n	.metabolite {\n		stroke: blue;\n	}\n\n	.data-node.metabolite > .text-area {\n		fill: blue;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.data-node.pathway {\n		stroke: none;\n		fill-opacity: 0;\n	}\n\n	.data-node.pathway > .text-area {\n		fill: rgb(20,150,30);\n		fill-opacity: 1;\n		font-size: 12px;\n		font-weight: bold;\n	}\n\n	.data-node.protein {\n	}\n\n	.data-node.rna {\n	}\n\n	.data-node.unknown {\n	}\n\n	.label {\n		stroke: null;\n		stroke-width: 0;\n		fill-opacity: 0;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	.shape {\n		fill-opacity: 0;\n		stroke: black;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	.shape.none {\n		fill: none;\n		fill-opacity: 0;\n		stroke: none;\n	}\n\n	g.group-node > .shape {\n		fill-opacity: 0.098;\n		stroke: gray;\n		stroke-miterlimit: 1;\n		stroke-width: 1px;\n    		pointer-events:none;\n	}\n\n	.group-node {\n		fill-opacity: 0.098;\n		stroke: gray;\n		stroke-miterlimit: 1;\n		stroke-width: 1px;\n    		pointer-events:none;\n	}\n\n	.group-node > .text-area {\n		fill-opacity: 0.4;\n		font-family: Serif, Times;\n		font-size: 32px;\n		fill: black;\n		stroke-width: 0;\n		font-weight: bold;\n  	}	\n\n	.group-node.none {\n		fill: rgb(180,180,100);\n		stroke-dasharray: 5,3;\n	}\n\n	.group-node.none > .text-area {\n		display: none;\n  	}	\n\n	/*.group-node.none:hover {\n		fill: rgb(255,180,100);\n		fill-opacity: 0.05;\n	}*/\n\n	.group-node.group {\n		fill-opacity: 0;\n		stroke: none;\n	}\n\n	.group-node.group > .text-area {\n		display: none;\n  	}\n	/*.group-node.group:hover {\n		fill: rgb(0,0,255);\n		stroke-width: 1px;\n		stroke-dasharray: 5,3;\n		stroke: gray;\n		fill-opacity: 0.1;\n	}*/\n\n	.group-node.complex {\n		fill: rgb(180,180,100);\n	}\n\n	.group-node.complex > .text-area {\n		display: none;\n  	}\n	/*.group-node.complex:hover {\n		fill: rgb(255,0,0);\n		fill-opacity: 0.05;\n	}*/	\n\n  	.group-node.pathway {\n		fill: rgb(0,255,0);\n		stroke-dasharray: 5,3;\n	}\n	/*.group-node.pathway:hover {\n		fill: rgb(0,255,0);\n		fill-opacity: 0.2;\n	}*/\n	.group-node.pathway > .text-area {\n		fill: rgb(20,150,30);\n		stroke: rgb(20,150,30);\n  }\n\n  .cellular-component {\n		fill-opacity: 0;\n		stroke: silver;\n	}\n\n  .graphical-line {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	.interaction {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	marker {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n  .marker-end {\n    -webkit-transform: rotate(180deg);\n    -webkit-transform-origin: 50% 50%;\n\n    -o-transform: rotate(180deg); \n    -o-transform-origin: 50% 50%;\n\n    transform: rotate(180deg);\n    transform-origin: 50% 50%;\n  }\n\n	.solid-stroke {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n	.dashed-stroke {\n		stroke-dasharray: 5,3;\n	}\n\n  .highlighted-node {\n		fill: yellow;\n    fill-opacity: 0.2;\n		stroke: orange; \n    stroke-width: 3px;\n  }\n';


// IE8 only allows console.log when Developer Tools is open. This will prevent errors
// from showing up if we use console.log without DevTools being open.
// from http://stackoverflow.com/questions/3326650/console-is-undefined-error-for-internet-explorer

/**
 * Protect window.console method calls, e.g. console is not defined on IE
 * unless dev tools are open, and IE doesn't define console.debug
 */
(function() {
  if (!window.console) {
    window.console = {};
  }
  // union of Chrome, FF, IE, and Safari console methods
  var m = [
    "log", "info", "warn", "error", "debug", "trace", "dir", "group",
    "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
    "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
  ];
  // define undefined methods as noops to prevent errors
  for (var i = 0; i < m.length; i++) {
    if (!window.console[m[i]]) {
      window.console[m[i]] = {};
      //window.console[m[i]] = function() {};
    }
  }
})();

var pathvisiojs = {
  load: function(args) {
    var svg,
      pathway,
      pathvisiojs = this;

    this.args = args;
    this.model = {};
    this.model.elements = [];
    this.formatConverter.model = this.formatConverter.gpml.model = this.formatConverter.gpml.graphics.model = this.formatConverter.gpml.group.model = this.formatConverter.gpml.interaction.model = this.renderer.model = this.renderer.publicationXref.model = this.model;

    //console.log(args);

    // for now, load will just load a visual representation of a pathway, but
    // this could change in the future if we add capabilities for analytics or data conversion.

    // ********************************************
    // Check that required parameters are present
    // ********************************************

    if (!args.container) {
      throw new Error('No container selector specified to indicate where to insert the diagram.');
    }
    if (!args.sourceData[0].uri) {
      throw new Error('No sourceData uri specified.');
    }

    var configArray = d3.map(pathvisiojs.config).entries();
    var updateConfigsAsNeeded = function(configElement, callback) {
      if (args.hasOwnProperty(configElement.key)) {
        pathvisiojs.config[configElement.key] = args[configElement.key];
      }
      callback(null);
    };

    async.each(configArray, updateConfigsAsNeeded, function(err){
      //console.log(pathvisiojs.config.bridgedbLinkOutsUriStub);
      pathvisiojs.renderer.load(args);
    });
  }
};


pathvisiojs.utilities = function(){
  'use strict';

  // from here: http://www.cjboco.com/blog.cfm/post/determining-an-elements-width-and-height-using-javascript/
  // TODO have not tested x-browser yet.
  // could use jquery, but I want to remove it as a dependency for pv.js.
  Element.prototype.getElementWidth = function() {
    if (typeof this.clip !== "undefined") {
      return this.clip.width;
    } else {
      if (this.style.pixelWidth) {
        return this.style.pixelWidth;
      } else {
        return this.width;
      }
    }
  };

  Element.prototype.getElementHeight = function() {
    if (typeof this.clip !== "undefined") {
      return this.clip.width;
    } else {
      if (this.style.pixelHeight) {
        return this.style.pixelHeight;
      } else {
        return this.height;
      }
    }
  };

  function collect() {
    // from http://stackoverflow.com/questions/2454295/javascript-concatenate-properties-from-multiple-objects-associative-array
    var ret = {};
    var len = arguments.length;
    for (var i=0; i<len; i++) {
      for (var p in arguments[i]) {
        if (arguments[i].hasOwnProperty(p)) {
          ret[p] = arguments[i][p];
        }
      }
    }
    return ret;
  }

  function clone(src) {
    function mixin(dest, source, copyFunc) {
      var name, s, i, empty = {};
      for(name in source){
        // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
        // inherited from Object.prototype.	 For example, if dest has a custom toString() method,
        // don't overwrite it with the toString() method that source inherited from Object.prototype
        s = source[name];
        if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
          dest[name] = copyFunc ? copyFunc(s) : s;
        }
      }
      return dest;
    }

    if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
      // null, undefined, any non-object, or function
      return src;	// anything
    }
    if(src.nodeType && "cloneNode" in src){
      // DOM Node
      return src.cloneNode(true); // Node
    }
    if(src instanceof Date){
      // Date
      return new Date(src.getTime());	// Date
    }
    if(src instanceof RegExp){
      // RegExp
      return new RegExp(src);   // RegExp
    }
    var r, i, l;
    if(src instanceof Array){
      // array
      r = [];
      for(i = 0, l = src.length; i < l; ++i){
        if(i in src){
          r.push(clone(src[i]));
        }
      }
      // we don't clone functions for performance reasons
      //		}else if(d.isFunction(src)){
      //			// function
      //			r = function(){ return src.apply(this, arguments); };
    }else{
      // generic objects
      r = src.constructor ? new src.constructor() : {};
    }
    return mixin(r, src, clone);

  }  

  // this both clones a node and inserts it at the same level of the DOM
  // as the element it was cloned from.
  // it returns a d3 selection of the cloned element
  function cloneNode(selector) {
    var node = d3.select(selector).node();
    return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
  }

  function convertToArray(object) {
    var array = null;
    if (getObjectType( object ) === 'Object' ) {
      array = [];
      array.push(object);
      return array;
    }
    else {
      if( getObjectType( object ) === 'Array' ) {
        return object;
      }
      else {
        if( getObjectType( object ) === 'String' ) {
          array = [];
          array.push(object);
          return array;
        }
      }
    }
  }

  function getObjectType(object) {
    var result;
    if (Object.prototype.toString.call( object ) === '[object Object]' ) {
      result = 'Object';
    }
    else {
      if( Object.prototype.toString.call( object ) === '[object Array]' ) {
        result = 'Array';
      }
      else {
        if( Object.prototype.toString.call( object ) === '[object String]' ) {
          result = 'String';
        }
      }
    }
    return result;
  }

  function getTextDirection(text) {
    /**
     * From http://stackoverflow.com/questions/7770235/change-text-direction-of-textbox-automatically
     * What about Chinese characters that go top to bottom?
     */
    var x =  new RegExp("[\x00-\x80]+"); // is ascii

    //alert(x.test($this.val()));

    var isAscii = x.test(text);

    var direction;
    if (isAscii) {
      direction = "ltr";
    }
    else {
      direction = "rtl";
    }

    return direction;
  }  

  function getUriParam(name) {
    // Thanks to http://stackoverflow.com/questions/11582512/how-to-get-uri-parameters-with-javascript
    // This will be replaced once we get the backend php to get the json
    var parameter = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    if (!!parameter) {
      return parameter;
    }
    else {
      console.warn('Warning: URL parameter "' + name + '" is null.');
      return null;
    }
  }

 function getWindowDimensions(object) {
    var winW = 630, winH = 460;
    if (document.body && document.body.width) {
     winW = document.body.width;
     winH = document.body.height;
    }
    if (document.compatMode=='CSS1Compat' &&
        document.documentElement &&
        document.documentElement.width ) {
     winW = document.documentElement.width;
     winH = document.documentElement.height;
    }
    if (window.innerWidth && window.innerHeight) {
     winW = window.innerWidth;
     winH = window.innerHeight;
    }
    return {'width':winW, 'height':winH};
  }

  function intersect(a, b) {
    // modified version of https://github.com/juliangruber/intersect/blob/master/index.js
    var res = [];
    for (var i = 0; i < a.length; i++) {
      if (b.indexOf(a[i]) > -1) res.push(a[i]);
    }
    return res;
  }

  function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }

  function isUri(str) {
    // from https://gist.github.com/samuelcole/920312
    var uriPattern = /(?:(?=[\s`!()\[\]{};:'".,<>?«»“”‘’])|\b)((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/|[a-z0-9.\-]+[.](?:com|org|net))(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))*(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]|\b))/gi;
    return uriPattern.test(str);
  }

  // see http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  var isOdd = function(num) {
    return num % 2;
  }

  function isWikiPathwaysId(data) {
    data = data.trim();
    if (data.substr(0,2).toUpperCase() === 'WP' && isNumber(data.substr(data.length - 1))) {
      return true;
    }
    else {
      return false;
    }
  }

  // TODO should we use requirejs for loading scripts instead?
  function loadScripts(array, callback){  
    var loader = function(src,handler){  
      var script = document.createElement('script');  
      script.src = src;  
      script.onload = script.onreadystatechange = function(){  
        script.onreadystatechange = script.onload = null;  
        if(/MSIE ([6-9]+\.\d+);/.test(navigator.userAgent))window.setTimeout(function(){handler();},8,this);  
        else handler();  
      }  
      var head = document.getElementsByTagName('head')[0];  
      (head || document.body).appendChild( script );  
    };  
    (function(){  
      if(array.length!=0){  
        loader(array.shift(),arguments.callee);  
      }else{  
        callback && callback();  
      }  
    })();  
  }

  function moveArrayItem(arr, old_index, new_index) {
    // from http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another
    if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
  }

  function splitStringByNewLine(str) {
    // PathVisio (Java) uses '&#xA;' for indicating newline, and browsers convert this into '\r\n' or '\n' in JavaScript.
    return str.split(/\r\n|\r|\n/g);
  }

  function strToHtmlId(str) {
    var re = /\W/gi;
    var id = str.replace(re, "");
    return id;
  }

  return{
    clone:clone,
    cloneNode:cloneNode,
    collect:collect,
    convertToArray:convertToArray,
    getObjectType:getObjectType,
    getTextDirection:getTextDirection,
    getUriParam:getUriParam,
    getWindowDimensions:getWindowDimensions,
    isIE:isIE,
    intersect:intersect,
    isNumber:isNumber,
    isOdd:isOdd,
    isUri:isUri,
    isWikiPathwaysId:isWikiPathwaysId,
    loadScripts:loadScripts,
    moveArrayItem:moveArrayItem,
    splitStringByNewLine:splitStringByNewLine,
    strToHtmlId:strToHtmlId
  };
}();





"use strict";
pathvisiojs.config = {};
pathvisiojs.config.gpmlSourceUriStub = '/wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:';
pathvisiojs.config.bridgedbLinkOutsUriStub = '/wpi/extensions/bridgedb.php/';
pathvisiojs.config.bridgedbDatasources = '/wpi/extensions/PathwayViewer/datasources.txt';
pathvisiojs.config.diagramLoadingIconUri = '/wpi/extensions/PathwayViewer/img/loading.gif';
pathvisiojs.config.diagramNotAvailableIconUri = '/wpi/extensions/PathwayViewer/img/imageNotAvailable.jpg';
pathvisiojs.config.imgDiagramUriStub = '/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:';
pathvisiojs.config.pathwaySearchUriStub = '/index.php?title=Special:SearchPathways&doSearch=1&query=';


pathvisiojs.formatConverter = {
  // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
  // GPML or has no type specified, into JSON.
  // TODO Later, this functionality can be extended to include other data types and
  // to test for data type when it is not specified.
  get: function(sourceData, callback) {
    console.log('model in data');
    console.log(this.model);

    var uri = sourceData.uri;
    var object = sourceData.object;
    var fileType = sourceData.fileType;

    if (!uri) {
      return new Error('No uri specified.');
    }
    if (!fileType) {
      return new Error('No fileType specified.');
    }

    // TODO handle if sourceData.object

    if (fileType === 'gpml') {
      this.data.gpml.get(sourceData, function(gpml) {
        this.data.gpml.toPvjson(gpml, uri, function(json) {
          callback(json);
        });
      });
    }
    else {
      throw new Error('Cannot get jGpml from the specified input.');
    }
  }
};


pathvisiojs.formatConverter.bridgedb = function(){
  'use strict';

  function getXrefAnnotationDataByDataNode(singleSpecies, id, datasource, label, desc, callback) {
    //For unannotated nodes, without datasource or identifier
    if (null == id || null == datasource){
        var annotationData = {
          "header": label,
          "description": desc,
          "listItems": ['Missing ID and datasource']
        };
        callback(annotationData);  
    } else {   
    getDataSources(function(dataSources) {
      var dataSourceRowCorrespondingToDataNodeXrefDatabase = getDataSourceRowByName(datasource, dataSources);
      var systemCode = dataSourceRowCorrespondingToDataNodeXrefDatabase.systemCode;
      getXrefAliases(singleSpecies, systemCode, id, function(xRefAliases) {
        var currentDataSourceRow;
        var listItems = [];
        if (typeof xRefAliases != 'undefined') { //BridgeDb Error
        listItems = xRefAliases.map(function(xRefAlias) {
          var listItem = {}
          listItem.title = xRefAlias.dataSourceName;
          listItem.text = xRefAlias.xRefId;
          currentDataSourceRow = getDataSourceRowByName(xRefAlias.dataSourceName, dataSources);
          listItem.priority = currentDataSourceRow.priority;
          if (currentDataSourceRow.hasOwnProperty('linkoutPattern')) {
            if (currentDataSourceRow.linkoutPattern !== "" && currentDataSourceRow.linkoutPattern !== null) {
              listItem.uri = currentDataSourceRow.linkoutPattern.replace('$id', listItem.text);
            }
          }
          return listItem;
        });
        }

        listItems.sort(function(a, b) {
          if (a.priority === b.priority)
          {
              var x = a.title.toLowerCase(), y = b.title.toLowerCase();
              
              return x < y ? -1 : x > y ? 1 : 0;
          }
          return b.priority - a.priority;
        });

        var nestedListItems = d3.nest()
        .key(function(d) { return d.title; })
        .entries(listItems);

        // handle case where nothing is returned by bridgedb webservice
        if (nestedListItems.length == 0){
          var uri = "";
          var ds = getDataSourceRowByName(datasource, dataSources);
           if (ds.hasOwnProperty('linkoutPattern')) {
             if (ds.linkoutPattern !== "" && ds.linkoutPattern !== null) {
               uri = ds.linkoutPattern.replace('$id', id);
             }
           }
          nestedListItems = [{"key": datasource, "values":[{"priority": "1","text": id,"title": datasource,"uri":uri}]}];
        }

        // We want the identifier that was listed by the pathway creator for this data node to be listed first.

        var specifiedListItem = nestedListItems.filter(function(element) {return (element.key == datasource);})[0];
        var currentListItemIndex = nestedListItems.indexOf(specifiedListItem);
        nestedListItems = pathvisiojs.utilities.moveArrayItem(nestedListItems, currentListItemIndex, 0);

        var specifiedXRefId = specifiedListItem.values.filter(function(element) {return (element.text == id);})[0];
        var currentXRefIdIndex = specifiedListItem.values.indexOf(specifiedXRefId);
        specifiedListItem.values = pathvisiojs.utilities.moveArrayItem(specifiedListItem.values, currentXRefIdIndex, 0);

        var annotationData = {
          "header": label,
          "description": desc,
          "listItems": nestedListItems
        };
        callback(annotationData);
      });
    });
   }
  }

  function getDataSourceRowByName(dataSourceName, dataSources) {
    var regexp = /[^\w]/gi;
    var dataSourceRow = dataSources.filter(function(row) { return row.dataSourceName === dataSourceName; })[0];
    if (!dataSourceRow) {
      dataSourceRow = dataSources.filter(function(row) { return row.dataSourceName.replace(regexp, '').toLowerCase() === dataSourceName.replace(regexp, '').toLowerCase(); })[0];
    }
    return dataSourceRow;
  }

  function getDataSources(callback) {
    d3.tsv(pathvisiojs.config.bridgedbDatasources)
    .response(function(request) {
      return d3.tsv.parseRows(request.responseText, function(d) {
        return {dataSourceName: d[0], systemCode: d[1], websiteUri: d[2], linkoutPattern: d[3], exampleIdentifier: d[4], entityIdentified: d[5], singleSpecies: d[6], priority: d[7], uri: d[8], regex: d[9], officialName: d[10]};
      });
    })
    .get(function(error, rows) {
      callback(rows);
    });
  }

  function getXrefAliases(singleSpecies, systemCode, xRefId, callback) {
    var bridgedbUri = pathvisiojs.config.bridgedbLinkOutsUriStub + encodeURIComponent(singleSpecies) + '/xrefs/' + encodeURIComponent(systemCode) + '/' + encodeURIComponent(xRefId);
    //console.log(bridgedbUri);
    d3.tsv(bridgedbUri)
    .response(function(request) { 
      return d3.tsv.parseRows(request.responseText, function(d) {
        return {xRefId: d[0], dataSourceName: d[1]}; 
      });
    })
    .get(function(error, rows) {
      callback(rows);
    });
  }

  return {
    getXrefAnnotationDataByDataNode:getXrefAnnotationDataByDataNode
  };
}();


pathvisiojs.formatConverter.biopax = function(){
  'use strict';

  // TODO get ontology terms and other data

  function toPvjson(xmlBiopax, callback) {
    try {
      d3.ns.prefix.bp = 'http://www.biopax.org/owldoc/Level3/';
      d3.ns.prefix.rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
      d3.ns.qualify('bp:PublicationXref');      
      var xmlBiopaxPubs = xmlBiopax.selectAll('PublicationXref');
      var jsonBiopax = {};
      jsonBiopax.PublicationXref = [];
      var publicationXref;
      xmlBiopaxPubs.each(function() {
        publicationXref = {};
        publicationXref.rdfId = d3.select(this).attr('rdf:id').toString();
        jsonBiopax.PublicationXref.push(publicationXref);
      });
      callback(jsonBiopax);
    }
    catch (e) {
      throw new Error("Error converting biopax to json: " + e.message);
    }
  }

  return {
    toPvjson:toPvjson
  };
}();



pathvisiojs.formatConverter.pvjson = function(){
  'use strict';

  // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
  // GPML or has no type specified, into JSON.
  // TODO Later, this functionality can be extended to include other data types and
  // to test for data type when it is not specified.
  function get(renderableSourceDataElement, callback) {
    var uri = renderableSourceDataElement.uri;
    var object = renderableSourceDataElement.object;
    var fileType = renderableSourceDataElement.fileType;

    if (!uri) {
      return new Error('No uri specified.');
    }
    if (!fileType) {
      return new Error('No fileType specified.');
    }

    // TODO handle if renderableSourceDataElement.object exists

    if (fileType === 'gpml') {
      pathvisiojs.formatConverter.gpml.get(renderableSourceDataElement, function(gpml) {
        pathvisiojs.formatConverter.gpml.toPvjson(gpml, uri, function(json) {
          console.log('json');
          console.log(json);
          callback(json);
        });
      });
    }
    else {
      throw new Error('Cannot get jGpml from the specified input.');
    }

    // This is just an experiment with using mongodb for caching json,
    // but the higher priority for now would be to cache the SVG.
    // Caching the json would be part of having the API deliver results
    // in JSON format.
    /*
    d3.json(parsedInputData.cached, function(json) {
      callback(json);
    });
    //*/
  }

  return{
    get:get
  };
}();




pathvisiojs.formatConverter.gpml = {
  defaults: {
    'FontSize':{
      'Type':"FontSize",
      'Value':10
    }
  },

  // Removes confusion of GroupId vs. GraphId by just using GraphId to identify containing elements
  addIsContainedByAttribute: function(gpmlSelection) {
    gpmlSelection.selectAll('Group').each(function() {
      var groupSelection = d3.select(this);
      var groupId = groupSelection.attr('GroupId');
      groupSelection.attr('GroupId', null);
      var graphId = groupSelection.attr('GraphId');
      var groupedElementsSelection = gpmlSelection.selectAll('[GroupRef=' + groupId + ']').each(function(){
        var groupedElementSelection = d3.select(this)
        .attr('IsContainedBy', graphId)
        .attr('GroupRef', null);
      });
    });
    return gpmlSelection;
  },

  selectByMultipleTagNames: function(args){
    var gpmlSelection = args.gpmlSelection;
    var elementTags = args.elementTags;
    var elementsSelection;
    var newElementsSelection;
    elementTags.forEach(function(elementTag){
      newElementsSelection = gpmlSelection.selectAll(elementTag);
      if (!!newElementsSelection[0][0]) {
        if (!!elementsSelection) {
          elementsSelection[0] = elementsSelection[0].concat(newElementsSelection[0]);
        }
        else {
          elementsSelection = newElementsSelection;
        }
      }
    });
    return elementsSelection;
  },

  // Fills in implicit values
  makeExplicit: function(gpmlSelection) {
    var groupSelection, groupGroupSelection, groupNoneSelection, groupPathwaySelection, groupComplexSelection, cellularComponentValue,
      groupGraphicsSelection, groupGroupGraphicsSelection, groupNoneGraphicsSelection, groupPathwayGraphicsSelection, groupComplexGraphicsSelection,
      graphId, graphIdStub, graphIdStubs = [];

    var selectAllGraphicalElementsArgs = {};
    selectAllGraphicalElementsArgs.gpmlSelection = gpmlSelection;
    selectAllGraphicalElementsArgs.elementTags = [
      'DataNode',
      'Label',
      'Shape',
      'State',
      'Anchor',
      'Interaction',
      'GraphicalLine',
      'Group'
    ];
    var graphicalElementsSelection = this.selectByMultipleTagNames(selectAllGraphicalElementsArgs);
    // graphIdStub is whatever follows 'id' at the beginning of the GraphId string
    if (!!graphicalElementsSelection) {
      graphicalElementsSelection.filter(function(){
        return (!!d3.select(this).attr('GraphId'));
      }).each(function(){
        graphId = d3.select(this).attr('GraphId');
        if (graphId.slice(0,2) === 'id') {
          graphIdStub = graphId.slice(2, graphId.length);
          graphIdStubs.push(graphIdStub);
        }
      });
      graphIdStubs.sort(function(a,b){
        return parseInt(a, 32) - parseInt(b, 32);
      });
      var largestGraphIdStub = graphIdStubs[graphIdStubs.length - 1] || 0;

      // Add a GraphId to every element missing a GraphId by converting the largest graphIdStub to int, incrementing,
      // converting back to base32 and appending it to the string 'id'.
      graphicalElementsSelection.filter(function(){
        return (!d3.select(this).attr('GraphId'));
      }).each(function(){
        largestGraphIdStub = (parseInt(largestGraphIdStub, 32) + 1).toString(32);
        d3.select(this).attr('GraphId', 'id' + largestGraphIdStub);
      });

      var groupsSelection = gpmlSelection.selectAll('Group').each(function(){
        groupSelection = d3.select(this);
        groupGraphicsSelection = groupSelection.append('Graphics')
        .attr('Align', 'Center')
        .attr('Valign', 'Middle')
        .attr('FontWeight', 'Bold')
        .attr('LineThickness', 1)
        .attr('FillOpacity', 0.1);
      });
      var groupGroupsSelection = gpmlSelection.selectAll('Group[Style=Group]').each(function(){
        groupGroupSelection = d3.select(this);
        groupGroupGraphicsSelection = groupGroupSelection.select('Graphics')
        .attr('FontSize', '1')
        .attr('Padding', '8')
        .attr('ShapeType', 'None')
        .attr('LineStyle', 'Broken')
        .attr('Color', '808080')
        .attr('FillColor', 'Transparent');
      });
      var groupNonesSelection = gpmlSelection.selectAll('Group[Style=None]').each(function(){
        groupNoneSelection = d3.select(this);
        groupNoneGraphicsSelection = groupNoneSelection.select('Graphics')
        .attr('FontSize', '1')
        .attr('Padding', '8')
        .attr('ShapeType', 'Rectangle')
        .attr('LineStyle', 'Broken')
        .attr('Color', '808080')
        .attr('FillColor', 'B4B464');
      });

      if (!!groupsSelection) {
        groupsSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('ShapeType'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('ShapeType', 'None');
          groupNoneSelection = d3.select(this);
          groupNoneGraphicsSelection = groupNoneSelection.select('Graphics')
          .attr('FontSize', '1')
          .attr('Padding', '8')
          .attr('ShapeType', 'Rectangle')
          .attr('LineStyle', 'Broken')
          .attr('Color', '808080')
          .attr('FillColor', 'B4B464');
        });
      }

      var groupComplexesSelection = gpmlSelection.selectAll('Group[Style=Complex]').each(function(){
        groupComplexSelection = d3.select(this);
        groupComplexGraphicsSelection = groupComplexSelection.select('Graphics')
        .attr('FontSize', '1')
        .attr('Padding', '11')
        .attr('ShapeType', 'Complex')
        .attr('Color', '808080')
        .attr('FillColor', 'B4B464')
        .attr('LineStyle', 'Solid');
      });
      var groupPathwaysSelection = gpmlSelection.selectAll('Group[Style=Pathway]').each(function(){
        groupPathwaySelection = d3.select(this);
        groupPathwayGraphicsSelection = groupPathwaySelection.select('Graphics')
        .attr('FontSize', '1')
        //.attr('FontSize', '32')
        .attr('Padding', '8')
        .attr('ShapeType', 'Rectangle')
        .attr('LineStyle', 'Broken')
        .attr('Color', '808080')
        .attr('FillColor', '00FF00');
      });

      // nodesSelection does not include Groups
      var selectAllNodesArgs = {};
      selectAllNodesArgs.gpmlSelection = gpmlSelection;
      selectAllNodesArgs.elementTags = [
        'DataNode',
        'Label',
        'Shape',
        'State'
      ];
      var nodesSelection = this.selectByMultipleTagNames(selectAllNodesArgs);
      if (!!nodesSelection) {
        var labelsSelection = gpmlSelection.selectAll('Label');
        if (!!labelsSelection) {
          labelsSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('ShapeType'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('ShapeType', 'None');
          });
          labelsSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('FillColor'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('FillColor', 'Transparent');
          });
        }

        var statesSelection = gpmlSelection.selectAll('State');
        if (!!statesSelection) {
          statesSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('FillColor'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('FillColor', 'ffffff');
          });

          statesSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('FontSize'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('FontSize', 10);
          });

          statesSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('Valign'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('Valign', 'Middle');
          });
        }

        var shapesSelection = gpmlSelection.selectAll('Shape');
        if (!!shapesSelection) {
          shapesSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('FillColor'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('FillColor', 'Transparent');
          });

          shapesSelection.filter(function(){
            return (d3.select(this).select('Graphics').attr('Rotation') === '0.0');
          }).each(function(){
            d3.select(this).select('Graphics').attr('Rotation', null);
          });

          var cellularComponentsSelection = shapesSelection.selectAll('[Key="org.pathvisio.CellularComponentProperty"]').each(function(){
            cellularComponentValue = d3.select(this).attr('Value');
            d3.select(this.parentElement).attr('CellularComponent', cellularComponentValue);
          });
        }

        // "Ellipse" is the word that other graphics libraries seem to have standardized on.
        nodesSelection.filter(function(){
          return (d3.select(this).select('Graphics').attr('ShapeType') === 'Oval');
        }).each(function(){
          d3.select(this).select('Graphics').attr('ShapeType', 'Ellipse');
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('Padding'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('Padding', '0.5em');
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('ShapeType'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('ShapeType', 'Rectangle');
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('Color'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('Color', '000000');
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('LineThickness'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('LineThickness', 1);
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('ZOrder'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('ZOrder', 0);
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('Align'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('Align', 'Center');
        });

        nodesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('Valign'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('Valign', 'Top');
        });

        // some shapes have GPML values that do not match what is visually displayed in PathVisio-Java.
        // Below we correct the GPML so that the display in pathvisiojs will match the display in PathVisio-Java.
        var gpmlWidth, correctedGpmlWidth, gpmlHeight, gpmlCenterX, gpmlCenterY, xScaleFactor;
        var triangleSelection,
          triangleXCorrectionFactor = 0.311,
          triangleWidthCorrectionFactor = 0.938,
          triangleYScaleFactor = 0.868;
        var trianglesSelection = shapesSelection.selectAll('[ShapeType="Triangle"]').each(function(){
          triangleSelection = d3.select(this);
          gpmlCenterX = parseFloat(triangleSelection.attr('CenterX'));
          gpmlCenterY = parseFloat(triangleSelection.attr('CenterY'));
          gpmlWidth = parseFloat(triangleSelection.attr('Width'));
          gpmlHeight = parseFloat(triangleSelection.attr('Height'));

          var uncorrectedX = gpmlCenterX - gpmlWidth/2;
          var correctedX = uncorrectedX + gpmlWidth * triangleXCorrectionFactor;
          var correctedWidth = gpmlWidth * triangleWidthCorrectionFactor;
          triangleSelection.attr('CenterX', correctedX + correctedWidth / 2)
          .attr('Height', gpmlHeight * triangleYScaleFactor)
          .attr('Width', correctedWidth);
        });
        var arcSelection;
        var arcsSelection = shapesSelection.selectAll('[ShapeType="Arc"]').each(function(){
          arcSelection = d3.select(this);
          gpmlHeight = parseFloat(arcSelection.attr('Height'));
          gpmlCenterY = parseFloat(arcSelection.attr('CenterY'));
          arcSelection.attr('CenterY', gpmlCenterY + gpmlHeight / 2);
        });
        var pentagonSelection,
          pentagonXScaleFactor = 0.904,
          pentagonYScaleFactor = 0.95;
        var pentagonsSelection = shapesSelection.selectAll('[ShapeType="Pentagon"]').each(function(){
          pentagonSelection = d3.select(this);
          gpmlWidth = parseFloat(pentagonSelection.attr('Width'));
          gpmlHeight = parseFloat(pentagonSelection.attr('Height'));
          gpmlCenterX = parseFloat(pentagonSelection.attr('CenterX'));
          pentagonSelection.attr('CenterX', gpmlCenterX + gpmlWidth * (1 - pentagonXScaleFactor) / 2)
          .attr('Width', gpmlWidth * pentagonXScaleFactor)
          .attr('Height', gpmlHeight * pentagonYScaleFactor);
        });
        var hexagonSelection,
          hexagonYScaleFactor = 0.88;
        var hexagonsSelection = shapesSelection.selectAll('[ShapeType="Hexagon"]').each(function(){
          hexagonSelection = d3.select(this);
          gpmlHeight = parseFloat(hexagonSelection.attr('Height'));
          hexagonSelection.attr('Height', gpmlHeight * hexagonYScaleFactor);
        });

        var dataNodeSelection, dataNodeType;
        var dataNodesSelection = gpmlSelection.selectAll('DataNode');
        if (!!dataNodesSelection) {
          /*
          dataNodesSelection.each(function(){
            dataNodeSelection = d3.select(this);
            dataNodeType = dataNodeSelection.attr('Type');
            dataNodeSelection.attr('BiologicalType', dataNodeType)
            .attr('Type', null);
          });
          //*/

          dataNodesSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('FillColor'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('FillColor', 'ffffff');
          });
        }

      }

      // This applies to both nodes and edges
      var doubleLinesSelection = gpmlSelection.selectAll('[Key="org.pathvisio.DoubleLineProperty"]').each(function(){
        d3.select(this.parentElement).select('Graphics').attr('LineStyle', 'Double');
      });

      var selectAllEdgesArgs = {};
      selectAllEdgesArgs.gpmlSelection = gpmlSelection;
      selectAllEdgesArgs.elementTags = [
        'Interaction',
        'GraphicalLine'
      ];
      var edgesSelection = this.selectByMultipleTagNames(selectAllEdgesArgs);

      if (!!edgesSelection) {
        edgesSelection.each(function(){
          d3.select(this).select('Graphics').attr('FillColor', 'Transparent');
        });
        edgesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('ConnectorType'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('ConnectorType', 'Straight');
        });
        edgesSelection.filter(function(){
          return (!d3.select(this).select('Graphics').attr('Color'));
        }).each(function(){
          d3.select(this).select('Graphics').attr('Color', '000000');
        });

        var anchorsSelection = gpmlSelection.selectAll('Anchor').each(function(){
          var parentGraphicsSelection = d3.select(this.parentElement);
          var anchorSelection = d3.select(this);
          var graphics = anchorSelection.append('Graphics');

          var shapeTypeValue = anchorSelection.attr('Shape') || 'None';
          graphics.attr('ShapeType', shapeTypeValue);
          anchorSelection.attr('Shape', null);

          var positionValue = anchorSelection.attr('Position');
          graphics.attr('Position', positionValue);
          anchorSelection.attr('Position', null);

          graphics.attr('LineThickness', 0);
          graphics.attr('FillColor', parentGraphicsSelection.attr('Color'));
          // In a future version of GPML, we could improve rendering speed if we included the cached X and Y values for Anchors, just like we currently do for Points.
        });
        if (!!anchorsSelection) {
          anchorsSelection.filter(function(){
            return (d3.select(this).select('Graphics').attr('ShapeType') === 'Circle');
          }).each(function(){
            d3.select(this).select('Graphics').attr('ShapeType', 'Ellipse');
            d3.select(this).select('Graphics').attr('Width', 8);
            d3.select(this).select('Graphics').attr('Height', 8);
          });
          anchorsSelection.filter(function(){
            return (d3.select(this).select('Graphics').attr('ShapeType') === 'None');
          }).each(function(){
            d3.select(this).select('Graphics').attr('Width', 4);
            d3.select(this).select('Graphics').attr('Height', 4);
          });
        }
      }
    }

    return gpmlSelection;
  },

  get: function(sourceData, callback) {
    var uri = sourceData.uri;
    var object = sourceData.object;
    var fileType = sourceData.fileType;

    if ((!uri) && (!object)) {
      return new Error('No sourceData specified.');
    }
    if (!fileType) {
      return new Error('No fileType specified.');
    }

    if (fileType === 'gpml') {
      if (pathvisiojs.utilities.isIE() !== 9) {
        // d3.xml does not work with IE9 (and probably earlier), so we're using d3.xhr instead of d3.xml for IE9
        // TODO file a bug report on d3 issue tracker
        d3.xml(uri, function(gpmlDoc) {
          var gpml = gpmlDoc.documentElement;
          self.myGpml = gpml;
          callback(gpml);
        });
      }
      else {
        async.waterfall([
          function(callbackInside) {
            if (!$) {
              // TODO should we use requirejs for loading scripts instead?
              // This URI should get moved into config.js.
              pathvisiojs.utilities.loadScripts(['http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'], function() {
                callbackInside(null);
              });
            }
            else {
              callbackInside(null);
            }
          },
          function(callbackInside) {
            d3.xhr(uri, 'application/xml', function(error, data) {
              var gpmlString = data.responseText;
              callbackInside(null, gpmlString);
            });
          },
          function(gpmlString, callbackInside) {
            var gpmlDoc = $.parseXML(gpmlString);
            var gpml = gpmlDoc.documentElement;
            callback(gpml);
          }
        ]);
      }
    }
    else {
      throw new Error('Cannot get GPML from the specified input.');
    }
  },

  gpmlColorAndShapeTypeToCss: function(gpmlColor, gpmlShapeType) {
    var result = {
      label:{
        color:null
      },
      shape:{
        stroke:null,
        fill:null
      }
    };
    if (gpmlShapeType.toLowerCase() !== 'none') {
      result.label.color = this.gpmlColorToCssColorNew(gpmlColor);
    }
    else {
      result.color = this.gpmlColorToCssColorNew(gpmlColor); // color just means text-color in this case
      result.stroke = 'transparent';
    }
    return result;
  },

  gpmlColorToCssColorNew: function(gpmlColor) {
    var color;
    if (gpmlColor.toLowerCase() === 'transparent') {
      return 'transparent';
    }
    else {
      color = new RGBColor(gpmlColor);
      if (color.ok) {
        return color.toHex();
      }
      else {
        console.warn('Could not convert GPML Color value of "' + gpmlColor + '" to a valid CSS color. Using "#c0c0c0" as a fallback.');
        return '#c0c0c0';
      }
    }
  },

  gpmlColorToCssColor: function(gpmlColor, pathvisioDefault) {
    var color;
    if (gpmlColor !== pathvisioDefault) {
      if (!!gpmlColor) {
        color = new RGBColor(gpmlColor);
        if (color.ok) {
          return color.toHex();
        }
        else {
          return pathvisioDefault;
        }
      }
      else {
        return pathvisioDefault;
      }
    }
    else {
      return pathvisioDefault;
    }
  },

  setColorAsJsonNew: function(jsonElement, currentGpmlColorValue) {
    var jsonColor = this.gpmlColorToCssColorNew(currentGpmlColorValue);
    jsonElement.color = jsonColor;
    jsonElement.borderColor = jsonColor;
    if (jsonElement.hasOwnProperty('text')) {
      jsonElement.text.color = jsonColor;
    }
    return jsonElement;
  },

  setColorAsJson: function(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
    var jsonColor;
    if (currentGpmlColorValue !== defaultGpmlColorValue) {
      jsonColor = this.gpmlColorToCssColor(currentGpmlColorValue, defaultGpmlColorValue);
      jsonElement.color = jsonColor;
      jsonElement.borderColor = jsonColor;
      if (jsonElement.hasOwnProperty('text')) {
        jsonElement.text.color = jsonColor;
      }
    }
    return jsonElement;
  },

  // TODO can we delete this function?

  getLineStyle: function(gpmlElement) {
    var LineStyle, attributes;
    var graphics = gpmlElement.select('Graphics');
    if (!!graphics) {
      LineStyle = graphics.attr('LineStyle');
      if (!!LineStyle) {
        return LineStyle;
      }
      else {

        // As currently specified, a given element can only have one LineStyle.
        // This one LineStyle can be solid, dashed (broken) or double.
        // If no value is specified in GPML for LineStyle, then we need to check
        // for whether the element has LineStyle of double.

        attributes = gpmlElement.selectAll('Attribute');
        if (attributes.length > 0) {
          LineStyle = attributes.filter(function(d, i) {
            return d3.select(this).attr('Key') === 'org.pathvisiojs.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
          });

          if (LineStyle[0].length > 0) {
            return 'double';
          }
          else {
            return null;
          }
        }
        else {
          return null;
        }
      }
    }
  },

  getBorderStyleNew: function(gpmlLineStyle) {

    // Double-lined EntityNodes will be handled by using a symbol with double lines.
    // Double-lined edges will be rendered as single-lined, solid edges, because we
    // shouldn't need double-lined edges other than for cell walls/membranes, which
    // should be symbols. Any double-lined edges are curation issues.

    var lineStyleToBorderStyleMapping = {
      'Solid':'solid',
      'Double':'solid',
      'Broken':'dashed'
    };
    var borderStyle = lineStyleToBorderStyleMapping[gpmlLineStyle];
    if (!!borderStyle) {
      return borderStyle;
    }
    else {
      console.warn('LineStyle "' + gpmlLineStyle + '" does not have a corresponding borderStyle. Using "solid"');
      return 'solid';
    }
  },

  getBorderStyle: function(gpmlLineStyle, pathvisioDefault) {

    // Double-lined EntityNodes will be handled by using a symbol with double lines.
    // Double-lined edges will be rendered as single-lined, solid edges, because we
    // shouldn't need double-lined edges other than for cell walls/membranes, which
    // should be symbols. Any double-lined edges are curation issues.

    var lineStyleToBorderStyleMapping = {
      'Solid':'solid',
      'Double':'solid',
      'Broken':'dashed'
    };
    var borderStyle;
    if (gpmlLineStyle !== pathvisioDefault) {
      if (!!gpmlLineStyle) {
        borderStyle = lineStyleToBorderStyleMapping[gpmlLineStyle];
        if (borderStyle) {
          return borderStyle;
        }
        else {
          console.warn('LineStyle "' + gpmlLineStyle + '" does not have a corresponding borderStyle. Using "solid"');
          return 'solid';
        }
      }
      else {
        return 'solid';
      }
    }
    else {

      // TODO use code to actually get the default
      
      return 'whatever the default value is';
    }
  },

  setBorderStyleAsJsonNew: function(jsonElement, currentGpmlLineStyleValue) {
    var borderStyle = this.getBorderStyleNew(currentGpmlLineStyleValue);
    jsonElement.borderStyle = borderStyle;
    return jsonElement;
  },

  setBorderStyleAsJson: function(jsonElement, currentGpmlLineStyleValue, defaultGpmlLineStyleValue) {
    var borderStyle;

    // this check happens twice because it doesn't make sense to have getBorderStyle() tell us
    // whether it has returned the default value, and we need to know whether we are using the
    // default here.

    if (currentGpmlLineStyleValue !== defaultGpmlLineStyleValue) {
      borderStyle = this.getBorderStyle(currentGpmlLineStyleValue, defaultGpmlLineStyleValue);
      jsonElement.borderStyle = borderStyle;
    }
    return jsonElement;
  },

  toPvjson: function(gpml, pathwayIri, callbackOutside){
    var gpmlSelection = this.addIsContainedByAttribute(this.makeExplicit(d3.select(gpml)));
    //var gpmlSelection = d3.select(gpml).select('Pathway');

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    console.log('GPML');
    console.log(gpml);

    var pathway = this.model;
    pathway.xmlns = gpmlSelection.attr('xmlns');
    //pathway.nodes = [];
    //pathway.edges = [];
    //pathway.elements = [];
    pathway.elements = [];

    // test for whether file is GPML

    if ( pathvisiojs.formatConverter.gpml.namespaces.indexOf(pathway.xmlns) !== -1 ) {

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisiojs).

      if (pathvisiojs.formatConverter.gpml.namespaces.indexOf(pathway.xmlns) !== 0) {

        // TODO call the Java RPC updater or in some other way call for the file to be updated.

        console.warn('GPML namespace is not one pathvisiojs can handle.');
        callbackOutside('fail');
        //alert('Pathvisiojs may not fully support the version of GPML provided (xmlns: ' + pathway.xmlns + '). Please convert to the supported version of GPML (xmlns: ' + pathvisiojs.formatConverter.gpml.namespaces[0] + ').');
      }
      else {

      async.parallel({
          '@context': function(callback){
            pathway['@context'] = {
              '@vocab':'http://vocabularies.wikipathways.org/gpml#',
              '@base': pathwayIri,
              'gpml':'http://vocabularies.wikipathways.org/gpml#',
              'id':'@id',
              /*
              'id': {
                '@id': 'http://purl.org/dc/terms/identifier',
                '@type': '@id'
              },
              //*/
              'xsd': 'http://www.w3.org/2001/XMLSchema#',
              'wp':'http://vocabularies.wikipathways.org/wp#',
              'biopax': 'http://www.biopax.org/release/biopax-level3.owl#',
              'schema':'http://schema.org/',
              'hMDB':'http://www.hmdb.ca/metabolites/HMDB',
              'entrezGene':'http://www.ncbi.nlm.nih.gov/gene/',
              'ChEBI':'http://www.ebi.ac.uk/chebi/searchId.do?chebiId=',
              'media':'http://www.w3.org/TR/mediaont-10/',
              'ex':'http://www.example.com/',
              'pathwayIri':pathwayIri,
              'PublicationXref':'biopax:PublicationXref',
              'gpmlFolder':'file://Users/andersriutta/Sites/pathvisiojs/test/gpml/',
              'name':'http://xmlns.com/foaf/0.1/name',
              'dcterms':'http://puri.org/dc/terms/',
              'css2':'http://www.w3.org/TR/CSS2/',
              'css3Ui':'http://www.w3.org/TR/css3-ui/#',
              'cssTransform':'http://www.w3.org/TR/css-transforms-1/#',
              'svg':'http://www.w3.org/TR/SVG11/',
              'boxSizing':{
                '@id':'css3Ui:box-sizing',
                '@value':'border-box'
              },
              'rotate':'cssTransform:funcdef-rotate',
              'position':'css2:visuren.html#propdef-position',
              'color':'css2:colors.html#propdef-color', //foreground color
              'backgroundColor':'css2:colors.html#propdef-background-color',
              'backgroundImage':'css2:colors.html#propdef-background-image',
              'borderColor':'css2:box.html#propdef-border-color',
              'borderWidth':'css2:box.html#propdef-border-width',
              'borderStyle':'css2:box.html#propdef-border-style',
              'x': {
                '@id': 'css2:visuren.html#propdef-left',
                '@type': 'xsd:integer'
              },
              'y':'css2:visuren.html#propdef-top',
              'width':'css2:visudet.html#propdef-width',
              'height':'css2:visudet.html#propdef-height',
              'padding':'css2:box.html#propdef-padding',
              'fontFamily':'css2:fonts.html#font-family-prop',
              'fontStyle':'css2:fonts.html#propdef-font-style', //italic
              'textAlign':'css2:text.html#propdef-text-align', //left | right | center
              'verticalAlign':'css2:visudet.html#propdef-vertical-align', //top | bottom | middle
              'fontSize':'css2:fonts.html#propdef-font-size',
              'fontWeight':'css2:fonts.html#propdef-font-weight', //normal | bold
              'zIndex': {
                '@id': 'css2:z-index',
                '@type': 'xsd:integer'
              },
              'DatasourceReference': 'wp:DatasourceReference',
              'DataSource': 'gpml:Data-Source',
              'LastModified': 'gpml:Last-Modified',
              'Pathway': 'biopax:Pathway',
              'shapeLibrary': 'http://shapelibrary.example.org/',
              'shapeName': 'shapeLibrary:shapeName',
              'image': 'schema:image',
              'dataNodeType': 'gpml:Type',
              'author': 'schema:author',
              'organism': 'biopax:organism',
              'stroke': 'svg:painting.html#StrokeProperty',
              'strokeWidth': 'svg:painting.html#StrokeWidthProperty',
              /*
              'text': {
                '@id': 'svg:text.html#TextElement',
                '@type': '@id'
              },
              //*/
              'line': {
                '@id': 'svg:text.html#TSpanElement',
                '@container': '@set'
              },
              'Group': {
                '@id': 'gpml:Group',
                '@container': '@list'
              },
              'pathwayElements': {
                '@id': 'ex:pathwayElements/',
                '@container': '@list'
              },
              'contains': {
                '@id': 'ex:contains',
                '@type': '@id'
                //'@container': '@list'
              },
              'isContainedBy': {
                '@reverse': 'ex:contains',
                '@type': '@id'
              },
              'edge': {
                '@type': '@id',
                '@container':'@list',
                'InteractionGraph': {
                  '@type': '@id',
                  '@container':'@list'
                }
              },
              //*
              'InteractionGraph': {
                '@type': '@id',
                '@container':'@list'
              },
              /*
               * Defining this as shown below works. It ensures InteractionGraph is an array.
              'InteractionGraph': {
                '@type': '@id',
                '@container':'@list'
              },
              //*/
              /*
               * Defining this as shown below makes it so the members are not included. I don't know why.
              'InteractionGraph': {
                '@id': 'ex:InteractionGraph',
                '@type': '@id'
              },
              //*/
              'interactsWith': {
                '@id': 'ex:interactsWith',
                '@type': '@id',
              },
              'Interaction': {
                '@id': 'biopax:Interaction',
                '@type': '@id'
              },
              'Point': {
                '@id': 'gpml:Point',
                '@container': '@list'
              }
            };
            callback(null, pathway['@context']);
          },
          PublicationXref: function(callback){
            pathvisiojs.formatConverter.gpml.biopaxRef.getAllAsPvjson(gpmlSelection, function(publicationXrefs) {
              if (!!publicationXrefs) {
                pathway.PublicationXref = publicationXrefs;
                callback(null, 'BiopaxRefs are all converted.');
              }
              else {
                callback(null, 'No biopaxRefs to convert.');
              }
            });
          },
          DataSource: function(callback){
            var jsonDataSource = gpmlSelection.attr('Data-Source');
            if (!!jsonDataSource) {
              pathway.DataSource = jsonDataSource;
              callback(null, 'DataSource converted.');
            }
            else {
              callback(null, 'No DataSource to convert.');
            }
          },
          Version: function(callback){
            var jsonVersion = gpmlSelection.attr('Version');
            if (!!jsonVersion) {
              pathway.Version = jsonVersion;
              callback(null, 'Version converted.');
            }
            else {
              callback(null, 'No Version to convert.');
            }
          },
          Author: function(callback){
            var jsonAuthor = gpmlSelection.attr('Author');
            if (!!jsonAuthor) {
              pathway.Author = jsonAuthor;
              callback(null, 'Author converted.');
            }
            else {
              callback(null, 'No Author to convert.');
            }
          },
          Maintainer: function(callback){
            var jsonMaintainer = gpmlSelection.attr('Maintainer');
            if (!!jsonMaintainer) {
              pathway.Maintainer = jsonMaintainer;
              callback(null, 'Maintainer converted.');
            }
            else {
              callback(null, 'No Maintainer to convert.');
            }
          },
          Email: function(callback){
            var jsonEmail = gpmlSelection.attr('Email');
            if (!!jsonEmail) {
              pathway.Email = jsonEmail;
              callback(null, 'Email converted.');
            }
            else {
              callback(null, 'No Email to convert.');
            }
          },
          LastModified: function(callback){
            var jsonLastModified = gpmlSelection.attr('Last-Modified');
            if (!!jsonLastModified) {
              pathway.LastModified = jsonLastModified;
              callback(null, 'LastModified converted.');
            }
            else {
              callback(null, 'No LastModified to convert.');
            }
          },
          License: function(callback){
            var jsonLicense = gpmlSelection.attr('License');
            if (!!jsonLicense) {
              pathway.License = jsonLicense;
              callback(null, 'License converted.');
            }
            else {
              callback(null, 'No License to convert.');
            }
          },
          Name: function(callback){
            var jsonName = gpmlSelection.attr('Name');
            if (!!jsonName) {
              pathway.Name = jsonName;
              callback(null, 'Name converted.');
            }
            else {
              callback(null, 'No Name to convert.');
            }
          },
          Organism: function(callback){
            var jsonOrganism = gpmlSelection.attr('Organism');
            if (!!jsonOrganism) {
              pathway.Organism = jsonOrganism;
              callback(null, 'Organism converted.');
            }
            else {
              callback(null, 'No Organism to convert.');
            }
          },
          image: function(callback){
            pathway.image = {
              '@context': {
                '@vocab': 'http://schema.org/'
              },
              'width':parseFloat(gpmlSelection.select('Graphics').attr('BoardWidth')),
              'height':parseFloat(gpmlSelection.select('Graphics').attr('BoardHeight'))
            };
            callback(null, pathway.image);
          },
          Biopax: function(callback){
            var xmlBiopax = gpmlSelection.selectAll('Biopax');
            if (xmlBiopax[0].length > 0) {
              pathvisiojs.formatConverter.biopax.toPvjson(xmlBiopax, function(jsonBiopax) {
                pathway.Biopax = jsonBiopax;
              });
              callback(null, 'Biopax all converted.');
            }
            else {
              callback(null, 'No Biopax to convert.');
            }
          },
          DataNode: function(callback){
            var dataNodeSelection, dataNodesSelection = gpmlSelection.selectAll('DataNode');
            if (dataNodesSelection[0].length > 0) {
              //pathway.DataNode = [];
              dataNodesSelection.each(function() {
                dataNodeSelection = d3.select(this);
                pathvisiojs.formatConverter.gpml.dataNode.toPvjson(pathway, gpmlSelection, dataNodeSelection, function(pvjsonElements) {
                  /*
                  console.log('jsonDataNode');
                  console.log(jsonDataNode);
                  console.log('pvjsonElements');
                  console.log(pvjsonElements);
                  console.log('pvjsonText');
                  console.log(pvjsonText);
                  //*/
                  //pathway.DataNode.push(jsonDataNode);
                  //pathway.nodes = pathway.nodes.concat(jsonDataNode);
                  //pathway.elements = pathway.elements.concat(jsonDataNode);
                  pathway.elements = pathway.elements.concat(pvjsonElements);
                });
              });
              callback(null, 'DataNodes are all converted.');
            }
            else {
              callback(null, 'No dataNodes to convert.');
            }
          },
          Label: function(callback){
            var labelSelection, labelsSelection = gpmlSelection.selectAll('Label');
            if (labelsSelection[0].length > 0) {
              //pathway.Label = [];
              gpmlSelection.selectAll('Label').each(function() {
                labelSelection = d3.select(this);
                pathvisiojs.formatConverter.gpml.label.toPvjson(gpmlSelection, labelSelection, function(pvjsonElements) {
                  /*
                  console.log('jsonLabel');
                  console.log(jsonLabel);
                  console.log('pvjsonElements');
                  console.log(pvjsonElements);
                  console.log('pvjsonText');
                  console.log(pvjsonText);
                  //*/
                  //pathway.Label.push(jsonLabel);
                  //pathway.nodes = pathway.nodes.concat(jsonLabel);
                  //pathway.elements = pathway.elements.concat(jsonLabel);
                  pathway.elements = pathway.elements.concat(pvjsonElements);
                });
              });
              callback(null, 'Labels are all converted.');
            }
            else {
              callback(null, 'No labels to convert.');
            }
          },
          Shape: function(callback){
            var shapeSelection, shapesSelection = gpmlSelection.selectAll('Shape');
            if (shapesSelection[0].length > 0) {
              //pathway.Shape = [];
              gpmlSelection.selectAll('Shape').each(function() {
                shapeSelection = d3.select(this);
                pathvisiojs.formatConverter.gpml.shape.toPvjson(gpmlSelection, shapeSelection, function(pvjsonElements) {
                  //pathway.Shape.push(jsonShape);
                  //pathway.nodes = pathway.nodes.concat(jsonShape);
                  //pathway.elements = pathway.elements.concat(jsonShape);
                  pathway.elements = pathway.elements.concat(pvjsonElements);
                  /*
                  console.log('jsonShape');
                  console.log(jsonShape);
                  console.log('pvjsonElements');
                  console.log(pvjsonElements);
                  console.log('pvjsonText');
                  console.log(pvjsonText);
                  //*/
                });
              });
              callback(null, 'Shapes are all converted.');
            }
            else {
              callback(null, 'No shapes to convert.');
            }
          },
          /*
          Anchor: function(callback){
            var anchorSelection, anchorsSelection = gpmlSelection.selectAll('Anchor');
            if (anchorsSelection[0].length > 0) {
              pathway.anchors = [];
              anchorsSelection.each(function() {
                anchorSelection = d3.select(this);
                pathvisiojs.formatConverter.gpml.anchor.toPvjson(gpmlSelection, anchorSelection, function(pvjsonElements) {
                  pathway.anchors = pvjsonElements;
                  pathway.elements = pathway.elements.concat(pvjsonElements);
                });
              });
              callback(null, 'Anchors are all converted.');
            }
            else {
              callback(null, 'No anchors to convert.');
            }
          },
          //*/
          State: function(callback){
            var stateSelection, statesSelection = gpmlSelection.selectAll('State');
            if (statesSelection[0].length > 0) {
              pathway.states = [];
              statesSelection.each(function() {
                stateSelection = d3.select(this);
                pathvisiojs.formatConverter.gpml.state.toPvjson(gpmlSelection, stateSelection, function(pvjsonElements) {
                  /*
                  console.log('pvjsonElements');
                  console.log(pvjsonElements);
                  //*/
                  pathway.states = pvjsonElements;
                  pathway.elements = pathway.elements.concat(pvjsonElements);
                });
              });
              callback(null, 'States are all converted.');
            }
            else {
              callback(null, 'No states to convert.');
            }
          },
          //*
          GraphicalLine: function(callback){
            var graphicalLineSelection, graphicalLinesSelection = gpmlSelection.selectAll('GraphicalLine');
            if (graphicalLinesSelection[0].length > 0) {
              //pathway.GraphicalLine = [];
              gpmlSelection.selectAll('GraphicalLine').each(function() {
                graphicalLineSelection = d3.select(this);
                pathvisiojs.formatConverter.gpml.graphicalLine.toPvjson(gpml, graphicalLineSelection, function(pvjsonElements) {
                  //pathway.GraphicalLine.push(jsonGraphicalLine);
                  //pathway.edges = pathway.edges.concat(jsonGraphicalLine);
                  //pathway.elements = pathway.elements.concat(jsonGraphicalLine);
                  pathway.elements = pathway.elements.concat(pvjsonElements);
                  /*
                  console.log('jsonGraphicalLine');
                  console.log(jsonGraphicalLine);
                  console.log('pvjsonElements');
                  console.log(pvjsonElements);
                  //*/
                });
              });
              callback(null, 'GraphicalLines are all converted.');
            }
            else {
              callback(null, 'No graphicalLines to convert.');
            }
          },
          //*/
          Interaction: function(callback){
            var interactionSelection, interactionsSelection = gpmlSelection.selectAll('Interaction');
            if (interactionsSelection[0].length > 0) {
              //pathway.Interaction = [];
              gpmlSelection.selectAll('Interaction').each(function() {
                interactionSelection = d3.select(this);
                pathvisiojs.formatConverter.gpml.interaction.toPvjson(gpml, interactionSelection, function(pvjsonElements) {
                  //pathway.Interaction.push(jsonInteraction);
                  //pathway.edges = pathway.edges.concat(jsonInteraction);
                  //pathway.elements = pathway.elements.concat(jsonInteraction);
                  pathway.elements = pathway.elements.concat(pvjsonElements);
                  /*
                  console.log('pvjsonElements');
                  console.log(pvjsonElements);
                  //*/
                });
              });
              callback(null, 'Interactions are all converted.');
            }
            else {
              callback(null, 'No interactions to convert.');
            }
          }
      },
      function(err, results) {
        var contents,
          index,
          elementsBefore,
          elementsAfter,
          textElementsDescribingGroup,
          text;


        // Note: this calculates all the data for each group-node, except for its dimensions.
        // The dimenensions can only be calculated once all the rest of the elements have been
        // converted from GPML to JSON.
        var groupSelection, groupsSelection = gpmlSelection.selectAll('Group');
        if (groupsSelection[0].length > 0) {
          //pathway.Group = [];
          var groups = [];
          gpmlSelection.selectAll('Group').each(function() {
            groupSelection = d3.select(this);
            pathvisiojs.formatConverter.gpml.group.toPvjson(pathway.elements, gpmlSelection, groupSelection, function(pvjsonElements) {
              //pathway.Group.push(jsonGroup);
              //groups.push(pvjsonElements);
              //pathway.nodes = pathway.nodes.concat(jsonGroup);
              pathway.elements = pathway.elements.concat(pvjsonElements);
              /*
              console.log('pvjsonElements');
              console.log(pvjsonElements);
              console.log(pvjsonElements.id);
              //*/
            });
          });
        }
        pathway.elements.sort(function(a, b) {
          return a.zIndex - b.zIndex;
        });

        /*
        pathway.pathwayNestedByGrouping = d3.nest()
        .key(function(d) { return d.isContainedBy; })
        .entries(pathway.elements);
        //*/

        //self.myPathway = pathway;
        callbackOutside(pathway);
      });
    }
/*
      // Comments 

      try {
        if (pathway.hasOwnProperty('comment')) {
          pathway.comments = pathvisiojs.utilities.convertToArray( pathway.comment );
          delete pathway.comment;

          pathway.comments.forEach(function(element, index, array) {
            // modify data
          });
        }
        else {
          console.log('No element(s) named 'comment' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting comment to json: ' + e.message);
      }

      // Graphical Lines 

      try {
        if (pathway.hasOwnProperty('graphicalLine')) {
          var graphicalLines = pathvisiojs.utilities.convertToArray( pathway.graphicalLine );
          delete pathway.graphicalLine;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          }

          graphicalLines.forEach(function(element, index, array) {
            element.edgeType = 'graphical-line';
            pathway.edges.push(element);
          });
        }
        else {
          console.log('No element(s) named 'graphicalLine' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting graphicalLine to json: ' + e.message);
      }

      // Interactions

      try {
        if (pathway.hasOwnProperty('interaction')) {
          var interactions = pathvisiojs.utilities.convertToArray( pathway.interaction );
          delete pathway.interaction;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          }

          interactions.forEach(function(element, index, array) {
            element.edgeType = 'interaction';
            pathway.edges.push(element);
          });

          interactions;
          pathway.edges;
        }
        else {
          console.log('No element(s) named 'interaction' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting interaction to json: ' + e.message);
      }

      //*/
    }
    else {
      alert('Pathvisiojs does not support the data format provided. Please convert to GPML and retry.');
      throw new Error('Pathvisiojs does not support the data format provided. Please convert to GPML and retry.');
    }
  }
};

// TODO hack required because we call ...node.anchors.toPvjson() before we
// call the other ...node.toPvjson() methods
pathvisiojs.formatConverter.gpml.node = pathvisiojs.formatConverter.gpml.node || {};


pathvisiojs.formatConverter.gpml.graphics = {
  defaults: {
    'FontSize':{
      'Type':"FontSize",
      'Value':10
    }
  },

  toPvjson: function(gpmlSelection, elementSelection, pvjsonElement, callback) {
      var parentElement,
      attribute,
      i,
      graphics = elementSelection.select('Graphics')[0][0],
      gpmlDoubleLineProperty = '',
      pvjsonHeight,
      pvjsonWidth,
      pvjsonBorderWidth,
      gpmlShapeType = '',
      pvjsonShape,
      pvjsonZIndex,
      pvjsonTextAlign,
      pvjsonVerticalAlign,
      pvjsonRelY,
      pvjsonX,
      pvjsonY,
      model = this.model;

    var attributeDependencyOrder = [
      'LineStyle',
      'ShapeType',
      'FillColor',
      'Color',
      'LineThickness',
      'Width',
      'Height',
      'RelX',
      'RelY',
      'CenterX',
      'CenterY'
    ];

    var gpmlToPvjsonConverter = {
      LineStyle: function(gpmlLineStyleValue){
        var pvjsonStrokeDasharray;
        // TODO hard-coding these here is not the most maintainable
        if (gpmlLineStyleValue === 'Broken') {
          pvjsonStrokeDasharray = '5,3';
          pvjsonElement.strokeDasharray = pvjsonStrokeDasharray;
        }
        else if (gpmlLineStyleValue === 'Double') {
          gpmlDoubleLineProperty = '-double';
          // The line below is left here for future reference, but after discussing with AP, the desired behavior is for the entire shape to be filled. -AR
          //pvjsonElement.fillRule = 'evenodd';
        }
        return pvjsonStrokeDasharray;
      },
      ShapeType: function(gpmlShapeTypeValue){
        gpmlShapeType = gpmlShapeTypeValue;
        pvjsonShape = strcase.paramCase(gpmlShapeType) + gpmlDoubleLineProperty;
        pvjsonElement.shape = pvjsonShape;
        return pvjsonShape;
      },
      ConnectorType: function(gpmlConnectorTypeValue){
        var gpmlConnectorType = gpmlConnectorTypeValue;
        pvjsonShape = strcase.paramCase('line-' + gpmlConnectorType) + gpmlDoubleLineProperty;
        pvjsonElement.shape = pvjsonShape;
        return pvjsonShape;
      },
      FillColor: function(gpmlFillColorValue){
        var cssColor = gpmlColorToCssColor(gpmlFillColorValue);
        if (gpmlShapeType.toLowerCase() !== 'none') {
          pvjsonElement.backgroundColor = cssColor;
        }
        else {
          pvjsonElement.backgroundColor = 'transparent';
        }
      },
      FillOpacity: function(gpmlFillOpacityValue){
        var cssFillOpacity = parseFloat(gpmlFillOpacityValue);
        pvjsonElement.fillOpacity = cssFillOpacity;
      },
      Color: function(gpmlColorValue){
        var cssColor = gpmlColorToCssColor(gpmlColorValue);
        pvjsonElement.color = cssColor;
      },
      Padding: function(gpmlPaddingValue){
        var cssPadding;
        if (pathvisiojs.utilities.isNumber(gpmlPaddingValue)) {
          cssPadding = parseFloat(gpmlPaddingValue);
        }
        else {
          cssPadding = gpmlPaddingValue;
        }
        pvjsonElement.padding = cssPadding;
      },
      FontSize: function(gpmlFontSizeValue){
        var cssFontSize;
        if (pathvisiojs.utilities.isNumber(gpmlFontSizeValue)) {
          cssFontSize = parseFloat(gpmlFontSizeValue);
        }
        else {
          cssFontSize = gpmlFontSizeValue;
        }
        pvjsonElement.fontSize = cssFontSize;
      },
      FontName: function(gpmlFontNameValue){
        var cssFontFamily = gpmlFontNameValue;
        pvjsonElement.fontFamily = cssFontFamily;
      },
      FontStyle: function(gpmlFontStyleValue){
        var cssFontStyle = gpmlFontStyleValue.toLowerCase();
        pvjsonElement.fontStyle = cssFontStyle;
      },
      FontWeight: function(gpmlFontWeightValue){
        var cssFontWeight = gpmlFontWeightValue.toLowerCase();
        pvjsonElement.fontWeight = cssFontWeight;
      },
      Rotation: function(gpmlRotationValue) {
        // GPML can hold a rotation value for State elements in an element named "Attribute" like this:
        // Key="org.pathvisio.core.StateRotation"
        // From discussion with AP and KH, we've decided to ignore this value, because we don't actually want States to be rotated.
        gpmlRotationValue = parseFloat(gpmlRotationValue);
        var pvjsonRotation = gpmlRotationValue * 180/Math.PI; //converting from radians to degrees
        // TODO how do we want to store this value?
        pvjsonElement.rotation = pvjsonRotation;
        return pvjsonRotation;
      },
      LineThickness: function(gpmlLineThicknessValue) {
        pvjsonBorderWidth = parseFloat(gpmlLineThicknessValue);
        pvjsonElement.borderWidth = pvjsonBorderWidth;
        return pvjsonBorderWidth;
      },
      Position: function(gpmlPositionValue) {
        var pvjsonPosition = parseFloat(gpmlPositionValue);
        pvjsonElement.position = pvjsonPosition;
        return pvjsonPosition;
      },
      Width: function(gpmlWidthValue) {
        gpmlWidthValue = parseFloat(gpmlWidthValue);
        pvjsonWidth = gpmlWidthValue + pvjsonBorderWidth;
        pvjsonElement.width = pvjsonWidth;
        return pvjsonWidth;
      },
      Height: function(gpmlHeightValue) {
        gpmlHeightValue = parseFloat(gpmlHeightValue);
        pvjsonHeight = gpmlHeightValue + pvjsonBorderWidth;
        pvjsonElement.height = pvjsonHeight;
        return pvjsonHeight;
      },
      CenterX: function(gpmlCenterXValue) {
        gpmlCenterXValue = parseFloat(gpmlCenterXValue);
        pvjsonX = gpmlCenterXValue - pvjsonWidth/2;
        pvjsonElement.x = pvjsonX;
        return pvjsonX;
      },
      CenterY: function(gpmlCenterYValue) {
        gpmlCenterYValue = parseFloat(gpmlCenterYValue);
        pvjsonY = gpmlCenterYValue - pvjsonHeight/2;
        pvjsonElement.y = pvjsonY;
        return pvjsonY;
      },
      RelX: function(gpmlRelXValue) {
        var pvjsonRelX = parseFloat(gpmlRelXValue);
        pvjsonElement.relX = pvjsonRelX;
        parentElement = gpmlSelection.select('[GraphId=' + elementSelection.attr('GraphRef') + ']');
        var parentCenterX = parseFloat(parentElement.select('Graphics').attr('CenterX'));
        var parentWidth = parseFloat(parentElement.select('Graphics').attr('Width'));
        var parentZIndex = parseFloat(parentElement.select('Graphics').attr('ZOrder'));
        var gpmlCenterXValue = parentCenterX + gpmlRelXValue * parentWidth/2;
        pvjsonX = gpmlCenterXValue - pvjsonWidth/2;
        pvjsonElement.x = pvjsonX;
        pvjsonElement.zIndex = parentZIndex + 0.2;
        //pvjsonText.containerPadding = '0';
        //pvjsonText.fontSize = '10';
        return pvjsonX;
      },
      RelY: function(gpmlRelYValue) {
        var pvjsonRelY = parseFloat(gpmlRelYValue);
        pvjsonElement.relY = pvjsonRelY;
        var parentCenterY = parseFloat(parentElement.select('Graphics').attr('CenterY'));
        var parentHeight = parseFloat(parentElement.select('Graphics').attr('Height'));
        var elementCenterY = parentCenterY + pvjsonRelY * parentHeight/2;
        // TODO do we need to consider LineThickness (strokewidth) here?
        pvjsonY = elementCenterY - pvjsonHeight/2;
        pvjsonElement.y = pvjsonY;
        // TODO this and other elements here are hacks
        //pvjsonText.containerY = pvjsonY + 12;
        return pvjsonY;
      },
      Align: function(gpmlAlignValue) {
        pvjsonTextAlign = strcase.paramCase(gpmlAlignValue);
        pvjsonElement.textAlign = pvjsonTextAlign;
        return pvjsonTextAlign;
      },
      Valign: function(gpmlValignValue) {
        pvjsonVerticalAlign = strcase.paramCase(gpmlValignValue);
        pvjsonElement.verticalAlign = pvjsonVerticalAlign;
        return pvjsonVerticalAlign;
      },
      ZOrder: function(gpmlZOrderValue) {
        pvjsonZIndex = parseFloat(gpmlZOrderValue);
        pvjsonElement.zIndex = pvjsonZIndex;
        return pvjsonZIndex;
      }
    };

    var attributeName, attributeListItem, attributeListItemName, attributeList = [];
    if (!!graphics) {
      for (i = 0; i < graphics.attributes.length; i++) {
        attribute = graphics.attributes[i];
        attributeName = attribute.name;
        attributeListItem = {
          name: attributeName,
          value: attribute.value,
          dependencyOrder: attributeDependencyOrder.indexOf(attributeName),
        };
        attributeList.push(attributeListItem);
      }
      attributeList.sort(function(a, b) {
        return a.dependencyOrder - b.dependencyOrder;
      });
      attributeList.forEach(function(attributeListItem){
        attributeListItemName = attributeListItem.name;
        if (gpmlToPvjsonConverter.hasOwnProperty(attributeListItemName)) {
          gpmlToPvjsonConverter[attributeListItemName](attributeListItem.value);
        }
        else {
          console.warn('Pathvisiojs has no handler for attribute "' + attributeListItemName + '"');
          attributeListItemName = strcase.camelCase(attributeListItemName);
          pvjsonElement[attributeListItemName] = attributeListItem.value;
        }
      });
    }

    function gpmlColorToCssColor(gpmlColor) {
      var color;
      if (gpmlColor.toLowerCase() === 'transparent') {
        return 'transparent';
      }
      else {
        color = new RGBColor(gpmlColor);
        if (color.ok) {
          return color.toHex();
        }
        else {
          console.warn('Could not convert GPML Color value of "' + gpmlColor + '" to a valid CSS color. Using "#c0c0c0" as a fallback.');
          return '#c0c0c0';
        }
      }
    }
    callback(pvjsonElement);
  }
};


pathvisiojs.formatConverter.gpml.element = function(){
  // ...element includes all GPML elements and is the parent of both ...node and ...edge.
  'use strict';

  var gpmlColorToCssColor = function(gpmlColor, pathvisioDefault) {
    var color;
    if (gpmlColor !== pathvisioDefault) {
      if (!!gpmlColor) {
        color = new RGBColor(gpmlColor);
        if (color.ok) {
          return color.toHex();
        }
        else {
          return 'black';
        }
      }
      else {
        return 'black';
      }
    }
    else {
      return null;
    }
  };

  var setColorAsJson = function(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
    var jsonColor;
    if (currentGpmlColorValue !== defaultGpmlColorValue) {
      jsonColor = gpmlColorToCssColor(currentGpmlColorValue, defaultGpmlColorValue);
      jsonElement.color = jsonColor;
      jsonElement.borderColor = jsonColor;
      if (jsonElement.hasOwnProperty('text')) {
        jsonElement.text.color = jsonColor;
      }
    }
    return jsonElement;
  };

  // TODO can we delete this function?

  var getLineStyle = function(gpmlElement) {
    var LineStyle, attributes;
    var graphics = gpmlElement.select('Graphics');
    if (!!graphics) {
      LineStyle = graphics.attr('LineStyle');
      if (!!LineStyle) {
        return LineStyle;
      }
      else {

        // As currently specified, a given element can only have one LineStyle.
        // This one LineStyle can be solid, dashed (broken) or double.
        // If no value is specified in GPML for LineStyle, then we need to check
        // for whether the element has LineStyle of double.

        attributes = gpmlElement.selectAll('Attribute');
        if (attributes.length > 0) {
          LineStyle = attributes.filter(function(d, i) {
            return d3.select(this).attr('Key') === 'org.pathvisiojs.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
          });

          if (LineStyle[0].length > 0) {
            return 'double';
          }
          else {
            return null;
          }
        }
        else {
          return null;
        }
      }
    }
  };

  var getBorderStyle = function(gpmlLineStyle, pathvisioDefault) {

    // Double-lined EntityNodes will be handled by using a symbol with double lines.
    // Double-lined edges will be rendered as single-lined, solid edges, because we
    // shouldn't need double-lined edges other than for cell walls/membranes, which
    // should be symbols. Any double-lined edges are curation issues.

    var lineStyleToBorderStyleMapping = {
      'Solid':'solid',
      'Double':'solid',
      'Broken':'dashed'
    };
    var borderStyle;
    if (gpmlLineStyle !== pathvisioDefault) {
      if (!!gpmlLineStyle) {
        borderStyle = lineStyleToBorderStyleMapping[gpmlLineStyle];
        if (borderStyle) {
          return borderStyle;
        }
        else {
          console.warn('LineStyle "' + gpmlLineStyle + '" does not have a corresponding borderStyle. Using "solid"');
          return 'solid';
        }
      }
      else {
        return 'solid';
      }
    }
    else {

      // TODO use code to actually get the default

      return 'whatever the default value is';
    }
  };

  var setBorderStyleAsJson = function(jsonElement, currentGpmlLineStyleValue, defaultGpmlLineStyleValue) {
    var borderStyle;

    // this check happens twice because it doesn't make sense to have getBorderStyle() tell us
    // whether it has returned the default value, and we need to know whether we are using the
    // default here.

    if (currentGpmlLineStyleValue !== defaultGpmlLineStyleValue) {
      borderStyle = getBorderStyle(currentGpmlLineStyleValue, defaultGpmlLineStyleValue);
      jsonElement.borderStyle = borderStyle;
    }
    return jsonElement;
  };

  //*
  var toPvjson = function(gpmlSelection, elementSelection, pvjsonElement, callback) {
    var attribute,
      i,
      pvjsonHeight,
      pvjsonWidth,
      pvjsonStrokeWidth,
      gpmlShapeType,
      pvjsonShape,
      pvjsonZIndex,
      pvjsonRelX,
      pvjsonRelY,
      pvjsonX,
      pvjsonY,
      pvjsonTextContent,
      pvjsonHref;
    pvjsonElement.gpmlType = elementSelection[0][0].tagName;
    pvjsonElement.graphicalType = 'path';


    var attributeDependencyOrder = [
      'GraphId',
      'GraphRef',
      'IsContainedBy',
      'TextLabel',
      'Type',
      'CellularComponent'
    ];

    var gpmlToPvjsonConverter = {
      GraphId: function(gpmlGraphIdValue){
        // TODO this is a hack so we don't have two items with the same ID while I'm building out the code to create the flattened data structure
        pvjsonElement.id = gpmlGraphIdValue;
        return gpmlGraphIdValue;
      },
      Style: function(gpmlStyleValue){
        pvjsonElement.groupStyle = gpmlStyleValue;
        return gpmlStyleValue;
      },
      Href: function(gpmlHrefValue){
        pvjsonHref = encodeURI(he.decode(gpmlHrefValue));
        pvjsonElement.href = pvjsonHref;
        return pvjsonHref;
      },
      TextLabel: function(gpmlTextLabelValue){
        pvjsonTextContent = he.decode(gpmlTextLabelValue);
        pvjsonElement.textContent = pvjsonTextContent;
        return pvjsonTextContent;
      },
      Type: function(gpmlTypeValue){
        pvjsonElement.biologicalType = gpmlTypeValue;
        return gpmlTypeValue;
      },
      CellularComponent: function(gpmlCellularComponentValue){
        pvjsonElement.cellularComponent = gpmlCellularComponentValue;
        return gpmlCellularComponentValue;
      },
      IsContainedBy: function(gpmlIsContainedByValue){
        pvjsonElement.isContainedBy = gpmlIsContainedByValue;
        return gpmlIsContainedByValue;
      },
      GraphRef: function(gpmlGraphRefValue){
        pvjsonElement.isAttachedTo = gpmlGraphRefValue;
        return gpmlGraphRefValue;
      },
    };

    pathvisiojs.formatConverter.gpml.biopaxRef.getAllAsPvjson(elementSelection, function(publicationXrefs) {
      if (!!publicationXrefs) {
        pvjsonElement.publicationXrefs = publicationXrefs;
      }
      var attributeName, attributeListItem, attributeListItemName, attributeList = [];
      for (i = 0; i < elementSelection[0][0].attributes.length; i++) {
        attribute = elementSelection[0][0].attributes[i];
        attributeName = attribute.name;
        attributeListItem = {
          name: attributeName,
          value: attribute.value,
          dependencyOrder: attributeDependencyOrder.indexOf(attributeName),
        };
        attributeList.push(attributeListItem);
      }
      attributeList.sort(function(a, b) {
        return a.dependencyOrder - b.dependencyOrder;
      });
      attributeList.forEach(function(attributeListItem){
        attributeListItemName = attributeListItem.name;
        if (gpmlToPvjsonConverter.hasOwnProperty(attributeListItemName)) {
          gpmlToPvjsonConverter[attributeListItemName](attributeListItem.value);
        }
        else {
          console.warn('Pathvisiojs has no handler for attribute "' + attributeListItemName + '"');
          attributeListItemName = strcase.camelCase(attributeListItemName);
          pvjsonElement[attributeListItemName] = attributeListItem.value;
        }
      });
      callback(pvjsonElement);
    });
  };
  //*/

  return {
    toPvjson:toPvjson,
    gpmlColorToCssColor:gpmlColorToCssColor,
    setColorAsJson:setColorAsJson,
    getLineStyle:getLineStyle,
    getBorderStyle:getBorderStyle,
    setBorderStyleAsJson:setBorderStyleAsJson
  };
}();
  



pathvisiojs.formatConverter.gpml.text = function() {
  'use strict';

  var pathvisioDefaultStyleValues = {
    'text':{
      'Align':null,
      'Valign':'Middle',
      'FontStyle':null,
      'FontName':null
    }
  }

  function toPvjson(gpmlNode, inputDefaultValues, textCallbackOutside) {
    /*
    console.log('gpmlNode');
    console.log(gpmlNode[0][0]);
    console.log('inputDefaultValues');
    console.log(inputDefaultValues);
    console.log('textCallbackOutside');
    console.log(textCallbackOutside);
    //*/
    var thisPathvisioDefaultStyleValues = pathvisiojs.utilities.collect(pathvisioDefaultStyleValues.text, inputDefaultValues);
    var jsonText, textAlign, verticalAlign, fontStyle, fontWeight, fontSize, fontFamily,
      text = gpmlNode.attr('TextLabel');
    if (!!text) {
      jsonText = {};
      jsonText['id'] = ('id' + uuid.v4());
      jsonText.line = text.split(/\r\n|\r|\n|&#xA;/g);

      var graphics = gpmlNode.select('Graphics');
      var textAlign, fontStyle, fontWeight, fontSize, fontFamily;
      if (!!graphics[0][0]) {
        textAlign = gpmlNode.select('Graphics').attr('Align') || 'center';
        jsonText.textAlign = textAlign.toLowerCase();

        verticalAlign = gpmlNode.select('Graphics').attr('Valign') || 'middle';
        jsonText.verticalAlign = verticalAlign.toLowerCase();

        fontStyle = gpmlNode.select('Graphics').attr('FontStyle');
        if (fontStyle !== thisPathvisioDefaultStyleValues['FontStyle'] && !!fontStyle) {
          jsonText.fontStyle = fontStyle.toLowerCase();
        }

        fontWeight = gpmlNode.select('Graphics').attr('FontWeight');
        if (fontWeight !== thisPathvisioDefaultStyleValues['FontWeight'] && !!fontWeight) {
          jsonText.fontWeight = fontWeight.toLowerCase();
        }

        fontSize = gpmlNode.select('Graphics').attr('FontSize') || 10;
        if (parseFloat(fontSize) !== thisPathvisioDefaultStyleValues['FontSize'] && !!fontSize) {
          jsonText.fontSize = parseFloat(fontSize);
        }

        fontFamily = gpmlNode.select('Graphics').attr('FontName');
        if (fontFamily !== thisPathvisioDefaultStyleValues['FontName'] && !!fontFamily) {
          jsonText.fontFamily = fontFamily;
        }
      }
      textCallbackOutside(jsonText);
    }
    else {
      textCallbackOutside(null);
    }
  }

  return {
    toPvjson:toPvjson
  };
}();


// array of GPML xml namespaces in order from newest to oldest

pathvisiojs.formatConverter.gpml.namespaces = [
  "http://pathvisio.org/GPML/2013a",
  "http://genmapp.org/GPML/2010a",
  "http://genmapp.org/GPML/2008a",
  "http://genmapp.org/GPML/2007"
]


pathvisiojs.formatConverter.gpml.biopaxRef = function(){
  'use strict';

  function getAllAsPvjson(gpmlElement, callback) {
    var publicationXrefs, jsonPublicationXref, tagName = gpmlElement[0][0].tagName;
    var biopaxRefs = gpmlElement.selectAll(tagName + ' > BiopaxRef');
    if (biopaxRefs[0].length > 0) {
      publicationXrefs = [];
      biopaxRefs.each(function() {
        jsonPublicationXref = d3.select(this)[0][0].textContent;
        publicationXrefs.push(jsonPublicationXref);
      })
      callback(publicationXrefs);
    }
    else {
      callback(null);
    }
  }

  return {
    getAllAsPvjson:getAllAsPvjson
  };
}();


pathvisiojs.formatConverter.gpml.group = {
  getGroupDimensions: function(group, callback) {
    var dimensions = {};
    dimensions.topLeftCorner = {};
    dimensions.topLeftCorner.x = Infinity;
    dimensions.topLeftCorner.y = Infinity;
    dimensions.bottomRightCorner = {};
    dimensions.bottomRightCorner.x = 0;
    dimensions.bottomRightCorner.y = 0;
    // TODO what happens if this were set to '0.5em'?
    var padding = parseFloat(group.padding);
    var borderWidth = group.borderWidth;

    var groupContents = group.contains;
    groupContents = pathvisiojs.utilities.convertToArray(groupContents);

    dimensions.zIndex = Infinity;
    async.each(groupContents, function(groupContent, callbackInside) {
      if (!groupContent.hasOwnProperty('points')) {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.x + groupContent.width);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.y + groupContent.height);
      }
      else {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.points[0].x, groupContent.points[groupContent.points.length - 1].x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.points[0].y, groupContent.points[groupContent.points.length - 1].y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.points[0].x, groupContent.points[groupContent.points.length - 1].x);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.points[0].y, groupContent.points[groupContent.points.length - 1].y);
      }
      dimensions.x = dimensions.topLeftCorner.x - padding - borderWidth;
      dimensions.y = dimensions.topLeftCorner.y - padding - borderWidth;
      dimensions.width = (dimensions.bottomRightCorner.x - dimensions.topLeftCorner.x) + 2 * (padding + borderWidth);
      dimensions.height = (dimensions.bottomRightCorner.y - dimensions.topLeftCorner.y) + 2 * (padding + borderWidth);
      dimensions.zIndex = Math.min(dimensions.zIndex, groupContent.zIndex);
      callbackInside(null);
    },
    function (err) {
      dimensions.zIndex = dimensions.zIndex - 0.1;
      callback(dimensions);
    });
  },

  toPvjson: function(elementsPossiblyInGroup, gpmlSelection, groupSelection, callback) {
    var pvjsonPath = {},
      pvjsonElements = [],
      groupId,
      groupType,
      model = this.model;

    pvjsonPath.renderableType = 'GroupNode';
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = "GroupNode";

    groupType = groupSelection.attr('Style') || 'None';
    pvjsonPath.groupType = groupType;












    pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, groupSelection, pvjsonPath, function(pvjsonPath) {



      pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, groupSelection, pvjsonPath, function(pvjsonPath) {
          var contents = elementsPossiblyInGroup.filter(function(element){
            return element.isContainedBy === pvjsonPath.id;
          });
          if (contents.length > 0) {
            pvjsonPath.contains = contents;
            pathvisiojs.formatConverter.gpml.group.getGroupDimensions(pvjsonPath, function(dimensions){
              pvjsonPath.x = dimensions.x;
              pvjsonPath.y = dimensions.y;
              pvjsonPath.width = dimensions.width;
              pvjsonPath.height = dimensions.height;
              pvjsonPath.zIndex = dimensions.zIndex;
            });
            pvjsonElements.push(pvjsonPath);
          }
        callback(pvjsonElements);
      });
    });
  }
};



pathvisiojs.formatConverter.gpml.dataNode = function() {
  'use strict';

  var toPvjson = function(pathway, gpmlSelection, dataNodeSelection, callbackInside) {
    var pvjsonPath = {};
    var dataNodeType = dataNodeSelection.attr('Type');
    if (!dataNodeType) {
      dataNodeType = 'Unknown';
    }
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = 'DataNode';
    pvjsonPath.dataNodeType = dataNodeType;
    pvjsonPath['@type'] = pvjsonPath['@type'] || [];
    pvjsonPath['@type'].push('DataNode');
    pvjsonPath['@type'].push(dataNodeType);



    pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, dataNodeSelection, pvjsonPath, function(pvjsonPath) {
      pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, dataNodeSelection, pvjsonPath, function(pvjsonPath) {
        var database, id, datasourceReference,
          datasourceReferenceSelection = dataNodeSelection.select('Xref');
        if (!!datasourceReferenceSelection) {
          database = datasourceReferenceSelection.attr('Database');
          id = datasourceReferenceSelection.attr('ID');
          if (!!database && !!id) {
            datasourceReference = {};
            datasourceReference.database = database;
            datasourceReference.id = id;
            datasourceReference.organism = gpmlSelection.attr('Organism');
            pvjsonPath.datasourceReference = datasourceReference;
          }
        }

        var pvjsonElements = [pvjsonPath];
        callbackInside(pvjsonElements);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();


pathvisiojs.formatConverter.gpml.label = function(){
  'use strict';

  var toPvjson = function(gpmlSelection, labelSelection, callback) {
    var pvjsonPath = {};

    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = 'Label';

    pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath) {
      pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath) {
        var pvjsonElements = [pvjsonPath];
        callback(pvjsonElements);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();


pathvisiojs.formatConverter.gpml.shape = function(){
  'use strict';

  function toPvjson(gpmlSelection, shapeSelection, callback) {
    var pvjsonPath = {};
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = "Shape";

    pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath) {
      pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath) {
        var pvjsonElements = [pvjsonPath];
        callback(pvjsonElements);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();




pathvisiojs.formatConverter.gpml.state = function(){
  'use strict';

  var toPvjson = function(gpmlSelection, stateSelection, callback) {
    var pvjsonPath = {};
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = 'State';
    /*
    console.log('stateSelection');
    console.log(stateSelection[0][0]);
    console.log('pathwayIri');
    console.log(pathwayIri);
    console.log('callback');
    console.log(callback);
    //*/

        //*
        pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, stateSelection, pvjsonPath, function(pvjsonPath) {
          pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, stateSelection, pvjsonPath, function(pvjsonPath) {
            var pvjsonElements = [pvjsonPath];
            /*
            console.log('pvjsonPath inside');
            console.log(pvjsonPath);
            console.log('pvjsonText inside');
            console.log(pvjsonText);
            console.log('jsonDataNode inside');
            console.log(jsonDataNode);
            //*/
            callback(pvjsonElements);
          });
        });
        //*/
  };

  return {
    toPvjson:toPvjson
  };
}();


pathvisiojs.formatConverter.gpml.anchor = function() {
  'use strict';

  // anchors
  // see jsPlumb anchor model: http://jsplumbtoolkit.com/doc/anchors
  // TODO The documention below is out-of-date. See also pathvisiojs.formatConverter.gpml.point()
  // This model is not fully formed.
  // an anchor is an attachment point at which an edge can originate or terminate.
  // It has the following elements:
  // anchor = {
  //  id: unique value for this anchor
  //  isAttachedTo: reference to the pathway element to which the anchor is bound.
  //  position: percentage of the distance along the specified side of the element or the edge to which the anchor is bound.
  //    For nodes, if the side specified is right or left, the starting point is the topmost point on the side, and
  //    if the side specified is top or bottom, the starting point is the leftmost point on the side (smallest x or y value in SVG coordinate system).
  // }


  function toPvjson(gpmlSelection, gpmlEdgeSelection, pvjsonEdge, callback) {
    var anchor, anchorSelection, pvjsonAnchor, pvjsonAnchors = [], pvjsonX, pvjsonY, parentElement, pvjsonMarker, attachedPoint, pvjsonAnchorPosition, pvjsonAnchorWidth, pvjsonAnchorHeight;
    var points = pvjsonEdge.points;
    var pointCount = points.length;
    var firstPoint = points[0];
    var lastPoint = points[pointCount - 1];

    gpmlEdgeSelection.selectAll('Anchor').each(function(d, i) {
      anchor = this;
      anchorSelection = d3.select(this);
      pvjsonAnchor = {};
      pvjsonAnchor.gpmlType = 'Anchor';
      pvjsonAnchor.isAttachedTo = pvjsonEdge.id;
      pvjsonAnchor.zIndex = pvjsonEdge.zIndex + 0.1;
      pvjsonAnchor.networkType = 'node';

      pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, anchorSelection, pvjsonAnchor, function(pvjsonAnchor) {
        pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, anchorSelection, pvjsonAnchor, function(pvjsonAnchor) {
          attachedPoint = d3.select(gpmlSelection).select('Point[GraphRef=' + pvjsonAnchor.id + ']');
          pvjsonAnchorWidth = pvjsonAnchor.width;
          pvjsonAnchorHeight = pvjsonAnchor.height;
          if (!!attachedPoint[0][0]) {
            pvjsonAnchor.x = parseFloat(attachedPoint.attr('X')) - pvjsonAnchorWidth/2;
            pvjsonAnchor.y = parseFloat(attachedPoint.attr('Y')) - pvjsonAnchorHeight/2;
          }
          else {
            pvjsonAnchorPosition = pvjsonAnchor.position;
            pvjsonAnchor.x = firstPoint.x + pvjsonAnchorPosition * (lastPoint.x - firstPoint.x) - pvjsonAnchorWidth/2;
            pvjsonAnchor.y = firstPoint.y + pvjsonAnchorPosition * (lastPoint.y - firstPoint.y) - pvjsonAnchorHeight/2;
            console.warn('No cached X and Y data available for the Anchor for the edge element below. Assuming LineType of Straight for anchor position calculation.');
            console.log(gpmlEdgeSelection[0][0]);
          }
          pvjsonAnchors.push(pvjsonAnchor);
          });
        });
    });
    callback(pvjsonAnchors);
  }

  function getAllFromNode(jsonNode, callback) {
    self.jsonNode = jsonNode;
    var jsonAnchors = [];
    var parentId, renderableType, id, position, x, y, sideOffsetX, sideOffsetY, positionOffsetX, positionOffsetY;
    /*
    var elementSides = [
      {'side': 'top', 'initialEdgeDirection': 90}, 
      {'side': 'right', 'initialEdgeDirection': 0}, 
      {'side': 'bottom', 'initialEdgeDirection': 270}, 
      {'side': 'left', 'initialEdgeDirection': 180} 
    ];
    //*/
    var elementSides = [
      {'side': 'top', 'dx': 0, 'dy': -1},
      {'side': 'right', 'dx': 1, 'dy': 0},
      {'side': 'bottom', 'dx': 0, 'dy': 1},
      {'side': 'left', 'dx': -1, 'dy': 0}
    ];
    var anchorPositions = [0.25, 0.5, 0.75];

    parentId = jsonNode.id;
    renderableType = 'anchor';

    elementSides.forEach(function(element) {
      sideOffsetX = Math.max(element.dx, 0) * jsonNode.width;
      sideOffsetY = Math.max(element.dy, 0) * jsonNode.height;
      anchorPositions.forEach(function(position) {
        id = String(jsonNode.id) + String(element.side) + String(position);
        positionOffsetX = Math.abs(element.dy) * position * jsonNode.width;
        positionOffsetY = Math.abs(element.dx) * position * jsonNode.height;
        x = jsonNode.x + sideOffsetX + positionOffsetX;
        y = jsonNode.y + sideOffsetY + positionOffsetY;
        jsonAnchors.push({
          'parentId': jsonNode.id,
          'renderableType': 'anchor',
          'side': element.side,
          'dx': element.dx,
          'dy': element.dy,
          'id': id,
          'position': position,
          'x': x,
          'y': y
        });
      });
    });
    //callback(jsonAnchors);
    return jsonAnchors;
  }

  return {
    toPvjson:toPvjson,
    getAllFromNode:getAllFromNode
  };
}();


pathvisiojs.formatConverter.gpml.interaction = {
  // TODO do something with the linetype info to specify whether interaction is direct or indirect

  gpmlArrowHeadsToSemanticMappings: {
    'Arrow':'Activity',
    'ArrowArrow':'BidirectionalActivity',
    'TBar':'InhibitoryActivity',
    'mim-catalysis':'Catalysis',
    'mim-inhibition':'Inhibition',
    "mim-branching-left":"mim-branching-left",
    "mim-branching-right":"mim-branching-right",
    "mim-necessary-stimulation":"NecessaryStimulation",
    "mim-binding":"Binding",
    "mim-conversion":"Conversion",
    "mim-stimulation":"Stimulation",
    "mim-modification":"Modification",
    "mim-cleavage":"Cleavage",
    "mim-covalent-bond":"CovalentBond",
    "mim-transcription-translation":"TranscriptionTranslation",
    "mim-gap":"Gap",
    "Line":"Unspecified"
  },

  getGpmlArrowHeadNameFromSemanticName: function(semanticName) {
    for (var gpmlArrowHeadName in this.gpmlArrowHeadsToSemanticMappings) {
      if (this.gpmlArrowHeadsToSemanticMappings[gpmlArrowHeadName] === semanticName) {
        return gpmlArrowHeadName;
      }
    }

    if (!gpmlArrowHeadName) {
      gpmlArrowHeadName = semanticName;
      console.warn('No GPML ArrowHead name found for semantic name "' + semanticName + '". Returning original semantic name as GPML ArrowHead name. PathVisio-Java will delete this ArrowHead from the GPML file if it edits this file.');
    }
    return gpmlArrowHeadName;
  },

  getSemanticNameFromGpmlArrowHeadName: function(gpmlArrowHeadName) {
    var semanticName;
    if (!!gpmlArrowHeadName) {
      semanticName = this.gpmlArrowHeadsToSemanticMappings[gpmlArrowHeadName];
      if (!semanticName) {
        semanticName = gpmlArrowHeadName;
        console.warn('No semantic name found for GPML ArrowHead name "' + gpmlArrowHeadName + '". Returning original GPML ArrowHead name as semantic name.');
      }
    }
    else {
      semanticName = 'Unspecified';
    }

    return semanticName;
  },

  toPvjson: function(gpmlSelection, interactionSelection, callback) {
    var model = this.model;
    var interactionInstance = this;

    var jsonAnchorInteraction, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId, groupRef, source, sourceId, pvjsonElements;
    //pathvisiojs.formatConverter.gpml.edge.toPvjson(interactionSelection, function(jsonInteraction) {
      //console.log('jsonInteraction');
      //console.log(jsonInteraction);

      /*
      jsonInteraction['@type'].push('Interaction');
      jsonInteraction.renderableType = 'Interaction';

      points = interactionSelection.selectAll('Point');

      var database, ID,
      datasourceReference = interactionSelection.select('Xref');
      if (!!datasourceReference) {
        database = datasourceReference.attr('Database');
        ID = datasourceReference.attr('ID');
        if (!!database && !!ID) {
          jsonInteraction.DatasourceReference = {};
          jsonInteraction.DatasourceReference.Database = database;
          jsonInteraction.DatasourceReference.ID = ID;
        }
      }
      //*/

      /*
      function buildInteractionGraph(sourceSelection, targetSelection, callbackBIG) {
        var InteractionGraphMember = {};
        jsonInteraction.InteractionGraph = jsonInteraction.InteractionGraph || [];

        sourceId = sourceSelection.getAttribute('GraphRef');
        if (!!sourceId) {
          source = gpmlSelection.querySelector('[GraphId=' + sourceId + ']');
          if (source.tagName === 'Anchor') {
            sourceId = source.parentNode.parentNode.getAttribute('GraphId');
          }
          else {
            if (source.tagName === 'Group') {
              sourceId = source.getAttribute('GroupId');
            }
          }
        }
        InteractionGraphMember.id = sourceId || 'no-source';

        targetId = targetSelection.getAttribute('GraphRef');
        if (!!targetId) {
          target = gpmlSelection.querySelector('[GraphId=' + targetId + ']');
          if (target.tagName === 'Anchor') {
            targetId = target.parentNode.parentNode.getAttribute('GraphId');
          }
          else {
            if (target.tagName === 'Group') {
              targetId = target.getAttribute('GroupId');
            }
          }
          InteractionGraphMember.interactsWith = targetId;
        }
        jsonInteraction.InteractionGraph.push(InteractionGraphMember);
        // TODO add the reaction, if it exists
        //'ex:Anchor': pathwayIri + '#Reaction1'

        callbackBIG(InteractionGraphMember);
      }
      //*/

      /*
      var firstPoint = points[0][0];
      var firstGpmlArrowHeadName = firstPoint.getAttribute('ArrowHead');

      var lastPoint = points[0][points[0].length - 1];
      var lastGpmlArrowHeadName = lastPoint.getAttribute('ArrowHead');

      if (!!firstGpmlArrowHeadName && !!lastGpmlArrowHeadName) {
        interactionType = getSemanticNameFromGpmlArrowHeadName(firstPoint.getAttribute('ArrowHead') + lastPoint.getAttribute('ArrowHead'));

        // function below has inputs lastPoint, firstPoint because it
        // corresponds to the marker type for the first point
        buildInteractionGraph(lastPoint, firstPoint, function(InteractionGraphMember) {
        });
        // TODO figure out the best way to handle bidirectional interactions, etc.
        // Should arrowheads on both ends of a single graphical Interaction represent two semantic Interactions?
        buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember) {
        });
      }
      else {
        if (!!firstGpmlArrowHeadName || !!lastGpmlArrowHeadName) {
          if (!!firstGpmlArrowHeadName) {
            buildInteractionGraph(lastPoint, firstPoint, function(InteractionGraphMember) {
            });
            interactionType = getSemanticNameFromGpmlArrowHeadName(firstPoint.getAttribute('ArrowHead'));
          }

          if (!!lastGpmlArrowHeadName) {
            interactionType = getSemanticNameFromGpmlArrowHeadName(lastPoint.getAttribute('ArrowHead'));
            buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember) {
            });
          }
        }
        else {
          lastPoint.setAttribute('ArrowHead', 'Line');
          interactionType = getSemanticNameFromGpmlArrowHeadName(lastPoint.getAttribute('ArrowHead'));
          buildInteractionGraph(firstPoint, lastPoint, function(InteractionGraphMember) {
          });
        }
      }

      if (!!interactionType) {
        jsonInteraction['@type'].push(interactionType);
        jsonInteraction.interactionType = strcase.paramCase(interactionType);
      }
      else {
        jsonInteraction['@type'].push('unspecified');
        jsonInteraction.interactionType = 'unspecified';
        console.warn('Interaction Type unable to be determined. Setting it to "unspecified."');
      }
      //*/

      // TODO this is a temporary solution.
      // In the future, we will want to update the view code such that we specify at render time
      // the marker(s) and line type (and possibly other attributes) based on the interactionType.
      /*
      if (firstGpmlArrowHeadName) {
        jsonInteraction.markerStart = strcase.paramCase(firstGpmlArrowHeadName);
      }
      else {
        jsonInteraction.markerStart = 'none';
      }

      if (lastGpmlArrowHeadName) {
        jsonInteraction.markerEnd = strcase.paramCase(lastGpmlArrowHeadName);
      }
      else {
        jsonInteraction.markerEnd = 'none';
      }
      //*/

      var pvjsonPath = {};
      pvjsonPath.networkType = 'edge';
      pvjsonPath.gpmlType = 'Interaction';
      pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, interactionSelection, pvjsonPath, function(pvjsonPath) {
        pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, interactionSelection, pvjsonPath, function(pvjsonPath) {
          pathvisiojs.formatConverter.gpml.point.toPvjson(gpmlSelection, interactionSelection, pvjsonPath, function(pvjsonPath) {
            pathvisiojs.formatConverter.gpml.anchor.toPvjson(gpmlSelection, interactionSelection, pvjsonPath, function(pvjsonAnchor) {
              pvjsonElements = [pvjsonPath].concat(pvjsonAnchor);
              callback(pvjsonElements);
            });
          });
        });
      });
    //});
  }
};


pathvisiojs.formatConverter.gpml.graphicalLine = function(){
  'use strict';

  //*
  //var pvjsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'arrow'
  };
  //*/

  function toPvjson(gpmlSelection, graphicalLineSelection, callback) {
    var jsonAnchorGraphicalLine,
      anchor,
      jsonAnchor,
      points,
      jsonPoints,
      graphicalLineType,
      target,
      targetId,
      groupRef,
      source,
      sourceId,
      pvjsonElements,
      pvjsonPath = {};

    pvjsonPath.networkType = 'edge';
    pathvisiojs.formatConverter.gpml.element.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonPath) {
      pathvisiojs.formatConverter.gpml.graphics.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonPath) {
        pathvisiojs.formatConverter.gpml.point.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonPath) {
          pathvisiojs.formatConverter.gpml.anchor.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonAnchor) {

            pvjsonElements = [pvjsonPath].concat(pvjsonAnchor);
            callback(pvjsonElements);
          });
        });
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();


pathvisiojs.formatConverter.gpml.point = function(){
  'use strict';

  var getPvjsonPositionAndOrientationMapping = function(relValue, identifier, gpmlSelection, pvjsonIsAttachedTo) {
    var result = {}, position, elementAttachedTo, elementAttachedToDimension;
    var relToUpperLeftCorner = (relValue + 1) / 2;
    if (relToUpperLeftCorner < 0 || relToUpperLeftCorner > 1) {
      elementAttachedTo = d3.select(gpmlSelection).select('*[GraphId=' + pvjsonIsAttachedTo + ']');
      if (identifier === 'RelX') {
        elementAttachedToDimension = elementAttachedTo.attr('Width');
      }
      else {
        elementAttachedToDimension = elementAttachedTo.attr('Height');
      }
      if (relToUpperLeftCorner < 0) {
        position = 0;
        result.offset = relToUpperLeftCorner * elementAttachedToDimension;
      }
      else {
        position = 1;
        result.offset = (relToUpperLeftCorner - 1) * elementAttachedToDimension;
      }
    }
    else {
      position = relToUpperLeftCorner;
    }

    if (position === 0) {
      result.orientation = -1;
    }
    else if (position === 1) {
      result.orientation = 1;
    }
    else {
      result.orientation = 0;
    }

    result.position = position;
    return result;
  };

  function toPvjson(gpmlSelection, gpmlEdgeSelection, pvjsonEdge, callback) {
    var point, gpmlPointSelection, gpmlPoint, pvjsonPoint, pvjsonPoints, gpmlPoints = [], pvjsonX, pvjsonY, parentElement, pvjsonMarker, pvjsonIsAttachedTo;

    gpmlEdgeSelection.selectAll('Point').each(function(d, i) {
      point = this;
      gpmlPointSelection = d3.select(this);
      gpmlPoint = {};

      var attributeDependencyOrder = [
        'GraphRef',
        'RelX',
        'RelY',
        'X',
        'Y'
      ];

      var gpmlToPvjsonConverter = {
        X: function(gpmlXValue) {
          pvjsonX = parseFloat(gpmlXValue);
          gpmlPoint.x = pvjsonX;
          return pvjsonX;
        },
        Y: function(gpmlYValue) {
          pvjsonY = parseFloat(gpmlYValue);
          gpmlPoint.y = pvjsonY;
          return pvjsonY;
        },
        RelX: function(gpmlRelXValue) {
          // see jsPlumb anchor model: http://jsplumbtoolkit.com/doc/anchors
          // anchor:[ 0.5, 1, 0, 1 ]
          var gpmlRelXValueString = gpmlRelXValue.toString();
          var gpmlRelXValueInteger = parseFloat(gpmlRelXValue);
          gpmlPoint.RelX = gpmlRelXValueInteger;
          var pvjsonPositionAndOrientationX = getPvjsonPositionAndOrientationMapping(gpmlRelXValueInteger, 'RelX', gpmlSelection, pvjsonIsAttachedTo);
          gpmlPoint.anchor = gpmlPoint.anchor || [];
          gpmlPoint.anchor[0] = pvjsonPositionAndOrientationX.position;
          gpmlPoint.anchor[2] = pvjsonPositionAndOrientationX.orientation;
          if (!!pvjsonPositionAndOrientationX.offset) {
            gpmlPoint.anchor[4] = pvjsonPositionAndOrientationX.offset;
          }
          gpmlPoint.anchor[2] = pvjsonPositionAndOrientationX.orientation;
          return gpmlRelXValueInteger;
        },
        RelY: function(gpmlRelYValue) {
          var gpmlRelYValueString = gpmlRelYValue.toString();
          var gpmlRelYValueInteger = parseFloat(gpmlRelYValue);
          gpmlPoint.RelY = gpmlRelYValueInteger;
          var pvjsonPositionAndOrientationY = getPvjsonPositionAndOrientationMapping(gpmlRelYValueInteger, 'RelY', gpmlSelection, pvjsonIsAttachedTo);
          gpmlPoint.anchor = gpmlPoint.anchor || [];
          gpmlPoint.anchor[1] = pvjsonPositionAndOrientationY.position;
          gpmlPoint.anchor[3] = pvjsonPositionAndOrientationY.orientation;
          if (!!pvjsonPositionAndOrientationY.offset) {
            gpmlPoint.anchor[5] = pvjsonPositionAndOrientationY.offset;
          }
          return gpmlRelYValueInteger;
        },
        GraphRef: function(gpmlGraphRefValue){
          pvjsonIsAttachedTo = gpmlGraphRefValue;
          gpmlPoint.isAttachedTo = gpmlGraphRefValue;
          return gpmlGraphRefValue;
        },
        ArrowHead: function(gpmlArrowHeadValue) {
          pvjsonMarker = strcase.camelCase(gpmlArrowHeadValue);
          if (i===0) {
            pvjsonEdge.markerStart = pvjsonMarker;
          }
          else {
            pvjsonEdge.markerEnd = pvjsonMarker;
          }
          return pvjsonMarker;
        }
      };

      var attribute, attributeName, attributeListItem, attributeListItemName, attributeList = [];
      for (var attributeIndex = 0; attributeIndex < point.attributes.length; attributeIndex++) {
        attribute = point.attributes[attributeIndex];
        attributeName = attribute.name;
        attributeListItem = {
          name: attributeName,
          value: attribute.value,
          dependencyOrder: attributeDependencyOrder.indexOf(attributeName),
        };
        attributeList.push(attributeListItem);
      }
      attributeList.sort(function(a, b) {
        return a.dependencyOrder - b.dependencyOrder;
      });
      attributeList.forEach(function(attributeListItem){
        attributeListItemName = attributeListItem.name;
        if (gpmlToPvjsonConverter.hasOwnProperty(attributeListItemName)) {
          gpmlToPvjsonConverter[attributeListItemName](attributeListItem.value);
        }
        else {
          console.warn('Pathvisiojs has no handler for attribute "' + attributeListItemName + '"');
          attributeListItemName = strcase.camelCase(attributeListItemName);
          pvjsonEdge[attributeListItemName] = attributeListItem.value;
        }
      });

      gpmlPoints.push(gpmlPoint);
    });

    var type = gpmlEdgeSelection.select('Graphics').attr('ConnectorType');

    var gpmlToD3InterpolationMapping = {
      Straight: 'linear',
      Segmented: 'linear',
      Elbow: 'linear',
      Curved: 'basis'
    };

    if (type === 'Straight'){
      if (gpmlPoints.length < 2) {
        console.warn("Too many points for a straight line!");
      }
      pvjsonPoints = gpmlPoints;
    }
    else if (type === 'Segmented'){
      pvjsonPoints = gpmlPoints;
    }
    else if (type === 'Elbow'){
      pvjsonPoints = calcPathpoints(gpmlPoints);
    }
    else if (type === 'Curved'){
      pvjsonPoints = calcPathpoints(gpmlPoints);
    }
    else {
      console.warn("Unknown connector type: " + type);
    }
    pvjsonEdge.points = pvjsonPoints;
    callback(pvjsonEdge);
  }

  function calcPathpoints(p){
    //check to see if all waypoints are provided
    if (p.length == 2) {
      p = calcAllWaypoints(p);
    }

    var ppts = [];

    //first path point is start
    ppts[0] = p[0];

    //intermediate path points
    var axis = getAxis(p[0]); //TODO: account for starting on an anchor..
    var i;
    for (i=1; i<p.length; i++){
      var dy = p[i].y - p[i-1].y;
      var dx = p[i].x - p[i-1].x;

      if (axis == 1){ //Vertical
        ppts[i] = {x:p[i-1].x,y:p[i-1].y+dy};
      } else { //Horizontal
        ppts[i] = {x:p[i-1].x+dx,y:p[i-1].y};
      }
      axis = (axis+1)%2;  //toggle 1|0
    }

    // final path point is end
    ppts[p.length] = p[p.length-1];

    return ppts;
  }

  function calcAllWaypoints(p) {
    var wptCount = getNumWaypoints(p);
    var offset = 20;
    var start = p[0];
    var end = p[1];

    var wpts = [];

    // first waypoint is start
    wpts[0] = start;

    // calc new waypoints	
    if (wptCount === 0) {
      //done!
    }
    else if (wptCount == 1) {
      wpts[1] = calcWaypoint(start, end, getAxis(start), getDir(end));
    } else if (wptCount == 2){
      wpts[1] = calcWaypoint(start, {x:(end.x + offset * getDir(end)), y:(end.y + offset * getDir(end))}, getAxis(start), getDir(start));
      wpts[2] = calcWaypoint(end, wpts[1], getAxis(end), getDir(end));
    } else if (wptCount == 3){
      wpts[2] = {x:(start.x + (end.x - start.x)/2), y:(start.y + (end.y - start.y)/2)};
      wpts[1] = calcWaypoint(start, wpts[2], getAxis(start), getDir(start));
      wpts[3] = calcWaypoint(end, wpts[2], getAxis(end), getDir(end));
    } else {
      console.log("Too many waypoint estimated!!!");
    }

    // final waypoint is end
    wpts[wptCount+1] = end;

    //console.log(wptCount);
    //console.log(wpts);

    return wpts;
  }

  function calcWaypoint(start, end, axis, dir){
    var offset = 20;
    var x = 0;
    var y = 0;
    if (axis === 1){ //Vertical
      x = start.x + (end.x - start.x)/2;
      y = start.y + offset * dir;
    } else {  //Horizontal
      x = start.x + offset * dir;
      y = start.y + (end.y - start.y)/2;
    }
    return {x:x, y:y};
  }

  function getNumWaypoints(pts){
    var start = pts[0];
    var end = pts[1];

    var leftToRight = sign(end.x - start.x) > 0;
    var left = leftToRight ? start : end;
    var right = leftToRight ? end : start;

    var leftIsBottom = sign(left.y - right.y) < 0;
    var z = leftIsBottom ? 1 : 0;
    var x = leftToRight ? getSide(start) : getSide(end);
    var y = leftToRight ? getSide(end) : getSide(start);

    var wptMatrix = [
      [
      [ 1, 1 ],
      [ 2, 2 ],
      [ 1, 3 ],
      [ 0, 2 ]
    ],
    [
      [ 2, 0 ],
      [ 1, 1 ],
      [ 0, 2 ],
      [ 1, 1 ],
    ],
    [
      [ 3, 1 ],
      [ 2, 2 ],
      [ 1, 1 ],
      [ 2, 0 ],
    ],
    [
      [ 2, 2 ],
      [ 3, 3 ],
      [ 2, 2 ],
      [ 1, 1 ],
    ]
    ];

    return wptMatrix[x][y][z];
  }

  function sign(x) {
    return x ? x < 0 ? -1 : 1 : 0; //caution: sign("0") -> 1 
  }

  function getSide(p){
    if(Math.abs(p.RelX) > Math.abs(p.RelY)) {
      if(p.RelX > 0) {
        return 1; //East
      } else {
        return 3; //West
      }
    } else {
      if(p.RelY > 0) {
        return 2; //South
      } else {
        return 0; //North
      }
    }
  }

  function getAxis(p) {
    if (Math.abs(p.RelX) > Math.abs(p.RelY)){
      return 0; // Y-Axis; Vertical
    } else {
      return 1; // X-Axis; Horzontal
    }
  }

  function getDir(p){
    if(Math.abs(p.RelX) > Math.abs(p.RelY)) {
      if(p.RelX > 0) {
        return 1; //Right
      } else {
        return -1; //Left
      }
    } else {
      if(p.RelY > 0) {
        return 1; //Down
      } else {
        return -1; //Up
      }
    }
  }

  return {
    toPvjson:toPvjson
  };
}();


pathvisiojs.renderer = function(){
  'use strict';

  // currently just using Gecko (Firefox) list of supported image formats for the HTML img tag:
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img
  // TODO decide what to do if the user specifies an SVG image as a dataSource element

  // the viewMethods are sorted in order of preference - viewMethod with lower index will be used if more than one is returned.
  var sourceDataFileTypeToViewMethodMappings = {
    gpml:[
      'svg' //in the future, could add canvas support
    ],
    biopax:[ //biopax is not currently supported
      'svg' //in the future, could add canvas support
    ],
    pdf:[
      'pdf' //not supported now. this would be future. we might use pdf.js or we could just try using an embed or object tag.
    ],
    png:[
      'img'
    ],
    jpg:[
      'img'
    ],
    jpeg:[
      'img'
    ],
    jpe:[
      'img'
    ],
    jif:[
      'img'
    ],
    jfif:[
      'img'
    ],
    jfi:[
      'img'
    ],
    gif:[
      'img'
    ],
    ico:[
      'img'
    ],
    bmp:[
      'img'
    ],
    dib:[
      'img'
    ]
  };

  function getFirstRenderableSourceDataElement(sourceData) {
    var sourceDataElement, viewMethodsForSourceDataFileType, supportedViewMethodsForSourceDataFileType,
      results = {},
      supportedViewMethods = getSupportedViewMethods();

    var i = 0;
    do {
      sourceDataElement = sourceData[i];
      viewMethodsForSourceDataFileType = sourceDataFileTypeToViewMethodMappings[sourceDataElement.fileType];
      supportedViewMethodsForSourceDataFileType = pathvisiojs.utilities.intersect(viewMethodsForSourceDataFileType, supportedViewMethods);
      i += 1;
    } while ((supportedViewMethodsForSourceDataFileType.length < 1) && (i < sourceData.length + 1));

    sourceDataElement.selectedViewMethod = supportedViewMethodsForSourceDataFileType[0];
    return sourceDataElement;
  }

  //function getImageFormatByDataSourceFileType(fileType) {
  //this is testing the browser the user is currently using 
  function getSupportedViewMethods() {
    //making an assumption that all browsers we care about support the HTML img tag

    var supportedViewMethods = ['img'];

    // TODO support svg that is not inline in the svg viewMethod
    // The IE9 detection is a temporary hack. It is used because IE9 cannot currently convert GPML to pvjson,
    // so it cannot display the resulting SVG.
    // TODO get gpml to pvjson conversion working with IE9
    if (Modernizr.inlinesvg) {
    //if (Modernizr.inlinesvg && (!pathvisiojs.utilities.isIE())) {
    //if (Modernizr.inlinesvg && (pathvisiojs.utilities.isIE() !== 9)) {
      supportedViewMethods.push('svg');
    }
    
    return supportedViewMethods;
  }

  function loadHtmlTemplate(userSpecifiedContainer, callback) {
    userSpecifiedContainer.html(pathvisioNS['src/pathvisiojs.html']);
    var diagramContainer = userSpecifiedContainer.select('#diagram-container');
    callback(diagramContainer);
  }

  function load(args) {
    // this function gets a reference to a GPML file and draws a visual representation of the pathway
    // TODO Much of the SVG creation code should be moved to ./svg/svg.js so we just call
    // pathvisiojs.renderer.svg.load() in the same way as we do for
    // pathvisiojs.renderer.img.load()

    // ********************************************
    // Check for minimum required set of parameters
    // ********************************************

    var userSpecifiedContainerSelector = args.container,
      sourceData = args.sourceData,
      fitToContainer = args.fitToContainer,
      cssUri = args.cssUri,
      customMarkers = args.customMarkers,
      //customSymbols = args.customSymbols,
      highlights = args.highlights,
      viewport,
      hiddenElements = args.hiddenElements,
      userSpecifiedContainer, // the element matching the user-specified selector. the user specified selector is the parameter "container" in the pathvisiojs.load() method.
      pathvisioJsContainer,
      diagramContainer,
      renderableSourceDataElement;

    if (!sourceData[0].uri) {
      throw new Error('No sourceData uri specified.');
    }

    if (!userSpecifiedContainerSelector) {
      throw new Error('No container selector specified as container for pathvisiojs.');
    }

    userSpecifiedContainer = d3.select(userSpecifiedContainerSelector);
    if (userSpecifiedContainer.length !== 1) {
      throw new Error('Container selector must be matched by exactly one element.');
    }

    // waterfall means that each function completes in order, passing its result to the next
    async.waterfall([
      function(callback){ // this could be in parallel
        // ********************************************
        // Load HTML template
        // ********************************************
        var htmlTemplate = loadHtmlTemplate(userSpecifiedContainer, function(thisPathwayContainer) {
          diagramContainer = thisPathwayContainer;
          callback(null);
        });
      },
      function(callback){
        // ********************************************
        // Add loading gif
        // ********************************************
        var diagramLoadingIconUri = pathvisiojs.config.diagramLoadingIconUri;
        var img = diagramContainer.append('img')
        .attr('id', 'loading-icon')
        .attr('src', diagramLoadingIconUri)
        .attr('width', 50);

        // ********************************************
        // Get desired dimensions for pathway diagram
        // ********************************************
        renderableSourceDataElement = getFirstRenderableSourceDataElement(sourceData);

        // ********************************************
        // Get desired dimensions for pathway diagram
        // ********************************************
        var boundingClientRect = userSpecifiedContainer[0][0].getBoundingClientRect();
        var containerWidth = boundingClientRect.width - 3; //account for space for pan/zoom controls,
        var containerHeight = boundingClientRect.height - 3; //account for space for search field;

        callback(null, containerWidth, containerHeight, renderableSourceDataElement);
      },
      function(containerWidth, containerHeight, renderableSourceDataElement, callback){
        var svg, pathway,
        loadDiagramArgs = {};
        loadDiagramArgs.container = diagramContainer;
        loadDiagramArgs.renderableSourceDataElement = renderableSourceDataElement;
        loadDiagramArgs.containerWidth = containerWidth;
        loadDiagramArgs.containerHeight = containerHeight;
        loadDiagramArgs.fitToContainer = fitToContainer;
        loadDiagramArgs.highlights = highlights;

        if (renderableSourceDataElement.selectedViewMethod !== 'img') {
          pathvisiojs.formatConverter.pvjson.get(renderableSourceDataElement, function(json) {
            pathvisiojs.context = json['@context'];

            if (!json || json === 'fail') {
              callback(null);
              throw new Error("Could not convert input source data to pathvisioJsJson.");
            }

            pathway = json;
            self.myPathway = json;
            var crossPlatformShapesInstance1 = Object.create(crossPlatformShapes);
            crossPlatformShapesInstance1.init({
              targetSelector:'#diagram-container',
              id: 'my-svg2',
              format: renderableSourceDataElement.selectedViewMethod,
              width:containerWidth,
              height:containerHeight,
              backgroundColor: 'white',
              customShapes: { // optional
                golgiApparatus:{
                  href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0iZ29sZ2ktYXBwYXJhdHVzIgoJdmVyc2lvbj0iMS4xIgoJYmFzZVByb2ZpbGU9ImZ1bGwiCgl4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCgl4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKCXhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiCgl3aWR0aD0iOTAiCgloZWlnaHQ9IjE1MCIKCXZpZXdCb3g9IjAgMCA5MCAxNTAiCglwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIgoJc3R5bGU9ImZpbGw6dHJhbnNwYXJlbnQ7IHN0cm9rZTpsaWdodGdyYXk7IHN0cm9rZS13aWR0aDozIj4KCgoJLyo8Y2xpcFBhdGggaWQ9ImdvbGdpLWFwcGFyYXR1cy1jbGlwLXBhdGgxIj4KCTxwYXRoIGQ9Im01OC40NjcxNCwyNy43MTMzMjdjLTIyLjIwNTM0NSwtMjkuOTAwNzkgMzcuMzEwMDY2LC0zMC4yNTgzNTYgMjUuNTY3MjQ1LC00LjgyMzQ0NmMtOC44MDc2NTUsMTguNTgxMjM4IC0xNy4wNjY0MjksNTguMTM1MjM1IC0wLjk0MTY3Myw5OS4yMjA0NGMxMy4zMTQ2OSwyNy4wNjY2OTYgLTQxLjc0ODQ2MywyNy43NjA5MjUgLTI3Ljc1NTU1NCwtMS40Njk4NDljMTEuMzQ1ODI1LC0yOS40MjAyNDIgMTAuMjg2ODU4LC04MC4zMzY0MjIgMy4xMjk5ODIsLTkyLjkyNzE0NXoiIC8+CiAgIAk8L2NsaXBQYXRoPiAKCQoJPGNsaXBQYXRoIGlkPSJnb2xnaS1hcHBhcmF0dXMtY2xpcC1wYXRoMiI+CiAgIAk8cGF0aCBkPSJtMzEuMjE0MzcxLDM2LjIxNDM2M2MtMTAuNzkxNzEyLC0yMS40Mjc5MDMgMjkuODk3NTk4LC0xOS44NDgxNjQgMTguNDA3NTAxLDAuNjcwODk1Yy00LjA2NjkzMyw3LjQyMjM4NiAtNS43ODI4MDMsNjEuNTcyODAzIDEuMTYwNzEzLDc1LjAyODgwNWM4LjUyOTQzLDE4LjU5NzQyNyAtMzIuODUyOTg1LDE5LjM1NTQwOCAtMjAuNTAwMTYyLC0yLjI1MDYzM2M2Ljk1Mjc2MSwtMTcuMzU4NjA0IDEwLjQ3Mzc0MiwtNTIuMjkxMTg3IDAuOTMxOTQ4LC03My40NDkwNjZ6IiAvPgoJPC9jbGlwUGF0aD4gCgkKCTxjbGlwUGF0aCBpZD0iZ29sZ2ktYXBwYXJhdHVzLWNsaXAtcGF0aDMiPgogICAJPHBhdGggZD0ibTI5LjgwMzk1OSw1Mi4xNjA5MTJjMS41ODQxNzcsMTEuNDc0NzE2IDIuNzIzNDYxLDE2LjczNzI2NyAtMS40ODI5NzcsMzguMzYxMzY2Yy0zLjczMTk1NiwxMi45ODkwMDYgLTMuNjAwMzk5LDE2LjM0MDY5MSAtMTEuNzMyMzM0LDE5LjQxMjc4MWMtNi42ODMyOTgsMS42NTg1MzEgLTExLjg2NDgzMiwtOS43ODk0MzYgLTQuNzkzMjk5LC0xNi4xMTM3N2M0Ljg1NTcyOCwtNS42MjMyMjIgNi4xNDEwODcsLTEwLjg4MjM2MiA2LjY1ODg4OCwtMjIuOTU0NjU5Yy0wLjIzOTIxMiwtOS41MjE0MjcgMC44MTQ1MDgsLTE1LjgyMzgyNiAtNS4zNjY5MiwtMTkuOTU4NjI2Yy03LjYyNDMxNSwtMi4xOTUxNzEgLTYuMDg4MDQxLC0xNi41MzQ2MTEgNC44MjQwNTksLTEzLjg2MzgwNGM1Ljg0OTM1NCwxLjAyNzA2NSAxMC4yODI0MDgsOC41NjE1MTYgMTEuODkyNTgyLDE1LjExNjcxMXoiIC8+Cgk8L2NsaXBQYXRoPiovIAoJCgk8cGF0aCBkPSJtNTguNDY3MTQsMjcuNzEzMzI3Yy0yMi4yMDUzNDUsLTI5LjkwMDc5IDM3LjMxMDA2NiwtMzAuMjU4MzU2IDI1LjU2NzI0NSwtNC44MjM0NDZjLTguODA3NjU1LDE4LjU4MTIzOCAtMTcuMDY2NDI5LDU4LjEzNTIzNSAtMC45NDE2NzMsOTkuMjIwNDRjMTMuMzE0NjksMjcuMDY2Njk2IC00MS43NDg0NjMsMjcuNzYwOTI1IC0yNy43NTU1NTQsLTEuNDY5ODQ5YzExLjM0NTgyNSwtMjkuNDIwMjQyIDEwLjI4Njg1OCwtODAuMzM2NDIyIDMuMTI5OTgyLC05Mi45MjcxNDV6IiAvPgogICAJPHBhdGggZD0ibTMxLjIxNDM3MSwzNi4yMTQzNjNjLTEwLjc5MTcxMiwtMjEuNDI3OTAzIDI5Ljg5NzU5OCwtMTkuODQ4MTY0IDE4LjQwNzUwMSwwLjY3MDg5NWMtNC4wNjY5MzMsNy40MjIzODYgLTUuNzgyODAzLDYxLjU3MjgwMyAxLjE2MDcxMyw3NS4wMjg4MDVjOC41Mjk0MywxOC41OTc0MjcgLTMyLjg1Mjk4NSwxOS4zNTU0MDggLTIwLjUwMDE2MiwtMi4yNTA2MzNjNi45NTI3NjEsLTE3LjM1ODYwNCAxMC40NzM3NDIsLTUyLjI5MTE4NyAwLjkzMTk0OCwtNzMuNDQ5MDY2eiIgIC8+CiAgIAk8cGF0aCBkPSJtMjkuODAzOTU5LDUyLjE2MDkxMmMxLjU4NDE3NywxMS40NzQ3MTYgMi43MjM0NjEsMTYuNzM3MjY3IC0xLjQ4Mjk3NywzOC4zNjEzNjZjLTMuNzMxOTU2LDEyLjk4OTAwNiAtMy42MDAzOTksMTYuMzQwNjkxIC0xMS43MzIzMzQsMTkuNDEyNzgxYy02LjY4MzI5OCwxLjY1ODUzMSAtMTEuODY0ODMyLC05Ljc4OTQzNiAtNC43OTMyOTksLTE2LjExMzc3YzQuODU1NzI4LC01LjYyMzIyMiA2LjE0MTA4NywtMTAuODgyMzYyIDYuNjU4ODg4LC0yMi45NTQ2NTljLTAuMjM5MjEyLC05LjUyMTQyNyAwLjgxNDUwOCwtMTUuODIzODI2IC01LjM2NjkyLC0xOS45NTg2MjZjLTcuNjI0MzE1LC0yLjE5NTE3MSAtNi4wODgwNDEsLTE2LjUzNDYxMSA0LjgyNDA1OSwtMTMuODYzODA0YzUuODQ5MzU0LDEuMDI3MDY1IDEwLjI4MjQwOCw4LjU2MTUxNiAxMS44OTI1ODIsMTUuMTE2NzExeiIvPgoKPC9zdmc+Cg=='
                },
                hexagon:{
                  href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0iaGV4YWdvbiIKCXZlcnNpb249IjEuMSIKCWJhc2VQcm9maWxlPSJmdWxsIgoJeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgoJeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCgl4bWxuczpldj0iaHR0cDovL3d3dy53My5vcmcvMjAwMS94bWwtZXZlbnRzIgoJd2lkdGg9IjEwMCIKCWhlaWdodD0iMTAwIgoJdmlld0JveD0iMCAwIDEwMCAxMDAiCglwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIgoJc3R5bGU9ImZpbGw6dHJhbnNwYXJlbnQ7IHN0cm9rZTpibGFjazsgc3Ryb2tlLXdpZHRoOjEiPgoKCgk8Y2xpcFBhdGggaWQ9ImhleGFnb24tY2xpcC1wYXRoIj4KCQk8cGF0aCBkPSJtMS40MjAwNCw1MC45OTYzNWwyMS4wNzI2MiwtNDIuMTM5NDNsNTYuMTkxNTIsMGwyMS4wNjY3LDQyLjEzOTQzbC0yMS4wNjY3LDQyLjE0NTA3bC01Ni4xOTE1MiwwbC0yMS4wNzI2MiwtNDIuMTQ1MDd6IiAvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICAgIAoJPHBhdGggZD0ibTEuNDIwMDQsNTAuOTk2MzVsMjEuMDcyNjIsLTQyLjEzOTQzbDU2LjE5MTUyLDBsMjEuMDY2Nyw0Mi4xMzk0M2wtMjEuMDY2Nyw0Mi4xNDUwN2wtNTYuMTkxNTIsMGwtMjEuMDcyNjIsLTQyLjE0NTA3eiIgc3R5bGU9ImNsaXAtcGF0aDogdXJsKCNoZXhhZ29uLWNsaXAtcGF0aCk7ICIgLz4KCjwvc3ZnPgo='
                },
                pentagon:{
                  href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0icGVudGFnb24iCgl2ZXJzaW9uPSIxLjEiCgliYXNlUHJvZmlsZT0iZnVsbCIKCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKCXhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgoJeG1sbnM6ZXY9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEveG1sLWV2ZW50cyIKCXdpZHRoPSIxMDAiCgloZWlnaHQ9IjEwMCIKCXZpZXdCb3g9IjAgMCAxMDAgMTAwIgoJcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIKCXN0eWxlPSJmaWxsOnRyYW5zcGFyZW50OyBzdHJva2U6YmxhY2s7IHN0cm9rZS13aWR0aDoxIj4KCiAgICAgICAgPGNsaXBQYXRoIGlkPSJwZW50YWdvbi1jbGlwLXBhdGgiPgoJCTxwb2x5Z29uIHBvaW50cz0iNTkuMTU5NzMyODE4NjAzNTE2LDk5LjYxMzIyMDIxNDg0Mzc1IDk1LDUwLjI4MzMxNzU2NTkxNzk3IDU5LjE1OTczMjgxODYwMzUxNiwwLjk1MzQxOTY4NTM2Mzc2OTUgMS4xNjg5NjIwMDE4MDA1MzcsMTkuNzk1NzY0OTIzMDk1NzAzIDEuMTY4OTYyMDAxODAwNTM3LDgwLjc3MDg3NDAyMzQzNzUgIiAvPgoJPC9jbGlwUGF0aD4KCQoJPHBvbHlnb24gcG9pbnRzPSI1OS4xNTk3MzI4MTg2MDM1MTYsOTkuNjEzMjIwMjE0ODQzNzUgOTUsNTAuMjgzMzE3NTY1OTE3OTcgNTkuMTU5NzMyODE4NjAzNTE2LDAuOTUzNDE5Njg1MzYzNzY5NSAxLjE2ODk2MjAwMTgwMDUzNywxOS43OTU3NjQ5MjMwOTU3MDMgMS4xNjg5NjIwMDE4MDA1MzcsODAuNzcwODc0MDIzNDM3NSAiIHN0eWxlPSJjbGlwLXBhdGg6IHVybCgjcGVudGFnb24tY2xpcC1wYXRoKTsgIi8+Cgo8L3N2Zz4K'
                },
                sarcoplasmicReticulum:{
                  href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0ic2FyY29wbGFzbWljLXJldGljdWx1bSIKCXZlcnNpb249IjEuMSIKCWJhc2VQcm9maWxlPSJmdWxsIgoJeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgoJeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCgl4bWxuczpldj0iaHR0cDovL3d3dy53My5vcmcvMjAwMS94bWwtZXZlbnRzIgoJd2lkdGg9IjEwMCIKCWhlaWdodD0iMTAwIgoJdmlld0JveD0iMCAwIDgwIDEwMCIKCXByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiCglzdHlsZT0iZmlsbDp0cmFuc3BhcmVudDsgc3Ryb2tlOmxpZ2h0Z3JheTsgc3Ryb2tlLXdpZHRoOjMiPgoKCTxjbGlwUGF0aCBpZD0ic2FyY29wbGFzbWljLXJldGljdWx1bS1jbGlwLXBhdGgiPgoJCTxwYXRoIGQ9Im00Ni42MDE4MiwxLjQwNzI0Yy0zMi4zNzIyNCwxLjM0MTM4IC0zNi4zMjAwNCwyMi43NzAxMSAtMjYuNTAzMTgsMzguMTI3NzdjOS4zMTgyNiwxOC4zNDI1IC0xOC43NjU2LDMwLjE1MDE2IDIuNTY5NTUsNDkuMzc4MDdjMTYuODIxMjYsMTMuMTE1OTQgNDYuMzMxNzUsNi4xMDUwOCA1Mi4xMjYzOCwtOC41NjgyNmM1Ljg5OTE2LC0xNS4yNDg0NyAtMTAuOTUwOTksLTI2LjAyNzIgLTMuMjkzMTYsLTQwLjk2MTM1YzEwLjg1MzQyLC0xOS44ODQzMiAtMC43NzYxNSwtMzguMTMwNDMgLTI0Ljg5OTU5LC0zNy45NzYyNHoiIC8+CQoJPC9jbGlwUGF0aD4KCQoJPHBhdGggZD0ibTQ2LjYwMTgyLDEuNDA3MjRjLTMyLjM3MjI0LDEuMzQxMzggLTM2LjMyMDA0LDIyLjc3MDExIC0yNi41MDMxOCwzOC4xMjc3N2M5LjMxODI2LDE4LjM0MjUgLTE4Ljc2NTYsMzAuMTUwMTYgMi41Njk1NSw0OS4zNzgwN2MxNi44MjEyNiwxMy4xMTU5NCA0Ni4zMzE3NSw2LjEwNTA4IDUyLjEyNjM4LC04LjU2ODI2YzUuODk5MTYsLTE1LjI0ODQ3IC0xMC45NTA5OSwtMjYuMDI3MiAtMy4yOTMxNiwtNDAuOTYxMzVjMTAuODUzNDIsLTE5Ljg4NDMyIC0wLjc3NjE1LC0zOC4xMzA0MyAtMjQuODk5NTksLTM3Ljk3NjI0eiIgc3R5bGU9ImNsaXAtcGF0aDogdXJsKCNzYXJjb3BsYXNtaWMtcmV0aWN1bHVtLWNsaXAtcGF0aCk7ICIgLz4JCgo8L3N2Zz4K'
                },
                triangle:{
                  href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0idHJpYW5nbGUiCgl2ZXJzaW9uPSIxLjEiCgliYXNlUHJvZmlsZT0iZnVsbCIKCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKCXhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgoJeG1sbnM6ZXY9Imh0dHA6Ly93d3cudzMub3JnLzIwMDEveG1sLWV2ZW50cyIKCXdpZHRoPSI1MCIKCWhlaWdodD0iNTAiCgl2aWV3Qm94PSIwIDAgNTAgNTAiCglwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIgoJc3R5bGU9ImZpbGw6dHJhbnNwYXJlbnQ7IHN0cm9rZTpibGFjazsgc3Ryb2tlLXdpZHRoOjEiPgoKCTxjbGlwUGF0aCBpZD0idHJpYW5nbGUtY2xpcC1wYXRoIj4KCQk8cG9seWdvbiBwb2ludHM9IjEsNDkgNDksMjQgMSwxIi8+CiAgICAgICAgPC9jbGlwUGF0aD4KCgk8cG9seWdvbiBwb2ludHM9IjEsNDkgNDksMjQgMSwxIiBzdHlsZT0iY2xpcC1wYXRoOiB1cmwoI3RyaWFuZ2xlLWNsaXAtcGF0aCk7Ii8+Cgo8L3N2Zz4K'
                },
                endoplasmicReticulum:{
                  href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0iZW5kb3BsYXNtaWMtcmV0aWN1bHVtIgoJdmVyc2lvbj0iMS4xIgoJYmFzZVByb2ZpbGU9ImZ1bGwiCgl4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCgl4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKCXhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiCgl3aWR0aD0iMTAwIgoJaGVpZ2h0PSIxMDAiCgl2aWV3Qm94PSIwIDAgMTAwIDEwMCIKCXByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiCglzdHlsZT0iZmlsbDp0cmFuc3BhcmVudDsgc3Ryb2tlOmxpZ2h0Z3JheTsgc3Ryb2tlLXdpZHRoOjMiPgoKCTxjbGlwUGF0aCBpZD0iZW5kb3BsYXNtaWMtcmV0aWN1bHVtLWNsaXAtcGF0aCI+CgkJPHBhdGggZD0ibTczLjUyNzU2LDU2LjYwOTY3Yy01LjYyNDU3LC0xOC42MDY3NSAyMy41MTQ2MywtMzIuNDMzNTggMjMuNDAxNzMsLTQ1LjA2NjA0Yy0wLjM0NDI2LC00Ljg2MTAyIC0xMC40ODkzNCwtOC44OTc0MyAtMTguMjg5NzQsLTUuMzMzOTVjLTE3LjA0MTE5LDcuODc1NTYgLTE1LjY0OTQ5LDI5LjMwNTAzIC0yMS4yMDUzMyw0Mi4yMzM4N2MtMC4zNTY2MSwzLjYwOTUxIC03LjM2Mjc0LDIuNDY5MjYgLTcuNzQ5NjQsLTAuNDg2OTRjLTUuODUxMiwtMTEuMzg4NzEgMTcuMTM1MzQsLTI0LjQ4NjkyIDUuOTYwNzUsLTI5LjQyNTg2Yy0xOS42MzQ2NywtOC4xNjk3OSAtMjguNzUxODQsMjEuMTUzNDYgLTIyLjA2ODIsMjguODE3ODRjNy40OTU2LDE0LjE3NjAyIC0yLjE3OTQ5LDI0LjQwNjc5IC02Ljc0Njg5LDE1LjQ5NjM3Yy0yLjQ0MjA5LC01LjMwNjEzIDYuMDY2MDUsLTExLjA4NDQ1IC0wLjgwMzUxLC0xNi4xNzY4OWMtNC4zMTk5MSwtMi43OTk5MyAtMTEuNzU1NTUsLTAuNjQ2MTggLTE2LjE1NDY4LDMuMDk0M2MtMTIuODkxMTcsMTAuNzM3OTkgNC43Mjk1Nyw0MC45ODE0NSAyMC45NjQ2NywzNi4xNDYzNWM0LjY5ODMzLC0xLjk1OTg5IC0zLjIzNjAzLC04LjcwMTUxIDMuOTA3MTcsLTkuNTk5NTFjNy4yOTc2NywtMC44MTI1NSA1LjE3NjI4LDYuMTg4ODkgNy42ODc0NSw5LjIyNjkxYzIuMzA3MSw0LjA1MDkgNC44MzIzMiw4LjM1NTM4IDEwLjc2MjYsMTEuNjIzN2M0Ljc4NjQyLDIuNTM3MjQgMTUuMjk0MzcsMi4xMTIyNSAxNi43NzE0OCwtMS45NTc5NWMyLjAzMTgsLTkuMjYyOTEgLTI2LjExMTI5LC0yOC4zNTg0OCAtMTAuNjg5MDMsLTMxLjI4MTVjMTguNTU1MjQsLTIuNzE0NzMgNC43NDg2NiwyMy44NDU3MyAyNC4zMTAwNiwyOS42OTQxOWM5LjUwMTg4LDIuMDI4MjQgMTUuNjM5MDIsLTAuNjIxOTQgMTQuODEyNTUsLTQuMDMyNzJjLTIuNzQ1ODYsLTExLjI2MzI3IC0yNS4xMzU1NywtMjIuNjgwMiAtMjQuOTY0NDEsLTMzLjE0OTY4IiAvPgoJPC9jbGlwUGF0aD4KCQoJPHBhdGggZD0ibTczLjUyNzU2LDU2LjYwOTY3Yy01LjYyNDU3LC0xOC42MDY3NSAyMy41MTQ2MywtMzIuNDMzNTggMjMuNDAxNzMsLTQ1LjA2NjA0Yy0wLjM0NDI2LC00Ljg2MTAyIC0xMC40ODkzNCwtOC44OTc0MyAtMTguMjg5NzQsLTUuMzMzOTVjLTE3LjA0MTE5LDcuODc1NTYgLTE1LjY0OTQ5LDI5LjMwNTAzIC0yMS4yMDUzMyw0Mi4yMzM4N2MtMC4zNTY2MSwzLjYwOTUxIC03LjM2Mjc0LDIuNDY5MjYgLTcuNzQ5NjQsLTAuNDg2OTRjLTUuODUxMiwtMTEuMzg4NzEgMTcuMTM1MzQsLTI0LjQ4NjkyIDUuOTYwNzUsLTI5LjQyNTg2Yy0xOS42MzQ2NywtOC4xNjk3OSAtMjguNzUxODQsMjEuMTUzNDYgLTIyLjA2ODIsMjguODE3ODRjNy40OTU2LDE0LjE3NjAyIC0yLjE3OTQ5LDI0LjQwNjc5IC02Ljc0Njg5LDE1LjQ5NjM3Yy0yLjQ0MjA5LC01LjMwNjEzIDYuMDY2MDUsLTExLjA4NDQ1IC0wLjgwMzUxLC0xNi4xNzY4OWMtNC4zMTk5MSwtMi43OTk5MyAtMTEuNzU1NTUsLTAuNjQ2MTggLTE2LjE1NDY4LDMuMDk0M2MtMTIuODkxMTcsMTAuNzM3OTkgNC43Mjk1Nyw0MC45ODE0NSAyMC45NjQ2NywzNi4xNDYzNWM0LjY5ODMzLC0xLjk1OTg5IC0zLjIzNjAzLC04LjcwMTUxIDMuOTA3MTcsLTkuNTk5NTFjNy4yOTc2NywtMC44MTI1NSA1LjE3NjI4LDYuMTg4ODkgNy42ODc0NSw5LjIyNjkxYzIuMzA3MSw0LjA1MDkgNC44MzIzMiw4LjM1NTM4IDEwLjc2MjYsMTEuNjIzN2M0Ljc4NjQyLDIuNTM3MjQgMTUuMjk0MzcsMi4xMTIyNSAxNi43NzE0OCwtMS45NTc5NWMyLjAzMTgsLTkuMjYyOTEgLTI2LjExMTI5LC0yOC4zNTg0OCAtMTAuNjg5MDMsLTMxLjI4MTVjMTguNTU1MjQsLTIuNzE0NzMgNC43NDg2NiwyMy44NDU3MyAyNC4zMTAwNiwyOS42OTQxOWM5LjUwMTg4LDIuMDI4MjQgMTUuNjM5MDIsLTAuNjIxOTQgMTQuODEyNTUsLTQuMDMyNzJjLTIuNzQ1ODYsLTExLjI2MzI3IC0yNS4xMzU1NywtMjIuNjgwMiAtMjQuOTY0NDEsLTMzLjE0OTY4IiBzdHlsZT0iY2xpcC1wYXRoOiB1cmwoI2VuZG9wbGFzbWljLXJldGljdWx1bS1jbGlwLXBhdGgpOyAiLz4KPC9zdmc+Cg=='
                },
                mitochondria:{
                  href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0ibWl0b2Nob25kcmlhIgoJdmVyc2lvbj0iMS4xIgoJYmFzZVByb2ZpbGU9ImZ1bGwiCgl4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCgl4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKCXhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiCgl3aWR0aD0iMTAwIgoJaGVpZ2h0PSIxMDAiCgl2aWV3Qm94PSIwIDAgMTAwIDEwMCIKCXByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiCglzdHlsZT0iZmlsbDp0cmFuc3BhcmVudDsgc3Ryb2tlOmxpZ2h0Z3JheTsgc3Ryb2tlLXdpZHRoOjMiPgoKICAgICAgICA8Y2xpcFBhdGggaWQ9Im1pdG9jaG9uZHJpYS1vdmFsLWNsaXAtcGF0aCI+CgkJPGVsbGlwc2UgY3g9IjUwIiBjeT0iNTAiIHJ4PSI1MCIgcnk9IjUwIiA+PC9lbGxpcHNlPgogICAgICAgIDwvY2xpcFBhdGg+Cgk8Y2xpcFBhdGggaWQ9Im1pdG9jaG9uZHJpYS1jbGlwLXBhdGgiPgoJCTxwYXRoIGQ9Im0xNC44OTQ4OTksMjYuMzQ3MzU3YzQuMzYzODE3LC0wLjc0MTU3MSAzLjgyNzUxOCwxNy4wMzYxNjkgOC4xODI2MzgsMTYuMTgzODI1YzguMjczNDcsMC4wMzA3NjIgMi45ODIwMDYsLTI4LjE0ODk5MSA5Ljg5OTc1NCwtMjguMzM2Njg3YzYuOTY3OTk1LC0wLjE4NzcwNCAyLjI0NjY1MSwyOS45NDc1MjcgOS4yMDQ5ODMsMjkuNDM5ODFjNy42MzI4MTMsLTAuNTYwMDI0IDAuNTA3MzA5LC0zMi45MzUzNTcgOC4xMzYyNTMsLTMzLjYyMzA4MmM3LjY5ODUyMSwtMC42ODkyNTkgMi45MTkxOTcsMzIuMDM5OTQxIDEwLjYyODM0OSwzMi4yMjQ1NTdjNi41NDY2ODQsMC4xNjAwMTEgMy4wMjY0NTEsLTI3LjY0MjgwOCA5LjU2MDU3LC0yNi45MjEyMzJjNy4xOTIxNzcsMC43OTM4OCAwLjY2NDgxOCwyOS44NDI5MDUgNy43ODE2MjQsMzEuNjY3NjA0YzQuNzQ4NDA1LDEuMjE1NDM5IDQuNDIwODIyLC0xOC4yNTc3NTcgOS4yMDQwMTgsLTE3LjQ0MDgwNGMxMS4xMjg4ODMsNy41NzcyNzggOC42MjgxMDUsMzcuNjk4NjU4IC0yLjE3OTk3Nyw0NC42NDUxMzhjLTMuMTM4NTQyLDAuNjk4NDc5IC0zLjk2NTY5OCwtMTAuNTAyMDI5IC03LjExMjkzOCwtOS45MDUwNzVjLTUuNTkwMDUsMS4wNTg1MDIgLTMuOTgyMTI0LDIyLjI4NDA4OCAtOS42MDMwOTYsMjEuNzk5NDYxYy01LjIzOTI4MSwtMC40NTY5NDcgLTIuMjI2MzY0LC0yMS42MzYzODMgLTcuNDcwNDcsLTIxLjczMDIzMmMtNi45NjEyMzUsLTAuMTE2OTI4IC0zLjM1Nzg5NSwyOC45MjQ0MDggLTEwLjMxNjIzMSwyOC40OTUxNDhjLTYuMTQwODQ2LC0wLjM3NTM5NyAtMS43MzA2NCwtMjQuOTUwMzYzIC03LjgyNTEwNCwtMjYuMTkxOTYzYy01LjY4MTg0NywtMS4xNTY5ODIgLTUuMzc4NDI5LDIyLjE3MDI0MiAtMTEuMDI3NDI2LDIwLjY4MDkzOWMtNi4yNDkwNjksLTEuNjQ0Njg0IC0wLjQ2OTYyNCwtMjYuNjczNTE5IC02Ljc1OTI3NSwtMjcuODY1ODg3Yy0zLjcyODk1NCwtMC43MDYxODggLTIuNjQ3NjY1LDE0LjQwMDY1NCAtNi40MDM2NzcsMTQuNTQ1MjkyYy0xNC4wMTYxOTgsLTUuOTM4NzM2IC0xNS43NDg3NzYsLTM5LjcwNzk4MSAtMy44OTk5OTQsLTQ3LjY2NjgxMXoiPjwvcGF0aD4KCTwvY2xpcFBhdGg+IAoJCgk8ZWxsaXBzZSBjeD0iNTAiIGN5PSI1MCIgcng9IjUwIiByeT0iNTAiIHN0eWxlPSJjbGlwLXBhdGg6IHVybCgjbWl0b2Nob25kcmlhLW92YWwtY2xpcC1wYXRoKTsgIj48L2VsbGlwc2U+Cgk8cGF0aCBkPSJtMTQuODk0ODk5LDI2LjM0NzM1N2M0LjM2MzgxNywtMC43NDE1NzEgMy44Mjc1MTgsMTcuMDM2MTY5IDguMTgyNjM4LDE2LjE4MzgyNWM4LjI3MzQ3LDAuMDMwNzYyIDIuOTgyMDA2LC0yOC4xNDg5OTEgOS44OTk3NTQsLTI4LjMzNjY4N2M2Ljk2Nzk5NSwtMC4xODc3MDQgMi4yNDY2NTEsMjkuOTQ3NTI3IDkuMjA0OTgzLDI5LjQzOTgxYzcuNjMyODEzLC0wLjU2MDAyNCAwLjUwNzMwOSwtMzIuOTM1MzU3IDguMTM2MjUzLC0zMy42MjMwODJjNy42OTg1MjEsLTAuNjg5MjU5IDIuOTE5MTk3LDMyLjAzOTk0MSAxMC42MjgzNDksMzIuMjI0NTU3YzYuNTQ2Njg0LDAuMTYwMDExIDMuMDI2NDUxLC0yNy42NDI4MDggOS41NjA1NywtMjYuOTIxMjMyYzcuMTkyMTc3LDAuNzkzODggMC42NjQ4MTgsMjkuODQyOTA1IDcuNzgxNjI0LDMxLjY2NzYwNGM0Ljc0ODQwNSwxLjIxNTQzOSA0LjQyMDgyMiwtMTguMjU3NzU3IDkuMjA0MDE4LC0xNy40NDA4MDRjMTEuMTI4ODgzLDcuNTc3Mjc4IDguNjI4MTA1LDM3LjY5ODY1OCAtMi4xNzk5NzcsNDQuNjQ1MTM4Yy0zLjEzODU0MiwwLjY5ODQ3OSAtMy45NjU2OTgsLTEwLjUwMjAyOSAtNy4xMTI5MzgsLTkuOTA1MDc1Yy01LjU5MDA1LDEuMDU4NTAyIC0zLjk4MjEyNCwyMi4yODQwODggLTkuNjAzMDk2LDIxLjc5OTQ2MWMtNS4yMzkyODEsLTAuNDU2OTQ3IC0yLjIyNjM2NCwtMjEuNjM2MzgzIC03LjQ3MDQ3LC0yMS43MzAyMzJjLTYuOTYxMjM1LC0wLjExNjkyOCAtMy4zNTc4OTUsMjguOTI0NDA4IC0xMC4zMTYyMzEsMjguNDk1MTQ4Yy02LjE0MDg0NiwtMC4zNzUzOTcgLTEuNzMwNjQsLTI0Ljk1MDM2MyAtNy44MjUxMDQsLTI2LjE5MTk2M2MtNS42ODE4NDcsLTEuMTU2OTgyIC01LjM3ODQyOSwyMi4xNzAyNDIgLTExLjAyNzQyNiwyMC42ODA5MzljLTYuMjQ5MDY5LC0xLjY0NDY4NCAtMC40Njk2MjQsLTI2LjY3MzUxOSAtNi43NTkyNzUsLTI3Ljg2NTg4N2MtMy43Mjg5NTQsLTAuNzA2MTg4IC0yLjY0NzY2NSwxNC40MDA2NTQgLTYuNDAzNjc3LDE0LjU0NTI5MmMtMTQuMDE2MTk4LC01LjkzODczNiAtMTUuNzQ4Nzc2LC0zOS43MDc5ODEgLTMuODk5OTk0LC00Ny42NjY4MTF6IiBzdHlsZT0iY2xpcC1wYXRoOiB1cmwoI21pdG9jaG9uZHJpYS1jbGlwLXBhdGgpOyAiPjwvcGF0aD4KPC9zdmc+Cg=='
                }
              }
            },
            function(thisViewport) {
              viewport = thisViewport;

              var crossPlatformTextInstance1 = Object.create(crossPlatformText);
              crossPlatformTextInstance1.init({
                targetSelector:'#my-svg2'
              });

              var shapeName;
              async.each(pathway.elements, function(dataElement, callbackEach) {
                var renderingData = dataElement;
                renderingData.containerSelector = '#viewport';
                shapeName = strcase.camelCase(dataElement.shape);
                if (dataElement.shape !== 'none') {
                  if (!crossPlatformShapesInstance1.hasOwnProperty(shapeName)) {
                    // if pathvisiojs cannot render the shape name indicated, check for whether the shape name a double-line shape.
                    // If so, check whether pathvisiojs can render a single-line version of the shape.
                    // If yes, render the single-line version. Otherwise, render a rounded rectangle.
                    var re = /double$/gi;
                    shapeName = shapeName.replace(re, '');
                    if (crossPlatformShapesInstance1.hasOwnProperty(shapeName)) {
                      console.warn('Requested path "' + dataElement.shape + '" is not available with linetype of "Double". Using linetype of "Solid" instead');
                    }
                    else {
                      console.warn('Requested path "' + dataElement.shape + '" is not available. Using path "rounded-rectangle" instead');
                      shapeName = 'roundedRectangle';
                    }
                  }
                  crossPlatformShapesInstance1[shapeName](renderingData, function(shapeElement) {
                    if (!!dataElement.datasourceReference) {
                      var path = d3.select(shapeElement)
                      .attr('class', 'has-xref');

                      var notDragged = true;
                      path.on("mousedown", function(d,i) {
                        notDragged = true;
                      })
                      .on("mousemove", function(d,i) {
                        notDragged = false;
                      })
                      .on("mouseup", function(d,i) {
                        if (notDragged) {
                          var dfId = dataElement.datasourceReference.id;
                          var dfDatabase = dataElement.datasourceReference.database;
                          var dfOrganism = dataElement.datasourceReference.organism;
                          pathvisiojs.renderer.annotation.xRef.render(dfOrganism, dfId, dfDatabase, dataElement.textContent, dataElement.dataNodeType);
                        }
                      });
                    }
                  });
                }

                if (!!dataElement.textContent) {
                  crossPlatformTextInstance1.render(renderingData, function(textArea) {
                    d3.select(textArea).attr('pointer-events', 'none');
                  });
                }
                callbackEach(null);
              },
              function() {
                callback(null, json);
              });
            });
          });
        }
        else {
          pathvisiojs.renderer.img.load(loadDiagramArgs, function(diagram) {
            callback(null, null);
          });
        }

        // ********************************************
        // Check for SVG support. If false, use static image (png, jpg, gif, etc.) fallback
        // ********************************************
        /*
        if (renderableSourceDataElement.selectedViewMethod === 'svg') { // TODO get this working in IE9
          loadDiagramArgs.cssUri = cssUri;
          loadDiagramArgs.customMarkers = customMarkers;
          //loadDiagramArgs.customSymbols = customSymbols;
          pathvisiojs.renderer.svg.load(loadDiagramArgs, function(diagram) {
            if (!!diagram) {
              callback(null, diagram);
            }
            else {
              // TODO refactor this to not just assume PNG will be available as fallback
              loadDiagramArgs.renderableSourceDataElement = sourceData[1];
              pathvisiojs.renderer.img.load(loadDiagramArgs, function(diagram) {
                callback(null, diagram);
              });
            }
          });
        }
        else {
          pathvisiojs.renderer.img.load(loadDiagramArgs, function(diagram) {
            callback(null, diagram);
          });
        }
          //*/
      },
      function(data, callbackInside){
        if (!!data) {
          var elementsWithPublicationXrefs = data.elements.filter(function(element){return !!element.publicationXrefs;});
          if (elementsWithPublicationXrefs.length > 0) {
            elementsWithPublicationXrefs.forEach(function(elementWithPublicationXrefs) {
              pathvisiojs.renderer.publicationXref.render(viewport, elementWithPublicationXrefs);
            });
          }
        }
        callbackInside(null, data);
      },
      function(data, callback){
        if (renderableSourceDataElement.selectedViewMethod === 'svg') {
          var svgSelection = d3.select('#my-svg2');
          pathvisiojs.renderer.infoBox.render(viewport, data);
          callback(null, svgSelection, data);
        }
        else {
          callback(null, null, data);
        }
      },
      function(svgSelection, data, callback){
        if (renderableSourceDataElement.selectedViewMethod === 'svg') {
          var cssData,
            style,
            defs = svgSelection.select('defs');
          if (!!cssUri) {
            d3.text(cssUri, 'text/css', function(cssData) {
              style = defs.append('style').attr('type', "text/css");
              style.text(cssData);
            });
          }
          else {
            cssData = pathvisioNS['src/css/pathway-diagram.css'];
            style = defs.append('style').attr('type', "text/css");
            style.text(cssData);
          }

          svgPanZoom.init({
            'selector': '#my-svg2',
            'zoomEnabled': false,
            'minZoom': '0.1',
            'maxZoom': '8.0',
          });

          var svgInFocus = false;
          svgSelection.on("click", function(d, i){
            svgPanZoom.enableZoom();
            svgInFocus = true;
          })
          .on("mouseenter", function(d, i){
            if (svgInFocus) {
              svgPanZoom.enableZoom();
            }
          })
          .on("mouseleave", function(d, i){
            if (svgInFocus) {
              svgPanZoom.disableZoom();
              svgInFocus = false;
            }
          });
          callback(null, svgSelection, data);
        }
        else {
          callback(null, null, data);
        }
      },
      function(svgSelection, data, callback){
        //******************
        //* Node Highlighter
        //******************


        if (!!data) {
          pathvisiojs.renderer.highlighter.load(svgSelection, data);
        }

        // ********************************************
        // Remove loading icon
        // ********************************************
        diagramContainer.select('#loading-icon').remove();

        // adding this as a signal for e2e tests that the diagram has finished loading 
        // TODO refactor tests so they don't need this hack.
        d3.select('body').append('span')
        .attr('id', 'pathvisiojs-is-loaded');
        //console.log('Pathvisiojs done loading.');
        callback(null);
      }
    ]);
  }

  return{
    load:load
  };
}();

     


pathvisiojs.renderer.infoBox = function(){
  'use strict';
    
  function render(viewport, data) {
    if (!viewport || !data) {
      return console.warn('Error: Missing input parameters.');
    }

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBoxData = [];
    if (data.hasOwnProperty('Name')) {
      infoBoxData.push({'key':'Title', 'value':data.Name});
    }

    if (data.hasOwnProperty('License')) {
      infoBoxData.push({'key':'Availability', 'value':data.License});
    }

    if (data.hasOwnProperty('LastModified')) {
      infoBoxData.push({'key':'Last modified', 'value':data.LastModified});
    }

    if (data.hasOwnProperty('Organism')) {
      infoBoxData.push({'key':'Organism', 'value':data.Organism});
    }

    /*
    if (data.hasOwnProperty('PublicationXref')) {
      pathvisiojs.renderer.publicationXref.getPublicationXrefString(data, data.PublicationXref, function(publicationXrefString) {
        infoBoxData.push({'key':'Citation(s)', 'value':publicationXrefString});
      })
    }
    //*/

    // TODO do we need to check for whether info box data exists?
    var infoBoxSelection = viewport.selectAll("g.info-box")
    .data([infoBoxData])
    .enter()
    .append("g")
    .attr("id", function (d,i) {return "info-box-" + i; })
    .attr("class", "text-area info-box");

    var infoBoxItems = infoBoxSelection.selectAll("text")
    .data(function(d) {return d;})
    .enter()
    .append("text")
    .attr("id", function (d,i) {return "info-box-text" + i; })
    .attr("class", "item")
    .attr("x", 0)
    .attr("y", function(d,i) {return 14 + 14 * i; });

    var infoBoxPropertyName = infoBoxItems.append("tspan")
    .attr("class", "info-box-item-property-name")
    .text(function (d) {return d.key + ': ';});

    var infoBoxProperty = infoBoxItems.append("tspan")
    .attr("class", "info-box-item-property-value")
    .text(function (d) {return d.value;});
  }

  return {
    render:render
  };
}();


pathvisiojs.renderer.publicationXref = {

  getReferenceNumberForDisplay: function(rdfId) {
    var publicationXrefInstance = this;
    var model = publicationXrefInstance.model;
    var displayNumberForDisplay = null;
    var i = -1;
    var currentPublicationXref;
    var found = false;

    do {
      i += 1;
      currentPublicationXref = model.Biopax.PublicationXref[i];
      if (typeof currentPublicationXref != 'undefined'){
        if (currentPublicationXref.rdfId === rdfId) {
          found = true;
          displayNumberForDisplay = i + 1;
        }
      }
    } while (found === false && i < model.Biopax.PublicationXref.length);

    return displayNumberForDisplay;
  },

  // Create a string of citation numbers for display,
  // delimited by commas, and
  // replacing any consecutive series of numbers with the
  // first and last joined by a hyphen.
  createPublicationXrefString: function(displayNumbers) {
    var publicationXrefString;
    if (displayNumbers.length === 1) {
      publicationXrefString = displayNumbers[0];
    }
    else {
      displayNumbers.sort(function(a, b) {
        return a - b;
      });
      var i = 0;
      publicationXrefString = displayNumbers[i].toString();

      if (displayNumbers.length > 2) {
        do {
          i += 1;

          if (displayNumbers[i - 1] + 1 !== displayNumbers[i] || displayNumbers[i] + 1 !== displayNumbers[i + 1]) {
            if (i !== 1) {
              if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
                publicationXrefString += '-' + displayNumbers[i].toString();
              }
              else {
                publicationXrefString += ', ' + displayNumbers[i].toString();
              }
            }
            else {
              publicationXrefString += ', ' + displayNumbers[i].toString();
            }
          }

        } while (i < displayNumbers.length - 2);
      }

      i += 1;

      if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
        publicationXrefString += '-' + displayNumbers[i].toString();
      }
      else {
        publicationXrefString += ', ' + displayNumbers[i].toString();
      }
    }

    return publicationXrefString;
  },

  getPublicationXrefString: function(rdfIds, callback) {
    var publicationXrefInstance = this;
    var model = publicationXrefInstance.model;
    var displayNumbers = [];
    var publicationXrefString = '';
    // make sure it's an array
    rdfIds = pathvisiojs.utilities.convertToArray(rdfIds);
    rdfIds.forEach(function(rdfId) {
      var num = publicationXrefInstance.getReferenceNumberForDisplay(rdfId);
      if(!!num) {
        displayNumbers.push(num);
      }
    });
    if (displayNumbers.length > 0){
      publicationXrefString = publicationXrefInstance.createPublicationXrefString(displayNumbers);
    }
    callback(publicationXrefString);
  },

  //function render(target, targetType, pathway, rdfIds) {
  render: function(containerSelection, targetData) {
    var publicationXrefInstance = this,
      translateX,
      translateY;
    /* targetType can be any of the following:
     * node
     * edge
     * not currently but maybe in the future: diagram (applies to the whole pathway)
    //*/

    var text;
    publicationXrefInstance.getPublicationXrefString(targetData.publicationXrefs, function(publicationXrefString) {
      var textLength = publicationXrefString.toString().length;
      if (targetData.networkType === 'node') {
        var nodeWidth = targetData.width;
        var offsetX = nodeWidth - textLength * 3 / 2 - 2;
        translateX = targetData.x + offsetX;
        translateY = targetData.y - 4;
        containerSelection.append('text')
        .attr('class', 'citation')
        .attr('transform', function(d) {return 'translate(' + translateX + ' ' + translateY + ')';})
        .text(publicationXrefString);
      }
      else {
        // TODO don't repeat svg definition
        if (targetData.networkType === 'edge') {
          var publicationXrefPosition = 0.5;
          var edgeElement = d3.select('#' + targetData.id)[0][0];
          var totalLength = edgeElement.getTotalLength();
          var point = edgeElement.getPointAtLength(publicationXrefPosition * totalLength);
          var offset = -4;
          translateX = point.x + offset - textLength * 3;
          translateY = point.y + offset;

          text = containerSelection.append('text')
          .attr('class', 'citation')
          .attr('transform', function(d) {return 'translate(' + translateX + ' ' + translateY + ')';})
          .text(publicationXrefString);

          /*
           * This had a problem with displaying text upside down sometimes,
           * depending on the orientation of the associated edge
          text.append('textPath')
          .attr('xlink:xlink:href', '#' + targetData.id)
          .attr('startOffset', '50%')
          .text(publicationXrefString);
          //*/

        }
        else {
          throw new Error('Pathvisiojs cannot render a citation for targets of this type: ' + targetData.networkType);
        }
      }
    });

  }
};


// TODO remove controls that don't work with this element
// This code is for the HTML img element. It displays the
// diagram as a PNG, JPG, GIF, etc.

pathvisiojs.renderer.img = function(){
  'use strict';

  function load(args, callback) {
    if (!args) {
      throw new Error("Missing input data.");
    }
    var container = args.container, //a d3 selection corresponding to the containing element in the parent document
      containerWidth = parseFloat(args.containerWidth),
      containerHeight = parseFloat(args.containerHeight),
      fitToContainer = args.fitToContainer,
      imgUri = args.renderableSourceDataElement.uri;

    if (!imgUri) {
      console.warn('No uri specified for sourceData element.'); //TODO decide whether this should warn or throw an error.
      imgUri = args.renderableSourceDataElement.uri || pathvisiojs.config.diagramNotAvailableIconUri;
    }

    loadImage(
      imgUri,
      function (img) {
        if (img.type === "error") {
          console.warn("Error loading image " + imgUri); //TODO decide whether this should warn or throw an error.
          loadImage(
            pathvisiojs.config.diagramNotAvailableIconUri,
            function (img) {
              //changing from d3 selection to html element
              container[0][0].appendChild(img);
              callback(null, img);
            },
            {
              maxWidth: containerWidth,
              maxHeight: containerHeight
            }
          );
        }
        else {
          //changing from d3 selection to html element
          container[0][0].appendChild(img);
          //TODO this should go into the CSS file somehow, but be careful not to mess up the SVG version
          img.setAttribute('style', 'margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;')
          callback(null, img);
        }
      },
      {
        maxWidth: containerWidth,
        maxHeight: containerHeight,
        //canvas: true,
        contain: fitToContainer
        //crossOrigin:'Anonymous' // I thought this would allow CORS images, but it actually does not.
      }
    );
  }

  /*
  function load(args, callback) {
    if (!args) {
      throw new Error("Missing input data.");
    }

    var container = args.container,
      containerWidth = parseFloat(args.containerWidth),
      containerHeight = parseFloat(args.containerHeight),
      imgUri = args.renderableSourceDataElement.uri || pathvisiojs.config.diagramNotAvailableIconUri,
      img,
      fitScreenScale;
      
      console.log(imgUri);

      img = document.createElement('img');
      img.src = imgUri;
      img.onload = function() {
        console.log(this);
        insertImage(container, containerWidth, containerHeight, img, imgUri, callback);
      }
      img.onerror = function() {
        img.src = pathvisiojs.config.diagramNotAvailableIconUri;
        img.onload = function() {
          console.log(this);
          insertImage(container, containerWidth, containerHeight, img, imgUri, callback);
          callback(null);
        }
      };
  }

  function insertImage(container, containerWidth, containerHeight, img, imgUri, callback) {
        var imgWidth = parseFloat(img.width);
        var imgHeight = parseFloat(img.height);
        var fitScreenScale = Math.min((containerWidth/imgWidth), (containerHeight/imgHeight));
        container.append('img')
        .attr('id', 'pathvisiojs-pathway-img')
        .attr('src', imgUri)
        .attr('x', 0)
        .attr('y', 0)
        .attr('style', 'position:relative; left:'
              + (containerWidth - imgWidth * fitScreenScale)/2 + 'px; '
              + 'top:' + (containerHeight - imgHeight * fitScreenScale)/2 + 'px; ')
        .attr('width', imgWidth * fitScreenScale)
        .attr('height', imgHeight * fitScreenScale);
        callback(null);
  }
  //*/

  return {
    load:load
  };
}();


pathvisiojs.renderer.annotation = function(){
  'use strict';

  var pathwaySearchUriStub = '/index.php?title=Special:SearchPathways&doSearch=1&query=';

  function render(annotationData) {
    self.annotationData = annotationData;
    var annotation = d3.select("#annotation")
    .data([annotationData]);
 
    //Special drag code to update absolute position of annotation panel
    var dragAbs = d3.behavior.drag()
    .on("drag", function(d,i){
      var dright = parseInt(annotation.style("right"));
      var dtop = parseInt(annotation.style("top"));
      dright-=d3.event.dx;
      dtop+=d3.event.dy;
      annotation.style("right", dright+"px");
      annotation.style("top", dtop+"px");
    });


    var annotationHeaderText = annotation.select('#annotation-header-text')
    .text(function(d) { return d.header; });

    var detailsSearchUri = annotation.select('#annotation-header-search').select('a')
    .attr('href', function(d) {
      // TODO make this generic
      return pathwaySearchUriStub + d.header;
     })
     .attr('title', function(d) {return 'Search for pathways containing ' + d.header; });

    var annotationIconMove = annotation.select('i.icon-move')
    .on("mousedown", function(d, i){
	//add dragAbs function when icon is pressed
      annotation.call(dragAbs);
    })
    .on("mouseup", function(d, i){
      //nullify dragAbs when icon is released; simulates drag behaviour via icon
      annotation.on('mousedown.drag', null);
    });

    var annotationIconRemove = annotation.select('i.icon-remove')
    .on("click", function(d, i){
      annotation[0][0].style.visibility = 'hidden';
    });

    var annotationDescription = annotation.select('#annotation-description')
    .text(function(d) { return d.description; });

    var annotationListItemsContainer = annotation.selectAll('#annotation-items-container')
    .data(function(d) {
      //if a single string, then check for special case: img src for loading gif
      if (typeof d.listItems[0] === 'string'){
       if (d.listItems[0].split('.').pop() == 'gif'){
         annotationDescription.append('br');
         annotationDescription.append('br');
         annotationDescription.append('img').attr('src', d.listItems[0]).attr('style', 'width: 20px');
       } else { //display the custom text
         annotationDescription.append('p').html('<font color="red">'+d.listItems[0]+'</font>');
       }
        //fake item list that effectively clears the display while loading gif is active
        return [{"key":"clear","values":[{"clear": "clear"}]}];
      } else {
      //debug//console.log([d.listItems]);
      return [d.listItems];
      }
    });

    //debug//console.log(annotationListItemsContainer);

    // Update
    var annotationListItems = annotationListItemsContainer.selectAll('li')
    .data(function(d) {
      //debug//console.log('d annotationListItems');
      //debug//console.log(d);
      return d;
    });

    // Enter
    annotationListItems.enter().append('li');

    // Exit…
    annotationListItems.exit().remove();

    var annotationItemTitles = annotationListItems.selectAll('.annotation-item-title')
    .data(function(d) {
      //debug//console.log('d annotationListItems');
      //debug//console.log(d);
      return [d.key];
    })
    .text(function(d) {return d + ': ';});
    //Enter
    annotationItemTitles
    .enter().append('span')
    .attr('class', 'annotation-item-title')
    .text(function(d) {return d + ': ';});
    //Exit
    annotationItemTitles.exit().remove();

    // Update
    var annotationItemPlainTextElements = annotationListItems.selectAll('span.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (!element.hasOwnProperty('uri')) {
          //debug//console.log('annotationItemPlainTextElement');
          //debug//console.log(element);
          return element;
        }
      });
    })
    .text(function(d) { return ' ' + d.text; });
    // Enter
    annotationItemPlainTextElements.enter()
    .append('span')
    .attr('class', 'annotation-item-text')
    .text(function(d) { return ' ' + d.text; });
    // Exit
    annotationItemPlainTextElements.exit().remove();

    // Update
    var annotationItemLinkedTextElements = annotationListItems.selectAll('a.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (element.hasOwnProperty('uri')) {
          return element;
        }
      });
    })
    .attr('href', function(d) {return d.uri;})
    .attr('class', 'annotation-item-text')
    .text(function(d) {return ' ' + d.text; });
    // Enter
    annotationItemLinkedTextElements.enter()
    .append('a')
    .attr('href', function(d) {return d.uri;})
    .attr('class', 'annotation-item-text')
    .text(function(d) {return ' ' + d.text; });
    // Exit
    annotationItemLinkedTextElements.exit().remove();
    
    annotation[0][0].style.visibility = 'visible';
  }
      
  return {
    render:render,
    pathwaySearchUriStub:pathwaySearchUriStub
  };
}();


pathvisiojs.renderer.annotation.citation = function(){
  'use strict';
    function render(organism, node) {
    }

    return {
      render:render
    };
}();


pathvisiojs.renderer.annotation.xRef = function(){
  'use strict';
  var cachedAnnotationData = {};

  function render(organism, id, datasource, label, desc) {
    var data = getCachedAnnotationData(organism, label, id, datasource);
    if (data){
      //if cache, then use it
      pathvisiojs.renderer.annotation.render(data);
    }
    else {
      //else render immediate data and loading gif
      var data = {
        "header": label,
        "description": desc,
        "listItems":[pathvisiojs.config.diagramLoadingIconUri] 
      };
      pathvisiojs.renderer.annotation.render(data);

      //console.log(pathvisiojs.config.bridgedbLinkOutsUriStub);
      //then retrieve the bridgedb data
      var xRefData = pathvisiojs.formatConverter.bridgedb.getXrefAnnotationDataByDataNode(organism, id, datasource, label, desc, function(annotationData) {
        setCachedAnnotationData(organism, label, id, datasource, annotationData);
        pathvisiojs.renderer.annotation.render(annotationData);
      });
    }
  }

  function getCachedAnnotationData(organism, label, id, datasource){
    return cachedAnnotationData[organism+label+id+datasource];
  }

  function setCachedAnnotationData(organism, label, id, datasource, data){
    cachedAnnotationData[organism+label+id+datasource] = data;
  }

  return {
    render:render
  };
}();


// TODO this only works for GPML DataNodes with SVG at present.
pathvisiojs.renderer.highlighter = {
  load: function(svgSelection, data, callback) {
    'use strict';
    var highlighter = this;
    if (!svgSelection || !data) {
      throw new Error("Missing input data.");
    }

    var typeaheadElementValues = [], typeaheadElementValue;
    data.elements.filter(function(element) {return element.gpmlType === 'DataNode';}).forEach(function(node) {
      if (node.hasOwnProperty('textContent')) {
        typeaheadElementValue = node.textContent;
        if (typeaheadElementValues.indexOf(typeaheadElementValue) === -1) {
          typeaheadElementValues.push(typeaheadElementValue);
        }
      }
    });

    // see http://twitter.github.io/typeahead.js/
    $('#highlight-by-label-input').typeahead({
      name: 'Highlight node in pathway',
      local: typeaheadElementValues,
      limit: 10
    });


    /*
       $('.icon-eye-open').click(function(){
       var nodeLabel = $("#highlight-by-label-input").val();
       if (!nodeLabel) {
       console.warn('Error: No data node value entered.');
       }
       else {
       svgRenderer.node.highlightByLabel(svg, nodeLabel);
       }
       });
    //*/
    // see http://api.jquery.com/bind/
    // TODO get selected value better and make function to handle

    $( "#highlight-by-label-input" ).bind("typeahead:selected", function() {
      var typeaheadElementValue = $("#highlight-by-label-input").val();
      if (!typeaheadElementValue) {
        throw new Error("No data node value entered for type-ahead node highlighter.");
      }
      else {
        // TODO refactor this so it calls a generic highlightDataNodeByLabel function that can call
        // a highlighter for svg, png, etc. as appropriate.
        highlighter.highlightByLabel(svgSelection, data, typeaheadElementValue);
      }
    });

    d3.select('#clear-highlights-from-typeahead').on('click', function() {
      highlighter.clearHighlightsFromTypeahead(svgSelection);
    });
    if (!!callback) {
      callback(null, svgSelection);
    }
  },
  highlight: function(args) {
    'use strict';
    var highlighter = this,
      data = args.data;

    var getSelectors = {
      selectors: function(input) {
        return input;
      },
      label: function(input) {
        var selectors = data.elements.filter(function(element) {
          return element.textContent === input;
        }).map(function(element){
          return '#' + element.id;
        });
        return selectors;
      },
      xref: function(input) {
        var selectors = data.elements.filter(function(element) {
          return element.datasourceReference.filter(function(datasourceReference) {
            // TODO this probably doesn't work. What is the format of an Xref again?
            return input === (datasourceReference.database + datasourceReference.id);
          });
        }).map(function(element){
          return '#' + element.id;
        });
        return selectors;
      }
    };

    var argsEntries = d3.map(args).entries();
    var methodsInGetSelectors = d3.map(getSelectors).keys();
    var i = 0;
    var selectors, method, methodIndex;
    do {
      methodIndex = methodsInGetSelectors.indexOf(argsEntries[i].key);
      if (methodIndex !== -1) {
        method = methodsInGetSelectors[methodIndex];
        selectors = getSelectors[method](argsEntries[i].value);
      }
      i += 1;
    } while ((!selectors) && i < argsEntries.length);

    var cssClass = args.cssClass || 'highlighted-node',
    style = args.style,
    svgId = args.svgId || 'pathvisiojs-diagram';

    var svgSelection = d3.select('#' + svgId);
    var styles, styleString = '';
    if (!!style) {
      styles = d3.map(style).entries();
      styles.forEach(function(styleAttribute) {
        styleString += strcase.paramCase(styleAttribute.key) + ':' + styleAttribute.value + '; ';
      });
    }
    selectors.forEach(function (selector) {
      var selectedElement = svgSelection.select(selector);
      var element = selectedElement[0][0];
      var targetX = element.getBBox().x;
      var targetY = element.getBBox().y;
      var targetHeight = element.getBBox().height;
      var targetWidth = element.getBBox().width;
      var padding = 2.5;
      //TODO get the border width and set the offset based on border width
      var highlighter = svgSelection.select('#viewport').append('rect')
      .attr('x', targetX - padding)
      .attr('y', targetY - padding)
      .attr('class', cssClass)
      .attr('style', styleString + ' pointer-events: none')
      .attr('width', targetWidth + 2 * padding)
      .attr('height', targetHeight + 2 * padding);
    });
  },

  highlightByLabel: function(svgSelection, data, nodeLabel) {
    'use strict';
    var svgId = svgSelection.attr('id') || 'pathvisiojs-diagram';
    svgSelection.selectAll('.highlighted-from-typeahead').remove();
    var args = {};
    args.data = data;
    args.svgId = svgId;
    args.label = nodeLabel;
    args.cssClass = 'highlighted-node highlighted-from-typeahead';
    this.highlight(args);
    d3.select('#clear-highlights-from-typeahead')[0][0].style.visibility = 'visible';
  },

  clearHighlightsFromTypeahead: function(svgSelection) {
    'use strict';
    svgSelection.selectAll('.highlighted-from-typeahead').remove();
    // TODO this won't work well if we have more than one diagram on the page
    var highlightByLabelInput = d3.select('#highlight-by-label-input');
    highlightByLabelInput[0][0].value = '';
    highlightByLabelInput.attr('placeholder', '');
    d3.select('#clear-highlights-from-typeahead')[0][0].style.visibility = 'hidden';
  }
};
