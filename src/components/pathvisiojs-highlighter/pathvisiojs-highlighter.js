var fs = require('fs');
var insertCss = require('insert-css');
var css = fs.readFileSync(
    __dirname + '/pathvisiojs-highlighter.css');

window.initPathvisiojsHighlighter = function(window, $) {
  insertCss(css);

  var optionsDefault = {
        displayInputField: true
      , autocompleteLimit: 10
      , styles: {
          'backgroundColor': 'yellow'
        , 'backgroundOpacity': 0.2
        , 'borderColor': 'orange'
        , 'borderWidth': 3
        , 'borderOpacity': 0.9

        , 'pointer-events': 'none'
        }
      }
    , instancesMap = {}

  /**
   * Init plugin
   *
   * @param {pathvisiojs instance} pvjs
   * @param {objects} options
   */
  function init(pvjs, options) {
    // Create new instance if it does not exist
    if (!instancesMap.hasOwnProperty(pvjs.instanceId)) {
      instancesMap[pvjs.instanceId] = new PathvisiojsHighlighter(pvjs, options);
    }

    return instancesMap[pvjs.instanceId].getPublicInstance();
  }

  /**
   * Costructor
   *
   * @param {Object} pvjs
   */
  var PathvisiojsHighlighter = function(pvjs, options) {
    this.options = $.extend({}, optionsDefault, options);

    this.pvjs = pvjs;
    this.$pvjsElement = $(this.pvjs.$element[0][0])
    this.pvjsSourceData = this.pvjs.getSourceData();
    this.isInitiated = false

    // Right now working only with SVG renderer
    if (this.pvjsSourceData.rendererEngine === 'svg') {
      this.isInitiated = true
      this.selector = this.pvjsSourceData.selector;
      this.elements = this.pvjsSourceData.pvjson.elements;

      this.groups = {};

      if (this.options.displayInputField) {
        // Used only for typeahead search
        this.searcheableValues = getSearcheableValues(this.elements);
        // Creat DOM elements and hooks for them
        this.initInputField();
      }
    }
  }

  /**
   * Returns a public instance
   *
   * @return {object} public instance
   */
  PathvisiojsHighlighter.prototype.getPublicInstance = function() {
    if (this.publicInstance === undefined) {
      this.publicInstance = {
        highlight: $.proxy(this.highlightPublic, this)
      , attenuate: $.proxy(this.attenuatePublic, this)
      };
    }

    return this.publicInstance;
  }

  /**
   * Highlight elements that match stringSelector and add them to provided group
   * If element is highlighted in given group - do nothing
   * If element is highlighted in another group - update styles
   * Apply provided styles, default otherwise
   *
   * @public
   * @param  {string} stringSelector  String selector
   * @param  {string} group   Group name
   * @param  {object} styles Styles
   * @return {Boolean} if anything found
   */
  PathvisiojsHighlighter.prototype.highlightPublic = function(stringSelector, group, styles) {
    if (!this.isInitiated) {return}

    var selector = this.selectByString(stringSelector)
      , that = this

    // Highlight all nodes one by one
    if (selector.length) {
      selector.forEach(function(element){
        that.highlight(group || 'default', element, styles)
      })
    }

    return selector.length > 0
  }

  /**
   * Attenuate elements that match stringSelector and group.
   * Remove them from all groups.
   *
   * @public
   * @param  {string} stringSelector  String selector
   * @param  {string} group   Group name
   */
  PathvisiojsHighlighter.prototype.attenuatePublic = function(stringSelector, group) {
    if (!this.isInitiated) {return}

    if (stringSelector === null) {
      this.attenuate(group || 'default', null)
    } else {
      var that = this

      // Attenuate all nodes one by one
      this.selectByString(stringSelector).forEach(function(element){
        that.attenuate(group || 'default', element)
      })
    }
  }

  /**
   * Parse string and decide which selector method to call
   *
   * @param  {string} stringSelector
   * @return {object}                selector
   */
  PathvisiojsHighlighter.prototype.selectByString = function(stringSelector) {
    var selector = []

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
   * If highlighting exist in a different group, add it to this group
   * If highlighting exist then update its styles
   *
   * @param  {string} group  Group name
   * @param  {object} element   pvjsonElement or svgElement
   * @param  {object} styles Styles
   */
  PathvisiojsHighlighter.prototype.highlight = function(group, element, styles) {
    styles = $.extend({}, this.options.styles, styles)

    // Create group if it does not exist
    if (this.groups[group] === undefined) {
      this.groups[group] = []
    }

    // Check if element is not allready highlighted
    var g, h, light
      , highlighting = null
      , inSameGroup = false

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
      if (element[0]['gpml:element'] === 'gpml:Interaction' || element[0]['gpml:element'] === 'gpml:GraphicalLine') {
        // Do not add background to paths as it will create a shape from a broken line
        delete styles.backgroundColor

        highlighting = element.cloneElement().setStyles(styles)
      } else {
        var BBox = element.getBBox()

        BBox.x = BBox.left
        BBox.y = BBox.top

        this.selector.addElement($.extend({shape: 'rectangle'}, styles, BBox))
        highlighting = this.selector.getLast()

        // TODO make this task in selector or in renderer
        // Update styles because cross-platform-shapes may not apply all styles
        highlighting.setStyles(styles)
      }
    } else {
      // Apply new styles
      highlighting.setStyles(styles)
    }

    // Add info to group
    if (highlighting && !inSameGroup) {
      this.groups[group].push({
        element: element
      , highlighting: highlighting
      })
    }
  }

  /**
   * Search for an element in given group. If no element is provided - select all element from given group.
   * Remove highlighting from an element and remove it from all groups
   *
   * @param  {string} group  Group name
   * @param  {object} [element]   pvjsonElement or svgElement
   */
  PathvisiojsHighlighter.prototype.attenuate = function(group, element) {
    // If not such group or it is empty
    if (this.groups[group] === undefined || !this.groups[group].length) {
      return;
    }

    // Shorthand
    var _group = this.groups[group]

    for (var i = _group.length - 1; i >= 0; i--) {
      // If element is null or it matches given element then remove it
      if (element === null || _group[i].element.getId() === element.getId()) {
        // Remove highlighting
        _group[i].highlighting.remove()

        // Remove element from all groups
        this.removeElementFromGroups(_group[i].element)
      }
    }
  }

  /**
   * Removes element from all groups
   *
   * @param  {selector Object} element
   */
  PathvisiojsHighlighter.prototype.removeElementFromGroups = function(element) {
    var g, _group, l

    for (g in this.groups) {
      _group = this.groups[g]

      for (l in _group) {
        if (_group[l].element.getId() === element.getId()) {
          _group.splice(l, 1)
          break; // Go to next group
        }
      }
    }
  }

  /**
   * Initialize input/typeahead field
   *
   * @private
   */
  PathvisiojsHighlighter.prototype.initInputField = function() {
    var that = this;

    // Currently works only with svg renderer
    if (this.pvjsSourceData.rendererEngine !== 'svg') {
      return;
    }

    // Init dom elements
    this.$element = $('<div class="pathvisiojs-highlighter"/>').appendTo(this.$pvjsElement);
    this.$input = $('<input type="text"/>').appendTo(this.$element)
      .attr('placeholder', 'Enter node name to highlight')
      .attr('class', 'highlighter-input');
    this.$inputReset = $('<i class="highlighter-remove"/>').appendTo(this.$element);

    // Typeahead
    this.$input.typeahead({
      minLength: 1
    , highlight: true
    }, {
      displayKey: 'val'
    , source: function(query, cb) {
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
        setTimeout(function(){that.updateTypeaheadHighlight()}, 10)
      })
      .on('typeahead:autocompleted typeahead:cursorchanged', function(ev, suggestion) {
        that.updateTypeaheadHighlight(true)
      })
      .on('keypress', function(ev){
        if (ev.keyCode && ev.keyCode === 13) {
          that.$input.typeahead('close')

          that.updateTypeaheadHighlight()
        }
      })

    // Typeahead reset
    this.$inputReset.on('click', function(){
      that.$input.val('')
      that.getPublicInstance().attenuate(null, 'typeahead')
      that.$inputReset.removeClass('active')
    })
  }

  PathvisiojsHighlighter.prototype.updateTypeaheadHighlight = function (differentColor) {
    differentColor = differentColor || false;
    var styles = differentColor ? {fill: 'blue'} : {};

    this.getPublicInstance().attenuate(null, 'typeahead')

    if (this.getPublicInstance().highlight(this.$input.val(), 'typeahead', styles)) {
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
        .filter(function(element) {return element['gpml:element'] === 'gpml:DataNode' || element['gpml:element'] === 'gpml:Label'})
          .forEach(function(element) {
            if (element.hasOwnProperty('textContent')) {

              var text = element.textContent.replace(/\n/g, ' ')
              searcheableValues.push({
                val: text
              , valLower: text.toLowerCase()
              })
            }
          })
    }

    return searcheableValues
  }

  function filterSearcheableValues(searcheableValues, query, limit) {
    var filteredValues = []
      , filteredTitles = []
      , queryLower = query.toLowerCase()
      , limit = limit || 10

    // Search for strings that match from first letter
    for (var i = 0; i < searcheableValues.length; i++) {
      if (filteredValues.length >= limit) break;
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
      for (var i = 0; i < searcheableValues.length; i++) {
        if (filteredValues.length >= limit) break;
        // Search for all except those that start with that string as they were added previously
        if (searcheableValues[i].valLower.indexOf(queryLower) > 0) {
          // Add only if is not duplicated
          if (filteredTitles.indexOf(searcheableValues[i].valLower) === -1) {
            filteredValues.push(searcheableValues[i])
            filteredTitles.push(searcheableValues[i].valLower)
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

  /**
   * Expose plugin globally as pathvisiojsHighlighter
   */
  window.pathvisiojsHighlighter = init
};
