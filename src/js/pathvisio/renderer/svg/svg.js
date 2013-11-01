pathvisio.renderer.svg = function(){

  var svg, pathway, shapesAvailable, markersAvailable;

  function setCTM(element, matrix) {
    var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
    element.setAttribute("transform", s);
  }

  function load(args, callback) {
    async.series([
      function(callback) {
        pathvisioNS.grid = {};
        pathvisio.renderer.pathFinder.generateGridData(results.pathway, function() {
          callback(null);
        });
      },
      function(callback){
        svg = d3.select('body').select('#pathway-svg')
        //draw(svg, pathway, function() {
        pathvisio.renderer.svg.render(svg, results.pathway, function() {
          callback(null);
        })
      },
      function(callback) {
        var svgDimensions = self.svgDimensions = pathvisio.renderer.fitElementWithinContainer(args.target, results.pathway.metadata.boardWidth, results.pathway.metadata.boardHeight, args.preserveAspectRatio);
        self.svgDimensions = svgDimensions;
        d3.select('#loading-icon').remove();

        svg.attr('style', 'display: inline; width: ' + args.target.width + 'px; height: ' + args.target.height + 'px; ')
        .on("click", function(d, i){
          svgPanZoom.toggleZoom();
        });

        // TODO avoid defining svg again

        var svgElement = document.querySelector('svg');
        var m1 = svgElement.getCTM();
        var p = {'x': m1.e, 'y': m1.f};
        var m2 = svgElement.createSVGMatrix().translate(p.x, p.y).scale(svgDimensions.scale).translate(-p.x, -p.y);
        var viewport = svgElement.querySelector('#viewport');
        setCTM(viewport, m2);

        /*
         * function setCTM(element, matrix) {
         var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
         console.log(s);

         element.setAttribute("transform", s);
         }
         var svgElement = document.querySelector('svg');
         var m1 = svgElement.getCTM();
         var xScale1 = m1.a;
         var yScale1 = m1.d;
         var zoomFactor = 0.2;
         var p = {'x': m1.e, 'y': m1.f};
         var z = xScale1 * (1+zoomFactor);
         var m2 = svgElement.createSVGMatrix().translate(p.x, p.y).scale(z).translate(-p.x, -p.y);
         var viewport = svgElement.querySelector('#viewport');
         setCTM(viewport, m2);
        //*/

        svgPanZoom.init({
          'root': 'svg',
          'enableZoom': false 
        });
        callback(null);
      }
    ],
    function(err, results) {
    });
    callback();
  }

  function loadPartials(args, callbackOutside) {
    var pathvisioJsContainer, pathwayContainer;
    async.series([
      function(callback) {
        args.target.element.html(pathvisioNS['tmp/pathvisio-js.html']);
        pathvisioJsContainer = args.target.element.select('#pathvisio-js-container');
        pathwayContainer = pathvisioJsContainer.select('#pathway-container')
        .attr('class', args.preserveAspectRatioValues.yAlign);

        svg = pathvisioJsContainer.select('#pathway-svg')
        .attr('class', args.preserveAspectRatioValues.xAlign)
        //.attr('viewBox', '0 0 ' + args.target.width + ' ' + args.target.height)
        .attr('style', 'display: none; ');

        callback(null);
      },
      function(callback){


        /*
        // Update…
        var pd3 = docfragd3.selectAll("p")
            .data([3, 4, 8, 15, 16, 23, 42])
            .text(String);

        // Enter…
        pd3.enter().append("p")
            .text(String);

        // Exit…
        pd3.exit().remove();

        d3.select('document').append(docfragd3);
        //*/

        //var loadingImage = targetElement.select('#pathway-image');




        ///*
        //var docfrag = document.createDocumentFragment();
        //var div = d3.select(docfrag).append('div');
        //var div = document.createElement('div');
        //args.target.element.html(pathvisioNS['tmp/pathvisio-js.html']);
        ////*/

        callback(null);
      },
      function(callback) {
        if (!!args.customMarkers) {
          pathvisio.renderer.svg.edge.marker.loadAllCustom(args.customMarkers, function() {
            callback(null);
          })
        }
        else {
          callback(null);
        }
      },
      function(callback) {
        if (!!args.customShapes) {
          pathvisio.renderer.svg.node.loadAllCustom(args.customShapes, function() {
            callback(null);
          })
        }
        else {
          callback(null);
        }
      },
      function(callback) {
        if (!!args.cssUrl) {
          d3.text(args.cssUrl, 'text/css', function(data) {
            var defs = svg.select('defs');
            var style = defs.append('style').attr('type', "text/css");
            style.text(data);
            callback(null);
          })
        }
        else {
          callback(null);
        }
      }
    ],
    function(err, results) {
      callbackOutside(svg);
    });
  }

  function render(svg, pathway, callback){
    svg = d3.select('body').select('#pathway-svg')
    if (!pathway) {
      console.warn('Error: No data entered as input.');
      return 'Error';
    }

    var drag = d3.behavior.drag()
    .on("drag", dragmove);

    function dragmove(d) {
      d.x=d3.event.x;
      d.y=d3.event.y;
      d3.select(this)
      .attr("x", d3.event.x)
      .attr("y", d3.event.y);
    }

    //svg.attr('width', pathway.metadata.boardWidth);
    //svg.attr('height', pathway.metadata.boardHeight);

    if (!!pathway.biopaxRefs) {
      var pathwayPublicationXrefs = svg.select('#viewport').selectAll(".pathway-publication-xref-text")
      .data(pathway.biopaxRefs)
      .enter()
      .append("text")
      .attr("id", function (d) { return 'pathway-publication-xref-text-' + d; })
      .attr("x", 0)
      .attr("y", 0)
      .attr('transform', function(d,i) { return 'translate(' + (200 + i*12) + ' ' + 12 + ')'; })
      .attr("class", 'pathway-publication-xref-text')
      .attr("style", "")
      .text(function (d) {

        // d is an array of biopaxRefs. There are several IDs for biopaxRefs, but rdfId (rdf:id) is the one used for
        // GPML to link pathway elements with biopaxRefs.
        // TODO I set rdfId to null here because I think not doing so could result in errors if the rdfId value for
        // a previous instance of biopaxRefs had a value that was used when evaluating a later instance

        var index = 0;
        var rdfId = null;
        do {
          rdfId = pathway.biopax.bpPublicationXrefs[index].rdfId;
          index += 1;
        } while (rdfId !== d.Text && index < pathway.biopax.bpPublicationXrefs.length);
        return index;});
    }

    if (pathway.hasOwnProperty('groups')) {
      pathvisio.renderer.svg.group.renderAll(svg, pathway);
    }

    if (pathway.hasOwnProperty('edges')) {
      pathvisio.renderer.svg.edge.renderAll(svg, pathway);
    }
    else {
    console.log('none');
    }

    if (pathway.hasOwnProperty('nodes')) {
      pathvisio.renderer.svg.node.renderAll(svg, pathway);
    }

    if (pathway.hasOwnProperty('infoBox')) {
      pathvisio.renderer.svg.infoBox.render(svg, pathway);
    }

    //pathvisio.renderer.svg.grid.render(svg);

    pathway.elements.forEach(function(element) {
      if (element.renderableType === 'edge') {
        pathvisio.renderer.svg.edge.render(svg, pathway, element);
      }
      else {
        if (element.renderableType === 'node') {
          pathvisio.renderer.svg.node.render(svg, pathway, element);
        }
      }
    });
    //pathvisio.renderer.svg.anchor.renderAll(svg, pathway);

      window.svg = d3.select("svg")
      .attr('style', 'width: 500px');

    callback();
  }

  return {
    render:render,
    load:load,
    loadPartials:loadPartials
  };
}();
