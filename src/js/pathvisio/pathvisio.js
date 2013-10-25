pathvisio = function(){

  // first pass GPML (pathway XML) through an automatic XML to JSON converter, 
  // then make specific modifications to make the JSON well-formatted, then return the JSON
  
  var svg = null;
  var pathway = null;
  var symbolsAvailable = null;

  self.pathway = pathway;

  // get GPML (pathway XML) from WikiPathways (by ID) or a URL (could be a local file or any other accessible GPML source),
  // convert to formatted JSON and return the JSON to the function that called getJson()

  function getJson(url, callback) {
    if (!url) {
      // TODO throw a proper error here

      var error = 'Error: URL not specified.';
      console.warn(error);
      return error;
    }
    else {

      // I would prefer to use d3.xml for the http request in order to not depend on jQuery,
      // but d3.xml doesn't seem to work with IE8. TODO remove dependency on jQuery

      d3.xml(url, function(gpml) {
        pathvisio.converter.gpml.toRenderableJson(gpml, function(json) {
          callback(json);
        });
      });

      // be sure server has set gpml mime type to application/xml or application/gpml+xml

    }
  }

  function highlightByLabel(nodeLabel) {
    svg.selectAll('.highlighted-node').remove();
    var dataNodes = pathway.nodes.filter(function(element) {return element.elementType === 'data-node';});
    var dataNodesWithText = dataNodes.filter(function(element) {return (!!element.textLabel);});
    var selectedNodes = dataNodesWithText.filter(function(element) {return element.textLabel.text.indexOf(nodeLabel) !== -1;});
    selectedNodes.forEach(function(node) {
      var nodeDomElement = svg.select('#nodes-container-' + node.graphId);
      var height = nodeDomElement[0][0].getBBox().height;
      var width = nodeDomElement[0][0].getBBox().width;
      nodeDomElement.append('rect')
      .attr('class', 'highlighted-node')
      .attr('x', -2.5)
      .attr('y', -2.5)
      .attr('width', width + 5)
      .attr('height', height + 5);
    });
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
      function(callback){
        console.log('2');
        args.containerElement.html(pathvisioNS['tmp/pathvisio-js.html']);
        svg = args.containerElement.select('#pathway-image');
        callback(null);
      },
      function(callback) {
        console.log('3');
        loadCustomShapes(args, function() {
          callback(null);
        })
      },
      function(callback) {
        console.log('4');
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
      console.log(err);
      callback(args.svg);
    });
  }


  // get JSON and draw SVG representation of pathway

  function load(args) {

    // Check for minimum required parameters

    if (!args.gpml) { return console.warn('Error: No gpml URL specified as data source for pathvisio.js.'); }

    if (!args.container) { return console.warn('Error: No container selector specified as target for pathvisio.js.'); }
    args.containerElement = d3.select(args.container);
    if (args.containerElement.length !== 1) { return console.warn('Error: Container selector must be matched by exactly one element.'); }

    var gpmlUrl, gpmlSource;
    var gpmlRev = 0;

    // test for whether args.gpml is a WikiPathways ID or a URL

    if (args.gpml.indexOf('.gpml') === -1 && args.gpml.indexOf('.xml') === -1) {
      if (!!args.gpmlRev) {
        gpmlRev = args.gpmlRev;
      }
      gpmlUrl = rootDirectoryUrl + 'remote-data-sources/php/wikipathways.php?data=gpml&id=' + gpmlSource + '&rev=' + gpmlRev;
    }
    else {
      gpmlUrl = args.gpml;
      if (!Modernizr.svg) {
        return console.warn('Error: GPML data source specified is not a WikiPathways ID. WikiPathways does not have access to a visual representation of this GPML.');
      }
    };






    async.parallel({
      partials: function(callback) {
        console.log('1a');
        loadPartials(args, function() {
          callback(null);
        })
      },
      pathway: function(callback){
        console.log('1b');
        getJson(args.gpml, function(json) {
          console.log('json');
          console.log(json);
          callback(null, json);
        })
      }
    },
    function(err, results){
      console.log(err);
      self.results = results;

///*
      if (Modernizr.svg) {
        async.series([
          function(callback){
            //draw(svg, pathway, function() {
            pathvisio.renderer.svg.render(svg, results.pathway, function() {
              callback(null);
            })
          },
          function(callback) {
            svgPanZoom.init({
              'root':args.container + ' svg',
              'enableZoom': false
            });
            callback(null);
          }
        ],
        function(err, results) {
          console.log(err);
        });
      }
      else {
        // TODO use container selector and seadragon for this
        window.setTimeout(function() {
          $('#view').prepend('<img id="pathvisio-java-png" src="http://test3.wikipathways.org/wpi//wpi.php?action=downloadFile&type=png&pwTitle=Pathway:' +  + urlParamList.gpml + '&revision=' + urlParamList.gpmlRev + '" />')
        }, 50);
      }

      /* Node Highlighter

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
//*/

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
/*
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
    */

    });
  }

  return {
    load:load,
    getJson:getJson,
    highlightByLabel:highlightByLabel
  };
}();
