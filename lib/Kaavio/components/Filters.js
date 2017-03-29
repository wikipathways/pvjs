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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
//import * as RGBColor from 'rgbcolor';
function doubleStroke(_a) {
    var _b = _a.source, source = _b === void 0 ? 'SourceGraphic' : _b, _c = _a.strokeWidth, strokeWidth = _c === void 0 ? 1 : _c;
    if (strokeWidth === 1) {
        return [
            React.createElement("feComposite", { in: source, in2: source, operator: "over", result: "doubleStrokedarkened" }),
            React.createElement("feMorphology", { in: source, operator: "dilate", radius: "1", result: "doubleStrokedilated" }),
            React.createElement("feComposite", { in: "doubleStrokedilated", in2: "doubleStrokedarkened", operator: "out", result: "doubleStrokeResult" }),
        ];
    }
    return [
        React.createElement("feMorphology", { in: source, operator: "dilate", radius: strokeWidth, result: "doubleStrokedilated" }),
        React.createElement("feComposite", { in: "doubleStrokedilated", operator: "xor", in2: source, result: "doubleStrokeResult" }),
    ];
}
exports.doubleStroke = doubleStroke;
function round(_a) {
    // Can we handle a strokeWidth of 0.4?
    //const roundedStrokeWidth = Math.max(1, Math.round(strokeWidth || 1));
    var _b = _a.source, source = _b === void 0 ? 'SourceGraphic' : _b, _c = _a.strokeWidth, strokeWidth = _c === void 0 ? 1 : _c;
    // C' = slope * C + intercept
    // where C is the initial component (e.g., ‘feFuncR’),
    //       C' is the remapped component;
    //       both in the closed interval [0,1].
    // http://www.w3.org/TR/filter-effects/#feComponentTransferElement
    var darkInputSlope = 1.5;
    var darkInputIntercept = 0;
    var darkOutputSlope = 4;
    var darkOutputIntercept = -0.7;
    var normalizedWidth = 3;
    //const strokeWidthNormalizationOperator = (strokeWidth > 2) ? 'contract' : 'dilate';
    var strokeWidthNormalizationOperator = (strokeWidth > normalizedWidth) ? 'contract' : 'dilate';
    // strangely, this is what appears needed to normalize stroke width to a value
    // large enough to be blurred without being destroyed:
    var radius = strokeWidthNormalizationOperator === 'dilate' ? 1 : 0;
    // would have expected this, but it doesn't produce expected results:
    //const radius = (strokeWidthNormalizationOperator === 'dilate') ? (normalizedWidth - strokeWidth) : strokeWidth - normalizedWidth;
    //const radius = Math.abs((normalizedWidth - strokeWidth - 1) / 2 );
    //const radius = Math.abs(normalizedWidth - strokeWidth);
    var strokeWidthRevertOperator = strokeWidthNormalizationOperator === 'contract' ? 'dilate' : 'contract';
    /*
    return Math.max(normalizedWidth - strokeWidth, 1);
    let normalizedDark = [
        <feBlend in="SourceGraphic" in2="SourceGraphic" mode="multiply" result="rounddarkinput"/>
    ].concat(
        range(0, normalizedBlendIterations)
            .map(function(i) {
                return <feBlend in={`rounddarkinput${(i - 1)}`} in2={`rounddarkinput${i}`} mode="multiply" result="roundnormalizeddarkinput"/>;
            })
  )
    .concat([
        <feBlend in="rounddarkinput" in2="rounddarkinput" mode="multiply" result={`roundnormalizeddarkinput${normalizedBlendIterations}`}/>,
      ...
  //*/
    //*
    var normalizedDark = strokeWidth === 1 ? [
        React.createElement("feBlend", { in: "SourceGraphic", in2: "SourceGraphic", mode: "multiply", result: "rounddarkinput" }),
        React.createElement("feBlend", { in: "rounddarkinput", in2: "rounddarkinput", mode: "multiply", result: "roundnormalizeddarkinput" }),
        React.createElement("feMorphology", { in: "roundnormalizeddarkinput", operator: strokeWidthNormalizationOperator, radius: radius, result: "roundnormalized" }),
    ] : [
        React.createElement("feBlend", { in: "SourceGraphic", in2: "SourceGraphic", mode: "multiply", result: "roundnormalizeddarkinput" }),
        React.createElement("feMorphology", { in: "roundnormalizeddarkinput", operator: strokeWidthNormalizationOperator, radius: radius, result: "roundnormalized" }),
    ];
    //*/
    return normalizedDark
        .concat([
        //<feMorphology in="roundnormalizeddarkinput" operator={strokeWidthNormalizationOperator} radius={ normalizationRadius - 1/2 } result="roundnormalized" />,
        /*
        <feComponentTransfer in={source} colorInterpolationFilters="sRGB" result="rounddarkinput">
            <feFuncR type="linear" slope={darkInputSlope} intercept={darkInputIntercept}/>
            <feFuncG type="linear" slope={darkInputSlope} intercept={darkInputIntercept}/>
            <feFuncB type="linear" slope={darkInputSlope} intercept={darkInputIntercept}/>
            <feFuncA type="linear" slope={darkInputSlope} intercept={darkInputIntercept}/>
        </feComponentTransfer>,
        //*/
        /*
        <feComponentTransfer in={source} result="rounddarkinput">
            <feFuncR type="discrete" tableValues="0.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0"/>
            <feFuncG type="discrete" tableValues="0.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0"/>
            <feFuncB type="discrete" tableValues="0.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0"/>
            <feFuncA type="discrete" tableValues="0.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0 1.0"/>
        </feComponentTransfer>,
        //*/
        React.createElement("feGaussianBlur", { in: "roundnormalized", stdDeviation: 3 * 2, result: "roundblurred" }),
        React.createElement("feColorMatrix", { in: "roundblurred", mode: "matrix", values: "1   0   0   0   0\n                            0   1   0   0   0\n                            0   0   1   0   0\n                            0   0   0  17  -3", result: "roundcolored" }),
        React.createElement("feBlend", { in: "roundcolored", in2: "roundcolored", mode: "multiply", result: "rounddarkoutput" }),
        React.createElement("feBlend", { in: "rounddarkoutput", in2: "rounddarkoutput", mode: "multiply", result: "rounddarkeroutput" }),
        /*
        <feComponentTransfer in="rounddarkeroutput" result="roundoutput">
            <feFuncR type="linear" slope={darkOutputSlope} intercept={darkOutputIntercept}/>
            <feFuncG type="linear" slope={darkOutputSlope} intercept={darkOutputIntercept}/>
            <feFuncB type="linear" slope={darkOutputSlope} intercept={darkOutputIntercept}/>
            <feFuncA type="linear" slope={darkOutputSlope} intercept={darkOutputIntercept}/>
        </feComponentTransfer>,
        //*/
        React.createElement("feMorphology", { in: "rounddarkeroutput", operator: strokeWidthRevertOperator, radius: radius, result: "roundResult" }),
    ]);
}
exports.round = round;
function generateFilterId(filterName, strokeWidth) {
    return [filterName, strokeWidth].join('-');
}
exports.generateFilterId = generateFilterId;
var Filter = (function (_super) {
    __extends(Filter, _super);
    function Filter(props) {
        var _this = _super.call(this, props) || this;
        _this.state = __assign({}, props);
        return _this;
    }
    Filter.prototype.render = function () {
        var _a = this.state, id = _a.id, children = _a.children;
        return React.createElement("filter", { id: id, key: id, children: children });
    };
    return Filter;
}(React.Component));
exports.Filter = Filter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9GaWx0ZXJzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDZCQUErQjtBQUcvQix1Q0FBdUM7QUFFdkMsc0JBQTZCLEVBQTJDO1FBQTFDLGNBQXdCLEVBQXhCLDZDQUF3QixFQUFFLG1CQUFlLEVBQWYsb0NBQWU7SUFDdEUsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDO1lBQ04scUNBQWEsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixHQUFHO1lBQ3RGLHNDQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxxQkFBcUIsR0FBRztZQUN0RixxQ0FBYSxFQUFFLEVBQUMscUJBQXFCLEVBQUMsR0FBRyxFQUFDLHNCQUFzQixFQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLG9CQUFvQixHQUFHO1NBQzlHLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDO1FBQ04sc0NBQWMsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFDLHFCQUFxQixHQUFHO1FBQ2hHLHFDQUFhLEVBQUUsRUFBQyxxQkFBcUIsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLG9CQUFvQixHQUFHO0tBQ2hHLENBQUM7QUFDSCxDQUFDO0FBYkQsb0NBYUM7QUFFRCxlQUFzQixFQUEyQztJQUNoRSxzQ0FBc0M7SUFDdEMsdUVBQXVFO1FBRmpELGNB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