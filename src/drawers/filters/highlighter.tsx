import * as React from 'react';
export function highlighter(id, color) {
    return {
        url: 'highlighter-for-' + id,
        filter: (
                <filter id={"highlighter-for-" + id} key={"highlighter-for-" + id}>
                    <feColorMatrix in="SourceGraphic"
                                   type="saturate" values="0" result="toHighlight" /> {/* Desaturate all colours before highlighting */}
                    <feFlood floodColor={color} floodOpacity="0.5" result="highlight" />
                    <feComposite in="highlight" in2="toHighlight" operator="atop"/>
                </filter>
            )
    }
}