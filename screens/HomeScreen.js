import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,                      // ← toegevoegd
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
            case 'green':  return '#6B8E23';
            case 'gray':   return '#9CA3AF';
            default:       return '#F3F4F6';
        }
    };

    return (
        <View style={styles.gridContainer}>
            {gridData.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.gridRow}>
                    {row.map((cell, cellIndex) => (
                        <View
                            key={cellIndex}
                            style={[
                                styles.gridCell,
                                { backgroundColor: getColor(cell) }
                            ]}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const QuickAccessButton = ({ icon, title, onPress }) => (
    <TouchableOpacity style={styles.quickAccessButton} onPress={onPress}>
        <View style={styles.quickAccessIcon}>
            <Ionicons name={icon} size={24} color="#FFFFFF" />
        </View>
        <Text style={styles.quickAccessText}>{title}</Text>
    </TouchableOpacity>
);

const Homepage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Welcome */}
                <Text style={styles.welcomeText}>Welkom, User</Text>

                {/* Tuinen */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Jouw tuinen</Text>
                    <TouchableOpacity>
                        <Text style={styles.moreLink}>Meer..</Text>
                    </TouchableOpacity>
                </View>

                {/* Garden Card */}
                <TouchableOpacity style={styles.gardenCard}>
                    <View style={styles.gardenInfo}>
                        <Text style={styles.gardenTitle}>Thuis</Text>
                        <Text style={styles.gardenDetail}>Afmetingen:</Text>
                        <Text style={styles.gardenDetail}>2m x 2.5m</Text>
                        <Text style={styles.gardenDetail}>5m²</Text>
                        <Text style={styles.gardenDetail}>Planten dekking:</Text>
                        <Text style={styles.gardenDetail}>75%</Text>
                    </View>
                    <View style={styles.gardenVisual}>
                        <GardenGrid />
                        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" style={styles.chevron} />
                    </View>
                </TouchableOpacity>

                {/* Quick Access */}
                <Text style={styles.quickAccessTitle}>Snel naar...</Text>
                <View style={styles.quickAccessContainer}>
                    <QuickAccessButton icon="add" title="Nieuwe tuin" onPress={() => {}} />
                    <QuickAccessButton icon="book" title="Encyclopedie" onPress={() => {}} />
                    <QuickAccessButton icon="water" title="ECO Tips" onPress={() => {}} />
                </View>

                {/* Tip van de dag */}
                <View style={styles.tipCard}>
                    <View style={styles.tipContent}>
                        <Text style={styles.tipTitle}>Tuinier tip van de dag!</Text>
                        <Text style={styles.tipText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce semper aliquet tellus at eleifend.
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.readMoreLink}>Lees meer...</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tipImage}>
                        <Image
                            source={require('../assets/images/purple_flower_image.png')}
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
    container:  { flex: 1, backgroundColor: '#F9FAFB' },
    content:    { flex: 1, paddingHorizontal: 20 },
    welcomeText:{ marginTop: 30, fontSize: 32, fontWeight: 'bold', color: '#1F2937', marginBottom: 30 },

    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    sectionTitle:  { fontSize: 18, fontWeight: '600', color: '#1F2937' },
    moreLink:      { fontSize: 16, color: '#6B7280', textDecorationLine: 'underline' },

    gardenCard:   {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 20,
        marginBottom: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    gardenInfo:  { flex: 1 },
    gardenTitle: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
    gardenDetail:{ fontSize: 14, color: '#6B7280', marginBottom: 2 },
    gardenVisual:{ flexDirection: 'row', alignItems: 'center' },
    chevron:     { marginLeft: 10 },

    gridContainer:{ marginRight: 10 },
    gridRow:     { flexDirection: 'row' },
    gridCell:    { width: 12, height: 12, margin: 1, borderRadius: 2 },

    quickAccessTitle: { fontSize: 18, fontWeight: '600', color: '#1F2937', marginBottom: 20 },
    quickAccessContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    quickAccessButton:{
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    quickAccessIcon: {
        width: 60, height: 60, borderRadius: 30,
        backgroundColor: '#455736',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 8,
    },
    quickAccessText: { fontSize: 12, color: '#1F2937', textAlign: 'center' },

    tipCard:      {
        backgroundColor: '#FFF',
        borderRadius: 30,
        padding: 20,
        marginBottom: 100,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    tipContent:   { flex: 1, paddingRight: 15 },
    tipTitle:     { fontSize: 18, fontWeight: 'bold', color: '#1F2937', marginBottom: 10 },
    tipText:      { fontSize: 14, color: '#6B7280', lineHeight: 20, marginBottom: 10 },
    readMoreLink: { fontSize: 14, color: '#6B7280', textDecorationLine: 'underline' },

    tipImage:     { width: 120, height: 120, justifyContent: 'center', alignItems: 'center' },
    flowerImage:  { width: 120, height: 120, borderRadius: 30 },
});

export default Homepage;
