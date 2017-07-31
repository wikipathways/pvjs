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
            shouldZoom: props.zoomLevel || props.zoomedEntities,
            shouldPan: props.panCoordinates || props.pannedEntities,
            // Since users can manually drag the diagram, props are only initial, state provides actual pan/zoom state
            zoomedEntities: props.zoomedEntities || [],
            pannedEntities: props.pannedEntities || [],
            // Takes precedence over panned/zoomed entities
            panCoordinates: props.panCoordinates,
            zoomLevel: props.zoomLevel,
        };

        window.addEventListener('resize', this.onResize)
    }

    onResize = () => {
        const { panZoom } = this.state;
        if (! panZoom ) return;
        const {pannedEntities = [], zoomedEntities = [], diagram, panCoordinates, zoomLevel} = this.props;
        // Respond to changes in window size
        panZoom.resize();
        panZoom.fit();
        panZoom.center();

        // Wait for the diagram to resize and center
        // This is not the best way but it the simplest
        // Relatively high timeout just in case resizing takes a while
        setTimeout(() => {
            this.setState({
                shouldPan: true,
                shouldZoom: true,
                ready: true,
                panCoordinates,
                zoomLevel,
                pannedEntities,
                zoomedEntities,
            })
        }, 500)
    }

    onInit(panZoomInstance) {
        const {pannedEntities = [], zoomedEntities = [], diagram, panCoordinates, zoomLevel} = this.props;
        this.setState({
            panZoom: panZoomInstance,
            ready: true,
            shouldZoom: zoomedEntities || zoomLevel,
            shouldPan: pannedEntities || panCoordinates,
            panCoordinates,
            zoomLevel,
            pannedEntities,
            zoomedEntities,
        });
    }

    componentWillReceiveProps(nextProps) {
        // Because of ref behaviour, this is called without changing props manually
        const prevProps = this.props;
        const {pannedEntities = [], zoomedEntities = [], diagram, panCoordinates, zoomLevel} = nextProps;
        if(! isEqual(diagram, prevProps.diagram)) {
            this.init(diagram);
        }
        else {
            this.setState({
                shouldZoom: zoomedEntities || zoomLevel,
                shouldPan: pannedEntities || panCoordinates,
                panCoordinates,
                zoomLevel,
                pannedEntities,
                zoomedEntities,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Whenever the state or props change, we check if the component should pan or zoom
        // If ONE of them is needed, it is performed
        // By calling setState in the then callback, this will be called again
        // So if both of them are needed, they are performed one after the other
        const { shouldPan, shouldZoom, ready, panCoordinates, zoomLevel, pannedEntities = [], zoomedEntities = [] } = this.state;
        if(shouldPan && ready) {
            let promise;
            if(panCoordinates)
                promise = this.panToCoordinates(panCoordinates);
            else
                promise = this.panToEntities(pannedEntities);

            promise.then(() => this.setState({shouldPan: false}));
        }
        else if(shouldZoom && ready) {
            let promise;
            if(zoomLevel)
                promise = this.zoomToLevel(zoomLevel);
            else
                promise = this.zoomOnEntities(zoomedEntities);

            promise.then(() => this.setState({shouldZoom: false}));
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

    init = (diagram) => {
        const { showPanZoomControls } = this.props;
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
                    this.onInit(options.instance);
                    const { onReady } = this.props;
                    onReady();
                },
                haltEventListeners: [],
                destroy: () => {}
            },
            beforeZoom: () => {
                const { locked } = this.props;
                const { ready, shouldZoom } = this.state;
                // Don't allow if not ready or locked
                // shouldZoom is only true if a programmatic zoom is set in props, still allow this
                if (! ready || (locked && !shouldZoom)) return false;
                // Don't allow any more zooming until done
                // Reset the zoomedEntities since the diagram has moved and we can't be sure they are still zoomed on
                this.setState({ready: false, zoomedEntities: []});
                return true;
            },
            onZoom: this.handleChange,
            beforePan: () =>  {
                const { locked } = this.props;
                const { ready, shouldPan } = this.state;
                // Don't allow if not ready or locked
                // shouldPan is only true if a programmatic pan is set in props, still allow this
                if (! ready || (locked && !shouldPan)) return false;
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
        const { onChange } = this.props;
        const pan = panZoom.getPan();
        const sizes = panZoom.getSizes();
        const relX = pan.x / sizes.width;
        const relY = pan.y / sizes.height;
        const zoomLevel = panZoom.getZoom();
        if(onChange)
            onChange({x: relX, y: relY, zoomLevel})
    };

    panToCoordinates(coordinates: {x: number, y: number}): Promise<{}> {
        const { panZoom } = this.state;
        const sizes = panZoom.getSizes();
        const absCoordinates = {
            x: coordinates.x * sizes.width,
            y: coordinates.y * sizes.height,
        };

        return new Promise(resolve => {
            panZoom.setOnPan(() => {
                this.handleChange();
                panZoom.setOnPan(this.handleChange);
                resolve();
            });
            panZoom.pan(absCoordinates);
        });
    }

    zoomToLevel(level: number): Promise<{}> {
        const { panZoom } = this.state;
        return new Promise(resolve => {
            panZoom.setOnZoom(() => {
                this.handleChange();
                panZoom.setOnZoom(this.handleChange);
                resolve();
            });
            // Use zoomAtPoint since the coordinates change with level
            panZoom.zoomAtPoint(level, panZoom.getPan())
        });
    }

    zoomOnEntities(zoomedEntities): Promise<{}> {
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

    panToEntities(pannedEntities): Promise<{}> {
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