var Img = require('./img.js')
  , Fs = require('fs')
  , _ = require('lodash')
  , Async = require('async')
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
      var diagramId = generateDiagramId(pvjs)
        , pvjson = sourceData.pvjson
        , viewport
        ;

      // ***************
      // Start getting diagram data in pvjson format
      // ***************
      Async.waterfall([
        function(vectorRendererCallback) { // TODO some of this could be done in parallel
          // ***************
          // Start crossPlatformShapes
          // ***************
          var crossPlatformShapesInstance1 = Object.create(crossPlatformShapes);
          crossPlatformShapesInstance1.init(
            {
              targetSelector: '#' + pvjs.$element.attr('id') + ' .diagram-container',
              id: diagramId,
              format: rendererEngine,
              width:containerWidth,
              height:containerHeight,
              backgroundColor: 'white',
              customShapes: { // optional
                golgiApparatus:{
                  href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0iZ29sZ2ktYXBwYXJhdHVzIgoJdmVyc2lvbj0iMS4xIgoJYmFzZVByb2ZpbGU9ImZ1bGwiCgl4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCgl4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKCXhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiCgl3aWR0aD0iOTAiCgloZWlnaHQ9IjE1MCIKCXZpZXdCb3g9IjAgMCA5MCAxNTAiCglwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIgoJc3R5bGU9ImZpbGw6dHJhbnNwYXJlbnQ7IHN0cm9rZTpsaWdodGdyYXk7IHN0cm9rZS13aWR0aDozIj4KCgoJLyo8Y2xpcFBhdGggaWQ9ImdvbGdpLWFwcGFyYXR1cy1jbGlwLXBhdGgxIj4KCTxwYXRoIGQ9Im01OC40NjcxNCwyNy43MTMzMjdjLTIyLjIwNTM0NSwtMjkuOTAwNzkgMzcuMzEwMDY2LC0zMC4yNTgzNTYgMjUuNTY3MjQ1LC00LjgyMzQ0NmMtOC44MDc2NTUsMTguNTgxMjM4IC0xNy4wNjY0MjksNTguMTM1MjM1IC0wLjk0MTY3Myw5OS4yMjA0NGMxMy4zMTQ2OSwyNy4wNjY2OTYgLTQxLjc0ODQ2MywyNy43NjA5MjUgLTI3Ljc1NTU1NCwtMS40Njk4NDljMTEuMzQ1ODI1LC0yOS40MjAyNDIgMTAuMjg2ODU4LC04MC4zMzY0MjIgMy4xMjk5ODIsLTkyLjkyNzE0NXoiIC8+CiAgIAk8L2NsaXBQYXRoPiAKCQoJPGNsaXBQYXRoIGlkPSJnb2xnaS1hcHBhcmF0dXMtY2xpcC1wYXRoMiI+CiAgIAk8cGF0aCBkPSJtMzEuMjE0MzcxLDM2LjIxNDM2M2MtMTAuNzkxNzEyLC0yMS40Mjc5MDMgMjkuODk3NTk4LC0xOS44NDgxNjQgMTguNDA3NTAxLDAuNjcwODk1Yy00LjA2NjkzMyw3LjQyMjM4NiAtNS43ODI4MDMsNjEuNTcyODAzIDEuMTYwNzEzLDc1LjAyODgwNWM4LjUyOTQzLDE4LjU5NzQyNyAtMzIuODUyOTg1LDE5LjM1NTQwOCAtMjAuNTAwMTYyLC0yLjI1MDYzM2M2Ljk1Mjc2MSwtMTcuMzU4NjA0IDEwLjQ3Mzc0MiwtNTIuMjkxMTg3IDAuOTMxOTQ4LC03My40NDkwNjZ6IiAvPgoJPC9jbGlwUGF0aD4gCgkKCTxjbGlwUGF0aCBpZD0iZ29sZ2ktYXBwYXJhdHVzLWNsaXAtcGF0aDMiPgogICAJPHBhdGggZD0ibTI5LjgwMzk1OSw1Mi4xNjA5MTJjMS41ODQxNzcsMTEuNDc0NzE2IDIuNzIzNDYxLDE2LjczNzI2NyAtMS40ODI5NzcsMzguMzYxMzY2Yy0zLjczMTk1NiwxMi45ODkwMDYgLTMuNjAwMzk5LDE2LjM0MDY5MSAtMTEuNzMyMzM0LDE5LjQxMjc4MWMtNi42ODMyOTgsMS42NTg1MzEgLTExLjg2NDgzMiwtOS43ODk0MzYgLTQuNzkzMjk5LC0xNi4xMTM3N2M0Ljg1NTcyOCwtNS42MjMyMjIgNi4xNDEwODcsLTEwLjg4MjM2MiA2LjY1ODg4OCwtMjIuOTU0NjU5Yy0wLjIzOTIxMiwtOS41MjE0MjcgMC44MTQ1MDgsLTE1LjgyMzgyNiAtNS4zNjY5MiwtMTkuOTU4NjI2Yy03LjYyNDMxNSwtMi4xOTUxNzEgLTYuMDg4MDQxLC0xNi41MzQ2MTEgNC44MjQwNTksLTEzLjg2MzgwNGM1Ljg0OTM1NCwxLjAyNzA2NSAxMC4yODI0MDgsOC41NjE1MTYgMTEuODkyNTgyLDE1LjExNjcxMXoiIC8+Cgk8L2NsaXBQYXRoPiovIAoJCgk8cGF0aCBkPSJtNTguNDY3MTQsMjcuNzEzMzI3Yy0yMi4yMDUzNDUsLTI5LjkwMDc5IDM3LjMxMDA2NiwtMzAuMjU4MzU2IDI1LjU2NzI0NSwtNC44MjM0NDZjLTguODA3NjU1LDE4LjU4MTIzOCAtMTcuMDY2NDI5LDU4LjEzNTIzNSAtMC45NDE2NzMsOTkuMjIwNDRjMTMuMzE0NjksMjcuMDY2Njk2IC00MS43NDg0NjMsMjcuNzYwOTI1IC0yNy43NTU1NTQsLTEuNDY5ODQ5YzExLjM0NTgyNSwtMjkuNDIwMjQyIDEwLjI4Njg1OCwtODAuMzM2NDIyIDMuMTI5OTgyLC05Mi45MjcxNDV6IiAvPgogICAJPHBhdGggZD0ibTMxLjIxNDM3MSwzNi4yMTQzNjNjLTEwLjc5MTcxMiwtMjEuNDI3OTAzIDI5Ljg5NzU5OCwtMTkuODQ4MTY0IDE4LjQwNzUwMSwwLjY3MDg5NWMtNC4wNjY5MzMsNy40MjIzODYgLTUuNzgyODAzLDYxLjU3MjgwMyAxLjE2MDcxMyw3NS4wMjg4MDVjOC41Mjk0MywxOC41OTc0MjcgLTMyLjg1Mjk4NSwxOS4zNTU0MDggLTIwLjUwMDE2MiwtMi4yNTA2MzNjNi45NTI3NjEsLTE3LjM1ODYwNCAxMC40NzM3NDIsLTUyLjI5MTE4NyAwLjkzMTk0OCwtNzMuNDQ5MDY2eiIgIC8+CiAgIAk8cGF0aCBkPSJtMjkuODAzOTU5LDUyLjE2MDkxMmMxLjU4NDE3NywxMS40NzQ3MTYgMi43MjM0NjEsMTYuNzM3MjY3IC0xLjQ4Mjk3NywzOC4zNjEzNjZjLTMuNzMxOTU2LDEyLjk4OTAwNiAtMy42MDAzOTksMTYuMzQwNjkxIC0xMS43MzIzMzQsMTkuNDEyNzgxYy02LjY4MzI5OCwxLjY1ODUzMSAtMTEuODY0ODMyLC05Ljc4OTQzNiAtNC43OTMyOTksLTE2LjExMzc3YzQuODU1NzI4LC01LjYyMzIyMiA2LjE0MTA4NywtMTAuODgyMzYyIDYuNjU4ODg4LC0yMi45NTQ2NTljLTAuMjM5MjEyLC05LjUyMTQyNyAwLjgxNDUwOCwtMTUuODIzODI2IC01LjM2NjkyLC0xOS45NTg2MjZjLTcuNjI0MzE1LC0yLjE5NTE3MSAtNi4wODgwNDEsLTE2LjUzNDYxMSA0LjgyNDA1OSwtMTMuODYzODA0YzUuODQ5MzU0LDEuMDI3MDY1IDEwLjI4MjQwOCw4LjU2MTUxNiAxMS44OTI1ODIsMTUuMTE2NzExeiIvPgoKPC9zdmc+Cg=='
                },
                sarcoplasmicReticulum:{
                  href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0ic2FyY29wbGFzbWljLXJldGljdWx1bSIKCXZlcnNpb249IjEuMSIKCWJhc2VQcm9maWxlPSJmdWxsIgoJeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgoJeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCgl4bWxuczpldj0iaHR0cDovL3d3dy53My5vcmcvMjAwMS94bWwtZXZlbnRzIgoJd2lkdGg9IjEwMCIKCWhlaWdodD0iMTAwIgoJdmlld0JveD0iMCAwIDgwIDEwMCIKCXByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiCglzdHlsZT0iZmlsbDp0cmFuc3BhcmVudDsgc3Ryb2tlOmxpZ2h0Z3JheTsgc3Ryb2tlLXdpZHRoOjMiPgoKCTxjbGlwUGF0aCBpZD0ic2FyY29wbGFzbWljLXJldGljdWx1bS1jbGlwLXBhdGgiPgoJCTxwYXRoIGQ9Im00Ni42MDE4MiwxLjQwNzI0Yy0zMi4zNzIyNCwxLjM0MTM4IC0zNi4zMjAwNCwyMi43NzAxMSAtMjYuNTAzMTgsMzguMTI3NzdjOS4zMTgyNiwxOC4zNDI1IC0xOC43NjU2LDMwLjE1MDE2IDIuNTY5NTUsNDkuMzc4MDdjMTYuODIxMjYsMTMuMTE1OTQgNDYuMzMxNzUsNi4xMDUwOCA1Mi4xMjYzOCwtOC41NjgyNmM1Ljg5OTE2LC0xNS4yNDg0NyAtMTAuOTUwOTksLTI2LjAyNzIgLTMuMjkzMTYsLTQwLjk2MTM1YzEwLjg1MzQyLC0xOS44ODQzMiAtMC43NzYxNSwtMzguMTMwNDMgLTI0Ljg5OTU5LC0zNy45NzYyNHoiIC8+CQoJPC9jbGlwUGF0aD4KCQoJPHBhdGggZD0ibTQ2LjYwMTgyLDEuNDA3MjRjLTMyLjM3MjI0LDEuMzQxMzggLTM2LjMyMDA0LDIyLjc3MDExIC0yNi41MDMxOCwzOC4xMjc3N2M5LjMxODI2LDE4LjM0MjUgLTE4Ljc2NTYsMzAuMTUwMTYgMi41Njk1NSw0OS4zNzgwN2MxNi44MjEyNiwxMy4xMTU5NCA0Ni4zMzE3NSw2LjEwNTA4IDUyLjEyNjM4LC04LjU2ODI2YzUuODk5MTYsLTE1LjI0ODQ3IC0xMC45NTA5OSwtMjYuMDI3MiAtMy4yOTMxNiwtNDAuOTYxMzVjMTAuODUzNDIsLTE5Ljg4NDMyIC0wLjc3NjE1LC0zOC4xMzA0MyAtMjQuODk5NTksLTM3Ljk3NjI0eiIgc3R5bGU9ImNsaXAtcGF0aDogdXJsKCNzYXJjb3BsYXNtaWMtcmV0aWN1bHVtLWNsaXAtcGF0aCk7ICIgLz4JCgo8L3N2Zz4K'
                },
                endoplasmicReticulum:{
                  href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0iZW5kb3BsYXNtaWMtcmV0aWN1bHVtIgoJdmVyc2lvbj0iMS4xIgoJYmFzZVByb2ZpbGU9ImZ1bGwiCgl4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCgl4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKCXhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiCgl3aWR0aD0iMTAwIgoJaGVpZ2h0PSIxMDAiCgl2aWV3Qm94PSIwIDAgMTAwIDEwMCIKCXByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiCglzdHlsZT0iZmlsbDp0cmFuc3BhcmVudDsgc3Ryb2tlOmxpZ2h0Z3JheTsgc3Ryb2tlLXdpZHRoOjMiPgoKCTxjbGlwUGF0aCBpZD0iZW5kb3BsYXNtaWMtcmV0aWN1bHVtLWNsaXAtcGF0aCI+CgkJPHBhdGggZD0ibTczLjUyNzU2LDU2LjYwOTY3Yy01LjYyNDU3LC0xOC42MDY3NSAyMy41MTQ2MywtMzIuNDMzNTggMjMuNDAxNzMsLTQ1LjA2NjA0Yy0wLjM0NDI2LC00Ljg2MTAyIC0xMC40ODkzNCwtOC44OTc0MyAtMTguMjg5NzQsLTUuMzMzOTVjLTE3LjA0MTE5LDcuODc1NTYgLTE1LjY0OTQ5LDI5LjMwNTAzIC0yMS4yMDUzMyw0Mi4yMzM4N2MtMC4zNTY2MSwzLjYwOTUxIC03LjM2Mjc0LDIuNDY5MjYgLTcuNzQ5NjQsLTAuNDg2OTRjLTUuODUxMiwtMTEuMzg4NzEgMTcuMTM1MzQsLTI0LjQ4NjkyIDUuOTYwNzUsLTI5LjQyNTg2Yy0xOS42MzQ2NywtOC4xNjk3OSAtMjguNzUxODQsMjEuMTUzNDYgLTIyLjA2ODIsMjguODE3ODRjNy40OTU2LDE0LjE3NjAyIC0yLjE3OTQ5LDI0LjQwNjc5IC02Ljc0Njg5LDE1LjQ5NjM3Yy0yLjQ0MjA5LC01LjMwNjEzIDYuMDY2MDUsLTExLjA4NDQ1IC0wLjgwMzUxLC0xNi4xNzY4OWMtNC4zMTk5MSwtMi43OTk5MyAtMTEuNzU1NTUsLTAuNjQ2MTggLTE2LjE1NDY4LDMuMDk0M2MtMTIuODkxMTcsMTAuNzM3OTkgNC43Mjk1Nyw0MC45ODE0NSAyMC45NjQ2NywzNi4xNDYzNWM0LjY5ODMzLC0xLjk1OTg5IC0zLjIzNjAzLC04LjcwMTUxIDMuOTA3MTcsLTkuNTk5NTFjNy4yOTc2NywtMC44MTI1NSA1LjE3NjI4LDYuMTg4ODkgNy42ODc0NSw5LjIyNjkxYzIuMzA3MSw0LjA1MDkgNC44MzIzMiw4LjM1NTM4IDEwLjc2MjYsMTEuNjIzN2M0Ljc4NjQyLDIuNTM3MjQgMTUuMjk0MzcsMi4xMTIyNSAxNi43NzE0OCwtMS45NTc5NWMyLjAzMTgsLTkuMjYyOTEgLTI2LjExMTI5LC0yOC4zNTg0OCAtMTAuNjg5MDMsLTMxLjI4MTVjMTguNTU1MjQsLTIuNzE0NzMgNC43NDg2NiwyMy44NDU3MyAyNC4zMTAwNiwyOS42OTQxOWM5LjUwMTg4LDIuMDI4MjQgMTUuNjM5MDIsLTAuNjIxOTQgMTQuODEyNTUsLTQuMDMyNzJjLTIuNzQ1ODYsLTExLjI2MzI3IC0yNS4xMzU1NywtMjIuNjgwMiAtMjQuOTY0NDEsLTMzLjE0OTY4IiAvPgoJPC9jbGlwUGF0aD4KCQoJPHBhdGggZD0ibTczLjUyNzU2LDU2LjYwOTY3Yy01LjYyNDU3LC0xOC42MDY3NSAyMy41MTQ2MywtMzIuNDMzNTggMjMuNDAxNzMsLTQ1LjA2NjA0Yy0wLjM0NDI2LC00Ljg2MTAyIC0xMC40ODkzNCwtOC44OTc0MyAtMTguMjg5NzQsLTUuMzMzOTVjLTE3LjA0MTE5LDcuODc1NTYgLTE1LjY0OTQ5LDI5LjMwNTAzIC0yMS4yMDUzMyw0Mi4yMzM4N2MtMC4zNTY2MSwzLjYwOTUxIC03LjM2Mjc0LDIuNDY5MjYgLTcuNzQ5NjQsLTAuNDg2OTRjLTUuODUxMiwtMTEuMzg4NzEgMTcuMTM1MzQsLTI0LjQ4NjkyIDUuOTYwNzUsLTI5LjQyNTg2Yy0xOS42MzQ2NywtOC4xNjk3OSAtMjguNzUxODQsMjEuMTUzNDYgLTIyLjA2ODIsMjguODE3ODRjNy40OTU2LDE0LjE3NjAyIC0yLjE3OTQ5LDI0LjQwNjc5IC02Ljc0Njg5LDE1LjQ5NjM3Yy0yLjQ0MjA5LC01LjMwNjEzIDYuMDY2MDUsLTExLjA4NDQ1IC0wLjgwMzUxLC0xNi4xNzY4OWMtNC4zMTk5MSwtMi43OTk5MyAtMTEuNzU1NTUsLTAuNjQ2MTggLTE2LjE1NDY4LDMuMDk0M2MtMTIuODkxMTcsMTAuNzM3OTkgNC43Mjk1Nyw0MC45ODE0NSAyMC45NjQ2NywzNi4xNDYzNWM0LjY5ODMzLC0xLjk1OTg5IC0zLjIzNjAzLC04LjcwMTUxIDMuOTA3MTcsLTkuNTk5NTFjNy4yOTc2NywtMC44MTI1NSA1LjE3NjI4LDYuMTg4ODkgNy42ODc0NSw5LjIyNjkxYzIuMzA3MSw0LjA1MDkgNC44MzIzMiw4LjM1NTM4IDEwLjc2MjYsMTEuNjIzN2M0Ljc4NjQyLDIuNTM3MjQgMTUuMjk0MzcsMi4xMTIyNSAxNi43NzE0OCwtMS45NTc5NWMyLjAzMTgsLTkuMjYyOTEgLTI2LjExMTI5LC0yOC4zNTg0OCAtMTAuNjg5MDMsLTMxLjI4MTVjMTguNTU1MjQsLTIuNzE0NzMgNC43NDg2NiwyMy44NDU3MyAyNC4zMTAwNiwyOS42OTQxOWM5LjUwMTg4LDIuMDI4MjQgMTUuNjM5MDIsLTAuNjIxOTQgMTQuODEyNTUsLTQuMDMyNzJjLTIuNzQ1ODYsLTExLjI2MzI3IC0yNS4xMzU1NywtMjIuNjgwMiAtMjQuOTY0NDEsLTMzLjE0OTY4IiBzdHlsZT0iY2xpcC1wYXRoOiB1cmwoI2VuZG9wbGFzbWljLXJldGljdWx1bS1jbGlwLXBhdGgpOyAiLz4KPC9zdmc+Cg=='
                },
                mitochondria:{
                  href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0ibWl0b2Nob25kcmlhIgoJdmVyc2lvbj0iMS4xIgoJYmFzZVByb2ZpbGU9ImZ1bGwiCgl4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCgl4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKCXhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiCgl3aWR0aD0iMTAwIgoJaGVpZ2h0PSIxMDAiCgl2aWV3Qm94PSIwIDAgMTAwIDEwMCIKCXByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiCglzdHlsZT0iZmlsbDp0cmFuc3BhcmVudDsgc3Ryb2tlOmxpZ2h0Z3JheTsgc3Ryb2tlLXdpZHRoOjMiPgoKICAgICAgICA8Y2xpcFBhdGggaWQ9Im1pdG9jaG9uZHJpYS1vdmFsLWNsaXAtcGF0aCI+CgkJPGVsbGlwc2UgY3g9IjUwIiBjeT0iNTAiIHJ4PSI1MCIgcnk9IjUwIiA+PC9lbGxpcHNlPgogICAgICAgIDwvY2xpcFBhdGg+Cgk8Y2xpcFBhdGggaWQ9Im1pdG9jaG9uZHJpYS1jbGlwLXBhdGgiPgoJCTxwYXRoIGQ9Im0xNC44OTQ4OTksMjYuMzQ3MzU3YzQuMzYzODE3LC0wLjc0MTU3MSAzLjgyNzUxOCwxNy4wMzYxNjkgOC4xODI2MzgsMTYuMTgzODI1YzguMjczNDcsMC4wMzA3NjIgMi45ODIwMDYsLTI4LjE0ODk5MSA5Ljg5OTc1NCwtMjguMzM2Njg3YzYuOTY3OTk1LC0wLjE4NzcwNCAyLjI0NjY1MSwyOS45NDc1MjcgOS4yMDQ5ODMsMjkuNDM5ODFjNy42MzI4MTMsLTAuNTYwMDI0IDAuNTA3MzA5LC0zMi45MzUzNTcgOC4xMzYyNTMsLTMzLjYyMzA4MmM3LjY5ODUyMSwtMC42ODkyNTkgMi45MTkxOTcsMzIuMDM5OTQxIDEwLjYyODM0OSwzMi4yMjQ1NTdjNi41NDY2ODQsMC4xNjAwMTEgMy4wMjY0NTEsLTI3LjY0MjgwOCA5LjU2MDU3LC0yNi45MjEyMzJjNy4xOTIxNzcsMC43OTM4OCAwLjY2NDgxOCwyOS44NDI5MDUgNy43ODE2MjQsMzEuNjY3NjA0YzQuNzQ4NDA1LDEuMjE1NDM5IDQuNDIwODIyLC0xOC4yNTc3NTcgOS4yMDQwMTgsLTE3LjQ0MDgwNGMxMS4xMjg4ODMsNy41NzcyNzggOC42MjgxMDUsMzcuNjk4NjU4IC0yLjE3OTk3Nyw0NC42NDUxMzhjLTMuMTM4NTQyLDAuNjk4NDc5IC0zLjk2NTY5OCwtMTAuNTAyMDI5IC03LjExMjkzOCwtOS45MDUwNzVjLTUuNTkwMDUsMS4wNTg1MDIgLTMuOTgyMTI0LDIyLjI4NDA4OCAtOS42MDMwOTYsMjEuNzk5NDYxYy01LjIzOTI4MSwtMC40NTY5NDcgLTIuMjI2MzY0LC0yMS42MzYzODMgLTcuNDcwNDcsLTIxLjczMDIzMmMtNi45NjEyMzUsLTAuMTE2OTI4IC0zLjM1Nzg5NSwyOC45MjQ0MDggLTEwLjMxNjIzMSwyOC40OTUxNDhjLTYuMTQwODQ2LC0wLjM3NTM5NyAtMS43MzA2NCwtMjQuOTUwMzYzIC03LjgyNTEwNCwtMjYuMTkxOTYzYy01LjY4MTg0NywtMS4xNTY5ODIgLTUuMzc4NDI5LDIyLjE3MDI0MiAtMTEuMDI3NDI2LDIwLjY4MDkzOWMtNi4yNDkwNjksLTEuNjQ0Njg0IC0wLjQ2OTYyNCwtMjYuNjczNTE5IC02Ljc1OTI3NSwtMjcuODY1ODg3Yy0zLjcyODk1NCwtMC43MDYxODggLTIuNjQ3NjY1LDE0LjQwMDY1NCAtNi40MDM2NzcsMTQuNTQ1MjkyYy0xNC4wMTYxOTgsLTUuOTM4NzM2IC0xNS43NDg3NzYsLTM5LjcwNzk4MSAtMy44OTk5OTQsLTQ3LjY2NjgxMXoiPjwvcGF0aD4KCTwvY2xpcFBhdGg+IAoJCgk8ZWxsaXBzZSBjeD0iNTAiIGN5PSI1MCIgcng9IjUwIiByeT0iNTAiIHN0eWxlPSJjbGlwLXBhdGg6IHVybCgjbWl0b2Nob25kcmlhLW92YWwtY2xpcC1wYXRoKTsgIj48L2VsbGlwc2U+Cgk8cGF0aCBkPSJtMTQuODk0ODk5LDI2LjM0NzM1N2M0LjM2MzgxNywtMC43NDE1NzEgMy44Mjc1MTgsMTcuMDM2MTY5IDguMTgyNjM4LDE2LjE4MzgyNWM4LjI3MzQ3LDAuMDMwNzYyIDIuOTgyMDA2LC0yOC4xNDg5OTEgOS44OTk3NTQsLTI4LjMzNjY4N2M2Ljk2Nzk5NSwtMC4xODc3MDQgMi4yNDY2NTEsMjkuOTQ3NTI3IDkuMjA0OTgzLDI5LjQzOTgxYzcuNjMyODEzLC0wLjU2MDAyNCAwLjUwNzMwOSwtMzIuOTM1MzU3IDguMTM2MjUzLC0zMy42MjMwODJjNy42OTg1MjEsLTAuNjg5MjU5IDIuOTE5MTk3LDMyLjAzOTk0MSAxMC42MjgzNDksMzIuMjI0NTU3YzYuNTQ2Njg0LDAuMTYwMDExIDMuMDI2NDUxLC0yNy42NDI4MDggOS41NjA1NywtMjYuOTIxMjMyYzcuMTkyMTc3LDAuNzkzODggMC42NjQ4MTgsMjkuODQyOTA1IDcuNzgxNjI0LDMxLjY2NzYwNGM0Ljc0ODQwNSwxLjIxNTQzOSA0LjQyMDgyMiwtMTguMjU3NzU3IDkuMjA0MDE4LC0xNy40NDA4MDRjMTEuMTI4ODgzLDcuNTc3Mjc4IDguNjI4MTA1LDM3LjY5ODY1OCAtMi4xNzk5NzcsNDQuNjQ1MTM4Yy0zLjEzODU0MiwwLjY5ODQ3OSAtMy45NjU2OTgsLTEwLjUwMjAyOSAtNy4xMTI5MzgsLTkuOTA1MDc1Yy01LjU5MDA1LDEuMDU4NTAyIC0zLjk4MjEyNCwyMi4yODQwODggLTkuNjAzMDk2LDIxLjc5OTQ2MWMtNS4yMzkyODEsLTAuNDU2OTQ3IC0yLjIyNjM2NCwtMjEuNjM2MzgzIC03LjQ3MDQ3LC0yMS43MzAyMzJjLTYuOTYxMjM1LC0wLjExNjkyOCAtMy4zNTc4OTUsMjguOTI0NDA4IC0xMC4zMTYyMzEsMjguNDk1MTQ4Yy02LjE0MDg0NiwtMC4zNzUzOTcgLTEuNzMwNjQsLTI0Ljk1MDM2MyAtNy44MjUxMDQsLTI2LjE5MTk2M2MtNS42ODE4NDcsLTEuMTU2OTgyIC01LjM3ODQyOSwyMi4xNzAyNDIgLTExLjAyNzQyNiwyMC42ODA5MzljLTYuMjQ5MDY5LC0xLjY0NDY4NCAtMC40Njk2MjQsLTI2LjY3MzUxOSAtNi43NTkyNzUsLTI3Ljg2NTg4N2MtMy43Mjg5NTQsLTAuNzA2MTg4IC0yLjY0NzY2NSwxNC40MDA2NTQgLTYuNDAzNjc3LDE0LjU0NTI5MmMtMTQuMDE2MTk4LC01LjkzODczNiAtMTUuNzQ4Nzc2LC0zOS43MDc5ODEgLTMuODk5OTk0LC00Ny42NjY4MTF6IiBzdHlsZT0iY2xpcC1wYXRoOiB1cmwoI21pdG9jaG9uZHJpYS1jbGlwLXBhdGgpOyAiPjwvcGF0aD4KPC9zdmc+Cg=='
                }
              }
            },
            function(thisViewport) {
              viewport = thisViewport;

              var crossPlatformTextInstance1 = Object.create(crossPlatformText);
              crossPlatformTextInstance1.init({
                targetSelector:'#' + diagramId
              });

              // Render all elements one by one
              _.forEach(pvjson.elements, function(dataElement){
                dataElement.containerSelector = '#viewport';
                var shapeName = Strcase.camelCase(dataElement.shape);
                if (dataElement.shape !== 'none') {
                  if (!crossPlatformShapesInstance1.hasOwnProperty(shapeName)) {
                    // if pathvisiojs cannot render the shape name indicated, check for whether the shape name a double-line shape.
                    // If so, check whether pathvisiojs can render a single-line version of the shape.
                    // If yes, render the single-line version. Otherwise, render a rounded rectangle.
                    var re = /double$/gi;
                    shapeName = shapeName.replace(re, '');
                    if (crossPlatformShapesInstance1.hasOwnProperty(shapeName)) {
                      console.warn('Requested path "' + dataElement.shape + '" is not available with linetype of "Double". Using linetype of "Solid" instead');
                    }
                    else {
                      console.warn('Requested path "' + dataElement.shape + '" is not available. Using path "rounded-rectangle" instead');
                      shapeName = 'roundedRectangle';
                    }
                  }
                  crossPlatformShapesInstance1[shapeName](dataElement, function(shapeElement) {
                    var path = d3.select(shapeElement)
                    var typeClassesToAdd = '';
                    if (!!dataElement['@type'] && dataElement['@type'].length > 0) {
                      dataElement['@type'].forEach(function(type) {
                        typeClassesToAdd += 'gpml:' + type + ' ';
                      });
                      path.attr('typeof', typeClassesToAdd);
                    }

                    if (!!dataElement.datasourceReference) {
                      path.classed({'has-xref': true});

                      var notDragged = true;
                      path.on("mousedown", function(d,i) {
                        notDragged = true;
                      })
                      .on("mousemove", function(d,i) {
                        notDragged = false;
                      })
                      .on("mouseup", function(d,i) {
                        if (notDragged) {
                          var dfId = dataElement.datasourceReference.id;
                          var dfDatabase = dataElement.datasourceReference.database;
                          var dfOrganism = dataElement.datasourceReference.organism;
                          XRef.render(pvjs, dfOrganism, dfId, dfDatabase, dataElement.textContent, dataElement.dataNodeType);
                        }
                      });
                    }
                  });
                }

                if (!!dataElement.textContent) {
                  crossPlatformTextInstance1.render(dataElement, function(textArea) {
                    d3.select(textArea).attr('pointer-events', 'none');
                  });
                }
              })

              // End vector async
              vectorRendererCallback(null);
            }
          );
          // ***************
          // End crossPlatformShapes
          // ***************
        },
        function(vectorRendererCallback){
          var elementsWithPublicationXrefs = pvjson.elements.filter(function(element){return !!element.publicationXrefs;});
          if (elementsWithPublicationXrefs.length > 0) {
            elementsWithPublicationXrefs.forEach(function(elementWithPublicationXrefs) {
              PublicationXref.render(pvjs, viewport, elementWithPublicationXrefs);
            });
          }
          vectorRendererCallback(null);
        },
        function(vectorRendererCallback){
          var svgSelection = d3.select('#' + diagramId);
          InfoBox.render(viewport, pvjson);
          vectorRendererCallback(null, svgSelection);
        },
        function(svgSelection, vectorRendererCallback){
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

          // Adjust viewport position
          // TODO replace magic numbers (26 and 60)
          svgPanZoom.zoomBy(0.98)
          svgPanZoom.panBy({x: -26 * svgPanZoom.getZoom(), y: -60 * svgPanZoom.getZoom()})

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

          // callback(null, svgSelection);
          vectorRendererCallback(null);
          pvjs.trigger('rendered.renderer')
        }
      ]);
    } // End if sourceData renderingEngine is svg
  }

  function generateDiagramId(pvjs){
    return 'pvjs-diagram-' + pvjs.instanceId;
  }

  return {
    canRender: canRender
  , needDataConverted: needDataConverted
  , destroyRender: destroyRender
  , render: render
  }
}()
