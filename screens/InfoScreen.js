import React from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';

function InfoScreen({navigation}) {
    return (
        <View style={styles.container}>

            <Text>Planten Encyclopedie</Text>
            <Text>2</Text>
            <Button
                title={'Home'}
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'beige',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default InfoScreen