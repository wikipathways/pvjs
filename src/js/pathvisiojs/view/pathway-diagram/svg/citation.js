pathvisiojs.view.pathwayDiagram.svg.citation = function(){

  function getReferenceNumberForDisplay(pathway, rdfId) {
    var referenceNumberForDisplay;
    var i = -1;
    var currentPublicationXref;
    var found = false;

    do {
      i += 1;
      currentPublicationXref = pathway.Biopax.PublicationXref[i];
      if (currentPublicationXref.rdfId === rdfId) {
        found = true;
        referenceNumberForDisplay = i + 1;
      }
    } while (found === false && i < pathway.Biopax.PublicationXref.length);

    return referenceNumberForDisplay;
  }

  function createCitationString(referenceNumbers) {
    var citationString;
    if (referenceNumbers.length === 1) {
      citationString = referenceNumbers[0];
    }
    else {
      referenceNumbers.sort(function(a, b) {
        return a - b;
      });
      var i = 0;
      citationString = referenceNumbers[i].toString();

      if (referenceNumbers.length > 2) {
        do {
          i += 1;

          if (referenceNumbers[i - 1] + 1 !== referenceNumbers[i] || referenceNumbers[i] + 1 !== referenceNumbers[i + 1]) {
            if (i !== 1) {
              if (referenceNumbers[i - 2] + 2 === referenceNumbers[i]) {
                citationString += '-' + referenceNumbers[i].toString();
              }
              else {
                citationString += ', ' + referenceNumbers[i].toString();
              }
            }
            else {
              citationString += ', ' + referenceNumbers[i].toString();
            }
          }

        } while (i < referenceNumbers.length - 2);
      }

      i += 1;

      if (referenceNumbers[i - 2] + 2 === referenceNumbers[i]) {
        citationString += '-' + referenceNumbers[i].toString();
      }
      else {
        citationString += ', ' + referenceNumbers[i].toString();
      }
    }

    return citationString;
  }

  function getCitationString(pathway, rdfIds, callback) {
    var referenceNumbers = [];
    rdfIds.forEach(function(rdfId) {
      referenceNumbers.push(getReferenceNumberForDisplay(pathway, rdfId));
    });
    console.log('referenceNumbers');
    console.log(referenceNumbers);
    var citationString = createCitationString(referenceNumbers);
    callback(citationString);
  }

  // TODO this isn't tested

  function render(viewport, target, pathway, rdfIds) {
    getCitationString(pathway, rdfIds, function(citationString) {
      viewport.append(text).text(citationString);
    })
  }

  return {
    getCitationString:getCitationString,
    render:render
  };
}();
