import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Pvjs} from '../Pvjs';
import { cloneDeep } from 'lodash';
import * as WikiPathwaysDefaultDisplayStyle from '../WikiPathways.style';
import { loadDiagram } from '../wrappers/vanilla';

/**
 * A custom HTML element for WikiPathways Diagrams
 * See this guide: https://developers.google.com/web/fundamentals/getting-started/primers/customelements
 */
export class CustomElement extends HTMLElement {
    entities;

    constructor(){
        super();
        this.id = `wikipathways-pvjs-${Date.now()}`;
    }

    // TODO: camelCase -> snake-case
    static get observedAttributes() {
        return ['wpId', 'version', 'showPanZoomControls', 'detailPanelEnabled', 'showPanZoomControls',
            'panZoomLocked', 'highlightedEntities', 'hiddenEntities', 'pannedEntities', 'zoomedEntities'];
    }

    connectedCallback() {
        if(! this.getAttribute('wpId')) return;
        this.renderPvjs();
    }

    attributeChangedCallback(){
        if(! this.getAttribute('wpId')) return;
        this.renderPvjs();
    }

    private basicSetter(name, val) {
        if(val) {
            this.setAttribute(name, val);
        }
        else {
            this.removeAttribute(name);
        }
    }

    get wpId() {
        return this.getAttribute('wpId');
    }
    set wpId(val) {
        this.basicSetter('wpId', val);
    }

    get version() {
        return this.getAttribute('version') || 0;
    }
    set version(val) {
        this.basicSetter('version', val)
    }

    get showPanZoomControls() {
        return this.getAttribute('showPanZoomControls');
    }
    set showPanZoomControls(val) {
        this.basicSetter('showPanZoomControls', val)
    }

    get detailPanelEnabled() {
        return this.getAttribute('detailPanelEnabled');
    }
    set detailPanelEnabled(val) {
        this.basicSetter('detailPanelEnabled', val)
    }

    get panZoomLocked() {
        return this.getAttribute('panZoomLocked');
    }
    set panZoomLocked(val) {
        this.basicSetter('panZoomLocked', val);
    }

    arrayGetter(name) {
        const attr = this.getAttribute(name);
        if(attr)
            return attr.split(',');
        else return [];
    }
    arraySetter(name, val) {
        const toSet = val.reduce((acc, el, i) => `${acc}${el}${i === val.length - 1 ? '' : ','}`, '');
        this.basicSetter(name, toSet);
    }

    get highlightedEntities() {
        const highlightedEntities = this.arrayGetter('highlightedEntities');

        return highlightedEntities.map(singleHighlighted => {
            const split = singleHighlighted.split(':');
            return {
                entityId: split[0],
                color: split[1],
            }
        });
    }
    set highlightedEntities(val){
        const toSet = val.map(el => `${el.entityId}:${el.color}`);
        this.arraySetter('highlightedEntities', toSet);
    }

    get hiddenEntities() {
        return this.arrayGetter('hiddenEntities')
    }
    set hiddenEntities(val) {
        this.arraySetter('hiddenEntities', val)
    }

    get zoomedEntities() {
        return this.arrayGetter('zoomedEntities')
    }
    set zoomedEntities(val) {
        this.arraySetter('zoomedEntities', val);
    }

    get pannedEntities() {
        return this.arrayGetter('pannedEntities')
    }
    set pannedEntities(val) {
        this.arraySetter('pannedEntities', val);
    }

    highlightOn(entityId: string, color: string) {
        this.highlightedEntities = this.highlightedEntities
            .filter(single => single.entityId !== entityId)
            .concat([{entityId, color}]);
        this.renderPvjs();
    };

    highlightOff(entityId: string) {
        this.highlightedEntities = this.highlightedEntities.filter(single => single.entityId !== entityId);
        this.renderPvjs();
    };

    toggleHighlight(entityId: string, color: string) {
        const isHighlighted = !! this.highlightedEntities
            .filter(single => single.entityId === entityId)[0];
        if (isHighlighted) this.highlightOff(entityId);
        else this.highlightOn(entityId, color);
    };

    resetHighlighted(exclude = []) {
        this.highlightedEntities = this.highlightedEntities
            .filter(single => exclude.indexOf(single.entityId) > -1);
        this.renderPvjs();
    };

    hide(entityId: string) {
        this.hiddenEntities = this.hiddenEntities
            .filter(single => single === entityId)
            .concat([entityId]);
        this.renderPvjs();
    };

    show(entityId: string) {
        this.hiddenEntities = this.hiddenEntities.filter(single => single !== entityId);
        this.renderPvjs();
    };

    toggleHidden(entityId: string) {
        const isHidden = this.hiddenEntities.indexOf(entityId) > -1;
        if (isHidden) this.show(entityId);
        else this.hide(entityId);
    };

    resetHidden(exclude = []) {
        this.hiddenEntities = exclude.slice();
        this.renderPvjs();
    };

    zoomOn(entityId: string | string[]) {
        let toZoom;
        if (Array.isArray(entityId))
            toZoom = entityId;
        else
            toZoom = [entityId];

        this.zoomedEntities = toZoom;
        this.pannedEntities = toZoom;
        this.renderPvjs();
    };

    resetZoom() {
        this.zoomedEntities = [];
        this.pannedEntities = [];
        this.renderPvjs();
    };

    panTo(entityId: string | string[]) {
        let toPan;
        if (! Array.isArray(entityId))
            toPan = [entityId];
        else
            toPan = entityId;

        this.pannedEntities = toPan;
        this.renderPvjs();
    };

    resetPan = () => {
        this.pannedEntities = [];
        this.renderPvjs();
    };

    reset = () => {
        this.pannedEntities = [];
        this.zoomedEntities = [];
        this.hiddenEntities = [];
        this.highlightedEntities = [];
        this.renderPvjs();
    };

    private renderPvjs(){
        const props = CustomElement.observedAttributes.reduce((acc, singleAttr) => {
           return {
               ...acc,
               [singleAttr]: this[singleAttr]
           }
        }, {});
        ReactDOM.render(<Pvjs {...props} onReady={entities => this.entities = entities} />, this)
    }
}
