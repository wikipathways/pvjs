import * as React from 'react';
import * as SVGPanZoom from 'svg-pan-zoom';
import * as ReactDOM from 'react-dom';
import { isEqual, minBy, maxBy } from 'lodash';

export class PanZoom extends React.Component<any, any> {
    constructor(props){
        super(props);
        this.state = {
            ready: false, // Is the diagram ready to pan or zoom?
            panZoom: null,
            shouldZoom: false,
            shouldPan: false,
            // Since users can manually drag the diagram, props are only initial, state provides actual pan/zoom state
            zoomedEntities: props.zoomedEntities,
            pannedEntities: props.pannedEntities,
            // Takes precedence over panned/zoomed entities
            panCoordinates: props.panCoordinates,
            zoomLevel: props.zoomLevel,
        };
    }

    componentWillReceiveProps(nextProps) {
        const prevProps = this.props;
        const {pannedEntities = [], zoomedEntities = [], diagram, panCoordinates, zoomLevel} = nextProps;
        if(! isEqual(diagram, prevProps.diagram)) {
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

        if(panCoordinates) {
            this.setState({ shouldPan: true, panCoordinates });
        }

        if (zoomLevel) {
            this.setState({ shouldZoom: true, zoomLevel })
        }

        if(!panCoordinates && (! isEqual(this.state.pannedEntities, pannedEntities) || pannedEntities.length < 1)) {
            this.setState({ shouldPan: true, pannedEntities });
        }
        if (!zoomLevel && (! isEqual(this.state.zoomedEntities, zoomedEntities) || zoomedEntities.length < 1)) {
            this.setState({ shouldZoom: true, zoomedEntities });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Whenever the state or props change, we check if the component should pan or zoom
        // If ONE of them is needed, it is performed
        // By calling setState in the then callback, this will be called again
        // So if both of them are needed, they are performed one after the other
        const { shouldPan, shouldZoom, ready } = this.state;
        if(shouldPan && ready) {
            this.panToEntities().then(() => {
                this.setState({shouldPan: false})
            });
        }
        else if(shouldZoom && ready) {
            this.zoomOnEntities().then(() => {
                this.setState({shouldZoom: false})
            });
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
        const { showPanZoomControls, onPanZoomChange } = this.props;
        this.destroy(); // Destroy the diagram first in case there is one
        let node: SVGElement = ReactDOM.findDOMNode(diagram) as SVGElement;
        const pan = SVGPanZoom(node, {
            viewportSelector: '.svg-pan-zoom_viewport',
            controlIconsEnabled: showPanZoomControls,
            fit: true,
            center: true,
            minZoom: 0.1,
            maxZoom: 20.0,
            zoomEnabled: false,
            customEventsHandler: {
                init: (options) => {
                    if(! onInit ) return;
                    onInit(options.instance);
                    const { onReady } = this.props;
                    onReady();
                },
                haltEventListeners: [],
                destroy: () => {}
            },
            beforeZoom: () => {
                // Don't allow if not ready
                const { ready } = this.state;
                if (! ready) return false;
                // Don't allow any more zooming until done
                // Reset the zoomedEntities since the diagram has moved and we can't be sure they are still zoomed on
                this.setState({ready: false, zoomedEntities: []});
                return true;
            },
            onZoom: this.handleChange,
            beforePan: () =>  {
                // Don't allow if not ready
                const { ready } = this.state;
                if (! ready) return false;
                // Don't allow any more panning until done
                // Reset pannedEntities since the diagram has moved and we can't be sure they are still panned on
                this.setState({ready: false, pannedEntities: []});
                return true;
            },
            onPan: this.handleChange,
            onUpdatedCTM: () => this.setState({ready: true})
        } as SvgPanZoom.Options);
    };

    handleChange = () => {
        const { panZoom } = this.state;
        const pan = panZoom.getPan();
        const sizes = panZoom.getSizes();
        const relX = pan.x / sizes.width;
        const relY = pan.y / sizes.height;
        console.log(relX, relY)
    };

    // panToCoordinates(coordinates: {x: number, y: number}): Promise<{}> {
    //
    // }
    //
    // zoomToLevel(level: number): Promise<{}> {
    //
    // }

    zoomOnEntities(): Promise<{}> {
        const { zoomedEntities = [] } = this.props;
        const { panZoom } = this.state;

        return new Promise(resolve => {
            if (! zoomedEntities || zoomedEntities.length < 1){
                panZoom.resetZoom();
                resolve();
                return;
            }

            panZoom.setOnZoom(() => {
                this.handleChange();
                panZoom.setOnZoom(this.handleChange);
                resolve();
            });

            const BBox = this.locate(zoomedEntities);
            const containerBBox = panZoom.getSizes();
            const scalingFactor = 0.8;

            if (BBox.width >= BBox.height) {
                panZoom.zoom((containerBBox.width / BBox.width) * scalingFactor * containerBBox.realZoom);
                return;
            }
            panZoom.zoom((containerBBox.height / BBox.height) * scalingFactor * containerBBox.realZoom);
        });
    }

    panToEntities(): Promise<{}> {
        const { pannedEntities = [] } = this.props;
        const { panZoom } = this.state;

        return new Promise(resolve => {
            if (! pannedEntities || pannedEntities.length < 1) {
                panZoom.center();
                resolve();
                return;
            }
            panZoom.setOnPan(() => {
                this.handleChange();
                panZoom.setOnPan(this.handleChange);
                resolve();
            });

            const BBox = this.locate(pannedEntities);
            const curPan = panZoom.getPan();
            const containerSizes = panZoom.getSizes();

            const coordinates = {
                x: -BBox.x -  (BBox.width / 2) + curPan.x + (containerSizes.width / 2),
                y: -BBox.y - (BBox.height / 2) + curPan.y + (containerSizes.height / 2),
            };
            panZoom.pan(coordinates);
        });
    }

    locate(entities: string[]) {
        const { diagram } = this.props;
        const { panZoom } = this.state;
        const diagramDOMNode: SVGSVGElement = ReactDOM.findDOMNode(diagram) as SVGSVGElement;

        // This may not be the best algorithm to do this. It will compute the BBox for every entity
        // TODO: Increase efficiency of this
        const BBoxes = entities
            .map(singleEntity => diagramDOMNode.querySelector(`g#${singleEntity}`) as SVGSVGElement)
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