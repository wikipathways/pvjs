var _ = require('lodash');
var fs = require('fs');
var RendererPrototype = require('./renderer-prototype');
//var EntityReference = require('../annotation-panel/entity-reference');
var Strcase = require('tower-strcase');
var crossPlatformText = require('cross-platform-text');
var crossPlatformShapes = require('cross-platform-shapes');

var RendererSvg = Object.create(RendererPrototype)

RendererSvg.init = function(kaavio) {
  this.kaavio = kaavio;
  this.diagramId = 'kaavio-diagram-' + kaavio.instanceId

  /**
   * The keys of the hash are elements ids.
   * The values are objects composed from data element and rendered element
   *
   * @type {Object} contains all rendered data elements
   */
  this._elementsHash = {}

  var diagramContainerBoundingClientRect = kaavio.diagramContainerElement.getBoundingClientRect();
  // TODO kaavio.$element is a d3 selection with the overall kaavio-container.
  // We should instead be working with the diagram container in here, but it isn't
  // full size when created, so the following code doesn't work:
  /*
  var containerBoundingClientRect = kaavio.$element
    .select('.diagram-container')[0][0].getBoundingClientRect()
  //*/
  var diagramContainerWidth = diagramContainerBoundingClientRect.width;
  var diagramContainerHeight = diagramContainerBoundingClientRect.height;

  this.crossPlatformShapesInstance = crossPlatformShapes.getInstance({
      targetElement: kaavio.diagramContainerElement,
      id: this.diagramId,
      format: 'svg',
      width: diagramContainerWidth,
      height: diagramContainerHeight,
      backgroundColor: 'white',
      customShapes: { // optional
        golgiApparatus: {
          href: fs.readFileSync(__dirname + '/golgi-apparatus-datastring.txt').toString()
        },
        sarcoplasmicReticulum: {
          href: fs.readFileSync(__dirname +
                  '/sarcoplasmic-reticulum-datastring.txt').toString()
        },
        endoplasmicReticulum: {
          href: fs.readFileSync(__dirname + '/endoplasmic-reticulum-datastring.txt').toString()
        },
        mitochondria: {
          href: fs.readFileSync(__dirname + '/mitochondria-datastring.txt').toString()
        }
      }
  })

  this.crossPlatformTextInstance = crossPlatformText.getInstance({
    targetSelector: '#' + this.diagramId
  })

  this.$svg = this.kaavio.$element.select('#' + this.diagramId)

  initStyles(this)
}

function initStyles(renderer) {
  var cssData;
  var $defs = renderer.$svg.select('defs');

  if (renderer.kaavio.options.cssUri) {
    d3.text(renderer.kaavio.options.cssUri, 'text/css', function(cssData) {
      $defs.append('style').attr('type', 'text/css').text(cssData)
    });
  } else {
    cssData = fs.readFileSync(__dirname + '/diagram.css').toString()
    $defs.append('style').attr('type', 'text/css').text(cssData)
  }
}

function normalizeShapeStyles(pvjsonElement) {
  // Do not need normalization:
  // backgroundColor
  // borderWidth

  //  backgroundOpacity
  if (pvjsonElement.hasOwnProperty('backgroundOpacity') &&
      !pvjsonElement.hasOwnProperty('fillOpacity')) {
    pvjsonElement.fillOpacity = pvjsonElement.backgroundOpacity;
  }

  // borderColor
  if (pvjsonElement.hasOwnProperty('borderColor') && !pvjsonElement.hasOwnProperty('color')) {
    pvjsonElement.color = pvjsonElement.borderColor;
  }

  // borderOpacity
  if (pvjsonElement.hasOwnProperty('borderOpacity')) {
    // TODO currently cross-platform-shapes do not support borderOpacity upon creation
  }

  return pvjsonElement;
}

function render(renderer, pvjsonElement) {
  // Keep both node and text because a node may take both form
  var shape;
  var text;

  if (!!pvjsonElement.shape && pvjsonElement.shape !== 'none') {
    shape = renderShape(renderer, normalizeShapeStyles(pvjsonElement));
  }
  if (!!pvjsonElement.textContent) {
    text = renderText(renderer, pvjsonElement);
  }

  // If nothing rendered
  return shape || text || null;
}

function renderShape(renderer, pvjsonElement) {
  var pvjson = renderer.kaavio.sourceData.pvjson;
  var shapeName = Strcase.camelCase(pvjsonElement.shape)

  // TODO move this checking into plugin
  if (!renderer.crossPlatformShapesInstance.hasOwnProperty(shapeName)) {
    // If cannot render shape, try a single-line version of shape
    // (replace double word in shape name)
    // If cannot render render as rounded rectangle
    shapeName = shapeName.replace(/double$/gi, '')

    if (renderer.crossPlatformShapesInstance.hasOwnProperty(shapeName)) {
      renderer.kaavio.trigger('warning.renderer', {
        message: 'Requested path "' + pvjsonElement.shape +
            '" is not available with linetype of "Double". Using linetype of "Solid" instead'
      })
    } else {
      renderer.kaavio.trigger('warning.renderer', {
        message: 'Requested path "' + pvjsonElement.shape +
            '" is not available. Using path "rounded-rectangle" instead'
      })

      shapeName = 'roundedRectangle'
    }
  }

  var node = renderer.crossPlatformShapesInstance[shapeName](pvjsonElement);
  var $node = d3.select(node);

  // jscs: disable
  if (pvjsonElement.datasource_name && pvjsonElement.identifier) {
  // jscs: enable
    // Add class to change mouse hover
    $node.classed({'has-xref': true});
  }
  /*

  var entityReference = pvjsonElement.entityReference;

  // TODO delegate events to selector
  if (!!entityReference && pvjsonElement.type !== void 0) {
    // right now, pathways generally don't have a shape,
    // so they are being handled by attaching events to their text.

    // Add class to change mouse hover
    $node.classed({'has-xref': true});

    var notDragged = true;

    //*
    $node.on('mousedown', function(d, i) {
      notDragged = true;
    })
    .on('mousemove', function(d, i) {
      notDragged = false;
    })
    .on('mouseup', function(d, i) {
      if (notDragged && !renderer.kaavio.annotationPanel.vm.disabled()) {
        // Search for reference id on demand

        var referenceId = entityReference

        // If BridgeDB handles pathway entities of this type
        // TODO check whether this matches our current pvjson
        if (['Protein', 'Dna', 'Rna', 'SmallMolecule', 'Metabolite'].indexOf(
            pvjsonElement.type) !== -1) {
          // Get all xrefs with given id
          var selector = renderer.kaavio.sourceData.selector.filteredByXRef(
              'id:' + entityReference).getFirst()
          // If any xref found
          if (!selector.isEmpty()) {
            // If first element has xrefs field
            if (selector[0].xrefs && selector[0].xrefs.length) {
              // Filter only bridgebd xrefs
              var filtered = selector[0].xrefs.filter(function(xref) {
                return xref.indexOf('bridgedb.org' !== -1)
              })

              // If at least one xref left
              if (filtered.length) {
                referenceId = filtered[0]
              }
            }
          }
        }

        EntityReference.render(renderer.kaavio, {
          metadata: {
            label: pvjsonElement.textContent,
            description: pvjsonElement.type
                           .replace('biopax:', '')
                           .replace('gpml:', '')
          },
          entityReference: {
            id: referenceId
          }
        });
      } // end of if notDragged
    });
  }
  //*/

  return node;
}

function renderText(renderer, pvjsonElement) {
  var node = renderer.crossPlatformTextInstance.render(pvjsonElement);
  var $node = d3.select(node);

  // TODO delegate this to selector
  // should a pathway xref be an entity reference or an id?
  if (!!pvjsonElement.type && pvjsonElement.type === 'Pathway' && !!pvjsonElement.entityReference) {
    var entityReferenceRendererArguments = {};
    entityReferenceRendererArguments.metadata = {
      label:pvjsonElement.textContent,
      description:pvjsonElement.type
                    .replace('biopax:', '')
                    .replace('gpml:', '')
    };
    entityReferenceRendererArguments.entityReference = {};
    entityReferenceRendererArguments.entityReference.id = pvjsonElement.entityReference;

    var notDragged = true;

    // Add class to change mouse hover
    $node.classed({'has-xref': true});

    $node.on('mousedown', function(d, i) {
      notDragged = true;
    })
    .on('mousemove', function(d, i) {
      notDragged = false;
    })
    .on('mouseup', function(d, i) {
      if (notDragged) {
        //EntityReference.render(renderer.kaavio, entityReferenceRendererArguments);
      }
    });
  } else {
    $node.style('pointer-events', 'none');
  }

  return node;
}

/**
 * Check if data element has an id attribute
 *
 * @param  {object} pvjsonElement
 * @return {Boolean}
 */
RendererSvg.isValidElement = function(pvjsonElement) {
  return pvjsonElement && pvjsonElement.id !== undefined
}

/**
 * Check if data element is not rendered
 *
 * @param  {object}  pvjsonElement [description]
 * @return {Boolean}               [description]
 */
RendererSvg.hasElement = function(pvjsonElement) {
  return this._elementsHash[pvjsonElement.id] !== void 0 &&
      this._elementsHash[pvjsonElement.id] !== null;
}

/**
 * Check if element is rendered, and if not register and render it
 *
 * @param {object} pvjsonElement
 */
RendererSvg.addElement = function(pvjsonElement) {
  if (this.isValidElement(pvjsonElement) && !this.hasElement(pvjsonElement)) {
    // TODO this should be refactored and removed
    pvjsonElement.containerSelector = 'g.viewport'

    this._elementsHash[pvjsonElement.id] = {
      pvjsonElement: pvjsonElement,
      render: render(this, pvjsonElement)
    }
  }
}

var selectorToSvgStyleMap = {
  backgroundColor: 'fill',
  backgroundOpacity: 'fill-opacity',
  borderColor: 'stroke',
  borderWidth: 'stroke-width',
  borderOpacity: 'stroke-opacity'
};

function normalizeSelectorStyle(key) {
  if (selectorToSvgStyleMap.hasOwnProperty(key)) {
    return selectorToSvgStyleMap[key]
  } else {
    return key
  }
}

function styleStringToMap(str) {
  var _styles = str.trim().split(';');
  var _style;
  var styles = {};

  for (var s in _styles) {
    _style = _styles[s].trim().split(':')

    if (_style.length === 2) {
      styles[_style[0]] = _style[1]
    }
  }

  return styles
}

/**
 * Update element attributes and style (if element exists)
 *
 * @param  {object} pvjsonElement
 * @param  {object} styles object style name (key) and style value (value)
 */
RendererSvg.updateElement = function(pvjsonElement, styles) {
  if (!this.hasElement(pvjsonElement)) {
    return;
  }

  var $element = d3.select(this._elementsHash[pvjsonElement.id].render);
  var styleKey;
  var styleMap = {};
  var styleString = '';

  if (!$element.empty()) {
    // Look for old styles
    if ($element.attr('style')) {
      styleMap = styleStringToMap($element.attr('style'))
    }

    // Adjust new styles
    for (var key in styles) {
      // Translate Selector styles to Svg styles
      styleKey = normalizeSelectorStyle(key)

      // Add style to map if it does not collide with any other passed style
      if (key == styleKey || !styles.hasOwnProperty(styleKey)) {
        styleMap[styleKey] = styles[key]
      }
    }

    // Compose style string
    for (key in styleMap) {
      styleString += key + ':' + styleMap[key] + ';'
    }

    // Update element
    $element.attr('style', styleString)
  }
}

RendererSvg.removeElementMarkers = function(pvjsonElement) {
  if (!this.hasElement(pvjsonElement)) {
    return;
  }

  var $element = d3.select(this._elementsHash[pvjsonElement.id].render)

  $element
    .attr('marker-start', null)
    .attr('marker-mid', null)
    .attr('marker-end', null)
}

/**
 * Unregister and remove element from render
 *
 * @param  {object} pvjsonElement
 */
RendererSvg.removeElement = function(pvjsonElement) {
  if (!this.hasElement(pvjsonElement)) {
    return;
  }

  var $element = d3.select(this._elementsHash[pvjsonElement.id].render)

  if (!$element.empty()) {
    $element.remove()
    delete this._elementsHash[pvjsonElement.id]
  }
}

/**
 * Returns element rendered style
 *
 * @param  {object} pvjsonElement
 * @param  {string} styleName
 * @return {string|number}
 */
RendererSvg.getElementStyle = function(pvjsonElement, styleName) {
  // TODO
}

/**
 * Updates element rendered style
 *
 * @param {object} pvjsonElement
 * @param {string} styleName
 * @param {string|number} styleValue
 */
RendererSvg.setElementStyle = function(pvjsonElement, styleName, styleValue) {
  // TODO
}

/**
 * Return element bounding box (height, width, left, right, top, bottom)
 * @return {object} BBox
 */
RendererSvg.getElementBBox = function(pvjsonElement) {
  var BBox = {
    width: 0,
    height: 0,
    top: null,
    bottom: null,
    left: null,
    right: null
  };
  var border = pvjsonElement && pvjsonElement.hasOwnProperty('borderWidth') ?
      +pvjsonElement.borderWidth : 0;

  if (pvjsonElement === null || pvjsonElement === void 0) {
    return BBox;
  }

  // Assume that the object has width, height, x and y
  if (pvjsonElement.hasOwnProperty('width')) {
    BBox.width = pvjsonElement.width + (border * 2)
    BBox.height = pvjsonElement.height + (border * 2)
    BBox.top = pvjsonElement.y - border
    BBox.bottom = BBox.top + BBox.height
    BBox.left = pvjsonElement.x - border
    BBox.right = BBox.left + BBox.width
  } else {
    // If it is an interaction
    if (pvjsonElement.hasOwnProperty('gpml:element') &&
        pvjsonElement['gpml:element'] === 'gpml:Interaction') {
      BBox.top = Math.min(pvjsonElement.points[0].y, pvjsonElement.points[1].y) - border
      BBox.bottom = Math.max(pvjsonElement.points[0].y, pvjsonElement.points[1].y) + border
      BBox.left = Math.min(pvjsonElement.points[0].x, pvjsonElement.points[1].x) - border
      BBox.right = Math.max(pvjsonElement.points[0].x, pvjsonElement.points[1].x) + border
      BBox.width = BBox.right - BBox.left
      BBox.height = BBox.top - BBox.bottom
    }
  }

  if (pvjsonElement.hasOwnProperty('rotation')) {
    var rotationRad = +pvjsonElement.rotation * Math.PI / 180;

    var points = [0, 0, 0, 0, 0, 0, 0, 0];
    // top_left.x  y  top_right.x  y  bottom_right.x  y  bottom_left.x  y

    var centerX = (BBox.left + BBox.right) / 2;
    var centerY = (BBox.top + BBox.bottom) / 2;
    var BBoxCentered = {
      top: BBox.height / 2,
      bottom : -BBox.height / 2,
      left: -BBox.width / 2,
      right: BBox.width / 2
    };

    // Calculate points of rotated rectangle
    points[0] = (BBoxCentered.left) * Math.cos(rotationRad) -
        (BBoxCentered.top) * Math.sin(rotationRad);
    points[1] = (BBoxCentered.left) * Math.sin(rotationRad) +
        (BBoxCentered.top) * Math.cos(rotationRad);
    points[2] = (BBoxCentered.right) * Math.cos(rotationRad) -
        (BBoxCentered.top) * Math.sin(rotationRad);
    points[3] = (BBoxCentered.right) * Math.sin(rotationRad) +
        (BBoxCentered.top) * Math.cos(rotationRad);
    points[4] = (BBoxCentered.right) * Math.cos(rotationRad) -
        (BBoxCentered.bottom) * Math.sin(rotationRad);
    points[5] = (BBoxCentered.right) * Math.sin(rotationRad) +
        (BBoxCentered.bottom) * Math.cos(rotationRad);
    points[6] = (BBoxCentered.left) * Math.cos(rotationRad) -
        (BBoxCentered.bottom) * Math.sin(rotationRad);
    points[7] = (BBoxCentered.left) * Math.sin(rotationRad) +
        (BBoxCentered.bottom) * Math.cos(rotationRad);

    // Update BBox
    BBox.top = -Math.max(points[1], points[3], points[5], points[7]) + centerY
    BBox.bottom = -Math.min(points[1], points[3], points[5], points[7]) + centerY
    BBox.left = Math.min(points[0], points[2], points[4], points[6]) + centerX
    BBox.right = Math.max(points[0], points[2], points[4], points[6]) + centerX
    BBox.width = BBox.right - BBox.left
    BBox.height = BBox.bottom - BBox.top
  }

  return BBox
}

module.exports = {
  init: function(kaavio) {
    var renderer = Object.create(RendererSvg)

    renderer.init(kaavio);

    return renderer;
  }
};
