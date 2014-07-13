(function(window){

  var optionsDefault = {
    sourceData: []
  }

  /**
   * Init plugin
   *
   * @param {pathvisiojs instance} pvjs
   */
  function PathvisiojsDiffviewer(pvjs, options) {
    var options = options || {}
      , $diffviewer = $('<div class="pathvisiojs-diffviewer"/>')
      , $pvjsElement = $(pvjs.$element[0][0])

    // Copy default options
    for (var i in optionsDefault) {
      if (optionsDefault.hasOwnProperty(i) && !options.hasOwnProperty(i)) {
        options[i] = optionsDefault[i]
      }
    }

    // Add diffviewer container before pvjs element
    $diffviewer.insertBefore($pvjsElement)

    // Create panes
    var $paneLeft = $('<div class="pane-inner"></div>').appendTo($('<div class="pane pane-left"></div>').appendTo($diffviewer))
      , $paneRight = $('<div class="pane-inner"></div>').appendTo($('<div class="pane pane-right"></div>').appendTo($diffviewer))
      , $paneCenter = $('<div class="pane pane-center"></div>').appendTo($diffviewer)

    // Move instance element into left pane
    $paneLeft.append($pvjsElement)

    // Create second instance container
    var $pvjsElement2 = $('<div/>').appendTo($paneRight)

    // pvjs options
    var pvjsOptions = pvjs.getOptions()
    pvjsOptions.sourceData = options.sourceData
    pvjsOptions.manualRender = true

    // Create second pvjs instance
    var pvjs2 = window.pathvisiojs($pvjsElement2[0], pvjsOptions)[0]

    var pvjsRendered = false
      , pvjs2Rendered = false
    pvjs.on('rendered', function(){
      pvjsRendered = true
      if (pvjs2Rendered) {
        displayChanges(pvjs, pvjs2, $paneCenter)
      }
    })
    pvjs2.on('rendered', function(){
      pvjs2Rendered = true
      if (pvjsRendered) {
        displayChanges(pvjs, pvjs2, $paneCenter)
      }
    })

    pvjs.on('destroy.pvjs', function(){
      pvjs2.destroy()
      $pvjsElement.insertBefore($diffviewer)
      $diffviewer.remove()
    })

    var pvjsPanned = false
      , pvjsZoomed = false
      , pvjs2Panned = false
      , pvjs2Zoomed = false

    pvjs.on('zoomed.renderer', function(level){
      if (pvjs2Zoomed) {
        pvjs2Zoomed = false
        return
      }
      pvjsZoomed = true

      pvjs2.zoom(level)
      pvjs.panBy({x: 0, y: 0}) // TODO fix this by updating pan after zoom
      pvjs2.pan(pvjs.getPan())
    })

    pvjs.on('panned.renderer', function(point){
      if (pvjs2Panned) {
        pvjs2Panned = false
        return
      }
      pvjsPanned = true
      pvjs2.pan(point)
    })

    pvjs2.on('zoomed.renderer', function(level){
      if (pvjsZoomed) {
        pvjsZoomed = false
        return
      }
      pvjs2Zoomed = true

      pvjs.zoom(level)
      pvjs2.panBy({x: 0, y: 0}) // TODO fix this by updating pan after zoom
      pvjs.pan(pvjs2.getPan())
    })

    pvjs2.on('panned.renderer', function(point){
      if (pvjsPanned) {
        pvjsPanned = false
        return
      }
      pvjs2Panned = true
      pvjs.pan(point)
    })

    pvjs2.render()
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

    // Events
    var hi = pathvisiojsHighlighter(pvjs, {displayInputField: false})
      , hi2 = pathvisiojsHighlighter(pvjs2, {displayInputField: false})
    $paneCenter.on('click', '.changes-title', function(ev){
      var $this = $(this)
      if (!$this.parent().hasClass('active')) {
        $paneCenter.find('.active').removeClass('active')
        $paneCenter.find('.open').removeClass('open')
        $this.parent().addClass('active')
        $this.parentsUntil($paneCenter).addClass('open')
      } else {
        $this.parent().removeClass('active open')
        $this.parent().parent().closest('.changes-container').addClass('active')
      }

      if ($this.parent().data('level') === 3) {
        // Find change type
        var type = $this.parent().closest('.changes-container[data-level=1]').data('type')

        highlightChanges($this, type, hi, hi2)
      } else if ($this.parent().data('level') === 2) {
        var type = $this.parent().closest('.changes-container[data-level=1]').data('type')

        // Find all children
        var $changesTitles = $this.siblings('.changes-list').find('.changes-title')

        highlightChanges($changesTitles, type, hi, hi2)
      } else if ($this.parent().data('level') === 1) {
        var type = $this.parent().closest('.changes-container[data-level=1]').data('type')

        // Find all children
        var $changesTitles = $this.siblings('.changes-list').find('.changes-container[data-level=3] .changes-title')

        highlightChanges($changesTitles, type, hi, hi2)
      }
    })

    // At the beginning highlight all parent nodes
    $paneCenter.find('.changes-container[data-level=1]').each(function(index, element){
      var $this = $(this)
        , type = $this.data('type')
        // Find all children
        , $changesTitles = $this.children('.changes-list').find('.changes-container[data-level=3] .changes-title')

      highlightChanges($changesTitles, type, hi, hi2, false)
    })
  }

  /**
   * Creates changes list and containers
   *
   * @return {object} jQuery object
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
        return getAddTitle(a, elementsList).toLowerCase() > getAddTitle(b, elementsList).toLowerCase() ? 1 : -1
      })

      for (e in addedGroups[g]) {
        title = getAddTitle(addedGroups[g][e], elementsList)

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
        }
        $elementTitle[0].pvjsonElement = addedGroups[g][e]
      }
    }
  }

  function getUpdateTitles(diff) {
    var titles = []
      , floatKeys = ['width', 'height', 'x', 'y', 'rotation']
      , oldValue = ''
      , newValue = ''

    for (u in diff.added) {
      titles.push('Added <strong>' + diff.added[u].key + '</strong>')
    }
    for (u in diff.removed) {
      titles.push('Removed <strong>' + diff.removed[u].key + '</strong>')
    }
    for (u in diff.updated) {
      if (floatKeys.indexOf(diff.updated[u].key) !== -1) {
        oldValue = Math.round(parseFloat(diff.updated[u].old)*100)/100
        newValue = Math.round(parseFloat(diff.updated[u].value)*100)/100
      } else {
        oldValue = diff.updated[u].old
        newValue = diff.updated[u].value
      }
      titles.push('<strong>' + diff.updated[u].key + ':</strong> ' + oldValue + ' -> ' + newValue)
    }

    return titles
  }

  function calculateDiff(pvjson, pvjson2) {
    // Clone lists to be safe from modifying them internally (in case that pvjson was not deep-cloned)
    var elements = pvjson.elements.slice()    // Old graph
      , elements2 = pvjson2.elements.slice()  // New graph
      , diff = {
          updated: []
        , added: []
        , removed: []
        }
      , element
      , found

    // TODO refactor
    elements = elements.filter(function(e){
      if (e.type == 'PublicationXref') return false;
      return e.type == null || !/Reference$/.test(e.type)
    })
    elements2 = elements2.filter(function(e){
      if (e.type == 'PublicationXref') return false;
      return e.type == null || !/Reference$/.test(e.type)
    })

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
            , textContent: elements2[j].textContent || elements[i].textContent || undefined
            , points: elements2[j].points || elements[i].points || undefined
            , diff: calculateElementDiff(elements[i], elements2[j])
            , _element: elements[i]
            , _element2: elements2[j]
            })
            // console.log(elements[i], elements2[j])
            // console.log(calculateElementDiff(elements[i], elements2[j]))
          }

          // Remove elements
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

    // console.log(pvjson, pvjson2)
    // console.log(diff)
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

  // function isObject(obj) {
  //   return Object.prototype.toString.apply({}) === Object.prototype.toString.apply(obj)
  // }

  function isStringOrNumber(obj) {
    return (Object.prototype.toString.apply(1) === Object.prototype.toString.apply(obj)
         || Object.prototype.toString.apply('') === Object.prototype.toString.apply(obj))
  }

  function getAddTitle(obj, list) {
    if (obj['gpml:element'] === 'gpml:Interaction') {
      return '' + findTitleById(obj.points[0].isAttachedTo, list) + ' - ' + findTitleById(obj.points[1].isAttachedTo, list)
    } else if (obj['gpml:element'] === 'gpml:DataNode') {
      return obj.textContent
    } else if (obj['gpml:element'] === 'gpml:Label') {
      return obj.textContent
    } else if (obj['gpml:element'] === 'gpml:Shape') {
      return obj.shape + ' ' + obj.id
    } else if (obj['gpml:element'] === 'gpml:Group') {
      return 'Group ' + obj.id
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
          return 'Interaction ' + id
        } else {
          return getAddTitle(list[l], list)
        }
      }
    }

    return id;
  }

  /**
   * Expose plugin globally
   */
  window.pathvisiojsDiffviewer = PathvisiojsDiffviewer
})(window)
