import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleMode = () => setDarkMode((prev) => !prev);

  return (
      <View style={[styles.container, darkMode ? styles.dark : styles.light]}>
        <Text style={darkMode ? styles.darkText : styles.lightText}>
          {darkMode ? 'Dark Mode' : 'Light Mode'}
        </Text>
        <Button
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            onPress={toggleMode}
        />
        <StatusBar style={darkMode ? 'light' : 'dark'} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dark: {
    backgroundColor: '#222',
  },
  light: {
    backgroundColor: '#fff',
  },
  darkText: {
    color: '#fff',
    marginBottom: 20,
  },
  lightText: {
    color: '#222',
    marginBottom: 20,
  },
});