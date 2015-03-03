// Note: the view (HTML) for this annotation panel is in pvjs.html
var fs = require('fs');
var insertCss = require('insert-css');
var Spinner = require('spin.js');

var css = [
  fs.readFileSync(__dirname + '/annotation-panel.css'),
];

module.exports = function() {
  'use strict';

  css.map(insertCss);

  function render(pvjs, annotationData) {
    var annotation = pvjs.$element.select('.annotation')
    .data([annotationData]);

    //Special drag code to update absolute position of annotation panel
    var dragAbs = d3.behavior.drag()
    .on('drag', function(d, i) {
      var dright = parseInt(annotation.style('right'), 10);
      var dtop = parseInt(annotation.style('top'), 10);
      dright -= d3.event.dx;
      dtop += d3.event.dy;
      annotation.style('right', dright + 'px');
      annotation.style('top', dtop + 'px');
    });

    var annotationHeaderText = annotation.select('.annotation-header-text')
    /*
    .style('font-size', function(d) {
      return '10px';
    })
    //*/
    .text(function(d) { return d.header; });

    var annotationHeaderTextWidth = annotationHeaderText[0][0]
      .getBoundingClientRect().width;
    var annotationHeaderTextSize = 22; // TODO this is bad if it gets changed in the CSS and not here.
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
    var detailsSearchUri = annotation.select('.annotation-header-search').select('p')
     .attr('title', function(d) {return 'Search for pathways containing ' + d.header; })
     .on('click', function(d) { window.open(pathwaySearchUriStub + d.header, '_blank'); });
     //*/

    var annotationIconMove = annotation.select('i.icon-move')
    .on('mousedown', function(d, i) {
      //add dragAbs function when icon is pressed
      annotation.call(dragAbs);
    })
    .on('mouseup', function(d, i) {
      //nullify dragAbs when icon is released; simulates drag behaviour via icon
      annotation.on('mousedown.drag', null);
    });

    var annotationIconRemove = annotation.select('i.icon-remove')
    .on('click', function(d, i) {
      annotation[0][0].style.visibility = 'hidden';
    });

    var annotationDescription = annotation.select('.annotation-description')
    .text(function(d) { return d.description; });

    var annotationListItemsContainer = annotation.selectAll(
        '.annotation-items-container-list')
    .data(function(d) {
      // TODO handle the pre-loading spinner better.
      // Currently, the annotationData passed in when pre-loading
      // is null.
      // We want to show the spinner during preloading (while the
      // annotationData is loading) and then removing it after.
      if (!d.listItems[0]) {
        var spinnerContainer = annotationDescription.append('div')
        .attr('id', 'annotation-panel-loading')
        .style('height', '100px')[0][0];

        var spinnerOptions = {
          lines: 13, // The number of lines to draw
          length: 10, // The length of each line
          width: 5, // The line thickness
          radius: 15, // The radius of the inner circle
          corners: 1, // Corner roundness (0..1)
          rotate: 0, // The rotation offset
          direction: 1, // 1: clockwise, -1: counterclockwise
          color: '#000', // #rgb or #rrggbb or array of colors
          speed: 1, // Rounds per second
          trail: 60, // Afterglow percentage
          shadow: false, // Whether to render a shadow
          hwaccel: false, // Whether to use hardware acceleration
          className: 'spinner', // The CSS class to assign to the spinner
          zIndex: 2e9, // The z-index (defaults to 2000000000)
          top: '50%', // Top position relative to parent
          left: '50%' // Left position relative to parent
        };

        var spinner = new Spinner(spinnerOptions).spin(spinnerContainer);

        /*
        annotationDescription.append('p').html(
            '<font color="red">' + d.listItems[0] + '</font>');
        //*/
        return [{'key':'clear', 'values':[{'clear': 'clear'}]}];
      } else {
        return [d.listItems];
      }
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

    annotation[0][0].style.visibility = 'visible';
  }

  return {
    render:render
  };
}();
