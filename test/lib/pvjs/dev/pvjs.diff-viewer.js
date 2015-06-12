function load(doc, src, fn) {  if (typeof doc === 'string') {    fn = src;    src = doc;    doc = document;  }  var script = doc.createElement('script');  script.type = 'text/javascript';  script.src = src;  if (fn) onLoad(script, fn);  script.onLoad = function(fn) {    return onLoad(script, fn);  };  doc.body.appendChild(script);  return script;} function polyfillLoader(polyfillServiceIri, polyfillServiceCallbackName, callback) {    window[polyfillServiceCallbackName] = function() {      return callback(null);    };    if (!!document.body) {      load(polyfillServiceIri);    } else {      var existingonreadystatechange = document.onreadystatechange;      document.onreadystatechange = function() {        if (document.readyState === 'interactive') {          if (typeof existingonreadystatechange === 'function') {            existingonreadystatechange();          }          load(polyfillServiceIri);        }      };    }  } polyfillLoader("//cdn.polyfill.io/v1/polyfill.min.js?features=Array.prototype.indexOf&callback=polyfillServiceCallbackpvjsdiffviewer", "polyfillServiceCallbackpvjsdiffviewer", function(err) {require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/diff-viewer/diff-viewer.js":[function(require,module,exports){
(function (Buffer){
var fs = require('fs');
var insertCss = require('insert-css');
var css = Buffer("LmthYXZpby1kaWZmdmlld2VyIHsKICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgaGVpZ2h0OiA1MDBweDsKICBib3JkZXI6IDFweCBzb2xpZCAjMDAwOwp9Cgoua2FhdmlvLWRpZmZ2aWV3ZXIgLnBhbmUgewogIGZsb2F0OiBsZWZ0OwogIG92ZXJmbG93OiBoaWRkZW47CiAgd2lkdGg6IDUwJTsKICBoZWlnaHQ6IDEwMCU7Cn0KCi5rYWF2aW8tZGlmZnZpZXdlciAucGFuZS5wYW5lLWxlZnQgewp9Cgoua2FhdmlvLWRpZmZ2aWV3ZXIgLnBhbmUucGFuZS1sZWZ0IC5wYW5lLWlubmVyIHsKICBtYXJnaW4tcmlnaHQ6IDEyMHB4Owp9CgoKLmthYXZpby1kaWZmdmlld2VyIC5wYW5lLnBhbmUtcmlnaHQgewp9Cgoua2FhdmlvLWRpZmZ2aWV3ZXIgLnBhbmUucGFuZS1yaWdodCAucGFuZS1pbm5lciB7CiAgbWFyZ2luLWxlZnQ6IDEyMHB4Owp9Cgoua2FhdmlvLWRpZmZ2aWV3ZXIgLnBhbmUucGFuZS1jZW50ZXIgewogIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICB0b3A6IDA7CiAgbGVmdDogNTAlOwogIHdpZHRoOiAyNDBweDsKICBtYXJnaW46IDAgMCAwIC0xMjBweDsKICBvdmVyZmxvdy14OiBoaWRkZW47CiAgb3ZlcmZsb3cteTogYXV0bzsKfQoKLmthYXZpby1kaWZmdmlld2VyIC5wYW5lLWlubmVyIHsKICBoZWlnaHQ6IDEwMCU7Cn0KCi8qKioqKioqKioqKioqKgogIE92ZXJsYXkKICoqKioqKioqKioqKioqLwoKLmthYXZpby1kaWZmdmlld2VyID4gLm92ZXJsYXkgewogIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICB0b3A6IDA7CiAgbGVmdDogMDsKICBib3R0b206IDA7CiAgcmlnaHQ6IDA7CiAgYmFja2dyb3VuZDogI2ZmZjsKfQoKLmthYXZpby1kaWZmdmlld2VyID4gLm92ZXJsYXkgLmFsZXJ0ewogIHBhZGRpbmc6IDlweCAxNXB4OwogIG1hcmdpbjogNHB4OwogIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50OwogIGJvcmRlci1yYWRpdXM6IDRweDsKfQoKLmthYXZpby1kaWZmdmlld2VyID4gLm92ZXJsYXkgLmFsZXJ0LmFsZXJ0LXN1Y2Nlc3N7CiAgYmFja2dyb3VuZC1jb2xvcjogI2RmZjBkODsKICBib3JkZXItY29sb3I6ICNkNmU5YzY7CiAgY29sb3I6ICMzYzc2M2Q7Cn0KCi5rYWF2aW8tZGlmZnZpZXdlciA+IC5vdmVybGF5IC5hbGVydC5hbGVydC1pbmZvewogIGJhY2tncm91bmQtY29sb3I6ICNkOWVkZjc7CiAgYm9yZGVyLWNvbG9yOiAjYmNlOGYxOwogIGNvbG9yOiAjMzE3MDhmOwp9Cgoua2FhdmlvLWRpZmZ2aWV3ZXIgPiAub3ZlcmxheSAuYWxlcnQuYWxlcnQtd2FybmluZ3sKICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmNmOGUzOwogIGJvcmRlci1jb2xvcjogI2ZhZWJjYzsKICBjb2xvcjogIzhhNmQzYjsKfQoKLmthYXZpby1kaWZmdmlld2VyID4gLm92ZXJsYXkgLmFsZXJ0LmFsZXJ0LWRhbmdlcnsKICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjJkZWRlOwogIGJvcmRlci1jb2xvcjogI2ViY2NkMTsKICBjb2xvcjogI2E5NDQ0MjsKfQoKLyoqKioqKioqKioqKioqCiAgQ2hhbmdlcyBNYWluCiAqKioqKioqKioqKioqKi8KCi5jaGFuZ2VzIHsKICBtYXJnaW46IDAgMTJweDsKICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwMDsKCiAgZm9udC1mYW1pbHk6IEFyaWFsLCAiSGVsdmV0aWNhIE5ldWUiLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7CiAgZm9udC1zaXplOiAxM3B4Owp9CgouY2hhbmdlcy1jb250YWluZXIgewp9CgovKioqKioqKioqKioqKioKICBDaGFuZ2VzIFRpdGxlcwogKioqKioqKioqKioqKiovCgouY2hhbmdlcy10aXRsZSB7CiAgcGFkZGluZzogNXB4IDRweCAzcHg7CiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDsKICBib3JkZXItYm90dG9tOiAwcHg7CgogIGZvbnQtc2l6ZTogMTZweDsKfQoKLmNoYW5nZXMtdGl0bGUgaXsKICBmb250LXNpemU6IDkwJTsKICBvcGFjaXR5OiAwLjg7CiAgZm9udC1zdHlsZTogbm9ybWFsOwp9CgouY2hhbmdlcy10aXRsZSBpLmljb257CiAgZm9udC1zaXplOiA5MCU7CiAgb3BhY2l0eTogMC44OwogIGZvbnQtc3R5bGU6IG5vcm1hbDsKICBmb250LXdlaWdodDogbm9ybWFsOwp9CgouY2hhbmdlcy1wYXJlbnQgc3BhbiB7CiAgcG9zaXRpb246IHJlbGF0aXZlOwogIGRpc3BsYXk6IGlubGluZS1ibG9jazsKICBwYWRkaW5nOiAwIDAgMCAxM3B4Owp9CgouY2hhbmdlcy1wYXJlbnQgc3BhbjpiZWZvcmUgewogIGNvbnRlbnQ6ICcnOwogIHBvc2l0aW9uOiBhYnNvbHV0ZTsKICB0b3A6IDUwJTsKICBsZWZ0OiAzcHg7CiAgd2lkdGg6IDA7CiAgaGVpZ2h0OiAwOwogIG1hcmdpbjogLTZweCAwIDA7CiAgYm9yZGVyLXdpZHRoOiA1cHggMCA1cHggNnB4OwogIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgIzAwMDsKICBib3JkZXItc3R5bGU6IHNvbGlkOwp9Cgoub3BlbiA+IC5jaGFuZ2VzLXBhcmVudCBzcGFuOmJlZm9yZSB7CiAgbGVmdDogMDsKICBtYXJnaW4tdG9wOiAtNHB4OwogIGJvcmRlci13aWR0aDogNnB4IDVweCAwIDVweDsKICBib3JkZXItY29sb3I6ICMwMDAgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7Cn0KCi8qIE5lc3RpbmcgKi8KLmNoYW5nZXMtY29udGFpbmVyIC5jaGFuZ2VzLWNvbnRhaW5lciAuY2hhbmdlcy10aXRsZSB7CiAgZm9udC1zaXplOiAxNHB4Owp9Ci5jaGFuZ2VzLWNvbnRhaW5lciAuY2hhbmdlcy1jb250YWluZXIgLmNoYW5nZXMtY29udGFpbmVyIC5jaGFuZ2VzLXRpdGxlIHsKICBwYWRkaW5nLWxlZnQ6IDEwcHg7CiAgZm9udC1zaXplOiAxMnB4Owp9CgouY2hhbmdlcy1jb250YWluZXIuYWN0aXZlID4gLmNoYW5nZXMtdGl0bGUgewogIHBvc2l0aW9uOiByZWxhdGl2ZTsKfQouY2hhbmdlcy1jb250YWluZXIuYWN0aXZlID4gLmNoYW5nZXMtdGl0bGU6YmVmb3JlLAouY2hhbmdlcy1jb250YWluZXIuYWN0aXZlID4gLmNoYW5nZXMtdGl0bGU6YWZ0ZXIgewogIGNvbnRlbnQ6ICcnOwogIGRpc3BsYXk6IG5vbmU7CiAgcG9zaXRpb246IGFic29sdXRlOwogIHRvcDogNTAlOwogIG1hcmdpbjogLTEycHggMCAwOwogIHdpZHRoOiAwOwogIGhlaWdodDogMDsKICBib3JkZXItdG9wOiAxMnB4IHNvbGlkIHRyYW5zcGFyZW50OwogIGJvcmRlci1ib3R0b206IDEycHggc29saWQgdHJhbnNwYXJlbnQ7Cn0KCi5jaGFuZ2VzLWNvbnRhaW5lci5hY3RpdmUuZm9jdXMgPiAuY2hhbmdlcy10aXRsZXsKICAtd2Via2l0LWJveC1zaGFkb3c6IGluc2V0IDAgMCAxMHB4IDBweCByZ2JhKDAsIDAsIDAsIDAuMzUpOwogICAgIC1tb3otYm94LXNoYWRvdzogaW5zZXQgMCAwIDEwcHggMHB4IHJnYmEoMCwgMCwgMCwgMC4zNSk7CiAgICAgICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMTBweCAwcHggcmdiYSgwLCAwLCAwLCAwLjM1KTsKfQoKLmNoYW5nZXMtY29udGFpbmVyLmFjdGl2ZSA+IC5jaGFuZ2VzLXRpdGxlOmJlZm9yZSB7CiAgbGVmdDogLTEycHg7CiAgYm9yZGVyLXJpZ2h0OiAxMnB4IHNvbGlkICMwMDA7Cn0KCi5jaGFuZ2VzLWNvbnRhaW5lci5hY3RpdmUgPiAuY2hhbmdlcy10aXRsZTphZnRlciB7CiAgcmlnaHQ6IC0xMnB4OwogIGJvcmRlci1sZWZ0OiAxMnB4IHNvbGlkICMwMDA7Cn0KCi5jaGFuZ2VzLXRpdGxlLmNoYW5nZS1hZGRlZCB7CiAgYmFja2dyb3VuZDogI2E2YzBlMTsKfQouY2hhbmdlcy1jb250YWluZXIuYWN0aXZlID4gLmNoYW5nZXMtdGl0bGUuY2hhbmdlLWFkZGVkIHsKICBiYWNrZ3JvdW5kOiAjNmM5MWNjOwp9Ci5jaGFuZ2VzLWNvbnRhaW5lci5hY3RpdmUgPiAuY2hhbmdlcy10aXRsZS5jaGFuZ2UtYWRkZWQ6YWZ0ZXIgewogIGRpc3BsYXk6IGJsb2NrOwp9CgouY2hhbmdlcy10aXRsZS5jaGFuZ2UtdXBkYXRlZCB7CiAgYmFja2dyb3VuZDogI2ZlZmM5NjsKfQouY2hhbmdlcy1jb250YWluZXIuYWN0aXZlID4gLmNoYW5nZXMtdGl0bGUuY2hhbmdlLXVwZGF0ZWQgewogIGJhY2tncm91bmQ6ICNmZmY5NDQ7Cn0KLmNoYW5nZXMtY29udGFpbmVyLmFjdGl2ZSA+IC5jaGFuZ2VzLXRpdGxlLmNoYW5nZS11cGRhdGVkOmJlZm9yZSwKLmNoYW5nZXMtY29udGFpbmVyLmFjdGl2ZSA+IC5jaGFuZ2VzLXRpdGxlLmNoYW5nZS11cGRhdGVkOmFmdGVyIHsKICBkaXNwbGF5OiBibG9jazsKfQoKLmNoYW5nZXMtdGl0bGUuY2hhbmdlLXJlbW92ZWQgewogIGJhY2tncm91bmQ6ICNmOWE0YWY7Cn0KLmNoYW5nZXMtY29udGFpbmVyLmFjdGl2ZSA+IC5jaGFuZ2VzLXRpdGxlLmNoYW5nZS1yZW1vdmVkIHsKICBiYWNrZ3JvdW5kOiAjZjM2Yjc4Owp9Ci5jaGFuZ2VzLWNvbnRhaW5lci5hY3RpdmUgPiAuY2hhbmdlcy10aXRsZS5jaGFuZ2UtcmVtb3ZlZDpiZWZvcmUgewogIGRpc3BsYXk6IGJsb2NrOwp9CgouY2hhbmdlcy10aXRsZS5hY3RpdmUgewogIHBvc2l0aW9uOiByZWxhdGl2ZTsKfQouY2hhbmdlcy10aXRsZS5hY3RpdmU6YmVmb3JlIHsKICBjb250ZW50OiAnJzsKICBwb3NpdGlvbjogYWJzb2x1dGU7Cn0KCgovKioqKioqKioqKioqKioKICBDaGFuZ2VzIExpc3QKICoqKioqKioqKioqKioqLwouY2hhbmdlcy1saXN0IHsKICBkaXNwbGF5OiBub25lOwp9CgouY2hhbmdlcy5jaGFuZ2VzLWxpc3QgewogIGRpc3BsYXk6IGJsb2NrOwp9CgouY2hhbmdlcy1jb250YWluZXIub3BlbiA+IC5jaGFuZ2VzLWxpc3QgewogIGRpc3BsYXk6IGJsb2NrOwp9CgovKioqKioqKioqKioqKioKICBDaGFuZ2VzIExpc3QKICoqKioqKioqKioqKioqLwovKi5jaGFuZ2VzLXRpdGxlLmFjdGl2ZSovCi5jaGFuZ2VzLXRpdGxlID4gLmVsZW1lbnQtY2hhbmdlcyB7CiAgZGlzcGxheTogbm9uZTsKfQoKLmFjdGl2ZSA+IC5jaGFuZ2VzLXRpdGxlID4gLmVsZW1lbnQtY2hhbmdlcyB7CiAgZGlzcGxheTogYmxvY2s7CiAgbWFyZ2luOiAwOwogIHBhZGRpbmc6IDRweCAwIDRweDsKICBsaW5lLWhlaWdodDogMS40OwogIGxpc3Qtc3R5bGU6IG5vbmU7CiAgd29yZC13cmFwOiBicmVhay13b3JkOwp9Cg==","base64");

(function(window, $) {
  insertCss(css);

  var pvjsOptionsDefault = {
    sourceData: []
  };
  var instancesMap = {};

  /**
   * Init plugin
   * @param {pvjs instance} pvjs
   * @param {objects} pvjsOptions
   */
  function init(pvjs, pvjsOptions) {
    instancesMap[pvjs.instanceId] = new PvjsDiffViewer(pvjs, pvjsOptions);
    // Create new instance if it does not exist
    if (!instancesMap.hasOwnProperty(pvjs.instanceId)) {
      instancesMap[pvjs.instanceId] = new PvjsDiffViewer(pvjs, pvjsOptions);
    }
  }

  /**
   * Constructor
   * @param {Object} pvjs
   */
  var PvjsDiffViewer = function(selector, pvjsOptionsSet) {
    this.$pvjsElement = $(selector);

    this.initContainer();

    this.pvjsOptions = $.extend({}, pvjsOptionsDefault, pvjsOptionsSet[0]);
    this.pvjs = new window.Pvjs(this.$paneLeft[0], this.pvjsOptions).getPublicInstance();

    this.pvjsOptions2 = $.extend({}, pvjsOptionsDefault, pvjsOptionsSet[1]);
    this.pvjs2 = new window.Pvjs(this.$paneRight[0], this.pvjsOptions2).getPublicInstance();

    /*
    this.pvjsOptions = $.extend({}, pvjsOptionsDefault, pvjsOptions);

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

    // Get original pvjsOptions
    var pvjsOptions = this.pvjs.getOptions();
    // Set new source data
    pvjsOptions.sourceData = this.pvjsOptions.sourceData;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvZGlmZi12aWV3ZXIvZGlmZi12aWV3ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGZzID0gcmVxdWlyZSgnZnMnKTtcbnZhciBpbnNlcnRDc3MgPSByZXF1aXJlKCdpbnNlcnQtY3NzJyk7XG52YXIgY3NzID0gQnVmZmVyKFwiTG10aFlYWnBieTFrYVdabWRtbGxkMlZ5SUhzS0lDQndiM05wZEdsdmJqb2djbVZzWVhScGRtVTdDaUFnYUdWcFoyaDBPaUExTURCd2VEc0tJQ0JpYjNKa1pYSTZJREZ3ZUNCemIyeHBaQ0FqTURBd093cDlDZ291YTJGaGRtbHZMV1JwWm1aMmFXVjNaWElnTG5CaGJtVWdld29nSUdac2IyRjBPaUJzWldaME93b2dJRzkyWlhKbWJHOTNPaUJvYVdSa1pXNDdDaUFnZDJsa2RHZzZJRFV3SlRzS0lDQm9aV2xuYUhRNklERXdNQ1U3Q24wS0NpNXJZV0YyYVc4dFpHbG1ablpwWlhkbGNpQXVjR0Z1WlM1d1lXNWxMV3hsWm5RZ2V3cDlDZ291YTJGaGRtbHZMV1JwWm1aMmFXVjNaWElnTG5CaGJtVXVjR0Z1WlMxc1pXWjBJQzV3WVc1bExXbHVibVZ5SUhzS0lDQnRZWEpuYVc0dGNtbG5hSFE2SURFeU1IQjRPd3A5Q2dvS0xtdGhZWFpwYnkxa2FXWm1kbWxsZDJWeUlDNXdZVzVsTG5CaGJtVXRjbWxuYUhRZ2V3cDlDZ291YTJGaGRtbHZMV1JwWm1aMmFXVjNaWElnTG5CaGJtVXVjR0Z1WlMxeWFXZG9kQ0F1Y0dGdVpTMXBibTVsY2lCN0NpQWdiV0Z5WjJsdUxXeGxablE2SURFeU1IQjRPd3A5Q2dvdWEyRmhkbWx2TFdScFptWjJhV1YzWlhJZ0xuQmhibVV1Y0dGdVpTMWpaVzUwWlhJZ2V3b2dJSEJ2YzJsMGFXOXVPaUJoWW5OdmJIVjBaVHNLSUNCMGIzQTZJREE3Q2lBZ2JHVm1kRG9nTlRBbE93b2dJSGRwWkhSb09pQXlOREJ3ZURzS0lDQnRZWEpuYVc0NklEQWdNQ0F3SUMweE1qQndlRHNLSUNCdmRtVnlabXh2ZHkxNE9pQm9hV1JrWlc0N0NpQWdiM1psY21ac2IzY3RlVG9nWVhWMGJ6c0tmUW9LTG10aFlYWnBieTFrYVdabWRtbGxkMlZ5SUM1d1lXNWxMV2x1Ym1WeUlIc0tJQ0JvWldsbmFIUTZJREV3TUNVN0NuMEtDaThxS2lvcUtpb3FLaW9xS2lvcUtnb2dJRTkyWlhKc1lYa0tJQ29xS2lvcUtpb3FLaW9xS2lvcUx3b0tMbXRoWVhacGJ5MWthV1ptZG1sbGQyVnlJRDRnTG05MlpYSnNZWGtnZXdvZ0lIQnZjMmwwYVc5dU9pQmhZbk52YkhWMFpUc0tJQ0IwYjNBNklEQTdDaUFnYkdWbWREb2dNRHNLSUNCaWIzUjBiMjA2SURBN0NpQWdjbWxuYUhRNklEQTdDaUFnWW1GamEyZHliM1Z1WkRvZ0kyWm1aanNLZlFvS0xtdGhZWFpwYnkxa2FXWm1kbWxsZDJWeUlENGdMbTkyWlhKc1lYa2dMbUZzWlhKMGV3b2dJSEJoWkdScGJtYzZJRGx3ZUNBeE5YQjRPd29nSUcxaGNtZHBiam9nTkhCNE93b2dJR0p2Y21SbGNqb2dNWEI0SUhOdmJHbGtJSFJ5WVc1emNHRnlaVzUwT3dvZ0lHSnZjbVJsY2kxeVlXUnBkWE02SURSd2VEc0tmUW9LTG10aFlYWnBieTFrYVdabWRtbGxkMlZ5SUQ0Z0xtOTJaWEpzWVhrZ0xtRnNaWEowTG1Gc1pYSjBMWE4xWTJObGMzTjdDaUFnWW1GamEyZHliM1Z1WkMxamIyeHZjam9nSTJSbVpqQmtPRHNLSUNCaWIzSmtaWEl0WTI5c2IzSTZJQ05rTm1VNVl6WTdDaUFnWTI5c2IzSTZJQ016WXpjMk0yUTdDbjBLQ2k1cllXRjJhVzh0WkdsbVpuWnBaWGRsY2lBK0lDNXZkbVZ5YkdGNUlDNWhiR1Z5ZEM1aGJHVnlkQzFwYm1admV3b2dJR0poWTJ0bmNtOTFibVF0WTI5c2IzSTZJQ05rT1dWa1pqYzdDaUFnWW05eVpHVnlMV052Ykc5eU9pQWpZbU5sT0dZeE93b2dJR052Ykc5eU9pQWpNekUzTURobU93cDlDZ291YTJGaGRtbHZMV1JwWm1aMmFXVjNaWElnUGlBdWIzWmxjbXhoZVNBdVlXeGxjblF1WVd4bGNuUXRkMkZ5Ym1sdVozc0tJQ0JpWVdOclozSnZkVzVrTFdOdmJHOXlPaUFqWm1ObU9HVXpPd29nSUdKdmNtUmxjaTFqYjJ4dmNqb2dJMlpoWldKall6c0tJQ0JqYjJ4dmNqb2dJemhoTm1Rellqc0tmUW9LTG10aFlYWnBieTFrYVdabWRtbGxkMlZ5SUQ0Z0xtOTJaWEpzWVhrZ0xtRnNaWEowTG1Gc1pYSjBMV1JoYm1kbGNuc0tJQ0JpWVdOclozSnZkVzVrTFdOdmJHOXlPaUFqWmpKa1pXUmxPd29nSUdKdmNtUmxjaTFqYjJ4dmNqb2dJMlZpWTJOa01Uc0tJQ0JqYjJ4dmNqb2dJMkU1TkRRME1qc0tmUW9LTHlvcUtpb3FLaW9xS2lvcUtpb3FDaUFnUTJoaGJtZGxjeUJOWVdsdUNpQXFLaW9xS2lvcUtpb3FLaW9xS2k4S0NpNWphR0Z1WjJWeklIc0tJQ0J0WVhKbmFXNDZJREFnTVRKd2VEc0tJQ0JpYjNKa1pYSXRZbTkwZEc5dE9pQXhjSGdnYzI5c2FXUWdJekF3TURzS0NpQWdabTl1ZEMxbVlXMXBiSGs2SUVGeWFXRnNMQ0FpU0dWc2RtVjBhV05oSUU1bGRXVWlMQ0JJWld4MlpYUnBZMkVzSUhOaGJuTXRjMlZ5YVdZN0NpQWdabTl1ZEMxemFYcGxPaUF4TTNCNE93cDlDZ291WTJoaGJtZGxjeTFqYjI1MFlXbHVaWElnZXdwOUNnb3ZLaW9xS2lvcUtpb3FLaW9xS2lvS0lDQkRhR0Z1WjJWeklGUnBkR3hsY3dvZ0tpb3FLaW9xS2lvcUtpb3FLaW92Q2dvdVkyaGhibWRsY3kxMGFYUnNaU0I3Q2lBZ2NHRmtaR2x1WnpvZ05YQjRJRFJ3ZUNBemNIZzdDaUFnWW05eVpHVnlPaUF4Y0hnZ2MyOXNhV1FnSXpBd01Ec0tJQ0JpYjNKa1pYSXRZbTkwZEc5dE9pQXdjSGc3Q2dvZ0lHWnZiblF0YzJsNlpUb2dNVFp3ZURzS2ZRb0tMbU5vWVc1blpYTXRkR2wwYkdVZ2FYc0tJQ0JtYjI1MExYTnBlbVU2SURrd0pUc0tJQ0J2Y0dGamFYUjVPaUF3TGpnN0NpQWdabTl1ZEMxemRIbHNaVG9nYm05eWJXRnNPd3A5Q2dvdVkyaGhibWRsY3kxMGFYUnNaU0JwTG1samIyNTdDaUFnWm05dWRDMXphWHBsT2lBNU1DVTdDaUFnYjNCaFkybDBlVG9nTUM0NE93b2dJR1p2Ym5RdGMzUjViR1U2SUc1dmNtMWhiRHNLSUNCbWIyNTBMWGRsYVdkb2REb2dibTl5YldGc093cDlDZ291WTJoaGJtZGxjeTF3WVhKbGJuUWdjM0JoYmlCN0NpQWdjRzl6YVhScGIyNDZJSEpsYkdGMGFYWmxPd29nSUdScGMzQnNZWGs2SUdsdWJHbHVaUzFpYkc5amF6c0tJQ0J3WVdSa2FXNW5PaUF3SURBZ01DQXhNM0I0T3dwOUNnb3VZMmhoYm1kbGN5MXdZWEpsYm5RZ2MzQmhianBpWldadmNtVWdld29nSUdOdmJuUmxiblE2SUNjbk93b2dJSEJ2YzJsMGFXOXVPaUJoWW5OdmJIVjBaVHNLSUNCMGIzQTZJRFV3SlRzS0lDQnNaV1owT2lBemNIZzdDaUFnZDJsa2RHZzZJREE3Q2lBZ2FHVnBaMmgwT2lBd093b2dJRzFoY21kcGJqb2dMVFp3ZUNBd0lEQTdDaUFnWW05eVpHVnlMWGRwWkhSb09pQTFjSGdnTUNBMWNIZ2dObkI0T3dvZ0lHSnZjbVJsY2kxamIyeHZjam9nZEhKaGJuTndZWEpsYm5RZ2RISmhibk53WVhKbGJuUWdkSEpoYm5Od1lYSmxiblFnSXpBd01Ec0tJQ0JpYjNKa1pYSXRjM1I1YkdVNklITnZiR2xrT3dwOUNnb3ViM0JsYmlBK0lDNWphR0Z1WjJWekxYQmhjbVZ1ZENCemNHRnVPbUpsWm05eVpTQjdDaUFnYkdWbWREb2dNRHNLSUNCdFlYSm5hVzR0ZEc5d09pQXROSEI0T3dvZ0lHSnZjbVJsY2kxM2FXUjBhRG9nTm5CNElEVndlQ0F3SURWd2VEc0tJQ0JpYjNKa1pYSXRZMjlzYjNJNklDTXdNREFnZEhKaGJuTndZWEpsYm5RZ2RISmhibk53WVhKbGJuUWdkSEpoYm5Od1lYSmxiblE3Q24wS0NpOHFJRTVsYzNScGJtY2dLaThLTG1Ob1lXNW5aWE10WTI5dWRHRnBibVZ5SUM1amFHRnVaMlZ6TFdOdmJuUmhhVzVsY2lBdVkyaGhibWRsY3kxMGFYUnNaU0I3Q2lBZ1ptOXVkQzF6YVhwbE9pQXhOSEI0T3dwOUNpNWphR0Z1WjJWekxXTnZiblJoYVc1bGNpQXVZMmhoYm1kbGN5MWpiMjUwWVdsdVpYSWdMbU5vWVc1blpYTXRZMjl1ZEdGcGJtVnlJQzVqYUdGdVoyVnpMWFJwZEd4bElIc0tJQ0J3WVdSa2FXNW5MV3hsWm5RNklERXdjSGc3Q2lBZ1ptOXVkQzF6YVhwbE9pQXhNbkI0T3dwOUNnb3VZMmhoYm1kbGN5MWpiMjUwWVdsdVpYSXVZV04wYVhabElENGdMbU5vWVc1blpYTXRkR2wwYkdVZ2V3b2dJSEJ2YzJsMGFXOXVPaUJ5Wld4aGRHbDJaVHNLZlFvdVkyaGhibWRsY3kxamIyNTBZV2x1WlhJdVlXTjBhWFpsSUQ0Z0xtTm9ZVzVuWlhNdGRHbDBiR1U2WW1WbWIzSmxMQW91WTJoaGJtZGxjeTFqYjI1MFlXbHVaWEl1WVdOMGFYWmxJRDRnTG1Ob1lXNW5aWE10ZEdsMGJHVTZZV1owWlhJZ2V3b2dJR052Ym5SbGJuUTZJQ2NuT3dvZ0lHUnBjM0JzWVhrNklHNXZibVU3Q2lBZ2NHOXphWFJwYjI0NklHRmljMjlzZFhSbE93b2dJSFJ2Y0RvZ05UQWxPd29nSUcxaGNtZHBiam9nTFRFeWNIZ2dNQ0F3T3dvZ0lIZHBaSFJvT2lBd093b2dJR2hsYVdkb2REb2dNRHNLSUNCaWIzSmtaWEl0ZEc5d09pQXhNbkI0SUhOdmJHbGtJSFJ5WVc1emNHRnlaVzUwT3dvZ0lHSnZjbVJsY2kxaWIzUjBiMjA2SURFeWNIZ2djMjlzYVdRZ2RISmhibk53WVhKbGJuUTdDbjBLQ2k1amFHRnVaMlZ6TFdOdmJuUmhhVzVsY2k1aFkzUnBkbVV1Wm05amRYTWdQaUF1WTJoaGJtZGxjeTEwYVhSc1pYc0tJQ0F0ZDJWaWEybDBMV0p2ZUMxemFHRmtiM2M2SUdsdWMyVjBJREFnTUNBeE1IQjRJREJ3ZUNCeVoySmhLREFzSURBc0lEQXNJREF1TXpVcE93b2dJQ0FnSUMxdGIzb3RZbTk0TFhOb1lXUnZkem9nYVc1elpYUWdNQ0F3SURFd2NIZ2dNSEI0SUhKblltRW9NQ3dnTUN3Z01Dd2dNQzR6TlNrN0NpQWdJQ0FnSUNBZ0lDQmliM2d0YzJoaFpHOTNPaUJwYm5ObGRDQXdJREFnTVRCd2VDQXdjSGdnY21kaVlTZ3dMQ0F3TENBd0xDQXdMak0xS1RzS2ZRb0tMbU5vWVc1blpYTXRZMjl1ZEdGcGJtVnlMbUZqZEdsMlpTQStJQzVqYUdGdVoyVnpMWFJwZEd4bE9tSmxabTl5WlNCN0NpQWdiR1ZtZERvZ0xURXljSGc3Q2lBZ1ltOXlaR1Z5TFhKcFoyaDBPaUF4TW5CNElITnZiR2xrSUNNd01EQTdDbjBLQ2k1amFHRnVaMlZ6TFdOdmJuUmhhVzVsY2k1aFkzUnBkbVVnUGlBdVkyaGhibWRsY3kxMGFYUnNaVHBoWm5SbGNpQjdDaUFnY21sbmFIUTZJQzB4TW5CNE93b2dJR0p2Y21SbGNpMXNaV1owT2lBeE1uQjRJSE52Ykdsa0lDTXdNREE3Q24wS0NpNWphR0Z1WjJWekxYUnBkR3hsTG1Ob1lXNW5aUzFoWkdSbFpDQjdDaUFnWW1GamEyZHliM1Z1WkRvZ0kyRTJZekJsTVRzS2ZRb3VZMmhoYm1kbGN5MWpiMjUwWVdsdVpYSXVZV04wYVhabElENGdMbU5vWVc1blpYTXRkR2wwYkdVdVkyaGhibWRsTFdGa1pHVmtJSHNLSUNCaVlXTnJaM0p2ZFc1a09pQWpObU01TVdOak93cDlDaTVqYUdGdVoyVnpMV052Ym5SaGFXNWxjaTVoWTNScGRtVWdQaUF1WTJoaGJtZGxjeTEwYVhSc1pTNWphR0Z1WjJVdFlXUmtaV1E2WVdaMFpYSWdld29nSUdScGMzQnNZWGs2SUdKc2IyTnJPd3A5Q2dvdVkyaGhibWRsY3kxMGFYUnNaUzVqYUdGdVoyVXRkWEJrWVhSbFpDQjdDaUFnWW1GamEyZHliM1Z1WkRvZ0kyWmxabU01TmpzS2ZRb3VZMmhoYm1kbGN5MWpiMjUwWVdsdVpYSXVZV04wYVhabElENGdMbU5vWVc1blpYTXRkR2wwYkdVdVkyaGhibWRsTFhWd1pHRjBaV1FnZXdvZ0lHSmhZMnRuY205MWJtUTZJQ05tWm1ZNU5EUTdDbjBLTG1Ob1lXNW5aWE10WTI5dWRHRnBibVZ5TG1GamRHbDJaU0ErSUM1amFHRnVaMlZ6TFhScGRHeGxMbU5vWVc1blpTMTFjR1JoZEdWa09tSmxabTl5WlN3S0xtTm9ZVzVuWlhNdFkyOXVkR0ZwYm1WeUxtRmpkR2wyWlNBK0lDNWphR0Z1WjJWekxYUnBkR3hsTG1Ob1lXNW5aUzExY0dSaGRHVmtPbUZtZEdWeUlIc0tJQ0JrYVhOd2JHRjVPaUJpYkc5amF6c0tmUW9LTG1Ob1lXNW5aWE10ZEdsMGJHVXVZMmhoYm1kbExYSmxiVzkyWldRZ2V3b2dJR0poWTJ0bmNtOTFibVE2SUNObU9XRTBZV1k3Q24wS0xtTm9ZVzVuWlhNdFkyOXVkR0ZwYm1WeUxtRmpkR2wyWlNBK0lDNWphR0Z1WjJWekxYUnBkR3hsTG1Ob1lXNW5aUzF5WlcxdmRtVmtJSHNLSUNCaVlXTnJaM0p2ZFc1a09pQWpaak0yWWpjNE93cDlDaTVqYUdGdVoyVnpMV052Ym5SaGFXNWxjaTVoWTNScGRtVWdQaUF1WTJoaGJtZGxjeTEwYVhSc1pTNWphR0Z1WjJVdGNtVnRiM1psWkRwaVpXWnZjbVVnZXdvZ0lHUnBjM0JzWVhrNklHSnNiMk5yT3dwOUNnb3VZMmhoYm1kbGN5MTBhWFJzWlM1aFkzUnBkbVVnZXdvZ0lIQnZjMmwwYVc5dU9pQnlaV3hoZEdsMlpUc0tmUW91WTJoaGJtZGxjeTEwYVhSc1pTNWhZM1JwZG1VNlltVm1iM0psSUhzS0lDQmpiMjUwWlc1ME9pQW5KenNLSUNCd2IzTnBkR2x2YmpvZ1lXSnpiMngxZEdVN0NuMEtDZ292S2lvcUtpb3FLaW9xS2lvcUtpb0tJQ0JEYUdGdVoyVnpJRXhwYzNRS0lDb3FLaW9xS2lvcUtpb3FLaW9xTHdvdVkyaGhibWRsY3kxc2FYTjBJSHNLSUNCa2FYTndiR0Y1T2lCdWIyNWxPd3A5Q2dvdVkyaGhibWRsY3k1amFHRnVaMlZ6TFd4cGMzUWdld29nSUdScGMzQnNZWGs2SUdKc2IyTnJPd3A5Q2dvdVkyaGhibWRsY3kxamIyNTBZV2x1WlhJdWIzQmxiaUErSUM1amFHRnVaMlZ6TFd4cGMzUWdld29nSUdScGMzQnNZWGs2SUdKc2IyTnJPd3A5Q2dvdktpb3FLaW9xS2lvcUtpb3FLaW9LSUNCRGFHRnVaMlZ6SUV4cGMzUUtJQ29xS2lvcUtpb3FLaW9xS2lvcUx3b3ZLaTVqYUdGdVoyVnpMWFJwZEd4bExtRmpkR2wyWlNvdkNpNWphR0Z1WjJWekxYUnBkR3hsSUQ0Z0xtVnNaVzFsYm5RdFkyaGhibWRsY3lCN0NpQWdaR2x6Y0d4aGVUb2dibTl1WlRzS2ZRb0tMbUZqZEdsMlpTQStJQzVqYUdGdVoyVnpMWFJwZEd4bElENGdMbVZzWlcxbGJuUXRZMmhoYm1kbGN5QjdDaUFnWkdsemNHeGhlVG9nWW14dlkyczdDaUFnYldGeVoybHVPaUF3T3dvZ0lIQmhaR1JwYm1jNklEUndlQ0F3SURSd2VEc0tJQ0JzYVc1bExXaGxhV2RvZERvZ01TNDBPd29nSUd4cGMzUXRjM1I1YkdVNklHNXZibVU3Q2lBZ2QyOXlaQzEzY21Gd09pQmljbVZoYXkxM2IzSmtPd3A5Q2c9PVwiLFwiYmFzZTY0XCIpO1xuXG4oZnVuY3Rpb24od2luZG93LCAkKSB7XG4gIGluc2VydENzcyhjc3MpO1xuXG4gIHZhciBwdmpzT3B0aW9uc0RlZmF1bHQgPSB7XG4gICAgc291cmNlRGF0YTogW11cbiAgfTtcbiAgdmFyIGluc3RhbmNlc01hcCA9IHt9O1xuXG4gIC8qKlxuICAgKiBJbml0IHBsdWdpblxuICAgKiBAcGFyYW0ge3B2anMgaW5zdGFuY2V9IHB2anNcbiAgICogQHBhcmFtIHtvYmplY3RzfSBwdmpzT3B0aW9uc1xuICAgKi9cbiAgZnVuY3Rpb24gaW5pdChwdmpzLCBwdmpzT3B0aW9ucykge1xuICAgIGluc3RhbmNlc01hcFtwdmpzLmluc3RhbmNlSWRdID0gbmV3IFB2anNEaWZmVmlld2VyKHB2anMsIHB2anNPcHRpb25zKTtcbiAgICAvLyBDcmVhdGUgbmV3IGluc3RhbmNlIGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAgaWYgKCFpbnN0YW5jZXNNYXAuaGFzT3duUHJvcGVydHkocHZqcy5pbnN0YW5jZUlkKSkge1xuICAgICAgaW5zdGFuY2VzTWFwW3B2anMuaW5zdGFuY2VJZF0gPSBuZXcgUHZqc0RpZmZWaWV3ZXIocHZqcywgcHZqc09wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gcHZqc1xuICAgKi9cbiAgdmFyIFB2anNEaWZmVmlld2VyID0gZnVuY3Rpb24oc2VsZWN0b3IsIHB2anNPcHRpb25zU2V0KSB7XG4gICAgdGhpcy4kcHZqc0VsZW1lbnQgPSAkKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuaW5pdENvbnRhaW5lcigpO1xuXG4gICAgdGhpcy5wdmpzT3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBwdmpzT3B0aW9uc0RlZmF1bHQsIHB2anNPcHRpb25zU2V0WzBdKTtcbiAgICB0aGlzLnB2anMgPSBuZXcgd2luZG93LlB2anModGhpcy4kcGFuZUxlZnRbMF0sIHRoaXMucHZqc09wdGlvbnMpLmdldFB1YmxpY0luc3RhbmNlKCk7XG5cbiAgICB0aGlzLnB2anNPcHRpb25zMiA9ICQuZXh0ZW5kKHt9LCBwdmpzT3B0aW9uc0RlZmF1bHQsIHB2anNPcHRpb25zU2V0WzFdKTtcbiAgICB0aGlzLnB2anMyID0gbmV3IHdpbmRvdy5QdmpzKHRoaXMuJHBhbmVSaWdodFswXSwgdGhpcy5wdmpzT3B0aW9uczIpLmdldFB1YmxpY0luc3RhbmNlKCk7XG5cbiAgICAvKlxuICAgIHRoaXMucHZqc09wdGlvbnMgPSAkLmV4dGVuZCh7fSwgcHZqc09wdGlvbnNEZWZhdWx0LCBwdmpzT3B0aW9ucyk7XG5cbiAgICAvL3RoaXMucHZqcyA9IG5ldyB3aW5kb3cuUHZqcygpO1xuICAgIHRoaXMucHZqcyA9IHB2anM7XG4gICAgLy8qL1xuXG4gICAgLy90aGlzLmluaXRTZWNvbmRQdmpzKCk7XG4gICAgdGhpcy5ob29rRXZlbnRzKCk7XG5cbiAgICAvLyBUcmlnZ2VyIHB2anMyIHJlbmRlciB3aGVuIGV2ZXJ5dGhpbmcgaXMgcmVhZHlcbiAgICB0aGlzLnB2anMucmVuZGVyKCk7XG4gICAgdGhpcy5wdmpzMi5yZW5kZXIoKTtcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlIGRpZmZlcmVuY2VzIGNvbnRhaW5lclxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmluaXRDb250YWluZXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRkaWZmdmlld2VyID0gJCgnPGRpdiBjbGFzcz1cInB2anMtZGlmZnZpZXdlclwiLz4nKTtcblxuICAgIC8vIENyZWF0ZSBwYW5lc1xuICAgIHRoaXMuJHBhbmVMZWZ0ID0gJCgnPGRpdiBjbGFzcz1cInBhbmUtaW5uZXJcIj48L2Rpdj4nKVxuICAgICAgLmFwcGVuZFRvKCQoJzxkaXYgY2xhc3M9XCJwYW5lIHBhbmUtbGVmdFwiPjwvZGl2PicpXG4gICAgICAuYXBwZW5kVG8odGhpcy4kZGlmZnZpZXdlcikpO1xuICAgIHRoaXMuJHBhbmVSaWdodCA9ICQoJzxkaXYgY2xhc3M9XCJwYW5lLWlubmVyXCI+PC9kaXY+JylcbiAgICAgIC5hcHBlbmRUbygkKCc8ZGl2IGNsYXNzPVwicGFuZSBwYW5lLXJpZ2h0XCI+PC9kaXY+JylcbiAgICAgIC5hcHBlbmRUbyh0aGlzLiRkaWZmdmlld2VyKSk7XG4gICAgdGhpcy4kcGFuZUNlbnRlciA9ICQoJzxkaXYgY2xhc3M9XCJwYW5lIHBhbmUtY2VudGVyXCI+PC9kaXY+JykuYXBwZW5kVG8odGhpcy4kZGlmZnZpZXdlcik7XG5cbiAgICAvLyBJbnNlcnQgZGlmZnZpZXdlciBjb250YWluZXIgYmVmb3JlIHB2anMgZWxlbWVudFxuICAgIHRoaXMuJGRpZmZ2aWV3ZXIuaW5zZXJ0QmVmb3JlKHRoaXMuJHB2anNFbGVtZW50KTtcblxuICAgIC8vIE1vdmUgaW5zdGFuY2UgZWxlbWVudCBpbnRvIGxlZnQgcGFuZVxuICAgIHRoaXMuJHBhbmVMZWZ0LmFwcGVuZCh0aGlzLiRwdmpzRWxlbWVudCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgc2Vjb25kIHB2anMuIFNhdmUgaXRzIGluc3RhbmNlIGludG8gdGhpcy5wdmpzMlxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmluaXRTZWNvbmRQdmpzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gQ3JlYXRlIHNlY29uZCBpbnN0YW5jZSBjb250YWluZXJcbiAgICB0aGlzLiRwdmpzRWxlbWVudDIgPSAkKCc8ZGl2Lz4nKS5hcHBlbmRUbyh0aGlzLiRwYW5lUmlnaHQpO1xuXG4gICAgLy8gR2V0IG9yaWdpbmFsIHB2anNPcHRpb25zXG4gICAgdmFyIHB2anNPcHRpb25zID0gdGhpcy5wdmpzLmdldE9wdGlvbnMoKTtcbiAgICAvLyBTZXQgbmV3IHNvdXJjZSBkYXRhXG4gICAgcHZqc09wdGlvbnMuc291cmNlRGF0YSA9IHRoaXMucHZqc09wdGlvbnMuc291cmNlRGF0YTtcbiAgICBwdmpzT3B0aW9ucy5tYW51YWxSZW5kZXIgPSB0cnVlO1xuXG4gICAgLy8gQ3JlYXRlIHNlY29uZCBwdmpzIGluc3RhbmNlXG4gICAgLy90aGlzLnB2anMyID0gbmV3IHdpbmRvdy5QdmpzKHRoaXMuJHB2anNFbGVtZW50MlswXSwgcHZqc09wdGlvbnMpO1xuICAgIC8vdGhpcy5wdmpzMiA9IHRoaXMucHZqcyh0aGlzLiRwdmpzRWxlbWVudDJbMF0sIHB2anNPcHRpb25zKTtcbiAgICB0aGlzLiRwdmpzRWxlbWVudDIucHZqcyhwdmpzT3B0aW9ucyk7XG4gICAgdGhpcy5wdmpzMiA9IHRoaXMuJHB2anNFbGVtZW50Mi5wdmpzKCdnZXQnKS5wb3AoKTtcbiAgfTtcblxuICAvKipcbiAgICogSG9vayByZW5kZXIgZXZlbnRzLiBEaXNwbGF5IGRpZmZWaWV3ZXIgb25seSB3aGVuIGJvdGggcHZqc3MgYXJlIHJlYWR5XG4gICAqIEhvb2sgZm9yIGVycm9yIGV2ZW50cyBzbyB0byBrbm93IHdoZW4gdG8gZGlzcGxheSBhIG1lc3NhZ2UgaW5zdGVhZCBvZiBkaWZmVmlld2VyXG4gICAqIEhvb2sgem9vbSBhbmQgcGFuIGV2ZW50cyBpbiBvcmRlciB0byBrZWVwIGJvdGggcGF0aHdheXMgc3luY2hyb25pemVkXG4gICAqIEhvb2sgbWFpbiBwdmpzIGRlc3Ryb3kgZXZlbnQgaW4gb3JkZXIgdG8ga25vdyB3aGVuIHRvIGRlc3Ryb3kgc2Vjb25kIHBhdGh3YXlcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5ob29rRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgIHZhciBwdmpzUmVuZGVyZWQgPSBmYWxzZTtcbiAgICB2YXIgcHZqczJSZW5kZXJlZCA9IGZhbHNlO1xuICAgIHZhciBub0RpZmYgPSBmYWxzZTtcblxuICAgIC8vIHB2anMgcmVuZGVyZXIgYmFycmllclxuICAgIHRoaXMucHZqcy5vbigncmVuZGVyZWQnLCBmdW5jdGlvbigpIHtcbiAgICAgIHB2anNSZW5kZXJlZCA9IHRydWU7XG4gICAgICBpZiAocHZqczJSZW5kZXJlZCAmJiAhbm9EaWZmKSB7XG4gICAgICAgIHRoYXQub25QdmpzZXNSZW5kZXJlZCgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMucHZqczIub24oJ3JlbmRlcmVkJywgZnVuY3Rpb24oKSB7XG4gICAgICBwdmpzMlJlbmRlcmVkID0gdHJ1ZTtcbiAgICAgIGlmIChwdmpzUmVuZGVyZWQgJiYgIW5vRGlmZikge1xuICAgICAgICB0aGF0Lm9uUHZqc2VzUmVuZGVyZWQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMucHZqcy5vbignZXJyb3Iuc291cmNlRGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFub0RpZmYpIHtcbiAgICAgICAgdGhhdC5vbk5vRGlmZignT25lIG9yIGJvdGggcGF0aHdheXMgd2VyZSBub3QgcmVuZGVyZWQuICcgK1xuICAgICAgICAgICAgJ01vc3QgcHJvYmFibHkgb25lIHBhdGh3YXlzIHVzZXMgb2xkIGZvcm1hdCB0aGF0IGlzIG5vdCBzdXBwb3J0ZWQgYnkgcHZqcy4nKTtcbiAgICAgIH1cblxuICAgICAgbm9EaWZmID0gdHJ1ZTtcbiAgICB9KTtcbiAgICB0aGlzLnB2anMyLm9uKCdlcnJvci5zb3VyY2VEYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIW5vRGlmZikge1xuICAgICAgICB0aGF0Lm9uTm9EaWZmKCdPbmUgb3IgYm90aCBwYXRod2F5cyB3ZXJlIG5vdCByZW5kZXJlZC4nICtcbiAgICAgICAgICAgICdNb3N0IHByb2JhYmx5IG9uZSBwYXRod2F5cyB1c2VzIG9sZCBmb3JtYXQgdGhhdCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHB2anMuJyk7XG4gICAgICB9XG5cbiAgICAgIG5vRGlmZiA9IHRydWU7XG4gICAgfSk7XG5cbiAgICAvLyBPbiBkZXN0cm95IHB2anNcbiAgICB0aGlzLnB2anMub24oJ2Rlc3Ryb3kucHZqcycsIGZ1bmN0aW9uKCkge1xuICAgICAgdGhhdC5wdmpzMi5kZXN0cm95KCk7XG4gICAgICAvLyBQdXQgYmFjayBwdmpzIGVsZW1lbnQgY29udGFpbmVyXG4gICAgICB0aGF0LiRwdmpzRWxlbWVudC5pbnNlcnRCZWZvcmUodGhhdC4kZGlmZnZpZXdlcik7XG4gICAgICB0aGF0LiRkaWZmdmlld2VyLnJlbW92ZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gUGFuIGFuZCB6b29tIGV2ZW50c1xuICAgIHZhciBwdmpzUGFubmVkID0gZmFsc2U7XG4gICAgdmFyIHB2anNab29tZWQgPSBmYWxzZTtcbiAgICB2YXIgcHZqczJQYW5uZWQgPSBmYWxzZTtcbiAgICB2YXIgcHZqczJab29tZWQgPSBmYWxzZTtcblxuICAgIHRoaXMucHZqcy5vbignem9vbWVkLnJlbmRlcmVyJywgZnVuY3Rpb24obGV2ZWwpIHtcbiAgICAgIGlmIChwdmpzMlpvb21lZCkgeyAvLyBwcmV2ZW50IHJlY3Vyc2l2ZSBjYWxsXG4gICAgICAgIHB2anMyWm9vbWVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHB2anNab29tZWQgPSB0cnVlO1xuXG4gICAgICB0aGF0LnB2anMyLnpvb20obGV2ZWwgLyB0aGF0Lnpvb21TY2FsZSk7XG4gICAgICB0aGF0LnB2anMucGFuQnkoe3g6IDAsIHk6IDB9KTsgLy8gdHJpZ2dlciBwYW4gdG8gc3luYyBwYXRod2F5c1xuICAgICAgdGhhdC5wdmpzMi5wYW4odGhhdC5wdmpzLmdldFBhbigpKTtcbiAgICB9KTtcblxuICAgIHRoaXMucHZqcy5vbigncGFubmVkLnJlbmRlcmVyJywgZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgIGlmIChwdmpzMlBhbm5lZCkge1xuICAgICAgICBwdmpzMlBhbm5lZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwdmpzUGFubmVkID0gdHJ1ZTtcbiAgICAgIHRoYXQucHZqczIucGFuKHBvaW50KTtcbiAgICB9KTtcblxuICAgIHRoaXMucHZqczIub24oJ3pvb21lZC5yZW5kZXJlcicsIGZ1bmN0aW9uKGxldmVsKSB7XG4gICAgICBpZiAocHZqc1pvb21lZCkge1xuICAgICAgICBwdmpzWm9vbWVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHB2anMyWm9vbWVkID0gdHJ1ZTtcblxuICAgICAgdGhhdC5wdmpzLnpvb20obGV2ZWwgKiB0aGF0Lnpvb21TY2FsZSk7XG4gICAgICB0aGF0LnB2anMyLnBhbkJ5KHt4OiAwLCB5OiAwfSk7IC8vIHRyaWdnZXIgcGFuIHRvIHN5bmMgcGF0aHdheXNcbiAgICAgIHRoYXQucHZqcy5wYW4odGhhdC5wdmpzMi5nZXRQYW4oKSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnB2anMyLm9uKCdwYW5uZWQucmVuZGVyZXInLCBmdW5jdGlvbihwb2ludCkge1xuICAgICAgaWYgKHB2anNQYW5uZWQpIHtcbiAgICAgICAgcHZqc1Bhbm5lZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBwdmpzMlBhbm5lZCA9IHRydWU7XG4gICAgICB0aGF0LnB2anMucGFuKHBvaW50KTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlIGFuIG92ZXJsYXkgd2l0aCBhIG1lc3NhZ2VcbiAgICogQHBhcmFtICB7U3RyaW5nfSBtZXNzYWdlIE1lc3NhZ2Ugd2h5IGRpZmZWaWV3ZXIgc2hvd3Mgbm90aGluZ1xuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLm9uTm9EaWZmID0gZnVuY3Rpb24obWVzc2FnZSkge1xuICAgIC8vIENyZWF0ZSBhbiBvdmVybGF5XG4gICAgaWYgKHRoaXMuJG92ZXJsYXkgPT09IHZvaWQgMCkge1xuICAgICAgdGhpcy4kb3ZlcmxheSA9ICQoJzxkaXYgY2xhc3M9XCJvdmVybGF5XCI+PC9kaXY+JykuYXBwZW5kVG8odGhpcy4kZGlmZnZpZXdlcik7XG4gICAgfVxuXG4gICAgLy8gQWRkIGEgbWVzc2FnZVxuICAgIHRoaXMuJG92ZXJsYXkuYXBwZW5kKCQoJzxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1pbmZvXCI+PC9kaXY+JykudGV4dChtZXNzYWdlKSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFdoZW4gYm90aCBwdmpzcyBhcmUgcmVuZGVyZWRcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5vblB2anNlc1JlbmRlcmVkID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tQdmpzZXNEYXRhKCkpIHtcbiAgICAgIHRoaXMuZ2V0Wm9vbVNjYWxlKCk7XG4gICAgICB0aGlzLmRpc3BsYXlEaWZmKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25Ob0RpZmYoJ09uZSBvciBib3RoIHBhdGh3YXlzIHdlcmUgcmVuZGVyZWQgdXNpbmcgYSBmb3JtYXQgKGV4LiBwbmcpICcgK1xuICAgICAgICAgICd0aGF0IGhhcyBubyBkZXRhaWxzIGFib3V0IG5vZGVzLicpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYm90aCBwdmpzcyBoYXZlIHB2anNvbiBvYmplY3RzXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IFRydWUgaWYgcHZqc29uIGlzIGF2YWxpYWJsZSBmb3IgYm90aCBwdmpzc1xuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmNoZWNrUHZqc2VzRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAodGhpcy5wdmpzLmdldFNvdXJjZURhdGEoKS5wdmpzb24gJiYgdGhpcy5wdmpzMi5nZXRTb3VyY2VEYXRhKCkucHZqc29uKTtcbiAgfTtcblxuICAvKiogQHR5cGUge051bWJlcn0gem9vbSBzY2FsZSBiZXR3ZWVuIHBhdGh3YXlzICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS56b29tU2NhbGUgPSAxO1xuXG4gIC8qKlxuICAgKiBEZXRlY3QgYW5kIGNhY2hlIHpvb20gc2NhbGUgYmV0d2VlbiBwYXRod2F5c1xuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmdldFpvb21TY2FsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuem9vbVNjYWxlID0gdGhpcy5wdmpzLmdldFpvb20oKSAvIHRoaXMucHZqczIuZ2V0Wm9vbSgpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbnRyeSBwb2ludCBvZiBkaWZmVmlld2VyIHJlbmRlcmluZyBhbmQgaGlnaGxpZ2h0aW5nIGRpZmZlcmVuY2VzXG4gICAqL1xuICBQdmpzRGlmZlZpZXdlci5wcm90b3R5cGUuZGlzcGxheURpZmYgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5wdmpzLmdldFNvdXJjZURhdGEoKS5wdmpzb24uZWxlbWVudHM7XG4gICAgdGhpcy5lbGVtZW50czIgPSB0aGlzLnB2anMyLmdldFNvdXJjZURhdGEoKS5wdmpzb24uZWxlbWVudHM7XG5cbiAgICAvLyBOZXcgZWxlbWVudHMgaGF2ZSBwcmlvcml0eVxuICAgIHRoaXMuZWxlbWVudHNNZXJnZSA9IHRoaXMubWVyZ2VFbGVtZW50cyh0aGlzLmVsZW1lbnRzMiwgdGhpcy5lbGVtZW50cyk7XG5cbiAgICB2YXIgZGlmZiA9IHRoaXMuY29tcHV0ZURpZmYoKTtcblxuICAgIC8vIElGIG5vIGRpZmZzIHRoZW4gZGlzcGxheSBhbiBvdmVybGF5IG1lc3NhZ2UgYW5kIHN0b3AgZnVydGhlciByZW5kZXJpbmdcbiAgICBpZiAoZGlmZi5hZGRlZC5sZW5ndGggKyBkaWZmLnVwZGF0ZWQubGVuZ3RoICsgZGlmZi5yZW1vdmVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5vbk5vRGlmZignUGF0aHdheXMgaGF2ZSBubyB2aXN1YWwgZGlmZmVyZW5jZXMgYmV0d2VlbiB0aGVtLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciAkY2hhbmdlc0xpc3QgPSB0aGlzLmluaXREaWZmVmlldygpO1xuXG4gICAgLy8gU3RvcmUgZWxlbWVudHMgZ3JvdXBlZCBieSBjaGFuZ2UgdHlwZSBhbmQgZ3JvdXAgbmFtZVxuICAgIHRoaXMuZWxlbWVudHNDYWNoZSA9IHthZGRlZDoge30sIHVwZGF0ZWQ6IHt9LCByZW1vdmVkOiB7fX07XG4gICAgdGhpcy5lbGVtZW50c1JlZmVyZW5jZXMgPSB7fTtcblxuICAgIHRoaXMucmVuZGVyRGlmZnNPZlR5cGUoJ2FkZGVkJywgZGlmZi5hZGRlZCwgJGNoYW5nZXNMaXN0LCB0aGlzLmVsZW1lbnRzMik7XG4gICAgdGhpcy5yZW5kZXJEaWZmc09mVHlwZSgndXBkYXRlZCcsIGRpZmYudXBkYXRlZCwgJGNoYW5nZXNMaXN0LCB0aGlzLmVsZW1lbnRzTWVyZ2UpO1xuICAgIHRoaXMucmVuZGVyRGlmZnNPZlR5cGUoJ3JlbW92ZWQnLCBkaWZmLnJlbW92ZWQsICRjaGFuZ2VzTGlzdCwgdGhpcy5lbGVtZW50cyk7XG5cbiAgICB0aGlzLmhvb2tEaWZmTmF2aWdhdGlvbigpO1xuXG4gICAgLy8gSGlnaGxpZ2h0IGFsbCBjaGFuZ2VzXG4gICAgdGhpcy5oaWdobGlnaHRUeXBlKCdhZGRlZCcpO1xuICAgIHRoaXMuaGlnaGxpZ2h0VHlwZSgndXBkYXRlZCcpO1xuICAgIHRoaXMuaGlnaGxpZ2h0VHlwZSgncmVtb3ZlZCcpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNZXJnZSBsaXN0cyBieSBhcHBlbmRpbmcgdW5pcXVlIGVsZW1lbnRzIGZyb20gc2Vjb25kIGxpc3QgdG8gZmlyc3QgbGlzdFxuICAgKiBAcGFyYW0gIHtBcnJheX0gZWxlbWVudHNcbiAgICogQHBhcmFtICB7QXJyYXl9IGVsZW1lbnRzMlxuICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5tZXJnZUVsZW1lbnRzID0gZnVuY3Rpb24oZWxlbWVudHMsIGVsZW1lbnRzMikge1xuICAgIHZhciBlbGVtZW50c01lcmdlID0gZWxlbWVudHMuc2xpY2UoKTtcbiAgICB2YXIgZWxlbWVudEZvdW5kID0gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBlIGluIGVsZW1lbnRzMikge1xuICAgICAgZWxlbWVudEZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKHZhciBlMiBpbiBlbGVtZW50c01lcmdlKSB7XG4gICAgICAgIGlmIChlbGVtZW50c01lcmdlW2UyXS5pZCA9PT0gZWxlbWVudHMyW2VdLmlkKSB7XG4gICAgICAgICAgZWxlbWVudEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiBlbGVtZW50IGlzIHVuaXF1ZSB0aGVuIGFkZCBpdCB0byBtZXJnZVxuICAgICAgaWYgKCFlbGVtZW50Rm91bmQpIHtcbiAgICAgICAgZWxlbWVudHNNZXJnZS5wdXNoKGVsZW1lbnRzMltlXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnRzTWVyZ2U7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbXB1dGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGVsZW1lbnRzIG9mIGJvdGggcHZqc3NcbiAgICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3Qgd2l0aCAzIGFycmF5czogdXBkYXRlZCwgYWRkZWQgYW5kIHJlbW92ZWRcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5jb21wdXRlRGlmZiA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIENsb25lIGxpc3RzIHRvIGJlIHNhZmUgZnJvbSBtb2RpZnlpbmcgdGhlbSBpbnRlcm5hbGx5XG4gICAgLy8gKGluIGNhc2UgdGhhdCBwdmpzb24gd2FzIG5vdCBkZWVwLWNsb25lZClcbiAgICB2YXIgZWxlbWVudHMgPSB0aGlzLmVsZW1lbnRzLnNsaWNlKCk7ICAgIC8vIE9sZCBwYXRod2F5IGVsZW1lbnRzXG4gICAgdmFyIGVsZW1lbnRzMiA9IHRoaXMuZWxlbWVudHMyLnNsaWNlKCk7ICAvLyBOZXcgcGF0aHdheSBlbGVtZW50c1xuICAgIHZhciBkaWZmID0ge1xuICAgICAgdXBkYXRlZDogW10sXG4gICAgICBhZGRlZDogW10sXG4gICAgICByZW1vdmVkOiBbXVxuICAgIH07XG4gICAgdmFyIGVsZW1lbnQ7XG4gICAgdmFyIGZvdW5kO1xuXG4gICAgZm9yICh2YXIgaSA9IGVsZW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBlbGVtZW50ID0gZWxlbWVudHNbaV07XG4gICAgICBmb3VuZCA9IGZhbHNlO1xuXG4gICAgICAvLyBTZWFyY2ggZm9yIGVsZW1lbnQgYnkgSUQgaW4gc2Vjb25kIGxpc3RcbiAgICAgIGZvciAodmFyIGogPSBlbGVtZW50czIubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgaWYgKGVsZW1lbnRzW2ldLmlkID09PSBlbGVtZW50czJbal0uaWQpIHtcbiAgICAgICAgICBmb3VuZCA9IHRydWU7XG5cbiAgICAgICAgICAvLyBDaGVjayBmb3IgY2hhbmdlc1xuICAgICAgICAgIGlmIChjYWxjdWxhdGVFbGVtZW50RGlmZihlbGVtZW50c1tpXSwgZWxlbWVudHMyW2pdKSkge1xuICAgICAgICAgICAgZGlmZi51cGRhdGVkLnB1c2goe1xuICAgICAgICAgICAgICBpZDogZWxlbWVudHMyW2pdLmlkLFxuICAgICAgICAgICAgICAnZ3BtbDplbGVtZW50JzogZWxlbWVudHMyW2pdWydncG1sOmVsZW1lbnQnXSB8fFxuICAgICAgICAgICAgICAgICAgZWxlbWVudHNbaV1bJ2dwbWw6ZWxlbWVudCddIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgdHlwZTogZWxlbWVudHMyW2pdLnR5cGUgfHwgZWxlbWVudHNbaV0udHlwZSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHNoYXBlOiBlbGVtZW50czJbal0uc2hhcGUgfHwgZWxlbWVudHNbaV0uc2hhcGUgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICB0ZXh0Q29udGVudDogZWxlbWVudHMyW2pdLnRleHRDb250ZW50IHx8IGVsZW1lbnRzW2ldLnRleHRDb250ZW50IHx8XG4gICAgICAgICAgICAgICAgICBlbGVtZW50czJbal0udGl0bGUgfHwgZWxlbWVudHMyW2pdLmRpc3BsYXlOYW1lIHx8IGVsZW1lbnRzW2ldLnRpdGxlIHx8XG4gICAgICAgICAgICAgICAgICBlbGVtZW50c1tpXS5kaXNwbGF5TmFtZSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHBvaW50czogZWxlbWVudHMyW2pdLnBvaW50cyB8fCBlbGVtZW50c1tpXS5wb2ludHMgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBkaWZmOiBjYWxjdWxhdGVFbGVtZW50RGlmZihlbGVtZW50c1tpXSwgZWxlbWVudHMyW2pdKSxcbiAgICAgICAgICAgICAgX2VsZW1lbnQ6IGVsZW1lbnRzW2ldLFxuICAgICAgICAgICAgICBfZWxlbWVudDI6IGVsZW1lbnRzMltqXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gUmVtb3ZlIGZvdW5kIGVsZW1lbnRzIGZyb20gc2VhcmNoIHBvbGxcbiAgICAgICAgICBlbGVtZW50cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgZWxlbWVudHMyLnNwbGljZShqLCAxKTtcblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgZGlmZi5yZW1vdmVkLnB1c2goZWxlbWVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFsbCBub3QgbWF0Y2hlZCBlbGVtZW50cyBmcm9tIHNlY29uZCBsaXN0IGFyZSBuZXdcbiAgICBkaWZmLmFkZGVkID0gZWxlbWVudHMyLnNsaWNlKCk7XG5cbiAgICByZXR1cm4gZGlmZjtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsY3VsYXRlIGRpZmZlcmVuY2UgYmV0d2VlbiAyIGVsZW1lbnRzXG4gICAqIEBwYXJhbSAge09iamVjdH0gZWxlbWVudFxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGVsZW1lbnQyXG4gICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgRGlmZmVyZW5jZSBvYmplY3RcbiAgICovXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZUVsZW1lbnREaWZmKGVsZW1lbnQsIGVsZW1lbnQyKSB7XG4gICAgdmFyIGRpZmYgPSB7XG4gICAgICBhZGRlZDogW10sXG4gICAgICByZW1vdmVkOiBbXSxcbiAgICAgIHVwZGF0ZWQ6IFtdXG4gICAgfTtcblxuICAgIGZvciAodmFyIGUgaW4gZWxlbWVudCkge1xuICAgICAgaWYgKCFlbGVtZW50Mi5oYXNPd25Qcm9wZXJ0eShlKSkge1xuICAgICAgICBkaWZmLnJlbW92ZWQucHVzaCh7a2V5OiBlLCB2YWx1ZTogZWxlbWVudFtlXX0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGVsZW1lbnRbZV0gIT09IGVsZW1lbnQyW2VdICYmIGlzU3RyaW5nT3JOdW1iZXIoZWxlbWVudFtlXSkgJiZcbiAgICAgICAgICAgIGlzU3RyaW5nT3JOdW1iZXIoZWxlbWVudDJbZV0pKSB7XG4gICAgICAgICAgZGlmZi51cGRhdGVkLnB1c2goe2tleTogZSwgdmFsdWU6IGVsZW1lbnQyW2VdLCBvbGQ6IGVsZW1lbnRbZV19KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlbHNlIG5vdGhpbmdcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgZWxlbWVudHMgaW4gZWxlbWVudDIgdGhhdCBhcmUgbm90IGluIGVsZW1lbnRcbiAgICBmb3IgKHZhciBlMiBpbiBlbGVtZW50Mikge1xuICAgICAgaWYgKCFlbGVtZW50Lmhhc093blByb3BlcnR5KGUyKSkge1xuICAgICAgICBkaWZmLmFkZGVkLnB1c2goe2tleTogZTIsIHZhbHVlOiBlbGVtZW50MltlMl19KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGlmZi5hZGRlZC5sZW5ndGggfHwgZGlmZi5yZW1vdmVkLmxlbmd0aCB8fCBkaWZmLnVwZGF0ZWQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZGlmZjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBhIHN0cmluZyBvciBhIG51bWJlclxuICAgKiBAcGFyYW0gIHtPYmplY3R8U3RyaW5nfE51bWJlcn0gIG9ialxuICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICAgVHJ1ZSBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBzdHJpbmcgb3IgbnVtYmVyXG4gICAqL1xuICBmdW5jdGlvbiBpc1N0cmluZ09yTnVtYmVyKG9iaikge1xuICAgIHJldHVybiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseSgxKSA9PT0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseShvYmopIHx8XG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkoJycpID09PSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KG9iaikpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjb250YWluZXIgZm9yIHRpdGxlcyBhbmQgY2hhbmdlcyBsaXN0XG4gICAqIEByZXR1cm4ge0pRdWVyeX0galF1ZXJ5IG9iamVjdFxuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmluaXREaWZmVmlldyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAkKCc8ZGl2IGNsYXNzPVwiY2hhbmdlcyBjaGFuZ2VzLWxpc3RcIj48L2Rpdj4nKS5hcHBlbmRUbyh0aGlzLiRwYW5lQ2VudGVyKTtcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlIHNwZWNpZmljIHR5cGUgY29udGFpbmVycyBmb3IgY2hhbmdlc1xuICAgKiBAcGFyYW0gIHtKUXVlcnl9ICRjaGFuZ2VzTGlzdFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0aXRsZVxuICAgKiBAcmV0dXJuIHtKUXVlcnl9ICAgICAgICAgICAgICBDaGFuZ2VzIGxpc3QgY29udGFpbmVyXG4gICAqL1xuICBQdmpzRGlmZlZpZXdlci5wcm90b3R5cGUuaW5pdERpZmZWaWV3TGlzdCA9IGZ1bmN0aW9uKCRjaGFuZ2VzTGlzdCwgdHlwZSwgdGl0bGUpIHtcbiAgICB2YXIgJGNoYW5nZXNDb250YWluZXIgPSAkKCc8ZGl2IGNsYXNzPVwiY2hhbmdlcy1jb250YWluZXJcIiBkYXRhLWxldmVsPVwiMVwiIGRhdGEtdHlwZT1cIicgK1xuICAgICAgICB0eXBlICsgJ1wiPicpXG4gICAgICAuYXBwZW5kVG8oJGNoYW5nZXNMaXN0KVxuICAgICAgLmFwcGVuZCgkKCc8ZGl2IGNsYXNzPVwiY2hhbmdlcy10aXRsZSBjaGFuZ2VzLXBhcmVudCBjaGFuZ2UtJyArIHR5cGUgKyAnXCI+PHNwYW4+JyArXG4gICAgICAgICAgICB0aXRsZSArICc8L3NwYW4+PC9kaXY+JykpO1xuXG4gICAgLy8gUmV0dXJuIGNoYW5nZXMgbGlzdCBqUXVlcnkgZWxlbWVudFxuICAgIHJldHVybiAkKCc8ZGl2IGNsYXNzPVwiY2hhbmdlcy1saXN0XCI+PC9kaXY+JykuYXBwZW5kVG8oJGNoYW5nZXNDb250YWluZXIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW5kZXIgZGlmZmVyZW5jZXMgb2YgYSBzcGVjaWZpZWQgdHlwZVxuICAgKiBHcm91cCBkaWZmZXJlbmNlcyBieSBlbGVtZW50cyB0eXBlc1xuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtICB7T2JqZWN0fSBlbGVtZW50c0RpZmYgRWxlbWVudHMgZGlmZmVyZW5jZXNcbiAgICogQHBhcmFtICB7SlF1ZXJ5fSAkY2hhbmdlc0xpc3QgQ2hhbmdlcyBsaXN0IGNvbnRhaW5lclxuICAgKiBAcGFyYW0gIHtBcnJheX0gZWxlbWVudHMgICAgIExpc3Qgb2YgZWxlbWVudHNcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5yZW5kZXJEaWZmc09mVHlwZSA9IGZ1bmN0aW9uKFxuICAgICAgdHlwZSwgZWxlbWVudHNEaWZmLCAkY2hhbmdlc0xpc3QsIGVsZW1lbnRzKSB7XG4gICAgaWYgKGVsZW1lbnRzRGlmZi5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTb3J0IGJ5IGdwbWw6ZWxlbWVudCBhbmQgc2hhcGVcbiAgICB2YXIgZWxlbWVudHNEaWZmU29ydGVkID0gZWxlbWVudHNEaWZmLnNvcnQoc29ydGVyQnlFbG1lbnRBbmRTaGFwZSk7XG5cbiAgICAvLyBHcm91cCBlbGVtZW50c1xuICAgIHZhciBncm91cHMgPSB7fTtcbiAgICB2YXIgZ3JvdXBOYW1lID0gJyc7XG4gICAgdmFyIGVsZW1lbnRUeXBlID0gJyc7XG4gICAgdmFyIF90eXBlID0gJyc7XG4gICAgdmFyICRsaXN0Q29udGFpbmVyID0gbnVsbDtcbiAgICB2YXIgZ3JvdXBzT3JkZXJlZCA9IFtdO1xuXG4gICAgZm9yICh2YXIgZCBpbiBlbGVtZW50c0RpZmZTb3J0ZWQpIHtcbiAgICAgIGVsZW1lbnRUeXBlID0gZWxlbWVudHNEaWZmU29ydGVkW2RdWydncG1sOmVsZW1lbnQnXSA/XG4gICAgICAgICAgZWxlbWVudHNEaWZmU29ydGVkW2RdWydncG1sOmVsZW1lbnQnXS5yZXBsYWNlKC9eZ3BtbFxcOi8sICcnKSA6ICcnO1xuICAgICAgX3R5cGUgPSBlbGVtZW50c0RpZmZTb3J0ZWRbZF0udHlwZSA/IGVsZW1lbnRzRGlmZlNvcnRlZFtkXS50eXBlIDogJyc7XG5cbiAgICAgIGlmIChlbGVtZW50VHlwZSA9PT0gJ0ludGVyYWN0aW9uJykge1xuICAgICAgICBncm91cE5hbWUgPSAnSW50ZXJhY3Rpb25zJztcbiAgICAgIH0gZWxzZSBpZiAoZWxlbWVudFR5cGUgPT09ICdEYXRhTm9kZScpIHtcbiAgICAgICAgZ3JvdXBOYW1lID0gJ0RhdGEgTm9kZXMnO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50VHlwZSA9PT0gJycgJiYgX3R5cGUgIT09ICcnKSB7IC8vIEFzc3VtaW5nIGl0IGlzIGEgcmVmZXJlbmNlXG4gICAgICAgIC8vIGdyb3VwTmFtZSA9ICdSZWZlcmVuY2UnXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIGlmIChlbGVtZW50VHlwZSA9PT0gJ0dyb3VwJykge1xuICAgICAgICBncm91cE5hbWUgPSAnR3JvdXBzJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEFzc3VtZSB0aGF0IHRoZXJlIGFyZSBubyBvdGhlciBncm91cHNcbiAgICAgICAgZ3JvdXBOYW1lID0gJ0dyYXBoaWNhbCBPYmplY3RzJztcbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhpcyBpcyBmaXJzdCBlbGVtZW50IGluIGdyb3VwIHRoZW4gaW5pdCBpdFxuICAgICAgaWYgKGdyb3Vwc1tncm91cE5hbWVdID09PSB2b2lkIDApIHtcbiAgICAgICAgZ3JvdXBzW2dyb3VwTmFtZV0gPSBbXTtcbiAgICAgIH1cblxuICAgICAgZ3JvdXBzW2dyb3VwTmFtZV0ucHVzaChlbGVtZW50c0RpZmZTb3J0ZWRbZF0pO1xuICAgIH1cblxuICAgIC8vIFJlbmRlciBvbmx5IGlmIGF0IGxlYXN0IG9uZSBncm91cCBleGlzdHNcbiAgICBpZiAoISQuaXNFbXB0eU9iamVjdChncm91cHMpKSB7XG4gICAgICAkbGlzdENvbnRhaW5lciA9IHRoaXMuaW5pdERpZmZWaWV3TGlzdCgkY2hhbmdlc0xpc3QsIHR5cGUsIHR5cGUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICAgIHR5cGUuc2xpY2UoMSkpO1xuXG4gICAgICAvLyBDcmVhdGUgYW4gYXJyYXkgb2Ygb3JkZXJlZCBncm91cHNcbiAgICAgIGdyb3Vwc09yZGVyZWQgPSBvcmRlckdyb3Vwcyhncm91cHMpO1xuXG4gICAgICBmb3IgKHZhciBpIGluIGdyb3Vwc09yZGVyZWQpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJEaWZmR3JvdXAoXG4gICAgICAgICAgICB0eXBlLCBncm91cHNPcmRlcmVkW2ldLm5hbWUsIGdyb3Vwc09yZGVyZWRbaV0uZ3JvdXAsICRsaXN0Q29udGFpbmVyLCBlbGVtZW50cyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKiBAdHlwZSB7QXJyYXl9IEdyb3VwcyByZW5kZXIgb3JkZXIgKi9cbiAgdmFyIGdyb3Vwc09yZGVyID0gWydEYXRhIE5vZGVzJywgJ0dyb3VwcycsICdJbnRlcmFjdGlvbnMnLCAnR3JhcGhpY2FsIE9iamVjdHMnXTtcblxuICAvKipcbiAgICogT3JkZXIgZ3JvdXBzIGJ5IGdyb3Vwc09yZGVyXG4gICAqIElmIGEgZ3JvdXAgaXMgbm90IGluIGdyb3Vwc09yZGVyIGFwcGVuZCBpdFxuICAgKiBAcGFyYW0gIHtPYmplY3R9IGdyb3VwcyBBbiBvYmplY3Qgd2l0aCBncm91cHNcbiAgICogQHJldHVybiB7QXJyYXl9ICAgICAgICBPcmRlcmVkIGdyb3Vwc1xuICAgKi9cbiAgZnVuY3Rpb24gb3JkZXJHcm91cHMoZ3JvdXBzKSB7XG4gICAgdmFyIGdyb3VwTmFtZSA9ICcnO1xuICAgIHZhciBncm91cHNPcmRlcmVkID0gW107XG5cbiAgICAvLyBGaXJzdCBhZGQgb3JkZXJlZCBncm91cHNcbiAgICBmb3IgKHZhciBpIGluIGdyb3Vwc09yZGVyKSB7XG4gICAgICBncm91cE5hbWUgPSBncm91cHNPcmRlcltpXTtcblxuICAgICAgaWYgKGdyb3Vwcy5oYXNPd25Qcm9wZXJ0eShncm91cE5hbWUpKSB7XG4gICAgICAgIGdyb3Vwc09yZGVyZWQucHVzaCh7Z3JvdXA6IGdyb3Vwc1tncm91cE5hbWVdLCBuYW1lOiBncm91cE5hbWV9KTtcbiAgICAgICAgZGVsZXRlIGdyb3Vwc1tncm91cE5hbWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHRoZXJlIGFyZSBzdGlsbCBncm91cHMsIGFkZCB0aGVtIHRvIHRoZSBlbmQgaW4gYW55IG9yZGVyXG4gICAgZm9yIChncm91cE5hbWUgaW4gZ3JvdXBzKSB7XG4gICAgICBncm91cHNPcmRlcmVkLnB1c2goe2dyb3VwOiBncm91cHNbZ3JvdXBOYW1lXSwgbmFtZTogZ3JvdXBOYW1lfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3Vwc09yZGVyZWQ7XG4gIH1cblxuICAvKipcbiAgICogUmVuZGVyIGEgZ3JvdXBcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSAge1N0cmluZ30gZ3JvdXBOYW1lXG4gICAqIEBwYXJhbSAge0FycmF5fSBncm91cEVsZW1lbnRzXG4gICAqIEBwYXJhbSAge0pRdWVyeX0gJGxpc3RDb250YWluZXJcbiAgICogQHBhcmFtICB7QXJyYXl9IGVsZW1lbnRzICBMaXN0IG9mIGFsbCBlbGVtZW50cy5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBVc2VkIHRvIGdldCBlbGVtZW50cyB0aXRsZXMgKHJlcGxhY2luZyBpZHMpXG4gICAqL1xuICBQdmpzRGlmZlZpZXdlci5wcm90b3R5cGUucmVuZGVyRGlmZkdyb3VwID0gZnVuY3Rpb24oXG4gICAgICB0eXBlLCBncm91cE5hbWUsIGdyb3VwRWxlbWVudHMsICRsaXN0Q29udGFpbmVyLCBlbGVtZW50cykge1xuICAgIHZhciAkY29udGFpbmVyID0gJCgnPGRpdiBjbGFzcz1cImNoYW5nZXMtY29udGFpbmVyXCIgZGF0YS1sZXZlbD1cIjJcIiBkYXRhLXR5cGU9XCInICsgdHlwZSArICdcIi8+JylcbiAgICAgIC5hcHBlbmRUbygkbGlzdENvbnRhaW5lcik7XG4gICAgdmFyICRjb250YWluZXJUaXRsZSA9ICQoJzxkaXYgY2xhc3M9XCJjaGFuZ2VzLXRpdGxlIGNoYW5nZXMtcGFyZW50IGNoYW5nZS0nICsgdHlwZSArXG4gICAgICAgICdcIj48c3Bhbj4nICsgZ3JvdXBOYW1lICsgJzwvc3Bhbj48L2Rpdj4nKVxuICAgICAgLmFwcGVuZFRvKCRjb250YWluZXIpXG4gICAgICAuZGF0YSgnZ3JvdXAnLCBncm91cE5hbWUpO1xuICAgIHZhciAkY29udGFpbmVyTGlzdCA9ICQoJzxkaXYgY2xhc3M9XCJjaGFuZ2VzLWxpc3RcIiAvPicpLmFwcGVuZFRvKCRjb250YWluZXIpO1xuICAgIHZhciBlbGVtZW50VGl0bGUgPSAnJztcbiAgICB2YXIgJGVsZW1lbnRDb250YWluZXI7XG4gICAgdmFyICRlbGVtZW50VGl0bGU7XG4gICAgdmFyIGVsZW1lbnRDaGFuZ2VzID0gbnVsbDtcbiAgICB2YXIgJGVsZW1lbnRDaGFuZ2VzO1xuXG4gICAgLy8gU29ydCBncm91cCBlbGVtZW50c1xuICAgIGdyb3VwRWxlbWVudHMgPSBncm91cEVsZW1lbnRzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIGdldEVsZW1lbnRUaXRsZShhLCBlbGVtZW50cykudG9Mb3dlckNhc2UoKSA+XG4gICAgICAgICAgZ2V0RWxlbWVudFRpdGxlKGIsIGVsZW1lbnRzKS50b0xvd2VyQ2FzZSgpID8gMSA6IC0xO1xuICAgIH0pO1xuXG4gICAgLy8gUmVuZGVyIGVsZW1lbnRzXG4gICAgZm9yICh2YXIgZSBpbiBncm91cEVsZW1lbnRzKSB7XG4gICAgICBlbGVtZW50VGl0bGUgPSBnZXRFbGVtZW50VGl0bGUoZ3JvdXBFbGVtZW50c1tlXSwgZWxlbWVudHMpO1xuXG4gICAgICAkZWxlbWVudENvbnRhaW5lciA9ICQoJzxkaXYgY2xhc3M9XCJjaGFuZ2VzLWNvbnRhaW5lclwiIGRhdGEtbGV2ZWw9XCIzXCIgZGF0YS10eXBlPVwiJyArXG4gICAgICAgICAgdHlwZSArICdcIi8+JylcbiAgICAgICAgLmFwcGVuZFRvKCRjb250YWluZXJMaXN0KTtcbiAgICAgICRlbGVtZW50VGl0bGUgPSAkKCc8ZGl2IGNsYXNzPVwiY2hhbmdlcy10aXRsZSBjaGFuZ2UtJyArIHR5cGUgK1xuICAgICAgICAgICdcIj48c3Bhbj4nICsgZWxlbWVudFRpdGxlICsgJzwvc3Bhbj48L2Rpdj4nKVxuICAgICAgICAuYXBwZW5kVG8oJGVsZW1lbnRDb250YWluZXIpO1xuXG4gICAgICBlbGVtZW50Q2hhbmdlcyA9IHRoaXMuZ2V0RWxlbWVudENoYW5nZXModHlwZSwgZ3JvdXBFbGVtZW50c1tlXSwgZWxlbWVudHMpO1xuXG4gICAgICAvLyBSZW5kZXIgZWxlbWVudCBjaGFuZ2VzIChpZiBhbnkpXG4gICAgICBpZiAoZWxlbWVudENoYW5nZXMgJiYgZWxlbWVudENoYW5nZXMubGVuZ3RoKSB7XG4gICAgICAgICRlbGVtZW50Q2hhbmdlcyA9ICQoJzx1bCBjbGFzcz1cImVsZW1lbnQtY2hhbmdlc1wiPjwvdWw+Jyk7XG4gICAgICAgIGZvciAodmFyIGNoYW5nZSBpbiBlbGVtZW50Q2hhbmdlcykge1xuICAgICAgICAgICRlbGVtZW50Q2hhbmdlcy5hcHBlbmQoJzxsaT4nICsgZWxlbWVudENoYW5nZXNbY2hhbmdlXSArICc8L2xpPicpO1xuICAgICAgICB9XG5cbiAgICAgICAgJGVsZW1lbnRDaGFuZ2VzLmFwcGVuZFRvKCRlbGVtZW50VGl0bGUpO1xuICAgICAgfVxuXG4gICAgICAvLyBTdG9yZSBpZCBhbmQgZ3JvdXBcbiAgICAgICRlbGVtZW50VGl0bGVcbiAgICAgICAgLmRhdGEoJ2lkJywgZ3JvdXBFbGVtZW50c1tlXS5pZClcbiAgICAgICAgLmRhdGEoJ2dyb3VwJywgZ3JvdXBOYW1lKTtcblxuICAgICAgLy8gVE9ETyBvbmx5IGZvciBkZWJ1ZyBwdXJwb3NlXG4gICAgICAkZWxlbWVudFRpdGxlWzBdLnB2anNvbiA9IGdyb3VwRWxlbWVudHNbZV07XG5cbiAgICAgIC8vIENhY2hlIGVsZW1lbnRcbiAgICAgIHRoaXMuY2FjaGVFbGVtZW50KHR5cGUsIGdyb3VwTmFtZSwgZ3JvdXBFbGVtZW50c1tlXS5pZCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWNoZSBlbGVtZW50IGlkIGJhc2VkIG9uIHR5cGUgYW5kIGdyb3VwXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGdyb3VwXG4gICAqIEBwYXJhbSAge1N0cmluZ30gZWxlbWVudElkXG4gICAqL1xuICBQdmpzRGlmZlZpZXdlci5wcm90b3R5cGUuY2FjaGVFbGVtZW50ID0gZnVuY3Rpb24odHlwZSwgZ3JvdXAsIGVsZW1lbnRJZCkge1xuICAgIC8vIENyZWF0ZSBncm91cCBpZiBpdCBkb2VzIG5vdCBleGlzdFxuICAgIGlmICh0aGlzLmVsZW1lbnRzQ2FjaGVbdHlwZV1bZ3JvdXBdID09PSB2b2lkIDApIHtcbiAgICAgIHRoaXMuZWxlbWVudHNDYWNoZVt0eXBlXVtncm91cF0gPSBbXTtcbiAgICB9XG5cbiAgICAvLyBBZGQgZWxlbWVudCB0byBncm91cFxuICAgIHRoaXMuZWxlbWVudHNDYWNoZVt0eXBlXVtncm91cF0ucHVzaChlbGVtZW50SWQpO1xuXG4gICAgLy8gUmVmZXJlbmNlXG4gICAgaWYgKGdyb3VwID09PSAnUmVmZXJlbmNlJykge1xuICAgICAgdGhpcy5lbGVtZW50c1JlZmVyZW5jZXNbZWxlbWVudElkXSA9IHRydWU7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgYW4gYXJyYXkgb2YgZWxlbWVudHMgaWRzIGJhc2VkIG9uIHR5cGUgYW5kIGdyb3VwXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGdyb3VwXG4gICAqIEByZXR1cm4ge0FycmF5fSAgICAgICBBcnJheSBvZiBpZHNcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5nZXRBbGxFbGVtZW50c0lkcyA9IGZ1bmN0aW9uKHR5cGUsIGdyb3VwKSB7XG4gICAgaWYgKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdm9pZCAwKSB7XG4gICAgICAvLyBHZXQgYWxsIHR5cGVzXG4gICAgICByZXR1cm4gW10uY29uY2F0KHRoaXMuZ2V0QWxsRWxlbWVudHNJZHMoJ2FkZGVkJyksXG4gICAgICAgICAgdGhpcy5nZXRBbGxFbGVtZW50c0lkcygndXBkYXRlZCcpLFxuICAgICAgICAgIHRoaXMuZ2V0QWxsRWxlbWVudHNJZHMoJ3JlbW92ZWQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChncm91cCA9PT0gbnVsbCB8fCBncm91cCA9PT0gdm9pZCAwKSB7XG4gICAgICAgIC8vIEdldCBhbGwgZ3JvdXBzXG4gICAgICAgIHZhciBlbGVtZW50cyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGdyb3VwTmFtZSBpbiB0aGlzLmVsZW1lbnRzQ2FjaGVbdHlwZV0pIHtcbiAgICAgICAgICBlbGVtZW50cyA9IGVsZW1lbnRzLmNvbmNhdCh0aGlzLmdldEFsbEVsZW1lbnRzSWRzKHR5cGUsIGdyb3VwTmFtZSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gR2V0IHRoYXQgZ3JvdXBcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNDYWNoZVt0eXBlXVtncm91cF0uc2xpY2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBlbGVtZW50IHdpdGggZ2l2ZW4gaWQgaXMgYSByZWZlcmVuY2VcbiAgICogQHBhcmFtICB7U3RyaW5nfSAgaWQgRWxlbWVudCBpZFxuICAgKiBAcmV0dXJuIHtCb29sZWFufSAgICBUcnVlIGlmIGVsZW1lbnQgaWYgYSByZWZlcmVuY2VcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5pc0lkUmVmZXJlbmNlID0gZnVuY3Rpb24oaWQpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1JlZmVyZW5jZXNbaWRdID09PSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTb3J0ZXIgZnVuY3Rpb25cbiAgICovXG4gIGZ1bmN0aW9uIHNvcnRlckJ5RWxtZW50QW5kU2hhcGUoYSwgYikge1xuICAgIGlmIChhWydncG1sOmVsZW1lbnQnXSA9PT0gYlsnZ3BtbDplbGVtZW50J10pIHtcbiAgICAgIHJldHVybiBhLnNoYXBlID4gYi5zaGFwZSA/IDEgOiAtMTtcbiAgICB9XG4gICAgaWYgKGFbJ2dwbWw6ZWxlbWVudCddID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgaWYgKGJbJ2dwbWw6ZWxlbWVudCddID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgICByZXR1cm4gYVsnZ3BtbDplbGVtZW50J10gPiBiWydncG1sOmVsZW1lbnQnXSA/IDEgOiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZWxlbWVudCB0aXRsZVxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9iaiAgICAgIFB2anNvbiBlbGVtZW50XG4gICAqIEBwYXJhbSAge0FycmF5fSBlbGVtZW50cyBBcnJheSBvZiBwdmpzb24gZWxlbWVudHNcbiAgICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICBFbGVtZW50IHRpdGxlXG4gICAqL1xuICBmdW5jdGlvbiBnZXRFbGVtZW50VGl0bGUob2JqLCBlbGVtZW50cykge1xuICAgIGlmIChvYmpbJ2dwbWw6ZWxlbWVudCddID09PSAnZ3BtbDpJbnRlcmFjdGlvbicpIHtcbiAgICAgIHJldHVybiAnJyArIGxvb2t1cFRpdGxlQnlJZChvYmoucG9pbnRzWzBdLmlzQXR0YWNoZWRUbywgZWxlbWVudHMpICtcbiAgICAgICAgJyA8aSBjbGFzcz1cImljb24gaWNvbi1hcnJvdy1yaWdodFwiPjwvaT4gJyArXG4gICAgICAgIGxvb2t1cFRpdGxlQnlJZChvYmoucG9pbnRzWzFdLmlzQXR0YWNoZWRUbywgZWxlbWVudHMpO1xuICAgIH0gZWxzZSBpZiAob2JqWydncG1sOmVsZW1lbnQnXSA9PT0gJ2dwbWw6RGF0YU5vZGUnKSB7XG4gICAgICByZXR1cm4gb2JqLnRleHRDb250ZW50O1xuICAgIH0gZWxzZSBpZiAob2JqWydncG1sOmVsZW1lbnQnXSA9PT0gJ2dwbWw6TGFiZWwnKSB7XG4gICAgICByZXR1cm4gb2JqLnRleHRDb250ZW50O1xuICAgIH0gZWxzZSBpZiAob2JqWydncG1sOmVsZW1lbnQnXSA9PT0gJ2dwbWw6U2hhcGUnKSB7XG4gICAgICByZXR1cm4gb2JqLnNoYXBlLnNsaWNlKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBvYmouc2hhcGUuc2xpY2UoMSk7XG4gICAgfSBlbHNlIGlmIChvYmpbJ2dwbWw6ZWxlbWVudCddID09PSAnZ3BtbDpHcmFwaGljYWxMaW5lJykge1xuICAgICAgcmV0dXJuICdHcmFwaGljYWwgbGluZSc7XG4gICAgfSBlbHNlIGlmIChvYmpbJ2dwbWw6ZWxlbWVudCddID09PSAnZ3BtbDpTdGF0ZScpIHtcbiAgICAgIHJldHVybiAnU3RhdGUgJyArIG9iai50ZXh0Q29udGVudCArICcgKCcgKyBsb29rdXBUaXRsZUJ5SWQob2JqLmlzQXR0YWNoZWRUbywgZWxlbWVudHMpICsgJyknO1xuICAgIH0gZWxzZSBpZiAob2JqWydncG1sOmVsZW1lbnQnXSA9PT0gJ2dwbWw6R3JvdXAnKSB7XG4gICAgICByZXR1cm4gJ0dyb3VwJztcbiAgICB9IGVsc2UgaWYgKG9iai50eXBlICE9PSB2b2lkIDApIHsgLy8gQXNzdW1lIGl0IGlzIGEgcmVmZXJlbmNlXG4gICAgICByZXR1cm4gb2JqLnRleHRDb250ZW50IHx8IG9iai50aXRsZSB8fCBvYmouZGlzcGxheU5hbWUgfHwgJ25vIHRpdGxlJztcbiAgICB9XG5cbiAgICByZXR1cm4gJ25vIHRpdGxlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGl0bGUgb2YgZWxlbWVudCB3aXRoIGdpdmVuIGlkXG4gICAqIEBwYXJhbSAge1N0cmluZ30gaWRcbiAgICogQHBhcmFtICB7QXJyYXl9IGVsZW1lbnRzIEFycmF5IG9mIHB2anNvbiBlbGVtZW50c1xuICAgKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgIEVsZW1lbnQgdGl0bGVcbiAgICovXG4gIGZ1bmN0aW9uIGxvb2t1cFRpdGxlQnlJZChpZCwgZWxlbWVudHMpIHtcbiAgICAvLyBJZiBlbGVtZW50IGhhcyBubyBpZCB0aGVuIHN0b3AgbG9va3VwXG4gICAgaWYgKGlkID09PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiAnVW5rbm93bic7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgbCBpbiBlbGVtZW50cykge1xuICAgICAgaWYgKGVsZW1lbnRzW2xdLmlkICE9PSBudWxsICYmIGlkID09PSBlbGVtZW50c1tsXS5pZCkge1xuICAgICAgICAvLyBDaGVjayBpZiBpdCBpcyBhbiBpbnRlcmFjdGlvbiB0byBhdm9pZCBjaXJjdWxhciByZWN1cnNpb25cbiAgICAgICAgaWYgKGVsZW1lbnRzW2xdWydncG1sOmVsZW1lbnQnXSA9PT0gJ2dwbWw6SW50ZXJhY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuICdJbnRlcmFjdGlvbic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGdldEVsZW1lbnRUaXRsZShlbGVtZW50c1tsXSwgZWxlbWVudHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgbm8gbWF0Y2ggZm91bmQgdGhlbiByZXR1cm4gaW5pdGlhbCBJRFxuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIHZhciBub3JtYWxpemF0aW9uRmxvYXRLZXlzID0gWyd3aWR0aCcsICdoZWlnaHQnLCAneCcsICd5JywgJ3JvdGF0aW9uJ107XG4gIHZhciBub3JtYWxpemF0aW9uSWRLZXlzID0gWydpc1BhcnRPZicsICdjb250cm9sbGVyJywgJ2NvbnRyb2xsZWQnXTtcblxuICAvKipcbiAgICogTm9ybWFsaXplIHZhbHVlczpcbiAgICogKiBSb3VuZCBudW1iZXJzXG4gICAqICogUmVwbGFjZSBpZHMgd2l0aCBlbGVtZW50cyB0aXRsZXNcbiAgICogQHBhcmFtICB7U3RyaW5nfE51bWJlcn0gdmFsdWVcbiAgICogQHBhcmFtICB7U3RyaW5nfSBrZXlcbiAgICogQHBhcmFtICB7QXJyYXl9IGVsZW1lbnRzIEFycmF5IG9mIHB2anNvbiBlbGVtZW50c1xuICAgKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfSAgICAgICAgICBOb3JtYWxpemVkIHRpdGxlXG4gICAqL1xuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSwga2V5LCBlbGVtZW50cykge1xuICAgIGlmIChub3JtYWxpemF0aW9uRmxvYXRLZXlzLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKHBhcnNlRmxvYXQodmFsdWUpICogMTAwKSAvIDEwMDtcbiAgICB9IGVsc2UgaWYgKG5vcm1hbGl6YXRpb25JZEtleXMuaW5kZXhPZihrZXkpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIGxvb2t1cFRpdGxlQnlJZCh2YWx1ZSwgZWxlbWVudHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBlbGVtZW50IGNoYW5nZXNcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSAge09iamVjdH0gZWxlbWVudCAgUHZqc29uIGVsZW1lbnRcbiAgICogQHBhcmFtICB7QXJyYXl9IGVsZW1lbnRzIEFycmF5IG9mIHB2anNvbiBlbGVtZW50c1xuICAgKiBAcmV0dXJuIHtBcnJheX0gICAgICAgICAgQXJyYXkgb2Ygc3RyaW5ncyAoY2hhbmdlcyB0aXRsZXMpXG4gICAqL1xuICBQdmpzRGlmZlZpZXdlci5wcm90b3R5cGUuZ2V0RWxlbWVudENoYW5nZXMgPSBmdW5jdGlvbih0eXBlLCBlbGVtZW50LCBlbGVtZW50cykge1xuICAgIHZhciB0aXRsZXMgPSBbXTtcblxuICAgIGlmICh0eXBlID09PSAnYWRkZWQnKSB7XG4gICAgICBpZiAoZWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnZW50aXR5UmVmZXJlbmNlJykpIHtcbiAgICAgICAgdGl0bGVzLnB1c2goJ0FkZGVkIDxzdHJvbmc+cmVmZXJlbmNlPC9zdHJvbmc+OiAnICsgZWxlbWVudC5lbnRpdHlSZWZlcmVuY2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3VwZGF0ZWQnKSB7XG4gICAgICB2YXIgb2xkVmFsdWUgPSAnJztcbiAgICAgIHZhciBuZXdWYWx1ZSA9ICcnO1xuICAgICAgdmFyIGRpZmYgPSBlbGVtZW50LmRpZmY7XG5cbiAgICAgIGZvciAodmFyIGFkZGVkSW5kZXggaW4gZGlmZi5hZGRlZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKGRpZmYuYWRkZWRbYWRkZWRJbmRleF0udmFsdWUsXG4gICAgICAgICAgICBkaWZmLmFkZGVkW2FkZGVkSW5kZXhdLmtleSxcbiAgICAgICAgICAgIGVsZW1lbnRzKTtcbiAgICAgICAgdGl0bGVzLnB1c2goJ0FkZGVkOiA8c3Ryb25nPicgKyBkaWZmLmFkZGVkW2FkZGVkSW5kZXhdLmtleSArICc8L3N0cm9uZz4gJyArIG5ld1ZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgcmVtb3ZlZEluZGV4IGluIGRpZmYucmVtb3ZlZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKGRpZmYucmVtb3ZlZFtyZW1vdmVkSW5kZXhdLnZhbHVlLFxuICAgICAgICAgICAgZGlmZi5yZW1vdmVkW3JlbW92ZWRJbmRleF0ua2V5LFxuICAgICAgICAgICAgZWxlbWVudHMpO1xuICAgICAgICB0aXRsZXMucHVzaCgnUmVtb3ZlZDogPHN0cm9uZz4nICsgZGlmZi5yZW1vdmVkW3JlbW92ZWRJbmRleF0ua2V5ICsgJzwvc3Ryb25nPiAnICsgbmV3VmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciB1cGRhdGVkSW5kZXggaW4gZGlmZi51cGRhdGVkKSB7XG4gICAgICAgIG9sZFZhbHVlID0gbm9ybWFsaXplVmFsdWUoZGlmZi51cGRhdGVkW3VwZGF0ZWRJbmRleF0ub2xkLFxuICAgICAgICAgICAgZGlmZi51cGRhdGVkW3VwZGF0ZWRJbmRleF0ua2V5LFxuICAgICAgICAgICAgZWxlbWVudHMpO1xuICAgICAgICBuZXdWYWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKGRpZmYudXBkYXRlZFt1cGRhdGVkSW5kZXhdLnZhbHVlLFxuICAgICAgICAgICAgZGlmZi51cGRhdGVkW3VwZGF0ZWRJbmRleF0ua2V5LFxuICAgICAgICAgICAgZWxlbWVudHMpO1xuXG4gICAgICAgIHRpdGxlcy5wdXNoKCc8c3Ryb25nPicgKyBkaWZmLnVwZGF0ZWRbdXBkYXRlZEluZGV4XS5rZXkgKyAnOjwvc3Ryb25nPiAnICsgb2xkVmFsdWUgK1xuICAgICAgICAgICAgJyA8aSBjbGFzcz1cImljb24gaWNvbi1hcnJvdy1yaWdodFwiPjwvaT4gJyArIG5ld1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGl0bGVzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIb29rIGNsaWNraW5nIG9uIGRpZmZWaWV3ZXJlIG9mIHVzaW5nIGFycm93IGtleXMgd2hlbiBkaWZmVmlld2VyZSBpcyBhY3RpdmVcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5ob29rRGlmZk5hdmlnYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHBhbmVDZW50ZXIgPSB0aGlzLiRwYW5lQ2VudGVyO1xuICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICB2YXIgaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgdmFyIGluaXRpYWxab29tID0gdGhpcy5wdmpzLmdldFpvb20oKTtcbiAgICB2YXIgaW5pdGlhbFpvb20yID0gdGhpcy5wdmpzMi5nZXRab29tKCk7XG5cbiAgICAvL3RoaXMuaW5pdEhpZ2hsaWdodGluZygpO1xuXG4gICAgJHBhbmVDZW50ZXIub24oJ2NsaWNrJywgJy5jaGFuZ2VzLXRpdGxlJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgaXNGb2N1c2VkID0gdHJ1ZTtcblxuICAgICAgLy8gVmlzdWFsbHkgb3BlbmluZy9jbG9zaW5nIHRpdGxlc1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIHZhciAkYWN0aXZlID0gJHRoaXM7XG5cbiAgICAgIC8vIE9ubHkgaWYgZWxlbWVudCBpcyBub3QgYWN0aXZlXG4gICAgICBpZiAoISR0aGlzLnBhcmVudCgpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAkcGFuZUNlbnRlci5maW5kKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkcGFuZUNlbnRlci5maW5kKCcub3BlbicpLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICRwYW5lQ2VudGVyLmZpbmQoJy5mb2N1cycpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICAgICAgICAkdGhpcy5wYXJlbnQoKS5hZGRDbGFzcygnYWN0aXZlIGZvY3VzJyk7XG4gICAgICAgICR0aGlzLnBhcmVudHNVbnRpbCgkcGFuZUNlbnRlcikuYWRkQ2xhc3MoJ29wZW4nKTtcblxuICAgICAgICAvLyBBdHRlbnVhdGUgYWxsIHByZXZpb3VzIGVsZW1lbnRzXG4gICAgICAgIHRoYXQuYXR0ZW51YXRlKCk7XG5cbiAgICAgICAgLy8gSGlnaGxpZ2h0IHNlbGVjdGVkXG4gICAgICAgIHRoYXQuaGlnaGxpZ2h0SWRzKHRoYXQuZ2V0VGl0bGVJZHMoJGFjdGl2ZSksIGdldFRpdGxlVHlwZSgkYWN0aXZlKSk7XG4gICAgICB9XG4gICAgfSkub24oJ2RibGNsaWNrJywgJy5jaGFuZ2VzLXRpdGxlJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgdGhhdC56b29tVG9UaXRsZSgkKHRoaXMpLCBpbml0aWFsWm9vbSwgaW5pdGlhbFpvb20yKTtcbiAgICB9KTtcblxuICAgIHZhciBrZXlzTWFwID0ge1xuICAgICAgMzc6ICdsZWZ0JyxcbiAgICAgIDM4OiAndXAnLFxuICAgICAgMzk6ICdyaWdodCcsXG4gICAgICA0MDogJ2Rvd24nXG4gICAgfTtcblxuICAgICQoZG9jdW1lbnQpXG4gICAgICAuY2xpY2soZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgaXNGb2N1c2VkID0gZmFsc2U7XG4gICAgICAgICRwYW5lQ2VudGVyLmZpbmQoJy5mb2N1cycpLnJlbW92ZUNsYXNzKCdmb2N1cycpO1xuICAgICAgfSlcbiAgICAgIC5rZXlkb3duKGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIGlmICghaXNGb2N1c2VkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldi5rZXlDb2RlIDwgMzcgfHwgZXYua2V5Q29kZSA+IDQwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhhdC5uYXZpZ2F0ZShrZXlzTWFwW2V2LmtleUNvZGVdKTtcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IGNoYW5nZSB0eXBlIGZyb20galF1ZXJ5IHRpdGxlXG4gICAqIEBwYXJhbSAge0pRdWVyeX0gJGFjdGl2ZSBDaGFuZ2UgdGl0bGVcbiAgICogQHJldHVybiB7U3RyaW5nfE51bGx9ICAgICAgICAgQ2hhbmdlIHR5cGVcbiAgICovXG4gIGZ1bmN0aW9uIGdldFRpdGxlVHlwZSgkYWN0aXZlKSB7XG4gICAgaWYgKCRhY3RpdmUubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gJGFjdGl2ZS5wYXJlbnQoKS5kYXRhKCd0eXBlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaWQgb2YgY2hhbmdlIHRpdGxlLlxuICAgKiBJZiBpdCBpcyBhIHBhcmVudCB0aXRsZSB0aGVuIGdldCBpZHMgb2YgY2hhbmdlIHRpdGxlIGFuZCBhbGwgaXRzIGNoaWxkcmVuXG4gICAqIEBwYXJhbSAge0pRdWVyeX0gJGFjdGl2ZSBDaGFuZ2UgdGl0bGVcbiAgICogQHJldHVybiB7QXJyYXl9ICAgICAgICAgQXJyYXkgb2YgcHZqc29uIGVsZW1lbnRzIGlkc1xuICAgKi9cbiAgUHZqc0RpZmZWaWV3ZXIucHJvdG90eXBlLmdldFRpdGxlSWRzID0gZnVuY3Rpb24oJGFjdGl2ZSkge1xuICAgIHZhciBpZHMgPSBbXTtcbiAgICBpZiAoJGFjdGl2ZS5sZW5ndGgpIHtcbiAgICAgIHZhciBsZXZlbCA9ICskYWN0aXZlLnBhcmVudCgpLmRhdGEoJ2xldmVsJyk7XG4gICAgICB2YXIgdHlwZSA9IGdldFRpdGxlVHlwZSgkYWN0aXZlKTtcbiAgICAgIHZhciBncm91cCA9IG51bGw7XG4gICAgICB2YXIgaWQgPSBudWxsO1xuXG4gICAgICBpZiAobGV2ZWwgPT09IDEpIHtcbiAgICAgICAgLy8gZ3JvdXAgYW5kIGlkID0gbnVsbFxuICAgICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gMikge1xuICAgICAgICBncm91cCA9ICRhY3RpdmUuZGF0YSgnZ3JvdXAnKTtcbiAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IDMpIHtcbiAgICAgICAgZ3JvdXAgPSAkYWN0aXZlLmRhdGEoJ2dyb3VwJyk7XG4gICAgICAgIGlkID0gJGFjdGl2ZS5kYXRhKCdpZCcpO1xuICAgICAgfVxuXG4gICAgICBpZHMgPSB0aGlzLmdldElkcyh0eXBlLCBncm91cCwgaWQpO1xuICAgIH1cblxuICAgIHJldHVybiBpZHM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldCBpZHMgb2YgZWxlbWVudCBieSB0eXBlLCBncm91cCBhbmQgZWxlbWVudCBpZFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtICB7U3RyaW5nfSBncm91cFxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IGlkXG4gICAqIEByZXR1cm4ge0FycmF5fSAgICAgICBBcnJheSBvZiBwdmpzb24gZWxlbWVudHMgaWRzXG4gICAqL1xuICBQdmpzRGlmZlZpZXdlci5wcm90b3R5cGUuZ2V0SWRzID0gZnVuY3Rpb24odHlwZSwgZ3JvdXAsIGlkKSB7XG4gICAgdmFyIGlkcyA9IFtdO1xuICAgIGlmICh0eXBlICYmIGdyb3VwICYmIGlkKSB7XG4gICAgICBpZHMgPSBbaWRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZHMgPSB0aGlzLmdldEFsbEVsZW1lbnRzSWRzKHR5cGUsIGdyb3VwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaWRzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIaWdobGlnaHQgcHZqc29uIGVsZW1lbnRzIGJ5IGlkc1xuICAgKiBAcGFyYW0gIHtBcnJheX0gaWRzICBBcnJhdyBvZiBwdmpzb24gZWxlbWVudHMgaWRzXG4gICAqIEBwYXJhbSAge1N0cmluZ30gdHlwZSBDaGFuZ2VzIHR5cGVcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5oaWdobGlnaHRJZHMgPSBmdW5jdGlvbihpZHMsIHR5cGUpIHtcbiAgICB2YXIgY29sb3JzID0ge307XG5cbiAgICBpZiAodHlwZSA9PT0gJ2FkZGVkJykge1xuICAgICAgY29sb3JzLmJhY2tncm91bmRDb2xvciA9IGNvbG9ycy5ib3JkZXJDb2xvciA9ICcjMEU1M0E3JztcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd1cGRhdGVkJykge1xuICAgICAgY29sb3JzLmJhY2tncm91bmRDb2xvciA9IGNvbG9ycy5ib3JkZXJDb2xvciA9ICcjRkZGNzAwJztcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdyZW1vdmVkJykge1xuICAgICAgY29sb3JzLmJhY2tncm91bmRDb2xvciA9IGNvbG9ycy5ib3JkZXJDb2xvciA9ICcjRjEwMDI2JztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpIGluIGlkcykge1xuICAgICAgdmFyIGhpZ2hsaWdodFN0cmluZztcbiAgICAgIC8vIElmIGlzIGEgcmVmZXJlbmNlXG4gICAgICBpZiAodGhpcy5pc0lkUmVmZXJlbmNlKGlkc1tpXSkpIHtcbiAgICAgICAgaGlnaGxpZ2h0U3RyaW5nID0gJ3hyZWY6aWQ6JyArIGlkc1tpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGhpZ2hsaWdodFN0cmluZyA9ICcjJyArIGlkc1tpXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUgPT09ICdyZW1vdmVkJyB8fCB0eXBlID09PSAndXBkYXRlZCcpIHtcbiAgICAgICAgdGhpcy5wdmpzLmhpZ2hsaWdodChoaWdobGlnaHRTdHJpbmcsIG51bGwsIGNvbG9ycyk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSA9PT0gJ3VwZGF0ZWQnIHx8IHR5cGUgPT09ICdhZGRlZCcpIHtcbiAgICAgICAgdGhpcy5wdmpzMi5oaWdobGlnaHQoaGlnaGxpZ2h0U3RyaW5nLCBudWxsLCBjb2xvcnMpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSGlnaGxpZ2h0IGFsbCBwdmpzb24gZWxlbWVudHMgdGhhdCBoYXZlIGNoYW5nZXMgb2YgcHJvdmlkZWQgdHlwZVxuICAgKiBAcGFyYW0gIHtTdHJpbmd9IHR5cGUgQ2hhbmdlIHR5cGVcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5oaWdobGlnaHRUeXBlID0gZnVuY3Rpb24odHlwZSkge1xuICAgIHRoaXMuaGlnaGxpZ2h0SWRzKHRoaXMuZ2V0SWRzKHR5cGUpLCB0eXBlKTtcbiAgfTtcblxuICAvKipcbiAgICogSGlnaGxpZ2h0IGFsbCBjaGFuZ2VzIG9mIGEgY2hhbmdlIHRpdGxlXG4gICAqIEBwYXJhbSAge2pRdWVyeX0gJGFjdGl2ZSBDaGFuZ2UgdGl0bGVcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5oaWdobGlnaHRUaXRsZSA9IGZ1bmN0aW9uKCRhY3RpdmUpIHtcbiAgICB0aGlzLmhpZ2hsaWdodElkcyh0aGlzLmdldFRpdGxlSWRzKCRhY3RpdmUpLCBnZXRUaXRsZVR5cGUoJGFjdGl2ZSkpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBab29tIGFuZCBwYW4gcGF0aHdheXMgaW4gc3VjaCBhIHdheSB0aGF0IGVsZW1lbnRzXG4gICAqIGZyb20gY2hhbmdlcyB0aXRsZSB3aWxsIGJlIGZvY3VzZWQgKG1heGltYWxseSB2aXNpYmxlKVxuICAgKiBAcGFyYW0gIHtKUXVlcnl9ICRhY3RpdmUgICAgICAgQ2hhbmdlIHRpdGxlXG4gICAqIEBwYXJhbSAge0Zsb2F0fSByZWxhdGl2ZVpvb20xIDEvSW5pdGlhbCB6b29tIG9mIGZpcnN0IHBhdGh3YXlcbiAgICogQHBhcmFtICB7RmxvYXR9IHJlbGF0aXZlWm9vbTIgMS9Jbml0aWFsIHpvb20gb2Ygc2Vjb25kIHBhdGh3YXlcbiAgICogQHJldHVybiB7W3R5cGVdfSAgICAgICAgICAgICAgIFtkZXNjcmlwdGlvbl1cbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS56b29tVG9UaXRsZSA9IGZ1bmN0aW9uKCRhY3RpdmUsIHJlbGF0aXZlWm9vbTEsIHJlbGF0aXZlWm9vbTIpIHtcbiAgICBpZiAocmVsYXRpdmVab29tMSA9PT0gdm9pZCAwKSB7XG4gICAgICByZWxhdGl2ZVpvb20xID0gMTtcbiAgICB9XG4gICAgaWYgKHJlbGF0aXZlWm9vbTIgPT09IHZvaWQgMCkge1xuICAgICAgcmVsYXRpdmVab29tMiA9IDE7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSBnZXRUaXRsZVR5cGUoJGFjdGl2ZSk7XG4gICAgdmFyIHJlbGF0aXZlWm9vbSA9IHR5cGUgPT09ICdhZGRlZCcgPyByZWxhdGl2ZVpvb20yIDogcmVsYXRpdmVab29tMTtcbiAgICB2YXIgem9vbSA9IHJlbGF0aXZlWm9vbTtcbiAgICB2YXIgcHZqcyA9IHR5cGUgPT09ICdhZGRlZCcgPyB0aGlzLnB2anMyIDogdGhpcy5wdmpzO1xuICAgIHZhciBzZWxlY3RvciA9IHB2anMuZ2V0U291cmNlRGF0YSgpLnNlbGVjdG9yO1xuICAgIHZhciBiQm94ID0gc2VsZWN0b3IuZ2V0QkJveCgpO1xuICAgIHZhciBpZHMgPSB0aGlzLmdldFRpdGxlSWRzKCRhY3RpdmUpO1xuICAgIHZhciBoaWdobGlnaHRTZWxlY3RvciA9IHNlbGVjdG9yLmZpbHRlcmVkQnlDYWxsYmFjayhmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICByZXR1cm4gKGVsZW1lbnQuaWQgIT09IHZvaWQgMCAmJiBpZHMuaW5kZXhPZihlbGVtZW50LmlkKSAhPT0gLTEpO1xuICAgIH0pO1xuICAgIHZhciBoaWdobGlnaHRCQm94ID0gaGlnaGxpZ2h0U2VsZWN0b3IuZ2V0QkJveCgpO1xuXG4gICAgLy8gSWYgdXBkYXRlZCBnZXQgQkJveCBvZiBlbGVtZW50IGZyb20gYm90aCBzY3JlZW5zXG4gICAgaWYgKHR5cGUgPT09ICd1cGRhdGVkJykge1xuICAgICAgaGlnaGxpZ2h0U2VsZWN0b3IgPSB0aGlzLnB2anMyLmdldFNvdXJjZURhdGEoKS5zZWxlY3Rvci5maWx0ZXJlZEJ5Q2FsbGJhY2soZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gKGVsZW1lbnQuaWQgIT09IHZvaWQgMCAmJiBpZHMuaW5kZXhPZihlbGVtZW50LmlkKSAhPT0gLTEpO1xuICAgICAgfSk7XG4gICAgICB2YXIgaGlnaGxpZ2h0QkJveDIgPSBoaWdobGlnaHRTZWxlY3Rvci5nZXRCQm94KCk7XG5cbiAgICAgIGhpZ2hsaWdodEJCb3gubGVmdCA9IE1hdGgubWluKGhpZ2hsaWdodEJCb3gubGVmdCwgaGlnaGxpZ2h0QkJveDIubGVmdCk7XG4gICAgICBoaWdobGlnaHRCQm94LnRvcCA9IE1hdGgubWluKGhpZ2hsaWdodEJCb3gudG9wLCBoaWdobGlnaHRCQm94Mi50b3ApO1xuICAgICAgaGlnaGxpZ2h0QkJveC5yaWdodCA9IE1hdGgubWF4KGhpZ2hsaWdodEJCb3gucmlnaHQsIGhpZ2hsaWdodEJCb3gyLnJpZ2h0KTtcbiAgICAgIGhpZ2hsaWdodEJCb3guYm90dG9tID0gTWF0aC5tYXgoaGlnaGxpZ2h0QkJveC5ib3R0b20sIGhpZ2hsaWdodEJCb3gyLmJvdHRvbSk7XG4gICAgICBoaWdobGlnaHRCQm94LndpZHRoID0gTWF0aC5hYnMoaGlnaGxpZ2h0QkJveC5yaWdodCAtIGhpZ2hsaWdodEJCb3gubGVmdCk7XG4gICAgICBoaWdobGlnaHRCQm94LmhlaWdodCA9IE1hdGguYWJzKGhpZ2hsaWdodEJCb3guYm90dG9tIC0gaGlnaGxpZ2h0QkJveC50b3ApO1xuICAgIH1cblxuICAgIHpvb20gPSByZWxhdGl2ZVpvb20gLyAoTWF0aC5tYXgoXG4gICAgICAgICAgaGlnaGxpZ2h0QkJveC53aWR0aCAvIGJCb3gud2lkdGgsIGhpZ2hsaWdodEJCb3guaGVpZ2h0IC8gYkJveC5oZWlnaHQpIHx8XG4gICAgICAgIDEpO1xuXG4gICAgLy8gTG93ZXIgem9vbSBieSAzMCVcbiAgICB6b29tICo9IDAuNztcblxuICAgIHB2anMuem9vbSh6b29tKTtcblxuICAgIC8vIEdldCByZWFsIHNldCB6b29tXG4gICAgdmFyIGJvdW5kZWRab29tID0gcHZqcy5nZXRab29tKCk7XG5cbiAgICAvLyBDZW50ZXIgcHZqcyAoaXQgaXMgbmVjZXNzYXJ5IHRvIHBhbiBieSAxNSBiZWNhdXNlIG9mIHByZXZpb3VzIHpvb20gb3V0IGJ5IDMwJSlcbiAgICB2YXIgeCA9IC1oaWdobGlnaHRCQm94LmxlZnQgKiBib3VuZGVkWm9vbSArIChoaWdobGlnaHRCQm94LndpZHRoICogYm91bmRlZFpvb20gKiAwLjE1KTtcbiAgICB2YXIgeSA9IC1oaWdobGlnaHRCQm94LnRvcCAqIGJvdW5kZWRab29tICsgKGhpZ2hsaWdodEJCb3guaGVpZ2h0ICogYm91bmRlZFpvb20gKiAwLjE1KTtcblxuICAgIHB2anMucGFuKHt4OiB4LCB5OiB5fSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE5hdmlnYXRlIHRvIHByb3ZpZGVkIGRpcmVjdGlvbi4gUmVsYXRpdmUgdG8gZm9jdXNlZCBjaGFuZ2UgdGl0bGVcbiAgICogQHBhcmFtICB7U3RyaW5nfSBkaXJlY3Rpb24gTmF2aWdhdGlvbiBkaXJlY3Rpb25cbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5uYXZpZ2F0ZSA9IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuICAgIHZhciAkcGFuZUNlbnRlciA9IHRoaXMuJHBhbmVDZW50ZXI7XG4gICAgdmFyICRmb2N1c2VkID0gJHBhbmVDZW50ZXIuZmluZCgnLmZvY3VzJykuZmlyc3QoKTtcbiAgICB2YXIgJG5leHQgPSBudWxsO1xuICAgIHZhciAkbmV4dFRpdGxlID0gbnVsbDtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09ICd1cCcgfHwgZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcbiAgICAgIC8vIFByZXZpb3VzIHNpYmxpbmdcbiAgICAgICRuZXh0ID0gJGZvY3VzZWQucHJldigpO1xuXG4gICAgICAvLyBJZiBubyBwcmV2aW91cyBzaWJsaW5nIHRoYW4gbmV4dCBpcyBwYXJlbnRcbiAgICAgIGlmICgkbmV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJG5leHQgPSAkZm9jdXNlZC5wYXJlbnQoKS5jbG9zZXN0KCcuY2hhbmdlcy1jb250YWluZXInKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gJ2Rvd24nIHx8IGRpcmVjdGlvbiA9PT0gJ3JpZ2h0Jykge1xuICAgICAgLy8gRmlyc3QgY2hpbGRcbiAgICAgICRuZXh0ID0gJGZvY3VzZWQuY2hpbGRyZW4oJy5jaGFuZ2VzLWxpc3QnKS5jaGlsZHJlbignLmNoYW5nZXMtY29udGFpbmVyJykuZmlyc3QoKTtcblxuICAgICAgLy8gTmV4dCBwYXJlbnQgc2libGluZyBpZiBubyBjaGlsZHNcbiAgICAgIGlmICgkbmV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJG5leHQgPSAkZm9jdXNlZC5uZXh0KCk7XG5cbiAgICAgICAgaWYgKCRuZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICRuZXh0ID0gJGZvY3VzZWQucGFyZW50KCkuY2xvc2VzdCgnLmNoYW5nZXMtY29udGFpbmVyJykubmV4dCgpO1xuICAgICAgICAgIGlmICgkbmV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICRuZXh0ID0gJGZvY3VzZWQucGFyZW50KCkuY2xvc2VzdCgnLmNoYW5nZXMtY29udGFpbmVyJykucGFyZW50KClcbiAgICAgICAgICAgICAgLmNsb3Nlc3QoJy5jaGFuZ2VzLWNvbnRhaW5lcicpLm5leHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoJG5leHQgJiYgJG5leHQubGVuZ3RoICYmICRuZXh0LmdldCgwKSAhPT0gJGZvY3VzZWQuZ2V0KDApKSB7XG4gICAgICAkcGFuZUNlbnRlci5maW5kKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJHBhbmVDZW50ZXIuZmluZCgnLm9wZW4nKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuICAgICAgJHBhbmVDZW50ZXIuZmluZCgnLmZvY3VzJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgICAkbmV4dC5hZGRDbGFzcygnYWN0aXZlIGZvY3VzIG9wZW4nKTtcbiAgICAgICRuZXh0LnBhcmVudHNVbnRpbCgkcGFuZUNlbnRlcikuYWRkQ2xhc3MoJ29wZW4nKTtcblxuICAgICAgJG5leHRUaXRsZSA9ICRuZXh0LmNoaWxkcmVuKCcuY2hhbmdlcy10aXRsZScpO1xuXG4gICAgICAvLyBTY3JvbGwgZGlmZnZpZXdlciB0byBjb250YWluIGZvY3VzZWQgdGl0bGVcbiAgICAgIGlmICgkbmV4dFRpdGxlLm9mZnNldCgpLnRvcCA8IDApIHtcbiAgICAgICAgJHBhbmVDZW50ZXIuc2Nyb2xsVG9wKCRwYW5lQ2VudGVyLnNjcm9sbFRvcCgpICsgJG5leHRUaXRsZS5vZmZzZXQoKS50b3ApO1xuICAgICAgfSBlbHNlIGlmICgkbmV4dFRpdGxlLm9mZnNldCgpLnRvcCArICRuZXh0VGl0bGUub3V0ZXJIZWlnaHQoKSA+ICRwYW5lQ2VudGVyLmhlaWdodCgpKSB7XG4gICAgICAgICRwYW5lQ2VudGVyLnNjcm9sbFRvcCgkcGFuZUNlbnRlci5zY3JvbGxUb3AoKSArICgkbmV4dFRpdGxlLm9mZnNldCgpLnRvcCArXG4gICAgICAgICAgICAgICRuZXh0VGl0bGUub3V0ZXJIZWlnaHQoKSAtICRwYW5lQ2VudGVyLmhlaWdodCgpKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEF0dGVudWF0ZSBhbGwgcHJldmlvdXMgZWxlbWVudHNcbiAgICAgIHRoaXMuYXR0ZW51YXRlKCk7XG4gICAgICAvLyBIaWdobGlnaHQgc2VsZWN0ZWRcbiAgICAgIHRoaXMuaGlnaGxpZ2h0VGl0bGUoJG5leHQuY2hpbGRyZW4oJy5jaGFuZ2VzLXRpdGxlJykpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBoaWdobGlnaHRpbmcgZm9yIHBhdGh3YXlzXG4gICAqIFN0b3JlIGhpZ2hsaWdodGVyIGluc3RhbmNlcyBhcyB0aGlzLmgxIGFuZCB0aGlzLmgyXG4gICAqL1xuICBQdmpzRGlmZlZpZXdlci5wcm90b3R5cGUuaW5pdEhpZ2hsaWdodGluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaGkgPSB3aW5kb3cucHZqc0hpZ2hsaWdodGVyKHRoaXMucHZqcywge2Rpc3BsYXlJbnB1dEZpZWxkOiBmYWxzZX0pO1xuICAgIHRoaXMuaGkyID0gd2luZG93LnB2anNIaWdobGlnaHRlcih0aGlzLnB2anMyLCB7ZGlzcGxheUlucHV0RmllbGQ6IGZhbHNlfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBoaWdobGlnaHRpbmcgZnJvbSBhbGwgZWxlbWVudHNcbiAgICovXG4gIFB2anNEaWZmVmlld2VyLnByb3RvdHlwZS5hdHRlbnVhdGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnB2anMuYXR0ZW51YXRlKG51bGwpO1xuICAgIHRoaXMucHZqczIuYXR0ZW51YXRlKG51bGwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgcGx1Z2luIGdsb2JhbGx5IGFzIHB2anNEaWZmdmlld2VyXG4gICAqL1xuICB3aW5kb3cuUHZqc0RpZmZWaWV3ZXIgPSBQdmpzRGlmZlZpZXdlcjtcbn0pKHdpbmRvdywgd2luZG93LmpRdWVyeSB8fCB3aW5kb3cuWmVwdG8pO1xuIl19
});