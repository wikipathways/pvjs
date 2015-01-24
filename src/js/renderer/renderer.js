var _ = require('lodash');
var highland = require('highland');
var RendererImg = require('./renderer-img');
var RendererSvg = require('./renderer-svg');
var Selector = require('./selector.js');
var InfoBox = require('./info-box.js');
var PublicationXref = require('./publication-xref.js');
var EntityReference = require('./annotation/entity-reference.js');
var SvgPanZoom = require('svg-pan-zoom');

module.exports = function() {
  // Render engines are sorted in order of preference - viewMethod with lower index will be used if more than one is returned.
  var renderersMap = {
    gpml:   ['svg'], // Could add canvas support
    // biopax: ['svg'], // Not supported. Could add canvas support
    // pdf:    ['pdf'], // Not supported. This would be future. we might use pdf.js or we could just try using an embed or object tag.
    png:    ['img'],
    jpg:    ['img'],
    jpeg:   ['img'],
    jpe:    ['img'],
    jif:    ['img'],
    jfif:   ['img'],
    jfi:    ['img'],
    gif:    ['img'],
    ico:    ['img'],
    bmp:    ['img'],
    dib:    ['img']
  };
  var supportedRenderers = ['img'];  // Assumption that all browsers we care about support the HTML img tag

  // Check for Modernizr support
  if (Modernizr && Modernizr.inlinesvg) {
    supportedRenderers.push('svg');
  }

  /**
   * Check if renderer supports rendering a given file type
   *
   * @param  {object} sourceData
   * @return {boolean}
   */
  function canRender(sourceData) {
    return !!getRendererEngineName(sourceData.fileType)
  }

  /**
   * Returns renderer engine name
   *
   * @param  {string} fileType
   * @return {string|bool}          engine name or false
   */
  function getRendererEngineName(fileType) {
    // If fileType unknown
    if (renderersMap[fileType] === undefined) {
      return false;
    }

    var rendererEngines = renderersMap[fileType]

    // Check if there is a match between necessary and supported renderes
    for (var i = 0; i < rendererEngines.length ; i++) {
      if (supportedRenderers.indexOf(rendererEngines[i]) !== -1) {
        return rendererEngines[i]
      }
    }

    // If nothing found
    return false
  }

  /**
   * Check if data should be preloaded and parsed
   *
   * @param  {object} sourceData sourceData object
   * @return {boolean}
   */
  function needDataConverted(sourceData) {
    var rendererEngine = getRendererEngineName(sourceData.fileType)

    if (rendererEngine === 'svg') {
      return true
    } else if (rendererEngine === 'img') {
      return false
    } else {
      return false
    }
  }

  /**
   * Ask renderer to remove everything what is rendered
   * Useful when rendering a specific type or source failed and next one will be tried
   *
   * @param  {Object} pvjs Instace Object
   * @return {boolean} success state
   */
  function destroyRender(pvjs, sourceData) {
    // TODO
    return true
  }

  /**
   * Renders a given sourceData object
   * @param  {Object} pvjs       pvjs Instance Object
   */
  function render(pvjs) {
    var sourceData = pvjs.sourceData;
    var renderer = null;
    var selector = null;
    // Cache render engine into sourceData
    sourceData.rendererEngine = getRendererEngineName(sourceData.fileType)

    if (sourceData.rendererEngine === 'img') {
      renderer = RendererImg.init(pvjs)
      sourceData.selector =
          Selector.init([{uri: pvjs.sourceData.uri}], renderer)
    } else if (sourceData.rendererEngine === 'svg') {
      renderer = RendererSvg.init(pvjs)
      sourceData.selector =
          Selector.init(pvjs.sourceData.pvjson.elements, renderer)

      var viewport = pvjs.$element.select('g.viewport')

      // InfoBox
      InfoBox.render(viewport, pvjs.sourceData.pvjson);

      // Publication Xref
      var elementsWithPublicationXrefs = pvjs.sourceData.pvjson.elements
      .filter(function(element) {return !!element.xrefs;});

      if (elementsWithPublicationXrefs.length > 0) {
        elementsWithPublicationXrefs.forEach(
            function(elementWithPublicationXrefs) {
          PublicationXref.render(pvjs, viewport, elementWithPublicationXrefs);
        });
      }

      var documentElement = document.documentElement;
      var pvjsViewerElement = document.querySelector('#pathvisiojs-viewer');
      // Svg-pan-zoom
      // Should come last as it is fitting and centering viewport
      var svgSelection = d3.select('#' + 'pvjs-diagram-' + pvjs.instanceId);
      var svgElement = svgSelection[0][0];
      var svgPanZoom = SvgPanZoom(svgElement, {
        controlIconsEnabled: true,
        fit: true,
        center: true,
        minZoom: 0.1,
        maxZoom: 20.0,
        zoomEnabled: false,
        onZoom: function(scale) {
          pvjs.trigger('zoomed.renderer', scale)
        },
        onPan: function(x, y) {
          pvjs.trigger('panned.renderer', {x: x, y: y})
        }
      });

      /*
      // TODO can we get rid of this code now? --AR
      // Adjust viewport position
      // TODO replace magic numbers (14 and 10)
      svgPanZoom.zoomBy(0.95)
      svgPanZoom.panBy({x: -14 * svgPanZoom.getZoom(), y: -10 * svgPanZoom.getZoom()})
      //*/

      var svgInFocus = false
      svgSelection
      .on('click', function(d, i) {
        svgPanZoom.enableZoom()
        svgInFocus = true
      })
      .on('mouseenter mousemove', function(d, i) {
        if (svgInFocus) {
          svgPanZoom.enableZoom()
        }
      })
      .on('mouseleave', function(d, i) {
        if (svgInFocus) {
          svgPanZoom.disableZoom()
          svgInFocus = false
        }
      });

      // Expose panZoom to other objects
      pvjs.panZoom = svgPanZoom;

      // Make SVG resizable
      var createEventListenerStream = function(type, eventTarget) {
        var addEventListenerCurried =
            highland.ncurry(2, eventTarget.addEventListener, type);

        var addEventListenerFlipped = highland.flip(addEventListenerCurried);

        var createStream = highland.wrapCallback(addEventListenerFlipped);

        var stream = createStream(type)
        .errors(function(err, push) {
          // The callback is not a Node.js-style callback
          // with err as the first argument, so we need
          // to push it along if it's an event, not an error.
          // TODO is this a cross-browser compatible
          // for detecting an event?
          if (err.hasOwnProperty('bubbles')) {
            return push(null, err);
          }

          throw err;
        });

        return stream;
      }

      var createWindowResizeListener = function() {
        // corresponds to ~60Hz
        var refreshInterval = 16;

        var windowResizeListener = createEventListenerStream('resize', window);

        windowResizeListener.fork()
        .debounce(refreshInterval)
        .each(function() {
          svgElement.setAttribute('width', pvjsViewerElement.clientWidth)
          svgElement.setAttribute('height', pvjsViewerElement.clientHeight)

          svgPanZoom.updateBBox();
          svgPanZoom.resize();
          svgPanZoom.fit();
          svgPanZoom.center();
        });

        // TODO This seems kludgey.
        windowResizeListener.fork()
        .last()
        .each(function() {
          createWindowResizeListener();
        });
      };

      createWindowResizeListener();

      var simpleModal = global.simpleModal = require('simple-modal');

      pvjs.trigger('rendered.renderer')
    }
  }

  return {
    canRender: canRender,
    needDataConverted: needDataConverted,
    destroyRender: destroyRender,
    render: render
  }
}()
