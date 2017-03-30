"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
require("bootstrap/dist/css/bootstrap.min.css");
var Pvjs_1 = require("../Pvjs");
var WikiPathwaysDefaultDisplayStyle = require("../WikiPathways.style");
/**
 * A custom HTML element for WikiPathways Diagrams
 * See this guide: https://developers.google.com/web/fundamentals/getting-started/primers/customelements
 */
var WikiPathwaysElement = (function (_super) {
    __extends(WikiPathwaysElement, _super);
    function WikiPathwaysElement() {
        return _super.call(this) || this;
    }
    Object.defineProperty(WikiPathwaysElement, "observedAttributes", {
        get: function () {
            return ['about', 'version'];
        },
        enumerable: true,
        configurable: true
    });
    WikiPathwaysElement.prototype.connectedCallback = function () {
        if (!this.about)
            return;
        this.createPvjs();
    };
    WikiPathwaysElement.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        if (!this.about)
            return;
        this.createPvjs();
    };
    Object.defineProperty(WikiPathwaysElement.prototype, "about", {
        /**
         * Get the unique identifier for the desired pathway
         * E.g. http://identifiers.org/wikipathways/WP1
         * @returns {string|null}
         */
        get: function () {
            return this.getAttribute('about');
        },
        set: function (val) {
            if (val) {
                this.setAttribute('about', val);
            }
            else {
                this.removeAttribute('about');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WikiPathwaysElement.prototype, "version", {
        /**
         * Pathways at WikiPathways are versioned. Get the version
         * E.g. WP has version 73346
         * @returns {string|null}
         */
        get: function () {
            return this.getAttribute('version');
        },
        set: function (val) {
            if (val) {
                this.setAttribute('version', val);
            }
            else {
                this.removeAttribute('version');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WikiPathwaysElement.prototype, "customStyle", {
        get: function () {
            return this.getAttribute('customStyle');
        },
        set: function (val) {
            if (val) {
                this.setAttribute('customStyle', val);
            }
            else {
                this.removeAttribute('customStyle');
            }
        },
        enumerable: true,
        configurable: true
    });
    WikiPathwaysElement.prototype.createPvjs = function () {
        // TODO: Add props: src, alt, customStyles, displayErrors, displayWarnings, displaySuccess, fitToContainer,
        // highlights, hashEditorState
        var props = {
            about: 'http://identifiers.org/wikipathways/' + this.about,
            version: this.version,
            customStyle: this.customStyle ? this.customStyle : WikiPathwaysDefaultDisplayStyle,
            showPanZoomControls: true
        };
        ReactDOM.render(React.createElement(Pvjs_1.Pvjs, __assign({}, props)), this);
    };
    return WikiPathwaysElement;
}(HTMLElement));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHZqcy53ZWJjb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd3JhcHBlcnMvcHZqcy53ZWJjb21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkJBQStCO0FBQy9CLG9DQUFzQztBQUN0QyxnREFBOEM7QUFDOUMsZ0NBQTZCO0FBQzdCLHVFQUF5RTtBQUl6RTs7O0dBR0c7QUFDSDtJQUFrQyx1Q0FBVztJQUM1QztlQUNDLGlCQUFPO0lBQ1IsQ0FBQztJQUVELHNCQUFXLHlDQUFrQjthQUE3QjtZQUNDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELCtDQUFpQixHQUFqQjtRQUNDLEVBQUUsQ0FBQSxDQUFDLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUFDLE1BQU0sQ0FBQztRQUN4QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHNEQUF3QixHQUF4QixVQUF5QixJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVE7UUFDaEQsRUFBRSxDQUFBLENBQUMsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBTUQsc0JBQUksc0NBQUs7UUFMVDs7OztXQUlHO2FBQ0g7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxDQUFDO2FBRUQsVUFBVSxHQUFHO1lBQ1osRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNqQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBQ0YsQ0FBQzs7O09BVEE7SUFnQkQsc0JBQUksd0NBQU87UUFMWDs7OztXQUlHO2FBQ0g7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNyQyxDQUFDO2FBRUQsVUFBWSxHQUFHO1lBQ2QsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqQyxDQUFDO1FBQ0YsQ0FBQzs7O09BVEE7SUFXRCxzQkFBSSw0Q0FBVzthQUFmO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekMsQ0FBQzthQUVELFVBQWdCLEdBQUc7WUFDbEIsRUFBRSxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQztnQkFDUCxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2QyxDQUFDO1lBQ0QsSUFBSSxDQUFDLENBQUM7Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUNwQyxDQUFDO1FBQ0YsQ0FBQzs7O09BVEE7SUFXTyx3Q0FBVSxHQUFsQjtRQUNDLDJHQUEyRztRQUMzRyw4QkFBOEI7UUFDOUIsSUFBTSxLQUFLLEdBQUc7WUFDYixLQUFLLEVBQUUsc0NBQXNDLEdBQUcsSUFBSSxDQUFDLEtBQUs7WUFDMUQsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsK0JBQStCO1lBQ2pGLG1CQUFtQixFQUFFLElBQUk7U0FDekIsQ0FBQztRQUVGLFFBQVEsQ0FBQyxNQUFNLENBQ2Qsb0JBQUMsV0FBSSxlQUFLLEtBQUssRUFBSSxFQUNuQixJQUFJLENBQ0osQ0FBQTtJQUNGLENBQUM7SUFDRiwwQkFBQztBQUFELENBQUMsQUFsRkQsQ0FBa0MsV0FBVyxHQWtGNUM7QUFFRDs7OztHQUlHO0FBQ0g7SUFFQyxpREFBaUQ7SUFDakQsRUFBRTtJQUNGLGlEQUFpRDtJQUNqRCxFQUFFO0lBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUN4RSxDQUFDO0FBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLCtCQUErQixFQUFFLENBQUM7QUFDcEMsQ0FBQztBQUFDLElBQUksQ0FBQyxDQUFDO0lBQ04sTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxrQkFBa0IsS0FBSztRQUNyRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwRCwrQkFBK0IsRUFBRSxDQUFDO0lBQ3BDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNaLENBQUMifQ==