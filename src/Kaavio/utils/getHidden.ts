import * as _ from 'lodash';

export function getHidden(entity, hiddenEntities) {
    let result = false;

    // Only allow nodes and edges to be hidden
    if((entity.kaavioType != 'Node') && (entity.kaavioType != 'Edge')) return result;

    let matched: string = _.find(hiddenEntities, (value, index) => {
        return value == entity.id;
    }) as string;

    if (matched) {
        result = true;
    }

    return result;
}