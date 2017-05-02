import * as React from 'react';
export class Text extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { textContent = '', width, maxFontSize = 12, height } = this.props;
        const lines = textContent.split('\n');
        const lineSpacing = 2; // In px
        // Calculate the font size that will fit into the container
        // All sizes must be in pixels.
        // TODO: Handle other size formats (em, rem, in, mm etc.)
        const longestLineLength = lines.reduce((acc, val) => val.length > acc ? val.length : acc, 0);
        const fontSize = Math.min(width / longestLineLength, maxFontSize);
        const style = {
            fontSize: `${fontSize}px`
        };
        const SVGText = lines.map((content, i) => React.createElement("text", { key: `text-line-${i}`, textAnchor: "middle", style: style, dy: 
            /* Add an extra offset of the fontSize (plus a spacer) for each line*/
            lines.length > 1 ? (fontSize + lineSpacing) * i : fontSize }, content));
        const SVGTextHeight = (lines.length > 1 ?
            (fontSize + lineSpacing) * lines.length : fontSize);
        const shiftX = width / 2;
        const shiftY = (height - SVGTextHeight) / 2;
        return (React.createElement("g", { transform: `translate(${shiftX},${shiftY})` }, SVGText));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9UZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUcvQixNQUFNLFdBQVksU0FBUSxLQUFLLENBQUMsU0FBbUI7SUFFL0MsWUFBWSxLQUFnQjtRQUN4QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakIsQ0FBQztJQUVELE1BQU07UUFDRixNQUFNLEVBQUMsV0FBVyxHQUFHLEVBQUUsRUFBRSxLQUFLLEVBQUUsV0FBVyxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3ZFLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUTtRQUUvQiwyREFBMkQ7UUFDM0QsK0JBQStCO1FBQy9CLHlEQUF5RDtRQUN6RCxNQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzdGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRWxFLE1BQU0sS0FBSyxHQUFHO1lBQ1YsUUFBUSxFQUFFLEdBQUcsUUFBUSxJQUFJO1NBQzVCLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsS0FDakMsOEJBQU0sR0FBRyxFQUFFLGFBQWEsQ0FBQyxFQUFFLEVBQ3JCLFVBQVUsRUFBQyxRQUFRLEVBQ25CLEtBQUssRUFBRSxLQUFLLEVBQ1osRUFBRTtZQUNFLHNFQUFzRTtZQUN0RSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsR0FBQyxDQUFDLEdBQUcsUUFBUSxJQUVoRSxPQUFPLENBQVEsQ0FDcEIsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQzNDLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxHQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFdEQsTUFBTSxNQUFNLEdBQVcsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNqQyxNQUFNLE1BQU0sR0FBVyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFcEQsTUFBTSxDQUFDLENBQ0gsMkJBQUcsU0FBUyxFQUFFLGFBQWEsTUFBTSxJQUFJLE1BQU0sR0FBRyxJQUN6QyxPQUFPLENBQ1IsQ0FDUCxDQUFBO0lBQ0wsQ0FBQztDQUNKIn0=