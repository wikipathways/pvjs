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

    pvjs.on('zoomed.renderer', function(level){
      pvjs2.zoom(level)
      pvjs.panBy({x: 0, y: 0}) // TODO fix this by updating pan after zoom
      pvjs2.pan(pvjs.getPan())
    })

    pvjs.on('panned.renderer', function(point){
      pvjs2.pan(point)
    })

    pvjs2.render()
  }

  function displayChanges(pvjs, pvjs2, $paneCenter){
    var diff = calculateDiff(pvjs.getSourceData().pvjson, pvjs2.getSourceData().pvjson)
    // Append changes container
    $paneCenter.append($('#changes').clone().attr('id', 'changes-clone'))

    // Add changes to container
    var $containerAdded = $paneCenter.find('[data-type=added]').children('.changes-list').first()
      , $containerUpdated = $paneCenter.find('[data-type=updated]').children('.changes-list').first()
      , $containerRemoved = $paneCenter.find('[data-type=removed]').children('.changes-list').first()

    parseAndRenderChanges(diff.added, $containerAdded, 'added')
    parseAndRenderChanges(diff.removed, $containerRemoved, 'removed')
    parseAndRenderChanges(diff.updated, $containerUpdated, 'updated')

    // Events
    var hi = pathvisiojsHighlighter(pvjs)
      , hi2 = pathvisiojsHighlighter(pvjs2)
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
          , colors = {}

        if (type === 'added') {
          colors.fill = colors.stroke = '#c2ce7f'
        } else if (type === 'updated') {
          colors.fill = colors.stroke = '#fef090'
        } else if (type === 'removed') {
          colors.fill = colors.stroke = '#f9cd96'
        }

        hi.attenuate(null)
        hi2.attenuate(null)
        if (type === 'removed' || type === 'updated') {
          hi.highlight('#' + this.pvjsonElement.id, null, colors)
        }
        if (type === 'updated' || type === 'added') {
          hi2.highlight('#' + this.pvjsonElement.id, null, colors)
        }

        console.log(this.pvjsonElement)
      }
    })
  }

  function parseAndRenderChanges(list, $containerParent, type) {
    if (list.length === 0) return;

    // Sort by nodeType and shape
    listSorted = list.sort(function(a, b){
      if (a.nodeType === b.nodeType) {
        return a.shape > b.shape ? 1 : -1
      }
      if (a.nodeType === undefined) return -1
      if (b.nodeType === undefined) return 1
      return a.nodeType > b.nodeType ? 1 : -1
    })

    // Group only visible elements
    var addedGroups = {}
      , groupName = ''
    for (d in listSorted) {
      if (listSorted[d].nodeType === undefined){
        if (listSorted[d].shape !== 'none') {
          groupName = 'Interactions'
        } else {
          continue;
        }
      } else if (listSorted[d].nodeType === 'DataNode') {
        groupName = listSorted[d].nodeType + 's'
      } else if (listSorted[d].nodeType !== 'GroupNode') {
        groupName = 'Graphycal Objects'
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

      for (e in addedGroups[g]) {
        title = getAddTitle(addedGroups[g][e])

        $elementContainer = $('<div class="changes-container" data-level="3"/>').appendTo($containerList)
        $elementTitle = $('<div class="changes-title change-' + type + '"><span>' + title + '</span></div>').appendTo($elementContainer)
        $elementTitle[0].pvjsonElement = addedGroups[g][e]
      }
    }
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
            , gpmlType: elements2[j].gpmlType || elements[i].gpmlType || undefined
            , nodeType: elements2[j].nodeType || elements[i].nodeType || undefined
            , shape: elements2[j].shape || elements[i].shape || undefined
            , textContent: elements2[j].textContent || elements[i].textContent || undefined
            , points: elements2[j].points || elements[i].points || undefined
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

    console.log(pvjson, pvjson2)
    console.log(diff)
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

  function getAddTitle(obj) {
    if (obj.gpmlType === 'Interaction') {
      return 'from ' + obj.points[0].isAttachedTo + ' to ' + obj.points[1].isAttachedTo
    } else if (obj.gpmlType === 'DataNode') {
      return obj.textContent
    } else if (obj.nodeType === 'Label') {
      return obj.textContent
    } else if (obj.nodeType === 'Shape') {
      return obj.shape + ' ' + obj.id
    }

    return 'no title'
  }

  /**
   * Expose plugin globally
   */
  window.pathvisiojsDiffviewer = PathvisiojsDiffviewer
})(window)
