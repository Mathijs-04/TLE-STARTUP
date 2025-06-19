// screens/MyGardens.js
import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GardenGrid = ({ gridData, size = 'small' }) => {
    const getColor = (color) => {
        switch (color) {
            case 'yellow': return '#E8F542';
            case 'green':  return '#6B8E23';
            case 'gray':   return '#9CA3AF';
            default:       return '#F3F4F6';
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

const GardenCard = ({ title, dimensions, area, coverage, gridData, gridSize, onPress }) => (
    <TouchableOpacity style={styles.gardenCard} onPress={onPress}>
        <View style={styles.gardenInfo}>
            <Text style={styles.gardenTitle}>{title}</Text>
            <Text style={styles.gardenDetail}>Afmetingen:</Text>
            <Text style={styles.gardenDetail}>{dimensions}</Text>
            <Text style={styles.gardenDetail}>{area}</Text>
            <Text style={styles.gardenDetail}>Planten dekking:</Text>
            <Text style={styles.gardenDetail}>{coverage}</Text>
        </View>
        <View style={styles.gardenVisual}>
            <GardenGrid gridData={gridData} size={gridSize} />
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" style={styles.chevron}/>
        </View>
    </TouchableOpacity>
);

const MyGardens = () => {
    const [searchText, setSearchText] = useState('');
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const [selectedSort, setSelectedSort] = useState('alfabetisch');

    // voorbeelddata
    const allGardens = [
        {
            title: 'Thuis',
            dimensions: '1.5m x 2m',
            area: '5m²',
            coverage: '75%',
            gridData: [
                ['gray', 'green', 'yellow'],
                ['green', 'green', 'yellow'],
                ['gray', 'gray', 'green']
            ],
            gridSize: 'small'
        },
        {
            title: 'Buren',
            dimensions: '2m x 2.5m',
            area: '5m²',
            coverage: '71%',
            gridData: [
                ['yellow', 'green', 'gray'],
                ['green', 'yellow', 'green'],
                ['gray', 'green', 'green']
            ],
            gridSize: 'small'
        },
        {
            title: 'Droomtuin',
            dimensions: '5m x 5m',
            area: '25m²',
            coverage: '84%',
            gridData: [
                ['green', 'green', 'yellow', 'gray', 'green'],
                ['gray', 'yellow', 'green', 'green', 'gray'],
                ['yellow', 'gray', 'green', 'yellow', 'green'],
                ['green', 'green', 'gray', 'green', 'yellow'],
                ['gray', 'yellow', 'gray', 'yellow', 'green']
            ],
            gridSize: 'large'
        }
    ];


    // sorteerfunctie
    const sortedGardens = [...allGardens].sort((a,b) => {
        if (selectedSort==='alfabetisch') return a.title.localeCompare(b.title);
        if (selectedSort==='oppervlak') return parseFloat(a.area) - parseFloat(b.area);
        if (selectedSort==='dekking') return parseFloat(b.coverage) - parseFloat(a.coverage);
        return 0;
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon}/>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Zoeken..."
                        placeholderTextColor="#9CA3AF"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="filter" size={18} color="#1F2937"/>
                        <Text style={styles.actionButtonText}>Filters</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.newGardenButton}>
                        <View style={styles.newGardenIcon}>
                            <Ionicons name="add" size={24} color="#FFF"/>
                        </View>
                        <Text style={styles.newGardenText}>Nieuwe tuin</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => setSortModalVisible(true)}
                    >
                        <Ionicons name="swap-vertical" size={18} color="#1F2937"/>
                        <Text style={styles.actionButtonText}>Sorteren op</Text>
                    </TouchableOpacity>
                </View>

                {/* Garden Cards */}
                <View style={styles.gardensList}>
                    {sortedGardens.map((g, idx) => (
                        <GardenCard
                            key={idx}
                            {...g}
                            onPress={() => console.log(`${g.title} pressed`)}
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
                                setTimeout(() => setSortModalVisible(false), 0);
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


r
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex:1, backgroundColor:'#F9FAFB' },
    content:   { flex:1, paddingHorizontal:20 },
    searchContainer: {
        flexDirection:'row',alignItems:'center',
        backgroundColor:'#FFF',borderRadius:25,
        paddingHorizontal:15,paddingVertical:12,
        marginTop:30,marginBottom:20,
        shadowColor:'#000',shadowOffset:{width:0,height:2},
        shadowOpacity:0.1,shadowRadius:8,elevation:4,
    },
    searchIcon:{marginRight:10},
    searchInput:{flex:1,fontSize:16,color:'#1F2937'},

    actionButtonsContainer:{
        flexDirection:'row',justifyContent:'space-between',
        alignItems:'center',marginBottom:30,gap:10,
    },
    actionButton:{
        flex:1,flexDirection:'row',
        justifyContent:'center',alignItems:'center',
        backgroundColor:'#FFF',paddingHorizontal:15,
        paddingVertical:10,borderRadius:20,
        shadowColor:'#000',shadowOffset:{width:0,height:2},
        shadowOpacity:0.1,shadowRadius:4,elevation:2,
    },
    actionButtonText:{marginLeft:5,fontSize:14,color:'#1F2937',fontWeight:'500'},

    newGardenButton:{flex:1,alignItems:'center',justifyContent:'center'},
    newGardenIcon:{
        width:50,height:50,borderRadius:25,
        backgroundColor:'#455736',
        justifyContent:'center',alignItems:'center',
        marginBottom:5,
    },
    newGardenText:{fontSize:12,color:'#1F2937',fontWeight:'500'},

    gardensList:{paddingBottom:20},
    gardenCard:{
        backgroundColor:'#FFF',borderRadius:16,
        padding:20,marginBottom:15,
        flexDirection:'row',justifyContent:'space-between',alignItems:'center',
        shadowColor:'#000',shadowOffset:{width:0,height:2},
        shadowOpacity:0.1,shadowRadius:8,elevation:4,
    },
    gardenInfo:{flex:1},
    gardenTitle:{fontSize:20,fontWeight:'bold',color:'#1F2937',marginBottom:8},
    gardenDetail:{fontSize:14,color:'#6B7280',marginBottom:2},
    gardenVisual:{flexDirection:'row',alignItems:'center'},
    chevron:{marginLeft:10},

    gridContainer:{marginRight:10},
    gridRow:{flexDirection:'row'},
    gridCell:{margin:1,borderRadius:2},

    // Modal
    modalOverlay:{
        flex:1,backgroundColor:'rgba(0,0,0,0.4)',
    },
    modalContent:{
        position:'absolute',top:'30%',left:'10%',right:'10%',
        backgroundColor:'#FFF',borderRadius:10,padding:20,
        shadowColor:'#000',shadowOffset:{width:0,height:2},
        shadowOpacity:0.2,shadowRadius:8,elevation:5,
    },
    modalOption:{
        paddingVertical:12,
        borderBottomWidth:1,borderBottomColor:'#EEE',
    },
    modalOptionSelected:{
        backgroundColor:'#E8F542',
        borderRadius:5,
    },
    modalOptionText:{
        fontSize:16,color:'#1F2937',textAlign:'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#1F2937',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    radioCircleOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#455736',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    radioCircleInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#455736',
    },
    radioLabel: {
        fontSize: 16,
        color: '#1F2937',
    },

});

export default MyGardens;
