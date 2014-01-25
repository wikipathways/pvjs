$.fn.drawPathway = function(args) {
  args.container = '#' + this[0].id;
  pathvisiojs.pathway.load(args);
};

// use like this:
/*
$('#diagram-container').drawPathway({
  width: 1000,
  height: 500,
  zoom: 'fit',
  gpmlUrl: gpmlUrl
})
//*/
