import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';
import {Observable, Subject, BehaviorSubject} from "rxjs";
import * as _ from 'lodash';

export class PanZoom extends React.Component<any, any> {
    panZoom: any;

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
                    onReady(this)
                },
                haltEventListeners: [],
                destroy: (_) => {}
            }
        });
    };

    getSizes = () => {
        return this.panZoom.getSizes();
    };

    getPan = () => {
        return this.panZoom.getPan();
    };

    zoom = (zoom_perc: number) => {
        this.panZoom.zoom(zoom_perc);
    };

    pan = (coordinates: {x: number, y: number}) => {
        this.panZoom.pan(coordinates);
    };

    zoomIn = () => {
      this.panZoom.zoomIn()
    };

    zoomOut = () => {
        this.panZoom.zoomOut();
    };

    resetPanZoom = () => {
       this.panZoom.reset();
    };

    render(){
        // Can put custom Kaavio controls here
        // TODO: Make custom Kaavio PanZoom controls
        return null;
    }
}