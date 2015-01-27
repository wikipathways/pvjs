<wikipathways-pathvisiojs style="margin: 0; width: 100%; height: 100%; ">

  <style type="text/css">
    html, body, x-layout{width: 100%;height: 100%;margin: 0;}
    #pathvisiojs-header{background-color: gray;}
    #pathvisiojs-inner-modal{width: 100%;height: 100%;margin: 10;border: 10;background-color: white;}
    #pathvisiojs-section{width: 100%;height: 80%;margin: 0;}
    #pathvisiojs-footer{background-color: gray;}
  </style>

  <div id="pathvisiojs-container" class="pathvisiojs-container">

  <div class="well well-sm col-sm-12">
    <i title="Search mode" class="glyphicon glyphicon-bold"></i>
    <i title="Search mode" class="glyphicon glyphicon-italic"></i>
    <i title="Search mode" class="glyphicon glyphicon-align-left"></i>
    <i title="Search mode" class="glyphicon glyphicon-align-center"></i>
    <i title="Search mode" class="glyphicon glyphicon-align-right"></i>
  </div>

    <section id="pathvisiojs-section" class="well well-sm col-sm-12">
      <!--<div id="pathvisiojs-viewer"></div>-->
      <bridgedb-xref-search-results></bridgedb-xref-search-results>
    </section> 

    <footer id="pathvisiojs-footer" class="col-lg-12">
      <bridgedb-xref-search></bridgedb-xref-search>
      <bridgedb-xref-specifier></bridgedb-xref-specifier>
    </footer>
  </div>

  <script>
  this.on('mount', function() {
    // right after tag is mounted on the page

    $('#pathvisiojs-viewer').pathvisiojs({
      fitToContainer: true
    , manualRender: true
    , sourceData: [
        // at least one item required
        {
          // uri:'data/wp1.xml',
          // uri:'data/WP525_74871.gpml',
          uri:'data/WP525_73040.gpml',
          // uri:'http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=WP1',
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

    // Get first element from array of instances
    var pathInstance = $('#pathvisiojs-viewer').pathvisiojs('get').pop();
    window.pathInstance = pathInstance;

    highland('click', $('#pathvisiojs-viewer')).each(function() {
      console.log('click');
    });

    // Load notification plugin
    pathvisiojsNotifications(pathInstance, {displayErrors: true, displayWarnings: true});

    // Call after render
    pathInstance.on('rendered', function() {
      // Initialize Highlighter plugin
      var hi = pathvisiojsHighlighter(pathInstance);
      window.hi = hi;

      // Highlight by ID
      hi.highlight('#eb5');
      hi.highlight('id:d25e1');

      // Highlight by Text
      hi.highlight('Mitochondrion', null, {backgroundColor: 'gray'});

      // Highlight by xref
      hi.highlight('xref:id:http://identifiers.org/wormbase/ZK1193.5', null, {backgroundColor: 'magenta', borderColor: 'black'});
      hi.highlight('xref:GCN-2', null, {
        backgroundColor: 'blue'
      , backgroundOpacity: 0.5
      , borderColor: 'red'
      , borderWidth: 1
      , borderOpacity: 0.7
      });
    });

    // Call renderer
    pathInstance.render();

  });
  </script>
</wikipathways-pathvisiojs>
