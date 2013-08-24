pathvisio.pathway.edge.marker = function(){ 
  function draw(name, position, color) {
    var markerName = '';
    if (name === 'none') {
      markerName = name;
    }
    else {

      // if it's black, use the default

      if ( (color === '#000') || (color === '#000000') || (!(color)) ) {
        markerName = name + '-' + position + '-black';
      }

      // else create a new marker with the desired color

      else {
        /*
        var pathvisio.pathways[pathvisio.current.svgSelector].svg = d3.select("#pathway-container").select(function() {
          return this.contentDocument.documentElement;
        });
        */

        var markerElementBlack = pathvisio.current.svg.select('marker#' + name + '-' + position + '-black');
        var markerElement = pathvisio.helpers.cloneNode(markerElementBlack[0][0]);

        // define style of marker element

        var markerElementStyle = '';

        if (markerElement[0][0].getAttribute('stroke') === 'black') {
          markerElementStyle += 'stroke:' + color + '; ';
        };

        if (markerElement[0][0].getAttribute('fill') === 'black') {
          markerElementStyle += 'fill:' + color + '; ';
        };

        markerElement[0][0].setAttribute('id', name + '-' + position + '-' + color );
        markerElement[0][0].setAttribute('style', markerElementStyle);

        markerName = name + '-' + position + '-' + color;
      };
    };
    return markerName;
  };
 
  return { 
    draw:draw 
  } 
}(); 
   




