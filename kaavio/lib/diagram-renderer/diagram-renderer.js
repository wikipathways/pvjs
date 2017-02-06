var _ = require('lodash');
var fs = require('fs');
var highland = require('highland');
var Highlighter = require('../highlighter/highlighter.js');
var insertCss = require('insert-css');
var RendererSvg = require('./renderer-svg');
var Selector = require('./selector');
var InfoBox = require('./info-box');
var PublicationXref = require('./publication-xref');
var SvgPanZoom = require('svg-pan-zoom');

var css = [
  fs.readFileSync(__dirname + '/pan-zoom.css')
];

module.exports = function renderer() {

  css.map(insertCss);

  /**
   * Ask renderer to remove everything what is rendered
   * Useful when rendering a specific type or source failed and next one will be tried
   *
   * @param {Object} kaavio kaavio instance Object
   * @return {boolean} success state
   */
  function destroyRender(kaavio, sourceData) {
    // TODO
    return true
  }

  /**
   * Renders a given sourceData object
   * @param  {Object} kaavio kaavio private Instance Object
   */
  function render(kaavio) {
    var sourceData = kaavio.sourceData;
    var renderer = RendererSvg.init(kaavio)
    sourceData.selector =
        Selector.init(kaavio.sourceData.pvjson.elements, renderer)

    var containerElement = kaavio.containerElement;

    // TODO refactor this to make sure it works multi-instance
    kaavio.diagramContainerElement = kaavio.diagramContainerElement ||
        containerElement.querySelector('.diagram-container');
    var diagramContainerElement = kaavio.diagramContainerElement;

    var viewport = kaavio.$element.select('g.viewport')

    // InfoBox
    InfoBox.render(viewport, kaavio.sourceData.pvjson);

    // Publication Xref
    var elementsWithPublicationXrefs = kaavio.sourceData.pvjson.elements
      .filter(function(element) {
        return !!element.xrefs;
      });

    if (elementsWithPublicationXrefs.length > 0) {
      elementsWithPublicationXrefs.forEach(
          function(elementWithPublicationXrefs) {
        PublicationXref.render(kaavio, viewport, elementWithPublicationXrefs);
      });
    }

    // Svg-pan-zoom
    var svgSelection = d3.select('#' + 'kaavio-diagram-' + kaavio.instanceId);
    var svgElement = svgSelection[0][0];
    var svgPanZoom = SvgPanZoom(svgElement, {
      controlIconsEnabled: true,
      fit: true,
      center: true,
      minZoom: 0.1,
      maxZoom: 20.0,
      zoomEnabled: false,
      onZoom: function(scale) {
        kaavio.trigger('zoomed.renderer', scale)
      },
      onPan: function(point) {
        kaavio.trigger('panned.renderer', point)
      }
    });

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
    kaavio.panZoom = svgPanZoom;

    // Make SVG resizable
    kaavio.panZoom.resizeDiagram = function() {
      svgElement.setAttribute('width', diagramContainerElement.clientWidth)
      svgElement.setAttribute('height',
          diagramContainerElement.clientHeight)

      svgPanZoom.updateBBox();
      svgPanZoom.resize();
      svgPanZoom.fit();
      svgPanZoom.center();
    };

    var highlighter = kaavio.highlighter = new Highlighter(kaavio, kaavio.options);

    var highlightEntitiesList = kaavio.options.highlights;

    if (!!highlightEntitiesList && highlightEntitiesList.length !== 0) {
      highlightEntitiesList.map(function(entity) {
        var selector = entity.selector;
        var selectorMatch = _.isString(selector) && selector.match(/xref:id:(.*)\,(.*)/);
        if (selectorMatch) {
          var dbName = selectorMatch[2];
          var dbId = selectorMatch[1];
          var entityReferenceId = kaavio.sourceData.pvjson.elements
          .filter(function(element) {
            var iriRegex = new RegExp('^http:\/\/.*' + dbId + '.*')
            return element.id && iriRegex.test(element.id);
          })
          .map(function(entity) {
            return entity.id;
          })[0];
          entity.selector = 'xref:id:' + entityReferenceId;
        }

        return entity;
      }).forEach(function(entity) {
        highlighter.highlight(entity.selector, 'preset', entity);
        // there is no "previousHighlighting" method associated with this element,
        // because presets cannot be removed.
      });
    }

    kaavio.sourceData.pvjson.elements.filter(function(element) {
      return !element.previousHighlighting;
    })
    .filter(function(element) {
      return element.entityReference;
    })
    .map(function(element) {
      if (!element.previousHighlighting) {
        // if current selection exists and was not highlighted as part
        // of the preset or typeahead groups, this method will allow
        // for de-highlighting this selection
        element.previousHighlighting = _.bind(highlighter.attenuate,
            highlighter, element.entityReferenceId, 'selected');
      }
      return element;
    });

    // TODO Figure out why this timeout is needed.
    // maybe something to do with the class(es) in kaavio.css, such as
    // "kaavio-container.loading:after"?
    window.setTimeout(function() {
      // Must happen last in rendering process, because it is fitting and centering viewport
      kaavio.panZoom.resizeDiagram();
      kaavio.trigger('rendered.renderer');
      window.setTimeout(function() {
        kaavio.panZoom.resizeDiagram();
      }, 1000);
    }, 300);
  }

  return {
    destroyRender: destroyRender,
    render: render
  }
};
