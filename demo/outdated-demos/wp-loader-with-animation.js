/**
 * JS code to hook into mediawiki divs already in place to 
 * generate main pathway image, along with log in, edit, 
 * and download controls. This code does everything right 
 * up to the point where pvjs is integrated, including the
 * creation of the pwImage_pvjs div that pvjs targets.
 */ 

// master variable for height of pvjs viewer container divs
var viewer_height = '500px';
var viewer_width = '100%';
var viewer_min_width = '700px';
var viewer_max_width = '900px';

/**
 *  When page is ready:
 *   1. Grab pwImage div; clean up <a>; remove <img>
 *   2. Prepare new divs inside thumbinner
 *   3. Animate window, if supported 
 *   4. Add final div for pvjs
 */
$(window).ready(function() {
	var img = $('#pwImage');
	if (typeof img.get(0) != 'undefined'){ //i.e., skip for PathwayWidget cases
	  if (img.get(0).nodeName.toLowerCase()!= 'img') {
		img = $('#pwImage img');
	  }
	}
	if (img.parent().is('a')){
		var oldParent=img.parent();
		var newParent=oldParent.parent();
		oldParent.after(img);
		oldParent.remove();
	}
	var container = $('<div />')
		.attr('id', 'pwImage_container')
		.css({	width: viewer_width, 
			'min-width': viewer_min_width, 
			'max-width': viewer_max_width, 
			height: viewer_height, 
			margin:'0 0 0 0' 
		}); 
	var parent = img.parent();
	img.after(container);
	img.remove();

	//Make room for the login/edit/download buttons at the bottom
	parent.css({
		padding: '3px 6px 30px 3px' 
	});     

	if (ie) { //Animate gives problems in IE, just change style directly
		parent.css({
			width: viewer_width,
			'min-width': viewer_min_width, 
			'max-width': viewer_max_width, 
			height: viewer_height
		});
		afterAnimate(container);
	} else { //Animate for smooth transition
		parent.animate({
			width: viewer_width,
			'min-width': viewer_min_width, 
			'max-width': viewer_max_width, 
			height: viewer_height
		}, 300, afterAnimate(container));
	}

	// see http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript/23401756#23401756

	var getQueryStringKey = function(key) {
	    return getQueryStringAsObject()[key];
	};

	var getQueryStringAsObject = function() {
	    var b, cv, e, k, ma, sk, v, r = {},
		d = function (v) { return decodeURIComponent(v).replace(/\+/g, " "); }, //# d(ecode) the v(alue)
		q = window.location.search.substring(1),
		s = /([^&;=]+)=?([^&;]*)/g //# original regex that does not allow for ; as a delimiter:   /([^&=]+)=?([^&]*)/g
	    ;

	    //# ma(make array) out of the v(alue)
	    ma = function(v) {
		//# If the passed v(alue) hasn't been setup as an object
		if (typeof v != "object") {
		    //# Grab the cv(current value) then setup the v(alue) as an object
		    cv = v;
		    v = {};
		    v.length = 0;

		    //# If there was a cv(current value), .push it into the new v(alue)'s array
		    //#     NOTE: This may or may not be 100% logical to do... but it's better than loosing the original value
		    if (cv) { Array.prototype.push.call(v, cv); }
		}
		return v;
	    };

	    //# While we still have key-value e(ntries) from the q(uerystring) via the s(earch regex)...
		    while (e = s.exec(q)) { //# while((e = s.exec(q)) !== null) {
			//# Collect the open b(racket) location (if any) then set the d(ecoded) v(alue) from the above split key-value e(ntry) 
			b = e[1].indexOf("[");
			v = d(e[2]);

			//# As long as this is NOT a hash[]-style key-value e(ntry)
			if (b < 0) { //# b == "-1"
			    //# d(ecode) the simple k(ey)
			    k = d(e[1]);

			    //# If the k(ey) already exists
			    if (r[k]) {
				//# ma(make array) out of the k(ey) then .push the v(alue) into the k(ey)'s array in the r(eturn value)
				r[k] = ma(r[k]);
				Array.prototype.push.call(r[k], v);
			    }
			    //# Else this is a new k(ey), so just add the k(ey)/v(alue) into the r(eturn value)
			    else {
				r[k] = v;
			    }
			}
			//# Else we've got ourselves a hash[]-style key-value e(ntry) 
			else {
			    //# Collect the d(ecoded) k(ey) and the d(ecoded) sk(sub-key) based on the b(racket) locations
			    k = d(e[1].slice(0, b));
			    sk = d(e[1].slice(b + 1, e[1].indexOf("]", b)));

			    //# ma(make array) out of the k(ey) 
			    r[k] = ma(r[k]);

			    //# If we have a sk(sub-key), plug the v(alue) into it
			    if (sk) { r[k][sk] = v; }
			    //# Else .push the v(alue) into the k(ey)'s array
			    else { Array.prototype.push.call(r[k], v); }
			}
		    }

		    //# Return the r(eturn value)
		    return r;
		};
	}

	var queryStringParameters = getQueryStringAsObject();
	if (Modernizr.inlinesvg) {
		$(window).on('pvjsReady', function() {
		  $(function(){

		    var colors;
		    if (!!queryStringParameters.colors) {
		      colors = queryStringParameters.colors.split(',');
		    }

		    var xrefs = queryStringParameters.xref;
		    if (!!xrefs && (typeof(xrefs) === 'string')) {
		      xrefs = [xrefs];
		    }
		    var xrefHighlights = [];
		    var xrefIndex = 0;
		    _.forEach(xrefs, function(xref) {
		      var xrefHighlight = {};
		      xrefHighlight.id = xref.split(',')[0];
		      xrefHighlight.color = colors[xrefIndex] || colors[0];
		      xrefHighlights.push(xrefHighlight);
		      xrefIndex += 1;
		    });

		    var labels = queryStringParameters.label;
		    if (!!labels && (typeof(labels) === 'string')) {
		      labels = [labels];
		    }
		    var labelIndex = 0;
		    var labelHighlights = [];
		    _.forEach(labels, function(label) {
		      var labelHighlight = {};
		      labelHighlight.id = label;
		      labelHighlight.color = colors[labelIndex] || colors[0];
		      labelHighlights.push(labelHighlight);
		      labelIndex += 1;
		    });

		    $('#pwImage_pvjs').pvjs({
		      fitToContainer: true,
		      manualRender: true,
		      sourceData: [{uri:gpmlFilePath, fileType:'gpml'},{uri:pngFilePath, fileType:'png'}]
		    });

		    var pathInstance = $('#pwImage_pvjs').pvjs('get').pop();

		    pvjsNotifications(pathInstance, {displayErrors: true, displayWarnings: false});

		    pathInstance.on('rendered', function(){
		      var hi = pvjsHighlighter(pathInstance);

		      if (!!labelHighlights && labelHighlights.length > 0) {
			labelHighlights.forEach(function(labelHighlight) {
			  hi.highlight(labelHighlight.id, null, {fill: labelHighlight.color, stroke: labelHighlight.color});
			});
		      }

		      if (!!xrefHighlights && xrefHighlights.length > 0) {
			xrefHighlights.forEach(function(xrefHighlight) {
			  hi.highlight('xref:' + xrefHighlight.id, null, {fill: xrefHighlight.color, stroke: xrefHighlight.color});
			});
		      }
		    });

		    pathInstance.render();
		  });
		});
	}
}); 

/**
 * Adds the final div and the future home of the pvjs code.
 */

var afterAnimate = function(c) {
	var pvjs = $('<div/>')
		.attr('id','pwImage_pvjs')
		.css({	width: viewer_width,
			'min-width': viewer_min_width, 
			'max-width': viewer_max_width, 
			height: viewer_height
		});
	c.append(pvjs);
};

/** 
 * A short snippet for detecting versions of IE in JavaScript
 * without resorting to user-agent sniffing
 * 
 * If you're not in IE (or IE version is less than 5) then:
 *     ie === undefined
 * If you're in IE (>=5) then you can determine which version:
 *     ie === 7;  // IE7
 * Thus, to detect IE:
 *     if (ie) {}
 * And to detect the version:
 *     ie === 6  // IE6
 *     ie > 7  // IE8, IE9 ...
 *     ie < 9 // Anything less than IE9
 */

var ie = (function(){

    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );

    return v > 4 ? v : undef;

}());

