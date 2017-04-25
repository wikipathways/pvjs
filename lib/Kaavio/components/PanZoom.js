import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';
import { BehaviorSubject } from "rxjs/Rx";
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
                beforePan: (oldPan, newPan) => {
                    this.isUpdating.next(true);
                    return true;
                },
                // This event is fired after the transformation matrix is applied
                // See: https://github.com/ariutta/svg-pan-zoom/issues/121#issuecomment-252393381
                // So set isUpdating to false here
                onUpdatedCTM: newCTM => this.isUpdating.next(false)
            });
        };
        this.getSizes = () => {
            return this.panZoom.getSizes();
        };
        this.getPan = () => {
            return this.panZoom.getPan();
        };
        this.zoom = (zoom_perc) => {
            this.panZoom.zoom(zoom_perc);
        };
        this.pan = (coordinates) => {
            this.panZoom.pan(coordinates);
        };
        this.zoomIn = () => {
            this.panZoom.zoomIn();
        };
        this.zoomOut = () => {
            this.panZoom.zoomOut();
        };
        this.resetPan = () => {
            this.panZoom.resetPan();
        };
        this.resetZoom = () => {
            this.panZoom.resetZoom();
        };
        this.reset = () => {
            this.panZoom.reset();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuWm9vbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9QYW5ab29tLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEtBQUssVUFBVSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUN0QyxPQUFPLEVBQUMsZUFBZSxFQUFhLE1BQU0sU0FBUyxDQUFDO0FBQ3BELE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE1BQU0sY0FBZSxTQUFRLEtBQUssQ0FBQyxTQUFtQjtJQU9sRCxZQUFZLEtBQUs7UUFDYixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFlakIsWUFBTyxHQUFHO1lBQ04sRUFBRSxDQUFBLENBQUMsQ0FBRSxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUFDLE1BQU0sQ0FBQztZQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQztRQUVGLFNBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBcUI7WUFDM0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsaURBQWlEO1lBQ2pFLElBQUksSUFBSSxHQUFlLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFlLENBQUM7WUFDbkUsVUFBVSxDQUFDLElBQUksRUFBRTtnQkFDYixnQkFBZ0IsRUFBRSx3QkFBd0I7Z0JBQzFDLG1CQUFtQixFQUFFLFlBQVk7Z0JBQ2pDLEdBQUcsRUFBRSxJQUFJO2dCQUNULE1BQU0sRUFBRSxJQUFJO2dCQUNaLE9BQU8sRUFBRSxHQUFHO2dCQUNaLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixtQkFBbUIsRUFBRTtvQkFDakIsSUFBSSxFQUFFLENBQUMsT0FB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