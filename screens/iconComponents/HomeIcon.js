import React from 'react';
import Svg, { Path } from 'react-native-svg';

const HomeIcon = (props) => (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 25.971 26.489"
        {...props}
    >
        <Path
            d="M27.471,24.865V16.273a5.1,5.1,0,0,0-1.589-3.7l-8.138-7.73a2.552,2.552,0,0,0-3.516,0l-8.139,7.73a5.1,5.1,0,0,0-1.589,3.7v8.592a2.552,2.552,0,0,0,2.552,2.552H24.919A2.552,2.552,0,0,0,27.471,24.865Z"
            transform="translate(-4.5 -4.14) translate(1.5 1.711)"
            fill="none"
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
        />
        <Path
            d="M13.5,22.052A2.552,2.552,0,0,1,16.052,19.5H18.6a2.552,2.552,0,0,1,2.552,2.552v7.657H13.5Z"
            transform="translate(-5.843 -6.432) translate(1.5 1.711)"
            fill="none"
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
        />
    </Svg>
);

export default HomeIcon;