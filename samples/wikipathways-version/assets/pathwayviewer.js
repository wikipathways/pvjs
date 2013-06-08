//TODO: hyperlink cursor when over clickable object (requires fix for http://code.google.com/p/svgweb/issues/detail?id=493)

/**
 * Change this if the base path of the script (and resource files) is
 * different than the page root.
 */
if (typeof(PathwayViewer_basePath) == "undefined") 
    var PathwayViewer_basePath = '';

/**
 * Array with PathwayViewer instances, that will be
 * started on request.
 */
PathwayViewer_viewers = [];

/**
 After page is ready:
 1. Load the svg objects in the background
 2. Add the buttons for starting the viewer when loading is finished
 */
$(window).ready(function() {
	$.each(PathwayViewer_viewers, function(i, viewer) {
	   PathwayViewer.viewers[viewer.info.imageId] = viewer;
	   viewer.loadGPML();
		if(viewer.info.start) {
        	viewer.startSVG();
      } else {
        	viewer.addStartButton();
      }
	});
});

/**
 * Pathway viewer based on Svgweb.
 * Depends on:
 * - Svgweb (http://svgweb.googlecode.com/)
 * - JQuery (http://jquery.com/)
 *
 * Scroll and zoom based on code by Brad Neuberg:
 * http://codinginparadise.org/projects/svgweb-staging/tests/non-licensed/wikipedia/svgzoom/svgzoom.js
 * 
 * Constructor takes a single object containing the necessary
 * the information for a pathway. The object should contain the following
 * fields:
 * - imageId, the id of the element that contains the png image
 * - svgUrl, the url where the svg content can be downloaded from
 * - gpmlUrl, the url to the GPML from which the svg has been generated
 * - start, set to true if the viewer has to start immediately
 */
function PathwayViewer(info) {
	this.info = info;
	this.highlights = {};
	this.searchHighlights = {};
	
	/**
	 * Listeners to be executed when
	 * the GPML has been loaded.
	 */
	this.svgLoadListeners = [];
}

PathwayViewer.viewers = {};

PathwayViewer.highlightColor = 'yellow';

PathwayViewer.focusColor = 'orange';
/**
 * Urls to icons.
 */
PathwayViewer.icons = {
    "start": "img/start.png",
    "left": "img/nav_left.png",
    "right": "img/nav_right.png",
    "up": "img/nav_up.png",
    "down": "img/nav_down.png",
    "zin": "img/zoom_in.png",
    "zout": "img/zoom_out.png",
    "zfit": "img/zoom_fit.png",
    "loading": "img/loading.gif",
    "getflash": "img/getflash.png",
    "search": "img/search.png"
}

/**
 * The amount of zoom ratio change per zoom step.
 */
PathwayViewer.zoomStep = 0.2;

/**
 * The number of pixels to move per step (for panning controls).
 */
PathwayViewer.moveStep = 25;

/**
 * Postfix for id of the container element that contains the
 * svg object.
 */
PathwayViewer.idContainer = '_container';
/**
 * Postfix for id of element that contains the start button.
 */
PathwayViewer.idStartButton = '_startBtn';

/**
 * Postfix for id of element that contains the controls.
 */
PathwayViewer.idControls = '_controls';

/**
 * Postfix for id of svg object element.
 */
PathwayViewer.idSvgObject = '_svg';
/**
 * Postfix for id elements that contains the loading progress indicator.
 */
PathwayViewer.idLoadProgress = '_loading';

/**
 * Postfix for layout container
 */
PathwayViewer.idLayout = '_layout';

/**
 * Start the viewer (after start button is clicked).
 */
PathwayViewer.prototype.startSVG = function() {
	var that = this;
	console.log("Starting svg viewer for " + this.info.imageId);

	this.removeStartButton();

	//Test if a suitable renderer has been found
	if (PathwayViewer.useFlash() && !this.isFlashSupported()) {
		//If not, instead of loading the svg, add a notification
		//to help the user to install flash
		this.addFlashNotification();
		return;
	}

	//Replace the image by the container with the svgweb object and xref panel
	var $img = this.getImg(this.info.imageId);
	this.removeImgAnchor($img);

	var w = '100%'; if(this.info.width) w = this.info.width;
	var h = '500px'; if(this.info.height) h = this.info.height;

	if(PathwayViewer.isIE9() && this.info.height == '100%') {
		h = $(document).height();
	}
	
	var $container = $('<div />')
		.attr('id', this.info.imageId + PathwayViewer.idContainer)
		.css({
		width: w,
		height: h
	});

	var $parent = $img.parent();
	$img.after($container);
	$img.remove();

	//Create the layout pane
	var $layout = $('<div/>')
	.attr('id', this.info.imageId + PathwayViewer.idLayout).css({
		width: '100%',
		height: '100%'
	});
	this.$viewer = $('<div/>').addClass('ui-layout-center').css({
		border: '1px solid #BBBBBB',
		'background-color': '#FFFFFF'
	});
	var $xrefpane = $('<div/>').addClass('ui-layout-east');
	$layout.append(this.$viewer);
	$layout.append($xrefpane);

	var afterAnimate = function() {
		//Apply the layout
		$container.append($layout);
		var east_width = 300;
		if(east_width > $container.width() * 0.5) {
			east_width = $container.width() * 0.5; //Cover half of the viewer max
		}
		var layoutUtil = $layout.layout({
			applyDefaultStyles: true,
			center__applyDefaultStyles: false,
			east__size: east_width
		});
		layoutUtil.close('east');

		that.$viewer.css({
			overflow: 'hidden',
			'background-color': '#F9F9F9'
		});
		that.showLoadProgress($layout);

		//Add the SVG object to the center panel
		var obj_id = that.info.imageId + PathwayViewer.idSvgObject;

		if(PathwayViewer.useFlash()) {
			var obj = document.createElement('object', true);
			obj.id = obj_id;
			obj.setAttribute('type', 'image/svg+xml');
			obj.setAttribute('data', that.info.svgUrl);

			//Ideally we would use relative size here ('100%'), but this causes the
			//SVG to stretch on resizing the parent
			obj.setAttribute('width', screen.width + 'px');
			obj.setAttribute('height', screen.height + 'px');
			//obj.setAttribute('width', that.$viewer.width() + 'px');
			//obj.setAttribute('height', that.$viewer.height() + 'px');
			obj.addEventListener('SVGLoad', function() {
				that.$svgObject = $('#' + that.info.imageId + PathwayViewer.idSvgObject);
				that.svgRoot = that.$svgObject.get(0).contentDocument.rootElement;
				that.svgLoaded($xrefpane, layoutUtil);
				//Remove progress when loaded
				that.hideLoadProgress($layout);
			}, false);

			svgweb.appendChild(obj, that.$viewer.get(0));
		} else {
			//Add <svg> tag for HTML5 compliant browsers
			var $svgDiv = $('<div id="' + obj_id + '"/>');
			$svgDiv.width('100%');
			$svgDiv.height('100%');

			that.$viewer.append($svgDiv);

			$.ajax({
				url: that.info.svgUrl,
				dataType: 'text',
				success: function(txt) {
					$svgDiv.html(txt);
					that.$svgObject = $svgDiv;
					that.svgRoot = $svgDiv.children("svg").get(0);
					that.svgLoaded($xrefpane, layoutUtil);
					that.hideLoadProgress($layout);
				}	
			});
		}
	}
	//Change the size of the image parent
	if ($.browser.msie) { //Animate gives problems in IE, just change style directly 
		$parent.css({
		width: '100%',
		height: 'auto'
		});
		afterAnimate();
	} else { //Animate for smooth transition
		$parent.animate({
			width: '100%',
			height: 'auto'
		}, 300, afterAnimate);
	}
}

PathwayViewer.isIE9 = function() {
	return $.browser.msie && $.browser.version.slice(0,1) == 9;
}

PathwayViewer.useFlash = function() {
	//Use flash unless browser is IE9 (use <svg> tag in that case)
	return !PathwayViewer.isIE9();
}

PathwayViewer.prototype.removeImgAnchor = function($img) {
	//If the img tag is nested in an anchor tag,
	//remove it
	if ($img.parent().is('a')) {
		var $oldParent = $img.parent();
		var $newParent = $oldParent.parent();
		$oldParent.after($img);
		$oldParent.remove();
	}
}

//Flash version detection copied from http://www.prodevtips.com/2008/11/20/detecting-flash-player-version-with-javascript/
PathwayViewer.prototype.isFlashSupported = function() {
	function getFlashVersion() {
		// ie
		try {
			try {
				// avoid fp6 minor version lookup issues
				// see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
				var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
				try { axo.AllowScriptAccess = 'always'; }
				catch(e) { return '6,0,0'; }
			} catch(e) {}
				return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
				// other browsers
			} catch(e) {
				try {
					if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
					return (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
					}
				} catch(e) {}
		}
		return '0,0,0';
	}
	
	var version = getFlashVersion().split(',').shift();
	return version >= 10;
}

PathwayViewer.prototype.addStartButton = function(){
    //Test if a suitable renderer has been found
    if (!this.isFlashSupported()) {
        //If not, instead of loading the svg, add a notification
        //to help the user to install flash
        this.addFlashNotification();
        return;
    }
    
    var $img = this.getImg();
    
    this.removeImgAnchor($img);
    
    //Create a start image
    var $parent = $img.parent()
    var $start = jQuery('<img>').attr('src', PathwayViewer_basePath + PathwayViewer.icons.start).attr('title', 'Click to activate pan and zoom.');
    var $div = jQuery('<div/>').attr("id", this.info.imageId + PathwayViewer.idStartButton);
    
    //Add the start button
    $div.append($start);
    $img.before($div);
    
    $div.css({
        position: 'relative',
        height: '1px',
        width: '100%',
        overflow: 'visible',
        'text-align': 'right',
        'z-index': '1000'
    });
    
    var that = this;
    //Register the action
    var startFunction = function(e){
        that.startSVG();
    }
    
    $img.click(startFunction);
    $div.click(startFunction);
}

PathwayViewer.prototype.loadGPML = function() {
	var that = this;
	if(this.info.gpmlUrl) {
		this.gpml = new GpmlModel(this.info.gpmlUrl);
		this.gpml.gpmlLoadListeners.push(function(gpml) {
			that.initSearchTerms();
		});
		this.gpml.load();
	}
}

PathwayViewer.prototype.showLoadProgress = function($container) {
    var $block = $container.find('progress_block');
    if ($block.length > 0) {
        $block.show();
    }
    else {
        var $img = $('<img>').attr('src', PathwayViewer_basePath + PathwayViewer.icons.loading).attr('title', 'Loading viewer...');
        var $load = $('<div>').css({
            display: 'block',
            position: 'relative',
            left: '50%',
            top: '50%',
            'text-align': 'left'
        });
        $load.append($img);
        
        $block = $('<div/>').addClass('progress_block').css({
            position: 'relative',
            width: '100%',
            height: '100%',
            'z-index': 100,
            cursor: 'wait',
            'background-color': '#FFFFFF',
            opacity: 1
        });
        $block.append($load);
        $container.append($block);
    }
}

PathwayViewer.prototype.hideLoadProgress = function($container){
    $container.find('.progress_block').hide();
}

PathwayViewer.prototype.addFlashNotification = function(){
    var $img = this.getImg();
    var $parent = $img.parent()
    if ($parent.is('a')) {
        //Set link to svg url
			$parent.attr('href', this.info.svgUrl);
        $parent = $parent.parent();
    }
    
    var $flash = $('<img>').attr('src', PathwayViewer_basePath + PathwayViewer.icons.getflash).attr('title', 'Install Flash player to zoom and view protein/metabolite info.');
    
    var $div = $('<div id="flashlink"/>').css({
        position: 'relative',
        top: -$parent.height() + 20 + 'px',
        left: ($img.width() / 2) - 100 + 'px',
        'z-index': '1000'
    });
    
    var $link = $('<a></a>').attr('href', 'http://www.adobe.com/go/getflashplayer').attr('id', 'flashlink_a');
    $link.append($flash);
    $div.append($link);
    $parent.append($div);
}

PathwayViewer.prototype.removeStartButton = function() {
    $('#' + this.info.imageId + PathwayViewer.idStartButton).remove();
}

/**
 * Get the first img tag that's a child of the element
 * identified by id.
 */
PathwayViewer.prototype.getImg = function() {
    var $img = $('#' + this.info.imageId);
    if ($img.get(0).nodeName.toLowerCase() != 'img') {
        //Get the IMG descendants
        $img = $('#' + this.info.imageId + ' img');
    }
    return $img;
}

PathwayViewer.prototype.svgLoaded = function($xrefContainer, layout) {
	var that = this;
	this.svgWidth = this.svgRoot.width.baseVal.value;
	this.svgHeight = this.svgRoot.height.baseVal.value;
	
	this.$svgObject.disableSelection()
	
	//Add event handlers
	drag = this.newDragState(this.$svgObject, this.svgRoot);
	this.drag = drag;
	
	this.$viewer.mousedown(drag.mouseDown);
	this.$viewer.mouseup(drag.mouseUp);
	
	//Only do this if not on Mac, could cause the sticky controls issue
	if(navigator.platform.indexOf("Mac") == -1) {
		//Add the mouseup and mouse move to the document,
		//so we can continue dragging outside the svg object
		$(document).mouseup(this.drag.mouseUp);
		$(document).mousemove(this.drag.mouseMove);
	}

	this.$viewer.mousemove(function(e) {
		if (!drag.dragging) {
			that.gpml.mouseMove(that.$svgObject.offset(), that, e);
		}
	});
	this.$viewer.mousedown(function(e) {
		that.gpml.mouseDown(
			layout, $xrefContainer, that.$svgObject.offset(), that, e);
	});
	this.$viewer.mousewheel(function(e) {
		that.mouseWheel(e);
	});

	//Show the pan and zoom buttons
	this.addControls();
	this.zoomFit();

	//Force SVG to be as wide as the object it is in (to avoid clipping)
	this.svgRoot.setAttribute('width', this.$svgObject.width() + 'px');
	this.svgRoot.setAttribute('height', this.$svgObject.height() + 'px');
	
	$.each(this.svgLoadListeners, function(k, v) {
		try { v(that); } catch(e) { 
			console.log("Unable to execute svg load listener");
			console.log(e);
		}
	});
}

PathwayViewer.prototype.addControls = function() {
	var that = this;
	var id = this.info.imageId + PathwayViewer.idControls;
	
	var s = 5;
	var w = 20;
	var h = 20;

	var totalWidth = (w + s) * 3;

	var $controls = jQuery('<div />').attr('id', id);
	$controls.disableSelection();

	var create = function(src, fn, left, top, title) {
		var btn = $('<div />').addClass('').css({
			position: 'relative',
			left: left + 'px',
			top: top + 'px',
			width: w + 'px',
			height: h + 'px',
			'background-image': 'url(' + src + ')'
		});
		btn.click(bind(that, fn));
		btn.bind('mousedown', function(e) {
			e.stopPropagation(); //Prevent dragging viewer when clicking control
		});
		btn.attr("title", title);
		return btn;
	};

	$controls.append(
		create(PathwayViewer_basePath + PathwayViewer.icons.up,
			"panUp", -s - 1.5 * w, s, "Pan up")
	);
	$controls.append(
		create(PathwayViewer_basePath + PathwayViewer.icons.left,
			"panLeft", -s - 2 * w, s, "Pan left")
	);
	$controls.append(
		create(PathwayViewer_basePath + PathwayViewer.icons.right, 
			"panRight", -s - w, -w + s, "Pan right")
	);
	$controls.append(create(PathwayViewer_basePath + PathwayViewer.icons.down, 
		"panDown", -s - 1.5 * w, -w + s, "Pan down")
	);

	$controls.append(
		create(PathwayViewer_basePath + PathwayViewer.icons.zin, "zoomIn",
			 -s - 1.5 * w, -s, "Zoom in"));

	var svgW = this.svgRoot.width.baseVal.value;
	var svgH = this.svgRoot.height.baseVal.value;
	$controls.append(
		create(PathwayViewer_basePath + PathwayViewer.icons.zfit, 
			"zoomFit", -s - 1.5 * w, -s, "Zoom to fit"));
	$controls.append(
		create(PathwayViewer_basePath + PathwayViewer.icons.zout,
			"zoomOut", -s - 1.5 * w, -s, "Zoom out"));

	var $searchBox = this.createSearchBox(s, s);
	this.$viewer.append($searchBox);
	this.$viewer.append($controls);

	//Set correct position
	$controls.css({
		position: 'absolute',
		left: '100%',
		top: $searchBox.height() + s + 'px',
		'z-index': 1001
	});
}

PathwayViewer.prototype.createSearchBox = function(right, top) {
	var that = this;
	var $box = $('<div/>').addClass('ui-widget').addClass('ui-corner-all').css({
		position: 'absolute',
		right: right + 'px',
		top: top + 'px',
		'z-index': 1001,
		'background-color' : '#DDDDDD',
		border: '1px solid #AAAAAA'
	});
	
	var $input = $('<input/>').css({ width: '100px' });
	var $number = $('<div/>').css({ 
		position: 'absolute',
		'font-size': '75%',
		'background-color': 'white'
	});
	$number.addClass('ui-corner-all');
	$number.hide();
	
	var lastSearch = {
		time: -1,
		query: '',
		results: [],
		focus: -1
	};
	
	var updateNumber = function() {
		if(!lastSearch.query) {
			$number.hide();
			return;
		}
		
		var n = lastSearch.results.length;
		var txt = n + ' hit';
		if(n != 1) txt += 's';
		
		if(n == 0) {
			$number.css({
				'color': 'black',
				'background-color': '#FF6666'
			});
		} else {
			$number.css({
				'background-color': 'white',
				'color': '#AFAFAF'
			});
		}

		if(lastSearch.focus > -1) {
			txt = (lastSearch.focus + 1) + ' of ' + n;
		}
		
		$number.text(txt);
	
		$number.show();		
		$number.position({
			my: "right center", at: "right center",
			of: $input, offset: "-3 0"
		});
	}
	
	var searchAndHighlight = function() {
		lastSearch.results = that.search(lastSearch.query);
		updateNumber();
		$.each(lastSearch.results, function(i,v) {
			var h = that.highlight(i, v, PathwayViewer.highlightColor); 
			that.searchHighlights[i] = h;
		});
		lastSearch.focus = -1;
	}
	
	var onChange = function() {
		//Delay to prevent unwanted searches during typing
		var now = new Date().getTime()
		lastSearch.time = now;
		var doit = function(now, lastSearch) {
			if(lastSearch.time == now) {
				lastSearch.query = $input.attr('value');
				searchAndHighlight();
			}
		}
		window.setTimeout(function(){doit(now,lastSearch)}, 500);
	}
	
	//On pressing enter:
	//seach if value changed and focus+traverse results.
	var onEnter = function(event, ui) {
		lastSearch.time = new Date().getTime(); //Don't execute next onChange
		
		var value = $input.attr('value');
		if(ui && ui.item) value = String(ui.item.value);
		
		if(value != lastSearch.query) {
			lastSearch.query = value;
			searchAndHighlight();
		}
		
		if(lastSearch.results.length > 0) {
			lastSearch.focus++;
			if(lastSearch.focus >= lastSearch.results.length) {
				lastSearch.focus = lastSearch.focus - lastSearch.results.length;
			}
			that.focus(lastSearch.results[lastSearch.focus]);
			
			//Make sure other highlights are yellow
			$.each(that.searchHighlights, function(i, v) {
				v.setAttribute('stroke', PathwayViewer.highlightColor);
			});
			//Make focused highlight orange
			that.searchHighlights[lastSearch.focus].setAttribute(
				'stroke', PathwayViewer.focusColor);
		}
		updateNumber();
	}
	
	$input.autocomplete({ 
		source: [], select: onChange,
		position: { my: "right top", at: "right bottom" },
		minLength: 2
	});
	$input.addClass('ui-corner-all');
	$input.bind('keyup', function(event) {
		if(event.keyCode == 13) { //When pressing enter
			$input.autocomplete('close'); //Close autocomplete dialog
			onEnter(event);
		} else {
			onChange();
		}
	});
	$box.append($input);
	
	this.$searchInput = $input;
	this.initSearchTerms();
	
	var $icon = $('<img />').
		attr('src', PathwayViewer_basePath + PathwayViewer.icons.search);
	
	var origWidth = $input.width();
	
	$icon.click(function() {
		if($input.is(':visible')) {
			$number.hide();
			lastSearch.focus = -1;
			$input.animate({width: '1px'}, 300, function() {
				$input.hide();
				that.clearSearchHighlights();
			});
		} else {
			$input.show();
			$input.animate({width: '100px'}, 300, function() {
				searchAndHighlight();
			});
		}
	});
	
	$box.append($icon);
	$box.append($number);
	
	$box.bind('mousedown', function(e) {
		e.stopPropagation(); //Prevent dragging viewer when clicking search box
	});
	return $box;
}

PathwayViewer.prototype.initSearchTerms = function() {
	if(this.$searchInput) {
		var terms = [];
		$.each(this.gpml.searchObjects, function(i, v) {
			if($.inArray(v.textLabel, terms) < 0) terms.push(v.textLabel);
		});
		terms.sort();
		this.$searchInput.autocomplete("option", "source", terms);
	}
}

PathwayViewer.prototype.search = function(query) {
	var that = this;
	this.clearSearchHighlights();
	var results = [];
	if(query && this.gpml && this.gpml.searchObjects) {
		results = this.gpml.search(query);
	}
	return results;
}

PathwayViewer.prototype.focus = function(obj) {
	if(obj) {
		this.svgRoot.currentScale = 1;
		var w = obj.right - obj.left;
		var h = obj.bottom - obj.top;
		this.panTo(obj.left + w * 0.5, obj.top + h * 0.5);
	}
}

PathwayViewer.prototype.highlight = function(id, obj, color) {
	var left = obj.left;
	var right = obj.right;
	var top = obj.top;
	var bottom = obj.bottom;

	var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
	rect.setAttribute('x', left);
	rect.setAttribute('y', top);
	rect.setAttribute('width', right - left);
	rect.setAttribute('height', bottom - top);
	rect.setAttribute('stroke', color);
	rect.setAttribute('stroke-width', '5');
	rect.setAttribute('fill-opacity', '0');
	rect.setAttribute('opacity', '0.5');
	this.svgRoot.appendChild(rect);
	this.highlights[id] = rect;
	return rect;
}

PathwayViewer.prototype.removeHighlight = function(i) {
	this.svgRoot.removeChild(this.highlights[i]);
	delete this.highlights[i];
}

PathwayViewer.prototype.clearSearchHighlights = function() {
	var that = this;
	$.each(this.searchHighlights, function(i, v) {
		that.removeHighlight(i);
	});
	this.searchHighlights = {};
}

if(PathwayViewer.isIE9()) {
	PathwayViewer.prototype.zoomTo = function(factor, x, y) {
		var svg = this.svgRoot;
		var dx = (x - this.getX() * svg.currentScale) / svg.currentScale - 
			(x - this.getX() * svg.currentScale) / factor;
		var dy = (y - this.getY() * svg.currentScale) / svg.currentScale - 
			(y - this.getY() * svg.currentScale) / factor;
		svg.currentScale = factor;
		this.setXY(this.getX() - dx, this.getY() - dy);
	}
} else {
	PathwayViewer.prototype.zoomTo = function(factor, x, y){
		var svg = this.svgRoot;
		 var dx = x / svg.currentScale - x / factor;
		 var dy = y / svg.currentScale - y / factor;
		 svg.currentScale = factor;
		 this.setXY(this.getX() - dx, this.getY() - dy);
	}
}



PathwayViewer.prototype.zoomIn = function() {
	this.zoomTo(
		this.svgRoot.currentScale * (1 + PathwayViewer.zoomStep), 
		this.$viewer.width() / 2, this.$viewer.height() / 2
	);
}

PathwayViewer.prototype.zoomOut = function() {
	this.zoomTo(
		this.svgRoot.currentScale / (1 + PathwayViewer.zoomStep),
		this.$viewer.width() / 2, this.$viewer.height() / 2
	);
}

if(PathwayViewer.useFlash()) {
	PathwayViewer.prototype.setXY = function(x, y) {
		this.svgRoot.currentTranslate.setXY(x, y);
	}
	PathwayViewer.prototype.setX = function(x) {
		this.svgRoot.currentTranslate.setX(x);
	}
	PathwayViewer.prototype.setY = function(y) {
		this.svgRoot.currentTranslate.setY(y);
	}
	PathwayViewer.prototype.getX = function() {
		return this.svgRoot.currentTranslate.getX();
	}
	PathwayViewer.prototype.getY = function() {
		return this.svgRoot.currentTranslate.getY();
	}
} else {
	PathwayViewer.prototype.setXY = function(x, y) {
		this.svgRoot.currentTranslate.x = x * this.svgRoot.currentScale;
		this.svgRoot.currentTranslate.y = y * this.svgRoot.currentScale;
	}
	PathwayViewer.prototype.setX = function(x) {
		this.svgRoot.currentTranslate.x = x * this.svgRoot.currentScale;
	}
	PathwayViewer.prototype.setY = function(y) {
		this.svgRoot.currentTranslate.y = y * this.svgRoot.currentScale;
	}
	PathwayViewer.prototype.getX = function() {
		return this.svgRoot.currentTranslate.x  / this.svgRoot.currentScale;
	}
	PathwayViewer.prototype.getY = function() {
		return this.svgRoot.currentTranslate.y  / this.svgRoot.currentScale;
	}
}

PathwayViewer.prototype.zoomFit = function() {
	var w = this.svgWidth;
	var h = this.svgHeight;
	var fw = this.$viewer.width();
	var fh = this.$viewer.height();
	
	//Calculate the zoom factor to fit the complete svg
	var rw = fw / w;
	var rh = fh / h;
	var r = Math.min(rw, rh);
	this.svgRoot.currentScale = r;

	//Center
	this.setXY(
		0.5 * fw / r - w / 2, 0.5 * fh / r - h / 2
	);
}

PathwayViewer.prototype.panUp = function() {
    this.setY(
    	this.getY() + PathwayViewer.moveStep / this.svgRoot.currentScale);
}

PathwayViewer.prototype.panLeft = function() {
    this.setX(
    	this.getX() + PathwayViewer.moveStep / this.svgRoot.currentScale);
}

PathwayViewer.prototype.panRight = function() {
    this.setX(
    	this.getX() - PathwayViewer.moveStep / this.svgRoot.currentScale);
}

PathwayViewer.prototype.panDown = function() {
    this.setY(
    	this.getY() - PathwayViewer.moveStep / this.svgRoot.currentScale);
}

/**
 * Set the panning so the given svg coordinate will be
 * in the center of the viewer.
 */
PathwayViewer.prototype.panTo = function(x, y) {
	var svg = this.svgRoot;
	
	var fw = this.$viewer.width();
	var fh = this.$viewer.height();
	
	var cx = 0.5 * fw / svg.currentScale;
	var cy = 0.5 * fh / svg.currentScale;
	
	var dx = x - cx;
	var dy = y - cy;
	
	this.setXY(-dx, -dy);
}

PathwayViewer.prototype.mouseWheel = function(e) {
	var svg = this.svgRoot;
	e = e ? e : window.event;

	var wheelData = e.detail ? e.detail * -1 : e.wheelDelta;

	var offset = this.$svgObject.offset();
	var x = e.pageX - offset.left;
	var y = e.pageY - offset.top;

	if(wheelData > 0) {
		this.zoomTo(svg.currentScale * (1 + PathwayViewer.zoomStep), x, y);
	} else {
		this.zoomTo(svg.currentScale / (1 + PathwayViewer.zoomStep), x, y);
	}

	if(e.preventDefault) {
		e.preventDefault();
	}

	return false;
}

/**
 * This object stores the drag state (mouse up/down, drag position) for each
 * svg object.
 */
PathwayViewer.prototype.newDragState = function() {
	var that = this;
    var drag = {
        dragging: false,
        pMouseDown: {
            x: 0,
            y: 0
        },
        pTransDown: {
            x: 0,
            y: 0
        }
    };
    
    drag.mouseDown = function(e){
        //Check if mouse is over svg element
        var svgOffset = that.$svgObject.offset();
        if (svgOffset.left <= e.pageX &&
        (svgOffset.left + that.$svgObject.width()) >= e.pageY &&
        svgOffset.top <= e.pageY &&
        (svgOffset.top + that.$svgObject.height()) >= e.pageY) {
            drag.dragging = true;
            
            drag.pMouseDown = {
                x: e.pageX,
                y: e.pageY
            };
            drag.pTransDown = {
                x: that.getX(),
                y: that.getY()
            };
        }
    }
    
    drag.mouseMove = function(e) {
        if (!drag.dragging) {
            return;
        }
        
        var dx = e.pageX - drag.pMouseDown.x;
        var dy = e.pageY - drag.pMouseDown.y;
        var x = drag.pTransDown.x + dx / that.svgRoot.currentScale;
        var y = drag.pTransDown.y + dy / that.svgRoot.currentScale;
        that.setXY(x, y);
    }
    
    drag.mouseUp = function(evt){
        drag.dragging = false;
    }
    return drag;
}

GpmlModel = function(gpmlUrl) {
	this.gpmlUrl = gpmlUrl;
	
	this.gpmlSize = {
		width: 0,
		height: 0
	};

	/**
	* The pathway species.
	*/
	this.species = '';

	/**
	* List of objects that trigger a hover event.
	* Fields:
	* - left, top, width, height: the coordinates (GPML)
	* - z, the z-order of the object
	* - id: the id of the object in the GPML DOM
	*/
	this.hoverObjects = [];

	/**
	* List of objects that can be searched.
	* Fields:
	* - left, top, width, height: the coordinates (GPML)
	* - text: The text to search
	*/
	this.searchObjects = [];
    
	/**
	* The jquery parsed GPML.
	*/
	this.$data = null;
	
	/**
	 * Listeners to be executed when
	 * the GPML has been loaded.
	 */
	this.gpmlLoadListeners = [];
};

GpmlModel.prototype.load = function() {
	var that = this;
	
	$.ajax({
		url: this.gpmlUrl,
		success: function(data, textStatus) {
			that.loaded(data, textStatus);
		},
		error: function(xr, msg, ex){
			console.log("Error loading gpml: " + msg);
			console.log(ex);
		},
		dataType: "xml"
	});
}

GpmlModel.prototype.loaded = function(data, textStatus) {
	var that = this;
	
	this.$data = $(data);
	if (typeof data == 'string') {
		var xml = this.parseGPML(data);
		this.$data = $(xml);
	}

	var graphics = this.$data.find('Pathway > Graphics');
	this.gpmlSize = {
		width: graphics.attr('BoardWidth'),
		height: graphics.attr('BoardHeight')
	};

	var parseObject = function(jq) {
		var cx = parseFloat(jq.attr('CenterX')) * that.scale;
		var cy = parseFloat(jq.attr('CenterY')) * that.scale;
		var w = parseFloat(jq.attr('Width')) * that.scale;
		var h = parseFloat(jq.attr('Height')) * that.scale;
		var obj = {};
		obj.left = cx - w / 2;
		obj.top = cy - h / 2;
		obj.right = obj.left + w;
		obj.bottom = obj.top + h;
		obj.z = jq.attr('ZOrder');
		obj.$data = jq.parent();
		obj.textLabel = obj.$data.attr('TextLabel');
		if(obj.textLabel) 
			obj.textLabel = obj.textLabel.replace(/[\f\n\r\t\v]+/g, " ");
		obj.type = obj.$data.attr('Type');

		return obj;
	}
	//Get the species
	this.species = this.$data.find('Pathway').attr('Organism');

	//Determine the translation factor from GPML to svg coordinates
	var r = 1;
	var gpmlNs = this.$data.find('Pathway').attr('xmlns');
	var res = gpmlNs.match(/([0-9]{4})[a-z]{0,1}$/);
	if(res) {
		var ver = res[1];
		if(ver < 2010) r = 1 / 15;
	}
	this.scale = r;
	
	$.each(this.gpmlLoadListeners, function(k, v) {
		try { v(that); } catch(e) { 
			console.log("Unable to execute gpml load listener");
			console.log(e);
		}
	});

	//Get the datanodes
	this.$data.find('DataNode > Graphics').each(function(){
		var obj = parseObject($(this));
		that.hoverObjects.push(obj);
		that.searchObjects.push(obj);
	});

	//Get the labels
	this.$data.find('Label > Graphics').each(function() {
		var obj = parseObject($(this));
		that.searchObjects.push(obj);
	});
}

GpmlModel.prototype.mouseMove = function(offset, viewer, e){
	var hover = this.getHoverObject(offset, viewer, e);
	if (hover) {
		viewer.svgRoot.setAttribute('cursor', 'pointer');
	}
	else {
		viewer.svgRoot.setAttribute('cursor', 'default');
	}
}

GpmlModel.prototype.getXref = function(obj) {
		var jqxref = obj.$data.find('Xref');
		var id = jqxref.attr('ID');
		var ds = jqxref.attr('Database');
		return { id: id, ds: ds };
}

GpmlModel.prototype.mouseDown = function(layout, $xrefContainer, offset, viewer, e){
	var hover = this.getHoverObject(offset, viewer, e);
	if (hover) {
		//Get the xref properties
		var xref = this.getXref(hover);
		var id = xref.id;
		var ds = xref.ds;

		//Open the xref info
		var title = hover.textLabel + ' (' + hover.type + ')';

		var $panel = XrefPanel.create(id, ds, this.species, hover.textLabel);
		$xrefContainer.append($panel);
		$xrefContainer.children().hide();
		$panel.show();
		layout.open('east');
	}
}
    
GpmlModel.prototype.getHoverObject = function(offset, viewer, e) {
	var hover = null;
	var svg = viewer.svgRoot;
	
	var svgSize = {
		width: svg.getAttribute('width'),
		height: svg.getAttribute('height')
	};

	var p = {
		x: (e.pageX - offset.left) / svg.currentScale - viewer.getX(),
		y: (e.pageY - offset.top) / svg.currentScale - viewer.getY()
	}

	for (var i in this.hoverObjects) {
		obj = this.hoverObjects[i];

		var robj = {
			left: obj.left,
			right: obj.right,
			bottom: obj.bottom,
			top: obj.top
		}

		var inx = p.x >= robj.left && p.x <= robj.right;
		var iny = p.y >= robj.top && p.y <= robj.bottom;
		if (inx && iny) {
			hover = obj;
			hover.svgleft = robj.left;
			hover.svgright = robj.right;
			hover.svgbottom = robj.bottom;
			hover.svgtop = robj.top;
			break;
		}
	}

	return hover;
}
    
GpmlModel.prototype.search = function(query) {
	query = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	var re = new RegExp(query, 'i');
	var results = [];
	$.each(this.searchObjects, function(i, obj) {
		if(obj.textLabel) {
			if(obj.textLabel.match(re)) results.push(obj);
		}
	});
	return results;
}

/**
 * Cross-browser xml parsing.
 * From http://www.w3schools.com/Dom/dom_parser.asp
 */
GpmlModel.prototype.parseGPML = function(xml){
    var xmlDoc = null;
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xml, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xml);
    }
    return xmlDoc;
}

debug = function(text){
    $("#debug").html(text);
}

function bind(toObject, methodName){
    return function(){toObject[methodName]()}
}

//Fix for missing console function in IE9
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };
