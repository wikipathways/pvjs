"use strict";
var React = require("react");
// TODO groupChildren were originally drawn as markerStart, but markerEnd is actually used much
// more often than markerStart. So for performance and simplicity reasons, it would be better that
// the groupChildren were drawn for markerEnd. When we redraw them, we can get rid of the extra g
// element and its transform for each markerDrawer below.
// NOTE: All markers put the groupChildren (visible marker contents) inside a group g element.
// Draw the groupChildren for markerEnd. If a marker is markerStart, Kaavio will rotate it 180deg.
var markerDrawers = {
    Arrow: function (backgroundColor, color) {
        var markerWidth = 12;
        var markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "Arrow", transform: "rotate(180, " + markerWidth / 2 + ", " + markerHeight / 2 + ")" },
                    React.createElement("rect", { x: "0", y: "5.4", width: "2", height: "1.2", stroke: backgroundColor, fill: backgroundColor }),
                    React.createElement("polygon", { points: "12,11 0,6 12,1", strokeWidth: "0", fill: color }))
            ],
        };
    },
    'mim-binding': function (backgroundColor, color) {
        var markerWidth = 12;
        var markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-binding", transform: "rotate(180, " + markerWidth / 2 + ", " + markerHeight / 2 + ")" },
                    React.createElement("rect", { x: "0", y: "5.4", width: "2", height: "1.2", stroke: backgroundColor, fill: backgroundColor }),
                    React.createElement("polygon", { points: "12,12 0,6 12,0 5,6", strokeWidth: "0", fill: color }))
            ],
        };
    },
    'mim-necessary-stimulation': function (backgroundColor, color) {
        var markerWidth = 16;
        var markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-necessary-stimulation", transform: "rotate(180, " + markerWidth / 2 + ", " + markerHeight / 2 + ")" },
                    React.createElement("rect", { x: "0", y: "5.4", width: "2", height: "1.2", stroke: "none", fill: backgroundColor }),
                    React.createElement("line", { x1: "14", y1: "0", x2: "14", y2: "12", stroke: color, strokeWidth: "1", fill: "none" }),
                    React.createElement("line", { x1: "16", y1: "6", x2: "16", y2: "6", stroke: "none", fill: "none" }),
                    React.createElement("polygon", { points: "0,6 9,11 9,1", stroke: color, strokeWidth: "1", fill: backgroundColor }))
            ],
        };
    },
    'mim-stimulation': function (backgroundColor, color) {
        var markerWidth = 12;
        var markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-stimulation", transform: "rotate(180, " + markerWidth / 2 + ", " + markerHeight / 2 + ")" },
                    React.createElement("rect", { x: "0", y: "5.4", width: "2", height: "1.2", stroke: "none", fill: backgroundColor }),
                    React.createElement("line", { x1: "12", y1: "6", x2: "12", y2: "6", stroke: "none", fill: "none" }),
                    React.createElement("polygon", { points: "0,6 11,11 11,1", stroke: color, strokeWidth: "1", fill: backgroundColor }))
            ],
        };
    },
    'mim-modification': function (backgroundColor, color) {
        var markerWidth = 12;
        var markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-modification", transform: "rotate(180, " + markerWidth / 2 + ", " + markerHeight / 2 + ")" },
                    React.createElement("rect", { x: "0", y: "5.4", width: "2", height: "1.2", stroke: backgroundColor, fill: backgroundColor }),
                    React.createElement("polygon", { points: "0,6 11,11 11,1", strokeWidth: "0", fill: color }))
            ],
        };
    },
    'mim-catalysis': function (backgroundColor, color) {
        var markerWidth = 12;
        var markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-catalysis", transform: "rotate(180, " + markerWidth / 2 + ", " + markerHeight / 2 + ")" },
                    React.createElement("circle", { cx: "6", cy: "6", r: "5.3px", stroke: color, strokeWidth: "1", fill: backgroundColor }))
            ],
        };
    },
    'mim-cleavage': function (backgroundColor, color) {
        var markerWidth = 20;
        var markerHeight = 30;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-cleavage", transform: "rotate(180, " + markerWidth / 2 + ", " + markerHeight / 2 + ")" },
                    React.createElement("rect", { x: "0", y: "14.3", width: "18.4", height: "1.4", stroke: backgroundColor, fill: backgroundColor }),
                    React.createElement("line", { x1: "18", y1: "14.5", x2: "18", y2: "30", stroke: color, strokeWidth: "1" }),
                    React.createElement("line", { x1: "18", y1: "30", x2: "0", y2: "0", stroke: color, strokeWidth: "1" }))
            ],
        };
    },
    'mim-covalent-bond': function (backgroundColor, color) {
        var markerWidth = 12;
        var markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-covalent-bond", transform: "rotate(180, " + markerWidth / 2 + ", " + markerHeight / 2 + ")" },
                    React.createElement("rect", { x: "0", y: "0", width: "0", height: "0", stroke: backgroundColor, strokeWidth: "0", fill: backgroundColor }))
            ],
        };
    },
    'mim-transcription-translation': function (backgroundColor, color) {
        var markerWidth = 20;
        var markerHeight = 24;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-transcription-translation", transform: "rotate(180, " + markerWidth / 2 + ", " + markerHeight / 2 + ")" },
                    React.createElement("rect", { x: "0", y: "11", width: "12", height: "2", stroke: backgroundColor, fill: backgroundColor }),
                    React.createElement("line", { x1: "15", y1: "12", x2: "15", y2: "5", stroke: color, strokeWidth: "1", fill: "none" }),
                    React.createElement("line", { x1: "15.5", y1: "5", x2: "8", y2: "5", stroke: color, strokeWidth: "1", fill: "none" }),
                    React.createElement("polygon", { points: "0,5 8,1 8,9", stroke: color, strokeWidth: "1", fill: backgroundColor }))
            ],
        };
    },
    'mim-gap': function (backgroundColor, color) {
        var markerWidth = 12;
        var markerHeight = 12;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "mim-gap", transform: "rotate(180, " + markerWidth / 2 + ", " + markerHeight / 2 + ")" },
                    React.createElement("rect", { x: "0", y: "5.3", width: "8", height: "1.4", stroke: "none", fill: backgroundColor }))
            ],
        };
    },
    TBar: function (backgroundColor, color) {
        var markerWidth = 10;
        var markerHeight = 20;
        return {
            markerAttributes: {
                markerWidth: markerWidth,
                markerHeight: markerHeight,
            },
            groupChildren: [
                React.createElement("g", { key: "TBar", transform: "rotate(180, " + markerWidth / 2 + ", " + markerHeight / 2 + ")" },
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = markerDrawers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyRHJhd2Vycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtlckRyYXdlcnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSw2QkFBK0I7QUFHL0IsK0ZBQStGO0FBQy9GLGtHQUFrRztBQUNsRyxpR0FBaUc7QUFDakcseURBQXlEO0FBRXpELDhGQUE4RjtBQUM5RixrR0FBa0c7QUFDbEcsSUFBSSxhQUFhLEdBQVE7SUFDeEIsS0FBSyxFQUFFLFVBQVMsZUFBZSxFQUFFLEtBQUs7UUFDckMsSUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN4QixNQUFNLENBQUM7WUFDTixnQkFBZ0IsRUFBRTtnQkFDakIsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLFlBQVksRUFBRSxZQUFZO2FBQzFCO1lBQ0QsYUFBYSxFQUFFO2dCQUNkLDJCQUFHLEdBQUcsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFFLGlCQUFnQixXQUFXLEdBQUcsQ0FBQyxVQUFPLFlBQVksR0FBRyxDQUFDLE1BQUk7b0JBQ25GLDhCQUFNLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxJQUFJLEVBQUUsZUFBZSxHQUFHO29CQUM1RixpQ0FBUyxNQUFNLEVBQUMsZ0JBQWdCLEVBQUMsV0FBVyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUUsS0FBSyxHQUFHLENBQzVEO2FBQ0o7U0FDRCxDQUFDO0lBQ0gsQ0FBQztJQUNELGFBQWEsRUFBRSxVQUFTLGVBQWUsRUFBRSxLQUFLO1FBQzdDLElBQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFNLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDeEIsTUFBTSxDQUFDO1lBQ04sZ0JBQWdCLEVBQUU7Z0JBQ2pCLFdBQVcsRUFBRSxXQUFXO2dC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