function load(doc, src, fn) {  if (typeof doc === 'string') {    fn = src;    src = doc;    doc = document;  }  var script = doc.createElement('script');  script.type = 'text/javascript';  script.src = src;  if (fn) onLoad(script, fn);  script.onLoad = function(fn) {    return onLoad(script, fn);  };  doc.body.appendChild(script);  return script;} function polyfillLoader(polyfillServiceIri, polyfillServiceCallbackName, callback) {    window[polyfillServiceCallbackName] = function() {      return callback(null);    };    if (!!document.body) {      load(polyfillServiceIri);    } else {      var existingonreadystatechange = document.onreadystatechange;      document.onreadystatechange = function() {        if (document.readyState === 'interactive') {          if (typeof existingonreadystatechange === 'function') {            existingonreadystatechange();          }          load(polyfillServiceIri);        }      };    }  } polyfillLoader("//cdn.polyfill.io/v1/polyfill.min.js?features=Array.prototype.indexOf&callback=polyfillServiceCallbackpvjsdiffviewer", "polyfillServiceCallbackpvjsdiffviewer", function(err) {require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/diff-viewer/diff-viewer.js":[function(require,module,exports){
(function (Buffer){
var fs = require('fs');
var insertCss = require('insert-css');
var css = Buffer("LmthYXZpby1kaWZmdmlld2VyIHsKICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgaGVpZ2h0OiA1MDBweDsKICBib3JkZXI6IDFweCBzb2xpZCAjMDAwOwp9Cgoua2FhdmlvLWRpZmZ2aWV3ZXIgLnBhbmUgewogIGZsb2F0OiBsZWZ0OwogIG92ZXJmbG93OiBoaWRkZW47CiAgd2lkdGg6IDUwJTsKICBoZWlnaHQ6IDEwMCU7Cn0KCi5rYWF2aW8tZGlmZnZpZXdlciAucGFuZS5wYW5lLWxlZnQgewp9Cgoua2FhdmlvLWRpZmZ2aWV3ZXIgLnBhbmUucGFuZS1sZWZ0IC5wYW5lLWlubmVyIHsKICBtYXJnaW4tcmlnaHQ6IDEyMHB4Owp9CgoKLmthYXZpby1kaWZmdmlld2VyIC5wYW5lLnBhbmUtcmlnaHQgewp9Cgoua2FhdmlvLWRpZmZ2aWV3ZXIgLnBhbmUucGFuZS1yaWdodCAucGFuZS1pbm5lciB7CiAgbWFyZ2luLWxlZnQ6IDEyMHB4Owp9Cgoua2FhdmlvLWRpZmZ2aWV3ZXIgLnBhbmUucGFuZS1jZW50ZXIgewogIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICB0b3A6IDA7CiAgbGVmdDogNTAlOwogIHdpZHRoOiAyNDBweDsKICBtYXJnaW46IDAgMCAwIC0xMjBweDsKICBvdmVyZmxvdy14OiBoaWRkZW47CiAgb3ZlcmZsb3cteTogYXV0bzsKfQoKLmthYXZpby1kaWZmdmlld2VyIC5wYW5lLWlubmVyIHsKICBoZWlnaHQ6IDEwMCU7Cn0KCi8qKioqKioqKioqKioqKgogIE92ZXJsYXkKICoqKioqKioqKioqKioqLwoKLmthYXZpby1kaWZmdmlld2VyID4gLm92ZXJsYXkgewogIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICB0b3A6IDA7CiAgbGVmdDogMDsKICBib3R0b206IDA7CiAgcmlnaHQ6IDA7CiAgYmFja2dyb3VuZDogI2ZmZjsKfQoKLmthYXZpby1kaWZmdmlld2VyID4gLm92ZXJsYXkgLmFsZXJ0ewogIHBhZGRpbmc6IDlweCAxNXB4OwogIG1hcmdpbjogNHB4OwogIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50OwogIGJvcmRlci1yYWRpdXM6IDRweDsKfQoKLmthYXZpby1kaWZmdmlld2VyID4gLm92ZXJsYXkgLmFsZXJ0LmFsZXJ0LXN1Y2Nlc3N7CiAgYmFja2dyb3VuZC1jb2xvcjogI2RmZjBkODsKICBib3JkZXItY29sb3I6ICNkNmU5YzY7CiAgY29sb3I6ICMzYzc2M2Q7Cn0KCi5rYWF2aW8tZGlmZnZpZXdlciA+IC5vdmVybGF5IC5hbGVydC5hbGVydC1pbmZvewogIGJhY2tncm91bmQtY29sb3I6ICNkOWVkZjc7CiAgYm9yZGVyLWNvbG9yOiAjYmNlOGYxOwogIGNvbG9yOiAjMzE3MDhmOwp9Cgoua2FhdmlvLWRpZmZ2aWV3ZXIgPiAub3ZlcmxheSAuYWxlcnQuYWxlcnQtd2FybmluZ3sKICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNmOGUzOwogIGJvcmRlci1jb2xvcjogI2ZhZWJjYzsKICBjb2xvcjogIzhhNmQzYjsKfQoKLmthYXZpby1kaWZmdmlld2VyID4gLm92ZXJsYXkgLmFsZXJ0LmFsZXJ0LWRhbmdlcnsKICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJkZWRlOwogIGJvcmRlci1jb2xvcjogI2ViY2NkMTsKICBjb2xvcjogI2E5NDQ0MjsKfQoKLyoqKioqKioqKioqKioqCiAgQ2hhbmdlcyBNYWluCiAqKioqKioqKioqKioqKi8KCi5jaGFuZ2VzIHsKICBtYXJnaW46IDAgMTJweDsKICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwMDsKCiAgZm9udC1mYW1pbHk6IEFyaWFsLCAiSGVsdmV0aWNhIE5ldWUiLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7CiAgZm9udC1zaXplOiAxM3B4Owp9CgouY2hhbmdlcy1jb250YWluZXIgewp9CgovKioqKioqKioqKioqKioKICBDaGFuZ2VzIFRpdGxlcwogKioqKioqKioqKioqKiovCgouY2hhbmdlcy10aXRsZSB7CiAgcGFkZGluZzogNXB4IDRweCAzcHg7CiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDsKICBib3JkZXItYm90dG9tOiAwcHg7CgogIGZvbnQtc2l6ZTogMTZweDsKfQoKLmNoYW5nZXMtdGl0bGUgaXsKICBmb250LXNpemU6IDkwJTsKICBvcGFjaXR5OiAwLjg7CiAgZm9udC1zdHlsZTogbm9ybWFsOwp9CgouY2hhbmdlcy10aXRsZSBpLmljb257CiAgZm9udC1zaXplOiA5MCU7CiAgb3BhY2l0eTogMC44OwogIGZvbnQtc3R5bGU6IG5vcm1hbDsKICBmb250LXdlaWdodDogbm9ybWFsOwp9CgouY2hhbmdlcy1wYXJlbnQgc3BhbiB7CiAgcG9zaXRpb246IHJlbGF0aXZlOwogIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICBwYWRkaW5nOiAwIDAgMCAxM3B4Owp9CgouY2hhbmdlcy1wYXJlbnQgc3BhbjpiZWZvcmUgewogIGNvbnRlbnQ6ICcnOwogIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICB0b3A6IDUwJTsKICBsZWZ0OiAzcHg7CiAgd2lkdGg6IDA7CiAgaGVpZ2h0OiAwOwogIG1hcmdpbjogLTZweCAwIDA7CiAgYm9yZGVyLXdpZHRoOiA1cHggMCA1cHggNnB4OwogIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgIzAwMDsKICBib3JkZXItc3R5bGU6IHNvbGlkOwp9Cgoub3BlbiA+IC5jaGFuZ2VzLXBhcmVudCBzcGFuOmJlZm9yZSB7CiAgbGVmdDogMDsKICBtYXJnaW4tdG9wOiAtNHB4OwogIGJvcmRlci13aWR0aDogNnB4IDVweCAwIDVweDsKICBib3JkZXItY29sb3I6ICMwMDAgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7Cn0KCi8qIE5lc3RpbmcgKi8KLmNoYW5nZXMtY29udGFpbmVyIC5jaGFuZ2VzLWNvbnRhaW5lciAuY2hhbmdlcy10aXRsZSB7CiAgZm9udC1zaXplOiAxNHB4Owp9Ci5jaGFuZ2VzLWNvbnRhaW5lciAuY2hhbmdlcy1jb250YWluZXIgLmNoYW5nZXMtY29udGFpbmVyIC5jaGFuZ2VzLXRpdGxlIHsKICBwYWRkaW5nLWxlZnQ6IDEwcHg7CiAgZm9udC1zaXplOiAxMnB4Owp9CgouY2hhbmdlcy1jb250YWluZXIuYWN0aXZlID4gLmNoYW5nZXMtdGl0bGUgewogIHBvc2l0aW9uOiByZWxhdGl2ZTsKfQouY2hhbmdlcy1jb250YWluZXIuYWN0aXZlID4gLmNoYW5nZXMtdGl0bGU6YmVmb3JlLAouY2hhbmdlcy1jb250YWluZXIuYWN0aXZlID4gLmNoYW5nZXMtdGl0bGU6YWZ0ZXIgewogIGNvbnRlbnQ6ICcnOwogIGRpc3BsYXk6IG5vbmU7CiAgcG9zaXRpb246IGFic29sdXRlOwogIHRvcDogNTAlOwogIG1hcmdpbjogLTEycHggMCAwOwogIHdpZHRoOiAwOwogIGhlaWdodDogMDsKICBib3JkZXItdG9wOiAxMnB4IHNvbGlkIHRyYW5zcGFyZW50OwogIGJvcmRlci1ib3R0b206IDEycHggc29saWQgdHJhbnNwYXJlbnQ7Cn0KCi5jaGFuZ2VzLWNvbnRhaW5lci5hY3RpdmUuZm9jdXMgPiAuY2hhbmdlcy10aXRsZXsKICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMzUpOwogICAgIC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAwIDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4zNSk7CiAgICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjM1KTsKfQoKLmNoYW5nZXMtY29udGFpbmVyLmFjdGl2ZSA+IC5jaGFuZ2VzLXRpdGxlOmJlZm9yZSB7CiAgbGVmdDogLTEycHg7CiAgYm9yZGVyLXJpZ2h0OiAxMnB4IHNvbGlkICMwMDA7Cn0KCi5jaGFuZ2VzLWNvbnRhaW5lci5hY3RpdmUgPiAuY2hhbmdlcy10aXRsZTphZnRlciB7CiAgcmlnaHQ6IC0xMnB4OwogIGJvcmRlci1sZWZ0OiAxMnB4IHNvbGlkICMwMDA7Cn0KCi5jaGFuZ2VzLXRpdGxlLmNoYW5nZS1hZGRlZCB7CiAgYmFja2dyb3VuZDogI2E2YzBlMTsKfQouY2hhbmdlcy1jb250YWluZXIuYWN0aXZlID4gLmNoYW5nZXMtdGl0bGUuY2hhbmdlLWFkZGVkIHsKICBiYWNrZ3JvdW5kOiAjNmM5MWNjOwp9Ci5jaGFuZ2VzLWNvbnRhaW5lci5hY3RpdmUgPiAuY2hhbmdlcy10aXRsZS5jaGFuZ2UtYWRkZWQ6YWZ0ZXIgewogIGRpc3BsYXk6IGJsb2NrOwp9CgouY2hhbmdlcy10aXRsZS5jaGFuZ2UtdXBkYXRlZCB7CiAgYmFja2dyb3VuZDogI2ZlZmM5NjsKfQouY2hhbmdlcy1jb250YWluZXIuYWN0aXZlID4gLmNoYW5nZXMtdGl0bGUuY2hhbmdlLXVwZGF0ZWQgewogIGJhY2tncm91bmQ6ICNmZmY5NDQ7Cn0KLmNoYW5nZXMtY29udGFpbmVyLmFjdGl2ZSA+IC5jaGFuZ2VzLXRpdGxlLmNoYW5nZS11cGRhdGVkOmJlZm9yZSwKLmNoYW5nZXMtY29udGFpbmVyLmFjdGl2ZSA+IC5jaGFuZ2VzLXRpdGxlLmNoYW5nZS11cGRhdGVkOmFmdGVyIHsKICBkaXNwbGF5OiBibG9jazsKfQoKLmNoYW5nZXMtdGl0bGUuY2hhbmdlLXJlbW92ZWQgewogIGJhY2tncm91bmQ6ICNmOWE0YWY7Cn0KLmNoYW5nZXMtY29udGFpbmVyLmFjdGl2ZSA+IC5jaGFuZ2VzLXRpdGxlLmNoYW5nZS1yZW1vdmVkIHsKICBiYWNrZ3JvdW5kOiAjZjM2Yjc4Owp9Ci5jaGFuZ2VzLWNvbnRhaW5lci5hY3RpdmUgPiAuY2hhbmdlcy10aXRsZS5jaGFuZ2UtcmVtb3ZlZDpiZWZvcmUgewogIGRpc3BsYXk6IGJsb2NrOwp9CgouY2hhbmdlcy10aXRsZS5hY3RpdmUgewogIHBvc2l0aW9uOiByZWxhdGl2ZTsKfQouY2hhbmdlcy10aXRsZS5hY3RpdmU6YmVmb3JlIHsKICBjb250ZW50OiAnJzsKICBwb3NpdGlvbjogYWJzb2x1dGU7Cn0KCgovKioqKioqKioqKioqKioKICBDaGFuZ2VzIExpc3QKICoqKioqKioqKioqKioqLwouY2hhbmdlcy1saXN0IHsKICBkaXNwbGF5OiBub25lOwp9CgouY2hhbmdlcy5jaGFuZ2VzLWxpc3QgewogIGRpc3BsYXk6IGJsb2NrOwp9CgouY2hhbmdlcy1jb250YWluZXIub3BlbiA+IC5jaGFuZ2VzLWxpc3QgewogIGRpc3BsYXk6IGJsb2NrOwp9CgovKioqKioqKioqKioqKioKICBDaGFuZ2VzIExpc3QKICoqKioqKioqKioqKioqLwovKi5jaGFuZ2VzLXRpdGxlLmFjdGl2ZSovCi5jaGFuZ2VzLXRpdGxlID4gLmVsZW1lbnQtY2hhbmdlcyB7CiAgZGlzcGxheTogbm9uZTsKfQoKLmFjdGl2ZSA+IC5jaGFuZ2VzLXRpdGxlID4gLmVsZW1lbnQtY2hhbmdlcyB7CiAgZGlzcGxheTogYmxvY2s7CiAgbWFyZ2luOiAwOwogIHBhZGRpbmc6IDRweCAwIDRweDsKICBsaW5lLWhlaWdodDogMS40OwogIGxpc3Qtc3R5bGU6IG5vbmU7CiAgd29yZC13cmFwOiBicmVhay13b3JkOwp9Cg==","base64");

(function(window, $) {
  insertCss(css);

  var optionsDefault = {
    sourceData: []
  };
  var instancesMap = {};

  /**
   * Init plugin
   * @param {pvjs instance} pvjs
   * @param {objects} options
   */
  function init(pvjs, options) {
    instancesMap[pvjs.instanceId] = new PvjsDiffViewer(pvjs, options);
    // Create new instance if it does not exist
    if (!instancesMap.hasOwnProperty(pvjs.instanceId)) {
      instancesMap[pvjs.instanceId] = new PvjsDiffViewer(pvjs, options);
    }
  }

  /**
   * Constructor
   * @param {Object} pvjs
   */
  var PvjsDiffViewer = function(selector, optionsSet) {
    this.$pvjsElement = $(selector);

    this.initContainer();

    this.options = $.extend({}, optionsDefault, optionsSet[0]);
    this.pvjs = new window.Pvjs(this.$paneLeft[0], this.options).getPublicInstance();

    this.options2 = $.extend({}, optionsDefault, optionsSet[1]);
    this.pvjs2 = new window.Pvjs(this.$paneRight[0], this.options2).getPublicInstance();

    /*
    this.options = $.extend({}, optionsDefault, options);

    //this.pvjs = new window.Pvjs();
    this.pvjs = pvjs;
    //*/

    //this.initSecondPvjs();
    this.hookEvents();

    // Trigger pvjs2 render when everything is ready
    this.pvjs.render();
    this.pvjs2.render();
  };

  /**
   * Create differences container
   */
  PvjsDiffViewer.prototype.initContainer = function() {
    this.$diffviewer = $('<div class="pvjs-diffviewer"/>');

    // Create panes
    this.$paneLeft = $('<div class="pane-inner"></div>')
      .appendTo($('<div class="pane pane-left"></div>')
      .appendTo(this.$diffviewer));
    this.$paneRight = $('<div class="pane-inner"></div>')
      .appendTo($('<div class="pane pane-right"></div>')
      .appendTo(this.$diffviewer));
    this.$paneCenter = $('<div class="pane pane-center"></div>').appendTo(this.$diffviewer);

    // Insert diffviewer container before pvjs element
    this.$diffviewer.insertBefore(this.$pvjsElement);

    // Move instance element into left pane
    this.$paneLeft.append(this.$pvjsElement);
  };

  /**
   * Initialize second pvjs. Save its instance into this.pvjs2
   */
  PvjsDiffViewer.prototype.initSecondPvjs = function() {
    // Create second instance container
    this.$pvjsElement2 = $('<div/>').appendTo(this.$paneRight);

    // Get original options
    var pvjsOptions = this.pvjs.getOptions();
    // Set new source data
    pvjsOptions.sourceData = this.options.sourceData;
    pvjsOptions.manualRender = true;

    // Create second pvjs instance
    //this.pvjs2 = new window.Pvjs(this.$pvjsElement2[0], pvjsOptions);
    //this.pvjs2 = this.pvjs(this.$pvjsElement2[0], pvjsOptions);
    this.$pvjsElement2.pvjs(pvjsOptions);
    this.pvjs2 = this.$pvjsElement2.pvjs('get').pop();
  };

  /**
   * Hook render events. Display diffViewer only when both pvjss are ready
   * Hook for error events so to know when to display a message instead of diffViewer
   * Hook zoom and pan events in order to keep both pathways synchronized
   * Hook main pvjs destroy event in order to know when to destroy second pathway
   */
  PvjsDiffViewer.prototype.hookEvents = function() {
    var that = this;
    var pvjsRendered = false;
    var pvjs2Rendered = false;
    var noDiff = false;

    // pvjs renderer barrier
    this.pvjs.on('rendered', function() {
      pvjsRendered = true;
      if (pvjs2Rendered && !noDiff) {
        that.onPvjsesRendered();
      }
    });
    this.pvjs2.on('rendered', function() {
      pvjs2Rendered = true;
      if (pvjsRendered && !noDiff) {
        that.onPvjsesRendered();
      }
    });

    this.pvjs.on('error.sourceData', function() {
      if (!noDiff) {
        that.onNoDiff('One or both pathways were not rendered. ' +
            'Most probably one pathways uses old format that is not supported by pvjs.');
      }

      noDiff = true;
    });
    this.pvjs2.on('error.sourceData', function() {
      if (!noDiff) {
        that.onNoDiff('One or both pathways were not rendered.' +
            'Most probably one pathways uses old format that is not supported by pvjs.');
      }

      noDiff = true;
    });

    // On destroy pvjs
    this.pvjs.on('destroy.pvjs', function() {
      that.pvjs2.destroy();
      // Put back pvjs element container
      that.$pvjsElement.insertBefore(that.$diffviewer);
      that.$diffviewer.remove();
    });

    // Pan and zoom events
    var pvjsPanned = false;
    var pvjsZoomed = false;
    var pvjs2Panned = false;
    var pvjs2Zoomed = false;

    this.pvjs.on('zoomed.renderer', function(level) {
      if (pvjs2Zoomed) { // prevent recursive call
        pvjs2Zoomed = false;
        return;
      }
      pvjsZoomed = true;

      that.pvjs2.zoom(level / that.zoomScale);
      that.pvjs.panBy({x: 0, y: 0}); // trigger pan to sync pathways
      that.pvjs2.pan(that.pvjs.getPan());
    });

    this.pvjs.on('panned.renderer', function(point) {
      if (pvjs2Panned) {
        pvjs2Panned = false;
        return;
      }
      pvjsPanned = true;
      that.pvjs2.pan(point);
    });

    this.pvjs2.on('zoomed.renderer', function(level) {
      if (pvjsZoomed) {
        pvjsZoomed = false;
        return;
      }
      pvjs2Zoomed = true;

      that.pvjs.zoom(level * that.zoomScale);
      that.pvjs2.panBy({x: 0, y: 0}); // trigger pan to sync pathways
      that.pvjs.pan(that.pvjs2.getPan());
    });

    this.pvjs2.on('panned.renderer', function(point) {
      if (pvjsPanned) {
        pvjsPanned = false;
        return;
      }
      pvjs2Panned = true;
      that.pvjs.pan(point);
    });
  };

  /**
   * Create an overlay with a message
   * @param  {String} message Message why diffViewer shows nothing
   */
  PvjsDiffViewer.prototype.onNoDiff = function(message) {
    // Create an overlay
    if (this.$overlay === void 0) {
      this.$overlay = $('<div class="overlay"></div>').appendTo(this.$diffviewer);
    }

    // Add a message
    this.$overlay.append($('<div class="alert alert-info"></div>').text(message));
  };

  /**
   * When both pvjss are rendered
   */
  PvjsDiffViewer.prototype.onPvjsesRendered = function() {
    if (this.checkPvjsesData()) {
      this.getZoomScale();
      this.displayDiff();
    } else {
      this.onNoDiff('One or both pathways were rendered using a format (ex. png) ' +
          'that has no details about nodes.');
    }
  };

  /**
   * Check if both pvjss have pvjson objects
   * @return {Boolean} True if pvjson is avaliable for both pvjss
   */
  PvjsDiffViewer.prototype.checkPvjsesData = function() {
    return (this.pvjs.getSourceData().pvjson && this.pvjs2.getSourceData().pvjson);
  };

  /** @type {Number} zoom scale between pathways */
  PvjsDiffViewer.prototype.zoomScale = 1;

  /**
   * Detect and cache zoom scale between pathways
   */
  PvjsDiffViewer.prototype.getZoomScale = function() {
    this.zoomScale = this.pvjs.getZoom() / this.pvjs2.getZoom();
  };

  /**
   * Entry point of diffViewer rendering and highlighting differences
   */
  PvjsDiffViewer.prototype.displayDiff = function() {
    this.elements = this.pvjs.getSourceData().pvjson.elements;
    this.elements2 = this.pvjs2.getSourceData().pvjson.elements;

    // New elements have priority
    this.elementsMerge = this.mergeElements(this.elements2, this.elements);

    var diff = this.computeDiff();

    // IF no diffs then display an overlay message and stop further rendering
    if (diff.added.length + diff.updated.length + diff.removed.length === 0) {
      this.onNoDiff('Pathways have no visual differences between them.');
      return;
    }

    var $changesList = this.initDiffView();

    // Store elements grouped by change type and group name
    this.elementsCache = {added: {}, updated: {}, removed: {}};
    this.elementsReferences = {};

    this.renderDiffsOfType('added', diff.added, $changesList, this.elements2);
    this.renderDiffsOfType('updated', diff.updated, $changesList, this.elementsMerge);
    this.renderDiffsOfType('removed', diff.removed, $changesList, this.elements);

    this.hookDiffNavigation();

    // Highlight all changes
    this.highlightType('added');
    this.highlightType('updated');
    this.highlightType('removed');
  };

  /**
   * Merge lists by appending unique elements from second list to first list
   * @param  {Array} elements
   * @param  {Array} elements2
   * @return {Array}
   */
  PvjsDiffViewer.prototype.mergeElements = function(elements, elements2) {
    var elementsMerge = elements.slice();
    var elementFound = false;

    for (var e in elements2) {
      elementFound = false;
      for (var e2 in elementsMerge) {
        if (elementsMerge[e2].id === elements2[e].id) {
          elementFound = true;
          break;
        }
      }

      // If element is unique then add it to merge
      if (!elementFound) {
        elementsMerge.push(elements2[e]);
      }
    }

    return elementsMerge;
  };

  /**
   * Compute difference between elements of both pvjss
   * @return {Object} An object with 3 arrays: updated, added and removed
   */
  PvjsDiffViewer.prototype.computeDiff = function() {
    // Clone lists to be safe from modifying them internally
    // (in case that pvjson was not deep-cloned)
    var elements = this.elements.slice();    // Old pathway elements
    var elements2 = this.elements2.slice();  // New pathway elements
    var diff = {
      updated: [],
      added: [],
      removed: []
    };
    var element;
    var found;

    for (var i = elements.length - 1; i >= 0; i--) {
      element = elements[i];
      found = false;

      // Search for element by ID in second list
      for (var j = elements2.length - 1; j >= 0; j--) {
        if (elements[i].id === elements2[j].id) {
          found = true;

          // Check for changes
          if (calculateElementDiff(elements[i], elements2[j])) {
            diff.updated.push({
              id: elements2[j].id,
              'gpml:element': elements2[j]['gpml:element'] ||
                  elements[i]['gpml:element'] || undefined,
              type: elements2[j].type || elements[i].type || undefined,
              shape: elements2[j].shape || elements[i].shape || undefined,
              textContent: elements2[j].textContent || elements[i].textContent ||
                  elements2[j].title || elements2[j].displayName || elements[i].title ||
                  elements[i].displayName || undefined,
              points: elements2[j].points || elements[i].points || undefined,
              diff: calculateElementDiff(elements[i], elements2[j]),
              _element: elements[i],
              _element2: elements2[j]
            });
          }

          // Remove found elements from search poll
          elements.splice(i, 1);
          elements2.splice(j, 1);

          break;
        }
      }

      if (!found) {
        diff.removed.push(elements[i]);
      }
    }

    // All not matched elements from second list are new
    diff.added = elements2.slice();

    return diff;
  };

  /**
   * Calculate difference between 2 elements
   * @param  {Object} element
   * @param  {Object} element2
   * @return {Object}          Difference object
   */
  function calculateElementDiff(element, element2) {
    var diff = {
      added: [],
      removed: [],
      updated: []
    };

    for (var e in element) {
      if (!element2.hasOwnProperty(e)) {
        diff.removed.push({key: e, value: element[e]});
      } else {
        if (element[e] !== element2[e] && isStringOrNumber(element[e]) &&
            isStringOrNumber(element2[e])) {
          diff.updated.push({key: e, value: element2[e], old: element[e]});
        }
        // else nothing
      }
    }

    // Check for elements in element2 that are not in element
    for (var e2 in element2) {
      if (!element.hasOwnProperty(e2)) {
        diff.added.push({key: e2, value: element2[e2]});
      }
    }

    if (diff.added.length || diff.removed.length || diff.updated.length) {
      return diff;
    } else {
      return null;
    }
  }

  /**
   * Check if passed argument is a string or a number
   * @param  {Object|String|Number}  obj
   * @return {Boolean}     True if passed argument is a string or number
   */
  function isStringOrNumber(obj) {
    return (Object.prototype.toString.apply(1) === Object.prototype.toString.apply(obj) ||
        Object.prototype.toString.apply('') === Object.prototype.toString.apply(obj));
  }

  /**
   * Creates a container for titles and changes list
   * @return {JQuery} jQuery object
   */
  PvjsDiffViewer.prototype.initDiffView = function() {
    return $('<div class="changes changes-list"></div>').appendTo(this.$paneCenter);
  };

  /**
   * Create specific type containers for changes
   * @param  {JQuery} $changesList
   * @param  {String} type
   * @param  {String} title
   * @return {JQuery}              Changes list container
   */
  PvjsDiffViewer.prototype.initDiffViewList = function($changesList, type, title) {
    var $changesContainer = $('<div class="changes-container" data-level="1" data-type="' +
        type + '">')
      .appendTo($changesList)
      .append($('<div class="changes-title changes-parent change-' + type + '"><span>' +
            title + '</span></div>'));

    // Return changes list jQuery element
    return $('<div class="changes-list"></div>').appendTo($changesContainer);
  };

  /**
   * Render differences of a specified type
   * Group differences by elements types
   * @param  {String} type
   * @param  {Object} elementsDiff Elements differences
   * @param  {JQuery} $changesList Changes list container
   * @param  {Array} elements     List of elements
   */
  PvjsDiffViewer.prototype.renderDiffsOfType = function(
      type, elementsDiff, $changesList, elements) {
    if (elementsDiff.length === 0) {
      return;
    }

    // Sort by gpml:element and shape
    var elementsDiffSorted = elementsDiff.sort(sorterByElmentAndShape);

    // Group elements
    var groups = {};
    var groupName = '';
    var elementType = '';
    var _type = '';
    var $listContainer = null;
    var groupsOrdered = [];

    for (var d in elementsDiffSorted) {
      elementType = elementsDiffSorted[d]['gpml:element'] ?
          elementsDiffSorted[d]['gpml:element'].replace(/^gpml\:/, '') : '';
      _type = elementsDiffSorted[d].type ? elementsDiffSorted[d].type : '';

      if (elementType === 'Interaction') {
        groupName = 'Interactions';
      } else if (elementType === 'DataNode') {
        groupName = 'Data Nodes';
      } else if (elementType === '' && _type !== '') { // Assuming it is a reference
        // groupName = 'Reference'
        continue;
      } else if (elementType === 'Group') {
        groupName = 'Groups';
      } else {
        // Assume that there are no other groups
        groupName = 'Graphical Objects';
      }

      // If this is first element in group then init it
      if (groups[groupName] === void 0) {
        groups[groupName] = [];
      }

      groups[groupName].push(elementsDiffSorted[d]);
    }

    // Render only if at least one group exists
    if (!$.isEmptyObject(groups)) {
      $listContainer = this.initDiffViewList($changesList, type, type.charAt(0).toUpperCase() +
          type.slice(1));

      // Create an array of ordered groups
      groupsOrdered = orderGroups(groups);

      for (var i in groupsOrdered) {
        this.renderDiffGroup(
            type, groupsOrdered[i].name, groupsOrdered[i].group, $listContainer, elements);
      }
    }
  };

  /** @type {Array} Groups render order */
  var groupsOrder = ['Data Nodes', 'Groups', 'Interactions', 'Graphical Objects'];

  /**
   * Order groups by groupsOrder
   * If a group is not in groupsOrder append it
   * @param  {Object} groups An object with groups
   * @return {Array}        Ordered groups
   */
  function orderGroups(groups) {
    var groupName = '';
    var groupsOrdered = [];

    // First add ordered groups
    for (var i in groupsOrder) {
      groupName = groupsOrder[i];

      if (groups.hasOwnProperty(groupName)) {
        groupsOrdered.push({group: groups[groupName], name: groupName});
        delete groups[groupName];
      }
    }

    // If there are still groups, add them to the end in any order
    for (groupName in groups) {
      groupsOrdered.push({group: groups[groupName], name: groupName});
    }

    return groupsOrdered;
  }

  /**
   * Render a group
   * @param  {String} type
   * @param  {String} groupName
   * @param  {Array} groupElements
   * @param  {JQuery} $listContainer
   * @param  {Array} elements  List of all elements.
   *                           Used to get elements titles (replacing ids)
   */
  PvjsDiffViewer.prototype.renderDiffGroup = function(
      type, groupName, groupElements, $listContainer, elements) {
    var $container = $('<div class="changes-container" data-level="2" data-type="' + type + '"/>')
      .appendTo($listContainer);
    var $containerTitle = $('<div class="changes-title changes-parent change-' + type +
        '"><span>' + groupName + '</span></div>')
      .appendTo($container)
      .data('group', groupName);
    var $containerList = $('<div class="changes-list" />').appendTo($container);
    var elementTitle = '';
    var $elementContainer;
    var $elementTitle;
    var elementChanges = null;
    var $elementChanges;

    // Sort group elements
    groupElements = groupElements.sort(function(a, b) {
      return getElementTitle(a, elements).toLowerCase() >
          getElementTitle(b, elements).toLowerCase() ? 1 : -1;
    });

    // Render elements
    for (var e in groupElements) {
      elementTitle = getElementTitle(groupElements[e], elements);

      $elementContainer = $('<div class="changes-container" data-level="3" data-type="' +
          type + '"/>')
        .appendTo($containerList);
      $elementTitle = $('<div class="changes-title change-' + type +
          '"><span>' + elementTitle + '</span></div>')
        .appendTo($elementContainer);

      elementChanges = this.getElementChanges(type, groupElements[e], elements);

      // Render element changes (if any)
      if (elementChanges && elementChanges.length) {
        $elementChanges = $('<ul class="element-changes"></ul>');
        for (var change in elementChanges) {
          $elementChanges.append('<li>' + elementChanges[change] + '</li>');
        }

        $elementChanges.appendTo($elementTitle);
      }

      // Store id and group
      $elementTitle
        .data('id', groupElements[e].id)
        .data('group', groupName);

      // TODO only for debug purpose
      $elementTitle[0].pvjson = groupElements[e];

      // Cache element
      this.cacheElement(type, groupName, groupElements[e].id);
    }
  };

  /**
   * Cache element id based on type and group
   * @param  {String} type
   * @param  {String} group
   * @param  {String} elementId
   */
  PvjsDiffViewer.prototype.cacheElement = function(type, group, elementId) {
    // Create group if it does not exist
    if (this.elementsCache[type][group] === void 0) {
      this.elementsCache[type][group] = [];
    }

    // Add element to group
    this.elementsCache[type][group].push(elementId);

    // Reference
    if (group === 'Reference') {
      this.elementsReferences[elementId] = true;
    }
  };

  /**
   * Get an array of elements ids based on type and group
   * @param  {String} type
   * @param  {String} group
   * @return {Array}       Array of ids
   */
  PvjsDiffViewer.prototype.getAllElementsIds = function(type, group) {
    if (type === null || type === void 0) {
      // Get all types
      return [].concat(this.getAllElementsIds('added'),
          this.getAllElementsIds('updated'),
          this.getAllElementsIds('removed'));
    } else {
      if (group === null || group === void 0) {
        // Get all groups
        var elements = [];

        for (var groupName in this.elementsCache[type]) {
          elements = elements.concat(this.getAllElementsIds(type, groupName));
        }

        return elements;
      } else {
        // Get that group
        return this.elementsCache[type][group].slice();
      }
    }
  };

  /**
   * Check if the element with given id is a reference
   * @param  {String}  id Element id
   * @return {Boolean}    True if element if a reference
   */
  PvjsDiffViewer.prototype.isIdReference = function(id) {
    return this.elementsReferences[id] === true;
  };

  /**
   * Sorter function
   */
  function sorterByElmentAndShape(a, b) {
    if (a['gpml:element'] === b['gpml:element']) {
      return a.shape > b.shape ? 1 : -1;
    }
    if (a['gpml:element'] === undefined) {
      return -1;
    }
    if (b['gpml:element'] === undefined) {
      return 1;
    }
    return a['gpml:element'] > b['gpml:element'] ? 1 : -1;
  }

  /**
   * Get element title
   * @param  {Object} obj      Pvjson element
   * @param  {Array} elements Array of pvjson elements
   * @return {String}          Element title
   */
  function getElementTitle(obj, elements) {
    if (obj['gpml:element'] === 'gpml:Interaction') {
      return '' + lookupTitleById(obj.points[0].isAttachedTo, elements) +
        ' <i class="icon icon-arrow-right"></i> ' +
        lookupTitleById(obj.points[1].isAttachedTo, elements);
    } else if (obj['gpml:element'] === 'gpml:DataNode') {
      return obj.textContent;
    } else if (obj['gpml:element'] === 'gpml:Label') {
      return obj.textContent;
    } else if (obj['gpml:element'] === 'gpml:Shape') {
      return obj.shape.slice(0, 1).toUpperCase() + obj.shape.slice(1);
    } else if (obj['gpml:element'] === 'gpml:GraphicalLine') {
      return 'Graphical line';
    } else if (obj['gpml:element'] === 'gpml:State') {
      return 'State ' + obj.textContent + ' (' + lookupTitleById(obj.isAttachedTo, elements) + ')';
    } else if (obj['gpml:element'] === 'gpml:Group') {
      return 'Group';
    } else if (obj.type !== void 0) { // Assume it is a reference
      return obj.textContent || obj.title || obj.displayName || 'no title';
    }

    return 'no title';
  }

  /**
   * Get title of element with given id
   * @param  {String} id
   * @param  {Array} elements Array of pvjson elements
   * @return {String}          Element title
   */
  function lookupTitleById(id, elements) {
    // If element has no id then stop lookup
    if (id === void 0) {
      return 'Unknown';
    }

    for (var l in elements) {
      if (elements[l].id !== null && id === elements[l].id) {
        // Check if it is an interaction to avoid circular recursion
        if (elements[l]['gpml:element'] === 'gpml:Interaction') {
          return 'Interaction';
        } else {
          return getElementTitle(elements[l], elements);
        }
      }
    }

    // If no match found then return initial ID
    return id;
  }

  var normalizationFloatKeys = ['width', 'height', 'x', 'y', 'rotation'];
  var normalizationIdKeys = ['isPartOf', 'controller', 'controlled'];

  /**
   * Normalize values:
   * * Round numbers
   * * Replace ids with elements titles
   * @param  {String|Number} value
   * @param  {String} key
   * @param  {Array} elements Array of pvjson elements
   * @return {String|Number}          Normalized title
   */
  function normalizeValue(value, key, elements) {
    if (normalizationFloatKeys.indexOf(key) !== -1) {
      return Math.round(parseFloat(value) * 100) / 100;
    } else if (normalizationIdKeys.indexOf(key) !== -1) {
      return lookupTitleById(value, elements);
    } else {
      return value;
    }
  }

  /**
   * Get element changes
   * @param  {String} type
   * @param  {Object} element  Pvjson element
   * @param  {Array} elements Array of pvjson elements
   * @return {Array}          Array of strings (changes titles)
   */
  PvjsDiffViewer.prototype.getElementChanges = function(type, element, elements) {
    var titles = [];

    if (type === 'added') {
      if (element.hasOwnProperty('entityReference')) {
        titles.push('Added <strong>reference</strong>: ' + element.entityReference);
      }
    } else if (type === 'updated') {
      var oldValue = '';
      var newValue = '';
      var diff = element.diff;

      for (var addedIndex in diff.added) {
        newValue = normalizeValue(diff.added[addedIndex].value,
            diff.added[addedIndex].key,
            elements);
        titles.push('Added: <strong>' + diff.added[addedIndex].key + '</strong> ' + newValue);
      }

      for (var removedIndex in diff.removed) {
        newValue = normalizeValue(diff.removed[removedIndex].value,
            diff.removed[removedIndex].key,
            elements);
        titles.push('Removed: <strong>' + diff.removed[removedIndex].key + '</strong> ' + newValue);
      }

      for (var updatedIndex in diff.updated) {
        oldValue = normalizeValue(diff.updated[updatedIndex].old,
            diff.updated[updatedIndex].key,
            elements);
        newValue = normalizeValue(diff.updated[updatedIndex].value,
            diff.updated[updatedIndex].key,
            elements);

        titles.push('<strong>' + diff.updated[updatedIndex].key + ':</strong> ' + oldValue +
            ' <i class="icon icon-arrow-right"></i> ' + newValue);
      }
    }

    return titles;
  };

  /**
   * Hook clicking on diffViewere of using arrow keys when diffViewere is active
   */
  PvjsDiffViewer.prototype.hookDiffNavigation = function() {
    var $paneCenter = this.$paneCenter;
    var that = this;
    var isFocused = false;
    var initialZoom = this.pvjs.getZoom();
    var initialZoom2 = this.pvjs2.getZoom();

    //this.initHighlighting();

    $paneCenter.on('click', '.changes-title', function(ev) {
      ev.preventDefault();
      ev.stopPropagation();

      isFocused = true;

      // Visually opening/closing titles
      var $this = $(this);
      var $active = $this;

      // Only if element is not active
      if (!$this.parent().hasClass('active')) {
        $paneCenter.find('.active').removeClass('active');
        $paneCenter.find('.open').removeClass('open');
        $paneCenter.find('.focus').removeClass('focus');
        $this.parent().addClass('active focus');
        $this.parentsUntil($paneCenter).addClass('open');

        // Attenuate all previous elements
        that.attenuate();

        // Highlight selected
        that.highlightIds(that.getTitleIds($active), getTitleType($active));
      }
    }).on('dblclick', '.changes-title', function(ev) {
      ev.preventDefault();
      ev.stopPropagation();

      that.zoomToTitle($(this), initialZoom, initialZoom2);
    });

    var keysMap = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    $(document)
      .click(function(ev) {
        isFocused = false;
        $paneCenter.find('.focus').removeClass('focus');
      })
      .keydown(function(ev) {
        if (!isFocused) {
          return;
        }
        if (ev.keyCode < 37 || ev.keyCode > 40) {
          return;
        }

        ev.preventDefault();
        ev.stopPropagation();

        that.navigate(keysMap[ev.keyCode]);

        return false;
      });
  };

  /**
   * Get change type from jQuery title
   * @param  {JQuery} $active Change title
   * @return {String|Null}         Change type
   */
  function getTitleType($active) {
    if ($active.length) {
      return $active.parent().data('type');
    } else {
      return null;
    }
  }

  /**
   * Get id of change title.
   * If it is a parent title then get ids of change title and all its children
   * @param  {JQuery} $active Change title
   * @return {Array}         Array of pvjson elements ids
   */
  PvjsDiffViewer.prototype.getTitleIds = function($active) {
    var ids = [];
    if ($active.length) {
      var level = +$active.parent().data('level');
      var type = getTitleType($active);
      var group = null;
      var id = null;

      if (level === 1) {
        // group and id = null
      } else if (level === 2) {
        group = $active.data('group');
      } else if (level === 3) {
        group = $active.data('group');
        id = $active.data('id');
      }

      ids = this.getIds(type, group, id);
    }

    return ids;
  };

  /**
   * Get ids of element by type, group and element id
   * @param  {String} type
   * @param  {String} group
   * @param  {String} id
   * @return {Array}       Array of pvjson elements ids
   */
  PvjsDiffViewer.prototype.getIds = function(type, group, id) {
    var ids = [];
    if (type && group && id) {
      ids = [id];
    } else {
      ids = this.getAllElementsIds(type, group);
    }

    return ids;
  };

  /**
   * Highlight pvjson elements by ids
   * @param  {Array} ids  Arraw of pvjson elements ids
   * @param  {String} type Changes type
   */
  PvjsDiffViewer.prototype.highlightIds = function(ids, type) {
    var colors = {};

    if (type === 'added') {
      colors.backgroundColor = colors.borderColor = '#0E53A7';
    } else if (type === 'updated') {
      colors.backgroundColor = colors.borderColor = '#FFF700';
    } else if (type === 'removed') {
      colors.backgroundColor = colors.borderColor = '#F10026';
    }

    for (var i in ids) {
      var highlightString;
      // If is a reference
      if (this.isIdReference(ids[i])) {
        highlightString = 'xref:id:' + ids[i];
      } else {
        highlightString = '#' + ids[i];
      }

      if (type === 'removed' || type === 'updated') {
        this.pvjs.highlight(highlightString, null, colors);
      }
      if (type === 'updated' || type === 'added') {
        this.pvjs2.highlight(highlightString, null, colors);
      }
    }
  };

  /**
   * Highlight all pvjson elements that have changes of provided type
   * @param  {String} type Change type
   */
  PvjsDiffViewer.prototype.highlightType = function(type) {
    this.highlightIds(this.getIds(type), type);
  };

  /**
   * Highlight all changes of a change title
   * @param  {jQuery} $active Change title
   */
  PvjsDiffViewer.prototype.highlightTitle = function($active) {
    this.highlightIds(this.getTitleIds($active), getTitleType($active));
  };

  /**
   * Zoom and pan pathways in such a way that elements
   * from changes title will be focused (maximally visible)
   * @param  {JQuery} $active       Change title
   * @param  {Float} relativeZoom1 1/Initial zoom of first pathway
   * @param  {Float} relativeZoom2 1/Initial zoom of second pathway
   * @return {[type]}               [description]
   */
  PvjsDiffViewer.prototype.zoomToTitle = function($active, relativeZoom1, relativeZoom2) {
    if (relativeZoom1 === void 0) {
      relativeZoom1 = 1;
    }
    if (relativeZoom2 === void 0) {
      relativeZoom2 = 1;
    }

    var type = getTitleType($active);
    var relativeZoom = type === 'added' ? relativeZoom2 : relativeZoom1;
    var zoom = relativeZoom;
    var pvjs = type === 'added' ? this.pvjs2 : this.pvjs;
    var selector = pvjs.getSourceData().selector;
    var bBox = selector.getBBox();
    var ids = this.getTitleIds($active);
    var highlightSelector = selector.filteredByCallback(function(element) {
      return (element.id !== void 0 && ids.indexOf(element.id) !== -1);
    });
    var highlightBBox = highlightSelector.getBBox();

    // If updated get BBox of element from both screens
    if (type === 'updated') {
      highlightSelector = this.pvjs2.getSourceData().selector.filteredByCallback(function(element) {
        return (element.id !== void 0 && ids.indexOf(element.id) !== -1);
      });
      var highlightBBox2 = highlightSelector.getBBox();

      highlightBBox.left = Math.min(highlightBBox.left, highlightBBox2.left);
      highlightBBox.top = Math.min(highlightBBox.top, highlightBBox2.top);
      highlightBBox.right = Math.max(highlightBBox.right, highlightBBox2.right);
      highlightBBox.bottom = Math.max(highlightBBox.bottom, highlightBBox2.bottom);
      highlightBBox.width = Math.abs(highlightBBox.right - highlightBBox.left);
      highlightBBox.height = Math.abs(highlightBBox.bottom - highlightBBox.top);
    }

    zoom = relativeZoom / (Math.max(
          highlightBBox.width / bBox.width, highlightBBox.height / bBox.height) ||
        1);

    // Lower zoom by 30%
    zoom *= 0.7;

    pvjs.zoom(zoom);

    // Get real set zoom
    var boundedZoom = pvjs.getZoom();

    // Center pvjs (it is necessary to pan by 15 because of previous zoom out by 30%)
    var x = -highlightBBox.left * boundedZoom + (highlightBBox.width * boundedZoom * 0.15);
    var y = -highlightBBox.top * boundedZoom + (highlightBBox.height * boundedZoom * 0.15);

    pvjs.pan({x: x, y: y});
  };

  /**
   * Navigate to provided direction. Relative to focused change title
   * @param  {String} direction Navigation direction
   */
  PvjsDiffViewer.prototype.navigate = function(direction) {
    var $paneCenter = this.$paneCenter;
    var $focused = $paneCenter.find('.focus').first();
    var $next = null;
    var $nextTitle = null;

    if (direction === 'up' || direction === 'left') {
      // Previous sibling
      $next = $focused.prev();

      // If no previous sibling than next is parent
      if ($next.length === 0) {
        $next = $focused.parent().closest('.changes-container');
      }
    } else if (direction === 'down' || direction === 'right') {
      // First child
      $next = $focused.children('.changes-list').children('.changes-container').first();

      // Next parent sibling if no childs
      if ($next.length === 0) {
        $next = $focused.next();

        if ($next.length === 0) {
          $next = $focused.parent().closest('.changes-container').next();
          if ($next.length === 0) {
            $next = $focused.parent().closest('.changes-container').parent()
              .closest('.changes-container').next();
          }
        }
      }
    }

    if ($next && $next.length && $next.get(0) !== $focused.get(0)) {
      $paneCenter.find('.active').removeClass('active');
      $paneCenter.find('.open').removeClass('open');
      $paneCenter.find('.focus').removeClass('focus');
      $next.addClass('active focus open');
      $next.parentsUntil($paneCenter).addClass('open');

      $nextTitle = $next.children('.changes-title');

      // Scroll diffviewer to contain focused title
      if ($nextTitle.offset().top < 0) {
        $paneCenter.scrollTop($paneCenter.scrollTop() + $nextTitle.offset().top);
      } else if ($nextTitle.offset().top + $nextTitle.outerHeight() > $paneCenter.height()) {
        $paneCenter.scrollTop($paneCenter.scrollTop() + ($nextTitle.offset().top +
              $nextTitle.outerHeight() - $paneCenter.height()));
      }

      // Attenuate all previous elements
      this.attenuate();
      // Highlight selected
      this.highlightTitle($next.children('.changes-title'));
    }
  };

  /**
   * Initialize highlighting for pathways
   * Store highlighter instances as this.h1 and this.h2
   */
  PvjsDiffViewer.prototype.initHighlighting = function() {
    this.hi = window.pvjsHighlighter(this.pvjs, {displayInputField: false});
    this.hi2 = window.pvjsHighlighter(this.pvjs2, {displayInputField: false});
  };

  /**
   * Remove highlighting from all elements
   */
  PvjsDiffViewer.prototype.attenuate = function() {
    this.pvjs.attenuate(null);
    this.pvjs2.attenuate(null);
  };

  /**
   * Expose plugin globally as pvjsDiffviewer
   */
  window.PvjsDiffViewer = PvjsDiffViewer;
})(window, window.jQuery || window.Zepto);

}).call(this,require("buffer").Buffer)

},{"buffer":"/Users/andersriutta/Sites/pvjs/node_modules/browserify/node_modules/buffer/index.js","fs":"/Users/andersriutta/Sites/pvjs/node_modules/browserify/lib/_empty.js","insert-css":"/Users/andersriutta/Sites/pvjs/node_modules/insert-css/index.js"}]},{},["./lib/diff-viewer/diff-viewer.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvZGlmZi12aWV3ZXIvZGlmZi12aWV3ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbnZhciBpbnNlcnRDc3MgPSByZXF1aXJlKCdpbnNlcnQtY3NzJyk7XG52YXIgY3NzID0gQnVmZmVyKFwiTG10aFlYWnBieTFrYVdabWRtbGxkMlZ5SUhzS0lDQndiM05wZEdsdmJqb2djbVZzWVhScGRtVTdDaUFnYUdWcFoyaDBPaUExTURCd2VEc0tJQ0JpYjNKa1pYSTZJREZ3ZUNCemIyeHBaQ0FqTURBd093cDlDZ291YTJGaGRtbHZMV1JwWm1aMmFXVjNaWElnTG5CaGJtVWdld29nSUdac2IyRjBPaUJzWldaME93b2dJRzkyWlhKbWJHOTNPaUJvYVdSa1pXNDdDaUFnZDJsa2RHZzZJRFV3SlRzS0lDQm9aV2xuYUhRNklERXdNQ1U3Q24wS0NpNXJZV0YyYVc4dFpHbG1ablpwWlhkbGNpQXVjR0Z1WlM1d1lXNWxMV3hsWm5RZ2V3cDlDZ291YTJGaGRtbHZMV1JwWm1aMmFXVjNaWElnTG5CaGJtVXVjR0Z1WlMxc1pXWjBJQzV3WVc1bExXbHVibVZ5SUhzS0lDQnRZWEpuYVc0dGNtbG5hSFE2SURFeU1IQjRPd3A5Q2dvS0xtdGhZWFpwYnkxa2FXWm1kbWxsZDJWeUlDNXdZVzVsTG5CaGJtVXRjbWxuYUhRZ2V3cDlDZ291YTJGaGRtbHZMV1JwWm1aMmFXVjNaWElnTG5CaGJtVXVjR0Z1WlMxeWFXZG9kQ0F1Y0dGdVpTMXBibTVsY2lCN0NpQWdiV0Z5WjJsdUxXeGxablE2SURFeU1IQjRPd3A5Q2dvdWEyRmhkbWx2TFdScFptWjJhV1YzWlhJZ0xuQmhibVV1Y0dGdVpTMWpaVzUwWlhJZ2V3b2dJSEJ2YzJsMGFXOXVPaUJoWW5OdmJIVjBaVHNLSUNCMGIzQTZJREE3Q2lBZ2JHVm1kRG9nTlRBbE93b2dJSGRwWkhSb09pQXlOREJ3ZURzS0lDQnRZWEpuYVc0NklEQWdNQ0F3SUMweE1qQndlRHNLSUNCdmRtVnlabXh2ZHkxNE9pQm9hV1JrWlc0N0NpQWdiM1psY21ac2IzY3RlVG9nWVhWMGJ6c0tmUW9LTG10aFlYWnBieTFrYVdabWRtbGxkMlZ5SUM1d1lXNWxMV2x1Ym1WeUlIc0tJQ0JvWldsbmFIUTZJREV3TUNVN0NuMEtDaThxS2lvcUtpb3FLaW9xS2lvcUtnb2dJRTkyWlhKc1lYa0tJQ29xS2lvcUtpb3FLaW9xS2lvcUx3b0tMbXRoWVhacGJ5MWthV1ptZG1sbGQyVnlJRDRnTG05MlpYSnNZWGtnZXdvZ0lIQnZjMmwwYVc5dU9pQmhZbk52YkhWMFpUc0tJQ0IwYjNBNklEQTdDaUFnYkdWbWREb2dNRHNLSUNCaWIzUjBiMjA2SURBN0NpQWdjbWxuYUhRNklEQTdDaUFnWW1GamEyZHliM1Z1WkRvZ0kyWm1aanNLZlFvS0xtdGhZWFpwYnkxa2FXWm1kbWxsZDJWeUlENGdMbTkyWlhKc1lYa2dMbUZzWlhKMGV3b2dJSEJoWkdScGJtYzZJRGx3ZUNBeE5YQjRPd29nSUcxaGNtZHBiam9nTkhCNE93b2dJR0p2Y21SbGNqb2dNWEI0SUhOdmJHbGtJSFJ5WVc1emNHRnlaVzUwT3dvZ0lHSnZjbVJsY2kxeVlXUnBkWE02SURSd2VEc0tmUW9LTG10aFlYWnBieTFrYVdabWRtbGxkMlZ5SUQ0Z0xtOTJaWEpzWVhrZ0xtRnNaWEowTG1Gc1pYSjBMWE4xWTJObGMzTjdDaUFnWW1GamEyZHliM1Z1WkMxamIyeHZjam9nSTJSbVpqQmtPRHNLSUNCaWIzSmtaWEl0WTI5c2IzSTZJQ05rTm1VNVl6WTdDaUFnWTI5c2IzSTZJQ016WXpjMk0yUTdDbjBLQ2k1cllXRjJhVzh0WkdsbVpuWnBaWGRsY2lBK0lDNXZkbVZ5YkdGNUlDNWhiR1Z5ZEM1aGJHVnlkQzFwYm1admV3b2dJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTZJQ05rT1dWa1pqYzdDaUFnWW05eVpHVnlMV052Ykc5eU9pQWpZbU5sT0dZeE93b2dJR052Ykc5eU9pQWpNekUzTURobU93cDlDZ291YTJGaGRtbHZMV1JwWm1aMmFXVjNaWElnUGlBdWIzWmxjbXhoZVNBdVlXeGxjblF1WVd4bGNuUXRkMkZ5Ym1sdVozc0tJQ0JpWVdOclozSnZkVzVrTFdOdmJHOXlPaUFqWm1ObU9HVXpPd29nSUdKdmNtUmxjaTFqYjJ4dmNqb2dJMlpoWldKall6c0tJQ0JqYjJ4dmNqb2dJemhoTm1Rellqc0tmUW9LTG10aFlYWnBieTFrYVdabWRtbGxkMlZ5SUQ0Z0xtOTJaWEpzWVhrZ0xtRnNaWEowTG1Gc1pYSjBMV1JoYm1kbGNuc0tJQ0JpWVdOclozSnZkVzVrTFdOdmJHOXlPaUFqWmpKa1pXUmxPd29nSUdKdmNtUmxjaTFqYjJ4dmNqb2dJMlZpWTJOa01Uc0tJQ0JqYjJ4dmNqb2dJMkU1TkRRME1qc0tmUW9LTHlvcUtpb3FLaW9xS2lvcUtpb3FDaUFnUTJoaGJtZGxjeUJOWVdsdUNpQXFLaW9xS2lvcUtpb3FLaW9xS2k4S0NpNWphR0Z1WjJWeklIc0tJQ0J0WVhKbmFXNDZJREFnTVRKd2VEc0tJQ0JpYjNKa1pYSXRZbTkwZEc5dE9pQXhjSGdnYzI5c2FXUWdJekF3TURzS0NpQWdabTl1ZEMxbVlXMXBiSGs2SUVGeWFXRnNMQ0FpU0dWc2RtVjBhV05oSUU1bGRXVWlMQ0JJWld4MlpYUnBZMkVzSUhOaGJuTXRjMlZ5YVdZN0NpQWdabTl1ZEMxemFYcGxPaUF4TTNCNE93cDlDZ291WTJoaGJtZGxjeTFqYjI1MFlXbHVaWElnZXdwOUNnb3ZLaW9xS2lvcUtpb3FLaW9xS2lvS0lDQkRhR0Z1WjJWeklGUnBkR3hsY3dvZ0tpb3FLaW9xS2lvcUtpb3FLaW92Q2dvdVkyaGhibWRsY3kxMGFYUnNaU0I3Q2lBZ2NHRmtaR2x1WnpvZ05YQjRJRFJ3ZUNBemNIZzdDaUFnWW05eVpHVnlPaUF4Y0hnZ2MyOXNhV1FnSXpBd01Ec0tJQ0JpYjNKa1pYSXRZbTkwZEc5dE9pQXdjSGc3Q2dvZ0lHWnZiblF0YzJsNlpUb2dNVFp3ZURzS2ZRb0tMbU5vWVc1blpYTXRkR2wwYkdVZ2FYc0tJQ0JtYjI1MExYTnBlbVU2SURrd0pUc0tJQ0J2Y0dGamFYUjVPaUF3TGpnN0NpQWdabTl1ZEMxemRIbHNaVG9nYm05eWJXRnNPd3A5Q2dvdVkyaGhibWRsY3kxMGFYUnNaU0JwTG1samIyNTdDaUFnWm05dWRDMXphWHBsT2lBNU1DVTdDaUFnYjNCaFkybDBlVG9nTUM0NE93b2dJR1p2Ym5RdGMzUjViR1U2SUc1dmNtMWhiRHNLSUNCbWIyNTBMWGRsYVdkb2REb2dibTl5YldGc093cDlDZ291WTJoaGJtZGxjeTF3WVhKbGJuUWdjM0JoYmlCN0NpQWdjRzl6YVhScGIyNDZJSEpsYkdGMGFYWmxPd29nSUdScGMzQnNZWGs2SUdsdWJHbHVaUzFpYkc5amF6c0tJQ0J3WVdSa2FXNW5PaUF3SURBZ01DQXhNM0I0T3dwOUNnb3VZMmhoYm1kbGN5MXdZWEpsYm5RZ2MzQmhianBpWldadmNtVWdld29nSUdOdmJuUmxiblE2SUNjbk93b2dJSEJ2YzJsMGFXOXVPaUJoWW5OdmJIVjBaVHNLSUNCMGIzQTZJRFV3SlRzS0lDQnNaV1owT2lBemNIZzdDaUFnZDJsa2RHZzZJREE3Q2lBZ2FHVnBaMmgwT2lBd093b2dJRzFoY21kcGJqb2dMVFp3ZUNBd0lEQTdDaUFnWW05eVpHVnlMWGRwWkhSb09pQTFjSGdnTUNBMWNIZ2dObkI0T3dvZ0lHSnZjbVJsY2kxamIyeHZjam9nZEhKaGJuTndZWEpsYm5RZ2RISmhibk53WVhKbGJuUWdkSEpoYm5Od1lYSmxiblFnSXpBd01Ec0tJQ0JpYjNKa1pYSXRjM1I1YkdVNklITnZiR2xrT3dwOUNnb3ViM0JsYmlBK0lDNWphR0Z1WjJWekxYQmhjbVZ1ZENCemNHRnVPbUpsWm05eVpTQjdDaUFnYkdWbWREb2dNRHNLSUNCdFlYSm5hVzR0ZEc5d09pQXROSEI0T3dvZ0lHSnZjbVJsY2kxM2FXUjBhRG9nTm5CNElEVndlQ0F3SURWd2VEc0tJQ0JpYjNKa1pYSXRZMjlzYjNJNklDTXdNREFnZEhKaGJuTndZWEpsYm5RZ2RISmhibk53WVhKbGJuUWdkSEpoYm5Od1lYSmxiblE3Q24wS0NpOHFJRTVsYzNScGJtY2dLaThLTG1Ob1lXNW5aWE10WTI5dWRHRnBibVZ5SUM1amFHRnVaMlZ6TFdOdmJuUmhhVzVsY2lBdVkyaGhibWRsY3kxMGFYUnNaU0I3Q2lBZ1ptOXVkQzF6YVhwbE9pQXhOSEI0T3dwOUNpNWphR0Z1WjJWekxXTnZiblJoYVc1bGNpQXVZMmhoYm1kbGN5MWpiMjUwWVdsdVpYSWdMbU5vWVc1blpYTXRZMjl1ZEdGcGJtVnlJQzVqYUdGdVoyVnpMWFJwZEd4bElIc0tJQ0J3WVdSa2FXNW5MV3hsWm5RNklERXdjSGc3Q2lBZ1ptOXVkQzF6YVhwbE9pQXhNbkI0T3dwOUNnb3VZMmhoYm1kbGN5MWpiMjUwWVdsdVpYSXVZV04wYVhabElENGdMbU5vWVc1blpYTXRkR2wwYkdVZ2V3b2dJSEJ2YzJsMGFXOXVPaUJ5Wld4aGRHbDJaVHNLZlFvdVkyaGhibWRsY3kxamIyNTBZV2x1WlhJdVlXTjBhWFpsSUQ0Z0xtTm9ZVzVuWlhNdGRHbDBiR1U2WW1WbWIzSmxMQW91WTJoaGJtZGxjeTFqYjI1MFlXbHVaWEl1WVdOMGFYWmxJRDRnTG1Ob1lXNW5aWE10ZEdsMGJHVTZZV1owWlhJZ2V3b2dJR052Ym5SbGJuUTZJQ2NuT3dvZ0lHUnBjM0JzWVhrNklHNXZibVU3Q2lBZ2NHOXphWFJwYjI0NklHRmljMjlzZFhSbE93b2dJSFJ2Y0RvZ05UQWxPd29nSUcxaGNtZHBiam9nTFRFeWNIZ2dNQ0F3T3dvZ0lIZHBaSFJvT2lBd093b2dJR2hsYVdkb2REb2dNRHNLSUNCaWIzSmtaWEl0ZEc5d09pQXhNbkI0SUhOdmJHbGtJSFJ5WVc1emNHRnlaVzUwT3dvZ0lHSnZjbVJsY2kxaWIzUjBiMjA2SURFeWNIZ2djMjlzYVdRZ2RISmhibk53WVhKbGJuUTdDbjBLQ2k1amFHRnVaMlZ6TFdOdmJuUmhhVzVsY2k1aFkzUnBkbVV1Wm05amRYTWdQaUF1WTJoaGJtZGxjeTEwYVhSc1pYc0tJQ0F0ZDJWaWEybDBMV0p2ZUMxemFHRmtiM2M2SUdsdWMyVjBJREFnTUNBeE1IQjRJREJ3ZUNCeVoySmhLREFzSURBc0lEQXNJREF1TXpVcE93b2dJQ0FnSUMxdGIzb3RZbTk0TFhOb1lXUnZkem9nYVc1elpYUWdNQ0F3SURFd2NIZ2dNSEI0SUhKblltRW9NQ3dnTUN3Z01Dd2dNQzR6TlNrN0NpQWdJQ0FnSUNBZ0lDQmliM2d0YzJoaFpHOTNPaUJwYm5ObGRDQXdJREFnTVRCd2VDQXdjSGdnY21kaVlTZ3dMQ0F3TENBd0xDQXdMak0xS1RzS2ZRb0tMbU5vWVc1blpYTXRZMjl1ZEdGcGJtVnlMbUZqZEdsMlpTQStJQzVqYUdGdVoyVnpMWFJwZEd4bE9tSmxabTl5WlNCN0NpQWdiR1ZtZERvZ0xURXljSGc3Q2lBZ1ltOXlaR1Z5TFhKcFoyaDBPaUF4TW5CNElITnZiR2xrSUNNd01EQTdDbjBLQ2k1amFHRnVaMlZ6TFdOdmJuUmhhVzVsY2k1aFkzUnBkbVVnUGlBdVkyaGhibWRsY3kxMGFYUnNaVHBoWm5SbGNpQjdDaUFnY21sbmFIUTZJQzB4TW5CNE93b2dJR0p2Y21SbGNpMXNaV1owT2lBeE1uQjRJSE52Ykdsa0lDTXdNREE3Q24wS0NpNWphR0Z1WjJWekxYUnBkR3hsTG1Ob1lXNW5aUzFoWkdSbFpDQjdDaUFnWW1GamEyZHliM1Z1WkRvZ0kyRTJZekJsTVRzS2ZRb3VZMmhoYm1kbGN5MWpiMjUwWVdsdVpYSXVZV04wYVhabElENGdMbU5vWVc1blpYTXRkR2wwYkdVdVkyaGhibWRsTFdGa1pHVmtJSHNLSUNCaVlXTnJaM0p2ZFc1a09pQWpObU01TVdOak93cDlDaTVqYUdGdVoyVnpMV052Ym5SaGFXNWxjaTVoWTNScGRtVWdQaUF1WTJoaGJtZGxjeTEwYVhSc1pTNWphR0Z1WjJVdFlXUmtaV1E2WVdaMFpYSWdld29nSUdScGMzQnNZWGs2SUdKc2IyTnJPd3A5Q2dvdVkyaGhibWRsY3kxMGFYUnNaUzVqYUdGdVoyVXRkWEJrWVhSbFpDQjdDaUFnWW1GamEyZHliM1Z1WkRvZ0kyWmxabU01TmpzS2ZRb3VZMmhoYm1kbGN5MWpiMjUwWVdsdVpYSXVZV04wYVhabElENGdMbU5vWVc1blpYTXRkR2wwYkdVdVkyaGhibWRsTFhWd1pHRjBaV1FnZXdvZ0lHSmhZMnRuY205MWJtUTZJQ05tWm1ZNU5EUTdDbjBLTG1Ob1lXNW5aWE10WTI5dWRHRnBibVZ5TG1GamRHbDJaU0ErSUM1amFHRnVaMlZ6TFhScGRHeGxMbU5vWVc1blpTMTFjR1JoZEdWa09tSmxabTl5WlN3S0xtTm9ZVzVuWlhNdFkyOXVkR0ZwYm1WeUxtRmpkR2wyWlNBK0lDNWphR0Z1WjJWekxYUnBkR3hsTG1Ob1lXNW5aUzExY0dSaGRHVmtPbUZtZEdWeUlIc0tJQ0JrYVhOd2JHRjVPaUJpYkc5amF6c0tmUW9LTG1Ob1lXNW5aWE10ZEdsMGJHVXVZMmhoYm1kbExYSmxiVzkyWldRZ2V3b2dJR0poWTJ0bmNtOTFibVE2SUNObU9XRTBZV1k3Q24wS0xtTm9ZVzVuWlhNdFkyOXVkR0ZwYm1WeUxtRmpkR2wyWlNBK0lDNWphR0Z1WjJWekxYUnBkR3hsTG1Ob1lXNW5aUzF5WlcxdmRtVmtJSHNLSUNCaVlXTnJaM0p2ZFc1a09pQWpaak0yWWpjNE93cDlDaTVqYUdGdVoyVnpMV052Ym5SaGFXNWxjaTVoWTNScGRtVWdQaUF1WTJoaGJtZGxjeTEwYVhSc1pTNWphR0Z1WjJVdGNtVnRiM1psWkRwaVpXWnZjbVVnZXdvZ0lHUnBjM0JzWVhrNklHSnNiMk5yT3dwOUNnb3VZMmhoYm1kbGN5MTBhWFJzWlM1aFkzUnBkbVVnZXdvZ0lIQnZjMmwwYVc5dU9pQnlaV3hoZEdsMlpUc0tmUW91WTJoaGJtZGxjeTEwYVhSc1pTNWhZM1JwZG1VNlltVm1iM0psSUhzS0lDQmpiMjUwWlc1ME9pQW5KenNLSUNCd2IzTnBkR2x2YmpvZ1lXSnpiMngxZEdVN0NuMEtDZ292S2lvcUtpb3FLaW9xS2lvcUtpb0tJQ0JEYUdGdVoyVnpJRXhwYzNRS0lDb3FLaW9xS2lvcUtpb3FLaW9xTHdvdVkyaGhibWRsY3kxc2FYTjBJSHNLSUNCa2FYTndiR0Y1T2lCdWIyNWxPd3A5Q2dvdVkyaGhibWRsY3k1amFHRnVaMlZ6TFd4cGMzUWdld29nSUdScGMzQnNZWGs2SUdKc2IyTnJPd3A5Q2dvdVkyaGhibWRsY3kxamIyNTBZV2x1WlhJdWIzQmxiaUErSUM1amFHRnVaMlZ6TFd4cGMzUWdld29nSUdScGMzQnNZWGs2SUdKc2IyTnJPd3A5Q2dvdktpb3FLaW9xS2lvcUtpb3FLaW9LSUNCRGFHRnVaMlZ6SUV4cGMzUUtJQ29xS2lvcUtpb3FLaW9xS2lvcUx3b3ZLaTVqYUdGdVoyVnpMWFJwZEd4bExtRmpkR2wyWlNvdkNpNWphR0Z1WjJWekxYUnBkR3hsSUQ0Z0xtVnNaVzFsYm5RdFkyaGhibWRsY3lCN0NpQWdaR2x6Y0d4aGVUb2dibTl1WlRzS2ZRb0tMbUZqZEdsMlpTQStJQzVqYUdGdVoyVnpMWFJwZEd4bElENGdMbVZzWlcxbGJuUXRZMmhoYm1kbGN5QjdDaUFnWkdsemNHeGhlVG9nWW14dlkyczdDaUFnYldGeVoybHVPaUF3T3dvZ0lIQmhaR1JwYm1jNklEUndlQ0F3SURSd2VEc0tJQ0JzYVc1bExXaGxhV2RvZERvZ01TNDBPd29nSUd4cGMzUXRjM1I1YkdVNklHNXZibVU3Q2lBZ2QyOXlaQzEzY21Gd09pQmljbVZoYXkxM2IzSmtPd3A5Q2c9PVwiLFwiYmFzZTY0XCIpO1xuXG4oZnVuY3Rpb24od2luZG93LCAkKSB7XG4gIGluc2VydENzcyhjc3MpO1xuXG4gIHZhciBvcHRpb25zRGVmYXVsdCA9IHtcbiAgICBzb3VyY2VEYXRhOiBbXVxuICB9O1xuICB2YXIgaW5zdGFuY2VzTWFwID0ge307XG5cbiAgLyoqXG4gICAqIEluaXQgcGx1Z2luXG4gICAqIEBwYXJhbSB7cHZqcyBpbnN0YW5jZX0gcHZqc1xuICAgKiBAcGFyYW0ge29iamVjdHN9IG9wdGlvbnNcbiAgICovXG4gIGZ1bmN0aW9uIGluaXQocHZqcywgb3B0aW9ucykge1xuICAgIGluc3RhbmNlc01hcFtwdmpzLmluc3RhbmNlSWRdID0gbmV3IFB2anNEaWZmVmlld2VyKHB2anMsIG9wdGlvbnMpO1xuICAgIC8vIENyZWF0ZSBuZXcgaW5zdGFuY2UgaWYgaXQgZG9lcyBub3QgZXhpc3RcbiAgICBpZiAoIWluc3RhbmNlc01hcC5oYXNPd25Qcm9wZXJ0eShwdmpzLmluc3RhbmNlSWQpKSB7XG4gICAgICBpbnN0YW5jZXNNYXBbcHZqcy5pbnN0YW5jZUlkXSA9IG5ldyBQdmpzRGlmZlZpZXdlcihwdmpzLCBvcHRpb25zKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IHB2anNcbiAgICovXG4gIHZhciBQdmpzRGlmZlZpZXdlciA9IGZ1bmN0aW9uKHNlbGVjdG9yLCBvcHRpb25zU2V0KSB7XG4gICAgdGhpcy4kcHZqc0VsZW1lbnQgPSAkKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuaW5pdENvbnRhaW5lcigpO1xuXG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoe30sIG9wdGlvbnNEZWZhdWx0LCBvcHRpb25zU2V0WzBdKTtcbiAgICB0aGlzLnB2anMgPSBuZXcgd2luZG93LlB2anModGhpcy4kcGFuZUxlZnRbMF0sIHRoaXMub3B0aW9ucykuZ2V0UHVibGljSW5zdGFuY2UoKTtcblxuICAgIHRoaXMub3B0aW9uczIgPSAkLmV4dGVuZCh7fSwgb3B0aW9uc0RlZmF1bHQsIG9wdGlvbnNTZXRbMV0pO1xuICAgIHRoaXMucHZqczIgPSBuZXcgd2luZG93LlB2anModGhpcy4kcGFuZVJpZ2h0WzBdLCB0aGlzLm9wdGlvbnMyKS5nZXRQdWJsaWNJbnN0YW5jZSgpO1xuXG4gICAgLypcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgb3B0aW9uc0RlZmF1bHQsIG9wdGlvbnMpO1xuXG4gICAgLy90aGlzLnB2anMgPSBuZXcgd2luZG93LlB2anMoKTtcbiAgICB0aGlzLnB2anMgPSBwdmpzO1xuICAgIC8vKi9cblxuICAgIC8vdGhpcy5pbml0U2Vjb25kUHZqcygpO1xuICAgIHRoaXMuaG9va0V2ZW50cygpO1xuXG4gICAgLy8gVHJpZ2dlciBwdmpzMiByZW5kZXIgd2hlbiBldmVyeXRoaW5nIGlzIHJlYWR5XG4gICAgdGhpcy5wdmpzLnJlbmRlcigpO1xuICAgIHRoaXMucHZqczIucmVuZGVyKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBkaWZmZXJlbmNlcyBjb250YWluZXJcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5pbml0Q29udGFpbmVyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kZGlmZnZpZXdlciA9ICQoJzxkaXYgY2xhc3M9XCJwdmpzLWRpZmZ2aWV3ZXJcIi8+Jyk7XG5cbiAgICAvLyBDcmVhdGUgcGFuZXNcbiAgICB0aGlzLiRwYW5lTGVmdCA9ICQoJzxkaXYgY2xhc3M9XCJwYW5lLWlubmVyXCI+PC9kaXY+JylcbiAgICAgIC5hcHBlbmRUbygkKCc8ZGl2IGNsYXNzPVwicGFuZSBwYW5lLWxlZnRcIj48L2Rpdj4nKVxuICAgICAgLmFwcGVuZFRvKHRoaXMuJGRpZmZ2aWV3ZXIpKTtcbiAgICB0aGlzLiRwYW5lUmlnaHQgPSAkKCc8ZGl2IGNsYXNzPVwicGFuZS1pbm5lclwiPjwvZGl2PicpXG4gICAgICAuYXBwZW5kVG8oJCgnPGRpdiBjbGFzcz1cInBhbmUgcGFuZS1yaWdodFwiPjwvZGl2PicpXG4gICAgICAuYXBwZW5kVG8odGhpcy4kZGlmZnZpZXdlcikpO1xuICAgIHRoaXMuJHBhbmVDZW50ZXIgPSAkKCc8ZGl2IGNsYXNzPVwicGFuZSBwYW5lLWNlbnRlclwiPjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuJGRpZmZ2aWV3ZXIpO1xuXG4gICAgLy8gSW5zZXJ0IGRpZmZ2aWV3ZXIgY29udGFpbmVyIGJlZm9yZSBwdmpzIGVsZW1lbnRcbiAgICB0aGlzLiRkaWZmdmlld2VyLmluc2VydEJlZm9yZSh0aGlzLiRwdmpzRWxlbWVudCk7XG5cbiAgICAvLyBNb3ZlIGluc3RhbmNlIGVsZW1lbnQgaW50byBsZWZ0IHBhbmVcbiAgICB0aGlzLiRwYW5lTGVmdC5hcHBlbmQodGhpcy4kcHZqc0VsZW1lbnQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIHNlY29uZCBwdmpzLiBTYXZlIGl0cyBpbnN0YW5jZSBpbnRvIHRoaXMucHZqczJcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5pbml0U2Vjb25kUHZqcyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIENyZWF0ZSBzZWNvbmQgaW5zdGFuY2UgY29udGFpbmVyXG4gICAgdGhpcy4kcHZqc0VsZW1lbnQyID0gJCgnPGRpdi8+JykuYXBwZW5kVG8odGhpcy4kcGFuZVJpZ2h0KTtcblxuICAgIC8vIEdldCBvcmlnaW5hbCBvcHRpb25zXG4gICAgdmFyIHB2anNPcHRpb25zID0gdGhpcy5wdmpzLmdldE9wdGlvbnMoKTtcbiAgICAvLyBTZXQgbmV3IHNvdXJjZSBkYXRhXG4gICAgcHZqc09wdGlvbnMuc291cmNlRGF0YSA9IHRoaXMub3B0aW9ucy5zb3VyY2VEYXRhO1xuICAgIHB2anNPcHRpb25zLm1hbnVhbFJlbmRlciA9IHRydWU7XG5cbiAgICAvLyBDcmVhdGUgc2Vjb25kIHB2anMgaW5zdGFuY2VcbiAgICAvL3RoaXMucHZqczIgPSBuZXcgd2luZG93LlB2anModGhpcy4kcHZqc0VsZW1lbnQyWzBdLCBwdmpzT3B0aW9ucyk7XG4gICAgLy90aGlzLnB2anMyID0gdGhpcy5wdmpzKHRoaXMuJHB2anNFbGVtZW50MlswXSwgcHZqc09wdGlvbnMpO1xuICAgIHRoaXMuJHB2anNFbGVtZW50Mi5wdmpzKHB2anNPcHRpb25zKTtcbiAgICB0aGlzLnB2anMyID0gdGhpcy4kcHZqc0VsZW1lbnQyLnB2anMoJ2dldCcpLnBvcCgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIb29rIHJlbmRlciBldmVudHMuIERpc3BsYXkgZGlmZlZpZXdlciBvbmx5IHdoZW4gYm90aCBwdmpzcyBhcmUgcmVhZHlcbiAgICogSG9vayBmb3IgZXJyb3IgZXZlbnRzIHNvIHRvIGtub3cgd2hlbiB0byBkaXNwbGF5IGEgbWVzc2FnZSBpbnN0ZWFkIG9mIGRpZmZWaWV3ZXJcbiAgICogSG9vayB6b29tIGFuZCBwYW4gZXZlbnRzIGluIG9yZGVyIHRvIGtlZXAgYm90aCBwYXRod2F5cyBzeW5jaHJvbml6ZWRcbiAgICogSG9vayBtYWluIHB2anMgZGVzdHJveSBldmVudCBpbiBvcmRlciB0byBrbm93IHdoZW4gdG8gZGVzdHJveSBzZWNvbmQgcGF0aHdheVxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmhvb2tFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgdmFyIHB2anNSZW5kZXJlZCA9IGZhbHNlO1xuICAgIHZhciBwdmpzMlJlbmRlcmVkID0gZmFsc2U7XG4gICAgdmFyIG5vRGlmZiA9IGZhbHNlO1xuXG4gICAgLy8gcHZqcyByZW5kZXJlciBiYXJyaWVyXG4gICAgdGhpcy5wdmpzLm9uKCdyZW5kZXJlZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgcHZqc1JlbmRlcmVkID0gdHJ1ZTtcbiAgICAgIGlmIChwdmpzMlJlbmRlcmVkICYmICFub0RpZmYpIHtcbiAgICAgICAgdGhhdC5vblB2anNlc1JlbmRlcmVkKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5wdmpzMi5vbigncmVuZGVyZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHB2anMyUmVuZGVyZWQgPSB0cnVlO1xuICAgICAgaWYgKHB2anNSZW5kZXJlZCAmJiAhbm9EaWZmKSB7XG4gICAgICAgIHRoYXQub25QdmpzZXNSZW5kZXJlZCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5wdmpzLm9uKCdlcnJvci5zb3VyY2VEYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIW5vRGlmZikge1xuICAgICAgICB0aGF0Lm9uTm9EaWZmKCdPbmUgb3IgYm90aCBwYXRod2F5cyB3ZXJlIG5vdCByZW5kZXJlZC4gJyArXG4gICAgICAgICAgICAnTW9zdCBwcm9iYWJseSBvbmUgcGF0aHdheXMgdXNlcyBvbGQgZm9ybWF0IHRoYXQgaXMgbm90IHN1cHBvcnRlZCBieSBwdmpzLicpO1xuICAgICAgfVxuXG4gICAgICBub0RpZmYgPSB0cnVlO1xuICAgIH0pO1xuICAgIHRoaXMucHZqczIub24oJ2Vycm9yLnNvdXJjZURhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghbm9EaWZmKSB7XG4gICAgICAgIHRoYXQub25Ob0RpZmYoJ09uZSBvciBib3RoIHBhdGh3YXlzIHdlcmUgbm90IHJlbmRlcmVkLicgK1xuICAgICAgICAgICAgJ01vc3QgcHJvYmFibHkgb25lIHBhdGh3YXlzIHVzZXMgb2xkIGZvcm1hdCB0aGF0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgcHZqcy4nKTtcbiAgICAgIH1cblxuICAgICAgbm9EaWZmID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIC8vIE9uIGRlc3Ryb3kgcHZqc1xuICAgIHRoaXMucHZqcy5vbignZGVzdHJveS5wdmpzJywgZnVuY3Rpb24oKSB7XG4gICAgICB0aGF0LnB2anMyLmRlc3Ryb3koKTtcbiAgICAgIC8vIFB1dCBiYWNrIHB2anMgZWxlbWVudCBjb250YWluZXJcbiAgICAgIHRoYXQuJHB2anNFbGVtZW50Lmluc2VydEJlZm9yZSh0aGF0LiRkaWZmdmlld2VyKTtcbiAgICAgIHRoYXQuJGRpZmZ2aWV3ZXIucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBQYW4gYW5kIHpvb20gZXZlbnRzXG4gICAgdmFyIHB2anNQYW5uZWQgPSBmYWxzZTtcbiAgICB2YXIgcHZqc1pvb21lZCA9IGZhbHNlO1xuICAgIHZhciBwdmpzMlBhbm5lZCA9IGZhbHNlO1xuICAgIHZhciBwdmpzMlpvb21lZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5wdmpzLm9uKCd6b29tZWQucmVuZGVyZXInLCBmdW5jdGlvbihsZXZlbCkge1xuICAgICAgaWYgKHB2anMyWm9vbWVkKSB7IC8vIHByZXZlbnQgcmVjdXJzaXZlIGNhbGxcbiAgICAgICAgcHZqczJab29tZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcHZqc1pvb21lZCA9IHRydWU7XG5cbiAgICAgIHRoYXQucHZqczIuem9vbShsZXZlbCAvIHRoYXQuem9vbVNjYWxlKTtcbiAgICAgIHRoYXQucHZqcy5wYW5CeSh7eDogMCwgeTogMH0pOyAvLyB0cmlnZ2VyIHBhbiB0byBzeW5jIHBhdGh3YXlzXG4gICAgICB0aGF0LnB2anMyLnBhbih0aGF0LnB2anMuZ2V0UGFuKCkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wdmpzLm9uKCdwYW5uZWQucmVuZGVyZXInLCBmdW5jdGlvbihwb2ludCkge1xuICAgICAgaWYgKHB2anMyUGFubmVkKSB7XG4gICAgICAgIHB2anMyUGFubmVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHB2anNQYW5uZWQgPSB0cnVlO1xuICAgICAgdGhhdC5wdmpzMi5wYW4ocG9pbnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5wdmpzMi5vbignem9vbWVkLnJlbmRlcmVyJywgZnVuY3Rpb24obGV2ZWwpIHtcbiAgICAgIGlmIChwdmpzWm9vbWVkKSB7XG4gICAgICAgIHB2anNab29tZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcHZqczJab29tZWQgPSB0cnVlO1xuXG4gICAgICB0aGF0LnB2anMuem9vbShsZXZlbCAqIHRoYXQuem9vbVNjYWxlKTtcbiAgICAgIHRoYXQucHZqczIucGFuQnkoe3g6IDAsIHk6IDB9KTsgLy8gdHJpZ2dlciBwYW4gdG8gc3luYyBwYXRod2F5c1xuICAgICAgdGhhdC5wdmpzLnBhbih0aGF0LnB2anMyLmdldFBhbigpKTtcbiAgICB9KTtcblxuICAgIHRoaXMucHZqczIub24oJ3Bhbm5lZC5yZW5kZXJlcicsIGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICBpZiAocHZqc1Bhbm5lZCkge1xuICAgICAgICBwdmpzUGFubmVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHB2anMyUGFubmVkID0gdHJ1ZTtcbiAgICAgIHRoYXQucHZqcy5wYW4ocG9pbnQpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gb3ZlcmxheSB3aXRoIGEgbWVzc2FnZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IG1lc3NhZ2UgTWVzc2FnZSB3aHkgZGlmZlZpZXdlciBzaG93cyBub3RoaW5nXG4gICAqL1xuICBQdmpzRGlmZlZpZXdlci5wcm90b3R5cGUub25Ob0RpZmYgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgLy8gQ3JlYXRlIGFuIG92ZXJsYXlcbiAgICBpZiAodGhpcy4kb3ZlcmxheSA9PT0gdm9pZCAwKSB7XG4gICAgICB0aGlzLiRvdmVybGF5ID0gJCgnPGRpdiBjbGFzcz1cIm92ZXJsYXlcIj48L2Rpdj4nKS5hcHBlbmRUbyh0aGlzLiRkaWZmdmlld2VyKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgYSBtZXNzYWdlXG4gICAgdGhpcy4kb3ZlcmxheS5hcHBlbmQoJCgnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWluZm9cIj48L2Rpdj4nKS50ZXh0KG1lc3NhZ2UpKTtcbiAgfTtcblxuICAvKipcbiAgICogV2hlbiBib3RoIHB2anNzIGFyZSByZW5kZXJlZFxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLm9uUHZqc2VzUmVuZGVyZWQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5jaGVja1B2anNlc0RhdGEoKSkge1xuICAgICAgdGhpcy5nZXRab29tU2NhbGUoKTtcbiAgICAgIHRoaXMuZGlzcGxheURpZmYoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbk5vRGlmZignT25lIG9yIGJvdGggcGF0aHdheXMgd2VyZSByZW5kZXJlZCB1c2luZyBhIGZvcm1hdCAoZXguIHBuZykgJyArXG4gICAgICAgICAgJ3RoYXQgaGFzIG5vIGRldGFpbHMgYWJvdXQgbm9kZXMuJyk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBib3RoIHB2anNzIGhhdmUgcHZqc29uIG9iamVjdHNcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiBwdmpzb24gaXMgYXZhbGlhYmxlIGZvciBib3RoIHB2anNzXG4gICAqL1xuICBQdmpzRGlmZlZpZXdlci5wcm90b3R5cGUuY2hlY2tQdmpzZXNEYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLnB2anMuZ2V0U291cmNlRGF0YSgpLnB2anNvbiAmJiB0aGlzLnB2anMyLmdldFNvdXJjZURhdGEoKS5wdmpzb24pO1xuICB9O1xuXG4gIC8qKiBAdHlwZSB7TnVtYmVyfSB6b29tIHNjYWxlIGJldHdlZW4gcGF0aHdheXMgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLnpvb21TY2FsZSA9IDE7XG5cbiAgLyoqXG4gICAqIERldGVjdCBhbmQgY2FjaGUgem9vbSBzY2FsZSBiZXR3ZWVuIHBhdGh3YXlzXG4gICAqL1xuICBQdmpzRGlmZlZpZXdlci5wcm90b3R5cGUuZ2V0Wm9vbVNjYWxlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy56b29tU2NhbGUgPSB0aGlzLnB2anMuZ2V0Wm9vbSgpIC8gdGhpcy5wdmpzMi5nZXRab29tKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEVudHJ5IHBvaW50IG9mIGRpZmZWaWV3ZXIgcmVuZGVyaW5nIGFuZCBoaWdobGlnaHRpbmcgZGlmZmVyZW5jZXNcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5kaXNwbGF5RGlmZiA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnB2anMuZ2V0U291cmNlRGF0YSgpLnB2anNvbi5lbGVtZW50cztcbiAgICB0aGlzLmVsZW1lbnRzMiA9IHRoaXMucHZqczIuZ2V0U291cmNlRGF0YSgpLnB2anNvbi5lbGVtZW50cztcblxuICAgIC8vIE5ldyBlbGVtZW50cyBoYXZlIHByaW9yaXR5XG4gICAgdGhpcy5lbGVtZW50c01lcmdlID0gdGhpcy5tZXJnZUVsZW1lbnRzKHRoaXMuZWxlbWVudHMyLCB0aGlzLmVsZW1lbnRzKTtcblxuICAgIHZhciBkaWZmID0gdGhpcy5jb21wdXRlRGlmZigpO1xuXG4gICAgLy8gSUYgbm8gZGlmZnMgdGhlbiBkaXNwbGF5IGFuIG92ZXJsYXkgbWVzc2FnZSBhbmQgc3RvcCBmdXJ0aGVyIHJlbmRlcmluZ1xuICAgIGlmIChkaWZmLmFkZGVkLmxlbmd0aCArIGRpZmYudXBkYXRlZC5sZW5ndGggKyBkaWZmLnJlbW92ZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLm9uTm9EaWZmKCdQYXRod2F5cyBoYXZlIG5vIHZpc3VhbCBkaWZmZXJlbmNlcyBiZXR3ZWVuIHRoZW0uJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyICRjaGFuZ2VzTGlzdCA9IHRoaXMuaW5pdERpZmZWaWV3KCk7XG5cbiAgICAvLyBTdG9yZSBlbGVtZW50cyBncm91cGVkIGJ5IGNoYW5nZSB0eXBlIGFuZCBncm91cCBuYW1lXG4gICAgdGhpcy5lbGVtZW50c0NhY2hlID0ge2FkZGVkOiB7fSwgdXBkYXRlZDoge30sIHJlbW92ZWQ6IHt9fTtcbiAgICB0aGlzLmVsZW1lbnRzUmVmZXJlbmNlcyA9IHt9O1xuXG4gICAgdGhpcy5yZW5kZXJEaWZmc09mVHlwZSgnYWRkZWQnLCBkaWZmLmFkZGVkLCAkY2hhbmdlc0xpc3QsIHRoaXMuZWxlbWVudHMyKTtcbiAgICB0aGlzLnJlbmRlckRpZmZzT2ZUeXBlKCd1cGRhdGVkJywgZGlmZi51cGRhdGVkLCAkY2hhbmdlc0xpc3QsIHRoaXMuZWxlbWVudHNNZXJnZSk7XG4gICAgdGhpcy5yZW5kZXJEaWZmc09mVHlwZSgncmVtb3ZlZCcsIGRpZmYucmVtb3ZlZCwgJGNoYW5nZXNMaXN0LCB0aGlzLmVsZW1lbnRzKTtcblxuICAgIHRoaXMuaG9va0RpZmZOYXZpZ2F0aW9uKCk7XG5cbiAgICAvLyBIaWdobGlnaHQgYWxsIGNoYW5nZXNcbiAgICB0aGlzLmhpZ2hsaWdodFR5cGUoJ2FkZGVkJyk7XG4gICAgdGhpcy5oaWdobGlnaHRUeXBlKCd1cGRhdGVkJyk7XG4gICAgdGhpcy5oaWdobGlnaHRUeXBlKCdyZW1vdmVkJyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1lcmdlIGxpc3RzIGJ5IGFwcGVuZGluZyB1bmlxdWUgZWxlbWVudHMgZnJvbSBzZWNvbmQgbGlzdCB0byBmaXJzdCBsaXN0XG4gICAqIEBwYXJhbSAge0FycmF5fSBlbGVtZW50c1xuICAgKiBAcGFyYW0gIHtBcnJheX0gZWxlbWVudHMyXG4gICAqIEByZXR1cm4ge0FycmF5fVxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLm1lcmdlRWxlbWVudHMgPSBmdW5jdGlvbihlbGVtZW50cywgZWxlbWVudHMyKSB7XG4gICAgdmFyIGVsZW1lbnRzTWVyZ2UgPSBlbGVtZW50cy5zbGljZSgpO1xuICAgIHZhciBlbGVtZW50Rm91bmQgPSBmYWxzZTtcblxuICAgIGZvciAodmFyIGUgaW4gZWxlbWVudHMyKSB7XG4gICAgICBlbGVtZW50Rm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGUyIGluIGVsZW1lbnRzTWVyZ2UpIHtcbiAgICAgICAgaWYgKGVsZW1lbnRzTWVyZ2VbZTJdLmlkID09PSBlbGVtZW50czJbZV0uaWQpIHtcbiAgICAgICAgICBlbGVtZW50Rm91bmQgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIGVsZW1lbnQgaXMgdW5pcXVlIHRoZW4gYWRkIGl0IHRvIG1lcmdlXG4gICAgICBpZiAoIWVsZW1lbnRGb3VuZCkge1xuICAgICAgICBlbGVtZW50c01lcmdlLnB1c2goZWxlbWVudHMyW2VdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudHNNZXJnZTtcbiAgfTtcblxuICAvKipcbiAgICogQ29tcHV0ZSBkaWZmZXJlbmNlIGJldHdlZW4gZWxlbWVudHMgb2YgYm90aCBwdmpzc1xuICAgKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIDMgYXJyYXlzOiB1cGRhdGVkLCBhZGRlZCBhbmQgcmVtb3ZlZFxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmNvbXB1dGVEaWZmID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gQ2xvbmUgbGlzdHMgdG8gYmUgc2FmZSBmcm9tIG1vZGlmeWluZyB0aGVtIGludGVybmFsbHlcbiAgICAvLyAoaW4gY2FzZSB0aGF0IHB2anNvbiB3YXMgbm90IGRlZXAtY2xvbmVkKVxuICAgIHZhciBlbGVtZW50cyA9IHRoaXMuZWxlbWVudHMuc2xpY2UoKTsgICAgLy8gT2xkIHBhdGh3YXkgZWxlbWVudHNcbiAgICB2YXIgZWxlbWVudHMyID0gdGhpcy5lbGVtZW50czIuc2xpY2UoKTsgIC8vIE5ldyBwYXRod2F5IGVsZW1lbnRzXG4gICAgdmFyIGRpZmYgPSB7XG4gICAgICB1cGRhdGVkOiBbXSxcbiAgICAgIGFkZGVkOiBbXSxcbiAgICAgIHJlbW92ZWQ6IFtdXG4gICAgfTtcbiAgICB2YXIgZWxlbWVudDtcbiAgICB2YXIgZm91bmQ7XG5cbiAgICBmb3IgKHZhciBpID0gZWxlbWVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGVsZW1lbnQgPSBlbGVtZW50c1tpXTtcbiAgICAgIGZvdW5kID0gZmFsc2U7XG5cbiAgICAgIC8vIFNlYXJjaCBmb3IgZWxlbWVudCBieSBJRCBpbiBzZWNvbmQgbGlzdFxuICAgICAgZm9yICh2YXIgaiA9IGVsZW1lbnRzMi5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICBpZiAoZWxlbWVudHNbaV0uaWQgPT09IGVsZW1lbnRzMltqXS5pZCkge1xuICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcblxuICAgICAgICAgIC8vIENoZWNrIGZvciBjaGFuZ2VzXG4gICAgICAgICAgaWYgKGNhbGN1bGF0ZUVsZW1lbnREaWZmKGVsZW1lbnRzW2ldLCBlbGVtZW50czJbal0pKSB7XG4gICAgICAgICAgICBkaWZmLnVwZGF0ZWQucHVzaCh7XG4gICAgICAgICAgICAgIGlkOiBlbGVtZW50czJbal0uaWQsXG4gICAgICAgICAgICAgICdncG1sOmVsZW1lbnQnOiBlbGVtZW50czJbal1bJ2dwbWw6ZWxlbWVudCddIHx8XG4gICAgICAgICAgICAgICAgICBlbGVtZW50c1tpXVsnZ3BtbDplbGVtZW50J10gfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICB0eXBlOiBlbGVtZW50czJbal0udHlwZSB8fCBlbGVtZW50c1tpXS50eXBlIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgc2hhcGU6IGVsZW1lbnRzMltqXS5zaGFwZSB8fCBlbGVtZW50c1tpXS5zaGFwZSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHRleHRDb250ZW50OiBlbGVtZW50czJbal0udGV4dENvbnRlbnQgfHwgZWxlbWVudHNbaV0udGV4dENvbnRlbnQgfHxcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnRzMltqXS50aXRsZSB8fCBlbGVtZW50czJbal0uZGlzcGxheU5hbWUgfHwgZWxlbWVudHNbaV0udGl0bGUgfHxcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnRzW2ldLmRpc3BsYXlOYW1lIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgcG9pbnRzOiBlbGVtZW50czJbal0ucG9pbnRzIHx8IGVsZW1lbnRzW2ldLnBvaW50cyB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIGRpZmY6IGNhbGN1bGF0ZUVsZW1lbnREaWZmKGVsZW1lbnRzW2ldLCBlbGVtZW50czJbal0pLFxuICAgICAgICAgICAgICBfZWxlbWVudDogZWxlbWVudHNbaV0sXG4gICAgICAgICAgICAgIF9lbGVtZW50MjogZWxlbWVudHMyW2pdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBSZW1vdmUgZm91bmQgZWxlbWVudHMgZnJvbSBzZWFyY2ggcG9sbFxuICAgICAgICAgIGVsZW1lbnRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICBlbGVtZW50czIuc3BsaWNlKGosIDEpO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICBkaWZmLnJlbW92ZWQucHVzaChlbGVtZW50c1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWxsIG5vdCBtYXRjaGVkIGVsZW1lbnRzIGZyb20gc2Vjb25kIGxpc3QgYXJlIG5ld1xuICAgIGRpZmYuYWRkZWQgPSBlbGVtZW50czIuc2xpY2UoKTtcblxuICAgIHJldHVybiBkaWZmO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgZGlmZmVyZW5jZSBiZXR3ZWVuIDIgZWxlbWVudHNcbiAgICogQHBhcmFtICB7T2JqZWN0fSBlbGVtZW50XG4gICAqIEBwYXJhbSAge09iamVjdH0gZWxlbWVudDJcbiAgICogQHJldHVybiB7T2JqZWN0fSAgICAgICAgICBEaWZmZXJlbmNlIG9iamVjdFxuICAgKi9cbiAgZnVuY3Rpb24gY2FsY3VsYXRlRWxlbWVudERpZmYoZWxlbWVudCwgZWxlbWVudDIpIHtcbiAgICB2YXIgZGlmZiA9IHtcbiAgICAgIGFkZGVkOiBbXSxcbiAgICAgIHJlbW92ZWQ6IFtdLFxuICAgICAgdXBkYXRlZDogW11cbiAgICB9O1xuXG4gICAgZm9yICh2YXIgZSBpbiBlbGVtZW50KSB7XG4gICAgICBpZiAoIWVsZW1lbnQyLmhhc093blByb3BlcnR5KGUpKSB7XG4gICAgICAgIGRpZmYucmVtb3ZlZC5wdXNoKHtrZXk6IGUsIHZhbHVlOiBlbGVtZW50W2VdfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZWxlbWVudFtlXSAhPT0gZWxlbWVudDJbZV0gJiYgaXNTdHJpbmdPck51bWJlcihlbGVtZW50W2VdKSAmJlxuICAgICAgICAgICAgaXNTdHJpbmdPck51bWJlcihlbGVtZW50MltlXSkpIHtcbiAgICAgICAgICBkaWZmLnVwZGF0ZWQucHVzaCh7a2V5OiBlLCB2YWx1ZTogZWxlbWVudDJbZV0sIG9sZDogZWxlbWVudFtlXX0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVsc2Ugbm90aGluZ1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBlbGVtZW50cyBpbiBlbGVtZW50MiB0aGF0IGFyZSBub3QgaW4gZWxlbWVudFxuICAgIGZvciAodmFyIGUyIGluIGVsZW1lbnQyKSB7XG4gICAgICBpZiAoIWVsZW1lbnQuaGFzT3duUHJvcGVydHkoZTIpKSB7XG4gICAgICAgIGRpZmYuYWRkZWQucHVzaCh7a2V5OiBlMiwgdmFsdWU6IGVsZW1lbnQyW2UyXX0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChkaWZmLmFkZGVkLmxlbmd0aCB8fCBkaWZmLnJlbW92ZWQubGVuZ3RoIHx8IGRpZmYudXBkYXRlZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBkaWZmO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgc3RyaW5nIG9yIGEgbnVtYmVyXG4gICAqIEBwYXJhbSAge09iamVjdHxTdHJpbmd8TnVtYmVyfSAgb2JqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICBUcnVlIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBhIHN0cmluZyBvciBudW1iZXJcbiAgICovXG4gIGZ1bmN0aW9uIGlzU3RyaW5nT3JOdW1iZXIob2JqKSB7XG4gICAgcmV0dXJuIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KDEpID09PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KG9iaikgfHxcbiAgICAgICAgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseSgnJykgPT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkob2JqKSk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbnRhaW5lciBmb3IgdGl0bGVzIGFuZCBjaGFuZ2VzIGxpc3RcbiAgICogQHJldHVybiB7SlF1ZXJ5fSBqUXVlcnkgb2JqZWN0XG4gICAqL1xuICBQdmpzRGlmZlZpZXdlci5wcm90b3R5cGUuaW5pdERpZmZWaWV3ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICQoJzxkaXYgY2xhc3M9XCJjaGFuZ2VzIGNoYW5nZXMtbGlzdFwiPjwvZGl2PicpLmFwcGVuZFRvKHRoaXMuJHBhbmVDZW50ZXIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgc3BlY2lmaWMgdHlwZSBjb250YWluZXJzIGZvciBjaGFuZ2VzXG4gICAqIEBwYXJhbSAge0pRdWVyeX0gJGNoYW5nZXNMaXN0XG4gICAqIEBwYXJhbSAge1N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHRpdGxlXG4gICAqIEByZXR1cm4ge0pRdWVyeX0gICAgICAgICAgICAgIENoYW5nZXMgbGlzdCBjb250YWluZXJcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5pbml0RGlmZlZpZXdMaXN0ID0gZnVuY3Rpb24oJGNoYW5nZXNMaXN0LCB0eXBlLCB0aXRsZSkge1xuICAgIHZhciAkY2hhbmdlc0NvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJjaGFuZ2VzLWNvbnRhaW5lclwiIGRhdGEtbGV2ZWw9XCIxXCIgZGF0YS10eXBlPVwiJyArXG4gICAgICAgIHR5cGUgKyAnXCI+JylcbiAgICAgIC5hcHBlbmRUbygkY2hhbmdlc0xpc3QpXG4gICAgICAuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJjaGFuZ2VzLXRpdGxlIGNoYW5nZXMtcGFyZW50IGNoYW5nZS0nICsgdHlwZSArICdcIj48c3Bhbj4nICtcbiAgICAgICAgICAgIHRpdGxlICsgJzwvc3Bhbj48L2Rpdj4nKSk7XG5cbiAgICAvLyBSZXR1cm4gY2hhbmdlcyBsaXN0IGpRdWVyeSBlbGVtZW50XG4gICAgcmV0dXJuICQoJzxkaXYgY2xhc3M9XCJjaGFuZ2VzLWxpc3RcIj48L2Rpdj4nKS5hcHBlbmRUbygkY2hhbmdlc0NvbnRhaW5lcik7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbmRlciBkaWZmZXJlbmNlcyBvZiBhIHNwZWNpZmllZCB0eXBlXG4gICAqIEdyb3VwIGRpZmZlcmVuY2VzIGJ5IGVsZW1lbnRzIHR5cGVzXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGVsZW1lbnRzRGlmZiBFbGVtZW50cyBkaWZmZXJlbmNlc1xuICAgKiBAcGFyYW0gIHtKUXVlcnl9ICRjaGFuZ2VzTGlzdCBDaGFuZ2VzIGxpc3QgY29udGFpbmVyXG4gICAqIEBwYXJhbSAge0FycmF5fSBlbGVtZW50cyAgICAgTGlzdCBvZiBlbGVtZW50c1xuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLnJlbmRlckRpZmZzT2ZUeXBlID0gZnVuY3Rpb24oXG4gICAgICB0eXBlLCBlbGVtZW50c0RpZmYsICRjaGFuZ2VzTGlzdCwgZWxlbWVudHMpIHtcbiAgICBpZiAoZWxlbWVudHNEaWZmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNvcnQgYnkgZ3BtbDplbGVtZW50IGFuZCBzaGFwZVxuICAgIHZhciBlbGVtZW50c0RpZmZTb3J0ZWQgPSBlbGVtZW50c0RpZmYuc29ydChzb3J0ZXJCeUVsbWVudEFuZFNoYXBlKTtcblxuICAgIC8vIEdyb3VwIGVsZW1lbnRzXG4gICAgdmFyIGdyb3VwcyA9IHt9O1xuICAgIHZhciBncm91cE5hbWUgPSAnJztcbiAgICB2YXIgZWxlbWVudFR5cGUgPSAnJztcbiAgICB2YXIgX3R5cGUgPSAnJztcbiAgICB2YXIgJGxpc3RDb250YWluZXIgPSBudWxsO1xuICAgIHZhciBncm91cHNPcmRlcmVkID0gW107XG5cbiAgICBmb3IgKHZhciBkIGluIGVsZW1lbnRzRGlmZlNvcnRlZCkge1xuICAgICAgZWxlbWVudFR5cGUgPSBlbGVtZW50c0RpZmZTb3J0ZWRbZF1bJ2dwbWw6ZWxlbWVudCddID9cbiAgICAgICAgICBlbGVtZW50c0RpZmZTb3J0ZWRbZF1bJ2dwbWw6ZWxlbWVudCddLnJlcGxhY2UoL15ncG1sXFw6LywgJycpIDogJyc7XG4gICAgICBfdHlwZSA9IGVsZW1lbnRzRGlmZlNvcnRlZFtkXS50eXBlID8gZWxlbWVudHNEaWZmU29ydGVkW2RdLnR5cGUgOiAnJztcblxuICAgICAgaWYgKGVsZW1lbnRUeXBlID09PSAnSW50ZXJhY3Rpb24nKSB7XG4gICAgICAgIGdyb3VwTmFtZSA9ICdJbnRlcmFjdGlvbnMnO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50VHlwZSA9PT0gJ0RhdGFOb2RlJykge1xuICAgICAgICBncm91cE5hbWUgPSAnRGF0YSBOb2Rlcyc7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnRUeXBlID09PSAnJyAmJiBfdHlwZSAhPT0gJycpIHsgLy8gQXNzdW1pbmcgaXQgaXMgYSByZWZlcmVuY2VcbiAgICAgICAgLy8gZ3JvdXBOYW1lID0gJ1JlZmVyZW5jZSdcbiAgICAgICAgY29udGludWU7XG4gICAgICB9IGVsc2UgaWYgKGVsZW1lbnRUeXBlID09PSAnR3JvdXAnKSB7XG4gICAgICAgIGdyb3VwTmFtZSA9ICdHcm91cHMnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQXNzdW1lIHRoYXQgdGhlcmUgYXJlIG5vIG90aGVyIGdyb3Vwc1xuICAgICAgICBncm91cE5hbWUgPSAnR3JhcGhpY2FsIE9iamVjdHMnO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGlzIGlzIGZpcnN0IGVsZW1lbnQgaW4gZ3JvdXAgdGhlbiBpbml0IGl0XG4gICAgICBpZiAoZ3JvdXBzW2dyb3VwTmFtZV0gPT09IHZvaWQgMCkge1xuICAgICAgICBncm91cHNbZ3JvdXBOYW1lXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICBncm91cHNbZ3JvdXBOYW1lXS5wdXNoKGVsZW1lbnRzRGlmZlNvcnRlZFtkXSk7XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIG9ubHkgaWYgYXQgbGVhc3Qgb25lIGdyb3VwIGV4aXN0c1xuICAgIGlmICghJC5pc0VtcHR5T2JqZWN0KGdyb3VwcykpIHtcbiAgICAgICRsaXN0Q29udGFpbmVyID0gdGhpcy5pbml0RGlmZlZpZXdMaXN0KCRjaGFuZ2VzTGlzdCwgdHlwZSwgdHlwZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArXG4gICAgICAgICAgdHlwZS5zbGljZSgxKSk7XG5cbiAgICAgIC8vIENyZWF0ZSBhbiBhcnJheSBvZiBvcmRlcmVkIGdyb3Vwc1xuICAgICAgZ3JvdXBzT3JkZXJlZCA9IG9yZGVyR3JvdXBzKGdyb3Vwcyk7XG5cbiAgICAgIGZvciAodmFyIGkgaW4gZ3JvdXBzT3JkZXJlZCkge1xuICAgICAgICB0aGlzLnJlbmRlckRpZmZHcm91cChcbiAgICAgICAgICAgIHR5cGUsIGdyb3Vwc09yZGVyZWRbaV0ubmFtZSwgZ3JvdXBzT3JkZXJlZFtpXS5ncm91cCwgJGxpc3RDb250YWluZXIsIGVsZW1lbnRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqIEB0eXBlIHtBcnJheX0gR3JvdXBzIHJlbmRlciBvcmRlciAqL1xuICB2YXIgZ3JvdXBzT3JkZXIgPSBbJ0RhdGEgTm9kZXMnLCAnR3JvdXBzJywgJ0ludGVyYWN0aW9ucycsICdHcmFwaGljYWwgT2JqZWN0cyddO1xuXG4gIC8qKlxuICAgKiBPcmRlciBncm91cHMgYnkgZ3JvdXBzT3JkZXJcbiAgICogSWYgYSBncm91cCBpcyBub3QgaW4gZ3JvdXBzT3JkZXIgYXBwZW5kIGl0XG4gICAqIEBwYXJhbSAge09iamVjdH0gZ3JvdXBzIEFuIG9iamVjdCB3aXRoIGdyb3Vwc1xuICAgKiBAcmV0dXJuIHtBcnJheX0gICAgICAgIE9yZGVyZWQgZ3JvdXBzXG4gICAqL1xuICBmdW5jdGlvbiBvcmRlckdyb3Vwcyhncm91cHMpIHtcbiAgICB2YXIgZ3JvdXBOYW1lID0gJyc7XG4gICAgdmFyIGdyb3Vwc09yZGVyZWQgPSBbXTtcblxuICAgIC8vIEZpcnN0IGFkZCBvcmRlcmVkIGdyb3Vwc1xuICAgIGZvciAodmFyIGkgaW4gZ3JvdXBzT3JkZXIpIHtcbiAgICAgIGdyb3VwTmFtZSA9IGdyb3Vwc09yZGVyW2ldO1xuXG4gICAgICBpZiAoZ3JvdXBzLmhhc093blByb3BlcnR5KGdyb3VwTmFtZSkpIHtcbiAgICAgICAgZ3JvdXBzT3JkZXJlZC5wdXNoKHtncm91cDogZ3JvdXBzW2dyb3VwTmFtZV0sIG5hbWU6IGdyb3VwTmFtZX0pO1xuICAgICAgICBkZWxldGUgZ3JvdXBzW2dyb3VwTmFtZV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUgYXJlIHN0aWxsIGdyb3VwcywgYWRkIHRoZW0gdG8gdGhlIGVuZCBpbiBhbnkgb3JkZXJcbiAgICBmb3IgKGdyb3VwTmFtZSBpbiBncm91cHMpIHtcbiAgICAgIGdyb3Vwc09yZGVyZWQucHVzaCh7Z3JvdXA6IGdyb3Vwc1tncm91cE5hbWVdLCBuYW1lOiBncm91cE5hbWV9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ3JvdXBzT3JkZXJlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgYSBncm91cFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtICB7U3RyaW5nfSBncm91cE5hbWVcbiAgICogQHBhcmFtICB7QXJyYXl9IGdyb3VwRWxlbWVudHNcbiAgICogQHBhcmFtICB7SlF1ZXJ5fSAkbGlzdENvbnRhaW5lclxuICAgKiBAcGFyYW0gIHtBcnJheX0gZWxlbWVudHMgIExpc3Qgb2YgYWxsIGVsZW1lbnRzLlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFVzZWQgdG8gZ2V0IGVsZW1lbnRzIHRpdGxlcyAocmVwbGFjaW5nIGlkcylcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5yZW5kZXJEaWZmR3JvdXAgPSBmdW5jdGlvbihcbiAgICAgIHR5cGUsIGdyb3VwTmFtZSwgZ3JvdXBFbGVtZW50cywgJGxpc3RDb250YWluZXIsIGVsZW1lbnRzKSB7XG4gICAgdmFyICRjb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwiY2hhbmdlcy1jb250YWluZXJcIiBkYXRhLWxldmVsPVwiMlwiIGRhdGEtdHlwZT1cIicgKyB0eXBlICsgJ1wiLz4nKVxuICAgICAgLmFwcGVuZFRvKCRsaXN0Q29udGFpbmVyKTtcbiAgICB2YXIgJGNvbnRhaW5lclRpdGxlID0gJCgnPGRpdiBjbGFzcz1cImNoYW5nZXMtdGl0bGUgY2hhbmdlcy1wYXJlbnQgY2hhbmdlLScgKyB0eXBlICtcbiAgICAgICAgJ1wiPjxzcGFuPicgKyBncm91cE5hbWUgKyAnPC9zcGFuPjwvZGl2PicpXG4gICAgICAuYXBwZW5kVG8oJGNvbnRhaW5lcilcbiAgICAgIC5kYXRhKCdncm91cCcsIGdyb3VwTmFtZSk7XG4gICAgdmFyICRjb250YWluZXJMaXN0ID0gJCgnPGRpdiBjbGFzcz1cImNoYW5nZXMtbGlzdFwiIC8+JykuYXBwZW5kVG8oJGNvbnRhaW5lcik7XG4gICAgdmFyIGVsZW1lbnRUaXRsZSA9ICcnO1xuICAgIHZhciAkZWxlbWVudENvbnRhaW5lcjtcbiAgICB2YXIgJGVsZW1lbnRUaXRsZTtcbiAgICB2YXIgZWxlbWVudENoYW5nZXMgPSBudWxsO1xuICAgIHZhciAkZWxlbWVudENoYW5nZXM7XG5cbiAgICAvLyBTb3J0IGdyb3VwIGVsZW1lbnRzXG4gICAgZ3JvdXBFbGVtZW50cyA9IGdyb3VwRWxlbWVudHMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICByZXR1cm4gZ2V0RWxlbWVudFRpdGxlKGEsIGVsZW1lbnRzKS50b0xvd2VyQ2FzZSgpID5cbiAgICAgICAgICBnZXRFbGVtZW50VGl0bGUoYiwgZWxlbWVudHMpLnRvTG93ZXJDYXNlKCkgPyAxIDogLTE7XG4gICAgfSk7XG5cbiAgICAvLyBSZW5kZXIgZWxlbWVudHNcbiAgICBmb3IgKHZhciBlIGluIGdyb3VwRWxlbWVudHMpIHtcbiAgICAgIGVsZW1lbnRUaXRsZSA9IGdldEVsZW1lbnRUaXRsZShncm91cEVsZW1lbnRzW2VdLCBlbGVtZW50cyk7XG5cbiAgICAgICRlbGVtZW50Q29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cImNoYW5nZXMtY29udGFpbmVyXCIgZGF0YS1sZXZlbD1cIjNcIiBkYXRhLXR5cGU9XCInICtcbiAgICAgICAgICB0eXBlICsgJ1wiLz4nKVxuICAgICAgICAuYXBwZW5kVG8oJGNvbnRhaW5lckxpc3QpO1xuICAgICAgJGVsZW1lbnRUaXRsZSA9ICQoJzxkaXYgY2xhc3M9XCJjaGFuZ2VzLXRpdGxlIGNoYW5nZS0nICsgdHlwZSArXG4gICAgICAgICAgJ1wiPjxzcGFuPicgKyBlbGVtZW50VGl0bGUgKyAnPC9zcGFuPjwvZGl2PicpXG4gICAgICAgIC5hcHBlbmRUbygkZWxlbWVudENvbnRhaW5lcik7XG5cbiAgICAgIGVsZW1lbnRDaGFuZ2VzID0gdGhpcy5nZXRFbGVtZW50Q2hhbmdlcyh0eXBlLCBncm91cEVsZW1lbnRzW2VdLCBlbGVtZW50cyk7XG5cbiAgICAgIC8vIFJlbmRlciBlbGVtZW50IGNoYW5nZXMgKGlmIGFueSlcbiAgICAgIGlmIChlbGVtZW50Q2hhbmdlcyAmJiBlbGVtZW50Q2hhbmdlcy5sZW5ndGgpIHtcbiAgICAgICAgJGVsZW1lbnRDaGFuZ2VzID0gJCgnPHVsIGNsYXNzPVwiZWxlbWVudC1jaGFuZ2VzXCI+PC91bD4nKTtcbiAgICAgICAgZm9yICh2YXIgY2hhbmdlIGluIGVsZW1lbnRDaGFuZ2VzKSB7XG4gICAgICAgICAgJGVsZW1lbnRDaGFuZ2VzLmFwcGVuZCgnPGxpPicgKyBlbGVtZW50Q2hhbmdlc1tjaGFuZ2VdICsgJzwvbGk+Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAkZWxlbWVudENoYW5nZXMuYXBwZW5kVG8oJGVsZW1lbnRUaXRsZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFN0b3JlIGlkIGFuZCBncm91cFxuICAgICAgJGVsZW1lbnRUaXRsZVxuICAgICAgICAuZGF0YSgnaWQnLCBncm91cEVsZW1lbnRzW2VdLmlkKVxuICAgICAgICAuZGF0YSgnZ3JvdXAnLCBncm91cE5hbWUpO1xuXG4gICAgICAvLyBUT0RPIG9ubHkgZm9yIGRlYnVnIHB1cnBvc2VcbiAgICAgICRlbGVtZW50VGl0bGVbMF0ucHZqc29uID0gZ3JvdXBFbGVtZW50c1tlXTtcblxuICAgICAgLy8gQ2FjaGUgZWxlbWVudFxuICAgICAgdGhpcy5jYWNoZUVsZW1lbnQodHlwZSwgZ3JvdXBOYW1lLCBncm91cEVsZW1lbnRzW2VdLmlkKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENhY2hlIGVsZW1lbnQgaWQgYmFzZWQgb24gdHlwZSBhbmQgZ3JvdXBcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSAge1N0cmluZ30gZ3JvdXBcbiAgICogQHBhcmFtICB7U3RyaW5nfSBlbGVtZW50SWRcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5jYWNoZUVsZW1lbnQgPSBmdW5jdGlvbih0eXBlLCBncm91cCwgZWxlbWVudElkKSB7XG4gICAgLy8gQ3JlYXRlIGdyb3VwIGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAgaWYgKHRoaXMuZWxlbWVudHNDYWNoZVt0eXBlXVtncm91cF0gPT09IHZvaWQgMCkge1xuICAgICAgdGhpcy5lbGVtZW50c0NhY2hlW3R5cGVdW2dyb3VwXSA9IFtdO1xuICAgIH1cblxuICAgIC8vIEFkZCBlbGVtZW50IHRvIGdyb3VwXG4gICAgdGhpcy5lbGVtZW50c0NhY2hlW3R5cGVdW2dyb3VwXS5wdXNoKGVsZW1lbnRJZCk7XG5cbiAgICAvLyBSZWZlcmVuY2VcbiAgICBpZiAoZ3JvdXAgPT09ICdSZWZlcmVuY2UnKSB7XG4gICAgICB0aGlzLmVsZW1lbnRzUmVmZXJlbmNlc1tlbGVtZW50SWRdID0gdHJ1ZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBhbiBhcnJheSBvZiBlbGVtZW50cyBpZHMgYmFzZWQgb24gdHlwZSBhbmQgZ3JvdXBcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSAge1N0cmluZ30gZ3JvdXBcbiAgICogQHJldHVybiB7QXJyYXl9ICAgICAgIEFycmF5IG9mIGlkc1xuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmdldEFsbEVsZW1lbnRzSWRzID0gZnVuY3Rpb24odHlwZSwgZ3JvdXApIHtcbiAgICBpZiAodHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB2b2lkIDApIHtcbiAgICAgIC8vIEdldCBhbGwgdHlwZXNcbiAgICAgIHJldHVybiBbXS5jb25jYXQodGhpcy5nZXRBbGxFbGVtZW50c0lkcygnYWRkZWQnKSxcbiAgICAgICAgICB0aGlzLmdldEFsbEVsZW1lbnRzSWRzKCd1cGRhdGVkJyksXG4gICAgICAgICAgdGhpcy5nZXRBbGxFbGVtZW50c0lkcygncmVtb3ZlZCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGdyb3VwID09PSBudWxsIHx8IGdyb3VwID09PSB2b2lkIDApIHtcbiAgICAgICAgLy8gR2V0IGFsbCBncm91cHNcbiAgICAgICAgdmFyIGVsZW1lbnRzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgZ3JvdXBOYW1lIGluIHRoaXMuZWxlbWVudHNDYWNoZVt0eXBlXSkge1xuICAgICAgICAgIGVsZW1lbnRzID0gZWxlbWVudHMuY29uY2F0KHRoaXMuZ2V0QWxsRWxlbWVudHNJZHModHlwZSwgZ3JvdXBOYW1lKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBHZXQgdGhhdCBncm91cFxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50c0NhY2hlW3R5cGVdW2dyb3VwXS5zbGljZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGVsZW1lbnQgd2l0aCBnaXZlbiBpZCBpcyBhIHJlZmVyZW5jZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBpZCBFbGVtZW50IGlkXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59ICAgIFRydWUgaWYgZWxlbWVudCBpZiBhIHJlZmVyZW5jZVxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmlzSWRSZWZlcmVuY2UgPSBmdW5jdGlvbihpZCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzUmVmZXJlbmNlc1tpZF0gPT09IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNvcnRlciBmdW5jdGlvblxuICAgKi9cbiAgZnVuY3Rpb24gc29ydGVyQnlFbG1lbnRBbmRTaGFwZShhLCBiKSB7XG4gICAgaWYgKGFbJ2dwbWw6ZWxlbWVudCddID09PSBiWydncG1sOmVsZW1lbnQnXSkge1xuICAgICAgcmV0dXJuIGEuc2hhcGUgPiBiLnNoYXBlID8gMSA6IC0xO1xuICAgIH1cbiAgICBpZiAoYVsnZ3BtbDplbGVtZW50J10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBpZiAoYlsnZ3BtbDplbGVtZW50J10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHJldHVybiBhWydncG1sOmVsZW1lbnQnXSA+IGJbJ2dwbWw6ZWxlbWVudCddID8gMSA6IC0xO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBlbGVtZW50IHRpdGxlXG4gICAqIEBwYXJhbSAge09iamVjdH0gb2JqICAgICAgUHZqc29uIGVsZW1lbnRcbiAgICogQHBhcmFtICB7QXJyYXl9IGVsZW1lbnRzIEFycmF5IG9mIHB2anNvbiBlbGVtZW50c1xuICAgKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgIEVsZW1lbnQgdGl0bGVcbiAgICovXG4gIGZ1bmN0aW9uIGdldEVsZW1lbnRUaXRsZShvYmosIGVsZW1lbnRzKSB7XG4gICAgaWYgKG9ialsnZ3BtbDplbGVtZW50J10gPT09ICdncG1sOkludGVyYWN0aW9uJykge1xuICAgICAgcmV0dXJuICcnICsgbG9va3VwVGl0bGVCeUlkKG9iai5wb2ludHNbMF0uaXNBdHRhY2hlZFRvLCBlbGVtZW50cykgK1xuICAgICAgICAnIDxpIGNsYXNzPVwiaWNvbiBpY29uLWFycm93LXJpZ2h0XCI+PC9pPiAnICtcbiAgICAgICAgbG9va3VwVGl0bGVCeUlkKG9iai5wb2ludHNbMV0uaXNBdHRhY2hlZFRvLCBlbGVtZW50cyk7XG4gICAgfSBlbHNlIGlmIChvYmpbJ2dwbWw6ZWxlbWVudCddID09PSAnZ3BtbDpEYXRhTm9kZScpIHtcbiAgICAgIHJldHVybiBvYmoudGV4dENvbnRlbnQ7XG4gICAgfSBlbHNlIGlmIChvYmpbJ2dwbWw6ZWxlbWVudCddID09PSAnZ3BtbDpMYWJlbCcpIHtcbiAgICAgIHJldHVybiBvYmoudGV4dENvbnRlbnQ7XG4gICAgfSBlbHNlIGlmIChvYmpbJ2dwbWw6ZWxlbWVudCddID09PSAnZ3BtbDpTaGFwZScpIHtcbiAgICAgIHJldHVybiBvYmouc2hhcGUuc2xpY2UoMCwgMSkudG9VcHBlckNhc2UoKSArIG9iai5zaGFwZS5zbGljZSgxKTtcbiAgICB9IGVsc2UgaWYgKG9ialsnZ3BtbDplbGVtZW50J10gPT09ICdncG1sOkdyYXBoaWNhbExpbmUnKSB7XG4gICAgICByZXR1cm4gJ0dyYXBoaWNhbCBsaW5lJztcbiAgICB9IGVsc2UgaWYgKG9ialsnZ3BtbDplbGVtZW50J10gPT09ICdncG1sOlN0YXRlJykge1xuICAgICAgcmV0dXJuICdTdGF0ZSAnICsgb2JqLnRleHRDb250ZW50ICsgJyAoJyArIGxvb2t1cFRpdGxlQnlJZChvYmouaXNBdHRhY2hlZFRvLCBlbGVtZW50cykgKyAnKSc7XG4gICAgfSBlbHNlIGlmIChvYmpbJ2dwbWw6ZWxlbWVudCddID09PSAnZ3BtbDpHcm91cCcpIHtcbiAgICAgIHJldHVybiAnR3JvdXAnO1xuICAgIH0gZWxzZSBpZiAob2JqLnR5cGUgIT09IHZvaWQgMCkgeyAvLyBBc3N1bWUgaXQgaXMgYSByZWZlcmVuY2VcbiAgICAgIHJldHVybiBvYmoudGV4dENvbnRlbnQgfHwgb2JqLnRpdGxlIHx8IG9iai5kaXNwbGF5TmFtZSB8fCAnbm8gdGl0bGUnO1xuICAgIH1cblxuICAgIHJldHVybiAnbm8gdGl0bGUnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aXRsZSBvZiBlbGVtZW50IHdpdGggZ2l2ZW4gaWRcbiAgICogQHBhcmFtICB7U3RyaW5nfSBpZFxuICAgKiBAcGFyYW0gIHtBcnJheX0gZWxlbWVudHMgQXJyYXkgb2YgcHZqc29uIGVsZW1lbnRzXG4gICAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgICAgRWxlbWVudCB0aXRsZVxuICAgKi9cbiAgZnVuY3Rpb24gbG9va3VwVGl0bGVCeUlkKGlkLCBlbGVtZW50cykge1xuICAgIC8vIElmIGVsZW1lbnQgaGFzIG5vIGlkIHRoZW4gc3RvcCBsb29rdXBcbiAgICBpZiAoaWQgPT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuICdVbmtub3duJztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBsIGluIGVsZW1lbnRzKSB7XG4gICAgICBpZiAoZWxlbWVudHNbbF0uaWQgIT09IG51bGwgJiYgaWQgPT09IGVsZW1lbnRzW2xdLmlkKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGl0IGlzIGFuIGludGVyYWN0aW9uIHRvIGF2b2lkIGNpcmN1bGFyIHJlY3Vyc2lvblxuICAgICAgICBpZiAoZWxlbWVudHNbbF1bJ2dwbWw6ZWxlbWVudCddID09PSAnZ3BtbDpJbnRlcmFjdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gJ0ludGVyYWN0aW9uJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZ2V0RWxlbWVudFRpdGxlKGVsZW1lbnRzW2xdLCBlbGVtZW50cyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJZiBubyBtYXRjaCBmb3VuZCB0aGVuIHJldHVybiBpbml0aWFsIElEXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgdmFyIG5vcm1hbGl6YXRpb25GbG9hdEtleXMgPSBbJ3dpZHRoJywgJ2hlaWdodCcsICd4JywgJ3knLCAncm90YXRpb24nXTtcbiAgdmFyIG5vcm1hbGl6YXRpb25JZEtleXMgPSBbJ2lzUGFydE9mJywgJ2NvbnRyb2xsZXInLCAnY29udHJvbGxlZCddO1xuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgdmFsdWVzOlxuICAgKiAqIFJvdW5kIG51bWJlcnNcbiAgICogKiBSZXBsYWNlIGlkcyB3aXRoIGVsZW1lbnRzIHRpdGxlc1xuICAgKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSB2YWx1ZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGtleVxuICAgKiBAcGFyYW0gIHtBcnJheX0gZWxlbWVudHMgQXJyYXkgb2YgcHZqc29uIGVsZW1lbnRzXG4gICAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9ICAgICAgICAgIE5vcm1hbGl6ZWQgdGl0bGVcbiAgICovXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlLCBrZXksIGVsZW1lbnRzKSB7XG4gICAgaWYgKG5vcm1hbGl6YXRpb25GbG9hdEtleXMuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQocGFyc2VGbG9hdCh2YWx1ZSkgKiAxMDApIC8gMTAwO1xuICAgIH0gZWxzZSBpZiAobm9ybWFsaXphdGlvbklkS2V5cy5pbmRleE9mKGtleSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gbG9va3VwVGl0bGVCeUlkKHZhbHVlLCBlbGVtZW50cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGVsZW1lbnQgY2hhbmdlc1xuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtICB7T2JqZWN0fSBlbGVtZW50ICBQdmpzb24gZWxlbWVudFxuICAgKiBAcGFyYW0gIHtBcnJheX0gZWxlbWVudHMgQXJyYXkgb2YgcHZqc29uIGVsZW1lbnRzXG4gICAqIEByZXR1cm4ge0FycmF5fSAgICAgICAgICBBcnJheSBvZiBzdHJpbmdzIChjaGFuZ2VzIHRpdGxlcylcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5nZXRFbGVtZW50Q2hhbmdlcyA9IGZ1bmN0aW9uKHR5cGUsIGVsZW1lbnQsIGVsZW1lbnRzKSB7XG4gICAgdmFyIHRpdGxlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGUgPT09ICdhZGRlZCcpIHtcbiAgICAgIGlmIChlbGVtZW50Lmhhc093blByb3BlcnR5KCdlbnRpdHlSZWZlcmVuY2UnKSkge1xuICAgICAgICB0aXRsZXMucHVzaCgnQWRkZWQgPHN0cm9uZz5yZWZlcmVuY2U8L3N0cm9uZz46ICcgKyBlbGVtZW50LmVudGl0eVJlZmVyZW5jZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAndXBkYXRlZCcpIHtcbiAgICAgIHZhciBvbGRWYWx1ZSA9ICcnO1xuICAgICAgdmFyIG5ld1ZhbHVlID0gJyc7XG4gICAgICB2YXIgZGlmZiA9IGVsZW1lbnQuZGlmZjtcblxuICAgICAgZm9yICh2YXIgYWRkZWRJbmRleCBpbiBkaWZmLmFkZGVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gbm9ybWFsaXplVmFsdWUoZGlmZi5hZGRlZFthZGRlZEluZGV4XS52YWx1ZSxcbiAgICAgICAgICAgIGRpZmYuYWRkZWRbYWRkZWRJbmRleF0ua2V5LFxuICAgICAgICAgICAgZWxlbWVudHMpO1xuICAgICAgICB0aXRsZXMucHVzaCgnQWRkZWQ6IDxzdHJvbmc+JyArIGRpZmYuYWRkZWRbYWRkZWRJbmRleF0ua2V5ICsgJzwvc3Ryb25nPiAnICsgbmV3VmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciByZW1vdmVkSW5kZXggaW4gZGlmZi5yZW1vdmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gbm9ybWFsaXplVmFsdWUoZGlmZi5yZW1vdmVkW3JlbW92ZWRJbmRleF0udmFsdWUsXG4gICAgICAgICAgICBkaWZmLnJlbW92ZWRbcmVtb3ZlZEluZGV4XS5rZXksXG4gICAgICAgICAgICBlbGVtZW50cyk7XG4gICAgICAgIHRpdGxlcy5wdXNoKCdSZW1vdmVkOiA8c3Ryb25nPicgKyBkaWZmLnJlbW92ZWRbcmVtb3ZlZEluZGV4XS5rZXkgKyAnPC9zdHJvbmc+ICcgKyBuZXdWYWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIHVwZGF0ZWRJbmRleCBpbiBkaWZmLnVwZGF0ZWQpIHtcbiAgICAgICAgb2xkVmFsdWUgPSBub3JtYWxpemVWYWx1ZShkaWZmLnVwZGF0ZWRbdXBkYXRlZEluZGV4XS5vbGQsXG4gICAgICAgICAgICBkaWZmLnVwZGF0ZWRbdXBkYXRlZEluZGV4XS5rZXksXG4gICAgICAgICAgICBlbGVtZW50cyk7XG4gICAgICAgIG5ld1ZhbHVlID0gbm9ybWFsaXplVmFsdWUoZGlmZi51cGRhdGVkW3VwZGF0ZWRJbmRleF0udmFsdWUsXG4gICAgICAgICAgICBkaWZmLnVwZGF0ZWRbdXBkYXRlZEluZGV4XS5rZXksXG4gICAgICAgICAgICBlbGVtZW50cyk7XG5cbiAgICAgICAgdGl0bGVzLnB1c2goJzxzdHJvbmc+JyArIGRpZmYudXBkYXRlZFt1cGRhdGVkSW5kZXhdLmtleSArICc6PC9zdHJvbmc+ICcgKyBvbGRWYWx1ZSArXG4gICAgICAgICAgICAnIDxpIGNsYXNzPVwiaWNvbiBpY29uLWFycm93LXJpZ2h0XCI+PC9pPiAnICsgbmV3VmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aXRsZXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhvb2sgY2xpY2tpbmcgb24gZGlmZlZpZXdlcmUgb2YgdXNpbmcgYXJyb3cga2V5cyB3aGVuIGRpZmZWaWV3ZXJlIGlzIGFjdGl2ZVxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmhvb2tEaWZmTmF2aWdhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkcGFuZUNlbnRlciA9IHRoaXMuJHBhbmVDZW50ZXI7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBpc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICB2YXIgaW5pdGlhbFpvb20gPSB0aGlzLnB2anMuZ2V0Wm9vbSgpO1xuICAgIHZhciBpbml0aWFsWm9vbTIgPSB0aGlzLnB2anMyLmdldFpvb20oKTtcblxuICAgIC8vdGhpcy5pbml0SGlnaGxpZ2h0aW5nKCk7XG5cbiAgICAkcGFuZUNlbnRlci5vbignY2xpY2snLCAnLmNoYW5nZXMtdGl0bGUnLCBmdW5jdGlvbihldikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBpc0ZvY3VzZWQgPSB0cnVlO1xuXG4gICAgICAvLyBWaXN1YWxseSBvcGVuaW5nL2Nsb3NpbmcgdGl0bGVzXG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgdmFyICRhY3RpdmUgPSAkdGhpcztcblxuICAgICAgLy8gT25seSBpZiBlbGVtZW50IGlzIG5vdCBhY3RpdmVcbiAgICAgIGlmICghJHRoaXMucGFyZW50KCkuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICRwYW5lQ2VudGVyLmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICRwYW5lQ2VudGVyLmZpbmQoJy5vcGVuJykucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgJHBhbmVDZW50ZXIuZmluZCgnLmZvY3VzJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgICAgICR0aGlzLnBhcmVudCgpLmFkZENsYXNzKCdhY3RpdmUgZm9jdXMnKTtcbiAgICAgICAgJHRoaXMucGFyZW50c1VudGlsKCRwYW5lQ2VudGVyKS5hZGRDbGFzcygnb3BlbicpO1xuXG4gICAgICAgIC8vIEF0dGVudWF0ZSBhbGwgcHJldmlvdXMgZWxlbWVudHNcbiAgICAgICAgdGhhdC5hdHRlbnVhdGUoKTtcblxuICAgICAgICAvLyBIaWdobGlnaHQgc2VsZWN0ZWRcbiAgICAgICAgdGhhdC5oaWdobGlnaHRJZHModGhhdC5nZXRUaXRsZUlkcygkYWN0aXZlKSwgZ2V0VGl0bGVUeXBlKCRhY3RpdmUpKTtcbiAgICAgIH1cbiAgICB9KS5vbignZGJsY2xpY2snLCAnLmNoYW5nZXMtdGl0bGUnLCBmdW5jdGlvbihldikge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICB0aGF0Lnpvb21Ub1RpdGxlKCQodGhpcyksIGluaXRpYWxab29tLCBpbml0aWFsWm9vbTIpO1xuICAgIH0pO1xuXG4gICAgdmFyIGtleXNNYXAgPSB7XG4gICAgICAzNzogJ2xlZnQnLFxuICAgICAgMzg6ICd1cCcsXG4gICAgICAzOTogJ3JpZ2h0JyxcbiAgICAgIDQwOiAnZG93bidcbiAgICB9O1xuXG4gICAgJChkb2N1bWVudClcbiAgICAgIC5jbGljayhmdW5jdGlvbihldikge1xuICAgICAgICBpc0ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgJHBhbmVDZW50ZXIuZmluZCgnLmZvY3VzJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgICB9KVxuICAgICAgLmtleWRvd24oZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgaWYgKCFpc0ZvY3VzZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2LmtleUNvZGUgPCAzNyB8fCBldi5rZXlDb2RlID4gNDApIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICB0aGF0Lm5hdmlnYXRlKGtleXNNYXBbZXYua2V5Q29kZV0pO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgY2hhbmdlIHR5cGUgZnJvbSBqUXVlcnkgdGl0bGVcbiAgICogQHBhcmFtICB7SlF1ZXJ5fSAkYWN0aXZlIENoYW5nZSB0aXRsZVxuICAgKiBAcmV0dXJuIHtTdHJpbmd8TnVsbH0gICAgICAgICBDaGFuZ2UgdHlwZVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0VGl0bGVUeXBlKCRhY3RpdmUpIHtcbiAgICBpZiAoJGFjdGl2ZS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiAkYWN0aXZlLnBhcmVudCgpLmRhdGEoJ3R5cGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpZCBvZiBjaGFuZ2UgdGl0bGUuXG4gICAqIElmIGl0IGlzIGEgcGFyZW50IHRpdGxlIHRoZW4gZ2V0IGlkcyBvZiBjaGFuZ2UgdGl0bGUgYW5kIGFsbCBpdHMgY2hpbGRyZW5cbiAgICogQHBhcmFtICB7SlF1ZXJ5fSAkYWN0aXZlIENoYW5nZSB0aXRsZVxuICAgKiBAcmV0dXJuIHtBcnJheX0gICAgICAgICBBcnJheSBvZiBwdmpzb24gZWxlbWVudHMgaWRzXG4gICAqL1xuICBQdmpzRGlmZlZpZXdlci5wcm90b3R5cGUuZ2V0VGl0bGVJZHMgPSBmdW5jdGlvbigkYWN0aXZlKSB7XG4gICAgdmFyIGlkcyA9IFtdO1xuICAgIGlmICgkYWN0aXZlLmxlbmd0aCkge1xuICAgICAgdmFyIGxldmVsID0gKyRhY3RpdmUucGFyZW50KCkuZGF0YSgnbGV2ZWwnKTtcbiAgICAgIHZhciB0eXBlID0gZ2V0VGl0bGVUeXBlKCRhY3RpdmUpO1xuICAgICAgdmFyIGdyb3VwID0gbnVsbDtcbiAgICAgIHZhciBpZCA9IG51bGw7XG5cbiAgICAgIGlmIChsZXZlbCA9PT0gMSkge1xuICAgICAgICAvLyBncm91cCBhbmQgaWQgPSBudWxsXG4gICAgICB9IGVsc2UgaWYgKGxldmVsID09PSAyKSB7XG4gICAgICAgIGdyb3VwID0gJGFjdGl2ZS5kYXRhKCdncm91cCcpO1xuICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gMykge1xuICAgICAgICBncm91cCA9ICRhY3RpdmUuZGF0YSgnZ3JvdXAnKTtcbiAgICAgICAgaWQgPSAkYWN0aXZlLmRhdGEoJ2lkJyk7XG4gICAgICB9XG5cbiAgICAgIGlkcyA9IHRoaXMuZ2V0SWRzKHR5cGUsIGdyb3VwLCBpZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkcztcbiAgfTtcblxuICAvKipcbiAgICogR2V0IGlkcyBvZiBlbGVtZW50IGJ5IHR5cGUsIGdyb3VwIGFuZCBlbGVtZW50IGlkXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGdyb3VwXG4gICAqIEBwYXJhbSAge1N0cmluZ30gaWRcbiAgICogQHJldHVybiB7QXJyYXl9ICAgICAgIEFycmF5IG9mIHB2anNvbiBlbGVtZW50cyBpZHNcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5nZXRJZHMgPSBmdW5jdGlvbih0eXBlLCBncm91cCwgaWQpIHtcbiAgICB2YXIgaWRzID0gW107XG4gICAgaWYgKHR5cGUgJiYgZ3JvdXAgJiYgaWQpIHtcbiAgICAgIGlkcyA9IFtpZF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlkcyA9IHRoaXMuZ2V0QWxsRWxlbWVudHNJZHModHlwZSwgZ3JvdXApO1xuICAgIH1cblxuICAgIHJldHVybiBpZHM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhpZ2hsaWdodCBwdmpzb24gZWxlbWVudHMgYnkgaWRzXG4gICAqIEBwYXJhbSAge0FycmF5fSBpZHMgIEFycmF3IG9mIHB2anNvbiBlbGVtZW50cyBpZHNcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0eXBlIENoYW5nZXMgdHlwZVxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmhpZ2hsaWdodElkcyA9IGZ1bmN0aW9uKGlkcywgdHlwZSkge1xuICAgIHZhciBjb2xvcnMgPSB7fTtcblxuICAgIGlmICh0eXBlID09PSAnYWRkZWQnKSB7XG4gICAgICBjb2xvcnMuYmFja2dyb3VuZENvbG9yID0gY29sb3JzLmJvcmRlckNvbG9yID0gJyMwRTUzQTcnO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3VwZGF0ZWQnKSB7XG4gICAgICBjb2xvcnMuYmFja2dyb3VuZENvbG9yID0gY29sb3JzLmJvcmRlckNvbG9yID0gJyNGRkY3MDAnO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3JlbW92ZWQnKSB7XG4gICAgICBjb2xvcnMuYmFja2dyb3VuZENvbG9yID0gY29sb3JzLmJvcmRlckNvbG9yID0gJyNGMTAwMjYnO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgaW4gaWRzKSB7XG4gICAgICB2YXIgaGlnaGxpZ2h0U3RyaW5nO1xuICAgICAgLy8gSWYgaXMgYSByZWZlcmVuY2VcbiAgICAgIGlmICh0aGlzLmlzSWRSZWZlcmVuY2UoaWRzW2ldKSkge1xuICAgICAgICBoaWdobGlnaHRTdHJpbmcgPSAneHJlZjppZDonICsgaWRzW2ldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGlnaGxpZ2h0U3RyaW5nID0gJyMnICsgaWRzW2ldO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZSA9PT0gJ3JlbW92ZWQnIHx8IHR5cGUgPT09ICd1cGRhdGVkJykge1xuICAgICAgICB0aGlzLnB2anMuaGlnaGxpZ2h0KGhpZ2hsaWdodFN0cmluZywgbnVsbCwgY29sb3JzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSAndXBkYXRlZCcgfHwgdHlwZSA9PT0gJ2FkZGVkJykge1xuICAgICAgICB0aGlzLnB2anMyLmhpZ2hsaWdodChoaWdobGlnaHRTdHJpbmcsIG51bGwsIGNvbG9ycyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBIaWdobGlnaHQgYWxsIHB2anNvbiBlbGVtZW50cyB0aGF0IGhhdmUgY2hhbmdlcyBvZiBwcm92aWRlZCB0eXBlXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdHlwZSBDaGFuZ2UgdHlwZVxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmhpZ2hsaWdodFR5cGUgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgdGhpcy5oaWdobGlnaHRJZHModGhpcy5nZXRJZHModHlwZSksIHR5cGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIaWdobGlnaHQgYWxsIGNoYW5nZXMgb2YgYSBjaGFuZ2UgdGl0bGVcbiAgICogQHBhcmFtICB7alF1ZXJ5fSAkYWN0aXZlIENoYW5nZSB0aXRsZVxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmhpZ2hsaWdodFRpdGxlID0gZnVuY3Rpb24oJGFjdGl2ZSkge1xuICAgIHRoaXMuaGlnaGxpZ2h0SWRzKHRoaXMuZ2V0VGl0bGVJZHMoJGFjdGl2ZSksIGdldFRpdGxlVHlwZSgkYWN0aXZlKSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFpvb20gYW5kIHBhbiBwYXRod2F5cyBpbiBzdWNoIGEgd2F5IHRoYXQgZWxlbWVudHNcbiAgICogZnJvbSBjaGFuZ2VzIHRpdGxlIHdpbGwgYmUgZm9jdXNlZCAobWF4aW1hbGx5IHZpc2libGUpXG4gICAqIEBwYXJhbSAge0pRdWVyeX0gJGFjdGl2ZSAgICAgICBDaGFuZ2UgdGl0bGVcbiAgICogQHBhcmFtICB7RmxvYXR9IHJlbGF0aXZlWm9vbTEgMS9Jbml0aWFsIHpvb20gb2YgZmlyc3QgcGF0aHdheVxuICAgKiBAcGFyYW0gIHtGbG9hdH0gcmVsYXRpdmVab29tMiAxL0luaXRpYWwgem9vbSBvZiBzZWNvbmQgcGF0aHdheVxuICAgKiBAcmV0dXJuIHtbdHlwZV19ICAgICAgICAgICAgICAgW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLnpvb21Ub1RpdGxlID0gZnVuY3Rpb24oJGFjdGl2ZSwgcmVsYXRpdmVab29tMSwgcmVsYXRpdmVab29tMikge1xuICAgIGlmIChyZWxhdGl2ZVpvb20xID09PSB2b2lkIDApIHtcbiAgICAgIHJlbGF0aXZlWm9vbTEgPSAxO1xuICAgIH1cbiAgICBpZiAocmVsYXRpdmVab29tMiA9PT0gdm9pZCAwKSB7XG4gICAgICByZWxhdGl2ZVpvb20yID0gMTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9IGdldFRpdGxlVHlwZSgkYWN0aXZlKTtcbiAgICB2YXIgcmVsYXRpdmVab29tID0gdHlwZSA9PT0gJ2FkZGVkJyA/IHJlbGF0aXZlWm9vbTIgOiByZWxhdGl2ZVpvb20xO1xuICAgIHZhciB6b29tID0gcmVsYXRpdmVab29tO1xuICAgIHZhciBwdmpzID0gdHlwZSA9PT0gJ2FkZGVkJyA/IHRoaXMucHZqczIgOiB0aGlzLnB2anM7XG4gICAgdmFyIHNlbGVjdG9yID0gcHZqcy5nZXRTb3VyY2VEYXRhKCkuc2VsZWN0b3I7XG4gICAgdmFyIGJCb3ggPSBzZWxlY3Rvci5nZXRCQm94KCk7XG4gICAgdmFyIGlkcyA9IHRoaXMuZ2V0VGl0bGVJZHMoJGFjdGl2ZSk7XG4gICAgdmFyIGhpZ2hsaWdodFNlbGVjdG9yID0gc2VsZWN0b3IuZmlsdGVyZWRCeUNhbGxiYWNrKGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIHJldHVybiAoZWxlbWVudC5pZCAhPT0gdm9pZCAwICYmIGlkcy5pbmRleE9mKGVsZW1lbnQuaWQpICE9PSAtMSk7XG4gICAgfSk7XG4gICAgdmFyIGhpZ2hsaWdodEJCb3ggPSBoaWdobGlnaHRTZWxlY3Rvci5nZXRCQm94KCk7XG5cbiAgICAvLyBJZiB1cGRhdGVkIGdldCBCQm94IG9mIGVsZW1lbnQgZnJvbSBib3RoIHNjcmVlbnNcbiAgICBpZiAodHlwZSA9PT0gJ3VwZGF0ZWQnKSB7XG4gICAgICBoaWdobGlnaHRTZWxlY3RvciA9IHRoaXMucHZqczIuZ2V0U291cmNlRGF0YSgpLnNlbGVjdG9yLmZpbHRlcmVkQnlDYWxsYmFjayhmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiAoZWxlbWVudC5pZCAhPT0gdm9pZCAwICYmIGlkcy5pbmRleE9mKGVsZW1lbnQuaWQpICE9PSAtMSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBoaWdobGlnaHRCQm94MiA9IGhpZ2hsaWdodFNlbGVjdG9yLmdldEJCb3goKTtcblxuICAgICAgaGlnaGxpZ2h0QkJveC5sZWZ0ID0gTWF0aC5taW4oaGlnaGxpZ2h0QkJveC5sZWZ0LCBoaWdobGlnaHRCQm94Mi5sZWZ0KTtcbiAgICAgIGhpZ2hsaWdodEJCb3gudG9wID0gTWF0aC5taW4oaGlnaGxpZ2h0QkJveC50b3AsIGhpZ2hsaWdodEJCb3gyLnRvcCk7XG4gICAgICBoaWdobGlnaHRCQm94LnJpZ2h0ID0gTWF0aC5tYXgoaGlnaGxpZ2h0QkJveC5yaWdodCwgaGlnaGxpZ2h0QkJveDIucmlnaHQpO1xuICAgICAgaGlnaGxpZ2h0QkJveC5ib3R0b20gPSBNYXRoLm1heChoaWdobGlnaHRCQm94LmJvdHRvbSwgaGlnaGxpZ2h0QkJveDIuYm90dG9tKTtcbiAgICAgIGhpZ2hsaWdodEJCb3gud2lkdGggPSBNYXRoLmFicyhoaWdobGlnaHRCQm94LnJpZ2h0IC0gaGlnaGxpZ2h0QkJveC5sZWZ0KTtcbiAgICAgIGhpZ2hsaWdodEJCb3guaGVpZ2h0ID0gTWF0aC5hYnMoaGlnaGxpZ2h0QkJveC5ib3R0b20gLSBoaWdobGlnaHRCQm94LnRvcCk7XG4gICAgfVxuXG4gICAgem9vbSA9IHJlbGF0aXZlWm9vbSAvIChNYXRoLm1heChcbiAgICAgICAgICBoaWdobGlnaHRCQm94LndpZHRoIC8gYkJveC53aWR0aCwgaGlnaGxpZ2h0QkJveC5oZWlnaHQgLyBiQm94LmhlaWdodCkgfHxcbiAgICAgICAgMSk7XG5cbiAgICAvLyBMb3dlciB6b29tIGJ5IDMwJVxuICAgIHpvb20gKj0gMC43O1xuXG4gICAgcHZqcy56b29tKHpvb20pO1xuXG4gICAgLy8gR2V0IHJlYWwgc2V0IHpvb21cbiAgICB2YXIgYm91bmRlZFpvb20gPSBwdmpzLmdldFpvb20oKTtcblxuICAgIC8vIENlbnRlciBwdmpzIChpdCBpcyBuZWNlc3NhcnkgdG8gcGFuIGJ5IDE1IGJlY2F1c2Ugb2YgcHJldmlvdXMgem9vbSBvdXQgYnkgMzAlKVxuICAgIHZhciB4ID0gLWhpZ2hsaWdodEJCb3gubGVmdCAqIGJvdW5kZWRab29tICsgKGhpZ2hsaWdodEJCb3gud2lkdGggKiBib3VuZGVkWm9vbSAqIDAuMTUpO1xuICAgIHZhciB5ID0gLWhpZ2hsaWdodEJCb3gudG9wICogYm91bmRlZFpvb20gKyAoaGlnaGxpZ2h0QkJveC5oZWlnaHQgKiBib3VuZGVkWm9vbSAqIDAuMTUpO1xuXG4gICAgcHZqcy5wYW4oe3g6IHgsIHk6IHl9KTtcbiAgfTtcblxuICAvKipcbiAgICogTmF2aWdhdGUgdG8gcHJvdmlkZWQgZGlyZWN0aW9uLiBSZWxhdGl2ZSB0byBmb2N1c2VkIGNoYW5nZSB0aXRsZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGRpcmVjdGlvbiBOYXZpZ2F0aW9uIGRpcmVjdGlvblxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLm5hdmlnYXRlID0gZnVuY3Rpb24oZGlyZWN0aW9uKSB7XG4gICAgdmFyICRwYW5lQ2VudGVyID0gdGhpcy4kcGFuZUNlbnRlcjtcbiAgICB2YXIgJGZvY3VzZWQgPSAkcGFuZUNlbnRlci5maW5kKCcuZm9jdXMnKS5maXJzdCgpO1xuICAgIHZhciAkbmV4dCA9IG51bGw7XG4gICAgdmFyICRuZXh0VGl0bGUgPSBudWxsO1xuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3VwJyB8fCBkaXJlY3Rpb24gPT09ICdsZWZ0Jykge1xuICAgICAgLy8gUHJldmlvdXMgc2libGluZ1xuICAgICAgJG5leHQgPSAkZm9jdXNlZC5wcmV2KCk7XG5cbiAgICAgIC8vIElmIG5vIHByZXZpb3VzIHNpYmxpbmcgdGhhbiBuZXh0IGlzIHBhcmVudFxuICAgICAgaWYgKCRuZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkbmV4dCA9ICRmb2N1c2VkLnBhcmVudCgpLmNsb3Nlc3QoJy5jaGFuZ2VzLWNvbnRhaW5lcicpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnZG93bicgfHwgZGlyZWN0aW9uID09PSAncmlnaHQnKSB7XG4gICAgICAvLyBGaXJzdCBjaGlsZFxuICAgICAgJG5leHQgPSAkZm9jdXNlZC5jaGlsZHJlbignLmNoYW5nZXMtbGlzdCcpLmNoaWxkcmVuKCcuY2hhbmdlcy1jb250YWluZXInKS5maXJzdCgpO1xuXG4gICAgICAvLyBOZXh0IHBhcmVudCBzaWJsaW5nIGlmIG5vIGNoaWxkc1xuICAgICAgaWYgKCRuZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkbmV4dCA9ICRmb2N1c2VkLm5leHQoKTtcblxuICAgICAgICBpZiAoJG5leHQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgJG5leHQgPSAkZm9jdXNlZC5wYXJlbnQoKS5jbG9zZXN0KCcuY2hhbmdlcy1jb250YWluZXInKS5uZXh0KCk7XG4gICAgICAgICAgaWYgKCRuZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgJG5leHQgPSAkZm9jdXNlZC5wYXJlbnQoKS5jbG9zZXN0KCcuY2hhbmdlcy1jb250YWluZXInKS5wYXJlbnQoKVxuICAgICAgICAgICAgICAuY2xvc2VzdCgnLmNoYW5nZXMtY29udGFpbmVyJykubmV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICgkbmV4dCAmJiAkbmV4dC5sZW5ndGggJiYgJG5leHQuZ2V0KDApICE9PSAkZm9jdXNlZC5nZXQoMCkpIHtcbiAgICAgICRwYW5lQ2VudGVyLmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkcGFuZUNlbnRlci5maW5kKCcub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAkcGFuZUNlbnRlci5maW5kKCcuZm9jdXMnKS5yZW1vdmVDbGFzcygnZm9jdXMnKTtcbiAgICAgICRuZXh0LmFkZENsYXNzKCdhY3RpdmUgZm9jdXMgb3BlbicpO1xuICAgICAgJG5leHQucGFyZW50c1VudGlsKCRwYW5lQ2VudGVyKS5hZGRDbGFzcygnb3BlbicpO1xuXG4gICAgICAkbmV4dFRpdGxlID0gJG5leHQuY2hpbGRyZW4oJy5jaGFuZ2VzLXRpdGxlJyk7XG5cbiAgICAgIC8vIFNjcm9sbCBkaWZmdmlld2VyIHRvIGNvbnRhaW4gZm9jdXNlZCB0aXRsZVxuICAgICAgaWYgKCRuZXh0VGl0bGUub2Zmc2V0KCkudG9wIDwgMCkge1xuICAgICAgICAkcGFuZUNlbnRlci5zY3JvbGxUb3AoJHBhbmVDZW50ZXIuc2Nyb2xsVG9wKCkgKyAkbmV4dFRpdGxlLm9mZnNldCgpLnRvcCk7XG4gICAgICB9IGVsc2UgaWYgKCRuZXh0VGl0bGUub2Zmc2V0KCkudG9wICsgJG5leHRUaXRsZS5vdXRlckhlaWdodCgpID4gJHBhbmVDZW50ZXIuaGVpZ2h0KCkpIHtcbiAgICAgICAgJHBhbmVDZW50ZXIuc2Nyb2xsVG9wKCRwYW5lQ2VudGVyLnNjcm9sbFRvcCgpICsgKCRuZXh0VGl0bGUub2Zmc2V0KCkudG9wICtcbiAgICAgICAgICAgICAgJG5leHRUaXRsZS5vdXRlckhlaWdodCgpIC0gJHBhbmVDZW50ZXIuaGVpZ2h0KCkpKTtcbiAgICAgIH1cblxuICAgICAgLy8gQXR0ZW51YXRlIGFsbCBwcmV2aW91cyBlbGVtZW50c1xuICAgICAgdGhpcy5hdHRlbnVhdGUoKTtcbiAgICAgIC8vIEhpZ2hsaWdodCBzZWxlY3RlZFxuICAgICAgdGhpcy5oaWdobGlnaHRUaXRsZSgkbmV4dC5jaGlsZHJlbignLmNoYW5nZXMtdGl0bGUnKSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGhpZ2hsaWdodGluZyBmb3IgcGF0aHdheXNcbiAgICogU3RvcmUgaGlnaGxpZ2h0ZXIgaW5zdGFuY2VzIGFzIHRoaXMuaDEgYW5kIHRoaXMuaDJcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5pbml0SGlnaGxpZ2h0aW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5oaSA9IHdpbmRvdy5wdmpzSGlnaGxpZ2h0ZXIodGhpcy5wdmpzLCB7ZGlzcGxheUlucHV0RmllbGQ6IGZhbHNlfSk7XG4gICAgdGhpcy5oaTIgPSB3aW5kb3cucHZqc0hpZ2hsaWdodGVyKHRoaXMucHZqczIsIHtkaXNwbGF5SW5wdXRGaWVsZDogZmFsc2V9KTtcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlIGhpZ2hsaWdodGluZyBmcm9tIGFsbCBlbGVtZW50c1xuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmF0dGVudWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucHZqcy5hdHRlbnVhdGUobnVsbCk7XG4gICAgdGhpcy5wdmpzMi5hdHRlbnVhdGUobnVsbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBwbHVnaW4gZ2xvYmFsbHkgYXMgcHZqc0RpZmZ2aWV3ZXJcbiAgICovXG4gIHdpbmRvdy5QdmpzRGlmZlZpZXdlciA9IFB2anNEaWZmVmlld2VyO1xufSkod2luZG93LCB3aW5kb3cualF1ZXJ5IHx8IHdpbmRvdy5aZXB0byk7XG4iXX0=
});