/**
 * Handles highlighting of specific elements on the pathway,
 * specified via the url parameters.
 * 
 * Parameter options are (repeat for each element to highlight):
 * 
 * - label: to highlight elements with given label (e.g. label=p53)
 * - xref: to highlight a given external reference 
 * (e.g. xref=1234,Entrez Gene). No id mapping will be performed, 
 * so the xref should exactly match the one on the pathway.
 * 
 * Additional options that apply to each element:
 * annotation sources before highlighting.
 * colors: Comma separated list of colors (in any format CSS accepts) 
 * for highlights (e.g. colors=red,green,blue).
 **/
 
/**
 * Add an element highlighter for each pathway viewer.
 */
$(window).ready(function() {
	$.each(PathwayViewer_viewers, function(i, viewer) {
		var h = new PathwayElementHighlighter(viewer);
		//Start after both SVG and GPML have been loaded
		var loaded = {
			svg: false,
			gpml: false,
			check: function() {
				if(loaded.svg && loaded.gpml) h.start();
			}
		};
		viewer.svgLoadListeners.push(function(v) {
			loaded.svg = true;
			loaded.check();
			
		});
		viewer.gpml.gpmlLoadListeners.push(function(g) {
			loaded.gpml = true;
			loaded.check();
		});
	});
});

function PathwayElementHighlighter(viewer) {
	this.viewer = viewer;
	this.mapXrefs = true;
	this.highlightLabels = [];
	this.highlightXrefs = [];
	
	this.colors = [
		'blue',
		'red',
		'chartreuse',
		'orange',
		'cyan',
		'magenta'
	];
}

PathwayElementHighlighter.prototype.start = function() {
	this.$panel = this.createHighlightPanel();
	this.parseUrl();
	this.addHighlights();
}

PathwayElementHighlighter.prototype.parseUrl = function() {
	var getURLParameters = function(param, multiple) {
		var result = [];
		var search = window.location.search.substring(1);
		if(search.indexOf('&') > -1) {
			var params = search.split('&');
			for(var i = 0; i < params.length; i++) {
				var key_value = params[i].split('=');
				if(key_value[0] == param) {
					var value = decodeURIComponent(key_value[1]);
					if(multiple) result.push(value);
					else return value;
				}
			}
		} else {
			var params = search.split('=');
			if(params[0] == param) {
				var value = decodeURIComponent(params[1]);
				if(multiple) results.push(value);
				else return value;
			}
		}
		return multiple ? result : null;
	}
	
	this.highlightLabels = getURLParameters('label', true);
	
	var colorStr = getURLParameters('colors', false);
	if(colorStr) {
		this.colors = colorStr.split(',');
	}
	
	var xrefs = [];
	xrefs = getURLParameters('xref', true);
	
	this.highlightXrefs = xrefs;
}

PathwayElementHighlighter.prototype.addHighlights = function() {
	var that = this;
	
	if((this.highlightLabels.length + this.highlightXrefs.length) == 0) return;
	
	that.viewer.$viewer.append(this.$panel);
	
	//Find label highlights
	var highlight = $.map(this.highlightLabels, function(v, k) {
		var h = {};
		h.results = [];
		h.label = v;
		
		$.each(that.viewer.gpml.searchObjects, function(i, obj) {
			if(obj.textLabel) {
				if(obj.textLabel == v) h.results.push(obj);
			}
		});
		return h;
	});
	
	//Find xref highlights
	highlight = $.merge(highlight, $.map(this.highlightXrefs, function(v, k) {
		var h = {};
		h.results = [];
		h.label = v;
		
		that.findByXref(h);
		
		return h;
	}));
	
	var currColor = -1;
	
	$.each(highlight, function(k, v) {
		if(v.results.length > 0) {
			currColor = currColor + 1;
			if(currColor >= that.colors.length) {
				currColor = 0;
			}
		}
		var myColor = currColor;
				
		var $container = $('<div/>')
		.addClass('ui-widget')
		.addClass('hcontainer')
		.css({
			overflow: 'hidden',
			border: '1px solid #AAAAAA',
			height: '1.5em',
			margin: '2px',
			'vertical-align': 'middle',
			padding: '0px 0px 0px 3px'
		});
		
		if(v.results.length > 0) {
			$container.attr('title', 'Click to focus on ' + v.label);
		} else {
			$container.attr(
				'title', 'Unable to locate ' + v.label + ' on pathway');
		}
		
		that.$panel.append($container);
		
		$label = $('<div>' + v.label + '</div>');
		$label.disableSelection();

		$container.append($label);

		$container.width((that.$panel.width() - 9) + "px");
		
		$container.hover(function() {
				$(this).css('cursor','pointer');
			}, function() {
				$(this).css('cursor','auto');
		});

		var idpref = "url.highlight." + v.label;
		
		var doHighlight = function() {
			//Highlight the corresponding element on the pathway
			if(v.results.length > 0) {
				$.each(v.results, function(i, j) {
					that.viewer.highlight(
						idpref + i, j, that.colors[myColor]
					);
				});
				$container.css({
					'background-color': that.colors[myColor]
				});
			}
		}
		
		var unHighlight = function() {
			//Highlight the corresponding element on the pathway
			if(v.results.length > 0) {
				$.each(v.results, function(i, j) {
					that.viewer.removeHighlight(idpref + i);
				});
			}
		}
		
		doHighlight();
		
		var isHighlight = true;
		//When highlight panel is shown/hidden, also toggle highlights
		that.$toggler.click(function(e) {
			if(isHighlight) {
				unHighlight();
				isHighlight = false;
			} else {
				doHighlight();
				isHighlight = true;
			}
		});
		
		//Clicking on highlight box to focus on results
		var currFocus = -1;
		$container.bind('mousedown', function(e) {
			currFocus = currFocus + 1;
			if(currFocus >= v.results.length) currFocus = 0;
			that.viewer.focus(v.results[currFocus]);
			//Prevent dragging viewer when clicking control			
			e.stopPropagation();
		});
	});
}

PathwayElementHighlighter.prototype.findByXref = function(h) {
	var that = this;
	var x = { id:'', ds:'' };
	var v = h.label.split(',');
	x.id = v[0];
	if(v.length > 1) x.ds = v[1];
	console.log(x);
	if(x.id) {
		$.each(this.viewer.gpml.searchObjects, function(i, obj) {
			var px = that.viewer.gpml.getXref(obj);
			if(px && px.id == x.id && (!x.ds || px.ds == x.ds)) {
				h.results.push(obj);
			}
		});
	}
}

PathwayElementHighlighter.prototype.createHighlightPanel = function() {
	var $box = $('<div/>').addClass('ui-widget').addClass('ui-corner-all').css({
		position: 'absolute',
		'z-index': 1001,
		border: '1px solid #AAAAAA',
		top: '5px',
		left: '5px',
		width: '80px',
		'font-size': '8pt',
		backgroundColor: '#DDDDDD'
	});
	
	$box.hover(function() {
		$(this).css('cursor','pointer');
	}, function() {
		$(this).css('cursor','auto');
	});
	
	var $text = $('<div></div>');
	$text.disableSelection();
	$text.append($('<span><b>Highlights</b></span>').css({
		'float': 'left'
	}));
	var $icon = $('<span/>')
		.addClass('ui-icon')
		.addClass('ui-icon-triangle-1-s');
	$text.append($icon);
	
	$text.click(function() {
		$box.children('.hcontainer').toggle('fast');
		$icon.toggleClass(
			'ui-icon-triangle-1-e ui-icon-triangle-1-s');
	});
	
	$text.hover(function() {
		$text.toggle
	});

	//Allow other methods to attach listeners when highlight box is hidden
	this.$toggler = $text;
		
	$box.append($text);

	return $box;
}
