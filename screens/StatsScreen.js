import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {FontAwesome5, MaterialIcons, Entypo} from '@expo/vector-icons';

export default function StatsScreen({navigation}) {
    const [gardenInfo, setGardenInfo] = useState({size: 0, greenPercent: 0, co2PerYear: 0});
    const [plantData, setPlantData] = useState({});
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const url = '145.137.58.190';
    const INITIAL_PAGE = 1;
    const PAGE_LIMIT = 5; // Aantal planten dat onder stats wordt getoond

    useFocusEffect(
        useCallback(() => {
            const fetchLatestGarden = async () => {
                try {
                    const keys = await AsyncStorage.getAllKeys();
                    const gardenKeys = keys.filter(k => k.startsWith('garden_'));
                    if (gardenKeys.length === 0) {
                        setGardenInfo({size: 0, greenPercent: 0, co2PerYear: 0});
                        return;
                    }

                    const latestKey = gardenKeys.sort((a, b) => {
                        const numA = parseInt(a.split('_')[1], 10);
                        const numB = parseInt(b.split('_')[1], 10);
                        return numB - numA;
                    })[0];

                    const value = await AsyncStorage.getItem(latestKey);
                    if (!value) {
                        setGardenInfo({size: 0, greenPercent: 0, co2PerYear: 0});
                        return;
                    }

                    const garden = JSON.parse(value);
                    const {rows, cols, data} = garden;
                    const totalCells = rows * cols;
                    let greenCount = 0;

                    data.forEach(item => {
                        const parts = item.split('.');
                        const code = parts[2];
                        if (['G', 'H', 'F', 'B'].includes(code)) {
                            greenCount++;
                        }
                    });

                    const greenPercent = totalCells === 0 ? 0 : Math.round((greenCount / totalCells) * 100);
                    const co2PerYear = greenCount * 0.06;

                    setGardenInfo({size: totalCells, greenPercent, co2PerYear});
                } catch (e) {
                    console.error('Error loading garden data', e);
                    setGardenInfo({size: 0, greenPercent: 0, co2PerYear: 0});
                }
            };

            fetchLatestGarden();
        }, [])
    );

    const fetchPlants = useCallback(async (pageNumber) => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const plantRes = await fetch(
                `http://${url}:8001/plants?page=${pageNumber}&limit=${PAGE_LIMIT}`,
                {method: 'GET', headers: {Accept: 'application/json'}}
            );
            const plantJson = await plantRes.json();
            const plants = plantJson.plants;

            if (!plants || Object.keys(plants).length === 0) {
                setHasMore(false);
                return;
            }

            const keysToKeep = ['title', 'commonname', 'botanicalname', 'planttext', 'slug', 'id'];
            const simplified = {};
            for (const plantId in plants) {
                const plant = plants[plantId];
                simplified[plantId] = {};
                keysToKeep.forEach(key => {
                    simplified[plantId][key] = plant[key];
                });
            }

            const imageRes = await fetch(`http://${url}:8001/plants/url/all`);
            const imageData = await imageRes.json();

            for (const plantId in imageData) {
                if (simplified[plantId]) {
                    simplified[plantId].imageUrl = `https://greenberrystudio.com/images/${imageData[plantId].url.replace('./public/images/', '')}`;
                }
            }

            setPlantData(prev => ({...prev, ...simplified}));
            setPage(prev => prev + 1);
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [loading, hasMore]);

    useEffect(() => {
        fetchPlants(INITIAL_PAGE);
    }, []);

    const renderItem = ({item}) => (
        <View key={item.id} style={styles.card}>
            <View style={styles.textSection}>
                <Text style={styles.title}>{item.commonname}</Text>
                <Text style={styles.botanicalName}>{item.botanicalname}</Text>
                <Text numberOfLines={3} style={styles.plantText}>{item.planttext}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('PlantDetails', {plant: item})}>
                    <Text style={styles.readMore}>Lees meer…</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageWrapper}>
                <Image source={{uri: item.imageUrl}} style={styles.image} resizeMode="contain"/>
            </View>
        </View>
    );

    const flatData = Object.values(plantData);

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={styles.header}>Tuin statistieken:</Text>
                <View style={styles.statItem}>
                    <FontAwesome5 name="tree" size={24} color="black" style={styles.icon}/>
                    <Text style={styles.label}>Oppervlakte tuin: <Text style={styles.value}>{gardenInfo.size} m²</Text></Text>
                </View>
                <View style={styles.statItem}>
                    <MaterialIcons name="eco" size={24} color="black" style={styles.icon}/>
                    <Text style={styles.label}>Percentage groen: <Text
                        style={styles.value}>{gardenInfo.greenPercent}%</Text></Text>
                </View>
                <View style={styles.statItem}>
                    <Entypo name="cloud" size={24} color="black" style={styles.icon}/>
                    <Text style={styles.label}>CO₂ opname per jaar: <Text
                        style={styles.value}>{gardenInfo.co2PerYear.toFixed(2)} kg</Text></Text>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.header}>Aanbevolen planten:</Text>
                <FlatList
                    contentContainerStyle={styles.listContainer}
                    data={flatData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    onEndReached={() => fetchPlants(page)}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading ? <ActivityIndicator size="large" color="#2d4423"/> : null}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        marginRight: 12,
    },
    label: {
        fontSize: 16,
    },
    value: {
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 20,
        backgroundColor: '#ffffff',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6,
        marginBottom: 20,
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
        marginBottom: 12,
    },
    readMore: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2d4423',
        textDecorationLine: 'underline',
    },
    imageWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
});
