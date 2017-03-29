/// <reference types="react" />
import * as React from 'react';
import { NodeProps } from "../typings";
/**
 * Node is a rectangle within a Kaavio diagram.
 * It can be mapped to other pathway elements. For example, in PVJS this is mapped to metabolites and proteins.
 */
export declare class Node extends React.Component<any, any> {
    containerRef: any;
    constructor(props: NodeProps);
    componentDidMount(): void;
    componentWilUpdate(): void;
    /**
     * Using the icon prop, get the required SVG and set the state.
     */
    getIcon(): void;
    render(): JSX.Element;
}
