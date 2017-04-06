import * as React from 'react';
import { Diagram } from './components/Diagram';
// TODO see whether there's anything I need in here. If not, delete.
//require('./kaavio.css');
import { PanZoom } from "./components/PanZoom";
import { Manipulator } from './manipulator';
// pullAllWith is missing from the lodash typings so just require for now
// See issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/13747
// TODO: Track the issue and go back to import * as _ from 'lodash'
const _ = require('lodash');
/**
 * Kaavio component.
 * This is the highest component in Kaavio. All states are handled here and passed down as props to other components.
 *
 * You may pass an onReady(kaavio) function to this. This will be called with the Kaavio reference when everything is
 * rendered. You can access the manipulation API via kaavio.manipulator
 */
export class Kaavio extends React.Component {
    constructor(props) {
        super(props);
        this.pushHighlighted = (highlighted) => {
            let toHighlight;
            if (highlighted.constructor !== Array) {
                toHighlight = [highlighted];
            }
            else {
                toHighlight = highlighted;
            }
            const { highlightedNodes } = this.state;
            // Remove any items from the current highlightedNodes array with the same node_id
            _.pullAllWith(highlightedNodes, toHighlight, (arrVal, othVal) => {
                return arrVal.node_id == othVal.node_id;
            });
            this.setState({
                highlightedNodes: highlightedNodes.concat(toHighlight)
            });
        };
        this.popHighlighted = (node_id) => {
            let toRemove;
            if (typeof node_id === 'string') {
                toRemove = [node_id];
            }
            else {
                toRemove = node_id;
            }
            const { highlightedNodes } = this.state;
            // Remove any items from the current highlightedNodes array with the same node_id
            _.pullAllWith(highlightedNodes, toRemove, (arrVal, othVal) => {
                return arrVal.node_id == othVal;
            });
            this.setState({ highlightedNodes: highlightedNodes });
        };
        this.resetHighlighted = (exclude) => {
            const { highlightedNodes } = this.state;
            let toReset = highlightedNodes.map(highlightedNode => {
                return highlightedNode.node_id;
            });
            if (exclude) {
                toReset = _.pullAll(toReset, exclude);
            }
            this.popHighlighted(toReset);
        };
        this.isHighlighted = (node_id) => {
            const { highlightedNodes } = this.state;
            return !!highlightedNodes.find(elem => {
                return elem.node_id === node_id;
            });
        };
        this.pushHidden = (entity_id) => {
            let toHide;
            if (entity_id.constructor !== Array) {
                toHide = [entity_id];
            }
            else {
                toHide = entity_id;
            }
            const { hiddenEntities } = this.state;
            // Remove any items from the current highlightedNodes array with the same node_id
            _.pullAllWith(hiddenEntities, toHide, (arrVal, othVal) => {
                return arrVal == othVal;
            });
            this.setState({
                hiddenEntities: hiddenEntities.concat(toHide)
            });
        };
        this.popHidden = (entity_id) => {
            let toRemove;
            if (typeof entity_id === 'string') {
                toRemove = [entity_id];
            }
            else {
                toRemove = entity_id;
            }
            const { hiddenEntities } = this.state;
            // Remove any items from the current highlightedNodes array with the same node_id
            _.pullAllWith(hiddenEntities, toRemove, (arrVal, othVal) => {
                return arrVal == othVal;
            });
            this.setState({ hiddenEntities: hiddenEntities });
        };
        this.resetHidden = (exclude) => {
            const { hiddenEntities } = this.state;
            let toReset = hiddenEntities;
            if (exclude) {
                toReset = _.pullAll(toReset, exclude);
            }
            this.popHidden(toReset);
        };
        this.isHidden = (entity_id) => {
            const { hiddenEntities } = this.state;
            return hiddenEntities.indexOf(entity_id) > -1;
        };
        this.getEntities = () => {
            return this.props.entities;
        };
        this.state = {
            diagramRef: null,
            highlightedNodes: [],
            hiddenEntities: [],
        };
    }
    onPanZoomReady(panZoom) {
        const { diagramRef } = this.state;
        if (!diagramRef)
            return;
        this.manipulator = new Manipulator(this, panZoom, diagramRef);
        // Fire the onReady function with a reference to Kaavio
        const { onReady } = this.props;
        onReady(this);
    }
    render() {
        const { customStyle, filters, handleClick, entities, name, width, height, edgeDrawers, icons, markerDrawers, showPanZoomControls = true } = this.props;
        const { highlightedNodes, hiddenEntities } = this.state;
        const backgroundColor = customStyle.backgroundColor || 'white';
        let { about } = this.props;
        about = about || ('kaavio-container-' + new Date().toISOString()).replace(/\W/g, '');
        const entityMap = entities.reduce(function (acc, entity) {
            acc[entity.id] = entity;
            return acc;
        }, {});
        const zIndices = entities
            .sort(function (a, b) {
            if (a.zIndex > b.zIndex) {
                return 1;
            }
            else if (a.zIndex < b.zIndex) {
                return -1;
            }
            else {
                return 0;
            }
        })
            .map((entity) => entity.id);
        // TODO: Don't use refs!
        // Accessing the diagram ref from the state is a little bit of a hack to get panZoom working.
        // Consider refactoring the panZoom to be truly Reactive and not use refs
        return (React.createElement("div", { id: about, className: `kaavio-container ${customStyle.containerClass}` },
            React.createElement(Diagram, { ref: diagram => !this.state.diagramRef && this.setState({ diagramRef: diagram }), about: `kaavio-diagram-for-${about}`, name: name, width: width, height: height, backgroundColor: backgroundColor, edgeDrawers: edgeDrawers, entityMap: entityMap, filters: filters, handleClick: handleClick, icons: icons, markerDrawers: markerDrawers, zIndices: zIndices, customStyle: customStyle, highlightedNodes: highlightedNodes, hiddenEntities: hiddenEntities }),
            React.createElement(PanZoom, { diagram: this.state.diagramRef, onReady: panZoom => this.onPanZoomReady(panZoom), showPanZoomControls: showPanZoomControls })));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2FhdmlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0thYXZpby9LYWF2aW8udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRS9CLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM3QyxvRUFBb0U7QUFDcEUsMEJBQTBCO0FBQzFCLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTFDLHlFQUF5RTtBQUN6RSw2RUFBNkU7QUFDN0UsbUVBQW1FO0FBQ25FLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQU81Qjs7Ozs7O0dBTUc7QUFDSCxNQUFNLGFBQWMsU0FBUSxLQUFLLENBQUMsU0FBbUI7SUFHcEQsWUFBWSxLQUFLO1FBQ2hCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQWtCZCxvQkFBZSxHQUFHLENBQUMsV0FBZ0Q7WUFDbEUsSUFBSSxXQUFXLENBQUM7WUFDaEIsRUFBRSxDQUFBLENBQUMsV0FBVyxDQUFDLFdBQVcsS0FBSyxLQUFLLENBQUMsQ0FBQSxDQUFDO2dCQUNyQyxXQUFXLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0wsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMzQixDQUFDO1lBRUQsTUFBTSxFQUFDLGdCQUFnQixFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV0QyxpRkFBaUY7WUFDakYsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTTtnQkFDM0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQztZQUN6QyxDQUFD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