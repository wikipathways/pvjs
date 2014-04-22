var _ = require('lodash')
  , async = require('async')
  , Strcase = require('./../../lib/strcase/index.js')
  ;

module.exports = (function(){
  'use strict';

  function log() {
    if (window.console && window.console.log) {
      if (window.console.log.apply){
        window.console.log.apply(window.console, arguments)
      } else {
        var message = Array.prototype.slice.apply(arguments).join(' ')
        window.console.log(message)
      }
    }
  }

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
        // inherited from Object.prototype.  For example, if dest has a custom toString() method,
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
      return src; // anything
    }
    if(src.nodeType && "cloneNode" in src){
      // DOM Node
      return src.cloneNode(true); // Node
    }
    if(src instanceof Date){
      // Date
      return new Date(src.getTime()); // Date
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
      //    }else if(d.isFunction(src)){
      //      // function
      //      r = function(){ return src.apply(this, arguments); };
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
      if (b.indexOf(a[i]) > -1) {
        res.push(a[i]);
      }
    }
    return res;
  }

  function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 10) : false;
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
        if (/MSIE ([6-9]+\.\d+);/.test(navigator.userAgent)) {
          window.setTimeout(function(){handler();},8,this);
        } else {
          handler();
        }
      }
      var head = document.getElementsByTagName('head')[0];
      (head || document.body).appendChild( script );
    };
    (function _handler(){
      if(array.length !== 0){
        loader(array.shift(), _handler);
      }else{
        if (callback) {
          callback();
        }
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

  // from here: http://www.cjboco.com/blog.cfm/post/determining-an-elements-width-and-height-using-javascript/
  // TODO have not tested x-browser yet.
  function getElementWidth(element) {
    if (typeof element.clip !== "undefined") {
      return element.clip.width;
    } else {
      if (element.style.pixelWidth) {
        return element.style.pixelWidth;
      } else {
        return element.width;
      }
    }
  }

  function getElementHeight(element) {
    if (typeof element.clip !== "undefined") {
      return element.clip.width;
    } else {
      if (element.style.pixelHeight) {
        return element.style.pixelHeight;
      } else {
        return element.height;
      }
    }
  }

  function addClassForD3($element, className) {
    var elementClass = $element.attr('class') || ""

    // There are not classes at all
    if (elementClass.match(/[^\s]+/g) === null) {
      $element.attr('class', className)
    // Element has no such class
    } else if (elementClass.match(/[^\s]+/g).indexOf(className) === -1) {
      $element.attr('class', elementClass + ' ' + className)
    }
  }

  function removeClassForD3($element, className) {
    var elementClass = $element.attr('class') || ""
      , classes = elementClass.match(/[^\s]+/g)

    // Remove that class from list and join class name back
    if (classes !== null  && classes.indexOf(className) !== -1) {
      classes = _.filter(classes, function(_class){return _class !== className})
      $element.attr('class', classes.join(' '))
    }
  }

  function proxy(fn, context) {
    var _proxy = function() {
      fn.apply(context, arguments)
    }

    return _proxy
  }

  function loadXmlFromUri(uri, callback) {
    if (isIE() !== 9) {
      // d3.xml does not work with IE9 (and probably earlier), so we're using d3.xhr instead of d3.xml for IE9
      // TODO file a bug report on d3 issue tracker
      d3.xml(uri, 'application/xml', function(xmlDoc) {
        if (xmlDoc.documentElement) {
          callback(xmlDoc.documentElement)
        } else {
          callback(null)
        }
      });
    }
    else {
      async.waterfall([
        function(callbackInner) {
          if (!$) {
            // TODO should we use requirejs for loading scripts instead?
            loadScripts(['http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'], function() {
              callbackInner(null);
            });
          }
          else {
            callbackInner(null);
          }
        },
        function(callbackInner) {
          d3.xhr(uri, 'application/xml', function(error, data) {
            var xmlString = data.responseText;
            callbackInner(null, xmlString);
          });
        },
        function(xmlString, callbackInner) {
          var xmlDoc = $.parseXML(xmlString);
          var xml = xmlDoc.documentElement;
          callback(xml);
          callbackInner(null);
        }
      ]);
    }
  }

  var convertToCssClassName = function(inputString) {
    var cssClassName = Strcase.paramCase(inputString);
    //var cssClassName = (inputString).replace(/[^(\w|\-)]/g, '').toLowerCase();
    // to make valid cssClassName per HTML4 spec, I'm ensuring the first character is a letter
    if (!/^[a-zA-Z]/.test(cssClassName)) {
      cssClassName = 'class-' + cssClassName;
    }
    return cssClassName;
  };

  function convertToCSSId(inputString) {
    var id = Strcase.paramCase(inputString);
    //var id = (inputString).replace(/[^(\w|\-)]/g, '').toLowerCase();
    // to make valid id per HTML4 spec, I'm ensuring the first character is a letter
    if (!/^[a-zA-Z]/.test(id)) {
      id = 'id-' + id;
    }
    return id;
  }

  return{
    log: log,
    clone: clone,
    cloneNode: cloneNode,
    collect: collect,
    convertToArray: convertToArray,
    getObjectType: getObjectType,
    getTextDirection: getTextDirection,
    getUriParam: getUriParam,
    getWindowDimensions: getWindowDimensions,
    isIE: isIE,
    intersect: intersect,
    isNumber: isNumber,
    isOdd: isOdd,
    isUri: isUri,
    isWikiPathwaysId: isWikiPathwaysId,
    loadScripts: loadScripts,
    moveArrayItem: moveArrayItem,
    splitStringByNewLine: splitStringByNewLine,
    strToHtmlId: strToHtmlId,
    getElementWidth: getElementWidth,
    getElementHeight: getElementHeight,
    addClassForD3: addClassForD3,
    removeClassForD3: removeClassForD3,
    proxy: proxy,
    loadXmlFromUri: loadXmlFromUri,
    convertToCssClassName: convertToCssClassName,
    convertToCSSId: convertToCSSId
  };
})();
