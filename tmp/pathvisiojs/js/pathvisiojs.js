/* pathvisiojs 1.0.8
Built on 2014-02-18
https://github.com/wikipathways/pathvisiojs
License: http://www.apache.org/licenses/LICENSE-2.0/ */

(function(definition){if(typeof define=="function"){define(definition)}else if(typeof YUI=="function"){YUI.add("es5-sham",definition)}else{definition()}})(function(){var call=Function.prototype.call;var prototypeOfObject=Object.prototype;var owns=call.bind(prototypeOfObject.hasOwnProperty);var defineGetter;var defineSetter;var lookupGetter;var lookupSetter;var supportsAccessors;if(supportsAccessors=owns(prototypeOfObject,"__defineGetter__")){defineGetter=call.bind(prototypeOfObject.__defineGetter__);defineSetter=call.bind(prototypeOfObject.__defineSetter__);lookupGetter=call.bind(prototypeOfObject.__lookupGetter__);lookupSetter=call.bind(prototypeOfObject.__lookupSetter__)}if(!Object.getPrototypeOf){Object.getPrototypeOf=function getPrototypeOf(object){return object.__proto__||(object.constructor?object.constructor.prototype:prototypeOfObject)}}function doesGetOwnPropertyDescriptorWork(object){try{object.sentinel=0;return Object.getOwnPropertyDescriptor(object,"sentinel").value===0}catch(exception){}}if(Object.defineProperty){var getOwnPropertyDescriptorWorksOnObject=doesGetOwnPropertyDescriptorWork({});var getOwnPropertyDescriptorWorksOnDom=typeof document=="undefined"||doesGetOwnPropertyDescriptorWork(document.createElement("div"));if(!getOwnPropertyDescriptorWorksOnDom||!getOwnPropertyDescriptorWorksOnObject){var getOwnPropertyDescriptorFallback=Object.getOwnPropertyDescriptor}}if(!Object.getOwnPropertyDescriptor||getOwnPropertyDescriptorFallback){var ERR_NON_OBJECT="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function getOwnPropertyDescriptor(object,property){if(typeof object!="object"&&typeof object!="function"||object===null){throw new TypeError(ERR_NON_OBJECT+object)}if(getOwnPropertyDescriptorFallback){try{return getOwnPropertyDescriptorFallback.call(Object,object,property)}catch(exception){}}if(!owns(object,property)){return}var descriptor={enumerable:true,configurable:true};if(supportsAccessors){var prototype=object.__proto__;object.__proto__=prototypeOfObject;var getter=lookupGetter(object,property);var setter=lookupSetter(object,property);object.__proto__=prototype;if(getter||setter){if(getter){descriptor.get=getter}if(setter){descriptor.set=setter}return descriptor}}descriptor.value=object[property];descriptor.writable=true;return descriptor}}if(!Object.getOwnPropertyNames){Object.getOwnPropertyNames=function getOwnPropertyNames(object){return Object.keys(object)}}if(!Object.create){var createEmpty;var supportsProto=Object.prototype.__proto__===null;if(supportsProto||typeof document=="undefined"){createEmpty=function(){return{__proto__:null}}}else{createEmpty=function(){var iframe=document.createElement("iframe");var parent=document.body||document.documentElement;iframe.style.display="none";parent.appendChild(iframe);iframe.src="javascript:";var empty=iframe.contentWindow.Object.prototype;parent.removeChild(iframe);iframe=null;delete empty.constructor;delete empty.hasOwnProperty;delete empty.propertyIsEnumerable;delete empty.isPrototypeOf;delete empty.toLocaleString;delete empty.toString;delete empty.valueOf;empty.__proto__=null;function Empty(){}Empty.prototype=empty;createEmpty=function(){return new Empty};return new Empty}}Object.create=function create(prototype,properties){var object;function Type(){}if(prototype===null){object=createEmpty()}else{if(typeof prototype!=="object"&&typeof prototype!=="function"){throw new TypeError("Object prototype may only be an Object or null")}Type.prototype=prototype;object=new Type;object.__proto__=prototype}if(properties!==void 0){Object.defineProperties(object,properties)}return object}}function doesDefinePropertyWork(object){try{Object.defineProperty(object,"sentinel",{});return"sentinel"in object}catch(exception){}}if(Object.defineProperty){var definePropertyWorksOnObject=doesDefinePropertyWork({});var definePropertyWorksOnDom=typeof document=="undefined"||doesDefinePropertyWork(document.createElement("div"));if(!definePropertyWorksOnObject||!definePropertyWorksOnDom){var definePropertyFallback=Object.defineProperty,definePropertiesFallback=Object.defineProperties}}if(!Object.defineProperty||definePropertyFallback){var ERR_NON_OBJECT_DESCRIPTOR="Property description must be an object: ";var ERR_NON_OBJECT_TARGET="Object.defineProperty called on non-object: ";var ERR_ACCESSORS_NOT_SUPPORTED="getters & setters can not be defined "+"on this javascript engine";Object.defineProperty=function defineProperty(object,property,descriptor){if(typeof object!="object"&&typeof object!="function"||object===null){throw new TypeError(ERR_NON_OBJECT_TARGET+object)}if(typeof descriptor!="object"&&typeof descriptor!="function"||descriptor===null){throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR+descriptor)}if(definePropertyFallback){try{return definePropertyFallback.call(Object,object,property,descriptor)}catch(exception){}}if(owns(descriptor,"value")){if(supportsAccessors&&(lookupGetter(object,property)||lookupSetter(object,property))){var prototype=object.__proto__;object.__proto__=prototypeOfObject;delete object[property];object[property]=descriptor.value;object.__proto__=prototype}else{object[property]=descriptor.value}}else{if(!supportsAccessors){throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED)}if(owns(descriptor,"get")){defineGetter(object,property,descriptor.get)}if(owns(descriptor,"set")){defineSetter(object,property,descriptor.set)}}return object}}if(!Object.defineProperties||definePropertiesFallback){Object.defineProperties=function defineProperties(object,properties){if(definePropertiesFallback){try{return definePropertiesFallback.call(Object,object,properties)}catch(exception){}}for(var property in properties){if(owns(properties,property)&&property!="__proto__"){Object.defineProperty(object,property,properties[property])}}return object}}if(!Object.seal){Object.seal=function seal(object){return object}}if(!Object.freeze){Object.freeze=function freeze(object){return object}}try{Object.freeze(function(){})}catch(exception){Object.freeze=function freeze(freezeObject){return function freeze(object){if(typeof object=="function"){return object}else{return freezeObject(object)}}}(Object.freeze)}if(!Object.preventExtensions){Object.preventExtensions=function preventExtensions(object){return object}}if(!Object.isSealed){Object.isSealed=function isSealed(object){return false}}if(!Object.isFrozen){Object.isFrozen=function isFrozen(object){return false}}if(!Object.isExtensible){Object.isExtensible=function isExtensible(object){if(Object(object)!==object){throw new TypeError}var name="";while(owns(object,name)){name+="?"}object[name]=true;var returnValue=owns(object,name);delete object[name];return returnValue}}});
//# sourceMappingURL=es5-sham.map

!function(a){"use strict";var b=function(a,c,d){var e,f,g=document.createElement("img");if(g.onerror=c,g.onload=function(){!f||d&&d.noRevoke||b.revokeObjectURL(f),c&&c(b.scale(g,d))},b.isInstanceOf("Blob",a)||b.isInstanceOf("File",a))e=f=b.createObjectURL(a),g._type=a.type;else{if("string"!=typeof a)return!1;e=a,d&&d.crossOrigin&&(g.crossOrigin=d.crossOrigin)}return e?(g.src=e,g):b.readFile(a,function(a){var b=a.target;b&&b.result?g.src=b.result:c&&c(a)})},c=window.createObjectURL&&window||window.URL&&URL.revokeObjectURL&&URL||window.webkitURL&&webkitURL;b.isInstanceOf=function(a,b){return Object.prototype.toString.call(b)==="[object "+a+"]"},b.transformCoordinates=function(){},b.getTransformedOptions=function(a){return a},b.renderImageToCanvas=function(a,b,c,d,e,f,g,h,i,j){return a.getContext("2d").drawImage(b,c,d,e,f,g,h,i,j),a},b.hasCanvasOption=function(a){return a.canvas||a.crop},b.scale=function(a,c){c=c||{};var d,e,f,g,h,i,j,k,l,m=document.createElement("canvas"),n=a.getContext||b.hasCanvasOption(c)&&m.getContext,o=a.naturalWidth||a.width,p=a.naturalHeight||a.height,q=o,r=p,s=function(){var a=Math.max((f||q)/q,(g||r)/r);a>1&&(q=Math.ceil(q*a),r=Math.ceil(r*a))},t=function(){var a=Math.min((d||q)/q,(e||r)/r);1>a&&(q=Math.ceil(q*a),r=Math.ceil(r*a))};return n&&(c=b.getTransformedOptions(c),j=c.left||0,k=c.top||0,c.sourceWidth?(h=c.sourceWidth,void 0!==c.right&&void 0===c.left&&(j=o-h-c.right)):h=o-j-(c.right||0),c.sourceHeight?(i=c.sourceHeight,void 0!==c.bottom&&void 0===c.top&&(k=p-i-c.bottom)):i=p-k-(c.bottom||0),q=h,r=i),d=c.maxWidth,e=c.maxHeight,f=c.minWidth,g=c.minHeight,n&&d&&e&&c.crop?(q=d,r=e,l=h/i-d/e,0>l?(i=e*h/d,void 0===c.top&&void 0===c.bottom&&(k=(p-i)/2)):l>0&&(h=d*i/e,void 0===c.left&&void 0===c.right&&(j=(o-h)/2))):((c.contain||c.cover)&&(f=d=d||f,g=e=e||g),c.cover?(t(),s()):(s(),t())),n?(m.width=q,m.height=r,b.transformCoordinates(m,c),b.renderImageToCanvas(m,a,j,k,h,i,0,0,q,r)):(a.width=q,a.height=r,a)},b.createObjectURL=function(a){return c?c.createObjectURL(a):!1},b.revokeObjectURL=function(a){return c?c.revokeObjectURL(a):!1},b.readFile=function(a,b,c){if(window.FileReader){var d=new FileReader;if(d.onload=d.onerror=b,c=c||"readAsDataURL",d[c])return d[c](a),d}return!1},"function"==typeof define&&define.amd?define(function(){return b}):a.loadImage=b}(this),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image"],a):a(window.loadImage)}(function(a){"use strict";if(window.navigator&&window.navigator.platform&&/iP(hone|od|ad)/.test(window.navigator.platform)){var b=a.renderImageToCanvas;a.detectSubsampling=function(a){var b,c;return a.width*a.height>1048576?(b=document.createElement("canvas"),b.width=b.height=1,c=b.getContext("2d"),c.drawImage(a,-a.width+1,0),0===c.getImageData(0,0,1,1).data[3]):!1},a.detectVerticalSquash=function(a,b){var c,d,e,f,g,h=a.naturalHeight||a.height,i=document.createElement("canvas"),j=i.getContext("2d");for(b&&(h/=2),i.width=1,i.height=h,j.drawImage(a,0,0),c=j.getImageData(0,0,1,h).data,d=0,e=h,f=h;f>d;)g=c[4*(f-1)+3],0===g?e=f:d=f,f=e+d>>1;return f/h||1},a.renderImageToCanvas=function(c,d,e,f,g,h,i,j,k,l){if("image/jpeg"===d._type){var m,n,o,p,q=c.getContext("2d"),r=document.createElement("canvas"),s=1024,t=r.getContext("2d");if(r.width=s,r.height=s,q.save(),m=a.detectSubsampling(d),m&&(e/=2,f/=2,g/=2,h/=2),n=a.detectVerticalSquash(d,m),m||1!==n){for(f*=n,k=Math.ceil(s*k/g),l=Math.ceil(s*l/h/n),j=0,p=0;h>p;){for(i=0,o=0;g>o;)t.clearRect(0,0,s,s),t.drawImage(d,e,f,g,h,-o,-p,g,h),q.drawImage(r,0,0,s,s,i,j,k,l),o+=s,i+=k;p+=s,j+=l}return q.restore(),c}}return b(c,d,e,f,g,h,i,j,k,l)}}}),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image"],a):a(window.loadImage)}(function(a){"use strict";var b=a.hasCanvasOption;a.hasCanvasOption=function(a){return b(a)||a.orientation},a.transformCoordinates=function(a,b){var c=a.getContext("2d"),d=a.width,e=a.height,f=b.orientation;if(f)switch(f>4&&(a.width=e,a.height=d),f){case 2:c.translate(d,0),c.scale(-1,1);break;case 3:c.translate(d,e),c.rotate(Math.PI);break;case 4:c.translate(0,e),c.scale(1,-1);break;case 5:c.rotate(.5*Math.PI),c.scale(1,-1);break;case 6:c.rotate(.5*Math.PI),c.translate(0,-e);break;case 7:c.rotate(.5*Math.PI),c.translate(d,-e),c.scale(-1,1);break;case 8:c.rotate(-.5*Math.PI),c.translate(-d,0)}},a.getTransformedOptions=function(a){if(!a.orientation||1===a.orientation)return a;var b,c={};for(b in a)a.hasOwnProperty(b)&&(c[b]=a[b]);switch(a.orientation){case 2:c.left=a.right,c.right=a.left;break;case 3:c.left=a.right,c.top=a.bottom,c.right=a.left,c.bottom=a.top;break;case 4:c.top=a.bottom,c.bottom=a.top;break;case 5:c.left=a.top,c.top=a.left,c.right=a.bottom,c.bottom=a.right;break;case 6:c.left=a.top,c.top=a.right,c.right=a.bottom,c.bottom=a.left;break;case 7:c.left=a.bottom,c.top=a.right,c.right=a.top,c.bottom=a.left;break;case 8:c.left=a.bottom,c.top=a.left,c.right=a.top,c.bottom=a.right}return a.orientation>4&&(c.maxWidth=a.maxHeight,c.maxHeight=a.maxWidth,c.minWidth=a.minHeight,c.minHeight=a.minWidth,c.sourceWidth=a.sourceHeight,c.sourceHeight=a.sourceWidth),c}}),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image"],a):a(window.loadImage)}(function(a){"use strict";var b=window.Blob&&(Blob.prototype.slice||Blob.prototype.webkitSlice||Blob.prototype.mozSlice);a.blobSlice=b&&function(){var a=this.slice||this.webkitSlice||this.mozSlice;return a.apply(this,arguments)},a.metaDataParsers={jpeg:{65505:[]}},a.parseMetaData=function(b,c,d){d=d||{};var e=this,f=d.maxMetaDataSize||262144,g={},h=!(window.DataView&&b&&b.size>=12&&"image/jpeg"===b.type&&a.blobSlice);(h||!a.readFile(a.blobSlice.call(b,0,f),function(b){if(b.target.error)return console.log(b.target.error),c(g),void 0;var f,h,i,j,k=b.target.result,l=new DataView(k),m=2,n=l.byteLength-4,o=m;if(65496===l.getUint16(0)){for(;n>m&&(f=l.getUint16(m),f>=65504&&65519>=f||65534===f);){if(h=l.getUint16(m+2)+2,m+h>l.byteLength){console.log("Invalid meta data: Invalid segment size.");break}if(i=a.metaDataParsers.jpeg[f])for(j=0;j<i.length;j+=1)i[j].call(e,l,m,h,g,d);m+=h,o=m}!d.disableImageHead&&o>6&&(g.imageHead=k.slice?k.slice(0,o):new Uint8Array(k).subarray(0,o))}else console.log("Invalid JPEG file: Missing JPEG marker.");c(g)},"readAsArrayBuffer"))&&c(g)}}),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image","load-image-meta"],a):a(window.loadImage)}(function(a){"use strict";a.ExifMap=function(){return this},a.ExifMap.prototype.map={Orientation:274},a.ExifMap.prototype.get=function(a){return this[a]||this[this.map[a]]},a.getExifThumbnail=function(a,b,c){var d,e,f;if(!c||b+c>a.byteLength)return console.log("Invalid Exif data: Invalid thumbnail data."),void 0;for(d=[],e=0;c>e;e+=1)f=a.getUint8(b+e),d.push((16>f?"0":"")+f.toString(16));return"data:image/jpeg,%"+d.join("%")},a.exifTagTypes={1:{getValue:function(a,b){return a.getUint8(b)},size:1},2:{getValue:function(a,b){return String.fromCharCode(a.getUint8(b))},size:1,ascii:!0},3:{getValue:function(a,b,c){return a.getUint16(b,c)},size:2},4:{getValue:function(a,b,c){return a.getUint32(b,c)},size:4},5:{getValue:function(a,b,c){return a.getUint32(b,c)/a.getUint32(b+4,c)},size:8},9:{getValue:function(a,b,c){return a.getInt32(b,c)},size:4},10:{getValue:function(a,b,c){return a.getInt32(b,c)/a.getInt32(b+4,c)},size:8}},a.exifTagTypes[7]=a.exifTagTypes[1],a.getExifValue=function(b,c,d,e,f,g){var h,i,j,k,l,m,n=a.exifTagTypes[e];if(!n)return console.log("Invalid Exif data: Invalid tag type."),void 0;if(h=n.size*f,i=h>4?c+b.getUint32(d+8,g):d+8,i+h>b.byteLength)return console.log("Invalid Exif data: Invalid data offset."),void 0;if(1===f)return n.getValue(b,i,g);for(j=[],k=0;f>k;k+=1)j[k]=n.getValue(b,i+k*n.size,g);if(n.ascii){for(l="",k=0;k<j.length&&(m=j[k],"\x00"!==m);k+=1)l+=m;return l}return j},a.parseExifTag=function(b,c,d,e,f){var g=b.getUint16(d,e);f.exif[g]=a.getExifValue(b,c,d,b.getUint16(d+2,e),b.getUint32(d+4,e),e)},a.parseExifTags=function(a,b,c,d,e){var f,g,h;if(c+6>a.byteLength)return console.log("Invalid Exif data: Invalid directory offset."),void 0;if(f=a.getUint16(c,d),g=c+2+12*f,g+4>a.byteLength)return console.log("Invalid Exif data: Invalid directory size."),void 0;for(h=0;f>h;h+=1)this.parseExifTag(a,b,c+2+12*h,d,e);return a.getUint32(g,d)},a.parseExifData=function(b,c,d,e,f){if(!f.disableExif){var g,h,i,j=c+10;if(1165519206===b.getUint32(c+4)){if(j+8>b.byteLength)return console.log("Invalid Exif data: Invalid segment size."),void 0;if(0!==b.getUint16(c+8))return console.log("Invalid Exif data: Missing byte alignment offset."),void 0;switch(b.getUint16(j)){case 18761:g=!0;break;case 19789:g=!1;break;default:return console.log("Invalid Exif data: Invalid byte alignment marker."),void 0}if(42!==b.getUint16(j+2,g))return console.log("Invalid Exif data: Missing TIFF marker."),void 0;h=b.getUint32(j+4,g),e.exif=new a.ExifMap,h=a.parseExifTags(b,j,j+h,g,e),h&&!f.disableExifThumbnail&&(i={exif:{}},h=a.parseExifTags(b,j,j+h,g,i),i.exif[513]&&(e.exif.Thumbnail=a.getExifThumbnail(b,j+i.exif[513],i.exif[514]))),e.exif[34665]&&!f.disableExifSub&&a.parseExifTags(b,j,j+e.exif[34665],g,e),e.exif[34853]&&!f.disableExifGps&&a.parseExifTags(b,j,j+e.exif[34853],g,e)}}},a.metaDataParsers.jpeg[65505].push(a.parseExifData)}),function(a){"use strict";"function"==typeof define&&define.amd?define(["load-image","load-image-exif"],a):a(window.loadImage)}(function(a){"use strict";a.ExifMap.prototype.tags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright",36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",42240:"Gamma",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubSecTime",37521:"SubSecTimeOriginal",37522:"SubSecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"PhotographicSensitivity",34856:"OECF",34864:"SensitivityType",34865:"StandardOutputSensitivity",34866:"RecommendedExposureIndex",34867:"ISOSpeed",34868:"ISOSpeedLatitudeyyy",34869:"ISOSpeedLatitudezzz",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRatio",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",42016:"ImageUniqueID",42032:"CameraOwnerName",42033:"BodySerialNumber",42034:"LensSpecification",42035:"LensMake",42036:"LensModel",42037:"LensSerialNumber",0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential",31:"GPSHPositioningError"},a.ExifMap.prototype.stringValues={ExposureProgram:{0:"Undefined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Undefined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},ComponentsConfiguration:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"},Orientation:{1:"top-left",2:"top-right",3:"bottom-right",4:"bottom-left",5:"left-top",6:"right-top",7:"right-bottom",8:"left-bottom"}},a.ExifMap.prototype.getText=function(a){var b=this.get(a);switch(a){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":case"Orientation":return this.stringValues[a][b];case"ExifVersion":case"FlashpixVersion":return String.fromCharCode(b[0],b[1],b[2],b[3]);case"ComponentsConfiguration":return this.stringValues[a][b[0]]+this.stringValues[a][b[1]]+this.stringValues[a][b[2]]+this.stringValues[a][b[3]];case"GPSVersionID":return b[0]+"."+b[1]+"."+b[2]+"."+b[3]}return String(b)},function(a){var b,c=a.tags,d=a.map;for(b in c)c.hasOwnProperty(b)&&(d[c[b]]=b)}(a.ExifMap.prototype),a.ExifMap.prototype.getAll=function(){var a,b,c={};for(a in this)this.hasOwnProperty(a)&&(b=this.tags[a],b&&(c[b]=this.getText(b)));return c}});

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


var pathvisioNS = pathvisioNS || {};
pathvisioNS["src/pathvisiojs.html"] = '<div id="pathvisiojs-container" style="width: inherit; height: inherit;">\n\n  <!-- **********************************************************************\n    Pathway Container (JavaScript inserts pathway image inside this div)\n    *********************************************************************** -->\n  <div id="diagram-container">\n  </div>\n\n  <!-- **********************************************************************\n    Highlight Element by Label Control\n    *********************************************************************** -->\n  <div id="typeahead">\n    <input id="highlight-by-label-input" placeholder="Enter node name to highlight" role="textbox" aria-autocomplete="list" aria-haspopup="true">\n    <i id="clear-highlights-from-typeahead" class="control-icon icon-remove"></i>\n  </div> \n\n  <!-- **********************************************************************\n    Pan/Zoom Controls \n    *********************************************************************** -->\n  <div id="pan-zoom-control" class="pan-zoom-controls">                           \n    <!-- TODO get this working\n    <i id="zoom-in" class="control-icon pan-zoom-control-icon glyphicon glyphicon-plus-sign"></i>\n    -->\n    <i id="reset-pan-zoom" class="control-icon pan-zoom-control-icon glyphicon glyphicon-screenshot"></i>\n    <!-- TODO get this working\n    <i id="zoom-out" class="control-icon pan-zoom-control-icon glyphicon glyphicon-minus-sign"></i>\n    -->\n    <!-- TODO get this working\n    <i id="full-screen-control" class="control-icon pan-zoom-control-icon glyphicon glyphicon-fullscreen"></i>\n    -->\n  </div>\n\n  <div id="viewer-toolbar">\n  </div>\n\n  <!-- **********************************************************************\n    Details Frame\n    *********************************************************************** -->\n  <div id="annotation" class="annotation ui-draggable">\n    <header class="annotation-header">\n      <span id="annotation-move" class="annotation-header-move">\n        <i class="icon-move"></i>\n      </span>\n      <span class="annotation-header-close" class="annotation-header-close">\n        <i class="icon-remove"></i>\n      </span>   \n      <span id="annotation-header-text" class="annotation-header-text">\n        Header\n      </span> \n      <span id="annotation-header-search" class="annotation-header-search" title="Search for pathways containing \'Header Text\'">\n        <a href="http://wikipathways.org//index.php?title=Special:SearchPathways">\n          <i class="icon-search"></i>\n        </a>\n      </span>\n      <div id="annotation-description" class="annotation-description">\n        <h2>description</h2>\n      </div>\n    </header>\n    <span class="annotation-items-container" class="annotation-items-container">\n      <ul id="annotation-items-container">\n        <!-- List items inside this ul element are generated automatically by JavaScript.\n            Each item will be composed of a title and text. The text can be set to be an href.\n            You can edit the styling of the title by editing CSS class "annotation-item-title"\n            and the styling of the text by editing CSS class "annotation-item-text.\n            -->\n      </ul>\n    </span>\n  </div>\n</div>\n';
pathvisioNS["tmp/pathvisiojs.svg"] = '<svg id="pathvisiojs-diagram" version="1.1" baseProfile="full" xmlns="http://www.w3.org/1999/xlink" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:ev="http://www.w3.org/2001/xml-events" width="100%" height="100%" style="display: none; width: inherit; min-width: inherit; max-width: inherit; height: inherit; min-height: inherit; max-height: inherit; " preserveAspectRatio="xMidYMid" onmouseup="svgPanZoom.handleMouseUp(evt)" onmousedown="svgPanZoom.handleMouseDown(evt)" onmousemove="svgPanZoom.handleMouseMove(evt)" onmouseleave="svgPanZoom.handleMouseUp(evt)" xlink="http://www.w3.org/1999/xlink" ev="http://www.w3.org/2001/xml-events"><g><desc>This SVG file contains all the graphical elements (markers and symbols in defs as well as\nstyle data) used by the program pathvisiojs, which has two components:\n1) a viewer for transforming GPML biological pathway data into an SVG visual representation and\n2) an editor for creating both views and models for biological pathways.</desc></g><title>pathvisiojs diagram</title><defs><marker id="shape-library-markers-arrow-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-arrow-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- arrow markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-arrow-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-arrow-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- arrow markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-necessary-stimulation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 16 12" markerWidth="16" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-necessary-stimulation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-necessary-stimulation markers: triangular polygons, drawing-board fill, default color stroke; and vertical line -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line fill="none" stroke-width="1" x1="14" y1="0" x2="14" y2="12"></line>\n	<line fill="none" stroke="none" x1="16" y1="6" x2="16" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 9,11 9,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-necessary-stimulation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 16 12" markerWidth="16" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="16" refY="6"><g id="g-src-shape-library-markers-mim-necessary-stimulation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 8, 6)">\n\n	<!-- mim-necessary-stimulation markers: triangular polygons, drawing-board fill, default color stroke; and vertical line -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line fill="none" stroke-width="1" x1="14" y1="0" x2="14" y2="12"></line>\n	<line fill="none" stroke="none" x1="16" y1="6" x2="16" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 9,11 9,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-binding-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-binding-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-binding markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-binding-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-binding-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-binding markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-conversion-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-conversion-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-conversion markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-conversion-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-conversion-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-conversion markers: triangular polygons, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,11 0,6 12,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-stimulation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-stimulation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-stimulation markers: triangular polygons, drawing-board fill, default color stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line stroke="none" fill="none" x1="12" y1="6" x2="12" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 11,11 11,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-stimulation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-stimulation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-stimulation markers: triangular polygons, drawing-board fill, default color stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<line stroke="none" fill="none" x1="12" y1="6" x2="12" y2="6"></line> <!-- dummy point -->\n	<polygon stroke-width="1" points="0,6 11,11 11,1"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-modification-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-modification-svg-start-default" class="default-fill-color solid-stroke">\n\n	<!-- mim-modification markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-modification-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-modification-svg-end-default" class="default-fill-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-modification markers: four-point polygon, no stroke -->\n\n	<rect class="board-fill-color" stroke="none" x="0" y="5.4" width="2" height="1.2"></rect>\n	<polygon stroke-width="0" points="12,12 0,6 12,0 5,6 "></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-catalysis-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-catalysis-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-catalysis markers: circle, drawing-board fill and default color stroke -->\n\n	<circle cx="6.0" cy="6" r="5.3px" stroke-width="1px"></circle>\n\n</g></marker><marker id="shape-library-markers-mim-catalysis-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-catalysis-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-catalysis markers: circle, drawing-board fill and default color stroke -->\n\n	<circle cx="6.0" cy="6" r="5.3px" stroke-width="1px"></circle>\n\n</g></marker><marker id="shape-library-markers-mim-inhibition-svg-start-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="0" refY="10"><g id="g-src-shape-library-markers-mim-inhibition-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-inhibition markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-mim-inhibition-svg-end-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="10" refY="10"><g id="g-src-shape-library-markers-mim-inhibition-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 5, 10)">\n\n	<!-- mim-inhibition markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-mim-cleavage-svg-start-default" preserveAspectRatio="none" viewBox="0 0 20 30" markerWidth="20" markerHeight="30" markerUnits="strokeWidth" orient="auto" refX="9" refY="15"><g id="g-src-shape-library-markers-mim-cleavage-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-cleavage markers: two lines and extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="14.3" width="18.4" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="18" y1="14.5" x2="18" y2="30"></line>	\n	<line fill="none" stroke-width="1" x1="18" y1="30" x2="0" y2="0"></line>	\n\n\n</g></marker><marker id="shape-library-markers-mim-cleavage-svg-end-default" preserveAspectRatio="none" viewBox="0 0 20 30" markerWidth="20" markerHeight="30" markerUnits="strokeWidth" orient="auto" refX="10" refY="15"><g id="g-src-shape-library-markers-mim-cleavage-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 10, 15)">\n\n	<!-- mim-cleavage markers: two lines and extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="14.3" width="18.4" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="18" y1="14.5" x2="18" y2="30"></line>	\n	<line fill="none" stroke-width="1" x1="18" y1="30" x2="0" y2="0"></line>	\n\n\n</g></marker><marker id="shape-library-markers-mim-covalent-bond-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="-0.5" refY="6"><g id="g-src-shape-library-markers-mim-covalent-bond-svg-start-default" class="solid-stroke default-fill-color">\n\n	<!-- mim-covalent-bond markers: not much to see here! -->\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-covalent-bond-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="11" refY="6"><g id="g-src-shape-library-markers-mim-covalent-bond-svg-end-default" class="solid-stroke default-fill-color" transform="rotate(180, 6, 6)">\n\n	<!-- mim-covalent-bond markers: not much to see here! -->\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-transcription-translation-svg-start-default" preserveAspectRatio="none" viewBox="0 0 20 24" markerWidth="20" markerHeight="24" markerUnits="strokeWidth" orient="auto" refX="0" refY="12"><g id="g-src-shape-library-markers-mim-transcription-translation-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-transcription-translation markers: two lines and an open trigular polygon, plus extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="11" width="12" height="2"></rect>\n	<line fill="none" stroke-width="1" x1="15" y1="12" x2="15" y2="5"></line>\n	<line fill="none" stroke-width="1" x1="15.5" y1="5" x2="8" y2="5"></line>\n	<polygon stroke-width="1" points="0,5 8,1 8,9"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-transcription-translation-svg-end-default" preserveAspectRatio="none" viewBox="0 0 20 24" markerWidth="20" markerHeight="24" markerUnits="strokeWidth" orient="auto" refX="20" refY="12"><g id="g-src-shape-library-markers-mim-transcription-translation-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 10, 12)">\n\n	<!-- mim-transcription-translation markers: two lines and an open trigular polygon, plus extended drawing-board rect -->\n\n	<rect stroke="none" x="0" y="11" width="12" height="2"></rect>\n	<line fill="none" stroke-width="1" x1="15" y1="12" x2="15" y2="5"></line>\n	<line fill="none" stroke-width="1" x1="15.5" y1="5" x2="8" y2="5"></line>\n	<polygon stroke-width="1" points="0,5 8,1 8,9"></polygon>\n\n</g></marker><marker id="shape-library-markers-mim-gap-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-mim-gap-svg-start-default" class="board-fill-color solid-stroke">\n\n	<!-- mim-gap markers: just an extended drawing-board rect -->\n	<!-- \n	TODO This could be refactored to make the shape match the viewbox.\n	It can overlap the side of the shape, blanking out a small part of it when the edge is at an angle.\n	-->\n\n	<rect stroke="none" x="0" y="5.3" width="8" height="1.4"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-gap-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="12" refY="6"><g id="g-src-shape-library-markers-mim-gap-svg-end-default" class="board-fill-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-gap markers: just an extended drawing-board rect -->\n	<!-- \n	TODO This could be refactored to make the shape match the viewbox.\n	It can overlap the side of the shape, blanking out a small part of it when the edge is at an angle.\n	-->\n\n	<rect stroke="none" x="0" y="5.3" width="8" height="1.4"></rect>\n\n</g></marker><marker id="shape-library-markers-t-bar-svg-start-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="0" refY="10"><g id="g-src-shape-library-markers-t-bar-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n        <!-- t-bar markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-t-bar-svg-end-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="10" refY="10"><g id="g-src-shape-library-markers-t-bar-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 5, 10)">\n\n        <!-- t-bar markers: vertical line; and extended drawing-board rect -->\n	\n	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>\n	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>\n\n</g></marker><marker id="shape-library-markers-none-svg-start-default" preserveAspectRatio="none" viewBox="0 0 0 0" markerWidth="0" markerHeight="0" markerUnits="strokeWidth" orient="auto" refX="0" refY="6"><g id="g-src-shape-library-markers-none-svg-start-default" class="board-fill-color board-stroke-color node shape">\n\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-none-svg-end-default" preserveAspectRatio="none" viewBox="0 0 0 0" markerWidth="0" markerHeight="0" markerUnits="strokeWidth" orient="auto" refX="11" refY="6"><g id="g-src-shape-library-markers-none-svg-end-default" class="board-fill-color board-stroke-color node shape" transform="rotate(180, 0, 0)">\n\n	<rect x="0" y="0" width="0" height="0" stroke="none" fill="none" stroke-width="0"></rect>\n\n</g></marker><marker id="shape-library-markers-mim-branching-left-svg-start-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0.4" refY="6"><g id="g-src-shape-library-markers-mim-branching-left-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-branching-left markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="3.9" y1="6.2" x2="0.2" y2="0"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-left-svg-end-default" preserveAspectRatio="none" viewBox="0 0 12 12" markerWidth="12" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="11.6" refY="6"><g id="g-src-shape-library-markers-mim-branching-left-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 6, 6)">\n\n	<!-- mim-branching-left markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="3.9" y1="6.2" x2="0.2" y2="0"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-right-svg-start-default" preserveAspectRatio="none" viewBox="0 0 4 12" markerWidth="4" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="0.4" refY="6"><g id="g-src-shape-library-markers-mim-branching-right-svg-start-default" class="board-fill-color default-stroke-color solid-stroke">\n\n	<!-- mim-branching-right markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="0.2" y1="12" x2="3.9" y2="5.8"></line>	\n\n</g></marker><marker id="shape-library-markers-mim-branching-right-svg-end-default" preserveAspectRatio="none" viewBox="0 0 4 12" markerWidth="4" markerHeight="12" markerUnits="strokeWidth" orient="auto" refX="3.6" refY="6"><g id="g-src-shape-library-markers-mim-branching-right-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 2, 6)">\n\n	<!-- mim-branching-right markers: line and extended drawing-board rect -->\n\n	<rect stroke="none" x="0.4" y="5.3" width="3.1" height="1.4"></rect>\n	<line fill="none" stroke-width="1" x1="0.2" y1="12" x2="3.9" y2="5.8"></line>	\n\n</g></marker><style type="text/css">	svg {\n		color-interpolation: auto;\n		image-rendering: auto;\n		shape-rendering: auto;\n		vector-effect: non-scaling-stroke;\n                background: white;\n	/* removed fill and stroke since they override marker specs */\n	/*	fill: white;\n    		stroke: black; */\n	}\n\n	/* default color for pathway elements */\n	.default-fill-color {\n		fill: black; \n	}\n	.default-stroke-color {\n		stroke: black;\n	}\n	\n	/* default color of the background drawing board */ 	\n	.board-fill-color {\n		fill: white;\n	}\n	.board-stroke-color {\n		stroke: white;\n	}\n\n	.text-area {\n		font-family: Sans-Serif, Helvetica, Arial;\n		text-align: center;\n		vertical-align: middle;\n		font-size: 10px;\n		fill: black;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.citation {\n		font-family: Sans-Serif, Helvetica, Arial;\n		text-align: center;\n		vertical-align: top;\n		font-size: 7px;\n		fill: #999999;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.info-box {\n		font-family: Sans-Serif;\n		font-size: 10px;\n		fill: black;\n		stroke: none;\n		text-align: left;\n		vertical-align: top;\n	}\n\n	.info-box-item-property-name {\n		font-weight: bold;\n	}\n\n	.info-box-item-property-value {\n	}\n\n	.data-node {\n		text-align: right;\n		fill-opacity: 1;\n		fill: white;\n		stroke: black;\n		stroke-width: 1;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n    		pointer-events:auto;\n	}\n	.data-node:hover {\n	 	cursor: pointer;\n	}\n	\n	.has-xref:hover {\n		cursor: pointer;\n	}\n\n	.data-node.gene-product {\n	}\n\n	.metabolite {\n		stroke: blue;\n	}\n\n	.data-node.metabolite &gt; .text-area {\n		fill: blue;\n		fill-opacity: 1;\n		stroke: none;\n	}\n\n	.data-node.pathway {\n		stroke: none;\n		fill-opacity: 0;\n	}\n\n	.data-node.pathway &gt; .text-area {\n		fill: rgb(20,150,30);\n		fill-opacity: 1;\n		font-size: 12px;\n		font-weight: bold;\n	}\n\n	.data-node.protein {\n	}\n\n	.data-node.rna {\n	}\n\n	.data-node.unknown {\n	}\n\n	.label {\n		stroke: null;\n		stroke-width: 0;\n		fill-opacity: 0;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	.shape {\n		fill-opacity: 0;\n		stroke: black;\n		stroke-dasharray: 0;\n		stroke-miterlimit: 1;\n	}\n\n	.shape.none {\n		fill: none;\n		fill-opacity: 0;\n		stroke: none;\n	}\n\n	g.group-node &gt; .shape {\n		fill-opacity: 0.098;\n		stroke: gray;\n		stroke-miterlimit: 1;\n		stroke-width: 1px;\n    		pointer-events:none;\n	}\n\n	.group-node {\n		fill-opacity: 0.098;\n		stroke: gray;\n		stroke-miterlimit: 1;\n		stroke-width: 1px;\n    		pointer-events:none;\n	}\n\n	.group-node &gt; .text-area {\n		fill-opacity: 0.4;\n		font-family: Serif, Times;\n		font-size: 32px;\n		fill: black;\n		stroke-width: 0;\n		font-weight: bold;\n  	}	\n\n	.group-node.none {\n		fill: rgb(180,180,100);\n		stroke-dasharray: 5,3;\n	}\n\n	.group-node.none &gt; .text-area {\n		display: none;\n  	}	\n\n	/*.group-node.none:hover {\n		fill: rgb(255,180,100);\n		fill-opacity: 0.05;\n	}*/\n\n	.group-node.group {\n		fill-opacity: 0;\n		stroke: none;\n	}\n\n	.group-node.group &gt; .text-area {\n		display: none;\n  	}\n	/*.group-node.group:hover {\n		fill: rgb(0,0,255);\n		stroke-width: 1px;\n		stroke-dasharray: 5,3;\n		stroke: gray;\n		fill-opacity: 0.1;\n	}*/\n\n	.group-node.complex {\n		fill: rgb(180,180,100);\n	}\n\n	.group-node.complex &gt; .text-area {\n		display: none;\n  	}\n	/*.group-node.complex:hover {\n		fill: rgb(255,0,0);\n		fill-opacity: 0.05;\n	}*/	\n\n  	.group-node.pathway {\n		fill: rgb(0,255,0);\n		stroke-dasharray: 5,3;\n	}\n	/*.group-node.pathway:hover {\n		fill: rgb(0,255,0);\n		fill-opacity: 0.2;\n	}*/\n	.group-node.pathway &gt; .text-area {\n		fill: rgb(20,150,30);\n		stroke: rgb(20,150,30);\n  }\n\n  .cellular-component {\n		fill-opacity: 0;\n		stroke: silver;\n	}\n\n  .graphical-line {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	.interaction {\n		fill:none;\n		stroke: black; \n		stroke-width: 1px; \n	}\n\n	marker {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n  .marker-end {\n    -webkit-transform: rotate(180deg);\n    -webkit-transform-origin: 50% 50%;\n\n    -o-transform: rotate(180deg); \n    -o-transform-origin: 50% 50%;\n\n    transform: rotate(180deg);\n    transform-origin: 50% 50%;\n  }\n\n	.solid-stroke {\n		/* this is what should work per the spec\n		   stroke-dasharray: none; */\n		/* but I need to add this to make it work in Safari */\n		stroke-dasharray: 9999999999999999999999999;\n	}\n\n	.dashed-stroke {\n		stroke-dasharray: 5,3;\n	}\n\n  .highlighted-node {\n		fill: yellow;\n    fill-opacity: 0.2;\n		stroke: orange; \n    stroke-width: 3px;\n  }\n</style></defs><filter id="highlight" width="150%" height="150%"><feOffset result="offOut" in="SourceGraphic" dx="30" dy="30"></feOffset><feGaussianBlur result="blurOut" in="offOut" stdDeviation="10"></feGaussianBlur><feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend></filter><g id="viewport" transform="matrix(0.9264531435349941, 0, 0, 0.9264531435349941, 607.8902728351127, 20) "></g></svg>\n';


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

var pathvisiojs = function(){
  'use strict';

  var svg, pathway, args;

  function load(args) {
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
      pathvisiojs.view.pathwayDiagram.load(args);
    });
  }

  return {
    load:load
  };
}();


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


pathvisiojs.data = function(){
  'use strict';

  // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
  // GPML or has no type specified, into JSON.
  // TODO Later, this functionality can be extended to include other data types and
  // to test for data type when it is not specified.
  function get(sourceData, callback) {
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
      pathvisiojs.data.gpml.get(sourceData, function(gpml) {
        pathvisiojs.data.gpml.toPvjson(gpml, uri, function(json) {
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




pathvisiojs.data.bridgedb = function(){
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


pathvisiojs.data.biopax = function(){
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



pathvisiojs.data.pvjson = function(){
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
      pathvisiojs.data.gpml.get(renderableSourceDataElement, function(gpml) {
        pathvisiojs.data.gpml.toPvjson(gpml, uri, function(json) {
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




pathvisiojs.data.gpml = function(){
  'use strict';

  var defaults = {
    'FontSize':{
      'Type':"FontSize",
      'Value':10
    }
  };

  function get(sourceData, callback) {
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
          callback(gpml);
        });
      }
      else {
        async.waterfall([
          function(callbackInside) {
            if (!$) {
              // TODO should we use requirejs for loading scripts instead?
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
  }

  function gpmlColorToCssColorNew(gpmlColor) {
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


  function gpmlColorToCssColor(gpmlColor, pathvisioDefault) {
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
  }

  function setColorAsJsonNew(jsonElement, currentGpmlColorValue) {
    var jsonColor = gpmlColorToCssColorNew(currentGpmlColorValue);
    jsonElement.color = jsonColor;
    jsonElement.borderColor = jsonColor;
    if (jsonElement.hasOwnProperty('text')) {
      jsonElement.text.color = jsonColor;
    }
    return jsonElement;
  }

  function setColorAsJson(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
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
  }

  // TODO can we delete this function?

  function getLineStyle(gpmlElement) {
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
  }

  function getBorderStyleNew(gpmlLineStyle) {

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
  }
  function getBorderStyle(gpmlLineStyle, pathvisioDefault) {

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
  }

  function setBorderStyleAsJsonNew(jsonElement, currentGpmlLineStyleValue) {
    var borderStyle = getBorderStyleNew(currentGpmlLineStyleValue);
    jsonElement.borderStyle = borderStyle;
    return jsonElement;
  }

  function setBorderStyleAsJson(jsonElement, currentGpmlLineStyleValue, defaultGpmlLineStyleValue) {
    var borderStyle;

    // this check happens twice because it doesn't make sense to have getBorderStyle() tell us
    // whether it has returned the default value, and we need to know whether we are using the
    // default here.

    if (currentGpmlLineStyleValue !== defaultGpmlLineStyleValue) {
      borderStyle = getBorderStyle(currentGpmlLineStyleValue, defaultGpmlLineStyleValue);
      jsonElement.borderStyle = borderStyle;
    }
    return jsonElement;
  }

  function toPvjson(gpml, pathwayIri, callbackOutside){
    var gpmlPathway = d3.select(gpml);
    //var gpmlPathway = d3.select(gpml).select('Pathway');

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    console.log('GPML');
    console.log(gpml);

    var pathway = {};
    pathway.xmlns = gpmlPathway.attr('xmlns');
    pathway.nodes = [];
    pathway.edges = [];
    pathway.elements = [];

    // test for whether file is GPML

    if ( pathvisiojs.data.gpml.namespaces.indexOf(pathway.xmlns) !== -1 ) {

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisiojs).

      if (pathvisiojs.data.gpml.namespaces.indexOf(pathway.xmlns) !== 0) {

        // TODO call the Java RPC updater or in some other way call for the file to be updated.

        callbackOutside('fail');
        //alert('Pathvisiojs may not fully support the version of GPML provided (xmlns: ' + pathway.xmlns + '). Please convert to the supported version of GPML (xmlns: ' + pathvisiojs.data.gpml.namespaces[0] + ').');
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
              'x':'css2:visuren.html#propdef-left',
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
            pathvisiojs.data.gpml.biopaxRef.getAllAsPvjson(gpmlPathway, function(publicationXrefs) {
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
            var jsonDataSource = gpmlPathway.attr('Data-Source');
            if (!!jsonDataSource) {
              pathway.DataSource = jsonDataSource;
              callback(null, 'DataSource converted.');
            }
            else {
              callback(null, 'No DataSource to convert.');
            }
          },
          Version: function(callback){
            var jsonVersion = gpmlPathway.attr('Version');
            if (!!jsonVersion) {
              pathway.Version = jsonVersion;
              callback(null, 'Version converted.');
            }
            else {
              callback(null, 'No Version to convert.');
            }
          },
          Author: function(callback){
            var jsonAuthor = gpmlPathway.attr('Author');
            if (!!jsonAuthor) {
              pathway.Author = jsonAuthor;
              callback(null, 'Author converted.');
            }
            else {
              callback(null, 'No Author to convert.');
            }
          },
          Maintainer: function(callback){
            var jsonMaintainer = gpmlPathway.attr('Maintainer');
            if (!!jsonMaintainer) {
              pathway.Maintainer = jsonMaintainer;
              callback(null, 'Maintainer converted.');
            }
            else {
              callback(null, 'No Maintainer to convert.');
            }
          },
          Email: function(callback){
            var jsonEmail = gpmlPathway.attr('Email');
            if (!!jsonEmail) {
              pathway.Email = jsonEmail;
              callback(null, 'Email converted.');
            }
            else {
              callback(null, 'No Email to convert.');
            }
          },
          LastModified: function(callback){
            var jsonLastModified = gpmlPathway.attr('Last-Modified');
            if (!!jsonLastModified) {
              pathway.LastModified = jsonLastModified;
              callback(null, 'LastModified converted.');
            }
            else {
              callback(null, 'No LastModified to convert.');
            }
          },
          License: function(callback){
            var jsonLicense = gpmlPathway.attr('License');
            if (!!jsonLicense) {
              pathway.License = jsonLicense;
              callback(null, 'License converted.');
            }
            else {
              callback(null, 'No License to convert.');
            }
          },
          Name: function(callback){
            var jsonName = gpmlPathway.attr('Name');
            if (!!jsonName) {
              pathway.Name = jsonName;
              callback(null, 'Name converted.');
            }
            else {
              callback(null, 'No Name to convert.');
            }
          },
          Organism: function(callback){
            var jsonOrganism = gpmlPathway.attr('Organism');
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
              'width':parseFloat(gpmlPathway.select('Graphics').attr('BoardWidth')),
              'height':parseFloat(gpmlPathway.select('Graphics').attr('BoardHeight'))
            };
            callback(null, pathway.image);
          },
          Biopax: function(callback){
            var xmlBiopax = gpmlPathway.selectAll('Biopax');
            if (xmlBiopax[0].length > 0) {
              pathvisiojs.data.biopax.toPvjson(xmlBiopax, function(jsonBiopax) {
                pathway.Biopax = jsonBiopax;
              });
              callback(null, 'Biopax all converted.');
            }
            else {
              callback(null, 'No Biopax to convert.');
            }
          },
          DataNode: function(callback){
            var gpmlDataNode, dataNodes = gpmlPathway.selectAll('DataNode');
            if (dataNodes[0].length > 0) {
              pathway.DataNode = [];
              dataNodes.each(function() {
                gpmlDataNode = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.dataNode.toPvjson(gpmlDataNode, function(jsonDataNode) {
                  pathway.DataNode.push(jsonDataNode);
                  pathway.nodes = pathway.nodes.concat(jsonDataNode);
                  pathway.elements = pathway.elements.concat(jsonDataNode);
                });
              });
              callback(null, 'DataNodes are all converted.');
            }
            else {
              callback(null, 'No dataNodes to convert.');
            }
          },
          Label: function(callback){
            var gpmlLabel, labels = gpmlPathway.selectAll('Label');
            if (labels[0].length > 0) {
              pathway.Label = [];
              gpmlPathway.selectAll('Label').each(function() {
                gpmlLabel = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.label.toPvjson(gpmlLabel, function(jsonLabel) {
                  pathway.Label.push(jsonLabel);
                  pathway.nodes = pathway.nodes.concat(jsonLabel);
                  pathway.elements = pathway.elements.concat(jsonLabel);
                });
              });
              callback(null, 'Labels are all converted.');
            }
            else {
              callback(null, 'No labels to convert.');
            }
          },
          Shape: function(callback){
            var gpmlShape, shapes = gpmlPathway.selectAll('Shape');
            if (shapes[0].length > 0) {
              pathway.Shape = [];
              gpmlPathway.selectAll('Shape').each(function() {
                gpmlShape = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.shape.toPvjson(gpmlShape, function(jsonShape) {
                  pathway.Shape.push(jsonShape);
                  pathway.nodes = pathway.nodes.concat(jsonShape);
                  pathway.elements = pathway.elements.concat(jsonShape);
                });
              });
              callback(null, 'Shapes are all converted.');
            }
            else {
              callback(null, 'No shapes to convert.');
            }
          },
          Group: function(callback){
            // Note: this calculates all the data for each group-node, except for its dimensions.
            // The dimenensions can only be calculated once all the rest of the elements have been
            // converted from GPML to JSON.
            var gpmlGroup, groups = gpmlPathway.selectAll('Group');
            if (groups[0].length > 0) {
              pathway.Group = [];
              gpmlPathway.selectAll('Group').each(function() {
                gpmlGroup = d3.select(this);
                pathvisiojs.data.gpml.element.node.groupNode.toPvjson(gpml, gpmlGroup, function(jsonGroup) {
                  pathway.Group.push(jsonGroup);
                  pathway.nodes = pathway.nodes.concat(jsonGroup);
                });
              });
              callback(null, 'Groups are all converted.');
            }
            else {
              callback(null, 'No groups to convert.');
            }
          },
          //*
          GraphicalLine: function(callback){
            var gpmlGraphicalLine, graphicalLines = gpmlPathway.selectAll('GraphicalLine');
            if (graphicalLines[0].length > 0) {
              pathway.GraphicalLine = [];
              gpmlPathway.selectAll('GraphicalLine').each(function() {
                gpmlGraphicalLine = d3.select(this);
                pathvisiojs.data.gpml.edge.graphicalLine.toPvjson(gpml, gpmlGraphicalLine, function(jsonGraphicalLine) {
                  pathway.GraphicalLine.push(jsonGraphicalLine);
                  pathway.edges = pathway.edges.concat(jsonGraphicalLine);
                  pathway.elements = pathway.elements.concat(jsonGraphicalLine);
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
            var gpmlInteraction, interactions = gpmlPathway.selectAll('Interaction');
            if (interactions[0].length > 0) {
              pathway.Interaction = [];
              gpmlPathway.selectAll('Interaction').each(function() {
                gpmlInteraction = d3.select(this);
                pathvisiojs.data.gpml.edge.interaction.toPvjson(gpml, gpmlInteraction, function(jsonInteraction) {
                  pathway.Interaction.push(jsonInteraction);
                  pathway.edges = pathway.edges.concat(jsonInteraction);
                  pathway.elements = pathway.elements.concat(jsonInteraction);
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
        var groupsFrame, jsonGroups = [];
        if (!!pathway.Group) {
          groupsFrame = {
            '@context': pathway['@context'],
            '@type': 'GroupNode',
            'contains': {}
          };
          jsonld.frame(pathway, groupsFrame, function(err, framedGroups) {
            async.waterfall([
              function(callbackInside){
                framedGroups['@graph'].forEach(function(jsonGroup) {
                  // Some GPML files contain empty groups due to a PathVisio-Java bug. They are deleted
                  // here because only groups that pass the test (!!jsonGroup.contains) are added to
                  // the jsonGroups array, and the jsonGroups array overwrites pathway.Group.
                  if (!!jsonGroup.contains) {
                    pathvisiojs.data.gpml.element.node.groupNode.getGroupDimensions(jsonGroup, function(dimensions) {
                      jsonGroup.x = dimensions.x;
                      jsonGroup.y = dimensions.y;
                      jsonGroup.width = dimensions.width;
                      jsonGroup.height = dimensions.height;
                      jsonGroup.zIndex = dimensions.zIndex;
                      pathvisiojs.data.gpml.element.node.getPorts(jsonGroup, function(ports) {
                        jsonGroup.Port = ports;
                        if (jsonGroups.indexOf(jsonGroup) === -1) {
                          jsonGroups.push(jsonGroup);
                        }
                      });
                    });
                  }
                });
                callbackInside(null, jsonGroups);
              },
              function(jsonGroups, callbackInside){
                pathway.Group = jsonGroups;
                pathway.elements = pathway.elements.concat(pathway.Group);

                var relativeZIndexByRenderableType = {
                  'GroupNode': 0,
                  'Interaction': 1,
                  'GraphicalLine': 2,
                  'Anchor': 3,
                  'EntityNode': 4
                };

                // sort by explicitly set z-index for all elements except GroupNodes, which use the lowest z-index
                // of their contained elements, and anchors, which use their parent element's z-index
                //TODO check whether anchors have been set to have a z-index
                pathway.elements.sort(function(a, b) {
                  var aPriority, bPriority;
                  if (a.zIndex !== b.zIndex) {
                    // if two elements have the same z-index,
                    // they will be sub-sorted by renderableElementType priority,
                    // as indicated in relativeZIndexByRenderableType
                    aPriority = a.zIndex + relativeZIndexByRenderableType[a.renderableType];
                    bPriority = b.zIndex + relativeZIndexByRenderableType[b.renderableType];
                  }
                  else {
                    aPriority = a.zIndex;
                    bPriority = b.zIndex;
                  }
                  return aPriority - bPriority;
                });
                callbackInside(null, pathway);
              },
              function(pathway, callbackInside){
                /*
                 * we don't need this until we start rendering without cached data
                pathway.pathwayNestedByDependencies = d3.nest()
                .key(function(d) { return d.hasDependencies; })
                .entries(pathway.elements);
                //*/

                pathway.pathwayNestedByGrouping = d3.nest()
                .key(function(d) { return d.isContainedBy; })
                .entries(pathway.elements);

                var firstOrderElement = pathway.pathwayNestedByGrouping.filter(function(group) {
                  return group.key === 'undefined';
                })[0];
                pathway.pathwayNestedByGrouping = pathvisiojs.utilities.moveArrayItem(pathway.pathwayNestedByGrouping, pathway.pathwayNestedByGrouping.indexOf(firstOrderElement), 0);
                callbackInside(null, pathway);
              },
              function(pathway, callbackInside){
                //self.myPathway = pathway;
                callbackOutside(pathway);
              }
            ]);
          });
        }
        else {
          pathway.elements.sort(function(a, b) {
            return a.zIndex - b.zIndex;
          });

          pathway.pathwayNestedByGrouping = d3.nest()
          .key(function(d) { return d.isContainedBy; })
          .entries(pathway.elements);

          //self.myPathway = pathway;
          callbackOutside(pathway);
        }
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

  return {
    get:get,
    toPvjson:toPvjson,
    getLineStyle:getLineStyle,
    getBorderStyleNew:getBorderStyleNew,
    setBorderStyleAsJsonNew:setBorderStyleAsJsonNew,
    getBorderStyle:getBorderStyle,
    setBorderStyleAsJson:setBorderStyleAsJson,
    gpmlColorToCssColor:gpmlColorToCssColor,
    gpmlColorToCssColorNew:gpmlColorToCssColorNew,
    setColorAsJsonNew:setColorAsJsonNew,
    setColorAsJson:setColorAsJson
  };
}();

// TODO hack required because we call ...node.anchors.toPvjson() before we
// call the other ...node.toPvjson() methods
pathvisiojs.data.gpml.node = pathvisiojs.data.gpml.node || {};


'use strict';

// includes all GPML elements. Is parent of node and edge.

pathvisiojs.data.gpml.element = {};


var pathvisioDefaultStyleValues = {
  'FontSize':{
    'Type':"FontSize",
    'Value':10
  }
}

pathvisiojs.data.gpml.element.gpmlColorToCssColor = function(gpmlColor, pathvisioDefault) {
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
}

pathvisiojs.data.gpml.element.setColorAsJson = function(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
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
}


pathvisiojs.data.gpml.element.setColorAsJson = function(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
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
}

// TODO can we delete this function?

pathvisiojs.data.gpml.element.getLineStyle = function(gpmlElement) {
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
}

pathvisiojs.data.gpml.element.getBorderStyle = function(gpmlLineStyle, pathvisioDefault) {

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
}

pathvisiojs.data.gpml.element.setBorderStyleAsJson = function(jsonElement, currentGpmlLineStyleValue, defaultGpmlLineStyleValue) {
  var borderStyle;

  // this check happens twice because it doesn't make sense to have getBorderStyle() tell us
  // whether it has returned the default value, and we need to know whether we are using the
  // default here.

  if (currentGpmlLineStyleValue !== defaultGpmlLineStyleValue) {
    borderStyle = getBorderStyle(currentGpmlLineStyleValue, defaultGpmlLineStyleValue);
    jsonElement.borderStyle = borderStyle;
  }
  return jsonElement;
}

// set default values. "swing" refers to PathVisio-Java.
pathvisiojs.data.gpml.element.color = {};
pathvisiojs.data.gpml.element.color.swing = '000000';
pathvisiojs.data.gpml.element.color.gpml = null;

pathvisiojs.data.gpml.element.fillColor = {};
pathvisiojs.data.gpml.element.fillColor.swing = 'ffffff';
pathvisiojs.data.gpml.element.fillColor.gpml = null;

pathvisiojs.data.gpml.element.lineStyle = {};
pathvisiojs.data.gpml.element.lineStyle.swing = 'Solid';
pathvisiojs.data.gpml.element.lineStyle.gpml = null;

pathvisiojs.data.gpml.element.fontSize = {};
pathvisiojs.data.gpml.element.fontSize.swing = 10;
pathvisiojs.data.gpml.element.fontSize.gpml = 10;

pathvisiojs.data.gpml.element.fontWeight = {};
pathvisiojs.data.gpml.element.fontWeight.swing = null;
pathvisiojs.data.gpml.element.fontWeight.gpml = null;

pathvisiojs.data.gpml.element.fontName = {};
pathvisiojs.data.gpml.element.fontName.swing = 'Arial';
pathvisiojs.data.gpml.element.fontName.gpml = null;
  
pathvisiojs.data.gpml.element.toPvjson = function(gpmlElement, jsonElement, elementCallback) {
  jsonElement["@type"] = jsonElement["@type"] || [];
  jsonElement["@type"].push("element");

  pathvisiojs.data.gpml.biopaxRef.getAllAsPvjson(gpmlElement, function(publicationXrefs) {
    if (!!publicationXrefs) {
      jsonElement.PublicationXref = publicationXrefs;
    }
    elementCallback(jsonElement);
  });

  /*
     var graphics = gpmlElement.select('Graphics'),
     zIndex,
     borderWidth;
     if (graphics[0].length > 0) {
     zIndex = graphics.attr('ZOrder') || 1;
     jsonElement.zIndex = parseFloat(borderWidth);

     borderWidth = graphics.attr('LineThickness') || 1;
     jsonElement.borderWidth = parseFloat(borderWidth);
     }
  //*/
};


pathvisiojs.data.gpml.text = function() {
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

pathvisiojs.data.gpml.namespaces = [
  "http://pathvisio.org/GPML/2013a",
  "http://genmapp.org/GPML/2010a",
  "http://genmapp.org/GPML/2008a",
  "http://genmapp.org/GPML/2007"
]


pathvisiojs.data.gpml.biopaxRef = function(){
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


// includes GPML elements of type EntityNode and Group
pathvisiojs.data.gpml.element.node = function() {
  'use strict';

  var defaults = {};
  defaults.backgroundImage = {};
  defaults.shapeType = {};
  defaults.valign = defaults.verticalAlign = {};
  defaults.align = defaults.textAlign = {};
  defaults.padding = {};
  defaults.lineThickness = defaults.borderWidth = {};
  defaults.lineStyle = defaults.borderStyle;

  var setJsonBackgroundColor = function(jsonNode, currentGpmlFillColorValue) {
    var jsonBackgroundColor = pathvisiojs.data.gpml.gpmlColorToCssColorNew(currentGpmlFillColorValue);
    jsonNode.backgroundColor = jsonBackgroundColor;
    return jsonNode;
  };

  var getPorts = function(jsonNode, callback) {
    var getPerpendicularLine = function(sx, sy, rotate) {
      var rad = rotate * Math.PI/180;
      var sideAngleRotation = 2 * Math.PI - rad;
      var sideAngleBeforeRotate = Math.atan2(sy, sx);
      var dx = Math.cos(sideAngleBeforeRotate + sideAngleRotation - Math.PI/2);
      var dy = Math.sin(sideAngleBeforeRotate + sideAngleRotation - Math.PI/2);
      return {'dx': dx, 'dy': dy};
    };

    var ports = [];
    var relXYCombinations = [
      {
      RelX: -0.5,
      RelY: -1
    },
    {
      RelX: 0,
      RelY: -1
    },
    {
      RelX: 0.5,
      RelY: -1
    },
    {
      RelX: 1,
      RelY: -0.5
    },
    {
      RelX: 1,
      RelY: 0
    },
    {
      RelX: 1,
      RelY: 0.5
    },
    {
      RelX: -0.5,
      RelY: 1
    },
    {
      RelX: 0,
      RelY: 1
    },
    {
      RelX: 0.5,
      RelY: 1
    },
    {
      RelX: -1,
      RelY: -0.5
    },
    {
      RelX: -1,
      RelY: 0
    },
    {
      RelX: -1,
      RelY: 0.5
    }
    ];

    var side = {};

    var x, y, perpendicularUnitVector, rotate;
    relXYCombinations.forEach(function(relXYCombination) {
      if (Math.abs(relXYCombination.RelX) === 1) {
        side.sx = relXYCombination.RelX;
        side.sy = 0;
      }
      else {
        side.sx = 0;
        side.sy = relXYCombination.RelY;
      }

      // if rotate has a value, keep the value. Otherwise, it's 0deg.

      rotate = jsonNode.rotate || 0;
      perpendicularUnitVector = getPerpendicularLine(side.sx, side.sy, rotate);

      /*
       * then get line represented by side
       * and then get perpendicular to that line, taking
       * into account rotation
       * */

      ports.push({
        'x': (jsonNode.x + jsonNode.width * (relXYCombination.RelX + 1)/2),
        'y': (jsonNode.y + jsonNode.height * (relXYCombination.RelY + 1)/2),
        'positionRelative':{
          '@context':{
            'position':{
              '@value':'relative'
            }
          },
          'x': 100 * (relXYCombination.RelX + 1)/2 + '%',
          'y': 100 * (relXYCombination.RelY + 1)/2 + '%'
        },
        'dx': perpendicularUnitVector.dx,
        'dy': perpendicularUnitVector.dy,
        '@type':'Port'
      });
    });
    callback(ports);
  };

  // gpmlNode is NOT referring to data nodes exclusively. It is also referring to any other non-edge elements that can have anchors.

  var toPvjson = function(gpmlNode, jsonNode, callback) {
    jsonNode["@type"] = jsonNode["@type"] || [];
    jsonNode["@type"].push("node");

    pathvisiojs.data.gpml.element.toPvjson(gpmlNode, jsonNode, function(jsonNode) {
      callback(jsonNode);
    });

    /*
       var comments = gpmlNode.selectAll('Comment');
       if (comments[0].length > 0) {
       jsonNode.comments = [];
       comments.each(function() {
       jsonNode.comments.push(d3.select(this).text());
       });
       }

    // Be warned that support for zIndex in SVG is spotty (non-existent? TODO check css cross-browser). You should rely on ordering in the DOM.

    var shapeType = gpmlNode.select('Graphics').attr('ShapeType'); 
    if (!shapeType) {

  // To display correctly, a data-node must have a shape type.
  // If no shape type is specified in GPML, this code will
  // make the default be 'rectangle'

  if (jsonNode.nodeType === 'data-node') {
  jsonNode.shapeType = "rectangle";
  }
  else {
  jsonNode.shapeType = "none";
  }
  }
  else {
  jsonNode.shapeType = strcase.paramCase(shapeType);
  }

  var strokeWidth = gpmlNode.select('Graphics').attr('LineThickness'); 
  if (!!strokeWidth) {
  jsonNode.strokeWidth = strokeWidth;
  }

  var attributes = gpmlNode.selectAll('Attribute');
  console.log('attributes');
  console.log(attributes);
  ///*
  var doubleProperty, cellularComponent;
  if (attributes.length > 0) {
  doubleProperty = attributes.filter(function(d, i) {
  console.log('this');
  console.log(this);
  return d3.select(this).attr('Key') === 'org.pathvisio.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
  });
  if (doubleProperty[0].length > 0) {
  jsonNode.shapeType = shapeType + '-double';
  }
  cellularComponent = attributes.filter(function(d, i) {
  return d3.select(this).attr('Key') === 'org.pathvisiojs.CellularComponentProperty' && d3.select(this).attr('Value') != 'None';
  });
  if (cellularComponent[0].length > 0) {
  jsonNode.cellularComponent = cellularComponent.attr('Value');
  }
  }
  //*/
  };

  var getPortCoordinates = function(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  };

  return {
    setJsonBackgroundColor:setJsonBackgroundColor,
    getPorts:getPorts,
    getPortCoordinates:getPortCoordinates,
    toPvjson:toPvjson
  };
}();


pathvisiojs.data.gpml.element.node.groupNode = function() {
  'use strict';

  var groupTypeToShapeTypeMappings = {
    'Complex':'complex',
    'Group':'rectangle',
    'None':'rectangle',
    'Pathway':'rectangle'
  };

  var pathvisioDefaultStyleValues = {
    'FontSize':null,
    'FontWeight':null
  }

  function getGroupDimensions(group, callback) {
    /*
    console.log('group');
    console.log(group);
    console.log('groupContents');
    console.log(groupContents);
    //*/
    var dimensions = {};
    dimensions.topLeftCorner = {};
    dimensions.topLeftCorner.x = 99999;
    dimensions.topLeftCorner.y = 99999;
    dimensions.bottomRightCorner = {};
    dimensions.bottomRightCorner.x = 0;
    dimensions.bottomRightCorner.y = 0;

    var groupContents = group.contains;
    groupContents = pathvisiojs.utilities.convertToArray(groupContents);

    // TODO check what happens if the contained element lacks a z-index
    dimensions.zIndex = groupContents[0].zIndex;
    async.each(groupContents, function(groupContent, callbackInside) {
      if (groupContent.renderableType === 'EntityNode') {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.x + groupContent.width);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.y + groupContent.height);
      }
      else {
        dimensions.topLeftCorner.x = Math.min(dimensions.topLeftCorner.x, groupContent.Point[0].x, groupContent.Point[groupContent.Point.length - 1].x);
        dimensions.topLeftCorner.y = Math.min(dimensions.topLeftCorner.y, groupContent.Point[0].y, groupContent.Point[groupContent.Point.length - 1].y);
        dimensions.bottomRightCorner.x = Math.max(dimensions.bottomRightCorner.x, groupContent.Point[0].x, groupContent.Point[groupContent.Point.length - 1].x);
        dimensions.bottomRightCorner.y = Math.max(dimensions.bottomRightCorner.y, groupContent.Point[0].y, groupContent.Point[groupContent.Point.length - 1].y);
      }
      dimensions.x = dimensions.topLeftCorner.x - group.padding - group.borderWidth;
      dimensions.y = dimensions.topLeftCorner.y - group.padding - group.borderWidth;
      dimensions.width = (dimensions.bottomRightCorner.x - dimensions.topLeftCorner.x) + 2 * (group.padding + group.borderWidth);
      dimensions.height = (dimensions.bottomRightCorner.y - dimensions.topLeftCorner.y) + 2 * (group.padding + group.borderWidth);
      dimensions.zIndex = Math.min(dimensions.zIndex, groupContent.zIndex);
      callbackInside(null);
    },
    function (err) {
      callback(dimensions);
    });
  }

  function toPvjson(pathway, gpmlGroup, callbackOutside) {
    var jsonGroup = {},
      groupId,
      shapeType,
      groupType;

    var graphId = gpmlGroup.attr('GraphId') || ('id' + uuid.v4());
    jsonGroup.GraphId = graphId;
    groupId = gpmlGroup.attr('GroupId') || ('id' + uuid.v4());
    jsonGroup["id"] = groupId;
    jsonGroup.GroupId = groupId;
    groupType = gpmlGroup.attr('Style') || 'None';

    var shapeType = groupTypeToShapeTypeMappings[groupType];
    jsonGroup.ShapeType = shapeType || 'rectangle';

    jsonGroup.renderableType = 'GroupNode';
    jsonGroup.nodeType = "GroupNode";
    jsonGroup.groupType = groupType;

    jsonGroup["@type"] = [];
    jsonGroup["@type"].push(shapeType);
    jsonGroup["@type"].push("GroupNode");
    jsonGroup["@type"].push(groupType);

    // Groups in PathVisio (Java) appear to have unchangable padding values,
    // but they are different based on GroupType.

    var groupTypeToPaddingValueMappings = {
      'Complex': 11,
      'Group': 8,
      'None': 8,
      'Pathway': 8
    };

    jsonGroup.padding = groupTypeToPaddingValueMappings[groupType];

    // Groups in PathVisio (Java) appear to have a default borderWidth
    // of 1px at normal zoom levels, but unlike for edges and EntityNodes, 
    // this borderWidth does not change when I zoom in or out.
    //
    // TODO this should be updated to check for whether it is defined
    // in CSS. If it is, this could conflict or require defining
    // borderWidth twice -- once here and once in CSS.

    jsonGroup.borderWidth = 1;
    pathvisiojs.data.gpml.text.toPvjson(gpmlGroup, pathvisioDefaultStyleValues, function(text) {
      /*
      console.log('text');
      console.log(text);
      //*/
      if (!!text) {
        jsonGroup.text = text;

        // TODO set fontSize in CSS, not here. Need to be able to still calculate font rendering, however,
        // which depends in part on font size.

        jsonGroup.text.fontSize = 32;
        jsonGroup.text.textAlign = 'center';
        jsonGroup.text.verticalAlign = 'middle';
      }
      pathvisiojs.data.gpml.element.node.toPvjson(gpmlGroup, jsonGroup, function(jsonGroup) {
        callbackOutside(jsonGroup);
      });
    });
  }

  return {
    toPvjson:toPvjson,
    getGroupDimensions:getGroupDimensions
  };
}();



// includes GPML elements of type Shape, Label and DataNode

pathvisiojs.data.gpml.element.node.entityNode = function(){
  'use strict';

  var defaults = {
    'Color':'000000',
    'FillColor':'Transparent',
    'FontSize':10,
    'FontWeight':'Normal',
    'LineStyle':'Solid',
    'LineThickness':1
  };

  var setJsonRotationValue = function(jsonNode, currentGpmlRotationValue, defaultGpmlRotationValue) {
    if (currentGpmlRotationValue !== defaultGpmlRotationValue) {
      jsonNode.rotate = currentGpmlRotationValue * 180/Math.PI; //converting from radians to degrees
    }
    return jsonNode;
  };

  var toPvjson = function(gpmlEntityNode, jsonEntityNode, callback) {
    var graphId = gpmlEntityNode.attr('GraphId') || ('id' + uuid.v4());
    jsonEntityNode.id = graphId;
    jsonEntityNode.GraphId = graphId;

    var isContainedBy = gpmlEntityNode.attr('GroupRef');
    if (!!isContainedBy) {
      jsonEntityNode.isContainedBy = isContainedBy;
    }

    // TODO decide whether we always need a shape
    var glyph = gpmlEntityNode.select('Graphics').attr('ShapeType') || 'rectangle';
    glyph = strcase.paramCase(glyph);
    jsonEntityNode.ShapeType = glyph;

    if  (!!glyph) {
      // set stroke and fill colors to their GPML values
      // label: {
      //  color: '#000000',
      // },
      // glyph: {
      //  stroke: '#000000',
      //  fill: '#ffffff',
      // }
    }
    else {
      // set stroke and fill colors to transparent and text color to its GPML value
      // label: {
      //  color: '#000000',
      // },
      // glyph: {
      //  stroke: 'transparent',
      //  fill: 'transparent',
      // }
    }

    jsonEntityNode.zIndex = parseFloat(gpmlEntityNode.select('Graphics').attr('ZOrder'));
    jsonEntityNode.renderableType = 'EntityNode';

    jsonEntityNode["@type"] = jsonEntityNode["@type"] || [];
    jsonEntityNode["@type"].push("EntityNode");
    jsonEntityNode["@type"].push(glyph);
    var groupedStatus = isContainedBy || 'notGrouped';
    jsonEntityNode["@type"].push(groupedStatus);

    var borderWidth = gpmlEntityNode.select('Graphics').attr('LineThickness') || defaults.LineThickness;
    borderWidth = parseFloat(borderWidth);
    jsonEntityNode.borderWidth = borderWidth;

    // exactly what is meant by "width" and "height" is not clearly specified in GPML,
    // so I analyzed examples by visually inspecting the rendering in PathVisio-Java, at
    // a zoom level that made for easy reading of DataNodes at their default size.
    // This analysis indicates the following meaning for GPML width in CSS2.1 box-model terms:
    // gpmlWidth = elementWidth + elementPadding + elementBorderWidth (1/2 on each side = 1)
    // with a similar calculation for gpmlHeight

    var gpmlWidth = parseFloat(gpmlEntityNode.select('Graphics').attr('Width'));
    jsonEntityNode.width = gpmlWidth + borderWidth;

    var gpmlHeight = parseFloat(gpmlEntityNode.select('Graphics').attr('Height'));
    jsonEntityNode.height = gpmlHeight + borderWidth;

    var centerX = parseFloat(gpmlEntityNode.select('Graphics').attr('CenterX'));
    jsonEntityNode.x = centerX - gpmlWidth/2;

    var centerY = parseFloat(gpmlEntityNode.select('Graphics').attr('CenterY'));
    jsonEntityNode.y = centerY - gpmlHeight/2;

    jsonEntityNode.padding = "0.5em";

    var attributes = gpmlEntityNode.selectAll('Attribute');
    var doubleProperty;
    if (attributes.length > 0) {
      doubleProperty = attributes.filter(function(d, i) {
        return d3.select(this).attr('Key') === 'org.pathvisio.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
      });
      if (doubleProperty[0].length > 0) {
        jsonEntityNode.ShapeType = glyph + '-double';
      }
    }

    pathvisiojs.data.gpml.element.node.getPorts(jsonEntityNode, function(ports) {
      //console.log('ports');
      //console.log(ports);
      jsonEntityNode.Port = ports;
      pathvisiojs.data.gpml.element.node.toPvjson(gpmlEntityNode, jsonEntityNode, function(jsonEntityNode) {
        callback(jsonEntityNode, ports);
      });
    });
  };

  return {
    setJsonRotationValue:setJsonRotationValue,
    toPvjson:toPvjson
  };
}();


pathvisiojs.data.gpml.element.node.entityNode.dataNode = function() {
  'use strict';

  var defaults = {
    'Color':'000000',
    'FillColor':'ffffff',
    'FontSize':10,
    'FontWeight':'Normal',
    'LineStyle':'Solid',
    'LineThickness':1
  };

  var toPvjson = function(gpmlDataNode, callbackInside) {
    var jsonDataNode = {};
    var dataNodeType = gpmlDataNode.attr('Type');
    if (!dataNodeType) {
      dataNodeType = 'Unknown';
    }
    jsonDataNode.nodeType = "DataNode";
    jsonDataNode.dataNodeType = dataNodeType;
    jsonDataNode["@type"] = jsonDataNode["@type"] || [];
    jsonDataNode["@type"].push("DataNode");
    jsonDataNode["@type"].push(dataNodeType);

    pathvisiojs.data.gpml.element.node.entityNode.toPvjson(gpmlDataNode, jsonDataNode, function(jsonDataNode) {
      var database, ID,
        datasourceReference = gpmlDataNode.select('Xref');
      if (!!datasourceReference) {
        database = datasourceReference.attr('Database');
        ID = datasourceReference.attr('ID');
        if (!!database && !!ID) {
          jsonDataNode.DatasourceReference = {};
          jsonDataNode.DatasourceReference.Database = database;
          jsonDataNode.DatasourceReference.ID = ID;
        }
      }
      pathvisiojs.data.gpml.text.toPvjson(gpmlDataNode, defaults, function(text) {
        if (!!text) {
          jsonDataNode.text = text;
        }

        var gpmlLineStyle = gpmlDataNode.select('Graphics').attr('LineStyle') || defaults.LineStyle;
        jsonDataNode = pathvisiojs.data.gpml.setBorderStyleAsJsonNew(jsonDataNode, gpmlLineStyle);
        
        var gpmlColor = gpmlDataNode.select('Graphics').attr('Color') || defaults.Color;
        jsonDataNode = pathvisiojs.data.gpml.setColorAsJsonNew(jsonDataNode, gpmlColor);

        var gpmlFillColor = gpmlDataNode.select('Graphics').attr('FillColor') || defaults.FillColor;
        jsonDataNode = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonDataNode, gpmlFillColor);
        callbackInside(jsonDataNode);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();


pathvisiojs.data.gpml.element.node.entityNode.label = function(){
  'use strict';

  var defaults = {
    'Color':'000000',
    'FillColor':'Transparent',
    'FontSize':10,
    'FontWeight':'Normal',
    'LineStyle':'Solid',
    'LineThickness':1
  };

  var toPvjson = function(gpmlLabel, callback) {
    /*
    console.log('gpmlLabel');
    console.log(gpmlLabel[0][0]);
    console.log('pathwayIri');
    console.log(pathwayIri);
    console.log('callback');
    console.log(callback);
    //*/

    var jsonLabel = {};
    jsonLabel.nodeType = "Label";
    pathvisiojs.data.gpml.element.node.entityNode.toPvjson(gpmlLabel, jsonLabel, function(jsonLabel) {
      pathvisiojs.data.gpml.text.toPvjson(gpmlLabel, defaults, function(text) {
        if (!!text) {
          jsonLabel.text = text;
        }

        jsonLabel = pathvisiojs.data.gpml.setColorAsJson(jsonLabel,
                      gpmlLabel.select('Graphics').attr('Color'),
                      defaults.Color);

        var gpmlBackgroundColor = gpmlLabel.select('Graphics').attr('FillColor') || defaults.FillColor;
        var jsonBackgroundColor = pathvisiojs.data.gpml.gpmlColorToCssColor(gpmlBackgroundColor, defaults.FillColor);
        if (!!jsonBackgroundColor) {
          jsonLabel.backgroundColor = jsonBackgroundColor;
        }

        callback(jsonLabel);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();


pathvisiojs.data.gpml.element.node.entityNode.shape = function(){
  'use strict';

  var defaults = {
    'Color':'000000',
    'FillColor':'Transparent',
    'FontSize':10,
    'FontWeight':'Normal',
    'LineStyle':'Solid',
    'LineThickness':1,
    'Rotation':'0.0'
  };

  function toPvjson(gpmlShape, callback) {
    
    // some shapes have GPML values that do not match what is visually displayed in PathVisio-Java.
    // Below we correct the GPMl so that the display in pathvisiojs will matches the display in PathVisio-Java.
    var gpmlWidth, gpmlCenterX;
    if (gpmlShape.select('Graphics').attr('ShapeType') === 'Triangle') {
      gpmlWidth = parseFloat(gpmlShape.select('Graphics').attr('Width'));
      gpmlCenterX = parseFloat(gpmlShape.select('Graphics').attr('CenterX'));
      gpmlShape.select('Graphics').attr('CenterX', gpmlCenterX + gpmlWidth * 0.27);
      gpmlShape.select('Graphics').attr('Width', gpmlWidth * 0.98);
    }

    var jsonShape = {};
    jsonShape.nodeType = "Shape";

    var attributes = gpmlShape.selectAll('Attribute');
    var CellularComponent;
    if (attributes.length > 0) {
      CellularComponent = attributes.filter(function(d, i) {
        return d3.select(this).attr('Key') === 'org.pathvisio.CellularComponentProperty' && d3.select(this).attr('Value') !== 'None';
      });

      if (CellularComponent[0].length > 0) {
        jsonShape.CellularComponent = CellularComponent.attr('Value');
      }
    }

    pathvisiojs.data.gpml.element.node.entityNode.toPvjson(gpmlShape, jsonShape, function(jsonShape) {
      pathvisiojs.data.gpml.text.toPvjson(gpmlShape, defaults, function(text) {
        if (!!text) {
          jsonShape.text = text;
        }

        jsonShape = pathvisiojs.data.gpml.setColorAsJson(jsonShape,
                      gpmlShape.select('Graphics').attr('Color'),
                      defaults.Color);

        var gpmlFillColor = gpmlShape.select('Graphics').attr('FillColor') || defaults.FillColor;
        jsonShape = pathvisiojs.data.gpml.element.node.setJsonBackgroundColor(jsonShape, gpmlFillColor);

        jsonShape = pathvisiojs.data.gpml.element.node.entityNode.setJsonRotationValue(jsonShape,
                      gpmlShape.select('Graphics').attr('Rotation'),
                      defaults.Rotation);

        jsonShape = pathvisiojs.data.gpml.setBorderStyleAsJson(jsonShape,
                      gpmlShape.select('Graphics').attr('LineStyle'),
                      defaults.LineStyle);

        callback(jsonShape);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();




pathvisiojs.data.gpml.node.anchor = function() {
  'use strict';

  // anchors
  // an anchor is an attachment point at which an edge can originate or terminate.
  // It has the following elements:
  // anchor = {
  //  id: unique value for this anchor
  //  graphRef: reference to the pathway element to which the anchor is bound.
  //  side: [top, right, bottom, left] (choose a side. only for anchors attached to nodes, not edges.)
  //  position: percentage of the distance along the specified side of the element or the edge to which the anchor is bound.
  //    For nodes, if the side specified is right or left, the starting point is the topmost point on the side, and
  //    if the side specified is top or bottom, the starting point is the leftmost point on the side (smallest x or y value in SVG coordinate system).
  //  initialEdgeDirection: direction (in degrees) by which the edge emanates from the anchor (only for anchors attached to nodes, not edges)
  // }

  function toPvjson(gpmlParentElement, jsonParentElement, elementType, callback) {
    var gpmlAnchors, gpmlAnchor, jsonAnchor, elementIri, graphId;
    if (elementType === 'edge') {
      gpmlAnchors = gpmlParentElement.selectAll('Anchor');
      if (gpmlAnchors[0].length > 0) {
        jsonParentElement.Anchor = [];
        gpmlAnchors.each(function() {
          jsonAnchor = {};
          gpmlAnchor = d3.select(this);
          graphId = gpmlAnchor.attr('GraphId') || ('id' + uuid.v4());
          elementIri = '' + graphId;
          jsonAnchor['id'] = elementIri;
          jsonAnchor['@type'] = [
            'node',
            'element',
            'Element',
            'Anchor'
          ];
          jsonAnchor.dependsOn = jsonParentElement['id'];
          jsonAnchor.anchorPosition = gpmlAnchor.attr('Position');
          if (!!jsonParentElement.stroke) {
            jsonAnchor.backgroundColor = jsonParentElement.stroke;
          }
          jsonAnchor.ShapeType = gpmlAnchor.attr('Shape');
          if (!!jsonAnchor.ShapeType) {
            if (jsonAnchor.ShapeType === 'Circle') {
              jsonAnchor.ShapeType = 'oval';
            }
          }
          else {
            jsonAnchor.ShapeType = 'none';
          }
          jsonParentElement.Anchor.push(jsonAnchor);
        })
        callback(jsonParentElement);
      }
      else {
        callback(jsonParentElement);
      }
    }
    else {
      throw new Error('anchor.toPvjson doesnt know how to handle anything other than edges as parent elements right now. handling other elements needs to be implemented.');
    }
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


pathvisiojs.data.gpml.edge = function(){
  'use strict';

  var strokeStyleMappings = {
    'Broken': 'dashed'
  };

  function toPvjson(gpmlEdge, callback) {
    var jsonAnchorEdge, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId, groupRef;
    var jsonEdge = {};
    var graphId = gpmlEdge.attr('GraphId') || ('id' + uuid.v4());
    var elementIri = '' + graphId;
    jsonEdge['id'] = elementIri;
    jsonEdge.GraphId = graphId;

    var containingGroupRef = gpmlEdge.attr('GroupRef');
    var isContainedBy;
    var dependsOn = [];
    if (!!containingGroupRef) {
      isContainedBy = jsonEdge.isContainedBy = '' + containingGroupRef;
      dependsOn.push(isContainedBy);
    }

    jsonEdge.zIndex = parseFloat(gpmlEdge.select('Graphics').attr('ZOrder'));
    var points = gpmlEdge.selectAll('Point');
    jsonEdge['@type'] = [
      'element',
      'SvgPath',
      'Edge',
      isContainedBy || 'notGrouped'
    ];

    // Graphical Only Data below, except maybe Anchors

    var point, pointObj;
    jsonEdge.Point = [];
    points.each(function() {
      point = d3.select(this);
      pointObj = {};
      var relX = parseFloat(point.attr('RelX'));
      var relY = parseFloat(point.attr('RelY'));
      if ((relX !== null && relX !== undefined) && (relY !== null && relY !== undefined)) {
        pointObj['@type'] = 'SnappedPoint';

        dependsOn.push('' + point.attr('GraphRef'));

        pointObj.hasReference = '' + point.attr('GraphRef');
        pointObj.RelX = relX;
        pointObj.RelY = relY;
        pointObj.x = parseFloat(point.attr('X'));
        pointObj.y = parseFloat(point.attr('Y'));
      }
      else {
        pointObj['@type'] = 'GraphicalPoint';
        pointObj.x = {};
        pointObj.x = parseFloat(point.attr('X'));
        pointObj.y = parseFloat(point.attr('Y'));
      }

      jsonEdge.Point.push(pointObj);
    })

    var connectorType = gpmlEdge.select('Graphics').attr('ConnectorType') || 'Straight';
    jsonEdge.ConnectorType = '' + connectorType;

    var stroke = gpmlEdge.select('Graphics').attr('Color');
    if (!!stroke) {
      jsonEdge['stroke'] = stroke;
    }

    var strokeWidth = gpmlEdge.select('Graphics').attr('LineThickness');
    if (!!strokeWidth) {
      jsonEdge['strokeWidth'] = parseFloat(strokeWidth);
    }

    /*
    var jsonAnchorEdges = gpmlEdge.selectAll('Anchor');
    if (jsonAnchorEdges[0].length > 0) {
      jsonEdge.Anchor = [];
      jsonAnchorEdges.each(function() {
        jsonAnchorEdge = {};
        anchor = d3.select(this);
        elementIri = pathwayIri + anchor.attr('GraphId');
        jsonAnchorEdge['id'] = pathwayIri + anchor.attr('GraphId');
        jsonAnchorEdge['@type'] = [
          'element',
          'Edge',
          'Anchor'
        ];
        jsonAnchorEdge.dependsOn = jsonEdge['id'];
        jsonAnchorEdge.anchorPosition = anchor.attr('Position');
        jsonEdge.Anchor.push(jsonAnchorEdge);
      })
    }
    //*/

    pathvisiojs.data.gpml.node.anchor.toPvjson(gpmlEdge, jsonEdge, 'edge', function(jsonEdge) {
      pathvisiojs.data.gpml.element.toPvjson(gpmlEdge, jsonEdge, function(jsonEdge) {
        callback(jsonEdge);
      });
    });
  }

  /*
     function toPvjson(gpmlEdge, jsonEdge, callback) {
     try {
     jsonEdge.id = gpmlEdge.attr('GraphId');
     jsonEdge.renderableType = 'edge';
     var connectorType = gpmlEdge.select('Graphics').attr('ConnectorType');
     if (!!connectorType) {
     jsonEdge.connectorType = connectorType.toLowerCase();
     }
     else {
     jsonEdge.connectorType = 'straight';
     }

     var attribute;
     var strokeStyle = strokeStyleMappings[String(gpmlEdge.select('Graphics').attr('LineStyle'))];
     if (!!strokeStyle) {
     jsonEdge.strokeStyle = strokeStyle;
     }
     else {
     attribute = gpmlEdge.select('Attribute'); 
     if (!!attribute[0][0]) {
     console.log(attribute);
     if ((attribute.attr('Key') === "org.pathvisiojs.DoubleLineProperty") && (attribute.attr('Value') === "Double")) {
     jsonEdge.strokeStyle = 'double';
     }
     }
     }

     var stroke = String(gpmlEdge.select('Graphics').attr('Color'));
     if (!!stroke) {
     var color = new RGBColor(stroke);
     if (color.ok) {
     jsonEdge.stroke = color.toHex();
     }
     }

     jsonEdge.strokeWidth = gpmlEdge.select('Graphics').attr('LineThickness');

     jsonEdge.zIndex = gpmlEdge.select('Graphics').attr('ZOrder');

     var xRef = gpmlEdge.select('Xref');
     if (xRef > 0) {
     if ((!xRef.attr('Database')) && (!xRef.attr('ID'))) {
     jsonEdge.xRef = xRef;
     }
     }

     var gpmlPoints = gpmlEdge.selectAll('Point');
     self.gpmlPoints = gpmlPoints;
     var markerStart = markerMappings[gpmlPoints[0][0].getAttribute('ArrowHead')];
     if (!!markerStart) {
     jsonEdge.markerStart = markerStart;
     }
     else {
     jsonEdge.markerStart = 'none';
     }
     var lastPointIndex = gpmlPoints[0].length - 1;
     var markerEnd = markerMappings[gpmlPoints[0][lastPointIndex].getAttribute('ArrowHead')];
     if (!!markerEnd) {
     jsonEdge.markerEnd = markerEnd;
     }
     else {
     jsonEdge.markerEnd = 'none';
     }

     var jsonPoints = [];
     gpmlPoints.each(function() {
     pathvisiojs.data.gpml.edge.point.toPvjson(d3.select(this), function(jsonPoint) {
     jsonPoints.push(jsonPoint);
     });
     });
jsonEdge.points = jsonPoints;
callback(jsonEdge);
}
catch (e) {
  console.log("Error converting edge to json: " + e.message);
  return e;
}
}
//*/

return {
toPvjson:toPvjson
};
}();


pathvisiojs.data.gpml.edge.interaction = function(){
  'use strict';

  // TODO do something with the linetype info to specify whether interaction is direct or indirect

  var gpmlArrowHeadsToSemanticMappings = {
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
  };

  function getGpmlArrowHeadNameFromSemanticName(semanticName) {
    for (var gpmlArrowHeadName in gpmlArrowHeadsToSemanticMappings) {
      if (gpmlArrowHeadsToSemanticMappings[gpmlArrowHeadName] === semanticName) {
        return gpmlArrowHeadName;
      }
    }

    if (!gpmlArrowHeadName) {
      gpmlArrowHeadName = semanticName;
      console.warn('No GPML ArrowHead name found for semantic name "' + semanticName + '". Returning original semantic name as GPML ArrowHead name. PathVisio-Java will delete this ArrowHead from the GPML file if it edits this file.');
    }
    return gpmlArrowHeadName;
  }

  function getSemanticNameFromGpmlArrowHeadName(gpmlArrowHeadName) {
    var semanticName;
    if (!!gpmlArrowHeadName) {
      semanticName = gpmlArrowHeadsToSemanticMappings[gpmlArrowHeadName];
      if (!semanticName) {
        semanticName = gpmlArrowHeadName;
        console.warn('No semantic name found for GPML ArrowHead name "' + gpmlArrowHeadName + '". Returning original GPML ArrowHead name as semantic name.');
      }
    }
    else {
      semanticName = 'Unspecified';
    }

    return semanticName;
  }

  function toPvjson(gpml, gpmlInteraction, callback) {
    var jsonAnchorInteraction, anchor, jsonAnchor, points, jsonPoints, interactionType, target, targetId, groupRef, source, sourceId;
    pathvisiojs.data.gpml.edge.toPvjson(gpmlInteraction, function(jsonInteraction) {
      //console.log('jsonInteraction');
      //console.log(jsonInteraction);

      jsonInteraction['@type'].push('Interaction');
      jsonInteraction.renderableType = 'Interaction';

      points = gpmlInteraction.selectAll('Point');

      var database, ID,
      datasourceReference = gpmlInteraction.select('Xref');
      if (!!datasourceReference) {
        database = datasourceReference.attr('Database');
        ID = datasourceReference.attr('ID');
        if (!!database && !!ID) {
          jsonInteraction.DatasourceReference = {};
          jsonInteraction.DatasourceReference.Database = database;
          jsonInteraction.DatasourceReference.ID = ID;
        }
      }

      function buildInteractionGraph(gpmlSource, gpmlTarget, callbackBIG) {
        /*
        console.log('gpmlSource');
        console.log(gpmlSource);
        console.log('gpmlTarget');
        console.log(gpmlTarget);
        //*/
        var InteractionGraphMember = {};
        jsonInteraction.InteractionGraph = jsonInteraction.InteractionGraph || [];

        sourceId = gpmlSource.getAttribute('GraphRef');
        if (!!sourceId) {
          source = gpml.querySelector('[GraphId=' + sourceId + ']');
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

        targetId = gpmlTarget.getAttribute('GraphRef');
        if (!!targetId) {
          target = gpml.querySelector('[GraphId=' + targetId + ']');
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

      // TODO this is a temporary solution.
      // In the future, we will want to update the view code such that we specify at render time
      // the marker(s) and line type (and possibly other attributes) based on the interactionType.
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

      callback(jsonInteraction);
    });
  }

  /*
     function toPvjson(gpmlEdge, jsonEdge, callback) {
     try {
     jsonEdge.id = gpmlEdge.attr('GraphId');
     jsonEdge.renderableType = 'edge';
     var connectorType = gpmlEdge.select('Graphics').attr('ConnectorType');
     if (!!connectorType) {
     jsonEdge.connectorType = connectorType.toLowerCase();
     }
     else {
     jsonEdge.connectorType = 'straight';
     }

     var attribute;
     var strokeStyle = strokeStyleMappings[String(gpmlEdge.select('Graphics').attr('LineStyle'))];
     if (!!strokeStyle) {
     jsonEdge.strokeStyle = strokeStyle;
     }
     else {
     attribute = gpmlEdge.select('Attribute'); 
     if (!!attribute[0][0]) {
     console.log(attribute);
     if ((attribute.attr('Key') === "org.pathvisiojs.DoubleLineProperty") && (attribute.attr('Value') === "Double")) {
     jsonEdge.strokeStyle = 'double';
     }
     }
     }

     var stroke = String(gpmlEdge.select('Graphics').attr('Color'));
     if (!!stroke) {
     var color = new RGBColor(stroke);
     if (color.ok) {
     jsonEdge.stroke = color.toHex();
     }
     }

     jsonEdge.strokeWidth = gpmlEdge.select('Graphics').attr('LineThickness');

     jsonEdge.zIndex = gpmlEdge.select('Graphics').attr('ZOrder');

     var xRef = gpmlEdge.select('Xref');
     if (xRef > 0) {
     if ((!xRef.attr('Database')) && (!xRef.attr('ID'))) {
     jsonEdge.xRef = xRef;
     }
     }

     var gpmlPoints = gpmlEdge.selectAll('Point');
     self.gpmlPoints = gpmlPoints;
     var markerStart = markerMappings[gpmlPoints[0][0].getAttribute('ArrowHead')];
     if (!!markerStart) {
     jsonEdge.markerStart = markerStart;
     }
     else {
     jsonEdge.markerStart = 'none';
     }
     var lastPointIndex = gpmlPoints[0].length - 1;
     var markerEnd = markerMappings[gpmlPoints[0][lastPointIndex].getAttribute('ArrowHead')];
     if (!!markerEnd) {
     jsonEdge.markerEnd = markerEnd;
     }
     else {
     jsonEdge.markerEnd = 'none';
     }

     var jsonPoints = [];
     gpmlPoints.each(function() {
     pathvisiojs.data.gpml.edge.point.toPvjson(d3.select(this), function(jsonPoint) {
     jsonPoints.push(jsonPoint);
     });
     });
jsonEdge.points = jsonPoints;
callback(jsonEdge);
}
catch (e) {
  console.log("Error converting edge to json: " + e.message);
  return e;
}
}
//*/

return {
  toPvjson:toPvjson,
  getGpmlArrowHeadNameFromSemanticName:getGpmlArrowHeadNameFromSemanticName,
  getSemanticNameFromGpmlArrowHeadName:getSemanticNameFromGpmlArrowHeadName
};
}();


pathvisiojs.data.gpml.edge.graphicalLine = function(){
  'use strict';

  //*
  //var jsonPathway = {};
  // TODO this isn't getting the linetype info for determining whether activity is direct or indirect yet
  var gpmlArrowHeadToSemanticMappings = {
    'Arrow':'arrow'
  };
  //*/

  function toPvjson(gpml, gpmlGraphicalLine, callback) {
    var jsonAnchorGraphicalLine, anchor, jsonAnchor, points, jsonPoints, graphicalLineType, target, targetId, groupRef;
    pathvisiojs.data.gpml.edge.toPvjson(gpmlGraphicalLine, function(jsonGraphicalLine) {
      //console.log('jsonGraphicalLine');
      //console.log(jsonGraphicalLine);

      jsonGraphicalLine['@type'].push('GraphicalLine');
      jsonGraphicalLine.renderableType = 'GraphicalLine';

      points = gpmlGraphicalLine.selectAll('Point');

      var firstPoint = points[0][0];
      if (!!firstPoint.getAttribute('ArrowHead')) {
        jsonGraphicalLine.markerStart = strcase.paramCase(firstPoint.getAttribute('ArrowHead'));
      }
      else {
        jsonGraphicalLine.markerStart = 'none';
      }

      var lastPoint = points[0][points[0].length - 1];
      if (!!lastPoint.getAttribute('ArrowHead')) {
        jsonGraphicalLine.markerEnd = strcase.paramCase(lastPoint.getAttribute('ArrowHead'));
      }
      else {
        console.log('markerEnd = none');
        jsonGraphicalLine.markerEnd = 'none';
      }

      jsonGraphicalLine.ConnectorType = (gpmlGraphicalLine.select('Graphics').attr('ConnectorType')); 
      if (!jsonGraphicalLine.ConnectorType) {
	jsonGraphicalLine.ConnectorType = 'Straight';
      }

      callback(jsonGraphicalLine);
    })
  }

  /*
  function toPvjson(gpmlEdge, jsonEdge, callback) {
    try {
      jsonEdge.id = gpmlEdge.attr('GraphId');
      jsonEdge.renderableType = 'edge';
      var connectorType = gpmlEdge.select('Graphics').attr('ConnectorType');
      if (!!connectorType) {
        jsonEdge.connectorType = connectorType.toLowerCase();
      }
      else {
        jsonEdge.connectorType = 'straight';
      }

      var attribute;
      var strokeStyle = strokeStyleMappings[String(gpmlEdge.select('Graphics').attr('LineStyle'))];
      if (!!strokeStyle) {
        jsonEdge.strokeStyle = strokeStyle;
      }
      else {
        attribute = gpmlEdge.select('Attribute'); 
        if (!!attribute[0][0]) {
        console.log(attribute);
          if ((attribute.attr('Key') === "org.pathvisiojs.DoubleLineProperty") && (attribute.attr('Value') === "Double")) {
            jsonEdge.strokeStyle = 'double';
          }
        }
      }

      var stroke = String(gpmlEdge.select('Graphics').attr('Color'));
      if (!!stroke) {
        var color = new RGBColor(stroke);
        if (color.ok) {
          jsonEdge.stroke = color.toHex();
        }
      }

      jsonEdge.strokeWidth = gpmlEdge.select('Graphics').attr('LineThickness');

      jsonEdge.zIndex = gpmlEdge.select('Graphics').attr('ZOrder');

      var xRef = gpmlEdge.select('Xref');
      if (xRef > 0) {
        if ((!xRef.attr('Database')) && (!xRef.attr('ID'))) {
          jsonEdge.xRef = xRef;
        }
      }

      var gpmlPoints = gpmlEdge.selectAll('Point');
      self.gpmlPoints = gpmlPoints;
      var markerStart = markerMappings[gpmlPoints[0][0].getAttribute('ArrowHead')];
      if (!!markerStart) {
        jsonEdge.markerStart = markerStart;
      }
      else {
        jsonEdge.markerStart = 'none';
      }
      var lastPointIndex = gpmlPoints[0].length - 1;
      var markerEnd = markerMappings[gpmlPoints[0][lastPointIndex].getAttribute('ArrowHead')];
      if (!!markerEnd) {
        jsonEdge.markerEnd = markerEnd;
      }
      else {
        jsonEdge.markerEnd = 'none';
      }

      var jsonPoints = [];
      gpmlPoints.each(function() {
        pathvisiojs.data.gpml.edge.point.toPvjson(d3.select(this), function(jsonPoint) {
          jsonPoints.push(jsonPoint);
        });
      });
      jsonEdge.points = jsonPoints;
      callback(jsonEdge);
    }
    catch (e) {
      console.log("Error converting edge to json: " + e.message);
      return e;
    }
  }
  //*/

  return {
    toPvjson:toPvjson
  };
}();


pathvisiojs.data.gpml.edge.point = function(){
  'use strict';

  var gpmlRelXToJsonSideAndPositionMapping = { 
    '-1.0': {'side': 'left'},
    '-0.5': {'position': 0.25},
    '0.0': {'position': 0.5},
    '0.5': {'position': 0.75},
    '1.0': {'side': 'right'}
  };

  var gpmlRelYToJsonSideAndPositionMapping = { 
    '-1.0': {'side': 'top'},
    '-0.5': {'position': 0.25},
    '0.0': {'position': 0.5},
    '0.5': {'position': 0.75},
    '1.0': {'side': 'bottom'}
  };

  function toPvjson(gpmlPoint, callback) {
    var jsonPoint = {};
    try {
      jsonPoint.x = parseFloat(gpmlPoint.attr('X'));
      jsonPoint.y = parseFloat(gpmlPoint.attr('Y'));

      var relX = String(gpmlPoint.attr('RelX'));
      var relY = String(gpmlPoint.attr('RelY'));

      var side;
      var position;
      if (!!relX && !!relY && relX != 'null' && relY != 'null') {
        if (relX == '0.0' && relY == '0.0') {
          jsonPoint.anchorId = gpmlPoint.attr('GraphRef');
        }
        else {
          side = gpmlRelXToJsonSideAndPositionMapping[relX].side !== undefined ? gpmlRelXToJsonSideAndPositionMapping[relX].side : gpmlRelYToJsonSideAndPositionMapping[relY].side;
          position = gpmlRelXToJsonSideAndPositionMapping[relX].position !== undefined ? gpmlRelXToJsonSideAndPositionMapping[relX].position : gpmlRelYToJsonSideAndPositionMapping[relY].position;
          jsonPoint.anchorId = String(gpmlPoint.attr('GraphRef')) + String(side) + String(position);
        }
      }

      callback(jsonPoint);
    }
    catch (e) {
      console.log("Error converting point to json: " + e.message);
      return e;
    }
  }

  function convertGpmlPositionToJsonPosition(relX, relY) {
  }

  return {
    toPvjson:toPvjson
  };
}();


pathvisiojs.view = pathvisiojs.view || {};

     


pathvisiojs.view.annotation = function(){
  'use strict';
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
    	return pathvisiojs.config.pathwaySearchUriStub + d.header;
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
    render:render
  };
}();


pathvisiojs.view.annotation.citation = function(){
  'use strict';
    function render(organism, node) {
    }

    return {
      render:render
    };
}();


pathvisiojs.view.annotation.xRef = function(){
  'use strict';
  var cachedAnnotationData = {};

  function render(organism, id, datasource, label, desc) {
    var data = getCachedAnnotationData(organism, label, id, datasource);
    if (data){
      //if cache, then use it
      pathvisiojs.view.annotation.render(data);
    }
    else {
      //else render immediate data and loading gif
      var data = {
        "header": label,
        "description": desc,
        "listItems":[pathvisiojs.config.diagramLoadingIconUri] 
      };
      pathvisiojs.view.annotation.render(data);

      //console.log(pathvisiojs.config.bridgedbLinkOutsUriStub);
      //then retrieve the bridgedb data
      var xRefData = pathvisiojs.data.bridgedb.getXrefAnnotationDataByDataNode(organism, id, datasource, label, desc, function(annotationData) {
        setCachedAnnotationData(organism, label, id, datasource, annotationData);
        pathvisiojs.view.annotation.render(annotationData);
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


pathvisiojs.view.pathwayDiagram = function(){
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
    // pathvisiojs.view.pathwayDiagram.svg.load() in the same way as we do for
    // pathvisiojs.view.pathwayDiagram.img.load()

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
      hiddenElements = args.hiddenElements,
      userSpecifiedContainer, // the element matching the user-specified selector. the user specified selector is the parameter "container" in the pathvisiojs.load() method.
      pathvisioJsContainer,
      diagramContainer;

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
        var renderableSourceDataElement = getFirstRenderableSourceDataElement(sourceData);

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

        // ********************************************
        // Check for SVG support. If false, use static image (png, jpg, gif, etc.) fallback
        // ********************************************
        if (renderableSourceDataElement.selectedViewMethod === 'svg') { // TODO get this working in IE9
          loadDiagramArgs.cssUri = cssUri;
          loadDiagramArgs.customMarkers = customMarkers;
          //loadDiagramArgs.customSymbols = customSymbols;
          //*
          pathvisiojs.view.pathwayDiagram.svg.load(loadDiagramArgs, function(diagram) {
            if (!!diagram) {
              callback(null, diagram);
            }
            else {
              // TODO refactor this to not just assume PNG will be available as fallback
              loadDiagramArgs.renderableSourceDataElement = sourceData[1];
              pathvisiojs.view.pathwayDiagram.img.load(loadDiagramArgs, function(diagram) {
                callback(null, diagram);
              });
            }
          });
          //*/
        }
        else {
          pathvisiojs.view.pathwayDiagram.img.load(loadDiagramArgs, function(diagram) {
            callback(null, diagram);
          });
        }
      },
      function(diagram, callback){
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

     


pathvisiojs.view.pathwayDiagram.svg = function(){
  'use strict';

  var shapesAvailable, markersAvailable, contextLevelInput,
    renderableTypeToSvgElementMappings = {
      entityNode: 'g',
      groupNode: 'g',
      interaction: 'path',
      graphicalLine: 'path'
    };

  //calculates the proper scaling and translations to fit content (i.e., diagram) to screen (i.e., viewport)
  function fitAndCenterDiagramWithinViewport(viewport, viewportWidth, viewportHeight, diagramWidth, diagramHeight) {
    // viewport is a d3 selection

    var fitScreenScale = Math.min(viewportWidth/diagramWidth, viewportHeight/diagramHeight);
    var diagramWidthScaled = fitScreenScale * diagramWidth;
    var diagramHeightScaled = fitScreenScale * diagramHeight;

    var xTranslation = viewportWidth/2 - diagramWidthScaled/2 + 10; //plus margin-left
    var yTranslation = viewportHeight/2 - diagramHeightScaled/2 + 20; //plus margin-top

    var translationMatrixString = 'matrix(' + fitScreenScale + ', 0, 0, ' + fitScreenScale + ', ' + xTranslation + ', ' + yTranslation + ') ';
    
    viewport.attr("transform", translationMatrixString);
  }

  function load(args, callbackOutside) {
    var diagramContainer = args.container, //a d3 selection corresponding to the containing element in the parent document
      containerWidth = args.containerWidth,
      containerHeight = args.containerHeight,
      cssUri = args.cssUri,
      renderableSourceDataElement = args.renderableSourceDataElement,
      fitToContainer = args.fitToContainer,
      customMarkers = args.customMarkers,
      //customSymbols = args.customSymbols,
      highlights = args.highlights,
      pathway;


    async.waterfall([
      function(callback){
        async.parallel({
          preloadSvg: function(callback) {
            var preloadDiagramArgs = {};
            preloadDiagramArgs.container = diagramContainer;
            preloadDiagramArgs.customMarkers = customMarkers;
            preloadDiagramArgs.cssUri = cssUri;
            //preloadDiagramArgs.customSymbols = customSymbols;

            pathvisiojs.view.pathwayDiagram.svg.loadPartials(preloadDiagramArgs, function(svg) {
              if (!svg) {
                throw new Error("Could not load SVG template.");
              }

              var results = {};
              results.svg = svg;
              callback(null, results);
            });
          },
          pathway: function(callback){
            pathvisiojs.data.pvjson.get(renderableSourceDataElement, function(json) {
              pathvisiojs.context = json['@context'];

              if (!json || json === 'fail') {
                callbackOutside(null);
                throw new Error("Could not convert input source data to pathvisioJsJson.");
              }

              //console.log('json');
              //console.log(json);
              pathway = json;
              self.myPathway = json;
              callback(null, json);
            });
          }
        },
        function(err, results){
          //TODO get pathwayWidth and Height

          callback(null, results.preloadSvg.svg, results.pathway);
        });
      },
      function(svg, pathway, callback){
        pathvisiojs.view.pathwayDiagram.svg.renderWithCachedData(svg, pathway, function() {
          console.log('finallysvg');
          console.log(svg);
          svg.attr('style', 'display:inline');
          callback(null, svg);
        });
      },
      function(svg, callback) {
        console.log('highlightssvg');
        console.log(svg);
        if (!!highlights) {
          highlights.forEach(function(highlight) {
            pathvisiojs.view.pathwayDiagram.svg.node.highlight(highlight);
          });
        }

        var viewport = svg.select('#viewport');

        /* not all containers will have a width or height style attribute. this is now done using the same logic
         * but uses boundingClientRect() instead. the code is located in pathway-diagram.js
        var container = d3.select('body').select('#diagram-container');
        var containerWidth = parseInt(container.style("width")) - 40; //account for space for pan/zoom controls
        var containerHeight = parseInt(container.style("height")) -20; //account for space for search field
        //*/
        var fitScreenScale;
        if (fitToContainer) {
          fitAndCenterDiagramWithinViewport(viewport, containerWidth, containerHeight, pathway.image.width, pathway.image.height);
        }

        /*
        //TODO get large screen view working
        var zoomInControl = d3.select('#zoom-in')
        .on("click", function(d,i){
          svgPanZoom.zoomIn();
        });
        //*/

        var resetPanZoomControl = d3.select('#reset-pan-zoom')
        .on("click", function(d,i){
          //svgPanZoom.resetZoom();
          fitAndCenterDiagramWithinViewport(viewport, containerWidth, containerHeight, pathway.image.width, pathway.image.height);
        });

        /*
        //TODO get large screen view working
        var zoomOutControl = d3.select('#zoom-out')
        .on("click", function(d,i){
          svgPanZoom.zoomOut();
        });
        //*/

        /*
        //TODO get large screen view working
        var fullscreen = d3.select('#full-screen-control')
        .on("click", function(d,i){
          var pvjs = document.getElementById("pathvisiojs-dev").innerHTML;
          var newwin = window.open('','','width=800,height=600');
          var doc = newwin.document;
          doc.open();
          doc.write(pvjs);
          doc.close();	
        });
        //*/

        svgPanZoom.init({
          'selector': 'svg',
          'zoomEnabled': false,
          'minZoom': '0.1',
          'maxZoom': '8.0',
        });

        var svgInFocus = false;
        svg.on("click", function(d, i){
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
        callback(null, svg);
      },
      function(svg, callback){
        //* Node Highlighter

        var nodeLabels, nodeLabel;
        if (!!pathway) {
          nodeLabels = [];
          if (pathway.hasOwnProperty('DataNode')) {
            pathway.DataNode.forEach(function(node) {
              if (node.hasOwnProperty('text')) {
                nodeLabel = node.text.line[0];
                if (nodeLabels.indexOf(nodeLabel) === -1) {
                  nodeLabels.push(node.text.line[0]);
                }
              }
            });

            // see http://twitter.github.io/typeahead.js/

            $('#highlight-by-label-input').typeahead({
              name: 'Highlight node in pathway',
              local: nodeLabels,
              limit: 10
            });
          }

          /*
             $('.icon-eye-open').click(function(){
             var nodeLabel = $("#highlight-by-label-input").val();
             if (!nodeLabel) {
             console.warn('Error: No data node value entered.');
             }
             else {
             pathvisiojs.view.pathwayDiagram.svg.node.highlightByLabel(svg, nodeLabel);
             }
             });
          //*/
          // see http://api.jquery.com/bind/
          // TODO get selected value better and make function to handle

          $( "#highlight-by-label-input" ).bind("typeahead:selected", function() {
            nodeLabel = $("#highlight-by-label-input").val();
            if (!nodeLabel) {
              throw new Error("No data node value entered for type-ahead node highlighter.");
            }
            else {

              // TODO refactor this so it calls a generic highlightDataNodeByLabel function that can call
              // a highlighter for svg, png, etc. as appropriate.

              pathvisiojs.view.pathwayDiagram.svg.node.highlightByLabel(svg, pathway, nodeLabel);
            }
          });

          d3.select('#clear-highlights-from-typeahead').on('click', function() {
            pathvisiojs.view.pathwayDiagram.svg.node.clearHighlightsFromTypeahead();
          });
          callback(null, svg);
        }
      }
    ],
    function(err, svg) {
      callbackOutside(svg);
    });
  }

  function loadPartials(args, callbackOutside) {
    var diagramContainer = args.container,
      customMarkers = args.customMarkers,
      //customSymbols = args.customSymbols,
      cssUri = args.cssUri;

    async.waterfall([
      function(callback) {
        var svg = diagramContainer.append('div').html(pathvisioNS['tmp/pathvisiojs.svg']).select('#pathvisiojs-diagram')
        .attr('preserveAspectRatio', 'xMidYMid');
        
        console.log('svg');
        console.log(svg);

        callback(null, svg);
      },
      function(svg, callback) {
        if (!!args.customMarkers) {
          pathvisiojs.view.pathwayDiagram.svg.edge.marker.loadAllCustom(svg, customMarkers, function() {
            callback(null, svg);
          });
        }
        else {
          callback(null, svg);
        }
      },
      /*
      function(callback) {
        if (!!args.customSymbols) {
          pathvisiojs.view.pathwayDiagram.svg.symbol.loadAllCustom(svg, customSymbols, function() {
            callback(null);
          })
        }
        else {
          callback(null);
        }
      },
      //*/
      function(svg, callback) {
        console.log('svgtext');
        console.log(svg);
        if (!!cssUri) {
          d3.text(cssUri, 'text/css', function(data) {
            var defs = svg.select('defs');
            var style = defs.append('style').attr('type', "text/css");
            style.text(data);
            callback(null, svg);
          });
        }
        else {
          callback(null, svg);
        }
      }
    ],
    function(err, svg) {
      callbackOutside(svg);
    });
  }

  var convertToId = function(inputString) {
    var id = strcase.paramCase(inputString);
    //var id = (inputString).replace(/[^(\w|\-)]/g, '').toLowerCase();
    // to make valid id per HTML4 spec, I'm ensuring the first character is a letter
    if (!/^[a-zA-Z]/.test(id)) {
      id = 'id-' + id;
    }
    return id;
  };

  var convertToCssClassName = function(inputString) {
    var cssClassName = strcase.paramCase(inputString);
    //var cssClassName = (inputString).replace(/[^(\w|\-)]/g, '').toLowerCase();
    // to make valid cssClassName per HTML4 spec, I'm ensuring the first character is a letter
    if (!/^[a-zA-Z]/.test(cssClassName)) {
      cssClassName = 'class-' + cssClassName;
    }
    return cssClassName;
  };

  // this function does not render all elements. Rather, it renders
  // one or more selected elements that are given as inputs.
  // If one or more of these elements are a groupNode that contains
  // other elements, this function will call itself back to render
  // the elements within the groupNode.
  function appendElementsInDomOrder(args, callback){
    var svg = args.svg,
      data = args.data,
      pathway = args.pathway,
      viewport = args.container,
      container;

    if (!viewport) {
      throw new Error("No viewport specified.");
    }
    if (!data) {
      throw new Error("No data entered to render.");
    }
    if (!svg) {
      throw new Error("No svg specified.");
    }
    if (!pathway) {
      throw new Error("No pathway specified.");
    }
    data = pathvisiojs.utilities.convertToArray(data);

    var i = 0;
    async.each(data, function(item, callbackInside) {
      if (item.key !== 'undefined') {
        container = viewport.select('#' + convertToId(item.key));
      }
      else {
        container = viewport;
      }

      container.selectAll('.element')
      .data(item.values)
      .enter()
      .append(function(d) {
        var childElementName = renderableTypeToSvgElementMappings[strcase.camelCase(d.renderableType)];
        var child = document.createElementNS('http://www.w3.org/2000/svg', childElementName);
        return child;
      })
      .attr("id", function (d) {
        return convertToId(d.id);
      })
      .attr('class', 'element');
      i += 1;

      callbackInside(null);
    },
    function(err){
      callback(null, 'Successfully rendered elements');
    });
  }

  // this function does not render all elements. Rather, it renders
  // one or more selected elements that are given as inputs.
  // If one or more of these elements are a groupNode that contains
  // other elements, this function will call itself back to render
  // the elements within the groupNode.
  function updateElementProperties(args, callback){
    var svg = args.svg,
      data = args.data,
      pathway = args.pathway,
      container = args.container;

        console.log('before update svg');
        console.log(svg[0][0]);
    if (!container) {
      throw new Error("No container specified.");
    }
    if (!data) {
      throw new Error("No data entered to render.");
    }
    if (!svg) {
      throw new Error("No svg specified.");
    }
    if (!pathway) {
      throw new Error("No pathway specified.");
    }
    data = pathvisiojs.utilities.convertToArray(data);
    var renderingArgs = args;

    async.each(data, function(dataElement, callbackInside) {
      renderingArgs.data = dataElement;
      renderingArgs.element = d3.select('#' + convertToId(dataElement.id));
      if (dataElement.renderableType === 'GraphicalLine') {
        pathvisiojs.view.pathwayDiagram.svg.edge.graphicalLine.render(renderingArgs);
      }
else if (dataElement.renderableType === 'Interaction') {
        pathvisiojs.view.pathwayDiagram.svg.edge.interaction.render(renderingArgs);
      }
      else if (dataElement.renderableType === 'GroupNode') {
        pathvisiojs.view.pathwayDiagram.svg.node.groupNode.render(renderingArgs, function(groupContainer, groupContents) {
          // TODO this used to render the group contents, but now the callback does nothing
        });
      }
      else if (dataElement.renderableType === 'EntityNode') {
        pathvisiojs.view.pathwayDiagram.svg.node.EntityNode.render(renderingArgs);
      }

      callbackInside(null);
    },
    function(err){
      callback(svg);
    });




    /*
    data.forEach(function(dataElement) {
      renderingArgs.data = dataElement;
      renderingArgs.element = d3.select('#' + convertToId(dataElement.id));
      if (dataElement.renderableType === 'GraphicalLine') {
        pathvisiojs.view.pathwayDiagram.svg.edge.graphicalLine.render(renderingArgs);
      }
else if (dataElement.renderableType === 'Interaction') {
        pathvisiojs.view.pathwayDiagram.svg.edge.interaction.render(renderingArgs);
      }
      else if (dataElement.renderableType === 'GroupNode') {
        pathvisiojs.view.pathwayDiagram.svg.node.groupNode.render(renderingArgs, function(groupContainer, groupContents) {
          // TODO this used to render the group contents, but now the callback does nothing
        });
      }
      else if (dataElement.renderableType === 'EntityNode') {
        pathvisiojs.view.pathwayDiagram.svg.node.EntityNode.render(renderingArgs);
      }
    });
    callback(null, 'Successfully rendered elements');
    //*/
  }

  function renderWithCachedData(svg, pathway, callback){
    if (!svg) {
      throw new Error("No svg specified.");
    }
    if (!pathway) {
      throw new Error("No data entered to render.");
    }

    var viewport = svg.select('#viewport');

    pathvisiojs.view.pathwayDiagram.svg.infoBox.render(viewport, pathway);

    var renderArgs = {};
    renderArgs.svg = svg;
    renderArgs.container = viewport;
    renderArgs.pathway = pathway;

    async.waterfall([
      function(callbackInside){
        // create the required elements and their ids in DOM order,
        // without specifying width, height, etc.
        renderArgs.data = pathway.pathwayNestedByGrouping;
        appendElementsInDomOrder(renderArgs, function() {
          callbackInside(null, svg);
        });
      },
      function(svg, callbackInside){
        //TODO for the non-cached version, this should sort the elements by dependency, so that group contents are updated before their containing group,
        //and an edge is updated before any edges that rely on it.
        // this would be using something like pathway.pathwayElementsNestedByDependency
        renderArgs.data = pathway.elements;
        updateElementProperties(renderArgs, function(svg) {
        console.log('after update svg');
        console.log(svg[0][0]);
          callback(svg);
        });
      }
    ]);
  }

  return {
    convertToId:convertToId,
    convertToCssClassName:convertToCssClassName,
    renderWithCachedData:renderWithCachedData,
    appendElementsInDomOrder:appendElementsInDomOrder,
    load:load,
    loadPartials:loadPartials
  };
}();


pathvisiojs.view.pathwayDiagram.svg.infoBox = function(){
  'use strict';
    
  function render(viewport, pathway) {
    if (!viewport || !pathway) {
      return console.warn('Error: Missing input parameters.');
    }

    // Although gpml has x and y values for infobox, we have decided to ignore them and always set it in the upper left.

    var infoBox = [];
    if (pathway.hasOwnProperty('Name')) {
      infoBox.push({'key':'Title', 'value':pathway.Name});
    }

    if (pathway.hasOwnProperty('License')) {
      infoBox.push({'key':'Availability', 'value':pathway.License});
    }

    if (pathway.hasOwnProperty('LastModified')) {
      infoBox.push({'key':'Last modified', 'value':pathway.LastModified});
    }

    if (pathway.hasOwnProperty('Organism')) {
      infoBox.push({'key':'Organism', 'value':pathway.Organism});
    }

    /*
    if (pathway.hasOwnProperty('PublicationXref')) {
      pathvisiojs.view.pathwayDiagram.svg.publicationXref.getPublicationXrefString(pathway, pathway.PublicationXref, function(publicationXrefString) {
        infoBox.push({'key':'Citation(s)', 'value':publicationXrefString});
      })
    }
    //*/

    var infoBox = viewport.selectAll("g.info-box")
    .data([infoBox])
    .enter()
    .append("g")
    .attr("id", function (d,i) {return "info-box-" + i; })
    .attr("class", "text-area info-box");

    var infoBoxItems = infoBox.selectAll("text")
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


// This class is for SVG Symbols. Note that SVG Use Elements display instances SVG Symbols,
// but SVG Symbols are never visible on their own.
// See also: ./node/use-element.js


pathvisiojs.view.pathwayDiagram.svg.symbol = function(){
  'use strict';

  // a hack because I don't know how to pass the svg variable to the function appendCustom() when it's part of async.each().
  // TODO refactor
  var svg;

  var semanticNameToIdMapping = { 
    'datanode':'shape-library-symbols-rectangle-svg',
  };

  function appendCustom(uniqueSymbolShapeUri, callback) {
    var img, width, height, imgChildren;
    var dimensions = null;

    var symbolId = strcase.paramCase(uniqueSymbolShapeUri)
    var defsSection = svg.select('defs');
    var symbol = defsSection.select('#' + symbolId);
    if (!symbol[0][0]) {
      symbol = defsSection.append('symbol')
      .attr('id', symbolId)
      .attr('preserveAspectRatio', 'none');
    }
    else {
      symbol.selectAll('*').remove();
    }

    // ignoring non-svg symbols for now
    if (1===1) {
    //if (symbolType === 'svg') {
      d3.xml(uniqueSymbolShapeUri, "image/svg+xml", function(svgXml) {
        img = d3.select(svgXml.documentElement)
        width = img.attr('width');
        height = img.attr('height');
        symbol.attr('viewBox', '0 0 ' + width + ' ' + height);
        imgChildren = img[0][0].children;
        do {
          symbol[0][0].appendChild(imgChildren[0]);
        } while (imgChildren.length > 0);
        callback(null);
      });
    }
    else {
      img = document.createElement('img');
      img.src = uniqueSymbolShapeUri;
      img.onload = function() {
        symbol.attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
        dimensions = symbol.attr('viewBox').split(' ');
        symbol.append('image').attr('xlink:xlink:href', uniqueSymbolShapeUri)
        .attr('x', dimensions[0])
        .attr('y', dimensions[1])
        .attr('width', dimensions[2])
        .attr('height', dimensions[3])
        .attr('externalResourcesRequired', "true");
        callback(null);
      }
    }
  }

  function loadAllCustom(thisSvg, customSymbols, callback) {
    svg = thisSvg;

    var uniqueSymbolShapeUris = [];
    customSymbols.forEach(function(customSymbol){
      semanticNameToIdMapping[customSymbol.semanticName] = strcase.paramCase(customSymbol.uri);
      if (uniqueSymbolShapeUris.indexOf(customSymbol.uri) === -1) {
        uniqueSymbolShapeUris.push(customSymbol.uri);
      }
    });

    async.each(uniqueSymbolShapeUris, appendCustom, function(err){
      // if any of the saves produced an error, err would equal that error
      callback(null);
    });
  }

  function getAllSymbolNames(svg, callback) {
    var allSymbolNames = svg.selectAll('symbol')[0].map(function(symbol) {
      return strcase.paramCase(symbol.id);
    })
    callback(allSymbolNames);
  }

  return {
    loadAllCustom:loadAllCustom,
    semanticNameToIdMapping:semanticNameToIdMapping,
    getAllSymbolNames:getAllSymbolNames
  };
}();


pathvisiojs.view.pathwayDiagram.svg.publicationXref = function(){
  'use strict';

  function getReferenceNumberForDisplay(pathway, rdfId) {
    var displayNumberForDisplay = null;
    var i = -1;
    var currentPublicationXref;
    var found = false;

    do {
      i += 1;
      currentPublicationXref = pathway.Biopax.PublicationXref[i];
      if (typeof currentPublicationXref != 'undefined'){
        if (currentPublicationXref.rdfId === rdfId) {
          found = true;
          displayNumberForDisplay = i + 1;
        }
      }
    } while (found === false && i < pathway.Biopax.PublicationXref.length);

    return displayNumberForDisplay;
  }

  // Create a string of citation numbers for display,
  // delimited by commas, and
  // replacing any consecutive series of numbers with the
  // first and last joined by a hyphen.
  function createPublicationXrefString(displayNumbers) {
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
  }

  function getPublicationXrefString(pathway, rdfIds, callback) {
    var displayNumbers = [];
    var publicationXrefString = '';
    // make sure it's an array
    rdfIds = pathvisiojs.utilities.convertToArray(rdfIds);
    rdfIds.forEach(function(rdfId) {
      var num = getReferenceNumberForDisplay(pathway, rdfId);
      if(!!num) {
        displayNumbers.push(num); 
      }	
    });
    if (displayNumbers.length > 0){
      publicationXrefString = createPublicationXrefString(displayNumbers);
    }
    callback(publicationXrefString);
  }

  function render(target, targetType, pathway, rdfIds) {
    /* targetType can be any of the following:
     * node
     * edge
     * not currently but maybe in the future: diagram (applies to the whole pathway)
    //*/

    var viewport, text;
    getPublicationXrefString(pathway, rdfIds, function(publicationXrefString) {
      if (targetType === 'node') {
	var nodeWidth = target[0][0]['__data__'].width;
	var textLength = publicationXrefString.toString().length;
	var offset = nodeWidth - textLength *3 / 2 - 2;
        target.append('text')
        .attr('class', 'citation')
        .attr('transform', function(d) {return 'translate('+offset+' -4)';})
        .text(publicationXrefString);
      }
      else {

        // TODO don't repeat svg definition
        viewport = d3.select('svg > #viewport');
        if (targetType === 'edge') {
          viewport = d3.select('svg > #viewport');
          text = viewport.append('text')
          .attr('class', 'citation')
          .attr('transform', function(d) {return 'translate(0 -10)';});

          text.append('textPath')
          .attr('xlink:xlink:href', '#' + target)
          .attr('startOffset', '50%')
          .text(publicationXrefString);

        }
        else {
          throw new Error('Pathvisiojs cannot render a citation for targets of this type: ' + targetType);
        }
      }
    })

  }

  return {
    getPublicationXrefString:getPublicationXrefString,
    render:render
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node = function(){
  'use strict';
  function dragmove(d) {
    /*
    console.log(d3.event.x);
    console.log('d');
    console.log(d);
    console.log(d.id);
    console.log('this');
    console.log(this);
    //*/
    // don't have anchors rendered yet
    /*
    var changingAnchors = pathwayHere.elements.filter(function(element) {return element.parentId === d.id});
    var d3Node = self.d3Node = d3.select(this);
    console.log('changingAnchors');
    console.log(changingAnchors);
    d3Node.attr('transform', function(d) {return 'translate(' + d3.event.x + ' ' + d3.event.y + ')';});
    changingAnchors.forEach(function(anchor){
      console.log('anchor');
      console.log(anchor);
      console.log(d3Node);
      self.d3Node = d3Node;
      self.anchor = anchor;
      anchor.x = d3Node.select('#' + anchor.id)[0][0].getCTM().e;
      anchor.y = d3Node.select('#' + anchor.id)[0][0].getCTM().f; 
    })
    //*/
    d.x = d3.event.x;
    d.y = d3.event.y;


    /*
    var args = {};
    args.svg = d3.select('svg');
    args.pathway = pathwayHere;
    args.uniformlyScalingShapesList = uniformlyScalingShapesListHere;
    pathvisiojs.view.pathwayDiagram.svg.render(args, function(){console.log('rendered after drag');});
    */
  }

  function render(args, callback) {
    if (!args) {
      throw new Error('Need input args to render a node.');
    }

    var nodeContainer = args.element,
      data = args.data,
      pathway = args.pathway,
      parentDataElement,
      translatedX,
      translatedY;

    if (!pathway) {
      throw new Error('Need a pathway to render a node.');
    }
    if (!nodeContainer) {
      throw new Error('Need a nodeContainer to render a node.');
    }
    if (!data) {
      throw new Error('Need input data to render a node.');
    }

    if (data.hasOwnProperty('isContainedBy')) {
      parentDataElement = pathway.elements.filter(function(element) {
        return element.id === data.isContainedBy;
      })[0];
      translatedX = data.x - parentDataElement.x;
      translatedY = data.y - parentDataElement.y;
    }
    else {
      translatedX = data.x;
      translatedY = data.y;
    }

    /************ 
     * container
     * *********/

    var drag = d3.behavior.drag()
      .origin(Object)
      .on("drag", dragmove);

    nodeContainer.attr('transform', function(d) {
      return 'translate(' + translatedX + ' ' + translatedY + ')';
    })
    .attr("style", function (d) {
      var style = '';
      if (d.hasOwnProperty('backgroundColor')) {
        if (d.ShapeType == 'brace' || d.ShapeType == 'arc'){
          //Brace color is NOT for fill and should always be transparent
          style = 'fill-opacity:0; ';
        }
        else if (d.nodeType == 'Label' && d.backgroundColor == '#ffffff'){
          //Label fill attr is programmatically IGNORED when set to Java editor default of white.
          //This is obviously a hack that should ultimately be resolved by fixing the editor's 
          // default for label backgroundColor.
          style = '' ;
        }
        else {
          style = 'fill:' + d.backgroundColor + '; fill-opacity:1; ';
        }
      }
      return style;
    })
    .call(drag);



    /****************** 
     * background shape
     * ***************/

    var shapeType = strcase.paramCase(data.ShapeType);
    
    // check for whether desired shape type is available as a symbol
//    if (pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping.hasOwnProperty(shapeType)) {
      //console.log('We will use an SVG "use" element to render this ' + shapeType);
//      pathvisiojs.view.pathwayDiagram.svg.node.useElement.render(nodeContainer, data);
//    }
    // else check for whether it is available as a pathShape
//    else {
      //console.log('We will use a pathShape to render this ' + shapeType);
      pathvisiojs.view.pathwayDiagram.svg.node.pathShape.render(nodeContainer, data);
//    }

    /****************** 
     * text label
     * ***************/

    if (data.hasOwnProperty('text')) {
      pathvisiojs.view.pathwayDiagram.svg.node.text.render(nodeContainer, data);
    }

    /****************** 
     * citation(s)
     * ***************/

    if (data.hasOwnProperty('PublicationXref')) {
      pathvisiojs.view.pathwayDiagram.svg.publicationXref.render(nodeContainer, 'node', args.pathway, data.PublicationXref);
    }

    callback(nodeContainer);
  }

  /*
  function renderAll(nodes, pathway, allSymbolNames) {
    if (!nodes || !pathway || !allSymbolNames) {
      //console.log(args.allSymbolNames);
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!args.allSymbolNames) {
        console.log('args.allSymbolNames not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or args.allSymbolNames.');
    }

    var nonuniformlyScalingNodes = nodes.filter(function(d, i) { return allSymbolNames.indexOf(d.shapeType) === -1; });

    // Update… 
    var nodes = nonuniformlyScalingNodes.selectAll("path.shape")
    .data(function(d) {
      return nonuniformlyScalingNodes;
    })
    .call(render);

    // Enter…
    nodes.enter().append("path")
    .call(render);

    // Exit…
    nodes.exit().remove();

  }
  //*/

  function getPortCoordinates(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  }

  function highlight(args) {
    var getSelector = {
      selector: function(input) {
        return input;
      },
      label: function(input) {
        var selector = '.' + pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName('label-' + decodeURIComponent(input));
        return selector;
      },
      xref: function(input) {
        var selector = '.' + pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName('xref-' + decodeURIComponent(input));
        return selector;
      }
    };

    var argsEntries = d3.map(args).entries();
    var methodsInGetSelector = d3.map(getSelector).keys();
    var i = 0;
    var selector, method, methodIndex;
    do {
      methodIndex = methodsInGetSelector.indexOf(argsEntries[i].key);
      if (methodIndex !== -1) {
        method = methodsInGetSelector[methodIndex];
        selector = getSelector[method](argsEntries[i].value);
      }
      i += 1;
    } while ((!selector) && i < argsEntries.length);

    var cssClass = args.cssClass || 'highlighted-node',
    style = args.style,
    svgId = args.svgId || 'pathvisiojs-diagram';

    var svg = d3.select('#' + svgId);
    var styles, styleString = '';
    if (!!style) {
      styles = d3.map(style).entries();
      styles.forEach(function(styleAttribute) {
        styleString += strcase.paramCase(styleAttribute.key) + ':' + styleAttribute.value + '; ';
      });
    }
    var selectedNodes = svg.selectAll(selector);
    selectedNodes.each(function() {
      var node = d3.select(this);
      var height = node[0][0].getBBox().height;
      var width = node[0][0].getBBox().width;
      //TODO get the border width and set the offset based on border width
      var highlighter = node.append('rect')
      .attr('x', -2.5)
      .attr('y', -2.5)
      .attr('class', cssClass)
      .attr('style', styleString)
      .attr('width', width + 5)
      .attr('height', height + 5);
    });
  }

  function highlightByLabel(svg, pathway, nodeLabel) {
    var svgId = svg.attr('id') || 'pathvisiojs-diagram';
    svg.selectAll('.highlighted-from-typeahead').remove();
    var args = {};
    args.svgId = svgId;
    args.label = nodeLabel;
    args.cssClass = 'highlighted-node highlighted-from-typeahead';
    highlight(args);
    d3.select('#clear-highlights-from-typeahead')[0][0].style.visibility = 'visible';
  }

  function clearHighlightsFromTypeahead(svgId) {
    svgId = svgId || 'pathvisiojs-diagram';
    var svg = d3.select('#' + svgId);
    svg.selectAll('.highlighted-from-typeahead').remove();
    // TODO this won't work well if we have more than one diagram on the page
    var highlightByLabelInput = d3.select('#highlight-by-label-input');
    highlightByLabelInput[0][0].value = '';
    highlightByLabelInput.attr('placeholder', '');
    d3.select('#clear-highlights-from-typeahead')[0][0].style.visibility = 'hidden';
  }

  return {
    //renderAll:renderAll,
    render:render,
    getPortCoordinates:getPortCoordinates,
    highlight:highlight,
    highlightByLabel:highlightByLabel,
    clearHighlightsFromTypeahead:clearHighlightsFromTypeahead
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.anchor = function(){
  'use strict';

  function render(container, parentEdgeId, data) {
    // renders all anchors for a given edge

    // TODO look at using markers for this instead of independent symbols

    /*    if (!svg) {
          throw new Error('svg missing for rendering anchors.');
          }
    //*/    

    if (!container) {
      throw new Error('container element not specified for rendering anchors.');
    }
    if (!parentEdgeId) {
      throw new Error('parentEdgeId missing for rendering anchors.');
    }
    if (!data) {
      throw new Error('anchor data missing for rendering anchors.');
    }

    // make sure it's an array
    data = pathvisiojs.utilities.convertToArray(data);

    var defaultAnchorWidth = 10;
    var defaultAnchorHeight = 10;

    // TODO refactor svg.node.render() so we can use it for the other nodes and for anchors instead of basically repeating much of that method here
    var nodeContainer = container.selectAll('.node.anchor.parent-edge-' + pathvisiojs.view.pathwayDiagram.svg.convertToId(parentEdgeId))
    .data(data)
    .enter()
    .append("g")
    .attr('transform', function(d) {
      var anchorCoordinates = pathvisiojs.view.pathwayDiagram.svg.edge.getPointAtPositionById(parentEdgeId, d.anchorPosition)
      var translateX = anchorCoordinates.x - defaultAnchorWidth/2;
      var translateY = anchorCoordinates.y - defaultAnchorHeight/2;
      return 'translate(' + translateX + ' ' + translateY + ')';
    })
    .attr('class', 'node anchor parent-edge-' + pathvisiojs.view.pathwayDiagram.svg.convertToId(parentEdgeId))
    .attr("style", function (d) {
      var style;
      if (d.hasOwnProperty('backgroundColor')) {
        if (d.ShapeType == 'brace' || d.ShapeType == 'arc'){ 
          //Brace color is NOT for fill and should always be transparent
          style = 'fill-opacity:0; ';
        } 
        else if (d.nodeType == 'Label' && d.backgroundColor == '#ffffff'){  
          //Label fill attr is programmatically IGNORED when set to Java editor default of white.
          //This is obviously a hack that should ultimately be resolved by fixing the editor's 
          // default for label backgroundColor.
          style = '' ;
        }
        else {
          style = 'fill:' + d.backgroundColor + '; fill-opacity:1; ';
        }
      }
      return style;
    })
    .each(function(d) {
      var thisNodeContainer = d3.select(this);
      if (!d.width) {
        d.width = defaultAnchorWidth;
      }
      if (!d.height) {
        d.height = defaultAnchorHeight;
      }
      pathvisiojs.view.pathwayDiagram.svg.node.pathShape.render(thisNodeContainer, d);
    });

    /*
    var anchors = container.selectAll('use.anchor.parent-edge-' + strcase.paramCase(parentEdgeId))
    .data(data)
    .enter()
    .append('use')
    .attr('x', function(d) {
      var anchorCoordinates = pathvisiojs.view.pathwayDiagram.svg.edge.getPointAtPositionById(parentEdgeId, d.anchorPosition)
      return anchorCoordinates.x - defaultAnchorWidth/2;
    })
    .attr('y', function(d) {
      var anchorCoordinates = pathvisiojs.view.pathwayDiagram.svg.edge.getPointAtPositionById(parentEdgeId, d.anchorPosition)
      return anchorCoordinates.y - defaultAnchorHeight/2;
    })
    .attr('width', defaultAnchorWidth)
    .attr('height', defaultAnchorHeight)
    .attr('xlink:xlink:href', function(d) {
      var backgroundImageId;
      var backgroundImage = d.backgroundImage;
      if (!!backgroundImage) {
        // check for whether desired shape type is available as a symbol
        backgroundImageId = pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping[strcase.paramCase(backgroundImage)]; 
        if (!!backgroundImageId) {
          //console.log('We will use an SVG "use" element to render this ' + shapeType);
          return '#' + backgroundImageId;
        }
        else {
          return 'none'
        }
      }
      else {
        return 'none'
      }
    })
    .attr('class', 'node anchor parent-edge-' + strcase.paramCase(parentEdgeId))
    .attr('style', function(d) {
      var style = ''
      if (d.hasOwnProperty('backgroundColor')) {
        style += 'fill:' + d.backgroundColor + '; ';
      }
      return style;
    })
    //*/

  }

  return {
    render:render
    //renderAll:renderAll
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.EntityNode = function(){
  'use strict';
  function render(args) {
    if (!args.data) {
      throw new Error('EntityNode data missing.');
    }
    if (!args.pathway) {
      throw new Error('Pathway not specified for this EntityNode. Pathway is needed for items like setting the Organism for DataNode annotations.');
    }

    pathvisiojs.view.pathwayDiagram.svg.node.render(args, function(nodeContainer) {
      nodeContainer.attr("class", function (d) {
        var cssClass = 'node entity-node ' + pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName(d.nodeType) + ' ';
        if (d.nodeType === 'DataNode') {
          cssClass += pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName(d.dataNodeType) + ' ';
          cssClass += pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName('label-' + decodeURIComponent(d.text.line[0])) + ' ';
          if (!!d.DatasourceReference) {
            cssClass += 'has-xref ';
            cssClass += pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName('xref-' + decodeURIComponent(d.DatasourceReference.ID + ',' + d.DatasourceReference.Database)) + ' ';
          }
        }
        if (d.hasOwnProperty('CellularComponent')) {
          cssClass += 'cellular-component ' + pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName(d.CellularComponent) + ' ';
        }
        return cssClass;
      });
      if (args.data.nodeType === 'DataNode') { //all datanodes should be clickable
        var notDragged = true;
        nodeContainer
        .on("mousedown", function(d,i) {
          notDragged = true;
        })
        .on("mousemove", function(d,i) {
          notDragged = false;
        })
        .on("mouseup", function(d,i) {
          if (notDragged) {
            var dfId = null, dfDb = null;
            if (!!d.DatasourceReference){
              if (!!d.DatasourceReference.ID && !!d.DatasourceReference.Database){
                dfId = d.DatasourceReference.ID;
                dfDb = d.DatasourceReference.Database;
              }
            }

            pathvisiojs.view.annotation.xRef.render(args.pathway.Organism, dfId, dfDb, d.text.line.join(' '), d.dataNodeType); //that's capital 'O' Organism from GPML vocab

          }
        });
      }
    });
  }

  return {
    render:render
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape = function(){
  'use strict';

  function render(parent, data) {
    console.log('data');
    console.log(data);
    console.log(data.width);
    console.log(data.height);
    /*
    console.log(parent);
    console.log(data);
    //*/
    var re;
    var pathShapeNameToUse = strcase.camelCase(data.ShapeType);
    if (!pathvisiojs.view.pathwayDiagram.svg.node.pathShape.hasOwnProperty(pathShapeNameToUse)) {
      re = /Double$/gi;
      pathShapeNameToUse = pathShapeNameToUse.replace(re, '');
      if (pathvisiojs.view.pathwayDiagram.svg.node.pathShape.hasOwnProperty(pathShapeNameToUse)) {
        console.warn('Requested pathShape "' + data.ShapeType + '" is not available with linetype of "Double". Using linetype of "Solid" instead');
      }
      else {
        console.warn('Requested pathShape "' + data.ShapeType + '" is not available. Using pathShape "rounded-rectangle" instead');
        pathShapeNameToUse = 'roundedRectangle';
      }
    }

    //style attribute modified on parent 
    /*
    var style = parent.attr('style');
    parent.attr('style', function(d) {
        if(d.hasOwnProperty('borderColor')) {
  if(d.nodeType != 'Label'){  //Label "Color" attrs are NOT for borderColor of svg-specific rectangle shape
        style += 'stroke:' + d.borderColor + '; ';
  }
        }
        return style;})
        //*/

    //other attributes extracted and applied to new g element
    var stroke = 1;
    var transform = '';
    var g = parent.insert('g', ':first-child');
    g.attr('stroke-width', function(d) {
      if (!!d.borderWidth) {
        stroke = d.borderWidth; //LineThickness in GPML
      }
      return stroke;
    })
    .attr('transform', function(d) {
      if (!!d.rotate) {
        transform += ' rotate(' + d.rotate + ',' + d.width/2 + ',' + d.height/2 + ')';
      }
      return transform;
    });

    var nodeAttributes = pathvisiojs.view.pathwayDiagram.svg.node.pathShape[pathShapeNameToUse].getAttributes(data.width, data.height, data.borderWidth);
    nodeAttributes.forEach(function(attribute) {
      if(attribute.scale){
        g.attr('stroke-width', function(d) {
          return stroke / ((d.width + d.height) / 200);
        })
        .attr('transform', function(d) {
          transform += ' scale('+d.width/100+', '+d.height/100+')';
          return transform;
        });
     }

      //handle alt path types and lists of attrs
      var child = 'path';
      var names = [attribute.name];
      var paths = [attribute.path];
      if (attribute.alt){
        child = attribute.alt;
        names = attribute.name;
        paths = attribute.path;
      }
      var childElement = g.append(child);
      for(var i = 0; i < names.length; i++){
        childElement.attr(names[i], paths[i]);
      }
    });
  }

  /*
  function render(pathShape) {

    // TODO this seems like a hack. How can the code be refactored so this line below is not needed?

    if (!pathShape[0] || pathShape[0].length < 1) {return 'nonuniformlyScalingNodes empty'};
    self.pathShape = pathShape;
    pathShape.attr('id', function (d) {return 'shape-' + d.id;})
    .attr('class', function (d) {
      var cssClass = '';
      if (d.elementType === 'data-node') {
        cssClass = 'shape ' + d.dataNodeType + ' ' + d.shapeType;
      }
      else {
        cssClass = 'shape ' + d.shapeType;
      }
      return cssClass;
    })

    // TODO there must be a cleaner, less brittle way of getting nodeData here

    var nodeData = pathShape[0].parentNode.__data__;
    var shapeType = strcase.camelCase(nodeData.shapeType);
    var pathShapeAttributes = pathvisiojs.view.pathwayDiagram.svg.node.shape.pathShape[shapeType].getAttributes(nodeData.width, nodeData.height);
    pathShapeAttributes.forEach(function(attribute) {
      pathShape.attr(attribute.name, attribute.value)
    });
  }
  //*/

 /*
  function renderAll(nodes, pathway, allSymbolNames) {
    if (!nodes || !pathway || !allSymbolNames) {
      //console.log(allSymbolNames);
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!allSymbolNames) {
        console.log('allSymbolNames not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or allSymbolNames.');
    }

    var nonuniformlyScalingNodes = nodes.filter(function(d, i) { return allSymbolNames.indexOf(d.shapeType) === -1; });

    // Update… 
    var pathShapes = nonuniformlyScalingNodes.selectAll("path.shape")
    .data(function(d) {
      return nonuniformlyScalingNodes;
    })
    .call(render);

    // Enter…
    pathShapes.enter().append("path")
    .call(render);

    // Exit…
    pathShapes.exit().remove();

  }
  //*/

  return {
    //renderAll:renderAll,
    render:render
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.arc = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm99.5,50c0,27.338341 -22.162117,49.5 -49.5,49.5s-49.5,-22.161659 -49.5,-49.5'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.brace = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm1.5,98.5c0,-32.50001 8.16667,-48.75 24.5,-48.75s24.5,-16.25001 24.5,-48.75c0,32.49999 8.16666,48.75 24.49999,48.75s24.5,16.24999 24.5,48.75'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.complex = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight) {
      var attributes = [
        {
          name:'d',
          path: 'M ' + (0 + 18) + ' ' + 0 +
            ' L ' + (0 + nodeWidth - 18) + ' ' + 0 +
            ' L ' + (0 + nodeWidth) + ' ' + (0 + 18) +
            ' L ' + (0 + nodeWidth) + ' ' + (0 + nodeHeight - 18) +
            ' L ' + (0 + nodeWidth - 18) + ' ' + (0 + nodeHeight) +
            ' L ' + (0 + 18) + ' ' + (0 + nodeHeight) +
            ' L ' + (0) + ' ' + (0 + nodeHeight - 18) +
            ' L ' + (0) + ' ' + (0 + 18) +
            ' Z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.endoplasmicReticulum = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm73.52756,56.60967c-5.62457,-18.60675 23.51463,-32.43358 23.40173,-45.06604c-0.34426,-4.86102 -10.48934,-8.89743 -18.28974,-5.33395c-17.04119,7.87556 -15.64949,29.30503 -21.20533,42.23387c-0.35661,3.60951 -7.36274,2.46926 -7.74964,-0.48694c-5.8512,-11.38871 17.13534,-24.48692 5.96075,-29.42586c-19.63467,-8.16979 -28.75184,21.15346 -22.0682,28.81784c7.4956,14.17602 -2.17949,24.40679 -6.74689,15.49637c-2.44209,-5.30613 6.06605,-11.08445 -0.80351,-16.17689c-4.31991,-2.79993 -11.75555,-0.64618 -16.15468,3.0943c-12.89117,10.73799 4.72957,40.98145 20.96467,36.14635c4.69833,-1.95989 -3.23603,-8.70151 3.90717,-9.59951c7.29767,-0.81255 5.17628,6.18889 7.68745,9.22691c2.3071,4.0509 4.83232,8.35538 10.7626,11.6237c4.78642,2.53724 15.29437,2.11225 16.77148,-1.95795c2.0318,-9.26291 -26.11129,-28.35848 -10.68903,-31.2815c18.55524,-2.71473 4.74866,23.84573 24.31006,29.69419c9.50188,2.02824 15.63902,-0.62194 14.81255,-4.03272c-2.74586,-11.26327 -25.13557,-22.6802 -24.96441,-33.14968'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.golgiApparatus = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm58.4671,16.99297c-22.2053,-19.30712 37.3101,-19.538 25.5673,-3.1145c-8.8077,11.998 -17.0665,37.53828 -0.9417,64.06707c13.3147,17.47735 -41.7485,17.92546 -27.7555,-0.94919c11.3458,-18.99656 10.2868,-51.87342 3.1299,-60.00338l0,0z'
        },
	{
	  name:'d',
	  path: 'm31.2144,22.48219c-10.7917,-13.83614 29.8976,-12.81612 18.4075,0.4332c-4.067,4.79263 -5.7828,39.75796 1.1607,48.44653c8.5294,12.0082 -32.853,12.49764 -20.5002,-1.45349c6.9528,-11.2083 10.4738,-33.76451 0.932,-47.42624l0,0z'
	},
	{
	  name:'d',
	  path: 'm29.80396,32.77896c1.58418,7.4093 2.72346,10.80737 -1.48298,24.77019c-3.73195,8.38708 -3.6004,10.5513 -11.73233,12.53496c-6.6833,1.07092 -11.86483,-6.32111 -4.7933,-10.40477c4.85573,-3.63095 6.14109,-7.02681 6.65889,-14.82198c-0.23922,-6.14805 0.8145,-10.21755 -5.36692,-12.88742c-7.62432,-1.41744 -6.08804,-10.67651 4.82406,-8.95195c5.84935,0.66319 10.2824,5.52823 11.89258,9.76096z'
	}
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.gridSquare = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
	  scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm1,1l99,0l0,99l-99,0l0,-99z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.hexagon = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm1.42004,50.99635l21.07262,-42.13943l56.19152,0l21.0667,42.13943l-21.0667,42.14507l-56.19152,0l-21.07262,-42.14507z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.mimDegradation = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm8,50c0,-23.20442 18.79558,-42 42,-42c23.20442,0 42,18.79558 42,42c0,23.20442 -18.79558,42 -42,42c-23.20442,0 -42,-18.79558 -42,-42z'
        },
	{
	  name:'d',
	  path:'m1,1l99,99'
	}
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.mitochondria = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm0,50c0,-27.62431 22.37569,-50 50,-50c27.62431,0 50,22.37569 50,50c0,27.62431 -22.37569,50 -50,50c-27.62431,0 -50,-22.37569 -50,-50z'
        },
	{
	  name:'d',
	  path: 'm14.894899,26.347357c4.363817,-0.741571 3.827518,17.036169 8.182638,16.183825c8.27347,0.030762 2.982006,-28.148991 9.899754,-28.336687c6.967995,-0.187704 2.246651,29.947527 9.204983,29.43981c7.632813,-0.560024 0.507309,-32.935357 8.136253,-33.623082c7.698521,-0.689259 2.919197,32.039941 10.628349,32.224557c6.546684,0.160011 3.026451,-27.642808 9.56057,-26.921232c7.192177,0.79388 0.664818,29.842905 7.781624,31.667604c4.748405,1.215439 4.420822,-18.257757 9.204018,-17.440804c11.128883,7.577278 8.628105,37.698658 -2.179977,44.645138c-3.138542,0.698479 -3.965698,-10.502029 -7.112938,-9.905075c-5.59005,1.058502 -3.982124,22.284088 -9.603096,21.799461c-5.239281,-0.456947 -2.226364,-21.636383 -7.47047,-21.730232c-6.961235,-0.116928 -3.357895,28.924408 -10.316231,28.495148c-6.140846,-0.375397 -1.73064,-24.950363 -7.825104,-26.191963c-5.681847,-1.156982 -5.378429,22.170242 -11.027426,20.680939c-6.249069,-1.644684 -0.469624,-26.673519 -6.759275,-27.865887c-3.728954,-0.706188 -2.647665,14.400654 -6.403677,14.545292c-14.016198,-5.938736 -15.748776,-39.707981 -3.899994,-47.666811z'
	}
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.none = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'M0 0'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.oval = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm0,50c0,-27.62431 22.37569,-50 50,-50c27.62431,0 50,22.37569 50,50c0,27.62431 -22.37569,50 -50,50c-27.62431,0 -50,-22.37569 -50,-50z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.ovalDouble = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight) {
      var attributes = [
        {
          name:['ry','rx','cy','cx'],
	  alt:'ellipse',
          path:[nodeHeight/2,nodeWidth/2,nodeHeight/2,nodeWidth/2] 
	},
        {
          name:['ry','rx','cy','cx'],
          alt:'ellipse',
          path:[nodeHeight/2-6,nodeWidth/2-6,nodeHeight/2,nodeWidth/2]
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.pentagon = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'm0,'+0.81*nodeHeight+'l0,-'+0.62*nodeHeight+'l'+0.62*nodeWidth+',-'+0.19*nodeHeight+'l'+0.38*nodeWidth+','+0.5*nodeHeight+'l-'+0.38*nodeWidth+','+0.5*nodeHeight+'l-'+0.62*nodeWidth+',-'+0.19*nodeHeight+'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.rectangle = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'm0,0l'+ nodeWidth +',0l0,'+ nodeHeight + 'l-' + nodeWidth +',0l0,-' + nodeHeight +'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.roundedRectangle = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'm0,10c0,-5.43379 4.56621,-10 10,-10l' 
		+ (nodeWidth - 20) 
		+ ',0c5.43379,0 10,4.56621 10,10l0,'
		+ (nodeHeight - 20) 
		+ 'c0,5.43379 -4.56621,10 -10,10l' 
		+ (20 - nodeWidth) 
		+ ',0c-5.43379,0 -10,-4.56621 -10,-10l0,' 
		+ (20 - nodeHeight) 
		+ 'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.roundedRectangleDouble = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight) {
    var attributes = [
      {
        name:'d',
        path:
          'm6,13c0,-3.80365 3.19635,-7 7,-7l'
        + (nodeWidth - 26)
        + ',0c3.80365,0 7,3.19635 7,7l0,'
        + (nodeHeight - 26)
        + 'c0,3.80365 -3.19635,7 -7,7l'
        + (26 - nodeWidth)
        + ',0c-3.80365,0 -7,-3.19635 -7,-7l0,'
        + (26 - nodeHeight)
        + 'z'
      },
      {
        name:'d',
        path: 'm0,10c0,-5.43379 4.56621,-10 10,-10l'
        + (nodeWidth - 20)
        + ',0c5.43379,0 10,4.56621 10,10l0,'
        + (nodeHeight - 20)
        + 'c0,5.43379 -4.56621,10 -10,10l'
        + (20 - nodeWidth)
        + ',0c-5.43379,0 -10,-4.56621 -10,-10l0,'
        + (20 - nodeHeight)
        + 'z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.sarcoplasmicReticulum = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          scale:'true', //adds transform and stroke-width attrs to g container
          path: 'm46.60182,1.40724c-32.37224,1.34138 -36.32004,22.77011 -26.50318,38.12777c9.31826,18.3425 -18.7656,30.15016 2.56955,49.37807c16.82126,13.11594 46.33175,6.10508 52.12638,-8.56826c5.89916,-15.24847 -10.95099,-26.0272 -3.29316,-40.96135c10.85342,-19.88432 -0.77615,-38.13043 -24.89959,-37.97624z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.pathShape.triangle = function(){
  'use strict';

  function getAttributes(nodeWidth, nodeHeight, borderWidth) {
      var attributes = [
        {
          name:'d',
          path: 'm0,'+nodeHeight+'l0,-'+nodeHeight+'l'+nodeWidth+','+nodeHeight/2+'l-'+nodeWidth+','+nodeHeight/2+'z'
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.text = function(){
  'use strict';

  // for more details, see 
  // http://www.w3.org/TR/SVG11/text.html#TextAnchorProperty
  // start | middle | end | inherit
  // and
  // http://www.w3.org/TR/CSS2/text.html#alignment-prop
  // left | right | center | justify | inherit

    /*
    'left': 'start',
    'right': 'end',
    'center': 'middle',
    'inherit': 'inherit',
    'justify': null
    //*/


  function render(nodeContainer, data) {
    // TODO make a better caching system
    var cache = {};
    cache.padding = 5;
    var text = {};
    text.cache = {};
    text.cache.fontSize = 12;
    text.cache.alignmentBaseline = data.text.verticalAlign;
    text.cache.textAnchor = function() {
      if (data.text.textAlign == 'left'){
        return 'start';
      } else if (data.text.textAlign == 'right') {
        return 'end';
      } else {
        return 'middle';
      }
    };
    text.cache.x = function() {
      if (data.text.textAlign == 'left'){
        return -1 * data.width / 2;
      } else if (data.text.textAlign == 'right') {
        return data.width / 2;
      } else {
        return 0;
      }
    };
    text.cache.translate = {};
    // TODO replace this with the actual translate values
    text.cache.translate.dx = data.width / 2;
    text.cache.translate.dy = data.height / 2;
    text.line = {};
    text.line.cache = {};
    text.line.cache.y = [];
    var textLineCount = data.text.line.length;
    var i = 0
    data.text.line.forEach(function(line) {
      text.line.cache.y.push(i * text.cache.fontSize);
      i += 1;
    });  

    var textArea = nodeContainer.selectAll('g.text-area')
    .data(function(d) {
      return [data];
    })
    .enter()
    .append('g')
    .attr("id", function (d) {
      return 'text-container' + pathvisiojs.view.pathwayDiagram.svg.convertToId(d['id']);
    })
    .attr('transform', function(d) {
      return 'translate(' + text.cache.translate.dx + ' ' + text.cache.translate.dy + ')';
    })
    .attr("class", "text-area")
    .attr("style", function (d) {
      var style = '';
      if (d.text.hasOwnProperty('color')) {
        style += 'fill:' + d.text.color + '; ';
      }
      if (d.text.hasOwnProperty('fontFamily')) {
        style += 'font-family:' + d.text.fontFamily + '; ';
      }
      if (d.text.hasOwnProperty('fontSize')) {
        style += 'font-size:' + d.text.fontSize + 'px; ';
      }
      if (d.text.hasOwnProperty('fontWeight')) {
        style += 'font-weight:' + d.text.fontWeight + '; ';
      }
      if (d.text.hasOwnProperty('fontStyle')) {
        style += 'font-style:' + d.text.fontStyle + '; ';
      }
      return style;
    });

    var textLine = textArea.selectAll('text')
    .data(function(d) {
      return d.text.line;
    })
    .enter()
    .append('text')
    .attr("id", function (d, i) {
      return 'text-line' + i;
    })
    .attr("x", text.cache.x)
    .attr("y", function (d, i) { return (i - (textLineCount - 1)/2) * 1.1 + 'em';})
    .attr("alignment-baseline", text.cache.alignmentBaseline) 
    .attr("text-anchor", text.cache.textAnchor)
    .text(function (d) { return d; });

    /*
    nodeText.attr('transform', function(d) {
      applyTextAlign(nodeText[0][0], d, function(translate) {
        return 'translate(' + translate.dx + ' ' + translate.dy + ')';
      });
    })
    //*/

    return nodeContainer;
  }

  return {
    render:render
  };
}();



pathvisiojs.view.pathwayDiagram.svg.node.groupNode = function(){
  'use strict';
  function render(args, callback) {
    if (!args.container) {
      throw new Error('Error: container element not specified for rendering groupNode.');
    }
    if (!args.data) {
      throw new Error('Error: group data missing for rendering groupNode.');
    }

    pathvisiojs.view.pathwayDiagram.svg.node.render(args, function(groupContainer) {
      groupContainer.attr("class", function (d) {
        var cssClass = 'node group-node ' + pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName(d.groupType) + ' ';
        return cssClass;
      })

      var groupContents = args.data.contains;
      callback(groupContainer, groupContents);
    });
  }
 
  return {
    render:render
  };
}();


pathvisiojs.view.pathwayDiagram.svg.node.useElement = function(){
  'use strict';
  
  var pathwayHere, allSymbolNamesHere;

  function dragmove(d) {
    /*
    console.log(d3.event.x);
    console.log('d');
    console.log(d);
    console.log(d.id);
    console.log('this');
    console.log(this);
    //*/

    // don't have anchors rendered yet
    /*
    var changingAnchors = pathwayHere.elements.filter(function(element) {return element.parentId === d.id});
    var d3Node = self.d3Node = d3.select(this);
    console.log('changingAnchors');
    console.log(changingAnchors);
    d3Node.attr('transform', function(d) {return 'translate(' + d3.event.x + ' ' + d3.event.y + ')';});
    changingAnchors.forEach(function(anchor){
      console.log('anchor');
      console.log(anchor);
      console.log(d3Node);
      self.d3Node = d3Node;
      self.anchor = anchor;
      anchor.x = d3Node.select('#' + anchor.id)[0][0].getCTM().e;
      anchor.y = d3Node.select('#' + anchor.id)[0][0].getCTM().f; 
    })
    //*/
    d.x = d3.event.x;
    d.y = d3.event.y;


    var args = {};
    args.svg = d3.select('svg');
    args.pathway = pathwayHere;
    args.allSymbolNames = allSymbolNamesHere;
    pathvisiojs.view.pathwayDiagram.svg.render(args, function(){console.log('rendered after drag');});
  }

  function render(parent, data) {
    var node = parent.append("use")
    .data([data])
    .attr("id", function (d) {return 'node-' + pathvisiojs.view.pathwayDiagram.svg.convertToId(d['id']);})
    .attr("class", function (d) {
      return 'symbol ';
    })
    .attr('transform', function(d) {
      var transform = 'scale(1)';
      if (d.hasOwnProperty('rotation')) {
        transform = 'rotate(' + d.rotation + ' ' + d.width / 2 + ' ' + d.height / 2 + ')';
      }
      return transform;
    })
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", function (d) { return d.width;})
    .attr("height", function (d) { return d.height;})
    .attr("style", function (data) {
      var style = '';
      if (data.hasOwnProperty('borderColor')) {
        style += 'stroke:' + data.borderColor + '; ';
      }
      /*
      if (d.hasOwnProperty('fillOpacity')) {
        style += 'fill-opacity:' + d.fillOpacity + '; ';
      }
      //*/
      var borderWidthEffective;
      if (data.hasOwnProperty('borderWidth')) {

        // Doubling borderWidth to create borderWidthEffective.
        // Reason: border is centered on perimeter of node, requiring us to use an SVG clipping Path to clip off the outermost half
        // of the border so that the border does not go outside its bounding box. Because the outer half of the border is not displayed, we need to
        // double the border width so that the border's apparent width matches the value specified in GPML.

        borderWidthEffective = 2 * data.borderWidth;
      }
      else {
        borderWidthEffective = 2;
      }

      style += 'stroke-width:' + borderWidthEffective + '; ';


      return style;
    })


    /*


      if (d.hasOwnProperty('strokeStyle')) {
        if (d.strokeStyle === 'dashed') {
          style += 'stroke-dasharray: 5,3; ';
        }

        /*
        if (d.strokeStyle === 'double') {

          // render second element

          d3.select(nodesContainer[0][i]).append("use")
          .attr("id", function (d) {return 'node-double' + d.id;})
          .attr("class", function (d) {
            var cssClass = '';
            if (d.elementType === 'data-node') {
              cssClass = 'node ' + d.dataNodeType;
            }
            else {
              cssClass = 'node';
            }
            return cssClass;
          })
          .attr('transform', function(d) {
            var transform = 'scale(1)';
            if (d.hasOwnProperty('rotation')) {

              // the reference to width and height here is to specify the center of rotation as the center of the second element

              transform = 'rotate(' + d.rotation + ' ' + (d.width/2) + ' ' + (d.height/2) + ')';
            }
            return transform;
          })
          .attr("x", function(d) {return strokeWidthEffective;})
          .attr("y", function(d) {return strokeWidthEffective;})
          .attr("width", function (d) { return d.width - 2*strokeWidthEffective;})
          .attr("height", function (d) { return d.height - 2*strokeWidthEffective;})
          .attr("xlink:xlink:href", function (d) {return "#" + d.ShapeType;})
          //.attr("class", "stroke-color-equals-default-fill-color")
          .attr("style", function(d) { return style + 'fill-opacity:0; ';});
        }
      }

      // be careful that all additions to 'style' go above the 'double-line second element' above
      // so that they are applied to both the first and second elements.

      return style;
    })
        //*/
    .attr("xlink:xlink:href", function(d) {
      var shapeType = strcase.paramCase(d.ShapeType);
      var symbolId = pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping[shapeType];
      return '#' + symbolId;
    });
  }

  function getPortCoordinates(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  }

  function highlightByLabel(svg, pathway, nodeLabel) {
    svg.selectAll('.highlighted-node').remove();
    var dataNodesWithText = pathway.elements.filter(function(d, i) {return d.nodeType === 'data-node' && (!!d.textLabel);});
    var selectedNodes = dataNodesWithText.filter(function(d, i) {return d.textLabel.text.indexOf(nodeLabel) !== -1;});
    selectedNodes.forEach(function(node) {
      var nodeDomElement = svg.select('#node-' + node.id);
      var height = nodeDomElement[0][0].getBBox().height;
      var width = nodeDomElement[0][0].getBBox().width;
      nodeDomElement.append('rect')
      .attr('class', 'highlighted-node')
      .attr('x', -2.5)
      .attr('y', -2.5)
      .attr('width', width + 5)
      .attr('height', height + 5);
    });
  }

  return {
    render:render,
    getPortCoordinates:getPortCoordinates,
    highlightByLabel:highlightByLabel
  };
}();


// Edges (interactions and graphical lines)

pathvisiojs.view.pathwayDiagram.svg.edge = function(){
  'use strict';

  function getPointAtPositionById(edgeElementId, position) {
    // position refers to percentage of total length along
    // edge from start toward end

    var edgeElement = d3.select('#' + pathvisiojs.view.pathwayDiagram.svg.convertToId(edgeElementId))[0][0];
    var totalLength = edgeElement.getTotalLength();
    var lengthFromStartToPosition = position * totalLength;
    var point = edgeElement.getPointAtLength(lengthFromStartToPosition);
    return point;
  }

  //var svg, customMarkers;

  function render(args, callback) {
    var svg = args.svg,
      edge = args.element,
      parentDataElement;
    if (!svg) {
      throw new Error('svg missing');
    }
    var pathway = args.pathway;
    if (!pathway) {
      throw new Error('pathway missing');
    }
    var data = args.data;
    if (!data) {
      throw new Error('data missing');
    }
    var container = args.container;
    if (!container) {
      throw new Error('container missing');
    }
    var markerStartName = args.data.markerStart;
    //console.log('markerStartName');
    //console.log(markerStartName);
    var markerEndName = args.data.markerEnd;
    //console.log('markerEndName');
    //console.log(markerEndName);
    var edgeId = pathvisiojs.view.pathwayDiagram.svg.convertToId(data['id']);

    if (data.hasOwnProperty('isContainedBy')) {
      parentDataElement = pathway.elements.filter(function(element) {
        return element['id'] === data.isContainedBy;
      })[0];
      data.Point.forEach(function(point) {
        point.x = point.x - parentDataElement.x;
        point.y = point.y - parentDataElement.y;
      });
    }

    /*
    console.log('svg in edge');
    console.log(svg);
    console.log('edge in edge');
    console.log(edge);
    console.log('data in edge');
    console.log(data);
    console.log('markerStartName in edge');
    console.log(markerStartName);
    console.log('markerEndName in edge');
    console.log(markerEndName);
    //*/
    /*
    var createPathDataString = d3.svg.line()
    .x(function(data) { return data.x; })
    .y(function(data) { return data.y; });

    // "stepType" is the term d3js uses to specify type of interpolation.
    // we need to convert from GPML ConnectorType to
    // d3 stepType here
    var gpmlConnectorTypeToD3StepTypeMapping = {
      Straight:'linear',
      Segmented:'linear',
      Elbow:'linear',
      Curved:'basis'
    };
    var stepType = 'linear';
    if (gpmlConnectorTypeToD3StepTypeMapping.hasOwnProperty(data.ConnectorType)) {
      stepType = gpmlConnectorTypeToD3StepTypeMapping[data.ConnectorType];
    }
    createPathDataString.interpolate(stepType);
    //*/
    var stroke = data.stroke,
      markerStartAttributeValue,
      markerEndAttributeValue;
    async.series({
      'markerStartAttributeValue': function(callback) {
        var markerStartIdStub = pathvisiojs.view.pathwayDiagram.svg.edge.marker.semanticNameToIdMapping[markerStartName];
        if (!!markerStartIdStub) {
          if (!!stroke) { // if edge is not of default stroke color (at time of writing, this was black)
            if (markerStartName === 'none') { // if no marker is to be used, JSON data will specify 'none'
              markerStartAttributeValue = 'none';
              callback(null, markerStartAttributeValue);
            }
            else {
              if (pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[markerStartIdStub].indexOf(stroke) === -1) { // if no marker of this stroke color exists
                pathvisiojs.view.pathwayDiagram.svg.edge.marker.appendNonDefaultColorMarkerBothEnds(svg, markerStartIdStub, stroke, function() {
                  markerStartAttributeValue = 'url(#' + strcase.paramCase(markerStartIdStub + '-start-' + stroke) + ')';
                  callback(null, markerStartAttributeValue);
                });
              }
              else {
                markerStartAttributeValue = 'url(#' + strcase.paramCase(markerStartIdStub + '-start-' + stroke) + ')';
                callback(null, markerStartAttributeValue);
              }
            }
          }
          else {
            markerStartAttributeValue = 'url(#' + strcase.paramCase(markerStartIdStub + '-start-default') + ')';
            callback(null, markerStartAttributeValue);
          }
        }
        else {
          console.warn('Pathvisiojs does not have access to a marker (arrowhead) of the requested type: "' + markerStartName + '"');
          markerStartAttributeValue = 'none';
          callback(null, markerStartAttributeValue);
        }
      },
      'markerEndAttributeValue': function(callback) {
        var markerEndIdStub = pathvisiojs.view.pathwayDiagram.svg.edge.marker.semanticNameToIdMapping[markerEndName];
        if (!!markerEndIdStub) {
          if (!!stroke) { // if edge is not of default stroke color (at time of writing, this was black)
            if (markerEndName === 'none') { // if no marker is to be used, JSON data will specify 'none'
              markerEndAttributeValue = 'none';
              callback(null, markerEndAttributeValue);
            }
            else {
              if (pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[markerEndIdStub].indexOf(stroke) === -1) { // if no marker of this stroke color exists
                pathvisiojs.view.pathwayDiagram.svg.edge.marker.appendNonDefaultColorMarkerBothEnds(svg, markerEndIdStub, stroke, function() {
                  markerEndAttributeValue = 'url(#' + strcase.paramCase(markerEndIdStub + '-end-' + stroke) + ')';
                  callback(null, markerEndAttributeValue);
                });
              }
              else {
                markerEndAttributeValue = 'url(#' + strcase.paramCase(markerEndIdStub + '-end-' + stroke) + ')';
                callback(null, markerEndAttributeValue);
              }
            }
          }
          else {
            markerEndAttributeValue = 'url(#' + strcase.paramCase(markerEndIdStub + '-end-default') + ')';
            callback(null, markerEndAttributeValue);
          }
        }
        else {
          console.warn('Pathvisiojs does not have access to a marker (arrowhead) of the requested type: "' + markerEndName + '"');
          markerEndAttributeValue = 'none';
          callback(null, markerEndAttributeValue);
        }
      },
      /*
      'convertedPointSet': function(callback) {
        var index, firstSegmentHorizontal, currentSegmentHorizontal, convertedPointSet;

        // in GPML, some points are implied, such as for many curves and elbows with only two points.
        // This code below fills in the implied points, returning the full set of points.

        convertedPointSet = [];

        if ((!data.ConnectorType) || (data.ConnectorType === undefined) || (data.ConnectorType === 'Straight') || (data.ConnectorType === 'Segmented')) {
          callback(null, data.Point);
        }
        else {

          // Elbow and Curved are considered together, because a Curve is just a modification
          // of an Elbow. The Curve uses the Elbow point set, but it has interpolation of
          // basis instead of linear.

          if (data.ConnectorType === 'Elbow' || data.ConnectorType === 'Curved') {
            if (data.Point.length === 2) {

              // GPML specifies just the start and end points and assumes a programmatic
              // path finding algorithm will fill in the intermediate points, unless
              // the user explicitly sets the intermediate points by dragging the edge.

              // fill in intermediate points using default algorithmic layout

              pathvisiojs.view.pathwayDiagram.pathFinder.getPath(svg, data, function(convertedPointSet) {
                callback(null, convertedPointSet);
              });
            }
            else {

              // use user-specified intermediate points. This requires converting from
              // point set format #2 (see above) to format #1.

              convertedPointSet.push(data.Point[0]);

              if (Math.abs(data.Point[0].RelX) === 1) {
                firstSegmentHorizontal = true;
              }
              else {
                if (Math.abs(data.Point[0].RelY) === 1) {
                  firstSegmentHorizontal = false;
                }
                else {
                  if ((Math.abs(data.Point[data.Point.length - 1].RelX) === 1) && pathvisiojs.utilities.isOdd(data.Point.length)) {
                    firstSegmentHorizontal = true;
                  }
                  else {
                    firstSegmentHorizontal = false;
                  }
                }
              }

              currentSegmentHorizontal = firstSegmentHorizontal;
              index = 0;
              do {
                index += 1;

                if (currentSegmentHorizontal) {
                  convertedPointSet.push({
                    'x':data.Point[index].x,
                    'y':data.Point[index - 1].y
                  });
                }
                else {
                  convertedPointSet.push({
                    'x':data.Point[index - 1].x,
                    'y':data.Point[index].y
                  });
                }

                currentSegmentHorizontal = !currentSegmentHorizontal;

              } while (index < data.Point.length - 1);

              convertedPointSet.push(data.Point[data.Point.length - 1]);
              callback(null, convertedPointSet);
            }
          }
          else {
            console.warn('Warning: pathvisiojs does not support connector type: ' + data.ConnectorType + '. Using linear interpolation as fallback.');
            callback(null, data.Point);
          }
        }
      }
    },
    function(err, results) {
    //*/
    'path': function() {
      edge.attr("marker-start", markerStartAttributeValue)
      .attr("marker-end", markerEndAttributeValue)
      .attr("style", function (data) {
        var style = 'stroke-width:' + data.strokeWidth + '; ';
        if (data.hasOwnProperty('stroke')) {
          style += 'stroke:#' + data.stroke + '; ';
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * data.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("fill", 'none')
      .attr("d", function (data) {
        return pathvisiojs.view.pathwayDiagram.svg.edge.path.getPath(data); //createPathDataString(results.convertedPointSet);
      });

     /****************** 
       * anchor(s) (note that this method is called from ...EDGE.render() but the result is to render a NODE)
       * ***************/

      if (data.hasOwnProperty('Anchor')) {
        pathvisiojs.view.pathwayDiagram.svg.node.anchor.render(container, edgeId, data.Anchor);
      }

      /****************** 
       * citation(s)
       * ***************/

      if (data.hasOwnProperty('PublicationXref')) {
        pathvisiojs.view.pathwayDiagram.svg.publicationXref.render(edgeId, 'edge', pathway, data.PublicationXref);
        callback(edge);
      }
      else {
        callback(edge);
      }
    }
   }); //close async
  } //close function

  /*
  function renderAll(viewport, pathway) {
    if (!viewport || !pathway) {
      return console.warn('Error: Missing one or more required parameters: viewport, pathway.');
    }

    if (pathway.hasOwnProperty('edges')) {
      var pathData = null;

      var edges = viewport.selectAll("pathway.edge")
      .data(pathway.edges)
      .enter()
      .append("path")
      .attr("id", function (data) { return data.edgeType + '-' + data.graphId; })
      .attr("class", function (data) {
        var cssClass = 'edge ' + data.edgeType + ' ';
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            cssClass += " dashed-stroke";
          }
        }
        return cssClass;
      })
      .attr("style", function (data) {
        var style = 'stroke-width:' + data.strokeWidth + '; ';
        if (data.hasOwnProperty('stroke')) {
          style += 'stroke:' + data.stroke + '; ';
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * data.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("marker-start", function (data) {
        var markerStart = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (data) {
        var markerEnd = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          }
        }
        return 'url(#' + markerEnd + ')';
      })
      .attr("fill", 'none')

      // this attr needs to be last, because of the confusion over the meaning of 'd' as 1) the data for the d3 selection and 2) the path data.
      // Somehow, d (the d3 selection data) gets redefined after this attr is defined.

      .attr("d", function (data) {
        pathData = pathvisiojs.view.pathwayDiagram.svg.edge.pathData.get(viewport, pathway, data);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            viewport.append("path")
            .attr("class", data.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "stroke-color-equals-default-fill-color")
            .attr("style", "stroke-width:" + data.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke) + ')');
          }
        }
        return pathData;
      });
    }
  }
  //*/


  return {
    render:render,
    getPointAtPositionById:getPointAtPositionById
    //renderAll:renderAll
  };
}();
  


pathvisiojs.view.pathwayDiagram.svg.edge.graphicalLine = function(){
  'use strict';
  //function render(svg, container, data) {
  function render(args) {
    var svg = args.svg;
    var container = args.container;
    var data = args.data;
    /*
    console.log('container');
    console.log(container);
    console.log('data');
    console.log(data);
    //*/

    pathvisiojs.view.pathwayDiagram.svg.edge.render(args, function(graphicalLine) {
      graphicalLine.attr("class", function (data) {
        var cssClass = 'edge graphical-line';
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            cssClass += " dashed-stroke";
          }
        }
        return cssClass;
      });

      var containerElement = container[0][0];
      var containerElementX, containerElementY;
      if (containerElement.hasOwnProperty('__data__')) {
        graphicalLine.attr('transform', function() {
          containerElementX = containerElement.__data__.x || 0;
          containerElementY = containerElement.__data__.y || 0;
          return 'translate(' + (-1*containerElementX) + ' ' + (-1*containerElementY) + ')';
        })
      }
    });


    //pathvisiojs.view.pathwayDiagram.svg.edge.setAttributes(svg, graphicalLine, data, data.markerStart, data.markerEnd);

    //.call(pathvisiojs.view.pathwayDiagram.svg.edge.setAttributes);

    /*
    // Update…
    var graphicalLine = container.selectAll('#' + strcase.paramCase(data.GraphId))
    .data([data])
    .call(setAttributes);

    // Enter…
    graphicalLine.enter().append("path")
    .call(setAttributes);

    // Exit…
    graphicalLine.exit().remove();
    //*/

  }


  /*
  function renderAll(viewport, pathway) {
    if (!viewport || !pathway) {
      return console.warn('Error: Missing one or more required parameters: viewport, pathway.');
    }

    if (pathway.hasOwnProperty('edges')) {
      var pathData = null;

      var edges = viewport.selectAll("pathway.edge")
      .data(pathway.edges)
      .enter()
      .append("path")
      .attr("id", function (data) { return data.edgeType + '-' + data.graphId; })
      .attr("class", function (data) {
        var cssClass = 'edge ' + data.edgeType + ' ';
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            cssClass += " dashed-stroke";
          }
        }
        return cssClass;
      })
      .attr("style", function (data) {
        var style = 'stroke-width:' + data.strokeWidth + '; ';
        if (data.hasOwnProperty('stroke')) {
          style += 'stroke:' + data.stroke + '; ';
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * data.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("marker-start", function (data) {
        var markerStart = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (data) {
        var markerEnd = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          }
        }
        return 'url(#' + markerEnd + ')';
      })
      .attr("fill", 'none')

      // this attr needs to be last, because of the confusion over the meaning of 'd' as 1) the data for the d3 selection and 2) the path data.
      // Somehow, d (the d3 selection data) gets redefined after this attr is defined.

      .attr("d", function (data) {
        pathData = pathvisiojs.view.pathwayDiagram.svg.edge.pathData.get(viewport, pathway, data);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            viewport.append("path")
            .attr("class", data.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "stroke-color-equals-default-fill-color")
            .attr("style", "stroke-width:" + data.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke) + ')');
          }
        }
        return pathData;
      });
    }
  }
  //*/


  return {
    render:render
    //renderAll:renderAll
  };
}();
  


pathvisiojs.view.pathwayDiagram.svg.edge.interaction = function(){
  'use strict';
  function getMarkerNameFromInteractionGraph(InteractionGraph) {
    var interactionType;
    if (!InteractionGraph) {
      return 'none';
    }
    else {
      interactionType = InteractionGraph.interactionType;
      if (!interactionType) {
        return 'none';
        console.warn('No interactionType specified for interaction.');
      }
      else {

        // TODO check for whether marker is specified in list of availableMarkers

        return strcase.paramCase(interactionType);
      }
    }
  }

  //function render(svg, target, data) {
  function render(args) {
    var svg = args.svg;
    var container = args.container;
    var data = args.data;
    /*
    console.log('container');
    console.log(container);
    console.log('data');
    console.log(data);
    //*/


    var firstInteractionGraph, lastInteractionGraph, markerStart, markerEnd;
    if (!!data.InteractionGraph) {
      if (data.InteractionGraph.length > 1) {
        firstInteractionGraph = data.InteractionGraph[0];
        //markerStart = getMarkerNameFromInteractionGraph(firstInteractionGraph);
        lastInteractionGraph = data.InteractionGraph[data.InteractionGraph.length - 1];
        //markerEnd = getMarkerNameFromInteractionGraph(lastInteractionGraph);
      }
      else {
        lastInteractionGraph = data.InteractionGraph[0];
        //markerEnd = getMarkerNameFromInteractionGraph(lastInteractionGraph);
      }
    }

    pathvisiojs.view.pathwayDiagram.svg.edge.render(args, function(interaction) {
      interaction.attr("class", function (data) {
        var cssClass = 'edge interaction' + ' ';
        if (!!data.DatasourceReference) {
          cssClass += 'has-xref ';
          if (!!data.DatasourceReference.ID) {
            interaction.on("click", function(d,i) {
              pathvisiojs.view.annotation.xRef.render(args.pathway.Organism, d['DatasourceReference'].ID, d['DatasourceReference'].Database, d.renderableType, d.markerStart+'<-->'+d.markerEnd); // d.InteractionGraph[0].interactsWith.text.line[0]+' + '+d.InteractionGraph[0].text.line[0], d.renderableType); 
	      //That's capital 'O' Organism from GPML vocab.
	      //Names of interaction partners is given as header, which is also used to form site query, 
	      // thus the "+" is used to convey both the interaction and query logic.
            })
          }
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            cssClass += " dashed-stroke";
          }
        }
        return cssClass;
      })

      var containerElement = container[0][0];
      var containerElementX, containerElementY;
      if (containerElement.hasOwnProperty('__data__')) {
        interaction.attr('transform', function() {
          containerElementX = containerElement.__data__.x || 0;
          containerElementY = containerElement.__data__.y || 0;
          return 'translate(' + (-1*containerElementX) + ' ' + (-1*containerElementY) + ')';
        })
      }
    });


    // I want to get the marker name from the interactionType later.
    //pathvisiojs.view.pathwayDiagram.svg.edge.setAttributes(svg, interaction, data, markerStart, markerEnd);

    /*
    // Update…
    var interaction = container.selectAll('#' + strcase.paramCase(data.GraphId))
    .data([data])
    .call(setAttributes);

    // Enter…
    interaction.enter().append("path")
    .call(setAttributes);

    // Exit…
    interaction.exit().remove();
    //*/

  }


  /*
  function renderAll(viewport, pathway) {
    if (!viewport || !pathway) {
      return console.warn('Error: Missing one or more required parameters: viewport, pathway.');
    }

    if (pathway.hasOwnProperty('edges')) {
      var pathData = null;

      var edges = viewport.selectAll("pathway.edge")
      .data(pathway.edges)
      .enter()
      .append("path")
      .attr("id", function (data) { return data.edgeType + '-' + data.graphId; })
      .attr("class", function (data) {
        var cssClass = 'edge ' + data.edgeType + ' ';
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'dashed') {
            cssClass += " dashed-stroke";
          }
        }
        return cssClass;
      })
      .attr("style", function (data) {
        var style = 'stroke-width:' + data.strokeWidth + '; ';
        if (data.hasOwnProperty('stroke')) {
          style += 'stroke:' + data.stroke + '; ';
        }
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            style += 'stroke-width:' + (3 * data.strokeWidth) + '; ';
          }
        }
        return style;
      })
      .attr("marker-start", function (data) {
        var markerStart = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerStart = 'double-line-hack-start';
          }
        }
        return 'url(#' + markerStart + ')';
      })
      .attr("marker-end", function (data) {
        var markerEnd = pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {
            //hack to manage marker scaling; this marker should not have any features itself
            markerEnd = 'double-line-hack-end';
          }
        }
        return 'url(#' + markerEnd + ')';
      })
      .attr("fill", 'none')

      // this attr needs to be last, because of the confusion over the meaning of 'd' as 1) the data for the d3 selection and 2) the path data.
      // Somehow, d (the d3 selection data) gets redefined after this attr is defined.

      .attr("d", function (data) {
        pathData = pathvisiojs.view.pathwayDiagram.svg.edge.pathData.get(viewport, pathway, data);
        if (data.hasOwnProperty('strokeStyle')) {
          if (data.strokeStyle === 'double') {

            // setting stroke-width equal to its specified line value is
            // what PathVisio (Java) does, but the white line (overlaying the
            // thick line to create a "double line") is hard to see at 1px.

            viewport.append("path")
            .attr("class", data.edgeType + "-double")
            .attr("d", pathData)
            .attr("class", "stroke-color-equals-default-fill-color")
            .attr("style", "stroke-width:" + data.strokeWidth + '; ')
            .attr("marker-start", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerStart, 'start', data.stroke) + ')')
            .attr("marker-end", 'url(#' + pathvisiojs.view.pathwayDiagram.svg.edge.marker.render(viewport, data.markerEnd, 'end', data.stroke) + ')');
          }
        }
        return pathData;
      });
    }
  }
  //*/


  return {
    render:render,
    //renderAll:renderAll
  };
}();
  


pathvisiojs.view.pathwayDiagram.svg.edge.marker = function(){
  'use strict';

  // the way SVG works makes this code more complex than it should need to be. Essentially, we
  // are trying to reuse the markers defined in the SVG template, but we also need to be able
  // to handle whether any marker is desired, whether the desired marker exists in the pathway
  // template svg, whether it is at the start or end of a path and whether
  // a color other than black (the color specified in the template) is desired.

  var svg;

  var semanticNameToIdMapping = {
    'arrow':'shape-library-markers-arrow-svg',
    'necessary-stimulation':'shape-library-markers-mim-necessary-stimulation-svg',
    'binding':'shape-library-markers-mim-binding-svg',
    'conversion':'shape-library-markers-mim-conversion-svg',
    'stimulation':'shape-library-markers-mim-stimulation-svg',
    'modification':'shape-library-markers-mim-modification-svg',
    'catalysis':'shape-library-markers-mim-catalysis-svg',
    'inhibition':'shape-library-markers-mim-inhibition-svg',
    'cleavage':'shape-library-markers-mim-cleavage-svg',
    'covalent-bond':'shape-library-markers-mim-covalent-bond-svg',
    'transcription-translation':'shape-library-markers-mim-transcription-translation-svg',
    'gap':'shape-library-markers-mim-gap-svg',
    'inhibitory-activity':'shape-library-markers-t-bar-svg',
    'unspecified':'shape-library-markers-none-svg',
    'activity':'shape-library-markers-arrow-svg',
    'mim-branching-left':'shape-library-markers-mim-branching-left-svg',
    'mim-branching-right':'shape-library-markers-mim-branching-right-svg',
    'mim-necessary-stimulation':'shape-library-markers-mim-necessary-stimulation-svg',
    'mim-binding':'shape-library-markers-mim-binding-svg',
    'mim-conversion':'shape-library-markers-mim-conversion-svg',
    'mim-stimulation':'shape-library-markers-mim-stimulation-svg',
    'mim-modification':'shape-library-markers-mim-modification-svg',
    'mim-catalysis':'shape-library-markers-mim-catalysis-svg',
    'mim-inhibition':'shape-library-markers-mim-inhibition-svg',
    'mim-cleavage':'shape-library-markers-mim-cleavage-svg',
    'mim-covalent-bond':'shape-library-markers-mim-covalent-bond-svg',
    'mim-transcription-translation':'shape-library-markers-mim-transcription-translation-svg',
    'mim-gap':'shape-library-markers-mim-gap-svg',
    't-bar':'shape-library-markers-t-bar-svg',
    'none':'shape-library-markers-none-svg'
  };

  var colorsAvailable = {
    'shape-library-markers-arrow-svg':['default'],
    'shape-library-markers-mim-necessary-stimulation-svg':['default'],
    'shape-library-markers-mim-binding-svg':['default'],
    'shape-library-markers-mim-conversion-svg':['default'],
    'shape-library-markers-mim-stimulation-svg':['default'],
    'shape-library-markers-mim-modification-svg':['default'],
    'shape-library-markers-mim-catalysis-svg':['default'],
    'shape-library-markers-mim-inhibition-svg':['default'],
    'shape-library-markers-mim-cleavage-svg':['default'],
    'shape-library-markers-mim-covalent-bond-svg':['default'],
    'shape-library-markers-mim-transcription-translation-svg':['default'],
    'shape-library-markers-mim-gap-svg':['default'],
    'shape-library-markers-t-bar-svg':['default'],
    'shape-library-markers-mim-branching-left-svg':['default'],
    'shape-library-markers-mim-branching-right-svg':['default'],
    'shape-library-markers-none-svg':['default']
  };

  function appendCustom(uniqueMarkerShapeUri, callback) {
    var idStub = strcase.paramCase(uniqueMarkerShapeUri);
    var startId = idStub + '-start-default';
    var endId = idStub + '-end-default';
    var markerStart = svg.select('defs').select('#' + startId);

    markerStart = svg.select('defs').append('marker')
    .attr('id', startId)
    .attr('preserveAspectRatio', 'none');
    processSvg(uniqueMarkerShapeUri, markerStart, startId, false);

    var markerEnd = svg.select('defs').select('#' + endId);
    markerEnd = svg.select('defs').append('marker')
    .attr('id', endId)
    .attr('preserveAspectRatio', 'none');
    processSvg(uniqueMarkerShapeUri, markerEnd, endId, true);

    callback(null);
  }

  function processSvg(uniqueMarkerShapeUri, marker, markerId, rotate){
    d3.xml(uniqueMarkerShapeUri, 'image/svg+xml', function(svgXml) {
      var newMarker = d3.select(svgXml.documentElement);
      var width = newMarker.attr('width');
      var height = newMarker.attr('height');
      var markerClass = newMarker.attr('class');
      var refXstart = newMarker.attr('refXstart');
      var refYstart = newMarker.attr('refYstart');
      var refXend = newMarker.attr('refXend');
      var refYend = newMarker.attr('refYend');
      var viewBox = newMarker.attr('viewBox');

      marker.attr('viewBox', viewBox)
      .attr('markerWidth', width)
      .attr('markerHeight', height)
      .attr('markerUnits', 'strokeWidth')
      .attr('orient', 'auto');

      if (rotate){
	//end marker
        marker.attr('refX', refXend)
        .attr('refY', refYend);
        marker.append('g')
        .attr('id', 'g-' + markerId)
        .attr('class', markerClass)
        .attr('transform', 'rotate(180, '+width/2+', '+height/2+')');
/*        .attr('style', ' -webkit-transform: rotate(180deg); -webkit-transform-origin: 50% 50%; '
			+ '-o-transform: rotate(180deg); -o-transform-origin: 50% 50%; '
			+ '-moz-transform: rotate(180deg); -moz-transform-origin: 50% 50%; '
			+ '-ms-transform: rotate(180deg); -ms-transform-origin: 50% 50%; '
			+ 'transform: rotate(180deg); transform-origin: 50% 50%; '
        );
*/      } else {
	//start marker
        marker.attr('refX', refXstart)
        .attr('refY', refYstart);

        marker.append('g')
        .attr('id', 'g-' + markerId)
        .attr('class', markerClass);
      }

      var g = svg[0][0].querySelector('#' + 'g-' + markerId);
      var newMarkerChildren = newMarker[0][0].childNodes;
      do {
        g.appendChild(newMarkerChildren[0]);
      } while (newMarkerChildren.length > 0);
    });
  }

//    }
//    else {
      // note that HTML uses 'img' while SVG uses 'image'
      // we need to get the dimensions of the image we are adding to the new symbol,
      // so we'll create an img element in HTML to check width and height
      // then we'll append an image element to the SVG symbol

/*
 * could also look at using SVG image tags for this, like so:
	<marker id="mim-binding-start-black" 
	class="default-fill" 
	stroke="black"
	markerHeight="12"
	markerWidth="12"
	markerUnits="strokeWidth"
	orient="auto"
	refX="0" refY="6"
	viewBox="0 0 12 12">
  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-binding.svg" x="0" y="0" width="12" height="12"></image>
	</marker>
//*/
/*
      img = document.createElement('img');
      img.id = idStub;
      img.src = uniqueMarkerShapeUri;
      img.onload = function() {
        var width = this.width;
        var height = this.height;
        markerStart = svg.select('#' + this.id + '-start-default')
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('markerWidth', width)
        .attr('markerHeight', height)
        .attr('markerUnits', 'strokeWidth')
        .attr('orient', 'auto')
        .attr('refX', 0)
        .attr('refY', 6);

        markerStart.append('image').attr('xlink:xlink:href', uniqueMarkerShapeUri)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
        .attr('externalResourcesRequired', "true");

        markerEnd = d3.select('svg').select('defs').select('#' + this.id + '-end-default')
        .attr('id', endId)
        .attr('viewBox', -1*width + ' ' + -1*height + ' ' + width + ' ' + height)
        .attr('markerWidth', width)
        .attr('markerHeight', height)
        .attr('markerUnits', 'strokeWidth')
        .attr('orient', 'auto')
        .attr('refX', 0)
        .attr('refY', -1*height/2);
        var g = markerEnd.append('g')
        .attr('id', 'g-' + endId)
        .attr('style', '-webkit-transform: rotate(180deg); -webkit-transform-origin: 50% 50%;');
        // TODO the transform attribute used is specific to chrome. we need ot add the transform attributes for other browsers
        // check for this on MDN.

        g.append('image').attr('xlink:xlink:href', uniqueMarkerShapeUri)
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
        .attr('externalResourcesRequired', "true");
        callback(null);
      }
    }
  }
*/

  function loadAllCustom(thisSvg, customMarkers, callback) {
    console.log('thisSvg');
    console.log(thisSvg);
    svg = thisSvg;
    var image = null;
    var img = null;
    var marker = null;
    var dimensions = null;
    var dimensionSet = [];

    var semanticName;
    var markerUri;
    var paramCaseUri;
    var uniqueMarkerShapeUris = [];
    customMarkers.forEach(function(customMarker){
      semanticName = customMarker.semanticName;
      markerUri = customMarker.uri;
      paramCaseUri = strcase.paramCase(markerUri);
      pathvisiojs.view.pathwayDiagram.svg.edge.marker.semanticNameToIdMapping[semanticName] = paramCaseUri;
      pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[paramCaseUri] = ['default'];
      if (uniqueMarkerShapeUris.indexOf(markerUri) === -1) {
        uniqueMarkerShapeUris.push(markerUri);
      }
    });

    async.each(uniqueMarkerShapeUris, appendCustom, function(err){
        // if any of the saves produced an error, err would equal that error
      callback(null);
    });
  }

  function appendNonDefaultColorMarkerBothEnds(svg, markerIdStub, color, callback) {
    appendNonDefaultColorMarker(svg, markerIdStub, 'start', color, function() {
      appendNonDefaultColorMarker(svg, markerIdStub, 'end', color, function() {
        pathvisiojs.view.pathwayDiagram.svg.edge.marker.colorsAvailable[markerIdStub].push(color);
        callback();
      });
    });
  }

  function appendNonDefaultColorMarker(svg, markerIdStub, position, color, callback) {
    var defaultId = markerIdStub + '-' + position + '-default';
    var marker = pathvisiojs.utilities.cloneNode('#' + defaultId);

    var defaultMarker, refX, refY, viewBox, viewBoxElements;
    if (position === 'end') {
      defaultMarker = d3.select('#' + markerIdStub + '-'+position+'-default');
      refX = parseFloat(defaultMarker.attr('refX'));
      refY = parseFloat(defaultMarker.attr('refY'));
      viewBox = defaultMarker.attr('viewBox');
      if (!!viewBox) {
        viewBoxElements = viewBox.split(' ');
        marker.attr('viewBox', viewBox);
      }
      marker.attr('refX', refX);
      marker.attr('refY', refY);
    }

    // define style of marker element's SVG

    var markerContents = marker.select("g");
    var markerStyle = markerContents.attr('style') || '';
    if (markerContents.attr('class').match(/default-stroke-color/)) {
      markerStyle += 'stroke:#' + color + '; ';
    }

    if (markerContents.attr('class').match(/default-fill-color/)) {
      markerStyle += 'fill:#' + color + '; ';
    }

    var markerId = markerIdStub + '-' + position + '-' + color;
    marker.attr('id', markerId);
    markerContents.attr('id', strcase.paramCase('g-' + markerId));
    markerContents.attr('style', markerStyle);

    callback(markerId);
  }
 
  return {
    appendNonDefaultColorMarkerBothEnds:appendNonDefaultColorMarkerBothEnds,
    loadAllCustom:loadAllCustom,
    semanticNameToIdMapping:semanticNameToIdMapping,
    colorsAvailable:colorsAvailable
  };
}();


pathvisiojs.view.pathwayDiagram.svg.edge.point = function(){
  'use strict';

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

  function getGraphRef(pathway, point) {
    if (point.hasOwnProperty('graphRef')) {
      if (pathway.hasOwnProperty('nodes')) {
        var node = pathway.nodes.filter(function(element) {return element.graphId === point.graphRef;})[0];
        if (node !== undefined) {
          return {'type':'node', 'element':node};
        }
      }

      if (pathway.hasOwnProperty('groups')) {
        var group = pathway.groups.filter(function(element) {return element.graphId === point.graphRef;})[0];
        if (group !== undefined) {
          return {'type':'group', 'groupId':group.groupId};
        }
      }

      var edgesWithAnchors = pathway.edges.filter(function(element) {return element.hasOwnProperty('anchors');});
      var anchor = null;
      var i = -1;
      do {
        i += 1;
        anchor = edgesWithAnchors[i].anchors.filter(function(element) {

            // js hint linter doesn't like this. how can I refactor?

            return element.graphId === point.graphRef;
          }
        )[0];
      } while (!anchor && i < edgesWithAnchors.length );

      return {'type':'anchor', 'element':anchor, 'edge':edgesWithAnchors[i]};

    }
    else {
      return {'type':'unconnected'};
    }
  }

  function getCoordinates(pathway, point) {
    if (!pathway || !point) {
      return console.warn('Error: Missing input parameters.');
    }

    var coordinates = {};
    var edgeTerminusRef = getGraphRef(pathway, point);
    if (edgeTerminusRef.type !== 'anchor') {
      if (edgeTerminusRef.type === 'unconnected') {
        coordinates.x = point.x;
        coordinates.y = point.y;

      }
      else {
        if (edgeTerminusRef.type === 'node') {
          coordinates = pathvisiojs.view.pathwayDiagram.svg.node.getPortCoordinates(edgeTerminusRef.element, point.relX, point.relY);
        }
        else {
          if (edgeTerminusRef.type === 'group') {
            var groupDimensions = pathvisiojs.view.pathwayDiagram.svg.node.groupNode.getDimensions(pathway, edgeTerminusRef.groupId);
            coordinates = pathvisiojs.view.pathwayDiagram.svg.node.getPortCoordinates(groupDimensions, point.relX, point.relY);
          }
          else {
            return 'error';
          }
        }
      }
    }
    else {
      var path = document.select("#interaction-" + edgeTerminusRef.edge.graphId)[0][0];
      coordinates = path.getPointAtLength(edgeTerminusRef.element.position * path.getTotalLength());
    }

    return coordinates;
  }

  function isTwoPointElbow(source, target) {
    var isRightAngle = ( Math.abs(source.dx) === Math.abs(target.dy) && Math.abs(source.dy) === Math.abs(target.dx) );
    var sourcePasses = ( (((target.x - source.x)/Math.abs(target.x - source.x) === source.dx) || ((target.y - source.y)/Math.abs(target.y - source.y) === source.dy)) );
    var targetPasses = ( ((source.x - target.x)/Math.abs(source.x - target.x) === target.dx) || ((source.y - target.y)/Math.abs(source.y - target.y) === target.dy) );
    return ( isRightAngle && sourcePasses && targetPasses );
  }

  return {
    getGraphRef:getGraphRef,
    getCoordinates:getCoordinates,
    isTwoPointElbow:isTwoPointElbow
  };
}();


pathvisiojs.view.pathwayDiagram.svg.edge.path = function(){	
  'use strict';

  function getPath(edge) {
    var path;
    var type = edge.ConnectorType;

    if (type == 'Straight'){
      if (edge.Point.length == 2) {
        return svgLine(edge.Point);
      }
      else {
        // TODO throw errors or use console.warn instead of using console.log
        console.log("Too many points for a straight line!");
        return null;
      }
    }

    else if (type == 'Segmented') {
      return svgLine(edge.Point);
    }

    else if (type == 'Elbow'){
      return svgLine(calcPathpoints(edge.Point));
    }

    else if (type == 'Curved'){
      return svgCurve(calcPathpoints(edge.Point));
    }

    else {
      console.log("Unknown connector type: " + type);
      return null;
    }
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
    if (wptCount == 0) {
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
    if (axis == 1){ //Vertical
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
    ]

    return wptMatrix[x][y][z];
  }

  function sign(x) { 
    return x ? x < 0 ? -1 : 1 : 0; //caution: sign("0") -> 1 
  };

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

  //for generating line segments through a path of points (pathpoints, not waypoints)
  var svgLine = d3.svg.line()
  .x(function(d) {return d.x; })
  .y(function(d) {return d.y;})
  .interpolate("linear");

  //for generating bezier curves through a path of points (pathpoints, not waypoints)
  var svgCurve = d3.svg.line()
  .x(function(d) {return d.x; })
  .y(function(d) {return d.y;})
  .interpolate("basis");

  return {
    getPath:getPath
  };
}();


// TODO remove controls that don't work with this element
// This code is for the HTML img element. It displays the
// diagram as a PNG, JPG, GIF, etc.

pathvisiojs.view.pathwayDiagram.img = function(){
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
