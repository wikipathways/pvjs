riot.tag('wikipathways-pathvisiojs', '<style type="text/css"> html, body, x-layout{width: 100%;height: 100%;margin: 0;} #pathvisiojs-header{background-color: gray;} #pathvisiojs-inner-modal{width: 100%;height: 100%;margin: 10;border: 10;background-color: white;} #pathvisiojs-section{width: 100%;height: 80%;margin: 0;} #pathvisiojs-footer{background-color: gray;} </style> <div id="pathvisiojs-container" class="pathvisiojs-container"> <div class="well well-sm col-sm-12"> <span title="Search mode" class="glyphicon glyphicon-bold"></span> <span title="Search mode" class="glyphicon glyphicon-italic"></span> <span title="Search mode" class="glyphicon glyphicon-align-left"></span> <span title="Search mode" class="glyphicon glyphicon-align-center"></span> <span title="Search mode" class="glyphicon glyphicon-align-right"></span> </div> <section id="pathvisiojs-section" class="well well-sm col-sm-12"> <div id="pathvisiojs-viewer"> </section>  <footer id="pathvisiojs-footer" class="col-lg-12"> <bridgedb-xref-search></bridgedb-xref-search> <bridgedb-xref-specifier></bridgedb-xref-specifier> </footer> </div>', function(opts) {
  this.on('mount', function() {

    $('#pathvisiojs-viewer').pathvisiojs({
      fitToContainer: true
    , manualRender: true
    , sourceData: [
        {
          uri:'data/WP525_73040.gpml',
          fileType:'gpml' // generally will correspond to filename extension
        }
      , {
          uri:'http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:WP1',
          fileType:'biopax'
        }
      , {
          uri:'http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=png&pwTitle=Pathway:WP1',
          fileType:'png'
        }
      ]
    });

    var pathInstance = $('#pathvisiojs-viewer').pathvisiojs('get').pop();
    window.pathInstance = pathInstance;

    highland('click', $('#pathvisiojs-viewer')).each(function() {
      console.log('click');
    });

    pathvisiojsNotifications(pathInstance, {displayErrors: true, displayWarnings: true});

    pathInstance.on('rendered', function() {
      var hi = pathvisiojsHighlighter(pathInstance);
      window.hi = hi;

      hi.highlight('#eb5');
      hi.highlight('id:d25e1');

      hi.highlight('Mitochondrion', null, {backgroundColor: 'gray'});

      hi.highlight('xref:id:http://identifiers.org/wormbase/ZK1193.5', null, {backgroundColor: 'magenta', borderColor: 'black'});
      hi.highlight('xref:GCN-2', null, {
        backgroundColor: 'blue'
      , backgroundOpacity: 0.5
      , borderColor: 'red'
      , borderWidth: 1
      , borderOpacity: 0.7
      });
    });

    pathInstance.render();

  });
})
