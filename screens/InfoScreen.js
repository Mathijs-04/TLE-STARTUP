import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';

export default function InfoScreen({ navigation }) {
    const [search, setSearch] = useState('');
    const [plantData, setPlantData] = useState([]); // fetched data
    const [filteredPlants, setFilteredPlants] = useState([]); // visible data
    const [loading, setLoading] = useState(true); // loading state

    const filterData = ['Apple', 'Banana', 'Orange', 'Pineapple', 'Grapes', 'Mango', 'Strawberry'];

    useEffect(() => {
        fetch('http://145.137.55.234:8005/plants', {
            headers: {
                'Accept': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => {
                const plantArray = Object.values(json);
                setPlantData(plantArray);
                setFilteredPlants(plantArray);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching plant data:', err);
                setLoading(false);
            });
        console.log('filteredPlants:', filteredPlants);

    }, []);

    const PlantItem = ({ item }) => {
        const [imageUri, setImageUri] = useState(null);

        useEffect(() => {
            if (!item.id) return;

            fetch(`http://145.137.55.234:8005/plants/img/${item.id}`)
                .then(res => res.json())
                .then(json => {
                    if (json.url2) {
                        const fullUrl = `http://145.137.55.234:8005/${json.url2.replace('./', '')}`;
                        setImageUri(fullUrl);
                    }
                })
                .catch(err => {
                    console.error(`Image fetch failed for id ${item.id}`, err);
                });
        }, [item.id]);

        return (
            <View style={styles.description1}>
                <Text style={styles.h2}>{item.title}</Text>
                <View style={styles.description2}>
                    <View style={styles.column1}>
                        <Text>{item.commonname}</Text>
                    </View>
                    <View style={styles.column2}>
                        <Image
                            style={styles.img}
                            source={
                                imageUri
                                    ? { uri: imageUri }
                                    : require('../assets/plant-temp.png')
                            }
                        />
                    </View>
                </View>
            </View>
        );
    };

    const handleSearch = (text) => {
        setSearch(text);

        if (!plantData || !Array.isArray(plantData)) {
            setFilteredPlants([]);
            return;
        }

        if (!text.trim()) {
            setFilteredPlants(plantData);
            return;
        }

        const lower = text.toLowerCase();
        const filtered = plantData.filter((plant) =>
            (plant.title && plant.title.toLowerCase().includes(lower)) ||
            (plant.commonname && plant.commonname.toLowerCase().includes(lower))
        );

        setFilteredPlants(filtered);
    };


    return (
        <View style={styles.container}>
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
                    <FlatList
                        style={styles.filter}
                        data={filterData}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                    />
                    <FlatList
                        style={styles.filter}
                        data={filterData}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                    />
                </View>
                <View>
                    <Text>Results: {filteredPlants.length}</Text>
                </View>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            ) : (
                <FlatList
                    style={styles.plantsList}
                    data={filteredPlants}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={<Text>No plants found.</Text>}
                    contentContainerStyle={{ gap: 10 }}
                    renderItem={({ item }) => <PlantItem item={item} />}
                />


            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        width: '100%',
        paddingHorizontal: 20,
    },
    searchContainer: {
        width: '100%',
        height: 130,
        marginVertical: 20,
        gap: 10,
        paddingHorizontal: 20,

    },
    inputSide: {
        flex: 2,
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
    item: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
        textAlign: 'center',
    },
    h1: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    h2: {
        fontSize: 24,
        fontWeight: '300',
        fontStyle: 'italic',
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 100,
        resizeMode: 'cover',
    },
    description1: {
        width: 370,
        borderRadius: 30,
        padding: 20,
        marginBottom: 10,
        backgroundColor: 'white',
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    description2: {
        flexDirection: 'row',
    },
    column1: {
        flex: 2,
    },
    column2: {
        flex: 1,
    },
    switch: {
        alignSelf: 'center',
    },
    plantsList: {
        padding: 10,
    }
});
