import React, { useState } from 'react';
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
    Clipboard
} from 'react-native';

const MATERIALS = {
    grass: { name: 'Grass', color: '#8BC34A' },
    tiles: { name: 'Tiles', color: '#9E9E9E' },
    dirt: { name: 'Dirt', color: '#795548' },
    flowers: { name: 'Flowers', color: '#E91E63' },
    water: { name: 'Water', color: '#2196F3' },
    wood: { name: 'Sand', color: '#d5ba0a' },
};

const MATERIAL_CODES = {
    grass: 'G',
    tiles: 'T',
    dirt: 'D',
    flowers: 'F',
    water: 'W',
    wood: 'S',
    empty: 'E',
};

const CODE_TO_MATERIAL = Object.fromEntries(
    Object.entries(MATERIAL_CODES).map(([key, value]) => [value, key])
);

export default function Editor({ navigation }) {
    const [grid, setGrid] = useState([]);
    const [rows, setRows] = useState(10);
    const [cols, setCols] = useState(10);
    const [selectedMaterial, setSelectedMaterial] = useState('grass');
    const [mode, setMode] = useState('brush');
    const [importString, setImportString] = useState('');
    const [showImport, setShowImport] = useState(false);
    const [exportString, setExportString] = useState('');
    const [showExport, setShowExport] = useState(false);

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

    const exportGrid = () => {
        if (!grid.length) {
            Alert.alert('Export Failed', 'No grid to export.');
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

        const jsonString = JSON.stringify(exportObject, null, 2);
        setExportString(jsonString);
        setShowExport(true);
    };

    const copyToClipboard = () => {
        Clipboard.setString(exportString);
        Alert.alert('Copied', 'Exported JSON copied to clipboard!');
    };

    const importGrid = () => {
        try {
            const obj = JSON.parse(importString);
            if (!obj.rows || !obj.cols || !Array.isArray(obj.data)) {
                Alert.alert('Import Error', 'Invalid format.');
                return;
            }

            const newGrid = [];
            for (let i = 0; i < obj.rows; i++) {
                const row = [];
                for (let j = 0; j < obj.cols; j++) {
                    row.push({ material: 'empty', key: `${i}-${j}` });
                }
                newGrid.push(row);
            }

            obj.data.forEach(entry => {
                const [r, c, code] = entry.split('.');
                if (newGrid[r] && newGrid[r][c] && CODE_TO_MATERIAL[code]) {
                    newGrid[r][c].material = CODE_TO_MATERIAL[code];
                }
            });

            setRows(obj.rows);
            setCols(obj.cols);
            setGrid(newGrid);
            Alert.alert('Import Successful', 'Grid imported.');
        } catch (error) {
            Alert.alert('Import Error', 'Invalid JSON.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.header}>
                <Text style={styles.title}>Garden Editor</Text>
                <Text style={styles.subtitle}>1 block = 1 square meter</Text>
            </View>

            {/* Grid Settings */}
            <View style={styles.settingsRow}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Rows"
                    value={rows.toString()}
                    onChangeText={(text) => setRows(parseInt(text) || 0)}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Cols"
                    value={cols.toString()}
                    onChangeText={(text) => setCols(parseInt(text) || 0)}
                />
                <TouchableOpacity style={styles.gridButton} onPress={initializeGrid}>
                    <Text style={styles.gridButtonText}>New Grid</Text>
                </TouchableOpacity>
            </View>

            {/* Grid Area */}
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
                        <Text style={styles.emptyText}>Create a grid to start</Text>
                    </View>
                )}
            </View>

            {/* 2-Layer Toolbar */}
            <View style={styles.toolbarContainer}>
                {/* Material Selection */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.materialRow}>
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

                {/* Action Buttons */}
                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={[styles.toolButton, mode === 'eraser' && styles.activeTool]}
                        onPress={() => setMode('eraser')}
                    >
                        <Text style={styles.toolText}>Erase</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toolButton} onPress={exportGrid}>
                        <Text style={styles.toolText}>Export</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.toolButton}
                        onPress={() => {
                            if (showImport) importGrid();
                            setShowImport(!showImport);
                        }}
                    >
                        <Text style={styles.toolText}>{showImport ? 'Confirm Import' : 'Import'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Import Text Field */}
            {showImport && (
                <TextInput
                    style={styles.importInput}
                    value={importString}
                    onChangeText={setImportString}
                    placeholder="Paste JSON here"
                    multiline
                />
            )}

            {/* Export Popup */}
            {showExport && (
                <View style={styles.exportPopup}>
                    <ScrollView>
                        <Text style={styles.exportText}>{exportString}</Text>
                    </ScrollView>
                    <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                        <Text style={styles.copyButtonText}>Copy to Clipboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.copyButton} onPress={() => setShowExport(false)}>
                        <Text style={styles.copyButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { padding: 8, alignItems: 'center' },
    title: { fontSize: 20, fontWeight: '600', color: '#2E7D32' },
    subtitle: { fontSize: 12, color: '#757575' },

    settingsRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
    },
    input: {
        width: 60,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 6,
        marginHorizontal: 4,
        fontSize: 12,
        textAlign: 'center'
    },
    gridButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4
    },
    gridButtonText: { color: '#fff', fontSize: 12 },

    gridContainer: { flex: 7, justifyContent: 'center', alignItems: 'center' },
    row: { flexDirection: 'row' },
    cell: { width: 25, height: 25, borderWidth: 0.5 },
    emptyGrid: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { color: '#9E9E9E' },

    toolbarContainer: {
        paddingVertical: 4,
        backgroundColor: '#F0F0F0',
    },
    materialRow: {
        justifyContent: 'center',
        paddingHorizontal: 4,
        paddingVertical: 4
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 4,
    },

    materialButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        marginHorizontal: 4,
        borderRadius: 4,
        minWidth: 50,
        height: 50,
    },
    materialText: { fontSize: 10, color: '#fff', textAlign: 'center' },
    selectedMaterial: { borderWidth: 2, borderColor: '#000' },

    toolButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#E0E0E0',
        marginHorizontal: 4,
        borderRadius: 4
    },
    activeTool: { backgroundColor: '#C8E6C9' },
    toolText: { fontSize: 12 },

    importInput: {
        height: 60,
        borderColor: '#ddd',
        borderWidth: 1,
        margin: 4,
        padding: 4,
        fontSize: 12,
        borderRadius: 4
    },

    exportPopup: {
        position: 'absolute',
        top: '20%',
        left: '10%',
        right: '10%',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        maxHeight: '60%',
    },
    exportText: { fontSize: 10, color: '#333' },
    copyButton: {
        marginTop: 8,
        padding: 8,
        backgroundColor: '#4CAF50',
        borderRadius: 4
    },
    copyButtonText: { color: '#fff', textAlign: 'center', fontSize: 12 }
});
