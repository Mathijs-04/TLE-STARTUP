import React, {useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

export default function StatsScreen() {
    const [gardenInfo, setGardenInfo] = useState({size: 0, greenPercent: 0});

    useFocusEffect(
        useCallback(() => {
            const fetchLatestGarden = async () => {
                try {
                    const keys = await AsyncStorage.getAllKeys();
                    const gardenKeys = keys.filter(k => k.startsWith('garden_'));
                    if (gardenKeys.length === 0) {
                        setGardenInfo({size: 0, greenPercent: 0});
                        return;
                    }

                    const latestKey = gardenKeys.sort((a, b) => {
                        const numA = parseInt(a.split('_')[1], 10);
                        const numB = parseInt(b.split('_')[1], 10);
                        return numB - numA;
                    })[0];

                    const value = await AsyncStorage.getItem(latestKey);
                    if (!value) {
                        setGardenInfo({size: 0, greenPercent: 0});a
                        return;
                    }

                    const garden = JSON.parse(value);
                    const {rows, cols, data} = garden;

                    const totalCells = rows * cols;
                    let greenCount = 0;

                    data.forEach(item => {
                        const parts = item.split('.');
                        const code = parts[2];
                        if (['G', 'H', 'F', 'B'].includes(code)) {
                            greenCount++;
                        }
                    });

                    const greenPercent = totalCells === 0 ? 0 : Math.round((greenCount / totalCells) * 100);

                    setGardenInfo({size: totalCells, greenPercent});
                } catch (e) {
                    console.error('Error loading garden data', e);
                    setGardenInfo({size: 0, greenPercent: 0});
                }
            };

            fetchLatestGarden();
        }, [])
    );

    return (
        <View style={{padding: 20}}>
            <Text>Formaat: {gardenInfo.size} m²</Text>
            <Text>Percentage groen: {gardenInfo.greenPercent}%</Text>
        </View>
    );
}
