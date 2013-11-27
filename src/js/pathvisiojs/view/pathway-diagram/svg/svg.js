pathvisiojs.view.pathwayDiagram.svg = function(){

  var svg, pathway, shapesAvailable, markersAvailable;

  var context = {
    "@vocab":"http://vocabularies.wikipathways.org/gpml#",
    "gpml":"http://vocabularies.wikipathways.org/gpml#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "wp":"http://vocabularies.wikipathways.org/wp#",
    "biopax": "http://www.biopax.org/release/biopax-level3.owl#",
    "schema":"http://schema.org/",
    "hMDB":"http://www.hmdb.ca/metabolites/HMDB",
    "entrezGene":"http://www.ncbi.nlm.nih.gov/gene/",
    "ChEBI":"http://www.ebi.ac.uk/chebi/searchId.do?chebiId=",
    "media":"http://www.w3.org/TR/mediaont-10/",
    "ex":"http://www.example.com/",
    "gpmlFolder":"file://Users/andersriutta/Sites/pathvisiojs/test/gpml/",
    "name":"http://xmlns.com/foaf/0.1/name",
    "dcterms":"http://purl.org/dc/terms/",
    "Pathway": "biopax:Pathway",
    "image": "schema:image",
    "shapeLibrary": "http://shapelibrary.example.org/",
    "shapeName": "shapeLibrary:shapeName",
    "dataNodeType": "gpml:Type",
    "author": "schema:author",
    "organism": "biopax:organism",
    "pathwayElements": {
      "@id": "ex:pathwayElements/",
      "@container": "@list"
    },
    "hasReference": {
      "@type": "ex:hasReference",
      "@type": "@id"
    },
    "ex:IsReferencedBy": { "@reverse": "ex:hasReference" },
    "InteractionGraph": {
      "@id": "ex:InteractionGraph",
      "@type": "@id"
    },
    "interactsWith": "ex:interactsWith",
    "Interaction": {
      "@id": "biopax:Interaction",
      "@type": "@id",
      "InteractsWith":"xsd:string"
    },
    "Point": {
      "@id": "gpml:Point",
      "@container": "@list"
    }
  };

  function setCTM(element, matrix) {
    var s = "matrix(" + matrix.a + "," + matrix.b + "," + matrix.c + "," + matrix.d + "," + matrix.e + "," + matrix.f + ")";
    element.setAttribute("transform", s);
  }

  function load(args, callback) {
    if (!args) {
      if (!args.svg) {
        return console.warn('Missing svg.');
      }
      if (!args.pathway) {
        return console.warn('Missing pathway.');
      }
      return console.warn('Missing required input parameter.');
    }
    var svg = args.svg;
    async.series([
      function(callback) {
        pathvisioNS.grid = {};
        var frame = {
          '@context': context,
          '@type': 'Shape'
        };  
        jsonld.frame(args.pathway, frame, function(err, framedData) {
          self.framedData = framedData;
          pathvisiojs.view.pathwayDiagram.pathFinder.generateGridData(framedData['@graph'], args.pathway.image.width, args.pathway.image.height, function() {
            callback(null);
          });
        });
      },
      function(callback){
        // TODO get SVG from where it was already defined
        svg = d3.select('body').select('#pathway-svg')
        //draw(svg, pathway, function() {
        pathvisiojs.view.pathwayDiagram.svg.render(args, function() {
          callback(null);
        })
      },
      function(callback) {
        var svgDimensions = self.svgDimensions = pathvisiojs.view.pathwayDiagram.fitElementWithinContainer(args.target, results.pathway.image.width, results.pathway.image.height, args.preserveAspectRatio);
        self.svgDimensions = svgDimensions;
        d3.select('#loading-icon').remove();

        var initialClickHappened = false;
        svg.attr('style', 'display: inline; width: ' + args.target.width + 'px; height: ' + args.target.height + 'px; ')
        .on("click", function(d, i){
          svgPanZoom.enableZoom();
          initialClickHappened = true;
        })
        .on("mouseover", function(d, i){
          if (initialClickHappened) {
            svgPanZoom.enableZoom();
          }
        })
        .on("mouseout", function(d, i){
          if (initialClickHappened) {
            svgPanZoom.disableZoom();
          }
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
          'zoomEnabled': false 
        });
        callback(null);
      }
    ],
    function(err, results) {
      callback();
    });
  }

  function loadPartials(args, callbackOutside) {
    var pathvisioJsContainer, pathwayContainer, allSymbolNames;
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
      function(callback) {
        if (!!args.customMarkers) {
          console.log('args.customMarkers');
          console.log(args.customMarkers);
          pathvisiojs.view.pathwayDiagram.svg.edge.marker.loadAllCustom(svg, args.customMarkers, function() {
            callback(null);
          })
        }
        else {
          callback(null);
        }
      },
      function(callback) {
        console.log('args.customShapes');
        console.log(args.customShapes);
        if (!!args.customShapes) {
          pathvisiojs.view.pathwayDiagram.svg.symbol.loadAllCustom(svg, args.customShapes, function() {
            callback(null);
          })
        }
        else {
          callback(null);
        }
      },
      function(callback) {
        pathvisiojs.view.pathwayDiagram.svg.symbol.getAllSymbolNames(svg, function(data) {
          allSymbolNames = data;
          callback(null);
        });
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
      callbackOutside(svg, allSymbolNames);
    });
  }

  function render(args, callback){
    if (!args) {
      if (!args.svg) {
        console.warn('Error: No svg specified.');
        return 'Error';
      }
      if (!args.pathway) {
        console.warn('Error: No data entered as input.');
        return 'Error';
      }
      if (!args.allSymbolNames) {
        console.warn('Error: No allSymbolNames specified.');
        return 'Error';
      }
      console.warn('Error: Missing required input.');
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


    //***********************
    // Viewport Element
    //***********************

    // TODO refactor so that svg isn't redefined here
    // Update…
    var viewport = svg.select('#viewport')
    .data([args.pathway]);

    //.attr('transform', function(d) {return 'translate(' + d.x + ' ' + d.y + ')';})
    /*
    .on("click", function(d,i) {
      if (d.elementType === 'data-node') {
        pathvisiojs.view.pathwayDiagram.svg.xRef.render(pathway.organism, d);
      }
    });
    */

    // Enter…
    /*
    viewport.enter().append("g")
    .attr("id", function (d) { return 'node-' + d.id; })
    .attr("id", 'viewport');
    //*/

    // Exit…
    viewport.exit().remove();

    console.log('viewport');
    console.log(viewport);

    console.log('args');
    console.log(args);


          /*
          "@vocab": "http://vocabularies.wikipathways.org/gpml#",
          "gpml": "http://vocabularies.wikipathways.org/gpml#",
          "shapeLibrary": "http://shapelibrary.example.org/",
          "shapeName": "shapeLibrary:shapeName",
          "ex": "http://example.org/vocab#"
          //*/






    /***********************
    // Use Elements
    //***********************/

    async.series([
      function(callbackInside){
        var frame = {
          "@context": context,
          "@type": args.allSymbolNames
        };  
        jsonld.frame(args.pathway, frame, function(err, framedData) {
          callbackInside(err, framedData);
          //callback(err, framedData); // should I use this one instead?
        });
      }
    ],
    function(err, results) {
        // Update… 
        var useElementsContainers = viewport.selectAll('g.shape')
        .data(results[0]['@graph'])
        .call(pathvisiojs.view.pathwayDiagram.svg.node.render);

        // Enter…
        useElementsContainers.enter().append("g")
        .call(pathvisiojs.view.pathwayDiagram.svg.node.render);

        // Exit…
        useElementsContainers.exit().remove();

        // Update… 
        var useElements = useElementsContainers.selectAll("use.shape")
        .data(function(d) {
          return [d];
        })
        .call(pathvisiojs.view.pathwayDiagram.svg.useElement.render);

        // Enter…
        useElements.enter().append("use")
        .call(pathvisiojs.view.pathwayDiagram.svg.useElement.render);

        // Exit…
        useElements.exit().remove();
    });


    //pathvisiojs.view.pathwayDiagram.svg.pathShape.renderAll(viewport, pathShapes);

    /***********************
    // Path (Edge) Elements
    //***********************/

    async.series([
      function(callbackInside){
        var frame = self.frame = {
          "@context": context,
          "@type": "SvgPath"
        };  
        jsonld.frame(args.pathway, frame, function(err, framedData) {
          callbackInside(err, framedData);
          //callback(err, framedData); // should I use this one instead?
        });
      }
    ],
    function(err, results) {
        //self.results = results;
        console.log('results[0][@graph]');
        console.log(results[0]['@graph']);
        // Update… 
        var edges = viewport.selectAll('path.edge')
        .data(results[0]['@graph'])
        .call(pathvisiojs.view.pathwayDiagram.svg.edge.render);

        // Enter…
        edges.enter().append("path")
        .call(pathvisiojs.view.pathwayDiagram.svg.edge.render);

        // Exit…
        edges.exit().remove();
    });


    //svg.attr('width', pathway.image.width);
    //svg.attr('height', pathway.image.height);

    /*
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
      pathvisiojs.view.pathwayDiagram.svg.group.renderAll(svg, pathway);
    }

    if (pathway.hasOwnProperty('edges')) {
      pathvisiojs.view.pathwayDiagram.svg.edge.renderAll(svg, pathway);
    }
    else {
    console.log('none');
    }



    if (pathway.hasOwnProperty('infoBox')) {
      pathvisiojs.view.pathwayDiagram.svg.infoBox.render(svg, pathway);
    }

    //pathvisiojs.view.pathwayDiagram.svg.grid.render(svg);

    //pathvisiojs.view.pathwayDiagram.svg.anchor.renderAll(svg, pathway);

      window.svg = d3.select("svg")
      .attr('style', 'width: 500px');
//*/
    callback(svg);
  }

  return {
    render:render,
    load:load,
    loadPartials:loadPartials
  };
}();
