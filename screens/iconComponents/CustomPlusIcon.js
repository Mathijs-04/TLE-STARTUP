import React from 'react';
import Svg, { Path } from 'react-native-svg';

const CustomPlusIcon = ({ width = 34, height = 34, fill = '#000000' }) => (
    <Svg
        width={width}
        height={height}
        viewBox="150 100 200 200"
        fill="none"
    >
        <Path
            d="M306,192h-48v-48c0-4.4-3.6-8-8-8s-8,3.6-8,8v48h-48c-4.4,0-8,3.6-8,8s3.6,8,8,8h48v48c0,4.4,3.6,8,8,8s8-3.6,8-8v-48h48
        c4.4,0,8-3.6,8-8S310.4,192,306,192z"
            fill={fill}
        />
    </Svg>
);

export default CustomPlusIcon;
