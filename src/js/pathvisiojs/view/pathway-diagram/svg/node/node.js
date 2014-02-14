pathvisiojs.view.pathwayDiagram.svg.node = function(){
  'use strict';
  function dragmove(d) {
    /*
    console.log(d3.event.x);
    console.log('d');
    console.log(d);
    console.log(d.id);
    console.log('this');
    console.log(this);
    //*/
    // don't have anchors rendered yet
    /*
    var changingAnchors = pathwayHere.elements.filter(function(element) {return element.parentId === d.id});
    var d3Node = self.d3Node = d3.select(this);
    console.log('changingAnchors');
    console.log(changingAnchors);
    d3Node.attr('transform', function(d) {return 'translate(' + d3.event.x + ' ' + d3.event.y + ')';});
    changingAnchors.forEach(function(anchor){
      console.log('anchor');
      console.log(anchor);
      console.log(d3Node);
      self.d3Node = d3Node;
      self.anchor = anchor;
      anchor.x = d3Node.select('#' + anchor.id)[0][0].getCTM().e;
      anchor.y = d3Node.select('#' + anchor.id)[0][0].getCTM().f; 
    })
    //*/
    d.x = d3.event.x;
    d.y = d3.event.y;


    /*
    var args = {};
    args.svg = d3.select('svg');
    args.pathway = pathwayHere;
    args.uniformlyScalingShapesList = uniformlyScalingShapesListHere;
    pathvisiojs.view.pathwayDiagram.svg.render(args, function(){console.log('rendered after drag');});
    */
  }

  function render(args, callback) {
    if (!args) {
      throw new Error('Need input args to render a node.');
    }

    var nodeContainer = args.element,
      data = args.data,
      pathway = args.pathway,
      parentDataElement,
      translatedX,
      translatedY;

    if (!pathway) {
      throw new Error('Need a pathway to render a node.');
    }
    if (!nodeContainer) {
      throw new Error('Need a nodeContainer to render a node.');
    }
    if (!data) {
      throw new Error('Need input data to render a node.');
    }

    if (data.hasOwnProperty('isContainedBy')) {
      parentDataElement = pathway.elements.filter(function(element) {
        return element['id'] === data.isContainedBy;
      })[0];
      translatedX = data.x - parentDataElement.x;
      translatedY = data.y - parentDataElement.y;
    }
    else {
      translatedX = data.x;
      translatedY = data.y;
    }

    /************ 
     * container
     * *********/

    var drag = d3.behavior.drag()
      .origin(Object)
      .on("drag", dragmove);

    nodeContainer.attr('transform', function(d) {
      return 'translate(' + translatedX + ' ' + translatedY + ')';
    })
    .attr("style", function (d) {
      var style = '';
      if (d.hasOwnProperty('backgroundColor')) {
	if (d.ShapeType == 'brace' || d.ShapeType == 'arc'){ 
	  //Brace color is NOT for fill and should always be transparent
	  style = 'fill-opacity:0; ';
	} 
        else if (d.nodeType == 'Label' && d.backgroundColor == '#ffffff'){  
	  //Label fill attr is programmatically IGNORED when set to Java editor default of white.
	  //This is obviously a hack that should ultimately be resolved by fixing the editor's 
	  // default for label backgroundColor.
	  style = '' ;
	}
	else {
          style = 'fill:' + d.backgroundColor + '; fill-opacity:1; ';
	}
      }
      return style;
    })
    .call(drag)



    /****************** 
     * background shape
     * ***************/

    var shapeType = strcase.paramCase(data.ShapeType);
    
    // check for whether desired shape type is available as a symbol
//    if (pathvisiojs.view.pathwayDiagram.svg.symbol.semanticNameToIdMapping.hasOwnProperty(shapeType)) {
      //console.log('We will use an SVG "use" element to render this ' + shapeType);
//      pathvisiojs.view.pathwayDiagram.svg.node.useElement.render(nodeContainer, data);
//    }
    // else check for whether it is available as a pathShape
//    else {
      //console.log('We will use a pathShape to render this ' + shapeType);
      pathvisiojs.view.pathwayDiagram.svg.node.pathShape.render(nodeContainer, data);
//    }

    /****************** 
     * text label
     * ***************/

    if (data.hasOwnProperty('text')) {
      pathvisiojs.view.pathwayDiagram.svg.node.text.render(nodeContainer, data);
    }

    /****************** 
     * citation(s)
     * ***************/

    if (data.hasOwnProperty('PublicationXref')) {
      pathvisiojs.view.pathwayDiagram.svg.publicationXref.render(nodeContainer, 'node', args.pathway, data.PublicationXref);
    }

    callback(nodeContainer);
  }

  /*
  function renderAll(nodes, pathway, allSymbolNames) {
    if (!nodes || !pathway || !allSymbolNames) {
      //console.log(args.allSymbolNames);
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      if (!args.allSymbolNames) {
        console.log('args.allSymbolNames not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes, pathway or args.allSymbolNames.');
    }

    var nonuniformlyScalingNodes = nodes.filter(function(d, i) { return allSymbolNames.indexOf(d.shapeType) === -1; });

    // Update… 
    var nodes = nonuniformlyScalingNodes.selectAll("path.shape")
    .data(function(d) {
      return nonuniformlyScalingNodes;
    })
    .call(render);

    // Enter…
    nodes.enter().append("path")
    .call(render);

    // Exit…
    nodes.exit().remove();

  }
  //*/

  function getPortCoordinates(boxDimensions, relX, relY) {
    var port = {};
    port.x = boxDimensions.x + (relX * boxDimensions.width);
    port.y = boxDimensions.y + (relY * boxDimensions.height);
    return port;
  }

  function highlight(args) {
    var getSelector = {
      selector: function(input) {
        return input;
      },
      label: function(input) {
        var selector = '.' + pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName('label-' + decodeURIComponent(input));
        return selector;
      },
      xref: function(input) {
        var selector = '.' + pathvisiojs.view.pathwayDiagram.svg.convertToCssClassName('xref-' + decodeURIComponent(input));
        return selector;
      }
    };

    var argsEntries = d3.map(args).entries();
    var methodsInGetSelector = d3.map(getSelector).entries();
    var i = 0;
    var selector, method;
    do {
      method = methodsInGetSelector.filter(function(methodsInGetSelector){return methodsInGetSelector.key === argsEntries[i].key;});
      if (method.length > 0) {
        selector = method[0].value(argsEntries[i].value);
      }
      i += 1;
    } while ((!selector) && i < argsEntries.length);

    var cssClass = args.cssClass || 'highlighted-node',
    style = args.style,
    svgId = args.svgId || 'pathvisiojs-diagram';

    var svg = d3.select('#' + svgId);
    var styles, styleString = '';
    if (!!style) {
      styles = d3.map(style).entries();
      styles.forEach(function(styleAttribute) {
        styleString += strcase.paramCase(styleAttribute.key) + ':' + styleAttribute.value + '; ';
      });
    }
    var selectedNodes = svg.selectAll(selector);
    selectedNodes.each(function() {
      var node = d3.select(this);
      var height = node[0][0].getBBox().height;
      var width = node[0][0].getBBox().width; 
      //TODO get the border width and set the offset based on border width
      var highlighter = node.append('rect') 
      .attr('x', -2.5)
      .attr('y', -2.5)
      .attr('class', cssClass)
      .attr('style', styleString)
      .attr('width', width + 5)
      .attr('height', height + 5);
    });
  }  

  function highlightByLabel(svg, pathway, nodeLabel) {
    var svgId = svg.attr('id') || 'pathvisiojs-diagram';
    svg.selectAll('.highlighted-from-typeahead').remove();
    var args = {};
    args.svgId = svgId;
    args.label = nodeLabel;
    args.cssClass = 'highlighted-node highlighted-from-typeahead';
    highlight(args);
    d3.select('#clear-highlights-from-typeahead')[0][0].style.visibility = 'visible';
  }

  function clearHighlightsFromTypeahead(svgId) {
    svgId = svgId || 'pathvisiojs-diagram';
    var svg = d3.select('#' + svgId);
    svg.selectAll('.highlighted-from-typeahead').remove();
    // TODO this won't work well if we have more than one diagram on the page
    d3.select('#highlight-by-label-input')[0][0].value = '';
    d3.select('#clear-highlights-from-typeahead')[0][0].style.visibility = 'hidden';
  }

  return {
    //renderAll:renderAll,
    render:render,
    getPortCoordinates:getPortCoordinates,
    highlight:highlight,
    highlightByLabel:highlightByLabel,
    clearHighlightsFromTypeahead:clearHighlightsFromTypeahead
  };
}();
