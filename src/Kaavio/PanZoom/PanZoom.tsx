import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';

export class PanZoom extends React.Component<any, any> {
    panZoom: any;

    constructor(props){
        super(props);
    }

    componentWillUpdate(nextProps, nextState){
        let node: SVGElement = ReactDOM.findDOMNode(nextProps.diagram) as SVGElement;
        this.panZoom = SVGPanZoom(node, {
            controlIconsEnabled: false,
            fit: true,
            center: true,
            minZoom: 0.1,
            maxZoom: 20.0,
            zoomEnabled: false
        });
    }

    zoomIn = () =>  {
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
            <div>
                <button onClick={this.zoomIn}>Zoom in</button>
                <button onClick={this.zoomOut}>Zoom out</button>
                <button onClick={this.resetZoom}>Reset</button>
            </div>
        )
    }
}