import * as React from 'react';
import * as $ from 'jquery';
import * as ReactDOM from 'react-dom';
import {Pvjs} from '../PVJS/PVJS'

export function pvjs(selector, WPId, customStyle){
    let container = $(selector).get(0);
    ReactDOM.render(
        <Pvjs id={WPId} customStyle={customStyle}/>,
        container
    )
}