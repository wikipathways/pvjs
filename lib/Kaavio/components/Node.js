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
Object.defineProperty(exports, "__esModule", { value: true });
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
        // Anders: Here, I just pass in the icon prop since that is all the component needs.
        // I don't think it's necessary to show the warning shape. In Diagram, I just show a console warning instead
        // I set the icon SVG within this group rather than in the document. Seems better to keep related things together
        // BTW, the XSS was present before just less obvious. Should think of a way to fix this.
        return (React.createElement("g", { ref: function (containerRef) { return _this.containerRef = containerRef; } },
            "loadedIcon?",
            React.createElement("g", { dangerouslySetInnerHTML: loadedIcon ? { __html: loadedIcon.svgString } : null }),
            React.createElement("use", { id: "icon-for-" + id, key: "icon-for-" + id, x: "0", y: "0", width: width + 'px', height: height + 'px', fill: backgroundColor, xlinkHref: loadedIcon ? '#' + loadedIcon.id : null, filter: !!filter ? "url(#" + filter + ")" : null, stroke: color, strokeWidth: borderWidth, className: "Icon" }),
            children));
    };
    return Node;
}(React.Component));
exports.Node = Node;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9Ob2RlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2QkFBK0I7QUFFL0IsNkJBQXNEO0FBRXRELDZDQUErQztBQUMvQyx1Q0FBaUM7QUFHakM7OztHQUdHO0FBQ0g7SUFBMEIsd0JBQXlCO0lBRy9DLGNBQVksS0FBZ0I7UUFBNUIsWUFDSSxrQkFBTSxLQUFLLENBQUMsU0FLZjtRQUpHLEtBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxVQUFVLEVBQUUsSUFBSTtZQUNoQixVQUFVLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztTQUMxRCxDQUFBOztJQUNMLENBQUM7SUFFRCxnQ0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELGlDQUFrQixHQUFsQjtRQUNJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQkFBTyxHQUFQO1FBQUEsaUJBK0NDO1FBOUNHLHdHQUF3RztRQUN4Ryx3R0FBd0c7UUFDeEcsa0VBQWtFO1FBQ2xFLElBQU0sSUFBSSxHQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQSxDQUFDLENBQUUsSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRWxCLEVBQUUsQ0FBQSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUUs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