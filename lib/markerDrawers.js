import * as React from 'react';
// TODO groupChildren were originally drawn as markerStart, but markerEnd is actually used much
// more often than markerStart. So for performance and simplicity reasons, it would be better that
// the groupChildren were drawn for markerEnd. When we redraw them, we can get rid of the extra g
// element and its transform for each markerDrawer below.
// NOTE: All markers put the groupChildren (visible marker contents) inside a group g element.
// Draw the groupChildren for markerEnd. If a marker is markerStart, Kaavio will rotate it 180deg.
let markerDrawers = {
    Arrow: function (backgroundColor, color) {
        const markerWidth = 12;
        const markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "Arrow", transform: `rotate(180, ${markerWidth / 2}, ${markerHeight / 2})` },
                    React.createElement("rect", { x: "0", y: "5.4", width: "2", height: "1.2", stroke: backgroundColor, fill: backgroundColor }),
                    React.createElement("polygon", { points: "12,11 0,6 12,1", strokeWidth: "0", fill: color }))
            ],
        };
    },
    'mim-binding': function (backgroundColor, color) {
        const markerWidth = 12;
        const markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-binding", transform: `rotate(180, ${markerWidth / 2}, ${markerHeight / 2})` },
                    React.createElement("rect", { x: "0", y: "5.4", width: "2", height: "1.2", stroke: backgroundColor, fill: backgroundColor }),
                    React.createElement("polygon", { points: "12,12 0,6 12,0 5,6", strokeWidth: "0", fill: color }))
            ],
        };
    },
    'mim-necessary-stimulation': function (backgroundColor, color) {
        const markerWidth = 16;
        const markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-necessary-stimulation", transform: `rotate(180, ${markerWidth / 2}, ${markerHeight / 2})` },
                    React.createElement("rect", { x: "0", y: "5.4", width: "2", height: "1.2", stroke: "none", fill: backgroundColor }),
                    React.createElement("line", { x1: "14", y1: "0", x2: "14", y2: "12", stroke: color, strokeWidth: "1", fill: "none" }),
                    React.createElement("line", { x1: "16", y1: "6", x2: "16", y2: "6", stroke: "none", fill: "none" }),
                    React.createElement("polygon", { points: "0,6 9,11 9,1", stroke: color, strokeWidth: "1", fill: backgroundColor }))
            ],
        };
    },
    'mim-stimulation': function (backgroundColor, color) {
        const markerWidth = 12;
        const markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-stimulation", transform: `rotate(180, ${markerWidth / 2}, ${markerHeight / 2})` },
                    React.createElement("rect", { x: "0", y: "5.4", width: "2", height: "1.2", stroke: "none", fill: backgroundColor }),
                    React.createElement("line", { x1: "12", y1: "6", x2: "12", y2: "6", stroke: "none", fill: "none" }),
                    React.createElement("polygon", { points: "0,6 11,11 11,1", stroke: color, strokeWidth: "1", fill: backgroundColor }))
            ],
        };
    },
    'mim-modification': function (backgroundColor, color) {
        const markerWidth = 12;
        const markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-modification", transform: `rotate(180, ${markerWidth / 2}, ${markerHeight / 2})` },
                    React.createElement("rect", { x: "0", y: "5.4", width: "2", height: "1.2", stroke: backgroundColor, fill: backgroundColor }),
                    React.createElement("polygon", { points: "0,6 11,11 11,1", strokeWidth: "0", fill: color }))
            ],
        };
    },
    'mim-catalysis': function (backgroundColor, color) {
        const markerWidth = 12;
        const markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-catalysis", transform: `rotate(180, ${markerWidth / 2}, ${markerHeight / 2})` },
                    React.createElement("circle", { cx: "6", cy: "6", r: "5.3px", stroke: color, strokeWidth: "1", fill: backgroundColor }))
            ],
        };
    },
    'mim-cleavage': function (backgroundColor, color) {
        const markerWidth = 20;
        const markerHeight = 30;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-cleavage", transform: `rotate(180, ${markerWidth / 2}, ${markerHeight / 2})` },
                    React.createElement("rect", { x: "0", y: "14.3", width: "18.4", height: "1.4", stroke: backgroundColor, fill: backgroundColor }),
                    React.createElement("line", { x1: "18", y1: "14.5", x2: "18", y2: "30", stroke: color, strokeWidth: "1" }),
                    React.createElement("line", { x1: "18", y1: "30", x2: "0", y2: "0", stroke: color, strokeWidth: "1" }))
            ],
        };
    },
    'mim-covalent-bond': function (backgroundColor, color) {
        const markerWidth = 12;
        const markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-covalent-bond", transform: `rotate(180, ${markerWidth / 2}, ${markerHeight / 2})` },
                    React.createElement("rect", { x: "0", y: "0", width: "0", height: "0", stroke: backgroundColor, strokeWidth: "0", fill: backgroundColor }))
            ],
        };
    },
    'mim-transcription-translation': function (backgroundColor, color) {
        const markerWidth = 20;
        const markerHeight = 24;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-transcription-translation", transform: `rotate(180, ${markerWidth / 2}, ${markerHeight / 2})` },
                    React.createElement("rect", { x: "0", y: "11", width: "12", height: "2", stroke: backgroundColor, fill: backgroundColor }),
                    React.createElement("line", { x1: "15", y1: "12", x2: "15", y2: "5", stroke: color, strokeWidth: "1", fill: "none" }),
                    React.createElement("line", { x1: "15.5", y1: "5", x2: "8", y2: "5", stroke: color, strokeWidth: "1", fill: "none" }),
                    React.createElement("polygon", { points: "0,5 8,1 8,9", stroke: color, strokeWidth: "1", fill: backgroundColor }))
            ],
        };
    },
    'mim-gap': function (backgroundColor, color) {
        const markerWidth = 12;
        const markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-gap", transform: `rotate(180, ${markerWidth / 2}, ${markerHeight / 2})` },
                    React.createElement("rect", { x: "0", y: "5.3", width: "8", height: "1.4", stroke: "none", fill: backgroundColor }))
            ],
        };
    },
    TBar: function (backgroundColor, color) {
        const markerWidth = 10;
        const markerHeight = 20;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "TBar", transform: `rotate(180, ${markerWidth / 2}, ${markerHeight / 2})` },
                    React.createElement("rect", { x: "0", y: "9", width: "8", height: "2", fill: backgroundColor }),
                    React.createElement("line", { x: "0", y: "0", width: "12", height: "12", stroke: color, strokeWidth: "1.8", x1: "7", y1: "0", x2: "7", y2: "20" }))
            ],
        };
    },
};
markerDrawers['mim-inhibition'] = markerDrawers.TBar;
markerDrawers['mim-conversion'] = markerDrawers.Arrow;
// TODO the branching markerDrawers are currently just be copies of Arrow,
// because we didn't have time to draw them. But we should either delete
// these or else draw them properly.
markerDrawers['mim-branching-left'] = markerDrawers.Arrow;
markerDrawers['mim-branching-right'] = markerDrawers.Arrow;
export default markerDrawers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyRHJhd2Vycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXJrZXJEcmF3ZXJzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUcvQiwrRkFBK0Y7QUFDL0Ysa0dBQWtHO0FBQ2xHLGlHQUFpRztBQUNqRyx5REFBeUQ7QUFFekQsOEZBQThGO0FBQzlGLGtHQUFrRztBQUNsRyxJQUFJLGFBQWEsR0FBUTtJQUN4QixLQUFLLEVBQUUsVUFBUyxlQUFlLEVBQUUsS0FBSztRQUNyQyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdkIsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQztZQUNOLGdCQUFnQixFQUFFO2dCQUNqQixXQUFXLEVBQUUsV0FBVztnQkFDeEIsWUFBWSxFQUFFLFlBQVk7YUFDMUI7WUFDRCxhQUFhLEVBQUU7Z0JBQ2QsMkJBQUcsR0FBRyxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUUsZUFBZ0IsV0FBVyxHQUFHLENBQUUsS0FBTSxZQUFZLEdBQUcsQ0FBRSxHQUFHO29CQUNuRiw4QkFBTSxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLGVBQWUsR0FBRztvQkFDNUYsaUNBQVMsTUFBTSxFQUFDLGdCQUFnQixFQUFDLFdBQVcsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFFLEtBQUssR0FBRyxDQUM1RDthQUNKO1NBQ0QsQ0FBQztJQUNILENBQUM7SUFDRCxhQUFhLEVBQUUsVUFBUyxlQUFlLEVBQUUsS0FBSztRQUM3QyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdkIsTUFBTSxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sQ0FBQztZQUNOLGdCQUFnQixF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