// TODO remove privateInstance/publicInstance confusion.
var _ = require('lodash');
var fs = require('fs');
var insertCss = require('insert-css');
var $ = window.$ || require('jquery');
if (typeof $ === 'undefined') {
  throw new Error('typeahead needs jQuery');
}
$(window.document).ready(function() {
  // TODO this was not originally in
  // a ready block. Should it be?
  require('typeahead.js');
});

var css = fs.readFileSync(__dirname + '/highlighter.css');

insertCss(css);

var optionsDefault = {
  displayInputField: true,
  autocompleteLimit: 10,
  styles: {
    'backgroundColor': 'yellow',
    'backgroundOpacity': 0.2,
    'borderColor': 'orange',
    'borderWidth': 3,
    'borderOpacity': 0.9,
    'pointer-events': 'none'
  }
};
var instancesMap = {};

/**
 * Constructor
 * @examples
 *   // Highlight by ID
 *   highlighter.highlight('#eb5');
 *   highlighter.highlight('id:d25e1');
 *
 *   // Highlight by Text
 *   highlighter.highlight('Mitochondrion', null, {backgroundColor: 'gray'});
 *
 *   // Highlight by xref
 *   highlighter.highlight('xref:id:http://identifiers.org/wormbase/ZK1193.5', null, {
 *     backgroundColor: 'magenta', borderColor: 'black'})
 *
 *   highlighter.highlight('xref:GCN-2', null, {
 *     backgroundColor: 'blue',
 *     backgroundOpacity: 0.5,
 *     borderColor: 'red',
 *     borderWidth: 1,
 *     borderOpacity: 0.7
 *   });
 *
 * @param {Object} kaavio
 * @param {Object} options
 */
var KaavioHighlighter = function(kaavio, options) {

  this.options = $.extend({}, optionsDefault, options);

  this.kaavio = kaavio;
  this.$kaavioElement = $(this.kaavio.containerElement)
  this.kaavioSourceData = this.kaavio.getSourceData();
  //this.isInitiated = false

  this.isInitiated = true
  this.selector = this.kaavioSourceData.selector;
  this.elements = this.kaavioSourceData.pvjson.elements;

  this.groups = {};

  if (this.options.displayInputField) {
    // Used only for typeahead search
    this.searcheableValues = getSearcheableValues(this.elements);
    // Creat DOM elements and hooks for them
    this.initInputField();
  }
}

/**
 * Highlight elements that match stringSelector and add them to provided group
 * If element is highlighted in given group - do nothing
 * If element is highlighted in another group - update styles
 * Apply provided styles, default otherwise
 *
 * @public
 * @param  {string|string[]} stringSelector  String selector
 * @param  {string} group   Group name
 * @param  {object} styles Styles
 * @return {Boolean} if anything found
 */
KaavioHighlighter.prototype.highlight = function(stringSelector, group, styles) {
  var that = this;

  if (!this.isInitiated) {
    return;
  }

  stringSelector = _.isArray(stringSelector) ? stringSelector : [stringSelector];

  return stringSelector.map(function(oneStringSelector) {
    var selector = that.selectByString(oneStringSelector);

    // Highlight all nodes that match this selector, one by one
    if (selector.length) {
      selector.forEach(function(element) {
        that._highlight(group || 'default', element, styles);
      });
    }

    return selector.length > 0;
  })
  .reduce(function(accumulator, memo) {
    return accumulator || memo;
  });
}

/**
 * Attenuate elements that match stringSelector and group.
 * Remove them from all groups.
 *
 * @public
 * @param  {string} stringSelector  String selector
 * @param  {string} group   Group name
 */
KaavioHighlighter.prototype.attenuate = function(stringSelector, group) {
  var that = this;

  if (!this.isInitiated) {
    return;
  }

  if (typeof stringSelector === 'undefined' || stringSelector === null) {
    this._attenuate(group || 'default', null);
    return;
  }

  stringSelector = _.isArray(stringSelector) ? stringSelector : [stringSelector];

  return stringSelector.map(function(oneStringSelector) {
    // Attenuate all matching nodes, one by one
    that.selectByString(oneStringSelector).forEach(function(element) {
      that._attenuate(group || 'default', element)
    });
  });
}

/**
 * Parse string and decide which selector method to call
 *
 * @param  {string} stringSelector
 * @return {object}                selector
 */
KaavioHighlighter.prototype.selectByString = function(stringSelector) {
  var selector = [];

  if (stringSelector[0] === '#') {
    // Select by id
    selector = this.selector.filteredById(stringSelector.slice(1))
  } else if (stringSelector.indexOf('id:') === 0) {
    // Select by id
    selector = this.selector.filteredById(stringSelector.slice(3))
  } else if (stringSelector.indexOf('xref:') === 0) {
    // Select by xref
    selector = this.selector.filteredByHavingXRef(stringSelector.slice(5))
  } else {
    // Select by text
    selector = this.selector.filteredByText(stringSelector)
  }

  return selector
}

/**
 * Highlight an element and add it to a group
 * If highlighting exists in a different group, add it to this group
 * If highlighting exists, then update its styles
 *
 * @param  {string} group  Group name
 * @param  {object} element   pvjsonElement or svgElement
 * @param  {object} styles Styles
 */
KaavioHighlighter.prototype._highlight = function(group, element, styles) {
  styles = $.extend({}, this.options.styles, styles)

  // Create group if it does not exist
  if (typeof this.groups[group] === 'undefined') {
    this.groups[group] = []
  }

  // Check if element is not already highlighted
  var g;
  var h;
  var light;
  var highlighting;
  var inSameGroup = false;

  // If in the same group
  for (h in this.groups[group]) {
    light = this.groups[group][h]

    if (light.element.getId() === element.getId()) {
      highlighting = light.highlighting
      inSameGroup = true
      break
    }
  }

  // Search for highlighting in other groups
  if (!inSameGroup) {
    for (g in this.groups) {
      for (h in this.groups[g]) {
        light = this.groups[g][h]

        if (light.element.getId() === element.getId()) {
          highlighting = light.highlighting
          break
        }
      }
    }
  }

  // Render highlighting
  if (!highlighting) {
    // If is a highlighting
    if (element[0]['gpml:element'] === 'gpml:Interaction' ||
        element[0]['gpml:element'] === 'gpml:GraphicalLine') {
      // Do not add background to paths as it will create a shape from a broken line
      delete styles.backgroundColor

      highlighting = element.cloneElement().setStyles(styles);
    } else {
      var BBox = element.getBBox();

      BBox.x = BBox.left;
      BBox.y = BBox.top;

      this.selector.addElement($.extend({shape: 'rectangle'}, styles, BBox));
      highlighting = this.selector.getLast();

      // TODO make this task in selector or in renderer
      // Update styles because cross-platform-shapes may not apply all styles
      highlighting.setStyles(styles);
    }
  } else {
    // Apply new styles
    highlighting.setStyles(styles);
  }

  if (group === 'preset') {
    this.presets = this.presets || {};
    this.presets[element.getId()] = this._highlight.bind(this, group, element, styles);
  }

  // Add info to group
  if (highlighting && !inSameGroup) {
    this.groups[group].push({
      element: element,
      highlighting: highlighting
    });
  }
}

/**
 * Search for an element in given group. If no element is provided,
 * select all elements from given group.
 * Remove highlighting from an element and remove it from all groups
 *
 * @param  {string} group  Group name
 * @param  {object} [element]   pvjsonElement or svgElement
 */
KaavioHighlighter.prototype._attenuate = function(group, element) {
  // If not such group or it is empty
  if (typeof this.groups[group] === 'undefined' || !this.groups[group].length) {
    return;
  }

  // Shorthand
  var _group = this.groups[group];
  var elementId = element && element.getId();

  for (var i = _group.length - 1; i >= 0; i--) {
    // If element is null or it matches given element, then remove it or
    // reset it to its preset.
    if (element === null || _group[i].element.getId() === elementId) {

      var groupElementId = _group[i].element.getId();

      // Shorthand
      var _presets = this.presets;
      var presetExists = _presets && _.isFunction(_presets[groupElementId]);
      if (!presetExists) {
        // Remove highlighting
        _group[i].highlighting.remove();
        // Remove element from all groups
        this.removeElementFromGroups(_group[i].element);
      } else {
        _presets[groupElementId]();
      }
    }
  }
}

/**
 * Removes element from all groups
 *
 * @param  {selector Object} element
 */
KaavioHighlighter.prototype.removeElementFromGroups = function(element) {
  var g;
  var _group;
  var l;

  for (g in this.groups) {
    _group = this.groups[g]

    for (l in _group) {
      if (_group[l].element.getId() === element.getId()) {
        var spliced = _group.splice(l, 1)[0];
        break; // Go to next group
      }
    }

    /*
    if (g !== 'preset') {
      _group = this.groups[g]

      for (l in _group) {
        if (_group[l].element.getId() === element.getId()) {
          var spliced = _group.splice(l, 1)[0];
          break; // Go to next group
        }
      }
    }
    //*/
  }
}

/**
 * Initialize input/typeahead field
 *
 * @private
 */
KaavioHighlighter.prototype.initInputField = function() {
  var that = this;

  // Init dom elements
  this.$element = $('<div class="kaavio-highlighter"/>').appendTo(this.$kaavioElement);
  this.$input = $('<input type="text"/>').appendTo(this.$element)
    .attr('placeholder', 'Search for...')
    .attr('class', 'highlighter-input');
  this.$inputReset = $('<i class="highlighter-remove"/>').appendTo(this.$element);

  // Typeahead
  this.$input.typeahead({
    minLength: 1,
    highlight: true
  }, {
    displayKey: 'val',
    source: function(query, cb) {
      cb(filterSearcheableValues(that.searcheableValues, query, that.options.autocompleteLimit))
    }
  })

  // Typeahead events
  this.$input
    .on('typeahead:selected', function(ev, suggestion) {
      that.updateTypeaheadHighlight()
    })
    .on('typeahead:closed', function(ev, suggestion) {
      // Wait for input field to get cleared
      setTimeout(function() {
        that.updateTypeaheadHighlight();
      }, 10)
    })
    .on('typeahead:autocompleted typeahead:cursorchanged', function(ev, suggestion) {
      that.updateTypeaheadHighlight(true)
    })
    .on('keypress', function(ev) {
      if (ev.keyCode && ev.keyCode === 13) {
        that.$input.typeahead('close')

        that.updateTypeaheadHighlight()
      }
    });

  // Typeahead reset
  this.$inputReset.on('click', function() {
    that.$input.val('');
    that.attenuate(null, 'typeahead');
    that.$inputReset.removeClass('active');
  });
}

KaavioHighlighter.prototype.updateTypeaheadHighlight = function(differentColor) {
  differentColor = differentColor || false;
  var styles = differentColor ? {fill: 'blue'} : {};

  this.attenuate(null, 'typeahead');

  if (this.highlight(this.$input.val(), 'typeahead', styles)) {
    this.$inputReset.addClass('active');
  } else {
    this.$inputReset.removeClass('active');
  }
}

/**
 * Return a list of searcheable by typeahead values
 *
 * @private
 *
 * @return {array} searcheable values
 */
function getSearcheableValues(elements) {
  var searcheableValues = []

  if (elements && elements.length) {
    elements
      .filter(function(element) {
        return element['gpml:element'] === 'gpml:DataNode' ||
        element['gpml:element'] === 'gpml:Label';
      })
      .forEach(function(element) {
        if (element.hasOwnProperty('textContent')) {

          var text = element.textContent.replace(/\n/g, ' ')
          searcheableValues.push({
            val: text,
            valLower: text.toLowerCase()
          })
        }
      });
  }

  return searcheableValues
}

function filterSearcheableValues(searcheableValues, query, limit) {
  var filteredValues = [];
  var filteredTitles = [];
  var queryLower = query.toLowerCase();
  limit = limit || 10;

  // Search for strings that match from first letter
  for (var i = 0; i < searcheableValues.length; i++) {
    if (filteredValues.length >= limit) {
      break;
    }
    if (searcheableValues[i].valLower.indexOf(queryLower) === 0) {
      // Add only if is not duplicated
      if (filteredTitles.indexOf(searcheableValues[i].valLower) === -1) {
        filteredValues.push(searcheableValues[i])
        filteredTitles.push(searcheableValues[i].valLower)
      }
    }
  }

  // Search for strings that match from any position
  if (filteredValues.length < limit) {
    for (var j = 0; j < searcheableValues.length; j++) {
      if (filteredValues.length >= limit) {
        break;
      }
      // Search for all except those that start with that string as they were added previously
      if (searcheableValues[j].valLower.indexOf(queryLower) > 0) {
        // Add only if is not duplicated
        if (filteredTitles.indexOf(searcheableValues[j].valLower) === -1) {
          filteredValues.push(searcheableValues[j])
          filteredTitles.push(searcheableValues[j].valLower)
        }
      }
    }
  }
  return filteredValues
}

function generateStyleString(styles, except) {
  var styleString = ''

  if (except == void 0) {
    except = []
  }

  for (var s in styles) {
    if (except.indexOf(s) === -1) {
      styleString += s + ':' + styles[s] + ';'
    }
  }

  return styleString
}

module.exports = KaavioHighlighter;
