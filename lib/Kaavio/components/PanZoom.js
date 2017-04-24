import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';
import { Subject } from "rxjs/Rx";
import * as _ from 'lodash';
export class PanZoom extends React.Component {
    constructor(props) {
        super(props);
        this.destroy = () => {
            if (!this.panZoom)
                return;
            this.panZoom.destroy();
        };
        this.init = (diagram, onReady, showControls) => {
            this.destroy(); // Destroy the diagram first in case there is one
            let node = ReactDOM.findDOMNode(diagram);
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
                    destroy: (_) => { }
                },
                onZoom: (scale) => this.didZoom.next(scale),
                onPan: (pos) => this.didPan.next(pos)
            });
        };
        this.getSizes = () => {
            return this.panZoom.getSizes();
        };
        this.getPan = () => {
            return this.panZoom.getPan();
        };
        // All of the below methods return an observable that emits when the
        // diagram pans or zooms. It is not for certain that the observable emits
        // because of the called method, it could be because of any of them.
        // This has to be done this way because SVGPanZoom only uses onPan and onZoom events
        // in the init method and does not return promises/observables from pan/zoom methods.
        // TODO: If rewriting this to not use SVGPanZoom return observables from the zoom/pan methods
        this.zoom = (zoom_perc) => {
            this.panZoom.zoom(zoom_perc);
            return this.didZoom.asObservable().takeLast(1);
        };
        this.pan = (coordinates) => {
            this.panZoom.pan(coordinates);
            return this.didPan.asObservable().takeLast(1);
        };
        this.zoomIn = () => {
            this.panZoom.zoomIn();
            return this.didZoom.asObservable().takeLast(1);
        };
        this.zoomOut = () => {
            this.panZoom.zoomOut();
            return this.didZoom.asObservable().takeLast(1);
        };
        this.resetPan = () => {
            this.panZoom.resetPan();
            return this.didPan.asObservable().takeLast(1);
        };
        this.resetZoom = () => {
            this.panZoom.resetZoom();
            return this.didZoom.asObservable().takeLast(1);
        };
        this.reset = () => {
            this.panZoom.reset();
            // Return the merged observable since either pan or zoom, or both can be used
            return this.didPan.asObservable()
                .merge(this.didZoom.asObservable()).takeLast(1);
        };
    }
    componentWillReceiveProps(nextProps, nextState) {
        const prevProps = this.props;
        if (_.isEqual(nextProps.diagram, prevProps.diagram))
            return;
        this.init(nextProps.diagram, nextProps.onReady, nextProps.showPanZoomControls);
    }
    componentDidMount() {
        const { diagram, onReady, showPanZoomControls } = this.props;
        if (!diagram)
            return;
        this.init(diagram, onReady, showPanZoomControls);
    }
    render() {
        // Can put custom Kaavio controls here
        // TODO: Make custom Kaavio PanZoom controls
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuWm9vbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9QYW5ab29tLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEtBQUssVUFBVSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUMsT0FBTyxFQUFhLE1BQU0sU0FBUyxDQUFDO0FBQzVDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE1BQU0sY0FBZSxTQUFRLEtBQUssQ0FBQyxTQUFtQjtJQVFsRCxZQUFZLEtBQUs7UUFDYixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFlakIsWUFBTyxHQUFHO1lBQ04sRUFBRSxDQUFBLENBQUMsQ0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQztRQUVGLFNBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBcUI7WUFDM0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsaURBQWlEO1lBQ2pFLElBQUksSUFBSSxHQUFlLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFlLENBQUM7WUFDbkUsVUFBVSxDQUFDLElBQUksRUFBRTtnQkFDYixnQkFBZ0IsRUFBRSx3QkFBd0I7Z0JBQzFDLG1CQUFtQixFQUFFLFlBQVk7Z0JBQ2pDLEdBQUcsRUFBRSxJQUFJO2dCQUNULE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixtQkFBbUIsRUFBRTtvQkFDakIsSUFBSSxFQUFFLENBQUMsT0FB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