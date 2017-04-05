import * as React from 'react';
import * as ReactDom from 'react-dom';
import SvgText from 'svg-text';
export class Text extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // Anders: I've removed a lot of the custom props in favour of fewer with some defaults.
        // I can't see a use case for many of the ones that were here before. What do you think?
        const { textContent = '', textAlign = 'center', className, fontColor = 'currentColor', fontFamily = 'serif', fontSize = '1rem', fontStyle = 'normal', fontWeight = 'normal', x = 0, y = 0 } = this.props;
        const style = {
            fill: fontColor,
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontStyle: fontStyle,
            fontWeight: fontWeight
        };
        // Use ReactDom to find the node. Don't access DOM directly through browser API.
        const svgElem = ReactDom.findDOMNode(this.svgRef);
        const opts = {
            text: textContent,
            element: svgElem,
            align: textAlign,
            verticalAlign: 'middle',
            className: className,
            textOverflow: 'ellipsis',
            style: style,
            x: x,
            y: y
        };
        new SvgText(opts);
    }
    render() {
        return (React.createElement("g", { ref: svgRef => this.svgRef = svgRef }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9UZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUV0QyxPQUFPLE9BQU8sTUFBTSxVQUFVLENBQUM7QUFHL0IsTUFBTSxXQUFZLFNBQVEsS0FBSyxDQUFDLFNBQW1CO0lBRy9DLFlBQVksS0FBZ0I7UUFDeEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxpQkFBaUI7UUFDYix3RkFBd0Y7UUFDeEYsd0ZBQXdGO1FBRXhGLE1BQU0sRUFBQyxXQUFXLEdBQUcsRUFBRSxFQUFFLFNBQVMsR0FBRyxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsR0FBRyxjQUFjLEVBQUUsVUFBVSxHQUFHLE9BQU8sRUFDdEcsUUFBUSxHQUFHLE1BQU0sRUFBRSxTQUFTLEdBQUcsUUFBUSxFQUFFLFVBQVUsR0FBRyxRQUFRLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUUzRixNQUFNLEtBQUssR0FBRztZQUNWLElBQUksRUFBRSxTQUFTO1lBQ2YsVUFBVSxFQUFFLFVBQVU7WUFDdEIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsVUFBVSxFQUFFLFVBQVU7U0FDekIsQ0FBQztRQUVGLGdGQUFnRjtRQUNoRixNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxNQUFNLElBQUksR0FBRztZQUNULElBQUksRUFBRSxXQUFXO1lBQ2pCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLEtBQUssRUFBRSxTQUFTO1lBQ2hCLGFBQWEsRUFBRSxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLFlBQVksRUFBRSxVQUFVO1lBQ3hCLEtBQUssRUFBRSxLQUFLO1lBQ1osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNQLENBQUM7UUFDRixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsTUFBTTtRQUNGLE1BQU0sQ0FBQyxDQUNILDJCQUFHLEdBQUcsRUFBRSxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUksQ0FDN0MsQ0FBQTtJQUNMLENBQUM7Q0FDSiJ9