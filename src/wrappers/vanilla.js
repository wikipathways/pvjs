"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require("react");
var ReactDOM = require("react-dom");
var Pvjs_1 = require("../Pvjs"); // Fix conflicting imports/exports
var WikiPathwaysDefaultDisplayStyle = require("../WikiPathways.style");
var manipulator_1 = require("../manipulator");
var lodash_1 = require("lodash");
/**
 * Simple wrapper around the Pvjs react component.
 * Use this function to call Pvjs
 * @param selector: DOM Selector for the container in which to render the diagram
 * @param wpId: The WikiPathways ID. E.g. WP4
 * @param [opts]
 * @param [opts.version=0]: Pathways at WikiPathways are versioned, e.g., WP1 has version 73346.
 * 													Version 0 mean latest.
 * @param [opts.src]: if pvjson for pathway cannot be obtained from about, give a
 * 						     	  URL where the pvjson for the pathway can be obtained.
 * @param [opts.customStyle]
 * @param [opts.onEntityClick] called with the entity that has been clicked
 * @param [callback]: The callback to call with the reference to the Pvjs instance
 */
function loadDiagram(selector, wpId, opts, callback) {
    var props = lodash_1.defaults(opts, {
        wpId: wpId,
        version: 0,
        customStyle: WikiPathwaysDefaultDisplayStyle,
        showPanZoomControls: true,
        highlightedEntities: [],
        zoomedEntities: [],
        pannedEntities: []
    });
    var container = document.querySelector(selector);
    renderComponent(props, container, function (entities) {
        var reRender = lodash_1.curryRight(renderComponent)(null)(container);
        if (callback) {
            callback({
                entities: entities,
                manipulator: new manipulator_1.Manipulator(reRender, props)
            });
        }
    });
}
exports.loadDiagram = loadDiagram;
var renderComponent = function (props, container, cb) {
    if (cb) {
        props.onReady = cb;
    }
    ReactDOM.render(React.createElement(Pvjs_1.Pvjs, __assign({}, props)), container);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFuaWxsYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZhbmlsbGEudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDZCQUErQjtBQUMvQixvQ0FBc0M7QUFDdEMsZ0NBQThDLENBQUMsa0NBQWtDO0FBQ2pGLHVFQUF5RTtBQUN6RSw4Q0FBNkM7QUFDN0MsaUNBQThDO0FBRTlDOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxxQkFBNEIsUUFBZ0IsRUFBRSxJQUFZLEVBQUUsSUFBUyxFQUFFLFFBQWM7SUFDcEYsSUFBTSxLQUFLLEdBQUcsaUJBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDNUIsSUFBSSxNQUFBO1FBQ0osT0FBTyxFQUFFLENBQUM7UUFDVixXQUFXLEVBQUUsK0JBQStCO1FBQzVDLG1CQUFtQixFQUFFLElBQUk7UUFDekIsbUJBQW1CLEVBQUUsRUFBRTtRQUN2QixjQUFjLEVBQUUsRUFBRTtRQUNsQixjQUFjLEVBQUUsRUFBRTtLQUNsQixDQUFDLENBQUM7SUFDQSxJQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELGVBQWUsQ0FDWCxLQUFLLEVBQ0wsU0FBUyxFQUNmLFVBQUMsUUFBUTtRQUNGLElBQU0sUUFBUSxHQUFHLG1CQUFVLENBQUMsZUFBbUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xGLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDcEIsUUFBUSxDQUFDO2dCQUNSLFFBQVEsVUFBQTtnQkFDUixXQUFXLEVBQUUsSUFBSSx5QkFBVyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUM7YUFDN0MsQ0FBQyxDQUFBO1FBQ0gsQ0FBQztJQUNGLENBQUMsQ0FDRSxDQUFDO0FBQ04sQ0FBQztBQXhCRCxrQ0F3QkM7QUFFRCxJQUFNLGVBQWUsR0FBRyxVQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRztJQUM3QyxFQUFFLENBQUEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFFBQVEsQ0FBQyxNQUFNLENBQ2Qsb0JBQUMsV0FBYSxlQUFLLEtBQUssRUFBSSxFQUM1QixTQUFTLENBQ1QsQ0FBQztBQUNILENBQUMsQ0FBQyJ9