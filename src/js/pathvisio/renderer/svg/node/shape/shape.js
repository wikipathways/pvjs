pathvisio.renderer.svg.node.shape = function(){
  function render(nodes, pathway, scalableShapesList) {
    if (!nodes || !pathway) {
      if (!nodes) {
        console.log('nodes not specified');
      }
      if (!pathway) {
        console.log('pathway not specified');
      }
      return console.warn('Error: Missing one or more required parameters: nodes or pathway.');
    }


    pathvisio.renderer.svg.node.shape.scalable.render(nodes, pathway, scalableShapesList);
    //pathvisio.renderer.svg.node.shape.nonscalable.render(nodes, pathway, scalableShapesList);
  }

  return {
    render:render
  };
}();
