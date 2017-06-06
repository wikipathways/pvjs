import {Highlighter} from './highlighter';
import {Hider} from "./hider";
import {Zoomer} from "./zoomer";
import {Panner} from "./panner";
import * as ReactDOM from 'react-dom';

export interface Manipulator {
    toggleHighlight(entity_id: string, color: string): void;
    highlightOn(entity_id: string, color: string): void;
    highlightOff(entity_id:string): void;
    resetHighlighted(exclude?: string[]): void;
    hide(entity_id:string): void;
    show(entity_id: string): void;
    resetHidden(exclude?: string[]): void;
    panTo(entity_id: string | string[], animate: boolean): void;
    pan(coordinates: {x: number, y: number}, animate: boolean): void;
    resetPan(): void;
    zoom(zoom_perc: number, animate: boolean): void;
    zoomOn(entity_id: string, animate: boolean);
    zoomIn(): void;
    zoomOut(): void;
    resetZoom(): void;
    reset(): void;
    getEntities(): {
        id: string;
        kaavioType: string;
        textContent: string;
        types: string[];
    }[]
}

/**
 * Factory for the manipulation API
 * @param kaavioRef
 * @param panZoomRef
 * @param diagramRef
*/
export function getManipulator(kaavioRef, panZoomRef, diagramRef): Manipulator {
  const highlighter = new Highlighter(kaavioRef);
  const hider = new Hider(kaavioRef);
  const diagram = ReactDOM.findDOMNode(diagramRef);
  const zoomer = new Zoomer(kaavioRef, panZoomRef, diagram);
  const panner = new Panner(kaavioRef, panZoomRef, diagram);

  return <Manipulator>{
      toggleHighlight: highlighter.toggleHighlight.bind(highlighter),
      highlightOn: highlighter.highlightOn.bind(highlighter),
      highlightOff: highlighter.highlightOff.bind(highlighter),
      resetHighlighted: highlighter.resetHighlighted.bind(highlighter),
      hide: hider.hide.bind(hider),
      show: hider.show.bind(hider),
      resetHidden: hider.resetHidden.bind(hider),
      zoomOn: function(entity_id: string | string[]) {
          panner.panTo.bind(panner)(entity_id).then(() => {
              zoomer.zoomOn.bind(zoomer)(entity_id);
          });
      },
      zoomIn: zoomer.zoomIn.bind(zoomer),
      zoomOut: zoomer.zoomOut.bind(zoomer),
      zoom: zoomer.zoom.bind(zoomer),
      resetZoom: zoomer.resetZoom.bind(zoomer),
      panTo: panner.panTo.bind(panner),
      pan: panner.pan.bind(panner),
      resetPan: panner.resetPan.bind(panner),
      reset: function () {
          this.resetPan();
          this.resetZoom();
          this.resetHidden();
          this.resetHighlighted();
      },
      getEntities: function () {
          return kaavioRef.getEntities().map(entity => {
              return {
                  id: entity.id,
                  kaavioType: entity.kaavioType,
                  textContent: entity.textContent,
                  types: entity.type
              }
          });
      }
  }
}
