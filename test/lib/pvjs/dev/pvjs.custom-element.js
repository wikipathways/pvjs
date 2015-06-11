function load(doc, src, fn) {  if (typeof doc === 'string') {    fn = src;    src = doc;    doc = document;  }  var script = doc.createElement('script');  script.type = 'text/javascript';  script.src = src;  if (fn) onLoad(script, fn);  script.onLoad = function(fn) {    return onLoad(script, fn);  };  doc.body.appendChild(script);  return script;} function polyfillLoader(polyfillServiceIri, polyfillServiceCallbackName, callback) {    window[polyfillServiceCallbackName] = function() {      return callback(null);    };    if (!!document.body) {      load(polyfillServiceIri);    } else {      var existingonreadystatechange = document.onreadystatechange;      document.onreadystatechange = function() {        if (document.readyState === 'interactive') {          if (typeof existingonreadystatechange === 'function') {            existingonreadystatechange();          }          load(polyfillServiceIri);        }      };    }  } polyfillLoader("//cdn.polyfill.io/v1/polyfill.min.js?features=Array.prototype.filter,Object.create,Object.defineProperties,Object.defineProperty&callback=polyfillServiceCallbackpvjscustomelement", "polyfillServiceCallbackpvjscustomelement", function(err) {require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/custom-element.js":[function(require,module,exports){
function initPvjs() {

  var Pvjs = require('./main.js');

  /**
   * Enable the wikipathways-pvjs custom element
   *
   * @return
   */
  function registerWikiPathwaysPvjsElement(Pvjs) {
    'use strict';

    var DivPrototype = Object.create(window.HTMLDivElement.prototype);

    DivPrototype.attributeChangedCallback = function(
        attrName, oldValue, newValue) {
      if (attrName === 'alt') {
        this.textContent = newValue;
      }
    };

    var WikiPathwaysPvjsPrototype = Object.create(DivPrototype);

    WikiPathwaysPvjsPrototype.createdCallback = function() {
      var vm = this;
      var args = {};

      var alt = args.alt = vm.getAttribute('alt');
      if (!!alt) {
        vm.attributeChangedCallback('alt', null, alt);
      }

      var displayErrors = args.displayErrors =
          Boolean(vm.getAttribute('display-errors'));
      if (!!displayErrors) {
        vm.attributeChangedCallback('display-errors', null, displayErrors);
      }

      var displayWarnings = args.displayWarnings =
          Boolean(vm.getAttribute('display-warnings'));
      if (!!displayWarnings) {
        vm.attributeChangedCallback('display-warnings', null, displayWarnings);
      }

      var fitToContainer = args.fitToContainer =
          Boolean(vm.getAttribute('fit-to-container'));
      if (!!fitToContainer) {
        vm.attributeChangedCallback('fit-to-container', null, fitToContainer);
      }

      var highlights = vm.getAttribute('highlights');
      if (!!highlights) {
        highlights = args.highlights = JSON.parse(decodeURIComponent(highlights));
        vm.attributeChangedCallback('highlights', null, highlights);
      }

      var hashEditorStateComponents = window.location.hash.match('editor\/(.*)$');
      var hashEditorState;
      if (!!hashEditorStateComponents && !!hashEditorStateComponents.length) {
        hashEditorState = hashEditorStateComponents[1];
      }
      var editor = args.editor = hashEditorState ||
          vm.getAttribute('editor');
      if (!!editor) {
        vm.attributeChangedCallback('editor', null, editor);
      }

      var resource = args.resource = vm.getAttribute('resource');
      if (!!resource) {
        vm.attributeChangedCallback('resource', null, resource);
      }

      var version = args.version = parseFloat(vm.getAttribute('version'));
      if (!!version) {
        vm.attributeChangedCallback('version', null, version);
      }

      /* TODO should this be enabled? It doesn't seem needed for the web-component.
      var manualRender = args.manualRender =
          Boolean(vm.getAttribute('manual-render'));
      if (!!manualRender) {
        vm.attributeChangedCallback('manual-render', null, manualRender);
      }
      //*/

      var src = vm.getAttribute('src');
      if (!!src) {
        vm.attributeChangedCallback('src', null, src);
      }
      args.sourceData = [
        {
          uri: src,
          // TODO we should be able to use the content type
          // header from the server response instead of relying
          // on this.
          // Think analogous to image/png, image/gif, etc. for the img tag.
          fileType:'gpml' // generally will correspond to filename extension
        }
      ];

      vm.innerHTML = '';

      var pvjs = new Pvjs(vm, args);
    };

    // Public: WikiPathwaysPvjsPrototype constructor.
    //
    //   # => <wikipathways-pvjs></wikipathways-pvjs>
    //
    window.WikiPathwaysPvjs = document.registerElement(
        'wikipathways-pvjs', {
        prototype: WikiPathwaysPvjsPrototype
    });
  }

  if (!!window.Kaavio) {
    registerWikiPathwaysPvjsElement(Pvjs);
  } else {
    window.addEventListener('kaavioready', function kaavioReadyHandler(e) {
      window.removeEventListener('kaavioready', kaavioReadyHandler, false);
      registerWikiPathwaysPvjsElement(Pvjs);
    }, false);
  }
}

if (document.readyState === 'complete') {
  initPvjs();
} else {
  window.addEventListener('load', function listener(event) {
    window.removeEventListener('load', listener, false);
    initPvjs();
  }, false);
}

},{"./main.js":"/Users/andersriutta/Sites/pvjs/lib/main.js"}]},{},["./lib/custom-element.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvY3VzdG9tLWVsZW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImZ1bmN0aW9uIGluaXRQdmpzKCkge1xuXG4gIHZhciBQdmpzID0gcmVxdWlyZSgnLi9tYWluLmpzJyk7XG5cbiAgLyoqXG4gICAqIEVuYWJsZSB0aGUgd2lraXBhdGh3YXlzLXB2anMgY3VzdG9tIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVyblxuICAgKi9cbiAgZnVuY3Rpb24gcmVnaXN0ZXJXaWtpUGF0aHdheXNQdmpzRWxlbWVudChQdmpzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIERpdlByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUod2luZG93LkhUTUxEaXZFbGVtZW50LnByb3RvdHlwZSk7XG5cbiAgICBEaXZQcm90b3R5cGUuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24oXG4gICAgICAgIGF0dHJOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgIGlmIChhdHRyTmFtZSA9PT0gJ2FsdCcpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IG5ld1ZhbHVlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgV2lraVBhdGh3YXlzUHZqc1Byb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoRGl2UHJvdG90eXBlKTtcblxuICAgIFdpa2lQYXRod2F5c1B2anNQcm90b3R5cGUuY3JlYXRlZENhbGxiYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgdmFyIGFyZ3MgPSB7fTtcblxuICAgICAgdmFyIGFsdCA9IGFyZ3MuYWx0ID0gdm0uZ2V0QXR0cmlidXRlKCdhbHQnKTtcbiAgICAgIGlmICghIWFsdCkge1xuICAgICAgICB2bS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soJ2FsdCcsIG51bGwsIGFsdCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBkaXNwbGF5RXJyb3JzID0gYXJncy5kaXNwbGF5RXJyb3JzID1cbiAgICAgICAgICBCb29sZWFuKHZtLmdldEF0dHJpYnV0ZSgnZGlzcGxheS1lcnJvcnMnKSk7XG4gICAgICBpZiAoISFkaXNwbGF5RXJyb3JzKSB7XG4gICAgICAgIHZtLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaygnZGlzcGxheS1lcnJvcnMnLCBudWxsLCBkaXNwbGF5RXJyb3JzKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpc3BsYXlXYXJuaW5ncyA9IGFyZ3MuZGlzcGxheVdhcm5pbmdzID1cbiAgICAgICAgICBCb29sZWFuKHZtLmdldEF0dHJpYnV0ZSgnZGlzcGxheS13YXJuaW5ncycpKTtcbiAgICAgIGlmICghIWRpc3BsYXlXYXJuaW5ncykge1xuICAgICAgICB2bS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soJ2Rpc3BsYXktd2FybmluZ3MnLCBudWxsLCBkaXNwbGF5V2FybmluZ3MpO1xuICAgICAgfVxuXG4gICAgICB2YXIgZml0VG9Db250YWluZXIgPSBhcmdzLmZpdFRvQ29udGFpbmVyID1cbiAgICAgICAgICBCb29sZWFuKHZtLmdldEF0dHJpYnV0ZSgnZml0LXRvLWNvbnRhaW5lcicpKTtcbiAgICAgIGlmICghIWZpdFRvQ29udGFpbmVyKSB7XG4gICAgICAgIHZtLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaygnZml0LXRvLWNvbnRhaW5lcicsIG51bGwsIGZpdFRvQ29udGFpbmVyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGhpZ2hsaWdodHMgPSB2bS5nZXRBdHRyaWJ1dGUoJ2hpZ2hsaWdodHMnKTtcbiAgICAgIGlmICghIWhpZ2hsaWdodHMpIHtcbiAgICAgICAgaGlnaGxpZ2h0cyA9IGFyZ3MuaGlnaGxpZ2h0cyA9IEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KGhpZ2hsaWdodHMpKTtcbiAgICAgICAgdm0uYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCdoaWdobGlnaHRzJywgbnVsbCwgaGlnaGxpZ2h0cyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBoYXNoRWRpdG9yU3RhdGVDb21wb25lbnRzID0gd2luZG93LmxvY2F0aW9uLmhhc2gubWF0Y2goJ2VkaXRvclxcLyguKikkJyk7XG4gICAgICB2YXIgaGFzaEVkaXRvclN0YXRlO1xuICAgICAgaWYgKCEhaGFzaEVkaXRvclN0YXRlQ29tcG9uZW50cyAmJiAhIWhhc2hFZGl0b3JTdGF0ZUNvbXBvbmVudHMubGVuZ3RoKSB7XG4gICAgICAgIGhhc2hFZGl0b3JTdGF0ZSA9IGhhc2hFZGl0b3JTdGF0ZUNvbXBvbmVudHNbMV07XG4gICAgICB9XG4gICAgICB2YXIgZWRpdG9yID0gYXJncy5lZGl0b3IgPSBoYXNoRWRpdG9yU3RhdGUgfHxcbiAgICAgICAgICB2bS5nZXRBdHRyaWJ1dGUoJ2VkaXRvcicpO1xuICAgICAgaWYgKCEhZWRpdG9yKSB7XG4gICAgICAgIHZtLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaygnZWRpdG9yJywgbnVsbCwgZWRpdG9yKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlc291cmNlID0gYXJncy5yZXNvdXJjZSA9IHZtLmdldEF0dHJpYnV0ZSgncmVzb3VyY2UnKTtcbiAgICAgIGlmICghIXJlc291cmNlKSB7XG4gICAgICAgIHZtLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaygncmVzb3VyY2UnLCBudWxsLCByZXNvdXJjZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB2ZXJzaW9uID0gYXJncy52ZXJzaW9uID0gcGFyc2VGbG9hdCh2bS5nZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nKSk7XG4gICAgICBpZiAoISF2ZXJzaW9uKSB7XG4gICAgICAgIHZtLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaygndmVyc2lvbicsIG51bGwsIHZlcnNpb24pO1xuICAgICAgfVxuXG4gICAgICAvKiBUT0RPIHNob3VsZCB0aGlzIGJlIGVuYWJsZWQ/IEl0IGRvZXNuJ3Qgc2VlbSBuZWVkZWQgZm9yIHRoZSB3ZWItY29tcG9uZW50LlxuICAgICAgdmFyIG1hbnVhbFJlbmRlciA9IGFyZ3MubWFudWFsUmVuZGVyID1cbiAgICAgICAgICBCb29sZWFuKHZtLmdldEF0dHJpYnV0ZSgnbWFudWFsLXJlbmRlcicpKTtcbiAgICAgIGlmICghIW1hbnVhbFJlbmRlcikge1xuICAgICAgICB2bS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soJ21hbnVhbC1yZW5kZXInLCBudWxsLCBtYW51YWxSZW5kZXIpO1xuICAgICAgfVxuICAgICAgLy8qL1xuXG4gICAgICB2YXIgc3JjID0gdm0uZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgIGlmICghIXNyYykge1xuICAgICAgICB2bS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soJ3NyYycsIG51bGwsIHNyYyk7XG4gICAgICB9XG4gICAgICBhcmdzLnNvdXJjZURhdGEgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB1cmk6IHNyYyxcbiAgICAgICAgICAvLyBUT0RPIHdlIHNob3VsZCBiZSBhYmxlIHRvIHVzZSB0aGUgY29udGVudCB0eXBlXG4gICAgICAgICAgLy8gaGVhZGVyIGZyb20gdGhlIHNlcnZlciByZXNwb25zZSBpbnN0ZWFkIG9mIHJlbHlpbmdcbiAgICAgICAgICAvLyBvbiB0aGlzLlxuICAgICAgICAgIC8vIFRoaW5rIGFuYWxvZ291cyB0byBpbWFnZS9wbmcsIGltYWdlL2dpZiwgZXRjLiBmb3IgdGhlIGltZyB0YWcuXG4gICAgICAgICAgZmlsZVR5cGU6J2dwbWwnIC8vIGdlbmVyYWxseSB3aWxsIGNvcnJlc3BvbmQgdG8gZmlsZW5hbWUgZXh0ZW5zaW9uXG4gICAgICAgIH1cbiAgICAgIF07XG5cbiAgICAgIHZtLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICB2YXIgcHZqcyA9IG5ldyBQdmpzKHZtLCBhcmdzKTtcbiAgICB9O1xuXG4gICAgLy8gUHVibGljOiBXaWtpUGF0aHdheXNQdmpzUHJvdG90eXBlIGNvbnN0cnVjdG9yLlxuICAgIC8vXG4gICAgLy8gICAjID0+IDx3aWtpcGF0aHdheXMtcHZqcz48L3dpa2lwYXRod2F5cy1wdmpzPlxuICAgIC8vXG4gICAgd2luZG93Lldpa2lQYXRod2F5c1B2anMgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoXG4gICAgICAgICd3aWtpcGF0aHdheXMtcHZqcycsIHtcbiAgICAgICAgcHJvdG90eXBlOiBXaWtpUGF0aHdheXNQdmpzUHJvdG90eXBlXG4gICAgfSk7XG4gIH1cblxuICBpZiAoISF3aW5kb3cuS2FhdmlvKSB7XG4gICAgcmVnaXN0ZXJXaWtpUGF0aHdheXNQdmpzRWxlbWVudChQdmpzKTtcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2FhdmlvcmVhZHknLCBmdW5jdGlvbiBrYWF2aW9SZWFkeUhhbmRsZXIoZSkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2thYXZpb3JlYWR5Jywga2FhdmlvUmVhZHlIYW5kbGVyLCBmYWxzZSk7XG4gICAgICByZWdpc3Rlcldpa2lQYXRod2F5c1B2anNFbGVtZW50KFB2anMpO1xuICAgIH0sIGZhbHNlKTtcbiAgfVxufVxuXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICBpbml0UHZqcygpO1xufSBlbHNlIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiBsaXN0ZW5lcihldmVudCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdsb2FkJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgICBpbml0UHZqcygpO1xuICB9LCBmYWxzZSk7XG59XG4iXX0=
});