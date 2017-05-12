import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';
import {BehaviorSubject, Observable} from "rxjs/Rx";
import * as _ from 'lodash';

export class PanZoom extends React.Component<any, any> {
    panZoom: any;
    // Some components may need to know when the diagram is currently panning or zooming
    // This observable is true if the diagram is zooming or panning and false if not
    private isUpdating: BehaviorSubject<boolean>;
    isUpdating$: Observable<boolean>;

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
                    this.isUpdating = new BehaviorSubject(false);
                    this.isUpdating$ = this.isUpdating.asObservable();
                    onReady(this);
                },
                haltEventListeners: [],
                destroy: (_) => {
                }
            },
            beforeZoom: (oldZoom, newZoom) => {
                this.isUpdating.next(true);
                return true;
            },
            beforePan: (oldPan, newPan) =>  {
                this.isUpdating.next(true);
                return true;
            },
            // This event is fired after the transformation matrix is applied
            // See: https://github.com/ariutta/svg-pan-zoom/issues/121#issuecomment-252393381
            // So set isUpdating to false here
            onUpdatedCTM: newCTM => this.isUpdating.next(false)
        } as SvgPanZoom.Options);
    };

    getSizes = () => {
        return this.panZoom.getSizes();
    };

    getPan = () => {
        return this.panZoom.getPan();
    };

    getZoom = () => {
        return this.panZoom.getZoom();
    }

    zoom = (zoom_perc: number) => {
        this.panZoom.zoom(zoom_perc);
    };

    pan = (coordinates: {x: number, y: number}) => {
        this.panZoom.pan(coordinates);
    };

    zoomIn = () => {
      this.panZoom.zoomIn();
    };

    zoomOut = () => {
        this.panZoom.zoomOut();
    };

    resetPan = () => {
        this.panZoom.resetPan();
    };

    resetZoom = () => {
        this.panZoom.resetZoom();
    };

    reset = () => {
       this.panZoom.reset();
    };

    render(){
        // Can put custom Kaavio controls here
        // TODO: Make custom Kaavio PanZoom controls
        return null;
    }
}