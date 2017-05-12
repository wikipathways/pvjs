import {Kaavio} from "../Kaavio";

export class Highlighter {
    kaavio: Kaavio;
    constructor (kaavio: Kaavio) {
        this.kaavio = kaavio;
    }

    /**
     * Toggle the highlighting of one entity.
     * @param entity_id - one identifier
     * @param color - can be any css colour
     */
    toggleHighlight(entity_id: string, color: string): void {
        const highlighted = this.kaavio.isHighlighted(entity_id);
        if(highlighted){
            this.highlightOff(entity_id)
        }
        else {
            this.highlightOn(entity_id, color)
        }
    }

    /**
     * Turn on the highlighting of one entity.
     * Behaviour is to only change the highlighted entities if the entity_id or color changes.
     * @param entity_id - one identifier
     * @param color - can be any css colour
     */
    highlightOn(entity_id: string, color: string): void {
        if(! color) throw new Error("No color specified.");

        this.kaavio.pushHighlighted({
            node_id: entity_id,
            color: color
        });
    }

    /**
     * Turn off the highlighting of one entity.
     * @param entity_id - one identifier
     */
    highlightOff(entity_id: string): void {
        this.kaavio.popHighlighted(entity_id);
    }

    /**
     * Un-highlight all highlighted entities except those in the exclude array.
     * @param exclude
     */
    resetHighlighted(exclude?: string[]): void {
        this.kaavio.resetHighlighted(exclude);
    }
}