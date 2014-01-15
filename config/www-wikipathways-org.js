"use strict";

pathvisiojs.config = function() {
  var gpmlSourceUriStub = function() {
    return 'http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:';
  }

  return {
    gpmlSourceUriStub:gpmlSourceUriStub
  };
}();
