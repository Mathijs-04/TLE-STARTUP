// FormScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import BeeIcon from './iconComponents/BeeIcon';
import ButterflyIcon from './iconComponents/ButterflyIcon';
import BirdIcon from './iconComponents/BirdIcon';
import RightArrowIcon from './iconComponents/RightArrowIcon';
import LeftArrowIcon from './iconComponents/LeftArrowIcon';

const Chalk = require('../assets/soilTypes/chalk.png');
const Clay = require('../assets/soilTypes/clay.png');
const Loam = require('../assets/soilTypes/loam.png');
const Sand = require('../assets/soilTypes/sand.png');

const STORAGE_KEYS = {
    lighting: 'form_lighting',
    animals: 'form_animals',
    soilType: 'form_soilType',
};

const FormScreen = () => {
    const navigation = useNavigation();

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

            } catch (e) {
                console.error('Failed to load form data', e);
            }
        };

        loadData();
    }, []);

    const handleLightingChange = async (key) => {
        setLighting(key);
        await AsyncStorage.setItem(STORAGE_KEYS.lighting, key);
    };

    const handleAnimalToggle = async (key) => {
        const updated = { ...animals, [key]: !animals[key] };
        setAnimals(updated);
        await AsyncStorage.setItem(STORAGE_KEYS.animals, JSON.stringify(updated));
    };

    const handleSoilToggle = async (key) => {
        const updated = { ...soilType, [key]: !soilType[key] };
        setSoilType(updated);
        await AsyncStorage.setItem(STORAGE_KEYS.soilType, JSON.stringify(updated));
    };

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

    const soilOption = [
        { key: 'chalk', label: 'Kalk', bg: '#FFFFFF', image: Chalk },
        { key: 'clay', label: 'Klei', bg: '#FFFFFF', image: Clay },
        { key: 'loam', label: 'Leem', bg: '#FFFFFF', image: Loam },
        { key: 'sand', label: 'Zand', bg: '#FFFFFF', image: Sand },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
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
                            <View style={styles.radioWrapper}>
                            <RadioButton
                                value={key}
                                status={lighting === key ? 'checked' : 'unchecked'}
                                onPress={() => handleLightingChange(key)}
                                color="#2E342A"
                                uncheckedColor="#2E342A"
                                style={styles.radioButton}
                            />
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Welke bestuivers wilt u aantrekken?</Text>
                <View style={styles.row}>
                    {animalOptions.map(({ key, label, bg, Icon }) => (
                        <View key={key} style={styles.centeredItem}>
                            <View style={[styles.circle, { backgroundColor: bg }]}>
                                <Icon width={40} height={40} color="#2E342A" />
                            </View>
                            <Text style={styles.optionLabel}>{label}</Text>
                            <View style={styles.radioWrapper}>
                            <Checkbox
                                status={animals[key] ? 'checked' : 'unchecked'}
                                onPress={() => handleAnimalToggle(key)}
                                color="#2E342A"
                                uncheckedColor="#2E342A"
                                style={styles.checkbox}
                            />
                            </View>
                        </View>
                    ))}
                </View>
                <Text style={styles.sectionTitle}>Selecteer de grondsoorten in uw tuin</Text>

                <View style={styles.row}>
                    {soilOption.map(({ key, label, bg, image }) => (
                        <View key={key} style={styles.centeredItem}>
                            <View style={[styles.circle, { backgroundColor: bg }]}>
                                <Image source={image} style={styles.iconImage} />
                            </View>
                            <Text style={styles.optionLabel}>{label}</Text>
                            <View style={styles.radioWrapper}>

                            <Checkbox
                                status={soilType[key] ? 'checked' : 'unchecked'}
                                onPress={() => handleSoilToggle(key)}
                                color="#2E342A"
                                uncheckedColor="#2E342A"
                                style={styles.checkbox}
                            />
                            </View>
                        </View>
                    ))}
                </View>
            </View>
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('GardenScreen')}
                activeOpacity={0.8}
            >
                <Text style={styles.nextButtonText}>Verder</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginBottom: 50,
        paddingBottom: 100,
    },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10, color: '#000', textAlign: 'center' },
    section: { marginBottom: 30, width: '100%' },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#000', textAlign: 'center' },
    row: { flexDirection: 'row', justifyContent: 'space-around' },
    centeredItem: { alignItems: 'center' },
    circle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', position: 'relative' },
    overlayHalf: { position: 'absolute', right: 0, width: '50%', height: '100%', backgroundColor: '#555', borderTopRightRadius: 30, borderBottomRightRadius: 30 },
    optionLabel: { marginTop: 8, fontSize: 14, color: '#000' },
    checkbox: { borderRadius: 12, marginTop: 4 },
    radioButton: { borderRadius: 12, marginTop: 4 },
    iconImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    radioWrapper: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 48,            // round corners to match your button style
        padding: 0,                  // some padding around radio
        shadowColor: '#000',         // shadow color
        shadowOffset: { width: 0, height: 1 }, // shadow offset
        shadowOpacity: 0.2,          // shadow opacity
        shadowRadius: 1.5,           // shadow blur
        elevation: 3,                // for Android shadow
        backgroundColor: '#fff',     // keep background white so shadow is visible
    },
    nextButton: {
        backgroundColor: '#455736',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginTop: 0,
        alignSelf: 'center',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },

});

export default FormScreen;
