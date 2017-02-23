import {BioPathway} from './bio-pathway/bio-pathway.component';
import * as React from 'react';

export class Pvjs extends React.Component<any, any> {
    constructor(props){
        super(props);
    }

    render(){
        return <BioPathway id={this.props.id} customStyle={this.props.customStyle}/>;

    }
}
