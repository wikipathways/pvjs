import '../../src/WebComponent';
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
    <Pvjs wpId={pathwayId} />,
    container
);

// Custom elements
// Taller than wide
var heading = document.createElement('h1');
heading.innerText = 'Taller than wide using custom element';
document.body.appendChild(heading);
var wikipathwaysPvjs = document.createElement('div');
wikipathwaysPvjs.setAttribute('style', 'width:400px;height:800px')
wikipathwaysPvjs.innerHTML = `<wikipathways-pvjs id="my-diag" wp-id="${pathwayId}" version="0"></wikipathways-pvjs>`;
document.body.appendChild(wikipathwaysPvjs);

var diag = document.getElementById('my-diag');
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.attributeName === 'ready' && !mutation.oldValue){
            var node = diag['entities'].find(singleEntity => singleEntity.textContent === "TCA Cycle");
            diag['highlightOn'](node.id, 'red');
            diag['zoomOn'](node.id);
        }

    });
});
observer.observe(diag, { attributes: true, childList: false, characterData: false });

// Wider than tall
var heading = document.createElement('h1');
heading.innerText = 'Wider than tall using custom element';
document.body.appendChild(heading);
var wikipathwaysPvjs = document.createElement('div');
wikipathwaysPvjs.setAttribute('style', 'width:1200px;height:600px')
wikipathwaysPvjs.innerHTML = `<wikipathways-pvjs wp-id="${pathwayId}" version="0" show-pan-zoom-controls=""></wikipathways-pvjs>`;
document.body.appendChild(wikipathwaysPvjs);
