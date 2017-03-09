import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';
import {styles} from './style';
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
        let node: SVGElement = ReactDOM.findDOMNode(nextProps.diagram) as SVGElement;
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
            }
        );
    }

    zoomIn = () => {
      this.panZoom.zoomIn()
    };

    zoomOut = () => {
        this.panZoom.zoomOut();
    };

    resetZoom = () => {
        this.panZoom.resetZoom();
    };

    render(){
        return (
            <div style={styles.zoomControlsWrapper}>
                <button style={styles.zoomControl} className="zoomInClass btn btn-default" onClick={this.zoomIn}><span className="glyphicon glyphicon-zoom-in"> </span> </button>
                <button style={styles.zoomControl} className="zoomOutClass btn btn-default" onClick={this.zoomOut}><span className="glyphicon glyphicon-zoom-out"> </span> </button>
                <button style={styles.zoomControl} className="resetZoomClass btn btn-default" onClick={this.resetZoom}>Reset</button>
            </div>
        )
    }
}