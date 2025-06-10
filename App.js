import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './Homepage';

function HomeScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button
            title="Go to Homepage"
            onPress={() => navigation.navigate('Homepage')}
        />
      </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Homepage" component={Homepage} />
        </Stack.Navigator>
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