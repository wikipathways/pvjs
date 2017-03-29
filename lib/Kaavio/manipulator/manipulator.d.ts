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
     * Toggle the highlighting of one or multiple entities
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resetOthers - Reset all other highlighted entities before highlighting. Default = true
     * @param resetHidden - Reset the hidden entities before highlighting. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    toggleHighlight(entity_id: any, color: string, resetOthers?: boolean, resetHidden?: boolean, resetPanZoom?: boolean): void;
    /**
     * Turn on the highlighting of one entity.
     * Behaviour is to only change the highlighted entities if the entity_id or color changes.
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resetOthers - Reset all other highlighted entities before highlighting. Default = true
     * @param resetHidden - Reset the hidden entities before highlighting. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    highlightOn(entity_id: any, color: string, resetOthers?: boolean, resetHidden?: boolean, resetPanZoom?: boolean): void;
    /**
     * Turn off the highlighting of one or multiple entities.
     * @param entity_id - one identifier or a string of identifiers
     * @param resetOthers - Reset all other highlighted entities before highlighting. Default = true
     * @param resetHidden - Reset the hidden entities before highlighting. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    highlightOff(entity_id: any, resetOthers?: boolean, resetHidden?: boolean, resetPanZoom?: boolean): void;
    /**
     * Un-highlight all highlighted entities except those in the exclude array
     * @param exclude
     */
    resetHighlighted(exclude?: string[]): void;
    /**
     * Toggle the displaying of one or multiple entities
     * @param entity_id - one identifier or a string of identifiers
     * @param color - can be any css colour
     * @param resetOthers - Reset all other hidden nodes before hiding. Default = true
     * @param resetHighlighted - Reset the highlighted entities before toggling. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    toggleHidden(entity_id: any, color: string, resetOthers?: boolean, resetHighlighted?: boolean, resetPanZoom?: boolean): void;
    /**
     * Hide one or multiple entities
     * @param entity_id - one identifier or a string of identifiers
     * @param resetOthers - Reset all other hidden entities first. Default = true
     * @param resetHighlighted - Reset the highlighted entities before hiding. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    hide(entity_id: string | string[], resetOthers?: boolean, resetHighlighted?: boolean, resetPanZoom?: boolean): void;
    /**
     * Show one or multiple entities
     * @param entity_id - one identifier or a string of identifiers
     * @param resetOthers - Reset all other hidden entities first. Default = true
     * @param resetHighlighted - Reset the highlighted entities before showing. Default = true
     * @param resetPanZoom - reset the pan & zoom before highlighting. Default = true
     */
    show(entity_id: string | string[], resetOthers?: boolean, resetHighlighted?: boolean, resetPanZoom?: boolean): void;
    /**
     * Un-highlight all highlighted nodes except those in the exclude array
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
     * Zoom in
     * @param zoom_perc
     */
    zoom(zoom_perc: number): void;
    /**
     * Zoom onto a specific node
     * @param node_id
     * @param resetHighlight - reset the highlight before zooming. Default = true
     * @param resetHidden - reset the hidden entities before zooming. Default = true
     */
    zoomOn(node_id: string | string[], resetHighlight?: boolean, resetHidden?: boolean): void;
    /**
     * Pan to a specific set of coordinates
     * @param coordinates
     */
    pan(coordinates: {
        x: number;
        y: number;
    }): void;
    /**
     * Pan to a specific node
     * @param node_id
     * @param resetPanZoom - reset the zoom before panning. Default = true
     * @param resetHighlight - reset the highlight before panning. Default = true
     * @param resetHidden - reset the hidden entities before panning. Default = true
     */
    panTo(node_id: string | string[], resetPanZoom?: boolean, resetHighlight?: boolean, resetHidden?: boolean): void;
    /**
     * Reset the pan, zoom and center
     */
    resetPanZoom(): void;
}
