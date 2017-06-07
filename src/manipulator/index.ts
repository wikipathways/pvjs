import { find, pullAllBy, partial } from 'lodash';

export class Manipulator {
    props: any;
    renderFunc: () => void;
    constructor(renderFunc: (props) => void, initProps) {
        this.props = Object.assign({}, initProps, {
            highlightedEntities: [],
            hiddenEntities: [],
            zoomedEntities: [],
            pannedEntities: []
        });

        this.renderFunc = partial(renderFunc, this.props);
    }

    highlightOn = (entityId: string, color: string) => {
        this.props.highlightedEntities = this.props.highlightedEntities
            .filter(single => single.entityId !== entityId)
            .concat([{entityId, color}]);
        this.renderFunc();
    };

    highlightOff = (entityId: string) => {
        this.props.highlightedEntities = this.props.highlightedEntities.filter(single => single.entityId !== entityId);
        this.renderFunc();
    };

    toggleHighlight = (entityId: string, color: string) => {
        const isHighlighted = !! this.props.hiddenEntities
            .filter(single => single.entityId === entityId)[0];

        if (isHighlighted) this.highlightOff(entityId);
        else this.highlightOn(entityId, color);
    };

    resetHighlighted = (exclude = []) => {
        this.props.highlightedEntities = this.props.highlightedEntities
            .filter(single => exclude.indexOf(single.entityId) > -1);
        this.renderFunc();
    };

    hide = (entityId: string) => {
        this.props.hiddenEntities = this.props.hiddenEntities
            .filter(single => single === entityId)
            .concat([entityId]);
        this.renderFunc();
    };

    show = (entityId: string) => {
        this.props.hiddenEntities = this.props.hiddenEntities.filter(single => single !== entityId);
        this.renderFunc();
    };

    toggleHidden = (entityId: string) => {
        const isHidden = this.props.hiddenEntities.indexOf(entityId) > -1;
        if (isHidden) this.show(entityId);
        else this.hide(entityId);
    };

    resetHidden = (exclude = []) => {
      this.props.hiddenEntities = exclude.slice();
      this.renderFunc();
    };

    zoomOn = (entityId: string | string[]) => {
        let toZoom;
        if (Array.isArray(entityId))
            toZoom = entityId;
        else
            toZoom = [entityId];

        this.props.zoomedEntities = toZoom;
        this.props.pannedEntities = toZoom;
        this.renderFunc();
    };

    resetZoom = () => {
        this.props.zoomedEntities = [];
        this.props.pannedEntities = [];
        this.renderFunc();
    };

    panTo = (entityId: string | string[]) => {
        let toPan;
        if (! Array.isArray(entityId))
            toPan = [entityId];
        else
            toPan = entityId;

        this.props.pannedEntities = toPan;
        this.renderFunc();
    };

    resetPan = () => {
        this.props.pannedEntities = [];
        this.renderFunc();
    };

    reset = () => {
        this.props.pannedEntities = [];
        this.props.zoomedEntities = [];
        this.props.hiddenEntities = [];
        this.props.highlightedEntities = [];
        this.renderFunc();
    }
}