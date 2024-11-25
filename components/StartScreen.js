import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Management App</Text>
      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
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
    borderStyle:'solid',
    borderBlockColor:'#000000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 50,
  },
  startButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingVertical: 25,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});