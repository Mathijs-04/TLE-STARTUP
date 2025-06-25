// screens/MyGardens.js
import React, { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Modal,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';



const deleteAllGardens = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const gardenKeys = keys.filter(k => k.startsWith('garden_'));

        if (gardenKeys.length === 0) {
            Alert.alert('Geen tuinen om te verwijderen');
            return;
        }

        await AsyncStorage.multiRemove(gardenKeys);

        Alert.alert('Alle tuinen zijn verwijderd!');
        setSavedGardens([]); // Vergeet niet je state te updaten
    } catch (error) {
        console.error('Fout bij verwijderen van tuinen:', error);
        Alert.alert('Er is iets misgegaan bij het verwijderen.');
    }
};

const GardenGrid = ({ gridData, size = 'small' }) => {
    const getColor = (color) => {
        switch (color) {
            case 'yellow': return '#E8F542';
            case 'green': return '#6B8E23';
            case 'gray': return '#9CA3AF';
            default: return '#F3F4F6';
        }
    };
    const cellSize = size === 'large' ? 8 : 12;
    return (
        <View style={styles.gridContainer}>
            {gridData.map((row, ri) => (
                <View key={ri} style={styles.gridRow}>
                    {row.map((cell, ci) => (
                        <View
                            key={ci}
                            style={[
                                styles.gridCell,
                                { backgroundColor: getColor(cell), width: cellSize, height: cellSize }
                            ]}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const GardenCard = ({ title, dimensions, area, coverage, gridData, gridSize, onPress, onDelete }) => (
    <TouchableOpacity style={styles.gardenCard} onPress={onPress}>
        <View style={styles.gardenInfo}>
            <Text style={styles.gardenTitle}>{title}</Text>
            <Text style={styles.gardenLabel}>Afmetingen:</Text>
            <Text style={styles.gardenDetail}>{dimensions}</Text>
            <Text style={styles.gardenDetail}>{area}</Text>
            <Text style={styles.gardenLabel}>Plantendekking:</Text>
            <Text style={styles.gardenDetail}>{coverage}</Text>
            <TouchableOpacity onPress={onDelete}>
                <Text style={{ color: 'red', marginTop: 6 }}>Verwijderen</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.gardenVisual}>
            <GardenGrid gridData={gridData} size={gridSize} />
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" style={styles.chevron} />
        </View>

    </TouchableOpacity>
);

const MyGardens = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [selectedSort, setSelectedSort] = useState('alfabetisch');
    const [gardens, setGardens] = useState([]);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedCoverageFilter, setSelectedCoverageFilter] = useState(null);

    const chunkArray = (arr, size) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };


    const loadGardens = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const gardenKeys = keys.filter(k => k.startsWith('garden_'));
            const entries = await AsyncStorage.multiGet(gardenKeys);
            const loaded = entries.map(([key, val]) => {
                const g = JSON.parse(val);
                const total = g.rows * g.cols;
                const greenCount = g.data.filter(cell => ['G', 'H', 'F', 'B'].includes(cell.split('.')[2])).length;
                const percent = total === 0 ? 0 : Math.round((greenCount / total) * 100);
                return {
                    key: key,
                    title: g.name || key,
                    dimensions: `${g.rows} x ${g.cols}m`,
                    area: `${total}m²`,
                    coverage: `${percent}%`,
                    gridData: chunkArray(g.data, g.cols),
                    gridSize: g.cols > 4 ? 'large' : 'small',
                };
            });
            setGardens(loaded);
        } catch (e) {
            console.error('Error fetching gardens', e);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadGardens();
        }, [])
    );

    const deleteGarden = async (key) => {
        Alert.alert(
            'Tuin verwijderen',
            'Weet je zeker dat je deze tuin wilt verwijderen?',
            [
                { text: 'Annuleren', style: 'cancel' },
                {
                    text: 'Verwijderen',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await AsyncStorage.removeItem(key);
                            setGardens(prev => prev.filter(g => g.key !== key));
                        } catch (err) {
                            console.error('Verwijderen mislukt', err);
                        }
                    }
                }
            ]
        );
    };

    const sortedGardens = useMemo(() => {
        let arr = [...gardens];

        if (selectedCoverageFilter === 'above50') {
            arr = arr.filter(g => parseFloat(g.coverage) > 50);
        } else if (selectedCoverageFilter === 'below50') {
            arr = arr.filter(g => parseFloat(g.coverage) <= 50);
        }

        const lowerSearch = searchText.toLowerCase().trim();
        if (lowerSearch) {
            arr = arr.filter(g => g.title.toLowerCase().includes(lowerSearch));
        }

        switch (selectedSort) {
            case 'alfabetisch':
                arr.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'oppervlak':
                arr.sort((a, b) => parseFloat(b.area) - parseFloat(a.area));
                break;
            case 'dekking':
                arr.sort((a, b) => parseFloat(b.coverage) - parseFloat(a.coverage));
                break;
        }

        return arr;
    }, [gardens, selectedSort, selectedCoverageFilter, searchText]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.searchContainer}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        placeholder="Zoeken…"
                        placeholderTextColor="#999"
                        style={styles.searchInput}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <TouchableOpacity style={styles.searchButtonContainer}>
                        <Text style={styles.searchButtonText}>Zoek</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setFilterModalVisible(true)}
                    >
                        <Ionicons name="filter" size={18} color="#1F2937" />
                        <Text style={styles.actionButtonText}>Filters</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.newGardenButton}
                        onPress={() => navigation.navigate('Garden', { screen: 'Instellingen' })}
                    >
                        <View style={styles.newGardenIcon}>
                            <Ionicons name="add" size={24} color="#FFF" />
                        </View>
                        <Text style={styles.newGardenText}>Nieuwe tuin</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setSortModalVisible(true)}
                    >
                        <Ionicons name="swap-vertical" size={18} color="#1F2937" />
                        <Text style={styles.actionButtonText}>Sorteren op</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.gardensList}>
                    {sortedGardens.map((g, idx) => (
                        <GardenCard
                            key={idx}
                            {...g}
                            onPress={() => console.log(`${g.title} pressed`)}
                            onDelete={() => deleteGarden(g.key)}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Sort Modal */}
            <Modal
                transparent
                visible={sortModalVisible}
                animationType="fade"
                onRequestClose={() => setSortModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setSortModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Sorteer op:</Text>
                    {['alfabetisch', 'oppervlak', 'dekking'].map(option => (
                        <TouchableOpacity
                            key={option}
                            style={styles.radioOption}
                            onPress={() => {
                                setSelectedSort(option);
                                setSortModalVisible(false);
                            }}
                        >
                            <View style={styles.radioCircleOuter}>
                                {selectedSort === option && <View style={styles.radioCircleInner} />}
                            </View>
                            <Text style={styles.radioLabel}>
                                {option === 'alfabetisch'
                                    ? 'Alfabetisch'
                                    : option === 'oppervlak'
                                        ? 'Oppervlak'
                                        : 'Plantendekking'}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>

            {/* Filter Modal */}
            <Modal
                transparent
                visible={filterModalVisible}
                animationType="fade"
                onRequestClose={() => setFilterModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Filter op plantendekking</Text>
                    {[
                        { label: 'Alles', value: null },
                        { label: 'Meer dan 50%', value: 'above50' },
                        { label: '50% of minder', value: 'below50' }
                    ].map(option => (
                        <TouchableOpacity
                            key={option.label}
                            style={styles.radioOption}
                            onPress={() => {
                                setSelectedCoverageFilter(option.value);
                                setFilterModalVisible(false);
                            }}
                        >
                            <View style={styles.radioCircleOuter}>
                                {selectedCoverageFilter === option.value && <View style={styles.radioCircleInner} />}
                            </View>
                            <Text style={styles.radioLabel}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:       { flex:1, backgroundColor:'#F9FAFB' },
    content:         { flex:1, paddingHorizontal:20 },
    searchContainer: {
        flexDirection:'row',alignItems:'center',
        backgroundColor:'#FFF',borderRadius:25,
        paddingHorizontal:15,paddingVertical:12,
        marginTop:30,marginBottom:20,
        shadowColor:'#000',shadowOffset:{width:0,height:2},
        shadowOpacity:0.1,shadowRadius:8,elevation:4,
    },
    searchIcon:      { marginRight:10 },
    searchInput:     { flex:1,fontSize:16,color:'#1F2937' },
    searchButtonContainer: {},
    searchButtonText:{},

    actionButtonsContainer: {
        flexDirection:'row',justifyContent:'space-between',
        alignItems:'center',marginBottom:30,gap:10,
    },
    actionButton:    {
        flex:1,flexDirection:'row',
        justifyContent:'center',alignItems:'center',
        backgroundColor:'#FFF',paddingHorizontal:15,
        paddingVertical:10,borderRadius:20,
        shadowColor:'#000',shadowOffset:{width:0,height:2},
        shadowOpacity:0.1,shadowRadius:4,elevation:2,
    },
    actionButtonText:{ marginLeft:5,fontSize:14,color:'#1F2937',fontWeight:'500' },

    newGardenButton: { flex:1,alignItems:'center',justifyContent:'center' },
    newGardenIcon:   {
        width:50,height:50,borderRadius:25,
        backgroundColor:'#455736',
        justifyContent:'center',alignItems:'center',
        marginBottom:5,
    },
    newGardenText:   { fontSize:12,color:'#1F2937',fontWeight:'500' },

    gardensList:     { paddingBottom:80 },
    gardenCard:      {
        backgroundColor:'#FFF',borderRadius:16,
        padding:20,marginBottom:15,
        flexDirection:'row',justifyContent:'space-between',alignItems:'center',
        shadowColor:'#000',shadowOffset:{width:0,height:2},
        shadowOpacity:0.1,shadowRadius:8,elevation:4,
    },
    gardenInfo:      { flex:1 },
    gardenTitle:     { fontSize:20,fontWeight:'bold',color:'#1F2937',marginBottom:8 },
    gardenLabel:     { fontSize:14,fontWeight:'bold',color:'#374151',marginTop:6 },
    gardenDetail:    { fontSize:14,color:'#6B7280',marginBottom:2 },
    gardenVisual:    { flexDirection:'row',alignItems:'center' },
    chevron:         { marginLeft:10 },

    modalOverlay:    { flex:1,backgroundColor:'rgba(0,0,0,0.4)' },
    modalContent:    {
        position:'absolute',top:'30%',left:'10%',right:'10%',
        backgroundColor:'#FFF',borderRadius:10,padding:20,
        shadowColor:'#000',shadowOffset:{width:0,height:2},
        shadowOpacity:0.2,shadowRadius:8,elevation:5,
    },
    modalTitle:      {
        fontSize:18,fontWeight:'bold',textAlign:'center',
        marginBottom:15,color:'#1F2937'
    },
    radioOption:     {
        flexDirection:'row',alignItems:'center',paddingVertical:12
    },
    radioCircleOuter:{
        width:20,height:20,borderRadius:10,borderWidth:2,
        borderColor:'#455736',alignItems:'center',
        justifyContent:'center',marginRight:10
    },
    radioCircleInner:{
        width:10,height:10,borderRadius:5,backgroundColor:'#455736'
    },
    radioLabel:      { fontSize:16,color:'#1F2937' },
    gridContainer:   { marginRight:10 },
    gridRow:         { flexDirection:'row' },
    gridCell:        { margin:1,borderRadius:2 },
});

export default MyGardens;
