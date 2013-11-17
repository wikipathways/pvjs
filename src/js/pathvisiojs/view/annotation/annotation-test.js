pathvisiojs.view.annotation = function(){
  function render(annotationData) {
    self.annotationData = annotationData;
    var annotation = d3.select("#annotation")
    .data([annotationData])
    .on("mouseover", function(d, i){
      svgPanZoom.setZoom(false);
    })
    .on("mouseout", function(d, i){
      svgPanZoom.setZoom(true);
    });

    var annotationHeaderText = annotation.select('#annotation-header-text')
    .text(function(d) { return d.header; });

    var annotationDescription = annotation.select('#annotation-description')
    .text(function(d) { return d.description; });

    /*
var p = d3.select("#header").selectAll("p")
    .data(annotationData.listItems)
    .text(function(d) {return d.key;});

// Enter…
p.enter().append("p")
    .text(function(d) {return d.key;});

// Exit…
p.exit().remove();
//*/


    // Update…
    var annotationListItems = annotation.select('ul#annotation-items-container').selectAll('li')
    .data(function(d) {
      self.ali = d;
      return d.listItems;
    });

    // Enter…
    annotationListItems.enter()
    .append('li');

    // Exit…
    annotationListItems.exit().remove();

    var annotationItemTitle = annotationListItems.append('span')
    .attr('class', 'annotation-item-title')
    .text(function(d) {return d.key + ': ';});

    // Update plain text…
    var annotationItemPlainTextElements = annotationListItems.selectAll('span.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        console.log(element);
        if (!element.hasOwnProperty('uri')) {
          return element; 
        }
      }); 
    });

    // Enter plain text…
    annotationItemPlainTextElements.enter()
    .append('span')
    .attr('class', 'annotation-item-text')
    .text(function(d) { return ' ' + d.text; });

    // Update linked text…
    var annotationItemLinkedTextElements = annotationListItems.selectAll('a.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (element.hasOwnProperty('uri')) {
          return element; 
        }
      }); 
    });

    // Enter linked text…
    annotationItemLinkedTextElements.enter()
    .append('a')
    .attr('href', function(d) {return d.uri;})
    .attr('class', 'annotation-item-text')
    .text(function(d) { return ' ' + d.text; });

    annotation[0][0].style.visibility = 'visible';
  }
      
  return {
    render:render
  };
}();
