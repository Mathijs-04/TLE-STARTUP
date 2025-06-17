import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function PlantDetails() {

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Title */}
            <Text style={styles.title}>Cichorium{'\n'}Intybus</Text>

            {/* Main card */}
            <View style={styles.card}>
                {/* Circle image in top right */}
                <View style={styles.imageCircle}>
                    <Image
                        source={require("../assets/test_image.png")}
                        style={styles.blurredImage}
                        resizeMode="cover"
                        blurRadius={20} // This adds the blur
                    />
                    <Image
                        source={require("../assets/test_image.png")}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                {/* Insects */}
                <Text style={styles.sectionTitle}>Insecten</Text>
                <View style={styles.iconRow}>
                    <View style={[styles.iconCircle, { backgroundColor: '#F3FF33' }]}>
                        <Text style={styles.iconText}>🐝</Text>
                    </View>
                    <View style={[styles.iconCircle, { backgroundColor: '#F23FF3' }]}>
                        <Text style={styles.iconText}>🦋</Text>
                    </View>
                </View>

                {/* Sun requirements */}
                <Text style={styles.sectionTitle}>Zon vereisten</Text>
                <View style={styles.iconRow}>
                    <View style={[styles.iconCircle, { backgroundColor: '#F3FF33' }]} />
                </View>

                {/* Soil requirements */}
                <Text style={styles.sectionTitle}>Grond vereisten</Text>
                <View style={styles.soilRow}>
                    {['Klei', 'Kalk', 'Leem', 'Zand'].map((type, idx) => (
                        <View key={idx} style={styles.soilItem}>
                            <View style={styles.soilCircle} />
                            <Text style={styles.soilText}>{type}</Text>
                        </View>
                    ))}
                </View>

                {/* Description */}
                <Text style={styles.sectionTitle}>Beschrijving</Text>
                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>

                {/* Back button */}
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backButtonText}>Terug</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        marginBottom: 20,
        fontFamily: 'serif',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        paddingTop: 30,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
        position: 'relative',
    },
    imageCircle: {
        position: 'absolute',
        top: 30,
        right: -10,
        width: 150,
        height: 150,
        borderRadius: 100,
        backgroundColor: '#CCD3C5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '135%',
        height: '135%',
        top: '-30',
    },

    blurredImage: {
        position: 'absolute',
        width: '140%',
        height: '140%',
        top: '-65',
        opacity: 1,
        zIndex: 0,
    },

    sectionTitle: {
        fontWeight: '700',
        fontSize: 16,
        marginTop: 15,
    },
    iconRow: {
        flexDirection: 'row',
        gap: 10,
        marginVertical: 10,
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 18,
    },
    soilRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: '20',
        marginVertical: 10,
    },
    soilItem: {
        alignItems: 'center',
    },
    soilCircle: {
        width: 30,
        height: 30,
        backgroundColor: '#eee',
        borderRadius: 15,
        marginBottom: 5,
    },
    soilText: {
        fontSize: 12,
    },
    description: {
        marginTop: 10,
        fontSize: 14,
        lineHeight: 20,
    },
    backButton: {
        backgroundColor: '#3E4E2C',
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
