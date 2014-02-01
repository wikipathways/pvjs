#### Third party libs used in production for pvjs v1.0.2
These are the specific jars that should be loaded prior to pathvisio.min.js in production. *Note that some of these libs are commonly used in existing javascript applications, so be aware of potential conflicts.*

* aight/aight.min.js
* aight/aight.d3.min.js  *--dependent on aight.min.js*
* async/lib/async.js
* blueimp-load-image/js/load-image.min.js
* d3/d3.min.js
* es5-shim/es5-sham.min.js
* jquery/jquery.min.js  *--conflicts with WikiPathways*
* jsonld.js/js/jsonld.js
* jsonld.js/js/Promise.js
* modernizr/modernizr.js
* node-uuid/uuid.js
* rgb-color/rgb-color.min.js
* strcase/dist/strcase.min.js
* svg-pan-zoom/svg-pan-zoom.js
* typeahead.js/dist/typeahead.min.js
