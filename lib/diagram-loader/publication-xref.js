var Utils = require('./../utils.js');

module.exports = {
  getReferenceNumberForDisplay: function(pvjs, rdfId) {
    var model = pvjs.kaavioOptions.pvjson;
    var displayNumber;
    var referencedElements = model.elements.filter(function(element) {
      return rdfId === element.id && element.type === 'PublicationXref';
    });
    if (!!referencedElements && referencedElements.length > 0) {
      displayNumber = referencedElements[0].displayName;
    }
    /*
    var i = -1;
    var currentPublicationXref;
    var found = false;

    do {
      i += 1;
      currentPublicationXref = model.Biopax.PublicationXref[i];
      if (typeof currentPublicationXref != 'undefined'){
        if (currentPublicationXref.rdfId === rdfId) {
          found = true;
          displayNumber = i + 1;
        }
      }
    } while (found === false && i < model.Biopax.PublicationXref.length);
    //*/

    return displayNumber;
  },

  // Create a string of citation numbers for display,
  // delimited by commas, and
  // replacing any consecutive series of numbers with the
  // first and last joined by a hyphen.
  createPublicationXrefString: function(displayNumbers) {
    var publicationXrefString;
    if (displayNumbers.length === 1) {
      publicationXrefString = displayNumbers[0];
    } else {
      displayNumbers.sort(function(a, b) {
        return a - b;
      });
      var i = 0;
      publicationXrefString = displayNumbers[i].toString();

      if (displayNumbers.length > 2) {
        do {
          i += 1;

          if (displayNumbers[i - 1] + 1 !== displayNumbers[i] ||
              displayNumbers[i] + 1 !== displayNumbers[i + 1]) {
            if (i !== 1) {
              if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
                publicationXrefString += '-' + displayNumbers[i].toString();
              } else {
                publicationXrefString += ', ' + displayNumbers[i].toString();
              }
            } else {
              publicationXrefString += ', ' + displayNumbers[i].toString();
            }
          }

        } while (i < displayNumbers.length - 2);
      }

      i += 1;

      if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
        publicationXrefString += '-' + displayNumbers[i].toString();
      } else {
        publicationXrefString += ', ' + displayNumbers[i].toString();
      }
    }

    return publicationXrefString;
  },

  getPublicationXrefString: function(pvjs, rdfIds, callback) {
    var that = this;
    var model = pvjs.kaavioOptions.pvjson;
    var displayNumbers = [];
    var publicationXrefString = '';
    // make sure it's an array
    rdfIds = Utils.convertToArray(rdfIds);
    rdfIds.forEach(function(rdfId) {
      var num = that.getReferenceNumberForDisplay(pvjs, rdfId);
      if (typeof(num) !== 'undefined' && num !== null) {
        displayNumbers.push(num);
      }
    });

    if (displayNumbers.length > 0) {
      publicationXrefString = this.createPublicationXrefString(displayNumbers);
    }
    callback(publicationXrefString);
  },

  //function render(target, targetType, pathway, rdfIds) {
  render: function(pvjs, containerSelection, targetData) {
    var translateX;
    var translateY;
    var networkType;

    if (targetData.hasOwnProperty('points')) {
      networkType = 'edge';
    } else {
      networkType = 'node';
    }
    /* targetType can be any of the following:
     * node
     * edge
     * not currently but maybe in the future: diagram (applies to the whole pathway)
    //*/

    var text;
    this.getPublicationXrefString(pvjs, targetData.xrefs, function(publicationXrefString) {
      var textLength = publicationXrefString.toString().length;
      if (networkType === 'node') {
        // TODO targetData.width, x, and y are not available yet here,
        // so the translateX and translateY will always be 0.
        // refactor to be able to calculate these values.
        var nodeWidth = targetData.width;
        var offsetX = nodeWidth - textLength * 3 / 2 - 2;
        translateX = targetData.x + offsetX || 0;
        translateY = targetData.y - 4 || 0;
        containerSelection.append('text')
        .attr('class', 'citation')
        .attr('transform', function(d) {return 'translate(' + translateX + ' ' + translateY + ')';})
        .text(publicationXrefString);
      } else {
        // TODO don't repeat svg definition
        if (networkType === 'edge') {
          var publicationXrefPosition = 0.5;
          var edgeElement = window.d3.select('#' + targetData.id)[0][0];
          var totalLength = edgeElement.getTotalLength();
          var point = edgeElement.getPointAtLength(publicationXrefPosition * totalLength);
          var offset = -4;
          translateX = point.x + offset - textLength * 3;
          translateY = point.y + offset;

          text = containerSelection.append('text')
          .attr('class', 'citation')
          .attr('transform', function(d) {
            return 'translate(' + translateX + ' ' + translateY + ')';
          })
          .text(publicationXrefString);

          /*
           * This had a problem with displaying text upside down sometimes,
           * depending on the orientation of the associated edge
          text.append('textPath')
          .attr('xlink:xlink:href', '#' + targetData.id)
          .attr('startOffset', '50%')
          .text(publicationXrefString);
          //*/

        } else {
          throw new Error('Pvjs cannot render a citation for targets of this type: ' + networkType);
        }
      }
    });

  }
};
