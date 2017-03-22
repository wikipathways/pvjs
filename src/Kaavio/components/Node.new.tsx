import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Observable, AjaxRequest, Subject} from "rxjs";
import * as _ from 'lodash';
import * as validDataUrl from 'valid-data-url';
import {Base64} from 'js-base64';
import {NodeProps} from "../typings";

/**
 * Node is a rectangle within a Kaavio diagram.
 * It can be mapped to other pathway elements. For example, in PVJS this is mapped to metabolites and proteins.
 */
export class Node extends React.Component<any, any> {
    containerRef: any;

    constructor(props: NodeProps) {
        super(props);
        this.state = {
            loadedIcon: null,
            iconSuffix: new Date().toISOString().replace(/\W/g, '')
        }
    }

    componentDidMount() {
        this.getIcon();
    }

    componentWilUpdate() {
        this.getIcon();
    }

    /**
     * Using the icon prop, get the required SVG and set the state.
     */
    getIcon() {
        // Anders: The node now only receives one icon and is responsible for retrieving the data from it's url.
        // This makes sense here but do other components need to do this? In which case this should be in Entity
        // Could you also check the ajax request? Not sure if it's correct
        const icon: any = this.props.icon;

        if(validDataUrl(icon.url)) {
            const parts = icon.url.match(validDataUrl.regex);
            let mediaType = parts[1]? parts[1].toLowerCase(): null;
            let charset = parts[2]? parts[2].split('=')[1].toLowerCase: null;
            const isBase64 = !!parts[3];
            let data = parts[4]? parts[4]: null;
            const svgString = !isBase64 ? decodeURIComponent(data) : Base64.decode(data);
            this.setState({
                loadedIcon: {
                    id: icon.id,
                    svgString: svgString
                }
            });
        }
        else {
            const ajaxRequest: AjaxRequest = {
                url: icon.url,
                method: 'GET',
                responseType: 'text',
                timeout: 1 * 1000, // ms
                crossDomain: true,
            };
            Observable.ajax(ajaxRequest)
                .subscribe(
                    ajaxResponse => {
                        const svgString = ajaxResponse.xhr.response;
                        this.setState({
                            loadedIcon: {
                                id: icon.id,
                                svgString: svgString
                            }
                        });
                    },
                    err => {
                        err.message = err.message || '';
                        err.message += ` Error getting icon from "${icon.url}". Is source website down?`;
                        console.error(err);
                    }
                )
        }
    }

    render(){
        const { borderWidth, color, filter, height, id, width, children}
            = this.props;
        const {loadedIcon} = this.state;

        // Anders: Here, I just pass in the icon prop since that is all the component needs.
        // I don't think it's necessary to show the warning shape. In Diagram, I just show a console warning instead
        // I set the icon SVG within this group rather than in the document. Seems better to keep related things together
        // BTW, the XSS was present before just less obvious. Should think of a way to fix this.
        return (
            <g ref={containerRef => this.containerRef = containerRef}>
                loadedIcon?
                    {/*TODO: This is BAD. XSS */}
                    <g dangerouslySetInnerHTML={loadedIcon? {__html: loadedIcon.svgString}: null} />
                    <use id={`icon-for-${id}`} key={`icon-for-${id}`}
                         x="0" y="0" width={width + 'px'} height={height + 'px'} href={loadedIcon? '#' + loadedIcon.id: null} fill="transparent"
                         filter={!!filter ? `url(#${filter})` : null} stroke={color} strokeWidth={borderWidth}
                         typeof="schema:ImageObject" className="Icon"/>
                {children}
            </g>
        );
    }
}