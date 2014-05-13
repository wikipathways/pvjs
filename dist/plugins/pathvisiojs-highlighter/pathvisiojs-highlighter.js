(function(window, $){

  var optionsDefault = {
    displayInputField: true
  , autocompleteLimit: 10
  }

  /**
   * Init plugin
   *
   * @param {pathvisiojs instance} pvjs
   */
  function PathvisiojsHighlighter(pvjs, options) {
    var self = this
      , highlighter = {
          pvjs: pvjs
        , instance: self
        , options: extend(options || {}, optionsDefault)
        , searcheableValues: getSearcheableValues(pvjs.getSourceData().pvjson)
        , groups: {}
        }

    // Only if jQuery is available
    if (highlighter.options.displayInputField && $) {
      initInputField(highlighter)
    }

    highlighter.publicInstance = {
      highlight: function(selector, group, styles) {
        nodes = select(highlighter, selector) // returns a d3 selection

        // Highlight all nodes one by one
        if (nodes) {
          nodes.each(function(){
            highlight(highlighter, group || 'default', this, styles)
          })
        }

        // If anything highlighted then return true
        return !!nodes
      }
    , attenuate: function(selector, group) {
        if (selector) {
          nodes = select(highlighter, selector) // returns a d3 selection

          // Attenuate all nodes one by one
          if (nodes) {
            nodes.each(function(){
              attenuate(highlighter, group || 'default', this)
            })
          }
        } else {
          // Attenuate all elements from group
          attenuate(highlighter, group || 'default')
        }
      }
    }

    return highlighter.publicInstance
  }

  function initInputField(highlighter) {
    // Currently works only with svg renderer
    if (highlighter.pvjs.getSourceData().rendererEngine !== 'svg') {
      return;
    }

    // Init dom elements
    highlighter.$element = $('<div class="pathvisiojs-highlighter"/>').appendTo($(highlighter.pvjs.$element[0][0]))
    highlighter.$input = $('<input type="text"/>').appendTo(highlighter.$element)
      .attr('placeholder', 'Enter node name to highlight')
      .attr('class', 'highlighter-input')
    highlighter.$inputReset = $('<i class="highlighter-remove"/>').appendTo(highlighter.$element)

    // Typeahead
    highlighter.$input.typeahead({
      minLength: 1
    , highlight: true
    }, {
      displayKey: 'val'
    , source: function(query, cb) {
        cb(filterSearcheableValues(highlighter.searcheableValues, query, highlighter.options.autocompleteLimit))
      }
    })

    function updateTypeaheadHighlight(differentColor) {
      differentColor = differentColor || false
      var styles = differentColor ? {fill: 'blue'} : {}

      highlighter.publicInstance.attenuate(null, 'typeahead')

      if (highlighter.publicInstance.highlight(highlighter.$input.val(), 'typeahead', styles)) {
        highlighter.$inputReset.addClass('active')
      } else {
        highlighter.$inputReset.removeClass('active')
      }
    }

    highlighter.$input
      .on('typeahead:selected typeahead:closed', function(ev, suggestion) {
        updateTypeaheadHighlight()
      })
      .on('typeahead:autocompleted typeahead:cursorchanged', function(ev, suggestion) {
        updateTypeaheadHighlight(true)
      })
      .on('keypress', function(ev){
        if (ev.keyCode && ev.keyCode === 13) {
          highlighter.$input.typeahead('close')

          updateTypeaheadHighlight()
        }
      })

    // Remove all typeahead highlights
    highlighter.$inputReset.on('click', function(){
      highlighter.$input.val('')
      highlighter.publicInstance.attenuate(null, 'typeahead')
      highlighter.$inputReset.removeClass('active')
    })
  }

  function getSearcheableValues(pvjson) {
    var searcheableValues = []

    pvjson.elements
      .filter(function(element) {return element.gpmlType === 'DataNode' || element.gpmlType === 'Label'})
        .forEach(function(node) {
          if (node.hasOwnProperty('textContent')) {
            var text = node.textContent.replace('&#xA;', ' ').replace("\n", ' ')
            searcheableValues.push({
              val: text
            , valLower: text.toLowerCase()
            , xref: node.datasourceReference ? node.datasourceReference.id : ''
            , node: node
            })
          }
        })
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

  function select(highlighter, selector) {
    var d3Selector = null

    if (selector[0] === '#') {
      // Select by id
      d3Selector = selector
    } else if(selector.indexOf('xref:') === 0) {
      // Search by xref

      var d3Selectors = []
        , selectorId = selector.substr(5)

      highlighter.searcheableValues.forEach(function(searcheableValue){
        if (searcheableValue.xref === selectorId) {
          if (searcheableValue.node.id) {
            d3Selectors.push('#'+searcheableValue.node.id)
          }
        }
      })

      d3Selector = d3Selectors.join(', ')
    } else {
      // Search as text

      var d3Selectors = []
        , selectorLower = selector.toLowerCase()

      highlighter.searcheableValues.forEach(function(searcheableValue){
        if (searcheableValue.valLower === selectorLower) {
          if (searcheableValue.node.id) {
            if (searcheableValue.node.shape === 'none' && !!searcheableValue.node.textContent) {
              d3Selectors.push('#text-for-' + searcheableValue.node.id)
            } else {
              d3Selectors.push('#' + searcheableValue.node.id)
            }
          }
        }
      })

      d3Selector = d3Selectors.join(', ')
    }

    if (!d3Selector) return null
    else return highlighter.pvjs.$element.selectAll(d3Selector)
  }

  /**
   * Highlight a node. Set it into a group
   *
   * @param  {object} highlighter
   * @param  {string} group       Group name
   * @param  {object} node        pvjson.elment object
   */
  function highlight(highlighter, group, node, styles) {
    var styleString = ''
    styles = styles || {}

    for (var s in styles) {
      styleString += s + ':' + styles[s] + ';'
    }

    // Create group if it does not exist
    if (highlighter.groups[group] === undefined) {
      highlighter.groups[group] = []
    }

    // Check if node is not allready highlighted
    var g, h, light
      , highlighting = null

    // If in the same group
    for (h in highlighter.groups[group]) {
      light = highlighter.groups[group][h]

      if (light.node === node) {
        // Return as node is allready highlighted in the same group
        return;
      }
    }

    for (g in highlighter.groups) {
      for (h in highlighter.groups[g]) {
        light = highlighter.groups[g][h]

        if (light.node === node) {
          highlighting = light.highlighting
          break
        }
      }
    }

    // Render highlighting
    if (!highlighting) {
      // Render node
      var nodeBBox = node.getBBox()
        // TODO take in account padding based on border width and offset
        , padding = 2.5
        , transform = node.getAttribute('transform')
        , translate
        , translate_x = 0
        , translate_y = 0

      // If node has translate attribute
      if (transform && (translate = transform.match(/translate\(([\d\s\.]+)\)/))) {
        translate = translate[1].split(' ')
        translate_x = +translate[0]
        translate_y = translate.length > 1 ? +translate[1] : 0
      }

      highlighting = highlighter.pvjs.$element.select('#viewport')
        .append('rect')
          .attr('x', nodeBBox.x - padding + translate_x)
          .attr('y', nodeBBox.y - padding + translate_y)
          .attr('width', nodeBBox.width + 2 * padding)
          .attr('height', nodeBBox.height + 2 * padding)
          .attr('class', 'highlighted-node')
          .attr('style', styleString + 'pointer-events: none')
    } else {
      // Apply new style
      highlighting.attr('style', styleString + 'pointer-events: none')
    }

    // Add info to group
    highlighter.groups[group].push({
      node: node
    , highlighting: highlighting
    })
  }

  /**
   * Remove the whole group if node is not provided
   * Remove only given node if it is provided
   *
   * @param  {object} highlighter
   * @param  {string} group       group name
   * @param  {object} node        pvjson.element node
   */
  function attenuate(highlighter, group, node) {
    if (highlighter.groups[group] === undefined || !highlighter.groups[group].length) {
      return;
    }

    // Shorthand
    var _group = highlighter.groups[group]

    for (var i = _group.length - 1; i >= 0; i--) {
      // If nodes doesn't match move on
      if (node && _group[i].node !== node) {
        continue;
      }

      // Remove highlighting
      _group[i].highlighting.remove()

      // Remove node from all groups
      removeNode(highlighter, _group[i].node)
    }
  }

  /**
   * Removes node from all groups
   * @param  {[type]} highlighter [description]
   * @param  {[type]} node        [description]
   * @return {[type]}             [description]
   */
  function removeNode(highlighter, node) {
    var g, _group, h, light

    for (g in highlighter.groups) {
      _group = highlighter.groups[g]

      for (h in _group) {
        light = _group[h]

        if (light.node === node) {
          _group.splice(h, 1)
          break; // Go to next group
        }
      }
    }
  }

  /**
   * Utilities
   */

  function extend(o1, o2) {
    for (var i in o2) {
      if (o2.hasOwnProperty(i) && !o1.hasOwnProperty(i)) {
        o1[i] = o2[i]
      }
    }
    return o1
  }

  /**
   * Expose plugin globally
   */
  window.pathvisiojsHighlighter = PathvisiojsHighlighter
})(window, window.jQuery || null)
