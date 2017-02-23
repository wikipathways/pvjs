import {BioPathway} from '../bio-pathway/bio-pathway.component';
import * as React from 'react';

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