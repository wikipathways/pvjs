import d3 from 'd3';

/**
 * Return the node element reference by the node_id
 * @param node_id
 * @returns {SVGLocatable}
 */
export const findNode = (node_id, diagram) => {
    return d3.select(diagram).select("g#" + node_id)._groups[0][0];
};

/**
 * Return the parent viewport that all other elements are relative to
 * @returns {HTMLElement}
 */

export const getViewport = (diagram) => {
    return d3.select(diagram).select(".svg-pan-zoom_viewport")._groups[0][0]
};

/**
 * Get the bounding box of an entity.
 * @param node_id
 * @param diagram
 * @param realZoom
 * @returns {{x: any, y: any, height: number, width: number}}
 */
export const getNodeBBox = (node_id: string, diagram, realZoom) => {
    const node = findNode(node_id, diagram);
    const viewport = getViewport(diagram);
    const BBox = node.getBBox();
    const matrix = node.getCTM();
    let relPoint = diagram.createSVGPoint();
    relPoint.x = BBox.x;
    relPoint.y = BBox.y;
    relPoint = relPoint.matrixTransform(matrix);

    return {
        x: relPoint.x,
        y: relPoint.y,
        height: BBox.height * realZoom,
        width: BBox.width * realZoom
    }
};

/**
 * Get the bounding box for a group of entities.
 * Note: if there is a huge number of node_ids this might take a while...
 * @param node_ids
 * @param diagram
 * @param realZoom
 * @returns {{x: null, y: null, height: number, width: number}}
 */
export const getGroupBBox = (node_ids: string[], diagram, realZoom) => {
    const coordLimits = {
        highestX: null,
        lowestX: null,
        highestY: null,
        lowestY: null
    };

    node_ids.forEach(node_id => {
        const node = findNode(node_id, diagram);
        const clientRect = getNodeBBox(node_id, diagram, realZoom);

        const nodeHighestX = clientRect.x + clientRect.width;
        if (!coordLimits.highestX ||  nodeHighestX > coordLimits.highestX) coordLimits.highestX = nodeHighestX;
        if (!coordLimits.lowestX || clientRect.x < coordLimits.lowestX) coordLimits.lowestX = clientRect.x;

        const nodeHighestY = clientRect.y + clientRect.height;
        if (!coordLimits.highestY || nodeHighestY > coordLimits.highestY) coordLimits.highestY = nodeHighestY;
        if (!coordLimits.lowestY || clientRect.y < coordLimits.lowestY) coordLimits.lowestY = clientRect.y;
    });

    return {
        x: coordLimits.lowestX,
        y: coordLimits.lowestY,
        height: (coordLimits.highestY - coordLimits.lowestY),
        width: (coordLimits.highestX - coordLimits.lowestX)
    };
};
