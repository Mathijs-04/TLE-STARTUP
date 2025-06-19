import React, {useEffect, useState, useCallback} from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    ActivityIndicator, TextInput,
} from 'react-native';

export default function TestScreen({navigation}) {
    // vars
    const [plantData, setPlantData] = useState({});
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // url vars
    const url = process.env.EXPO_PUBLIC_API_URL;
    const port = process.env.EXPO_PUBLIC_API_PORT;

    // pagination vars
    const INITIAL_PAGE = 1;
    const PAGE_LIMIT = 10; // 👈 Easily change how many items load per page

    // search vars
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleSearch = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://${url}:${port}/plants`);
            const data = await response.json();
            console.log(data.plants);
            setSearchResults(data);
        } catch (error) {
            console.error('Search fetch failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPlants = useCallback(async (pageNumber) => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const plantRes = await fetch(
                `http://${url}:${port}/plants?page=${pageNumber}&limit=${PAGE_LIMIT}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );

            const plantJson = await plantRes.json();
            const plants = plantJson.plants;

            if (!plants || Object.keys(plants).length === 0) {
                setHasMore(false);
                setLoading(false);
                return;
            }

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
                'soilrequirements',
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

            const imageRes = await fetch(`http://${url}:${port}/plants/url/all`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                });
            const imageData = await imageRes.json();


            for (const plantId in imageData) {
                if (simplified[plantId]) {
                    simplified[plantId].imageUrl = `https://greenberrystudio.com/images/${imageData[plantId].url.replace('./public/images/', '')}`;
                    simplified[plantId].imageUrl2 = `https://greenberrystudio.com/images/${imageData[plantId].url2.replace('./public/images/', '')}`;
                    if (imageData[plantId].url3) {
                        simplified[plantId].imageUrl3 = `https://greenberrystudio.com/images/${imageData[plantId].url3.replace('./public/images/', '')}`;
                    }
                }
            }

            setPlantData((prev) => ({
                ...prev,
                ...simplified,
            }));

            setPage((prev) => prev + 1);
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
                <Text style={styles.plantText}>{item.planttext}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('PlantDetails', {plant: item})}>
                    <Text style={styles.readMore}>Lees meer…</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageWrapper}>
                <View style={styles.circle}>
                    <Image
                        source={{uri: item.imageUrl2}}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
            </View>
        </View>
    );

    const flatData = Object.values(plantData);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                    placeholder="Zoeken…"
                    placeholderTextColor="#999"
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity>
                    <Text style={styles.searchButton} onPress={handleSearch}>Zoek</Text>
                </TouchableOpacity>
            </View>

            {/* Plant List */}
        <FlatList
            contentContainerStyle={styles.container}
            data={flatData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            onEndReached={() => fetchPlants(page)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <ActivityIndicator size="large" color="#2d4423"/> : null}
        />
        </View>
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        paddingHorizontal: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    searchIcon: {
        fontSize: 24,
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 18,
        color: '#333',
        paddingVertical: 10,
    },
    searchButton: {
        fontSize: 16,
        color: '#2d4423',
        fontWeight: '600',
    },
});
