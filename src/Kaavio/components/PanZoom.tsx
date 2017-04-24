import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';
import {Subject} from "rxjs";
import * as _ from 'lodash';

export class PanZoom extends React.Component<any, any> {
    panZoom: any;
    // Subject containing new zoom scales when zoom event occurred.
    // See: https://github.com/ariutta/svg-pan-zoom#how-to-use
    private didZoom: Subject<number>;
    // Subject containing new pan positions when pan event occurred.
    private didPan: Subject<{x: number, y: number}>;

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps, nextState){
        const prevProps = this.props;
        if(_.isEqual(nextProps.diagram, prevProps.diagram)) return;
        this.init(nextProps.diagram, nextProps.onReady, nextProps.showPanZoomControls);
    }

    componentDidMount() {
        const {diagram, onReady, showPanZoomControls} = this.props;
        if(!diagram) return;
        this.init(diagram, onReady, showPanZoomControls);
    }

    destroy = () => {
        if(! this.panZoom) return;
        this.panZoom.destroy();
    };

    init = (diagram, onReady, showControls: boolean) => {
        this.destroy(); // Destroy the diagram first in case there is one
        let node: SVGElement = ReactDOM.findDOMNode(diagram) as SVGElement;
        SVGPanZoom(node, {
            viewportSelector: '.svg-pan-zoom_viewport',
            controlIconsEnabled: showControls,
            fit: true,
            center: true,
            minZoom: 0.1,
            maxZoom: 20.0,
            zoomEnabled: false,
            customEventsHandler: {
                init: (options) => {
                    this.panZoom = options.instance;
                    this.didPan = new Subject();
                    this.didZoom = new Subject();
                    onReady(this);
                },
                haltEventListeners: [],
                destroy: (_) => {}
            },
            onZoom: (scale) => this.didZoom.next(scale),
            onPan: (pos) => this.didPan.next(pos)
        });
    };

    getSizes = () => {
        return this.panZoom.getSizes();
    };

    getPan = () => {
        return this.panZoom.getPan();
    };

    // All of the below methods return an observable that emits when the
    // diagram pans or zooms. It is not for certain that the observable emits
    // because of the called method, it could be because of any of them.
    // This has to be done this way because SVGPanZoom only uses onPan and onZoom events
    // in the init method and does not return promises/observables from pan/zoom methods.
    // TODO: If rewriting this to not use SVGPanZoom return observables from the zoom/pan methods
    zoom = (zoom_perc: number) => {
        this.panZoom.zoom(zoom_perc);
        return this.didZoom.asObservable();
    };

    pan = (coordinates: {x: number, y: number}) => {
        this.panZoom.pan(coordinates);
        return this.didPan.asObservable();
    };

    zoomIn = () => {
      this.panZoom.zoomIn();
      return this.didZoom.asObservable();
    };

    zoomOut = () => {
        this.panZoom.zoomOut();
        return this.didZoom.asObservable();
    };

    resetPan = () => {
        this.panZoom.resetPan();
        return this.didPan.asObservable();
    };

    resetZoom = () => {
        this.panZoom.resetZoom();
        return this.didZoom.asObservable();
    };

    reset = () => {
       this.panZoom.reset();
       // Return the merged observable since either pan or zoom, or both can be used
       return this.didPan.asObservable()
           .merge(this.didZoom.asObservable());
    };

    render(){
        // Can put custom Kaavio controls here
        // TODO: Make custom Kaavio PanZoom controls
        return null;
    }
}