import React, { useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import exampleImage from '../assets/splash.png';

const ScreenE = ({ navigation }) => {
    // Navigate to HomeScreen after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('HomeScreen');
            console.log("here passing")
             // Replace current screen with HomeScreen
        }, 5000); // 5000 milliseconds = 5 seconds

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image
                source={exampleImage}
                style={styles.logo}
            />
            <Text style={styles.text}>En cours de création de votre expérience</Text>
            <ActivityIndicator size="large" color="#20AD96" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', // Example background color
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default ScreenE;
