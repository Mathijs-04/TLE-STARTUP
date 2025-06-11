import React, {useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Switch, Text, TextInput, View} from 'react-native';


const data = [
    'Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes', 'Mango', 'Strawberry'
];


export default function InfoScreen({navigation}) {

    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (text) => {
        setSearch(text);
        const newData = data.filter(item =>
            item.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(newData);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Planten</Text>
            <Text style={styles.h2}>Encyclopedie</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.inputSide}
                    placeholder="Search..."
                    value={search}
                    onChangeText={handleSearch}
                />
                <FlatList
                    data={filteredData}
                    style={styles.listSide}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                />
            </View>


            <View style={styles.description1}
            >
                <View style={styles.column1}>
                    <Text>Story:</Text>
                    <Text>Director: </Text>
                    <Text>Rating:</Text>
                </View>
                <View style={styles.column2}>
                    <Text>Yiming Li </Text>
                    <Text>John Director </Text>
                    <Text>🎈🎈🎈🎈 </Text>
                </View>


            </View>
            <View style={styles.description2}>
                <Text style={styles.h2}>Plantnaam</Text>

                <Image
                    style={styles.img}
                    source={require('../assets/inside_you_there_are_two_wolves.png')}
                />
                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid, animi aperiam
                    aspernatur debitis eos ipsa ipsum, iusto laborum magnam maiores maxime non, optio quisquam
                    reprehenderit sed voluptas voluptatem voluptates.
                </Text>
            </View>
            {/*<Switch style={styles.switch}*/}
            {/*    // value={}*/}
            {/*    // onValueChange={}*/}
            {/*>*/}

            {/*</Switch>*/}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        width: '90%',
        height: 50, // Adjust based on your layout
        marginVertical: 20,
    },
    inputSide: {
        flex: 1,
        height: '100%',
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    listSide: {
        flex: 2,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
    },

    input: {
        height: 50,
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    item: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
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
        backgroundColor: 'white',

        // iOS shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Android shadow
        elevation: 5,
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


