// screens/iconComponents/FormScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';

// ✅ Import vector icons
import BeeIcon from './iconComponents/BeeIcon';
import ButterflyIcon from './iconComponents/ButterflyIcon';
import BirdIcon from './iconComponents/BirdIcon';

const FormScreen = () => {
    const [lighting, setLighting] = useState({ sun: false, partial: true, shade: false });
    const [animals, setAnimals] = useState({ bees: true, butterflies: false, birds: false });

    const lightingOptions = [
        { key: 'sun', label: 'Veel zon', bg: '#FFFF33' },
        { key: 'partial', label: 'Zon/Schaduw', bg: '#FFFF33', overlay: true },
        { key: 'shade', label: 'Schaduw', bg: '#666666' },
    ];

    const animalOptions = [
        { key: 'bees', label: 'Bijen', bg: '#FFFF33', Icon: BeeIcon },
        { key: 'butterflies', label: 'Vlinders', bg: '#FF33FF', Icon: ButterflyIcon },
        { key: 'birds', label: 'Vogels', bg: '#33DD33', Icon: BirdIcon },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.backButton}></TouchableOpacity>
            <TouchableOpacity style={styles.profileIcon}></TouchableOpacity>

            <Text style={styles.title}>Maak een nieuwe tuin</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Belichting</Text>
                <View style={styles.row}>
                    {lightingOptions.map(({ key, label, bg, overlay }) => (
                        <View key={key} style={styles.centeredItem}>
                            <View style={[styles.circle, { backgroundColor: bg }]}>
                                {overlay && <View style={styles.overlayHalf} />}
                            </View>
                            <Text style={styles.optionLabel}>{label}</Text>
                            <RadioButton
                                value={key}
                                status={lighting === key ? 'checked' : 'unchecked'}
                                onPress={() => setLighting(key)}
                                color="#2E342A"
                                uncheckedColor="#2E342A"
                                style={styles.radioButton}
                            />
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Welke dieren wilt u aantrekken?</Text>
                <View style={styles.row}>
                    {animalOptions.map(({ key, label, bg, Icon }) => (
                        <View key={key} style={styles.centeredItem}>
                            <View style={[styles.circle, { backgroundColor: bg }]}>
                                <Icon width={40} height={40} color="#2E342A" />
                            </View>
                            <Text style={styles.optionLabel}>{label}</Text>
                            <Checkbox
                                status={animals[key] ? 'checked' : 'unchecked'}
                                onPress={() => setAnimals({ ...animals, [key]: !animals[key] })}
                                color="#2E342A"
                                uncheckedColor="#2E342A"
                                style={styles.checkbox}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: '#fff', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#000', textAlign: 'center' },
    section: { marginBottom: 30, width: '100%' },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 15, color: '#000', textAlign: 'center' },
    row: { flexDirection: 'row', justifyContent: 'space-around' },
    centeredItem: { alignItems: 'center' },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    overlayHalf: {
        position: 'absolute',
        right: 0,
        width: '50%',
        height: '100%',
        backgroundColor: '#555',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    optionLabel: { marginTop: 8, fontSize: 14, color: '#000' },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2E342A',
    },
    profileIcon: {
        position: 'absolute',
        top: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFFF33',
    },
    checkbox: {
        borderRadius: 12, // rond checkbox
        marginTop: 4,
    },
    radioButton: {
        borderRadius: 12,
        marginTop: 4,
    },
});

export default FormScreen;
