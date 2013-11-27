pathvisiojs.view.pathwayDiagram.svg.edge.marker = function(){

  // the way SVG works makes this code more complex than it should need to be. Essentially, we
  // are trying to reuse the markers defined in the SVG template, but we also need to be able
  // to handle whether any marker is desired, whether the desired marker exists in the pathway
  // template svg, whether it is at the start or end of a path and whether
  // a color other than black (the color specified in the template) is desired.

  var svgHere;

  function appendCustom(customMarker, callback) {
    console.log('customMarker');
    console.log(customMarker);
    if (1===1) {
      d3.xml(customMarker.url, 'image/svg+xml', function(svgXml) {

        def = svgHere.select('defs').select('#' + customMarker.id);
        if (!def[0][0]) {
          def = svgHere.select('defs').append('marker')
          .attr('id', customMarker.id)
          .attr('preserveAspectRatio', 'none');
        }
        else {
          def.selectAll('*').remove();
        }


        var marker = d3.select(svgXml.documentElement)
        var width = marker.attr('width');
        var height = marker.attr('height');

        def.attr('viewBox', '0 0 ' + width + ' ' + height);

        var parent = document.querySelector('#' + customMarker.id);
        parent.appendChild(svgXml.documentElement);
        callback(null);
      });
    }
    else {
      img = document.createElement('img');
      img.src = customMarker.url;
      img.onload = function() {
        def = svg.select('defs').select('#' + customMarker.id);
        if (!def[0][0]) {
          def = svg.select('defs').append('symbol')
          .attr('id', customMarker.id)
          .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
          .attr('preserveAspectRatio', 'none');
        }
        else {
          def.selectAll('*').remove();
        }
        dimensions = def.attr('viewBox').split(' ');

        def.append('image').attr('xlink:xlink:href', customMarker.url)
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
    var def = null;
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

      var markerElementBlack = svg.select('marker#' + name + '-' + position + '-black');

      if (markerElementBlack.length === 1) {

        // if the desired stroke color is black, use the marker specified in the pathway template svg.

        if ( (color === '#000') || (color === '#000000') || (!(color)) ) {
          markerUrl = name + '-' + position + '-black';
        }

        // else create a new marker with the desired color

        else {
          /*
          var pathway.svg = d3.select("#pathway-container").select(function() {
            return this.contentDocument.documentElement;
          });
          */

          var markerElement = pathvisiojs.utilities.cloneNode(markerElementBlack[0][0]);

          // define style of marker element

          var markerElementStyle = '';

          if (markerElement[0][0].getAttribute('stroke') === 'black') {
            markerElementStyle += 'stroke:' + color + '; ';
          }

          if (markerElement[0][0].getAttribute('fill') === 'black') {
            markerElementStyle += 'fill:' + color + '; ';
          }

          markerElement[0][0].setAttribute('id', name + '-' + position + '-' + color );
          markerElement[0][0].setAttribute('style', markerElementStyle);

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
