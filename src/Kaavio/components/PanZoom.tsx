import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';
import { isEqual, minBy, maxBy } from 'lodash';
import * as d3 from 'd3';

export class PanZoom extends React.Component<any, any> {
    constructor(props){
        super(props);
        this.state = {
            ready: false,
            panZoom: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        const prevProps = this.props;
        if(isEqual(nextProps, prevProps)) return;
        if(! isEqual(nextProps.diagram, prevProps.diagram)) {
            const onInit = (panZoomInstance) => {
                this.setState({panZoom: panZoomInstance, ready: true});
            };
            this.init(nextProps.diagram, nextProps.showPanZoomControls, onInit);
        }

        if(! isEqual(nextProps.zoomedEntities, prevProps.zoomedEntities)) {
            this.zoomOnEntities();
        }
        if(! isEqual(nextProps.pannedEntities, prevProps.pannedEntities)) {
            this.panToEntities();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { ready } = this.state;

        if (! ready) return;
        this.panToEntities();
        this.zoomOnEntities();
    }

    destroy = () => {
        const { panZoom } = this.state;
        if(! panZoom) return;
        panZoom.destroy();
    };

    init = (diagram, showControls: boolean, onInit?) => {
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
                    if(! onInit ) return;
                    onInit(options.instance)
                },
                haltEventListeners: [],
                destroy: (_) => {
                }
            },
            beforeZoom: (oldZoom, newZoom) => {
                // Don't allow if not ready
                // const { ready } = this.state;
                // if (! ready) return false;
                //
                // this.setState({ready: false});
                return true;
            },
            beforePan: (oldPan, newPan) =>  {
                // Don't allow if not ready
                // const { ready } = this.state;
                // console.log(ready);
                // if (! ready) return false;
                //
                // this.setState({ready: false});
                return true;
            },
            // This event is fired after the transformation matrix is applied
            // See: https://github.com/ariutta/svg-pan-zoom/issues/121#issuecomment-252393381
            // So set isUpdating to false here
            // onUpdatedCTM: newCTM => this.setState({ready: true})
        } as SvgPanZoom.Options);
    };

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

    zoomOnEntities() {
        const { zoomedEntities } = this.props;
        const { panZoom } = this.state;
        if (! zoomedEntities) return;

        const BBox = this.locate(zoomedEntities);
        const containerBBox = panZoom.getSizes();
        const scalingFactor = 0.9;

        if (BBox.width >= BBox.height) {
            panZoom.zoom((containerBBox.width / BBox.width) * scalingFactor);
            return;
        }
        panZoom.zoom((containerBBox.height / BBox.height) * scalingFactor);
    }

    panToEntities() {
        const { pannedEntities } = this.props;
        const { panZoom } = this.state;
        if (! pannedEntities) return;

        const BBox = this.locate(pannedEntities);
        const curPan = panZoom.getPan();
        const containerSizes = panZoom.getSizes();

        const coordinates = {
            x: -BBox.x -  (BBox.width / 2) + curPan.x + (containerSizes.width / 2),
            y: -BBox.y - (BBox.height / 2) + curPan.x + (containerSizes.height / 2),
        };
        panZoom.pan(coordinates);
    }

    render(){
        // Can put custom Kaavio controls here
        // TODO: Make custom Kaavio PanZoom controls
        return null;
    }
}