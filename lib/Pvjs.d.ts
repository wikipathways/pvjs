/// <reference types="react" />
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import { Manipulator } from "./Kaavio/manipulator/manipulator";
export declare class Pvjs extends React.Component<any, any> {
    pathwayRequest: Observable<any>;
    kaavioRef: any;
    manipulator: Manipulator;
    constructor(props: any);
    getPathway(): any;
    closeActive(): void;
    handleClick(e: any): void;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    onKaavioReady(kaavio: any): void;
    handleCloseDetailsPanel(): void;
    renderDetailsPanel(): JSX.Element;
    render(): JSX.Element;
}
