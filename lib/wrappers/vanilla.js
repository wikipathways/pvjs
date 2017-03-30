"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var React = require("react");
var ReactDOM = require("react-dom");
var Pvjs_1 = require("../Pvjs"); // Fix conflicting imports/exports
var WikiPathwaysDefaultDisplayStyle = require("../WikiPathways.style");
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
function Pvjs(selector, about, opts, callback) {
    var ref = null;
    var props = lodash_1.defaults({}, opts, {
        about: 'http://identifiers.org/wikipathways/' + about,
        version: 0,
        customStyle: WikiPathwaysDefaultDisplayStyle,
        showPanZoomControls: true
    });
    var container = document.querySelector(selector);
    ReactDOM.render(React.createElement(Pvjs_1.Pvjs, __assign({}, props, { ref: function (pvjs) { return ref = pvjs; } })), container, function (_) {
        callback(ref);
    });
}
exports.Pvjs = Pvjs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFuaWxsYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy93cmFwcGVycy92YW5pbGxhLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaUNBQWtDO0FBQ2xDLDZCQUErQjtBQUMvQixvQ0FBc0M7QUFDdEMsZ0NBQThDLENBQUMsa0NBQWtDO0FBQ2pGLHVFQUF5RTtBQVV6RTs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxjQUFxQixRQUFnQixFQUFFLEtBQWEsRUFBRSxJQUFVLEVBQUUsUUFBYztJQUMvRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDZixJQUFNLEtBQUssR0FBRyxpQkFBUSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUU7UUFDaEMsS0FBSyxFQUFFLHNDQUFzQyxHQUFHLEtBQUs7UUFDckQsT0FBTyxFQUFFLENBQUM7UUFDVixXQUFXLEVBQUUsK0JBQStCO1FBQzVDLG1CQUFtQixFQUFFLElBQUk7S0FDekIsQ0FBQyxDQUFDO0lBQ0EsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRCxRQUFRLENBQUMsTUFBTSxDQUNYLG9CQUFDLFdBQWEsZUFBSyxLQUFLLElBQUUsR0FBRyxFQUFFLFVBQUEsSUFBSSxJQUFJLE9BQUEsR0FBRyxHQUFHLElBQUksRUFBVixDQUFVLElBQUcsRUFDcEQsU0FBUyxFQUNmLFVBQUMsQ0FBQztRQUNELFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNkLENBQUMsQ0FDRSxDQUFDO0FBQ04sQ0FBQztBQWhCRCxvQkFnQkMifQ==