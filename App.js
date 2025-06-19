import React from 'react';
import Navbar from './screens/components/Navbar';
import { StyleSheet, View } from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});
