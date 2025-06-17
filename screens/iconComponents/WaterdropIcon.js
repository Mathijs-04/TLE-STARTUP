import React from 'react';
import Svg, { Path } from 'react-native-svg';

const WaterdropIcon = ({ width = 28, height = 28, stroke = '#FFFFFF' }) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 47.21 57.513"
        fill="none"
    >
        <Path
            d="M26.605,54.513A20.605,20.605,0,0,1,6,33.908c0-9.02,6.98-16.234,13.118-22.846L26.605,3l7.487,8.062C40.23,17.676,47.21,24.89,47.21,33.908A20.605,20.605,0,0,1,26.605,54.513Z"
            transform="translate(-3)"
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={6}
        />
    </Svg>
);

export default WaterdropIcon;
