import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';
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
                        onReady(this);
                    },
                    haltEventListeners: [],
                    destroy: (_) => { }
                }
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
        this.resetPanZoom = () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuWm9vbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9QYW5ab29tLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEtBQUssVUFBVSxNQUFNLGNBQWMsQ0FBQztBQUMzQyxPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUV0QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixNQUFNLGNBQWUsU0FBUSxLQUFLLENBQUMsU0FBbUI7SUFHbEQsWUFBWSxLQUFLO1FBQ2IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBZWpCLFlBQU8sR0FBRztZQUNOLEVBQUUsQ0FBQSxDQUFDLENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFBQyxNQUFNLENBQUM7WUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUM7UUFFRixTQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQXFCO1lBQzNDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLGlEQUFpRDtZQUNqRSxJQUFJLElBQUksR0FBZSxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBZSxDQUFDO1lBQ25FLFVBQVUsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsZ0JBQWdCLEVBQUUsd0JBQXdCO2dCQUMxQyxtQkFBbUIsRUFBRSxZQUFZO2dCQUNqQyxHQUFHLEVBQUUsSUFBSTtnQkFDVCxNQUFNLEVBQUUsSUFBSTtnQkFDWixPQUFPLEVBQUUsR0FBRztnQkFDWixPQUFPLEVBQUUsSUFBSTtnQkFDYixXQUFXLEVBQUUsS0FBSztnQkFDbEIsbUJBQW1CLEVBQUU7b0JBQ2pCLElBQUksRUFBRSxDQUFDLE9BQU87d0JBQ1YsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO3dCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ2pCLENBQUM7b0JBQ0Qsa0JBQWtCLEVBQUUsRUFBRTtvQkFDdEIsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFNLENBQUM7aUJBQ3JCO2FBQ0osQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDO1FBRUYsYUFBUSxHQUFHO1lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFDO1FBRUYsV0FBTSxHQUFHO1lBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakMsQ0FBQyxDQUFDO1FBRUYsU0FBSSxHQUFHLENBQUMsU0FBaUI7WUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDO1FBRUYsUUFBRyxHQUFHLENBQUMsV0FBbUM7WUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDO1FBRUYsV0FBTSxHQUFHO1lBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUN2QixDQUFDLENBQUM7UUFFRixZQUFPLEdBQUc7WUFDTixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzNCLENBQUMsQ0FBQztRQUVGLGlCQUFZLEdBQUc7WUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3pCLENBQUMsQ0FBQztJQW5FRixDQUFDO0lBRUQseUJBQXlCLENBQUMsU0FBUyxFQUFFLFNBQVM7UUFDMUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUM3QixFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxpQkFBaUI7UUFDYixNQUFNLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDM0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDckQsQ0FBQztJQXlERCxNQUFNO1FBQ0Ysc0NBQXNDO1FBQ3RDLDRDQUE0QztRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSiJ9