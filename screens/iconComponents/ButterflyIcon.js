// ButterflyIcon.js
import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ButterflyIcon = ({ width = 33.177, height = 31.958, color = '#000' }) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 33.177 31.958"
    >
        <Path
            d="M96.967,10.212a1.481,1.481,0,0,0-.9,2.656c-.145.338-.324.731-.541,1.167A24.309,24.309,0,0,1,94,16.665a3.356,3.356,0,0,0-1-.354,32.191,32.191,0,0,0-.363-3.4c-.038-.248-.077-.482-.114-.7a1.481,1.481,0,1,0-.84.161c.042.239.084.5.127.782a30.9,30.9,0,0,1,.332,3.113,3.343,3.343,0,0,0-2.41,1.311,8.429,8.429,0,0,0-6.816-5.355,8.309,8.309,0,0,0-8.966,7.751,9.163,9.163,0,0,0,.883,4.94,5.874,5.874,0,0,0-5.007,5.38,6.066,6.066,0,0,0,5.045,6.648,8.143,8.143,0,0,0,4.012-.4c-.655.509-1.337,1-2.044,1.451A1.834,1.834,0,0,0,78.82,41.08a34.29,34.29,0,0,0,6.1-5.053,43.6,43.6,0,0,0,6.115-8.1c.726-1.235,1.308-2.364,1.751-3.321.221-.478.408-.913.56-1.3.079-.2.148-.385.21-.56a3.347,3.347,0,0,0,1.14-5.579,25.1,25.1,0,0,0,1.618-2.787c.224-.452.408-.859.557-1.21.034,0,.068.005.1.005a1.482,1.482,0,0,0,0-2.963Z"
            transform="translate(-65.271 -9.414)"
            fill={color}
        />
        <Path
            d="M2.933,63.131a7.247,7.247,0,0,1,4.558-6.115,10.509,10.509,0,0,1-.434-4.206,10.058,10.058,0,0,1,3.832-7.044,6.956,6.956,0,0,0-5.511-.686A7.82,7.82,0,0,0,2.633,58.139,5.419,5.419,0,0,0,.189,64.216a5,5,0,0,0,3.918,3.73A7.452,7.452,0,0,1,2.933,63.131Z"
            transform="translate(-0.006 -42.502)"
            fill={color}
        />
    </Svg>
);

export default ButterflyIcon;
