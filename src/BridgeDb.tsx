import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BridgeDb from 'bridgedb/src/main';
import { XrefsAnnotationPanel } from '../../bridgedbjs/src/ui/XrefsAnnotationPanel';
//import { XrefsAnnotationPanel } from 'bridgedb/src/ui/XrefsAnnotationPanel';

export class BridgeDbRenderer extends React.Component<any, any> {
    constructor(props){
        super(props);
        this.state ={
            open: false,
            organism: null,
            entityType: null,
            displayName: null,
            dataSource: null,
            identifier: null
        };
        window.addEventListener('kaavioNodeClicked', this.openPanel)
    }

    openPanel = (e) => {
        // Grab the meta attributes from the event
        let meta = e.detail.meta;

        // Check that all the properties are there. Avoids sending a request to bridgeDb if something went wrong in Kaavio
        if (!(meta.organism && meta.entityType && meta.displayName && meta.dataSource && meta.identifier)) return;

        this.setState({
            open: true,
            organism: meta.organism,
            entityType: meta.entityType,
            displayName: meta.displayName,
            dataSource: meta.dataSource,
            identifier: meta.identifier
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    render() {
        return (
            <div>
                {
                    this.state.open ?
                        <XrefsAnnotationPanel
                            organism={this.state.organism}
                            entityType={this.state.entityType}
                            displayName={this.state.displayName}
                            dataSource={this.state.dataSource}
                            identifier={this.state.identifier}
                            handleClose={this.handleClose}
                        />: null
                }
            </div>
        )
    }
}
