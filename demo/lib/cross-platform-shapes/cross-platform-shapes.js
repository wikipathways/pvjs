var crossPlatformShapes = {
  init: function(args, callback){
    var customShapes = args.customShapes;
    var crossPlatformShapesInstance = this;
    this.svg.crossPlatformShapesInstance = this.svg.path.crossPlatformShapesInstance = crossPlatformShapesInstance;

    var targetSelector = args.targetSelector;
    var target = document.querySelector(targetSelector);
    var targetTagName = target.tagName.toLowerCase();
    var targetSelection = d3.select(target);
    var format, targetImageSelection;

    if (targetTagName === 'div') {
      format = args.format;
      this[format].targetSelection = targetSelection;
      this.setFormat(format, customShapes, targetTagName, targetSelection);
      crossPlatformShapesInstance[format].init(args, function(viewport) {
        if (!!callback) {
          callback(viewport);
        }
      });
    }
    else {
      format = targetTagName;
      this[format].targetImageSelection = targetSelection;
      this.setFormat(format, customShapes, targetTagName, targetSelection);
      this[format].init(args, function(viewport) {
        if (!!callback) {
          callback(viewport);
        }
      });
    }
  },
  setFormat: function(format, customShapes, targetTagName, targetSelection) {
    var crossPlatformShapesInstance = this;
    this[format].targetTagName = targetTagName;
    var presetShapesNames = [
      'arc',
      'arrow',
      'brace',
      'complex',
      'endoplasmicReticulum',
      'golgiApparatus',
      'hexagon',
      'lineCurved',
      'lineElbow',
      'lineSegmented',
      'lineStraight',
      'mimDegradation',
      'mitochondria',
      'ellipseDouble',
      'ellipse',
      'pentagon',
      'rectangle',
      'roundedRectangleDouble',
      'roundedRectangle',
      'sarcoplasmicReticulum',
      'triangle',
      'mimNecessaryStimulation',
      'mimBinding',
      'mimConversion',
      'mimStimulation',
      'mimModification',
      'mimCatalysis',
      'mimInhibition',
      'mimCleavage',
      'mimCovalentBond',
      'mimTranscriptionTranslation',
      'mimGap',
      'tBar',
      'mimBranchingLeft',
      'mimBranchingRight'
    ];
    presetShapesNames.forEach(function(presetShapeName) {
      crossPlatformShapesInstance[presetShapeName] = function(data, callback){
        return crossPlatformShapesInstance[format].path.render(presetShapeName, data, callback);
      };
    });

    if (!!customShapes) {
      crossPlatformShapesInstance.customShapes = customShapes;
      crossPlatformShapesInstance[format].image.customShapes = customShapes;
      d3.map(customShapes).keys().forEach(function(customShapeName) {
        crossPlatformShapesInstance[customShapeName] = function(data, callback){
          return crossPlatformShapesInstance[format].image.render(customShapeName, data, callback);
        };
      });
    }
  }
};

/*
arc
arrow
brace
complex
endoplasmic-reticulum
golgi-apparatus
hexagon
line-curved
line-elbow
line-segmented
line-straight
mim-degradation
mitochondria
ellipse-double
ellipse
pentagon
rectangle
rounded-rectangle-double
rounded-rectangle
sarcoplasmic-reticulum
triangle
mim-necessary-stimulation
mim-binding
mim-conversion
mim-stimulation
mim-modification
mim-catalysis
mim-inhibition
mim-cleavage
mim-covalent-bond
mim-transcription-translation
mim-gap
t-bar
mim-branching-left
mim-branching-right

arc
arrow
brace
complex
endoplasmicReticulum
golgiApparatus
hexagon
lineCurved
lineElbow
lineSegmented
lineStraight
mimDegradation
mitochondria
ellipseDouble
ellipse
pentagon
rectangle
roundedRectangleDouble
roundedRectangle
sarcoplasmicReticulum
triangle
mimNecessaryStimulation
mimBinding
mimConversion
mimStimulation
mimModification
mimCatalysis
mimInhibition
mimCleavage
mimCovalentBond
mimTranscriptionTranslation
mimGap
tBar
mimBranchingLeft
mimBranchingRight
//*/
