import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView, Linking } from 'react-native';

const url = process.env.EXPO_PUBLIC_API_URL + ':' + process.env.EXPO_PUBLIC_API_PORT;

export default function EcotipsScreen() {
    const [ecoTips, setEcoTips] = useState([]);
    const [plantImages, setPlantImages] = useState([]);
    const [loadingPlants, setLoadingPlants] = useState(false);
    const [loading, setLoading] = useState(false);

    const allEcoTips = [
        "Gebruik regenwater om je planten water te geven.",
        "Plant inheemse planten die goed passen bij je lokale klimaat.",
        "Vermijd pesticiden en gebruik natuurlijke bestrijdingsmiddelen.",
        "Maak zelf compost van keuken- en tuinafval.",
        "Zet een insectenhotel neer om nuttige insecten aan te trekken.",
        "Gebruik mulch om vocht vast te houden en onkruid te onderdrukken.",
        "Plant bloemen die bijen en vlinders aantrekken.",
        "Kies voor biologische zaden en planten.",
        "Gebruik gerecyclede materialen voor je plantenbakken en borders.",
        "Plant bomen of struiken als windscherm en schaduwgever.",
        "Gebruik natuurlijke meststoffen zoals compostthee.",
        "Creëer een kleine vijver of waterbron voor dieren.",
        "Gebruik een regenton om regenwater op te vangen.",
        "Houd je bodem gezond met afwisselende beplanting (teeltwisseling).",
        "Plant klimplanten die tegen muren en schuttingen groeien.",
        "Verminder het maaien van het gras en laat stukjes natuur ongemaaid.",
        "Plant groente en fruit in je tuin om lokale productie te stimuleren.",
        "Gebruik biologische mulch zoals stro of houtsnippers.",
        "Gebruik elektrische of handbediende tuingereedschappen in plaats van benzine.",
        "Zorg voor een goede bodemstructuur door regelmatig te beluchten.",
        "Laat afgevallen bladeren liggen om de bodem te voeden.",
        "Gebruik geen plastic zakken of folie in de tuin.",
        "Plant eetbare bloemen in je moestuin.",
        "Vermijd het gebruik van chemische onkruidverdelgers.",
        "Maak een rotatieplan voor je groenteplanten om bodemuitputting te voorkomen.",
        "Zet nestkastjes neer voor vogels die insecten eten.",
        "Gebruik planten die droogtebestendig zijn.",
        "Plant dichte bodembedekkers om erosie tegen te gaan.",
        "Zet een compostbak in de tuin.",
        "Gebruik natuurlijke plaagbestrijders zoals lieveheersbeestjes.",
        "Plant fruitbomen of struiken voor biodiversiteit en voedsel.",
        "Beperk het gebruik van kunstmest.",
        "Gebruik regenwater om je kasplanten water te geven.",
        "Vermijd het planten van invasieve exoten.",
        "Gebruik een tuinbroek of schoenen die je vaker kunt hergebruiken.",
        "Plant in potten of verhoogde bakken om water te besparen.",
        "Zet een klein bijenvolk of een paar bijenkasten als je ruimte hebt.",
        "Gebruik organische zaden die niet genetisch gemodificeerd zijn.",
        "Gebruik alleen milieuvriendelijke tuinverlichting.",
        "Zorg voor voldoende variatie in je tuinplanten voor een gezond ecosysteem.",
        "Plant struiken en bomen die vogels en kleine dieren aantrekken.",
        "Zet een composttoilet of gebruik composteerbare materialen in de tuin.",
        "Verzamel zaad van je planten om volgend jaar opnieuw te zaaien.",
        "Gebruik natuurlijke schuilplaatsen zoals stapels takken voor dieren.",
        "Plant in verschillende lagen (hoogte) voor optimale ruimte en schaduw.",
        "Gebruik een zonne- of handbediende grasmaaier.",
        "Maak gebruik van companion planting (planten die elkaar helpen groeien).",
        "Plant planten die de bodem verrijken met stikstof.",
        "Houd je tuin schoon maar laat wat natuurlijke rommel liggen voor dieren.",
        "Kies voor duurzame tuinmeubelen van gerecycled hout of bamboe.",
        "Zet ’s nachts de tuinverlichting uit om energie te besparen.",
        "Gebruik regenwateropvang voor het doorspoelen van het toilet.",
        "Verminder het gebruik van bestrijdingsmiddelen door natuurlijke vijanden aan te trekken.",
        "Plant kruiden die ongedierte op afstand houden, zoals lavendel of rozemarijn.",
        "Zorg voor een diverse tuin om meer dieren aan te trekken.",
        "Zet een vogelbad neer om vogels te helpen bij warm weer.",
        "Gebruik een wormenbak om organisch afval te verwerken en compost te maken.",
        "Laat bloemen langer bloeien door regelmatig dode bloemen te verwijderen.",
        "Gebruik zaden van lokale kwekers in plaats van grote bedrijven.",
        "Kies voor planten die weinig water nodig hebben.",
        "Maak gebruik van regenwater voor het schoonmaken van tuinmeubels.",
        "Gebruik een zonne-energie-aangedreven tuinsproeier.",
        "Plant struiken als natuurlijke afscheiding in plaats van schuttingen.",
        "Beperk het gebruik van kunstgras; kies liever voor natuurlijke gazons.",
        "Gebruik natuurlijke afdekmaterialen om onkruid te onderdrukken.",
        "Maak een habitat voor amfibieën met natte hoekjes in de tuin.",
        "Plaats nestkasten voor vleermuizen om muggen te bestrijden.",
        "Gebruik regenpijpen met filters om bladeren te voorkomen.",
        "Plant bomen in groepen om een microklimaat te creëren.",
        "Gebruik biologische zaden voor een gezonde tuin.",
        "Vermijd tuinaarde met plastic deeltjes of kunststoffen.",
        "Maak een klein kruidenbedje dicht bij de keuken.",
        "Zorg voor een regenton met een kraan voor makkelijk gebruik.",
        "Plant fruit- en notenbomen voor extra biodiversiteit.",
        "Maak een composthoop afgedekt tegen regen om stikstofverlies te voorkomen.",
        "Gebruik herbruikbare plantenlabels in plaats van plastic.",
        "Plant struiken die in het voorjaar vroeg bloeien voor vroege nectar.",
        "Vermijd het snoeien tijdens het broedseizoen van vogels.",
        "Gebruik warme compost om ziekteverwekkers te doden.",
        "Zet kleine stapstenen neer om de grond minder te verdichten.",
        "Gebruik bamboe of riet als duurzame plantensteunen.",
        "Vermijd overbewatering door te controleren op vochtigheid.",
        "Plaats waterbakjes voor insecten in droge periodes.",
        "Zorg voor een afwisselende bloeitijd door verschillende planten te kiezen.",
        "Gebruik houtas als natuurlijke meststof voor zure bodems.",
        "Maak een kleine wilde hoek met natuurlijke planten en gras.",
        "Gebruik lokale compost in plaats van kunstmest.",
        "Houd een logboek bij van je tuinactiviteiten voor beter beheer.",
        "Gebruik gerecyclede materialen voor het maken van tuinmeubels.",
        "Zet een kleine moestuin op het balkon of dakterras.",
        "Gebruik handgereedschap om bodemleven te beschermen.",
        "Maak een mulchlaag van bladeren in de herfst.",
        "Zorg dat er in de winter voedsel is voor vogels en insecten.",
        "Vermijd het gebruik van plastic potten; kies voor aardewerk of bamboe.",
        "Plant bloemen die aantrekkelijk zijn voor vlinders.",
        "Gebruik regengoten om water efficiënt te leiden.",
        "Houd rekening met de natuurlijke stand van de zon bij het planten.",
        "Gebruik duurzame zaaigoedzakken of herbruikbare zakken.",
        "Voorkom bodemverdichting door niet te veel op dezelfde plek te lopen.",
    ];

    function getRandomTips(arr, n) {
        const result = [];
        const taken = new Set();
        while (result.length < n && result.length < arr.length) {
            const idx = Math.floor(Math.random() * arr.length);
            if (!taken.has(idx)) {
                taken.add(idx);
                result.push(arr[idx]);
            }
        }
        return result;
    }

    const fetchRandomPlantImages = useCallback(async (count = 10) => {
        setLoadingPlants(true);
        try {

            const res = await fetch(`http://${url}/plants/url/all`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                });
            const data = await res.json();

            const plantArray = Object.values(data)
                .filter(plant => plant.url)
                .map(plant => `https://greenberrystudio.com/images/${plant.url.replace('./public/images/', '')}`);

            const randomImages = [];
            const taken = new Set();
            while (randomImages.length < count && randomImages.length < plantArray.length) {
                const idx = Math.floor(Math.random() * plantArray.length);
                if (!taken.has(idx)) {
                    taken.add(idx);
                    randomImages.push(plantArray[idx]);
                }
            }

            setPlantImages(randomImages);
        } catch (error) {
            console.error('Error fetching plant images:', error);
        } finally {
            setLoadingPlants(false);
        }
    }, []);

    useEffect(() => {
        const tips = getRandomTips(allEcoTips, 10);
        setEcoTips(tips);

        fetchRandomPlantImages(10);
    }, [fetchRandomPlantImages]);

    const refreshEcoTips = async () => {
        setLoading(true);

        const newTips = getRandomTips(allEcoTips, 10);
        setEcoTips(newTips);

        await fetchRandomPlantImages(10);

        setLoading(false);
    };

    useEffect(() => {
        refreshEcoTips();
    }, []);

    const handleLeesMeer = () => {
        Linking.openURL('https://www.milieucentraal.nl/huis-en-tuin/tuin/tips-voor-een-groene-tuin/');
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.refreshButton}
                onPress={refreshEcoTips}
                disabled={loading}
            >
                <Text style={styles.refreshButtonText}>
                    {loading ? 'Laden...' : 'Ververs tips'}
                </Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ padding: 20 }}>
                {ecoTips.map((tip, index) => (
                    <View key={index} style={styles.tipCard}>
                        <View style={styles.tipContent}>
                            <Text style={styles.tipTitle}>🌱 Eco-tip #{index + 1}</Text>
                            <Text style={styles.tipText}>{tip}</Text>
                            <TouchableOpacity onPress={handleLeesMeer} style={styles.leesMeerButton}>
                                <Text style={styles.readMoreLink}>Lees meer...</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.tipImage}>
                            {plantImages[index] ? (
                                <Image
                                    source={{ uri: plantImages[index] }}
                                    style={styles.flowerImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <Image
                                    source={require('../assets/test_image.png')}
                                    style={styles.flowerImage}
                                    resizeMode="contain"
                                />
                            )}
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9FAFB' },
    tipCard: {
        backgroundColor: '#FFF',
        borderRadius: 30,
        padding: 20,
        marginBottom: 30,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    tipContent: { flex: 1, paddingRight: 15 },
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
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flowerImage: {
        width: 120,
        height: 120,
        borderRadius: 30,
    },
    refreshButton: {
        backgroundColor: '#455736',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 0,
    },
    refreshButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
