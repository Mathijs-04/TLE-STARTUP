import React, { useState } from 'react';
import {Image, Pressable, StyleSheet, Switch, Text, View} from 'react-native';


const data = [
    'Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes', 'Mango', 'Strawberry'
];


export default function InfoScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Planten</Text>
            <Text style={styles.h2}>Encyclopedie</Text>

            <View style={styles.description1}
            >
                <View style={styles.column1}>
                    <Text>Story:</Text>
                    <Text>Director: </Text>
                    <Text>Rating:</Text>
                    <Image
                        style={styles.img}
                        source={require('../assets/inside_you_there_are_two_wolves.png')}
                    />
                </View>
                <View style={styles.column2}>
                    <Text>Yiming Li </Text>
                    <Text>John Director </Text>
                    <Text>🎈🎈🎈🎈 </Text>
                </View>


            </View>
            <View style={styles.description2}>
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid, animi aperiam
                    aspernatur debitis eos ipsa ipsum, iusto laborum magnam maiores maxime non, optio quisquam
                    reprehenderit sed voluptas voluptatem voluptates.
                </Text>
            </View>
            <Switch style={styles.switch}
                // value={}
                // onValueChange={}
            >

            </Switch>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1: {
        fontSize: 26,
        fontWeight: "bold",
    },
    h2: {
        fontSize: 24,
        fontWeight: "light",
        fontStyle: "italic"
    },
    img: {
        width: 300,

        height: 200,
        borderRadius: 30,
        margin: 20
    },
    description1: {
        flexDirection: "row",
        width: 400,

        borderRadius: 30,
        padding: 20,
        paddingHorizontal: 60,
        marginBottom: 10,
        backgroundColor: 'beige'
    },
    description2: {
        width: 400,

        borderRadius: 30,
        padding: 20,
        marginBottom: 10,
        backgroundColor: 'violet'
    },
    column1: {
        flex: 1,
    },
    column2: {
        flex: 2,
    },
    switch: {
        alignSelf: "center"
    }
});


