import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';
import {styles} from './pan-zoom-style';
import {Observable, Subject, BehaviorSubject} from "rxjs";

export class PanZoom extends React.Component<any, any> {
    panZoom: any;

    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps, nextState){
        const {diagram, onReady} = nextProps;
        if(!diagram) return;
        this.init(diagram, onReady);
    }

    componentDidMount() {
        const {diagram, onReady} = this.props;
        if(!diagram) return;
        this.init(diagram, onReady);
    }

    destroy = () => {
        if(! this.panZoom) return;
        this.panZoom.destroy();
    };

    init = (diagram, onReady) => {
        this.destroy(); // Destroy the diagram first in case there is one
        let node: SVGElement = ReactDOM.findDOMNode(diagram) as SVGElement;
        SVGPanZoom(node, {
            viewportSelector: '.svg-pan-zoom_viewport',
            controlIconsEnabled: false,
            fit: true,
            center: true,
            minZoom: 0.1,
            maxZoom: 20.0,
            zoomEnabled: false,
            customEventsHandler: {
                init: (options) => {
                    this.panZoom = options.instance;
                    onReady(this.panZoom)
                },
                haltEventListeners: [],
                destroy: (_) => {}
            }
        });
        console.log(this.panZoom)
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
        return (
            <div style={styles.zoomControlsWrapper}>
                <button style={styles.zoomControl} className="zoomInClass btn btn-default" onClick={this.zoomIn}><span className="glyphicon glyphicon-zoom-in"> </span> </button>
                <button style={styles.zoomControl} className="zoomOutClass btn btn-default" onClick={this.zoomOut}><span className="glyphicon glyphicon-zoom-out"> </span> </button>
                <button style={styles.zoomControl} className="resetZoomClass btn btn-default" onClick={this.resetPanZoom}>Reset</button>
            </div>
        )
    }
}