import * as React from 'react';
import { Observable } from "rxjs";
import * as validDataUrl from 'valid-data-url';
import { Base64 } from 'js-base64';
/**
 * Node is a rectangle within a Kaavio diagram.
 * It can be mapped to other pathway elements. For example, in PVJS this is mapped to metabolites and proteins.
 */
export class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadedIcon: null,
            iconSuffix: new Date().toISOString().replace(/\W/g, '')
        };
    }
    componentDidMount() {
        this.getIcon();
    }
    componentWilUpdate() {
        this.getIcon();
    }
    /**
     * Using the icon prop, get the required SVG and set the state.
     */
    getIcon() {
        // Anders: The node now only receives one icon and is responsible for retrieving the data from it's url.
        // This makes sense here but do other components need to do this? In which case this should be in Entity
        // Could you also check the ajax request? Not sure if it's correct
        const icon = this.props.icon;
        if (!icon)
            return;
        if (validDataUrl(icon.url)) {
            const parts = icon.url.match(validDataUrl.regex);
            let mediaType = parts[1] ? parts[1].toLowerCase() : null;
            let charset = parts[2] ? parts[2].split('=')[1].toLowerCase : null;
            const isBase64 = !!parts[3];
            let data = parts[4] ? parts[4] : null;
            const svgString = !isBase64 ? decodeURIComponent(data) : Base64.decode(data);
            this.setState({
                loadedIcon: {
                    id: icon.id,
                    svgString: svgString
                }
            });
        }
        else {
            const ajaxRequest = {
                url: icon.url,
                method: 'GET',
                responseType: 'text',
                timeout: 1 * 1000,
                crossDomain: true,
            };
            Observable.ajax(ajaxRequest)
                .subscribe(ajaxResponse => {
                const svgString = ajaxResponse.xhr.response;
                this.setState({
                    loadedIcon: {
                        id: icon.id,
                        svgString: svgString
                    }
                });
            }, err => {
                err.message = err.message || '';
                err.message += ` Error getting icon from "${icon.url}". Is source website down?`;
                console.error(err);
            });
        }
    }
    render() {
        const { borderWidth, color, filter, height, id, width, children, backgroundColor } = this.props;
        const { loadedIcon } = this.state;
        // Anders: Here, I just pass in the icon prop since that is all the component needs.
        // I don't think it's necessary to show the warning shape. In Diagram, I just show a console warning instead
        // I set the icon SVG within this group rather than in the document. Seems better to keep related things together
        // BTW, the XSS was present before just less obvious. Should think of a way to fix this.
        return (React.createElement("g", { ref: containerRef => this.containerRef = containerRef },
            "loadedIcon?",
            React.createElement("g", { dangerouslySetInnerHTML: loadedIcon ? { __html: loadedIcon.svgString } : null }),
            React.createElement("use", { id: `icon-for-${id}`, key: `icon-for-${id}`, x: "0", y: "0", width: width + 'px', height: height + 'px', fill: backgroundColor, xlinkHref: loadedIcon ? '#' + loadedIcon.id : null, filter: !!filter ? `url(#${filter})` : null, stroke: color, strokeWidth: borderWidth, className: "Icon" }),
            children));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9LYWF2aW8vY29tcG9uZW50cy9Ob2RlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssS0FBSyxNQUFNLE9BQU8sQ0FBQztBQUUvQixPQUFPLEVBQUMsVUFBVSxFQUF1QixNQUFNLE1BQU0sQ0FBQztBQUV0RCxPQUFPLEtBQUssWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFHakM7OztHQUdHO0FBQ0gsTUFBTSxXQUFZLFNBQVEsS0FBSyxDQUFDLFNBQW1CO0lBRy9DLFlBQVksS0FBZ0I7UUFDeEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFVBQVUsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1NBQzFELENBQUE7SUFDTCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsT0FBTztRQUNILHdHQUF3RztRQUN4Ryx3R0FBd0c7UUFDeEcsa0VBQWtFO1FBQ2xFLE1BQU0sSUFBSSxHQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQ2xDLEVBQUUsQ0FBQSxDQUFDLENBQUUsSUFBSSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRWxCLEVBQUUsQ0FBQSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FB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