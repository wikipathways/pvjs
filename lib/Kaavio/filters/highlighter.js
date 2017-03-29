"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function highlighter(id, color) {
    return {
        url: 'highlighter-for-' + id,
        filter: (React.createElement("filter", { id: "highlighter-for-" + id, key: "highlighter-for-" + id },
            React.createElement("feColorMatrix", { in: "StrokePaint", type: "saturate", values: "0", result: "toHighlight" }),
            " ",
            React.createElement("feFlood", { floodColor: color, floodOpacity: "0.5", result: "highlight" }),
            React.createElement("feComposite", { in: "highlight", in2: "toHighlight", operator: "atop", result: "output" })))
    };
}
exports.highlighter = highlighter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvS2FhdmlvL2ZpbHRlcnMvaGlnaGxpZ2h0ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQStCO0FBQy9CLHFCQUE0QixFQUFFLEVBQUUsS0FBSztJQUNqQyxNQUFNLENBQUM7UUFDSCxHQUFHLEVBQUUsa0JBQWtCLEdBQUcsRUFBRTtRQUM1QixNQUFNLEVBQUUsQ0FDQSxnQ0FBUSxFQUFFLEVBQUUsa0JBQWtCLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxrQkFBa0IsR0FBRyxFQUFFO1lBQzdELHVDQUFlLEVBQUUsRUFBQyxhQUFhLEVBQ2hCLElBQUksRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsYUFBYSxHQUFHOztZQUNqRSxpQ0FBUyxVQUFVLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFdBQVcsR0FBRztZQUNwRSxxQ0FBYSxFQUFFLEVBQUMsV0FBVyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsUUFBUSxHQUFHLENBQzNFLENBQ1o7S0FDUixDQUFBO0FBQ0wsQ0FBQztBQVpELGtDQVlDIn0=