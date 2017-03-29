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
var ReactDom = require("react-dom");
var svg_text_1 = require("svg-text");
var Text = (function (_super) {
    __extends(Text, _super);
    function Text(props) {
        return _super.call(this, props) || this;
    }
    Text.prototype.componentDidMount = function () {
        // Anders: I've removed a lot of the custom props in favour of fewer with some defaults.
        // I can't see a use case for many of the ones that were here before. What do you think?
        var _a = this.props, _b = _a.textContent, textContent = _b === void 0 ? '' : _b, _c = _a.textAlign, textAlign = _c === void 0 ? 'center' : _c, className = _a.className, _d = _a.fontColor, fontColor = _d === void 0 ? 'currentColor' : _d, _e = _a.fontFamily, fontFamily = _e === void 0 ? 'serif' : _e, _f = _a.fontSize, fontSize = _f === void 0 ? '1rem' : _f, _g = _a.fontStyle, fontStyle = _g === void 0 ? 'normal' : _g, _h = _a.fontWeight, fontWeight = _h === void 0 ? 'normal' : _h, _j = _a.x, x = _j === void 0 ? 0 : _j, _k = _a.y, y = _k === void 0 ? 0 : _k;
        var style = {
            fill: fontColor,
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontStyle: fontStyle,
            fontWeight: fontWeight
        };
        // Use ReactDom to find the node. Don't access DOM directly through browser API.
        var svgElem = ReactDom.findDOMNode(this.svgRef);
        var opts = {
            text: textContent,
            element: svgElem,
            align: textAlign,
            verticalAlign: 'middle',
            className: className,
            textOverflow: 'ellipsis',
            style: style,
            x: x,
            y: y
        };
        new svg_text_1.default(opts);
    };
    Text.prototype.render = function () {
        var _this = this;
        return (React.createElement("g", { ref: function (svgRef) { return _this.svgRef = svgRef; } }));
    };
    return Text;
}(React.Component));
exports.Text = Text;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9UZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2QkFBK0I7QUFDL0Isb0NBQXNDO0FBRXRDLHFDQUErQjtBQUcvQjtJQUEwQix3QkFBeUI7SUFHL0MsY0FBWSxLQUFnQjtlQUN4QixrQkFBTSxLQUFLLENBQUM7SUFDaEIsQ0FBQztJQUVELGdDQUFpQixHQUFqQjtRQUNJLHdGQUF3RjtRQUN4Rix3RkFBd0Y7UUFFbEYsSUFBQSxlQUNvRixFQURuRixtQkFBZ0IsRUFBaEIscUNBQWdCLEVBQUUsaUJBQW9CLEVBQXBCLHlDQUFvQixFQUFFLHdCQUFTLEVBQUUsaUJBQTBCLEVBQTFCLCtDQUEwQixFQUFFLGtCQUFvQixFQUFwQix5Q0FBb0IsRUFDdEcsZ0JBQWlCLEVBQWpCLHNDQUFpQixFQUFFLGlCQUFvQixFQUFwQix5Q0FBb0IsRUFBRSxrQkFBcUIsRUFBckIsMENBQXFCLEVBQUUsU0FBRyxFQUFILDBCQUFHLEVBQUUsU0FBRyxFQUFILDBCQUFHLENBQWU7UUFFM0YsSUFBTSxLQUFLLEdBQUc7WUFDVixJQUFJLEVBQUUsU0FBUztZQUNmLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLFVBQVUsRUFBRSxVQUFVO1NBQ3pCLENBQUM7UUFFRixnRkFBZ0Y7UUFDaEYsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsSUFBTSxJQUFJLEdBQUc7WUFDVCxJQUFJLEVBQUUsV0FBVztZQUNqQixPQUFPLEVBQUUsT0FBTztZQUNoQixLQUFLLEVBQUUsU0FBUztZQUNoQixhQUFhLEVBQUUsUUFBUTtZQUN2QixTQUFTLEVBQUUsU0FBUztZQUNwQixZQUFZLEVBQUUsVUFBVTtZQUN4QixLQUFLLEVBQUUsS0FBSztZQUNaLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDUCxDQUFDO1FBQ0YsSUFBSSxrQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxxQkFBTSxHQUFOO1FBQUEsaUJBSUM7UUFIRyxNQUFNLENBQUMsQ0FDSCwyQkFBRyxHQUFHLEVBQUUsVUFBQSxNQUFNLElBQUksT0FBQSxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBcEIsQ0FBb0IsR0FBSSxDQUM3QyxDQUFBO0lBQ0wsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBM0NELENBQTBCLEtBQUssQ0FBQyxTQUFTLEdBMkN4QztBQTNDWSxvQkFBSSJ9