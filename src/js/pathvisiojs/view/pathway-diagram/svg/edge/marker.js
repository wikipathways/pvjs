pathvisiojs.view.pathwayDiagram.svg.edge.marker = function(){

  // the way SVG works makes this code more complex than it should need to be. Essentially, we
  // are trying to reuse the markers defined in the SVG template, but we also need to be able
  // to handle whether any marker is desired, whether the desired marker exists in the pathway
  // template svg, whether it is at the start or end of a path and whether
  // a color other than black (the color specified in the template) is desired.

  var svgHere;

  function appendCustom(customMarker, callback) {
    /*
    console.log('customMarker');
    console.log(customMarker);
    //*/
    if (1===1) {

/*
 * could also look at using SVG image tags for this, like so:
	<marker id="mim-binding-start-black" 
	class="default-fill" 
	stroke="black"
	markerHeight="12"
	markerWidth="12"
	markerUnits="strokeWidth"
	orient="auto"
	refX="0" refY="6"
	viewBox="0 0 12 12">
  <image xlink:href="http://wikipathways.github.io/pathvisiojs/src/views/markers/mim-binding.svg" x="0" y="0" width="12" height="12"></image>
	</marker>
//*/

      d3.xml(customMarker.url, 'image/svg+xml', function(svgXml) {

        /*
<marker id="mim-inhibition-start-black" class="default-fill" stroke="black" markerWidth="16" markerHeight="16" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">
         //*/
        var idStub = strcase.paramCase(customMarker.id)
        var startId = idStub + '-start-default';
        var endId = idStub + '-end-default';

        var markerStart = svgHere.select('defs').select('#' + startId);
        if (!markerStart[0][0]) {
          markerStart.selectAll('*').remove();
        }
        markerStart = svgHere.select('defs').append('marker')
        .attr('id', startId)
        .attr('preserveAspectRatio', 'none');

        var newMarker = d3.select(svgXml.documentElement)
        var width = newMarker.attr('width');
        var height = newMarker.attr('height');

        markerStart.attr('viewBox', '0 0 ' + width + ' ' + height)
        .attr('markerWidth', width)
        .attr('markerHeight', height)
        .attr('markerUnits', 'strokeWidth')
        .attr('orient', 'auto')
        .attr('refX', 0)
        .attr('refY', 6);

        var parent = document.querySelector('#' + startId);
        var docElClone = pathvisiojs.utilities.clone(svgXml.documentElement);
        parent.appendChild(svgXml.documentElement);

        var markerEndD3 = svgHere.select('defs').select('#' + endId);
        if (!markerEndD3[0][0]) {
          markerEndD3.selectAll('*').remove();
        }
        markerEndD3 = svgHere.select('defs').append('marker')
        .attr('id', endId)
        .attr('viewBox', -1*width + ' ' + -1*height + ' ' + width + ' ' + height)
        .attr('markerWidth', width)
        .attr('markerHeight', height)
        .attr('markerUnits', 'strokeWidth')
        .attr('orient', 'auto')
        .attr('refX', 0)
        .attr('refY', -1*height/2);
        var g = markerEndD3.append('g')
        .attr('id', 'g-' + endId)
        .attr('style', '-webkit-transform: rotate(180deg); -webkit-transform-origin: 50% 50%;');
        var endG = document.querySelector('#' + 'g-' + endId);
        endG.appendChild(docElClone);

        //*
        //var markerEnd = pathvisiojs.utilities.cloneNode('#' + startId);
        //markerEnd[0][0].setAttribute('id', endId);
        //markerEnd[0][0].setAttribute('transform', 'rotate(180deg)');
        //*/
        callback(null);
      });
    }
    else {
      img = document.createElement('img');
      img.src = customMarker.url;
      img.onload = function() {
        marker = svg.select('defs').select('#' + customMarker.id);
        if (!marker[0][0]) {
          marker = svg.select('defs').append('symbol')
          .attr('id', customMarker.id)
          .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
          .attr('preserveAspectRatio', 'none');
        }
        else {
          marker.selectAll('*').remove();
        }
        dimensions = marker.attr('viewBox').split(' ');

        marker.append('image').attr('xlink:xlink:href', customMarker.url)
        .attr('x', dimensions[0])
        .attr('y', dimensions[1])
        .attr('width', dimensions[2])
        .attr('height', dimensions[3])
        .attr('externalResourcesRequired', "true");

        callback(null);
      }
    }
  }

  function loadAllCustom(svg, customMarkers, callback) {
    svgHere = svg;
    var image = null;
    var img = null;
    var marker = null;
    var dimensions = null;
    var dimensionSet = [];

    async.each(customMarkers, appendCustom, function(err){
        // if any of the saves produced an error, err would equal that error
      callback(null);
    });
  }

  function render(svg, name, position, color) {
    var markerUrl = '';

    // if no marker is to be used, JSON data will specify 'none'.

    if (name === 'none') {
      markerUrl = name;
    }
    else {

      // check for whether the desired marker is defined once in the pathway template svg.

      var selector = 'marker#' + name + '-' + position + '-default';
      var markerElementDefault = svg.select(selector);

      if (markerElementDefault.length === 1) {

        // if the desired stroke color is not specified, use the default marker specified in the pathway template svg.

        if ( !(color) ) {
          markerUrl = name + '-' + position + '-default';
        }

        // else create a new marker with the desired color

        else {
          /*
          var pathway.svg = d3.select("#pathway-container").select(function() {
            return this.contentDocument.documentElement;
          });
          */

          var markerElement = pathvisiojs.utilities.cloneNode(selector);
          // TODO remove dependency on cloneNode and get the below working:
          //var markerElement = pathvisiojs.utilities.clone(markerElementDefault[0][0]);

          // define style of marker element's SVG

          var markerElementStyle = '';

	  var markerElementSvg = markerElement.selectAll("svg")[0][0];

          if (markerElementSvg.getAttribute('class').match(/default-stroke-color/)) {
            markerElementStyle += 'stroke:#' + color + '; ';
          }

          if (markerElementSvg.getAttribute('class').match(/default-fill-color/)) {
            markerElementStyle += 'fill:#' + color + '; ';
          }

          markerElement[0][0].setAttribute('id', name + '-' + position + '-' + color );
          markerElementSvg.setAttribute('style', markerElementStyle);

          markerUrl = name + '-' + position + '-' + color;
        }
      }
      else {
        markerUrl = 'none';
        console.warn('Pathvisio.js does not have access to the requested marker: ' + name);
      }
    }
    return markerUrl;
  }
 
  return {
    render:render,
    loadAllCustom:loadAllCustom
  };
}();
