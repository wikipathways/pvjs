/**
 *  SVG ZoomNPan library 1.0
 * ========================
 *
 * @param zoomElt object SVGSVGElement the root SVG element. If called from the SVG document to zoom, the argument can be omitted.
 */
 
var ZoomNPan = function (zoomElt) {
	//private members
	var _currentState; 
	var _initialized;
	var _options;
	var _this;
	var _zoomElt;

	//public members
    this.currentState;
	this.options;

	
	// ctor
	function ZoomNPan(zoomElt){
		
		if (!zoomElt && (document.documentElement == '[object SVGSVGElement]')){
			_zoomElt = document.documentElement;
		}
		else if (zoomElt != '[object SVGSVGElement]') {
		    console.log('Argument passed is not an SVG element');
		    return;
	    }
		
		try {
			_zoomElt.viewport
		}
		catch (e){
			console.log('SVGSVGElement.viewport not implemented, can\'t run ZoomNPan');
			return
		}
			
			
		_zoomElt = _zoomElt || zoomElt;
		
	    // Set defaults/private members
	    _options = {
		    autoRun: true,
		    autoFitViewport: true, 
		    zoomScale: 1.2,
		    fastZoomMultiplier: 5,
		    toggleZoomKeyCode: 27,
			cursorGrab: ' url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFAAAA////////c3ilYwAAAAN0Uk5T//8A18oNQQAAAD1JREFUeNp0zlEKACAIA9Bt9z90bZBZkQj29qFBEuBOzQHSnWTTyckEfqUuZgFvslH4ch3qLCO/Kr8cAgwATw4Ax6XRCcoAAAAASUVORK5CYII="), move',
			cursorHand: ' /* url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRFAAAA////////c3ilYwAAAAN0Uk5T//8A18oNQQAAAExJREFUeNp0jwEOwCAIAw///+ixFqZm2qChl1CUYUE3NkRglpdMnqw/wCN24uzgZRUpOdoJLYGYQLGxiFp7BYx+xw7m2vrcR47gEWAAkHEBFiebq0wAAAAASUVORK5CYII="), */ default'
	    };
		
        _currentState = {
		    state: 'none',
		    panX: 0,
		    panY: 0,
		    translateX: 0,
		    translateY: 0,
		    oldTranslateX: 0,
		    oldTranslateY: 0,
		    zoomAllowed: _options.autoRun,
		    timePrev: 0
	    };
		
	    _this = this;
		
	    
	    // Assign public members
	    //      NOTE: omit these public assignments if you don't really need them exposed;
	    //            the class no longer uses them internally. Also delete them in the 
	    //            public member placeholder assignment above; I can't tell your intended 
	    //            usage from the class definition.
	    this.zoomElt = _zoomElt;
	    this.currentState = _currentState;
        this.options = _options;
	
	    addEvents();
	    scaleImage();
	    
	    _initialized = true;
	}
	
	
	// Public methods
	//      NOTE: I made best guesses about which methods actually need to be exposed.
	//            If I guessed wrong, simply follow the pattern to expose more/less as needed.

    this.zoomIt = function (delta) {
	    ensureControl();
	    var timeNow = Date.now();
	  //  if (timeNow - _currentState.timePrev > 0) { // skip unnecessary redraw
		    var cur = _currentState;
		    var ZE  = _zoomElt;
		    var oldScale = ZE.currentScale;
		    var scaleFactor = Math.pow(1 + _options.zoomScale, delta);
    		
		    // Remember translate before zooming
		    cur.oldTranslateX = ZE.currentTranslate.x;
		    cur.oldTranslateY = ZE.currentTranslate.y;

		    ZE.currentScale *= scaleFactor;
    		
		    var vp_width = ZE.viewport.width;
		    var vp_height = ZE.viewport.height;
    		
		    // Very complicated calculations :)
		    // Borrowed from http://jwatt.org/svg/tests/zoom-and-pan-controls.svg
		    ZE.currentTranslate.x = vp_width/2  - (ZE.currentScale/oldScale) * (vp_width/2  - cur.oldTranslateX);
		    ZE.currentTranslate.y = vp_height/2 - (ZE.currentScale/oldScale) * (vp_height/2 - cur.oldTranslateY);
    	
		    cur.timePrev = timeNow;
	    // }
    }

    this.zoom1x = function() {
        ensureControl();
	    _zoomElt.currentScale = 1;//(1.0);
	    _zoomElt.currentTranslate.x = 0;
	    _zoomElt.currentTranslate.y = 0;
    }

    this.zoomIn = function() {
	    ensureControl();
	    this.zoomIt(0.23)
    }

    this.zoomOut = function() {
	    ensureControl();
	    this.zoomIt(-0.23)
    }
    
    this.resetState = function () {
	    ensureControl();
	    //if (!_currentState.zoomAllowed){
		    _zoomElt.style.cursor = 'default';
		    _currentState.oldTranslateX = 0;
		    _currentState.oldTranslateY = 0;
		    _currentState.state == 'none'
	    //}
    }
	
    this.makeViewBox = function (SVGElt) {
	    //ensureControl();
	    var doc  = SVGElt || _zoomElt; // to be able to use this function  separately
		var w  = parseFloat(doc.viewport.width) || 0;
		var h  = parseFloat(doc.viewport.height) || 0;
		var wAttr = doc.getAttributeNS(null, "width");
		var hAttr = doc.getAttributeNS(null, "height");
		var vB    = doc.viewBox.baseVal;//SVGRoot.getAttributeNS(null, "viewBox");

	    if (!wAttr && !hAttr && !(vB && vB.width)) { 
		    // If there are NO width & height & viewbox try to guess them
		    var BBox = doc.getBBox();
		    vB.x = BBox.x;
		    vB.y = BBox.y;
		    vB.width = BBox.width;
		    vB.height = BBox.height;
	    }
	    else if ((wAttr || hAttr) && !vB.width) {
	    // If there IS width or height and NO viewBox,
	    // generate viewbox based on them
		    vB.x = doc.x.baseVal.value;
		    vB.y = doc.y.baseVal.value;
		    vB.width  = w || doc.width.baseVal.value;
		    vB.height = h || doc.height.baseVal.value;
    		
		    doc.removeAttributeNS(null, 'width');
		    doc.removeAttributeNS(null, 'height');
	    }
	    else if((wAttr || hAttr) && vB.width){
	    // If there are ALL OF width/height/viewBox
	    // only remove width and height attibutes
	    // or image won't scale to fit
			    doc.removeAttributeNS(null, 'width');
			    doc.removeAttributeNS(null, 'height');
	    }
    	
	    return doc;
    }
	
	
	
	// Private methods
	function addEvents(){
	    _zoomElt.addEventListener('mousedown',  handleMouseDown, false);
	    _zoomElt.addEventListener('mouseup',    handleMouseUp, false);
	    _zoomElt.addEventListener('mousemove',  handleMouseMove, false);
	    _zoomElt.addEventListener('mousewheel', handleMouseWheel, false);
	    _zoomElt.addEventListener('keyup',      handleKeyUp, false);
	    //_zoomElt.addEventListener('DOMMouseScroll', handleMouseWheel, false);// mousewheel for Firefox
	}
	
	function cancelEvent(evt){
        if(!evt)return;
        if(evt.preventDefault){
	        evt.preventDefault();
        }
        evt.returnValue = false;
	}
	
	function ensureControl(){
	    if (!_initialized) throw new Error("ZoomNPan: control has not been initialized.");
	}


    function scaleImage(){
	    // Scale the image to fit screen
	    if (_options.autoFitViewport){
		//alert(_this.makeViewBox);
		    _this.makeViewBox(_zoomElt);
	    }
    }
    
    // Events
    function handleMouseMove(evt) { 
        if (_currentState.zoomAllowed){
	        cancelEvent(evt);

	        if(_currentState.state == 'pan') {
		        // Pan mode
		        // get difference to previous position
		        _currentState.translateX = evt.x - _currentState.panX;
		        _currentState.translateY = evt.y - _currentState.panY;

		        evt.currentTarget.currentTranslate.x += _currentState.translateX;
		        evt.currentTarget.currentTranslate.y += _currentState.translateY;
        			
		        // Remember previous position
		        _currentState.panX = evt.x;
		        _currentState.panY = evt.y;
	        }
        }
    }
    
    function handleMouseDown(evt) {
  	    if (_currentState.zoomAllowed) {
	        cancelEvent(evt);
		    if(evt.currentTarget.tagName == "svg") {
			    // Pan mode
			    _currentState.state = 'pan';
			    _zoomElt.style.cursor = _options.cursorGrab;
			    _currentState.panX = evt.x;
			    _currentState.panY = evt.y;
		    }
	    }
    }
    
    function handleMouseUp(evt) {
        //alert('mouse released')
        if (_currentState.zoomAllowed){
            cancelEvent(evt);
            if (_currentState.state == 'pan') {
	            // Quit pan mode
	            _zoomElt.style.cursor = _options.cursorHand;//'default'
	            _currentState.state = '';
            }
        }
    }
    
    function handleMouseWheel(evt) {
        if (_currentState.zoomAllowed){
	        cancelEvent(evt);
	        var delta;
	        if (evt.wheelDelta) {
		        delta = evt.wheelDelta / 360; // Webkit, Opera
	        }
	        else{
		        delta = evt.detail / -9; // Mozilla, Opera
	        }
	        if (evt.altKey){
		        delta *= _options.fastZoomMultiplier;
	        }
	        _this.zoomIt(delta);
        }
    }
    
    function handleKeyUp(evt) {
	    if (evt.keyCode != _options.toggleZoomKeyCode) {
		    return
	    }
        // Global killswitch :) 
        // Toggle zoom and pan when toggle key is pressed (default "z")
        _currentState.zoomAllowed = !_currentState.zoomAllowed;
        if (!_currentState.zoomAllowed){
            _this.resetState();
        }
    }
    
    function handleMouseOut(evt){
        if (_currentState.zoomAllowed){
        // not used, buggy
        // Handle mouse out event
	        cancelEvent(evt);
	        if (_currentState.state == 'pan') {
		        // Quit pan mode
		        _currentState.state = '';
	        }
        }
    }
	
	
	// Call ctor, preserving instantiation scope;
	ZoomNPan.apply(this, arguments);
	
}