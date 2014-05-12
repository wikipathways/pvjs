var Img = require('./img.js')
  , Fs = require('fs')
  , _ = require('lodash')
  , RendererSvg = require('./renderer-svg')
  // , Selector = require('./selector.js')
  , Strcase = require('./../../../lib/strcase/index.js')
  , InfoBox = require('./info-box.js')
  , PublicationXref = require('./publication-xref.js')
  , XRef = require('./annotation/x-ref.js')
  , SvgPanZoom = require('./../../../lib/svg-pan-zoom/src/svg-pan-zoom.js', ['svgPanZoom'])
  ;

module.exports = function(){
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
  }
  , supportedRenderers = ['img']  // Assumption that all browsers we care about support the HTML img tag

  // Check for Modernizr support
  if (Modernizr && Modernizr.inlinesvg) {
    supportedRenderers.push('svg')
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
    return true
  }

  /**
   * Renders a given sourceData object
   * @param  {Object} pvjs       pvjs Instance Object
   * @param  {Object} sourceData sourceData Instance Object
   */
  function render(pvjs, sourceData) {
    var diagramContainer = pvjs.$element
      , containerBoundingClientRect = pvjs.$element[0][0].getBoundingClientRect()
      , containerWidth = containerBoundingClientRect.width - 3 //account for space for pan/zoom controls,
      , containerHeight = containerBoundingClientRect.height - 3 //account for space for search field;
      , rendererEngine = getRendererEngineName(sourceData.fileType)

    // Cache render engine into sourceData
    sourceData.rendererEngine = rendererEngine

    if (rendererEngine === 'img') {
      Img.render(pvjs, sourceData)
    } else if (rendererEngine === 'svg') {
      var diagramId = 'pvjs-diagram-' + pvjs.instanceId
        , pvjson = sourceData.pvjson
        , viewport = pvjs.$element.select('#viewport')
        ;

      // SVG element is created by crossPlatformShapesInstance init
      var rendererSvg = RendererSvg.init(pvjs, {
        targetSelector: '#' + pvjs.$element.attr('id') + ' .diagram-container'
      , id: diagramId
      , width: containerWidth
      , height: containerHeight
      })

      // Render all elements one by one
      _.forEach(pvjson.elements, function(dataElement){
        dataElement.containerSelector = '#viewport';
        rendererSvg.render(dataElement)
      })

      // Publication Xref
      var elementsWithPublicationXrefs = pvjson.elements.filter(function(element){return !!element.publicationXrefs;});
      if (elementsWithPublicationXrefs.length > 0) {
        elementsWithPublicationXrefs.forEach(function(elementWithPublicationXrefs) {
          PublicationXref.render(pvjs, viewport, elementWithPublicationXrefs);
        });
      }

      // InfoBox
      var svgSelection = d3.select('#' + diagramId);
      InfoBox.render(viewport, pvjson);

      // Styles
      var cssData,
        style,
        defs = svgSelection.select('defs');
      if (pvjs.options.cssUri) {
        d3.text(pvjs.options.cssUri, 'text/css', function(cssData) {
          style = defs.append('style').attr('type', "text/css");
          style.text(cssData);
        });
      }
      else {
        // cssData = pathvisioNS['src/css/pathway-diagram.css'];
        cssData = Fs.readFileSync(__dirname + '/../../css/pathway-diagram.css').toString()
        style = defs.append('style').attr('type', "text/css");
        style.text(cssData);
      }

      // TODO move this into svg-pan-zoom
      var viewport = svgSelection.select('#viewport');

      var fitScreenScale;
      if (pvjs.options.fitToContainer) {
        fitAndCenterDiagramWithinViewport(viewport, containerWidth, containerHeight, pvjson.image.width, pvjson.image.height);
      }

      var svgPanZoom = SvgPanZoom.svgPanZoom(svgSelection[0][0], {
        controlIconsEnabled: true
      , minZoom: 0.1
      , maxZoom: 20.0
      , zoomEnabled: false
      , onZoom: function(scale) {
          pvjs.trigger('zoomed.renderer', scale)
        }
      , onPan: function(x, y) {
          pvjs.trigger('panned.renderer', {x: x, y: y})
        }
      })

      var svgInFocus = false
      svgSelection
        .on("click", function(d, i){
          svgPanZoom.enableZoom()
          svgInFocus = true
        })
        .on("mouseenter mousemove", function(d, i){
          if (svgInFocus) {
            svgPanZoom.enableZoom()
          }
        })
        .on("mouseleave", function(d, i){
          if (svgInFocus) {
            svgPanZoom.disableZoom()
            svgInFocus = false
          }
        })

      // Expose panZoom to other objects
      pvjs.panZoom = svgPanZoom

      pvjs.trigger('rendered')
    } // End if sourceData renderingEngine is svg
  }

  // calculates the proper scaling and translations to fit content (i.e., diagram) to screen (i.e., viewport)
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

  return {
    canRender: canRender
  , needDataConverted: needDataConverted
  , destroyRender: destroyRender
  , render: render
  }
}()
