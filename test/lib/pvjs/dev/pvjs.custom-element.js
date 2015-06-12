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
      vm.attributeChangedCallback('display-errors', null, displayErrors);

      var displayWarnings = args.displayWarnings =
          Boolean(vm.getAttribute('display-warnings'));
      vm.attributeChangedCallback('display-warnings', null, displayWarnings);

      var displaySuccess = args.displaySuccess =
          Boolean(vm.getAttribute('display-success'));
      vm.attributeChangedCallback('display-success', null, displaySuccess);

      var fitToContainer = args.fitToContainer =
          Boolean(vm.getAttribute('fit-to-container'));
      vm.attributeChangedCallback('fit-to-container', null, fitToContainer);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvY3VzdG9tLWVsZW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZnVuY3Rpb24gaW5pdFB2anMoKSB7XG5cbiAgdmFyIFB2anMgPSByZXF1aXJlKCcuL21haW4uanMnKTtcblxuICAvKipcbiAgICogRW5hYmxlIHRoZSB3aWtpcGF0aHdheXMtcHZqcyBjdXN0b20gZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuXG4gICAqL1xuICBmdW5jdGlvbiByZWdpc3Rlcldpa2lQYXRod2F5c1B2anNFbGVtZW50KFB2anMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICB2YXIgRGl2UHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh3aW5kb3cuSFRNTERpdkVsZW1lbnQucHJvdG90eXBlKTtcblxuICAgIERpdlByb3RvdHlwZS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbihcbiAgICAgICAgYXR0ck5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgaWYgKGF0dHJOYW1lID09PSAnYWx0Jykge1xuICAgICAgICB0aGlzLnRleHRDb250ZW50ID0gbmV3VmFsdWU7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBXaWtpUGF0aHdheXNQdmpzUHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShEaXZQcm90b3R5cGUpO1xuXG4gICAgV2lraVBhdGh3YXlzUHZqc1Byb3RvdHlwZS5jcmVhdGVkQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICB2YXIgYXJncyA9IHt9O1xuXG4gICAgICB2YXIgYWx0ID0gYXJncy5hbHQgPSB2bS5nZXRBdHRyaWJ1dGUoJ2FsdCcpO1xuICAgICAgaWYgKCEhYWx0KSB7XG4gICAgICAgIHZtLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaygnYWx0JywgbnVsbCwgYWx0KTtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpc3BsYXlFcnJvcnMgPSBhcmdzLmRpc3BsYXlFcnJvcnMgPVxuICAgICAgICAgIEJvb2xlYW4odm0uZ2V0QXR0cmlidXRlKCdkaXNwbGF5LWVycm9ycycpKTtcbiAgICAgIHZtLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaygnZGlzcGxheS1lcnJvcnMnLCBudWxsLCBkaXNwbGF5RXJyb3JzKTtcblxuICAgICAgdmFyIGRpc3BsYXlXYXJuaW5ncyA9IGFyZ3MuZGlzcGxheVdhcm5pbmdzID1cbiAgICAgICAgICBCb29sZWFuKHZtLmdldEF0dHJpYnV0ZSgnZGlzcGxheS13YXJuaW5ncycpKTtcbiAgICAgIHZtLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaygnZGlzcGxheS13YXJuaW5ncycsIG51bGwsIGRpc3BsYXlXYXJuaW5ncyk7XG5cbiAgICAgIHZhciBkaXNwbGF5U3VjY2VzcyA9IGFyZ3MuZGlzcGxheVN1Y2Nlc3MgPVxuICAgICAgICAgIEJvb2xlYW4odm0uZ2V0QXR0cmlidXRlKCdkaXNwbGF5LXN1Y2Nlc3MnKSk7XG4gICAgICB2bS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soJ2Rpc3BsYXktc3VjY2VzcycsIG51bGwsIGRpc3BsYXlTdWNjZXNzKTtcblxuICAgICAgdmFyIGZpdFRvQ29udGFpbmVyID0gYXJncy5maXRUb0NvbnRhaW5lciA9XG4gICAgICAgICAgQm9vbGVhbih2bS5nZXRBdHRyaWJ1dGUoJ2ZpdC10by1jb250YWluZXInKSk7XG4gICAgICB2bS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soJ2ZpdC10by1jb250YWluZXInLCBudWxsLCBmaXRUb0NvbnRhaW5lcik7XG5cbiAgICAgIHZhciBoaWdobGlnaHRzID0gdm0uZ2V0QXR0cmlidXRlKCdoaWdobGlnaHRzJyk7XG4gICAgICBpZiAoISFoaWdobGlnaHRzKSB7XG4gICAgICAgIGhpZ2hsaWdodHMgPSBhcmdzLmhpZ2hsaWdodHMgPSBKU09OLnBhcnNlKGRlY29kZVVSSUNvbXBvbmVudChoaWdobGlnaHRzKSk7XG4gICAgICAgIHZtLmF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaygnaGlnaGxpZ2h0cycsIG51bGwsIGhpZ2hsaWdodHMpO1xuICAgICAgfVxuXG4gICAgICB2YXIgaGFzaEVkaXRvclN0YXRlQ29tcG9uZW50cyA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoLm1hdGNoKCdlZGl0b3JcXC8oLiopJCcpO1xuICAgICAgdmFyIGhhc2hFZGl0b3JTdGF0ZTtcbiAgICAgIGlmICghIWhhc2hFZGl0b3JTdGF0ZUNvbXBvbmVudHMgJiYgISFoYXNoRWRpdG9yU3RhdGVDb21wb25lbnRzLmxlbmd0aCkge1xuICAgICAgICBoYXNoRWRpdG9yU3RhdGUgPSBoYXNoRWRpdG9yU3RhdGVDb21wb25lbnRzWzFdO1xuICAgICAgfVxuICAgICAgdmFyIGVkaXRvciA9IGFyZ3MuZWRpdG9yID0gaGFzaEVkaXRvclN0YXRlIHx8XG4gICAgICAgICAgdm0uZ2V0QXR0cmlidXRlKCdlZGl0b3InKTtcbiAgICAgIGlmICghIWVkaXRvcikge1xuICAgICAgICB2bS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soJ2VkaXRvcicsIG51bGwsIGVkaXRvcik7XG4gICAgICB9XG5cbiAgICAgIHZhciByZXNvdXJjZSA9IGFyZ3MucmVzb3VyY2UgPSB2bS5nZXRBdHRyaWJ1dGUoJ3Jlc291cmNlJyk7XG4gICAgICBpZiAoISFyZXNvdXJjZSkge1xuICAgICAgICB2bS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soJ3Jlc291cmNlJywgbnVsbCwgcmVzb3VyY2UpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdmVyc2lvbiA9IGFyZ3MudmVyc2lvbiA9IHBhcnNlRmxvYXQodm0uZ2V0QXR0cmlidXRlKCd2ZXJzaW9uJykpO1xuICAgICAgaWYgKCEhdmVyc2lvbikge1xuICAgICAgICB2bS5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soJ3ZlcnNpb24nLCBudWxsLCB2ZXJzaW9uKTtcbiAgICAgIH1cblxuICAgICAgLyogVE9ETyBzaG91bGQgdGhpcyBiZSBlbmFibGVkPyBJdCBkb2Vzbid0IHNlZW0gbmVlZGVkIGZvciB0aGUgd2ViLWNvbXBvbmVudC5cbiAgICAgIHZhciBtYW51YWxSZW5kZXIgPSBhcmdzLm1hbnVhbFJlbmRlciA9XG4gICAgICAgICAgQm9vbGVhbih2bS5nZXRBdHRyaWJ1dGUoJ21hbnVhbC1yZW5kZXInKSk7XG4gICAgICBpZiAoISFtYW51YWxSZW5kZXIpIHtcbiAgICAgICAgdm0uYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCdtYW51YWwtcmVuZGVyJywgbnVsbCwgbWFudWFsUmVuZGVyKTtcbiAgICAgIH1cbiAgICAgIC8vKi9cblxuICAgICAgdmFyIHNyYyA9IHZtLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICBpZiAoISFzcmMpIHtcbiAgICAgICAgdm0uYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCdzcmMnLCBudWxsLCBzcmMpO1xuICAgICAgfVxuICAgICAgYXJncy5zb3VyY2VEYXRhID0gW1xuICAgICAgICB7XG4gICAgICAgICAgdXJpOiBzcmMsXG4gICAgICAgICAgLy8gVE9ETyB3ZSBzaG91bGQgYmUgYWJsZSB0byB1c2UgdGhlIGNvbnRlbnQgdHlwZVxuICAgICAgICAgIC8vIGhlYWRlciBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgaW5zdGVhZCBvZiByZWx5aW5nXG4gICAgICAgICAgLy8gb24gdGhpcy5cbiAgICAgICAgICAvLyBUaGluayBhbmFsb2dvdXMgdG8gaW1hZ2UvcG5nLCBpbWFnZS9naWYsIGV0Yy4gZm9yIHRoZSBpbWcgdGFnLlxuICAgICAgICAgIGZpbGVUeXBlOidncG1sJyAvLyBnZW5lcmFsbHkgd2lsbCBjb3JyZXNwb25kIHRvIGZpbGVuYW1lIGV4dGVuc2lvblxuICAgICAgICB9XG4gICAgICBdO1xuXG4gICAgICB2bS5pbm5lckhUTUwgPSAnJztcblxuICAgICAgdmFyIHB2anMgPSBuZXcgUHZqcyh2bSwgYXJncyk7XG4gICAgfTtcblxuICAgIC8vIFB1YmxpYzogV2lraVBhdGh3YXlzUHZqc1Byb3RvdHlwZSBjb25zdHJ1Y3Rvci5cbiAgICAvL1xuICAgIC8vICAgIyA9PiA8d2lraXBhdGh3YXlzLXB2anM+PC93aWtpcGF0aHdheXMtcHZqcz5cbiAgICAvL1xuICAgIHdpbmRvdy5XaWtpUGF0aHdheXNQdmpzID0gZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KFxuICAgICAgICAnd2lraXBhdGh3YXlzLXB2anMnLCB7XG4gICAgICAgIHByb3RvdHlwZTogV2lraVBhdGh3YXlzUHZqc1Byb3RvdHlwZVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKCEhd2luZG93LkthYXZpbykge1xuICAgIHJlZ2lzdGVyV2lraVBhdGh3YXlzUHZqc0VsZW1lbnQoUHZqcyk7XG4gIH0gZWxzZSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2thYXZpb3JlYWR5JywgZnVuY3Rpb24ga2FhdmlvUmVhZHlIYW5kbGVyKGUpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrYWF2aW9yZWFkeScsIGthYXZpb1JlYWR5SGFuZGxlciwgZmFsc2UpO1xuICAgICAgcmVnaXN0ZXJXaWtpUGF0aHdheXNQdmpzRWxlbWVudChQdmpzKTtcbiAgICB9LCBmYWxzZSk7XG4gIH1cbn1cblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgaW5pdFB2anMoKTtcbn0gZWxzZSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gbGlzdGVuZXIoZXZlbnQpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbG9hZCcsIGxpc3RlbmVyLCBmYWxzZSk7XG4gICAgaW5pdFB2anMoKTtcbiAgfSwgZmFsc2UpO1xufVxuIl19
});