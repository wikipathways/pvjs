import {BioPathway} from '../bio-pathway/bio-pathway.component';
import * as React from 'react';
import * as $ from 'jquery';
import * as ReactDOM from 'react-dom';

/**
 * Simply a wrapper around the BioPathway class.
 * This is done to keep component names descriptive.
 */
export class Pvjs extends React.Component<any, any> {
    constructor(props){
        super(props);
    }

    render(){
        return <BioPathway id={this.props.id} customStyle={this.props.customStyle}/>;

    }
}

export function pvjs(selector, WPId, customStyle){
    let container = $(selector).get(0);
    ReactDOM.render(
        <Pvjs id={WPId} customStyle={customStyle}/>,
        container
    )
}