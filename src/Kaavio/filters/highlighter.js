"use strict";
var React = require("react");
function highlighter(id, color) {
    return {
        url: 'highlighter-for-' + id,
        filter: (React.createElement("filter", { id: "highlighter-for-" + id, key: "highlighter-for-" + id },
            React.createElement("feColorMatrix", { in: "SourceGraphic", type: "saturate", values: "0", result: "toHighlight" }),
            " ",
            React.createElement("feFlood", { floodColor: color, floodOpacity: "0.5", result: "highlight" }),
            React.createElement("feComposite", { in: "highlight", in2: "toHighlight", operator: "atop" })))
    };
}
exports.highlighter = highlighter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJoaWdobGlnaHRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDZCQUErQjtBQUMvQixxQkFBNEIsRUFBRSxFQUFFLEtBQUs7SUFDakMsTUFBTSxDQUFDO1FBQ0gsR0FBRyxFQUFFLGtCQUFrQixHQUFHLEVBQUU7UUFDNUIsTUFBTSxFQUFFLENBQ0EsZ0NBQVEsRUFBRSxFQUFFLGtCQUFrQixHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsa0JBQWtCLEdBQUcsRUFBRTtZQUM3RCx1Q0FBZSxFQUFFLEVBQUMsZUFBZSxFQUNsQixJQUFJLEVBQUMsVUFBVSxFQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGFBQWEsR0FBRzs7WUFDakUsaUNBQVMsVUFBVSxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxXQUFXLEdBQUc7WUFDcEUscUNBQWEsRUFBRSxFQUFDLFdBQVcsRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxNQUFNLEdBQUUsQ0FDMUQsQ0FDWjtLQUNSLENBQUE7QUFDTCxDQUFDO0FBWkQsa0NBWUMifQ==