import React from 'react';
import Svg, {Ellipse, G, Path} from 'react-native-svg';

const HalfSunIcon = ({ width = 34, height = 34, fill = '#000000' }) => (
    <Svg xmlns="http://www.w3.org/2000/svg" width="50.319" height="51" viewBox="0 0 50.319 51">
        <G id="Group_50" data-name="Group 50" transform="translate(-194 -294)">
            <G id="Group_49" data-name="Group 49">
                <Ellipse id="Ellipse_43" data-name="Ellipse 43" cx="25" cy="25.5" rx="25" ry="25.5"
                         transform="translate(194 294)" fill="#f3ff39"/>
            </G>
            <Path id="Path_25" data-name="Path 25"
                  d="M16.26,0C28.176,0,37.837,11.368,37.837,25.391S28.176,50.783,16.26,50.783,4.343,0,16.26,0Z"
                  transform="translate(206.482 294.094)" fill="#6f7070"/>
        </G>
    </Svg>
);

export default HalfSunIcon;