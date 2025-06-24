import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
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
        marginLeft: 25,
    },
});