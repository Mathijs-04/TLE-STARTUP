import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from '../iconComponents/HomeIcon';
import PlantIcon from '../iconComponents/PlantIcon';
import InfoIcon from '../iconComponents/InfoIcon';
import HomeScreen from '../HomeScreen';
import GardenScreen from '../GardenScreen';
import InfoScreen from '../InfoScreen';
import PlantDetails from "../InfoDetail";

const Tab = createBottomTabNavigator();

export default function Navbar() {
    return (
        <NavigationContainer theme={MyTheme}>
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
                    headerShown: false,
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
                    name="Garden"
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
                    name="Info"
                    component={PlantDetails}
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
        </NavigationContainer>
    );
}

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#FFFFFF', // Set background to white
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
        shadowColor: '#000',
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
});
