// screens/Homepage.js
import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

// ✅ SVG iconen
import AddIcon from './iconComponents/CustomPlusIcon';
import BookIcon from './iconComponents/OpenBookIcon';
import WaterIcon from './iconComponents/WaterdropIcon';
import Garden from "./GardenScreen";

const GardenGrid = () => {
    const gridData = [
        ['gray', 'yellow', 'yellow', 'yellow'],
        ['gray', 'yellow', 'green', 'yellow'],
        ['gray', 'green', 'green', 'green'],
        ['white', 'white', 'white', 'white'],
    ];
    const getColor = (color) => {
        switch (color) {
            case 'yellow': return '#E8F542';
            case 'green': return '#6B8E23';
            case 'gray': return '#9CA3AF';
            default: return '#F3F4F6';
        }
    };
    return (
        <View style={styles.gridContainer}>
            {gridData.map((row, ri) => (
                <View key={ri} style={styles.gridRow}>
                    {row.map((cell, ci) => (
                        <View
                            key={ci}
                            style={[styles.gridCell, { backgroundColor: getColor(cell) }]}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const QuickAccessButton = ({ IconComponent, title, onPress }) => (
    <TouchableOpacity style={styles.quickAccessButton} onPress={onPress}>
        <View style={styles.quickAccessIcon}>
            <IconComponent fill="#FFFFFF" />
        </View>
        <Text style={styles.quickAccessText} numberOfLines={1}>{title}</Text>
    </TouchableOpacity>
);

const Homepage = ({ navigation }) => {
    const [gardenInfo, setGardenInfo] = useState({ size: 0, greenPercent: 0, co2PerYear: 0 });

    useFocusEffect(
        useCallback(() => {
            const fetchLatestGarden = async () => {
                try {
                    const keys = await AsyncStorage.getAllKeys();
                    const gardenKeys = keys.filter(k => k.startsWith('garden_'));
                    if (gardenKeys.length === 0) {
                        setGardenInfo({ size: 0, greenPercent: 0, co2PerYear: 0 });
                        return;
                    }
                    const latestKey = gardenKeys.sort((a,b)=> parseInt(b.split('_')[1])-parseInt(a.split('_')[1]))[0];
                    const value = await AsyncStorage.getItem(latestKey);
                    if (!value) {
                        setGardenInfo({ size: 0, greenPercent: 0, co2PerYear: 0 }); return;
                    }
                    const g = JSON.parse(value);
                    const total = g.rows * g.cols;
                    const green = g.data.filter(i=> ['G','H','F','B', 'R', 'A'].includes(i.split('.')[2])).length;
                    const percent = total===0?0:Math.round((green/total)*100);
                    const co2 = green * 0.06;
                    setGardenInfo({ size: total, greenPercent: percent, co2PerYear: co2 });
                } catch (e) {
                    console.error('Error loading garden data', e);
                    setGardenInfo({ size: 0, greenPercent: 0, co2PerYear: 0 });
                }
            };
            fetchLatestGarden();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.welcomeText}>Welkom op de Blije Bij</Text>

                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Jouw tuin:</Text>
                </View>

                <TouchableOpacity style={styles.gardenCard} onPress={() => navigation.navigate('StatsScreen')}>
                    <View style={styles.gardenInfo}>
                        <Text style={styles.gardenTitle}>Tuin statistieken</Text>
                        <Text style={styles.gardenLabel}>Oppervlakte:</Text>
                        <Text style={styles.gardenDetail}>{gardenInfo.size} m²</Text>
                        <Text style={styles.gardenLabel}>Plantendekking:</Text>
                        <Text style={styles.gardenDetail}>{gardenInfo.greenPercent}%</Text>
                        <Text style={styles.gardenLabel}>CO₂ opname:</Text>
                        <Text style={styles.gardenDetail}>{gardenInfo.co2PerYear.toFixed(2)} kg/jaar</Text>
                    </View>
                    <View style={styles.gardenVisual}>
                        <GardenGrid />
                        {/*<Ionicons name="chevron-forward" size={24} color="#9CA3AF" style={styles.chevron} />*/}
                    </View>
                </TouchableOpacity>

                <Text style={styles.quickAccessTitle}>Snel naar:</Text>
                <View style={styles.quickAccessContainer}>
                    {/* Navigate to Garden main screen */}
                    <QuickAccessButton
                        IconComponent={AddIcon}
                        title="Nieuwe tuin"
                        onPress={() => navigation.navigate('Garden', { screen: 'Instellingen' })}
                    />

                    {/* Navigate to Encyclopedia main screen */}
                    <QuickAccessButton
                        IconComponent={BookIcon}
                        title="Encyclopedie"
                        onPress={() => navigation.navigate('Encyclopedia', { screen: 'EncyclopediaMain' })}
                    />

                    {/* Navigate to EcoTips screen inside HomeStack */}
                    <QuickAccessButton
                        IconComponent={WaterIcon}
                        title="ECO Tips"
                        onPress={() => navigation.navigate('Home', { screen: 'EcoTips' })}
                    />
                </View>


                <Text style={styles.quickAccessTitle}>Tip:</Text>
                <View style={styles.tipCard}>
                    <View style={styles.tipContent}>
                        <Text style={styles.tipTitle}>Tuinier tip van de dag!</Text>
                        <Text style={styles.tipText}>
                            Wist je dat je regenwater het beste vroeg in de ochtend kunt gebruiken?
                            Zo verdampt er minder water én krijgen je planten optimaal vocht.
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('EcoTips')}>
                            <Text style={styles.readMoreLink}>Lees meer...</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tipImage}>
                        <Image
                            source={require('../assets/test_image.png')}
                            style={styles.flowerImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex:1, backgroundColor: '#F9FAFB' },
    content: { flex:1, paddingHorizontal:20 },
    welcomeText: {
        marginTop: 30, fontSize:32, fontWeight:'bold', color:'#1F2937', marginBottom:30
    },
    sectionHeader: {
        flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:15
    },
    sectionTitle:{ fontSize:18, fontWeight:'600', color:'#1F2937' },
    moreLink:{ fontSize:16, color:'#6B7280', textDecorationLine:'underline' },

    gardenCard: {
        backgroundColor:'#FFF', borderRadius:30, padding:20, marginBottom:30,
        flexDirection:'row', justifyContent:'space-between', alignItems:'center',
        shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.1, shadowRadius:8, elevation:4
    },
    gardenInfo: { flex:1 },
    gardenTitle:{ fontSize:20,fontWeight:'bold',color:'#1F2937',marginBottom:8 },
    gardenLabel:{ fontSize:14,fontWeight:'bold',color:'#374151',marginTop:6 },
    gardenDetail:{ fontSize:14,color:'#6B7280',marginBottom:4 },
    gardenVisual:{ flexDirection:'row', alignItems:'center' },
    chevron:{ marginLeft:10 },

    gridContainer:{ marginRight:10 },
    gridRow:{ flexDirection:'row' },
    gridCell:{ width:12,height:12,margin:1,borderRadius:2 },

    quickAccessTitle: { fontSize:18, fontWeight:'600', color:'#1F2937', marginBottom:20 },
    quickAccessContainer: { flexDirection:'row', justifyContent:'space-between', marginBottom:30 },
    quickAccessButton: {
        backgroundColor:'#FFF', borderRadius:20, padding:14, alignItems:'center', flex:1, marginHorizontal:5,
        shadowColor:'#000', shadowOffset:{width:0,height:2}, shadowOpacity:0.1, shadowRadius:4, elevation:3
    },
    quickAccessIcon:{ width:60,height:60,borderRadius:30,backgroundColor:'#455736',justifyContent:'center',alignItems:'center',marginBottom:8 },
    quickAccessText:{ fontSize:13, color:'#1F2937', textAlign:'center',  flexShrink: 1, includeFontPadding: false, whiteSpace: 'nowrap'},

    tipCard:{
        backgroundColor:'#FFF',borderRadius:30,padding:20,marginBottom:100,
        flexDirection:'row',
        shadowColor:'#000',shadowOffset:{width:0,height:2},shadowOpacity:0.1,shadowRadius:8,elevation:4
    },
    tipContent:{ flex:1,paddingRight:15 },
    tipTitle:{ fontSize:18,fontWeight:'bold',color:'#1F2937',marginBottom:10 },
    tipText:{ fontSize:14,color:'#6B7280',lineHeight:20,marginBottom:10 },
    readMoreLink:{ fontSize:14,color:'#6B7280',textDecorationLine:'underline' },
    tipImage: {
        width: 140,            // increased from 120
        height: 140,           // increased from 120
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,         // moves image down a bit
    },
    flowerImage: {
        width: 140,            // match new size
        height: 140,           // added height for better control
        borderRadius: 30,
    },

});

export default Homepage;
