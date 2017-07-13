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
container.setAttribute('style', 'width: 600px; height:400px');
document.body.appendChild(container);
ReactDOM.render(
    <Pvjs wpId={pathwayId}
          panZoomLocked={true}
          zoomedEntities={['d8bae', 'd32e4']}
          pannedEntities={['d8bae', 'd32e4']}
          panCoordinates={{x: -0.184, y: -0.178}}
          zoomLevel={2}
          highlightedEntities={[{entityId: 'd8bae', color: 'red' }]}
          hiddenEntities={['d32e4']}
    />,
    container
);

// Custom elements
// Taller than wide
var heading = document.createElement('h1');
heading.innerText = 'Taller than wide using custom element';
document.body.appendChild(heading);
var wikipathwaysPvjs = document.createElement('div');
wikipathwaysPvjs.setAttribute('style', 'width:400px;height:800px')
wikipathwaysPvjs.innerHTML = `<wikipathways-pvjs wp-id="${pathwayId}" version="0"></wikipathways-pvjs>`;
document.body.appendChild(wikipathwaysPvjs);

// Wider than tall
var heading = document.createElement('h1');
heading.innerText = 'Wider than tall using custom element';
document.body.appendChild(heading);
var wikipathwaysPvjs = document.createElement('div');
wikipathwaysPvjs.setAttribute('style', 'width:1200px;height:600px')
wikipathwaysPvjs.innerHTML = `<wikipathways-pvjs wp-id="${pathwayId}" version="0"></wikipathways-pvjs>`;
document.body.appendChild(wikipathwaysPvjs);
