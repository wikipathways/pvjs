function getGroupDimensions(groupId) {
  var groupMembers = pathway.labelableElements.filter(function(el) {return (el.groupRef === groupId)});
  var group = {};

  // I think this is margin, not padding, but I'm not sure

  var margin = 12;
  group.x = (d3.min(groupMembers, function(el) {return el.x})) - margin;
  group.y = (d3.min(groupMembers, function(el) {return el.y})) - margin;

  group.width = (d3.max(groupMembers, function(el) {return el.x + el.width})) - group.x + margin;
  group.height = (d3.max(groupMembers, function(el) {return el.y + el.height})) - group.y + margin;

  return group;
};

function getBBoxPortCoordinates(boxDimensions, relX, relY) {
  var port = {};
  port.x = boxDimensions.x + (relX * boxDimensions.width);
  port.y = boxDimensions.y + (relY * boxDimensions.height);
  return port;
};
