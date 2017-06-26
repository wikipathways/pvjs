export declare class Manipulator {
    props: any;
    renderFunc: () => void;
    constructor(renderFunc: (props) => void, initProps: any);
    highlightOn: (entityId: string, color: string) => void;
    highlightOff: (entityId: string) => void;
    toggleHighlight: (entityId: string, color: string) => void;
    resetHighlighted: (exclude?: any[]) => void;
    hide: (entityId: string) => void;
    show: (entityId: string) => void;
    toggleHidden: (entityId: string) => void;
    resetHidden: (exclude?: any[]) => void;
    zoomOn: (entityId: string | string[]) => void;
    resetZoom: () => void;
    panTo: (entityId: string | string[]) => void;
    resetPan: () => void;
    reset: () => void;
}
