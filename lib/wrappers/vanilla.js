import { defaults } from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Pvjs as PvjsComponent } from '../Pvjs'; // Fix conflicting imports/exports
import * as WikiPathwaysDefaultDisplayStyle from '../WikiPathways.style';
/**
 * Simple wrapper around the Pvjs react component.
 * Use this function to call Pvjs
 * @param selector: DOM Selector for the container in which to render the diagram
 * @param about: unique identifier for the pathway
 * @param [opts]
 * @param [opts.version=0]: Pathways at WikiPathways are versioned, e.g., WP1 has version 73346.
 * 													Version 0 mean latest.
 * @param [opts.src]: if pvjson for pathway cannot be obtained from about, give a
 * 						     	  URL where the pvjson for the pathway can be obtained.
 * @param [opts.customStyle]
 * @param [callback]: The callback to call with the reference to the Pvjs instance
 */
export function loadDiagram(selector, about, opts, callback) {
    let ref = null;
    const props = defaults({}, opts, {
        about: 'http://identifiers.org/wikipathways/' + about,
        version: 0,
        customStyle: WikiPathwaysDefaultDisplayStyle,
        showPanZoomControls: true
    });
    let container = document.querySelector(selector);
    ReactDOM.render(React.createElement(PvjsComponent, Object.assign({}, props, { ref: pvjs => ref = pvjs })), container, (_) => {
        callback(ref);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFuaWxsYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93cmFwcGVycy92YW5pbGxhLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ2xDLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxJQUFJLElBQUksYUFBYSxFQUFDLE1BQU0sU0FBUyxDQUFDLENBQUMsa0NBQWtDO0FBQ2pGLE9BQU8sS0FBSywrQkFBK0IsTUFBTSx1QkFBdUIsQ0FBQztBQVV6RTs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxNQUFNLHNCQUFzQixRQUFnQixFQUFFLEtBQWEsRUFBRSxJQUFVLEVBQUUsUUFBYztJQUN0RixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDZixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRTtRQUNoQyxLQUFLLEVBQUUsc0NBQXNDLEdBQUcsS0FBSztRQUNyRCxPQUFPLEVBQUUsQ0FBQztRQUNWLFdBQVcsRUFBRSwrQkFBK0I7UUFDNUMsbUJBQW1CLEVBQUUsSUFBSTtLQUN6QixDQUFDLENBQUM7SUFDQSxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pELFFBQVEsQ0FBQyxNQUFNLENBQ1gsb0JBQUMsYUFBYSxvQkFBSyxLQUFLLElBQUUsR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFHLEVBQ3BELFNBQVMsRUFDZixDQUFDLENBQUM7UUFDRCxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDZCxDQUFDLENBQ0UsQ0FBQztBQUNOLENBQUMifQ==