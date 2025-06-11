import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from './iconComponents/HomeIcon';
import PlantIcon from './iconComponents/PlantIcon';
import InfoIcon from './iconComponents/InfoIcon';
import HomeScreen from "./screens/HomeScreen";
import GardenScreen from "./screens/GardenScreen";
import InfoScreen from "./screens/InfoScreen";

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <AppNavigator/>
  );
}

function AppNavigator() {
  return (
      <NavigationContainer>
          <Tab.Navigator
              id={1}
              initialRouteName="Home"
              screenOptions={{
                  headerStyle: { backgroundColor: '#FCFCFC' },
                  tabBarStyle: { backgroundColor: '#455736' },
                  tabBarActiveTintColor: '#000',
              }}>
              <Tab.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                      tabBarIcon: ({ color, size }) => (
                          <HomeIcon width={size} height={size} stroke={color} />
                      ),
                  }}
              />
              <Tab.Screen
                  name="Garden"
                  component={GardenScreen}
                  options={{
                      tabBarIcon: ({ color, size }) => (
                          <PlantIcon width={size} height={size} stroke={color} />
                      ),
                  }}
              />
              <Tab.Screen
                  name="Planten Encyclopedie"
                  component={InfoScreen}
                  options={{
                      tabBarIcon: ({ color, size }) => (
                          <InfoIcon width={size} height={size} stroke={color} />
                      ),
                  }}
              />
          </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
