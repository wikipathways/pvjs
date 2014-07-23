(function(window, $){

  var optionsDefault = {
    sourceData: []
  }

  /**
   * Init plugin
   *
   * @param {pathvisiojs instance} pvjs
   * @param {objects} options
   */
  function init(pvjs, options) {
    // Create new instance if it does not exist
    if (!instancesMap.hasOwnProperty(pvjs.instanceId)) {
      instancesMap[pvjs.instanceId] = new PathvisiojsDiffViewer(pvjs, options)
    }
  }

  /**
   * Costructor
   *
   * @param {Object} pvjs
   */
  var PathvisiojsDiffViewer = function(pvjs, options) {
    this.options = $.extend({}, optionsDefault, options)

    this.pvjs = pvjs
    this.$pvjsElement = $(this.pvjs.$element[0][0])

    this.initContainer()
    this.initSecondPvjs()
    this.hookEvents()
    this.pvjs2.render()
  }

  PathvisiojsDiffViewer.prototype.initContainer = function() {
    this.$diffviewer = $('<div class="pathvisiojs-diffviewer"/>')

    // Create panes
    this.$paneLeft = $('<div class="pane-inner"></div>').appendTo($('<div class="pane pane-left"></div>').appendTo(this.$diffviewer))
    this.$paneRight = $('<div class="pane-inner"></div>').appendTo($('<div class="pane pane-right"></div>').appendTo(this.$diffviewer))
    this.$paneCenter = $('<div class="pane pane-center"></div>').appendTo(this.$diffviewer)

    // Insert diffviewer container before pvjs element
    this.$diffviewer.insertBefore(this.$pvjsElement)

    // Move instance element into left pane
    this.$paneLeft.append(this.$pvjsElement)
  }

  PathvisiojsDiffViewer.prototype.initSecondPvjs = function() {
    // Create second instance container
    this.$pvjsElement2 = $('<div/>').appendTo(this.$paneRight)

    // Get original options
    var pvjsOptions = this.pvjs.getOptions()
    // Set new source data
    pvjsOptions.sourceData = this.options.sourceData
    pvjsOptions.manualRender = true

    // Create second pvjs instance
    this.pvjs2 = window.pathvisiojs(this.$pvjsElement2[0], pvjsOptions)[0]
  }

  PathvisiojsDiffViewer.prototype.hookEvents = function() {
    var that = this
      , pvjsRendered = false
      , pvjs2Rendered = false

    // pvjs renderer barrier
    this.pvjs.on('rendered', function(){
      pvjsRendered = true
      if (pvjs2Rendered) {
        displayChanges(pvjs, pvjs2, $paneCenter)
      }
    })
    this.pvjs2.on('rendered', function(){
      pvjs2Rendered = true
      if (pvjsRendered) {
        displayChanges(pvjs, pvjs2, $paneCenter)
      }
    })

    // On destroy pvjs
    this.pvjs.on('destroy.pvjs', function(){
      that.pvjs2.destroy()
      // Put back pvjs element container
      that.$pvjsElement.insertBefore(that.$diffviewer)
      that.$diffviewer.remove()
    })

    // Pan and zoom events
    var pvjsPanned = false
      , pvjsZoomed = false
      , pvjs2Panned = false
      , pvjs2Zoomed = false

    this.pvjs.on('zoomed.renderer', function(level){
      if (pvjs2Zoomed) { // prevent recursive call
        pvjs2Zoomed = false
        return
      }
      pvjsZoomed = true

      that.pvjs2.zoom(level / that.zoomScale)
      that.pvjs.panBy({x: 0, y: 0}) // trigger pan to sync pathways
      that.pvjs2.pan(that.pvjs.getPan())
    })

    this.pvjs.on('panned.renderer', function(point){
      if (pvjs2Panned) {
        pvjs2Panned = false
        return
      }
      pvjsPanned = true
      that.pvjs2.pan(point)
    })

    this.pvjs2.on('zoomed.renderer', function(level){
      if (pvjsZoomed) {
        pvjsZoomed = false
        return
      }
      pvjs2Zoomed = true

      that.pvjs.zoom(level * that.zoomScale)
      that.pvjs2.panBy({x: 0, y: 0}) // trigger pan to sync pathways
      that.pvjs.pan(that.pvjs2.getPan())
    })

    this.pvjs2.on('panned.renderer', function(point){
      if (pvjsPanned) {
        pvjsPanned = false
        return
      }
      pvjs2Panned = true
      that.pvjs.pan(point)
    })
  }

  function displayChanges(pvjs, pvjs2, $paneCenter){
    var diff = calculateDiff(pvjs.getSourceData().pvjson, pvjs2.getSourceData().pvjson)
      , elementsOld = pvjs.getSourceData().pvjson.elements
      , elementsNew = pvjs2.getSourceData().pvjson.elements
      , elementsMix = pvjs2.getSourceData().pvjson.elements

    // Add old elements that does not exist in new
    var elementFound = false;
    for (e in elementsOld) {
      elementFound = false
      for (e2 in elementsMix) {
        if (elementsMix[e2].id === elementsOld[e].id) {
          elementsFound = true
        }
      }

      if (!elementsFound) {
        elemetsMix.push(elementsOld[e])
      }
    }

    // Append changes container
    $paneCenter.append(createChangesList())

    // Add changes to container
    var $containerAdded = $paneCenter.find('[data-type=added]').children('.changes-list').first()
      , $containerUpdated = $paneCenter.find('[data-type=updated]').children('.changes-list').first()
      , $containerRemoved = $paneCenter.find('[data-type=removed]').children('.changes-list').first()

    parseAndRenderChanges(diff.added, $containerAdded, 'added', elementsNew)
    parseAndRenderChanges(diff.removed, $containerRemoved, 'removed', elementsOld)
    parseAndRenderChanges(diff.updated, $containerUpdated, 'updated', elementsMix)

  PathvisiojsDiffViewer.prototype.zoomScale = 1

  PathvisiojsDiffViewer.prototype.getZoomScale = function() {
    this.zoomScale = this.pvjs.getZoom() / this.pvjs2.getZoom()
  }

  PathvisiojsDiffViewer.prototype.displayDiff = function() {
    this.elements = this.pvjs.getSourceData().pvjson.elements
    this.elements2 = this.pvjs2.getSourceData().pvjson.elements
    this.elementsMerge = this.mergeElements(this.elements2, this.elements) // New elements have priority

    var diff = this.computeDiff()

    this.initDiffView(diff.added.length, diff.updated.length, diff.removed.length)

    // Store elements grouped by change type and group name
    this.elementsCache = {added: {}, updated: {}, removed: {}}
    this.elementsReferences = {}

    if (diff.added.length) {this.renderDiffsOfType('added', diff.added, this.$listAdded, this.elements2)}
    if (diff.updated.length) {this.renderDiffsOfType('updated', diff.updated, this.$listUpdated, this.elementsMerge)}
    if (diff.removed.length) {this.renderDiffsOfType('removed', diff.removed, this.$listRemoved, this.elements)}

    this.hookDiffNavigation()

    // Highlight all changes
    this.highlight('added')
    this.highlight('updated')
    this.highlight('removed')
  }

  /**
   * Merge lists by appending unique elements from second list to first list
   * @param  {Array} elements
   * @param  {Array} elements2
   * @return {Array}
   */
  function createChangesList() {
    var $changesList = $('<div class="changes changes-list"></div>')
      , $changesContainer1 = $('<div class="changes-container" data-level="1" data-type="added">').appendTo($changesList)
      , $changesContainer2 = $('<div class="changes-container" data-level="1" data-type="updated">').appendTo($changesList)
      , $changesContainer3 = $('<div class="changes-container" data-level="1" data-type="removed">').appendTo($changesList)
      ;

    $changesContainer1.append($('<div class="changes-title changes-parent change-added"><span>Added</span></div>'))
    $changesContainer1.append($('<div class="changes-list"></div>'))
    $changesContainer2.append($('<div class="changes-title changes-parent change-updated"><span>Updated</span></div>'))
    $changesContainer2.append($('<div class="changes-list"></div>'))
    $changesContainer3.append($('<div class="changes-title changes-parent change-removed"><span>Removed</span></div>'))
    $changesContainer3.append($('<div class="changes-list"></div>'))

    return $changesList;
  }

  function highlightChanges($changes, type, hi, hi2, attenuate) {
    if (typeof attenuate == 'undefined') {
      attenuate = true
    }
    // Find change type
    var colors = {}

    if (type === 'added') {
      colors.fill = colors.stroke = '#0E53A7'
    } else if (type === 'updated') {
      colors.fill = colors.stroke = '#FFF700'
    } else if (type === 'removed') {
      colors.fill = colors.stroke = '#F10026'
    }

    if (attenuate) {
      // Remove old highlights
      hi.attenuate(null)
      hi2.attenuate(null)
    }

    $changes.each(function(index){
      if (type === 'removed' || type === 'updated') {
        hi.highlight('#' + this.pvjsonElement.id, null, colors)
      }
      if (type === 'updated' || type === 'added') {
        hi2.highlight('#' + this.pvjsonElement.id, null, colors)
      }
    })
  }

  function parseAndRenderChanges(list, $containerParent, type, elementsList) {
    if (list.length === 0) return;

    // Sort by gpml:element and shape
    listSorted = list.sort(function(a, b){
      if (a['gpml:element'] === b['gpml:element']) {
        return a.shape > b.shape ? 1 : -1
      }
      if (a['gpml:element'] === undefined) return -1
      if (b['gpml:element'] === undefined) return 1
      return a['gpml:element'] > b['gpml:element'] ? 1 : -1
    })

    // Group only visible elements
    var addedGroups = {}
      , groupName = ''
      , elementType = ''
    for (d in listSorted) {
      elementType = listSorted[d]['gpml:element'].replace(/^gpml\:/, '') || '';

      if (elementType === 'Interaction') {
        groupName = 'Interactions'
      } else if (elementType === 'DataNode') {
        groupName = 'Data Nodes'
      } else if (elementType !== 'GroupNode') {
        groupName = 'Graphical Objects'
      } else {
        // Skip GroupNode
        continue
      }

      if (addedGroups[groupName] === undefined) {
        addedGroups[groupName] = []
      }

      addedGroups[groupName].push(listSorted[d])
    }

    var $container
      , $containerTitle
      , $containerList
      , $elementContainer
      , $elementTitle
      , title
    for (g in addedGroups) {
      $container = $('<div class="changes-container" data-level="2"/>').appendTo($containerParent)
      $containerTitle = $('<div class="changes-title changes-parent change-' + type + '"><span>' + g + '</span></div>').appendTo($container)
      $containerList = $('<div class="changes-list" />').appendTo($container)

      // Sort ingroup
      addedGroups[g] = addedGroups[g].sort(function(a, b){
        return getChangeTitle(a, elementsList).toLowerCase() > getChangeTitle(b, elementsList).toLowerCase() ? 1 : -1
      })

      for (e in addedGroups[g]) {
        title = getChangeTitle(addedGroups[g][e], elementsList)

        $elementContainer = $('<div class="changes-container" data-level="3"/>').appendTo($containerList)
        $elementTitle = $('<div class="changes-title change-' + type + '"></div>').appendTo($elementContainer)
        $title = $('<span>' + title + '</span>').appendTo($elementTitle)
        if (type === 'updated') {
          $changes = $('<ul class="element-changes"></ul>')

          titles = getUpdateTitles(addedGroups[g][e].diff)
          for (title in titles) {
            $changes.append('<li>' + titles[title] + '</li>')
          }

          $changes.appendTo($elementTitle)
        } else if (type === 'added') {
          titles = getAddTitles(addedGroups[g][e])

    for (e in elements2) {
      elementFound = false
      for (e2 in elementsMerge) {
        if (elementsMerge[e2].id === elements2[e].id) {
          elementFound = true
          break
        }
      }

      // If element is unique then add it to merge
      if (!elementFound) {
        elementsMerge.push(elements2[e])
      }
    }

    return elementsMerge
  }

  PathvisiojsDiffViewer.prototype.computeDiff = function() {
    // Clone lists to be safe from modifying them internally (in case that pvjson was not deep-cloned)
    var elements = this.elements.slice()    // Old pathway elements
      , elements2 = this.elements2.slice()  // New pathway elements
      , diff = {
          updated: []
        , added: []
        , removed: []
        }
      , element
      , found

    for (var i = elements.length - 1; i >= 0; i--) {
      element = elements[i]
      found = false

      // Search for element by ID in second list
      for (var j = elements2.length - 1; j >= 0; j--) {
        if (elements[i].id === elements2[j].id) {
          found = true

          // Check for changes
          if (calculateElementDiff(elements[i], elements2[j])) {
            diff.updated.push({
              id: elements2[j].id
            , 'gpml:element': elements2[j]['gpml:element'] || elements[i]['gpml:element'] || undefined
            , type: elements2[j].type || elements[i].type || undefined
            , shape: elements2[j].shape || elements[i].shape || undefined
            , textContent: elements2[j].textContent || elements[i].textContent || elements2[j].title || elements2[j].displayName || elements[i].title || elements[i].displayName || undefined
            , points: elements2[j].points || elements[i].points || undefined
            , diff: calculateElementDiff(elements[i], elements2[j])
            , _element: elements[i]
            , _element2: elements2[j]
            })
          }

          // Remove found elements from search poll
          elements.splice(i, 1)
          elements2.splice(j, 1)

          break
        }
      }

      if (!found) {
        diff.removed.push(elements[i])
      }
    }

    // All not matched elements from second list are new
    diff.added = elements2.slice()

    return diff
  }

  function calculateElementDiff(element, element2) {
    var diff = {
          added: []
        , removed: []
        , updated: []
        }

    for (e in element) {
      if (!element2.hasOwnProperty(e)) {
        diff.removed.push({key: e, value: element[e]})
      } else {
        if (element[e] !== element2[e] && isStringOrNumber(element[e]) && isStringOrNumber(element2[e])) {
          diff.updated.push({key: e, value: element2[e], old: element[e]})
        }
        // else nothing
      }
    }

    // Check for elements in element2 that are not in element
    for (e in element2) {
      if (!element.hasOwnProperty(e)) {
        diff.added.push({key: e, value: element2[e]})
      }
    }

    if (diff.added.length || diff.removed.length || diff.updated.length) {
      return diff
    } else {
      return null
    }
  }

  function isStringOrNumber(obj) {
    return (Object.prototype.toString.apply(1) === Object.prototype.toString.apply(obj)
         || Object.prototype.toString.apply('') === Object.prototype.toString.apply(obj))
  }

  function getChangeTitle(obj, list) {
    if (obj['gpml:element'] === 'gpml:Interaction') {
      return '' + findTitleById(obj.points[0].isAttachedTo, list) + ' <i class="icon icon-arrow-right"></i> ' + findTitleById(obj.points[1].isAttachedTo, list)
    } else if (obj['gpml:element'] === 'gpml:DataNode') {
      return obj.textContent
    } else if (obj['gpml:element'] === 'gpml:Label') {
      return obj.textContent
    } else if (obj['gpml:element'] === 'gpml:Shape') {
      return obj.shape.slice(0, 1).toUpperCase() + obj.shape.slice(1)
    } else if (obj['gpml:element'] === 'gpml:GraphicalLine') {
      return 'Graphical line'
    } else if (obj['gpml:element'] === 'gpml:State') {
      return 'State ' + obj.textContent + ' (' + findTitleById(obj.isAttachedTo, list) + ')'
    } else if (obj['gpml:element'] === 'gpml:Group') {
      return 'Group'
    }

    return 'no title'
  }

  function findTitleById(id, list) {
    if (typeof id == 'undefined') {
      return 'Unknown'
    }

    for (l in list) {
      if (list[l].id != null && id === list[l].id) {
        // Check if is not interaction to avoid circular recursion
        if (list[l]['gpml:element'] === 'gpml:Interaction') {
          return 'Interaction'
        } else {
          return getChangeTitle(list[l], list)
        }
      }
    }

    // If no match found then return initial ID
    return id;
  }

  PathvisiojsDiffViewer.prototype.getElementChanges = function(type, element) {
    var titles = []

    if (type === 'added') {
      if (element.hasOwnProperty('entityReference')) {
        titles.push('Added <strong>reference</strong>: ' + element.entityReference)
      }
    } else if (type === 'updated') {
      var floatKeys = ['width', 'height', 'x', 'y', 'rotation']
        , oldValue = ''
        , newValue = ''
        , diff = element.diff

      for (u in diff.added) {
        titles.push('Added: <strong>' + diff.added[u].key + '</strong> ' + diff.added[u].value)
      }

      for (u in diff.removed) {
        titles.push('Removed: <strong>' + diff.removed[u].key + '</strong> ' + diff.removed[u].value)
      }

      for (u in diff.updated) {
        // Round float values
        if (floatKeys.indexOf(diff.updated[u].key) !== -1) {
          oldValue = Math.round(parseFloat(diff.updated[u].old)*100)/100
          newValue = Math.round(parseFloat(diff.updated[u].value)*100)/100
        } else {
          oldValue = diff.updated[u].old
          newValue = diff.updated[u].value
        }
        titles.push('<strong>' + diff.updated[u].key + ':</strong> ' + oldValue + ' <i class="icon icon-arrow-right"></i> ' + newValue)
      }
    }

    return titles
  }

  PathvisiojsDiffViewer.prototype.hookDiffNavigation = function() {
    var $paneCenter = this.$paneCenter
      , that = this

    this.initHighlighting()

    $paneCenter.on('click', '.changes-title', function(ev){
      // Visually opening/closing titles
      var $this = $(this)
        , $active = $this

      if (!$this.parent().hasClass('active')) {
        $paneCenter.find('.active').removeClass('active')
        $paneCenter.find('.open').removeClass('open')
        $this.parent().addClass('active')
        $this.parentsUntil($paneCenter).addClass('open')
      } else {
        $this.parent().removeClass('active open')
        $this.parent().parent().closest('.changes-container').addClass('active')

        $active = $this.parent().parent().closest('.changes-container').children('.changes-title')
      }

      // Attenuate all previous elements
      that.attenuate()

      if ($active.length) {
        var level = +$active.parent().data('level')
          , type = $active.parent().data('type')

        if (level === 1) {
          that.highlight(type, null, null)
        } else if (level === 2) {
          that.highlight(type, $active.data('group'), null)
        } else if (level === 3) {
          that.highlight(type, $active.data('group'), $active.data('id'))
        }
      }
    })
  }

  PathvisiojsDiffViewer.prototype.initHighlighting = function() {
    this.hi = window.pathvisiojsHighlighter(this.pvjs, {displayInputField: false})
    this.hi2 = window.pathvisiojsHighlighter(this.pvjs2, {displayInputField: false})
  }

  PathvisiojsDiffViewer.prototype.highlight = function(type, group, id) {
    var ids = []
      , highlightString = ''

    // If we have type, group and id - get only that id
    if (type && group && id) {
      ids = [id]
    } else {
      ids = this.getAllElements(type, group)
    }

    // Find change type
    var colors = {}

    if (type === 'added') {
      colors.backgroundColor = colors.borderColor = '#0E53A7'
    } else if (type === 'updated') {
      colors.backgroundColor = colors.borderColor = '#FFF700'
    } else if (type === 'removed') {
      colors.backgroundColor = colors.borderColor = '#F10026'
    }

    for (var i in ids) {
      // If is a reference
      if (this.isIdReference(ids[i])) {
        highlightString = 'xref:id:' + ids[i]
      } else {
        highlightString = '#' + ids[i]
      }

      if (type === 'removed' || type === 'updated') {
        this.hi.highlight(highlightString, null, colors)
      }
      if (type === 'updated' || type === 'added') {
        this.hi2.highlight(highlightString, null, colors)
      }
    }
  }

  PathvisiojsDiffViewer.prototype.attenuate = function() {
    this.hi.attenuate(null)
    this.hi2.attenuate(null)
  }

  /**
   * Expose plugin globally as pathvisiojsDiffviewer
   */
  window.pathvisiojsDiffviewer = init
})(window, window.jQuery || window.Zepto)
