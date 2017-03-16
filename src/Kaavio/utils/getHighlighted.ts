import * as _ from 'lodash';
import {highlightedNode} from "../typings";

export function getHighlighted(entity, highlightedNodes) {
    let result = {
        highlighted: false,
        color: null
    };

    // Only allow nodes and edges to be highlighted
    if((entity.kaavioType != 'Node') && (entity.kaavioType != 'Edge')) return result;

    let matched: highlightedNode = _.find(highlightedNodes, (value, index) => {
        return value['node_id'] == entity.id;
    }) as highlightedNode;

    if (matched) {
        result.highlighted = true;
        result.color = matched.color;
    }

    return result;
}