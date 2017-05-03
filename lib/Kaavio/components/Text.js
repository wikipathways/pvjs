import * as React from 'react';
export class Text extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { textContent = '', width, height, fontSize = 12, fontFamily = 'arial', fontStyle, fontWeight, color = '#141414' } = this.props;
        const lines = textContent.split('\n');
        const lineSpacing = 2; // In px
        const style = {
            fontSize: `${fontSize}px`,
            fontFamily,
            fontStyle,
            fontWeight
        };
        const SVGText = lines.map((content, i) => React.createElement("text", { key: `text-line-${i}`, textAnchor: "middle", style: style, fill: color, dy: 
            /* Add an extra offset of the fontSize (plus a spacer) for each line*/
            lines.length > 1 ? (fontSize + lineSpacing) * i : fontSize }, content));
        const SVGTextHeight = (lines.length > 1 ?
            (fontSize + lineSpacing) * lines.length : fontSize);
        const shiftX = width / 2;
        const shiftY = (height - SVGTextHeight) / 2;
        return (React.createElement("g", { transform: `translate(${shiftX},${shiftY})` }, SVGText));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9UZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUcvQixNQUFNLFdBQVksU0FBUSxLQUFLLENBQUMsU0FBbUI7SUFFL0MsWUFBWSxLQUFnQjtRQUN4QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLEVBQUMsV0FBVyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsVUFBVSxHQUFHLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUM5RixLQUFLLEdBQUcsU0FBUyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQyxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVE7UUFFL0IsTUFBTSxLQUFLLEdBQUc7WUFDVixRQUFRLEVBQUUsR0FBRyxRQUFRLElBQUk7WUFDekIsVUFBVTtZQUNWLFNBQVM7WUFDVCxVQUFVO1NBQ2IsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUNqQyw4QkFBTSxHQUFHLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFDckIsVUFBVSxFQUFDLFFBQVEsRUFDbkIsS0FBSyxFQUFFLEtBQUssRUFDWixJQUFJLEVBQUUsS0FBSyxFQUNYLEVBQUU7WUFDRSxzRUFBc0U7WUFDdEUsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUMsQ0FBQyxHQUFHLFFBQVEsSUFFaEUsT0FBTyxDQUFRLENBQ3BCLENBQUM7UUFFRixNQUFNLGFBQWEsR0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUMzQyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBRXRELE1BQU0sTUFBTSxHQUFXLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDakMsTUFBTSxNQUFNLEdBQVcsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXBELE1BQU0sQ0FBQyxDQUNILDJCQUFHLFNBQVMsRUFBRSxhQUFhLE1BQU0sSUFBSSxNQUFNLEdBQUcsSUFDekMsT0FBTyxDQUNSLENBQ1AsQ0FBQTtJQUNMLENBQUM7Q0FDSiJ9