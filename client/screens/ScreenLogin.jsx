import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import axios from 'axios';
import exampleImage from '../assets/logo.png';
import { API_URL } from '@env';
import Icon from "react-native-vector-icons/Ionicons";
const { width, height } = Dimensions.get('window');

const ScreenLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const handleLogin = async () => {

        try {
            const response = await axios.post(`${API_URL}/api/auth`, {
                email,
                password,
            });
            Alert.alert('Success', 'Connexion réussie');
            navigation.navigate('Home', {email}); // Replace with your actual home screen name
        } catch (error) {
            if (error.response) {
                Alert.alert('Error', error.response.data.message);
            } else if (error.request) {
                Alert.alert('Alerte', 'Aucune réponse du serveur. Veuillez réessayer plus tard.');
            } else {
                Alert.alert('Alerte', "Une erreur s'est produite. Veuillez réessayer.");
            }
        }
    };
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
      };

    return (
        <View style={styles.container}>
            <Image source={exampleImage} style={styles.logo} />
            <Text style={styles.title}>Welcome Back</Text>
            <TextInput
                placeholder="Email"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {/* <TextInput
                placeholder="Password"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            /> */}
<View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mot de passe"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconContainer}
        >
          <Icon
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>


            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ScreenB' , {email})}>
                <Text style={styles.registerText}>Vous n'avez pas de compte? Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
      },
      passwordInput: {
        flex: 1,
        paddingHorizontal: 10,
        height: "100%",
      },
      iconContainer: {
        paddingHorizontal: 10,
      },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: width * 0.05,
        backgroundColor: '#f0f0f0',
    },
    logo: {
        width: width * 0.35,
        height: height * 0.2,
        marginBottom: 20,
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        marginBottom: height * 0.02,
        color: '#333',
    },
    input: {
        width: '100%',
        height: height * 0.06,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: width * 0.03,
        marginBottom: height * 0.02,
        // backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#20AD96',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginBottom: height * 0.02,
    },
    buttonText: {
        color: '#fff',
        fontSize: width * 0.045,
    },
    registerText: {
        color: '#20AD96',
        fontSize: width * 0.045,
    },
});

export default ScreenLogin;
