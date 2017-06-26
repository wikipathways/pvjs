/// <reference types="react" />
import * as React from 'react';
/**
 * Kaavio component.
 * This is the highest component in Kaavio. All states are handled here and passed down as props to other components.
 *
 * You may pass an onReady(kaavio) function to this. This will be called with the Kaavio reference when everything is
 * rendered. You can access the manipulation API via kaavio.manipulator
 */
export declare class Kaavio extends React.Component<any, any> {
    constructor(props: any);
    onPanZoomReady: (panZoom: any) => void;
    handleClick: (e: any) => void;
    render(): JSX.Element;
}
