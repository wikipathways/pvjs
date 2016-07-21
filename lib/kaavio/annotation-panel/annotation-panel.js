// Note: the view (HTML) for this annotation panel
// is current created in kaavio.js
// TODO move it into here
var fs = require('fs');
var insertCss = require('insert-css');

var css = [
  fs.readFileSync(__dirname + '/annotation-panel.css'),
];

module.exports = function() {
  'use strict';

  css.map(insertCss);

  function render(annotationElementOrSelector, annotationData) {
    var annotationSelection = d3.select(annotationElementOrSelector)
    .data([annotationData]);

    //Special drag code to update absolute position of annotation panel
    var dragAbs = d3.behavior.drag()
    .on('drag', function(d, i) {
      var dright = parseInt(annotationSelection.style('right'), 10);
      var dtop = parseInt(annotationSelection.style('top'), 10);
      dright -= d3.event.dx;
      dtop += d3.event.dy;
      annotationSelection.style('right', dright + 'px');
      annotationSelection.style('top', dtop + 'px');
    });

    var annotationHeaderText = annotationSelection.select('.annotation-header-text')
    /*
    .style('font-size', function(d) {
      return '10px';
    })
    //*/
    .text(function(d) { return d.header; });

    var annotationHeaderTextWidth = annotationHeaderText[0][0]
      .getBoundingClientRect().width;
    // TODO this is bad if it gets changed in the CSS and not here.
    var annotationHeaderTextSize = 22;
    if (annotationHeaderTextWidth > 190) {
      do {
        annotationHeaderTextSize -= 1;
        annotationHeaderText
          .style('font-size', annotationHeaderTextSize + 'px');

        annotationHeaderTextWidth = annotationHeaderText[0][0]
          .getBoundingClientRect().width;
        // font-size of 6 is really small, so we won't go any smaller than that
      } while (annotationHeaderTextWidth > 190 || annotationHeaderTextSize < 7);
    }

    /*
    var detailsSearchUri = annotationSelection.select('.annotation-header-search').select('p')
     .attr('title', function(d) {return 'Search for pathways containing ' + d.header; })
     .on('click', function(d) { window.open(pathwaySearchUriStub + d.header, '_blank'); });
     //*/

    var annotationIconMove = annotationSelection.select('i.icon-move')
    .on('mousedown', function(d, i) {
      //add dragAbs function when icon is pressed
      annotationSelection.call(dragAbs);
    })
    .on('mouseup', function(d, i) {
      //nullify dragAbs when icon is released; simulates drag behaviour via icon
      annotationSelection.on('mousedown.drag', null);
    });

    var annotationIconRemove = annotationSelection.select('i.icon-remove')
    .on('click', function(d, i) {
      annotationSelection[0][0].style.visibility = 'hidden';
    });

    var annotationDescription = annotationSelection.select('.annotation-description')
    .text(function(d) { return d.description; });

    var annotationListItemsContainer = annotationSelection.selectAll(
        '.annotation-items-container-list')
    .data(function(d) {
      // TODO handle the pre-loading spinner better.
      // Currently, the annotationData passed in when pre-loading
      // is null.
      // We want to show the spinner during preloading (while the
      // annotationData is loading) and then remove it after.
      var listItemCount = d.listItems.length;
      if (listItemCount <= 2) {
        /*
        // keep spinning
        // TODO this doesn't work yet, partly because the parent element does not
        // have the styles set as required by the ariutta-loading CSS.
        annotationDescription.append('div')
          .attr('id', 'annotation-panel-loading ariutta-loading')
          .style('height', '100px');
        //*/

        if (listItemCount === 0) {
          // NOTE: placeholder values
          d.listItems = {'key':'clear', 'values':[{'clear': 'clear'}]};
          /* TODO was this here just for testing? Can we delete it?
          annotationDescription.append('p').html(
              '<font color="red">' + d.listItems[0] + '</font>');
          //*/
        }
      }

      return [d.listItems];
    });

    // Update
    var annotationListItems = annotationListItemsContainer.selectAll('li')
    .data(function(d) {
      return d;
    });

    // Enter
    annotationListItems.enter().append('li');

    // Exit…
    annotationListItems.exit().remove();

    var annotationItemTitles = annotationListItems.selectAll(
        '.annotation-item-title')
    .data(function(d) {
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
    var annotationItemPlainTextElements = annotationListItems.selectAll(
        'span.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (!element.hasOwnProperty('uri')) {
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
    var annotationItemLinkedTextElements = annotationListItems.selectAll(
        'a.annotation-item-text')
    .data(function(d) {
      return d.values.filter(function(element) {
        if (element.hasOwnProperty('uri')) {
          return element;
        }
      });
    })
    .attr('class', 'annotation-item-text')
    .text(function(d) {return ' ' + d.text; })
    .on('click', function(d) { window.open(d.uri, '_blank'); });
    // Enter
    annotationItemLinkedTextElements.enter()
    .append('a')
    .attr('class', 'annotation-item-text')
    .text(function(d) {return ' ' + d.text; })
    .on('click', function(d) { window.open(d.uri, '_blank'); });
    // Exit
    annotationItemLinkedTextElements.exit().remove();

    var annotationElement = annotationSelection[0][0];
    annotationElement.querySelector('.annotation-items-container-list')
      .classList.remove('ariutta-loading');
    annotationElement.style.visibility = 'visible';
  }

  return {
    render:render
  };
}();
