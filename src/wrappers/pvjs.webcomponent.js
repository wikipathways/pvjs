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
var WikiPathwaysDefaultDisplayStyle = require("../WikiPathways.style");
var vanilla_1 = require("./vanilla");
/**
 * A custom HTML element for WikiPathways Diagrams
 * See this guide: https://developers.google.com/web/fundamentals/getting-started/primers/customelements
 */
var WikiPathwaysElement = (function (_super) {
    __extends(WikiPathwaysElement, _super);
    function WikiPathwaysElement() {
        var _this = _super.call(this) || this;
        _this.id = "wikipathways-pvjs-" + Date.now();
        return _this;
    }
    Object.defineProperty(WikiPathwaysElement, "observedAttributes", {
        get: function () {
            return ['wpId', 'version'];
        },
        enumerable: true,
        configurable: true
    });
    WikiPathwaysElement.prototype.connectedCallback = function () {
        if (!this.wpId)
            return;
        this.createPvjs();
    };
    WikiPathwaysElement.prototype.attributeChangedCallback = function (name, oldValue, newValue) {
        if (!this.wpId)
            return;
        this.createPvjs();
    };
    Object.defineProperty(WikiPathwaysElement.prototype, "wpId", {
        /**
         * Get the unique identifier for the desired pathway
         * E.g. WP4
         * @returns {string|null}
         */
        get: function () {
            return this.getAttribute('wpId');
        },
        set: function (val) {
            if (val) {
                this.setAttribute('wpId', val);
            }
            else {
                this.removeAttribute('wpId');
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
    Object.defineProperty(WikiPathwaysElement.prototype, "highlightedById", {
        // comma-separated map of entityIds to highlight
        // E.g. d8bae:red,faafb:green,...
        get: function () {
            return this.getAttribute('highlightedById');
        },
        set: function (val) {
            if (val) {
                this.setAttribute('highlightedById', val);
            }
            else {
                this.removeAttribute('highlightedById');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WikiPathwaysElement.prototype, "highlightedByLabel", {
        // comma-separated map of entity labels to highlight
        // cases are ignored
        // E.g. Nucleus:red,ATP:green,..
        get: function () {
            return this.getAttribute('highlightedByLabel');
        },
        set: function (val) {
            if (val) {
                this.setAttribute('highlightedByLabel', val);
            }
            else {
                this.removeAttribute('highlightedByLabel');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WikiPathwaysElement.prototype, "highlightedByXref", {
        // dbName$dbId:color,...
        // E.g. Entrez Gene$8525:red
        get: function () {
            return this.getAttribute('highlightedByXref');
        },
        set: function (val) {
            if (val) {
                this.setAttribute('highlightedByXref', val);
            }
            else {
                this.removeAttribute('highlightedByXref');
            }
        },
        enumerable: true,
        configurable: true
    });
    WikiPathwaysElement.prototype.createPvjs = function () {
        var createHighlightedMap = function (propName, propVal) {
            return propVal.split(',').map(function (singleHighlighted, i) {
                var splitMap = singleHighlighted.split(':');
                return _a = {},
                    _a[propName] = splitMap[0],
                    _a.color = splitMap[1],
                    _a;
                var _a;
            });
        };
        var highlightedEntities;
        if (this.highlightedById) {
            highlightedEntities = createHighlightedMap('entityId', this.highlightedById);
        }
        // all funcs in this array are called in the callback passed to loadDiagram
        var callbackFuncs = [];
        if (this.highlightedByLabel) {
            var highlightedMap_1 = createHighlightedMap('label', this.highlightedByLabel);
            callbackFuncs.push(function (_a) {
                var entities = _a.entities, manipulator = _a.manipulator;
                highlightedMap_1.forEach(function (singleHighlighted) {
                    entities.filter(function (singleEntity) { return !!singleEntity.textContent; })
                        .filter(function (singleEntity) {
                        return singleEntity.textContent.toUpperCase() === singleHighlighted.label.toUpperCase();
                    }).forEach(function (toHighlight) {
                        manipulator.highlightOn(toHighlight.id, singleHighlighted.color);
                    });
                });
            });
        }
        if (this.highlightedByXref) {
            var highlightedMap_2 = createHighlightedMap('xref', this.highlightedByXref);
            callbackFuncs.push(function (_a) {
                var entities = _a.entities, manipulator = _a.manipulator;
                highlightedMap_2.forEach(function (singleHighlighted) {
                    var xrefSplit = singleHighlighted.xref.split('$'); // [dbName, dbId];
                    entities.filter(function (singleEntity) { return !!singleEntity.dbName && !!singleEntity.dbId; })
                        .filter(function (singleEntity) {
                        return singleEntity.dbName === xrefSplit[0] && singleEntity.dbId === xrefSplit[1];
                    }).forEach(function (toHighlight) {
                        manipulator.highlightOn(toHighlight.id, singleHighlighted.color);
                    });
                });
            });
        }
        var opts = {
            version: this.version,
            customStyle: this.customStyle ? this.customStyle : WikiPathwaysDefaultDisplayStyle,
            showPanZoomControls: true,
            highlightedEntities: highlightedEntities,
        };
        var callback = function (toPass) { return callbackFuncs.forEach(function (singleCb) { return singleCb(toPass); }); };
        vanilla_1.loadDiagram("#" + this.id, this.wpId, opts, callback);
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
if (typeof (window) !== 'undefined' && typeof (document) !== 'undefined') {
    if (document.readyState === 'complete') {
        registerWikiPathwaysPvjsElement();
    }
    else {
        window.addEventListener('load', function listener(event) {
            window.removeEventListener('load', listener, false);
            registerWikiPathwaysPvjsElement();
        }, false);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHZqcy53ZWJjb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwdmpzLndlYmNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFHQSx1RUFBeUU7QUFDekUscUNBQXdDO0FBSXhDOzs7R0FHRztBQUNIO0lBQWtDLHVDQUFXO0lBQzVDO1FBQUEsWUFDQyxpQkFBTyxTQUVQO1FBREEsS0FBSSxDQUFDLEVBQUUsR0FBRyx1QkFBcUIsSUFBSSxDQUFDLEdBQUcsRUFBSSxDQUFDOztJQUM3QyxDQUFDO0lBRUQsc0JBQVcseUNBQWtCO2FBQTdCO1lBQ0MsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzVCLENBQUM7OztPQUFBO0lBRUQsK0NBQWlCLEdBQWpCO1FBQ0MsRUFBRSxDQUFBLENBQUMsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsc0RBQXdCLEdBQXhCLFVBQXlCLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUTtRQUNoRCxFQUFFLENBQUEsQ0FBQyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFPRCxzQkFBSSxxQ0FBSTtRQUxSOzs7O1dBSUc7YUFDSDtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLENBQUM7YUFFRCxVQUFTLEdBQUc7WUFDWCxFQUFFLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO2dCQUNQLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDTCxJQUFJLENBQUMsZUFBZSxDQUFDLE1B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