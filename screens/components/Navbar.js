import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Svg, { Circle, Line } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import HomeIcon from '../iconComponents/HomeIcon';
import PlantIcon from '../iconComponents/PlantIcon';
import InfoIcon from '../iconComponents/InfoIcon';
import HomeScreen from '../HomeScreen';
import GardenScreen from '../GardenScreen';
import FormScreen from '../FormScreen';
import InfoScreen from '../InfoScreen';
import PlantDetails from "../InfoDetail";
import EncyclopediaPage from "../EncyclopediaPage";
import TestScreen from "../EncyclopediaPage";
import EcotipsScreen from "../EcotipsScreen";
import StatsScreen from "../StatsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SunButton() {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.sunWrapper}
            onPress={() => navigation.navigate('EcoTips')}
            activeOpacity={0.7}
        >
            <Svg
                width={36}
                height={36}
                viewBox="0 0 24 24"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                style={styles.sunIcon}
            >
                <Circle cx="12" cy="12" r="5" />
                <Line x1="12" y1="1" x2="12" y2="3" />
                <Line x1="12" y1="21" x2="12" y2="23" />
                <Line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <Line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <Line x1="1" y1="12" x2="3" y2="12" />
                <Line x1="21" y1="12" x2="23" y2="12" />
                <Line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <Line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </Svg>
        </TouchableOpacity>
    );
}

function MainTabs() {
    return (
        <View style={{ flex: 1 }}>
            {/* The floating sun button */}
            <SunButton />

            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: styles.headerStyle,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarInactiveTintColor: '#ffffff',
                    tabBarActiveTintColor: '#ffffff',
                    backgroundColor: '#ffffff',
                    tabBarItemStyle: styles.tabBarItemStyle,
                    tabBarShowLabel: false,
                    headerShown: true,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <View style={styles.tabIconWrapper}>
                                {focused ? (
                                    <View style={styles.focusedTab}>
                                        <HomeIcon width={size} height={size} stroke={color} />
                                        <Text style={styles.tabItemText}>Home</Text>
                                    </View>
                                ) : (
                                    <HomeIcon width={size} height={size} stroke={color} />
                                )}
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Jouw Tuin"
                    component={GardenScreen}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <View style={styles.tabIconWrapper}>
                                {focused ? (
                                    <View style={styles.focusedTab}>
                                        <PlantIcon width={size} height={size} stroke={color} />
                                        <Text style={styles.tabItemText}>Garden</Text>
                                    </View>
                                ) : (
                                    <PlantIcon width={size} height={size} stroke={color} />
                                )}
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Encyclopedie"
                    component={TestScreen}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <View style={styles.tabIconWrapper}>
                                {focused ? (
                                    <View style={styles.focusedTab}>
                                        <InfoIcon width={size} height={size} stroke={color} />
                                        <Text style={styles.tabItemText}>Info</Text>
                                    </View>
                                ) : (
                                    <InfoIcon width={size} height={size} stroke={color} />
                                )}
                            </View>
                        ),
                    }}
                />
            </Tab.Navigator>
        </View>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator>
                <Stack.Screen
                    name="MainTabs"
                    component={MainTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PlantDetails"
                    component={PlantDetails}
                    options={{ title: 'Plant Details' }}
                />
                <Stack.Screen
                    name="FormScreen"
                    component={FormScreen}
                    options={{ title: 'Form' }}
                />
                <Stack.Screen
                    name="GardenScreen"
                    component={GardenScreen}
                    options={{ title: 'Garden' }}
                />

                <Stack.Screen
                    name="StatsScreen"
                    component={StatsScreen}
                    options={{ title: 'Tuinstatistieken' }}
                />
                <Stack.Screen
                    name="Encyclopedia"
                    component={TestScreen}
                    options={{ title: 'Encyclopedia' }}
                />
                <Stack.Screen
                    name="Garden"
                    component={GardenScreen}
                    options={{ title: 'Garden' }}
                />
                <Stack.Screen
                    name="EcoTips"
                    component={EcotipsScreen}
                    options={{ title: 'EcoTips' }}
                />
            </Stack.Navigator>
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
        marginLeft: 25,
    },
});
