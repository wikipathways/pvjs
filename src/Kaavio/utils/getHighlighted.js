"use strict";
var _ = require("lodash");
function getHighlighted(entity, highlightedNodes) {
    var result = {
        highlighted: false,
        color: null
    };
    // Only allow nodes and edges to be highlighted
    if ((entity.kaavioType != 'Node') && (entity.kaavioType != 'Edge'))
        return result;
    var matched = _.find(highlightedNodes, function (value, index) {
        return value['node_id'] == entity.id;
    });
    if (matched) {
        result.highlighted = true;
        result.color = matched.color;
    }
    return result;
}
exports.getHighlighted = getHighlighted;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGlnaGxpZ2h0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZXRIaWdobGlnaHRlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQTRCO0FBRzVCLHdCQUErQixNQUFNLEVBQUUsZ0JBQWdCO0lBQ25ELElBQUksTUFBTSxHQUFHO1FBQ1QsV0FBVyxFQUFFLEtBQUs7UUFDbEIsS0FBSyxFQUFFLElBQUk7S0FDZCxDQUFDO0lBRUYsK0NBQStDO0lBQy9DLEVBQUUsQ0FBQSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBRWpGLElBQUksT0FBTyxHQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFVBQUMsS0FBSyxFQUFFLEtBQUs7UUFDakUsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ3pDLENBQUMsQ0FBb0IsQ0FBQztJQUV0QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDMUIsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFuQkQsd0NBbUJDIn0=