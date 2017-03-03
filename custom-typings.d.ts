interface Window {
    Pvjs: any;
    Manipulator: any;
}

interface Pvjs {
    manipulator: any;
    highlighter: KaavioHighlighter;
    panZoom: any;
    selector: any;
}

interface KaavioHighlighter {
    highlight(stringSelector, group?, styles?): boolean;
    attenuate(node_id): any;
}