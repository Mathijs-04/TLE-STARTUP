import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';

const MATERIALS = {
    grass: { name: 'Grass', color: '#8BC34A' },
    tiles: { name: 'Tiles', color: '#9E9E9E' },
    dirt: { name: 'Dirt', color: '#795548' },
    flowers: { name: 'Flowers', color: '#E91E63' },
    water: { name: 'Water', color: '#2196F3' },
    wood: { name: 'Wood', color: '#5D4037' },
};

export default function Editor({ navigation }) {
    const [grid, setGrid] = useState([]);
    const [rows, setRows] = useState(10);
    const [cols, setCols] = useState(10);
    const [selectedMaterial, setSelectedMaterial] = useState('grass');
    const [mode, setMode] = useState('brush');

    // Initialize grid
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

    // Handle cell tap
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Garden Editor</Text>
                <Text style={styles.subtitle}>1 block = 1 square meter</Text>
            </View>

            <View style={styles.controls}>
                <View style={styles.sizeControls}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Rows:</Text>
                        <TextInput
                            style={styles.input}
                            value={String(rows)}
                            onChangeText={text => setRows(Number(text) || 10)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Columns:</Text>
                        <TextInput
                            style={styles.input}
                            value={String(cols)}
                            onChangeText={text => setCols(Number(text) || 10)}
                            keyboardType="numeric"
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={initializeGrid}
                    >
                        <Text style={styles.buttonText}>Create Grid</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.toolSelector}>
                    <TouchableOpacity
                        style={[styles.toolButton, mode === 'brush' && styles.activeTool]}
                        onPress={() => setMode('brush')}
                    >
                        <Text style={styles.toolText}>Paint</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.toolButton, mode === 'eraser' && styles.activeTool]}
                        onPress={() => setMode('eraser')}
                    >
                        <Text style={styles.toolText}>Erase</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.materialContainer}>
                    <Text style={styles.sectionLabel}>Materials:</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.materialScroll}
                    >
                        {Object.entries(MATERIALS).map(([key, material]) => (
                            <TouchableOpacity
                                key={key}
                                style={[
                                    styles.materialButton,
                                    { backgroundColor: material.color },
                                    selectedMaterial === key && styles.selectedMaterial
                                ]}
                                onPress={() => {
                                    setSelectedMaterial(key);
                                    setMode('brush');
                                }}
                            >
                                <Text style={styles.materialText}>{material.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>

            <View style={styles.gridContainer}>
                {grid.length > 0 ? (
                    grid.map((row, rowIndex) => (
                        <View key={`row-${rowIndex}`} style={styles.row}>
                            {row.map((cell, colIndex) => (
                                <TouchableOpacity
                                    key={cell.key}
                                    style={[
                                        styles.cell,
                                        {
                                            backgroundColor: cell.material === 'empty'
                                                ? '#F9F9F9'
                                                : MATERIALS[cell.material].color,
                                            borderColor: cell.material === 'empty' ? '#E0E0E0' : 'rgba(0,0,0,0.1)'
                                        }
                                    ]}
                                    onPress={() => handleCellTap(rowIndex, colIndex)}
                                />
                            ))}
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyGrid}>
                        <Text style={styles.emptyText}>Create a grid to start designing</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        marginBottom: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2E7D32',
    },
    subtitle: {
        fontSize: 14,
        color: '#616161',
        marginTop: 4,
    },
    controls: {
        marginBottom: 20,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        padding: 16,
        elevation: 2,
    },
    sizeControls: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputGroup: {
        flex: 1,
        marginRight: 10,
    },
    label: {
        marginBottom: 4,
        fontSize: 14,
        color: '#616161',
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: 'center',
        marginTop: 18,
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
    },
    toolSelector: {
        flexDirection: 'row',
        marginBottom: 16,
        justifyContent: 'center',
    },
    toolButton: {
        padding: 12,
        backgroundColor: '#EEEEEE',
        marginHorizontal: 6,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center',
    },
    toolText: {
        fontWeight: '500',
        color: '#424242',
    },
    activeTool: {
        backgroundColor: '#C8E6C9',
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    materialContainer: {
        marginBottom: 8,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#424242',
        marginBottom: 8,
    },
    materialScroll: {
        paddingHorizontal: 4,
    },
    materialButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 8,
        borderRadius: 20,
        minWidth: 70,
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
    },
    selectedMaterial: {
        borderWidth: 2,
        borderColor: '#212121',
    },
    materialText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 12,
    },
    gridContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#F9F9F9',
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        width: 30,
        height: 30,
        borderWidth: 0.5,
    },
    emptyGrid: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#9E9E9E',
        textAlign: 'center',
    },
});
