pathvisio.renderer = function(){

  // first pass GPML (pathway XML) through an automatic XML to JSON converter, 
  // then make specific modifications to make the JSON well-formatted, then return the JSON
  
  var svg = null;
  var pathway = null;
  var symbolsAvailable = null;

  self.pathway = pathway;

  function draw(svg, pathway, callback){
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

    svg.attr('width', pathway.boardWidth);
    svg.attr('height', pathway.boardHeight);

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
      pathvisio.pathway.group.drawAll(svg, pathway);
    }

    if (pathway.hasOwnProperty('edges')) {
      pathvisio.pathway.edge.drawAll(svg, pathway);
    }

    if (pathway.hasOwnProperty('nodes')) {
      pathvisio.pathway.node.drawAll(svg, pathway);
    }

    if (pathway.hasOwnProperty('infoBox')) {
      pathvisio.pathway.infoBox.draw(svg, pathway);
    }

    callback();

    /*
    window.setTimeout(function() {
      window.root = document.documentElement.getElementsByTagName("svg")[0];
      root.addEventListener('click', function () {
        enableZoom = 1;
      });
      setupHandlers(root);
    }, 1000);
    //*/
  }

  function appendCustomShape(customShape, callback) {
    img = document.createElement('img');
    img.src = customShape.url;
    img.onload = function() {
      def = svg.select('defs').select('#' + customShape.id);
      if (!def[0][0]) {
        def = d3.select('svg').select('defs').append('symbol').attr('id', customShape.id)
        .attr('viewBox', '0 0 ' + this.width + ' ' + this.height)
        .attr('preserveAspectRatio', 'none');
      }
      else {
        def.selectAll('*').remove();
      }
      dimensions = def.attr('viewBox').split(' ');
      def.append('image').attr('xlink:xlink:href', customShape.url).attr('x', dimensions[0]).attr('y', dimensions[1]).attr('width', dimensions[2]).attr('height', dimensions[3]);
      callback(null);
    }
  }

  function loadCustomShapes(args, callback) {
    var image = null;
    var img = null;
    var def = null;
    var dimensions = null;
    var dimensionSet = [];

    if (!!args.customShapes) {
      async.each(args.customShapes, appendCustomShape, function(err){
          // if any of the saves produced an error, err would equal that error
        callback(null);
      });
    }
  }

  function loadPartials(args, callback) {
    async.series([
      function(callbackInside){
        console.log('2');
        args.containerElement.html(pathvisioNS['tmp/pathvisio-js.html']);
        svg = args.containerElement.select('#pathway-image');
        callbackInside(null);
      },
      function(callbackInside) {
        console.log('3');
        loadCustomShapes(args, function() {
          callbackInside(null);
        })
      },
      function(callbackInside) {
        console.log('4');
        if (!!args.cssUrl) {
          d3.text(args.cssUrl, 'text/css', function(data) {
            var defs = svg.select('defs');
            var style = defs.append('style').attr('type', "text/css");
            style.text(data);
            callbackInside(null);
          })
        }
        else {
          callbackInside(null);
        }
      }
    ],
    function(err, results) {
      console.log(err);
      callback();
    });
  }


  // get JSON and draw SVG representation of pathway

  function load(args) {

    // Check for minimum required parameters

    if (!args.gpmlUrl) { return console.warn('Error: No gpml URL specified as data source for pathvisio.js.'); }

    if (!args.container) { return console.warn('Error: No container selector specified as target for pathvisio.js.'); }
    args.containerElement = d3.select(args.container);
    if (args.containerElement.length !== 1) { return console.warn('Error: Container selector must be matched by exactly one element.'); }

    async.parallel([
      function(callback) {
        console.log('1a');
        loadPartials(args, callback);
      },
      function(callback){
        console.log('1b');
        getJson(args.gpmlUrl, callback);
      }
    ],
    function(err, results){
      console.log('5');
      console.log(err);

      async.series([
        function(callbackInside){
          draw(svg, pathway, function() {
            callbackInside(null);
          })
        },
        function(callbackInside) {
          svgPanZoom.init({
            'root':args.container + ' svg',
            'enableZoom': false
          });
          callbackInside(null);
        }
      ],
      function(err, results) {
        console.log(err);
      });

      var nodeLabels = [];
      pathway.nodes.forEach(function(node) {
        if (!!node.textLabel && node.elementType === 'data-node') {
          nodeLabels.push(node.textLabel.text);
        }
      });

      // see http://twitter.github.io/typeahead.js/

      $('#highlight-by-label-input').typeahead({
        name: 'Highlight node in pathway',
        local: nodeLabels,
        limit: 10
      });
      /*
      $('.icon-eye-open').click(function(){
        var nodeLabel = $("#highlight-by-label-input").val();
        if (!nodeLabel) {
          console.warn('Error: No data node value entered.');
        }
        else {
          pathvisio.pathway.highlightByLabel(nodeLabel);
        }
      });
//*/
      // see http://api.jquery.com/bind/
      // TODO get selected value better and make function to handle

      $( "#highlight-by-label-input" ).bind( "typeahead:selected", function() {
        var nodeLabel = $("#highlight-by-label-input").val();
        if (!nodeLabel) {
          console.warn('Error: No data node value entered.');
        }
        else {
          pathvisio.pathway.highlightByLabel(nodeLabel);
        }
      });

    });
  }

  return {
    draw:draw,
    load:load,
    getJson:getJson,
    gpml2json:gpml2json,
    highlightByLabel:highlightByLabel
  };
}();
