// screens/ScreenA.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import exampleImage from '../assets/splash.png';

const ScreenA = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={exampleImage} 
        style={styles.image} 
      />
      <Text style={styles.welcomeText}>Bienvenue</Text>
      <Text style={styles.instructionText}>Avant de commencer, veuillez identifier votre profil</Text>
      <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('ScreenB')} >
        <Text style={styles.buttonText}>Etudiant</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Button 2 pressed')}>
        <Text style={styles.buttonText}>Ecole</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Button 3 pressed')}>
        <Text style={styles.buttonText}>Coach</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 250,
    height: 300,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  instructionText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#2F2B4A',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ScreenA;
