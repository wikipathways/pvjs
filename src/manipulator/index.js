"use strict";
var lodash_1 = require("lodash");
var Manipulator = (function () {
    function Manipulator(renderFunc, initProps) {
        var _this = this;
        this.highlightOn = function (entityId, color) {
            _this.props.highlightedEntities = _this.props.highlightedEntities
                .filter(function (single) { return single.entityId !== entityId; })
                .concat([{ entityId: entityId, color: color }]);
            _this.renderFunc();
        };
        this.highlightOff = function (entityId) {
            _this.props.highlightedEntities = _this.props.highlightedEntities.filter(function (single) { return single.entityId !== entityId; });
            _this.renderFunc();
        };
        this.toggleHighlight = function (entityId, color) {
            var isHighlighted = !!_this.props.hiddenEntities
                .filter(function (single) { return single.entityId === entityId; })[0];
            if (isHighlighted)
                _this.highlightOff(entityId);
            else
                _this.highlightOn(entityId, color);
        };
        this.resetHighlighted = function (exclude) {
            if (exclude === void 0) { exclude = []; }
            _this.props.highlightedEntities = _this.props.highlightedEntities
                .filter(function (single) { return exclude.indexOf(single.entityId) > -1; });
            _this.renderFunc();
        };
        this.hide = function (entityId) {
            _this.props.hiddenEntities = _this.props.hiddenEntities
                .filter(function (single) { return single === entityId; })
                .concat([entityId]);
            _this.renderFunc();
        };
        this.show = function (entityId) {
            _this.props.hiddenEntities = _this.props.hiddenEntities.filter(function (single) { return single !== entityId; });
            _this.renderFunc();
        };
        this.toggleHidden = function (entityId) {
            var isHidden = _this.props.hiddenEntities.indexOf(entityId) > -1;
            if (isHidden)
                _this.show(entityId);
            else
                _this.hide(entityId);
        };
        this.resetHidden = function (exclude) {
            if (exclude === void 0) { exclude = []; }
            _this.props.hiddenEntities = exclude.slice();
            _this.renderFunc();
        };
        this.zoomOn = function (entityId) {
            var toZoom;
            if (Array.isArray(entityId))
                toZoom = entityId;
            else
                toZoom = [entityId];
            _this.props.zoomedEntities = toZoom;
            _this.props.pannedEntities = toZoom;
            _this.renderFunc();
        };
        this.resetZoom = function () {
            _this.props.zoomedEntities = [];
            _this.props.pannedEntities = [];
            _this.renderFunc();
        };
        this.panTo = function (entityId) {
            var toPan;
            if (!Array.isArray(entityId))
                toPan = [entityId];
            else
                toPan = entityId;
            _this.props.pannedEntities = toPan;
            _this.renderFunc();
        };
        this.resetPan = function () {
            _this.props.pannedEntities = [];
            _this.renderFunc();
        };
        this.reset = function () {
            _this.props.pannedEntities = [];
            _this.props.zoomedEntities = [];
            _this.props.hiddenEntities = [];
            _this.props.highlightedEntities = [];
            _this.renderFunc();
        };
        this.props = lodash_1.defaults(initProps, {
            highlightedEntities: [],
            hiddenEntities: [],
            zoomedEntities: [],
            pannedEntities: []
        });
        this.renderFunc = lodash_1.partial(renderFunc, this.props);
    }
    return Manipulator;
}());
exports.Manipulator = Manipulator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUNBQTJDO0FBRTNDO0lBR0kscUJBQVksVUFBMkIsRUFBRSxTQUFTO1FBQWxELGlCQVNDO1FBRUQsZ0JBQVcsR0FBRyxVQUFDLFFBQWdCLEVBQUUsS0FBYTtZQUMxQyxLQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CO2lCQUMxRCxNQUFNLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBNUIsQ0FBNEIsQ0FBQztpQkFDOUMsTUFBTSxDQUFDLENBQUMsRUFBQyxRQUFRLFVBQUEsRUFBRSxLQUFLLE9BQUEsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyxLQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDO1FBRUYsaUJBQVksR0FBRyxVQUFDLFFBQWdCO1lBQzVCLEtBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBNUIsQ0FBNEIsQ0FBQyxDQUFDO1lBQy9HLEtBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUM7UUFFRixvQkFBZSxHQUFHLFVBQUMsUUFBZ0IsRUFBRSxLQUFhO1lBQzlDLElBQU0sYUFBYSxHQUFHLENBQUMsQ0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLGNBQWM7aUJBQzdDLE1BQU0sQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUE1QixDQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdkQsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDO2dCQUFD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