/**
 * JS code to hook into mediawiki divs already in place to
 * generate main pathvisiojs app.
 * It retains the existing toolbar for log in, edit,
 * and download.
 * This code does everything right up to the point where pvjs is
 * integrated, including the creation of the pathvisiojs-container
 * div that pathvisiojs targets.
 */

// master variable for height of pvjs viewer container divs
var viewerHeight = '500px';
var viewerWidth = '100%';
var viewerMinWidth = '700px';
var viewerMaxWidth = '100%';

/**
 *  When page is ready:
 *   1. Grab pwImage div; clean up <a>; remove <img>
 *   2. Prepare new divs inside thumbinner
 *   3. Initialize pathvisiojs app
 */
$(window).ready(function() {
  var pathwayPagePathwayImageContainer = $('#pwImage');

  //i.e., skip for PathwayWidget cases
  if (typeof pathwayPagePathwayImageContainer.get(0) !== 'undefined') {
    if (img.get(0).nodeName.toLowerCase() !== 'img') {
      img = $('#pwImage img');
    }
  }

  // Removes link to stand-alone SVG version of pathway
  if (img.parent().is('a')) {
    var oldParent = img.parent();
    var newParent = oldParent.parent();
    oldParent.after(img);
    oldParent.remove();
  }

  var pathvisiojsContainer = $('<div />')
  .attr('id', 'pathvisiojs-container')
  .css({
    width: viewerWidth,
    'min-width': viewerMinWidth,
    'max-width': viewerMaxWidth,
    height: viewerHeight,
    margin:'0 0 0 0'
  });

  // Make thumbinner larger.
  // TODO this should probably be in the PHP, not the JS.
  var parent = img.parent();
  img.after(pathvisiojsContainer);
  img.remove();
  parent.css({
    width: '100%',
    height: '100%'
  });

  var queryStringParameters = window.getQueryStringAsObject();
  if (Modernizr.inlinesvg) {
    $(window).on('pathvisiojsReady', function() {
      $(function() {
        var colors;
        if (!!queryStringParameters.colors) {
          colors = queryStringParameters.colors.split(',');
        }

        var xrefs = queryStringParameters.xref;
        if (!!xrefs && (typeof(xrefs) === 'string')) {
          xrefs = [xrefs];
        }
        var xrefHighlights = [];
        var xrefIndex = 0;
        _.forEach(xrefs, function(xref) {
          var xrefHighlight = {};
          xrefHighlight.id = xref.split(',')[0];
          xrefHighlight.color = colors[xrefIndex] || colors[0];
          xrefHighlights.push(xrefHighlight);
          xrefIndex += 1;
        });

        var labels = queryStringParameters.label;
        if (!!labels && (typeof(labels) === 'string')) {
          labels = [labels];
        }
        var labelIndex = 0;
        var labelHighlights = [];
        _.forEach(labels, function(label) {
          var labelHighlight = {};
          labelHighlight.id = label;
          labelHighlight.color = colors[labelIndex] || colors[0];
          labelHighlights.push(labelHighlight);
          labelIndex += 1;
        });

        pathvisiojsContainer.pathvisiojs({
          fitToContainer: true,
          manualRender: true,
          sourceData: [{
            uri: window.gpmlFilePath, fileType:'gpml'}, {
            uri: window.pngFilePath, fileType:'png'
          }]
        });

        var pathInstance = pathvisiojsContainer.pathvisiojs('get').pop();

        pathvisiojsNotifications(pathInstance, {
          displayErrors: true, displayWarnings: false
        });

        pathInstance.on('rendered', function() {
          var hi = pathvisiojsHighlighter(pathInstance);

          if (!!labelHighlights && labelHighlights.length > 0) {
            labelHighlights.forEach(function(labelHighlight) {
              hi.highlight(labelHighlight.id, null, {
                fill: labelHighlight.color, stroke: labelHighlight.color
              });
            });
          }

          if (!!xrefHighlights && xrefHighlights.length > 0) {
            xrefHighlights.forEach(function(xrefHighlight) {
              hi.highlight('xref:' + xrefHighlight.id, null, {
                fill: xrefHighlight.color, stroke: xrefHighlight.color
              });
            });
          }
        });

        pathInstance.render();
      });
    });
  }
});
