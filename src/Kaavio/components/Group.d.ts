/// <reference types="react" />
import * as React from 'react';
export declare class nodeWithGroup extends React.Component<any, any> {
    constructor(wrappedNode: any);
    render(): JSX.Element;
}
/**
 * Higher order Group component.
 * Much of the implementation of a Group is the same as the Node, since a group is a node but with children...
 * See: https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.z5a94mm1b
 *
 * @returns {Group}
 */
export declare const Group: (wrappedNode: any) => nodeWithGroup;
