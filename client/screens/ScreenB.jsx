import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import exampleImage from '../assets/splash.png';

const ScreenB = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleContinue = async () => {
      if (password !== confirmPassword) {
          Alert.alert('Error', 'Passwords do not match');
          return;
      }

      try {
          await axios.post('http://192.168.1.28:5000/api/students/register', {
              email,
              password,
              confirmPassword,
          }, {
              headers: {
                  'Content-Type': 'application/json',
              }
          });

          Alert.alert('Success', 'Registration successful, please check your email for verification code');
          navigation.navigate('ScreenC', { email });
      } catch (error) {
          if (error.response) {
              Alert.alert('Error', error.response.data.message || 'Registration failed');
          } else if (error.request) {
              Alert.alert('Error', 'No response received from server. Please try again.');
          } else {
              console.error('Error', error.message);
              Alert.alert('Error', 'An error occurred. Please try again.');
          }
      }
  };

    return (
        <View style={styles.container}>
            <Image source={exampleImage} style={styles.logo} />
            <Text style={styles.title}>Créez votre profil</Text>
            <Text style={styles.subtitle}>Configurez votre identification</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Adresse email" 
                keyboardType="email-address" 
                value={email}
                onChangeText={setEmail}
            />
            <TextInput 
                style={styles.input} 
                placeholder="Mot de passe" 
                secureTextEntry 
                value={password}
                onChangeText={setPassword}
            />
            <TextInput 
                style={styles.input} 
                placeholder="Vérifiez votre mot de passe" 
                secureTextEntry 
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continuer</Text>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#20AD96',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ScreenB;
