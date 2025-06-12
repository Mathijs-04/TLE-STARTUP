import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
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
            case 'green': return '#6B8E23';
            case 'gray': return '#9CA3AF';
            default: return '#F3F4F6';
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
            {/* Header with curved yellow section */}
            <View style={styles.header}>
                <View style={styles.yellowCurve}>
                    <View style={styles.profileIcon}>
                        <Ionicons name="person-outline" size={24} color="#000" />
                    </View>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Welcome Section */}
                <Text style={styles.welcomeText}>Welkom, User</Text>

                {/* Your Gardens Section */}
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
                        <Text style={styles.gardenDetail}>5m2</Text>
                        <Text style={styles.gardenDetail}>Planten dekking:</Text>
                        <Text style={styles.gardenDetail}>75%</Text>
                    </View>
                    <View style={styles.gardenVisual}>
                        <GardenGrid />
                        <Ionicons name="chevron-forward" size={24} color="#9CA3AF" style={styles.chevron} />
                    </View>
                </TouchableOpacity>

                {/* Quick Access Section */}
                <Text style={styles.quickAccessTitle}>Snel naar...</Text>

                <View style={styles.quickAccessContainer}>
                    <QuickAccessButton
                        icon="add"
                        title="Nieuwe tuin"
                        onPress={() => console.log('New garden')}
                    />
                    <QuickAccessButton
                        icon="book"
                        title="Encyclopedie"
                        onPress={() => console.log('Encyclopedia')}
                    />
                    <QuickAccessButton
                        icon="water"
                        title="ECO Tips"
                        onPress={() => console.log('ECO Tips')}
                    />
                </View>

                {/* Tip of the Day */}
                <View style={styles.tipCard}>
                    <View style={styles.tipContent}>
                        <Text style={styles.tipTitle}>Tuinier tip van de dag!</Text>
                        <Text style={styles.tipText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Fusce semper aliquet tellus at eleifend. Pellentesque
                            dictum, ligula tincidunt vestibulum accumsan.
                        </Text>
                        <TouchableOpacity>
                            <Text style={styles.readMoreLink}>Lees meer...</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tipImage}>
                        <View style={styles.flowerContainer}>
                            <Text style={styles.flowerEmoji}>🌸</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
                    <Ionicons name="home" size={24} color="#FFFFFF" />
                    <Text style={styles.activeNavText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="flower" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="menu" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
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
    },
    yellowCurve: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 200,
        height: 200,
        backgroundColor: '#E8F542',
        borderBottomLeftRadius: 100,
    },
    profileIcon: {
        position: 'absolute',
        top: 40,
        right: 30,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
    },
    moreLink: {
        fontSize: 16,
        color: '#6B7280',
        textDecorationLine: 'underline',
    },
    gardenCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
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
        width: 12,
        height: 12,
        margin: 1,
        borderRadius: 2,
    },
    chevron: {
        marginLeft: 10,
    },
    quickAccessTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 20,
    },
    quickAccessContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    quickAccessButton: {
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    quickAccessIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6B8E23',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    quickAccessText: {
        fontSize: 12,
        color: '#1F2937',
        textAlign: 'center',
    },
    tipCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 100,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    tipContent: {
        flex: 1,
        paddingRight: 15,
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 10,
    },
    tipText: {
        fontSize: 14,
        color: '#6B7280',
        lineHeight: 20,
        marginBottom: 10,
    },
    readMoreLink: {
        fontSize: 14,
        color: '#6B7280',
        textDecorationLine: 'underline',
    },
    tipImage: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flowerContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flowerEmoji: {
        fontSize: 30,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#6B8E23',
        borderRadius: 25,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navItem: {
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    activeNavItem: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 20,
        paddingVertical: 8,
    },
    activeNavText: {
        color: '#FFFFFF',
        fontSize: 12,
        marginTop: 2,
    },
});

export default Homepage;