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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsdGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkZpbHRlcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSw2QkFBK0I7QUFHL0IsdUNBQXVDO0FBRXZDLHNCQUE2QixFQUEyQztRQUExQyxjQUF3QixFQUF4Qiw2Q0FBd0IsRUFBRSxtQkFBZSxFQUFmLG9DQUFlO0lBQ3RFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQztZQUNOLHFDQUFhLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxzQkFBc0IsR0FBRztZQUN0RixzQ0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMscUJBQXFCLEdBQUc7WUFDdEYscUNBQWEsRUFBRSxFQUFDLHFCQUFxQixFQUFDLEdBQUcsRUFBQyxzQkFBc0IsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxvQkFBb0IsR0FBRztTQUM5RyxDQUFDO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQztRQUNOLHNDQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBQyxxQkFBcUIsR0FBRztRQUNoRyxxQ0FBYSxFQUFFLEVBQUMscUJBQXFCLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxvQkFBb0IsR0FBRztLQUNoRyxDQUFDO0FBQ0gsQ0FBQztBQWJELG9DQWFDO0FBRUQsZUFBc0IsRUFBMkM7SUFDaEUsc0NBQXNDO0lBQ3RDLHVFQUF1RTtRQUZqRCxjQUF3QixFQUF4Qiw2Q0FBd0IsRUFBRSxtQkFBZSxFQUFm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