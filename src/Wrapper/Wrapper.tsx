import * as React from 'react';
import * as $ from 'jquery';
import * as ReactDOM from 'react-dom';
import {Pvjs} from '../PVJS/PVJS'

/**
 * Simple wrapper around the PVJS react component.
 * Use this function to call PVJS
 * @param selector: DOM Selector
 * @param WPId: WikiPathways ID to get the desired pathway
 * @param customStyle
 */
export function pvjs(selector, WPId, customStyle){
    let container = $(selector).get(0);
    ReactDOM.render(
        <Pvjs id={WPId} customStyle={customStyle}/>,
        container
    )
}