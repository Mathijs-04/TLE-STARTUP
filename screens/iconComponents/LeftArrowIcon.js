import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LeftArrowIcon = ({ width = 24, height = 24, fill = 'black' }) => (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
        <Path d="M16 4l-8 8 8 8" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export default LeftArrowIcon;