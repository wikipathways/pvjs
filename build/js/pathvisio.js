//! pathvisiojs 0.7.0
//! Built on 2014-01-07
//! https://github.com/wikipathways/pathvisiojs
//! License: http://www.apache.org/licenses/LICENSE-2.0/

"use strict"

var pathvisiojs = function(){

  var svg, pathway, args;

  function getUrisForWikiPathwaysId(wikiPathwaysId, revision) {
    var results = {};
    var re = /wikipathways\.org/; 
    var isOnWikiPathwaysDomain = re.test(document.location.origin);
    var PathwayViewer_viewers = PathwayViewer_viewers || [];

    if (pathvisiojs.utilities.isWikiPathwaysId(wikiPathwaysId)) {
      if (PathwayViewer_viewers.length > 0 && isOnWikiPathwaysDomain) {
        results.uri = PathwayViewer_viewers[0].gpml.gpmlUrl;
      }
      else {
        console.warn('WikiPathways does not yet support CORS, so until we get CORS support, we are using Pointer as a proxy to enable CORS for getting GPML from http://www.wikipathways.org//wpi/wpi.php?action=downloadFile&type=gpml&pwTitle=Pathway:' + wikiPathwaysId + '&rev=' + revision);
        results.uri = 'http://pointer.ucsf.edu/d3/r/data-sources/gpml.php?id=' + wikiPathwaysId + '&rev=' + revision;
      }
      //results.cached = 'https://pathways.firebaseio.com/' + wikiPathwaysId + '.json';
      results.type = 'GPML';
      results.pathwayIri = 'wpId:' + wikiPathwaysId + '#';
    }
    else {
      throw new Error('Pathvisiojs cannot handle the data source type entered.');
    }

    // be sure server has set gpml mime type to application/xml or application/gpml+xml

    return results;
  }

  function parseInputData(inputData) {
    // TODO get urls elsewhere:
    // gpml in pathvisiojs.data.gpml...
    // png in pathvisio.view.pathwayDiagram.png...
    var parsedInputData = {};

    // inputData can be a WikiPathways ID (WP1), a uri for a GPML file (http://www.wikipathways.org/gpmlfile.gpml)
    // or a uri for another type of file.

    if (pathvisiojs.utilities.getObjectType(inputData) === 'Object') {
      inputData.revision = inputData.revision || 0;
      parsedInputData = getUrisForWikiPathwaysId(inputData.wikiPathwaysId, 0);
      parsedInputData.wikiPathwaysId = inputData.wikiPathwaysId;
      parsedInputData.revision = inputData.revision;
    }
    else {
      if (pathvisiojs.utilities.isUrl(inputData)) {
        parsedInputData.uri = inputData;
        if (parsedInputData.uri.indexOf('.gpml') > -1) {
          parsedInputData.type = 'GPML';
          parsedInputData.pathwayIri = inputData + '#';
          return parsedInputData;
        }
        else {
          throw new Error('Pathvisiojs cannot handle the data source type entered.');
        }
      }
      else {
        parsedInputData = getUrisForWikiPathwaysId(inputData, 0);
        parsedInputData.wikiPathwaysId = inputData;
        parsedInputData.revision = 0;
      }
    }
    return parsedInputData;
  }

  function getJson(parsedInputData, callback) {

    // This function converts data specified by parsedInputData to formatted JSON
    // and return the JSON to the function that called getJson()


    // For now, pathvisio.js will attempt to convert any input data, as long as it is of type
    // GPML or has no type specified, into JSON.
    // TODO Later, this functionality can be extended to include other data types and
    // to test for data type when it is not specified.

    if (!!parsedInputData.uri && (!parsedInputData.type || parsedInputData.type === 'GPML')) {

      // This is just an experiment with using mongodb for caching json,
      // but the higher priority for now would be to cache the SVG.
      // Caching the json would be part of having the API deliver results
      // in JSON format.
      /*
      d3.json(parsedInputData.cached, function(json) {
        callback(json);
      });
      //*/

      // TODO d3.xml doesn't seem to work with IE8

      //*
      d3.xml(parsedInputData.uri, function(gpml) {
        pathvisiojs.data.gpml.toRenderableJson(gpml, parsedInputData.pathwayIri, function(json) {
          callback(json);
        });
      });
      //*/
    }
    else {
      return new Error('No data source specified or pathvisio.js cannot handle the data source specified.');

    }
  }

  function load(args) {

    // for now, load will just load a visual representation of a pathway, but
    // this could change in the future

    // ********************************************
    // Check for minimum required set of parameters
    // ********************************************

    if (!args.container) {
      throw new Error('No container selector specified as container for pathvisiojs.');
    }

    // args.data can be either of the following:
    // 1) a uri to a GPML file
    //    (in the future, we may add the ability to handle other file types.
    //    we could also consider handling json data objects so that pvjs
    //    could work with other JS libraries.)
    // 2) a WikiPathways pathway ID, like "WP1"
    if (!args.data) {
      throw new Error('No input data source (URL or WikiPathways ID) specified.');
    }

    var parsedInputData = parseInputData(args.data);
    console.log('parsedInputData');
    console.log(parsedInputData);
    args.data = parsedInputData;
    pathvisiojs.view.pathwayDiagram.load(args);
  }

  return {
    load:load,
    getJson:getJson
  };
}();
;

pathvisiojs.utilities = function(){

  // from http://stackoverflow.com/questions/2454295/javascript-concatenate-properties-from-multiple-objects-associative-array

  function collect() {
    var ret = {};
    var len = arguments.length;
    for (var i=0; i<len; i++) {
      for (p in arguments[i]) {
        if (arguments[i].hasOwnProperty(p)) {
          ret[p] = arguments[i][p];
        }
      }
    }
    return ret;
  }

  /**
   * From http://stackoverflow.com/questions/7770235/change-text-direction-of-textbox-automatically
   * What about Chinese characters that go top to bottom?
   */

  function getTextDirection(text) {

    var x =  new RegExp("[\x00-\x80]+"); // is ascii

    //alert(x.test($this.val()));

    var isAscii = x.test(text);

    var direction;
    if (isAscii) {
      direction = "ltr";
    }
    else {
      direction = "rtl";
    }

    return direction;
  }  

  // from here: http://www.cjboco.com/blog.cfm/post/determining-an-elements-width-and-height-using-javascript/
  // TODO have not tested x-browser yet.
  // could use jquery, but I want to remove it as a dependency for pv.js.

  Element.prototype.getElementWidth = function() {
    if (typeof this.clip !== "undefined") {
      return this.clip.width;
    } else {
      if (this.style.pixelWidth) {
        return this.style.pixelWidth;
      } else {
        return this.width;
      }
    }
  };

  Element.prototype.getElementHeight = function() {
    if (typeof this.clip !== "undefined") {
      return this.clip.width;
    } else {
      if (this.style.pixelHeight) {
        return this.style.pixelHeight;
      } else {
        return this.height;
      }
    }
  };

  function strToHtmlId(str) {
    var re = /\W/gi;
    var id = str.replace(re, "");
    return id;
  }

  function isUrl(str) {

    // from https://gist.github.com/samuelcole/920312

    var urlPattern = /(?:(?=[\s`!()\[\]{};:'".,<>?«»“”‘’])|\b)((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/|[a-z0-9.\-]+[.](?:com|org|net))(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))*(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]|\b))/gi;
    return urlPattern.test(str);
  }

  function splitStringByNewLine(str) {

    // PathVisio (Java) uses '&#xA;' for indicating newline, and browsers convert this into '\r\n' or '\n' in JavaScript.

    return str.split(/\r\n|\r|\n/g);
  }

  function cloneNode(selector) {
    console.log('selector');
    console.log(selector);
    var node = d3.select(selector).node();
    return d3.select(node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling));
  }

  // see http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


  function clone(src) {
    function mixin(dest, source, copyFunc) {
      var name, s, i, empty = {};
      for(name in source){
        // the (!(name in empty) || empty[name] !== s) condition avoids copying properties in "source"
        // inherited from Object.prototype.	 For example, if dest has a custom toString() method,
        // don't overwrite it with the toString() method that source inherited from Object.prototype
        s = source[name];
        if(!(name in dest) || (dest[name] !== s && (!(name in empty) || empty[name] !== s))){
          dest[name] = copyFunc ? copyFunc(s) : s;
        }
      }
      return dest;
    }

    if(!src || typeof src != "object" || Object.prototype.toString.call(src) === "[object Function]"){
      // null, undefined, any non-object, or function
      return src;	// anything
    }
    if(src.nodeType && "cloneNode" in src){
      // DOM Node
      return src.cloneNode(true); // Node
    }
    if(src instanceof Date){
      // Date
      return new Date(src.getTime());	// Date
    }
    if(src instanceof RegExp){
      // RegExp
      return new RegExp(src);   // RegExp
    }
    var r, i, l;
    if(src instanceof Array){
      // array
      r = [];
      for(i = 0, l = src.length; i < l; ++i){
        if(i in src){
          r.push(clone(src[i]));
        }
      }
      // we don't clone functions for performance reasons
      //		}else if(d.isFunction(src)){
      //			// function
      //			r = function(){ return src.apply(this, arguments); };
    }else{
      // generic objects
      r = src.constructor ? new src.constructor() : {};
    }
    return mixin(r, src, clone);

  }  

  function getUrlParam(name) {

    // Thanks to http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript
    // This will be replaced once we get the backend php to get the json

    var parameter = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
    if (!!parameter) {
      return parameter;
    }
    else {
      console.warn('Warning: URL parameter "' + name + '" is null.');
      return null;
    }
  }

  function isWikiPathwaysId(data) {
    data = data.trim();
    if (data.substr(0,2).toUpperCase() === 'WP' && isNumber(data.substr(data.length - 1))) {
      return true;
    }
    else {
      return false;
    }
  }

  function convertToArray(object) {
    var array = null;
    if (getObjectType( object ) === 'Object' ) {
      array = [];
      array.push(object);
      return array;
    }
    else {
      if( getObjectType( object ) === 'Array' ) {
        return object;
      }
      else {
        if( getObjectType( object ) === 'String' ) {
          array = [];
          array.push(object);
          return array;
        }
      }
    }
  }

  function getObjectType(object) {
    var result;
    if (Object.prototype.toString.call( object ) === '[object Object]' ) {
      result = 'Object';
    }
    else {
      if( Object.prototype.toString.call( object ) === '[object Array]' ) {
        result = 'Array';
      }
      else {
        if( Object.prototype.toString.call( object ) === '[object String]' ) {
          result = 'String';
        }
      }
    }
    return result;
  }

  function getWindowDimensions(object) {
    var winW = 630, winH = 460;
    if (document.body && document.body.width) {
     winW = document.body.width;
     winH = document.body.height;
    }
    if (document.compatMode=='CSS1Compat' &&
        document.documentElement &&
        document.documentElement.width ) {
     winW = document.documentElement.width;
     winH = document.documentElement.height;
    }
    if (window.innerWidth && window.innerHeight) {
     winW = window.innerWidth;
     winH = window.innerHeight;
    }
    return {'width':winW, 'height':winH};
  }

  // from http://stackoverflow.com/questions/5306680/move-an-array-element-from-one-array-position-to-another

  function moveArrayItem(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing purposes
  }

  function isOdd(num) { return num % 2;}

  return{
    collect:collect,
    isUrl:isUrl,
    splitStringByNewLine:splitStringByNewLine,
    getUrlParam:getUrlParam,
    cloneNode:cloneNode,
    clone:clone,
    convertToArray:convertToArray,
    getWindowDimensions:getWindowDimensions,
    moveArrayItem:moveArrayItem,
    isOdd:isOdd,
    isWikiPathwaysId:isWikiPathwaysId,
    isNumber:isNumber,
    strToHtmlId:strToHtmlId,
    getObjectType:getObjectType,
    getTextDirection:getTextDirection
  };
}();



;

pathvisiojs.data = {};
;

pathvisiojs.data.bridgedb = function(){

  var bridgedbPhp = '../external-data/bridgedb/';
  var bridgedbDatasources = '../external-data/bridgedb/';

  function getXrefAnnotationDataByDataNode(singleSpecies, id, datasource, label, desc, callback) {
    getDataSources(function(dataSources) {
      var dataSourceRowCorrespondingToDataNodeXrefDatabase = getDataSourceRowByName(datasource, dataSources);
      var systemCode = dataSourceRowCorrespondingToDataNodeXrefDatabase.systemCode;
      getXrefAliases(singleSpecies, systemCode, id, function(xRefAliases) {
        var currentDataSourceRow;
        var listItems = xRefAliases.map(function(xRefAlias) {
          var listItem = {}
          listItem.title = xRefAlias.dataSourceName;
          listItem.text = xRefAlias.xRefId;
          currentDataSourceRow = getDataSourceRowByName(xRefAlias.dataSourceName, dataSources);
          listItem.priority = currentDataSourceRow.priority;
          if (currentDataSourceRow.hasOwnProperty('linkoutPattern')) {
            if (currentDataSourceRow.linkoutPattern !== "" && currentDataSourceRow.linkoutPattern !== null) {
              listItem.uri = currentDataSourceRow.linkoutPattern.replace('$id', listItem.text);
            }
          }
          return listItem;
        });

        listItems.sort(function(a, b) {
          if (a.priority === b.priority)
          {
              var x = a.title.toLowerCase(), y = b.title.toLowerCase();
              
              return x < y ? -1 : x > y ? 1 : 0;
          }
          return b.priority - a.priority;
        });

        var nestedListItems = d3.nest()
        .key(function(d) { return d.title; })
        .entries(listItems);

        // handle case where nothing is returned by bridgedb webservice
        if (nestedListItems.length == 0){
          var uri = "";
          var ds = getDataSourceRowByName(datasource, dataSources);
           if (ds.hasOwnProperty('linkoutPattern')) {
             if (ds.linkoutPattern !== "" && ds.linkoutPattern !== null) {
               uri = ds.linkoutPattern.replace('$id', id);
             }
           }
          nestedListItems = [{"key": datasource, "values":[{"priority": "1","text": id,"title": datasource,"uri":uri}]}];
        }

        // We want the identifier that was listed by the pathway creator for this data node to be listed first.

        var specifiedListItem = nestedListItems.filter(function(element) {return (element.key == datasource);})[0];
        var currentListItemIndex = nestedListItems.indexOf(specifiedListItem);
        nestedListItems = pathvisiojs.utilities.moveArrayItem(nestedListItems, currentListItemIndex, 0);

        var specifiedXRefId = specifiedListItem.values.filter(function(element) {return (element.text == id);})[0];
        var currentXRefIdIndex = specifiedListItem.values.indexOf(specifiedXRefId);
        specifiedListItem.values = pathvisiojs.utilities.moveArrayItem(specifiedListItem.values, currentXRefIdIndex, 0);

        var annotationData = {
          "header": label,
          "description": desc,
          "listItems": nestedListItems
        };
        callback(annotationData);
      });
    });
  }

  function getDataSourceRowByName(dataSourceName, dataSources) {
    var regexp = /[^\w]/gi;
    var dataSourceRow = dataSources.filter(function(row) { return row.dataSourceName === dataSourceName; })[0];
    if (!dataSourceRow) {
      dataSourceRow = dataSources.filter(function(row) { return row.dataSourceName.replace(regexp, '').toLowerCase() === dataSourceName.replace(regexp, '').toLowerCase(); })[0];
    }
    return dataSourceRow;
  }

  function getDataSources(callback) {
    d3.tsv(bridgedbDatasources + 'datasources.txt')
    .response(function(request) {
      return d3.tsv.parseRows(request.responseText, function(d) {
        return {dataSourceName: d[0], systemCode: d[1], websiteUrl: d[2], linkoutPattern: d[3], exampleIdentifier: d[4], entityIdentified: d[5], singleSpecies: d[6], priority: d[7], uri: d[8], regex: d[9], officialName: d[10]};
      });
    })
    .get(function(error, rows) {
      callback(rows);
    });
  }

  function getXrefAliases(singleSpecies, systemCode, xRefId, callback) {
    var bridgedbUrl = bridgedbPhp + 'bridgedb.php/' + encodeURIComponent(singleSpecies) + '/xrefs/' + encodeURIComponent(systemCode) + '/' + encodeURIComponent(xRefId);
    console.log(bridgedbUrl);
    d3.tsv(bridgedbUrl)
    .response(function(request) { 
      return d3.tsv.parseRows(request.responseText, function(d) {
        return {xRefId: d[0], dataSourceName: d[1]}; 
      });
    })
    .get(function(error, rows) {
      callback(rows);
    });
  }

  return {
    getXrefAnnotationDataByDataNode:getXrefAnnotationDataByDataNode
  };
}();
;

pathvisiojs.data.bridgedb.dataSources = [
   {
      "database":"Affy",
      "id":"X",
      "homePage":"http://www.affymetrix.com/",
      "linkOut":"https://www.affymetrix.com/LinkServlet?probeset=$id",
      "example":"1851_s_at",
      "dataNodeType":"probe",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:affy.probeset",
      "regex":"\d{4,}((_[asx])?_at)?",
      "fullName":"Affymetrix Probeset"
   },
   {
      "database":"Agilent",
      "id":"Ag",
      "homePage":"http://agilent.com",
      "linkOut":"",
      "example":"A_24_P98555",
      "dataNodeType":"probe",
      "species":"",
      "priority":0,
      "unknown":"Ag",
      "regex":"A_\d+_.+",
      "fullName":"Agilent"
   },
   {
      "database":"BIND",
      "id":"Bi",
      "homePage":"http://www.bind.ca/",
      "linkOut":"http://www.bind.ca/Action?identifier=bindid&idsearch=$id",
      "example":"",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:bind",
      "regex":"^\d+$",
      "fullName":"BIND"
   },
   {
      "database":"BioCyc",
      "id":"Bc",
      "homePage":"http://biocyc.org",
      "linkOut":"http://biocyc.org/getid?id=$id",
      "example":"ECOLI:CYT-D-UBIOX-CPLX",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biocyc",
      "regex":"^\w+\:[A-Za-z0-9-]+$",
      "fullName":"BioCyc"
   },
   {
      "database":"BioGrid",
      "id":"Bg",
      "homePage":"http://thebiogrid.org/",
      "linkOut":"http://thebiogrid.org/$id",
      "example":"31623",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biogrid",
      "regex":"^\d+$",
      "fullName":"BioGRID"
   },
   {
      "database":"BioModels Database",
      "id":"Bm",
      "homePage":"http://www.ebi.ac.uk/biomodels/",
      "linkOut":"http://www.ebi.ac.uk/biomodels-main/$id",
      "example":"BIOMD0000000048",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biomodels.db",
      "regex":"^((BIOMD|MODEL)\d{10})|(BMID\d{12})$",
      "fullName":"BioModels Database"
   },
   {
      "database":"BioSystems",
      "id":"Bs",
      "homePage":"http://www.ncbi.nlm.nih.gov/biosystems/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/biosystems/$id",
      "example":"1",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biosystems",
      "regex":"^\d+$",
      "fullName":"BioSystems"
   },
   {
      "database":"BRENDA",
      "id":"Br",
      "homePage":"http://www.brenda-enzymes.org/",
      "linkOut":"http://www.brenda-enzymes.org/php/result_flat.php4?ecno=$id",
      "example":"1.1.1.1",
      "dataNodeType":"",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:brenda",
      "regex":"^((\d+\.-\.-\.-)|(\d+\.\d+\.-\.-)|(\d+\.\d+\.\d+\.-)|(\d+\.\d+\.\d+\.\d+))$",
      "fullName":"BRENDA"
   },
   {
      "database":"CAS",
      "id":"Ca",
      "homePage":"http://commonchemistry.org",
      "linkOut":"http://commonchemistry.org/ChemicalDetail.aspx?ref=$id",
      "example":"50-00-0",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:cas",
      "regex":"^\d{1,7}\-\d{2}\-\d$",
      "fullName":"CAS"
   },
   {
      "database":"CCDS",
      "id":"Cc",
      "homePage":"http://identifiers.org/ccds/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/CCDS/CcdsBrowse.cgi?REQUEST=ALLFIELDS&DATA=$id",
      "example":"CCDS33337",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"",
      "regex":"^CCDS\d+\.\d+$",
      "fullName":"Consensus CDS"
   },
   {
      "database":"ChEBI",
      "id":"Ce",
      "homePage":"http://www.ebi.ac.uk/chebi/",
      "linkOut":"http://www.ebi.ac.uk/chebi/searchId.do?chebiId=$id",
      "example":"CHEBI:36927",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:obo.chebi",
      "regex":"^CHEBI:\d+$",
      "fullName":"ChEBI"
   },
   {
      "database":"Chemspider",
      "id":"Cs",
      "homePage":"http://www.chemspider.com/",
      "linkOut":"http://www.chemspider.com/Chemical-Structure.$id.html",
      "example":"56586",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:chemspider",
      "regex":"^\d+$",
      "fullName":"ChemSpider"
   },
   {
      "database":"CodeLink",
      "id":"Ge",
      "homePage":"http://www.appliedmicroarrays.com/",
      "linkOut":"",
      "example":"GE86325",
      "dataNodeType":"probe",
      "species":"",
      "priority":0,
      "unknown":"Ge",
      "regex":"",
      "fullName":"CodeLink"
   },
   {
      "database":"Database of Interacting Proteins",
      "id":"Dip",
      "homePage":"http://dip.doe-mbi.ucla.edu/",
      "linkOut":"http://dip.doe-mbi.ucla.edu/dip/DIPview.cgi?ID=$id",
      "example":"DIP-743N",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:dip",
      "regex":"^DIP[\:\-]\d{3}[EN]$",
      "fullName":"Database of Interacting Proteins"
   },
   {
      "database":"dbSNP",
      "id":"Sn",
      "homePage":"http://www.ncbi.nlm.nih.gov/sites/entrez?db=snp",
      "linkOut":"http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=$id",
      "example":"121909098",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"",
      "regex":"^\d+$",
      "fullName":"dbSNP"
   },
   {
      "database":"DrugBank",
      "id":"Dr",
      "homePage":"http://www.drugbank.ca/",
      "linkOut":"http://www.drugbank.ca/drugs/$id",
      "example":"DB00001",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:drugbank",
      "regex":"^DB\d{5}$",
      "fullName":"DrugBank"
   },
   {
      "database":"EcoCyc",
      "id":"Eco",
      "homePage":"http://ecocyc.org/",
      "linkOut":"http://ecocyc.org/ECOLI/NEW-IMAGE?type=NIL&object=$id",
      "example":"325-BISPHOSPHATE-NUCLEOTIDASE-RXN",
      "dataNodeType":"interaction",
      "species":"Escherichia coli",
      "priority":1,
      "unknown":"Eco",
      "regex":"",
      "fullName":"EcoCyc"
   },
   {
      "database":"EcoGene",
      "id":"Ec",
      "homePage":"http://ecogene.org/",
      "linkOut":"http://ecogene.org/geneInfo.php?eg_id=$id",
      "example":"EG10173",
      "dataNodeType":"gene",
      "species":"Escherichia coli",
      "priority":1,
      "unknown":"urn:miriam:ecogene",
      "regex":"^EG\d+$",
      "fullName":"EcoGene"
   },
   {
      "database":"EMBL",
      "id":"Em",
      "homePage":"http://www.ebi.ac.uk/embl/",
      "linkOut":"http://www.ebi.ac.uk/ena/data/view/$id",
      "example":"X58356",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ena.embl",
      "regex":"^[A-Z]+[0-9]+$",
      "fullName":"European Nucleotide Archive"
   },
   {
      "database":"Ensembl",
      "id":"En",
      "homePage":"http://www.ensembl.org/",
      "linkOut":"http://www.ensembl.org/id/$id",
      "example":"ENSG00000139618",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ensembl",
      "regex":"^ENS[A-Z]*[FPTG]\d{11}$",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl B. subtilis",
      "id":"EnBs",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://bacteria.ensembl.org/Bacillus/B_subtilis/Gene/Summary?g=$id",
      "example":"EBBACG00000000013",
      "dataNodeType":"gene",
      "species":"Bacillus subtilis",
      "priority":1,
      "unknown":"EnBs",
      "regex":"EBBACG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl C. elegans",
      "id":"EnCe",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Caenorhabditis_elegans/Gene/Summary?g=$id",
      "example":"Y42H9B.1",
      "dataNodeType":"gene",
      "species":"Caenorhabditis elegans",
      "priority":1,
      "unknown":"EnCe",
      "regex":"",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Chicken",
      "id":"EnGg",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Gallus_gallus/Gene/Summary?g=$id",
      "example":"ENSGALG00000021736",
      "dataNodeType":"gene",
      "species":"Gallus gallus",
      "priority":1,
      "unknown":"EnGg",
      "regex":"ENSGALG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Chimp",
      "id":"EnPt",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Pan_troglodytes/Gene/Summary?g=$id",
      "example":"ENSPTRG00000036034",
      "dataNodeType":"gene",
      "species":"Pan troglodytes",
      "priority":1,
      "unknown":"EnPt",
      "regex":"ENSPTRG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Cow",
      "id":"EnBt",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Bos_taurus/Gene/Summary?g=$id",
      "example":"ENSBTAG00000043548",
      "dataNodeType":"gene",
      "species":"Bos taurus",
      "priority":1,
      "unknown":"EnBt",
      "regex":"ENSBTAG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Dog",
      "id":"EnCf",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Canis_familiaris/Gene/Summary?g=$id",
      "example":"ENSCAFG00000025860",
      "dataNodeType":"gene",
      "species":"Canis familiaris",
      "priority":1,
      "unknown":"EnCf",
      "regex":"ENSCAFG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl E. coli",
      "id":"EnEc",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://bacteria.ensembl.org/Escherichia_Shigella/E_coli_K12/Gene/Summary?g=$id",
      "example":"EBESCG00000000010",
      "dataNodeType":"gene",
      "species":"Escherichia coli",
      "priority":1,
      "unknown":"EnEc",
      "regex":"EBESCG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Fruitfly",
      "id":"EnDm",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Drosophila_melanogaster/Gene/Summary?g=$id",
      "example":"FBgn0032956",
      "dataNodeType":"gene",
      "species":"Drosophila melanogaster",
      "priority":1,
      "unknown":"EnDm",
      "regex":"FBgn\d{7}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Horse",
      "id":"EnQc",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Equus_caballus/Gene/Summary?g=$id",
      "example":"ENSECAG00000026160",
      "dataNodeType":"gene",
      "species":"Equus caballus",
      "priority":1,
      "unknown":"EnQc",
      "regex":"ENSECAG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Human",
      "id":"EnHs",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Homo_sapiens/Gene/Summary?g=$id",
      "example":"ENSG00000139618",
      "dataNodeType":"gene",
      "species":"Homo sapiens",
      "priority":1,
      "unknown":"EnHs",
      "regex":"ENSG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl M. tuberculosis",
      "id":"EnMx",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://bacteria.ensembl.org/Mycobacterium/M_tuberculosis_H37Rv/Gene/Summary?g=$id",
      "example":"EBMYCG00000003122",
      "dataNodeType":"gene",
      "species":"Mycobacterium tuberculosis",
      "priority":1,
      "unknown":"EnMx",
      "regex":"EBMYCG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Mosquito",
      "id":"EnAg",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Anopheles_gambiae/Gene/Summary?_q=$id",
      "example":"AGAP006864",
      "dataNodeType":"gene",
      "species":"Anopheles gambiae",
      "priority":1,
      "unknown":"EnAg",
      "regex":"AGAP\d{6}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Mouse",
      "id":"EnMm",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Mus_musculus/Gene/Summary?g=$id",
      "example":"ENSMUSG00000017167",
      "dataNodeType":"gene",
      "species":"Mus musculus",
      "priority":1,
      "unknown":"EnMm",
      "regex":"ENSMUSG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Pig",
      "id":"EnSs",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Sus_scrofa/Gene/Summary?g=$id",
      "example":"ENSSSCG00000004244",
      "dataNodeType":"gene",
      "species":"Sus scrofa",
      "priority":1,
      "unknown":"EnSs",
      "regex":"ENSSSCG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Plants",
      "id":"EP",
      "homePage":"http://plants.ensembl.org/",
      "linkOut":"http://plants.ensembl.org/id/$id",
      "example":"AT1G73965",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ensembl.plant",
      "regex":"^\w+$",
      "fullName":"Ensembl Plants"
   },
   {
      "database":"Ensembl Rat",
      "id":"EnRn",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Rattus_norvegicus/Gene/Summary?g=$id",
      "example":"ENSRNOG00000016648",
      "dataNodeType":"gene",
      "species":"Rattus norvegicus",
      "priority":1,
      "unknown":"EnRn",
      "regex":"ENSRNOG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Xenopus",
      "id":"EnXt",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Xenopus_tropicalis/Gene/Summary?g=$id",
      "example":"ENSXETG00000029448",
      "dataNodeType":"gene",
      "species":"Xenopus tropicalis",
      "priority":1,
      "unknown":"EnXt",
      "regex":"ENSXETG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Yeast",
      "id":"EnSc",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Saccharomyces_cerevisiae/Gene/Summary?g=$id",
      "example":"YGR147C",
      "dataNodeType":"gene",
      "species":"Saccharomyces cerevisiae",
      "priority":1,
      "unknown":"EnSc",
      "regex":"Y[A-Z][RL]\d{3}[WC](?:\-[A-Z])?",
      "fullName":"Ensembl"
   },
   {
      "database":"Ensembl Zebrafish",
      "id":"EnDr",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.ensembl.org/Danio_rerio/Gene/Summary?g=$id",
      "example":"ENSDARG00000024771",
      "dataNodeType":"gene",
      "species":"Danio rerio",
      "priority":1,
      "unknown":"EnDr",
      "regex":"ENSDARG\d{11}",
      "fullName":"Ensembl"
   },
   {
      "database":"Entrez Gene",
      "id":"L",
      "homePage":"http://www.ncbi.nlm.nih.gov/gene",
      "linkOut":"http://www.ncbi.nlm.nih.gov/gene/$id",
      "example":"100010",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ncbigene",
      "regex":"^\d+$",
      "fullName":"Entrez Gene"
   },
   {
      "database":"Enzyme Nomenclature",
      "id":"E",
      "homePage":"http://www.ebi.ac.uk/intenz/",
      "linkOut":"http://www.ebi.ac.uk/intenz/query?cmd=SearchEC&ec=$id",
      "example":"1.1.1.1",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ec-code",
      "regex":"^\d+\.-\.-\.-|\d+\.\d+\.-\.-|\d+\.\d+\.\d+\.-|\d+\.\d+\.\d+\.(n)?\d+$",
      "fullName":"Enzyme Nomenclature"
   },
   {
      "database":"FlyBase",
      "id":"F",
      "homePage":"http://flybase.org/",
      "linkOut":"http://flybase.org/reports/$id.html",
      "example":"FBgn0011293",
      "dataNodeType":"gene",
      "species":"Drosophila melanogaster",
      "priority":1,
      "unknown":"urn:miriam:flybase",
      "regex":"^FB\w{2}\d{7}$",
      "fullName":"FlyBase"
   },
   {
      "database":"GenBank",
      "id":"G",
      "homePage":"http://www.ncbi.nlm.nih.gov/genbank/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/nuccore/$id",
      "example":"NW_004190323",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"G",
      "regex":"(\w\d{5})|(\w{2}\d{6})|(\w{3}\d{5})",
      "fullName":"GenBank"
   },
   {
      "database":"Gene Wiki",
      "id":"Gw",
      "homePage":"http://en.wikipedia.org/wiki/Portal:Gene_Wiki",
      "linkOut":"http://plugins.biogps.org/cgi-bin/wp.cgi?id=$id",
      "example":"1017",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"Gw",
      "regex":"\d+",
      "fullName":"Gene Wiki"
   },
   {
      "database":"GeneOntology",
      "id":"T",
      "homePage":"http://www.ebi.ac.uk/QuickGO/",
      "linkOut":"http://www.ebi.ac.uk/QuickGO/GTerm?id=$id",
      "example":"GO:0006915",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:obo.go",
      "regex":"^GO:\d{7}$",
      "fullName":"Gene Ontology"
   },
   {
      "database":"Gramene Arabidopsis",
      "id":"EnAt",
      "homePage":"http://www.gramene.org/",
      "linkOut":"http://www.gramene.org/Arabidopsis_thaliana/Gene/Summary?g=$id",
      "example":"ATMG01360-TAIR-G",
      "dataNodeType":"gene",
      "species":"Arabidopsis thaliana",
      "priority":1,
      "unknown":"EnAt",
      "regex":"AT[\dCM]G\d{5}\-TAIR\-G",
      "fullName":"Grameen Arabidopsis"
   },
   {
      "database":"Gramene Genes DB",
      "id":"Gg",
      "homePage":"http://www.gramene.org/",
      "linkOut":"http://www.gramene.org/db/genes/search_gene?acc=$id",
      "example":"GR:0060184",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Gg",
      "regex":"GR:\d+",
      "fullName":"Gramene Genes"
   },
   {
      "database":"Gramene Literature",
      "id":"Gl",
      "homePage":"http://www.gramene.org/",
      "linkOut":"http://www.gramene.org/db/literature/pub_search?ref_id=$id",
      "example":"6200",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"Gl",
      "regex":"",
      "fullName":"Gramene Literature"
   },
   {
      "database":"Gramene Maize",
      "id":"EnZm",
      "homePage":"http://www.ensembl.org",
      "linkOut":"http://www.maizesequence.org/Zea_mays/Gene/Summary?g=$id",
      "example":"GRMZM2G174107",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"EnZm",
      "regex":"",
      "fullName":"Gramene Maize"
   },
   {
      "database":"Gramene Pathway",
      "id":"Gp",
      "homePage":"http://www.gramene.org/pathway",
      "linkOut":"",
      "example":"AAH72400",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"Gp",
      "regex":"",
      "fullName":"Gramene Pathway"
   },
   {
      "database":"Gramene Rice",
      "id":"EnOj",
      "homePage":"http://www.gramene.org/",
      "linkOut":"http://www.gramene.org/Oryza_sativa/Gene/Summary?db=core;g=$id",
      "example":"osa-MIR171a",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"EnOj",
      "regex":"",
      "fullName":"Gramene Rice"
   },
   {
      "database":"HGNC",
      "id":"H",
      "homePage":"http://www.genenames.org",
      "linkOut":"http://www.genenames.org/data/hgnc_data.php?match=$id",
      "example":"DAPK1",
      "dataNodeType":"gene",
      "species":"Homo sapiens",
      "priority":1,
      "unknown":"urn:miriam:hgnc.symbol",
      "regex":"^[A-Za-z0-9]+",
      "fullName":"HGNC Symbol"
   },
   {
      "database":"HGNC Accession number",
      "id":"Hac",
      "homePage":"http://www.genenames.org",
      "linkOut":"http://www.genenames.org/data/hgnc_data.php?hgnc_id=$id",
      "example":"HGNC:2674",
      "dataNodeType":"gene",
      "species":"Homo sapiens",
      "priority":1,
      "unknown":"urn:miriam:hgnc",
      "regex":"^(HGNC:)?\d{1,5}$",
      "fullName":"HGNC"
   },
   {
      "database":"HMDB",
      "id":"Ch",
      "homePage":"http://www.hmdb.ca/",
      "linkOut":"http://www.hmdb.ca/metabolites/$id",
      "example":"HMDB00001",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:hmdb",
      "regex":"^HMDB\d{5}$",
      "fullName":"HMDB"
   },
   {
      "database":"HomoloGene",
      "id":"Hg",
      "homePage":"http://www.ncbi.nlm.nih.gov/homologene/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/homologene/$id",
      "example":"1000",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:homologene",
      "regex":"^\d+$",
      "fullName":"HomoloGene"
   },
   {
      "database":"HPRD",
      "id":"Hp",
      "homePage":"http://www.hprd.org/",
      "linkOut":"",
      "example":"",
      "dataNodeType":"interaction",
      "species":"Homo sapiens",
      "priority":1,
      "unknown":"urn:miriam:hprd",
      "regex":"",
      "fullName":"HPRD"
   },
   {
      "database":"Illumina",
      "id":"Il",
      "homePage":"http://www.illumina.com/",
      "linkOut":"",
      "example":"ILMN_5668",
      "dataNodeType":"probe",
      "species":"",
      "priority":0,
      "unknown":"Il",
      "regex":"ILMN_\d+",
      "fullName":"Illumina"
   },
   {
      "database":"IntAct",
      "id":"Ia",
      "homePage":"http://www.ebi.ac.uk/intact/",
      "linkOut":"http://www.ebi.ac.uk/intact/pages/details/details.xhtml?interactionAc=$id",
      "example":"EBI-2307691",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:intact",
      "regex":"^EBI\-[0-9]+$",
      "fullName":"IntAct"
   },
   {
      "database":"InterPro",
      "id":"I",
      "homePage":"http://www.ebi.ac.uk/interpro/",
      "linkOut":"http://www.ebi.ac.uk/interpro/DisplayIproEntry?ac=$id",
      "example":"IPR000100",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:interpro",
      "regex":"^IPR\d{6}$",
      "fullName":"InterPro"
   },
   {
      "database":"IPI",
      "id":"Ip",
      "homePage":"http://www.ebi.ac.uk/IPI",
      "linkOut":"http://www.ebi.ac.uk/cgi-bin/dbfetch?db=IPI&id=$id&format=default",
      "example":"IPI00000001",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ipi",
      "regex":"^IPI\d{8}$",
      "fullName":"IPI"
   },
   {
      "database":"IRGSP Gene",
      "id":"Ir",
      "homePage":"http://rgp.dna.affrc.go.jp/IRGSP/",
      "linkOut":"",
      "example":"Os12g0561000",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Ir",
      "regex":"Os\d{2}g\d+",
      "fullName":"IRGSP Gene"
   },
   {
      "database":"Kegg Compound",
      "id":"Ck",
      "homePage":"http://www.genome.jp/kegg/ligand.html",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?cpd:$id",
      "example":"C12345",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.compound",
      "regex":"^C\d+$",
      "fullName":"KEGG Compound"
   },
   {
      "database":"KEGG Drug",
      "id":"Kd",
      "homePage":"http://www.genome.jp/kegg/drug/",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?dr:$id",
      "example":"D00123",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.drug",
      "regex":"^D\d+$",
      "fullName":"KEGG Drug"
   },
   {
      "database":"KEGG Genes",
      "id":"Kg",
      "homePage":"http://www.genome.jp/kegg/genes.html",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?$id",
      "example":"syn:ssr3451",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.genes",
      "regex":"^\w+:[\w\d\.-]*$",
      "fullName":"KEGG Genes"
   },
   {
      "database":"KEGG Glycan",
      "id":"Kgl",
      "homePage":"http://www.genome.jp/kegg/glycan/",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?gl:$id",
      "example":"G00123",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.glycan",
      "regex":"^G\d+$",
      "fullName":"KEGG Glycan"
   },
   {
      "database":"KEGG Pathway",
      "id":"Kp",
      "homePage":"http://www.genome.jp/kegg/pathway.html",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?pathway+$id",
      "example":"hsa00620",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.pathway",
      "regex":"^\w{2,4}\d{5}$",
      "fullName":"KEGG Pathway"
   },
   {
      "database":"KEGG Reaction",
      "id":"Kr",
      "homePage":"http://www.genome.jp/kegg/reaction/",
      "linkOut":"http://www.genome.jp/dbget-bin/www_bget?rn:$id",
      "example":"R00100",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:kegg.reaction",
      "regex":"^R\d+$",
      "fullName":"KEGG Reaction"
   },
   {
      "database":"LIPID MAPS",
      "id":"Lm",
      "homePage":"http://www.lipidmaps.org",
      "linkOut":"http://www.lipidmaps.org/data/get_lm_lipids_dbgif.php?LM_ID=$id",
      "example":"LMPR0102010012",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:lipidmaps",
      "regex":"^LM(FA|GL|GP|SP|ST|PR|SL|PK)[0-9]{4}([0-9a-zA-Z]{4,6})?$",
      "fullName":"LIPID MAPS"
   },
   {
      "database":"LipidBank",
      "id":"Lb",
      "homePage":"http://lipidbank.jp/index.html",
      "linkOut":"http://lipidbank.jp/cgi-bin/detail.cgi?id=$id",
      "example":"BBA0001",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:lipidbank",
      "regex":"^\w+\d+$",
      "fullName":"LipidBank"
   },
   {
      "database":"MACiE",
      "id":"Ma",
      "homePage":"http://www.ebi.ac.uk/thornton-srv/databases/MACiE/index.html",
      "linkOut":"http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/MACiE/entry/getPage.pl?id=$id",
      "example":"M0001",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:macie",
      "regex":"^M\d{4}$",
      "fullName":"MACiE"
   },
   {
      "database":"MaizeGDB",
      "id":"Mg",
      "homePage":"",
      "linkOut":"http://www.maizegdb.org/cgi-bin/displaylocusresults.cgi?term=$id",
      "example":"acc1",
      "dataNodeType":"gene",
      "species":"Zea mays",
      "priority":1,
      "unknown":"Mg",
      "regex":"",
      "fullName":"MaizeGDB"
   },
   {
      "database":"MatrixDB",
      "id":"Md",
      "homePage":"http://matrixdb.ibcp.fr/",
      "linkOut":"http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=$id&class=Association",
      "example":"P00747_P07355",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:matrixdb.association",
      "regex":"^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])_.*|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9]_.*)|(GAG_.*)|(MULT_.*)|(PFRAG_.*)|(LIP_.*)|(CAT_.*)$",
      "fullName":"MatrixDB"
   },
   {
      "database":"MetaCyc",
      "id":"Mc",
      "homePage":"http://www.metacyc.org/",
      "linkOut":"http://www.metacyc.org/META/NEW-IMAGE?type=NIL&object=$id",
      "example":"D-GLUTAMATE-OXIDASE-RXN",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"Mc",
      "regex":"",
      "fullName":"MetaCyc"
   },
   {
      "database":"MGI",
      "id":"M",
      "homePage":"http://www.informatics.jax.org/",
      "linkOut":"http://www.informatics.jax.org/marker/$id",
      "example":"MGI:2442292",
      "dataNodeType":"gene",
      "species":"Mus musculus",
      "priority":1,
      "unknown":"urn:miriam:mgd",
      "regex":"^MGI:\d+$",
      "fullName":"Mouse Genome Database"
   },
   {
      "database":"MINT",
      "id":"Mi",
      "homePage":"http://mint.bio.uniroma2.it/mint/",
      "linkOut":"http://mint.bio.uniroma2.it/mint/search/inFrameInteraction.do?interactionAc=$id",
      "example":"MINT-10000",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:mint",
      "regex":"^MINT\-\d{1,5}$",
      "fullName":"MINT"
   },
   {
      "database":"miRBase mature sequence",
      "id":"Mbm",
      "homePage":"http://www.mirbase.org/",
      "linkOut":"http://www.mirbase.org/cgi-bin/mature.pl?mature_acc=$id",
      "example":"MIMAT0000001",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:mirbase.mature",
      "regex":"MIMAT\d{7}",
      "fullName":"miRBase mature sequence"
   },
   {
      "database":"miRBase Sequence",
      "id":"Mb",
      "homePage":"http://microrna.sanger.ac.uk/",
      "linkOut":"http://microrna.sanger.ac.uk/cgi-bin/sequences/mirna_entry.pl?acc=$id",
      "example":"MI0000001",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:mirbase",
      "regex":"MI\d{7}",
      "fullName":"miRBase Sequence"
   },
   {
      "database":"NASC Gene",
      "id":"N",
      "homePage":"http://arabidopsis.info/",
      "linkOut":"",
      "example":"ATMG00960-TAIR-G",
      "dataNodeType":"gene",
      "species":"Arabidopsis thaliana",
      "priority":1,
      "unknown":"N",
      "regex":"AT[\dCM]G\d{5}\-TAIR\-G",
      "fullName":"NASC Gene"
   },
   {
      "database":"NCBI Protein",
      "id":"Np",
      "homePage":"http://www.ncbi.nlm.nih.gov/protein",
      "linkOut":"http://www.ncbi.nlm.nih.gov/protein/$id",
      "example":"CAA71118.1",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ncbiprotein",
      "regex":"^\w+\d+(\.\d+)?$",
      "fullName":"NCBI Protein"
   },
   {
      "database":"NCI Pathway Interaction Database",
      "id":"Pid",
      "homePage":"http://pid.nci.nih.gov/",
      "linkOut":"http://pid.nci.nih.gov/search/pathway_landing.shtml?what=graphic&jpg=on&pathway_id=$id",
      "example":"pi3kcipathway",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pid.pathway",
      "regex":"^\w+$",
      "fullName":"NCI Pathway Interaction Database"
   },
   {
      "database":"NuGO wiki",
      "id":"Nw",
      "homePage":"http://wiki.nugo.org",
      "linkOut":"http://wiki.nugo.org/index.php/$id",
      "example":"HMDB00001",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":0,
      "unknown":"Nw",
      "regex":"",
      "fullName":"NuGO wiki"
   },
   {
      "database":"OMIM",
      "id":"Om",
      "homePage":"http://omim.org/",
      "linkOut":"http://omim.org/entry/$id",
      "example":"603903",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:omim",
      "regex":"^[*#+%^]?\d{6}$",
      "fullName":"OMIM"
   },
   {
      "database":"Oryzabase",
      "id":"Ob",
      "homePage":"http://www.shigen.nig.ac.jp/rice/oryzabase",
      "linkOut":"http://www.shigen.nig.ac.jp/rice/oryzabase/gateway/gatewayAction.do?target=symbol&id=$id",
      "example":"468",
      "dataNodeType":"gene",
      "species":"Oryza sativa",
      "priority":1,
      "unknown":"Ob",
      "regex":"",
      "fullName":"Oryzabase"
   },
   {
      "database":"Other",
      "id":"O",
      "homePage":"",
      "linkOut":"",
      "example":"",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"O",
      "regex":"",
      "fullName":"Other"
   },
   {
      "database":"Pathway Commons",
      "id":"Pc",
      "homePage":"http://www.pathwaycommons.org/pc/",
      "linkOut":"http://www.pathwaycommons.org/pc/record2.do?id=$id",
      "example":"485991",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pathwaycommons",
      "regex":"^\d+$",
      "fullName":"Pathway Commons"
   },
   {
      "database":"PDB",
      "id":"Pd",
      "homePage":"http://www.pdb.org/",
      "linkOut":"http://www.rcsb.org/pdb/explore/explore.do?structureId=$id",
      "example":"2gc4",
      "dataNodeType":"protein",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:pdb",
      "regex":"^[0-9][A-Za-z0-9]{3}$",
      "fullName":"Protein Data Bank"
   },
   {
      "database":"Pfam",
      "id":"Pf",
      "homePage":"http://pfam.sanger.ac.uk/",
      "linkOut":"http://pfam.sanger.ac.uk/family/$id/",
      "example":"PF01234",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pfam",
      "regex":"^PF\d{5}$",
      "fullName":"Pfam"
   },
   {
      "database":"PharmGKB Drug",
      "id":"Pgd",
      "homePage":"http://www.pharmgkb.org/",
      "linkOut":"http://www.pharmgkb.org/drug/$id",
      "example":"PA448710",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pharmgkb.drug",
      "regex":"^PA\d+$",
      "fullName":"PharmGKB Drug"
   },
   {
      "database":"PharmGKB Gene",
      "id":"Pgg",
      "homePage":"http://www.pharmgkb.org/",
      "linkOut":"http://www.pharmgkb.org/gene/$id",
      "example":"PA131",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pharmgkb.gene",
      "regex":"^PA\w+$",
      "fullName":"PharmGKB Gene"
   },
   {
      "database":"PharmGKB Pathways",
      "id":"Pgp",
      "homePage":"http://www.pharmgkb.org/",
      "linkOut":"http://www.pharmgkb.org/pathway/$id",
      "example":"PA146123006",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pharmgkb.pathways",
      "regex":"^PA\d+$",
      "fullName":"PharmGKB Pathways"
   },
   {
      "database":"PhosphoSite Protein",
      "id":"Pp",
      "homePage":"http://www.phosphosite.org/homeAction.do",
      "linkOut":"http://www.phosphosite.org/proteinAction.do?id=$id",
      "example":"12300",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:phosphosite.protein",
      "regex":"^\d{5}$",
      "fullName":"PhosphoSite Protein"
   },
   {
      "database":"PINA",
      "id":"Pi",
      "homePage":"http://cbg.garvan.unsw.edu.au/pina/",
      "linkOut":"http://cbg.garvan.unsw.edu.au/pina/interactome.oneP.do?ac=$id&showExtend=null",
      "example":"Q13485",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pina",
      "regex":"^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9])$",
      "fullName":"PINA"
   },
   {
      "database":"PlantGDB",
      "id":"Pl",
      "homePage":"http://www.plantgdb.org/",
      "linkOut":"",
      "example":"PUT-157a-Vitis_vinifera-37378",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Pl",
      "regex":"PUT-[\w\d-]+",
      "fullName":"PlantGDB"
   },
   {
      "database":"PubChem-bioassay",
      "id":"Cpb",
      "homePage":"http://www.ncbi.nlm.nih.gov/sites/entrez?db=pcassay ",
      "linkOut":"http://pubchem.ncbi.nlm.nih.gov/assay/assay.cgi?aid=$id",
      "example":"1018",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pubchem.bioassay",
      "regex":"^\d+$",
      "fullName":"PubChem-bioassay"
   },
   {
      "database":"PubChem-compound",
      "id":"Cpc",
      "homePage":"http://pubchem.ncbi.nlm.nih.gov/",
      "linkOut":"http://pubchem.ncbi.nlm.nih.gov/summary/summary.cgi?cid=$id",
      "example":"100101",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pubchem.compound",
      "regex":"^\d+$",
      "fullName":"PubChem-compound"
   },
   {
      "database":"PubChem-substance",
      "id":"Cps",
      "homePage":"http://pubchem.ncbi.nlm.nih.gov/",
      "linkOut":"http://pubchem.ncbi.nlm.nih.gov/summary/summary.cgi?sid=$id",
      "example":"100101",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:pubchem.substance",
      "regex":"^\d+$",
      "fullName":"PubChem-substance"
   },
   {
      "database":"Reactome",
      "id":"Re",
      "homePage":"http://www.reactome.org/",
      "linkOut":"http://www.reactome.org/cgi-bin/eventbrowser_st_id?FROM_REACTOME=1&ST_ID=$id",
      "example":"REACT_1590",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:reactome",
      "regex":"^REACT_\d+(\.\d+)?$",
      "fullName":"Reactome"
   },
   {
      "database":"RefSeq",
      "id":"Q",
      "homePage":"http://www.ncbi.nlm.nih.gov/projects/RefSeq/",
      "linkOut":"http://www.ncbi.nlm.nih.gov/entrez/viewer.fcgi?val=$id",
      "example":"NP_012345",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:refseq",
      "regex":"^(NC|AC|NG|NT|NW|NZ|NM|NR|XM|XR|NP|AP|XP|ZP)_\d+$",
      "fullName":"RefSeq"
   },
   {
      "database":"RESID",
      "id":"Res",
      "homePage":"http://www.ebi.ac.uk/RESID/",
      "linkOut":"http://srs.ebi.ac.uk/srsbin/cgi-bin/wgetz?-id+6JSUg1NA6u4+-e+[RESID:'$id']",
      "example":"AA0001",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:resid",
      "regex":"^AA\d{4}$",
      "fullName":"RESID"
   },
   {
      "database":"Rfam",
      "id":"Rf",
      "homePage":"",
      "linkOut":"http://www.sanger.ac.uk/cgi-bin/Rfam/getacc?$id",
      "example":"RF00066",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Rf",
      "regex":"RF\d+",
      "fullName":"RFAM"
   },
   {
      "database":"RGD",
      "id":"R",
      "homePage":"http://rgd.mcw.edu/",
      "linkOut":"http://rgd.mcw.edu/tools/genes/genes_view.cgi?id=$id",
      "example":"2018",
      "dataNodeType":"gene",
      "species":"Rattus norvegicus",
      "priority":1,
      "unknown":"urn:miriam:rgd",
      "regex":"^\d{4,7}$",
      "fullName":"Rat Genome Database"
   },
   {
      "database":"Rhea",
      "id":"Rh",
      "homePage":"http://www.ebi.ac.uk/rhea/",
      "linkOut":"http://www.ebi.ac.uk/rhea/reaction.xhtml?id=$id",
      "example":"12345",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:rhea",
      "regex":"^\d{5}$",
      "fullName":"Rhea"
   },
   {
      "database":"Rice Ensembl Gene",
      "id":"Os",
      "homePage":"http://www.gramene.org/Oryza_sativa",
      "linkOut":"http://www.gramene.org/Oryza_sativa/geneview?gene=$id",
      "example":"LOC_Os04g54800",
      "dataNodeType":"gene",
      "species":"Oryza sativa",
      "priority":1,
      "unknown":"Os",
      "regex":"",
      "fullName":"Rice Ensembl Gene"
   },
   {
      "database":"SGD",
      "id":"D",
      "homePage":"http://www.yeastgenome.org/",
      "linkOut":"http://www.yeastgenome.org/cgi-bin/locus.fpl?dbid=$id",
      "example":"S000028457",
      "dataNodeType":"gene",
      "species":"Saccharomyces cerevisiae",
      "priority":1,
      "unknown":"urn:miriam:sgd",
      "regex":"^S\d+$",
      "fullName":"SGD"
   },
   {
      "database":"Small Molecule Pathway Database",
      "id":"Sm",
      "homePage":"http://www.smpdb.ca/pathways",
      "linkOut":"http://pathman.smpdb.ca/pathways/$id/pathway",
      "example":"SMP00001",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:smpdb",
      "regex":"^SMP\d{5}$",
      "fullName":"Small Molecule Pathway Database"
   },
   {
      "database":"SMART",
      "id":"Sma",
      "homePage":"http://smart.embl-heidelberg.de/",
      "linkOut":"http://smart.embl-heidelberg.de/smart/do_annotation.pl?DOMAIN=$id",
      "example":"SM00015",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:smart",
      "regex":"^SM\d{5}$",
      "fullName":"SMART"
   },
   {
      "database":"SPIKE",
      "id":"Sk",
      "homePage":"http://www.cs.tau.ac.il/~spike/",
      "linkOut":"http://www.cs.tau.ac.il/~spike/maps/$id.html",
      "example":"spike00001",
      "dataNodeType":"interaction",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:spike.map",
      "regex":"^spike\d{5}$",
      "fullName":"SPIKE Map"
   },
   {
      "database":"SPRINT",
      "id":"Spr",
      "homePage":"http://www.bioinf.manchester.ac.uk/dbbrowser/sprint/",
      "linkOut":"http://www.bioinf.manchester.ac.uk/cgi-bin/dbbrowser/sprint/searchprintss.cgi?prints_accn=$id&display_opts=Prints&category=None&queryform=false&regexpr=off",
      "example":"PR00001",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:sprint",
      "regex":"^PR\d{5}$",
      "fullName":"SPRINT"
   },
   {
      "database":"STRING",
      "id":"Str",
      "homePage":"http://string.embl.de/",
      "linkOut":"http://string.embl.de/interactions/$id",
      "example":"P53350",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:string",
      "regex":"^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9])|([0-9][A-Za-z0-9]{3})$",
      "fullName":"STRING"
   },
   {
      "database":"SubstrateDB",
      "id":"Sdb",
      "homePage":"http://substrate.burnham.org/",
      "linkOut":"http://substrate.burnham.org/protein/annotation/$id/html",
      "example":"1915",
      "dataNodeType":"protein",
      "species":"",
      "priority":0,
      "unknown":"urn:miriam:pmap.substratedb",
      "regex":"^\d+$",
      "fullName":"SubstrateDB"
   },
   {
      "database":"SubtiWiki",
      "id":"Sw",
      "homePage":"http://www.subtiwiki.uni-goettingen.de/wiki/index.php/Main_Page",
      "linkOut":"http://www.subtiwiki.uni-goettingen.de/wiki/index.php/$id",
      "example":"BSU29180",
      "dataNodeType":"gene",
      "species":"Bacillus subtilis",
      "priority":1,
      "unknown":"urn:miriam:subtiwiki",
      "regex":"^BSU\d{5}$",
      "fullName":"SubtiWiki"
   },
   {
      "database":"SUPFAM",
      "id":"Sf",
      "homePage":"http://supfam.org/SUPERFAMILY/",
      "linkOut":"http://supfam.org/SUPERFAMILY/cgi-bin/scop.cgi?ipid=$id",
      "example":"SSF57615",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:supfam",
      "regex":"^\w+$",
      "fullName":"SUPFAM"
   },
   {
      "database":"SWISS-MODEL",
      "id":"Sw",
      "homePage":"http://swissmodel.expasy.org/",
      "linkOut":"http://swissmodel.expasy.org/repository/smr.php?sptr_ac=$id",
      "example":"P23298",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:swiss-model",
      "regex":"^\w+$",
      "fullName":"SWISS-MODEL"
   },
   {
      "database":"Systems Biology Ontology",
      "id":"Sbo",
      "homePage":"http://www.ebi.ac.uk/sbo/",
      "linkOut":"http://www.ebi.ac.uk/sbo/main/$id",
      "example":"SBO:0000262",
      "dataNodeType":"ontology",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:biomodels.sbo",
      "regex":"^SBO:\d{7}$",
      "fullName":"Systems Biology Ontology"
   },
   {
      "database":"TAIR",
      "id":"A",
      "homePage":"http://arabidopsis.org/index.jsp",
      "linkOut":"http://arabidopsis.org/servlets/TairObject?type=locus&name=$id",
      "example":"AT1G01030",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:tair.locus",
      "regex":"^AT[1-5]G\d{5}$",
      "fullName":"TAIR Locus"
   },
   {
      "database":"TIGR",
      "id":"Ti",
      "homePage":"http://www.jcvi.org/",
      "linkOut":"",
      "example":"12012.t00308",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Ti",
      "regex":"",
      "fullName":"TIGR"
   },
   {
      "database":"TTD Drug",
      "id":"Td",
      "homePage":"http://bidd.nus.edu.sg/group/cjttd/TTD_HOME.asp",
      "linkOut":"http://bidd.nus.edu.sg/group/cjttd/ZFTTDDRUG.asp?ID=$id",
      "example":"DAP000773",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ttd.drug",
      "regex":"^DAP\d+$",
      "fullName":"TTD Drug"
   },
   {
      "database":"TTD Target",
      "id":"Tt",
      "homePage":"http://bidd.nus.edu.sg/group/cjttd/TTD_HOME.asp",
      "linkOut":"http://bidd.nus.edu.sg/group/cjttd/ZFTTDDetail.asp?ID=$id",
      "example":"TTDS00056",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:ttd.target",
      "regex":"^TTDS\d+$",
      "fullName":"TTD Target"
   },
   {
      "database":"TubercuList",
      "id":"Tb",
      "homePage":"http://tuberculist.epfl.ch",
      "linkOut":"http://tuberculist.epfl.ch/quicksearch.php?gene+name=$id",
      "example":"Rv0064",
      "dataNodeType":"gene",
      "species":"Mycobacterium tuberculosis",
      "priority":1,
      "unknown":"Tb",
      "regex":"Rv\d{4}(A|B|c|\.\d)?",
      "fullName":"TubercuList"
   },
   {
      "database":"UCSC Genome Browser",
      "id":"Uc",
      "homePage":"http://genome.ucsc.edu/",
      "linkOut":"http://genome.ucsc.edu/cgi-bin/hgTracks?position=$id",
      "example":"uc001tyh.1",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"Uc",
      "regex":"uc\d{3}[a-z]{3}\.\d",
      "fullName":"UCSC Genome Browser"
   },
   {
      "database":"UniGene",
      "id":"U",
      "homePage":"http://www.ncbi.nlm.nih.gov/sites/entrez?db=unigene",
      "linkOut":"http://www.ncbi.nlm.nih.gov/UniGene/clust.cgi?UGID=1548618&SEARCH=$id",
      "example":"Hs.553708",
      "dataNodeType":"gene",
      "species":"",
      "priority":1,
      "unknown":"U",
      "regex":"[A-Z][a-z][a-z]?\.\d+",
      "fullName":"UniGene"
   },
   {
      "database":"Unipathway",
      "id":"Up",
      "homePage":"http://www.grenoble.prabi.fr/obiwarehouse/unipathway",
      "linkOut":"http://www.grenoble.prabi.fr/obiwarehouse/unipathway/upa?upid=$id",
      "example":"UPA00206",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:unipathway",
      "regex":"^UPA\d{5}$",
      "fullName":"Unipathway"
   },
   {
      "database":"Uniprot-TrEMBL",
      "id":"S",
      "homePage":"http://www.uniprot.org/",
      "linkOut":"http://www.uniprot.org/uniprot/$id",
      "example":"P62158",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:uniprot",
      "regex":"^([A-N,R-Z][0-9][A-Z][A-Z, 0-9][A-Z, 0-9][0-9])|([O,P,Q][0-9][A-Z, 0-9][A-Z, 0-9][A-Z, 0-9][0-9])|($",
      "fullName":"UniProtKB/TrEMBL"
   },
   {
      "database":"Uniprot-SwissProt",
      "id":"Sp",
      "homePage":"http://www.uniprot.org/",
      "linkOut":"http://www.uniprot.org/uniprot/$id",
      "example":"CALM_HUMAN",
      "dataNodeType":"protein",
      "species":"",
      "priority":1,
      "unknown":"Sp",
      "regex":"^[A-Z0-9]+_[A-Z]+$",
      "fullName":"UniProtKB/Swiss-Prot"
   },
   {
      "database":"Wheat gene names",
      "id":"Wn",
      "homePage":"http://wheat.pw.usda.gov/",
      "linkOut":"http://wheat.pw.usda.gov/report?class=gene;name=$id",
      "example":"5S-Rrna-D1_(Triticum)",
      "dataNodeType":"gene",
      "species":"Triticum aestivum",
      "priority":1,
      "unknown":"Wn",
      "regex":"",
      "fullName":"Wheat gene names"
   },
   {
      "database":"Wheat gene refs",
      "id":"Wr",
      "homePage":"http://wheat.pw.usda.gov/",
      "linkOut":"http://wheat.pw.usda.gov/cgi-bin/graingenes/report.cgi?class=reference&name=$id",
      "example":"WGS-95-1333",
      "dataNodeType":"probe",
      "species":"Triticum aestivum",
      "priority":0,
      "unknown":"Wr",
      "regex":"",
      "fullName":"Wheat gene refs"
   },
   {
      "database":"WikiGenes",
      "id":"Wg",
      "homePage":"http://www.wikigenes.org/",
      "linkOut":"http://www.wikigenes.org/e/gene/e/$id.html",
      "example":"7157",
      "dataNodeType":"gene",
      "species":"",
      "priority":0,
      "unknown":"Wg",
      "regex":"",
      "fullName":"WikiGenes"
   },
   {
      "database":"WikiPathways",
      "id":"Wp",
      "homePage":"http://www.wikipathways.org/",
      "linkOut":"http://www.wikipathways.org/index.php/Pathway:$id",
      "example":"WP100",
      "dataNodeType":"pathway",
      "species":"",
      "priority":1,
      "unknown":"urn:miriam:wikipathways",
      "regex":"WP\d{1,5}",
      "fullName":"WikiPathways"
   },
   {
      "database":"Wikipedia",
      "id":"Wi",
      "homePage":"http://www.wikipedia.org",
      "linkOut":"http://en.wikipedia.org/wiki/$id",
      "example":"Acetate",
      "dataNodeType":"metabolite",
      "species":"",
      "priority":0,
      "unknown":"Wi",
      "regex":"",
      "fullName":"Wikipedia"
   },
   {
      "database":"WormBase",
      "id":"W",
      "homePage":"http://www.wormbase.org/",
      "linkOut":"http://www.wormbase.org/db/gene/gene?name=$id;class=Gene",
      "example":"WBGene00000001",
      "dataNodeType":"gene",
      "species":"Caenorhabditis elegans",
      "priority":1,
      "unknown":"urn:miriam:wormbase",
      "regex":"^WBGene\d{8}$",
      "fullName":"WormBase"
   },
   {
      "database":"ZFIN",
      "id":"Z",
      "homePage":"http://zfin.org",
      "linkOut":"http://zfin.org/action/marker/view/$id",
      "example":"ZDB-GENE-041118-11",
      "dataNodeType":"gene",
      "species":"Danio rerio",
      "priority":1,
      "unknown":"urn:miriam:zfin",
      "regex":"ZDB\-GENE\-\d+\-\d+",
      "fullName":"ZFIN Gene"
   }
];
;

pathvisiojs.data.biopax = function(){

  // TODO get ontology terms and other data

  function toRenderableJson(xmlBiopax, callback) {
    try {
      d3.ns.prefix.bp = 'http://www.biopax.org/owldoc/Level3/';
      d3.ns.prefix.rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
      d3.ns.qualify('bp:PublicationXref');      
      var xmlBiopaxPubs = xmlBiopax.selectAll('PublicationXref');
      var jsonBiopax = {};
      jsonBiopax.PublicationXref = [];
      var publicationXref;
      xmlBiopaxPubs.each(function() {
        publicationXref = {};
        publicationXref.rdfId = d3.select(this).attr('rdf:id').toString();
        jsonBiopax.PublicationXref.push(publicationXref);
      });
      callback(jsonBiopax);
    }
    catch (e) {
      throw new Error("Error converting biopax to json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();

;

"use strict";
pathvisiojs.data.gpml = function(){

  var pathvisioDefaultStyleValues = {
    'FontSize':{
      'Type':"FontSize",
      'Value':10
    }
  }

  function gpmlColorToCssColor(gpmlColor, pathvisioDefault) {
    var color;
    if (gpmlColor !== pathvisioDefault) {
      if (!!gpmlColor) {
        color = new RGBColor(gpmlColor);
        if (color.ok) {
          return color.toHex();
        }
        else {
          return 'black';
        }
      }
      else {
        return 'black';
      }
    }
    else {
      return null;
    }
  }

  function setColorAsJson(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
    var jsonColor;
    if (currentGpmlColorValue !== defaultGpmlColorValue) {
      jsonColor = gpmlColorToCssColor(currentGpmlColorValue, defaultGpmlColorValue);
      jsonElement.color = jsonColor;
      jsonElement.borderColor = jsonColor;
      if (jsonElement.hasOwnProperty('text')) {
        jsonElement.text.color = jsonColor;
      }
    }
    return jsonElement;
  }

  // TODO can we delete this function?

  function getLineStyle(gpmlElement) {
    var LineStyle, attributes; 
    var graphics = gpmlElement.select('Graphics');
    if (!!graphics) {
      LineStyle = graphics.attr('LineStyle'); 
      if (!!LineStyle) {
        return LineStyle;
      }
      else {

        // As currently specified, a given element can only have one LineStyle.
        // This one LineStyle can be solid, dashed (broken) or double.
        // If no value is specified in GPML for LineStyle, then we need to check
        // for whether the element has LineStyle of double.

        attributes = gpmlElement.selectAll('Attribute');
        if (attributes.length > 0) {
          LineStyle = attributes.filter(function(d, i) {
            return d3.select(this).attr('Key') === 'org.pathvisiojs.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
          });

          if (LineStyle[0].length > 0) {
            return 'double';
          }
          else {
            return null;
          }
        }
        else {
          return null;
        }
      }
    }
  }

  function getBorderStyle(gpmlLineStyle, pathvisioDefault) {

    // Double-lined EntityNodes will be handled by using a symbol with double lines.
    // Double-lined edges will be rendered as single-lined, solid edges, because we
    // shouldn't need double-lined edges other than for cell walls/membranes, which
    // should be symbols. Any double-lined edges are curation issues.

    var lineStyleToBorderStyleMapping = {
      'Solid':'solid',
      'Double':'solid',
      'Broken':'dashed'
    };
    var borderStyle;
    if (gpmlLineStyle !== pathvisioDefault) {
      if (!!gpmlLineStyle) {
        borderStyle = lineStyleToBorderStyleMapping[gpmlLineStyle];
        if (borderStyle) {
          return borderStyle;
        }
        else {
          console.warn('LineStyle "' + gpmlLineStyle + '" does not have a corresponding borderStyle. Using "solid"');
          return 'solid';
        }
      }
      else {
        return 'solid';
      }
    }
    else {

      // TODO use code to actually get the default
      
      return 'whatever the default value is';
    }
  }

  function setBorderStyleAsJson(jsonElement, currentGpmlLineStyleValue, defaultGpmlLineStyleValue) {
    var borderStyle;

    // this check happens twice because it doesn't make sense to have getBorderStyle() tell us
    // whether it has returned the default value, and we need to know whether we are using the
    // default here.

    if (currentGpmlLineStyleValue !== defaultGpmlLineStyleValue) {
      borderStyle = getBorderStyle(currentGpmlLineStyleValue, defaultGpmlLineStyleValue);
      jsonElement.borderStyle = borderStyle;
    }
    return jsonElement;
  }

  function toRenderableJson(gpml, pathwayIri, callbackOutside){
    var gpmlPathway = d3.select(gpml).select('Pathway');

    // for doing this in Java, we could look at 
    // https://code.google.com/p/json-io/

    console.log('GPML');
    console.log(gpml);

    var pathway = {};
    pathway.xmlns = gpmlPathway.attr('xmlns');

    // test for whether file is GPML

    if ( pathvisiojs.data.gpml.namespaces.indexOf(pathway.xmlns) !== -1 ) {

      // test for whether the GPML file version matches the latest version (only the latest version will be supported by pathvisiojs).

      if (pathvisiojs.data.gpml.namespaces.indexOf(pathway.xmlns) !== 0) {

        // preferably, this would call the Java RPC updater for the file to be updated.

        alert('Pathvisiojs may not fully support the version of GPML provided (xmlns: ' + pathway.xmlns + '). Please convert to the supported version of GPML (xmlns: ' + pathvisiojs.data.gpml.namespaces[0] + ').');
      }

      async.parallel({
          '@context': function(callback){
            pathway['@context'] = {
              '@vocab':'http://vocabularies.wikipathways.org/gpml#',
              'gpml':'http://vocabularies.wikipathways.org/gpml#',
              'xsd': 'http://www.w3.org/2001/XMLSchema#',
              'wp':'http://vocabularies.wikipathways.org/wp#',
              'biopax': 'http://www.biopax.org/release/biopax-level3.owl#',
              'schema':'http://schema.org/',
              'hMDB':'http://www.hmdb.ca/metabolites/HMDB',
              'entrezGene':'http://www.ncbi.nlm.nih.gov/gene/',
              'ChEBI':'http://www.ebi.ac.uk/chebi/searchId.do?chebiId=',
              'media':'http://www.w3.org/TR/mediaont-10/',
              'ex':'http://www.example.com/',
              'pathwayIri':pathwayIri,
              'PublicationXref':'biopax:PublicationXref',
              'gpmlFolder':'file://Users/andersriutta/Sites/pathvisiojs/test/gpml/',
              'name':'http://xmlns.com/foaf/0.1/name',
              'dcterms':'http://purl.org/dc/terms/',
              'css2':'http://www.w3.org/TR/CSS2/',
              'css3Ui':'http://www.w3.org/TR/css3-ui/#',
              'cssTransform':'http://www.w3.org/TR/css-transforms-1/#',
              'svg':'http://www.w3.org/TR/SVG11/',
              'boxSizing':{
                '@id':'css3Ui:box-sizing',
                '@value':'border-box'
              },
              'rotate':'cssTransform:funcdef-rotate',
              'position':'css2:visuren.html#propdef-position',
              'color':'css2:colors.html#propdef-color', //foreground color
              'backgroundColor':'css2:colors.html#propdef-background-color',
              'backgroundImage':'css2:colors.html#propdef-background-image',
              'borderColor':'css2:box.html#propdef-border-color',
              'borderWidth':'css2:box.html#propdef-border-width',
              'borderStyle':'css2:box.html#propdef-border-style',
              'x':'css2:visuren.html#propdef-left',
              'y':'css2:visuren.html#propdef-top',
              'width':'css2:visudet.html#propdef-width',
              'height':'css2:visudet.html#propdef-height',
              'padding':'css2:box.html#propdef-padding',
              'fontFamily':'css2:fonts.html#font-family-prop',
              'fontStyle':'css2:fonts.html#propdef-font-style', //italic
              'textAlign':'css2:text.html#propdef-text-align', //left | right | center
              'verticalAlign':'css2:visudet.html#propdef-vertical-align', //top | bottom | middle
              'fontSize':'css2:fonts.html#propdef-font-size',
              'fontWeight':'css2:fonts.html#propdef-font-weight', //normal | bold
              'zIndex': {
                '@id': 'css2:z-index',
                '@type': 'xsd:integer'
              },
              'DatasourceReference': 'wp:DatasourceReference',
              'DataSource': 'gpml:Data-Source',
              'LastModified': 'gpml:Last-Modified',
              'Pathway': 'biopax:Pathway',
              'shapeLibrary': 'http://shapelibrary.example.org/',
              'shapeName': 'shapeLibrary:shapeName',
              'image': 'schema:image',
              'dataNodeType': 'gpml:Type',
              'author': 'schema:author',
              'organism': 'biopax:organism',
              'stroke': 'svg:painting.html#StrokeProperty',
              'strokeWidth': 'svg:painting.html#StrokeWidthProperty',
              /*
              'text': {
                '@id': 'svg:text.html#TextElement',
                '@type': '@id'
              },
              //*/
              'tspan': {
                '@id': 'svg:text.html#TSpanElement',
                '@container': '@set'
              },
              'Group': {
                '@id': 'gpml:Group',
                '@container': '@list'
              },
              'pathwayElements': {
                '@id': 'ex:pathwayElements/',
                '@container': '@list'
              },
              'contains': {
                '@id': 'ex:contains',
                '@type': '@id'
                //'@container': '@list'
              },
              'isContainedBy': {
                '@reverse': 'ex:contains',
                '@type': '@id'
              },
              'edge': {
                '@type': '@id',
                '@container':'@list',
                'InteractionGraph': {
                  '@type': '@id',
                  '@container':'@list'
                }
              },
              //*
              'InteractionGraph': {
                '@type': '@id',
                '@container':'@list'
              },
              /*
               * Defining this as shown below works. It ensures InteractionGraph is an array.
              'InteractionGraph': {
                '@type': '@id',
                '@container':'@list'
              },
              //*/
              /*
               * Defining this as shown below makes it so the members are not included. I don't know why.
              'InteractionGraph': {
                '@id': 'ex:InteractionGraph',
                '@type': '@id'
              },
              //*/
              'interactsWith': {
                '@id': 'ex:interactsWith',
                '@type': '@id',
              },
              'Interaction': {
                '@id': 'biopax:Interaction',
                '@type': '@id'
              },
              'Point': {
                '@id': 'gpml:Point',
                '@container': '@list'
              }
            };
            callback(null, pathway['@context']);
          },
          PublicationXref: function(callback){
            pathvisiojs.data.gpml.biopaxRef.getAllAsRenderableJson(gpmlPathway, function(publicationXrefs) {
              if (!!publicationXrefs) {
                pathway.PublicationXref = publicationXrefs;
                callback(null, 'BiopaxRefs are all converted.');
              }
              else {
                callback(null, 'No biopaxRefs to convert.');
              }
            });
          },
          DataSource: function(callback){
            var jsonDataSource = gpmlPathway.attr('Data-Source');
            if (!!jsonDataSource) {
              pathway.DataSource = jsonDataSource;
              callback(null, 'DataSource converted.');
            }
            else {
              callback(null, 'No DataSource to convert.');
            }
          },
          Version: function(callback){
            var jsonVersion = gpmlPathway.attr('Version');
            if (!!jsonVersion) {
              pathway.Version = jsonVersion;
              callback(null, 'Version converted.');
            }
            else {
              callback(null, 'No Version to convert.');
            }
          },
          Author: function(callback){
            var jsonAuthor = gpmlPathway.attr('Author');
            if (!!jsonAuthor) {
              pathway.Author = jsonAuthor;
              callback(null, 'Author converted.');
            }
            else {
              callback(null, 'No Author to convert.');
            }
          },
          Maintainer: function(callback){
            var jsonMaintainer = gpmlPathway.attr('Maintainer');
            if (!!jsonMaintainer) {
              pathway.Maintainer = jsonMaintainer;
              callback(null, 'Maintainer converted.');
            }
            else {
              callback(null, 'No Maintainer to convert.');
            }
          },
          Email: function(callback){
            var jsonEmail = gpmlPathway.attr('Email');
            if (!!jsonEmail) {
              pathway.Email = jsonEmail;
              callback(null, 'Email converted.');
            }
            else {
              callback(null, 'No Email to convert.');
            }
          },
          LastModified: function(callback){
            var jsonLastModified = gpmlPathway.attr('Last-Modified');
            if (!!jsonLastModified) {
              pathway.LastModified = jsonLastModified;
              callback(null, 'LastModified converted.');
            }
            else {
              callback(null, 'No LastModified to convert.');
            }
          },
          License: function(callback){
            var jsonLicense = gpmlPathway.attr('License');
            if (!!jsonLicense) {
              pathway.License = jsonLicense;
              callback(null, 'License converted.');
            }
            else {
              callback(null, 'No License to convert.');
            }
          },
          Name: function(callback){
            var jsonName = gpmlPathway.attr('Name');
            if (!!jsonName) {
              pathway.Name = jsonName;
              callback(null, 'Name converted.');
            }
            else {
              callback(null, 'No Name to convert.');
            }
          },
          Organism: function(callback){
            var jsonOrganism = gpmlPathway.attr('Organism');
            if (!!jsonOrganism) {
              pathway.Organism = jsonOrganism;
              callback(null, 'Organism converted.');
            }
            else {
              callback(null, 'No Organism to convert.');
            }
          },
          image: function(callback){
            pathway.image = {
              '@context': {
                '@vocab': 'http://schema.org/'
              },
              'width':parseFloat(gpmlPathway.select('Graphics').attr('BoardWidth')),
              'height':parseFloat(gpmlPathway.select('Graphics').attr('BoardHeight'))
            };
            callback(null, pathway.image);
          },
          Biopax: function(callback){
            var xmlBiopax = gpmlPathway.selectAll('Biopax');
            if (xmlBiopax[0].length > 0) {
              pathvisiojs.data.biopax.toRenderableJson(xmlBiopax, function(jsonBiopax) {
                pathway.Biopax = jsonBiopax;
              });
              callback(null, 'Biopax all converted.');
            }
            else {
              callback(null, 'No Biopax to convert.');
            }
          },
          DataNode: function(callback){
            var gpmlDataNode, dataNodes = gpmlPathway.selectAll('DataNode');
            if (dataNodes[0].length > 0) {
              pathway.DataNode = [];
              dataNodes.each(function() {
                gpmlDataNode = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.dataNode.toRenderableJson(gpmlDataNode, pathwayIri, function(jsonDataNode) {
                  pathway.DataNode.push(jsonDataNode);
                });
              })
              callback(null, 'DataNodes are all converted.');
            }
            else {
              callback(null, 'No dataNodes to convert.');
            }
          },
          Label: function(callback){
            var gpmlLabel, labels = gpmlPathway.selectAll('Label');
            if (labels[0].length > 0) {
              pathway.Label = [];
              gpmlPathway.selectAll('Label').each(function() {
                gpmlLabel = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.label.toRenderableJson(gpmlLabel, pathwayIri, function(jsonLabel) {
                  pathway.Label.push(jsonLabel);
                });
              })
              callback(null, 'Labels are all converted.');
            }
            else {
              callback(null, 'No labels to convert.');
            }
          },
          Shape: function(callback){
            var gpmlShape, shapes = gpmlPathway.selectAll('Shape');
            if (shapes[0].length > 0) {
              pathway.Shape = [];
              gpmlPathway.selectAll('Shape').each(function() {
                gpmlShape = d3.select(this);
                pathvisiojs.data.gpml.element.node.entityNode.shape.toRenderableJson(gpmlShape, pathwayIri, function(jsonShape) {
                  pathway.Shape.push(jsonShape);
                });
              })
              callback(null, 'Shapes are all converted.');
            }
            else {
              callback(null, 'No shapes to convert.');
            }
          },
          Group: function(callback){
            var gpmlGroup, groups = gpmlPathway.selectAll('Group');
            if (groups[0].length > 0) {
              pathway.Group = [];
              gpmlPathway.selectAll('Group').each(function() {
                gpmlGroup = d3.select(this);
                pathvisiojs.data.gpml.element.node.groupNode.toRenderableJson(gpml, gpmlGroup, pathwayIri, function(jsonGroup) {
                  pathway.Group.push(jsonGroup);
                });
              })
              callback(null, 'Groups are all converted.');
            }
            else {
              callback(null, 'No groups to convert.');
            }
          },
          //*
          GraphicalLine: function(callback){
            var gpmlGraphicalLine, graphicalLines = gpmlPathway.selectAll('GraphicalLine');
            if (graphicalLines[0].length > 0) {
              pathway.GraphicalLine = [];
              gpmlPathway.selectAll('GraphicalLine').each(function() {
                gpmlGraphicalLine = d3.select(this);
                pathvisiojs.data.gpml.edge.graphicalLine.toRenderableJson(gpml, gpmlGraphicalLine, pathwayIri, function(jsonGraphicalLine) {
                  pathway.GraphicalLine.push(jsonGraphicalLine);
                });
              })
              callback(null, 'GraphicalLines are all converted.');
            }
            else {
              callback(null, 'No graphicalLines to convert.');
            }
          },
          //*/
          Interaction: function(callback){
            var gpmlInteraction, interactions = gpmlPathway.selectAll('Interaction');
            if (interactions[0].length > 0) {
              pathway.Interaction = [];
              gpmlPathway.selectAll('Interaction').each(function() {
                gpmlInteraction = d3.select(this);
                pathvisiojs.data.gpml.edge.interaction.toRenderableJson(gpml, gpmlInteraction, pathwayIri, function(jsonInteraction) {
                  pathway.Interaction.push(jsonInteraction);
                });
              })
              callback(null, 'Interactions are all converted.');
            }
            else {
              callback(null, 'No interactions to convert.');
            }
          }
      },
      function(err, results) {
        var groupsFrame, jsonGroups = [];
        if (!!pathway.Group) {
          groupsFrame = {
            '@context': pathway['@context'],
            '@type': 'GroupNode',
            'contains': {}
          };  
          jsonld.frame(pathway, groupsFrame, function(err, framedGroups) {
            console.log('framedGroups');
            console.log(framedGroups);
            framedGroups['@graph'].forEach(function(jsonGroup) {

              // Some GPML files contain empty groups due to a PathVisio-Java bug. They should be deleted.

              if (!!jsonGroup.contains) {
                pathvisiojs.data.gpml.element.node.groupNode.calculateImplicitRenderingData(jsonGroup, function(updatedJsonGroup) {
                  console.log('jsonGroup in gpml.js');
                  console.log(jsonGroup);
                  jsonGroups.push(updatedJsonGroup);
                });
              }
            });
            pathway.Group = jsonGroups;
            self.myPathway = pathway;
            callbackOutside(pathway);
          });
        }
        else {
          self.myPathway = pathway;
          callbackOutside(pathway);
        }
      });
/*
      // Comments 

      try {
        if (pathway.hasOwnProperty('comment')) {
          pathway.comments = pathvisiojs.utilities.convertToArray( pathway.comment );
          delete pathway.comment;

          pathway.comments.forEach(function(element, index, array) {
            // modify data
          });
        }
        else {
          console.log('No element(s) named 'comment' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting comment to json: ' + e.message);
      }

      // Graphical Lines 

      try {
        if (pathway.hasOwnProperty('graphicalLine')) {
          var graphicalLines = pathvisiojs.utilities.convertToArray( pathway.graphicalLine );
          delete pathway.graphicalLine;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          }

          graphicalLines.forEach(function(element, index, array) {
            element.edgeType = 'graphical-line';
            pathway.edges.push(element);
          });
        }
        else {
          console.log('No element(s) named 'graphicalLine' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting graphicalLine to json: ' + e.message);
      }

      // Interactions

      try {
        if (pathway.hasOwnProperty('interaction')) {
          var interactions = pathvisiojs.utilities.convertToArray( pathway.interaction );
          delete pathway.interaction;

          if (pathway.edges === undefined) {
            pathway.edges = [];
          }

          interactions.forEach(function(element, index, array) {
            element.edgeType = 'interaction';
            pathway.edges.push(element);
          });

          interactions;
          pathway.edges;
        }
        else {
          console.log('No element(s) named 'interaction' found in this gpml file.');
        }
      }
      catch (e) {
        console.log('Error converting interaction to json: ' + e.message);
      }

      //*/
    }
    else {
      alert('Pathvisiojs does not support the data format provided. Please convert to GPML and retry.');
      throw new Error('Pathvisiojs does not support the data format provided. Please convert to GPML and retry.');
    }
  }

  return {
    toRenderableJson:toRenderableJson,
    getLineStyle:getLineStyle,
    getBorderStyle:getBorderStyle,
    setBorderStyleAsJson:setBorderStyleAsJson,
    gpmlColorToCssColor:gpmlColorToCssColor,
    setColorAsJson:setColorAsJson
  };
}();
;

"use strict";

// includes all GPML elements. Is parent of node and edge.

pathvisiojs.data.gpml.element = {};


var pathvisioDefaultStyleValues = {
  'FontSize':{
    'Type':"FontSize",
    'Value':10
  }
}

pathvisiojs.data.gpml.element.gpmlColorToCssColor = function(gpmlColor, pathvisioDefault) {
  var color;
  if (gpmlColor !== pathvisioDefault) {
    if (!!gpmlColor) {
      color = new RGBColor(gpmlColor);
      if (color.ok) {
        return color.toHex();
      }
      else {
        return 'black';
      }
    }
    else {
      return 'black';
    }
  }
  else {
    return null;
  }
}

pathvisiojs.data.gpml.element.setColorAsJson = function(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
  var jsonColor;
  if (currentGpmlColorValue !== defaultGpmlColorValue) {
    jsonColor = gpmlColorToCssColor(currentGpmlColorValue, defaultGpmlColorValue);
    jsonElement.color = jsonColor;
    jsonElement.borderColor = jsonColor;
    if (jsonElement.hasOwnProperty('text')) {
      jsonElement.text.color = jsonColor;
    }
  }
  return jsonElement;
}


pathvisiojs.data.gpml.element.setColorAsJson = function(jsonElement, currentGpmlColorValue, defaultGpmlColorValue) {
  var jsonColor;
  if (currentGpmlColorValue !== defaultGpmlColorValue) {
    jsonColor = gpmlColorToCssColor(currentGpmlColorValue, defaultGpmlColorValue);
    jsonElement.color = jsonColor;
    jsonElement.borderColor = jsonColor;
    if (jsonElement.hasOwnProperty('text')) {
      jsonElement.text.color = jsonColor;
    }
  }
  return jsonElement;
}

// TODO can we delete this function?

pathvisiojs.data.gpml.element.getLineStyle = function(gpmlElement) {
  var LineStyle, attributes; 
  var graphics = gpmlElement.select('Graphics');
  if (!!graphics) {
    LineStyle = graphics.attr('LineStyle'); 
    if (!!LineStyle) {
      return LineStyle;
    }
    else {

      // As currently specified, a given element can only have one LineStyle.
      // This one LineStyle can be solid, dashed (broken) or double.
      // If no value is specified in GPML for LineStyle, then we need to check
      // for whether the element has LineStyle of double.

      attributes = gpmlElement.selectAll('Attribute');
      if (attributes.length > 0) {
        LineStyle = attributes.filter(function(d, i) {
          return d3.select(this).attr('Key') === 'org.pathvisiojs.DoubleLineProperty' && d3.select(this).attr('Value') === 'Double';
        });

        if (LineStyle[0].length > 0) {
          return 'double';
        }
        else {
          return null;
        }
      }
      else {
        return null;
      }
    }
  }
}

pathvisiojs.data.gpml.element.getBorderStyle = function(gpmlLineStyle, pathvisioDefault) {

  // Double-lined EntityNodes will be handled by using a symbol with double lines.
  // Double-lined edges will be rendered as single-lined, solid edges, because we
  // shouldn't need double-lined edges other than for cell walls/membranes, which
  // should be symbols. Any double-lined edges are curation issues.

  var lineStyleToBorderStyleMapping = {
    'Solid':'solid',
    'Double':'solid',
    'Broken':'dashed'
  };
  var borderStyle;
  if (gpmlLineStyle !== pathvisioDefault) {
    if (!!gpmlLineStyle) {
      borderStyle = lineStyleToBorderStyleMapping[gpmlLineStyle];
      if (borderStyle) {
        return borderStyle;
      }
      else {
        console.warn('LineStyle "' + gpmlLineStyle + '" does not have a corresponding borderStyle. Using "solid"');
        return 'solid';
      }
    }
    else {
      return 'solid';
    }
  }
  else {

    // TODO use code to actually get the default

    return 'whatever the default value is';
  }
}

pathvisiojs.data.gpml.element.setBorderStyleAsJson = function(jsonElement, currentGpmlLineStyleValue, defaultGpmlLineStyleValue) {
  var borderStyle;

  // this check happens twice because it doesn't make sense to have getBorderStyle() tell us
  // whether it has returned the default value, and we need to know whether we are using the
  // default here.

  if (currentGpmlLineStyleValue !== defaultGpmlLineStyleValue) {
    borderStyle = getBorderStyle(currentGpmlLineStyleValue, defaultGpmlLineStyleValue);
    jsonElement.borderStyle = borderStyle;
  }
  return jsonElement;
}

// set default values. "swing" refers to PathVisio-Java.
pathvisiojs.data.gpml.element.color = {};
pathvisiojs.data.gpml.element.color.swing = '000000';
pathvisiojs.data.gpml.element.color.gpml = null;

pathvisiojs.data.gpml.element.fillColor = {};
pathvisiojs.data.gpml.element.fillColor.swing = 'ffffff';
pathvisiojs.data.gpml.element.fillColor.gpml = null;

pathvisiojs.data.gpml.element.lineStyle = {};
pathvisiojs.data.gpml.element.lineStyle.swing = 'Solid';
pathvisiojs.data.gpml.element.lineStyle.gpml = null;

pathvisiojs.data.gpml.element.fontSize = {};
pathvisiojs.data.gpml.element.fontSize.swing = 10;
pathvisiojs.data.gpml.element.fontSize.gpml = 10;

pathvisiojs.data.gpml.element.fontWeight = {};
pathvisiojs.data.gpml.element.fontWeight.swing = null;
pathvisiojs.data.gpml.element.fontWeight.gpml = null;

pathvisiojs.data.gpml.element.fontName = {};
pathvisiojs.data.gpml.element.fontName.swing = 'Arial';
pathvisiojs.data.gpml.element.fontName.gpml = null;
  
pathvisiojs.data.gpml.element.toRenderableJson = function(gpmlElement, jsonElement, elementCallback) {
  jsonElement["@type"] = jsonElement["@type"] || [];
  jsonElement["@type"].push("element");

  pathvisiojs.data.gpml.biopaxRef.getAllAsRenderableJson(gpmlElement, function(publicationXrefs) {
    if (!!publicationXrefs) {
      jsonElement.PublicationXref = publicationXrefs;
    }
    elementCallback(jsonElement);
  });

  /*
     var graphics = gpmlElement.select('Graphics'),
     zIndex,
     borderWidth;
     if (graphics[0].length > 0) {
     zIndex = graphics.attr('ZOrder') || 1;
     jsonElement.zIndex = parseFloat(borderWidth);

     borderWidth = graphics.attr('LineThickness') || 1;
     jsonElement.borderWidth = parseFloat(borderWidth);
     }
  //*/
};
;

"use strict";
pathvisiojs.data.gpml.text = function() {

  var pathvisioDefaultStyleValues = {
    'text':{
      'Align':null,
      'Valign':'Middle',
      'FontStyle':null,
      'FontName':null
    }
  }

  function toRenderableJson(gpmlNode, inputDefaultValues, textCallbackOutside) {
    /*
    console.log('gpmlNode');
    console.log(gpmlNode[0][0]);
    console.log('inputDefaultValues');
    console.log(inputDefaultValues);
    console.log('textCallbackOutside');
    console.log(textCallbackOutside);
    //*/
    try {
      var thisPathvisioDefaultStyleValues = pathvisiojs.utilities.collect(pathvisioDefaultStyleValues.text, inputDefaultValues);
      var jsonText, textAlign, verticalAlign, fontStyle, fontWeight, fontSize, fontFamily,
        text = gpmlNode.attr('TextLabel');
      if (!!text) {
        jsonText = {};
        jsonText['@id'] = ('id' + uuid.v4());
        jsonText.tspan = text.split(/\r\n|\r|\n|&#xA;/g);

        var graphics = gpmlNode.select('Graphics');
        var textAlign, fontStyle, fontWeight, fontSize, fontFamily;
        if (!!graphics[0][0]) {
          textAlign = gpmlNode.select('Graphics').attr('Align') || 'center';
          jsonText.textAlign = textAlign.toLowerCase();

          verticalAlign = gpmlNode.select('Graphics').attr('Valign') || 'middle';
          jsonText.verticalAlign = verticalAlign.toLowerCase();

          fontStyle = gpmlNode.select('Graphics').attr('FontStyle');
          if (fontStyle !== thisPathvisioDefaultStyleValues['FontStyle'] && !!fontStyle) {
            jsonText.fontStyle = fontStyle.toLowerCase();
          }

          fontWeight = gpmlNode.select('Graphics').attr('FontWeight');
          if (fontWeight !== thisPathvisioDefaultStyleValues['FontWeight'] && !!fontWeight) {
            jsonText.fontWeight = fontWeight.toLowerCase();
          }

          fontSize = gpmlNode.select('Graphics').attr('FontSize') || 10;
          if (parseFloat(fontSize) !== thisPathvisioDefaultStyleValues['FontSize'] && !!fontSize) {
            jsonText.fontSize = parseFloat(fontSize);
          }

          fontFamily = gpmlNode.select('Graphics').attr('FontName');
          if (fontFamily !== thisPathvisioDefaultStyleValues['FontName'] && !!fontFamily) {
            jsonText.fontFamily = fontFamily;
          }
        }
        textCallbackOutside(jsonText);
      }
      else {
        textCallbackOutside(null);
      }
    }
    catch (e) {
      throw new Error("Error converting gpmlNode's text to renderable json: " + e.message);
    }
  }

  return {
    toRenderableJson:toRenderableJson
  };
}();
;

// array of GPML xml namespaces in order from newest to oldest

pathvisiojs.data.gpml.namespaces = [
  "http://pathvisio.org/GPML/2013a",
  "http://genmapp.org/GPML/2010a",
  "http://genmapp.org/GPML/2008a",
  "http://genmapp.org/GPML/2007"
]
