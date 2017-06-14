import {loadDiagram} from '../../src'
import '../../src'; // Import for side-effects when using the custom element
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Pvjs } from '../../src/Pvjs';

// http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url?) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const pathwayId = getParameterByName('id') || 'WP4';
declare var window: any;

// Directly using React element
var heading = document.createElement('h1');
heading.innerText = 'Directly using React component';
document.body.appendChild(heading);
var container = document.createElement('div');
container.setAttribute('style', 'width: 1200px; height:800px');
document.body.appendChild(container);
ReactDOM.render(
    <Pvjs wpId={pathwayId}
          zoomedEntities={['d8bae', 'd32e4']}
          pannedEntities={['d8bae', 'd32e4']}
          highlightedEntities={[{entityId: 'd8bae', color: 'red' }]}
          hiddenEntities={['d32e4']}
    />,
    container
);


// Vanillas
// Small
var heading = document.createElement('h1');
heading.innerText = 'Small size using vanilla wrapper';
document.body.appendChild(heading);
var container = document.createElement('div');
container.setAttribute('id', 'vanilla-small');
container.setAttribute('style', 'width: 100px; height:100px');
document.body.appendChild(container);


loadDiagram('#vanilla-small', pathwayId, {showPanZoomControls: true}, instance => {
    //window.pvjs_instance = instance;
});

// large
var heading = document.createElement('h1');
heading.innerText = 'Large size using vanilla wrapper';
document.body.appendChild(heading);
var container = document.createElement('div');
container.setAttribute('id', 'vanilla-large');
container.setAttribute('style', 'width: 1200px; height:800px');
document.body.appendChild(container);


loadDiagram('#vanilla-large', pathwayId, {showPanZoomControls: true, detailPanelEnabled: false, onEntityClick: (entity) => console.log(entity)}, instance => {
    window.instance = instance;
});

// 100% width height
var heading = document.createElement('h1');
heading.innerText = '100% size using vanilla wrapper';
document.body.appendChild(heading);
var container = document.createElement('div');
container.setAttribute('id', 'vanilla-100');
container.setAttribute('style', 'width: 100%; height:100%');
document.body.appendChild(container);


// loadDiagram('#vanilla-100', pathwayId, {showPanZoomControls: true}, instance => {
//     //window.pvjs_instance = instance;
// });

// Custom elements
// Taller than wide
var heading = document.createElement('h1');
heading.innerText = 'Taller than wide using custom element';
document.body.appendChild(heading);
var wikipathwaysPvjs = document.createElement('div');
wikipathwaysPvjs.setAttribute('style', 'width:400px;height:800px')
wikipathwaysPvjs.innerHTML = `<wikipathways-pvjs wpId="${pathwayId}" version="0"></wikipathways-pvjs>`;
document.body.appendChild(wikipathwaysPvjs);

// Wider than tall
var heading = document.createElement('h1');
heading.innerText = 'Wider than tall using custom element';
document.body.appendChild(heading);
var wikipathwaysPvjs = document.createElement('div');
wikipathwaysPvjs.setAttribute('style', 'width:1200px;height:600px')
wikipathwaysPvjs.innerHTML = `<wikipathways-pvjs wpId="${pathwayId}" version="0"></wikipathways-pvjs>`;
document.body.appendChild(wikipathwaysPvjs);
