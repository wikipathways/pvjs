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
var Text = (function (_super) {
    __extends(Text, _super);
    function Text(props) {
        return _super.call(this, props) || this;
    }
    Text.prototype.render = function () {
        var _a = this.props, _b = _a.textContent, textContent = _b === void 0 ? '' : _b, width = _a.width, height = _a.height, _c = _a.fontSize, fontSize = _c === void 0 ? 12 : _c, _d = _a.fontFamily, fontFamily = _d === void 0 ? 'arial' : _d, fontStyle = _a.fontStyle, fontWeight = _a.fontWeight, _e = _a.color, color = _e === void 0 ? '#141414' : _e;
        var lines = textContent.split('\n');
        var lineSpacing = 2; // In px
        var style = {
            fontSize: fontSize + "px",
            fontFamily: fontFamily,
            fontStyle: fontStyle,
            fontWeight: fontWeight
        };
        var SVGText = lines.map(function (content, i) {
            return React.createElement("text", { key: "text-line-" + i, textAnchor: "middle", style: style, fill: color, dy: 
                /* Add an extra offset of the fontSize (plus a spacer) for each line*/
                lines.length > 1 ? (fontSize + lineSpacing) * i : fontSize }, content);
        });
        var SVGTextHeight = (lines.length > 1 ?
            (fontSize + lineSpacing) * lines.length : fontSize);
        var shiftX = width / 2;
        var shiftY = SVGTextHeight / 2;
        return (React.createElement("g", { transform: "translate(" + shiftX + "," + shiftY + ")" }, SVGText));
    };
    return Text;
}(React.Component));
exports.Text = Text;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlRleHQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsNkJBQStCO0FBRy9CO0lBQTBCLHdCQUF5QjtJQUUvQyxjQUFZLEtBQWdCO2VBQ3hCLGtCQUFNLEtBQUssQ0FBQztJQUNoQixDQUFDO0lBRUQscUJBQU0sR0FBTjtRQUNVLElBQUEsZUFDNkIsRUFENUIsbUJBQWdCLEVBQWhCLHFDQUFnQixFQUFFLGdCQUFLLEVBQUUsa0JBQU0sRUFBRSxnQkFBYSxFQUFiLGtDQUFhLEVBQUUsa0JBQW9CLEVBQXBCLHlDQUFvQixFQUFFLHdCQUFTLEVBQUUsMEJBQVUsRUFDOUYsYUFBaUIsRUFBakIsc0NBQWlCLENBQWU7UUFDcEMsSUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxJQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBRS9CLElBQU0sS0FBSyxHQUFHO1lBQ1YsUUFBUSxFQUFLLFFBQVEsT0FBSTtZQUN6QixVQUFVLFlBQUE7WUFDVixTQUFTLFdBQUE7WUFDVCxVQUFVLFlBQUE7U0FDYixDQUFDO1FBRUYsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pDLE9BQUEsOEJBQU0sR0FBRyxFQUFFLGVBQWEsQ0FBRyxFQUNyQixVQUFVLEVBQUMsUUFBUSxFQUNuQixLQUFLLEVBQUUsS0FBSyxFQUNaLElBQUksRUFBRSxLQUFLLEVBQ1gsRUFBRTtnQkFDRSxzRUFBc0U7Z0JBQ3RFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxHQUFDLENBQUMsR0FBRyxRQUFRLElBRWhFLE9BQU8sQ0FBUTtRQVJqQixDQVFpQixDQUNwQixDQUFDO1FBRUYsSUFBTSxhQUFhLEdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDM0MsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQztRQUV0RCxJQUFNLE1BQU0sR0FBVyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQU0sTUFBTSxHQUFXLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFFekMsTUFBTSxDQUFDLENBQ0gsMkJBQUcsU0FBUyxFQUFFLGVBQWEsTUFBTSxTQUFJLE1BQU0sTUFBRyxJQUN6QyxPQUFPLENBQ1IsQ0FDUCxDQUFBO0lBQ0wsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQUFDLEFBM0NELENBQTBCLEtBQUssQ0FBQyxTQUFTLEdBMkN4QztBQTNDWSxvQkFBSSJ9