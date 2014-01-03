pathvisiojs.view.pathwayDiagram.svg.edge.marker = function(){

  // the way SVG works makes this code more complex than it should need to be. Essentially, we
  // are trying to reuse the markers defined in the SVG template, but we also need to be able
  // to handle whether any marker is desired, whether the desired marker exists in the pathway
  // template svg, whether it is at the start or end of a path and whether
  // a color other than black (the color specified in the template) is desired.

  var svg;

  var semanticNameToIdMapping = { 
    'arrow':'shape-library-markers-arrow-svg',
    'necessary-stimulation':'shape-library-markers-mim-necessary-stimulation-svg',
    'binding':'shape-library-markers-mim-binding-svg',
    'conversion':'shape-library-markers-mim-conversion-svg',
    'stimulation':'shape-library-markers-mim-stimulation-svg',
    'modification':'shape-library-markers-mim-modification-svg',
    'catalysis':'shape-library-markers-mim-catalysis-svg',
    'inhibition':'shape-library-markers-mim-inhibition-svg',
    'cleavage':'shape-library-markers-mim-cleavage-svg',
    'covalent-bond':'shape-library-markers-mim-covalent-bond-svg',
    'transcription-translation':'shape-library-markers-mim-transcription-translation-svg',
    'gap':'shape-library-markers-mim-gap-svg',
    'inhibitory-activity':'shape-library-markers-t-bar-svg',
    'unspecified':'shape-library-markers-none-svg',
    'activity':'shape-library-markers-arrow-svg',
    'mim-branching-left':'shape-library-markers-mim-branching-left-svg',
    'mim-branching-right':'shape-library-markers-mim-branching-right-svg',
    'mim-necessary-stimulation':'shape-library-markers-mim-necessary-stimulation-svg',
    'mim-binding':'shape-library-markers-mim-binding-svg',
    'mim-conversion':'shape-library-markers-mim-conversion-svg',
    'mim-stimulation':'shape-library-markers-mim-stimulation-svg',
    'mim-modification':'shape-library-markers-mim-modification-svg',
    'mim-catalysis':'shape-library-markers-mim-catalysis-svg',
    'mim-inhibition':'shape-library-markers-mim-inhibition-svg',
    'mim-cleavage':'shape-library-markers-mim-cleavage-svg',
    'mim-covalent-bond':'shape-library-markers-mim-covalent-bond-svg',
    'mim-transcription-translation':'shape-library-markers-mim-transcription-translation-svg',
    'mim-gap':'shape-library-markers-mim-gap-svg',
    't-bar':'shape-library-markers-t-bar-svg',
    'none':'shape-library-markers-none-svg'
  };

  function appendCustom(uniqueMarkerShapeUrl, callback) {
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

      d3.xml(uniqueMarkerShapeUrl, 'image/svg+xml', function(svgXml) {

        /*
<marker id="mim-inhibition-start-black" class="default-fill" stroke="black" markerWidth="16" markerHeight="16" markerUnits="strokeWidth" orient="auto" refX="0" refY="6" viewBox="0 0 12 12">
         //*/
        var idStub = strcase.paramCase(uniqueMarkerShapeUrl)
        var startId = idStub + '-start-default';
        var endId = idStub + '-end-default';

        var markerStart = svg.select('defs').select('#' + startId);
        if (!markerStart[0][0]) {
          markerStart.selectAll('*').remove();
        }
        markerStart = svg.select('defs').append('marker')
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

        var markerEndD3 = svg.select('defs').select('#' + endId);
        if (!markerEndD3[0][0]) {
          markerEndD3.selectAll('*').remove();
        }
        markerEndD3 = svg.select('defs').append('marker')
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
      img.src = uniqueMarkerShapeUrl;
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

        marker.append('image').attr('xlink:xlink:href', uniqueMarkerShapeUrl)
        .attr('x', dimensions[0])
        .attr('y', dimensions[1])
        .attr('width', dimensions[2])
        .attr('height', dimensions[3])
        .attr('externalResourcesRequired', "true");

        callback(null);
      }
    }
  }

  function loadAllCustom(thisSvg, customMarkers, callback) {
    svg = thisSvg;
    var image = null;
    var img = null;
    var marker = null;
    var dimensions = null;
    var dimensionSet = [];

    var uniqueMarkerShapeUrls = [];
    customMarkers.forEach(function(customMarker){
      pathvisiojs.view.pathwayDiagram.svg.edge.marker.semanticNameToIdMapping[customMarker.semanticName] = strcase.paramCase(customMarker.url);
      if (uniqueMarkerShapeUrls.indexOf(customMarker.url) === -1) {
        uniqueMarkerShapeUrls.push(customMarker.url);
      }
    });

    async.each(uniqueMarkerShapeUrls, appendCustom, function(err){
        // if any of the saves produced an error, err would equal that error
      callback(null);
    });
  }

  function render(svg, name, position, color) {
    var markerId;
    var markerIdStub = semanticNameToIdMapping[name];

    // if no marker is to be used, JSON data will specify 'none'.

    if (name === 'none') {
      markerId = name;
    }
    else {

      // check for whether the desired marker is defined once in the pathway template svg.

      var selector = 'marker#' + markerIdStub + '-' + position + '-default';
      var markerElementDefault = svg.select(selector);

      if (markerElementDefault.length === 1) {

        // if the desired stroke color is not specified, use the default marker specified in the pathway template svg.

        if ( !(color) ) {
          markerId = markerIdStub + '-' + position + '-default';
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

          markerElement[0][0].setAttribute('id', markerIdStub + '-' + position + '-' + color );
          markerElementSvg.setAttribute('style', markerElementStyle);

          markerId = markerIdStub + '-' + position + '-' + color;
        }
      }
      else {
        markerId = 'none';
        console.warn('Pathvisio.js does not have access to a marker (arrowhead) for the requested edge type: ' + name);
      }
    }
    return markerId;
  }
 
  return {
    render:render,
    semanticNameToIdMapping:semanticNameToIdMapping,
    loadAllCustom:loadAllCustom
  };
}();



/*
semanticNameToIdMapping = [
  {
    'semanticName': 'arrow',
    'id':'shape-library-markers-arrow-svg'
  },
  {
    'semanticName': 'necessary-stimulation',
    'id':'shape-library-markers-mim-necessary-stimulation-svg'
  },
  {
    'semanticName': 'binding',
    'id':'shape-library-markers-mim-binding-svg'
  },
  {
    'semanticName': 'conversion',
    'id':'shape-library-markers-mim-conversion-svg'
  },
  {
    'semanticName': 'stimulation',
    'id':'shape-library-markers-mim-stimulation-svg'
  },
  {
    'semanticName': 'modification',
    'id':'shape-library-markers-mim-modification-svg'
  },
  {
    'semanticName': 'catalysis',
    'id':'shape-library-markers-mim-catalysis-svg'
  },
  {
    'semanticName': 'inhibition',
    'id':'shape-library-markers-mim-inhibition-svg'
  },
  {
    'semanticName': 'cleavage',
    'id':'shape-library-markers-mim-cleavage-svg'
  },
  {
    'semanticName': 'covalent-bond',
    'id':'shape-library-markers-mim-covalent-bond-svg'
  },
  {
    'semanticName': 'transcription-translation',
    'id':'shape-library-markers-mim-transcription-translation-svg'
  },
  {
    'semanticName': 'gap',
    'id':'shape-library-markers-mim-gap-svg'
  },
  {
    'semanticName': 'inhibitory-activity',
    'id':'shape-library-markers-t-bar-svg'
  },
  {
    'semanticName': 'unspecified',
    'id':'shape-library-markers-none-svg'
  },
  {
    'semanticName': 'activity',
    'id':'shape-library-markers-arrow-svg'
  },
  {
    'semanticName': 'mim-branching-left',
    'id':'shape-library-markers-mim-branching-left-svg'
  },
  {
    'semanticName': 'mim-branching-right',
    'id':'shape-library-markers-mim-branching-right-svg'
  },
  {
    'semanticName': 'mim-necessary-stimulation',
    'id':'shape-library-markers-mim-necessary-stimulation-svg'
  },
  {
    'semanticName': 'mim-binding',
    'id':'shape-library-markers-mim-binding-svg'
  },
  {
    'semanticName': 'mim-conversion',
    'id':'shape-library-markers-mim-conversion-svg'
  },
  {
    'semanticName': 'mim-stimulation',
    'id':'shape-library-markers-mim-stimulation-svg'
  },
  {
    'semanticName': 'mim-modification',
    'id':'shape-library-markers-mim-modification-svg'
  },
  {
    'semanticName': 'mim-catalysis',
    'id':'shape-library-markers-mim-catalysis-svg'
  },
  {
    'semanticName': 'mim-inhibition',
    'id':'shape-library-markers-mim-inhibition-svg'
  },
  {
    'semanticName': 'mim-cleavage',
    'id':'shape-library-markers-mim-cleavage-svg'
  },
  {
    'semanticName': 'mim-covalent-bond',
    'id':'shape-library-markers-mim-covalent-bond-svg'
  },
  {
    'semanticName': 'mim-transcription-translation',
    'id':'shape-library-markers-mim-transcription-translation-svg'
  },
  {
    'semanticName': 'mim-gap',
    'id':'shape-library-markers-mim-gap-svg'
  },
  {
    'semanticName': 't-bar',
    'id':'shape-library-markers-t-bar-svg'
  },
  {
    'semanticName': 'none',
    'id':'shape-library-markers-none-svg'
  }
];
//*/
