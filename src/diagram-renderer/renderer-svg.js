var _ = require('lodash');
var Fs = require('fs');
var RendererPrototype = require('./renderer-prototype');
var EntityReference = require('../annotation-panel/entity-reference.js');
var Strcase = require('tower-strcase');
var crossPlatformText =
//TODO use the following
    //require('cross-platform-text');
    require('../../../cross-platform-text/cross-platform-text.js');

// crossPlatformShapes is added to root (window in browser), but it doesn't return anything
require('cross-platform-shapes');

var RendererSvg = Object.create(RendererPrototype)

RendererSvg.init = function(pvjs) {
  this.pvjs = pvjs
  this.diagramId = 'pvjs-diagram-' + pvjs.instanceId

  /**
   * As keys serve elements ids.
   * As values serve objects composed from data element and rendered element
   *
   * @type {Object} contains all rendered data elements
   */
  this._elementsHash = {}

  console.log('pvjs');
  console.log(pvjs);
  var containerBoundingClientRect = pvjs.$element[0][0].getBoundingClientRect();
  // TODO pvjs.$element is a d3 selection with the overall pathvisiojs-container.
  // We should instead be working with the diagram container in here, but it isn't
  // full size when created, so the following code doesn't work:
  /*
  var containerBoundingClientRect = pvjs.$element
    .select('.diagram-container')[0][0].getBoundingClientRect()
  //*/
  var containerWidth = containerBoundingClientRect.width;
  // TODO this is kludgy to have the 200 specified here.
  // We need to make the diagram container leave room for
  // the bottom toolbar, but there's a better way to do it.
  var containerHeight = containerBoundingClientRect.height - 200;

  this.crossPlatformShapesInstance = crossPlatformShapes.getInstance({
      targetSelector: '#' + pvjs.$element.attr('id') + ' .diagram-container'
    , id: this.diagramId
    , format: 'svg'
    , width: containerWidth
    , height: containerHeight
    , backgroundColor: 'white'
    , customShapes: { // optional
        golgiApparatus: {
          href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0iZ29sZ2ktYXBwYXJhdHVzIgoJdmVyc2lvbj0iMS4xIgoJYmFzZVByb2ZpbGU9ImZ1bGwiCgl4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCgl4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKCXhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiCgl3aWR0aD0iOTAiCgloZWlnaHQ9IjE1MCIKCXZpZXdCb3g9IjAgMCA5MCAxNTAiCglwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIgoJc3R5bGU9ImZpbGw6dHJhbnNwYXJlbnQ7IHN0cm9rZTpsaWdodGdyYXk7IHN0cm9rZS13aWR0aDozIj4KCgoJLyo8Y2xpcFBhdGggaWQ9ImdvbGdpLWFwcGFyYXR1cy1jbGlwLXBhdGgxIj4KCTxwYXRoIGQ9Im01OC40NjcxNCwyNy43MTMzMjdjLTIyLjIwNTM0NSwtMjkuOTAwNzkgMzcuMzEwMDY2LC0zMC4yNTgzNTYgMjUuNTY3MjQ1LC00LjgyMzQ0NmMtOC44MDc2NTUsMTguNTgxMjM4IC0xNy4wNjY0MjksNTguMTM1MjM1IC0wLjk0MTY3Myw5OS4yMjA0NGMxMy4zMTQ2OSwyNy4wNjY2OTYgLTQxLjc0ODQ2MywyNy43NjA5MjUgLTI3Ljc1NTU1NCwtMS40Njk4NDljMTEuMzQ1ODI1LC0yOS40MjAyNDIgMTAuMjg2ODU4LC04MC4zMzY0MjIgMy4xMjk5ODIsLTkyLjkyNzE0NXoiIC8+CiAgIAk8L2NsaXBQYXRoPiAKCQoJPGNsaXBQYXRoIGlkPSJnb2xnaS1hcHBhcmF0dXMtY2xpcC1wYXRoMiI+CiAgIAk8cGF0aCBkPSJtMzEuMjE0MzcxLDM2LjIxNDM2M2MtMTAuNzkxNzEyLC0yMS40Mjc5MDMgMjkuODk3NTk4LC0xOS44NDgxNjQgMTguNDA3NTAxLDAuNjcwODk1Yy00LjA2NjkzMyw3LjQyMjM4NiAtNS43ODI4MDMsNjEuNTcyODAzIDEuMTYwNzEzLDc1LjAyODgwNWM4LjUyOTQzLDE4LjU5NzQyNyAtMzIuODUyOTg1LDE5LjM1NTQwOCAtMjAuNTAwMTYyLC0yLjI1MDYzM2M2Ljk1Mjc2MSwtMTcuMzU4NjA0IDEwLjQ3Mzc0MiwtNTIuMjkxMTg3IDAuOTMxOTQ4LC03My40NDkwNjZ6IiAvPgoJPC9jbGlwUGF0aD4gCgkKCTxjbGlwUGF0aCBpZD0iZ29sZ2ktYXBwYXJhdHVzLWNsaXAtcGF0aDMiPgogICAJPHBhdGggZD0ibTI5LjgwMzk1OSw1Mi4xNjA5MTJjMS41ODQxNzcsMTEuNDc0NzE2IDIuNzIzNDYxLDE2LjczNzI2NyAtMS40ODI5NzcsMzguMzYxMzY2Yy0zLjczMTk1NiwxMi45ODkwMDYgLTMuNjAwMzk5LDE2LjM0MDY5MSAtMTEuNzMyMzM0LDE5LjQxMjc4MWMtNi42ODMyOTgsMS42NTg1MzEgLTExLjg2NDgzMiwtOS43ODk0MzYgLTQuNzkzMjk5LC0xNi4xMTM3N2M0Ljg1NTcyOCwtNS42MjMyMjIgNi4xNDEwODcsLTEwLjg4MjM2MiA2LjY1ODg4OCwtMjIuOTU0NjU5Yy0wLjIzOTIxMiwtOS41MjE0MjcgMC44MTQ1MDgsLTE1LjgyMzgyNiAtNS4zNjY5MiwtMTkuOTU4NjI2Yy03LjYyNDMxNSwtMi4xOTUxNzEgLTYuMDg4MDQxLC0xNi41MzQ2MTEgNC44MjQwNTksLTEzLjg2MzgwNGM1Ljg0OTM1NCwxLjAyNzA2NSAxMC4yODI0MDgsOC41NjE1MTYgMTEuODkyNTgyLDE1LjExNjcxMXoiIC8+Cgk8L2NsaXBQYXRoPiovIAoJCgk8cGF0aCBkPSJtNTguNDY3MTQsMjcuNzEzMzI3Yy0yMi4yMDUzNDUsLTI5LjkwMDc5IDM3LjMxMDA2NiwtMzAuMjU4MzU2IDI1LjU2NzI0NSwtNC44MjM0NDZjLTguODA3NjU1LDE4LjU4MTIzOCAtMTcuMDY2NDI5LDU4LjEzNTIzNSAtMC45NDE2NzMsOTkuMjIwNDRjMTMuMzE0NjksMjcuMDY2Njk2IC00MS43NDg0NjMsMjcuNzYwOTI1IC0yNy43NTU1NTQsLTEuNDY5ODQ5YzExLjM0NTgyNSwtMjkuNDIwMjQyIDEwLjI4Njg1OCwtODAuMzM2NDIyIDMuMTI5OTgyLC05Mi45MjcxNDV6IiAvPgogICAJPHBhdGggZD0ibTMxLjIxNDM3MSwzNi4yMTQzNjNjLTEwLjc5MTcxMiwtMjEuNDI3OTAzIDI5Ljg5NzU5OCwtMTkuODQ4MTY0IDE4LjQwNzUwMSwwLjY3MDg5NWMtNC4wNjY5MzMsNy40MjIzODYgLTUuNzgyODAzLDYxLjU3MjgwMyAxLjE2MDcxMyw3NS4wMjg4MDVjOC41Mjk0MywxOC41OTc0MjcgLTMyLjg1Mjk4NSwxOS4zNTU0MDggLTIwLjUwMDE2MiwtMi4yNTA2MzNjNi45NTI3NjEsLTE3LjM1ODYwNCAxMC40NzM3NDIsLTUyLjI5MTE4NyAwLjkzMTk0OCwtNzMuNDQ5MDY2eiIgIC8+CiAgIAk8cGF0aCBkPSJtMjkuODAzOTU5LDUyLjE2MDkxMmMxLjU4NDE3NywxMS40NzQ3MTYgMi43MjM0NjEsMTYuNzM3MjY3IC0xLjQ4Mjk3NywzOC4zNjEzNjZjLTMuNzMxOTU2LDEyLjk4OTAwNiAtMy42MDAzOTksMTYuMzQwNjkxIC0xMS43MzIzMzQsMTkuNDEyNzgxYy02LjY4MzI5OCwxLjY1ODUzMSAtMTEuODY0ODMyLC05Ljc4OTQzNiAtNC43OTMyOTksLTE2LjExMzc3YzQuODU1NzI4LC01LjYyMzIyMiA2LjE0MTA4NywtMTAuODgyMzYyIDYuNjU4ODg4LC0yMi45NTQ2NTljLTAuMjM5MjEyLC05LjUyMTQyNyAwLjgxNDUwOCwtMTUuODIzODI2IC01LjM2NjkyLC0xOS45NTg2MjZjLTcuNjI0MzE1LC0yLjE5NTE3MSAtNi4wODgwNDEsLTE2LjUzNDYxMSA0LjgyNDA1OSwtMTMuODYzODA0YzUuODQ5MzU0LDEuMDI3MDY1IDEwLjI4MjQwOCw4LjU2MTUxNiAxMS44OTI1ODIsMTUuMTE2NzExeiIvPgoKPC9zdmc+Cg=='
        }
      , sarcoplasmicReticulum: {
          href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0ic2FyY29wbGFzbWljLXJldGljdWx1bSIKCXZlcnNpb249IjEuMSIKCWJhc2VQcm9maWxlPSJmdWxsIgoJeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgoJeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiCgl4bWxuczpldj0iaHR0cDovL3d3dy53My5vcmcvMjAwMS94bWwtZXZlbnRzIgoJd2lkdGg9IjEwMCIKCWhlaWdodD0iMTAwIgoJdmlld0JveD0iMCAwIDgwIDEwMCIKCXByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiCglzdHlsZT0iZmlsbDp0cmFuc3BhcmVudDsgc3Ryb2tlOmxpZ2h0Z3JheTsgc3Ryb2tlLXdpZHRoOjMiPgoKCTxjbGlwUGF0aCBpZD0ic2FyY29wbGFzbWljLXJldGljdWx1bS1jbGlwLXBhdGgiPgoJCTxwYXRoIGQ9Im00Ni42MDE4MiwxLjQwNzI0Yy0zMi4zNzIyNCwxLjM0MTM4IC0zNi4zMjAwNCwyMi43NzAxMSAtMjYuNTAzMTgsMzguMTI3NzdjOS4zMTgyNiwxOC4zNDI1IC0xOC43NjU2LDMwLjE1MDE2IDIuNTY5NTUsNDkuMzc4MDdjMTYuODIxMjYsMTMuMTE1OTQgNDYuMzMxNzUsNi4xMDUwOCA1Mi4xMjYzOCwtOC41NjgyNmM1Ljg5OTE2LC0xNS4yNDg0NyAtMTAuOTUwOTksLTI2LjAyNzIgLTMuMjkzMTYsLTQwLjk2MTM1YzEwLjg1MzQyLC0xOS44ODQzMiAtMC43NzYxNSwtMzguMTMwNDMgLTI0Ljg5OTU5LC0zNy45NzYyNHoiIC8+CQoJPC9jbGlwUGF0aD4KCQoJPHBhdGggZD0ibTQ2LjYwMTgyLDEuNDA3MjRjLTMyLjM3MjI0LDEuMzQxMzggLTM2LjMyMDA0LDIyLjc3MDExIC0yNi41MDMxOCwzOC4xMjc3N2M5LjMxODI2LDE4LjM0MjUgLTE4Ljc2NTYsMzAuMTUwMTYgMi41Njk1NSw0OS4zNzgwN2MxNi44MjEyNiwxMy4xMTU5NCA0Ni4zMzE3NSw2LjEwNTA4IDUyLjEyNjM4LC04LjU2ODI2YzUuODk5MTYsLTE1LjI0ODQ3IC0xMC45NTA5OSwtMjYuMDI3MiAtMy4yOTMxNiwtNDAuOTYxMzVjMTAuODUzNDIsLTE5Ljg4NDMyIC0wLjc3NjE1LC0zOC4xMzA0MyAtMjQuODk5NTksLTM3Ljk3NjI0eiIgc3R5bGU9ImNsaXAtcGF0aDogdXJsKCNzYXJjb3BsYXNtaWMtcmV0aWN1bHVtLWNsaXAtcGF0aCk7ICIgLz4JCgo8L3N2Zz4K'
        }
      , endoplasmicReticulum: {
          href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0iZW5kb3BsYXNtaWMtcmV0aWN1bHVtIgoJdmVyc2lvbj0iMS4xIgoJYmFzZVByb2ZpbGU9ImZ1bGwiCgl4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCgl4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKCXhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiCgl3aWR0aD0iMTAwIgoJaGVpZ2h0PSIxMDAiCgl2aWV3Qm94PSIwIDAgMTAwIDEwMCIKCXByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiCglzdHlsZT0iZmlsbDp0cmFuc3BhcmVudDsgc3Ryb2tlOmxpZ2h0Z3JheTsgc3Ryb2tlLXdpZHRoOjMiPgoKCTxjbGlwUGF0aCBpZD0iZW5kb3BsYXNtaWMtcmV0aWN1bHVtLWNsaXAtcGF0aCI+CgkJPHBhdGggZD0ibTczLjUyNzU2LDU2LjYwOTY3Yy01LjYyNDU3LC0xOC42MDY3NSAyMy41MTQ2MywtMzIuNDMzNTggMjMuNDAxNzMsLTQ1LjA2NjA0Yy0wLjM0NDI2LC00Ljg2MTAyIC0xMC40ODkzNCwtOC44OTc0MyAtMTguMjg5NzQsLTUuMzMzOTVjLTE3LjA0MTE5LDcuODc1NTYgLTE1LjY0OTQ5LDI5LjMwNTAzIC0yMS4yMDUzMyw0Mi4yMzM4N2MtMC4zNTY2MSwzLjYwOTUxIC03LjM2Mjc0LDIuNDY5MjYgLTcuNzQ5NjQsLTAuNDg2OTRjLTUuODUxMiwtMTEuMzg4NzEgMTcuMTM1MzQsLTI0LjQ4NjkyIDUuOTYwNzUsLTI5LjQyNTg2Yy0xOS42MzQ2NywtOC4xNjk3OSAtMjguNzUxODQsMjEuMTUzNDYgLTIyLjA2ODIsMjguODE3ODRjNy40OTU2LDE0LjE3NjAyIC0yLjE3OTQ5LDI0LjQwNjc5IC02Ljc0Njg5LDE1LjQ5NjM3Yy0yLjQ0MjA5LC01LjMwNjEzIDYuMDY2MDUsLTExLjA4NDQ1IC0wLjgwMzUxLC0xNi4xNzY4OWMtNC4zMTk5MSwtMi43OTk5MyAtMTEuNzU1NTUsLTAuNjQ2MTggLTE2LjE1NDY4LDMuMDk0M2MtMTIuODkxMTcsMTAuNzM3OTkgNC43Mjk1Nyw0MC45ODE0NSAyMC45NjQ2NywzNi4xNDYzNWM0LjY5ODMzLC0xLjk1OTg5IC0zLjIzNjAzLC04LjcwMTUxIDMuOTA3MTcsLTkuNTk5NTFjNy4yOTc2NywtMC44MTI1NSA1LjE3NjI4LDYuMTg4ODkgNy42ODc0NSw5LjIyNjkxYzIuMzA3MSw0LjA1MDkgNC44MzIzMiw4LjM1NTM4IDEwLjc2MjYsMTEuNjIzN2M0Ljc4NjQyLDIuNTM3MjQgMTUuMjk0MzcsMi4xMTIyNSAxNi43NzE0OCwtMS45NTc5NWMyLjAzMTgsLTkuMjYyOTEgLTI2LjExMTI5LC0yOC4zNTg0OCAtMTAuNjg5MDMsLTMxLjI4MTVjMTguNTU1MjQsLTIuNzE0NzMgNC43NDg2NiwyMy44NDU3MyAyNC4zMTAwNiwyOS42OTQxOWM5LjUwMTg4LDIuMDI4MjQgMTUuNjM5MDIsLTAuNjIxOTQgMTQuODEyNTUsLTQuMDMyNzJjLTIuNzQ1ODYsLTExLjI2MzI3IC0yNS4xMzU1NywtMjIuNjgwMiAtMjQuOTY0NDEsLTMzLjE0OTY4IiAvPgoJPC9jbGlwUGF0aD4KCQoJPHBhdGggZD0ibTczLjUyNzU2LDU2LjYwOTY3Yy01LjYyNDU3LC0xOC42MDY3NSAyMy41MTQ2MywtMzIuNDMzNTggMjMuNDAxNzMsLTQ1LjA2NjA0Yy0wLjM0NDI2LC00Ljg2MTAyIC0xMC40ODkzNCwtOC44OTc0MyAtMTguMjg5NzQsLTUuMzMzOTVjLTE3LjA0MTE5LDcuODc1NTYgLTE1LjY0OTQ5LDI5LjMwNTAzIC0yMS4yMDUzMyw0Mi4yMzM4N2MtMC4zNTY2MSwzLjYwOTUxIC03LjM2Mjc0LDIuNDY5MjYgLTcuNzQ5NjQsLTAuNDg2OTRjLTUuODUxMiwtMTEuMzg4NzEgMTcuMTM1MzQsLTI0LjQ4NjkyIDUuOTYwNzUsLTI5LjQyNTg2Yy0xOS42MzQ2NywtOC4xNjk3OSAtMjguNzUxODQsMjEuMTUzNDYgLTIyLjA2ODIsMjguODE3ODRjNy40OTU2LDE0LjE3NjAyIC0yLjE3OTQ5LDI0LjQwNjc5IC02Ljc0Njg5LDE1LjQ5NjM3Yy0yLjQ0MjA5LC01LjMwNjEzIDYuMDY2MDUsLTExLjA4NDQ1IC0wLjgwMzUxLC0xNi4xNzY4OWMtNC4zMTk5MSwtMi43OTk5MyAtMTEuNzU1NTUsLTAuNjQ2MTggLTE2LjE1NDY4LDMuMDk0M2MtMTIuODkxMTcsMTAuNzM3OTkgNC43Mjk1Nyw0MC45ODE0NSAyMC45NjQ2NywzNi4xNDYzNWM0LjY5ODMzLC0xLjk1OTg5IC0zLjIzNjAzLC04LjcwMTUxIDMuOTA3MTcsLTkuNTk5NTFjNy4yOTc2NywtMC44MTI1NSA1LjE3NjI4LDYuMTg4ODkgNy42ODc0NSw5LjIyNjkxYzIuMzA3MSw0LjA1MDkgNC44MzIzMiw4LjM1NTM4IDEwLjc2MjYsMTEuNjIzN2M0Ljc4NjQyLDIuNTM3MjQgMTUuMjk0MzcsMi4xMTIyNSAxNi43NzE0OCwtMS45NTc5NWMyLjAzMTgsLTkuMjYyOTEgLTI2LjExMTI5LC0yOC4zNTg0OCAtMTAuNjg5MDMsLTMxLjI4MTVjMTguNTU1MjQsLTIuNzE0NzMgNC43NDg2NiwyMy44NDU3MyAyNC4zMTAwNiwyOS42OTQxOWM5LjUwMTg4LDIuMDI4MjQgMTUuNjM5MDIsLTAuNjIxOTQgMTQuODEyNTUsLTQuMDMyNzJjLTIuNzQ1ODYsLTExLjI2MzI3IC0yNS4xMzU1NywtMjIuNjgwMiAtMjQuOTY0NDEsLTMzLjE0OTY4IiBzdHlsZT0iY2xpcC1wYXRoOiB1cmwoI2VuZG9wbGFzbWljLXJldGljdWx1bS1jbGlwLXBhdGgpOyAiLz4KPC9zdmc+Cg=='
        }
      , mitochondria: {
          href: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PgoKPHN2ZyBpZD0ibWl0b2Nob25kcmlhIgoJdmVyc2lvbj0iMS4xIgoJYmFzZVByb2ZpbGU9ImZ1bGwiCgl4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCgl4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKCXhtbG5zOmV2PSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL3htbC1ldmVudHMiCgl3aWR0aD0iMTAwIgoJaGVpZ2h0PSIxMDAiCgl2aWV3Qm94PSIwIDAgMTAwIDEwMCIKCXByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiCglzdHlsZT0iZmlsbDp0cmFuc3BhcmVudDsgc3Ryb2tlOmxpZ2h0Z3JheTsgc3Ryb2tlLXdpZHRoOjMiPgoKICAgICAgICA8Y2xpcFBhdGggaWQ9Im1pdG9jaG9uZHJpYS1vdmFsLWNsaXAtcGF0aCI+CgkJPGVsbGlwc2UgY3g9IjUwIiBjeT0iNTAiIHJ4PSI1MCIgcnk9IjUwIiA+PC9lbGxpcHNlPgogICAgICAgIDwvY2xpcFBhdGg+Cgk8Y2xpcFBhdGggaWQ9Im1pdG9jaG9uZHJpYS1jbGlwLXBhdGgiPgoJCTxwYXRoIGQ9Im0xNC44OTQ4OTksMjYuMzQ3MzU3YzQuMzYzODE3LC0wLjc0MTU3MSAzLjgyNzUxOCwxNy4wMzYxNjkgOC4xODI2MzgsMTYuMTgzODI1YzguMjczNDcsMC4wMzA3NjIgMi45ODIwMDYsLTI4LjE0ODk5MSA5Ljg5OTc1NCwtMjguMzM2Njg3YzYuOTY3OTk1LC0wLjE4NzcwNCAyLjI0NjY1MSwyOS45NDc1MjcgOS4yMDQ5ODMsMjkuNDM5ODFjNy42MzI4MTMsLTAuNTYwMDI0IDAuNTA3MzA5LC0zMi45MzUzNTcgOC4xMzYyNTMsLTMzLjYyMzA4MmM3LjY5ODUyMSwtMC42ODkyNTkgMi45MTkxOTcsMzIuMDM5OTQxIDEwLjYyODM0OSwzMi4yMjQ1NTdjNi41NDY2ODQsMC4xNjAwMTEgMy4wMjY0NTEsLTI3LjY0MjgwOCA5LjU2MDU3LC0yNi45MjEyMzJjNy4xOTIxNzcsMC43OTM4OCAwLjY2NDgxOCwyOS44NDI5MDUgNy43ODE2MjQsMzEuNjY3NjA0YzQuNzQ4NDA1LDEuMjE1NDM5IDQuNDIwODIyLC0xOC4yNTc3NTcgOS4yMDQwMTgsLTE3LjQ0MDgwNGMxMS4xMjg4ODMsNy41NzcyNzggOC42MjgxMDUsMzcuNjk4NjU4IC0yLjE3OTk3Nyw0NC42NDUxMzhjLTMuMTM4NTQyLDAuNjk4NDc5IC0zLjk2NTY5OCwtMTAuNTAyMDI5IC03LjExMjkzOCwtOS45MDUwNzVjLTUuNTkwMDUsMS4wNTg1MDIgLTMuOTgyMTI0LDIyLjI4NDA4OCAtOS42MDMwOTYsMjEuNzk5NDYxYy01LjIzOTI4MSwtMC40NTY5NDcgLTIuMjI2MzY0LC0yMS42MzYzODMgLTcuNDcwNDcsLTIxLjczMDIzMmMtNi45NjEyMzUsLTAuMTE2OTI4IC0zLjM1Nzg5NSwyOC45MjQ0MDggLTEwLjMxNjIzMSwyOC40OTUxNDhjLTYuMTQwODQ2LC0wLjM3NTM5NyAtMS43MzA2NCwtMjQuOTUwMzYzIC03LjgyNTEwNCwtMjYuMTkxOTYzYy01LjY4MTg0NywtMS4xNTY5ODIgLTUuMzc4NDI5LDIyLjE3MDI0MiAtMTEuMDI3NDI2LDIwLjY4MDkzOWMtNi4yNDkwNjksLTEuNjQ0Njg0IC0wLjQ2OTYyNCwtMjYuNjczNTE5IC02Ljc1OTI3NSwtMjcuODY1ODg3Yy0zLjcyODk1NCwtMC43MDYxODggLTIuNjQ3NjY1LDE0LjQwMDY1NCAtNi40MDM2NzcsMTQuNTQ1MjkyYy0xNC4wMTYxOTgsLTUuOTM4NzM2IC0xNS43NDg3NzYsLTM5LjcwNzk4MSAtMy44OTk5OTQsLTQ3LjY2NjgxMXoiPjwvcGF0aD4KCTwvY2xpcFBhdGg+IAoJCgk8ZWxsaXBzZSBjeD0iNTAiIGN5PSI1MCIgcng9IjUwIiByeT0iNTAiIHN0eWxlPSJjbGlwLXBhdGg6IHVybCgjbWl0b2Nob25kcmlhLW92YWwtY2xpcC1wYXRoKTsgIj48L2VsbGlwc2U+Cgk8cGF0aCBkPSJtMTQuODk0ODk5LDI2LjM0NzM1N2M0LjM2MzgxNywtMC43NDE1NzEgMy44Mjc1MTgsMTcuMDM2MTY5IDguMTgyNjM4LDE2LjE4MzgyNWM4LjI3MzQ3LDAuMDMwNzYyIDIuOTgyMDA2LC0yOC4xNDg5OTEgOS44OTk3NTQsLTI4LjMzNjY4N2M2Ljk2Nzk5NSwtMC4xODc3MDQgMi4yNDY2NTEsMjkuOTQ3NTI3IDkuMjA0OTgzLDI5LjQzOTgxYzcuNjMyODEzLC0wLjU2MDAyNCAwLjUwNzMwOSwtMzIuOTM1MzU3IDguMTM2MjUzLC0zMy42MjMwODJjNy42OTg1MjEsLTAuNjg5MjU5IDIuOTE5MTk3LDMyLjAzOTk0MSAxMC42MjgzNDksMzIuMjI0NTU3YzYuNTQ2Njg0LDAuMTYwMDExIDMuMDI2NDUxLC0yNy42NDI4MDggOS41NjA1NywtMjYuOTIxMjMyYzcuMTkyMTc3LDAuNzkzODggMC42NjQ4MTgsMjkuODQyOTA1IDcuNzgxNjI0LDMxLjY2NzYwNGM0Ljc0ODQwNSwxLjIxNTQzOSA0LjQyMDgyMiwtMTguMjU3NzU3IDkuMjA0MDE4LC0xNy40NDA4MDRjMTEuMTI4ODgzLDcuNTc3Mjc4IDguNjI4MTA1LDM3LjY5ODY1OCAtMi4xNzk5NzcsNDQuNjQ1MTM4Yy0zLjEzODU0MiwwLjY5ODQ3OSAtMy45NjU2OTgsLTEwLjUwMjAyOSAtNy4xMTI5MzgsLTkuOTA1MDc1Yy01LjU5MDA1LDEuMDU4NTAyIC0zLjk4MjEyNCwyMi4yODQwODggLTkuNjAzMDk2LDIxLjc5OTQ2MWMtNS4yMzkyODEsLTAuNDU2OTQ3IC0yLjIyNjM2NCwtMjEuNjM2MzgzIC03LjQ3MDQ3LC0yMS43MzAyMzJjLTYuOTYxMjM1LC0wLjExNjkyOCAtMy4zNTc4OTUsMjguOTI0NDA4IC0xMC4zMTYyMzEsMjguNDk1MTQ4Yy02LjE0MDg0NiwtMC4zNzUzOTcgLTEuNzMwNjQsLTI0Ljk1MDM2MyAtNy44MjUxMDQsLTI2LjE5MTk2M2MtNS42ODE4NDcsLTEuMTU2OTgyIC01LjM3ODQyOSwyMi4xNzAyNDIgLTExLjAyNzQyNiwyMC42ODA5MzljLTYuMjQ5MDY5LC0xLjY0NDY4NCAtMC40Njk2MjQsLTI2LjY3MzUxOSAtNi43NTkyNzUsLTI3Ljg2NTg4N2MtMy43Mjg5NTQsLTAuNzA2MTg4IC0yLjY0NzY2NSwxNC40MDA2NTQgLTYuNDAzNjc3LDE0LjU0NTI5MmMtMTQuMDE2MTk4LC01LjkzODczNiAtMTUuNzQ4Nzc2LC0zOS43MDc5ODEgLTMuODk5OTk0LC00Ny42NjY4MTF6IiBzdHlsZT0iY2xpcC1wYXRoOiB1cmwoI21pdG9jaG9uZHJpYS1jbGlwLXBhdGgpOyAiPjwvcGF0aD4KPC9zdmc+Cg=='
        }
      }
  })

  this.crossPlatformTextInstance = crossPlatformText.getInstance({
    targetSelector: '#' + this.diagramId
  })

  this.$svg = this.pvjs.$element.select('#' + this.diagramId)

  initStyles(this)
}

function initStyles(renderer) {
  var cssData
    , $defs = renderer.$svg.select('defs')

  if (renderer.pvjs.options.cssUri) {
    d3.text(renderer.pvjs.options.cssUri, 'text/css', function(cssData) {
    $defs.append('style').attr('type', "text/css").text(cssData)
    });
  }
  else {
    cssData = Fs.readFileSync(__dirname + '/diagram.css').toString()
    $defs.append('style').attr('type', "text/css").text(cssData)
  }
}

function normalizeShapeStyles(pvjsonElement) {
  // Do not need normalization:
  // backgroundColor
  // borderWidth

  //  backgroundOpacity
  if (pvjsonElement.hasOwnProperty('backgroundOpacity') && !pvjsonElement.hasOwnProperty('fillOpacity')) {
    pvjsonElement.fillOpacity = pvjsonElement.backgroundOpacity
  }

  // borderColor
  if (pvjsonElement.hasOwnProperty('borderColor') && !pvjsonElement.hasOwnProperty('color')) {
    pvjsonElement.color = pvjsonElement.borderColor
  }

  // borderOpacity
  if (pvjsonElement.hasOwnProperty('borderOpacity')) {
    // TODO currently cross-platform-shapes do not support borderOpacity upon creation
  }

  return pvjsonElement
}

function render(renderer, pvjsonElement) {
  // Keep both node and text because a node may take both form
  var shape, text

  if (!!pvjsonElement.shape && pvjsonElement.shape !== 'none') {
    shape = renderShape(renderer, normalizeShapeStyles(pvjsonElement))
  }
  if (!!pvjsonElement.textContent) {
    text = renderText(renderer, pvjsonElement)
  }

  // If nothing rendered
  return shape || text || null
}

function renderShape(renderer, pvjsonElement) {
  var pvjson = renderer.pvjs.sourceData.pvjson;
  var shapeName = Strcase.camelCase(pvjsonElement.shape)

  // TODO move this checking into plugin
  if (!renderer.crossPlatformShapesInstance.hasOwnProperty(shapeName)) {
    // If cannot render shape, try a single-line version of shape (replace double word in shape name)
    // If cannot render render as rounded rectangle
    shapeName = shapeName.replace(/double$/gi, '')

    if (renderer.crossPlatformShapesInstance.hasOwnProperty(shapeName)) {
      renderer.pvjs.trigger('warning.renderer', {
        message: 'Requested path "' + pvjsonElement.shape + '" is not available with linetype of "Double". Using linetype of "Solid" instead'
      })
    } else {
      renderer.pvjs.trigger('warning.renderer', {
        message: 'Requested path "' + pvjsonElement.shape + '" is not available. Using path "rounded-rectangle" instead'
      })

      shapeName = 'roundedRectangle'
    }
  }

  var node = renderer.crossPlatformShapesInstance[shapeName](pvjsonElement)
    , $node = d3.select(node)

  var entityReference = pvjsonElement.entityReference;

  // TODO delegate events to selector
  if (!!entityReference && pvjsonElement.type !== void 0) {
    // right now, pathways generally don't have a shape, so they are being handled by attaching events to their text.

    // Add class to change mouse hover
    $node.classed({'has-xref': true});

    var notDragged = true;

    $node.on("mousedown", function(d,i) {
      notDragged = true;
    })
    .on("mousemove", function(d,i) {
      notDragged = false;
    })
    .on("mouseup", function(d,i) {
      if (notDragged) {
        // Search for reference id on demand

        var referenceId = entityReference

        // If BridgeDB handles pathway entities of this type
        if (['Protein', 'Dna', 'Rna', 'SmallMolecule'].indexOf(pvjsonElement.type) !== -1) {
          // Get all xrefs with given id
          var selector = renderer.pvjs.sourceData.selector.filteredByXRef('id:'+entityReference).getFirst()
          // If any xref found
          if (!selector.isEmpty()) {
            // If first element has xrefs field
            if (selector[0].xrefs && selector[0].xrefs.length) {
              // Filter only bridgebd xrefs
              var filtered = selector[0].xrefs.filter(function(xref){
                return xref.indexOf('bridgedb.org' !== -1)
              })

              // If at least one xref left
              if (filtered.length) {
                referenceId = filtered[0]
              }
            }
          }
        }

        EntityReference.render(renderer.pvjs, {
          metadata: {
            label: pvjsonElement.textContent
          , description: pvjsonElement.type
          }
        , xrefs: {
            id: referenceId
          }
        });
      } // end of if notDragged
    });
  }

  return node
}

function renderText(renderer, pvjsonElement) {
  var node = renderer.crossPlatformTextInstance.render(pvjsonElement)
    , $node = d3.select(node);

  // TODO delegate this to selector
  // should a pathway xref be an entity reference or an id?
  if (!!pvjsonElement.type && pvjsonElement.type === 'Pathway' && !!pvjsonElement.entityReference) {
    var entityReferenceRendererArguments = {};
    entityReferenceRendererArguments.metadata = {
      label:pvjsonElement.textContent,
      description:pvjsonElement.type
    };
    entityReferenceRendererArguments.xrefs = {};
    entityReferenceRendererArguments.xrefs.id = pvjsonElement.entityReference;

    var notDragged = true;

    // Add class to change mouse hover
    $node.classed({'has-xref': true});

    $node.on("mousedown", function(d,i) {
      notDragged = true;
    })
    .on("mousemove", function(d,i) {
      notDragged = false;
    })
    .on("mouseup", function(d,i) {
      if (notDragged) {
        EntityReference.render(renderer.pvjs, entityReferenceRendererArguments);
      }
    });
  } else {
    $node.style('pointer-events', 'none')
  }


  return node
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
  return this._elementsHash[pvjsonElement.id] !== void 0 && this._elementsHash[pvjsonElement.id] !== null
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
      pvjsonElement: pvjsonElement
    , render: render(this, pvjsonElement)
    }
  }
}

var selectorToSvgStyleMap = {
  backgroundColor: 'fill'
, backgroundOpacity: 'fill-opacity'
, borderColor: 'stroke'
, borderWidth: 'stroke-width'
, borderOpacity: 'stroke-opacity'
}

function normalizeSelectorStyle(key) {
  if (selectorToSvgStyleMap.hasOwnProperty(key)) {
    return selectorToSvgStyleMap[key]
  } else {
    return key
  }
}

function styleStringToMap(str) {
  var _styles = str.trim().split(';')
    , _style
    , styles = {}

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
  if (!this.hasElement(pvjsonElement)) {return}

  var $element = d3.select(this._elementsHash[pvjsonElement.id].render)
    , styleKey
    , styleMap = {}
    , styleString = ''

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
  if (!this.hasElement(pvjsonElement)) {return}

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
  if (!this.hasElement(pvjsonElement)) {return}

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
        width: 0
      , height: 0
      , top: null
      , bottom: null
      , left: null
      , right: null
      }
    , border = pvjsonElement && pvjsonElement.hasOwnProperty('borderWidth') ? +pvjsonElement.borderWidth : 0

  if (pvjsonElement === null || pvjsonElement === void 0) {return BBox;}

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
    if (pvjsonElement.hasOwnProperty('gpml:element') && pvjsonElement['gpml:element'] === 'gpml:Interaction') {
      BBox.top = Math.min(pvjsonElement.points[0].y, pvjsonElement.points[1].y) - border
      BBox.bottom = Math.max(pvjsonElement.points[0].y, pvjsonElement.points[1].y) + border
      BBox.left = Math.min(pvjsonElement.points[0].x, pvjsonElement.points[1].x) - border
      BBox.right = Math.max(pvjsonElement.points[0].x, pvjsonElement.points[1].x) + border
      BBox.width = BBox.right - BBox.left
      BBox.height = BBox.top - BBox.bottom
    }
  }

  if (pvjsonElement.hasOwnProperty('rotation')) {
    var rotationRad = +pvjsonElement.rotation * Math.PI / 180
      , points = [0,0,0,0,0,0,0,0] // top_left.x, y, top_right.x, y, bottom_right.x, y, bottom_left.x, y
      , centerX = (BBox.left + BBox.right)/2
      , centerY = (BBox.top + BBox.bottom)/2
      , BBoxCentered = {
          top: BBox.height / 2
        , bottom : -BBox.height / 2
        , left: -BBox.width / 2
        , right: BBox.width / 2
        }

    // Calculate points of rotated rectangle
    points[0] = (BBoxCentered.left) * Math.cos(rotationRad) - (BBoxCentered.top) * Math.sin(rotationRad)
    points[1] = (BBoxCentered.left) * Math.sin(rotationRad) + (BBoxCentered.top) * Math.cos(rotationRad)
    points[2] = (BBoxCentered.right) * Math.cos(rotationRad) - (BBoxCentered.top) * Math.sin(rotationRad)
    points[3] = (BBoxCentered.right) * Math.sin(rotationRad) + (BBoxCentered.top) * Math.cos(rotationRad)
    points[4] = (BBoxCentered.right) * Math.cos(rotationRad) - (BBoxCentered.bottom) * Math.sin(rotationRad)
    points[5] = (BBoxCentered.right) * Math.sin(rotationRad) + (BBoxCentered.bottom) * Math.cos(rotationRad)
    points[6] = (BBoxCentered.left) * Math.cos(rotationRad) - (BBoxCentered.bottom) * Math.sin(rotationRad)
    points[7] = (BBoxCentered.left) * Math.sin(rotationRad) + (BBoxCentered.bottom) * Math.cos(rotationRad)

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
  init: function(pvjs){
    var renderer = Object.create(RendererSvg)

    renderer.init(pvjs)

    return renderer
  }
}
