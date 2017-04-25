import * as React from 'react';
import * as ReactDom from 'react-dom';
import { CacheMeasurer, SvgContext, Wrapper, Writer } from 'typesettable';
export class Text extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // Anders: I've removed a lot of the custom props in favour of fewer with some defaults.
        // I can't see a use case for many of the ones that were here before. What do you think?
        const { textContent = '', textAlign = 'center', width = 200, height = 200 } = this.props;
        // Use ReactDom to find the node. Don't access DOM directly through browser API.
        const svgElem = ReactDom.findDOMNode(this.svgRef);
        const writeOptions = {
            xAlign: textAlign,
            yAlign: "center",
            textRotation: 0,
            textShear: 0,
        };
        const context = new SvgContext(svgElem);
        const measurer = new CacheMeasurer(context);
        const wrapper = new Wrapper().allowBreakingWords(true);
        const writer = new Writer(measurer, context, wrapper);
        writer.write(textContent, width, height, writeOptions);
    }
    render() {
        return (React.createElement("g", { ref: svgRef => this.svgRef = svgRef }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9UZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUMvQixPQUFPLEtBQUssUUFBUSxNQUFNLFdBQVcsQ0FBQztBQUV0QyxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFHLE1BQU0sY0FBYyxDQUFDO0FBRzNFLE1BQU0sV0FBWSxTQUFRLEtBQUssQ0FBQyxTQUFtQjtJQUcvQyxZQUFZLEtBQWdCO1FBQ3hCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsaUJBQWlCO1FBQ2Isd0ZBQXdGO1FBQ3hGLHdGQUF3RjtRQUV4RixNQUFNLEVBQUMsV0FBVyxHQUFHLEVBQUUsRUFBRSxTQUFTLEdBQUcsUUFBUSxFQUFFLEtBQUssR0FBRyxHQUFHLEVBQUUsTUFBTSxHQUFHLEdBQUcsRUFBQyxHQUFhLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFakcsZ0ZBQWdGO1FBQ2hGLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBZSxDQUFDO1FBRWhFLE1BQU0sWUFBWSxHQUFHO1lBQ2pCLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE1BQU0sRUFBRSxRQUFvQjtZQUM1QixZQUFZLEVBQUUsQ0FBQztZQUNmLFNBQVMsRUFBRSxDQUFDO1NBQ2YsQ0FBQztRQUNGLE1BQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV0RCxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxNQUFNO1FBQ0YsTUFBTSxDQUFDLENBQ0gsMkJBQUcsR0FBRyxFQUFFLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBSSxDQUM3QyxDQUFBO0lBQ0wsQ0FBQztDQUNKIn0=