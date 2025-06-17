import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

const Sun = () => {
    return (
        <View style={styles.sunWrapper}>
            <Svg width={36} height={36} viewBox="0 0 24 24" stroke="#000" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" style={styles.sunIcon}
            >
                <Circle cx="12" cy="12" r="5" />
                <Line x1="12" y1="1" x2="12" y2="3" />
                <Line x1="12" y1="21" x2="12" y2="23" />
                <Line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <Line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <Line x1="1" y1="12" x2="3" y2="12" />
                <Line x1="21" y1="12" x2="23" y2="12" />
                <Line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <Line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    sunWrapper: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 110,
        height: 110,
        backgroundColor: '#f7ff3c',
        borderBottomLeftRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
    sunIcon: {
        marginLeft: 25,
    },
});

export default Sun;
