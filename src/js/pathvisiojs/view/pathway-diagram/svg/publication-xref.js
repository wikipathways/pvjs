pathvisiojs.view.pathwayDiagram.svg.publicationXref = function(){

  function getReferenceNumberForDisplay(pathway, rdfId) {
    var displayNumberForDisplay;
    var i = -1;
    var currentPublicationXref;
    var found = false;

    do {
      i += 1;
      currentPublicationXref = pathway.Biopax.PublicationXref[i];
      if (currentPublicationXref.rdfId === rdfId) {
        found = true;
        displayNumberForDisplay = i + 1;
      }
    } while (found === false && i < pathway.Biopax.PublicationXref.length);

    return displayNumberForDisplay;
  }

  function createPublicationXrefString(displayNumbers) {
    var publicationXrefString;
    if (displayNumbers.length === 1) {
      publicationXrefString = displayNumbers[0];
    }
    else {
      displayNumbers.sort(function(a, b) {
        return a - b;
      });
      var i = 0;
      publicationXrefString = displayNumbers[i].toString();

      if (displayNumbers.length > 2) {
        do {
          i += 1;

          if (displayNumbers[i - 1] + 1 !== displayNumbers[i] || displayNumbers[i] + 1 !== displayNumbers[i + 1]) {
            if (i !== 1) {
              if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
                publicationXrefString += '-' + displayNumbers[i].toString();
              }
              else {
                publicationXrefString += ', ' + displayNumbers[i].toString();
              }
            }
            else {
              publicationXrefString += ', ' + displayNumbers[i].toString();
            }
          }

        } while (i < displayNumbers.length - 2);
      }

      i += 1;

      if (displayNumbers[i - 2] + 2 === displayNumbers[i]) {
        publicationXrefString += '-' + displayNumbers[i].toString();
      }
      else {
        publicationXrefString += ', ' + displayNumbers[i].toString();
      }
    }

    return publicationXrefString;
  }

  function getPublicationXrefString(pathway, rdfIds, callback) {
    var displayNumbers = [];
    rdfIds.forEach(function(rdfId) {
      displayNumbers.push(getReferenceNumberForDisplay(pathway, rdfId));
    });
    console.log('displayNumbers');
    console.log(displayNumbers);
    var publicationXrefString = createPublicationXrefString(displayNumbers);
    callback(publicationXrefString);
  }

  // TODO this isn't tested

  function render(viewport, target, pathway, rdfIds) {
    getPublicationXrefString(pathway, rdfIds, function(publicationXrefString) {
      viewport.append(text).text(publicationXrefString);
    })
  }

  return {
    getPublicationXrefString:getPublicationXrefString,
    render:render
  };
}();
