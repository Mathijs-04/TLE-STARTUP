import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { DefaultTheme, NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Svg, { Circle, Line } from 'react-native-svg';

import HomeIcon from '../iconComponents/HomeIcon';
import PlantIcon from '../iconComponents/PlantIcon';
import InfoIcon from '../iconComponents/InfoIcon';

import HomeScreen from '../HomeScreen';
import GardenScreen from '../GardenScreen';
import FormScreen from '../FormScreen';
import PlantDetails from "../InfoDetail";
import EncyclopediaPage from "../EncyclopediaPage";
import EcotipsScreen from "../EcotipsScreen";
import StatsScreen from "../StatsScreen";
import MyGardens from '../MyGardens';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="FormScreen" component={FormScreen} />
            <Stack.Screen name="StatsScreen" component={StatsScreen} />
            <Stack.Screen name="EcoTips" component={EcotipsScreen} options={{ title: 'Eco Tips' }} />
            <Stack.Screen name="MyGardens" component={MyGardens} options={{ title: 'Mijn Tuinen' }} />
        </Stack.Navigator>
    );
}

function GardenStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FormScreen" component={FormScreen} options={{title: 'Instellingen'}} />
            <Stack.Screen name="GardenScreen" component={GardenScreen} options={{ title: 'Garden' }} />
            <Stack.Screen name="StatsScreen" component={StatsScreen} />
            <Stack.Screen name="PlantDetails" component={PlantDetails} />
            <Stack.Screen name="EcoTips" component={EcotipsScreen} options={{ title: 'Eco Tips' }} />
            <Stack.Screen name="MyGardens" component={MyGardens} options={{ title: 'Mijn Tuinen' }} />
        </Stack.Navigator>
    );
}

function EncyclopediaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="EncyclopediaMain" component={EncyclopediaPage} options={{ title: 'Encyclopedie' }} />
            <Stack.Screen name="PlantDetails" component={PlantDetails} />
            <Stack.Screen name="EcoTips" component={EcotipsScreen} options={{ title: 'Eco Tips' }} />
        </Stack.Navigator>
    );
}

function SunButton() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.sunWrapper}
            onPress={() => navigation.navigate('EcoTips')}
            activeOpacity={0.7}
        >
            <Image
                source={require('...')}
                style={styles.sunIcon}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer theme={MyTheme}>
                <Tab.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarActiveTintColor: '#fff',
                        tabBarInactiveTintColor: '#fff',
                        tabBarStyle: styles.tabBarStyle,
                        tabBarItemStyle: styles.tabBarItemStyle,
                    }}
                >
                    <Tab.Screen
                        name="Home"
                        component={HomeStack}
                        options={{
                            tabBarIcon: ({ color, size, focused }) => (
                                <View style={focused ? styles.focusedTab : styles.tabIconWrapper}>
                                    <HomeIcon width={size} height={size} stroke={color} />
                                    {focused && <Text style={styles.tabItemText}>Home</Text>}
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Garden"
                        component={GardenStack}
                        options={{
                            tabBarIcon: ({ color, size, focused }) => (
                                <View style={focused ? styles.focusedTab : styles.tabIconWrapper}>
                                    <PlantIcon width={size} height={size} stroke={color} />
                                    {focused && <Text style={styles.tabItemText}>Tuin</Text>}
                                </View>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Encyclopedia"
                        component={EncyclopediaStack}
                        options={{
                            tabBarIcon: ({ color, size, focused }) => (
                                <View style={focused ? styles.focusedTab : styles.tabIconWrapper}>
                                    <InfoIcon width={size} height={size} stroke={color} />
                                    {focused && <Text style={styles.tabItemText}>Info</Text>}
                                </View>
                            ),
                        }}
                    />




                </Tab.Navigator>
                <SunButton />
        </NavigationContainer>
    );
}

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF',
    },
};

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#455736',
        height: 60,
        position: 'absolute',
        bottom: 20,
        marginHorizontal: 15,
        borderRadius: 40,
        borderTopWidth: 0,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    tabBarItemStyle: {
        height: 75,
        minWidth: 75,
        borderRadius: 40,
        paddingTop: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerStyle: {
        borderBottomWidth: 0,
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
    },
    tabIconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    focusedTab: {
        backgroundColor: '#2A3320',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        minWidth: 100,
    },
    tabItemText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    sunWrapper: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 110,
        height: 110,
        backgroundColor: '#f7ff3c',
        borderBottomLeftRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
    sunIcon: {
        width: 20,
        height: 20,
        marginLeft: 25,
    },
});