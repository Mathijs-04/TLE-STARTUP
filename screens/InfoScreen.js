import React, {useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Switch, Text, TextInput, View} from 'react-native';


const data = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes', 'Mango', 'Strawberry'];


export default function InfoScreen({navigation}) {

    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (text) => {
        setSearch(text);
        const newData = data.filter(item => item.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(newData);
    };

    return (<View style={styles.container}>
        <View style={styles.title}>
            <Text style={styles.h1}>Planten</Text>
            <Text style={styles.h2}>Encyclopedie</Text>
        </View>

        <View style={styles.searchContainer}>
            <TextInput
                style={styles.inputSide}
                placeholder="Search..."
                value={search}
                onChangeText={handleSearch}
            />
            <View style={styles.listSide}>
                <FlatList style={styles.flatlist}
                          data={filteredData}
                          keyExtractor={(item) => item}
                          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                />
                <FlatList style={styles.flatlist}
                          data={filteredData}
                          keyExtractor={(item) => item}
                          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                />
            </View>

        </View>


        <View style={styles.description1}>
            <Text style={styles.h2}>Plantnaam</Text>

            <View style={styles.description2}>
                <View style={styles.column1}>

                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid, animi aperiam
                        aspernatur debitis eos ipsa ipsum, iusto laborum magnam maiores maxime non, optio quisquam
                        reprehenderit sed voluptas voluptatem voluptates.
                    </Text>
                </View>
                <View style={styles.column2}>
                    <Image
                        style={styles.img}
                        source={require('../assets/inside_you_there_are_two_wolves.png')}
                    />
                </View>
            </View>
        </View>


        {/*<Switch style={styles.switch}*/}
        {/*    // value={}*/}
        {/*    // onValueChange={}*/}
        {/*>*/}

        {/*</Switch>*/}
    </View>)
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
    },

    title: {
        width: '100%',
    },

    searchContainer: {
        width: '100%',
        height: 100,
        marginVertical: 20,
        gap: 10,
    },
    inputSide: {
        flex: 1,
        height: '100%',
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    listSide: {
        flexDirection: 'row',
        gap: 20,
        flex: 1,


    },
    flatlist: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 30,
    },

    input: {
        height: 50,
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 10,
        marginBottom: 20,
    },

    item: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        alignItems: 'center',
    },

    h1: {
        fontSize: 26,
        fontWeight: "bold",
    },

    h2: {
        fontSize: 24,
        fontWeight: "light",
        fontStyle: "italic",
    },

    img: {
        width: 100,
        height: 100,
        borderRadius: 100,

    },

    description1: {
        width: 370,
        borderRadius: 30,
        padding: 20,
        marginBottom: 10,
        backgroundColor: 'white',
        gap: 8,

        // iOS shadow
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        // Android shadow
        elevation: 5,
    },

    description2: {
        flexDirection: "row",


    },
    column1: {
        flex: 2,
    },
    column2: {
        flex: 1,
    },
    switch: {
        alignSelf: "center"
    }
});


