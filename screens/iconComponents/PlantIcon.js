import React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlantIcon = (props) => (
    <Svg
        width={props.width}
        height={props.height}
        viewBox="0 0 23.419 28.558"
        {...props}
    >
        <Path
            d="M16.611,9.343s-3.924.391-5.979-1.321S9.046,3.038,9.046,3.038s3.924-.391,5.98,1.321,1.585,4.983,1.585,4.983Z"
            transform="translate(-4.948 -1.466)"
            fill="none"
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
        />
        <Path
            d="M16.255,9.343s3.924.391,5.979-1.321S23.82,3.038,23.82,3.038,19.9,2.648,17.842,4.359,16.255,9.343,16.255,9.343ZM6,14.486a1.276,1.276,0,0,1,1.276-1.276H25.143a1.276,1.276,0,0,1,1.276,1.276v2.552a1.276,1.276,0,0,1-1.276,1.276H7.276A1.276,1.276,0,0,1,6,17.038Zm1.276,3.829H25.143L22.59,28.523H9.829Z"
            transform="translate(-4.5 -1.466)"
            fill="none"
            stroke={props.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
        />
    </Svg>
);

export default PlantIcon;