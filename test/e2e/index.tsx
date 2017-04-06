// NOTE: mock-server must be started before running this.

import { values } from 'lodash';
import {loadDiagram} from '../../src'
import '../../src'; // Import for side-effects when using the custom element

import * as WikiPathwaysDefaultDisplayStyle from '../../src/WikiPathways.style';

//const customStyle = `
//	.background {
//		fill: white;
//	}
//
//	.shadow {
//		filter: drop-shadow( 2px 2px 2px #000 ); /* Same syntax as box-shadow */
//		-webkit-filter: drop-shadow( 2px 2px 2px #000 );
//	}
//
//	text {
//		font-size: 14px;
//		pointer-events: none;
//		font-family: Arial, Helvetica, sans-serif;
//	}
//
//	.InfoBox {
//		fill: #444;
//	}
//
//	.citation {
//		fill: gray;
//		font-size: 10px;
//	}
//
//	.InfoBox .citation {
//		font-size: 0px;
//	}
//
//	.CellularComponent {
//		stroke: #808080;
//		stroke-width:3;
//		fill: #fff;
//	}
//
//	.Cell {
//		stroke: #808080;
//		stroke-width:3;
//		fill: #fff;
//	}
//
//
//	.DataNode .shapeType {
//		clip-path: url(#rounded-rectangle);
//		fill: #518569;
//	}
//
//	.DataNode .textlabel {
//		fill: #fff;
//	}
//
//	.Rna .shapeType {
//	fill: #9453A7;
//	}
//
//	.Metabolite .shapeType {
//		fill: #0059b3;
//		clip-path: none;
//	}
//
//	.Pathway .shapeType {
//	fill: white;
//	clip-path: none;
//	}
//
//	.Pathway .textlabel {
//		fill: #75C95C;
//	}
//
//
//	.Group-Complex {
//		fill: #B4B464;
//		fill-opacity: 0.1;
//		stroke: #808080;
//	}
//
//	.Group-None {
//		fill: #B4B464;
//		fill-opacity: 0.1;
//		stroke: #808080;
//	}
//
//	.Group-Pathway {
//		fill: #008000;
//		fill-opacity: 0.05;
//		stroke: #808080;
//	}
//
//
//	.Interaction {
//		stroke: #000000;
//	}
//
//	.Inhibition {
//		stroke: red;
//		stroke-width: 1.3;
//	}
//`;

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

// Vanillas
// Small
var container = document.createElement('div');
container.setAttribute('id', 'vanilla-small');
container.setAttribute('style', 'width: 100px; height:100px');
var heading = document.createElement('h1');
heading.innerText = 'Small size using vanilla wrapper';
container.appendChild(heading);
document.body.appendChild(container);


loadDiagram('#vanilla-small', pathwayId, {showPanZoomControls: true}, instance => {
    window.pvjs_instance = instance;
});

// large
var container = document.createElement('div');
container.setAttribute('id', 'vanilla-large');
container.setAttribute('style', 'width: 1200px; height:800px');
var heading = document.createElement('h1');
heading.innerText = 'Large size using vanilla wrapper';
container.appendChild(heading);
document.body.appendChild(container);


loadDiagram('#vanilla-large', pathwayId, {showPanZoomControls: true}, instance => {
    window.pvjs_instance = instance;
});

// 100% width height
var container = document.createElement('div');
container.setAttribute('id', 'vanilla-100');
container.setAttribute('style', 'width: 100%; height:100%');
var heading = document.createElement('h1');
heading.innerText = '100% size using vanilla wrapper';
container.appendChild(heading);
document.body.appendChild(container);


loadDiagram('#vanilla-100', pathwayId, {showPanZoomControls: true}, instance => {
    window.pvjs_instance = instance;
});

// Custom elements
// Taller than wide
var wikipathwaysPvjs = document.createElement('div');
wikipathwaysPvjs.setAttribute('style', 'width:400px;height:800px')
wikipathwaysPvjs.innerHTML = `
    <h1>Taller than wide using custom element</h1>
    <wikipathways-pvjs about="${pathwayId}"></wikipathways-pvjs>
`;
document.body.appendChild(wikipathwaysPvjs);

// Wider than tall
var wikipathwaysPvjs = document.createElement('div');
wikipathwaysPvjs.setAttribute('style', 'width:1200px;height:600px')
wikipathwaysPvjs.innerHTML = `
    <h1>Wider than tall using custom element</h1>
    <wikipathways-pvjs about="${pathwayId}"></wikipathways-pvjs>
`;
document.body.appendChild(wikipathwaysPvjs);
