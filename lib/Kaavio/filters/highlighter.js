import * as React from 'react';
export function highlighter(id, color) {
    return {
        url: 'highlighter-for-' + id,
        filter: (React.createElement("filter", { id: "highlighter-for-" + id, key: "highlighter-for-" + id },
            React.createElement("feColorMatrix", { in: "StrokePaint", type: "saturate", values: "0", result: "toHighlight" }),
            " ",
            React.createElement("feFlood", { floodColor: color, floodOpacity: "0.5", result: "highlight" }),
            React.createElement("feComposite", { in: "highlight", in2: "toHighlight", operator: "atop", result: "output" })))
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlnaGxpZ2h0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvS2FhdmlvL2ZpbHRlcnMvaGlnaGxpZ2h0ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE1BQU0sc0JBQXNCLEVBQUUsRUFBRSxLQUFLO0lBQ2pDLE1BQU0sQ0FBQztRQUNILEdBQUcsRUFBRSxrQkFBa0IsR0FBRyxFQUFFO1FBQzVCLE1BQU0sRUFBRSxDQUNBLGdDQUFRLEVBQUUsRUFBRSxrQkFBa0IsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLGtCQUFrQixHQUFHLEVBQUU7WUFDN0QsdUNBQWUsRUFBRSxFQUFDLGFBQWEsRUFDaEIsSUFBSSxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxhQUFhLEdBQUc7O1lBQ2pFLGlDQUFTLFVBQVUsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsV0FBVyxHQUFHO1lBQ3BFLHFDQUFhLEVBQUUsRUFBQyxXQUFXLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxRQUFRLEdBQUcsQ0FDM0UsQ0FDWjtLQUNSLENBQUE7QUFDTCxDQUFDIn0=