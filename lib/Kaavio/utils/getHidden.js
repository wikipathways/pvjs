"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
function getHidden(entity, hiddenEntities) {
    var result = false;
    // Only allow nodes and edges to be hidden
    if ((entity.kaavioType != 'Node') && (entity.kaavioType != 'Edge'))
        return result;
    var matched = _.find(hiddenEntities, function (value, index) {
        return value == entity.id;
    });
    if (matched) {
        result = true;
    }
    return result;
}
exports.getHidden = getHidden;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGlkZGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL0thYXZpby91dGlscy9nZXRIaWRkZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQkFBNEI7QUFFNUIsbUJBQTBCLE1BQU0sRUFBRSxjQUFjO0lBQzVDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztJQUVuQiwwQ0FBMEM7SUFDMUMsRUFBRSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFFakYsSUFBSSxPQUFPLEdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsVUFBQyxLQUFLLEVBQUUsS0FBSztRQUN0RCxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDOUIsQ0FBQyxDQUFXLENBQUM7SUFFYixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBZkQsOEJBZUMifQ==