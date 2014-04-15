// TODO this only works for GPML DataNodes with SVG at present.
pathvisiojs.renderer.highlighter = {
  load: function(svgSelection, data, callback) {
    'use strict';
    var highlighter = this;
    if (!svgSelection || !data) {
      throw new Error("Missing input data.");
    }

    var typeaheadElementValues = [], typeaheadElementValue;
    data.elements.filter(function(element) {return element.gpmlType === 'DataNode';}).forEach(function(node) {
      if (node.hasOwnProperty('textContent')) {
        typeaheadElementValue = node.textContent;
        if (typeaheadElementValues.indexOf(typeaheadElementValue) === -1) {
          typeaheadElementValues.push(typeaheadElementValue);
        }
      }
    });

    // see http://twitter.github.io/typeahead.js/
    $('#highlight-by-label-input').typeahead({
      name: 'Highlight node in pathway',
      local: typeaheadElementValues,
      limit: 10
    });


    /*
       $('.icon-eye-open').click(function(){
       var nodeLabel = $("#highlight-by-label-input").val();
       if (!nodeLabel) {
       console.warn('Error: No data node value entered.');
       }
       else {
       svgRenderer.node.highlightByLabel(svg, nodeLabel);
       }
       });
    //*/
    // see http://api.jquery.com/bind/
    // TODO get selected value better and make function to handle

    $( "#highlight-by-label-input" ).bind("typeahead:selected", function() {
      var typeaheadElementValue = $("#highlight-by-label-input").val();
      if (!typeaheadElementValue) {
        throw new Error("No data node value entered for type-ahead node highlighter.");
      }
      else {
        // TODO refactor this so it calls a generic highlightDataNodeByLabel function that can call
        // a highlighter for svg, png, etc. as appropriate.
        highlighter.highlightByLabel(svgSelection, data, typeaheadElementValue);
      }
    });

    $( "#highlight-by-label-input" ).bind("keypress", pressed);
    function pressed(e) {
      if (e.keyCode === 13)
      {
        // TODO refactor this. it's repeated above.
        var typeaheadElementValue = $("#highlight-by-label-input").val();
        if (!typeaheadElementValue) {
          throw new Error("No data node value entered for type-ahead node highlighter.");
        }
        else {
          // TODO refactor this so it calls a generic highlightDataNodeByLabel function that can call
          // a highlighter for svg, png, etc. as appropriate.
          highlighter.highlightByLabel(svgSelection, data, typeaheadElementValue);
          $("#highlight-by-label-input").typeahead('setQuery', '');
        }
      }
    }

    d3.select('#clear-highlights-from-typeahead').on('click', function() {
      highlighter.clearHighlightsFromTypeahead(svgSelection);
    });
    if (!!callback) {
      callback(null, svgSelection);
    }
  },
  highlight: function(args) {
    'use strict';
    var highlighter = this,
      data = args.data;

    var getSelectors = {
      selectors: function(input) {
        return input;
      },
      label: function(input) {
        var selectors = data.elements.filter(function(element) {
          return element.textContent === input;
        }).map(function(element){
          return '#' + element.id;
        });
        return selectors;
      },
      xref: function(input) {
        var selectors = data.elements.filter(function(element) {
          return element.datasourceReference.filter(function(datasourceReference) {
            // TODO this probably doesn't work. What is the format of an Xref again?
            return input === (datasourceReference.database + datasourceReference.id);
          });
        }).map(function(element){
          return '#' + element.id;
        });
        return selectors;
      }
    };

    var argsEntries = d3.map(args).entries();
    var methodsInGetSelectors = d3.map(getSelectors).keys();
    var i = 0;
    var selectors, method, methodIndex;
    do {
      methodIndex = methodsInGetSelectors.indexOf(argsEntries[i].key);
      if (methodIndex !== -1) {
        method = methodsInGetSelectors[methodIndex];
        selectors = getSelectors[method](argsEntries[i].value);
      }
      i += 1;
    } while ((!selectors) && i < argsEntries.length);

    var cssClass = args.cssClass || 'highlighted-node',
    style = args.style,
    svgId = args.svgId || 'pathvisiojs-diagram';

    var svgSelection = d3.select('#' + svgId);
    var styles, styleString = '';
    if (!!style) {
      styles = d3.map(style).entries();
      styles.forEach(function(styleAttribute) {
        styleString += strcase.paramCase(styleAttribute.key) + ':' + styleAttribute.value + '; ';
      });
    }
    selectors.forEach(function (selector) {
      var selectedElement = svgSelection.select(selector);
      var element = selectedElement[0][0];
      var targetX = element.getBBox().x;
      var targetY = element.getBBox().y;
      var targetHeight = element.getBBox().height;
      var targetWidth = element.getBBox().width;
      var padding = 2.5;
      //TODO get the border width and set the offset based on border width
      var highlighter = svgSelection.select('#viewport').append('rect')
      .attr('x', targetX - padding)
      .attr('y', targetY - padding)
      .attr('class', cssClass)
      .attr('style', styleString + ' pointer-events: none')
      .attr('width', targetWidth + 2 * padding)
      .attr('height', targetHeight + 2 * padding);
    });
  },

  highlightByLabel: function(svgSelection, data, nodeLabel) {
    'use strict';
    var svgId = svgSelection.attr('id') || 'pathvisiojs-diagram';
    svgSelection.selectAll('.highlighted-from-typeahead').remove();
    var args = {};
    args.data = data;
    args.svgId = svgId;
    args.label = nodeLabel;
    args.cssClass = 'highlighted-node highlighted-from-typeahead';
    this.highlight(args);
    d3.select('#clear-highlights-from-typeahead')[0][0].style.visibility = 'visible';
  },

  clearHighlightsFromTypeahead: function(svgSelection) {
    'use strict';
    svgSelection.selectAll('.highlighted-from-typeahead').remove();
    // TODO this won't work well if we have more than one diagram on the page
    var highlightByLabelInput = d3.select('#highlight-by-label-input');
    highlightByLabelInput[0][0].value = '';
    highlightByLabelInput.attr('placeholder', '');
    d3.select('#clear-highlights-from-typeahead')[0][0].style.visibility = 'hidden';
  }
};
