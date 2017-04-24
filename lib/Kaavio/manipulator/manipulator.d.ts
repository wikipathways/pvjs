import { Observable } from "rxjs";
/**
 * Class for "The Manipulation API".
 * Really, this is just a wrapper around public functions within Kaavio components with a few extras.
 * Implements highlighting and zooming/panning to nodes or groups of nodes.
 */
export declare class Manipulator {
    private diagram;
    private panZoom;
    private kaavio;
    private relPoint;
    constructor(kaavioRef: any, panZoomRef: any, diagramRef: any);
    /**
     * Return a list of the entities in the diagram.
     * Only return the useful properties though.
     */
    getEntities(): any;
    /**
     * Toggle the highlighting of one or multiple entities.
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resets - Object containg which resets should be carried out
     */
    toggleHighlight(entity_id: any, color: string, resets?: {
        others: boolean;
        panZoom: boolean;
        hidden: boolean;
    }): void;
    /**
     * Turn on the highlighting of one entity.
     * Behaviour is to only change the highlighted entities if the entity_id or color changes.
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resets - Object containing which resets should be carried out
     */
    highlightOn(entity_id: any, color: string, resets?: {
        others: boolean;
        panZoom: boolean;
        hidden: boolean;
    }): void;
    /**
     * Turn off the highlighting of one or multiple entities.
     * @param entity_id - one identifier or a string of identifiers
     * @param resets - Object containing which resets should be carried out
     */
    highlightOff(entity_id: any, resets?: {
        others: boolean;
        panZoom: boolean;
        hidden: boolean;
    }): void;
    /**
     * Un-highlight all highlighted entities except those in the exclude array.
     * @param exclude
     */
    resetHighlighted(exclude?: string[]): void;
    /**
     * Toggle the displaying of one or multiple entities.
     * @param entity_id - one identifier or a string of identifiers
     * @param resets - Object containing which resets should be carried out
     */
    toggleHidden(entity_id: any, resets?: {
        others: boolean;
        panZoom: boolean;
        highlighted: boolean;
    }): void;
    /**
     * Hide one or multiple entities.
     * @param entity_id - one identifier or a string of identifiers
     * @param resets - Object containing which resets should be carried out
     */
    hide(entity_id: string | string[], resets?: {
        others: boolean;
        panZoom: boolean;
        highlighted: boolean;
    }): void;
    /**
     * Show one or multiple entities.
     * @param entity_id - one identifier or a string of identifiers
     * @param resets - Object containing which resets should be carried out
     */
    show(entity_id: string | string[], resets?: {
        others: boolean;
        panZoom: boolean;
        highlighted: boolean;
    }): void;
    /**
     * Un-highlight all highlighted nodes except those in the exclude array.
     * @param exclude
     */
    resetHidden(exclude?: string[]): void;
    /**
     * Return the node element reference by the node_id
     * @param node_id
     * @returns {SVGLocatable}
     */
    private findNode(node_id);
    /**
     * Return the parent viewport that all other elements are relative to
     * @returns {HTMLElement}
     */
    private getViewport();
    /**
     * Get the bounding box of an entity.
     * @param node_id
     * @returns {{x: any, y: any, height: number, width: number}}
     */
    private getNodeBBox(node_id);
    /**
     * Get the bounding box for a group of entities.
     * Note: if there is a huge number of node_ids this might take a while...
     * @param node_ids
     * @returns {{x: null, y: null, height: number, width: number}}
     */
    private getGroupBBox(node_ids);
    /**
     * Compute the amount that the node should be zoomed in by
     * @param node_id
     * @returns {number}
     */
    private computeZoom(node_id);
    /**
     * Zoom in.
     * @param zoom_perc
     */
    zoom(zoom_perc: number): void;
    /**
     * Zoom onto a specific node
     * @param node_id
     * @param resets - the resets that should be carried out.
     */
    zoomOn(node_id: string | string[], resets?: {
        highlighted: boolean;
        hidden: boolean;
    }): void;
    /**
     * Zoom the diagram in.
     * Just a wrapper to access the method in the panZoom component
     */
    zoomIn(): void;
    /**
     * Zoom the diagram out
     * Just a wrapper to access the method in the panZoom component
     */
    zoomOut(): void;
    /**
     * Pan to a specific set of coordinates.
     * @param coordinates
     */
    pan(coordinates: {
        x: number;
        y: number;
    }): void;
    /**
     * Pan to a specific node.
     * @param node_id
     * @param resets - the resets to be carried out.
     */
    panTo(node_id: string | string[], resets?: {
        panZoom: boolean;
        highlighted: boolean;
        hidden: boolean;
    }): void;
    resetPan(): Observable<{
        x: number;
        y: number;
    }>;
    resetZoom(): Observable<number>;
    resetPanZoom(): Observable<number | {
        x: number;
        y: number;
    }>;
    /**
     * Reset everything! Resets pan, zoom, hidden, and highlighted
     */
    reset(): void;
}
