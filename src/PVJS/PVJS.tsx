import {Observable, AjaxRequest} from "rxjs";
import { omit } from 'lodash';
import * as WikiPathwaysDefaultDisplayStyle from './WikiPathways.default.style';
import {edgeDrawers} from "../Kaavio/EdgeDrawers";
import icons from "./icons";
import {markerDrawers} from "./MarkerDrawers";
import * as React from 'react';
import {DoubleStrokeFilter} from '../Kaavio/filters/DoubleStrokeFilter'
import {Kaavio} from '../Kaavio/Kaavio'
let gpml2pvjson = require('gpml2pvjson').default;
import {BridgeDbRenderer} from './BridgeDb/BridgeDb';
import {Manipulator} from "../Kaavio/manipulator/manipulator";

export class Pvjs extends React.Component<any, any> {
    pathwayRequest: Observable<any>;
    kaavioRef: any;
    manipulator: Manipulator;

    constructor(props) {
        const customStyle = props.customStyle || {};
        super(props);
        this.state = {
            id: props.id,
            pvjson: {
                elements: [],
                organism: '',
                name: '',
            },
            customStyle: props.customStyle,
            selected: null
        };
    }

    closeActive() {
        this.setState({selected: null})
    }

    handleClick(e) {
        let that = this;
        let el = e.target;
        const id = el.getAttribute('id');
        const entity = that.state.entities[id];
        if (entity && entity.type === 'DataNode' && entity.database && entity.identifier) {
            that.setState({selected: entity});
        }
    }

    getPathway() {
        let that = this;
        const state = that.state;
        // NOTE: this is in case the pathway id is provided as something like wikipathways:WP554
        // TODO what about if it's provided as something like this: http://identifiers.org/wikipathways/WP554
        const fullId = state.id.replace(/wikipathways:/, 'http://webservice.wikipathways.org/getPathwayAs?fileType=xml&format=json&pwId=')
        const ajaxRequest: AjaxRequest = {
            url: fullId,
            method: 'GET',
            responseType: 'json',
            timeout: 1 * 1000, // ms
            crossDomain: true,
        };
        return gpml2pvjson(
            Observable.ajax(ajaxRequest)
                .map((ajaxResponse): {data: string} => ajaxResponse.xhr.response)
                .map(res => atob(res.data)),
            fullId
        )
            .subscribe(function(pvjson) {
                let { elements, organism, name } = pvjson;

                const infoBoxTextContent = `Title: ${name}\rOrganism: ${organism}`;

                pvjson.elements = elements.map(function(element) {
                    const displayName = element.displayName;
                    if (displayName) {
                        element.textContent = displayName;
                    }
                    omit(element, ['displayName']);
                    return element;
                }).concat([{
                    id: 'PVJS-infobox',
                    pvjsonType: 'Node',
                    drawAs: 'None',
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    color: '#999999',
                    fontSize: 14,
                    textContent: infoBoxTextContent,
                    textAlign: 'start',
                    type: [
                        'Node',
                        'Label',
                        'InfoBox',
                    ],
                    padding: '0.5em',
                    verticalAlign: 'middle',
                    x: 5,
                    y: 5,
                    height: 30,
                    width: infoBoxTextContent.length * 3.5,
                    zIndex: Infinity,
                }]);
                that.setState({pvjson: pvjson});
            }, function(err) {
                err.message = err.message || '';
                err.message += ' Error getting pathway (is webservice.wikipathways.org down?)'
                console.error(err);
                that.setState({});
            })
    }

    componentDidMount() {
        let that = this;
        that.getPathway();
        that.manipulator = that.kaavioRef.manipulator;
    }

    // TODO is this correct? Or should we use componentWillUpdate?
    componentDidUpdate(prevProps, prevState) {
        let that = this;
        const state = that.state;
        if (JSON.stringify(prevState.pvjson) !== JSON.stringify(state.pvjson)) {
            that.getPathway();
        }
    }

    componentWillUnmount() {
        let that = this;
        // TODO cancel any pending network requests, possibly something like this:
        //that.pathwayRequest.dispose();
    }

    getManipulator(){
        return this.manipulator;
    }

    render() {
        let that = this;
        const state = that.state;
        const { pvjson, id, customStyle } = state;

        const doubleStrokeFilters = Array.from(
            pvjson.elements
                .filter((element) => element.lineStyle === 'double')
                .reduce(function(acc, element) {
                    // we can't handle a strokeWidth of 0.4
                    const roundedStrokeWidth = Math.max(1, Math.round(element.borderWidth || 1));
                    element.filter = 'double' + roundedStrokeWidth;
                    acc.add(roundedStrokeWidth);
                    return acc;
                }, new Set())
        )
            .reduce(function(acc: any, strokeWidth) {
                const id = `double${strokeWidth}`;
                acc.push(function double() {
                    return <DoubleStrokeFilter id={id} key={id} strokeWidth={strokeWidth} />;
                });
                return acc;
            }, []);

        const filters = doubleStrokeFilters;

        return (
            <div>
                <Kaavio id={id} pvjson={pvjson} customStyle={/*customStyle*/WikiPathwaysDefaultDisplayStyle} ref={kaavio => this.kaavioRef = kaavio}
                        edgeDrawers={edgeDrawers} icons={icons} markerDrawers={markerDrawers} filters={filters} />
                <BridgeDbRenderer/>
            </div>
        );
    }
}
