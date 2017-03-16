import * as React from 'react';
import * as ReactDom from 'react-dom';
import {Entity} from "./Entity.new";
import {getHighlighted} from "./Entity";
import {AjaxRequest, Observable} from "rxjs";
import * as validDataUrl from 'valid-data-url';
import {Base64} from 'js-base64';

/**
 * Component for the Group. Can contain any amount of child nodes/edges#
 *
 * Much of this logic is exactly the same as node. For example getting the icon
 * TODO: Make this a HOC of Node
 */
export class Group extends React.Component<any, any> {
    containerRef: any;

    constructor(props) {
        super(props);
        this.state = {
            loadedIcon: null
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

    render() {
        const {contains, x, y, highlightedNodes, icons, backgroundColor, customStyle, edgeDrawers, entityMap, filter,
            id, width, height, borderWidth, color} = this.props;
        const {loadedIcon} = this.state;

        let children = contains
            .map((containedId) => entityMap[containedId]) // TODO: Refactor this so contains is actually the map of elements. Then don't have to pass through entityMap too
            .filter(entity => ['Node', 'Edge'].indexOf(entity.kaavioType) > -1) // Ensure only node or Edge. We don't allow nested Groups
            .map(entity => {
                // Set the X and Y values
                let toSet;
                if(entity.kaavioType == 'Edge') {
                    toSet = entity.points;
                }
                else {
                    toSet = entity;
                }

                // Keep a reference to the origin X and Y values in case of a re-render
                if(! toSet.origX) {
                    toSet.origX = toSet.x
                }
                if(! toSet.origY ){
                    toSet.origY = toSet.y;
                }
                toSet.x = toSet.origX - x;
                toSet.y = toSet.origY - y;
                return toSet;
            })
            .map(entity => {
                const highlighted = getHighlighted(entity, highlightedNodes);
                const icon = icons[entity.drawAs];
                return <Entity key={entity.id} {...entity} icon={icon? icon: null} edgeDrawers={edgeDrawers}
                               backgroundColor={backgroundColor} customStyle={customStyle}
                               isHighlighted={highlighted.highlighted} highlightedColor={highlighted.color}
                />
            });

        if(loadedIcon) {
            children.push([
                    <g dangerouslySetInnerHTML={loadedIcon? {__html: loadedIcon.svgString}: null} />,
                    <use id={`icon-for-${id}`} key={`icon-for-${id}`}
                         x="0" y="0" width={width + 'px'} height={height + 'px'} href={loadedIcon? '#' + loadedIcon.id: null} fill="transparent"
                         filter={!!filter ? `url(#${filter})` : null} stroke={color} strokeWidth={borderWidth}
                         typeof="schema:ImageObject" className="Icon"/>
            ])
        }

        return (
            <g children={children}/>
        )
    }
}