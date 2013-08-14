
if (typeof(XrefPanel_dataSourcesUrl) == "undefined") 
    var XrefPanel_dataSourcesUrl = '../../cache/datasources.txt';
if (typeof(XrefPanel_bridgeUrl) == "undefined") 
    var XrefPanel_bridgeUrl = ''; //Disable bridgedb webservice queries if url is not specified
if (typeof(XrefPanel_searchUrl) == "undefined") 
    var XrefPanel_searchUrl = false;
if (typeof(XrefPanel_lookupAttributes) == "undefined")
	var XrefPanel_lookupAttributes = true;

/**
 * Change this if the base path of the script (and resource files) is
 * different than the page root.
 */
if (typeof(XrefPanel_imgPath) == "undefined") 
    var XrefPanel_imgPath = wgServer + '/' + wgScriptPath + '/skins/common/images/';
    
/**
 * A panel that displays information for an xref.
 * The xref information is provided by a bridgedb web service.
 */
var XrefPanel = {};

/**
 * Contains the url pattern for each
 * datasource. Will be loaded on document
 * load.
 */
XrefPanel.linkoutPatterns = {};

/**
 * Contains the system code for each datasource.
 */
XrefPanel.systemCodes = {};

/**
 * Add hook functions to customize the external
 * references list for an xref (e.g. to add a
 * custom datasource link).
 *
 * The function should take an object as argument
 * where the properties are the datasources which values
 * are an array of identifiers.
 */
XrefPanel.xrefHooks = [];

XrefPanel.createLoadImage = function(){
    return '<img src="' + XrefPanel_imgPath + '/progress.gif" />';
}

/**
 * Add hook functions to customize the info
 * section for an xref.
 *
 * The function should take the id, datasource, symbol and species.
 * as argument and return a jquery element that will
 * be appended to the info section.
 */
XrefPanel.infoHooks = [];

/**
 * These attributes will not be incuded in the panel.
 */
XrefPanel.ignoreAttributes = {
    'Synonyms': ''
};

/**
 * Add an info hook for bridgedb properties.
 */
XrefPanel.createInfoCallback = function($div){
    return function(data, textStatus){
        $div.empty();
        var $container = $('<div />');
        var lines = data.split("\n");
        
        //Group equal attributes
        var attributes = {};
        for (var i in lines) {
            var cols = lines[i].split("\t");
            if (!cols[0] || !cols[1]) {
                continue;
            }
            if (!attributes[cols[0]]) {
                attributes[cols[0]] = [];
            }
            attributes[cols[0]].push(cols[1]);
        }
        for (a in attributes) {
            if (a in XrefPanel.ignoreAttributes) 
                continue;
            
            $row = $('<div />').html('<B>' + a + ': </B>' + attributes[a].join(', '));
            $container.append($row);
        }
        $div.append($container);
    }
}

XrefPanel.createErrorCallback = function($div, msg){
    return function(hr, errMsg, ex){
        $div.html('<font color="red">' + msg + '</font>');
    }
}

if(XrefPanel_lookupAttributes) {
	XrefPanel.infoHooks.push(function(id, datasource, symbol, species){
		 if (XrefPanel_bridgeUrl) {
		     var $div = $('<div id="bridgeInfo">' + XrefPanel.createLoadImage() + ' loading info...</div>');
		     XrefPanel.queryProperties(id, datasource, species, XrefPanel.createInfoCallback($div), XrefPanel.createErrorCallback($div, 'Unable to load info.'));
		     return $div;
		 }
		 else {
		     return false;
		 }
	});
}

/**
 * Add an info hook for search.wikipathways.org.
 */
XrefPanel.infoHooks.push(function(id, datasource, symbol, species){
    if (XrefPanel_searchUrl && id && datasource) {
        var url = XrefPanel_searchUrl.replace('$ID', id).replace('$DATASOURCE', XrefPanel.systemCodes[datasource]);
        var $div = $('<div />');
        var $a = $('<a target="_blank" href="' + url + '"></a>').attr('title', 'Find other pathways with ' + symbol + '...').html('<span style="float:left" class="ui-icon ui-icon-search" />Find pathways with ' + symbol + '...');
        var $p = $('<p />');
        $p.append($a);
        $div.append($p);
        return $div;
    }
    return false;
});

/**
 * Keeps dialog content cache, to prevent duplicate
 * requests to the bridgedb webservice.
 */
XrefPanel.contentCache = {};

XrefPanel.onPageLoad = function(){
    //Load the datasources file
    XrefPanel.loadDataSources();
}

$(window).ready(XrefPanel.onPageLoad);

XrefPanel.getCachedContent = function(id, datasource, species, symbol){
    return XrefPanel.cacheContent[id + datasource + species + symbol];
}

XrefPanel.cacheContent = function(id, datasource, species, symbol, $content){
    XrefPanel.cacheContent[id + datasource + species + symbol] = $content;
}

XrefPanel.unCacheContent = function(id, datasource, species, symbol){
    XrefPanel.cacheContent[id + datasource + species + symbol] = null;
}

XrefPanel.currentTriggerDialog = null;

XrefPanel.registerTrigger = function(elm, id, datasource, species, symbol) {
	$elm = $(elm);
	$elm.click(function() {
		if(XrefPanel.currentTriggerDialog) {
			XrefPanel.currentTriggerDialog.dialog("close");
			XrefPanel.currentTriggerDialog.dialog("destroy");
		}
		$content = XrefPanel.create(id, datasource, species, symbol);
		var x = $(this).offset().left + $(this).width() - $(window).scrollLeft();
		var y = $(this).offset().top - $(window).scrollTop();
		$dialog = $content.dialog({
			position: [x,y]
		});
		XrefPanel.currentTriggerDialog = $dialog;
	});
}

/**
 * Creates a jquery panel that contains information on the given
 * xref.
 * @param {string} id The xref id
 * @param {string} datasource The xref data source
 * @param {string} species The xref species
 * @param {string} The entity symbol (e.g. 'TP53')
 */
XrefPanel.create = function(id, datasource, species, symbol){
    //Try to use cached version if exists.
    var $content = XrefPanel.getCachedContent(id, datasource, species, symbol);
    if ($content) {
        return $content;
    }
    
    var maxXrefLines = 5; //Maximum number of xref links to show (scroll otherwise)
    $content = $('<div><div class="xrefinfo" /><div class="xreflinks"/>').css({
        'text-align': 'left',
        'font-size': '90%'
    });
    
    //Store in cache
    XrefPanel.cacheContent(id, datasource, species, symbol, $content);
    
    //Add the info section
    var $infodiv = $content.find('.xrefinfo');
    var title = symbol ? '<h3>' + symbol + '</h3>' : '';
    var txt = '<b>Annotated with: </b>' + XrefPanel.createXrefLink(id, datasource, true);
    if (!id) 
        txt = '<b><font color="red">Invalid annotation, missing identifier!</font></b>';
    if (!datasource) 
        txt = '<b><font color="red">Invalid annotation, missing datasource!</font></b>';
    $infodiv.append(title + '<div>' + txt + '</div>');
    
    //Run hooks that may add items to the info
    if (id && datasource) {
        for (h in XrefPanel.infoHooks) {
            var $info = XrefPanel.infoHooks[h](id, datasource, symbol, species);
            if ($info) {
                $infodiv.append($info);
            }
        }
    }
    
    var cbXrefs = function(data, textStatus){
        var $div = $content.find('.xreflinks');
        $div.empty();
        
        if (!data) {
            return;
        }
        
        $div.append('<div><b>External references:</b></div>');
        
        var xrefs = {};
        var lines = data.split("\n");
        
        for (var i in lines) {
            var cols = lines[i].split("\t");
            if (typeof cols[1] == 'undefined' || cols[1] == 'null') {
                continue;
            }
            if (!xrefs[cols[1]]) {
                xrefs[cols[1]] = [];
            }
            xrefs[cols[1]].push(cols[0]);
        }
        
        //Run hooks that may modify the xrefs
        for (h in XrefPanel.xrefHooks) {
            xrefs = XrefPanel.xrefHooks[h](xrefs);
        }
        
        //Collect data sources and sort
        var dataSources = [];
        for (ds in xrefs) {
            dataSources.push(ds);
        }
        dataSources.sort();
        
        $accordion = $('<div />');
        for (var dsi in dataSources) {
            var ds = dataSources[dsi];
            var xrefHtml = '<table>';
            for (var i in xrefs[ds]) {
                xrefHtml += '<tr>' + XrefPanel.createXrefLink(xrefs[ds][i], ds, false);
            }
            $accordion.append('<h3><a href="#">' + ds + '</a></h3>');
            var $xdiv = $('<div />').html(xrefHtml + '</table>');
            if (xrefs[ds].length > maxXrefLines) {
                $xdiv.css({
                    height: maxXrefLines + 'em'
                });
            }
            var $wdiv = $('<div class="ui-helper-clearfix"/>').css('overflow', 'auto'); //Wrapper to prevent resizing of xref div
            $wdiv.append($xdiv);
            $accordion.append($wdiv);
        }
        $div.append($accordion);
        $accordion.accordion({
            autoHeight: false,
            collapsible: true
        });
    }
    
    if (id && datasource) {
        var $xdiv = $content.find('.xreflinks');
        $xdiv.html(XrefPanel.createLoadImage() + ' loading links...');
        XrefPanel.queryXrefs(id, datasource, species, cbXrefs, XrefPanel.createErrorCallback($xdiv, 'Unable to load external references.'));
    }
    else {
        $content.find('.xreflinks').empty();
    }
    return $content;
    
}

XrefPanel.getBaseUrl = function(){
    var url = XrefPanel_bridgeUrl;
    //Remove trailing slash
    if (url && url.substr(-1) === "/") {
        url = url.substr(0, url.length - 1);
    }
    return url;
}

XrefPanel.createXrefLink = function(id, datasource, withDataSourceLabel){
    var url = XrefPanel.linkoutPatterns[datasource];
    var label = withDataSourceLabel ? id + ' (' + datasource + ')' : id;
    var html = '';
    if (url) {
        url = url.replace('$id', id);
        html = '<a target="_blank" href="' + url + '">' + label + '</a>';
    }
    else {
	   html = label;
      XrefPanel.log("Unable to create link for " + id + ", " + datasource);
    }
    return '<span style="font-size:12px;">' + html + '<br></span>';
}

/**
 * Query all xrefs for the given datasource.
 */
XrefPanel.queryXrefs = function(id, datasource, species, success, error){
    var url = XrefPanel.getBaseUrl();
    if (!url) 
        return;
    url = url + '/' + escape(species) + '/xrefs/' + escape(datasource) + '/' + id;
    $.ajax({
        url: url,
        processData: false,
        success: success,
        error: error
    });
}

/**
 * Query properties for xref
 */
XrefPanel.queryProperties = function(id, datasource, species, success, error){
    var url = XrefPanel.getBaseUrl();
    if (!url) 
        return;
    url = url + '/' + escape(species) + '/attributes/' + escape(datasource) + '/' + id;
    $.ajax({
        url: url,
        processData: false,
        success: success,
        error: error
    });
}

XrefPanel.loadDataSources = function(){
    var callback = function(data, textStatus){
        //Parse the datasources file and fill the url object
        if (textStatus == 'success' || textStatus == 'notmodified') {
            var lines = data.split("\n");
            for (var l in lines) {
                var cols = lines[l].split("\t", -1);
                if (cols.length > 1) XrefPanel.systemCodes[cols[0]] = cols[1];
                if (cols.length > 3 && cols[3]) {
                	var ds = cols[0];
						XrefPanel.linkoutPatterns[cols[0]] = cols[3];
                }
            }
        }
    }
    $.get(XrefPanel_dataSourcesUrl, {}, callback);
}

XrefPanel.log = function(msg) {
	if(console && console.log) console.log(msg);
}
