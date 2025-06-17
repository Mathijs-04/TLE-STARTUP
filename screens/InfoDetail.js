import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function PlantDetails({navigation, route}) {

    const { plant } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Title */}
            <Text style={styles.title}>{plant.title}</Text>

            {/* Main card */}
            <View style={styles.card}>
                {/* Circle image in top right */}
                <View style={styles.imageCircle}>
                    <Image
                        source={{uri: plant.imageUrl2}}
                        style={styles.blurredImage}
                        resizeMode="contain"
                        blurRadius={7} // This adds the blur
                    />
                    <Image
                        source={{uri: plant.imageUrl2}}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>
                {/* Insects */}
                <Text style={styles.sectionTitleLarge}>Bestuivers:</Text>
                <View style={styles.iconRow}>
                    {plant.pollinators?.some((id) => [1, 2, 3].includes(id)) && (
                        <View style={[styles.iconCircle, { backgroundColor: '#F3FF33' }]}>
                            <Text style={styles.iconText}>🐝</Text>
                        </View>
                    )}
                    {plant.pollinators?.some((id) => [7, 8].includes(id)) && (
                        <View style={[styles.iconCircle, { backgroundColor: '#F23FF3' }]}>
                            <Text style={styles.iconText}>🦋</Text>
                        </View>
                    )}
                    {plant.pollinators?.some((id) => [4, 5, 6, 11].includes(id)) && (
                        <View style={[styles.iconCircle, { backgroundColor: '#cf7d51' }]}>
                            <Text style={styles.iconText}>🪰</Text>
                        </View>
                    )}
                    {plant.pollinators?.some((id) => [9, 10].includes(id)) && (
                        <View style={[styles.iconCircle, { backgroundColor: '#cdb9ab' }]}>
                            <Text style={styles.iconText}>🐦‍⬛</Text>
                        </View>
                    )}
                </View>


                {/* Sun requirements */}
                <Text style={styles.sectionTitleLarge}>Zon vereisten</Text>
                <View style={styles.iconRow}>
                    <View style={[styles.iconCircle, { backgroundColor: '#F3FF33' }]} />
                </View>

                {/* Soil requirements */}
                <Text style={styles.sectionTitleLarge}>Grond vereisten</Text>
                <View style={styles.soilRow}>
                    {['Klei', 'Kalk', 'Leem', 'Zand'].map((type, idx) => (
                        <View key={idx} style={styles.soilItem}>
                            <View style={styles.soilCircle} />
                            <Text style={styles.soilText}>{type}</Text>
                        </View>
                    ))}
                </View>

                {/* Description */}
                <Text style={styles.sectionTitleLarge}>Informatie</Text>
                <Text style={styles.description}>
                    {plant.planttext}
                </Text>

                {plant.plantpollinatorstext ? (
                    <>
                        <Text style={styles.sectionTitle}>Bestuivers</Text>
                        <Text style={styles.description}>{plant.plantpollinatorstext}</Text>
                    </>
                ) : null}

                {plant.plantpropagation ? (
                    <>
                        <Text style={styles.sectionTitle}>Voortplanting</Text>
                        <Text style={styles.description}>{plant.plantpropagation}</Text>
                    </>
                ) : null}

                {plant.plantcultivation ? (
                    <>
                        <Text style={styles.sectionTitle}>Teelt</Text>
                        <Text style={styles.description}>{plant.plantcultivation}</Text>
                    </>
                ) : null}

                {plant.plantpests ? (
                    <>
                        <Text style={styles.sectionTitle}>Ziekten & Plagen</Text>
                        <Text style={styles.description}>{plant.plantpests}</Text>
                    </>
                ) : null}

                {plant.plantmaintenance ? (
                    <>
                        <Text style={styles.sectionTitle}>Onderhoud</Text>
                        <Text style={styles.description}>{plant.plantmaintenance}</Text>
                    </>
                ) : null}


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
        width: '100%',
        height: '100%',
        top: '-30',
    },

    blurredImage: {
        position: 'absolute',
        width: '110%',
        height: '110%',
        top: '-36',
        opacity: 1,
        zIndex: 0,
    },

    sectionTitle: {
        fontWeight: '700',
        fontSize: 16,
        marginTop: 15,
    },

    sectionTitleLarge: {
        fontWeight: '700',
        fontSize: 18,
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
