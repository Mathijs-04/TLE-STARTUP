import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MATERIALS = {
    grass: { name: 'Grass', image: require('../assets/materials/grass.webp') },
    hedge: { name: 'Hedge', image: require('../assets/materials/hedge.webp') },
    tiles: { name: 'Tiles', image: require('../assets/materials/tiles.webp') },
    dirt: { name: 'Dirt', image: require('../assets/materials/dirt.webp') },
    flowers: { name: 'Flowers', image: require('../assets/materials/flowers.webp') },
    water: { name: 'Water', image: require('../assets/materials/water.webp') },
    sand: { name: 'Sand', image: require('../assets/materials/sand.webp') },
};

const MATERIAL_CODES = {
    grass: 'G',
    hedge: 'H',
    tiles: 'T',
    dirt: 'D',
    flowers: 'F',
    water: 'W',
    sand: 'S',
    empty: 'E',
};

const CODE_TO_MATERIAL = Object.fromEntries(
    Object.entries(MATERIAL_CODES).map(([key, value]) => [value, key])
);

export default function Garden({ navigation }) {
    const [grid, setGrid] = useState([]);
    const [rows, setRows] = useState(10);
    const [cols, setCols] = useState(10);
    const [selectedMaterial, setSelectedMaterial] = useState('grass');
    const [mode, setMode] = useState('brush');
    const [saveCount, setSaveCount] = useState(0);

    useEffect(() => {
        (async () => {
            const keys = await AsyncStorage.getAllKeys();
            const gardenKeys = keys.filter(k => k.startsWith('garden_'));
            setSaveCount(gardenKeys.length);
        })();
    }, []);

    const initializeGrid = () => {
        const newGrid = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push({ material: 'empty', key: `${i}-${j}` });
            }
            newGrid.push(row);
        }
        setGrid(newGrid);
    };

    const handleCellTap = (rowIndex, colIndex) => {
        if (!grid.length) return;

        setGrid(prev => {
            const newGrid = [...prev];
            const newRow = [...newGrid[rowIndex]];

            if (mode === 'eraser') {
                newRow[colIndex] = { ...newRow[colIndex], material: 'empty' };
            } else {
                newRow[colIndex] = { ...newRow[colIndex], material: selectedMaterial };
            }

            newGrid[rowIndex] = newRow;
            return newGrid;
        });
    };

    const eraseAll = () => {
        setGrid(prev => prev.map(row => row.map(cell => ({ ...cell, material: 'empty' }))));
    };

    const fillAll = () => {
        setGrid(prev => prev.map(row => row.map(cell => ({ ...cell, material: selectedMaterial }))));
    };

    const saveGarden = async () => {
        if (!grid.length) {
            Alert.alert('Save Failed', 'No grid to save.');
            return;
        }

        const exportArray = [];
        grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell.material !== 'empty') {
                    const code = MATERIAL_CODES[cell.material];
                    exportArray.push(`${rowIndex}.${colIndex}.${code}`);
                }
            });
        });

        const exportObject = {
            rows,
            cols,
            data: exportArray
        };

        const newSaveNumber = saveCount + 1;
        await AsyncStorage.setItem(`garden_${newSaveNumber}`, JSON.stringify(exportObject));
        setSaveCount(newSaveNumber);
        Alert.alert('Saved', `Garden ${newSaveNumber} saved.`);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.settingsRow}>
                <Text style={styles.barText}>B:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Rows"
                    value={rows.toString()}
                    onChangeText={(text) => {
                        const value = Math.max(1, Math.min(15, parseInt(text) || 0));
                        setRows(value);
                    }}
                />
                <Text style={styles.barText}>m </Text>
                <Text style={styles.barText}>   L:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Cols"
                    value={cols.toString()}
                    onChangeText={(text) => {
                        const value = Math.max(1, Math.min(15, parseInt(text) || 0));
                        setCols(value);
                    }}
                />
                <Text style={styles.barText}>m    </Text>
                <TouchableOpacity style={styles.gridButton} onPress={initializeGrid}>
                    <Text style={styles.gridButtonText}>Maak tuin</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.gridContainer}>
                {grid.length > 0 ? (
                    grid.map((row, rowIndex) => (
                        <View key={`row-${rowIndex}`} style={styles.row}>
                            {row.map((cell, colIndex) => (
                                <TouchableOpacity
                                    key={cell.key}
                                    style={styles.cell}
                                    onPress={() => handleCellTap(rowIndex, colIndex)}
                                >
                                    {cell.material !== 'empty' && (
                                        <Image
                                            source={MATERIALS[cell.material].image}
                                            style={styles.materialImage}
                                            resizeMode="cover"
                                        />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyGrid}>
                        <Text style={styles.emptyText}>Create a grid to start</Text>
                    </View>
                )}
            </View>

            <View style={styles.toolbarContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.materialRow}>
                    {Object.entries(MATERIALS).map(([key, material]) => (
                        <TouchableOpacity
                            key={key}
                            style={[
                                styles.materialButton,
                                selectedMaterial === key && styles.selectedMaterial
                            ]}
                            onPress={() => {
                                setSelectedMaterial(key);
                                setMode('brush');
                            }}
                        >
                            <Image source={material.image} style={styles.toolbarImage} resizeMode="cover" />
                            <Text style={styles.materialText}>{material.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={[styles.toolButton, mode === 'eraser' && styles.activeTool]}
                        onPress={() => setMode('eraser')}
                    >
                        <Text style={styles.toolText}>Gum</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolButton} onPress={eraseAll}>
                        <Text style={styles.toolText}>Gum Alles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolButton} onPress={fillAll}>
                        <Text style={styles.toolText}>Vul Alles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolButton} onPress={saveGarden}>
                        <Text style={styles.toolText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: '#FFFFFF', marginBottom: 80},
    settingsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#849970',
        borderBottomWidth: 1,
        borderColor: '#455736'
    },
    input: {
        width: 60,
        height: 40,
        borderColor: '#BDBDBD',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 6,
        marginHorizontal: 6,
        fontSize: 14,
        backgroundColor: '#FFFFFF',
        textAlign: 'center'
    },
    barText: {color: 'white'},
    gridButton: {
        backgroundColor: '#455736',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8
    },
    gridButtonText: {color: '#FFFFFF'},
    gridContainer: {flex: 1, justifyContent: "center", alignItems: 'center', padding: 8},
    row: {flexDirection: 'row'},
    cell: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center'
    },
    materialImage: {width: 28, height: 28},
    emptyGrid: {flex: 1, justifyContent: 'center', alignItems: 'center'},
    emptyText: {color: '#999999'},
    toolbarContainer: {padding: 8, backgroundColor: '#849970'},
    materialRow: {flexDirection: 'row', alignItems: 'center'},
    materialButton: {
        width: 60,
        height: 60,
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#455736'
    },
    selectedMaterial: {borderWidth: 2, borderColor: '#FFFFFF'},
    toolbarImage: {width: 40, height: 40},
    materialText: {fontSize: 10, textAlign: 'center', color: 'white'},
    actionRow: {flexDirection: 'row', justifyContent: 'space-around', marginTop: 8},
    toolButton: {
        backgroundColor: '#455736',
        padding: 8,
        borderRadius: 8
    },
    activeTool: {backgroundColor: '#FF9800'},
    toolText: {color: '#FFFFFF'},
    importInput: {
        height: 100,
        margin: 8,
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        textAlignVertical: 'top'
    },
    exportPopup: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#999'
    },
    exportText: {color: '#000'},
    copyButton: {
        backgroundColor: '#455736',
        padding: 8,
        borderRadius: 8,
        marginTop: 8
    },
    copyButtonText: {color: '#FFFFFF', textAlign: 'center'}
});

