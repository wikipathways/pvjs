var crossPlatformText = {
  canvas: require('./canvas'),
  svg: require('./svg'),
  getInstance: function(args) {
    var targetSelector = args.targetSelector;
    var target = document.querySelector(targetSelector);
    var targetTagName = target.tagName;
    var format;
    var targetImage;

    var htmlContainerElements = [
      'div',
      'section',
      'p'
    ];

    if (!!targetTagName &&
        htmlContainerElements.indexOf(targetTagName.toLowerCase()) > -1) {
      format = args.format;
      targetImage =
        this[format].createTargetImage(crossPlatformTextInstance, target);
    } else {
      format = targetTagName;
      targetImage = target;
    }

    var viewport = this[format].getOrCreateViewport(this, targetImage);
    var crossPlatformTextInstance = Object.create(this);
    crossPlatformTextInstance.targetImage = targetImage;
    Object.keys(this[format]).forEach(function(key) {
      if (!crossPlatformTextInstance[key]) {
        if (typeof crossPlatformTextInstance[key] === 'object') {
          crossPlatformTextInstance[key] =
              Object.create(crossPlatformTextInstance[format][key]);
        } else {
          crossPlatformTextInstance[key] =
              crossPlatformTextInstance[format][key];
        }
      }
    });
    return crossPlatformTextInstance;
  }
};

module.exports = crossPlatformText;
