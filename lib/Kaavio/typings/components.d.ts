import { highlightedNode } from "./highlightedNode";
/**
 * Interfaces for all components' props.
 *
 * Anders: is this the best way to do this? For me, this really helps documentation.
 * I'm not sure about the parent Entity inheriting the props of it's children.
 *
 * TODO: the logic for icons and highlightedNodes is duplicated in Diagram and Group. Fix this.
 */
export interface EntityProps extends TextProps, NodeProps {
    kaavioType: string;
    x: number;
    y: number;
    rotation: number;
    backgroundColor: string;
    isHighlighted: boolean;
    highlightedColor?: string;
    customClass?: string;
    highlightedNodes: highlightedNode[];
    icons: any[];
    entityMap: any[];
    type: string[];
}
export interface TextProps {
    textContent: string;
    textAlign?: string;
    className?: string;
    fontColor?: string;
    fontFamily?: string;
    fontSize?: string;
    fontStyle?: string;
    fontWeight?: string;
    x?: number;
    y?: number;
}
export interface NodeProps {
    borderWidth: number;
    color: string;
    height: number;
    id: number;
    width: number;
}
