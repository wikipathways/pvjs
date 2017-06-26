declare const edgeDrawers: {
    CurvedLine: {
        getPathSegments: (elbowPoints: any, elementId: any, markerStart: any, markerEnd: any) => {
            command: string;
            points: any[];
        }[];
        getPointAtPosition: (points: any, position: any) => {};
    };
    ElbowLine: {
        getPathSegments: (points: any, elementId: any) => {
            command: string;
            points: any[];
        }[];
        getPointAtPosition: (points: any, position: any) => {};
    };
    SegmentedLine: {
        getPathSegments: (points: any) => {
            command: string;
            points: any[];
        }[];
        getPointAtPosition: (points: any, position: any) => {};
    };
    StraightLine: {
        getPathSegments: (points: any) => {
            command: string;
            points: any[];
        }[];
        getPointAtPosition: (points: any, position: any) => {
            x: any;
            y: any;
        };
    };
};
export default edgeDrawers;
