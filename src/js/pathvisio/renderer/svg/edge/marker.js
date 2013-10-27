pathvisio.renderer.svg.edge.marker = function(){

  // the way SVG works makes this code more complex than it should need to be. Essentially, we
  // are trying to reuse the markers defined in the SVG template, but we also need to be able
  // to handle whether any marker is desired, whether the desired marker exists in the pathway
  // template svg, whether it is at the start or end of a path and whether
  // a color other than black (the color specified in the template) is desired.

  function render(svg, name, position, color) {
    console.log('marker args');
    console.log(svg);
    console.log(name);
    console.log(position);
    console.log(color);
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

          var markerElement = pathvisio.helpers.cloneNode(markerElementBlack[0][0]);

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
    render:render
  };
}();
