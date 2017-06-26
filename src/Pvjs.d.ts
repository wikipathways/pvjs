/// <reference types="react" />
import * as React from 'react';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/map';
import 'whatwg-fetch';
export declare class Pvjs extends React.Component<any, any> {
    kaavioRef: any;
    constructor(props: any);
    handleError(error: {
        message: string;
        friendlyMessage?: string;
        status?: string;
    }): void;
    getPathway(): any;
    closeActive(): void;
    handleEntityClick: (entity: any) => void;
    componentWillMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    onKaavioReady(): void;
    handleCloseDetailsPanel(): void;
    renderDetailsPanel(): JSX.Element;
    renderLoadingIndicator(): JSX.Element;
    renderError(): JSX.Element;
    renderKaavio(): JSX.Element;
    render(): JSX.Element;
}
