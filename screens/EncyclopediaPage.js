import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';

export default function TestScreen({navigation}) {
    const [PlantData, setPlantData] = useState({});

    const url = '145.137.58.190'

    useEffect(() => {
        // First fetch: plant data
        fetch(`http://${url}:8001/plants`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => {
                const plants = json.plants;
                const keysToKeep = [
                    'title',
                    'botanicalname',
                    'commonname',
                    'othername',
                    'region',
                    'flowercolour',
                    'foliagecolour',
                    'soilph',
                    'lightrequirements',
                    'exposure',
                    'pollinators',
                    'planttext',
                    'plantpollinatorstext',
                    'plantpropagation',
                    'plantcultivation',
                    'plantpests',
                    'plantmaintenance',
                    'plantcategory',
                    'slug',
                    'id',
                ];

                const simplified = {};

                for (const plantId in plants) {
                    const plant = plants[plantId];
                    simplified[plantId] = {};

                    keysToKeep.forEach((key) => {
                        simplified[plantId][key] = plant[key];
                    });
                }

                // Second fetch: image URLs
                fetch(`http://${url}:8001/plants/url/all`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                })
                    .then((res) => res.json())
                    .then((imageData) => {
                        for (const plantId in imageData) {
                            if (simplified[plantId]) {
                                simplified[plantId].imageUrl = `https://greenberrystudio.com/images/${imageData[plantId].url.replace('./public/images/', '')}`;
                                simplified[plantId].imageUrl2 = `https://greenberrystudio.com/images/${imageData[plantId].url2.replace('./public/images/', '')}`;
                                if (imageData[plantId].url3) {
                                    simplified[plantId].imageUrl3 = `https://greenberrystudio.com/images/${imageData[plantId].url3.replace('./public/images/', '')}`;
                                }
                            }
                            /*
                            OLD CODE FOR FETCHING FROM BACK-END DOES NOT WORK SADLY CAUSE HTTP
                            if (simplified[plantId]) {
                                simplified[plantId].imageUrl = `http://${url}:8001/${imageData[plantId].url.replace('./', '')}`;
                                simplified[plantId].imageUrl2 = `http://${url}:8001/${imageData[plantId].url2.replace('./', '')}`;
                                if(imageData[plantId].url3){
                                    simplified[plantId].imageUrl3 = `http://${url}:8001/${imageData[plantId].url3.replace('./', '')}`;
                                }
                            }

                             */
                        }

                        setPlantData(simplified);
                        console.log(simplified['1']);
                    })
                    .catch((err) => {
                        console.error('Image fetch error:', err);
                        setPlantData(simplified); // Still show base data even if image fetch fails
                    });
            })
            .catch((err) => {
                console.error('Fetch error:', err);
            });
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {Object.entries(PlantData).map(([id, plant]) => (
                <View key={id} style={styles.card}>
                    <View style={styles.textSection}>
                        <Text style={styles.title}>{plant.commonname}</Text>
                        <Text style={styles.botanicalName}>{plant.botanicalname}</Text>
                        <Text style={styles.plantText}>{plant.planttext}</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('PlantDetails', {plant})}
                        >
                            <Text style={styles.readMore}>Lees meer…</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageWrapper}>
                        <View style={styles.circle}>
                            <Image
                                source={{uri: plant.imageUrl2}}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 20,
        backgroundColor: '#ffffff',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        // ✅ iOS shadow
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        // ✅ Android shadow
        elevation: 6,
    },
    textSection: {
        flex: 2,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    botanicalName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    plantText: {
        fontSize: 16,
        marginBottom: 20,
    },
    readMore: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2d4423',
        textDecorationLine: 'underline',
    },
    imageWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 80,
        height: 80,
        backgroundColor: '#dfe5da',
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {width: 0, height: 3},
    },
    image: {
        width: 100,
        height: 130,
    },
});
