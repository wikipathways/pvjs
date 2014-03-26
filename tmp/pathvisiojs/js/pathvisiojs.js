/* pathvisiojs 1.0.8
Built on 2014-03-25
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

var pathvisiojs = {
  load: function(args) {
    var svg,
      pathway,
      pathvisiojs = this;

    this.args = args;
    this.model = {};
    this.model.elements = [];
    this.data.model = this.data.gpml.model = this.data.gpml.graphics.model = this.data.gpml.group.model = this.data.gpml.interaction.model = this.view.model = this.view.pathwayDiagram.model = this.view.pathwayDiagram.svg.model = this.view.pathwayDiagram.svg.publicationXref.model = this.model;

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


pathvisiojs.data = {
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




pathvisiojs.data.gpml = {
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
        .attr('LineThickness', 1);
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
        .attr('FillColor', 'B4B464');
      });
      var groupPathwaysSelection = gpmlSelection.selectAll('Group[Style=Pathway]').each(function(){
        groupPathwaySelection = d3.select(this);
        groupPathwayGraphicsSelection = groupPathwaySelection.select('Graphics')
        .attr('FontSize', '32')
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

        var statesSelection = gpmlSelection.selectAll('State');
        if (!!statesSelection) {
          statesSelection.filter(function(){
            return (!d3.select(this).select('Graphics').attr('FillColor'));
          }).each(function(){
            d3.select(this).select('Graphics').attr('FillColor', 'ffffff');
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
          var shapeTypeValue = anchorSelection.attr('Shape');
          var graphics = anchorSelection.append('Graphics');
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
            d3.select(this).select('Graphics').attr('ShapeType', 'Oval');
            d3.select(this).select('Graphics').attr('Width', 8);
            d3.select(this).select('Graphics').attr('Height', 8);
          });
          anchorsSelection.filter(function(){
            return (d3.select(this).select('Graphics').attr('ShapeType') === 'None');
          }).each(function(){
            d3.select(this).select('Graphics').attr('ShapeType', null);
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

    if ( pathvisiojs.data.gpml.namespaces.indexOf(pathway.xmlns) !== -1 ) {

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisiojs).

      if (pathvisiojs.data.gpml.namespaces.indexOf(pathway.xmlns) !== 0) {

        // TODO call the Java RPC updater or in some other way call for the file to be updated.

        console.warn('GPML namespace is not one pathvisiojs can handle.');
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
            pathvisiojs.data.gpml.biopaxRef.getAllAsPvjson(gpmlSelection, function(publicationXrefs) {
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
            var dataNodeSelection, dataNodesSelection = gpmlSelection.selectAll('DataNode');
            if (dataNodesSelection[0].length > 0) {
              //pathway.DataNode = [];
              dataNodesSelection.each(function() {
                dataNodeSelection = d3.select(this);
                pathvisiojs.data.gpml.dataNode.toPvjson(pathway, gpmlSelection, dataNodeSelection, function(pvjsonElements) {
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
                pathvisiojs.data.gpml.label.toPvjson(gpmlSelection, labelSelection, function(pvjsonElements) {
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
                pathvisiojs.data.gpml.shape.toPvjson(gpmlSelection, shapeSelection, function(pvjsonElements) {
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
                pathvisiojs.data.gpml.anchor.toPvjson(gpmlSelection, anchorSelection, function(pvjsonElements) {
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
                pathvisiojs.data.gpml.state.toPvjson(gpmlSelection, stateSelection, function(pvjsonElements) {
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
                pathvisiojs.data.gpml.graphicalLine.toPvjson(gpml, graphicalLineSelection, function(pvjsonElements) {
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
                pathvisiojs.data.gpml.interaction.toPvjson(gpml, interactionSelection, function(pvjsonElements) {
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
            pathvisiojs.data.gpml.group.toPvjson(pathway.elements, gpmlSelection, groupSelection, function(pvjsonElements) {
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
pathvisiojs.data.gpml.node = pathvisiojs.data.gpml.node || {};


pathvisiojs.data.gpml.graphics = {
  defaults: {
    'FontSize':{
      'Type':"FontSize",
      'Value':10
    }
  },

  toPvjson: function(gpmlSelection, elementSelection, pvjsonElement, pvjsonText, callback) {
      var parentElement,
      attribute,
      i,
      graphics = elementSelection.select('Graphics')[0][0],
      gpmlDoubleLineProperty = '',
      pvjsonHeight,
      pvjsonWidth,
      pvjsonStrokeWidth,
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
        }
        return pvjsonStrokeDasharray;
      },
      ShapeType: function(gpmlShapeTypeValue){
        gpmlShapeType = gpmlShapeTypeValue;
        if (gpmlShapeType.toLowerCase() === 'none') {
          pvjsonShape = 'rectangle';
        }
        else {
          pvjsonShape = strcase.paramCase(gpmlShapeType) + gpmlDoubleLineProperty;
        }
        pvjsonElement.shape = pvjsonShape;
        return pvjsonShape;
      },
      ConnectorType: function(gpmlConnectorTypeValue){
        var gpmlConnectorType = gpmlConnectorTypeValue;
        pvjsonShape = strcase.paramCase('line-' + gpmlConnectorType) + gpmlDoubleLineProperty;
        pvjsonElement.connectorType = gpmlConnectorType;
        pvjsonElement.shape = pvjsonShape;
        return pvjsonShape;
      },
      FillColor: function(gpmlFillColorValue){
        var cssColor = gpmlColorToCssColor(gpmlFillColorValue);
        if (gpmlShapeType.toLowerCase() !== 'none') {
          pvjsonElement.fill = cssColor;
        }
        else {
          pvjsonElement.fill = 'transparent';
        }
      },
      Color: function(gpmlColorValue){
        var cssColor = gpmlColorToCssColor(gpmlColorValue);
        if (gpmlShapeType.toLowerCase() !== 'none') {
          pvjsonElement.stroke = cssColor;
        }
        else {
          pvjsonElement.stroke = 'transparent';
        }
        pvjsonText.fill = cssColor;
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
        pvjsonText.containerPadding = cssPadding;
      },
      FontSize: function(gpmlFontSizeValue){
        var cssFontSize;
        if (pathvisiojs.utilities.isNumber(gpmlFontSizeValue)) {
          cssFontSize = parseFloat(gpmlFontSizeValue);
        }
        else {
          cssFontSize = gpmlFontSizeValue;
        }
        pvjsonText.fontSize = cssFontSize;
      },
      FontName: function(gpmlFontNameValue){
        var cssFontFamily = gpmlFontNameValue;
        pvjsonText.fontFamily = cssFontFamily;
      },
      FontStyle: function(gpmlFontStyleValue){
        var cssFontStyle = gpmlFontStyleValue.toLowerCase();
        pvjsonText.fontStyle = cssFontStyle;
      },
      FontWeight: function(gpmlFontWeightValue){
        var cssFontWeight = gpmlFontWeightValue.toLowerCase();
        pvjsonText.fontWeight = cssFontWeight;
      },
      Rotation: function(gpmlRotationValue) {
        // GPML can hold a rotation value for State elements in an element named "Attribute" like this:
        // Key="org.pathvisio.core.StateRotation"
        // From discussion with AP and KH, we've decided to ignore this value, because we don't actually want States to be rotated.
        gpmlRotationValue = parseFloat(gpmlRotationValue);
        var pvjsonRotation = gpmlRotationValue * 180/Math.PI; //converting from radians to degrees
        // TODO how do we want to store this value?
        pvjsonElement.rotation = pvjsonRotation;
        pvjsonText.rotation = pvjsonRotation;
        return pvjsonRotation;
      },
      LineThickness: function(gpmlLineThicknessValue) {
        pvjsonStrokeWidth = parseFloat(gpmlLineThicknessValue);
        pvjsonElement.strokeWidth = pvjsonStrokeWidth;
        return pvjsonStrokeWidth;
      },
      Position: function(gpmlPositionValue) {
        var pvjsonPosition = parseFloat(gpmlPositionValue);
        pvjsonElement.position = pvjsonPosition;
        return pvjsonPosition;
      },
      Width: function(gpmlWidthValue) {
        gpmlWidthValue = parseFloat(gpmlWidthValue);
        pvjsonWidth = gpmlWidthValue + pvjsonStrokeWidth;
        pvjsonElement.width = pvjsonWidth;
        //pvjsonText.containerWidth = pvjsonWidth;
        pvjsonText.containerWidth = function() {
          var parentElement = model.elements.filter(function(element) {
            return element.id === pvjsonText.describes;
          })[0];
          var textWidth = parentElement.width;
          return textWidth;
        };
        return pvjsonWidth;
      },
      Height: function(gpmlHeightValue) {
        gpmlHeightValue = parseFloat(gpmlHeightValue);
        pvjsonHeight = gpmlHeightValue + pvjsonStrokeWidth;
        pvjsonElement.height = pvjsonHeight;
        pvjsonText.containerHeight = pvjsonHeight;
        return pvjsonHeight;
      },
      CenterX: function(gpmlCenterXValue) {
        gpmlCenterXValue = parseFloat(gpmlCenterXValue);
        pvjsonX = gpmlCenterXValue - pvjsonWidth/2;
        pvjsonElement.x = pvjsonX;
        pvjsonText.containerX = pvjsonX;
        return pvjsonX;
      },
      CenterY: function(gpmlCenterYValue) {
        gpmlCenterYValue = parseFloat(gpmlCenterYValue);
        pvjsonY = gpmlCenterYValue - pvjsonHeight/2;
        pvjsonElement.y = pvjsonY;
        pvjsonText.containerY = pvjsonY;
        return pvjsonY;
      },
      RelX: function(gpmlRelXValue) {
        var pvjsonRelX = parseFloat(gpmlRelXValue);
        pvjsonElement.relX = pvjsonRelX;
        pvjsonText.relX = pvjsonRelX;
        parentElement = gpmlSelection.select('[GraphId=' + elementSelection.attr('GraphRef') + ']');
        var parentCenterX = parseFloat(parentElement.select('Graphics').attr('CenterX'));
        var parentWidth = parseFloat(parentElement.select('Graphics').attr('Width'));
        var parentZIndex = parseFloat(parentElement.select('Graphics').attr('ZOrder'));
        var gpmlCenterXValue = parentCenterX + gpmlRelXValue * parentWidth/2;
        pvjsonX = gpmlCenterXValue - pvjsonWidth/2;
        pvjsonElement.x = pvjsonX;
        pvjsonText.containerX = pvjsonX;
        pvjsonElement.zIndex = parentZIndex + 0.2;
        pvjsonText.zIndex = parentZIndex + 0.3;
        pvjsonText.containerPadding = '0';
        pvjsonText.fontSize = '10';
        return pvjsonX;
      },
      RelY: function(gpmlRelYValue) {
        var pvjsonRelY = parseFloat(gpmlRelYValue);
        pvjsonElement.relY = pvjsonRelY;
        pvjsonText.relY = pvjsonRelY;
        var parentCenterY = parseFloat(parentElement.select('Graphics').attr('CenterY'));
        var parentHeight = parseFloat(parentElement.select('Graphics').attr('Height'));
        var elementCenterY = parentCenterY + pvjsonRelY * parentHeight/2;
        // TODO do we need to consider LineThickness (strokewidth) here?
        pvjsonY = elementCenterY - pvjsonHeight/2;
        pvjsonElement.y = pvjsonY;
        // TODO this and other elements here are hacks
        pvjsonText.containerY = pvjsonY + 12;
        return pvjsonY;
      },
      Align: function(gpmlAlignValue) {
        pvjsonTextAlign = strcase.paramCase(gpmlAlignValue);
        pvjsonText.textAlign = pvjsonTextAlign;
        return pvjsonTextAlign;
      },
      Valign: function(gpmlValignValue) {
        pvjsonVerticalAlign = strcase.paramCase(gpmlValignValue);
        pvjsonText.verticalAlign = pvjsonVerticalAlign;
        return pvjsonVerticalAlign;
      },
      ZOrder: function(gpmlZOrderValue) {
        pvjsonZIndex = parseFloat(gpmlZOrderValue);
        pvjsonElement.zIndex = pvjsonZIndex;
        pvjsonText.zIndex = pvjsonZIndex + 0.5;
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
    callback(pvjsonElement, pvjsonText);
  }
};


pathvisiojs.data.gpml.element = function(){
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
    var pvjsonText = {},
      attribute,
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
    pvjsonText.graphicalType = 'text';


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
        pvjsonText.id = 'text' + gpmlGraphIdValue;
        pvjsonText.describes = gpmlGraphIdValue;
        return gpmlGraphIdValue;
      },
      Style: function(gpmlStyleValue){
        pvjsonText.groupStyle = gpmlStyleValue;
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
        pvjsonText.textContent = pvjsonTextContent;
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

    pathvisiojs.data.gpml.biopaxRef.getAllAsPvjson(elementSelection, function(publicationXrefs) {
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
      callback(pvjsonElement, pvjsonText);
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


pathvisiojs.data.gpml.group = {
  getGroupDimensions: function(group, callback) {
    var dimensions = {};
    dimensions.topLeftCorner = {};
    dimensions.topLeftCorner.x = 9999999999999999999999999999;
    dimensions.topLeftCorner.y = 9999999999999999999999999999;
    dimensions.bottomRightCorner = {};
    dimensions.bottomRightCorner.x = 0;
    dimensions.bottomRightCorner.y = 0;
    // TODO what happens if this were set to '0.5em'?
    var padding = parseFloat(group.padding);

    var groupContents = group.contains;
    groupContents = pathvisiojs.utilities.convertToArray(groupContents);

    dimensions.zIndex = 9999999999999999999999999999;
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
      dimensions.x = dimensions.topLeftCorner.x - padding - group.strokeWidth;
      dimensions.y = dimensions.topLeftCorner.y - padding - group.strokeWidth;
      dimensions.width = (dimensions.bottomRightCorner.x - dimensions.topLeftCorner.x) + 2 * (padding + group.strokeWidth);
      dimensions.height = (dimensions.bottomRightCorner.y - dimensions.topLeftCorner.y) + 2 * (padding + group.strokeWidth);
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
      textElementsDescribingGroup,
      model = this.model;

    pvjsonPath.renderableType = 'GroupNode';
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = "GroupNode";

    groupType = groupSelection.attr('Style') || 'None';
    pvjsonPath.groupType = groupType;












    pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, groupSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {



      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, groupSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
        pvjsonText = updatedPvjsonText;





          var contents = elementsPossiblyInGroup.filter(function(element){
            return element.isContainedBy === pvjsonPath.id;
          });
          if (contents.length > 0) {
            pvjsonPath.contains = contents;
            pathvisiojs.data.gpml.group.getGroupDimensions(pvjsonPath, function(dimensions){
              pvjsonPath.x = dimensions.x;
              pvjsonPath.y = dimensions.y;
              pvjsonPath.width = dimensions.width;
              pvjsonPath.height = dimensions.height;
              pvjsonPath.zIndex = dimensions.zIndex;
              pvjsonText.containerX = dimensions.x;
              pvjsonText.containerY = dimensions.y;
              pvjsonText.containerWidth = dimensions.width;


              // TODO move all of these functions to a model section so they aren't repeated (e.g., this also appears in graphics.js)
              pvjsonText.containerWidth = function() {
                var parentElement = model.elements.filter(function(element) {
                  return element.id === pvjsonText.describes;
                })[0];
                var textWidth = parentElement.width;
                return textWidth;
              };

              pvjsonText.containerHeight = dimensions.height;
              pvjsonText.zIndex = dimensions.zIndex;
            });
            pvjsonElements.push(pvjsonPath);

            if (!!pvjsonText.textContent) {
              pvjsonElements.push(pvjsonText);
            }
          }
        callback(pvjsonElements);
      });
    });
  }
};



pathvisiojs.data.gpml.dataNode = function() {
  'use strict';

  var toPvjson = function(pathway, gpmlSelection, dataNodeSelection, callbackInside) {
    var pvjsonPath = {},
      pvjsonText = {};

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



    pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, dataNodeSelection, pvjsonPath, function(pvjsonPath, updatedPvjsonText) {
      pvjsonText = updatedPvjsonText;
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, dataNodeSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
        pvjsonText = updatedPvjsonText;

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
            pvjsonText.datasourceReference = datasourceReference;
          }
        }

        var pvjsonElements = [pvjsonPath];
        if (!!pvjsonText.textContent) {



          /*
          pvjsonText.myWidth = function() {
            var describedElementId = this.describes;
            var describedElement = pathway.elements.filter(function(element) {
              return element.id === describedElementId;
            })[0];
            return describedElement.width + 5;
          };
          //*/

          pvjsonElements.push(pvjsonText);
        }
        callbackInside(pvjsonElements);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();


pathvisiojs.data.gpml.label = function(){
  'use strict';

  var toPvjson = function(gpmlSelection, labelSelection, callback) {
    var pvjsonPath = {},
      pvjsonText = {};

    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = 'Label';

    pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, labelSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, labelSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
        pvjsonText = updatedPvjsonText;
        var pvjsonElements = [pvjsonPath];
        if (!!pvjsonText.textContent) {
          pvjsonElements.push(pvjsonText);
        }
        callback(pvjsonElements);
      });
    });
  };

  return {
    toPvjson:toPvjson
  };
}();


pathvisiojs.data.gpml.shape = function(){
  'use strict';

  function toPvjson(gpmlSelection, shapeSelection, callback) {
    var pvjsonPath = {};
    pvjsonPath.networkType = 'node';
    pvjsonPath.nodeType = "Shape";

    pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, shapeSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
        pvjsonText = updatedPvjsonText;
        var pvjsonElements = [pvjsonPath];
        if (!!pvjsonText.textContent) {
          pvjsonElements.push(pvjsonText);
        }
        callback(pvjsonElements);
      });
    });
  }

  return {
    toPvjson:toPvjson
  };
}();




pathvisiojs.data.gpml.state = function(){
  'use strict';

  var toPvjson = function(gpmlSelection, stateSelection, callback) {
    var pvjsonPath = {},
      pvjsonText = {};
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
        pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, stateSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
          pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, stateSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
            pvjsonText = updatedPvjsonText;
            var pvjsonElements = [pvjsonPath];
            if (!!pvjsonText.textContent) {
              pvjsonElements.push(pvjsonText);
            }
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


pathvisiojs.data.gpml.anchor = function() {
  'use strict';

  // anchors
  // see jsPlumb anchor model: http://jsplumbtoolkit.com/doc/anchors
  // TODO The documention below is out-of-date. See also pathvisiojs.data.gpml.point()
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
    var anchor, anchorSelection, pvjsonAnchor, pvjsonAnchors = [], pvjsonX, pvjsonY, parentElement, pvjsonMarker, pvjsonText, attachedPoint, pvjsonAnchorPosition, pvjsonAnchorWidth, pvjsonAnchorHeight;
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

      pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, anchorSelection, pvjsonAnchor, function(pvjsonAnchor, pvjsonText) {
        pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, anchorSelection, pvjsonAnchor, pvjsonText, function(pvjsonAnchor, updatedPvjsonText) {
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
            console.warn('No cached X and Y data available for this gpml Anchor element. Assuming LineType of Straight for anchor position calculation.');
          }
          
          // not returning updatedPvjsonText, because anchors don't have text
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


pathvisiojs.data.gpml.interaction = {
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
    //pathvisiojs.data.gpml.edge.toPvjson(interactionSelection, function(jsonInteraction) {
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

      var pvjsonPath = {}, pvjsonText = {};
      pvjsonPath.networkType = 'edge';
      pvjsonPath.gpmlType = 'Interaction';
      pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, interactionSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
        pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, interactionSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
          pathvisiojs.data.gpml.point.toPvjson(gpmlSelection, interactionSelection, pvjsonPath, function(pvjsonPath) {
            pathvisiojs.data.gpml.anchor.toPvjson(gpmlSelection, interactionSelection, pvjsonPath, function(pvjsonAnchor) {
              pvjsonElements = [pvjsonPath].concat(pvjsonAnchor);
              callback(pvjsonElements);
            });
          });
        });
      });
    //});
  }
};


pathvisiojs.data.gpml.graphicalLine = function(){
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
      pvjsonPath = {},
      pvjsonText = {};

    pvjsonPath.networkType = 'edge';
    pathvisiojs.data.gpml.element.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonPath, pvjsonText) {
      pathvisiojs.data.gpml.graphics.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, pvjsonText, function(pvjsonPath, updatedPvjsonText) {
        pathvisiojs.data.gpml.point.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonPath) {
          pathvisiojs.data.gpml.anchor.toPvjson(gpmlSelection, graphicalLineSelection, pvjsonPath, function(pvjsonAnchor) {

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


pathvisiojs.data.gpml.point = function(){
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
          pvjsonMarker = strcase.paramCase(gpmlArrowHeadValue);
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

     


pathvisiojs.view.pathwayDiagram.svg = {
    renderableTypeToSvgElementMappings: {
      entityNode: 'g',
      groupNode: 'g',
      interaction: 'path',
      graphicalLine: 'path'
    },

  //calculates the proper scaling and translations to fit content (i.e., diagram) to screen (i.e., viewport)
  fitAndCenterDiagramWithinViewport: function(viewport, viewportWidth, viewportHeight, diagramWidth, diagramHeight) {
    // viewport is a d3 selection

    var fitScreenScale = Math.min(viewportWidth/diagramWidth, viewportHeight/diagramHeight);
    var diagramWidthScaled = fitScreenScale * diagramWidth;
    var diagramHeightScaled = fitScreenScale * diagramHeight;

    var xTranslation = viewportWidth/2 - diagramWidthScaled/2 + 10; //plus margin-left
    var yTranslation = viewportHeight/2 - diagramHeightScaled/2 + 20; //plus margin-top

    var translationMatrixString = 'matrix(' + fitScreenScale + ', 0, 0, ' + fitScreenScale + ', ' + xTranslation + ', ' + yTranslation + ') ';
    
    viewport.attr("transform", translationMatrixString);
  },

  load: function(args, callbackOutside) {
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
    var svgRenderer = this;

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
          svg.attr('style', 'display:inline');
          callback(null, svg);
        });
      },
      function(svg, callback) {
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
          svgRenderer.fitAndCenterDiagramWithinViewport(viewport, containerWidth, containerHeight, pathway.image.width, pathway.image.height);
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
          svgRenderer.fitAndCenterDiagramWithinViewport(viewport, containerWidth, containerHeight, pathway.image.width, pathway.image.height);
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
  },

  loadPartials: function(args, callbackOutside) {
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
  },

  convertToId: function(inputString) {
    var id = strcase.paramCase(inputString);
    //var id = (inputString).replace(/[^(\w|\-)]/g, '').toLowerCase();
    // to make valid id per HTML4 spec, I'm ensuring the first character is a letter
    if (!/^[a-zA-Z]/.test(id)) {
      id = 'id-' + id;
    }
    return id;
  },

  convertToCssClassName: function(inputString) {
    var cssClassName = strcase.paramCase(inputString);
    //var cssClassName = (inputString).replace(/[^(\w|\-)]/g, '').toLowerCase();
    // to make valid cssClassName per HTML4 spec, I'm ensuring the first character is a letter
    if (!/^[a-zA-Z]/.test(cssClassName)) {
      cssClassName = 'class-' + cssClassName;
    }
    return cssClassName;
  },


  renderWithCachedData: function(svg, pathway, callback){
    var svgRenderer = this;
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
        var renderingArgs = {};

        async.each(pathway.elements, function(dataElement, callbackEach) {
          if (dataElement.graphicalType === 'path') {
            pathvisiojs.view.pathwayDiagram.svg.path.render(viewport, dataElement);
          }
          else if (dataElement.graphicalType === 'text') {
            pathvisiojs.view.pathwayDiagram.svg.text.render(viewport, dataElement);
          }
          else if (dataElement.graphicalType === 'image') {
            /*
            pathvisiojs.view.pathwayDiagram.svg.node.groupNode.render(renderingArgs, function(groupContainer, groupContents) {
              // TODO this used to render the group contents, but now the callback does nothing
            });
            //*/
          }
          callbackEach(null);
        },
        function(err){
          callbackInside(null, svg);
        });
      },
      function(svg, callbackInside){
        var elementsWithPublicationXrefs = pathway.elements.filter(function(element){return !!element.publicationXrefs;});
        if (elementsWithPublicationXrefs.length > 0) {
          elementsWithPublicationXrefs.forEach(function(elementWithPublicationXrefs) {
            console.log('elementWithPublicationXrefs');
            console.log(elementWithPublicationXrefs);
            svgRenderer.publicationXref.render(viewport, elementWithPublicationXrefs);
          });
        }
        callbackInside(null, svg);
      },
      function(svg, callbackInside){
        callback(svg);
      }
    ]);
  }
};


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


pathvisiojs.view.pathwayDiagram.svg.publicationXref = {

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


pathvisiojs.view.pathwayDiagram.svg.path = function(){
  'use strict';

  function render(parent, data) {
    var re, shapeNameFormatted;
    if (!!data.shape) {
      shapeNameFormatted = strcase.camelCase(data.shape);
      if (!pathvisiojs.view.pathwayDiagram.svg.path.hasOwnProperty(shapeNameFormatted)) {
        // if pathvisiojs cannot render the shape name indicated, check for whether the shape name a double-line shape.
        // If so, check whether pathvisiojs can render a single-line version of the shape.
        // If yes, render the single-line version. Otherwise, render a rounded rectangle.
        re = /double$/gi;
        shapeNameFormatted = shapeNameFormatted.replace(re, '');
        if (pathvisiojs.view.pathwayDiagram.svg.path.hasOwnProperty(shapeNameFormatted)) {
          console.warn('Requested path "' + data.shape + '" is not available with linetype of "Double". Using linetype of "Solid" instead');
        }
        else {
          console.warn('Requested path "' + data.shape + '" is not available. Using path "rounded-rectangle" instead');
          shapeNameFormatted = 'roundedRectangle';
        }
      }

      var path = parent.append('path');

      var pathRenderer = {
        id: function(idValue){
          path.attr('id', idValue);
        },
        strokeDasharray: function(strokeDasharrayValue){
          path.attr('stroke-dasharray', strokeDasharrayValue);
        },
        fill: function(fillValue){
          path.attr('fill', fillValue);
        },
        stroke: function(strokeValue){
          path.attr('stroke', strokeValue);
        },
        markerStart: function(markerStartValue) {
          path.attr('marker-start', 'url(#src-shape-library-markers-' + markerStartValue + '-svg-start-default)');
        },
        markerEnd: function(markerEndValue) {
          path.attr('marker-end', 'url(#src-shape-library-markers-' + markerEndValue + '-svg-end-default)');
        },
        datasourceReference: function(datasourceReferenceValue) {







          var notDragged = true;
          path.on("mousedown", function(d,i) {
            notDragged = true;
          })
          .on("mousemove", function(d,i) {
            notDragged = false;
          })
          .on("mouseup", function(d,i) {
            if (notDragged) {
              var dfId = datasourceReferenceValue.id;
              var dfDatabase = datasourceReferenceValue.database;
              var dfOrganism = datasourceReferenceValue.organism;
              pathvisiojs.view.annotation.xRef.render(dfOrganism, dfId, dfDatabase, data.textContent, data.dataNodeType);

            }
          });






        },
        rotation: function(rotationValue) {
          var transform = 'rotate(' + rotationValue + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')';
          path.attr('transform', transform);
        },
        strokeWidth: function(strokeWidthValue) {
          path.attr('stroke-width', strokeWidthValue);
        }
      };

      // These are generic attributes that can apply to any pathShape.
      var genericAttributeName, genericAttributeValue;
      var genericAttributes = d3.map(data).entries();
      d3.map(data).entries().forEach(function(genericAttribute){
        genericAttributeName = genericAttribute.key;
        genericAttributeValue = genericAttribute.value;
        if (pathRenderer.hasOwnProperty(genericAttributeName)) {
          pathRenderer[genericAttributeName](genericAttributeValue);
        }
      });

      // These attributes apply only to the specific pathShape indicated by "shapeNameFormatted".
      // At time of writing (2014-03-20), the only attribute specified for any shape is the "d" attribute (path data),
      // but pathvisiojs is capable of rendering other attributes if they were to be specified.
      var specificAttributes = pathvisiojs.view.pathwayDiagram.svg.path[shapeNameFormatted].getAttributes(data);
      specificAttributes.forEach(function(attribute) {
        path.attr(attribute.name, attribute.value);
      });
    }
  }

  return {
    render:render
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.arc = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;

    var yControlPoint = height * (2/3);

    var pathData = 'M ' + x + ' ' + y + ' ' +
      'C ' + (x) + ' ' + (y + yControlPoint) + ' ' + (x + width) + ' ' + (y + yControlPoint) + ' ' + (x + width) + ' ' + (y);

    var attributes = [
      {
        name:'d',
        value: pathData
        /*
        path: 'M' + (99.5 + x) + ',' + (50 + y) +
          'c0,27.338341 -22.162117,49.5 -49.5,49.5' +
          's-49.5,-22.161659 -49.5,-49.5'
          //*/
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.brace = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var pathData = 'm' + x + ',' + (y + height) +
      'C' + (x) + ' ' + (y) + ' ' + (x + width/2) + ' ' + (y + height) + ' ' + (x + width/2) + ' ' + (y) +
      'C' + (x + width/2) + ' ' + (y + height) + ' ' + (x + width) + ' ' + (y) + ' ' + (x + width) + ' ' + (y + height);
    var attributes = [
      {
        name:'d',
        value: pathData
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.complex = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        value: 'M ' + (x + 18) + ' ' + y +
          ' L ' + (x + width - 18) + ' ' + y +
          ' L ' + (x + width) + ' ' + (y + 18) +
          ' L ' + (x + width) + ' ' + (y + height - 18) +
          ' L ' + (x + width - 18) + ' ' + (y + height) +
          ' L ' + (x + 18) + ' ' + (y + height) +
          ' L ' + (x) + ' ' + (y + height - 18) +
          ' L ' + (x) + ' ' + (y + 18) +
          ' Z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.endoplasmicReticulum = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        value: 'm73.52756,56.60967c-5.62457,-18.60675 23.51463,-32.43358 23.40173,-45.06604c-0.34426,-4.86102 -10.48934,-8.89743 -18.28974,-5.33395c-17.04119,7.87556 -15.64949,29.30503 -21.20533,42.23387c-0.35661,3.60951 -7.36274,2.46926 -7.74964,-0.48694c-5.8512,-11.38871 17.13534,-24.48692 5.96075,-29.42586c-19.63467,-8.16979 -28.75184,21.15346 -22.0682,28.81784c7.4956,14.17602 -2.17949,24.40679 -6.74689,15.49637c-2.44209,-5.30613 6.06605,-11.08445 -0.80351,-16.17689c-4.31991,-2.79993 -11.75555,-0.64618 -16.15468,3.0943c-12.89117,10.73799 4.72957,40.98145 20.96467,36.14635c4.69833,-1.95989 -3.23603,-8.70151 3.90717,-9.59951c7.29767,-0.81255 5.17628,6.18889 7.68745,9.22691c2.3071,4.0509 4.83232,8.35538 10.7626,11.6237c4.78642,2.53724 15.29437,2.11225 16.77148,-1.95795c2.0318,-9.26291 -26.11129,-28.35848 -10.68903,-31.2815c18.55524,-2.71473 4.74866,23.84573 24.31006,29.69419c9.50188,2.02824 15.63902,-0.62194 14.81255,-4.03272c-2.74586,-11.26327 -25.13557,-22.6802 -24.96441,-33.14968'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.golgiApparatus = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;


      var path1 = 'm58.4671,16.99297c-22.2053,-19.30712 37.3101,-19.538 25.5673,-3.1145c-8.8077,11.998 -17.0665,37.53828 -0.9417,64.06707c13.3147,17.47735 -41.7485,17.92546 -27.7555,-0.94919c11.3458,-18.99656 10.2868,-51.87342 3.1299,-60.00338l0,0z';

      var path2 = 'm31.2144,22.48219c-10.7917,-13.83614 29.8976,-12.81612 18.4075,0.4332c-4.067,4.79263 -5.7828,39.75796 1.1607,48.44653c8.5294,12.0082 -32.853,12.49764 -20.5002,-1.45349c6.9528,-11.2083 10.4738,-33.76451 0.932,-47.42624l0,0z';

      var path3 = 'm29.80396,32.77896c1.58418,7.4093 2.72346,10.80737 -1.48298,24.77019c-3.73195,8.38708 -3.6004,10.5513 -11.73233,12.53496c-6.6833,1.07092 -11.86483,-6.32111 -4.7933,-10.40477c4.85573,-3.63095 6.14109,-7.02681 6.65889,-14.82198c-0.23922,-6.14805 0.8145,-10.21755 -5.36692,-12.88742c-7.62432,-1.41744 -6.08804,-10.67651 4.82406,-8.95195c5.84935,0.66319 10.2824,5.52823 11.89258,9.76096z';


      var pathData = path1 + ' ' + path2 + ' ' + path3;
    var attributes = [
    {
      name:'d',
      value: pathData
    }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.gridSquare = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        value: 'm1,1l99,0l0,99l-99,0l0,-99z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.hexagon = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var pathData = 'M' + (x + 0.25 * width) + ',' + y +
      'l' + (0.5 * width) + ',' + 0 +
      'l' + (0.25 * width) + ',' + (0.5 * height) +
      'l' + (-0.25 * width) + ',' + (0.5 * height) +
      'l' + (-0.5 * width) + ',' + 0 +
      'l' + (-0.25 * width) + ',' + (-0.5 * height) +
      'z';
      var attributes = [
        {
          name:'d',
          value: pathData
        }
      ];
      return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.mimDegradation = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;


        var pathSegment1 = 'm8,50c0,-23.20442 18.79558,-42 42,-42c23.20442,0 42,18.79558 42,42c0,23.20442 -18.79558,42 -42,42c-23.20442,0 -42,-18.79558 -42,-42z';

        var pathSegment2 = 'm1,1l99,99';

        var pathData = pathSegment1 + ' ' + pathSegment2;

    var attributes = [
      {
        name:'d',
        value: pathData
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.lineStraight = function(){
  'use strict';

  function getAttributes(data) {
    var x0 = data.points[0].x,
      y0 = data.points[0].y,
      x1 = data.points[1].x,
      y1 = data.points[1].y;
    var attributes = [
      {
        name:'d',
        value: 'M' + x0 + ',' + y0 + ' L' + x1 + ',' + y1
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.lineSegmented = function(){
  'use strict';

  //for generating line segments through a path of points (pathpoints, not waypoints)
  var svgLine = d3.svg.line()
  .x(function(d) {return d.x; })
  .y(function(d) {return d.y;})
  .interpolate("linear");

  function getAttributes(data) {
    var pathData = svgLine(data.points);

    var attributes = [
      {
        name:'d',
        value: pathData
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.lineElbow = function(){
  'use strict';

  //for generating line segments through a path of points (pathpoints, not waypoints)
  var svgLine = d3.svg.line()
  .x(function(d) {return d.x;})
  .y(function(d) {return d.y;})
  .interpolate("linear");
  //.interpolate("linear");

  function getAttributes(data) {
    var pathData = svgLine(data.points);

    var attributes = [
      {
        name:'d',
        value: pathData
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


// TODO this is currently just a renamed copy of lineStraight
pathvisiojs.view.pathwayDiagram.svg.path.lineCurved = function(){
  'use strict';

  //for generating bezier curves through a path of points (pathpoints, not waypoints)
  var svgCurve = d3.svg.line()
  .x(function(d) {return d.x; })
  .y(function(d) {return d.y;})
  //.interpolate("cardinal");
  .interpolate("basis");

  function getAttributes(data) {
    var pathData = svgCurve(data.points);


    var attributes = [
      {
        name:'d',
        value:pathData
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.mitochondria = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var cx = x + width/2;
    var cy = y + height/2;
    var outerEllipse = pathvisiojs.view.pathwayDiagram.svg.path.oval.drawEllipse(cx, cy, width, height);
    var innerShape = 'M' + (x + 14.894899) + ',' + (y + 26.347357) +
      'c4.363817,-0.741571 3.827518,17.036169 8.182638,16.183825' +
      'c8.27347,0.030762 2.982006,-28.148991 9.899754,-28.336687' +
      'c6.967995,-0.187704 2.246651,29.947527 9.204983,29.43981' +
      'c7.632813,-0.560024 0.507309,-32.935357 8.136253,-33.623082' +
      'c7.698521,-0.689259 2.919197,32.039941 10.628349,32.224557' +
      'c6.546684,0.160011 3.026451,-27.642808 9.56057,-26.921232' +
      'c7.192177,0.79388 0.664818,29.842905 7.781624,31.667604' +
      'c4.748405,1.215439 4.420822,-18.257757 9.204018,-17.440804' +
      'c11.128883,7.577278 8.628105,37.698658 -2.179977,44.645138' +
      'c-3.138542,0.698479 -3.965698,-10.502029 -7.112938,-9.905075' +
      'c-5.59005,1.058502 -3.982124,22.284088 -9.603096,21.799461' +
      'c-5.239281,-0.456947 -2.226364,-21.636383 -7.47047,-21.730232' +
      'c-6.961235,-0.116928 -3.357895,28.924408 -10.316231,28.495148' +
      'c-6.140846,-0.375397 -1.73064,-24.950363 -7.825104,-26.191963' +
      'c-5.681847,-1.156982 -5.378429,22.170242 -11.027426,20.680939' +
      'c-6.249069,-1.644684 -0.469624,-26.673519 -6.759275,-27.865887' +
      'c-3.728954,-0.706188 -2.647665,14.400654 -6.403677,14.545292' +
      'c-14.016198,-5.938736 -15.748776,-39.707981 -3.899994,-47.666811' +
      'z';
    var pathData = outerEllipse + ' ' + innerShape;

    var attributes = [
      {
        name:'d',
        value: pathData
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.none = function(){
  'use strict';

  function getAttributes(data) {
    var attributes = [
      {
        name:'d',
        value: 'M0 0'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.oval = function(){
  'use strict';

  // TODO don't repeat this with the def in ovalDouble
  function drawEllipse(x, y, width, height) {
    var width_over_2 = width / 2,
      width_two_thirds = width * 2 / 3,
      height_over_2 = height / 2;
    var pathData = 'M ' + x + ' ' + (y - height_over_2) + ' ' +
      'C ' + (x + width_two_thirds) + ' ' + (y - height_over_2) + ' ' + (x + width_two_thirds) + ' ' + (y + height_over_2) + ' ' + (x) + ' ' + (y + height_over_2) +
      'C ' + (x - width_two_thirds) +  ' ' + (y + height_over_2) +  ' ' + (x - width_two_thirds) +  ' ' + (y - height_over_2) + ' ' + (x) +  ' ' + (y - height_over_2);
    return pathData;
  }

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var cx = x + width/2;
    var cy = y + height/2;
    var pathData = drawEllipse(cx, cy, width, height);
    var attributes = [
      {
        name:'d',
        value:pathData
      }
    ];
    return attributes;
  }

  return {
    drawEllipse:drawEllipse,
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.ovalDouble = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height,
      doubleLineGap = 2 * data.strokeWidth || 6;
    var cx = x + width/2;
    var cy = y + height/2;
    var outerEllipse = pathvisiojs.view.pathwayDiagram.svg.path.oval.drawEllipse(cx, cy, width, height);
    var innerEllipse = pathvisiojs.view.pathwayDiagram.svg.path.oval.drawEllipse(cx, cy, width - 2*doubleLineGap, height - 2*doubleLineGap);

    /*
m74.23027,549.04834
c0,-37.56906 22.37569,-68 50,-68
c27.62431,0 50,30.43094 50,68
c0,37.56903 -22.37569,68 -50,68
c-27.62431,0 -50,-30.43097 -50,-68
z
//*/

    var attributes = [
      {
        name:'d',
        value:outerEllipse + ' ' + innerEllipse
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.pentagon = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        value: 'M' + x + ',' + (y + 0.81*height) +
          'l0,-' + 0.62*height +
          'l' + 0.62*width + ',-' + 0.19*height +
          'l' + 0.38*width+',' + 0.5*height +
          'l-' + 0.38*width + ',' + 0.5*height +
          'l-' + 0.62*width + ',-' + 0.19*height +
          'z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.rectangle = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;

    var path = 'M ' + x + ' ' + y +
      'L' + (x + width) + ' ' + y +
      'L' + (x + width) + ' ' + (y + height) +
      'L' + (x) + ' ' + (y + height) +
      'Z';

    var attributes = [
      {
        name:'d',
        value: path
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.roundedRectangle = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var pathData = 'M' + x + ',' + (y + 10) + ' ' +
          'c0,-5.43379 4.56621,-10 10,-10' +
          'l' + (width - 20) + ',0' +
          'c5.43379,0 10,4.56621 10,10' +
          'l0,' + (height - 20) +
          'c0,5.43379 -4.56621,10 -10,10' +
          'l' + (20 - width) + ',0' +
          'c-5.43379,0 -10,-4.56621 -10,-10' +
          'l0,' + (20 - height) +
          'z';
    var attributes = [
      {
        name:'d',
        value: pathData
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.roundedRectangleDouble = function(){
  'use strict';

  function drawRoundedRectangle(x, y, width, height) {
  }

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    /* TODO refactor this code so we only have a single function for drawing single-line rounded rectangles.
    var outerRoundedRectangle = drawRoundedRectangle(x, y, width, height);
    var innerRoundedRectangle = drawRoundedRectangle(x + 3, y + 3, width - 3, height - 3);
    //*/
    var outerRoundedRectangle = 'M' + x + ',' + (y + 10) + ' ' +
          'c0,-5.43379 4.56621,-10 10,-10' +
          'l' + (width - 20) + ',0' +
          'c5.43379,0 10,4.56621 10,10' +
          'l0,' + (height - 20) +
          'c0,5.43379 -4.56621,10 -10,10' +
          'l' + (20 - width) + ',0' +
          'c-5.43379,0 -10,-4.56621 -10,-10' +
          'l0,' + (20 - height) +
          'z';

    var innerRoundedRectangle = 'M' + (x + 6) + ',' + (y + 13) + ' ' +
          'c0,-3.80365 3.19635,-7 7,-7' +
          'l' + (width - 26) + ',0' +
          'c3.80365,0 7,3.19635 7,7' +
          'l0,' + (height - 26) +
          'c0,3.80365 -3.19635,7 -7,7' +
          'l' + (26 - width) + ',0' +
          'c-3.80365,0 -7,-3.19635 -7,-7' +
          'l0,' + (26 - height) +
          'z';

    var attributes = [
      {
        name:'d',
        value: innerRoundedRectangle + ' ' + outerRoundedRectangle
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.sarcoplasmicReticulum = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        value: 'm46.60182,1.40724c-32.37224,1.34138 -36.32004,22.77011 -26.50318,38.12777c9.31826,18.3425 -18.7656,30.15016 2.56955,49.37807c16.82126,13.11594 46.33175,6.10508 52.12638,-8.56826c5.89916,-15.24847 -10.95099,-26.0272 -3.29316,-40.96135c10.85342,-19.88432 -0.77615,-38.13043 -24.89959,-37.97624z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.path.triangle = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        value: 'M' + x + ',' + y +
          'L' + (x + width) + ',' + (y + height/2) +
          'L' + x + ',' + (y + height) +
          'z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();


pathvisiojs.view.pathwayDiagram.svg.text = function(){
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

  function convertToPx(inputString, fontSize) {
    // if current fontSize is 12pt, then 1em = 12pt = 16px = 100%
    var inputStringLowerCased, px;
    if (pathvisiojs.utilities.isNumber(inputString)) {
      px = inputString;
    }
    else {
      inputStringLowerCased = inputString.toLowerCase();
      if (inputStringLowerCased.indexOf('em') > -1) {
        px = inputStringLowerCased.slice(0,inputStringLowerCased.length-2) * fontSize;
      }
      else if (inputStringLowerCased.indexOf('px') > -1) {
        px = inputStringLowerCased.slice(0,inputStringLowerCased.length-2);
      }
      else if (inputStringLowerCased.indexOf('pt') > -1) {
        px = inputStringLowerCased.slice(0,inputStringLowerCased.length-2) * (4/3);
      }
      else if (inputStringLowerCased.indexOf('%') > -1) {
        px = (inputStringLowerCased.slice(0,inputStringLowerCased.length-1) / 100) * fontSize;
      }
      else {
        px = inputString;
      }
    }
    return px;
  }

  function render(parent, data) {
    /*
    console.log('****************');
    console.log('parent');
    console.log(parent);
    console.log('data');
    console.log(data);
    //*/
    var containerPadding = data.containerPadding || 0,
      containerWidth = data.containerWidth(),
      containerHeight = data.containerHeight,
      fontSize = data.fontSize;
    var containerPaddingInPx = convertToPx(containerPadding, fontSize);
    /*
    console.log('containerPaddingInPx');
    console.log(containerPaddingInPx);
    //*/
    var textAnchor;
    if (data.textAlign == 'left'){
      textAnchor = 'start';
    } else if (data.textAlign == 'right') {
      textAnchor = 'end';
    } else {
      textAnchor = 'middle';
    }

    var textAlignXTranslation;
    if (data.textAlign === 'left'){
      textAlignXTranslation = containerPaddingInPx;
    } else if (data.textAlign === 'right') {
      textAlignXTranslation = containerWidth - containerPaddingInPx;
    } else {
      textAlignXTranslation = containerWidth / 2;
    }

    var textLines = data.textContent.split(/\r\n|\r|\n/g);
    var textLineCount = textLines.length;
    var textAreaHeight = ((textLineCount - 1) * 1.1 * fontSize);
    var verticalAlignYTranslation;
    if (data.verticalAlign === 'top'){
      verticalAlignYTranslation = containerPaddingInPx + textAreaHeight/2 + fontSize;
    } else if (data.verticalAlign === 'bottom') {
      verticalAlignYTranslation = containerHeight - containerPaddingInPx - textAreaHeight/2 - fontSize/3;
    } else {
      verticalAlignYTranslation = containerHeight/2 + fontSize/3;
    }

    var xTranslation = data.containerX + textAlignXTranslation;
    var yTranslation = data.containerY + verticalAlignYTranslation;

    var textArea = parent.append('g')
    .attr("id", function () {
      return 'text-container' + pathvisiojs.view.pathwayDiagram.svg.convertToId(data.id);
    })
    .attr('transform', function() {
      return 'translate(' + xTranslation + ' ' + yTranslation + ')';
    })
    .attr("class", "text-area");

    var textLine = textArea.selectAll('text')
    .data(function(d) {
      return textLines;
    })
    .enter()
    .append('text')
    .attr("id", function (d, i) {
      return 'text-line' + i;
    })
    .attr("x", 0)
    .attr("y", function (d, i) { return (i - (textLineCount - 1)/2) * 1.1 + 'em';})
    //.attr("alignment-baseline", data.verticalAlign)
    .attr("text-anchor", textAnchor)
    .text(function (d) { return d; });

    /*
    nodeText.attr('transform', function(d) {
      applyTextAlign(nodeText[0][0], d, function(translate) {
        return 'translate(' + translate.dx + ' ' + translate.dy + ')';
      });
    })
    //*/
    var pathRenderer = {
      fontStyle: function(fontStyleValue){
        textLine.attr('font-style', fontStyleValue);
      },
      fontWeight: function(fontWeightValue){
        textLine.attr('font-weight', fontWeightValue);
      },
      fontSize: function(fontSizeValue){
        textLine.attr('font-size', fontSizeValue);
      },
      fontFamily: function(fontFamilyValue){
        textLine.attr('font-family', fontFamilyValue);
      },
      strokeDasharray: function(strokeDasharrayValue){
        textLine.attr('stroke-dasharray', strokeDasharrayValue);
      },
      fill: function(fillValue){
        textLine.attr('fill', fillValue);
      },
      stroke: function(strokeValue){
        textLine.attr('stroke', strokeValue);
      },
      datasourceReference: function(datasourceReferenceValue) {







        var notDragged = true;
        textLine.on("mousedown", function(d,i) {
          notDragged = true;
        })
        .on("mousemove", function(d,i) {
          notDragged = false;
        })
        .on("mouseup", function(d,i) {
          if (notDragged) {
            var dfId = datasourceReferenceValue.id;
            var dfDatabase = datasourceReferenceValue.database;
            var dfOrganism = datasourceReferenceValue.organism;
            pathvisiojs.view.annotation.xRef.render(dfOrganism, dfId, dfDatabase, data.textContent, data.dataNodeType);

          }
        });






      },
      rotation: function(rotationValue) {
        var transform = 'rotate(' + rotationValue + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')';
        textLine.attr('transform', transform);
      },
      strokeWidth: function(strokeWidthValue) {
        textLine.attr('stroke-width', strokeWidthValue);
      }
    };

    var elementAttributeKey;
    var elementAttributes = d3.map(data).entries();
    d3.map(data).entries().forEach(function(elementAttribute){
      elementAttributeKey = elementAttribute.key;
      if (pathRenderer.hasOwnProperty(elementAttributeKey)) {
        pathRenderer[elementAttributeKey](elementAttribute.value);
      }
    });

    return parent;
  }

  return {
    render:render
  };
}();

