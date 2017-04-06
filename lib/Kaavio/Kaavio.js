import * as React from 'react';
import { Diagram } from './components/Diagram';
// TODO see whether there's anything I need in here. If not, delete.
//require('./kaavio.css');
import { normalize } from 'csstips';
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
        this.state = {
            diagramRef: null,
            highlightedNodes: [],
            hiddenEntities: [],
        };
        normalize();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2FhdmlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0thYXZpby9LYWF2aW8udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBRS9CLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUM3QyxvRUFBb0U7QUFDcEUsMEJBQTBCO0FBQzFCLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFMUMseUVBQXlFO0FBQ3pFLDZFQUE2RTtBQUM3RSxtRUFBbUU7QUFDbkUsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBTzVCOzs7Ozs7R0FNRztBQUNILE1BQU0sYUFBYyxTQUFRLEtBQUssQ0FBQyxTQUFtQjtJQUdwRCxZQUFZLEtBQUs7UUFDaEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBb0JkLG9CQUFlLEdBQUcsQ0FBQyxXQUFnRDtZQUNsRSxJQUFJLFdBQVcsQ0FBQztZQUNoQixFQUFFLENBQUEsQ0FBQyxXQUFXLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQyxDQUFBLENBQUM7Z0JBQ3JDLFdBQVcsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdCLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDTCxXQUFXLEdBQUcsV0FBVyxDQUFDO1lBQzNCLENBQUM7WUFFRCxNQUFNLEVBQUMsZ0JBQWdCLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXRDLGlGQUFpRjtZQUNqRixDQUFDLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNO2dCQUMzRCxNQUFNLENBQUMsTUFBTSxDQUFD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