import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {DefaultTheme, NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Svg, {Circle, ClipPath, Defs, G, Line, Path, Rect} from 'react-native-svg';

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
            <Stack.Screen name="HomeMain" component={HomeScreen} options={{title: 'Home'}}/>
            <Stack.Screen name="FormScreen" component={FormScreen}/>
            <Stack.Screen name="StatsScreen" component={StatsScreen}/>
            <Stack.Screen name="EcoTips" component={EcotipsScreen} options={{title: 'Eco Tips'}}/>
            <Stack.Screen name="MyGardens" component={MyGardens} options={{title: 'Mijn Tuinen'}}/>
        </Stack.Navigator>
    );
}

function GardenStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="FormScreen" component={FormScreen} options={{title: 'Instellingen'}}/>
            <Stack.Screen name="GardenScreen" component={GardenScreen} options={{title: 'Garden'}}/>
            <Stack.Screen name="StatsScreen" component={StatsScreen}/>
            <Stack.Screen name="PlantDetails" component={PlantDetails}/>
            <Stack.Screen name="EcoTips" component={EcotipsScreen} options={{title: 'Eco Tips'}}/>
            <Stack.Screen name="MyGardens" component={MyGardens} options={{title: 'Mijn Tuinen'}}/>
        </Stack.Navigator>
    );
}

function EncyclopediaStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="EncyclopediaMain" component={EncyclopediaPage} options={{title: 'Encyclopedie'}}/>
            <Stack.Screen name="PlantDetails" component={PlantDetails}/>
            <Stack.Screen name="EcoTips" component={EcotipsScreen} options={{title: 'Eco Tips'}}/>
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
                width={64}
                height={64}
                viewBox="0 0 1019 1024"
                fill="none"
                style={styles.sunIcon}
            >
                <Defs>
                    <ClipPath id="clip0_12_136">
                        <Rect width="1019" height="1024" fill="white" />
                    </ClipPath>
                    <ClipPath id="clip1_12_136">
                        <Rect width="132" height="132" fill="white" transform="translate(443.887 449.132)" />
                    </ClipPath>
                </Defs>
                <G clipPath="url(#clip0_12_136)">
                    <Path d="M504.509 73.5225C506.094 72.4591 508.154 72.4245 509.773 73.4346C565.048 107.899 603.043 171.153 606.255 244.263V264.402C603.148 335.135 567.48 396.641 515.107 431.777C513.522 432.841 511.463 432.875 509.843 431.865C454.568 397.4 416.572 334.147 413.36 261.037V240.897C416.468 170.165 452.136 108.659 504.509 73.5225Z" fill="white" />
                    <G clipPath="url(#clip1_12_136)">
                        <Path d="M519.506 451.854C516.605 450.097 513.278 449.167 509.887 449.167C506.495 449.167 503.168 450.097 500.267 451.854L456.955 478.106C454.225 479.76 451.968 482.089 450.402 484.87C448.835 487.65 448.012 490.787 448.012 493.979V536.285C448.012 539.476 448.835 542.613 450.402 545.394C451.968 548.174 454.225 550.504 456.955 552.158L500.267 578.409C503.168 580.167 506.495 581.096 509.887 581.096C513.278 581.096 516.605 580.167 519.506 578.409L562.819 552.158C565.548 550.504 567.805 548.174 569.372 545.394C570.938 542.613 571.761 539.476 571.762 536.285V493.979C571.761 490.787 570.938 487.65 569.372 484.87C567.805 482.089 565.548 479.76 562.819 478.106L519.506 451.854Z" fill="black" />
                    </G>
                    <Path d="M504.508 597.743C506.093 596.679 508.153 596.645 509.773 597.655C565.047 632.12 603.043 695.373 606.255 768.483V788.623C603.148 859.356 567.48 920.862 515.107 955.998C513.522 957.061 511.463 957.096 509.843 956.085C454.568 921.621 416.572 858.367 413.36 785.258V765.117C416.468 694.385 452.136 632.879 504.508 597.743Z" fill="black" />
                    <Path d="M888.661 289.941C890.374 290.782 891.433 292.548 891.368 294.456C889.158 359.563 853.372 424.102 791.652 463.437L774.248 473.484C711.433 506.17 640.326 506.037 583.705 478.246C581.991 477.405 580.931 475.639 580.996 473.73C583.207 408.623 618.994 344.085 680.714 304.75L698.118 294.702C760.932 262.017 832.04 262.151 888.661 289.941Z" fill="black" />
                    <Path d="M130.36 289.941C128.646 290.782 127.586 292.548 127.651 294.456C129.862 359.564 165.649 424.101 227.368 463.436L244.772 473.484C307.587 506.17 378.694 506.036 435.316 478.246C437.029 477.404 438.089 475.638 438.024 473.73C435.813 408.623 400.026 344.084 338.306 304.75L320.903 294.702C258.088 262.017 186.98 262.151 130.36 289.941Z" fill="white" />
                    <Path d="M131.697 740.358C129.983 739.517 128.924 737.751 128.989 735.843C131.199 670.735 166.986 606.196 228.706 566.861L246.109 556.814C308.924 524.128 380.032 524.26 436.654 552.051C438.367 552.892 439.427 554.658 439.362 556.566C437.152 621.674 401.363 686.214 339.643 725.549L322.239 735.596C259.425 768.282 188.318 768.148 131.697 740.358Z" fill="white" />
                    <Path d="M863.73 641.523C880.728 670.756 890.262 703.228 891.369 735.843C891.434 737.751 890.375 739.517 888.661 740.358C860.133 754.36 827.928 761.34 794.959 760.64L863.73 641.523ZM747.049 544.858C756.232 548.189 765.315 552.165 774.229 556.803L791.672 566.873C799.71 571.997 807.307 577.55 814.448 583.475L720.716 745.824C713.099 742.871 705.56 739.468 698.138 735.606L680.696 725.537C671.231 719.504 662.377 712.876 654.16 705.746L747.049 544.858ZM605.87 645.98C590.604 618.042 582.042 587.368 580.996 556.566C580.931 554.659 581.991 552.893 583.704 552.052C610.623 538.84 640.816 531.878 671.836 531.723L605.87 645.98Z" fill="black" />
                </G>
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
                        tabBarIcon: ({color, size, focused}) => (
                            <View style={focused ? styles.focusedTab : styles.tabIconWrapper}>
                                <HomeIcon width={size} height={size} stroke={color}/>
                                {focused && <Text style={styles.tabItemText}>Home</Text>}
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Garden"
                    component={GardenStack}
                    options={{
                        tabBarIcon: ({color, size, focused}) => (
                            <View style={focused ? styles.focusedTab : styles.tabIconWrapper}>
                                <PlantIcon width={size} height={size} stroke={color}/>
                                {focused && <Text style={styles.tabItemText}>Tuin</Text>}
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name="Encyclopedia"
                    component={EncyclopediaStack}
                    options={{
                        tabBarIcon: ({color, size, focused}) => (
                            <View style={focused ? styles.focusedTab : styles.tabIconWrapper}>
                                <InfoIcon width={size} height={size} stroke={color}/>
                                {focused && <Text style={styles.tabItemText}>Info</Text>}
                            </View>
                        ),
                    }}
                />


            </Tab.Navigator>
            <SunButton/>
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
        shadowOffset: {width: 0, height: 2},
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