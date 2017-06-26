"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var React = require("react");
var rxjs_1 = require("rxjs");
var validDataUrl = require("valid-data-url");
var js_base64_1 = require("js-base64");
/**
 * Node is a rectangle within a Kaavio diagram.
 * It can be mapped to other pathway elements. For example, in PVJS this is mapped to metabolites and proteins.
 */
var Node = (function (_super) {
    __extends(Node, _super);
    function Node(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            loadedIcon: null,
            iconSuffix: new Date().toISOString().replace(/\W/g, '')
        };
        return _this;
    }
    Node.prototype.componentDidMount = function () {
        this.getIcon();
    };
    Node.prototype.componentWilUpdate = function () {
        this.getIcon();
    };
    /**
     * Using the icon prop, get the required SVG and set the state.
     */
    Node.prototype.getIcon = function () {
        var _this = this;
        // Anders: The node now only receives one icon and is responsible for retrieving the data from it's url.
        // This makes sense here but do other components need to do this? In which case this should be in Entity
        // Could you also check the ajax request? Not sure if it's correct
        var icon = this.props.icon;
        if (!icon)
            return;
        if (validDataUrl(icon.url)) {
            var parts = icon.url.match(validDataUrl.regex);
            var mediaType = parts[1] ? parts[1].toLowerCase() : null;
            var charset = parts[2] ? parts[2].split('=')[1].toLowerCase : null;
            var isBase64 = !!parts[3];
            var data = parts[4] ? parts[4] : null;
            var svgString = !isBase64 ? decodeURIComponent(data) : js_base64_1.Base64.decode(data);
            this.setState({
                loadedIcon: {
                    id: icon.id,
                    svgString: svgString
                }
            });
        }
        else {
            var ajaxRequest = {
                url: icon.url,
                method: 'GET',
                responseType: 'text',
                timeout: 1 * 1000,
                crossDomain: true,
            };
            rxjs_1.Observable.ajax(ajaxRequest)
                .subscribe(function (ajaxResponse) {
                var svgString = ajaxResponse.xhr.response;
                _this.setState({
                    loadedIcon: {
                        id: icon.id,
                        svgString: svgString
                    }
                });
            }, function (err) {
                err.message = err.message || '';
                err.message += " Error getting icon from \"" + icon.url + "\". Is source website down?";
                console.error(err);
            });
        }
    };
    Node.prototype.render = function () {
        var _this = this;
        var _a = this.props, borderWidth = _a.borderWidth, color = _a.color, filter = _a.filter, height = _a.height, id = _a.id, width = _a.width, children = _a.children, backgroundColor = _a.backgroundColor;
        var loadedIcon = this.state.loadedIcon;
        // Add the style too. Fixes firefox bug where fill, stroke etc. isn't inherited
        var style = {
            fill: backgroundColor,
            color: color,
            stroke: color,
            strokeWidth: borderWidth
        };
        return (React.createElement("g", { ref: function (containerRef) { return _this.containerRef = containerRef; } },
            React.createElement("g", { dangerouslySetInnerHTML: loadedIcon ? { __html: loadedIcon.svgString } : null }),
            React.createElement("use", { id: "icon-for-" + id, key: "icon-for-" + id, x: "0", y: "0", width: width + 'px', height: height + 'px', style: style, fill: backgroundColor, xlinkHref: loadedIcon ? '#' + loadedIcon.id : null, filter: !!filter ? "url(#" + filter + ")" : null, stroke: color, strokeWidth: borderWidth, className: "Icon" }),
            children));
    };
    return Node;
}(React.Component));
exports.Node = Node;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk5vZGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNkJBQStCO0FBRS9CLDZCQUFzRDtBQUV0RCw2Q0FBK0M7QUFDL0MsdUNBQWlDO0FBR2pDOzs7R0FHRztBQUNIO0lBQTBCLHdCQUF5QjtJQUcvQyxjQUFZLEtBQWdCO1FBQTVCLFlBQ0ksa0JBQU0sS0FBSyxDQUFDLFNBS2Y7UUFKRyxLQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1QsVUFBVSxFQUFFLElBQUk7WUFDaEIsVUFBVSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7U0FDMUQsQ0FBQTs7SUFDTCxDQUFDO0lBRUQsZ0NBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxpQ0FBa0IsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsc0JBQU8sR0FBUDtRQUFBLGlCQStDQztRQTlDRyx3R0FBd0c7UUFDeEcsd0dBQXdHO1FBQ3hHLGtFQUFrRTtRQUNsRSxJQUFNLElBQUksR0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNsQyxFQUFFLENBQUEsQ0FBQyxDQUFFLElBQUksQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUVsQixFQUFFLENBQUEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakQsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVB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