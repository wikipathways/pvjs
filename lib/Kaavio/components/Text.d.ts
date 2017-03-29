/// <reference types="react" />
import * as React from 'react';
import { TextProps } from "../typings";
export declare class Text extends React.Component<any, any> {
    svgRef: any;
    constructor(props: TextProps);
    componentDidMount(): void;
    render(): JSX.Element;
}
