/// <reference types="react" />
import * as React from 'react';
import { EntityProps } from "../typings";
/**
 * Parent Entity component.
 * Most components share many properties so we "lift state up" to the parent.
 */
export declare class Entity extends React.Component<any, any> {
    constructor(props: EntityProps);
    renderText(): JSX.Element;
    renderBurrs(): any;
    render(): JSX.Element;
}
