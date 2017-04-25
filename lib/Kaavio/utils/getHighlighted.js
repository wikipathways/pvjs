import * as _ from 'lodash';
export function getHighlighted(entity, highlightedNodes) {
    let result = {
        highlighted: false,
        color: null
    };
    // Only allow nodes and edges to be highlighted
    if ((entity.kaavioType != 'Node') && (entity.kaavioType != 'Edge'))
        return result;
    let matched = _.find(highlightedNodes, (value, index) => {
        return value['node_id'] == entity.id;
    });
    if (matched) {
        result.highlighted = true;
        result.color = matched.color;
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0SGlnaGxpZ2h0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvS2FhdmlvL3V0aWxzL2dldEhpZ2hsaWdodGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRzVCLE1BQU0seUJBQXlCLE1BQU0sRUFBRSxnQkFBZ0I7SUFDbkQsSUFBSSxNQUFNLEdBQUc7UUFDVCxXQUFXLEVBQUUsS0FBSztRQUNsQixLQUFLLEVBQUUsSUFBSTtLQUNkLENBQUM7SUFFRiwrQ0FBK0M7SUFDL0MsRUFBRSxDQUFBLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFFakYsSUFBSSxPQUFPLEdBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSztRQUNqRSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDekMsQ0FBQyxDQUFvQixDQUFDO0lBRXRCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDVixNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUMxQixNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDakMsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbEIsQ0FBQyJ9