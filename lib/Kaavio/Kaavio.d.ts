/// <reference types="react" />
import * as React from 'react';
import { Manipulator } from './manipulator';
export interface highlightedNode {
    node_id: string;
    color: string;
}
/**
 * Kaavio component.
 * This is the highest component in Kaavio. All states are handled here and passed down as props to other components.
 *
 * You may pass an onReady(kaavio) function to this. This will be called with the Kaavio reference when everything is
 * rendered. You can access the manipulation API via kaavio.manipulator
 */
export declare class Kaavio extends React.Component<any, any> {
    manipulator: Manipulator;
    constructor(props: any);
    private onPanZoomReady(panZoom);
    pushHighlighted: (highlighted: highlightedNode | highlightedNode[]) => void;
    popHighlighted: (node_id: string | string[]) => void;
    resetHighlighted: (exclude?: string[]) => void;
    isHighlighted: (node_id: string) => boolean;
    pushHidden: (entity_id: string | string[]) => void;
    popHidden: (entity_id: string | string[]) => void;
    resetHidden: (exclude?: string[]) => void;
    isHidden: (entity_id: string) => boolean;
    getEntities: () => any;
    render(): JSX.Element;
}
