import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Pvjs } from '../Pvjs';
import * as WikiPathwaysDefaultDisplayStyle from '../WikiPathways.style';
/**
 * A custom HTML element for WikiPathways Diagrams
 * See this guide: https://developers.google.com/web/fundamentals/getting-started/primers/customelements
 */
class WikiPathwaysElement extends HTMLElement {
    constructor() {
        super();
    }
    static get observedAttributes() {
        return ['about', 'version'];
    }
    connectedCallback() {
        if (!this.about)
            return;
        this.createPvjs();
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.about)
            return;
        this.createPvjs();
    }
    /**
     * Get the unique identifier for the desired pathway
     * E.g. http://identifiers.org/wikipathways/WP1
     * @returns {string|null}
     */
    get about() {
        return this.getAttribute('about');
    }
    set about(val) {
        if (val) {
            this.setAttribute('about', val);
        }
        else {
            this.removeAttribute('about');
        }
    }
    /**
     * Pathways at WikiPathways are versioned. Get the version
     * E.g. WP has version 73346
     * @returns {string|null}
     */
    get version() {
        return this.getAttribute('version');
    }
    set version(val) {
        if (val) {
            this.setAttribute('version', val);
        }
        else {
            this.removeAttribute('version');
        }
    }
    get customStyle() {
        return this.getAttribute('customStyle');
    }
    set customStyle(val) {
        if (val) {
            this.setAttribute('customStyle', val);
        }
        else {
            this.removeAttribute('customStyle');
        }
    }
    createPvjs() {
        // TODO: Add props: src, alt, customStyles, displayErrors, displayWarnings, displaySuccess, fitToContainer,
        // highlights, hashEditorState
        const props = {
            about: 'http://identifiers.org/wikipathways/' + this.about,
            version: this.version,
            customStyle: this.customStyle ? this.customStyle : WikiPathwaysDefaultDisplayStyle,
            showPanZoomControls: true
        };
        ReactDOM.render(React.createElement(Pvjs, Object.assign({}, props)), this);
    }
}
/**
 * Web Component wrapper around the Pvjs react component.
 * Insert this component into your HTML to use Pvjs:
 * <wikipathways-pvjs about="http://identifiers.org/wikipathways/WP1" />
 */
function registerWikiPathwaysPvjsElement() {
    // Public: WikiPathwaysPvjsPrototype constructor.
    //
    //   # => <wikipathways-pvjs></wikipathways-pvjs>
    //
    window.customElements.define('wikipathways-pvjs', WikiPathwaysElement);
}
if (document.readyState === 'complete') {
    registerWikiPathwaysPvjsElement();
}
else {
    window.addEventListener('load', function listener(event) {
        window.removeEventListener('load', listener, false);
        registerWikiPathwaysPvjsElement();
    }, false);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHZqcy53ZWJjb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd3JhcHBlcnMvcHZqcy53ZWJjb21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxLQUFLLE1BQU0sT0FBTyxDQUFDO0FBQy9CLE9BQU8sS0FBSyxRQUFRLE1BQU0sV0FBVyxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDN0IsT0FBTyxLQUFLLCtCQUErQixNQUFNLHVCQUF1QixDQUFDO0FBSXpFOzs7R0FHRztBQUNILHlCQUEwQixTQUFRLFdBQVc7SUFDNUM7UUFDQyxLQUFLLEVBQUUsQ0FBQztJQUNULENBQUM7SUFFRCxNQUFNLEtBQUssa0JBQWtCO1FBQzVCLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUJBQWlCO1FBQ2hCLEVBQUUsQ0FBQSxDQUFDLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHdCQUF3QixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUTtRQUNoRCxFQUFFLENBQUEsQ0FBQyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFDRDs7OztPQUlHO0lBQ0gsSUFBSSxLQUFLO1FBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELElBQUksS0FBSyxDQUFDLEdBQUc7UUFDWixFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO1lBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0YsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLE9BQU87UUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBSSxPQUFPLENBQUMsR0FBRztRQUNkLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7WUFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDTCxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7SUFDRixDQUFDO0lBRUQsSUFBSSxXQUFXO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELElBQUksV0FBVyxDQUFDLEdBQUc7UUFDbEIsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQztZQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDcEMsQ0FBQztJQUNGLENBQUM7SUFFTyxVQUFVO1FBQ2pCLDJHQUEyRztRQUMzRyw4QkFBOEI7UUFDOUIsTUFBTSxLQUFLLEdBQUc7WUFDYixLQUFLLEVBQUUsc0NBQXNDLEdBQUcsSUFBSSxDQUFDLEtBQUs7WUFDMUQsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsK0JBQStCO1lBQ2pGLG1CQUFtQixFQUFFLElBQUk7U0FDekIsQ0FBQztRQUVGLFFBQVEsQ0FBQyxNQUFNLENBQ2Qsb0JBQUMsSUFBSSxvQkFBSyxLQUFLLEVBQUksRUFDbkIsSUFBSSxDQUNKLENBQUE7SUFDRixDQUFDO0NBQ0Q7QUFFRDs7OztHQUlHO0FBQ0g7SUFFQyxpREFBaUQ7SUFDakQsRUFBRTtJQUNGLGlEQUFpRDtJQUNqRCxFQUFFO0lBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLCtCQUErQixFQUFFLENBQUM7QUFDcEMsQ0FBQztBQUFDLElBQUksQ0FBQyxDQUFDO0lBQ04sTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxrQkFBa0IsS0FBSztRQUNyRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRCwrQkFBK0IsRUFBRSxDQUFDO0lBQ3BDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNaLENBQUMifQ==