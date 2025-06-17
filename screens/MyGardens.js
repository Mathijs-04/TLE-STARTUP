import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
            {gridData.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.gridRow}>
                    {row.map((cell, cellIndex) => (
                        <View
                            key={cellIndex}
                            style={[
                                styles.gridCell,
                                {
                                    backgroundColor: getColor(cell),
                                    width: cellSize,
                                    height: cellSize,
                                }
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
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" style={styles.chevron} />
        </View>
    </TouchableOpacity>
);

const MyGardens = ({ onBack }) => {
    const [searchText, setSearchText] = useState('');

    // Garden data
    const thuisGrid = [
        ['gray', 'yellow', 'yellow', 'yellow'],
        ['gray', 'yellow', 'green', 'yellow'],
        ['gray', 'green', 'green', 'green'],
        ['white', 'white', 'white', 'white'],
    ];

    const burenGrid = [
        ['green', 'yellow', 'yellow', 'yellow'],
        ['yellow', 'green', 'green', 'green'],
        ['yellow', 'green', 'green', 'green'],
        ['gray', 'gray', 'gray', 'gray'],
    ];

    const droomtuinGrid = [
        ['yellow', 'gray', 'yellow', 'green', 'green', 'green', 'green', 'green'],
        ['yellow', 'gray', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'green'],
        ['yellow', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray', 'gray'],
        ['yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'gray'],
        ['green', 'green', 'yellow', 'gray', 'yellow', 'green', 'green', 'gray'],
        ['green', 'green', 'green', 'gray', 'green', 'green', 'green', 'gray'],
    ];

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Title */}

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
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
                        <Ionicons name="filter" size={18} color="#1F2937" />
                        <Text style={styles.actionButtonText}>Filters</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.newGardenButton}>
                        <View style={styles.newGardenIcon}>
                            <Ionicons name="add" size={24} color="#FFFFFF" />
                        </View>
                        <Text style={styles.newGardenText}>Nieuwe tuin</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="swap-vertical" size={18} color="#1F2937" />
                        <Text style={styles.actionButtonText}>Sorteren op</Text>
                    </TouchableOpacity>
                </View>

                {/* Garden Cards */}
                <View style={styles.gardensList}>
                    <GardenCard
                        title="Thuis"
                        dimensions="1.5m x 2m"
                        area="5m2"
                        coverage="75%"
                        gridData={thuisGrid}
                        gridSize="small"
                        onPress={() => console.log('Thuis garden pressed')}
                    />

                    <GardenCard
                        title="Buren"
                        dimensions="2m x 2.5m"
                        area="5m2"
                        coverage="71%"
                        gridData={burenGrid}
                        gridSize="small"
                        onPress={() => console.log('Buren garden pressed')}
                    />

                    <GardenCard
                        title="Droomtuin"
                        dimensions="5m x 5m"
                        area="25m2"
                        coverage="84%"
                        gridData={droomtuinGrid}
                        gridSize="large"
                        onPress={() => console.log('Droomtuin garden pressed')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        position: 'relative',
        height: 120,
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 40,
    },


    content: {
        flex: 1,
        paddingHorizontal: 20,
    },


    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 20,
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1F2937',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    actionButtonText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#1F2937',
        fontWeight: '500',
    },
    newGardenButton: {
        alignItems: 'center',
    },
    newGardenIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#6B8E23',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    newGardenText: {
        fontSize: 12,
        color: '#1F2937',
        fontWeight: '500',
    },
    gardensList: {
        paddingBottom: 20,
    },
    gardenCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    gardenInfo: {
        flex: 1,
    },
    gardenTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 8,
    },
    gardenDetail: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 2,
    },
    gardenVisual: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gridContainer: {
        marginRight: 10,
    },
    gridRow: {
        flexDirection: 'row',
    },
    gridCell: {
        margin: 1,
        borderRadius: 2,
    },
    chevron: {
        marginLeft: 10,
    },
});

export default MyGardens;