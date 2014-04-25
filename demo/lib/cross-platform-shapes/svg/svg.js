crossPlatformShapes.svg = {
  init: function(args, callback){
    var width = args.width || '100%',
      height = args.height || '100%',
      backgroundColor = args.backgroundColor || '#ffffff';

    var crossPlatformShapesInstance = this.crossPlatformShapesInstance;
    var viewport, defs;
    if (this.targetTagName !== 'svg') {
      var id = args.id || 'cross-platform-shape-svg';
      targetImageSelection = this.targetSelection.append('svg')
      .attr('id', id)
      .attr('version', '1.1')
      .attr('baseProfile', 'full')
      .attr('xmlns', 'http://www.w3.org/1999/xlink')
      .attr('xmlns:xmlns:xlink', 'http://www.w3.org/1999/xlink')
      .attr('xmlns:xmlns:ev', 'http://www.w3.org/2001/xml-events')
      .attr('preserveAspectRatio', 'xMidYMid')
      .attr('width', width)
      .attr('height', height)
      .attr('style', 'background-color:' + backgroundColor + '; ');

      this.path.targetImageSelection = this.image.targetImageSelection = targetImageSelection;

      defs = targetImageSelection.append('defs')
      .attr('id', 'defs');

      this.marker.targetImageSelectionDefs = defs;

      viewport = targetImageSelection.append('g')
      .attr('id', 'viewport');
    }
    else {
      targetImageSelection = this.targetImageSelection;
      this.path.targetImageSelection = this.image.targetImageSelection = targetImageSelection;
      this.marker.targetImageSelectionDefs = this.targetImageSelection.select('defs');
      viewport = targetImageSelection.select('#viewport');
      if (!viewport[0][0]) {
        viewport = targetImageSelection.select('g');
      }
    }

    //this.path.targetImage = targetImage;
    this.path.availableMarkers = this.marker.availableMarkers = {};
    this.path.backgroundColor = this.marker.backgroundColor = backgroundColor;
    targetImageSelection.attr('style', 'background-color:' + backgroundColor + '; ');

    if (!!callback) {
      callback(viewport);
    }
  }
};
