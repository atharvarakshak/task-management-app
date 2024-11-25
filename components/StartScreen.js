import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoOuter}>
          <Text style={styles.logoText}>T</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.startButton} 
        onPress={() => navigation.navigate('Task List')}
      >
        <Text style={styles.startButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  logoContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  logoOuter: {
    width: 200,
    height: 200,
    backgroundColor: '#27ae60',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  logoText: {
    fontSize: 120,
    color: 'white',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#34495e',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});