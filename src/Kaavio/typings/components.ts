import {highlightedNode} from "./highlightedNode";
/**
 * Interfaces for all components' props.
 *
 * Anders: is this the best way to do this? For me, this really helps documentation.
 * I'm not sure about the parent Entity inheriting the props of it's children.
 *
 * TODO: the logic for icons and highlightedNodes is duplicated in Diagram and Group. Fix this.
 */

export interface EntityProps extends TextProps, NodeProps {
    kaavioType: string, // The type of Kaavio component the Entity is mapped to
    x: number,
    y: number,
    rotation: number,
    backgroundColor: string,
    isHighlighted: boolean,
    highlightedColor?: string,
    customClass?: string,
    highlightedNodes: highlightedNode[], // The entity needs this because Groups need it
    icons: any[], // Group needs this
    entityMap: any[], // Group needs this
    type: string[], // Anders: Why do we include this? It could be [shape, physicalComponent, Node, cellularComponent]
}

export interface TextProps {
    textContent: string,
    textAlign?: "left" | "center" | "right",
    height: number,
    width: number
}

export interface NodeProps {
    borderWidth: number,
    color: string, // Used for borders
    height: number,
    id: number,
    width: number
}