import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';
import {styles} from './pan-zoom-style';
import {Observable, Subject, BehaviorSubject} from "rxjs";

export class PanZoom extends React.Component<any, any> {
    panZoom: any;

    // Observable for other components/services to listen to to check panZoom functions are ready.
    private panZoomEnabled: BehaviorSubject<boolean> = new BehaviorSubject(false);
    panZoomEnabled$: Observable<boolean> = this.panZoomEnabled.asObservable();

    constructor(props){
        super(props);
    }

    componentWillUpdate(nextProps, nextState){
        this.init(nextProps.diagram);
    }

    destroy = () => {
        if(! this.panZoom) return;
        this.panZoom.destroy();
    };

    init = (diagram?) => {
        if(! diagram) diagram = this.props.diagram;
        let node: SVGElement = ReactDOM.findDOMNode(diagram) as SVGElement;
        SVGPanZoom(node, {
            controlIconsEnabled: false,
            fit: true,
            center: true,
            minZoom: 0.1,
            maxZoom: 20.0,
            zoomEnabled: false,
            customEventsHandler: {
                init: (options) => {
                    this.panZoom = options.instance;
                    this.panZoomEnabled.next(true)
                },
                haltEventListeners: [],
                destroy: (_) => {}
            }
        });
    };

    getSizes = () => {
        return this.panZoom.getSizes();
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