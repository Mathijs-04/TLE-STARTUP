import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {FontAwesome5, MaterialIcons, Entypo} from '@expo/vector-icons';

export default function StatsScreen({navigation}) {

    const [gardenInfo, setGardenInfo] = useState({size: 0, greenPercent: 0, co2PerYear: 0});
    const [plantData, setPlantData] = useState({});
    const [loading, setLoading] = useState(true); // loading indicator for initial fetch

    const url = process.env.EXPO_PUBLIC_API_URL;
    const port = process.env.EXPO_PUBLIC_API_PORT;
    const PAGE_LIMIT = 10; // fixed limit

    const STORAGE_KEYS = {
        lighting: 'form_lighting',
        animals: 'form_animals',
        soilType: 'form_soilType',
    };

    const [lighting, setLighting] = useState('partial');
    const [animals, setAnimals] = useState({ bees: false, butterflies: false, birds: false });
    const [soilType, setSoilType] = useState({chalk: false, clay: false, loam: false, sand: false});

    useEffect(() => {
        // Load saved values from local storage
        const loadData = async () => {
            try {
                const savedLighting = await AsyncStorage.getItem(STORAGE_KEYS.lighting);
                const savedAnimals = await AsyncStorage.getItem(STORAGE_KEYS.animals);
                const savedSoilTypes = await AsyncStorage.getItem(STORAGE_KEYS.soilType);

                if (savedLighting) setLighting(savedLighting);
                if (savedAnimals) setAnimals(JSON.parse(savedAnimals));
                if (savedSoilTypes) setSoilType(JSON.parse(savedSoilTypes));

                console.log('saved values:')
                console.log(savedLighting)
                console.log(savedAnimals);
                console.log(savedSoilTypes);

            } catch (e) {
                console.error('Failed to load form data', e);
            }
        };

        loadData();
    }, []);

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
                        if (['G', 'H', 'F', 'B', 'R', 'A'].includes(code)) {
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

    const fetchPlants = useCallback(async () => {
        setLoading(true);
        try {
            const plantRes = await fetch(
                `http://${url}:${port}/plants?page=1&limit=1000`,
                { method: 'GET', headers: { Accept: 'application/json' } }
            );
            const plantJson = await plantRes.json();
            const plants = plantJson.plants;

            if (!plants || Object.keys(plants).length === 0) {
                setPlantData({});
                setLoading(false);
                return;
            }

            const soilTypeMapping = { chalk: 1, loam: 2, clay: 3, sand: 4 };
            const sunTypeMapping = { sun: 1, partial: 2, shade: 3 };
            const pollinatorMapping = {
                bees: [1, 2, 3],
                butterflies: [7, 8],
                birds: [9, 10],
            };

            const selectedSoilTypeKeys = Object.entries(soilType)
                .filter(([, selected]) => selected)
                .map(([key]) => key);

            const selectedPollinatorKeys = Object.entries(animals)
                .filter(([, selected]) => selected)
                .map(([key]) => key);

            const selectedSoilTypeIds = selectedSoilTypeKeys.map(k => soilTypeMapping[k]).filter(Boolean);
            const selectedLightingId = sunTypeMapping[lighting]; // string to number or undefined

            // Pollinator IDs strict vs broad:
            // If exactly one pollinator selected, strict = just that pollinator's IDs, broad = all pollinator IDs
            const strictPollinatorIds = selectedPollinatorKeys.length === 1
                ? pollinatorMapping[selectedPollinatorKeys[0]] || []
                : selectedPollinatorKeys.flatMap(k => pollinatorMapping[k] || []);

            const broadPollinatorIds = Object.values(pollinatorMapping).flat();

            // For soil: similar strictness rule (usually multiple soil types allowed, but you can apply if needed)
            // For lighting, it's single value anyway

            const keysToKeep = [
                'title', 'botanicalname', 'commonname', 'othername', 'region', 'flowercolour',
                'foliagecolour', 'soilph', 'lightrequirements', 'exposure', 'pollinators',
                'soilrequirements', 'planttext', 'plantpollinatorstext', 'plantpropagation',
                'plantcultivation', 'plantpests', 'plantmaintenance', 'plantcategory',
                'slug', 'id',
            ];

            // Helper function to parse IDs from string/array/number fields:
            function parseIds(field) {
                if (Array.isArray(field)) return field.map(Number);
                if (typeof field === 'string') return field.split(',').map(s => Number(s.trim()));
                if (typeof field === 'number') return [field];
                return [];
            }

            // FILTER function to check plants against filters
            function filterPlants(plants, pollinatorIdsToUse) {
                const filtered = [];

                for (const plantId in plants) {
                    const plant = plants[plantId];

                    const plantSoilIds = parseIds(plant.soilrequirements);
                    const plantLightingIds = parseIds(plant.lightrequirements);
                    const plantPollinatorIds = parseIds(plant.pollinators);

                    // Soil match count
                    const soilMatchCount = selectedSoilTypeIds.length > 0
                        ? plantSoilIds.filter(id => selectedSoilTypeIds.includes(id)).length
                        : 0;

                    // Lighting match 1 or 0
                    const lightingMatchCount = selectedLightingId && plantLightingIds.includes(selectedLightingId) ? 1 : 0;

                    // Pollinator match 1 or 0
                    const pollinatorMatchCount = pollinatorIdsToUse.length > 0
                        ? plantPollinatorIds.some(id => pollinatorIdsToUse.includes(id)) ? 1 : 0
                        : 0;

                    const anyFilterSelected = selectedSoilTypeIds.length > 0 || selectedLightingId || pollinatorIdsToUse.length > 0;
                    const totalMatchCount = soilMatchCount + lightingMatchCount + pollinatorMatchCount;

                    if (anyFilterSelected && totalMatchCount === 0) continue;

                    const simplePlant = {};
                    keysToKeep.forEach(key => {
                        simplePlant[key] = plant[key];
                    });
                    simplePlant.matchCount = totalMatchCount;
                    simplePlant.soilMatchCount = soilMatchCount;

                    filtered.push(simplePlant);
                }

                // Sort by total matches desc, then soil match desc
                filtered.sort((a, b) => {
                    if (b.matchCount !== a.matchCount) return b.matchCount - a.matchCount;
                    return b.soilMatchCount - a.soilMatchCount;
                });

                return filtered;
            }

            // 1st try: strict pollinator IDs
            let filteredPlants = filterPlants(plants, strictPollinatorIds);

            // If no results, fallback to broad pollinator IDs
            if (filteredPlants.length === 0 && strictPollinatorIds.length > 0) {
                filteredPlants = filterPlants(plants, broadPollinatorIds);
            }

            // Optionally do the same fallback logic for soil or lighting filters if you want

            const limitedPlants = filteredPlants.slice(0, PAGE_LIMIT);

            const imageRes = await fetch(`http://${url}:${port}/plants/url/all`, {
                method: 'GET',
                headers: { Accept: 'application/json' },
            });
            const imageData = await imageRes.json();

            limitedPlants.forEach(plant => {
                const plantId = plant.id;
                if (imageData[plantId]) {
                    plant.imageUrl2 = `https://greenberrystudio.com/images/${imageData[plantId].url2.replace('./public/images/', '')}`;
                }
            });

            const plantDataObj = {};
            limitedPlants.forEach(p => { plantDataObj[p.id] = p; });

            setPlantData(plantDataObj);

        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [soilType, lighting, animals]);



    // Fetch plants once on mount or soilType change
    useEffect(() => {
        fetchPlants();
    }, [fetchPlants]);

    const renderItem = ({item}) => (
        <View key={item.id} style={styles.card}>
            <View style={styles.textSection}>
                <Text style={styles.title}>{item.commonname}</Text>
                <Text style={styles.botanicalName}>{item.botanicalname}</Text>
                <Text numberOfLines={3} style={styles.plantText}>{item.planttext}</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('PlantDetails', { plant: item });
                    }}
                >
                    <Text style={styles.readMore}>Lees meer…</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageWrapper}>
                <Image source={{uri: item.imageUrl2}} style={styles.image} resizeMode="contain"/>
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
            <View style={styles.recomendationsContainer}>
                <Text style={styles.header}>Aanbevolen planten:</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#2d4423" />
                ) : (
                    <FlatList
                        contentContainerStyle={styles.listContainer}
                        data={flatData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },

    recomendationsContainer:{
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginTop: 0,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        height: '60%',
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
