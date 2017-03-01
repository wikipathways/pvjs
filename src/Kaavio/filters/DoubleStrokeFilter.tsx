import * as React from 'react'

export class DoubleStrokeFilter extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {...props};
    }
    render() {
        let that = this;
        const { id, strokeWidth } = that.state;
        if (strokeWidth === 1) {
            return <filter id={id} key={id}>
                <feComposite key="darkened" in="SourceGraphic" in2="SourceGraphic" operator="over" result="darkened" />
                <feMorphology key="dilated" in="SourceGraphic" operator="dilate" radius="1" result="dilated" />
                <feComposite key="doubled" in="dilated" in2="darkened" operator="out" result="doubled" />
            </filter>;
        }

        return <filter id={id} key={id}>
            <feMorphology key="dilated" in="SourceGraphic" operator="dilate" radius={strokeWidth} result="dilated" />
            <feComposite key="doubled" in="dilated" operator="xor" in2="SourceGraphic" result="doubled" />
        </filter>;
    }
}