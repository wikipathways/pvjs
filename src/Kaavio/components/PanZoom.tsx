import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';
import { isEqual, minBy, maxBy } from 'lodash';
import * as d3 from 'd3';

export class PanZoom extends React.Component<any, any> {
    constructor(props){
        super(props);
        this.state = {
            ready: false, // Is the diagram ready to pan or zoom?
            panZoom: null,
            shouldZoom: false,
            shouldPan: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        const prevProps = this.props;
        const {pannedEntities, zoomedEntities} = nextProps;
        if(! isEqual(nextProps.diagram, prevProps.diagram)) {
            const onInit = (panZoomInstance) => {
                this.setState({
                    panZoom: panZoomInstance,
                    ready: true,
                    shouldZoom: true,
                    shouldPan: true,
                });
            };
            this.init(nextProps.diagram, onInit);
        }

        if(! isEqual(prevProps.pannedEntities, pannedEntities)) {
            this.setState({shouldPan: true});
        }
        if (! isEqual(prevProps.zoomedEntities, zoomedEntities)) {
            this.setState({shouldZoom: true});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Whenever the state or props change, we check if the component should pan or zoom
        // If ONE of them is needed, it is performed
        // By calling setState in setOn[Pan/Zoom], this will be called again
        // So if both of them are needed, they are performed one after the other
        const { shouldPan, shouldZoom, panZoom, ready } = this.state;

        if(shouldPan && ready) {
            panZoom.setOnPan(() => {
                this.setState({shouldPan: false});
                panZoom.setOnPan(() => {});
            });
            this.panToEntities();
        }
        else if(shouldZoom && ready) {
            panZoom.setOnZoom(() => {
                this.setState({shouldZoom: false});
                panZoom.setOnZoom(() => {});
            });
            this.zoomOnEntities();
        }
    }

    destroy = () => {
        const { panZoom } = this.state;
        if(! panZoom) return;
        panZoom.destroy();
        this.setState({
            ready: false,
            shouldPan: false,
            shouldZoom: false,
            panZoom: null,
        })
    };

    init = (diagram, onInit?) => {
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
                    if(! onInit ) return;
                    onInit(options.instance)
                },
                haltEventListeners: [],
                destroy: () => {}
            },
            beforeZoom: () => {
                // Don't allow if not ready
                const { ready } = this.state;
                if (! ready) return false;
                // Don't allow any more zooming until done
                this.setState({ready: false});
                return true;
            },
            beforePan: () =>  {
                // Don't allow if not ready
                const { ready } = this.state;
                if (! ready) return false;
                // Don't allow any more panning until done
                this.setState({ready: false});
                return true;
            },
            onUpdatedCTM: () => this.setState({ready: true})
        } as SvgPanZoom.Options);
    };

    zoomOnEntities() {
        const { zoomedEntities } = this.props;
        const { panZoom } = this.state;

        if (! zoomedEntities || zoomedEntities.length < 1) {
            panZoom.reset();
            return;
        }

        const BBox = this.locate(zoomedEntities);
        const containerBBox = panZoom.getSizes();
        const scalingFactor = 0.8;

        if (BBox.width >= BBox.height) {
            panZoom.zoom((containerBBox.width / BBox.width) * scalingFactor * containerBBox.realZoom);
            return;
        }
        panZoom.zoom((containerBBox.height / BBox.height) * scalingFactor * containerBBox.realZoom);
    }

    panToEntities() {
        const { pannedEntities } = this.props;
        const { panZoom } = this.state;

        if (! pannedEntities || pannedEntities.length < 1) {
            panZoom.resetPan();
            return;
        }

        const BBox = this.locate(pannedEntities);
        const curPan = panZoom.getPan();
        const containerSizes = panZoom.getSizes();

        const coordinates = {
            x: -BBox.x -  (BBox.width / 2) + curPan.x + (containerSizes.width / 2),
            y: -BBox.y - (BBox.height / 2) + curPan.y + (containerSizes.height / 2),
        };
        panZoom.pan(coordinates);
    }

    locate(entities: string[]) {
        const { diagram } = this.props;
        const { panZoom } = this.state;
        const diagramDOMNode: SVGSVGElement = ReactDOM.findDOMNode(diagram) as SVGSVGElement;

        // This may not be the best algorithm to do this. It will compute the BBox for every entity
        // TODO: Increase efficiency of this
        const BBoxes = entities
            .map(singleEntity => d3.select(diagramDOMNode).select("g#" + singleEntity)._groups[0][0])
            .filter(locatedEntity => !!locatedEntity)
            .map(locatedEntity => Object.assign({}, { BBox: locatedEntity.getBBox(), matrix: locatedEntity.getCTM() } ))
            .map(coords => {
                const relPoint = diagramDOMNode.createSVGPoint();
                relPoint.x = coords.BBox.x;
                relPoint.y = coords.BBox.y;
                const newRelPoint = relPoint.matrixTransform(coords.matrix);
                const realZoom = panZoom.getSizes().realZoom;
                return {
                    x: newRelPoint.x,
                    y: newRelPoint.y,
                    width: coords.BBox.width * realZoom,
                    height: coords.BBox.height * realZoom,
                }
            });

        if (BBoxes.length === 1) {
            return BBoxes[0]
        }

        const minX = minBy(BBoxes, BBox => BBox.x).x;
        const minY = minBy(BBoxes, BBox => BBox.y).y;
        const maxX = maxBy(BBoxes, BBox => BBox.x).x;
        const maxY = maxBy(BBoxes, BBox => BBox.y).y;
        return {
            x: minX,
            y: minY,
            height: maxY - minY,
            width: maxX - minX,
        }
    }

    render(){
        // Can put custom Kaavio controls here
        // TODO: Make custom Kaavio PanZoom controls
        return null;
    }
}