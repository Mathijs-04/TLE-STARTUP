import React, {useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Switch, Text, TextInput, View} from 'react-native';


const plantData = [
    {
        name: 'Obada',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit...',
        image: require('../assets/plant-temp.png'),
    },
    {
        name: 'Elisa',
        description: 'Dolor sit amet, accusantium aliquid, animi aperiam...',
        image: require('../assets/plant-temp.png'),
    },
    {
        name: 'Lucas',
        description: 'Iusto laborum magnam maiores maxime non, optio quisquam...',
        image: require('../assets/plant-temp.png'),
    },
    // Add more items as needed
];


export default function InfoScreen({navigation}) {

    const [search, setSearch] = useState('');
    const [filteredPlants, setFilteredPlants] = useState(plantData);
    const data = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes', 'Mango', 'Strawberry'];


    const handleSearch = (text) => {
        setSearch(text);
        const filtered = plantData.filter((plant) =>
            plant.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredPlants(filtered);
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
                <FlatList style={styles.filter}
                          data={data}
                          keyExtractor={(item) => item}
                          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                />
                <FlatList style={styles.filter}
                          data={data}
                          keyExtractor={(item) => item}
                          renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                />
            </View>

        </View>


        <FlatList
            data={filteredPlants}

            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 10 }}
            renderItem={({ item }) => (
                <View style={styles.description1}>
                    <Text style={styles.h2}>{item.name}</Text>
                    <View style={styles.description2}>
                        <View style={styles.column1}>
                            <Text>{item.description}</Text>
                        </View>
                        <View style={styles.column2}>
                            <Image style={styles.img} source={item.image} />
                        </View>
                    </View>
                </View>
            )}
        />



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
    filter: {
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
        width: 120,
        height: 120,
        borderRadius: 100,
        objectFit: "fill",
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


