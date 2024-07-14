import React, { useState, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Platform, Keyboard, ScrollView,Dimensions } from 'react-native'; 
import axios from 'axios';
import exampleImage from '../assets/logo.png';
import { API_URL } from '@env';

const ScreenC = ({ navigation, route }) => {
    const { email } = route.params;
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputs = useRef([]);

    const handleChange = (text, index) => {
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);
        if (text && index < 5) {
            inputs.current[index + 1].focus();
        }
    };

    const handleContinue = async () => {
        const verificationCode = code.join('');
        try {
            const response = await axios.post(`${API_URL}/api/students/verify-email`, {
                email,
                verificationCode,
            });
            Alert.alert('Success', 'Email vérifié avec succès');
            navigation.navigate('ScreenD', { email });
        } catch (error) {
            if (error.response) {
                Alert.alert('Alerte', error.response.data.message);
            } else if (error.request) {
                Alert.alert('Alerte', 'Aucune réponse du serveur. Veuillez réessayer plus tard.');
            } else {
                Alert.alert('Alerte', "Une erreur s'est produite. Veuillez réessayer.");
            }
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss(); // Dismiss the keyboard
    };

    return (
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Image source={exampleImage} style={styles.logo} />
          <Text style={styles.title}>Créez votre profil</Text>
          <Text style={styles.subtitle}>Vérifions votre email</Text>
          <Text style={styles.instructions}>
              Un code de vérification a été envoyé à votre email, veuillez le saisir dans le champ ci-dessous.
          </Text>
          <View style={styles.codeInputContainer}>
              {code.map((digit, index) => (
                  <TextInput
                      key={index}
                      style={styles.codeInput}
                      keyboardType="numeric"
                      maxLength={1}
                      value={digit}
                      onChangeText={(text) => handleChange(text, index)}
                      ref={(input) => { inputs.current[index] = input; }}
                  />
              ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleContinue}>
              <Text style={styles.buttonText}>Continuer</Text>
          </TouchableOpacity>
      </ScrollView>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    logo: {
        width: width * 0.35,
        height: height * 0.2,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 10,
        color: '#666',
    },
    instructions: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
        paddingHorizontal: 20,
    },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginBottom: 20,
    },
    codeInput: {
        width: 40,
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 18,
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

export default ScreenC;
