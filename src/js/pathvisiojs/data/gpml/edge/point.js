pathvisiojs.data.gpml.edge.point = function(){

  var gpmlRelXToJsonSideAndPositionMapping = { 
    '-1.0': {'side': 'left'},
    '-0.5': {'position': 0.25},
    '0.0': {'position': 0.5},
    '0.5': {'position': 0.75},
    '1.0': {'side': 'right'}
  };

  var gpmlRelYToJsonSideAndPositionMapping = { 
    '-1.0': {'side': 'top'},
    '-0.5': {'position': 0.25},
    '0.0': {'position': 0.5},
    '0.5': {'position': 0.75},
    '1.0': {'side': 'bottom'}
  };

  function toRenderableJson(gpmlPoint, callback) {
    var jsonPoint = {};
    try {
      jsonPoint.x = parseFloat(gpmlPoint.attr('X'));
      jsonPoint.y = parseFloat(gpmlPoint.attr('Y'));

      var relX = String(gpmlPoint.attr('RelX'));
      var relY = String(gpmlPoint.attr('RelY'));

      var side;
      var position;
      if (!!relX && !!relY && relX != 'null' && relY != 'null') {
        if (relX == '0.0' && relY == '0.0') {
          jsonPoint.anchorId = gpmlPoint.attr('GraphRef');
        }
        else {
          side = gpmlRelXToJsonSideAndPositionMapping[relX].side !== undefined ? gpmlRelXToJsonSideAndPositionMapping[relX].side : gpmlRelYToJsonSideAndPositionMapping[relY].side;
          position = gpmlRelXToJsonSideAndPositionMapping[relX].position !== undefined ? gpmlRelXToJsonSideAndPositionMapping[relX].position : gpmlRelYToJsonSideAndPositionMapping[relY].position;
          jsonPoint.anchorId = String(gpmlPoint.attr('GraphRef')) + String(side) + String(position);
        }
      }

      callback(jsonPoint);
    }
    catch (e) {
      console.log("Error converting point to json: " + e.message);
      return e;
    }
  }

  function convertGpmlPositionToJsonPosition(relX, relY) {
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
