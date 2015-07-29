postMessage({
  message: 'I\'m working before postMessage.'
});

onmessage = function(oEvent) {
  var data = oEvent.data;
  data.key2 = 'value2';
  postMessage(data);
};
