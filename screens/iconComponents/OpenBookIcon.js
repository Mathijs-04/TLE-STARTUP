import React from 'react';
import Svg, { Path } from 'react-native-svg';

const OpenBookIcon = ({ width = 28, height = 28, stroke = '#FFFFFF' }) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 31.942 26.153"
        fill="none"
    >
        <Path
            d="M3,8.894S5.171,6,10.235,6s7.235,2.894,7.235,2.894V29.153s-2.171-1.447-7.235-1.447S3,29.153,3,29.153Zm14.471,0S19.641,6,24.706,6s7.235,2.894,7.235,2.894V29.153s-2.171-1.447-7.235-1.447-7.235,1.447-7.235,1.447Z"
            transform="translate(-1.5 -4.5)"
            stroke={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
        />
    </Svg>
);

export default OpenBookIcon;
