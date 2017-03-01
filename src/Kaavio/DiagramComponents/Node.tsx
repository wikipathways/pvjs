import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Components} from './';

export class Node extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {...props};
    }

    componentWillReceiveProps(nextProps) {
        let that = this;
        const prevProps = that.props;
        const prevIconsLoaded = prevProps.iconsLoaded;
        const nextIconsLoaded = nextProps.iconsLoaded;
        if (prevIconsLoaded !== nextIconsLoaded) {
            that.setState({iconsLoaded: nextIconsLoaded});
        }
    }

    render() {
        let that = this;
        const state = that.state;
        const { children, customStyle, elementMap, element, icons, iconsLoaded } = state;

        const { backgroundColor, borderWidth, color, drawAs, filter,
            fillOpacity, height, id, rotation, strokeDasharray, textAnchor, textContent, type, width, wpType, x, y } = element;

        let nodeTransform=`translate(${element.x} ${element.y})`;
        if (rotation) {
            nodeTransform += ` rotate(${ rotation },${ x + width / 2 },${ y + height / 2 })`;
        }

        const className = type.concat(
            type.reduce(function(acc, t) {
                const thisStyle = customStyle[t + 'Class'];
                if (thisStyle) {
                    acc.push(thisStyle);
                }
                return acc;
            }, [])
        )
            .join(' ');

        const icon = icons[drawAs];
        if (!icon) {
            console.warn(`Missing icon for ${drawAs}`);
        }

        return <g id={id}
                  className={className}
                  transform={nodeTransform}
            // TODO the following two are WP-specific. Kaavio should be generic.
                  resource={`identifiers:wikipathways/WP554/${id}`}>
            <g property="rdfa:copy" href={wpType}></g>
            {/* TODO re-enable this when we actually have the data
             <g property="biopax:entityReference" content="identifiers:ec-code/3.6.3.14"></g>
             */}

            {
                // NOTE: we can pull the externally referenced SVGs in using either
                // the SVG 'image' element or the SVG 'use' element. The 'use' element
                // is better, because it allows for more control over styling.
                // If the source image is not available, we can fall back to a simple
                // rectangle.
                iconsLoaded ?
                    // see https://css-tricks.com/svg-use-with-external-reference-take-2/
                    <use
                        height={element.height + 'px'}
                        href={'#' + icon.id}
                        fill={backgroundColor}
                        filter={!!filter ? `url(#${filter})` : null}
                        stroke={color}
                        strokeWidth={borderWidth}
                        typeof="schema:ImageObject" className="Icon"
                        width={element.width + 'px'}
                        x="0"
                        y="0"/>
                    :
                    <rect
                        height={element.height + 'px'}
                        fill={backgroundColor}
                        filter={!!filter ? `url(#${filter})` : null}
                        stroke={color}
                        strokeWidth={borderWidth}
                        typeof="schema:ImageObject" className="Icon"
                        width={element.width + 'px'}
                        x="0"
                        y="0">
                    </rect>
            }

            <g transform={`translate(${ element.width / 10 } 0)`}
               id={`text-for-${ element.id }`}
               className="textlabel"
               content={textContent}>
                {
                    (textContent || '')
                        .split('\r')
                        .map((t, i) => <text id={`text-line${i}`} key={`text-line${i}`} x="0" y={`${0.75 * (i + 1)}em`} dominantBaseline="central" textAnchor={textAnchor}>{t}</text>)
                }

            </g>
            {
                (element.citation || [])
                    .map((citationId) => elementMap[citationId])
                    .map(function(citation) {
                        return <text className="citation"
                                     key={element.id + citation.id}
                                     content={`identifiers:pubmed/${citation.dbId}`}
                                     transform={`translate(${ element.width + 5 } 0)`}>{citation.textContent}</text>
                    })
            }
            {
                children
            }
        </g>
    }
}