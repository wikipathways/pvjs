import {Kaavio} from "../Kaavio";
export class Hider {
    kaavio: Kaavio;

    constructor(kaavio: Kaavio){
        this.kaavio = kaavio;
    }

    /**
     * Toggle the displaying of one entity.
     * @param entity_id - one identifier
     */
    toggleHidden(entity_id: string): void {
        const hidden = this.kaavio.isHidden(entity_id);
        if(hidden){
            this.show(entity_id);
        }
        else {
            this.hide(entity_id);
        }
    }

    /**
     * Hide one entity.
     * @param entity_id - one identifier
     */
    hide(entity_id: string): void {
        this.kaavio.pushHidden(entity_id);
    }

    /**
     * Show one entity
     * @param entity_id - one identifier
     */
    show(entity_id: string): void {
        this.kaavio.popHidden(entity_id);
    }

    /**
     * Un-hide all highlighted nodes except those in the exclude array.
     * @param exclude
     */
    resetHidden(exclude?: string[]): void {
        this.kaavio.resetHidden(exclude);
    }

}