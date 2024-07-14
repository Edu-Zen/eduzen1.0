import React, { useEffect } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Dimensions, Text } from 'react-native';
import exampleImage from '../assets/logo.png';

const ScreenE = ({ navigation, route }) => {
    const { email } = route.params; // Destructure email from route.params

    // Navigate to HomeScreen after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home', { email });
            console.log("Passing email to Home screen:", email);
        }, 4000); // 4000 milliseconds = 4 seconds

        return () => clearTimeout(timer); // Cleanup on unmount
    }, [navigation, email]);

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={exampleImage}
                    style={styles.logo}
                    resizeMode="contain"   // Adjust the resizeMode as needed
                />
            </View>
           <Text>En cours de création de votre expérience</Text>
            <View style={styles.activityIndicatorContainer}>
                <ActivityIndicator size="large" color="#20AD96" />
            </View>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', // Example background color
    },
    logoContainer: {
        width: windowWidth * 0.5, // Example width based on screen width
        height: windowHeight * 0.2, // Example height based on screen height
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20, // Adjust as needed for spacing between logo and activity indicator
    },
    logo: {
        width: width * 0.35,
        height: height * 0.2,
        marginBottom: 20,
    },
    activityIndicatorContainer: {
        marginTop: 30, // Adjust as needed for spacing between logo and activity indicator
    },
});

export default ScreenE;
