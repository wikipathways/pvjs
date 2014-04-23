module.exports = function(){
  'use strict';

  var pathwaySearchUriStub = '/index.php?title=Special:SearchPathways&doSearch=1&query=';

  function render(pvjs, annotationData) {
    var annotation = pvjs.$element.select(".annotation")
    .data([annotationData]);

    //Special drag code to update absolute position of annotation panel
    var dragAbs = d3.behavior.drag()
    .on("drag", function(d,i){
      var dright = parseInt(annotation.style("right"), 10);
      var dtop = parseInt(annotation.style("top"), 10);
      dright -= d3.event.dx;
      dtop += d3.event.dy;
      annotation.style("right", dright+"px");
      annotation.style("top", dtop+"px");
    });


    var annotationHeaderText = annotation.select('.annotation-header-text')
    /*
    .style('font-size', function(d) {
      return '10px';
    })
    //*/
    .text(function(d) { return d.header; });

    var annotationHeaderTextWidth = annotationHeaderText[0][0].getBoundingClientRect().width;
    var annotationHeaderTextSize = 22; // TODO this is bad if it gets changed in the CSS and not here.
    if (annotationHeaderTextWidth > 190) {
      do {
        annotationHeaderTextSize -= 1;
        annotationHeaderText.style('font-size', annotationHeaderTextSize + 'px');
        annotationHeaderTextWidth = annotationHeaderText[0][0].getBoundingClientRect().width;
      } while (annotationHeaderTextWidth > 190 || annotationHeaderTextSize < 7); // font-size of 6 is really small.
    }

    var detailsSearchUri = annotation.select('.annotation-header-search').select('a')
    .attr('href', function(d) {
      // TODO make this generic
      return pathwaySearchUriStub + d.header;
     })
     .attr('title', function(d) {return 'Search for pathways containing ' + d.header; });

    var annotationIconMove = annotation.select('i.icon-move')
    .on("mousedown", function(d, i){
      //add dragAbs function when icon is pressed
      annotation.call(dragAbs);
    })
    .on("mouseup", function(d, i){
      //nullify dragAbs when icon is released; simulates drag behaviour via icon
      annotation.on('mousedown.drag', null);
    });

    var annotationIconRemove = annotation.select('i.icon-remove')
    .on("click", function(d, i){
      annotation[0][0].style.visibility = 'hidden';
    });

    var annotationDescription = annotation.select('.annotation-description')
    .text(function(d) { return d.description; });

    var annotationListItemsContainer = annotation.selectAll('.annotation-items-container-list')
    .data(function(d) {
      //if a single string, then check for special case: img src for loading gif
      if (typeof d.listItems[0] === 'string'){
       if (d.listItems[0].split('.').pop() == 'gif'){
         annotationDescription.append('br');
         annotationDescription.append('br');
         annotationDescription.append('img').attr('src', d.listItems[0]).attr('style', 'width: 20px');
       } else { //display the custom text
         annotationDescription.append('p').html('<font color="red">'+d.listItems[0]+'</font>');
       }
        //fake item list that effectively clears the display while loading gif is active
        return [{"key":"clear","values":[{"clear": "clear"}]}];
      } else {
      //debug//console.log([d.listItems]);
      return [d.listItems];
      }
    });

    //debug//console.log(annotationListItemsContainer);

    // Update
    var annotationListItems = annotationListItemsContainer.selectAll('li')
    .data(function(d) {
      //debug//console.log('d annotationListItems');
      //debug//console.log(d);
      return d;
    });

    // Enter
    annotationListItems.enter().append('li');

    // Exit…
    annotationListItems.exit().remove();

    var annotationItemTitles = annotationListItems.selectAll('.annotation-item-title')
    .data(function(d) {
      //debug//console.log('d annotationListItems');
      //debug//console.log(d);
      return [d.key];
    })
    .text(function(d) {return d + ': ';});
    //Enter
    annotationItemTitles
    .enter().append('span')
    .attr('class', 'annotation-item-title')
    .text(function(d) {return d + ': ';});
    //Exit
    annotationItemTitles.exit().remove();

    // Update
    var annotationItemPlainTextElements = annotationListItems.selectAll('span.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (!element.hasOwnProperty('uri')) {
          //debug//console.log('annotationItemPlainTextElement');
          //debug//console.log(element);
          return element;
        }
      });
    })
    .text(function(d) { return ' ' + d.text; });
    // Enter
    annotationItemPlainTextElements.enter()
    .append('span')
    .attr('class', 'annotation-item-text')
    .text(function(d) { return ' ' + d.text; });
    // Exit
    annotationItemPlainTextElements.exit().remove();

    // Update
    var annotationItemLinkedTextElements = annotationListItems.selectAll('a.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (element.hasOwnProperty('uri')) {
          return element;
        }
      });
    })
    .attr('href', function(d) {return d.uri;})
    .attr('class', 'annotation-item-text')
    .text(function(d) {return ' ' + d.text; });
    // Enter
    annotationItemLinkedTextElements.enter()
    .append('a')
    .attr('href', function(d) {return d.uri;})
    .attr('class', 'annotation-item-text')
    .text(function(d) {return ' ' + d.text; });
    // Exit
    annotationItemLinkedTextElements.exit().remove();

    annotation[0][0].style.visibility = 'visible';
  }

  return {
    render:render,
    pathwaySearchUriStub:pathwaySearchUriStub
  };
}();
