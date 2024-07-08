import React from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import exampleImage from '../assets/splash.png';

const ScreenD = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image
                source={exampleImage}
                style={styles.logo}
            />
            <Text style={styles.title}>Créer votre profil</Text>
            <Text style={styles.subtitle}>Faisons connaissance</Text>
            <TextInput
                placeholder="Nom"
                style={styles.input}
            />
            <TextInput
                placeholder="Prénom"
                style={styles.input}
            />
            <TextInput
                placeholder="Date de naissance"
                style={styles.input}
            />
            <TextInput
                placeholder="Genre"
                style={styles.input}
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={()=>navigation.navigate('ScreenE')}>Continuer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF', // Example background color
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
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

export default ScreenD;
